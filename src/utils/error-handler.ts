export const handleComponentError = (error: Error, componentName: string) => {
    // Always log errors for debugging
    console.error(`Error in ${componentName}:`, error);

    // Additional error details for better debugging
    console.error('Error stack:', error.stack);
    console.error('Component name:', componentName);
    console.error('Timestamp:', new Date().toISOString());

    // You can add error reporting service here in production
    // e.g., Sentry, LogRocket, etc.
    if (!import.meta.env.DEV) {
        // In production, you might want to send to an error service
        // Example: errorReportingService.captureException(error, { component: componentName });
    }
};

// New utility function to handle page-level errors that might cause white screen
export const handlePageError = (error: Error, pageName: string) => {
    console.error(`Page Error in ${pageName}:`, error);

    // Check for common causes of white screen
    if (
        error.message.includes('Cannot read properties') ||
        error.message.includes('is not a function') ||
        error.message.includes('Cannot access before initialization')
    ) {
        console.error(
            'This error might cause a white screen. Check component imports and state management.',
        );
    }

    return {
        error,
        pageName,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
    };
};

// Function to check for common white screen causes
export const diagnoseWhiteScreen = () => {
    const checks = {
        hasReact: typeof window !== 'undefined' && 'React' in window,
        hasRouterContext: typeof window !== 'undefined' && window.location,
        consoleErrors: [] as string[],
        networkErrors: [] as string[],
    };

    // Check for console errors
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
        checks.consoleErrors.push(args.join(' '));
        originalError.apply(console, args);
    };

    console.warn('White screen diagnosis:', checks);
    return checks;
};

// Enhanced error boundary helper function
export const createErrorFallback = (componentName: string, error?: Error) => {
    return {
        message: `Component "${componentName}" temporarily unavailable`,
        error: error?.message || 'Unknown error',
        stack: error?.stack,
        timestamp: new Date().toISOString(),
    };
};
