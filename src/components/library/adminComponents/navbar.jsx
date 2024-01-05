import React from 'react'
import { useNavigate } from 'react-router-dom';


const navbar = () => {
    const Navigate = useNavigate();

    const logOutHandler = async ()=>{
        localStorage.removeItem('btpToken');
        Navigate('/library');
    }

  return (
        <div className='w-full h-16 text-end border-b flex items-center justify-end'>
            <button onClick={logOutHandler} className='text-white bg-black py-1 px-2 h-8 mr-4 rounded-sm cursor-pointer'>Log Out</button>
        </div>
  )
}

export default navbar