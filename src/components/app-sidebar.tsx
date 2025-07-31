'use client';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import logo from '@/assets/images/logo.png';

const menuItems = [
    {
        title: 'Dashboard',
        url: '/',
        icon: LayoutDashboard,
    },
    // {
    //     title: 'SIM Management',
    //     url: '/sim-management',
    //     icon: Smartphone,
    // },
    {
        title: 'Account Preferences',
        url: '/account-preferences',
        icon: Settings,
    },
    // {
    //     title: 'Plan Catalog',
    //     url: '/plan-catalog',
    //     icon: Package,
    // },
];

export function AppSidebar() {
    const location = useLocation();

    return (
        <Sidebar className="bg-white z-[40]">
            <SidebarHeader>
                <img src={logo} alt="logo" className="w-32 h-24 mx-auto" />
            </SidebarHeader>

            <SidebarContent className="px-4">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className={`w-full justify-start px-3 py-4 rounded-lg transition-colors ${
                                            location.pathname === item.url
                                                ? 'bg-[#F3FAF8] text-[#3C9087] hover:bg-[#F3FAF8]'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <Link
                                            to={item.url}
                                            className="flex items-center gap-3"
                                        >
                                            <item.icon className="h-5 w-5" />
                                            <span className="text-sm font-medium">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="mt-auto">
                <div className="border-t border-gray-200 my-2 mx-4"></div>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="w-full justify-start px-3 py-2 mx-4 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                            <Link to="/" className="flex items-center gap-3">
                                <LogOut className="h-5 w-5" />
                                <span className="text-sm font-medium">
                                    Logout
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
