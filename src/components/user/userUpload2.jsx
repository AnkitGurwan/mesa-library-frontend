import React, { useContext, useState } from 'react'
import fire from '../../config/firebase';
import AuthContext from '../../context/auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const File = (props) => {
  
  return (
    <div className='flex justify-center items-center border hover:bg-gray-200 border-gray-400 hover:text-gray-800 hover:border-gray-200 rounded-sm  relative'>
    <a href={props.url} target="_blank" className='py-4 mx-4 w-full h-20 flex flex-col justify-center items-center cursor-pointer'>
        <i class="fa-regular fa-file px-2 text-xl font-light"></i>
        <div className='text-xs px-1 pt-2 capitalize text-center '>{props.name?props.name.slice(0,20):""}</div>
    </a>
    </div>
  )
}

export default File;