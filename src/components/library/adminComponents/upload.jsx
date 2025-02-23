import React, { useContext, useState } from 'react';
import AuthContext from '../../../context/auth/AuthContext';

const File = (props) => {
  const [showDelete,setShowDelete] = useState(false);
  const { removeUpload , GetDetails } = useContext(AuthContext);

  const deleteHandler = async () => {
    const x = await removeUpload(props.name,props.parent);
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
    <a href={props.url} target="_blank" className='py-4 mx-4 w-10 h-20 flex flex-col justify-center items-center cursor-pointer'>
        <i class="fa-regular fa-file px-2 text-xl font-light"></i>
        <div className='text-xs px-1 pt-2 capitalize text-center '>{props.name?props.name.slice(0,20):""}</div>
    </a>
    </div>
  )
}

export default File