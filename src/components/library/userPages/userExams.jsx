import React, {useContext, useEffect} from 'react';
import Folder from '../userComponents/userFolder2'
import File from '../userComponents/userFile'
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Upload from "../userComponents/userUpload2";

import { useDispatch, useSelector } from 'react-redux';
import { setUserUpdatePath , setUserPath} from '../../../redux/storage/storageSlice';
import AuthContext from '../../../context/auth/AuthContext';
import Navbar from '../userComponents/navbar';
import BackgroundParticle from '../userComponents/backgroundParticle';

const Home = () => {
    const { GetDetails } = useContext(AuthContext);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { exams , course } = useParams();
    const allFoldersName =  useSelector(state => state.Files.allFoldersNameStore);
    const foldersName = allFoldersName.filter((eachFolder)=>{return eachFolder.parent === exams && eachFolder.supParent === course});

    const allFilesName = useSelector(state => state.Files.allFilesNameStore);
    const filesName = allFilesName.filter((eachFolder)=>{return eachFolder.parent === exams && eachFolder.supParent === course});

    const allUploadFilesName= useSelector(state => state.Files.allUploadedFilesNameStore);
    const uploadFilesName = allUploadFilesName.filter((eachFolder)=>{return eachFolder.parent === exams && eachFolder.supParent === course});

    var path =  useSelector(state => state.Files.userPath);
    const getItem = async () => {
        if(foldersName.length === 0)
        await GetDetails();
        
        if(path.length <= 1)
        {
            dispatch(setUserPath(course));
            dispatch(setUserPath(exams));
        }
        else if(path.length >= 2)
        {
            dispatch(setUserUpdatePath(exams));
        }
    }
    useEffect(()=>{
        getItem();
    },[])



    const pathHandler = (e) => {
        const value = e.target.innerText;
        dispatch(setUserUpdatePath(value));
        var x = "/library";
        
        for(let i=0;i<path.length;i++)
        {
            x += "/";
            x += path[i];
            if(value === path[i])
            break;
            
        }
        Navigate(`${x}`);
    }

  return (
    <div className='relative h-screen'>
        <Navbar/>
        <div className='z-10 flex justify-between items-center py-3 text-lg bg-blue-200 font-bold text-gray-600 absolute top-20 md:top-16 w-full h-12'>
            <div className='flex mx-2 md:mx-5'>
               
                {path.map((indPath)=>{return <div className='flex items-center mr-0 md:mr-1'><button onClick={pathHandler} className='mr-3 '>{indPath}</button>
                <div className='mr-2 md:mr-3 text-xs md:text-lg'>{`>`}</div></div>})}
                
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
        <div className='overflow-y-hidden w-4/5 md:w-full rounded-md my-4 pl-2 md:pl-6 flex flex-col pb-3 md:pb-6 font-medium text-gray-700'>
            <div className='text-start py-4 pl-2 md:pl-8 font-semibold md:font-bold  text-2xl'>Information Files</div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mx-0 md:mx-6 my-5 md:my-2">
                {filesName.length ? filesName.map((file) => (
                    <div className='mx-2 '><File key={file.userId} name={file.name} description={file.description} year={file.year} topic={file.topic}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>
        :
        ""}

    {uploadFilesName.length?
            <div className='overflow-y-hidden w-4/5 md:w-full rounded-md mt-6 pl-2 md:pl-6 flex flex-col pb-3 md:pb-6 font-medium text-gray-700'>
                <div className='text-start py-6 pl-2 md:pl-8 font-semibold md:font-bold text-2xl'>Files/PDF's</div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mx-0 md:mx-6 my-5 md:my-2">
                    {uploadFilesName.length ? uploadFilesName.map((upload) => (
                        <div className='mx-2 my-2 text-start overflow-hidden'><Upload key={upload.userId} name={upload.name} url={upload.url}/></div>
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