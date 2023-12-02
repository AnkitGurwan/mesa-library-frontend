import { Link } from "react-router-dom";
import facebook from "./assests/facebook.png"
import linkedin from "./assests/linkedin.png"
import instagram from "./assests/instagram.png"
import mail from "./assests/email.png"
import medium from "./assests/medium.png"



const Footer = () => {
    const socialMedia = [
        [mail, 'mailto:mesa@iitg.ac.in'],
        [facebook, "https://www.facebook.com/MESA.IITGuwahati"],
        [linkedin, "https://www.linkedin.com/groups/2811436/"],
        [instagram, "https://www.instagram.com/mesa_iit_guwahati_/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=="],
        [medium, "https://medium.com/@mesaiitg"],
    ]
    const usefulLinks = [
        ["IIT Guwahati", 'https://www.iitg.ac.in/'],
        ["Academic Portal", 'https://academic.iitg.ac.in/sso/'],
        ['Department of Mechanical Engineering', 'https://www.iitg.ac.in/mech/'],
    ]
    return (
        <footer className='w-full relative bottom-0 h-[420px] lg:h-[200px] mt-10 bg-gradient-to-t from-[#64beff] to-white'>
            {/* <div className="w-full flex justify-between absolute left-0 bottom-0 my-6 lg:px-40 py-8">
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
            </div> */}
            <div className="lg:mx-10 flex flex-col lg:flex-row justify-center lg:justify-between align-center text-center">

                <div className="mt-10">
                    <p className="font-bold text-lg mb-2">Mesa</p>
                    <p className="ml-5 lg:ml-0 tracking-wider">Department of Mechanical Engineering, IITG</p>
                </div>

                <div className="mt-10">
                    <p className="font-bold text-lg mb-2">Useful Links</p>
                    <ol className="ml-5 lg:ml-0 flex flex-col">
                        {
                            usefulLinks.map(([title, url]) => (
                                <li><Link target="_blank" className="tracking-wider mb-1 hover:text-[17px]" to={url}>{title}</Link></li>
                            ))
                        }
                    </ol>
                </div>

                <div className="mt-10">
                    <p className="font-bold text-lg mb-2" >Contact us</p>
                    <p className="flex justify-center mx-5 lg:mx-0">
                        {
                            socialMedia.map(([source, url]) => (
                                <Link className="hover:scale-110 mx-4 max-[400px]:mx-1 lg:mx-2" to={url} target="_blank"><img className="w-10 lg:w-12" src={source} alt={`${source}`} /></Link>
                            ))
                        }
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;