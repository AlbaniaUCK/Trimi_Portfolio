'use strict';

const { years, projects, translations, loaderLines } = require('../src/app');

const LANGS = ['de', 'en', 'sq'];

// ── years array ──────────────────────────────────────────────────────────────

describe('years data', () => {
    test('contains at least one entry', () => {
        expect(years.length).toBeGreaterThan(0);
    });

    test('every entry has a unique id', () => {
        const ids = years.map(y => y.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    test('every entry has a non-empty year string', () => {
        years.forEach(y => {
            expect(typeof y.year).toBe('string');
            expect(y.year.trim()).not.toBe('');
        });
    });

    test('every entry has title, desc, and long for all three languages', () => {
        years.forEach(y => {
            LANGS.forEach(lang => {
                expect(y.title[lang]).toBeTruthy();
                expect(y.desc[lang]).toBeTruthy();
                expect(y.long[lang]).toBeTruthy();
            });
        });
    });

    test('every entry has a non-empty icons array', () => {
        years.forEach(y => {
            expect(Array.isArray(y.icons)).toBe(true);
            expect(y.icons.length).toBeGreaterThan(0);
            y.icons.forEach(icon => expect(typeof icon).toBe('string'));
        });
    });

    test('years are in descending order', () => {
        const nums = years.map(y => parseInt(y.year, 10));
        for (let i = 1; i < nums.length; i++) {
            expect(nums[i]).toBeLessThanOrEqual(nums[i - 1]);
        }
    });
});

// ── projects array ────────────────────────────────────────────────────────────

describe('projects data', () => {
    test('contains at least one entry', () => {
        expect(projects.length).toBeGreaterThan(0);
    });

    test('every entry has a unique id', () => {
        const ids = projects.map(p => p.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    test('every entry has tag, title, desc, and long for all three languages', () => {
        projects.forEach(p => {
            LANGS.forEach(lang => {
                expect(p.tag[lang]).toBeTruthy();
                expect(p.title[lang]).toBeTruthy();
                expect(p.desc[lang]).toBeTruthy();
                expect(p.long[lang]).toBeTruthy();
            });
        });
    });

    test('every entry has a non-empty icons array', () => {
        projects.forEach(p => {
            expect(Array.isArray(p.icons)).toBe(true);
            expect(p.icons.length).toBeGreaterThan(0);
        });
    });
});

// ── loaderLines array ─────────────────────────────────────────────────────────

describe('loaderLines data', () => {
    test('has the expected number of lines', () => {
        expect(loaderLines.length).toBe(5);
    });

    test('every line has a text and a numeric delay', () => {
        loaderLines.forEach(line => {
            expect(typeof line.text).toBe('string');
            expect(line.text.trim()).not.toBe('');
            expect(typeof line.delay).toBe('number');
            expect(line.delay).toBeGreaterThanOrEqual(0);
        });
    });

    test('delays are strictly increasing', () => {
        for (let i = 1; i < loaderLines.length; i++) {
            expect(loaderLines[i].delay).toBeGreaterThan(loaderLines[i - 1].delay);
        }
    });
});
