'use strict';

const { translations } = require('../src/app');

const LANGS = ['de', 'en', 'sq'];

describe('translations', () => {
    test('all three language objects exist', () => {
        LANGS.forEach(lang => {
            expect(translations[lang]).toBeDefined();
        });
    });

    test('all languages have identical key sets', () => {
        const keysets = LANGS.map(lang => Object.keys(translations[lang]).sort());
        for (let i = 1; i < keysets.length; i++) {
            expect(keysets[i]).toEqual(keysets[0]);
        }
    });

    test('no translation value is empty', () => {
        LANGS.forEach(lang => {
            Object.entries(translations[lang]).forEach(([key, value]) => {
                expect(value.trim()).not.toBe('');
            });
        });
    });

    test('nav keys are present in all languages', () => {
        const NAV_KEYS = ['nav_home', 'nav_skills', 'nav_projects', 'nav_roadmap', 'nav_contact'];
        LANGS.forEach(lang => {
            NAV_KEYS.forEach(key => {
                expect(translations[lang][key]).toBeTruthy();
            });
        });
    });

    test('form placeholder keys are present in all languages', () => {
        const FORM_KEYS = ['p_name', 'p_email', 'p_msg'];
        LANGS.forEach(lang => {
            FORM_KEYS.forEach(key => {
                expect(translations[lang][key]).toBeTruthy();
            });
        });
    });

    test('section title/subtitle keys are present in all languages', () => {
        const SECTION_KEYS = [
            'roadmap_title', 'roadmap_subtitle',
            'skills_title', 'skills_subtitle',
            'projects_title', 'projects_subtitle',
            'contact_btn', 'contact_subtitle',
        ];
        LANGS.forEach(lang => {
            SECTION_KEYS.forEach(key => {
                expect(translations[lang][key]).toBeTruthy();
            });
        });
    });
});
