import React,{useContext,useEffect,useState} from 'react';
import Folder from '../adminComponents/folder'
import File from '../adminComponents/file'
import fire from '../../config/firebase';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Upload from "../adminComponents/upload";

import { useDispatch, useSelector } from 'react-redux';
import { setReduxFiles, setReduxUploadedFiles, setUpdatePath ,setPath } from '../../redux/storage/storageSlice';
import AuthContext from '../../context/auth/AuthContext';

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
                const x= await uploadFile(uploadNewFile.name,superSub,subExams,fileData);
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
       
       <div className='flex justify-end items-center py-3 border-b'>
            
        <div className='mr-8 flex'>
        <form onSubmit={handleUpload} className='flex items-center w-44 md:w-96 border mx-2 py-1 px-1 rounded-sm cursor-pointer hover:bg-gray-100'>
                <div class="w-full" onDragOver={(e)=>{e.preventDefault();}} onDrop={(e)=>{e.preventDefault();setUploadNewFile(e.dataTransfer.files[0])}} >
                    <label
                        class="flex justify-center w-full h-12 md:h-16 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                        <span class="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span class="font-medium text-gray-600">
                                Drop files to Attach, or
                                <span class="text-blue-600 underline px-2">browse</span>
                            </span>
                        </span>
                        <input type='file' className='hidden px-1' placeholder='Upload File' onChange={(e)=>{setUploadNewFile(e.target.files[0])}}/>
                    </label>
                </div>
                    {/* <i class="fa-solid fa-upload px-1 md:px-2"></i>
                    <input type='file' className='px-1' placeholder='Upload File' onChange={(e)=>{setUploadNewFile(e.target.files[0])}}/> */}
                    {uploadNewFile?<button className='bg-blue-500 rounded-sm text-sm text-white font-medium p-1'>Submit</button>:""}
                </form>
                <button onClick={()=>{document.getElementById("myModal2").style.display="block"}} className='flex items-center border py-1 mx-2 px-1 rounded-sm cursor-pointer hover:bg-gray-100'>
                    <i class="fa-solid fa-file px-2"></i>
                    <div className='px-1 text-xs md:text-lg'>Create File</div>
                </button>
                
                
                
            </div>
            <div id="myModal" class="modal2">
            <div class="modal-content3">
                <button onClick={()=>{document.getElementById("myModal").style.display="none"}} class="close mt-1 h-8 flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-full w-8">&times;</button>
                    <form class="w-60 mx-auto bg-white px-2" onSubmit={submit}>
                        
                    <div class="mb-1">
                        
                      <input
                        class="appearance-none border text-sm rounded w-full mb-2 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                        subExams="text"
                        placeholder="Enter Folder Name"
                        name="folderName"
                        onChange={onChangeHandler}
                        value={newFolderName}
                        required
                      />
                    </div>
                    
                    <div class="flex items-center justify-center">
                      <button id='myButton' onClick={addFolderHandler} class="bg-blue-600 hover:bg-blue-700 text-lg text-white font-medium my-1 py-1 px-4 rounded focus:outline-none focus:shadow-outline w-100" subExams="submit">
                        Add Folder
                      </button>

                    </div>
                  </form>
                </div>
              </div>
              <div id="myModal2" class="modal3">
                <div class="modal-content4">
                    <button onClick={()=>{document.getElementById("myModal2").style.display="none"}} class="close mt-1 h-8 flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-full w-8">&times;</button>
                        <form class="w-full h-68 mx-auto bg-white px-2" onSubmit={submit}>
                        <div class="mb-1 w-full flex">  
                            <input
                                class="appearance-none border text-sm rounded w-full mb-2 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                subExams="text"
                                placeholder="Enter Your Name"
                                name="name"
                                onChange={onChangeHandler2}
                                value={fileInputData.name}
                                required
                                autoComplete='off'
                            />
                            <input
                                class="appearance-none border text-sm rounded w-full mb-2 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline ml-2"
                                subExams="text"
                                placeholder="Year Of Studying"
                                name="year"
                                onChange={onChangeHandler2}
                                value={fileInputData.year}
                                required
                                autoComplete='off'
                            />
                        </div>
                        <div class="mb-1 w-full">  
                            <input
                                class="appearance-none border text-sm rounded w-full mb-2 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                                subExams="text"
                                placeholder="Heading"
                                name="topic"
                                onChange={onChangeHandler2}
                                value={fileInputData.topic}
                                required
                                autoComplete='off'
                            />
                        </div>
                        <div class="mb-1 w-full">  
                            <textarea
                                class="appearance-none border text-sm rounded w-full h-40 mb-2 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                                subExams="text"
                                placeholder="Decription"
                                name="description"
                                onChange={onChangeHandler2}
                                value={fileInputData.description}
                                required
                                autoComplete='off'
                            />
                        </div>
                        
                        <div class="flex items-center justify-center">
                        <button id='myButton' onClick={addFileHandler} class="bg-blue-600 hover:bg-blue-700 text-lg text-white font-medium my-1 py-1 px-4 rounded focus:outline-none focus:shadow-outline w-full" subExams="submit">
                            Create File
                        </button>

                        </div>
                    </form>
                    </div>
                </div>
            
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
                    <div><Upload key={upload.userId} parent={upload.parent} name={upload.name} url={upload.url}/></div>
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