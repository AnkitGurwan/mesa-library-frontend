
import Footer from "../IntroPage/footer";
import Navbar from "../IntroPage/homeNavBar";
import Title from "../Title/Title";
import EventsCard from "./EventsCard";

const Events = () => {
    const events = [
        ['Seismech', "Seismech is the propagation of ideas over the weekend, where we strive to spread knowledge and skills necessary in different fields of mechanical engineering. It provides you with a wide array of events, from lectures to workshops and experiences of our accomplished alumni through the talks and fun sports events."],
        ['Mesa Orientation','In order to welcome the fresher undergraduates and graduates to the MESA family and make them aware about the constitution and the working of MESA, an orientation is organized every year. They are also introduced to Seismech, the departmental symposium that is held annually. Various suggestion are also taken for the future events that should be organized by MESA. The freshers who want to work for MESA, are asked to step forward. A fun introduction session takes place, in which many of them open up and have fun.'],
        ['SolidWorks Workshops', "SolidWorks is like the cool sidekick for mechanical engineering students, turning boring theories into awesome 3D designs. It's not just software; it's a virtual playground where creativity meets precision. With easy-to-use tools, it lets students play around with their ideas, fixing and improving stuff virtually. Plus, it's super handy for teamwork, just like in the real engineering world."],
        ['Intern Talk', "To learn from the internship experiences of our seniors and to know more about the do’s and don’ts while applying and going for an intern, MESA organized an Internship talk with our seniors. The session was organized separately for the second and third years owing to the different problems faced by them."],
        ['Freshers Party', "Join us for an unforgettable evening filled with music, laughter, and a whole lot of fun as we celebrate the beginning of an exciting journey for our freshers. It's an excellent opportunity to make new friends, groove to the beats, and create memories that will last a lifetime."],
        ['Farewell Party', "Let's gather for an evening of nostalgia, laughter, and heartfelt goodbyes. Dress in your best attire and come ready to share your favorite memories, stories, and experiences. It's a time to celebrate the achievements of our seniors and wish them the very best for their future endeavors. Here's to new beginnings and the wonderful memories we've created together!"]
    ]

    return ( 
        <div className="flex flex-col">
            <Navbar/>
            <Title title={"Events"} quote={"It's not about the event itself, it's about creating a memorable experience for your audience."}/>
            <div className={`mt-16 mb-20 xl:mx-12 grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-20 gap-y-16 sm:mx-10 place-items-center`}>
                {
                    events.map(([title,content])=>(
                        <EventsCard title={title} content={content} />
                    ))
                }

                {/* <div className="w-full h-full bg-[#ffffff] shadow-light-card rounded-[50px] p-10 flex flex-col items-center">
                    <h3 className="text-center text-4xl font-extrabold tracking-widest">Seismech</h3>
                    <p className="my-5 tracking-wide text-lg text-pretty ">Seismech is the propagation of ideas over the weekend, where we strive to spread knowledge and skills necessary in different fields of mechanical engineering. It provides you with a wide array of events, from lectures to workshops and experiences of our accomplished alumni through the talks and fun sports events.</p>
                    <button className="my-2 rounded-xl px-5 pb-3 pt-2 text-xl text-white font-bold bg-[#0066FF] hover:shadow-hover-light-button hover:scale-[102%]" >Learn More</button>
                    <button className="my-2 rounded-xl px-5 pb-3 pt-2 text-xl font-bold text-[#0066FF] shadow-light-button hover:shadow-hover-light-button" >Learn More</button>
                </div>
                <div className="border border-2 rounded-xl p-10 ">
                    <h3 className=" text-center ">Mesa Orientation</h3>
                    <p className="text-pretty ">In order to welcome the fresher undergraduates and graduates to the MESA family and make them aware about the constitution and the working of MESA, an orientation is organized every year. They are also introduced to Seismech, the departmental symposium that is held annually. Various suggestion are also taken for the future events that should be organized by MESA. The freshers who want to work for MESA, are asked to step forward. A fun introduction session takes place, in which many of them open up and have fun. It is followed by a Quiz for the freshers, based on various general topics in Mechanical Engineering.</p>
                </div>
                <div className="w-full h-full border border-2 rounded-xl p-10">
                    <h3 className=" text-center ">SolidWorks Workshops</h3>
                    <p className=" text-pretty ">SolidWorks is like the cool sidekick for mechanical engineering students, turning boring theories into awesome 3D designs. It's not just software; it's a virtual playground where creativity meets precision. With easy-to-use tools, it lets students play around with their ideas, fixing and improving stuff virtually. Plus, it's super handy for teamwork, just like in the real engineering world. SolidWorks is the go-to buddy, giving students the skills they need to rock the future of mechanical innovation.</p>
                </div>
                <div className="border border-2 rounded-xl p-10 ">
                    <h3 className=" text-center ">Intern Talk</h3>
                    <p className="text-pretty ">In order to welcome the fresher undergraduates and graduates to the MESA family and make them aware about the constitution and the working of MESA, an orientation is organized every year. They are also introduced to Seismech, the departmental symposium that is held annually. Various suggestion are also taken for the future events that should be organized by MESA. The freshers who want to work for MESA, are asked to step forward. A fun introduction session takes place, in which many of them open up and have fun. It is followed by a Quiz for the freshers, based on various general topics in Mechanical Engineering.</p>
                </div>
                <div className="border border-2 rounded-xl p-10">
                    <h3 className=" text-center ">Freshers Party</h3>
                    <p className=" text-pretty ">SolidWorks is like the cool sidekick for mechanical engineering students, turning boring theories into awesome 3D designs. It's not just software; it's a virtual playground where creativity meets precision. With easy-to-use tools, it lets students play around with their ideas, fixing and improving stuff virtually. Plus, it's super handy for teamwork, just like in the real engineering world. SolidWorks is the go-to buddy, giving students the skills they need to rock the future of mechanical innovation.</p>
                </div>
                <div className="border border-2 rounded-xl p-10">
                    <h3 className=" text-center ">Farewell Party</h3>
                    <p className=" text-pretty ">SolidWorks is like the cool sidekick for mechanical engineering students, turning boring theories into awesome 3D designs. It's not just software; it's a virtual playground where creativity meets precision. With easy-to-use tools, it lets students play around with their ideas, fixing and improving stuff virtually. Plus, it's super handy for teamwork, just like in the real engineering world. SolidWorks is the go-to buddy, giving students the skills they need to rock the future of mechanical innovation.</p>
                </div> */}
            </div>
            <Footer/>
        </div>
     );
}
 
export default Events;