import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <navbar className='flex w-full justify-between mb-3 pt-2 md:pt-4 px-4 md:px-16 items-center'>
            <div className='flex items-center'>
                <img className='h-12 md:h-20 w-20 md:w-40' src='https://iitg.ac.in/clubs/mesa/images/logo4.png' alt='mesa logo'/>
            </div>
            
            <div className='flex pr-2 md:pr-12 items-center '>
                <div className='flex flex-col hover:scale-105'>
                    <div className='px-1 md:px-5 font-Manrope font-medium cursor-pointer  text-xs md:text-lg text-gray-500'>About us</div>
                    <div className='px-1 md:px-4'><hr style={{"height":"2px","font":"gray","backgroundColor":"gray"}}/></div>
                </div>
                <div className='px-1 md:px-5 font-Manrope font-medium cursor-pointer hover:scale-105 text-xs md:text-lg text-gray-500'>Events</div>
                <Link to="/team" className='px-5 font-Manrope font-medium cursor-pointer hover:scale-105 text-xs md:text-lg text-gray-500'>Our Team</Link>
                <div className='px-1 md:px-5 flex font-Manrope font-medium cursor-pointer hover:scale-105 text-xs md:text-lg text-gray-500'>
                    <div className=''>Library</div>
                    <div className='text-[6px] pb-2 px-1 text-black'>NEW</div>
                </div>
            </div>
        </navbar>
     );
}
 
export default Navbar;