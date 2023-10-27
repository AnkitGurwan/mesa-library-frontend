import React,{useContext,useEffect,useState} from 'react';
import Folder from './admin/folder'
import File from './admin/file'
import fire from '../config/firebase';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Upload from "./admin/upload";

import { useDispatch, useSelector } from 'react-redux';
import { setReduxFiles, setReduxUploadedFiles, setUpdatePath ,setPath } from '../redux/storage/storageSlice';
import AuthContext from '../context/auth/AuthContext';

const Home = () => {
    const { GetDetails , addFolder, addFile , uploadFile } = useContext(AuthContext);
    const [newFolderName, setNewFolderName] = useState("");
    const dispatch = useDispatch();
    const [uploadNewFile,setUploadNewFile] = useState("");
    const [added,setAdded] = useState(false);
    const { superSub , subExams , course , exams } = useParams();
    const Navigate = useNavigate();
    const [pathState,setPathState] = useState("");
    const allFoldersName =  useSelector(state => state.Files.allFoldersNameStore);
    const foldersName = allFoldersName.filter((eachFolder)=>{return eachFolder.parent === superSub && eachFolder.supParent === subExams});
    const [progress , setProgress] = useState("");
    const allFilesName = useSelector(state => state.Files.allFilesNameStore);
    const filesName = allFilesName.filter((eachFolder)=>{return eachFolder.parent == superSub && eachFolder.supParent === subExams});
    const [newUploadFileAdd,setNewUploadFileAdd]  = useState(false);
    const allUploadFilesName= useSelector(state => state.Files.allUploadedFilesNameStore);
    const uploadFilesName = allUploadFilesName.filter((eachFolder)=>{return eachFolder.parent == superSub && eachFolder.supParent === subExams});

    var path =  useSelector(state => state.Files.path);

    const getItem = async () => {
        // if(allFoldersName.length===0)
        await GetDetails();
        
        var pathArray = ["root"];
        pathArray.push(course);
        pathArray.push(exams);
        pathArray.push(subExams);
        pathArray.push(superSub);
    
        if(path.length <= 1)
        {
            dispatch(setPath(course));
            dispatch(setPath(exams));
            dispatch(setPath(subExams));
            dispatch(setPath(superSub));
            setPathState(pathArray);
        }
    }
    useEffect(()=>{
        getItem();
    },[added])

    const [fileInputData , setFileInputData] = useState({topic:"",name:"",year:"",description:""});

  const onChangeHandler2 = (e) => {
    setFileInputData({...fileInputData,[e.target.name] : e.target.value})
  }

  const addFolderHandler = async (e) => {
    e.preventDefault();
    var flag = true;
    
    foldersName.map((folder) => {
            if(folder.name === newFolderName)
            {
                flag = false;
            }
        })

    if(newFolderName.length >= 3 && flag)
    {
        const x = await addFolder(newFolderName,superSub,subExams);
        
        if(x === 201)
        {
            toast.success("Folder added succesfully", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setAdded(!added);
            document.getElementById("myModal").style.display="none"
            setNewFolderName("");
            
        }
    }
    else if( !flag )
    {
        toast.error("Folder Name Already Exist.", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
    else
    {
        toast.error("Please try again", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
}

const addFileHandler = async (e) => {
    e.preventDefault();
    var flag = true;
    
    filesName.map((file) => {
            if(file.topic === fileInputData.topic)
            {
                flag = false;
            }
        })

        if(fileInputData.topic.length >= 3 && flag)
        {
            const x = await addFile(fileInputData.topic,fileInputData.name,fileInputData.year,fileInputData.description,superSub,subExams);
            
            if(x === 201)
            {
                setAdded(!added);
                document.getElementById("myModal2").style.display="none"
                setFileInputData({name:"",topic:"",year:"",description:""});
                toast.success("File added succesfully", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
        else if( !flag )
        {
            toast.error("File Name Already Exist.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
        else
        {
            toast.error("Please try again", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    const handleUpload = (e) => {
        setNewUploadFileAdd(true);
        e.preventDefault();
        var flag = true;
        
        uploadFilesName.map((file) => {
                if(file.name === uploadNewFile.name)
                {
                    flag = false;
                }
            })

        if(flag)
        {
            const data = {
                createdAt : new Date(),
                name : uploadNewFile.name,
                userId : 12345,
                createdBy : "ankit",
                pathState : newFolderName === 'root'?[]:["parent folder pathState"],
                parent : superSub ,
                lastAccessed : null,
                // extension :  uploadNewFile.name? uploadNewFile.name.split(".")[1]:".txt",
                updatedAt : new Date(),
                url:""
            }
            
            const uploadFileRef = fire.storage().ref(`uploads/${data.userId}/${ uploadNewFile.name}`);
            
            uploadFileRef.put(uploadNewFile).on("state_changed",(snapshot) => {
                const progress = Math.round(
                (snapshot.bytesTransferred/ snapshot.totalBytes) * 100
                );
                setProgress(progress+ "%");
            },
            (error)=>{
                console.log(error)
            },
            async()=>{
                const fileData = await uploadFileRef.getDownloadURL();
                const x= await uploadFile(uploadNewFile.name,"root","root",fileData);
                if(x===201)
                {
                    setAdded(!added);
                    setNewUploadFileAdd(false);
                    setUploadNewFile("");
                    toast.success("File Uploaded Successfully", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    }
                    });

        }
        
        else
        {
            toast.error("File already uploaded.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    const onChangeHandler = (e) => {
        (setNewFolderName(e.target.value));
    }

    const submit = async (e)=>{
    }

    const pathHandler = (e) => {
        dispatch(setUpdatePath(e.target.innerText));
        var x = "";

        if(path.length === 1)path=pathState;
        for(let i=0;i<path.length;i++)
        {
            x += "/";
            x += path[i];
            if(e.target.innerText === path[i])
            break;
            
        }
        Navigate(`${x}`);
    }

  return (
    <div>
        <div className='w-full h-16 text-end border-b flex items-center justify-end'>
            <button onClick={()=>{Navigate('/')}} className='text-white bg-black py-1 px-2 h-8 mr-4 rounded-sm cursor-pointer'>Log Out</button>
        </div>
       
            

        <div className='flex justify-between items-center py-3 border-b'>
            <div className='flex mx-2 md:mx-6'>
            {
                path.length<2 && pathState
                ?
                pathState.map((indPath)=>{return <div className='flex items-center mr-0 md:mr-1'><button onClick={pathHandler}className='mr-3 '>{indPath}</button>
                <div className='mr-2 md:mr-3 text-xs md:text-lg'>{`>`}</div></div>})
                :
                path.map((indPath)=>{return <div className='flex items-center mr-0 md:mr-1'><button onClick={pathHandler}className='mr-3 '>{indPath}</button>
                <div className='mr-2 md:mr-3 text-xs md:text-lg'>{`>`}</div></div>})
                }
                
            </div>
        </div>

        <div className='flex flex-col items-center md:items-start border-b pb-4 mx-2 md:mx-12'>
            <div className='text-center pt-2 pb-3 md:pl-2'>All Folders</div>
            <div className="flex mx-8">
                {foldersName.length ? foldersName.map((folder) => (
                    <div><Folder key={folder.userId} parent={folder.parent} name={folder.name}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>
        <div className='flex flex-col items-center md:items-start border-b pb-4 mx-2 md:mx-12'>
            <div className='text-center pt-2 pb-3 md:pl-2'>Created Files</div>
            <div className="flex mx-8">
                {filesName.length ? filesName.map((file) => (
                    <div><File key={file.userId} name={file.createdBy} description={file.description} year={file.year} topic={file.name}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>

        <div className='flex flex-col items-center md:items-start border-b pb-4 mx-2 md:mx-12'>
            <div className='text-center pt-2 pb-3 md:pl-2'>Uploaded Files</div>
            <div className="flex mx-8">
                {uploadFilesName.length ? uploadFilesName.map((upload) => (
                    <div><Upload key={upload.userId} name={upload.name} url={upload.url}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>

        
        {newUploadFileAdd?<div className='fixed bottom-12 right-12 bg-black text-white rounded-sm w-12 h-10 flex justify-center items-center'>{progress}</div>:""}

            
    </div>
  )
}

export default Home