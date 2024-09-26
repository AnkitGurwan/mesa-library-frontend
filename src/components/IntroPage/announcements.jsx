import ExamImage from './assests/schedule.png'
import ClassImage from './assests/expired.png'

const Announcements = () => {
    
    return ( 
        <div className='w-full my-16 py-7 flex flex-col justify-center items-center text-center text-[#252525]' style={{'fontFamily':'Manrope',"backgroundColor":"#fbfbfd",}}>
            <div className='text-gray-700 font-extrabold text-4xl py-2 w-full min-w-[270px] max-w-[700px] rounded-sm ' style={{"font-family": "Sans-serif","box-shadow" : "rgba(0, 0, 0, 0.25)"}}>Announcements</div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 place-items-center'>

                <a target='_blank' href='https://firebasestorage.googleapis.com/v0/b/mesa-8924d.appspot.com/o/Acad_Calendar_2024.pdf?alt=media&token=2bbffcb9-b7f3-43fd-8fa4-aa570633abf3' className='hover:scale-[1.01] w-[270px] sm:h-[360px] md:w-[300px] mt-8 mb-2 py-2 px-4 md:ml-8 flex flex-col justify-center items-center text-center border rounded-[5%] shadow-[5px_5px_15px_rgba(0,0,0,0.25)]'>
                        <img src={ExamImage} alt="" className='w-[130px] my-4'/>
                        <button className="my-3 p-1 px-2 rounded-xl text-sm md:text-lg bg-[#1b3358] text-[#efefef]">Academic Calendar</button>
                        <p className='text-[#404040] italic font-semibold'>Last updated on July 4,2024</p>
                        <p className='text-[#252525] mt-3 mb-4 text-sm'>Find the updated Academic Calendar for the year 2024 here</p>
                </a>
    
                <a target='_blank' href='https://firebasestorage.googleapis.com/v0/b/mesa-8924d.appspot.com/o/2024_July_Nov_Timetable_4%20(1).pdf?alt=media&token=16994b9e-7033-4519-b978-6df13ca54906'  className='hover:scale-[1.01] w-[270px] sm:h-[360px] md:w-[300px] mt-8 mb-2 py-2 px-4 md:mr-8 flex flex-col justify-center items-center text-center border rounded-[5%] shadow-[5px_5px_15px_rgba(0,0,0,0.25)]'>
                        <img src={ClassImage} alt="" className='w-[130px] my-3'/>
                        <button className="my-3 p-1 px-2 rounded-xl text-sm md:text-lg bg-[#1b3358] text-[#efefef]">Class Timetable</button>
                        <p className='text-[#404040] italic font-semibold'>Last updated on June 20,2024</p>
                        <p className='text-[#252525] text-sm mt-3 mb-4 '>Find the updated timetable for Jan-May academic session here</p>
                </a>
                    
                
                {/* <a target='_blank' href='https://iitg.ac.in/acadExam/END-SEMESTER_AND_MID-SEMESTER_EXAM_SCHEDULE.pdf' className='hover:scale-[1.01] w-[270px] sm:h-[360px] md:w-[300px] mt-8 mb-2 py-2 px-4 md:ml-8 flex flex-col justify-center items-center text-center border rounded-[5%] shadow-[5px_5px_15px_rgba(0,0,0,0.25)]'>
                        <img src={ExamImage} alt="" className='w-[130px] my-4'/>
                        <button className="my-3 p-1 px-2 rounded-xl text-sm md:text-lg bg-[#1b3358] text-[#efefef]">Exam Timetable</button>
                        <p className='text-[#404040] italic font-semibold'>Last updated on Jan 4,2024</p>
                        <p className='text-[#252525] mt-3 mb-4 text-sm'>Please note that schedule will be updated one-to-two weeks prior to the start of exams</p>
                </a> */}
            </div>
        </div>
     );
}
 
export default Announcements;
