import React,{useContext,useEffect,useState} from 'react';
import Folder from './userFolder2'
import File from './userFile'
import fire from '../../config/firebase';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Upload from "./userUpload2";
import { useDispatch, useSelector } from 'react-redux';
import { setUserUpdatePath } from '../../redux/storage/storageSlice';
import AuthContext from '../../context/auth/AuthContext';
import BackgroundParticle from './backgroundParticle';
import Navbar from './navbar';
import NoContent from './userNoContent';

const Home = () => {
    const { GetDetails } = useContext(AuthContext);
    const dispatch = useDispatch();
    const { course } = useParams();
    const Navigate = useNavigate();
    const [pathState,setPathState] = useState("");
    const allFoldersName =  useSelector(state => state.Files.allFoldersNameStore);
    const foldersName = allFoldersName.filter((eachFolder)=>{return eachFolder.parent === course});

    const allFilesName = useSelector(state => state.Files.allFilesNameStore);
    const filesName = allFilesName.filter((eachFolder)=>{return eachFolder.parent == course});

    const allUploadFilesName= useSelector(state => state.Files.allUploadedFilesNameStore);
    const uploadFilesName = allUploadFilesName.filter((eachFolder)=>{return eachFolder.parent == course});

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
                if(str === course)
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
        for(let i=0 ; i < pathState.length ; i++)
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
    <div className='relative h-full overflow-x-hidden'>
        <Navbar pathHandler={pathHandler} pathState={pathState}/>
       {(foldersName.length||filesName.length||uploadFilesName.length)?
        <div id='Content-Container' className='flex flex-col w-full absolute top-[140px]'>
            {foldersName.length?
            <div className='z-10 w-full h-auto w-3/5 rounded-md my-4 ml-6 flex flex-col pb-6 font-medium max-[800px]:ml-2 max-[800px]:text-center max-[800px]:justify-center max-[800px]:align-center max-[800px]:ml-0'>
            
                <div className='flex w-full items-center text-gray-700 pl-7 max-[800px]:text-center max-[800px]:justify-center max-[800px]:align-center max-[800px]:m-0 max-[800px]:pl-0 '>
                    <span class="material-symbols-outlined text-3xl max-[800px]:text-4xl">
                    description
                    </span>
                    <div className='py-4 pl-1 font-semibold text-gary-700 text-2xl max-[800px]:text-3xl'>All Courses</div>
                </div>
            
                <div className="flex w-full ml-10 flex-wrap max-[800px]:justify-center max-[800px]:align-center max-[800px]:text-center max-[800px]:ml-0">
                    {foldersName.length ? foldersName.map((folder) => (
                        <div className='mx-2'><Folder key={folder.userId} parent={folder.parent} name={folder.name}/></div>
                    )) 
                    :
                    ""}
                </div>
                                    
            </div>
            :
            ""}
            {filesName.length?
            <div className='z-10 flex flex-col w-full  pb-4'>
                <div className='text-start pl-[70px] pt-2 pb-3 max-[800px]:text-3xl font-semibold text-gray-700 text-2xl max-[800px]:text-center max-[800px]:pl-0'>Created Files</div>
                <div className="flex flex-row flex-wrap gap-4 ml-[100px] my-2 max-[800px]:justify-center max-[800px]:align-center max-[800px]:text-center max-[800px]:ml-0">
                    {filesName.length ? filesName.map((file) => (
                        <div className='mx-2'><File key={file.userId} name={file.createdBy} description={file.description} year={file.year} topic={file.name}/></div>
                    )) 
                    :
                    ""}
                </div>
                                    
            </div>
            :
            ""}

            {uploadFilesName.length?
            <div className='z-10 flex flex-col  w-full  pb-4 my-4'>
                <div className='text-start pl-[70px] pt-2 pb-3 max-[800px]:text-3xl font-semibold text-gray-700 text-2xl max-[800px]:text-center max-[800px]:pl-0'>Uploaded Files</div>
                <div className="flex flex-row flex-wrap gap-4 ml-[100px] my-2 max-[800px]:justify-center max-[800px]:align-center max-[800px]:text-center max-[800px]:ml-0">
                    {uploadFilesName.length ? uploadFilesName.map((upload) => (
                        <div className='mx-0'><Upload key={upload.userId} name={upload.name} url={upload.url}/></div>
                    )) 
                    :
                    ""}
                </div>
                                    
            </div>
            :
            ""}
        </div>
        :
        <div className='w-full h-full flex justify-center text-center align-center'><NoContent/></div>
        }
        <div className='absolute w-full  z-0'><BackgroundParticle/></div>
        
            
    </div>
  )
}

export default Home