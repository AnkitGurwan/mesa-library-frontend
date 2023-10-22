import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/mesa-logo.png';

const Navbar = ({pathState,pathHandler}) => {
    const Navigate = useNavigate();
    return (

            <div className='z-10 w-full flex-col items-center justify-between bg-blue-900 font-semibold text-white absolute top-0'>
                <div className='flex flex-row justify-between text-center align-center p-2 max-[450px]:flex-row'>   
                    <div className='bg-white ml-3 rounded-md'>
                        <img src= {logo} alt="logo" className="w-[150px] object-fit" />
                    </div>
                    <div className='flex text-center align-center max-[500px]:flex-col'>
                        <Link className='tracking-wide hover:underline hover:scale-105 px-2 mr-5 cursor-pointer text-xl mt-5 max-[500px]:p-0 max-[500px]:mt-0 max-[500px]:text-lg' to={'/feedback'}>Feedback</Link>
                        <button onClick={()=>{Navigate('/')}} className='tracking-tight hover:underline hover:scale-105 px-2 mr-5 cursor-pointer text-xl max-[500px]:p-0 max-[500px]:text-lg'>Log Out</button>
                    </div>
                </div>
                <div className='z-10 flex justify-between items-center py-3 text-lg bg-blue-200 font-bold text-gray-600 border-blue-200 border-y-4  w-full h-12'>
                    <div className='flex mx-5'>
                        {
                        pathState
                        ?
                        pathState.map((indPath) => { return <div className='flex items-center'><button onClick={pathHandler} className='mr-2 cursor-pointer capitalize hover:bg-blue-900 px-1 rounded-sm hover:text-blue-200 transition ease-in-out delay-150'>{indPath}</button>
                        <div className='mr-2'>{`>`}</div></div>}):""
                        }
                    </div>
                </div>
                
            </div>
    )
}

export default Navbar