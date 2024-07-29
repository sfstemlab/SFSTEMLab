'use client';
import { useState } from 'react';
import { Home, Book, Settings, Swords, Shuffle } from 'lucide-react';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Card from './card';


const Navbar = () => {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/sets', label: 'Sets', icon: Book },
        { href: '/games', label: 'Games', icon: Swords },
        { href: '/settings', label: 'Settings', icon: Settings }

    ];


    return (
        <div>
            <div className="z-20 sticky top-0 min-w-screen flex bg-gradient-to-r saturate-50 from-purple-800 to-indigo-900 backdrop-blur-sm filter bg-opacity-60 text-black h-18 shadow-xl shadow-purple-500/30">
                <div className="flex tems-center justify-around m-4 w-full">
                    {links.map(({ href, label, icon: Icon }) => (
                        <div key={href} className="z-40">
                            <Link href={href} className={cn("flex items-center p-2 w-full rounded-lg transition duration-300 hover:drop-shadow shadow-inherit", {
                                'bg-emerald-500 hover:bg-emerald-400': pathname === href,
                                'bg-gray-400 hover:bg-gray-300': pathname !== href
                            })}>
                                <Icon className="w-6 h-6 md:mr-2" />
                                <span className="hidden md:inline">{label}</span>
                            </Link>
                            
                        </div>
                    ))}
                </div>
                {/* <div className="flex flex-col text-center px-2 m-3 rounded-lg bg-gray-600">
                    <div className="flex items-center justify-between mx-3">
                        <p>Random Card!</p>
                        <button className="p-1 m-1 bg-white/70 text-black rounded-md hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out">

                            <Shuffle />
                        </button>
                    </div>
                    <Card 
                        cardName={'Dandân'} 
                        cardImage={'https://cards.scryfall.io/normal/front/a/c/ac2e32d0-f172-4934-9d73-1bc2ab86586e.jpg?1562781784'} 
                        prices={{
                            usd: '',
                            eur: '',
                            tix: ''
                        }}
                        edhrec_link={''} 
                    />
                </div> */}
            </div>
        </div>
    );
};

export default Navbar;
