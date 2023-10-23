import React, { useState } from 'react';
import AuthContext from './AuthContext';
import fire from '../../config/firebase';
import { setReduxFiles, setReduxUploadedFiles,setReduxFolders } from '../../redux/storage/storageSlice';
import { useDispatch } from 'react-redux';

const AuthState = (props) => {
    const [studInfo,setStudInfo] = useState({ name : "" , email : "", roll : ""});
    const url = process.env.REACT_APP_BACKEND_URL;
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

    const checkAuth = async () => {
        const userId = localStorage.getItem('studId');
        var flag = false;

        await fire.firestore().collection("userAuth").get().then(async (users)=>{
            const userData = await users.docs.map((user)=>user.data());
            console.log(userData)
            const foldersName = userData.filter((eachUser)=>{return eachUser.userId === userId});
            console.log("hii",foldersName)
            flag = foldersName.length > 0 ? true:false;

            if(foldersName.length && foldersName[0].isAuth === true)
                flag=true;
                console.log("kkk",flag)
                
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
        console.log(response.json())
        return response.status;
    }

    return (<AuthContext.Provider value={{ userLogin,getToken ,logOut , studInfo ,setStudInfo,GetDetails,sendFeedback,checkAuth}}>
                {props.children}
            </AuthContext.Provider>)
}

export default AuthState;