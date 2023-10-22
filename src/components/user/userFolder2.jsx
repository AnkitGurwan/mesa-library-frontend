import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUserPath } from '../../redux/storage/storageSlice';
import "react-toastify/dist/ReactToastify.css";
import folder from '../images/folder_laptop.png';

const Folder = (props) => {
    const dispatch = useDispatch();
  
    const clickHandler = () => {
      dispatch(setUserPath(props.name));
      var x = "";
      if(localStorage.getItem('pathAdmin'))
      {
          x = localStorage.getItem('pathAdmin')
      }
      x += props.name;
      x += "$";
      localStorage.setItem('pathAdmin',x);
    }

  return (
    <div className='flex align-center justify-center hover:scale-105 w-full relative text-white mr-10 font-semibold '>
      <Link to={`${props.name}`} onClick={clickHandler} className='w-32  flex flex-col justify-center align-center text-center cursor-pointer'>
        <img src={folder} alt="folder" />
        <div className='text-[16px] mr-1 p-1 text-center capitalize text-gray-800'>{props.name}</div>
      </Link>
    </div>
  )
}

export default Folder