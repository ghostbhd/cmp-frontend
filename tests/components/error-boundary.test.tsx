import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../test-utils';
import { ErrorBoundary } from '../../src/components/common/error-boundary';
import React = require('react');

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
    if (shouldThrow) {
        throw new Error('Test error');
    }
    return <div>No error</div>;
};

describe('ErrorBoundary', () => {
    it('renders children when there is no error', () => {
        render(
            <ErrorBoundary>
                <ThrowError shouldThrow={false} />
            </ErrorBoundary>,
        );

        expect(screen.getByText('No error')).toBeInTheDocument();
    });

    it('renders error UI when there is an error', () => {
        // Suppress console.error for this test
        const originalError = console.error;
        console.error = vi.fn();

        render(
            <ErrorBoundary>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>,
        );

        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /try again/i }),
        ).toBeInTheDocument();

        // Restore console.error
        console.error = originalError;
    });
});
