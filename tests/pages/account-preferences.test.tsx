import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '../test-utils';
import AccountPreferences from '../../src/pages/account-preferences';
import React = require('react');

// Mock the lazy-loaded components
vi.mock('../../src/components/account-preferences/user-info-card', () => ({
    default: () => <div data-testid="user-info-card">User Info Card</div>,
}));

vi.mock('../../src/components/account-preferences/profile-picture', () => ({
    default: () => <div data-testid="profile-picture">Profile Picture</div>,
}));

vi.mock(
    '../../src/components/account-preferences/change-password-card',
    () => ({
        default: () => (
            <div data-testid="change-password-card">Change Password Card</div>
        ),
    }),
);

vi.mock('../../src/components/account-preferences/otp-card', () => ({
    default: () => <div data-testid="otp-card">OTP Card</div>,
}));

describe('AccountPreferences', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading skeleton initially', () => {
        render(<AccountPreferences />);

        // The page should show loading skeletons first
        const loadingSkeletons = screen.getAllByRole('generic');
        expect(loadingSkeletons.length).toBeGreaterThan(0);
    });

    it('renders all account preference components after loading', async () => {
        render(<AccountPreferences />);

        // Wait for lazy components to load
        await waitFor(
            () => {
                const profilePictures =
                    screen.getAllByTestId('profile-picture');
                expect(profilePictures.length).toBeGreaterThan(0);
            },
            { timeout: 3000 },
        );

        await waitFor(() => {
            expect(
                screen.getAllByTestId('user-info-card').length,
            ).toBeGreaterThan(0);
            expect(
                screen.getAllByTestId('change-password-card').length,
            ).toBeGreaterThan(0);
            expect(screen.getAllByTestId('otp-card').length).toBeGreaterThan(0);
        });
    });

    it('has proper page layout structure', () => {
        const { container } = render(<AccountPreferences />);

        // Check for main layout elements
        const pageBackground = container.querySelector('.min-h-screen');
        expect(pageBackground).toBeInTheDocument();

        const centeredContainer = container.querySelector('.max-w-3xl');
        expect(centeredContainer).toBeInTheDocument();
    });
});
