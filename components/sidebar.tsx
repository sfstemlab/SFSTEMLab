'use client';
import { useState } from 'react';
import { Home, Eye, ShoppingCart, FileText, BarChart, Tag, Users, Layout, Plus, Settings, Sparkles, Swords } from 'lucide-react';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Card from './card';


const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const pathname = usePathname();

    const handleDropdown = () => {
        setOpenDropdown(!openDropdown);
    };

    const links = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/games', label: 'Games', icon: Swords },
        { href: '/posts', label: 'Posts', icon: FileText, dropdown: true },
        { href: '/marketplace', label: 'Marketplace', icon: ShoppingCart },
        { href: '/members', label: 'Members', icon: Users },
        { href: '/design', label: 'Design', icon: Sparkles },
        { href: '/settings', label: 'Settings', icon: Settings },

    ];


    return (
        <div className="min-h-screen flex flex-col bg-[#1a202c] backdrop-blur-sm filter bg-opacity-50 border-r border-gray-900 text-gray-200 w-72">
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
            <div className="flex flex-col text-center py-2 px-12 m-3 rounded-lg bg-gray-600">
                <p>Card of the Day</p>
                <Card 
                    cardName={'Dandân'} 
                    cardImage={'https://api.https://cards.scryfall.io/normal/front/a/c/ac2e32d0-f172-4934-9d73-1bc2ab86586e.jpg?1562781784'} 
                    prices={{
                        usd: '',
                        eur: '',
                        tix: ''
                    }}
                    edhrec_link={''} 
                />
            </div>
        </div>
    );
};

export default Sidebar;
