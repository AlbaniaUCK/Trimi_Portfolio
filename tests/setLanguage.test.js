'use strict';

const { setLanguage, translations, projects, years } = require('../src/app');

function setupDOM() {
    document.body.innerHTML = `
        <button id="btn-de" class="lang-btn active"></button>
        <button id="btn-en" class="lang-btn"></button>
        <button id="btn-sq" class="lang-btn"></button>
        <nav>
            <a data-key="nav_home"></a>
            <a data-key="nav_skills"></a>
            <a data-key="nav_projects"></a>
            <a data-key="nav_roadmap"></a>
            <a data-key="nav_contact"></a>
        </nav>
        <h2 data-key="projects_title"></h2>
        <h2 data-key="roadmap_title"></h2>
        <input id="p_name" />
        <input id="p_email" />
        <textarea id="p_msg"></textarea>
        <div id="projects-list"></div>
        <div id="roadmap-list"></div>
    `;
}

describe('setLanguage', () => {
    beforeEach(() => {
        setupDOM();
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('persists the chosen language to localStorage', () => {
        setLanguage('en');
        expect(localStorage.getItem('preferredLang')).toBe('en');
    });

    test('adds .active class to the matching language button', () => {
        setLanguage('en');
        expect(document.getElementById('btn-en').classList.contains('active')).toBe(true);
    });

    test('removes .active from all other language buttons', () => {
        setLanguage('sq');
        expect(document.getElementById('btn-de').classList.contains('active')).toBe(false);
        expect(document.getElementById('btn-en').classList.contains('active')).toBe(false);
    });

    test('translates all [data-key] elements to the chosen language', () => {
        setLanguage('en');
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations.en[key]) {
                expect(el.innerText).toBe(translations.en[key]);
            }
        });
    });

    test('sets form placeholders for German', () => {
        setLanguage('de');
        expect(document.getElementById('p_name').placeholder).toBe(translations.de.p_name);
        expect(document.getElementById('p_email').placeholder).toBe(translations.de.p_email);
        expect(document.getElementById('p_msg').placeholder).toBe(translations.de.p_msg);
    });

    test('sets form placeholders for English', () => {
        setLanguage('en');
        expect(document.getElementById('p_name').placeholder).toBe('Name');
        expect(document.getElementById('p_email').placeholder).toBe('Email');
        expect(document.getElementById('p_msg').placeholder).toBe('Your message...');
    });

    test('sets form placeholders for Albanian', () => {
        setLanguage('sq');
        expect(document.getElementById('p_name').placeholder).toBe(translations.sq.p_name);
        expect(document.getElementById('p_email').placeholder).toBe(translations.sq.p_email);
        expect(document.getElementById('p_msg').placeholder).toBe(translations.sq.p_msg);
    });

    test('re-renders projects in the chosen language', () => {
        setLanguage('en');
        const cards = document.querySelectorAll('.project-card');
        expect(cards.length).toBe(projects.length);
    });

    test('re-renders roadmap in the chosen language', () => {
        setLanguage('en');
        const entries = document.querySelectorAll('#roadmap-list .container');
        expect(entries.length).toBe(years.length);
    });

    test('does nothing for an unknown language code', () => {
        setLanguage('de');
        const prevLang = localStorage.getItem('preferredLang');
        setLanguage('fr');
        expect(localStorage.getItem('preferredLang')).toBe(prevLang);
        expect(document.getElementById('btn-de').classList.contains('active')).toBe(true);
    });

    test('does nothing when called with undefined', () => {
        expect(() => setLanguage(undefined)).not.toThrow();
    });
});
