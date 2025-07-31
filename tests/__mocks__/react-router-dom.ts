import { vi } from 'vitest';

export const mockRouter = {
    navigate: vi.fn(),
    location: {
        pathname: '/',
        search: '',
        hash: '',
        state: null,
        key: 'default',
    },
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
};

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockRouter.navigate,
        useLocation: () => mockRouter.location,
    };
});
