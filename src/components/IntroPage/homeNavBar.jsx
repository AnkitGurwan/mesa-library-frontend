import { Link, NavLink } from "react-router-dom";


const Navbar = () => {
    const navbarPages = [
        ['About Us', '/'],
        ['Events', '/events'],
        ['Team', '/team'],
        ['Library', '/library'],
    ]


    return (
        <navbar className="mb-10">
            <div className='flex h-contain w-full flex-row justify-center sm:justify-between align-center items-center'>
                <Link to={'/'}>
                    <img className="w-[200px] sm:w-[225px] ml-3 mt-2" src='https://iitg.ac.in/clubs/mesa/images/logo4.png' alt="Mesa Logo" />
                </Link>
                <div>
                    {/* to show which page is active the styling is done in index.css */}
                    <div className="hidden sm:flex">
                        {navbarPages.map(([title, url]) => (
                            <NavLink to={url} className="rounded-lg px-3 py-2 text-slate-700 font-semibold text-lg lg:text-[22px] ml:5 last:mr-10 lg:ml-10 lg:last:mr-20 hover:bg-slate-100 hover:text-slate-900"  >{title}</NavLink>
                        ))}
                    </div>
                </div>
            </div>
            <div className="sm:hidden">
                <div className="flex flex-row justify-between max-[380px]:mx-0 mx-10  p-3" >
                    {navbarPages.map(([title, url]) => (
                        <NavLink to={url}>{title}</NavLink>
                    ))}
                </div>
            </div>
            <hr className="w-full bg-slate-400/0.3 shadow-[5px_5px_15px_rgba(0,67,101,1)]" />
        </navbar>
    );
}

export default Navbar;