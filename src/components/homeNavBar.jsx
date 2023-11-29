import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <navbar className='flex justify-between mb-3 py-4 px-16 items-center'>
            <div className='flex items-center'>
                <img className='h-20 w-40' src='https://iitg.ac.in/clubs/mesa/images/logo4.png' alt='mesa logo'/>
            </div>
            
            <div className='flex pr-12 items-center '>
                <div className='flex flex-col hover:scale-105'>
                    <div className='px-5 font-Manrope font-medium cursor-pointer  text-lg text-gray-500'>About us</div>
                    <div className='px-4'><hr style={{"height":"2px","font":"gray","backgroundColor":"gray"}}/></div>
                </div>
                <div className='px-5 font-Manrope font-medium cursor-pointer hover:scale-105 text-lg text-gray-500'>Events</div>
                <Link to="/team" className='px-5 font-Manrope font-medium cursor-pointer hover:scale-105 text-lg text-gray-500'>Our Team</Link>
                <div className='px-5 flex font-Manrope font-medium cursor-pointer hover:scale-105 text-lg text-gray-500'>
                    <div className=''>Library</div>
                    <div className='text-xs pb-2 px-1 text-black'>NEW</div>
                </div>
            </div>
        </navbar>
     );
}
 
export default Navbar;