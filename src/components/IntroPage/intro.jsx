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
    <div>
        <Navbar/>

        <div className='mt-10 mx-2 sm:mx-16 px-4 pt-7 pb-2 bg-blue-400 text-white font-Manrope'>
            <div className='sm:px-4 pt-2 pb-6 font-semibold'>
                <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'We provide Academic Resources.',
                        2000, // wait 1s before replacing "Mice" with "Hamsters"
                        'We conduct Workshops and Seminars.',
                        2000,
                        'We are fun.',
                        2000,
                        'We are Mechanical.',
                        2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ "display": "inline-block" }}
                    repeat={Infinity}
                    className='h-[65px] max-[300px]:h-[100px] sm:h-[72px] md:h-[50px] text-2xl sm:text-3xl'
                    />
            </div>
            <div className='flex'>
                <div className='px-4 mb-7'>MESA connects you to the world outside the walls of your classroom and to that in the cubicle. We aim to be the cornerstone of the all-round deveploment of our student community by providing academic resources to conducting workshops and talks. We plan to be an integral part of your campus life from your Induction to Freshers' Party to Convocation to your Farewell Party.</div>
            </div>
        </div>

        <div className='my-16 mx-2 sm:mx-16'>
            <div>
                <Carousel
                    autoPlay={true}
                    interval={2500}
                    infiniteLoop={true}
                    showThumbs={false}>
                    <div>
                        <img src="https://iitg.ac.in/clubs/mesa/images/cropped-bg_2000x700.jpg" alt='img 1'/>
                    </div>
                    <div>
                        <img src="https://iitg.ac.in/clubs/mesa/images/cropped-bg2_2000x700.jpg" alt='img 2'/>
                    </div>
                    <div>
                        <img src="https://iitg.ac.in/clubs/mesa/images/cropped-bg3_2000x700.jpg" alt='img 3'/>
                    </div>
                </Carousel>
            </div>

        </div>
        <Announcements/>
        <Footer/>
    </div>
  )
}

export default intro