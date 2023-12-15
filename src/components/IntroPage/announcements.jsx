import ExamImage from './assests/schedule.png'
import ClassImage from './assests/expired.png'

const Announcements = () => {
    
    return ( 
        <div className='w-full my-[87px] py-7 flex flex-col justify-center items-center text-center text-[#252525]' style={{'fontFamily':'Manrope',"backgroundColor":"#fbfbfd",}}>
            <div className='text-gray-700 font-extrabold text-4xl py-1 w-full min-w-[270px] max-w-[700px] rounded-sm ' style={{"font-family": "Sans-serif","box-shadow" : "rgba(0, 0, 0, 0.25)"}}>Announcements</div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 place-items-center'>
    
                <a target='_blank' href='https://www.iitg.ac.in/acad/classtt/ME_TimeTable%20Jan-May%202021_29th%20Dec.pdf'  className='w-[270px] sm:h-[400px] md:w-[300px] mt-8 mb-2 py-2 px-4 md:mr-8 flex flex-col justify-center items-center text-center border rounded-[5%] shadow-[5px_5px_15px_rgba(0,0,0,0.25)]'>
                        <img src={ClassImage} alt="" className='w-[170px] my-4'/>
                        <button className="my-2 p-1 px-2 rounded-xl text-lg bg-[#1b3358] text-[#efefef]">Class Timetable</button>
                        <p className='text-[#404040] italic font-semibold'>Last updated on Jan 3,2021</p>
                        <p className='text-[#252525] mt-3 mb-4 '>Find the updated timetable for Jan-May academic session here</p>
                    </a>
                    
                
                <a target='_blank' href='https://iitg.ac.in/acadExam/END-SEMESTER_AND_MID-SEMESTER_EXAM_SCHEDULE.pdf' className='w-[270px] sm:h-[400px] md:w-[300px] mt-8 mb-2 py-2 px-4 md:ml-8 flex flex-col justify-center items-center text-center border rounded-[5%] shadow-[5px_5px_15px_rgba(0,0,0,0.25)]'>
                        <img src={ExamImage} alt="" className='w-[170px] my-4'/>
                        <button className="my-2 p-1 px-2 rounded-xl text-lg bg-[#1b3358] text-[#efefef]">Exam Timetable</button>
                        <p className='text-[#404040] italic font-semibold'>Last updated on March 4,2021</p>
                        <p className='text-[#252525] mt-3 mb-4 '>Please note that schedule will be updated one-to-two weeks prior to the start of exams</p>
                </a>
            </div>
        </div>
     );
}
 
export default Announcements;