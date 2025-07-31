import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from '@/components/common/error-boundary';
import { handlePageError } from '@/utils/error-handler';

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    handlePageError(event.reason, 'UnhandledPromiseRejection');
    event.preventDefault();
});

// Global error handler for JavaScript errors
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    handlePageError(event.error, 'GlobalError');
});

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <ErrorBoundary
                fallbackTitle="Application Error"
                fallbackMessage="The application encountered an error. Please refresh the page."
            >
                <App />
            </ErrorBoundary>
        </StrictMode>,
    );
} else {
    throw new Error("Root element with id 'root' not found.");
}
