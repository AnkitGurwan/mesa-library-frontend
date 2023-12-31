import { useInView } from "react-intersection-observer";

const EventsCard = ({title,content}) => {
    const {ref,inView} = useInView()
    return ( 
        <div ref={ref} className={`w-full h-full bg-[#ffffff] shadow-light-card hover:shadow-hover-light-card rounded-[50px] p-6 md:p-7 flex flex-col items-center ${inView? 'fadeBelowAnimate':''}`}>
            <h3 className="text-center text-3xl md:text-4xl font-bold text-gray-600 tracking-wide " style={{"fontFamily":"cursive"}}>{title}</h3>
            <p className="text-center px-3 md:px-4 py-5 md:py-8 text-[15px] text-pretty 2xl:text-[1.3rem] tracking-wide text-gray-500" style={{"fontFamily":"Manrope"}}>{content}</p>
            {
                title=='Seismech'? 
                <> 
                    <a href="/events/seismech">
                        <button className="my-2 rounded-xl px-4 pb-2 pt-2 text-xl text-white font-semibold bg-[#0066FF] hover:shadow-hover-light-button hover:scale-[102%]" >Learn More</button>
                    </a>
                    <button className="my-2 rounded-xl px-5 pb-3 pt-2 text-xl font-semibold text-[#0066FF] shadow-light-button hover:shadow-hover-light-button" >Learn More</button>
                </>
                :<></>
            }
        </div>
     );
}
 
export default EventsCard;