"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  UsersRound,
  Calendar,
  Menu,
  X,
  HandHeart,
  Bot,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "../lib/utils";

const Navbar = () => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const links = [
        { href: "/", label: "Home", icon: Home },
        { href: "/about", label: "About Us", icon: UsersRound },
        { href: "/events", label: "Events", icon: Calendar },
        // { href: "/robotics", label: "Robotics", icon: Bot}
    ];


    const linkVariants = {
        hidden: { opacity: 1, x: -20 },
        visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.1 + 0.3, duration: 1 },
        }),
    };

    const mobileMenuVariants = {
        open: { 
        opacity: 1,
        height: "auto",
        transition: { 
            staggerChildren: 0.1,
            when: "beforeChildren"
        }
        },
        closed: { 
        opacity: 0,
        height: 0,
        transition: { 
            staggerChildren: 0.05,
            staggerDirection: -1,
            when: "afterChildren"
        }
        }
    };

    const mobileLinkVariants = {
        open: { y: 0, opacity: 1 },
        closed: { y: 20, opacity: 0 },
    };

    return (
        <nav className="sticky top-0 z-50 bg-white backdrop-blur-lg shadow-lg shadow-gray-400/10 w-screen m-0 p-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo Section */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0 flex items-center"
                    >
                        <Link className="flex items-center space-x-2" href="/">
                            <motion.img
                                src="/images/Logo.png"
                                alt="SF STEMLab Logo"
                                className="h-12 w-12 hover:animate-spin"
                                transition={{ duration: 0.5 }}
                            />
                            <span className="text-black font-bold text-xl">SF STEM Lab</span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:justify-between w-3/5 lg:w-1/2 items-center">
                        {links.map(({ href, label, icon: Icon }, i) => (
                            <motion.div
                                key={href}
                                variants={linkVariants}
                                custom={i}
                                className="relative"
                            >
                                <Link
                                    href={href}
                                    className={cn(
                                        'flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300',
                                        href == pathname
                                            ? 'bg-[#1e439d] text-white px-4 py-3'
                                            : 'text-gray-600 bg-brand hover:bg-cardColor hover:text-white hover:scale-110 border-brand transition duration-400 ease-in-out'
                                    )}
                                >
                                    <Icon className="w-5 h-5 mr-2" />
                                    {label}
                                </Link>
                            </motion.div>
                        ))}
                        <Link
                            href="/donate"
                            //   styling for shine hover effect - dont change this code
                            style={{
                                backgroundColor: '#cc1616',
                                backgroundImage:
                                    'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.8) 100%)',
                                backgroundSize: '200% 100%',
                                backgroundPosition: '-100% 0',
                                backgroundRepeat: 'no-repeat',
                                transition: 'background-position 0.5s ease',
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundPosition = '200% 0')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundPosition = '-100% 0')
                            }
                            className="w-28 h-10 rounded-lg text-white font-bold flex items-center justify-center"
                        >
                            <HandHeart className="w-5 h-5 mr-2" />
                            Donate
                        </Link>
                    </div>
                    <Link
                        href="/donate"
                        //   styling for shine hover effect - dont change this code
                        style={{
                            backgroundImage:
                                'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.8) 100%)',
                            backgroundSize: '200% 100%',
                            backgroundPosition: '-100% 0',
                            backgroundRepeat: 'no-repeat',
                            transition: 'background-position 0.5s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundPosition = '200% 0')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundPosition = '-100% 0')}
                        className={`md:hidden w-full h-10 ml-4 mr-2 rounded-lg text-white font-bold text-sm flex items-center justify-center ${pathname === '/donate' ? 'bg-redBrand-light' : 'bg-redBrand'}`}
                    >
                        <HandHeart className="w-5 h-5 mr-2" />
                        Donate
                    </Link>
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                        <motion.div animate={isMobileMenuOpen ? 'open' : 'closed'}>
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </motion.div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={mobileMenuVariants}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="pt-2 pb-4 space-y-1">
                                {links.map(({ href, label, icon: Icon }) => (
                                    <motion.div
                                        key={href}
                                        variants={mobileLinkVariants}
                                        className="px-4 py-2"
                                    >
                                        <Link
                                            href={href}
                                            className={cn(
                                                'flex items-center px-4 py-3 rounded-lg text-base font-medium',
                                                pathname === href
                                                    ? 'bg-[#1e439d] text-white px-4 py-3'
                                                    : 'text-gray-600 bg-brand hover:bg-white transition duration-300 ease-in-out'
                                            )}
                                        >
                                            <Icon className="w-5 h-5 mr-3" />
                                            {label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;