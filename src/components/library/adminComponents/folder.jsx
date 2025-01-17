import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPath } from '../../../redux/storage/storageSlice';
import folder from '../../images/folder.png';
import AuthContext from '../../../context/auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Folder = (props) => {
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const { removeFolder, GetDetails } = useContext(AuthContext);
  
  const clickHandler = () => {
    dispatch(setPath(props.name));
  };

  const deleteHandler = async () => {
    if (confirmationText.toLocaleLowerCase() === 'delete' ) {
      const x = await removeFolder(props.name, props.parent);
      if (x === 201) GetDetails();
      setShowConfirm(false); // Close the confirmation input
    } else {
      // You can show an alert or message that the input is incorrect
      toast.error("Please type 'DELETE' to confirm.", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };

  return (
    <div
      className='hover:bg-gray-200 rounded-lg relative'
      onMouseEnter={() => { setShowDelete(true); }}
      onMouseLeave={() => setShowDelete(false)}
    >
      {showDelete && !showConfirm && (
        <div className='text-end absolute right-0 text-sm flex justify-end p-1'>
          <i
            onClick={() => setShowConfirm(true)}  // Show the confirmation input when clicked
            className="fa-solid fa-trash bg-gray-400 rounded-full w-6 h-6 flex justify-center items-center cursor-pointer"
          ></i>
        </div>
      )}

      {showConfirm && (
        <div className='fixed top-1/3 left-[15%] md:left-[40%] bg-white p-8 rounded-lg shadow-lg'>
          <div className="flex flex-col items-center">
            <p className="mb-2">Type <strong>DELETE</strong> to confirm</p>
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              className="p-2 border rounded mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={deleteHandler}
                className="bg-blue-500 text-white px-5 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={
                  () => {
                    setShowConfirm(false);
                    setConfirmationText('');
                  } 
                } // Close the confirmation input
                className="bg-gray-500 text-white px-5 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Link
        to={`${props.name}`}
        onClick={clickHandler}
        className='py-3 mx-2 rounded-xl overflow-y-hidden w-24 h-24 flex justify-between items-center cursor-pointer flex-col'
      >
        <img src={folder} alt="folder" className='' />
        <div className='text-xs px-1 pt- capitalize'>{props.name}</div>
      </Link>
    </div>
  );
};

export default Folder;
