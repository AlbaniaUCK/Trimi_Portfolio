'use strict';

const { scrambleText } = require('../src/app');

function setupDOM(text = '') {
    document.body.innerHTML = `<span id="target">${text}</span>`;
}

describe('scrambleText', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('returns an interval id', () => {
        setupDOM();
        const id = scrambleText('target', 'Hi');
        expect(id).toBeDefined();
        jest.clearAllTimers();
    });

    test('eventually resolves to the provided finalSubText', () => {
        setupDOM();
        scrambleText('target', 'Hello');
        // Each char needs 3 ticks at 30ms to be revealed.
        // For 5 chars: interval cleared after ~16 ticks = 480ms. Use 600ms to be safe.
        jest.advanceTimersByTime(600);
        expect(document.getElementById('target').innerText).toBe('Hello');
    });

    test('eventually resolves to the element innerText when no finalSubText given', () => {
        setupDOM();
        // jsdom populates innerText via assignment, not innerHTML parsing
        document.getElementById('target').innerText = 'ABC';
        scrambleText('target');
        jest.advanceTimersByTime(400);
        expect(document.getElementById('target').innerText).toBe('ABC');
    });

    test('resolves single-character text correctly', () => {
        setupDOM();
        scrambleText('target', 'X');
        jest.advanceTimersByTime(200);
        expect(document.getElementById('target').innerText).toBe('X');
    });

    test('characters before the reveal point are always correct', () => {
        setupDOM();
        scrambleText('target', 'ABCDE');
        // After 4 ticks (120ms), iterations ≈ 1.33 → first char revealed
        jest.advanceTimersByTime(120);
        const text = document.getElementById('target').innerText;
        expect(text[0]).toBe('A');
        jest.clearAllTimers();
    });
});
