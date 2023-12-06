import React, { useContext, useState } from 'react'
import AuthContext from '../../../context/auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const File = (props) => {
  const [flag,setFlag] = useState(false);
  const [flagg,setFlagg] = useState(false);
  const [showDelete,setShowDelete] = useState(false);
  const { GetDetails } = useContext(AuthContext);
  

  return (
    <div className='border w-full hover:bg-gray-200 text-gray-600 md:hover:text-gray-700 rounded-lg relative cursor-pointer' onClick={()=>{!flag?setFlag(true):setFlagg(false)}}>
  
    <div  className='py-4 w-full h-20 flex flex-col justify-center items-center  '>
        <i class="fa-regular fa-file px-2 text-xl font-light"></i>
        <div className='text-xs px-1 pt-2 capitalize text-center'>{props.topic?props.topic.slice(0,15):""}</div>

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

{/* <div class= "modal-content5 flex justify-end">
                    <div   onClick={()=>{setFlag(false)}}  class="close mt-1 h-8  flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-full w-8">&times;</div>
                    <div className='p-2 text-sm '>
                      <div className='text-lg font-medium text-start pb-1 border-b mb-3 capitalize pl-2'>{props.topic}</div>
                      <div className='text-start border rounded-md p-3 uppercase'>{props.description}</div>
                      <div className='flex justify-end items-center  border-t pt-2 mt-2'>
                        <div className='flex justify-center items-center text-lg font-medium capitalize'>{props.name} , </div>
                        <div className='flex justify-end items-end px-1 uppercase'>{props.year} yearite</div>
                      </div>
                    </div>
                    
              </div> */}