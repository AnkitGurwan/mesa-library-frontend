import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import fire from '../config/firebase';
import logo from './images/mesa-logo.png';
import { Spinner } from "@material-tailwind/react";

const Login = () => {
    const [user , setUser] = useState({email:"",password:"",confirmPassword:""});
    const [loading,setLoading] = useState(false);
    const Navigate = useNavigate();
    
    const changeHandler = (e) => {
        setUser({...user,[e.target.name] : e.target.value})
    }


    const clickHandler = async () => {
       
    }

    const submitHandler = (e) => {
        setLoading(true);
        e.preventDefault();
        if(user.password != user.confirmPassword)
        {
            alert(user.password);
            alert(useEffect.confirmPassword)
            toast.error("Password does not match", {
                position: toast.POSITION.BOTTOM_RIGHT
              });
        }
        if(user.email && user.password)
        {
            fire
            .auth()
            .createUserWithEmailAndPassword(user.email,user.password)
            .then((user) => {
                fire
                .auth()
                .currentUser
                .updateProfile({
                displayName: user.email
                }).then(() => {
                    setLoading(false);
                    const currentUser = fire.auth().currentUser;
                    toast.success("Registered Successfully", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    Navigate('/root');
                })
                .catch((err)=>{
                    setLoading(false);
                    toast.error("Please try again.", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                })
            })
            .catch((err) => {
                setLoading(false);
                if(err.code === "auth/email-already-in-use"){
                    toast.error("Email already in use", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
                if(err.code === 'auth/invalid-email'){
                    toast.error("Invalid email", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
                if(err.code === 'auth/weak-password'){
                    toast.error("Weak password", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            })
        }
    }
    return (
        <div>
        {false
            ?
            <div className='w-full h-full flex flex-col md:flex-row overflow-hidden' style={{"backgroundColor":"rgb(220 252 231)"}}> 
           

           <div className='w-full md:w-1/2 h-1/3 md:h-full py-8 flex justify-center items-center flex-col '>
                <img className='h-full' src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'/>  
                
               
            </div>
            
            <div className='h-2/3 md:h-full w-full mb-12 md:w-1/2 flex justify-center items-center flex-col'>
            <div className='flex items-center mb-2 md:mb-0'>
                <img src= {logo} alt="logo" className="h-12 md:h-20 w-20 md:w-36 object-fit" />
                <div className="header text-lg md:text-2xl container text-right tracking-wider font-bold text-blue-900">
                    Welcome to MESA Library!
                </div>
            </div>
            <form onSubmit={submitHandler}>
                <div class="relative mb-4"  data-te-input-wrapper-init>
                    <input
                    type="email"
                    class="border outline-0  py-2 px-3 w-72 rounded-xl focus:outline-4 focus:outline-blue-300"
                    placeholder="Email address" 
                    name='email'
                    value={user.email}
                    onChange={changeHandler}
                    required
                    autofocus />
                   
                </div>

                <div class="relative mb-4">
                    <input
                    type="password"
                    class="border outline-0  mb-1 py-2 px-3 w-72 rounded-xl focus:outline-4 focus:outline-blue-300"
                    name='password'
                    value={user.password}
                    placeholder="Password"
                    required
                    onChange={changeHandler} />
                    

                <div class="relative mb-4">
                    <input
                    type="password"
                    class="border outline-0  py-2 px-3 w-72 rounded-xl focus:outline-4 focus:outline-blue-300"
                    name='confirmPassword'
                    value={user.confirmPassword}
                    placeholder="Confirm Password"
                    required
                    onChange={changeHandler} />
                    
                </div>
                </div>

                <div class="mb-4 flex items-center justify-between">
                    <Link
                    to={'/'}
                    class="text-gray-600 hover:underline"
                    >Already a User?</Link>
                </div>

                {loading?
                <div>
                    <div className='w-full px-7 h-12 rounded-md text-lg font-bold flex justify-center items-center bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]'>
                    <div className='pr-2'><Spinner/></div>
                        <div>Loading...</div>
                    </div>
                </div>
                :
                <button
                    type="submit"
                    class="px-7 w-full h-12 rounded-md text-lg font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] bg-blue-700 hover:bg-blue-800">
                    Register
                </button>
                }

                
          
        </form>
            </div>
        </div>
                :
                <div class="absolute top-24 left-9 md:left-1/3 w-4/5 md:w-1/3">
                <div class="max-w-md bg-white rounded-lg shadow-md p-8">
                    <h1 class="text-3xl font-bold mb-4">404</h1>
                    <p class="text-lg text-gray-700 mb-6">Oops! The page you're looking for could not be accessed by you.</p>
                    <div class="bg-blue-500 text-center text-white text-lg font-semibold py-2 px-4 rounded">
                        Please try to login through Microsoft.
                    </div>
                </div>
            </div>}
            </div>
  )
}

export default Login;