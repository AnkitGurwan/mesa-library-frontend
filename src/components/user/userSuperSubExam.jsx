import React,{useContext,useEffect,useState} from 'react';
import Folder from './userFolder'
import File from './userFile'
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Upload from "./userUpload";
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../../context/auth/AuthContext';
import { setUserUpdatePath } from '../../redux/storage/storageSlice';
import Lottie from './backgroundlottie';
import Navbar from './navbar';

const Home = () => {
    const { GetDetails } = useContext(AuthContext);
    const dispatch = useDispatch();
    const { superSub } = useParams();
    const Navigate = useNavigate();
    const [pathState,setPathState] = useState("");
    const allFoldersName =  useSelector(state => state.Files.allFoldersNameStore);
    const foldersName = allFoldersName.filter((eachFolder)=>{return eachFolder.parent === superSub});

    const allFilesName = useSelector(state => state.Files.allFilesNameStore);
    const filesName = allFilesName.filter((eachFolder)=>{return eachFolder.parent == superSub});

    const allUploadFilesName= useSelector(state => state.Files.allUploadedFilesNameStore);
    const uploadFilesName = allUploadFilesName.filter((eachFolder)=>{return eachFolder.parent == superSub});

    var path =  useSelector(state => state.Files.userPath);

    const getItem = async () => {
        await GetDetails();
        const x = localStorage.getItem('pathAdmin');
        var str = "";
        var pathArray = ["main"];
        for(let i=0; i<x.length;i++)
        {
            if(x[i]==='$')
            {
                pathArray.push(str);
                if(str === superSub)
                {
                    dispatch(setUserUpdatePath(pathArray));
                    break;
                }
                str = "";
                
            }
            else str+=x[i];
        }

        var newArray = "";
        for(let i=1; i<pathArray.length; i++)
        {
            newArray+=pathArray[i];
            newArray+="$";
        }
        localStorage.setItem('pathAdmin',newArray);

        
        path = pathArray;
        setPathState(path);
    }
    
    useEffect(()=>{
        getItem();
    },[]);
        
    const pathHandler = (e) => {
        const value = e.target.innerText.toLowerCase();
        dispatch(setUserUpdatePath(value));
        var x = "";
        var y = "";
        for(let i=0;i<pathState.length;i++)
        {
            x += "/";
            x += pathState[i];
            if(i != 0)
            {
                y += pathState[i];
                y+="$";
            }
            if(value === pathState[i])
            break;
            
        }
        localStorage.setItem('pathAdmin',y);
        Navigate(`${x}`);
    }
  return (
    <div className='relative h-screen'>
        <Navbar/>
        <div className='z-10 flex justify-between items-center py-3 text-lg bg-blue-200 font-bold text-gray-600 absolute top-20 md:top-16 w-full h-12'>
            <div className='flex mx-2 md:mx-5'>
                {
                pathState
                ?
                pathState.map((indPath) => { return <div className='flex items-center'><button onClick={pathHandler} className='mr-1 md:mr-2 cursor-pointer text-[16px] md:text-lg capitalize hover:bg-blue-400 px-1 rounded-sm hover:text-white'>{indPath}</button>
                <div className='mr-1 md:mr-2'>{`>`}</div></div>}):""
                }
            </div>
        </div>

        <div className='absolute top-32 w-full h-auto z-10'>

        {foldersName.length?
        <div className='h-auto rounded-md my-7 md:my-4 ml-2 md:ml-6 flex flex-col pb-3 md:pb-6 font-semibold md:font-medium'>
                <div className='text-start py-4 pl-8 font-semibold md:font-bold text-white text-2xl'>All Courses</div>
                <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 mx-6 my-2">
                    {foldersName.length ? foldersName.map((folder) => (
                        <div className='mx-2 border-2 border-gray-400'><Folder key={folder.userId} parent={folder.parent} name={folder.name}/></div>
                    )) 
                    :
                    ""}
                </div>
                                    
            </div>
            :""}

        {filesName.length?
        <div className='overflow-y-hidden w-4/5 md:w-full rounded-md my-4 pl-2 md:pl-6 flex flex-col pb-3 md:pb-6 font-medium text-gray-700'>
            <div className='flex items-cente pl-3 md:pl-7'>
                <span class="material-symbols-outlined text-3xl">
                description
                </span>
                <div className='py-4 pl-1 font-semibold md:font-bold text-2xl'>Created Files</div>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 mx-0 md:mx-6 my-2">
                {filesName.length ? filesName.map((file) => (
                    <div className='mx-2 border-2 border-gray-400'><File key={file.userId} name={file.createdBy} description={file.description} year={file.year} topic={file.name}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>
        :
        ""}

        {uploadFilesName.length?
        <div className='overflow-y-hidden w-4/5 md:w-full rounded-md my-4 pl-2 md:pl-6 flex flex-col pb-3 md:pb-6 font-medium text-gray-700'>
            <div className='flex items-center text-white pl-3 md:pl-7'>
                <span class="material-symbols-outlined">
                picture_as_pdf
                </span>
                <div className='py-4 pl-1 font-semibold md:font-bold text-white text-2xl'>Files/PDF</div>
            </div>
            <div className="grid grid-cols-5 gap-4 mx-0 md:mx-6 my-2">
                {uploadFilesName.length ? uploadFilesName.map((upload) => (
                    <div className='mx-2 border-2 text-white text-start overflow-hidden'><Upload key={upload.userId} name={upload.name} url={upload.url}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>
        :
        ""}
        </div>
        <div className='absolute bottom-0 right-0'><Lottie/></div>


            
    </div>
  )
}

export default Home