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
    const { logOut,GetDetails,getToken } = useContext(AuthContext);
    const [searchParams, setSearchParams] =useSearchParams();
    const [loading,setLoading]=useState(true);
    const [allowed,setAllowed]=useState(false);
    const Navigate = useNavigate();

    const funcAllowed= () => {
        if(localStorage.getItem('studRoll'))
        {
          if((`210103001` < localStorage.getItem('studRoll') && localStorage.getItem('studRoll') < `210103140`) || 
              (`220103001` < localStorage.getItem('studRoll') && localStorage.getItem('studRoll') < `220103140`) ||
              (`230103001` < localStorage.getItem('studRoll') && localStorage.getItem('studRoll') < `230103140`)
              (`200103001` < localStorage.getItem('studRoll') && localStorage.getItem('studRoll') < `200103140`))
          {
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

        funcAllowed();
    }
    
    useEffect(()=>{
        getItem();
        localStorage.setItem('pathAdmin',"");
    },[]);

    const allFoldersName =  useSelector(state => state.Files.allFoldersNameStore);
    const foldersName = allFoldersName.filter((eachFolder)=>{return eachFolder.parent === "root"});

    const allFilesName = useSelector(state => state.Files.allFilesNameStore);
    const filesName = allFilesName.filter((eachFolder)=>{return eachFolder.parent == "root"});

    const allUploadFilesName= useSelector(state => state.Files.allUploadedFilesNameStore);
    const uploadFilesName = allUploadFilesName.filter((eachFolder)=>{return eachFolder.parent == "root"});

    const logOutHandler = async () => {
        localStorage.clear('studName','studId','studRoll','studJob');
        await logOut();
    }

    return (
        <div className='h-full w-full'>
            {loading
            ?
            <div className='flex justify-center'><LoaderLottie/></div>
            :
            allowed
            ?
            <div className='w-full' style={{'background-image': 'linear-gradient(to top left, white 0%, #132d7a 74%)'}}>
                <div className='w-full h-1/2 text-white'>
                    <div className='flex justify-between items-center mx-8 py-4'>
                        <div className='text-xl md:text-3xl font-bold pl-2 md:pl-4 pt-0 md:pt-4'>MESA Library</div>
                        <button className='text-white text-lg md:text-xl font-semibold hover:underline' onClick={logOutHandler}>Log Out
                        </button>
                    </div>
                    <div className='ml-4 mt-5 flex flex-col justify-center items-center'>
                        <div className='text-2xl md:text-3xl font-bold p-1'>Welcome Ankit Gurwan 👋</div>
                        <div className='text-xl font-semibold pt-1'>Mechanical Engineer 👨‍🔧</div>
                    </div>
                    <a 
                    href="#material"
                    className='mx-auto flex justify-center items-center w-28 mt-8 border p-2 rounded-lg hover:bg-gray-100 hover:text-black cursor-pointer scroll-smooth'>
                        <div className='mr-2'>Let's Start</div>
                        <BsChevronRight />
                    </a>
                </div>

                {/* material */}
                <div id='material' className='SuperContainer w-full px-4 pt-2 pb-5'>
                    <div className='Container flex flex-col my-2 ' >
                        <div className='text-3xl text-start text-white font-bold pt-2 pb-8 max-[450px]:text-2xl'>ALL SEMESTERS</div>
                        <div className="flex flex-wrap justify-center align-center text-center mx-8 py-2">
                            {foldersName ? foldersName.map((folder) => (
                                <div className='max-[450px]:w-[200px]'>
                                    <Folder key={folder.userId} parent={folder.parent} name={folder.name} />
                                </div>
                            )) 
                            :
                            ""}
                        </div>
                                        
                    </div>

                    
                </div>

                {/* guides */}
                <div id='guides' className='SuperContainer flex justify-center w-full md:px-4 pt-2 pb-5 z-10' >
                    <div className='Container bg-[#2b365647] rounded-lg md:rounded-xl p-2 flex flex-col items-center w-full md:3/5 my-2 md:my-4 mx-12 md:mx-32'>
                        <div className='text-2xl text-white font-bold py-4 max-[450px]:text-xl'>SEMESTER GUIDES</div>
                        <div className="flex flex-wrap justify-center align-center text-center mx-8 py-2">
                            {filesName ? filesName.map((file) => (
                                <div className='mr-2'><File key={file.userId} parent={file.parent} name={file.createdBy} description={file.description} year={file.year} topic={file.name}/></div>
                            )) 
                            :
                            ""}
                        </div>
                                            
                    </div>
                </div>
                
                {/* <div className='absolute top-4 left-4 z-0'><Lottie/></div> */}
            </div>
            :
            <div class="absolute top-24 left-1/3 w-1/3">
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