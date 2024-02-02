import React from 'react';
import { Link } from 'react-router-dom';


const Merch = () => {
    
    
    return (
        <div className='flex flex-col md:flex-row bg-gray-200 h-fit md:h-full' >
            <div className='md:w-1/2 px-12 md:px-20 pt-16 md:pt-32'>
                <div className='text-sm font-medium uppercase py-2 text-gray-900' style={{"fontFamily":"Manrope"}}>MESA Merch - T-Shirts</div>
                <div className='text-2xl font-extrabold pt-1 text-blue-950' style={{"fontFamily":"Raleway"}}>Discover the Universe of Style with MESA.</div>
                <div className='py-6 text-lg text-gray-900'>Elevate your wardrobe with cosmic vibes - it's not just a shirt, it's a journey.</div>
                <div className='flex items-center py-2'>
                    <div className='py-2 px-4 border border-gray-400 text-gray-900'>Engineered for style, designed for engineers.</div>
                    <Link to="" className='bg-violet-600 py-2 px-4 text-white border border-violet-600 hover:bg-violet-700'>Buy Now</Link>
                </div>
            </div>
            <div className='mx-auto md:mx-8 my-16 md:my-0 md:relative'>
                <img className='md:absolute top-[19.4rem] left-0 md:left-64 object-cover w-72 md:w-60 h-72 md:h-60 border md:border-none border-blue-400 rounded-xl rotate-12 md:rotate-0 bg-blue-400 md:bg-transparent' src='https://i.postimg.cc/x8X91hJ4/51513438-8af5-46bf-bbfe-ca17ee97e464.png' alt='image4'/>
                <img className='z-10 rounded-xl border border-blue-400 bg-blue-400 md:bg-transparent md:absolute top-[12.5rem] left-0 object-cover w-72 md:w-[21.5rem] h-72 md:h-[21.5rem]' src='https://i.postimg.cc/J7xXDky3/1495289c-3757-4d1b-8243-a4788ab3df35.png' alt='image3'/>
                <img className='z-0 rounded-xl border border-violet-400 bg-violet-400 md:bg-transparent md:absolute top-[8rem] md:top-[4.5rem] left-0 md:left-[22rem] object-cover w-72 md:w-52 h-72 md:h-52 -rotate-12 md:rotate-12' src='https://i.postimg.cc/pdkvYRKS/22803ec2-bc0b-4436-b123-cdb691d79f9e.png' alt='image2'/>
                <img className='ml-0 md:ml-32 object-cover w-72 bg-violet-400 md:bg-transparent md:w-[18rem] h-72 md:h-[18rem] z-10 border md:border-none border-violet-400 rounded-xl' src='https://i.postimg.cc/3JDK5MHy/21c3e7f2-e067-495a-a151-48128760e4a5.png' alt='image1'/>
            </div>
        </div>)
}

export default Merch