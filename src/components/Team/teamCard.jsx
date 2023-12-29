import { Link } from "react-router-dom";
import SocialMedia from "./SocialMedia";

const Card = ({name,image,position,background,social}) => {
    return ( 
        <div className="h-contain z-1 max-w-[300px] w-full md:w-full flex justify-center align-center text-start flex-col" >
            <div className="h-[270px] w-full relative flex flex-row justify-center align-center text-center">
                <p className="h-[70%] w-full absolute bottom-0 z-0" style={{backgroundColor:`${background}`}}></p>
                <img src={image} className="inline h-full  absolute bottom-0  z-2 drop-shadow-[10px_0px_15px_rgba(0,0,0,0.6)]" />
            </div>
            <p className="text-xl lg:text-2xl font-bold drop-shadow-lg tracking-wide text-[#2e2d30] mt-3 ">{name}</p>
            <p className="text-[14px] lg:text-[17px] font-semibold text-gray-400 drop-shadow-lg tracking-wide uppercase">{position}</p>
            {/* <div className="flex flex-row flex-wrap w-full justify-around align-center items-center"> */}
            <div className="grid grid-cols-5 mt-3 align-items-center">
                {
                    Object.entries(social).map(([socialMedia, url])=>(
                        <Link to={url}>
                            <img className="w-8 opacity-40 drop-shadow-sm hover:opacity-80" src={`/socialMediaImages/${socialMedia}.png`} alt="" />
                        </Link>
                    ))
                }
            </div>
        </div>
     );
}
 
export default Card;