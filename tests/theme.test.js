'use strict';

const { toggleTheme } = require('../src/app');

describe('toggleTheme', () => {
    beforeEach(() => {
        document.body.className = '';
    });

    test('adds light-mode class when not present', () => {
        toggleTheme();
        expect(document.body.classList.contains('light-mode')).toBe(true);
    });

    test('removes light-mode class when already present', () => {
        document.body.classList.add('light-mode');
        toggleTheme();
        expect(document.body.classList.contains('light-mode')).toBe(false);
    });

    test('toggling twice restores the original state', () => {
        toggleTheme();
        toggleTheme();
        expect(document.body.classList.contains('light-mode')).toBe(false);
    });
});
