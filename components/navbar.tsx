'use client';

import { useState } from 'react';
import {
  Home,
  Book,
  Settings,
  Swords,
  Shuffle,
  Menu,
  X,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/sets', label: 'Sets', icon: Book },
    { href: '/games', label: 'Games', icon: Swords },
    // 'Account' will be handled separately with UserButton
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 backdrop-blur-sm shadow-lg shadow-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link className="flex items-center space-x-2" href="/">
              
                {/* Replace with your logo */}
                <img
                  src="/logo.svg"
                  alt="MTG Pack Simulator Logo"
                  className="h-8 w-8"
                />
                <span className="text-white font-bold text-xl">MTG Simulator</span>
              
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-4">
            {links.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}
                
                  className={cn(
                    'flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-300',
                    pathname === href
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-700 text-emerald-500 hover:bg-gray-600 hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
            
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Shuffle Button (Example Feature) */}
            <button
              aria-label="Shuffle Cards"
              className="p-2 bg-gray-700 text-emerald-500 rounded-full hover:bg-emerald-500 hover:text-white transition duration-300"
              onClick={() => {
                // Implement shuffle functionality
                console.log('Shuffle clicked');
              }}
            >
              <Shuffle className="w-5 h-5" />
            </button>

            {/* User Button */}
            <UserButton
              userProfileUrl="/account"
              afterSignOutUrl="/"
            />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-emerald-500 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}
                className={cn(
                        'flex items-center px-3 py-2 rounded-md text-base font-medium transition duration-300',
                        pathname === href
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-700 text-emerald-500 hover:bg-gray-600 hover:text-white'
                    )}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
              </Link>
            ))}

            {/* Additional Mobile Links or Actions */}
            {/* Example: External Link */}
            <Link
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium bg-gray-700 text-emerald-500 hover:bg-gray-600 hover:text-white transition duration-300"
            >
              <Book className="w-5 h-5 mr-2" />
              External Resource
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
