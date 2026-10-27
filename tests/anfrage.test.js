'use strict';

const { validate, ownerMail, customerMail, deliveryDate } = require('../api/_order');

const base = () => ({
    name: 'Noa', font: 'baloo', size: 'M', email: 'kunde@example.ch',
    letters: [{ c: '#3d6fb6', m: 'satin' }, { c: '#e3c04a', m: 'samt' }, { c: '#7fd1b5', m: 'marmor' }],
    address: { name: 'Max Muster', street: 'Hauptstrasse 1', zip: '8000', city: 'Zürich' },
});

describe('validate', () => {
    test('gültige Anfrage; Preis kommt vom Server', () => {
        const r = validate({ ...base(), total: 0.01, price: 0.01 });
        expect(r.ok).toBe(true);
        expect(r.order.name).toBe('NOA');
        expect(r.order.total).toBe(36);          // 3 × CHF 12
    });

    test('Leerzeichen zählen nicht als Buchstabe', () => {
        const b = base(); b.name = 'A B'; b.letters = [{ c: '#000000', m: 'satin' }, null, { c: '#000000', m: 'satin' }];
        expect(validate(b).order.n).toBe(2);
    });

    test.each([
        ['keine Daten', null],
        ['Name fehlt', { ...base(), name: '  ' }],
        ['unbekannte Grösse', { ...base(), size: 'XXL' }],
        ['unbekannte Schrift', { ...base(), font: 'comic' }],
        ['Buchstabenzahl passt nicht', { ...base(), letters: [] }],
        ['Farbe mit Ausbruch', { ...base(), letters: [{ c: 'red" onload="x', m: 'satin' }, ...base().letters.slice(1)] }],
        ['unbekanntes Material', { ...base(), letters: [{ c: '#000000', m: 'gold' }, ...base().letters.slice(1)] }],
        ['E-Mail ungültig', { ...base(), email: 'kein-mail' }],
        ['Adresse unvollständig', { ...base(), address: { name: 'A', street: '', zip: '1', city: 'B' } }],
    ])('%s -> abgelehnt', (_, b) => {
        expect(validate(b).ok).toBe(false);
    });

    test('ausgefülltes Honeypot-Feld wird als Spam markiert', () => {
        expect(validate({ ...base(), website: 'http://spam' }).error).toBe('spam');
    });

    test('Zeilenumbrüche und spitze Klammern in Freitext werden entfernt', () => {
        const b = base(); b.address.name = 'Max\r\nBcc: x@y.ch <b>';
        expect(validate(b).order.address.name).not.toMatch(/[\r\n<>]/);
    });

    test('Name wird auf 24 Zeichen gekürzt', () => {
        const b = base(); b.name = 'A'.repeat(40); b.letters = Array(24).fill({ c: '#000000', m: 'satin' });
        expect(validate(b).order.n).toBe(24);
    });
});

describe('Mails', () => {
    const o = validate(base()).order;
    test('Shop-Mail enthält Adresse, Preis und Werkstatt-Link', () => {
        const m = ownerMail(o, 'https://trimify.ch');
        expect(m.subject).toContain('NOA');
        expect(m.text).toContain('CHF 36.00');
        expect(m.text).toContain('Hauptstrasse 1');
        expect(m.text).toContain('https://trimify.ch/werkstatt.html#o=');
    });
    test('Kunden-Mail sagt, dass noch nicht bezahlt wird', () => {
        expect(customerMail(o).text).toContain('Bezahlt wird erst danach');
    });
    test('Lieferdatum stimmt mit dem Browser überein', () => {
        expect(deliveryDate(5.7, new Date('2026-10-22T10:00:00')).toISOString().slice(0, 10)).toBe('2026-10-28');
    });
});
