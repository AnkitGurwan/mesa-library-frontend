import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUserPath } from '../../../redux/storage/storageSlice';
import "react-toastify/dist/ReactToastify.css";

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
    <div className='flex align-center justify-center hover:scale-105 w-full border-gray-400 relative text-white font-semibold' style={{"background-image":'url("https://thumbs.dreamstime.com/b/lot-books-lying-table-colored-retro-style-vector-image-236287545.jpg")',"background-size":"cover","background-repeat":"no-repeat","background-position": "center center","backgroundColor":"white" }}>
      <Link to={`${props.name}`} onClick={clickHandler} className='w-full h-20 md:h-24 flex justify-end items-start cursor-pointer backdrop-brightness-75'>
        <div className='text-xs mr-1 mt-1 p-1 text-center capitalize bg-white text-gray-800'>{props.name}</div>
      </Link>
    </div>
  )
}

export default Folder