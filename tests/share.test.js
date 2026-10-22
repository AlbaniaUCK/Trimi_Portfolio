'use strict';

const fs = require('fs');
const path = require('path');

// applyShared() steht im Inline-Skript von index.html; hier läuft der echte Code mit Stubs für den Rest der Seite.
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const src = html.match(/const MATIDS=[\s\S]*?\nfunction applyShared\(\)\{[\s\S]*?\}catch\(e\)\{\}\}/)[0];
const encode = o => Buffer.from(JSON.stringify(o)).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

function run(hash) {
    const input = { value: 'Noa' };
    const st = { font: 'baloo', size: 1, cfg: [] };
    const DEFAULTS = [['#3d6fb6', 'satin'], ['#e3c04a', 'samt']];
    const FONTS = [{ id: 'baloo' }, { id: 'fredoka' }];
    const SIZES = [{ cm: 8 }, { cm: 12 }, { cm: 16 }];
    new Function('location', '$', 'st', 'FONTS', 'SIZES', 'DEFAULTS', 'escape', 'atob',
        `${src}; applyShared();`)({ hash }, () => input, st, FONTS, SIZES, DEFAULTS, escape, atob);
    return { name: input.value, st };
}

describe('applyShared', () => {
    test('übernimmt Name, Schrift, Grösse und Farben', () => {
        const r = run('#d=' + encode({ n: 'Lina', f: 'fredoka', s: 16, l: [{ c: '#D8392B', m: 'samt' }, null, { c: '#000000', m: 'perl' }, { c: '#ffffff', m: 'satin' }] }));
        expect(r.name).toBe('Lina');
        expect(r.st.font).toBe('fredoka');
        expect(r.st.size).toBe(2);
        expect(r.st.cfg[0]).toEqual({ color: '#d8392b', mat: 'samt' });
        expect(r.st.cfg).toHaveLength(4);
    });

    test('ohne oder mit kaputtem Hash bleibt alles beim Alten', () => {
        for (const h of ['', '#x=1', '#d=%%%', '#d=AAAA']) {
            const r = run(h);
            expect(r.name).toBe('Noa');
            expect(r.st.font).toBe('baloo');
        }
    });

    test('präparierter Link: Sonderzeichen, unbekannte Schrift, Grösse und Farbe werden verworfen', () => {
        const r = run('#d=' + encode({ n: '<img src=x onerror=1>AB', f: 'x', s: 99, l: [{ c: 'red" onx="1', m: '<b>' }] }));
        expect(r.name).not.toMatch(/[<>=]/);
        expect(r.st.font).toBe('baloo');
        expect(r.st.size).toBe(1);
        expect(r.st.cfg[0]).toEqual({ color: '#3d6fb6', mat: 'satin' });
    });

    test('Name wird auf 12 Zeichen gekürzt', () => {
        expect(run('#d=' + encode({ n: 'ABCDEFGHIJKLMNOP', l: [] })).name).toHaveLength(12);
    });
});
