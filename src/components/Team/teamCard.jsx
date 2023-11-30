const Card = ({name,image,position,background}) => {
    return ( 
        <div className="h-contain w-full md:w-full flex justify-center align-center text-start flex-col" >
            <div className="h-[350px] w-full relative flex flex-row justify-center align-center text-center">
                <p className="h-[72%] w-full absolute bottom-0 z-0" style={{backgroundColor:`${background}`}}></p>
                <img src={image} className="inline h-full  absolute bottom-0  z-10 drop-shadow-[10px_0px_15px_rgba(0,0,0,0.6)]" />
            </div>
            <p className="text-xl md:text-2xl font-bold tracking-wide text-[#2e2d30] mt-3 ">{name}</p>
            <p className="text-[14px] md:text-[18px] font-[400] tracking-[1px] uppercase mt-1 ">{position}</p>
        </div>
     );
}
 
export default Card;