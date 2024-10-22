import React, { useState } from 'react'
import { assets } from './assets'
import { NavLink, useNavigate,useLocation } from 'react-router-dom';
// import Avatar from '@mui/material/Avatar';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const [token,setToken] = useState(true);

    const getNavbarBgColor = () => {
        if (location.pathname === '/') {
            return 'bg-main'; // Default background for home
        } else if(location.pathname.startsWith('/appointments')){
            return 'bg-green';
        } else {
            return 'bg-purple'; // Change this to your desired color class
        }
    };  

  return (
    <nav className={`flex items-center justify-between text-sm py-4 px-8 lg:px-16 z-10 relative ${getNavbarBgColor()}`}> 
        <img onClick={()=> navigate('/')} className='w-[250px] h-[60px] cursor-pointer rounded-lg' src={assets.logo} alt="" />
        {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" /> */}
        <ul className='hidden md:flex items-start gap-5 lg:gap-12 font-medium'>
            <NavLink to='/'>
                <li className='py-1 text-base text-white hover:text-primary'>Home</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1 text-base text-white hover:text-primary'>Find Doctors</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1 text-base text-white hover:text-primary'>About</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1 text-base text-white hover:text-primary'>Contact</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            {
                token
                ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className="w-8 h-8 rounded-full "src={assets.profilepic} alt="user-picture" />
                    <img className="w-2.5"src={assets.dropdown} alt="drodownicon" />
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                            <p onClick={()=>navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={()=>navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                            <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div>
                : <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Login</button>
            }
            
        </div>
    </nav>
  )
}

export default Navbar