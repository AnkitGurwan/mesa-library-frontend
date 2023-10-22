import React, { useContext, useState } from 'react'
import fire from '../../config/firebase';
import AuthContext from '../../context/auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import upload from "../images/file.png"

const File = (props) => {
  
  return (
    <div className='flex justify-center items-center font-semibold relative hover:scale-105 '>
      <a href={props.url} target="_blank" className='py-4 mx-2 w-full h-20 flex flex-col justify-center items-center cursor-pointer'>
          <img src={upload} alt="file" className='w-16'/>
          <div className='text-[16px] px-1 font-semibold capitalize text-center '>{props.name?props.name.slice(0,20):""}</div>
      </a>
    </div>
  )
}

export default File;