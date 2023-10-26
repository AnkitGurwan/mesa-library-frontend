import React,{useContext,useEffect,useState} from 'react';
import Folder from './admin/folder'
import File from './admin/file'
import fire from '../config/firebase';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Upload from "./admin/upload";

import { useDispatch, useSelector } from 'react-redux';
import { setReduxFiles, setReduxUploadedFiles, setUpdatePath } from '../redux/storage/storageSlice';
import AuthContext from '../context/auth/AuthContext';

const Home = () => {
    const { GetDetails } = useContext(AuthContext);
    const [newFolderName, setNewFolderName] = useState("");
    const dispatch = useDispatch();
    const [uploadNewFile,setUploadNewFile] = useState("");
    const [added,setAdded] = useState(false);
    const { subExams } = useParams();
    const Navigate = useNavigate();
    const [pathState,setPathState] = useState("");
    const allFoldersName =  useSelector(state => state.Files.allFoldersNameStore);
    const foldersName = allFoldersName.filter((eachFolder)=>{return eachFolder.parent === subExams});

    const allFilesName = useSelector(state => state.Files.allFilesNameStore);
    const filesName = allFilesName.filter((eachFolder)=>{return eachFolder.parent == subExams});

    const allUploadFilesName= useSelector(state => state.Files.allUploadedFilesNameStore);
    const uploadFilesName = allUploadFilesName.filter((eachFolder)=>{return eachFolder.parent == subExams});

    var path =  useSelector(state => state.Files.path);
    const getItem = async () => {
        if(foldersName.length === 0)
        await GetDetails();
        
        const x = localStorage.getItem('pathAdmin');
        var str = "";
        var pathArray = ["root"];
        for(let i=0; i<x.length;i++)
        {
            if(x[i]==='$')
            {
                pathArray.push(str);
                str = "";
            }
            else str+=x[i];
        }
        path = pathArray;
        setPathState(path);
    }
    useEffect(()=>{
        getItem();
    },[added])

    const [fileInputData , setFileInputData] = useState({topic:"",name:"",year:"",description:""});

  const onChangeHandler2 = (e) => {
    setFileInputData({...fileInputData,[e.target.name] : e.target.value})
  }

    const addFolderHandler = (e) => {
        e.preventDefault();
        var flag = true;
        
        foldersName.map((folder) => {
                if(folder.name === newFolderName)
                {
                    flag = false;
                }
            })

        if(newFolderName.length > 3 && flag)
        {
            const data = {
                createdAt : new Date(),
                name : newFolderName,
                userId : 12345,
                createdBy : 'ankit',
                path : newFolderName==='root'?[]:["parent folder path"],
                parent : subExams ,
                lastAccessed : null,
                updatedAt : new Date()
            }
            fire
            .firestore()
            .collection("folders")
            .add(data)
            .then((folder)=>{
                setAdded(!added);
                setNewFolderName("");
                if(document.getElementById("myModal"))
                    document.getElementById("myModal").style.display="none"
                    toast.success("Folder Added Successfully", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
            })

        }
        else if( flag )
        {
            toast.error("Folder Name must have atleast 4 characters.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
        else
        {
            toast.error("Folder Name Already Exist.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    const addFileHandler = (e) => {
        e.preventDefault();
        var flag = true;
        
        filesName.map((file) => {
                if(file.name === fileInputData.topic)
                {
                    flag = false;
                }
            })

        if(fileInputData.topic.length >= 3 && flag)
        {
            const data = {
                createdAt : new Date(),
                name : fileInputData.topic,
                userId : 12345,
                createdBy : fileInputData.name,
                year : fileInputData.year,
                description : fileInputData.description,
                path : newFolderName === 'root'?[]:["parent folder path"],
                parent : subExams ,
                lastAccessed : null,
                updatedAt : new Date()
            }
            fire
            .firestore()
            .collection("files")
            .add(data)
            .then((file)=>{
                setAdded(!added);
                setFileInputData({name:"",topic:"",year:"",description:""});
                if(document.getElementById("myModal2"))
                    document.getElementById("myModal2").style.display="none"
                    toast.success("File Created Successfully", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
            })

        }
        else if( flag )
        {
            toast.error("Folder Name must have atleast 4 characters.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
        else
        {
            toast.error("Folder Name Already Exist.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    const handleUpload = (e) => {
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
                path : newFolderName === 'root'?[]:["parent folder path"],
                parent : subExams ,
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
            console.log(progress+ "%");
            },
            (error)=>{
                console.log(error)
            },
            async()=>{
                const fileData = await uploadFileRef.getDownloadURL();
                data.url=fileData;
                fire
                .firestore()
                .collection("uploads")
                .add(data)
                .then((file)=>{
                    setAdded(!added);
                    setUploadNewFile("");
                })
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
            if(e.target.innerText === pathState[i])
            break;
            
        }
        localStorage.setItem('pathAdmin',y);
        Navigate(`${x}`);
    }
  return (
    <div>
        <div className='w-full h-16 text-end border-b flex items-center justify-end'>
            <button onClick={()=>{Navigate('/')}} className='text-white bg-black py-1 px-2 h-8 mr-4 rounded-sm cursor-pointer'>Log Out</button>
        </div>
        <div className='flex justify-end items-center py-3 border-b'>
            
        <div className='mr-8 flex'>
                <form onSubmit={handleUpload} className='flex items-center w-40 md:w-64 border mx-2 py-1 px-1 rounded-sm cursor-pointer hover:bg-gray-100'>
                    <i class="fa-solid fa-upload px-1 md:px-2"></i>
                    <input type='file' className='px-1' placeholder='Upload File' onChange={(e)=>{setUploadNewFile(e.target.files[0])}}/>
                    {uploadNewFile?<button className='bg-blue-500 rounded-sm text-sm text-white font-medium p-1'>Submit</button>:""}
                </form>
                <button onClick={()=>{document.getElementById("myModal2").style.display="block"}} className='flex items-center border py-1 mx-2 px-1 rounded-sm cursor-pointer hover:bg-gray-100'>
                    <i class="fa-solid fa-file px-2"></i>
                    <div className='px-1 text-xs md:text-lg'>Create File</div>
                </button>
                <button id='myBtn' onClick={()=>{document.getElementById("myModal").style.display="block"}} className='flex items-center border py-1 px-1 mx-1 md:mx-2 rounded-sm cursor-pointer hover:bg-gray-100'>
                    <i class="fa-solid fa-folder px-1 md:px-2"></i>
                    <div  className='px-1 text-xs md:text-lg'>Add Folder</div>
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
                pathState
                ?
                pathState.map((indPath)=>{return <div className='flex items-center mr-0 md:mr-1'><button onClick={pathHandler} className='mr-3 '>{indPath}</button>
                <div className='mr-2 md:mr-3 text-xs md:text-lg'>{`>`}</div></div>}):""
                }
                
            </div>
        </div>

        <div className='flex flex-col items-center md:items-start border-b pb-4 mx-2 md:mx-12'>
            <div className='text-center pt-2 pb-3 md:pl-2'>All Folders</div>
            <div className="grid grid-cols-2 md:grid-cols-6">
                {foldersName.length ? foldersName.map((folder) => (
                    <div><Folder key={folder.userId} parent={folder.parent} name={folder.name}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>
        <div className='flex flex-col items-center md:items-start border-b pb-4 mx-2 md:mx-12'>
            <div className='text-center pt-2 pb-3 md:pl-2'>Created Files</div>
            <div className="grid grid-cols-2 md:grid-cols-6">
                {filesName.length ? filesName.map((file) => (
                    <div><File key={file.userId} name={file.createdBy} description={file.description} year={file.year} topic={file.name}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>

        <div className='flex flex-col items-center md:items-start border-b pb-4 mx-2 md:mx-12'>
            <div className='text-center pt-2 pb-3 md:pl-2'>Uploaded Files</div>
            <div className="grid grid-cols-2 md:grid-cols-6">
                {uploadFilesName.length ? uploadFilesName.map((upload) => (
                    <div><Upload key={upload.userId} name={upload.name} url={upload.url}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>

        


            
    </div>
  )
}

export default Home