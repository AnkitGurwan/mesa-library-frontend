import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../../../context/auth/AuthContext';
import { BsChevronRight } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Folder from '../userComponents/userFolder';
import Lottie from '../userComponents/courselottie';
import LoaderLottie from '../userComponents/loaderlottie';
import { HiMenu, HiX } from 'react-icons/hi';

const HomePage = () => {
    const { logOut, GetDetails, getToken, checkAuth, createStudent } = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const Navigate = useNavigate();

    const funcAllowed = async () => {
        const rollNumber = parseInt(localStorage.getItem('studRoll'));
        const flag = await checkAuth();

        if (rollNumber && flag) {
            if (
                (210103001 <= rollNumber && rollNumber <= 210103140) ||
                (230103001 <= rollNumber && rollNumber <= 230103140) ||
                (200103001 <= rollNumber && rollNumber <= 200103140) ||
                (220103001 <= rollNumber && rollNumber <= 220103140)
            ) {
                setAllowed(true);
                setLoading(false);
            } else {
                setLoading(false);
                setAllowed(false);
            }
        } else {
            Navigate("/");
            toast.error('Please login to access', { position: toast.POSITION.TOP_CENTER });
        }
    };

    const getItem = async () => {
        const code = searchParams.get('code');

        if (!localStorage.getItem('studName') && code)
            await getToken(code);

        await GetDetails();

        if (localStorage.getItem('studName'))
            await createStudent(localStorage.getItem('studId'), localStorage.getItem('studName'), localStorage.getItem('studRoll'));

        funcAllowed();
    };

    useEffect(() => {
        getItem();
        localStorage.setItem('pathAdmin', "");
    }, []);

    const allFoldersName = useSelector(state => state.Files.allFoldersNameStore);
    const foldersName = allFoldersName.filter((eachFolder) => eachFolder.parent === "root");

    const allFilesName = useSelector(state => state.Files.allFilesNameStore);
    const filesName = allFilesName.filter((eachFile) => eachFile.parent === "root");

    const allUploadFilesName = useSelector(state => state.Files.allUploadedFilesNameStore);
    const uploadFilesName = allUploadFilesName.filter((eachUpload) => eachUpload.parent === "root");

    const studName = localStorage.getItem('studName') ? localStorage.getItem('studName').toLowerCase() : "";

    const logOutHandler = async () => {
        localStorage.clear('studName', 'studId', 'studRoll', 'studJob');
        await logOut();
    };

    return (
        <div className='w-full' style={{ backgroundImage: 'linear-gradient(to top left, white 0%, #132d7a 74%)' }}>
            {loading ? (
                <div className='bg-white h-full flex items-center justify-center'>
                    <LoaderLottie />
                </div>
            ) : allowed ? (
                <div className='w-full'>
                    {/* NAVBAR */}
                    <div className='w-full h-auto text-white'>
                        <div className='flex justify-between items-center mx-4 md:mx-8 py-4 relative'>
                            <div className='text-xl md:text-3xl font-bold pl-2 md:pl-4 pt-0 md:pt-4'>MESA Library</div>

                            {/* Desktop Menu */}
                            <div className='hidden md:flex space-x-4'>
                                <Link to={'/library/placements'} className="hover:underline tracking-wide">Placement Stats</Link>
                                <Link to={'/library/feedback'} className='hover:underline'>Feedback</Link>
                                <button onClick={logOutHandler} className='hover:underline'>Log Out</button>
                            </div>

                            {/* Mobile Menu Icon */}
                            <div className='md:hidden'>
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                    {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                                </button>
                            </div>

                            {/* Mobile Dropdown Menu */}
                            {isMenuOpen && (
                                <div className='absolute top-16 right-4 bg-white text-black rounded-md shadow-lg p-4 space-y-3 z-20'>
                                    <Link to={'/library/placements'} className="block hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Placement Stats</Link>
                                    <Link to={'/library/feedback'} className="block hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Feedback</Link>
                                    <button onClick={() => { logOutHandler(); setIsMenuOpen(false); }} className="block hover:text-blue-600">Log Out</button>
                                </div>
                            )}
                        </div>

                        {/* Welcome Section */}
                        <div className='ml-4 mt-5 flex flex-col justify-center items-center'>
                            <div className='text-2xl md:text-3xl font-semibold p-0 md:p-1 capitalize'>Welcome {studName} 👋</div>
                            <div className='text-xl font-medium pt-0 md:pt-1'>Mechanical Engineer 👨‍🔧</div>
                        </div>
                        <a
                            href="#material"
                            className='mx-auto flex justify-center items-center w-28 mt-8 border p-2 rounded-lg hover:bg-gray-100 hover:text-black cursor-pointer scroll-smooth z-10'>
                            <Link to={'/library/placements'} className="block hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Placement Stats</Link>
                            <BsChevronRight />
                        </a>
                    </div>

                    

                    {/* MATERIAL SECTION */}
                    <div id='material' className='flex justify-center w-full md:px-4 pt-2 pb-5 z-10'>
                        <div className='bg-[#2b365647] rounded-lg md:rounded-xl p-2 flex flex-col items-center w-full md:3/5 my-2 md:my-4 mx-12 md:mx-32'>
                            <div className='text-xl md:text-3xl text-start text-white font-bold pt-2 pb-4 md:pb-8'>ALL SEMESTERS</div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10  mx-4 md:mx-8 py-2">
                                {foldersName.map((folder) => (
                                    <div key={folder.userId}><Folder parent={folder.parent} name={folder.name} /></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Animation */}
                    <div className='absolute top-28 md:top-4 left-0 md:left-4 z-0'><Lottie /></div>
                </div>
            ) : (
                <div className="absolute top-24 left-9 md:left-1/3 w-4/5 md:w-1/3">
                    <div className="max-w-md bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-3xl font-bold mb-4">404</h1>
                        <p className="text-lg text-gray-700 mb-6">Oops! The page you're looking for could not be accessed by you.</p>
                        <div className="bg-blue-500 text-center text-white text-xl font-bold py-2 px-4 rounded">
                            You are not part of this Course.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
