const Card = ({name,image,position,background}) => {
    return ( 
        <div className="h-contain w-[300px] flex justify-center align-center text-start flex-col sm:mr-16 sm:ml-16" >
            <div className="h-[400px] w-[300px] relative flex flex-row justify-center align-center text-center">
                <p className="h-[72%] w-full absolute bottom-0 z-0" style={{backgroundColor:`${background}`}}></p>
                <img src={image} className="inline h-full  absolute bottom-0  z-10 drop-shadow-[10px_0px_15px_rgba(0,0,0,0.6)]" />
            </div>
            <p className="text-3xl font-bold tracking-wide text-[#2e2d30] mt-4 ">{name}</p>
            <p className="text-[18px] font-[400] tracking-[1px] uppercase mt-2 ">{position}</p>
        </div>
     );
}
 
export default Card;