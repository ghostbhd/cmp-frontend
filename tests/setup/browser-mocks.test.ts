import { describe, it, expect, vi } from 'vitest';

describe('Browser API Mocks', () => {
    it('IntersectionObserver mock works correctly', () => {
        const callback = vi.fn();
        const observer = new IntersectionObserver(callback);

        expect(observer).toBeDefined();
        expect(observer.disconnect).toBeDefined();
        expect(observer.observe).toBeDefined();
        expect(observer.unobserve).toBeDefined();
        expect(observer.takeRecords).toBeDefined();
        expect(observer.root).toBe(null);
        expect(observer.rootMargin).toBe('0px');
        expect(observer.thresholds).toEqual([]);

        // Test that methods can be called without errors
        const element = document.createElement('div');
        observer.observe(element);
        observer.unobserve(element);
        observer.disconnect();

        expect(observer.observe).toHaveBeenCalledWith(element);
        expect(observer.unobserve).toHaveBeenCalledWith(element);
        expect(observer.disconnect).toHaveBeenCalled();
    });

    it('ResizeObserver mock works correctly', () => {
        const callback = vi.fn();
        const observer = new ResizeObserver(callback);

        expect(observer).toBeDefined();
        expect(observer.disconnect).toBeDefined();
        expect(observer.observe).toBeDefined();
        expect(observer.unobserve).toBeDefined();

        // Test that methods can be called without errors
        const element = document.createElement('div');
        observer.observe(element);
        observer.unobserve(element);
        observer.disconnect();

        expect(observer.observe).toHaveBeenCalledWith(element);
        expect(observer.unobserve).toHaveBeenCalledWith(element);
        expect(observer.disconnect).toHaveBeenCalled();
    });

    it('matchMedia mock works correctly', () => {
        const result = window.matchMedia('(max-width: 768px)');

        expect(result).toBeDefined();
        expect(result.matches).toBe(false);
        expect(result.media).toBe('(max-width: 768px)');
        expect(result.addEventListener).toBeDefined();
        expect(result.removeEventListener).toBeDefined();
        expect(result.dispatchEvent).toBeDefined();
    });
});
