"use strict";
/* Vercel-Funktion: nimmt eine Anfrage entgegen und schickt sie per Resend an den Shop und eine Kopie an den Kunden.
   Umgebungsvariablen (in Vercel eintragen, nicht im Code): RESEND_API_KEY, ORDER_TO, ORDER_FROM, optional SITE_URL. */
const { validate, ownerMail, customerMail } = require("./_order");

/* Einfache Bremse pro Instanz; bei Vercel nur ein Richtwert, da Instanzen wechseln. */
const hits = new Map();
const LIMIT = 5, WINDOW = 10 * 60 * 1000;
function tooMany(ip) {
    const now = Date.now(), list = (hits.get(ip) || []).filter(t => now - t < WINDOW);
    list.push(now); hits.set(ip, list);
    if (hits.size > 5000) hits.clear();
    return list.length > LIMIT;
}

async function send(key, from, to, mail, replyTo) {
    const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: [to], subject: mail.subject, text: mail.text, ...(replyTo ? { reply_to: replyTo } : {}) })
    });
    if (!r.ok) throw new Error("Resend " + r.status);
}

module.exports = async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ error: "Nur POST." }); }
    const { RESEND_API_KEY, ORDER_TO, ORDER_FROM } = process.env;
    if (!RESEND_API_KEY || !ORDER_TO || !ORDER_FROM) return res.status(500).json({ error: "Der Versand ist noch nicht eingerichtet." });

    const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
    if (tooMany(ip)) return res.status(429).json({ error: "Zu viele Anfragen. Bitte später noch einmal versuchen." });

    const v = validate(req.body);
    if (!v.ok) {
        if (v.error === "spam") return res.status(200).json({ ok: true });   // Bots bekommen kein Signal
        return res.status(400).json({ error: v.error });
    }
    const site = process.env.SITE_URL || "https://trimify.ch";
    try {
        await send(RESEND_API_KEY, ORDER_FROM, ORDER_TO, ownerMail(v.order, site), v.order.email);
    } catch (e) {
        return res.status(502).json({ error: "Die Anfrage konnte nicht gesendet werden. Bitte später noch einmal versuchen." });
    }
    try { await send(RESEND_API_KEY, ORDER_FROM, v.order.email, customerMail(v.order)); } catch (e) { /* Kopie ist optional */ }
    return res.status(200).json({ ok: true });
};
