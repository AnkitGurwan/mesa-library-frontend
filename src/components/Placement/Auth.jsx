import React, { useContext } from 'react';
import Navbar from '../IntroPage/homeNavBar';
import AuthContext from '../../context/auth/AuthContext';


const Body = () => {
    const { userLogin } = useContext(AuthContext);

    const clickHandler = async () => {
        await userLogin();
    }

    return(
        <div className='h-screen'>
            <Navbar/>
            <div className='flex flex-col justify-center items-center h-2/3 w-full'>
                <div
                    class = "w-1/4 h-12 text-white flex justify-center items-center rounded-md cursor-pointer font-medium"
                    style={{"background-color": "#3b5998"}}
                    onClick={()=>{clickHandler()}}
                    >
                    <i class="fa-brands fa-windows text-2xl p-2 my-auto mx-2"></i>
                    Continue with Microsoft
                </div>
                <div
                    class="pt-2 w-3/4 md:w-2/5 text-center text-gray-600"
                    >Note : First Login usually takes 45-50 sec due to our free server. Soon, we will come up with a better solution.
                </div>
            </div> 
        </div>
    )
}

export default Body;