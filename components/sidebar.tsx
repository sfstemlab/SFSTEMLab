'use client';
import { useState } from 'react';
import { Home, Eye, ShoppingCart, FileText, BarChart, Tag, Users, Layout, Plus } from 'lucide-react';

const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(false);

    const handleDropdown = () => {
        setOpenDropdown(!openDropdown);
    };

    return (
        <div className="min-h-screen flex flex-col bg-indigo-950 backdrop-blur-sm filter bg-opacity-50 border-r border-gray-900 text-gray-200 w-64 z-50">
            <div className="flex flex-col items-center p-4">
                <img
                    className="w-16 h-16 rounded-full mb-4"
                    src="https://via.placeholder.com/150"
                    alt="User Avatar"
                />
                <div className="flex flex-col items-start space-y-3 w-full">
                    <button className="flex items-center p-2 w-full hover:bg-gray-700 rounded-lg">
                        <Home className="w-6 h-6 mr-2" />
                        <span className="hidden md:inline">Dashboard</span>
                    </button>
                    <button className="flex items-center p-2 w-full hover:bg-gray-700 rounded-lg">
                        <Eye className="w-6 h-6 mr-2" />
                        <span className="hidden md:inline">View Site</span>
                    </button>
                    <button className="flex items-center p-2 w-full hover:bg-gray-700 rounded-lg">
                        <ShoppingCart className="w-6 h-6 mr-2" />
                        <span className="hidden md:inline">Marketplace</span>
                    </button>
                    <button className="flex items-center p-2 w-full hover:bg-gray-700 rounded-lg" onClick={handleDropdown}>
                        <FileText className="w-6 h-6 mr-2" />
                        <span className="hidden md:inline">Posts</span>
                    </button>
                    {openDropdown && (
                        <div className="ml-10 mt-2 bg-gray-800 rounded-lg shadow-lg w-full">
                            <button className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left">
                                Create post
                            </button>
                            <button className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left">
                                Create folder
                            </button>
                            <button className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left">
                                Create project
                            </button>
                        </div>
                    )}
                    <button className="flex items-center p-2 w-full hover:bg-gray-700 rounded-lg">
                        <BarChart className="w-6 h-6 mr-2" />
                        <span className="hidden md:inline">Performance</span>
                    </button>
                    <button className="flex items-center p-2 w-full hover:bg-gray-700 rounded-lg">
                        <Tag className="w-6 h-6 mr-2" />
                        <span className="hidden md:inline">Tags</span>
                    </button>
                    <button className="flex items-center p-2 w-full hover:bg-gray-700 rounded-lg">
                        <Users className="w-6 h-6 mr-2" />
                        <span className="hidden md:inline">Members</span>
                    </button>
                    <button className="flex items-center p-2 w-full hover:bg-gray-700 rounded-lg">
                        <Layout className="w-6 h-6 mr-2" />
                        <span className="hidden md:inline">Design</span>
                    </button>
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

