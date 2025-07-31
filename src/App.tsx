import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout';
import Dashboard from '@/pages/dashboard';
import SimManagement from '@/pages/sim-management';
import SimDetails from '@/pages/sim-details';
import AccountPreferences from '@/pages/account-preferences';
import PlanCatalog from '@/pages/plan-catalog';
import ProtectedRoute from '@/components/protected-routes';

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/sim-management"
                        element={
                            <ProtectedRoute>
                                <SimManagement />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/sim-details/:iccid"
                        element={
                            <ProtectedRoute>
                                <SimDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/account-preferences"
                        element={
                            <ProtectedRoute>
                                <AccountPreferences />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/plan-catalog"
                        element={
                            <ProtectedRoute>
                                <PlanCatalog />
                            </ProtectedRoute>
                        }
                    />
                    {/* fallback route for unknown paths */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
