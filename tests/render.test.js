'use strict';

const { renderProjects, renderRoadmap, projects, years } = require('../src/app');

function setupDOM() {
    document.body.innerHTML = `
        <div id="projects-list"></div>
        <div id="roadmap-list"></div>
    `;
}

describe('renderProjects', () => {
    beforeEach(setupDOM);

    test('renders the correct number of project cards', () => {
        renderProjects('en');
        const cards = document.querySelectorAll('.project-card');
        expect(cards.length).toBe(projects.length);
    });

    test('each card shows the project title for the requested language', () => {
        renderProjects('en');
        const headings = document.querySelectorAll('.project-card h3');
        projects.forEach((p, i) => {
            expect(headings[i].textContent).toBe(p.title.en);
        });
    });

    test('each card shows the correct tag for the requested language', () => {
        renderProjects('de');
        const tags = document.querySelectorAll('.project-tag');
        projects.forEach((p, i) => {
            expect(tags[i].textContent).toBe(p.tag.de);
        });
    });

    test('cards have staggered transition-delay in multiples of 120ms', () => {
        renderProjects('en');
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, i) => {
            expect(card.style.transitionDelay).toBe(`${i * 120}ms`);
        });
    });

    test('each card has the correct icon count', () => {
        renderProjects('en');
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, i) => {
            const icons = card.querySelectorAll('.project-icons i');
            expect(icons.length).toBe(projects[i].icons.length);
        });
    });

    test('re-rendering clears previous cards (no duplicates)', () => {
        renderProjects('en');
        renderProjects('de');
        const cards = document.querySelectorAll('.project-card');
        expect(cards.length).toBe(projects.length);
    });

    test('card onclick calls openProjectDetails with project id', () => {
        renderProjects('en');
        const card = document.querySelector('.project-card');
        expect(card.getAttribute('onclick')).toContain(`openProjectDetails('${projects[0].id}')`);
    });
});

describe('renderRoadmap', () => {
    beforeEach(setupDOM);

    test('renders the correct number of timeline entries', () => {
        renderRoadmap('en');
        const entries = document.querySelectorAll('#roadmap-list .container');
        expect(entries.length).toBe(years.length);
    });

    test('each entry shows the correct year badge', () => {
        renderRoadmap('en');
        const badges = document.querySelectorAll('.year-badge');
        years.forEach((y, i) => {
            expect(badges[i].textContent).toBe(y.year);
        });
    });

    test('each entry shows the correct title for the requested language', () => {
        renderRoadmap('sq');
        const headings = document.querySelectorAll('#roadmap-list h3');
        years.forEach((y, i) => {
            expect(headings[i].textContent).toBe(y.title.sq);
        });
    });

    test('entries have staggered transition-delay in multiples of 100ms', () => {
        renderRoadmap('en');
        const entries = document.querySelectorAll('#roadmap-list .container');
        entries.forEach((entry, i) => {
            expect(entry.style.transitionDelay).toBe(`${i * 100}ms`);
        });
    });

    test('re-rendering clears previous entries (no duplicates)', () => {
        renderRoadmap('en');
        renderRoadmap('de');
        const entries = document.querySelectorAll('#roadmap-list .container');
        expect(entries.length).toBe(years.length);
    });

    test('entry onclick calls openDetails with roadmap id', () => {
        renderRoadmap('en');
        const entry = document.querySelector('#roadmap-list .container');
        expect(entry.getAttribute('onclick')).toContain(`openDetails('${years[0].id}')`);
    });
});
