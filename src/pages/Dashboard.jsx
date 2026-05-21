import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../admin/AdminSidebar';
import { Menu } from 'lucide-react';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden text-left relative">
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Mobile Hamburger Toggle */}
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="md:hidden absolute top-[18px] left-4 z-30 p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 hover:text-primary transition-colors hover:bg-gray-50"
                    title="Open Menu"
                >
                    <Menu size={20} />
                </button>
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
