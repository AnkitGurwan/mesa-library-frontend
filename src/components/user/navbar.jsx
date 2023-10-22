import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/mesa-logo.png';

const Navbar = () => {
    const Navigate = useNavigate();
    return (
            <div className='z-10 w-full h-20 md:h-16 flex items-center justify-between bg-blue-900 font-semibold text-white absolute top-0'>
                <div className='bg-white ml-3 md:ml-6 rounded-md'>
                    <img src= {logo} alt="logo" className="h-12 w-32 object-fit" />
                </div>
                <div>
                    <Link className='px-5 text-lg md:text-xl hover:underline tracking-wide' to={'/feedback'}>Feedback</Link>
                    <button onClick={()=>{Navigate('/')}} className='tracking-tight hover:underline hover:scale-105 px-2 mr-5 cursor-pointer text-lg md:text-xl'>Log Out</button>
                </div>
                
            </div>
    )
}

export default Navbar