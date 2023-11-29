import { Link } from "react-router-dom";

const Footer = () => {
    return ( 
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
     );
}
 
export default Footer;