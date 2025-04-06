import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const Webcontributorcard = ({name,image,position,background,social}) => {
    const {ref,inView} = useInView()
    return ( 
        <div ref={ref} className={`h-contain z-1 max-w-[300px] w-full md:w-full flex justify-center align-center text-start flex-col ${inView? 'fadeBelowAnimate':''}`} >
            <div className="h-[270px] w-full relative flex flex-row justify-center align-center text-center">
                <p className="h-[70%] w-full absolute bottom-0 z-0" style={{backgroundColor:`${background}`}}></p>
                <img src={image} className="inline h-full object-cover absolute bottom-0  z-2 drop-shadow-[10px_0px_15px_rgba(0,0,0,0.6)]" />
            </div>
            <p className="text-xl lg:text-2xl font-bold drop-shadow-lg tracking-wide text-[#2e2d30] mt-2">{name}</p>
            <p className="text-[14px] lg:text-[16px] font-semibold text-gray-400 drop-shadow-lg tracking-wide uppercase">{position}</p>
            {/* <div className="flex flex-row flex-wrap w-full justify-around align-center items-center"> */}
            <div className="grid grid-cols-5 mt-2 align-items-center">
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
 
export default Webcontributorcard;
