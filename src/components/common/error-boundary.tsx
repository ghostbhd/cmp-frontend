import { Component, type ErrorInfo, type ReactNode } from 'react';
import * as React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Props {
    children: ReactNode;
    fallbackTitle?: string;
    fallbackMessage?: string;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

/**
 * ErrorBoundary Component
 *
 * A React error boundary that catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 *
 * Features:
 * - Graceful error handling with user-friendly messaging
 * - Error details in development mode
 * - Retry functionality to attempt recovery
 * - Accessible error presentation
 *
 * @param children - The component tree to wrap
 * @param fallbackTitle - Custom title for error message
 * @param fallbackMessage - Custom message for error display
 *
 * @example
 * <ErrorBoundary fallbackTitle="Profile Error">
 *   <ProfilePicture />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error details for debugging
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        this.setState({
            error,
            errorInfo,
        });
    }

    handleRetry = () => {
        // Reset error state to attempt recovery
        this.setState({
            hasError: false,
            error: undefined,
            errorInfo: undefined,
        });
    };

    render(): React.ReactNode {
        if (this.state.hasError) {
            const {
                fallbackTitle = 'Something went wrong',
                fallbackMessage = 'An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.',
            } = this.props;

            return (
                <Card className="w-full max-w-2xl mx-auto border-destructive/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="w-5 h-5" />
                            {fallbackTitle}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            {fallbackMessage}
                        </p>

                        {/* Development error details */}
                        {process.env.NODE_ENV === 'development' &&
                            this.state.error && (
                                <details className="mt-4 p-3 bg-muted rounded-lg">
                                    <summary className="text-sm font-medium cursor-pointer mb-2">
                                        Error Details (Development Only)
                                    </summary>
                                    <div className="text-xs font-mono space-y-2">
                                        <div>
                                            <strong>Error:</strong>
                                            <pre className="mt-1 whitespace-pre-wrap text-destructive">
                                                {this.state.error.message}
                                            </pre>
                                        </div>
                                        {this.state.error.stack && (
                                            <div>
                                                <strong>Stack Trace:</strong>
                                                <pre className="mt-1 whitespace-pre-wrap text-xs overflow-auto max-h-32">
                                                    {this.state.error.stack}
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                </details>
                            )}

                        <div className="flex gap-2 pt-2">
                            <Button
                                onClick={this.handleRetry}
                                className="flex items-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Try Again
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.location.reload()}
                            >
                                Refresh Page
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            );
        }

        return this.props.children;
    }
}

/**
 * Higher-order component to wrap components with error boundary
 *
 * @param Component - The component to wrap
 * @param errorBoundaryProps - Props for the error boundary
 * @returns Wrapped component with error boundary
 *
 * @example
 * const SafeProfilePicture = withErrorBoundary(ProfilePicture, {
 *   fallbackTitle: "Profile Picture Error"
 * });
 */
export function withErrorBoundary<T extends object>(
    WrappedComponent: React.ComponentType<T>,
    errorBoundaryProps?: Omit<Props, 'children'>,
) {
    const ComponentWithErrorBoundary = (props: T) => (
        <ErrorBoundary {...errorBoundaryProps}>
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );

    ComponentWithErrorBoundary.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

    return ComponentWithErrorBoundary;
}
