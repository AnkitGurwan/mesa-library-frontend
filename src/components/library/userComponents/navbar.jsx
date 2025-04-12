import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // icon library for hamburger
import logo from '../../images/mesa-logo.png';
import AuthContext from '../../../context/auth/AuthContext';

const Navbar = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const logOutHandler = async () => {
        localStorage.clear('studName', 'studId', 'studRoll', 'studJob');
        await logOut();
    };

    return (
        <div className="z-10 w-full h-20 md:h-16 flex items-center justify-between bg-blue-900 font-semibold text-white fixed top-0 px-4 md:px-8">
            {/* Logo */}
            <div className="bg-white rounded-md p-1">
                <img src={logo} alt="logo" className="h-10 w-28 object-contain" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center text-base md:text-lg">
                <Link to={'/library/placements'} className="hover:underline tracking-wide">Placement Stats</Link>
                <Link to={'/library/feedback'} className="hover:underline tracking-wide">Feedback</Link>
                <button onClick={logOutHandler} className="hover:underline hover:scale-105 tracking-tight">Log Out</button>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="absolute top-20 left-0 w-full bg-blue-900 flex flex-col items-center gap-4 py-4 text-base">
                    <Link to={'/library/placements'} onClick={() => setIsOpen(false)} className="hover:underline">Placement Stats</Link>
                    <Link to={'/library/feedback'} onClick={() => setIsOpen(false)} className="hover:underline">Feedback</Link>
                    <button onClick={() => { logOutHandler(); setIsOpen(false); }} className="hover:underline">Log Out</button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
