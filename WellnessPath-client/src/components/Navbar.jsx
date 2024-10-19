import React, { useState } from 'react'
import { assets } from './assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const [token,setToken] = useState(true);

  return (
    <nav className='flex items-center justify-between bg-blue-600 text-sm py-4 px-8 lg:px-16 fixed z-10 top-0 left-0 right-0'>
        <img className='w-[250px] h-[60px] cursor-pointer rounded-lg' src={assets.logo} alt="" />
        <ul className='hidden md:flex items-start gap-5 lg:gap-12 font-medium'>
            <NavLink to='/'>
                <li className='py-1 text-base text-white hover:text-primary'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1 text-base text-white hover:text-primary'>FIND A DOCTOR</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1 text-base text-white hover:text-primary'>ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1 text-base text-white hover:text-primary'>CONTACT</li>
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