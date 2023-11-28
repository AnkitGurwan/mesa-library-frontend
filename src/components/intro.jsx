import React from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


const intro = () => {
  return (
    <div>
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
                <div className='px-5 font-Manrope font-medium cursor-pointer hover:scale-105 text-lg text-gray-500'>Our Team</div>
                <div className='px-5 flex font-Manrope font-medium cursor-pointer hover:scale-105 text-lg text-gray-500'>
                    <div className=''>Library</div>
                    <div className='text-xs pb-2 px-1 text-black'>NEW</div>
                </div>
            </div>
        </navbar>

        <div className='mx-16 px-4 py-7 bg-blue-400 text-white font-Manrope'>
            <div className='px-4 pt-2 pb-6 font-semibold'>
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
                    style={{ "fontSize" : "2em" , "display": "inline-block" }}
                    repeat={0}
                    />
            </div>
            <div className='flex'>
                <div className='px-4'>MESA connects you to the world outside the walls of your classroom and to that in the cubicle. We aim to be the cornerstone of the all-round deveploment of our student community by providing academic resources to conducting workshops and talks. We plan to be an integral part of your campus life from your Induction to Freshers' Party to Convocation to your Farewell Party.</div>
            </div>
        </div>

        <div className='my-8 mx-16'>
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

            <div>
                <div>Anouncements</div>
            </div>
        </div>
        <footer className='my-6 px-40 py-8 flex justify-between border-t-2'>
            <div className='w-1/3 text-center px-12'>
                <div className='font-medium py-3'>MESA</div>
                <div>Department of Mechanical Engineering, Indian Institute of Technology Guwahati</div>
            </div>
            <div className='w-1/3 text-center px-12'>
                <div className='font-medium py-3'>Useful Links</div>
                <div className='flex flex-col'>
                    <Link className='hover:scale-105' to={'https://www.iitg.ac.in/'}>IIT Guwahati</Link>
                    <Link className='hover:scale-105' to={'https://academic.iitg.ac.in/sso/'}>Academic Portal</Link>
                    <Link className='hover:scale-105' to={'https://www.iitg.ac.in/mech/'}>Department of ME</Link>
                </div>
            </div>
            <div className='w-1/3 text-center px-12'>
                <div className='font-medium py-3'>Contact US</div>
                <div className='flex flex-col'>
                    <div>mesa@iitg.ac.in</div>
                    <div>Facebook</div>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default intro