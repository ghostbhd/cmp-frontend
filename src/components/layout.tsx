import { useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Navbar } from '@/components/navbar';
import { type ReactNode } from 'react';

export default function Layout({
    children,
}: Readonly<{ children: ReactNode }>) {
    const location = useLocation();
    const hideNavbarOn = ['/login'];

    if (hideNavbarOn.includes(location.pathname)) {
        return <>{children}</>; // Don't render AppSidebar / Navbar / token-using logic
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 flex flex-col min-h-screen max-w-screen overflow-hidden">
                <div className="flex items-center">
                    <SidebarTrigger />
                    <Navbar />
                </div>
                <div className="flex-1 bg-gray-50">{children}</div>
            </main>
        </SidebarProvider>
    );
}
