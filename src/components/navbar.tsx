import { Search, ChevronDown, Settings, Bell, CircleHelp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <nav className="flex items-center justify-between w-full px-6 py-4 bg-white">
            <div className="flex items-center flex-1 max-w-md">
                <div className="relative w-3/4 bg-[#F2F4F7] rounded-lg">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="Search anything"
                        className="pl-10 pr-4 py-3 w-3/4 rounded-lg border-none ring-0 focus:ring-0 focus:ring-offset-0"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span className="absolute top-[8px] right-[10px] h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>

                <Button variant="ghost" size="icon">
                    <CircleHelp className="h-5 w-5 text-gray-600" />
                </Button>

                <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5 text-gray-600" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex items-center gap-2 px-3 cursor-pointer"
                        >
                            <Avatar
                                className="h-8 w-8 border-2 shadow-lg"
                                style={{ borderColor: '#B0DFD6' }}
                            >
                                <AvatarImage
                                    src="/ghost.png"
                                    alt="Profile picture"
                                    className="object-cover"
                                />
                                <AvatarFallback
                                    className="text-sm font-semibold text-white"
                                    style={{ backgroundColor: '#56ABA0' }}
                                >
                                    JD
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                                <div className="text-sm text-gray-900">
                                    John Doe
                                </div>
                                <div className="text-xs text-gray-500">
                                    Admin
                                </div>
                            </div>
                            <ChevronDown className="h-5 w-5 text-gray-400 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link
                                to="/account-preferences"
                                className="flex items-center"
                            >
                                <Avatar
                                    className="h-5 w-5 mr-2 border"
                                    style={{ borderColor: '#B0DFD6' }}
                                >
                                    <AvatarImage
                                        src="/ghost.png"
                                        alt="Profile picture"
                                        className="object-cover"
                                    />
                                    <AvatarFallback
                                        className="text-xs font-semibold text-white"
                                        style={{ backgroundColor: '#56ABA0' }}
                                    >
                                        JD
                                    </AvatarFallback>
                                </Avatar>
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link
                                to="/account-preferences"
                                className="flex items-center"
                            >
                                <Settings className="h-4 w-4 mr-2" />
                                Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}
