import React from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Navbar from './homeNavBar';
import Footer from './footer';
import Announcements from './announcements';


const intro = () => {
  return (
    <div className='absolute'>
            <Navbar/>

        {/* <div className='relative top-0'> */}
            

            <div className='relative top-0 mt-8 md:mt-8 mb-96 md:mb-8 mx-0 md:mx-8'>
                <div className='w-full h-1/2 flex justify-end'>
                    <Carousel
                        className='w-full'
                        autoPlay={true}
                        interval={2000}
                        infiniteLoop={true}
                        showThumbs={false}>
                        <div>
                            <img className='brightness-75' src="https://iitg.ac.in/clubs/mesa/images/cropped-bg_2000x700.jpg" alt='img 1'/>
                        </div>
                        <div>
                            <img className='brightness-75' src="https://iitg.ac.in/clubs/mesa/images/cropped-bg2_2000x700.jpg" alt='img 2'/>
                        </div>
                        <div>
                            <img className='brightness-75' src="https://iitg.ac.in/clubs/mesa/images/cropped-bg3_2000x700.jpg" alt='img 3'/>
                        </div>
                    </Carousel>
                </div>
            </div>
            <div className='md:w-[42%] lg:w-[46%] mt-6 mx-8 px-2 py-6 md:py-3 bg-blue-400 text-white font-Manrope z-10 absolute top-[28rem] md:top-[12.7rem] lg:top-[13.7rem]'>
                <div className='px-3 md:px-2 py-3 font-semibold'>
                    <TypeAnimation
                        sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'We are Mechanical.',
                        2000,
                        'We provide Academic Resources.',
                        2000, // wait 1s before replacing "Mice" with "Hamsters"
                        'We conduct Workshops and Seminars.',
                        2000,
                        'We are fun.',
                        2000,
                        
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ "display": "inline-block" }}
                        repeat={0}
                        className='pb-2 text-3xl'
                        />
                </div>
                <div className='flex'>
                    <div className='px-3 md:px-2 text-[18px] md:text-[14px]'>MESA connects you to the world outside the walls of your classroom and to that in the cubicle. We aim to be the cornerstone of the all-round deveploment of our student community by providing academic resources to conducting workshops and talks. We plan to be an integral part of your campus life from your Induction to Freshers' Party to Convocation to your Farewell Party.</div>
                </div>
            </div>
        {/* </div> */}

        <Announcements/>
        <Footer/>
    </div>
  )
}

export default intro