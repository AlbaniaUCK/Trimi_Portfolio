'use strict';

// jsdom does not implement IntersectionObserver — provide a minimal stub
global.IntersectionObserver = class IntersectionObserver {
    constructor(callback, options) {
        this.callback = callback;
        this.options = options;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
};
