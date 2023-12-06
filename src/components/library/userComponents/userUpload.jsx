import React, { useContext, useState } from 'react'
import fire from '../../../config/firebase';
import AuthContext from '../../../context/auth/AuthContext';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const File = (props) => {
  const [showDelete,setShowDelete] = useState(false);
  const { GetDetails } = useContext(AuthContext);

  const deleteHandler = () => {
    fire.firestore().collection("uploads").where('name','==',props.name).where('parent','==',props.parent).get().then(function(querySnapshot) {
      querySnapshot.forEach(async function(doc) {
          doc.ref.delete();
          toast.success("File Removed Successfully", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        await GetDetails();
      });
  });
  
  }
  
  return (
    <div className='border hover:bg-gray-200 rounded-sm p-1 border-gray-400 relative mx-2'
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