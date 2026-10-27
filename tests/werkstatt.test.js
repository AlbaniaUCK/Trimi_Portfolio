'use strict';

const fs = require('fs');
const path = require('path');

// readOrder() lives in an inline <script>; pull its source out of the page so the test runs the real code.
const html = fs.readFileSync(path.join(__dirname, '..', 'werkstatt.html'), 'utf8');
const src = html.match(/function readOrder\(\)\{[\s\S]*?\n(?=const order=)/)[0];

const TL = { MATS: [['satin', 'Satin'], ['samt', 'Samt'], ['marmor', 'Marmor']] };
const encode = o => Buffer.from(JSON.stringify(o)).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

function readOrder(hash) {
    const location = { hash };
    return new Function('location', 'TL', 'escape', 'atob', `${src}; return readOrder();`)(
        location, TL, escape, atob);
}

describe('readOrder', () => {
    test('liest einen gültigen Auftrag', () => {
        const o = readOrder('#o=' + encode({ n: 'Noa', f: 'baloo', s: 12, l: [{ c: '#3d6fb6', m: 'satin' }] }));
        expect(o.n).toBe('Noa');
        expect(o.l).toEqual([{ c: '#3d6fb6', m: 'satin' }]);
    });

    test.each([
        ['kein Hash', ''],
        ['Hash ohne o=', '#x=abc'],
        ['kein Base64/JSON', '#o=AAAA'],
        ['n fehlt', '#o=' + encode({ l: [] })],
        ['l ist kein Array', '#o=' + encode({ n: 'A', l: 'x' })],
    ])('%s -> null', (_, hash) => {
        expect(readOrder(hash)).toBeNull();
    });

    test('Farbe mit Attribut-Ausbruch wird ersetzt (XSS)', () => {
        const evil = 'red" onmouseover="alert(1)';
        const o = readOrder('#o=' + encode({ n: 'A', l: [{ c: evil, m: 'satin' }, { c: '#fff"><img src=x onerror=alert(1)>', m: 'satin' }] }));
        expect(o.l.map(x => x.c)).toEqual(['#3d6fb6', '#3d6fb6']);
    });

    test('unbekanntes Material und null-Einträge fallen auf Standard zurück', () => {
        const o = readOrder('#o=' + encode({ n: 'AB', l: [{ c: '#AABBCC', m: '<b>x</b>' }, null] }));
        expect(o.l).toEqual([{ c: '#AABBCC', m: 'satin' }, { c: '#3d6fb6', m: 'satin' }]);
    });

    test('es werden höchstens 24 Buchstaben übernommen', () => {
        const l = Array.from({ length: 30 }, () => ({ c: '#000000', m: 'samt' }));
        expect(readOrder('#o=' + encode({ n: 'A', l })).l).toHaveLength(24);
    });
});
