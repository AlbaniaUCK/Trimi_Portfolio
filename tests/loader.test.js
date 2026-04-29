'use strict';

const { dismissLoader, _resetLoaderDone } = require('../src/app');

function setupLoaderDOM() {
    document.body.innerHTML = `
        <div id="page-loader">
            <div id="loader-body"></div>
            <div class="loader-progress-bar">
                <div id="loader-progress"></div>
            </div>
        </div>
    `;
}

describe('dismissLoader', () => {
    beforeEach(() => {
        setupLoaderDOM();
        _resetLoaderDone();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('adds slide-out class on first call', () => {
        dismissLoader();
        expect(document.getElementById('page-loader').classList.contains('slide-out')).toBe(true);
    });

    test('restores body overflow on first call', () => {
        document.body.style.overflow = 'hidden';
        dismissLoader();
        expect(document.body.style.overflow).toBe('');
    });

    test('hides the loader after 900ms', () => {
        dismissLoader();
        jest.advanceTimersByTime(900);
        expect(document.getElementById('page-loader').style.display).toBe('none');
    });

    test('calls onComplete callback after 900ms', () => {
        const onComplete = jest.fn();
        dismissLoader(onComplete);
        expect(onComplete).not.toHaveBeenCalled();
        jest.advanceTimersByTime(900);
        expect(onComplete).toHaveBeenCalledTimes(1);
    });

    test('does nothing on second call (double-fire guard)', () => {
        const onComplete = jest.fn();
        dismissLoader(onComplete);
        dismissLoader(onComplete);
        jest.advanceTimersByTime(900);
        expect(onComplete).toHaveBeenCalledTimes(1);
        expect(document.getElementById('page-loader').classList.contains('slide-out')).toBe(true);
    });

    test('does not call onComplete if it is not a function', () => {
        expect(() => {
            dismissLoader('not-a-function');
            jest.advanceTimersByTime(900);
        }).not.toThrow();
    });
});
