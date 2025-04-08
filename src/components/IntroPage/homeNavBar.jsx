import { Link, NavLink } from "react-router-dom";


const Navbar = () => {
    const navbarPages = [
        ['About Us', '/'],
        ['Events', '/events'],
        ['Team', '/team'],
        ['Placments', "/placements"],
        ['Library', '/library'],
    ]


    return (
        <navbar className="bg-white z-10">
            <div className='shadow-xl flex py-3 h-contain w-full flex-row justify-center md:justify-between align-center items-center'>
                <Link to={'/'}>
                    <img className="h-20 w-[200px] sm:w-[225px] sm:ml-10 mt-2" src='https://iitg.ac.in/clubs/mesa/images/logo4.png' alt="Mesa Logo" />
                </Link>
                <div>
                    {/* to show which page is active the styling is done in index.css */}
                    <div className="hidden md:flex">
                        {navbarPages.map(([title, url]) => (
                            <NavLink to={url} className="rounded-lg px-1 py-2 ml-3 text-slate-700 font-semibold text-lg lg:text-[20px] ml:5 last:mr-10 lg:ml-10 lg:last:mr-20 hover:bg-slate-100 hover:text-slate-900">{title}</NavLink>
                        ))}
                    </div>
                </div>
            </div>
            <div className="md:hidden">
                <div className="flex bg-white flex-row flex-wrap justify-center max-[320px]:mx-1 text-lg p-5" >
                    {navbarPages.map(([title, url]) => (
                        <NavLink className="mx-4 my-1" to={url}>{title}</NavLink>
                    ))}
                </div>
            </div>
            {/* <hr className="w-full bg-slate-400/0.3 shadow-[5px_5px_15px_rgba(0,67,101,1)]" /> */}
        </navbar>
    );
}

export default Navbar;