'use strict';

const {
    openDetails,
    openProjectDetails,
    closeModalFunc,
    closeDetails,
    years,
    projects,
} = require('../src/app');

function setupModalDOM(lang = 'en') {
    localStorage.setItem('preferredLang', lang);
    document.body.innerHTML = `
        <div id="projectModal" style="display:none;">
            <div class="modal-content">
                <h2 id="modalTitle"></h2>
                <p id="modalBody"></p>
                <div id="modalIcons"></div>
            </div>
        </div>
    `;
}

describe('openDetails (roadmap modal)', () => {
    beforeEach(() => setupModalDOM('en'));

    test('sets modal title to the entry title in the active language', () => {
        const entry = years[0];
        openDetails(entry.id);
        expect(document.getElementById('modalTitle').innerText).toBe(entry.title.en);
    });

    test('sets modal body to the long description in the active language', () => {
        const entry = years[0];
        openDetails(entry.id);
        expect(document.getElementById('modalBody').innerText).toBe(entry.long.en);
    });

    test('renders the correct number of icons', () => {
        const entry = years[0];
        openDetails(entry.id);
        const icons = document.querySelectorAll('#modalIcons i');
        expect(icons.length).toBe(entry.icons.length);
    });

    test('makes the modal visible (display: flex)', () => {
        openDetails(years[0].id);
        expect(document.getElementById('projectModal').style.display).toBe('flex');
    });

    test('does nothing for an unknown id', () => {
        expect(() => openDetails('nonexistent-id')).not.toThrow();
        expect(document.getElementById('projectModal').style.display).toBe('none');
    });

    test('shows content in German when lang is de', () => {
        localStorage.setItem('preferredLang', 'de');
        const entry = years[0];
        openDetails(entry.id);
        expect(document.getElementById('modalTitle').innerText).toBe(entry.title.de);
    });

    test('shows content in Albanian when lang is sq', () => {
        localStorage.setItem('preferredLang', 'sq');
        const entry = years[0];
        openDetails(entry.id);
        expect(document.getElementById('modalTitle').innerText).toBe(entry.title.sq);
    });
});

describe('openProjectDetails', () => {
    beforeEach(() => setupModalDOM('en'));

    test('sets modal title to the project title in the active language', () => {
        const project = projects[0];
        openProjectDetails(project.id);
        expect(document.getElementById('modalTitle').innerText).toBe(project.title.en);
    });

    test('sets modal body to the long description in the active language', () => {
        const project = projects[0];
        openProjectDetails(project.id);
        expect(document.getElementById('modalBody').innerText).toBe(project.long.en);
    });

    test('renders the correct number of icons', () => {
        const project = projects[0];
        openProjectDetails(project.id);
        const icons = document.querySelectorAll('#modalIcons i');
        expect(icons.length).toBe(project.icons.length);
    });

    test('makes the modal visible (display: flex)', () => {
        openProjectDetails(projects[0].id);
        expect(document.getElementById('projectModal').style.display).toBe('flex');
    });

    test('does nothing for an unknown id', () => {
        expect(() => openProjectDetails('nonexistent-id')).not.toThrow();
        expect(document.getElementById('projectModal').style.display).toBe('none');
    });
});

describe('closeModalFunc', () => {
    beforeEach(() => {
        setupModalDOM('en');
        const modal = document.getElementById('projectModal');
        modal.style.display = 'flex';
        modal.classList.add('show');
    });

    test('removes the .show class immediately', () => {
        closeModalFunc();
        expect(document.getElementById('projectModal').classList.contains('show')).toBe(false);
    });

    test('hides the modal after 300ms', () => {
        jest.useFakeTimers();
        closeModalFunc();
        jest.advanceTimersByTime(300);
        expect(document.getElementById('projectModal').style.display).toBe('none');
        jest.useRealTimers();
    });
});

describe('closeDetails (backdrop click)', () => {
    beforeEach(() => {
        setupModalDOM('en');
        const modal = document.getElementById('projectModal');
        modal.style.display = 'flex';
        modal.classList.add('show');
    });

    test('closes the modal when clicking the backdrop (#projectModal)', () => {
        const modal = document.getElementById('projectModal');
        const event = { target: modal };
        closeDetails(event);
        expect(modal.classList.contains('show')).toBe(false);
    });

    test('does not close the modal when clicking inside the content area', () => {
        const modal = document.getElementById('projectModal');
        const innerEl = document.querySelector('.modal-content');
        const event = { target: innerEl };
        closeDetails(event);
        expect(modal.classList.contains('show')).toBe(true);
    });
});
