import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Package, X, LogOut, BookText } from 'lucide-react';
import { LogoBlue } from '../assets';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import LogoutModal from './LogoutModal';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);

    const handleLogout = async () => {
        await dispatch(logout());
        setIsLogoutModalOpen(false);
        navigate('/');
    };

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)} />}

            <aside className={`w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 shadow-sm z-50 h-full
                fixed md:static inset-y-0 left-0 transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="h-20 flex items-center justify-between px-8 border-b border-gray-100">
                    <img src={LogoBlue} alt="Tripscribe" />
                    <button className="md:hidden p-1 text-gray-500 hover:text-gray-900" onClick={() => setIsOpen(false)}>
                        <X size={20} />
                    </button>
                </div>
                <div className="flex-1 flex flex-col py-6 px-4 gap-2 overflow-y-auto">
                    <NavLink
                        to="/dashboard/stays"
                        className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${isActive
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'text-gray-500 hover:bg-gray-100'
                            }`}
                    >
                        {({ isActive }) => (
                            <>
                                <Home size={20} className={isActive ? 'text-primary' : 'text-gray-400'} />
                                Stays
                            </>
                        )}
                    </NavLink>
                    <NavLink
                        to="/dashboard/blogs"
                        className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${isActive
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'text-gray-500 hover:bg-gray-100'
                            }`}
                    >
                        {({ isActive }) => (
                            <>
                                <BookText size={20} className={isActive ? 'text-primary' : 'text-gray-400'} />
                                Blogs
                            </>
                        )}
                    </NavLink>
                    <NavLink
                        to="/dashboard/packages"
                        className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${isActive
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'text-gray-500 hover:bg-gray-100'
                            }`}
                    >
                        {({ isActive }) => (
                            <>
                                <Package size={20} className={isActive ? 'text-primary' : 'text-gray-400'} />
                                Packages
                            </>
                        )}
                    </NavLink>
                </div>

                <div className="p-4 border-t border-gray-100 mt-auto">
                    <button
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-1 border-red-500 hover:cursor-pointer font-semibold text-red-500 hover:bg-red-50 transition-all duration-200"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />
        </>
    );
};

export default AdminSidebar;
