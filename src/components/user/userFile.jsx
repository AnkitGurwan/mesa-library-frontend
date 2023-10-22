import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setPath } from '../../redux/storage/storageSlice';
import folder from '../images/folder.png';
import fire from '../../config/firebase';
import AuthContext from '../../context/auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import file from '../images/user-guide.png';

const File = (props) => {
  const [flag,setFlag] = useState(false);
  const [flagg,setFlagg] = useState(false);
  const [showDelete,setShowDelete] = useState(false);
  const { GetDetails } = useContext(AuthContext);
  

  return (
    <div className='border hover:bg-gray-300 text-white hover:text-gray-700 rounded-lg relative mx-2 cursor-pointer' onClick={()=>{!flag?setFlag(true):setFlagg(false)}}>
  
    <div  className='py-3 mx-2 w-auto h-auto flex flex-col justify-center items-center  '>
        <div className='flex flex-col justify-center items-center'>
          <img src={file} alt="file" className='w-10 h-12' />
          <div className='text-[12px] md:text-[14px] w-full py-1 md:py-2 leading-4  capitalize text-center font-medium '>{props.name?props.name.slice(0,15):""}</div>
        </div>

          {flag?
          <div id="myModal5" class="modal5 cursor-auto ">
            <div class="relative w-full max-w-4xl max-h-full mt-20 ml-0 md:ml-36">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white capitalize">
                     {props.topic}
                </h3>
                <button type="button" onClick={()=>{setFlag(false)}} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="large-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div class="p-6 space-y-6">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 capitalize">
                   {props.description}
                </p>
                
            </div>
            <div class="flex justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 capitalize">{props.name}</button>
                <button class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">{props.year}{props.year==1?"st":props.year==2?"nd":props.year==3?"rd":"th"} yearite</button>
            </div>
        </div>
    </div>
                
          </div>:""}
    </div>
    </div>
  )
}

export default File;

