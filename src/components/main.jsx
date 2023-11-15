import React , { useContext,useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Folder from './user/userFolder';
import File from './user/userFile';
import Upload from './admin/upload';
import "./styles.css";
import Lottie from './user/courselottie';
import LoaderLottie from './user/loaderlottie';


const HomePage = () => {
    const { logOut,GetDetails,getToken,checkAuth,createStudent } = useContext(AuthContext);
    const [searchParams, setSearchParams] =useSearchParams();
    const [loading,setLoading]=useState(true);
    const [allowed,setAllowed]=useState(false);
    const Navigate = useNavigate();

    const funcAllowed= async () => {
        const rollNumber = localStorage.getItem('studRoll');
        const flag = await checkAuth();
        
        if(rollNumber && flag)
        {
          if((210103001 <= rollNumber && rollNumber <= 210103140) || (230103001 <= rollNumber && rollNumber <= 230103140) ||
              (200103001 <= rollNumber && rollNumber < 200103140) || (220103001 <= rollNumber && rollNumber < 220103140)){
            setAllowed(true);
            setLoading(false);
          }
          else 
          {
            setLoading(false);
            setAllowed(false);
          }
        }
        else 
        {
            Navigate("/");
            (toast.error('Please login to access', {
              position: toast.POSITION.TOP_CENTER
          }));
        } 
      }

    const getItem = async () => {
        const code = searchParams.get('code');  

        
        
        if(localStorage.getItem('studName') === null && code)
            await getToken(code);

        await GetDetails();

        if(localStorage.getItem('studName'))
            await createStudent(localStorage.getItem('studId'),localStorage.getItem('studName'),localStorage.getItem('studRoll'));

        funcAllowed();
    }
    
    useEffect(()=>{
        getItem();
        localStorage.setItem('pathAdmin',"");
    },[]);

    const allFoldersName =  useSelector(state => state.Files.allFoldersNameStore);
    const foldersName = allFoldersName.filter((eachFolder)=>{return eachFolder.parent === "root" && (eachFolder.name === "Sem 3" || eachFolder.name === "Sem 5" || eachFolder.name === "Sem 7")});

    const allFilesName = useSelector(state => state.Files.allFilesNameStore);
    const filesName = allFilesName.filter((eachFolder)=>{return eachFolder.parent == "root"});

    const allUploadFilesName= useSelector(state => state.Files.allUploadedFilesNameStore);
    const uploadFilesName = allUploadFilesName.filter((eachFolder)=>{return eachFolder.parent == "root"});

    const studName = localStorage.getItem('studName')?localStorage.getItem('studName').toLowerCase():"";

    const logOutHandler = async () => {
        localStorage.clear('studName','studId','studRoll','studJob');
        await logOut();
    }

    return (
        <div className='w-full h-full' style={{'background-image': 'linear-gradient(to top left, white 0%, #132d7a 74%)'}}>
            {loading
            ?
            <div className='bg-white h-full flex items-center justify-center'><LoaderLottie/></div>
            :
            allowed
            ?
            <div className='w-full' >
                <div className='w-full h-1/2 text-white'>
                    <div className='flex justify-between items-center mx-8 py-4'>
                        <div className='text-xl md:text-3xl font-bold pl-2 md:pl-4 pt-0 md:pt-4'>MESA Library</div>
                        <div>
                        <Link className='text-white text-lg md:text-xl font-semibold hover:underline mx-1 md:mx-2' to={'/feedback'}>Feedback</Link>
                        <button className='text-white text-lg md:text-xl font-semibold hover:underline' onClick={logOutHandler}>Log Out
                        </button>
                        
                        </div>
                    </div>
                    <div className='ml-4 mt-5 flex flex-col justify-center items-center'>
                        <div className='text-2xl md:text-3xl font-semibold p-0 md:p-1 capitalize'>Welcome {studName} 👋</div>
                        <div className='text-xl font-medium pt-0 md:pt-1'>Mechanical Engineer 👨‍🔧</div>
                    </div>
                    <a 
                    href="#material"
                    className='mx-auto flex justify-center items-center w-28 mt-8 border p-2 rounded-lg hover:bg-gray-100 hover:text-black cursor-pointer scroll-smooth z-10'>
                        <div className='mr-2'>Let's Start</div>
                        <BsChevronRight />
                    </a>
                </div>

                {/* material */}
                <div id='material' className='flex justify-center w-full md:px-4 pt-2 pb-5 z-10'>
                    <div className='bg-[#2b365647] rounded-lg md:rounded-xl p-2 flex flex-col items-center w-full md:3/5 my-2 md:my-4 mx-12 md:mx-32' >
                        <div className='text-xl md:text-3xl text-start text-white font-bold pt-2 pb-4 md:pb-8'>ALL SEMESTERS</div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10  mx-4 md:mx-8 py-2">
                            {foldersName ? foldersName.map((folder) => (
                                <div className=''>
                                    <Folder key={folder.userId} parent={folder.parent} name={folder.name} />
                                </div>
                            )) 
                            :
                            ""}
                        </div>
                                        
                    </div>

                    
                </div>

                {/* guides */}
                <div id='guides' className='flex justify-center w-full md:px-4 pt-2 pb-5 z-10' >
                    <div className='bg-[#2b365647] rounded-lg md:rounded-xl p-2 flex flex-col items-center w-full md:3/5 my-2 md:my-4 mx-12 md:mx-32'>
                        <div className='text-2xl text-white font-bold py-4 max-[450px]:text-xl'>SEMESTER GUIDES</div>
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mx-4 md:mx-8 py-2">
                            {filesName ? filesName.map((file) => (
                                <div className=''><File key={file.userId} parent={file.parent} name={file.createdBy} description={file.description} year={file.year} topic={file.name}/></div>
                            )) 
                            :
                            ""}
                        </div>
                                            
                    </div>
                </div>
                
                <div className='absolute top-28 md:top-4 left-0 md:left-4 z-0'><Lottie/></div>
            </div>
            :
            <div class="absolute top-24 left-9 md:left-1/3 w-4/5 md:w-1/3">
                <div class="max-w-md bg-white rounded-lg shadow-md p-8">
                    <h1 class="text-3xl font-bold mb-4">404</h1>
                    <p class="text-lg text-gray-700 mb-6">Oops! The page you're looking for could not be accessed by you.</p>
                    <div class="bg-blue-500 text-center text-white text-xl font-bold py-2 px-4 rounded">
                        You are not part of this Course.
                    </div>
                </div>
            </div>
            }
            
        </div>
    )
}

export default HomePage;