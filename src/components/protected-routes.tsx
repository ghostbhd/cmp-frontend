import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';

export default function ProtectedRoute({
    children,
}: Readonly<{
    children: JSX.Element;
}>) {
    // For now, just return the children - no authentication logic
    // You can add your authentication logic here later
    if (!children) return <Navigate to="/" replace />;
    return children;
}
