import React, { useState } from 'react';
import AuthContext from './AuthContext';
import fire from '../../config/firebase';
import { setReduxFiles, setReduxUploadedFiles,setReduxFolders } from '../../redux/storage/storageSlice';
import { useDispatch } from 'react-redux';

const AuthState = (props) => {
    const [studInfo,setStudInfo] = useState({ name : "" , email : "", roll : ""});
    const url = "http://localhost:5000";
    const dispatch = useDispatch();

    const userLogin = async()=>{
        window.location.href = `${url}/auth/microsoft`;
    }

    const getToken = async(code)=>{
        console.log("json.studInformation")
        const response = await fetch(`${url}/auth/microsoft/getToken`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Code': code
            }
        });

        const json=await response.json();
        console.log(json.studInformation)
        localStorage.setItem('studName',json.studInformation.givenName);
        localStorage.setItem('studId',json.studInformation.mail);
        localStorage.setItem('studRoll',json.studInformation.surname);
        localStorage.setItem('studJob',json.studInformation.jobTitle);

        setStudInfo({...studInfo, name : json.studInformation.givenName , roll : json.studInformation.surname , email : json.studInformation.mail});
    }

    const logOut  = async () => {
        
        const tenantID = process.env.REACT_APP_MICROSOFT_GRAPH_TENANT_ID;
        const logoutEndpoint = `https://login.microsoftonline.com/${tenantID}/oauth2/v2.0/logout?post_logout_redirect_uri=${process.env.REACT_APP_FRONTEND_URL}`;
       
        window.location.href = logoutEndpoint;
    }

    const GetDetails = async () => {
        fire.firestore().collection("folders").get().then(async (folders)=>{
            const folderData = await folders.docs.map((folder)=>folder.data());
            dispatch(setReduxFolders(folderData));
           
        });
        fire.firestore().collection("files").get().then(async (files)=>{
            const fileData = await files.docs.map((file)=>file.data());
            dispatch(setReduxFiles(fileData));
        })
        fire.firestore().collection("uploads").get().then(async (files)=>{
            const uploadData = await files.docs.map((file)=>file.data());
            dispatch(setReduxUploadedFiles(uploadData));
        })

        return 200;
        
    }

    const sendFeedback = async (email, header,body)=>{
        const response = await fetch(`${url}/user/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, header,body }),
        });
        console.log(response.json())
        return response.status;
    }

    return (<AuthContext.Provider value={{ userLogin,getToken ,logOut , studInfo ,setStudInfo,GetDetails,sendFeedback}}>
                {props.children}
            </AuthContext.Provider>)
}

export default AuthState;