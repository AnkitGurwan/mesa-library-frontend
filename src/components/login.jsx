import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext'
import fire from '../config/firebase';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import logo from './images/mesa-logo.png';
import { Spinner } from "@material-tailwind/react";

const Login = () => {
    const {userLogin} = useContext(AuthContext);
    const [user , setUser] = useState({email:"",password:""});
    const [loading,setLoading] = useState(false);
    const Navigate = useNavigate();

    const changeHandler = (e) => {
        setUser({...user,[e.target.name] : e.target.value})
    }

    const clickHandler = async () => {
        await userLogin();
    }

    const submitHandler = (e) => {
        setLoading(true);
        e.preventDefault();
        if(user.email && user.password)
        {
            fire
            .auth()
            .signInWithEmailAndPassword(user.email,user.password)
            .then((user)=>{
                setLoading(false);
                toast.success("Logged In Successfully", {
                    position: toast.POSITION.TOP_RIGHT
                });
                Navigate('/root');
            })
            .catch((error)=>{
                setLoading(false);
                if(error.code === "auth/invalid-login-credentials")
                    toast.error("Invalid Password", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                else if(error.code === "auth/too-many-requests")
                {
                    toast.error("Too many retry's. Your account is temporarily blocked. Try again after some time.", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
                else{
                    toast.error("User not found", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            })
        }
    }

    return (
        <div className='h-full w-full flex flex-col overflow-y-hidden' style={{"backgroundColor":"rgb(220 252 231)"}}> 

            <div className='w-full md:w-1/2 p-8 md:p-0 h-1/3 md:h-full flex justify-center items-center flex-col '>
                <img className='h-full' src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'/>  
               
            </div>
            
            <div className='h-2/3 md:h-full w-full md:w-1/2 flex justify-center items-center flex-col mb-12 md:my-0'>
            <div className='flex items-center my-2 md:my-0'>
                <img src= {logo} alt="logo" className="h-12 md:h-20 w-20  md:w-36 object-fit" />
                <div className="header text-lg md:text-2xl container text-right tracking-wider font-bold text-blue-900">
                    Welcome to MESA Library!
                </div>
            </div>
            <form onSubmit={submitHandler}>
                <div class="relative mb-2 md:mb-4 "  data-te-input-wrapper-init>
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

                <div class="relative mb-2 md:mb-4">
                    <input
                    type="password"
                    class="border outline-0 py-2 px-3 w-72 rounded-xl focus:outline-4 focus:outline-blue-300 "
                    name='password'
                    value={user.password}
                    placeholder="Password"
                    required
                    onChange={changeHandler} />
                    
                </div>

                <div class="mb-4 px-3 flex items-center justify-between text">
                    <Link
                    to={'/register'}
                    class="text-gray-600 hover:underline"
                    >New User?</Link>
                </div>

                {loading 
                ?
                <div>
                    
                    <div className='w-full px-3 h-12 rounded-md text-lg font-bold flex justify-center items-center bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]'>
                        <div className='pr-2'><Spinner/></div>
                        <div>Loading...</div>
                    </div>
                </div>
                
                :
                <button
                    type="submit"
                    class="px-7 w-full h-12 rounded-md text-md font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] bg-blue-700 hover:bg-blue-800">
                    Sign in
                </button>}

                <div
                    class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-black after:mt-0.5 after:flex-1 after:border-t after:border-black">
                    <p
                    class="mx-4 mb-0 text-center font-sembold dark:text-black-500">
                    OR
                    </p>
                </div>

                <div
                    class = "w-full h-12 text-white flex justify-center items-center rounded-md cursor-pointer font-medium"
                    style={{"background-color": "#3b5998"}}
                    onClick={clickHandler}>
                    <i class="fa-brands fa-windows text-2xl p-2 my-auto mx-2"></i>
                    Continue with Microsoft
                </div>
          
        </form>
            </div>
        </div>

  )
}

export default Login;