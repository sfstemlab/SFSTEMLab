'use client';
import { useState } from 'react';
import { Home, Eye, ShoppingCart, FileText, BarChart, Tag, Users, Layout, Plus } from 'lucide-react';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { cn } from '@/lib/utils';


const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const pathname = usePathname();

    const handleDropdown = () => {
        setOpenDropdown(!openDropdown);
    };

    const links = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/view', label: 'View Site', icon: Eye },
        { href: '/marketplace', label: 'Marketplace', icon: ShoppingCart },
        { href: '/posts', label: 'Posts', icon: FileText, dropdown: true },
        { href: '/performance', label: 'Performance', icon: BarChart },  // Add this line
        { href: '/tags', label: 'Tags', icon: Tag },
        { href: '/members', label: 'Members', icon: Users },
        { href: '/design', label: 'Design', icon: Layout },
    ];


    return (
        <div className="min-h-screen flex flex-col bg-[#1a202c] backdrop-blur-sm filter bg-opacity-50 border-r border-gray-900 text-gray-200 w-64">
            <div className="flex flex-col items-center p-4">
                <img
                    className="w-16 h-16 rounded-full mb-4"
                    src="https://via.placeholder.com/150"
                    alt="User Avatar"
                />
                <div className="flex flex-col items-start space-y-3 w-full">
                    {links.map(({ href, label, icon: Icon, dropdown }) => (
                        <div key={href} className="w-full">
                            <Link href={href} className={cn("flex items-center p-2 w-full rounded-lg", {
                                'bg-blue-700': pathname === href,
                                'hover:bg-gray-700': pathname !== href
                            })}>
                                <Icon className="w-6 h-6 mr-2" />
                                <span className="hidden md:inline">{label}</span>
                            </Link>
                            {dropdown && openDropdown && pathname.startsWith('/posts') && (
                                <div className="ml-10 mt-2 bg-gray-800 rounded-lg shadow-lg w-full">
                                    <Link href="/posts/create" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left">
                                        Create post
                                    </Link>
                                    <Link href="/posts/folder" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left">
                                        Create folder
                                    </Link>
                                    <Link href="/posts/project" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left">
                                        Create project
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full">
                    <Plus className="w-6 h-6 text-white" />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
