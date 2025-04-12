import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../library/adminComponents/navbar';

const Body = () => {
    return(
        <div className='h-screen'>
            <Navbar/>
            <div className='flex flex-wrap justify-center items-center h-auto md:h-[70vh]'>
                <div className="w-48 h-48 md:w-[14.375rem] md:h-[14.375rem] rounded-full flex justify-center items-center m-8 md:m-10 shadow-md bg-no-repeat bg-contain bg-center" 
                    style={{backgroundImage: "url('https://www.isponline.org/wp-content/uploads/sites/71/2020/05/TeachersTrained-1024x1024.png')"}}>
                    <Link 
                        // to='/placements/add' 
                        to='/library/placements/add' 
                        className="box-border no-underline rounded px-2 py-2 bg-[#FB2576] text-black font-serif text-lg md:text-[1.5rem] font-semibold"
                    >
                        Contribute
                    </Link>
                </div>
                <div className="w-48 h-48 md:w-[14.375rem] md:h-[14.375rem] rounded-full flex justify-center items-center m-8 md:m-10 shadow-md bg-no-repeat bg-contain bg-center" 
                    style={{backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/3334/3334309.png')"}}>
                    <Link 
                        // to='/placements/all' 
                        to='/library/placements/all' 
                        className="box-border no-underline rounded px-2 py-2 bg-[#FB2576] text-black font-serif text-lg md:text-[1.5rem] font-semibold"
                    >
                        Experiences
                    </Link>
                </div>
            </div> 
        </div>
    )
}

export default Body;