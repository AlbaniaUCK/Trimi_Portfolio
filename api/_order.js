"use strict";
/* Prüfung und Mailtext für /api/anfrage. Der Unterstrich im Dateinamen sorgt dafür, dass Vercel daraus keinen Endpunkt macht.
   Alles, was vom Browser kommt, ist Nutzereingabe. Der Preis wird hier neu berechnet und nie übernommen. */

/* Muss mit SIZES in index.html und TL.DELIVERY in core.js übereinstimmen (cm, CHF pro Buchstabe, Druckstunden pro Buchstabe). */
const SIZES = { S: { cm: 8, p: 6, h: .75 }, M: { cm: 12, p: 12, h: 1.9 }, L: { cm: 16, p: 24, h: 4.2 } };
const DELIVERY = { hpd: 16, finish: 1, buffer: 2, ship: 2 };
const FONTS = ["baloo", "fredoka", "nunito", "sniglet", "titan"];
const MATS = ["satin", "samt", "marmor", "terrazzo", "streifen", "perl"];
const MAX_LETTERS = 12;

const clean = (v, max) => String(v == null ? "" : v).replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);

function validate(b) {
    if (!b || typeof b !== "object") return { ok: false, error: "Ungültige Anfrage." };
    if (b.website) return { ok: false, error: "spam" };            // verstecktes Feld, nur Bots füllen es aus

    const name = clean(b.name, MAX_LETTERS).toUpperCase();
    if (!/\S/.test(name)) return { ok: false, error: "Bitte einen Namen eingeben." };
    const size = SIZES[b.size] ? b.size : null;
    if (!size) return { ok: false, error: "Ungültige Grösse." };
    const font = FONTS.includes(b.font) ? b.font : null;
    if (!font) return { ok: false, error: "Ungültige Schrift." };

    const chars = [...name];
    if (!Array.isArray(b.letters) || b.letters.length !== chars.length) return { ok: false, error: "Ungültige Buchstaben." };
    const letters = [];
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === " ") { letters.push(null); continue; }
        const x = b.letters[i];
        if (!x || !/^#[0-9a-f]{6}$/i.test(x.c) || !MATS.includes(x.m)) return { ok: false, error: "Ungültige Farbe oder Material." };
        letters.push({ c: x.c.toLowerCase(), m: x.m });
    }

    const email = clean(b.email, 120);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { ok: false, error: "Bitte eine gültige E-Mail-Adresse eingeben." };
    const a = b.address || {};
    const address = { name: clean(a.name, 80), street: clean(a.street, 80), zip: clean(a.zip, 10), city: clean(a.city, 60) };
    if (!address.name || !address.street || !address.zip || !address.city) return { ok: false, error: "Bitte die Lieferadresse vollständig ausfüllen." };

    const n = letters.filter(Boolean).length;
    if (!n) return { ok: false, error: "Bitte einen Namen eingeben." };
    const s = SIZES[size];
    return { ok: true, order: { name, size, font, letters, email, address, n, total: n * s.p, hours: n * s.h } };
}

function deliveryDate(hours, from) {
    const x = new Date(from || Date.now());
    x.setDate(x.getDate() + Math.max(1, Math.ceil(hours / DELIVERY.hpd)) + DELIVERY.finish + DELIVERY.buffer);
    for (let k = DELIVERY.ship; k > 0;) { x.setDate(x.getDate() + 1); if (x.getDay() !== 0 && x.getDay() !== 6) k--; }
    return x;
}

const chf = v => "CHF " + v.toFixed(2);
const day = d => d.toLocaleDateString("de-CH", { weekday: "short", day: "numeric", month: "short" });

function workshopLink(o, site) {
    const j = { n: o.name, f: o.font, s: SIZES[o.size].cm, l: o.letters };
    return site + "/werkstatt.html#o=" + Buffer.from(JSON.stringify(j)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function summary(o) {
    const s = SIZES[o.size];
    const lines = [...o.name].map((ch, i) => o.letters[i] ? `  ${ch}  ${o.letters[i].c}  ${o.letters[i].m}` : null).filter(Boolean);
    return [`Name: ${o.name}`, `Schrift: ${o.font}`, `Grösse: ${o.size} (${s.cm} cm)`, "Buchstaben:", ...lines,
        `Preis: ${o.n} × ${chf(s.p)} = ${chf(o.total)}`, `Lieferung ca. ${day(deliveryDate(o.hours))}`].join("\n");
}

function ownerMail(o, site) {
    const a = o.address;
    return { subject: `Neue Anfrage: ${o.name} (${chf(o.total)})`,
        text: `${summary(o)}\n\nKunde: ${a.name}, ${o.email}\n${a.street}\n${a.zip} ${a.city}\n\nWerkstatt: ${workshopLink(o, site)}\n` };
}
function customerMail(o) {
    return { subject: "Deine Anfrage bei trimify",
        text: `Danke für deine Anfrage! Wir melden uns per E-Mail, um den Auftrag zu bestätigen. Bezahlt wird erst danach.\n\n${summary(o)}\n\nLieferadresse:\n${o.address.name}\n${o.address.street}\n${o.address.zip} ${o.address.city}\n` };
}

module.exports = { validate, ownerMail, customerMail, deliveryDate, workshopLink, SIZES };
