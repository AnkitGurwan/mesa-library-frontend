import React, { useState } from 'react';
import AuthContext from './AuthContext';
import fire from '../../config/firebase';
import { setReduxFiles, setReduxUploadedFiles,setReduxFolders } from '../../redux/storage/storageSlice';
import { useDispatch } from 'react-redux';

const AuthState = (props) => {
    const [studInfo,setStudInfo] = useState({ name : "" , email : "", roll : ""});
    const url = process.env.REACT_APP_BACKEND_URL
    const dispatch = useDispatch();

    const userLogin = async()=>{
        window.location.href = `${url}/auth/microsoft`;
    }

    const registerUser = async (email,password) => {
        
        const response = await fetch(`${url}/user/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email , password })
        });
        
        const json = await response.json();
        return response.status;
    }

    const loginUser = async (email,password) => {
        const response = await fetch(`${url}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const json = await response.json();
        localStorage.setItem('btpToken', json.token);
        return response.status;
    }

    const getToken = async(code)=>{
        const response = await fetch(`${url}/auth/microsoft/getToken`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Code': code
            }
        });

        const json=await response.json();
        localStorage.setItem('studName',json.studInformation.givenName);
        localStorage.setItem('studId',json.studInformation.mail);
        localStorage.setItem('studRoll',json.studInformation.surname);
        localStorage.setItem('studJob',json.studInformation.jobTitle);

        const data = {
            userId : json.studInformation.mail,
            isAuth : true
        }

        fire
        .firestore()
        .collection("userAuth")
        .add(data)
        .then(()=>{})

        setStudInfo({...studInfo, name : json.studInformation.givenName , roll : json.studInformation.surname , email : json.studInformation.mail});
    }

    const logOut  = async () => {
        
        const tenantID = process.env.REACT_APP_MICROSOFT_GRAPH_TENANT_ID;
        const logoutEndpoint = `https://login.microsoftonline.com/${tenantID}/oauth2/v2.0/logout?post_logout_redirect_uri=${process.env.REACT_APP_FRONTEND_URL}`;
       
        window.location.href = logoutEndpoint;
        const userId = localStorage.getItem('studId');

        fire.firestore().collection("userAuth").where('userId','==',userId).get().then(function(querySnapshot) {
            querySnapshot.forEach(async function(doc) {
                doc.ref.delete();
            });
        });
    }

    const GetDetails = async () => {
        const response1 = await fetch(`${url}/post/folder`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const response2 = await fetch(`${url}/post/file`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const response3 = await fetch(`${url}/post/upload`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const folders = await response1.json();
        dispatch(setReduxFolders(folders));

        const files = await response2.json();
        dispatch(setReduxFiles(files));

        const uploads = await response3.json();
        dispatch(setReduxUploadedFiles(uploads));
        // fire.firestore().collection("folders").get().then(async (folders)=>{
        //     const folderData = await folders.docs.map((folder)=>folder.data());
        //     dispatch(setReduxFolders(folderData));
           
        // });
        // fire.firestore().collection("files").get().then(async (files)=>{
        //     const fileData = await files.docs.map((file)=>file.data());
        //     dispatch(setReduxFiles(fileData));
        // });
        // fire.firestore().collection("uploads").get().then(async (files)=>{
        //     const uploadData = await files.docs.map((file)=>file.data());
        //     dispatch(setReduxUploadedFiles(uploadData));
        // });

        return 200;
        
    }

    const checkAuth = async () => {
        const userId = localStorage.getItem('studId');
        var flag = false;

        await fire.firestore().collection("userAuth").get().then(async (users)=>{
            const userData = await users.docs.map((user)=>user.data());

            const foldersName = userData.filter((eachUser)=>{return eachUser.userId === userId});

            flag = foldersName.length > 0 ? true:false;

            if(foldersName.length && foldersName[0].isAuth === true)
                flag=true;
                
        });
        return flag;
    }

    const checkAdminAuth = async () => {
        const AdminId = localStorage.getItem('adminId');
        var flag = false;

        await fire.firestore().collection("adminAuth").get().then(async (users)=>{
            const userData = await users.docs.map((user)=>user.data());
            const foldersName = userData.filter((eachUser)=>{return eachUser.adminId === AdminId});

            if(foldersName.length && foldersName[0].isAuth === true)
                flag=true;
            else flag=false;
                
        });
        return flag;
    }

    const sendFeedback = async (email, header,body)=>{
        const response = await fetch(`${url}/user/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, header,body }),
        });

        return response.status;
    }

    const addFolder = async (name, parent,supParent)=>{

        const response = await fetch(`${url}/post/folder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, parent,supParent }),
        });
        const json = await response.json();
        return response.status;
    }

    const addFile = async (topic , name , year, description, parent , supParent)=>{
        const response = await fetch(`${url}/post/file`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic , name , year, description, parent , supParent }),
        });
        const json = await response.json();
        return response.status;
    }

    const uploadFile = async (name,parent,supParent,urlFirebase) => {
        const response = await fetch(`${url}/post/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name,parent,supParent,urlFirebase }),
        });
        const json = await response.json();
        return response.status;
    }

    const removeFolder = async (name, parent)=>{
        const response = await fetch(`${url}/post/folder`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, parent }),
        });
        const json = await response.json();
        return response.status;
    }

    const removeFile = async (topic, parent)=>{
        const response = await fetch(`${url}/post/file`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic, parent }),
        });
        const json = await response.json();
        return response.status;
    }

    const removeUpload = async (name, parent)=>{
        const response = await fetch(`${url}/post/upload`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, parent }),
        });
        const json = await response.json();
        return response.status;
    }

    return (<AuthContext.Provider value={{ userLogin,getToken ,logOut , studInfo ,setStudInfo,GetDetails,sendFeedback,checkAuth,checkAdminAuth,registerUser,loginUser,addFolder,addFile,uploadFile,removeFile,removeFolder,removeUpload}}>
                {props.children}
            </AuthContext.Provider>)
}

export default AuthState;