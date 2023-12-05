const Card = ({name,image,position,background}) => {
    return ( 
        <div className="h-contain w-full md:w-full flex justify-center align-center text-start flex-col" >
            <div className="h-[270px] w-full relative flex flex-row justify-center align-center text-center">
                <p className="h-[70%] w-full absolute bottom-0 z-0" style={{backgroundColor:`${background}`}}></p>
                <img src={image} className="inline h-full  absolute bottom-0  z-10 drop-shadow-[10px_0px_15px_rgba(0,0,0,0.6)]" />
            </div>
            <p className="text-xl font-semibold tracking-wide text-[#2e2d30] mt-3 ">{name}</p>
            <p className="text-[14px] font-[400] tracking-wide uppercase">{position}</p>
        </div>
     );
}
 
export default Card;