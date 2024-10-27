import React, { useContext, useState } from 'react';
import { assets } from './assets';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken } = useContext(AppContext);

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token');
    }

    const getNavbarBgColor = () => {
        if (location.pathname === '/') {
            return 'bg-main'; // Default background for home
        } else if (location.pathname.startsWith('/appointments')) {
            return 'bg-green';
        } else {
            return 'bg-purple'; // Desired color class for other pages
        }
    };

    return (
        <nav className={`flex items-center w-full justify-between text-sm py-4 px-2 lg:px-16 z-10 relative ${getNavbarBgColor()}`}>
            {/* Logo (hidden on mobile) */}
            <img
                onClick={() => navigate('/')}
                className='w-[250px] h-[60px] cursor-pointer rounded-lg hidden md:block'
                src={assets.logo}
                alt="Tablet/DesktopLogo"
            />
            {/* Mobile logo (hidden on tablet/desktop) */}
            <img
                onClick={() => navigate('/')}
                className='w-[200px] h-[135px] cursor-pointer rounded-lg md:hidden'
                src={assets.logo_mobile}
                alt="Mobile Logo"
            />
            {/* Tablet and desktop view nav bar (hidden on mobile) */}
            <ul className='hidden md:flex items-start gap-5 lg:gap-12 font-medium'>
                <NavLink to='/' activeClassName="text-primary">
                    <li className='py-1 text-base text-white hover:text-primary'>Home</li>
                </NavLink>
                <NavLink to='/doctors' activeClassName="text-primary">
                    <li className='py-1 text-base text-white hover:text-primary'>Find Doctors</li>
                </NavLink>
                <NavLink to='/about' activeClassName="text-primary">
                    <li className='py-1 text-base text-white hover:text-primary'>About</li>
                </NavLink>
                <NavLink to='/contact' activeClassName="text-primary">
                    <li className='py-1 text-base text-white hover:text-primary'>Contact</li>
                </NavLink>
            </ul>

            <div className='flex items-center gap-4'>
                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="Menu Icon" />
                {token ? (
                    <div className='flex items-center gap-2 cursor-pointer group relative'>
                        <img className="w-8 h-8 rounded-full object-cover" src={assets.profilepic} alt="User" />
                        <img className="w-2.5 text-white" src={assets.dropdown} alt="Dropdown Icon" />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-100 hidden group-hover:block'>
                        <div className='min-w-48 bg-graphite rounded flex flex-col gap-4 p-4'>
                                <p onClick={() => navigate('my-profile')} className='hover:text-black text-white cursor-pointer'>My Profile</p>
                                <p onClick={() => navigate('my-appointments')} className='hover:text-black  text-white cursor-pointer'>My Appointments</p>
                                <p onClick={logout} className='hover:text-black  text-white cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Login</button>
                )}
            </div>

            {showMenu && (
                <div className={`fixed w-full h-full top-0 right-0 z-50 bg-stone-100 md:hidden transition-all ${getNavbarBgColor()}`}>
                    <div className='flex justify-between items-center p-4'>
                        <img onClick={() => setShowMenu(false)} className='w-6 cursor-pointer' src={assets.cross_icon} alt="Close Icon" />
                    </div>
                    <ul className='flex flex-col items-center mt-8 space-y-4'>
                        <NavLink to='/' onClick={() => { setShowMenu(false); navigate('/'); }} activeClassName="text-primary">
                            <li className='text-white text-lg'>Home</li>
                        </NavLink>
                        <NavLink to='/doctors' onClick={() => { setShowMenu(false); navigate('/doctors'); }} activeClassName="text-primary">
                            <li className='text-white text-lg'>Find Doctors</li>
                        </NavLink>
                        <NavLink to='/about' onClick={() => { setShowMenu(false); navigate('/about'); }} activeClassName="text-primary">
                            <li className='text-white text-lg'>About</li>
                        </NavLink>
                        <NavLink to='/contact' onClick={() => { setShowMenu(false); navigate('/contact'); }} activeClassName="text-primary">
                            <li className='text-white text-lg'>Contact</li>
                        </NavLink>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
