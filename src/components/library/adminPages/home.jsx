import React,{useContext,useEffect,useState} from 'react';
import Folder from '../adminComponents/folder'
import File from '../adminComponents/file'
import fire from '../../../config/firebase';
import { useNavigate } from "react-router-dom";
import Upload from "../adminComponents/upload";
import { useSelector } from 'react-redux';
import '../../styles.css'
import AuthContext from '../../../context/auth/AuthContext';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Loader from '../../loader';
import LoaderLottie from '../userComponents/loaderlottie';
import Navbar from '../adminComponents/navbar';

const Home = () => {
    const { GetDetails , addFolder, addFile , uploadFile } = useContext(AuthContext);
    const [newFolderName, setNewFolderName] = useState("");
    const [progress , setProgress] = useState("");
    const [uploadNewFile,setUploadNewFile] = useState("");
    const [added,setAdded] = useState(false);
    const [loading,setLoading]  = useState(true);
    const [allowed,setAllowed]=useState(false);
    const [newFileAdd,setNewFileAdd]  = useState(false);
    const [newUploadFileAdd,setNewUploadFileAdd]  = useState(false);
    const Navigate = useNavigate();

    const path =  useSelector(state => state.Files.path);
    

    const allFoldersName =  useSelector(state => state.Files.allFoldersNameStore);
    const foldersName = allFoldersName.filter((eachFolder)=>{return eachFolder.parent === "root" && eachFolder.supParent === "root"});

    const allFilesName = useSelector(state => state.Files.allFilesNameStore);
    const filesName = allFilesName.filter((eachFolder)=>{return eachFolder.parent === "root" && eachFolder.supParent === "root"});

    const allUploadFilesName= useSelector(state => state.Files.allUploadedFilesNameStore);
    const uploadFilesName = allUploadFilesName.filter((eachFolder)=>{return eachFolder.parent === "root" && eachFolder.supParent === "root"});

    const getItem = async () => {
        
        const flag = await GetDetails();

        if(flag === 200)
        {
            setAllowed(true);
            setLoading(false);
        }
        else 
        {
            Navigate("/");
            (toast.error('Please login to access', {
              position: toast.POSITION.TOP_CENTER
          }));
        } 

        localStorage.setItem('pathAdmin',"");

        // if(allFoldersName.length===0)
       
    }
    
    useEffect(() => {
        if (!localStorage.getItem('btpToken')) {
            Navigate(`/library`);
            toast.error("Please login to access.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }, []);
    
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
        const x = await addFolder(newFolderName,"root","root");
        
        if(x === 201)
        {
            document.getElementById("myModal").style.display="none"
            toast.success("Folder added succesfully", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setAdded(!added);
            
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
            if(file.name === fileInputData.topic)
            {
                flag = false;
            }
        })

        if(fileInputData.topic.length >= 2 && flag)
        {
            const x = await addFile(fileInputData.topic,fileInputData.name,fileInputData.year,fileInputData.description,"root","root");
            
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
            toast.warning("Please add few more word in topic.", {
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
            path : newFolderName === 'root'?[]:["parent folder path"],
            parent : "root" ,
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
            var fileData = await uploadFileRef.getDownloadURL();
            const x= await uploadFile(uploadNewFile.name,"root","root",fileData);
            if(x === 201)
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
        setNewUploadFileAdd(false);
        toast.error("File already uploaded.", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
}

    const onChangeHandler = (e) => {
        (setNewFolderName(e.target.value));
    }

    
    const submit = () => {

    }
    
    

  return (
    <div className='h-full w-full'>
        {
        loading
        ?
        <div className='h-full flex items-center justify-center'><LoaderLottie/></div>
        :
        allowed
        ?
        <div>
            <Navbar/>
        <div className='w-full flex justify-end items-center py-3 border-b'>
            
            
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
                            type="text"
                            placeholder="Enter Folder Name"
                            name="folderName"
                            onChange={onChangeHandler}
                            value={newFolderName}
                            required
                        />
                        </div>
                        
                        <div class="flex items-center justify-center">
                            <button id='myButton' onClick={addFolderHandler} class="bg-blue-600 hover:bg-blue-700 text-lg text-white font-medium my-1 py-1 px-4 rounded focus:outline-none focus:shadow-outline w-100" type="submit">
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
                                class="appearance-none border text-sm rounded w-full mb-2 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline mr-2 normal-case"
                                type="text"
                                placeholder="Enter Your Name"
                                name="name"
                                onChange={onChangeHandler2}
                                value={fileInputData.name}
                                required
                                autoComplete='off'
                            />
                            <input
                                class="appearance-none border text-sm rounded w-full mb-2 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline ml-2"
                                type="number"
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
                                class="appearance-none border text-sm rounded w-full mb-2 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline normal-case"
                                type="text"
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
                                class="appearance-none border text-sm rounded w-full h-40 mb-2 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline normal-case"
                                type="text"
                                placeholder="Decription"
                                name="description"
                                onChange={onChangeHandler2}
                                value={fileInputData.description}
                                required
                                autoComplete='off'
                            />
                        </div>
                        
                        <div class="flex items-center justify-center">
                        <button id='myButton' onClick={addFileHandler} class="bg-blue-600 hover:bg-blue-700 text-lg text-white font-medium my-1 py-1 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
                            Create File
                        </button>

                        </div>
                    </form>
                    </div>
                </div>
            
        </div>

        {loading?
        <div className='h-1/2 flex items-center  justify-center'><Loader/></div>
        :
        <div>
        <div className='flex flex-col items-center md:items-start border-b pb-4 mx-2 md:mx-12'>
            <div className='text-center pt-2 pb-3 md:pl-2'>All Folders</div>
            <div className="grid grid-cols-2 md:grid-cols-6">
                {foldersName ? foldersName.map((folder) => (
                    <div><Folder key={folder.userId} parent={folder.parent} name={folder.name}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>
        <div className='flex flex-col items-center md:items-start border-b pb-4 mx-2 md:mx-12'>
            <div className='text-center pt-2 pb-3 md:pl-2'>Created Files</div>
            <div className="grid grid-cols-2 md:grid-cols-6">
                {filesName ? filesName.map((file) => (
                    <div><File key={file.userId} parent={file.parent} name={file.name} description={file.description} year={file.year} topic={file.topic}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>

        <div className='flex flex-col items-center md:items-start border-b pb-4 mx-2 md:mx-12'>
            <div className='text-center pt-2 pb-3'>Uploaded Files</div>
            <div className="grid grid-cols-2 md:grid-cols-6">
                {uploadFilesName ? uploadFilesName.map((upload) => (
                    <div><Upload parent={upload.parent} name={upload.name} url={upload.url}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>
        </div>}

        


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
            </div>}
            {newUploadFileAdd?<div className='fixed bottom-12 right-12 bg-black text-white rounded-sm w-12 h-10 flex justify-center items-center'>{progress}</div>:""}
    </div>
  )
}

export default Home