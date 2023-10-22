import React,{useContext,useEffect,useState} from 'react';
import Folder from './userFolder2'
import File from './userFile'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Upload from "./userUpload2";

import { useDispatch, useSelector } from 'react-redux';
import { setUserUpdatePath } from '../../redux/storage/storageSlice';
import AuthContext from '../../context/auth/AuthContext';
import Lottie from './backgroundlottie';
import Navbar from './navbar';
import BackgroundParticle from './backgroundParticle';

const Home = () => {
    const { GetDetails } = useContext(AuthContext);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { exams } = useParams();
    const [pathState,setPathState] = useState("");
    const allFoldersName =  useSelector(state => state.Files.allFoldersNameStore);
    const foldersName = allFoldersName.filter((eachFolder)=>{return eachFolder.parent === exams});

    const allFilesName = useSelector(state => state.Files.allFilesNameStore);
    const filesName = allFilesName.filter((eachFolder)=>{return eachFolder.parent == exams});

    const allUploadFilesName= useSelector(state => state.Files.allUploadedFilesNameStore);
    const uploadFilesName = allUploadFilesName.filter((eachFolder)=>{return eachFolder.parent == exams});

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
                if(str === exams)
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
            
            
        <div className='absolute top-28 w-4/5 md:w-full h-auto z-10'>

        <div className = 'h-auto rounded-md my-7 md:my-4 ml-2 md:ml-6 flex flex-col pb-3 md:pb-6 font-semibold md:font-medium'>
            <div className='flex items-center text-gray-700 pl-3 md:pl-7'>
                <span class="material-symbols-outlined text-3xl">
                description
                </span>
                <div className='py-4 pl-1 font-semibold md:font-bold text-2xl'>All Exams</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mx-2 md:mx-6 my-5 md:my-2">
                {foldersName.length ? foldersName.map((folder) => (
                    <div className='mx-2 border-2 border-gray-400 hover:scale-105'><Folder key={folder.userId} parent={folder.parent} name={folder.name}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>
        {filesName.length?
        <div className='overflow-y-hidden w-3/5 rounded-md my-4 ml-6 flex flex-col pb-3 md:pb-6 font-medium bg-blue-400'>
            <div className='text-start py-4 pl-8 font-semibold md:font-bold text-white text-2xl'>Created Files</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-2 md:mx-6 my-5 md:my-2">
                {filesName.length ? filesName.map((file) => (
                    <div className='mx-2 border-2 border-white'><File key={file.userId} name={file.createdBy} description={file.description} year={file.year} topic={file.name}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>
        :
        ""}

        {uploadFilesName.length?
        <div className='overflow-y-hidden w-3/5 rounded-md my-4 ml-6 flex flex-col pb-3 md:pb-6 font-medium bg-blue-400'>
            <div className='text-start py-4 pl-8 font-semibold md:font-bold text-white text-2xl'>Uploaded Files</div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mx-2 md:mx-6 my-5 md:my-2">
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

<div className='absolute w-full bottom-0 right-0'><BackgroundParticle/></div>


            
    </div>
  )
}

export default Home