import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setPath } from '../../redux/storage/storageSlice';
import folder from '../images/folder.png';
import fire from '../../config/firebase';
import AuthContext from '../../context/auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Folder = (props) => {
  const dispatch = useDispatch();
  const [showDelete,setShowDelete] = useState(false);
  const { GetDetails } = useContext(AuthContext);
  
  const clickHandler = () => {
    dispatch(setPath(props.name));
    var x = "";
    if(localStorage.getItem('pathAdmin'))
    {
        x = localStorage.getItem('pathAdmin')
    }
    x += props.name;
    x += "$";
    localStorage.setItem('pathAdmin',x);
  }

  const deleteHandler = () => {
    fire.firestore().collection("folders").where('name','==',props.name).where('parent','==',props.parent).get().then(function(querySnapshot) {
      querySnapshot.forEach(async function(doc) {
          doc.ref.delete();
          toast.success("Folder Deleted Successfully", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        await GetDetails();
      });
  });
  
  }

  return (
    <div className='hover:bg-gray-200 rounded-lg relative'
    onMouseEnter={()=>{setShowDelete(true)}}
    onMouseLeave={()=>setShowDelete(false)}>
      {showDelete
      ?
      <div className='text-end absolute right-0 text-sm flex justify-end p-1'>
        <i onClick={deleteHandler} class="fa-solid fa-trash bg-gray-400 rounded-full w-6 h-6 flex justify-center items-center cursor-pointer"></i>
      </div>
      :
      ""
      }
      <Link to={`${props.name}`} onClick={clickHandler} className='py-3 mx-2 rounded-xl overflow-y-hidden w-24 h-24 flex justify-between items-center cursor-pointer  flex-col'>
        <img src={folder} alt="folder" className='' />
        {/* <i class="fa-regular fa-folder px-2 text-2xl font-light"></i> */}
        <div className='text-xs px-1 pt- capitalize'>{props.name}</div>
      </Link>
    </div>
  )
}

export default Folder