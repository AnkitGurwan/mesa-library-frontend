import ExamImage from './assests/schedule.png'
import ClassImage from './assests/expired.png'

const Announcements = () => {
    
    return ( 
        <div className='w-full flex flex-col justify-center items-center text-center text-[#252525]'>
            <div className='w-full text-[#252525] font-extrabold text-3xl bg-slate-400 py-2 tracking-wider'>Announcements</div>
            <div className='flex flex-col sm:flex-row'>
                <a target='_blank' href='https://www.iitg.ac.in/acad/classtt/ME_TimeTable%20Jan-May%202021_29th%20Dec.pdf'>
                    <div className='w-[250px] sm:h-[400px] sm:w-[300px] my-10 py-2 px-2 sm:mr-8 flex flex-col justify-center items-center text-center border rounded-[5%] shadow-[5px_5px_15px_rgba(0,0,0,0.25)]'>
                        <img src={ClassImage} alt="" className='w-[170px] mt-4'/>
                        <button className="mt-2 mb-1 p-1 px-2 rounded-xl text-lg bg-[#1b3358] text-[#efefef]">Class Timetable</button>
                        <p className='text-[#404040] italic font-semibold'>Last updated on Jan 3,2021</p>
                        <p className='text-[#252525] mt-3 mb-4 '>Find the updated timetable for Jan-May academic session here</p>
                    </div>
                </a>
                <a target='_blank' href='https://iitg.ac.in/acad/Exam/END-SEMESTER_AND_MID-SEMESTER_EXAM_SCHEDULE.pdf'>
                    <div className='w-[250px] sm:h-[400px] sm:w-[300px] my-10 py-2 px-2 sm:ml-8 flex flex-col justify-center items-center text-center border rounded-[5%] shadow-[5px_5px_15px_rgba(0,0,0,0.25)]'>
                        <img src={ExamImage} alt="" className='w-[170px] mt-4'/>
                        <button className="mt-2 mb-1 p-1 px-2 rounded-xl text-lg bg-[#1b3358] text-[#efefef]">Exam Timetable</button>
                        <p className='text-[#404040] italic font-semibold'>Last updated on March 4,2021</p>
                        <p className='text-[#252525] mt-3 mb-4 '>Please note that schedule will be updated one-to-two weeks prior to the start of exams</p>
                    </div>
                </a>
            </div>
        </div>
     );
}
 
export default Announcements;