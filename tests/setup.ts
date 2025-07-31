import "@testing-library/jest-dom";
import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect with Testing Library matchers
expect.extend(matchers);

// Runs a cleanup after each test case
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver
global.IntersectionObserver = vi
  .fn()
  .mockImplementation(
    (
      callback: IntersectionObserverCallback,
      options?: IntersectionObserverInit
    ) => ({
      disconnect: vi.fn(),
      observe: vi.fn(),
      unobserve: vi.fn(),
      root: options?.root || null,
      rootMargin: options?.rootMargin || "0px",
      thresholds: options?.threshold
        ? Array.isArray(options.threshold)
          ? options.threshold
          : [options.threshold]
        : [],
      takeRecords: vi.fn(() => []),
    })
  );

// Mock ResizeObserver
global.ResizeObserver = vi
  .fn()
  .mockImplementation((callback: ResizeObserverCallback) => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }));

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
});
