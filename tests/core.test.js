'use strict';

// jsdom hat keine Canvas-Unterstützung; core.js holt sich beim Laden einen 2D-Kontext
HTMLCanvasElement.prototype.getContext = () => null;
require('../core.js');
const TL = window.TL;

describe('Schriften', () => {
    test('getFont findet eine Schrift und fällt sonst auf die erste zurück', () => {
        expect(TL.getFont('fredoka').family).toBe('Fredoka');
        expect(TL.getFont('gibt-es-nicht')).toBe(TL.FONTS[0]);
    });

    test('Schrift-IDs sind eindeutig', () => {
        const ids = TL.FONTS.map(f => f.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    test('fontStr baut einen gültigen CSS-Font-String', () => {
        expect(TL.fontStr(TL.getFont('baloo'), 100)).toBe('800 100px "Baloo 2", system-ui, sans-serif');
    });
});

describe('Farben und Materialien', () => {
    test('alle Farben sind #rrggbb (werden in Styles eingesetzt)', () => {
        for (const [, hex] of TL.COLORS) expect(hex).toMatch(/^#[0-9a-f]{6}$/i);
    });

    test('Materialien haben eindeutige IDs', () => {
        const ids = TL.MATS.map(m => m[0]);
        expect(new Set(ids).size).toBe(ids.length);
    });
});

describe('Hilfsfunktionen', () => {
    test('clamp und sstep', () => {
        expect(TL.clamp(5, 0, 1)).toBe(1);
        expect(TL.clamp(-5, 0, 1)).toBe(0);
        expect(TL.sstep(0, 1, 0)).toBe(0);
        expect(TL.sstep(0, 1, 1)).toBe(1);
        expect(TL.sstep(0, 1, 0.5)).toBeCloseTo(0.5);
    });

    test('rng ist mit gleichem Seed reproduzierbar und liegt in [0,1)', () => {
        const a = TL.rng(42), b = TL.rng(42), c = TL.rng(43);
        const xs = Array.from({ length: 5 }, a), ys = Array.from({ length: 5 }, b);
        expect(xs).toEqual(ys);
        expect(c()).not.toBe(xs[0]);
        for (const x of xs) { expect(x).toBeGreaterThanOrEqual(0); expect(x).toBeLessThan(1); }
    });

    test('valueNoise ist deterministisch und begrenzt', () => {
        const a = TL.valueNoise(20, 20, 5, 7), b = TL.valueNoise(20, 20, 5, 7);
        expect(Array.from(a)).toEqual(Array.from(b));
        for (const v of a) { expect(v).toBeGreaterThanOrEqual(0); expect(v).toBeLessThanOrEqual(1); }
    });
});

describe('edt (Abstand zum Rand)', () => {
    test('Abstand ist 0 ausserhalb und wächst nach innen', () => {
        const w = 9, h = 9, inside = new Uint8Array(w * h);
        for (let y = 2; y < 7; y++) for (let x = 2; x < 7; x++) inside[y * w + x] = 1;
        const d = TL.edt(inside, w, h);
        expect(d[0]).toBe(0);
        expect(d[2 * w + 2]).toBeCloseTo(1);        // Randpixel
        expect(d[4 * w + 4]).toBeCloseTo(3);        // Mitte, 3 Pixel bis ausserhalb
    });
});

describe('blur', () => {
    test('ein konstantes Feld bleibt konstant', () => {
        const a = new Float32Array(25).fill(2);
        TL.blur(a, 5, 5, 1);
        for (const v of a) expect(v).toBeCloseTo(2);
    });

    test('erhält die Summe nicht exakt, glättet aber eine Spitze', () => {
        const a = new Float32Array(25); a[12] = 9;
        TL.blur(a, 5, 5, 1);
        expect(a[12]).toBeLessThan(9);
        expect(a[11]).toBeGreaterThan(0);
    });
});
