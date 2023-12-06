import React, { useContext, useState } from 'react'
import AuthContext from '../../../context/auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const File = (props) => {
  const [flag,setFlag] = useState(false);
  const [flagg,setFlagg] = useState(false);
  const [showDelete,setShowDelete] = useState(false);
  const { removeFile , GetDetails } = useContext(AuthContext);
  
  const deleteHandler = async () => {
    const x = await removeFile(props.topic,props.parent);
    if(x===201)GetDetails();
  }

  return (
    <div className='border hover:bg-gray-200 rounded-lg relative mx-2'
    onMouseEnter={()=>{setShowDelete(true)}}
    onMouseLeave={()=>setShowDelete(false)}>
      {showDelete
      ?
      <div className='text-end absolute right-0 text-sm flex justify-end p-1'>
        <i onClick={deleteHandler} class="fa-solid fa-trash text-xs bg-gray-400 rounded-full w-5 h-5 flex justify-center items-center cursor-pointer"></i>
      </div>
      :
      ""
      }
    <div onClick={()=>{!flag?setFlag(true):setFlagg(false)}} className='py-4 mx-4 w-10 h-20 flex flex-col justify-center items-center cursor-pointer'>
        <i class="fa-regular fa-file px-2 text-xl font-light"></i>
        <div className='text-xs pt-2 capitalize text-center'>{props.topic?props.topic.slice(0,15):""}</div>

          {flag?<div id="myModal5" class="modal5 cursor-auto ">
                <div class= "modal-content5 flex justify-end">
                    <div   onClick={()=>{setFlag(false)}}  class="close mt-1 h-8  flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-full w-8">&times;</div>
                    <div className='p-2 text-sm '>
                      <div className='text-lg font-medium text-start pb-1 border-b mb-3 capitalize pl-2'>{props.topic}</div>
                      <div className='text-start border rounded-md p-3 uppercase'>{props.description}</div>
                      <div className='flex justify-end items-center  border-t pt-2 mt-2'>
                        <div className='flex justify-center items-center text-lg font-medium capitalize'>{props.name} , </div>
                        <div className='flex justify-end items-end px-1 uppercase'>{props.year} yearite</div>
                      </div>
                    </div>
                    
              </div>
          </div>:""}
    </div>
    </div>
  )
}

export default File