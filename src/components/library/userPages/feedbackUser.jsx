import React,{useState, useContext} from 'react';
import { useNavigate, useParams ,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../context/auth/AuthContext';

const Feedbackpage = () => {
    const {sendFeedback} = useContext(AuthContext);
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({ email: "", header: "",body: "" });

    const detectChanges = async(e)=>{
        setFeedback({...feedback,[e.target.name]:e.target.value});  
    }

    const submit = async (e)=>{
        e.preventDefault();   
        const x = sendFeedback(feedback.email,feedback.header,feedback.body);
        
       
        toast.success('Feedback sent successfully', {
            position: toast.POSITION.TOP_CENTER
        });
        navigate('/main');

    }

    return(
        
        <section class="bg-white dark:bg-gray-900">
            <Link to={`/main`} className='fixed text-lg md:text-2xl hover:scale-105 font-bold no-underline text-blue-1200 ml-4 md:ml-8 mt-4'>Home</Link>
            <div class="py-4 md:py-6 px-4 mx-auto max-w-screen-md">
                <h2 class="mb-2 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                <p class="mb-4 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl focus">Got a technical issue? Want to send feedback about a feature?</p>
                <form onSubmit={submit} class="space-y-6">
                    <div>
                        <label for="email" class="mb-3 text-sm flex font-medium text-gray-900 dark:text-gray-300"><div>Your email</div><div className="text-red-600">*</div></label>
                        <input type="email" id="email" class="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:shadow-sm-light" name='email' value={feedback.email} autoFocus onChange={detectChanges} placeholder="name@gmail.com" required/>
                    </div>
                    <div>
                        <label for="subject" class="mb-3 text-sm font-medium flex text-gray-900 dark:text-gray-300"><div>Subject</div><div className="text-red-600">*</div></label>
                        <input type="text" id="header" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light" name='header' value={feedback.header} onChange={detectChanges} placeholder="Let us know how we can help you" required/>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="message" class="mb-3 text-sm font-medium flex text-gray-900 dark:text-gray-400"><div>Your Message</div><div className="text-red-600">*</div></label>
                        <textarea id="body" rows="4" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"  name='body' value={feedback.body} required onChange={detectChanges} placeholder="Leave a comment..."></textarea>
                    </div>
                    <button type="submit" class="py-2 px-3 text-md font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-600  dark:bg-primary-600 dark:hover:bg-primary-700 ">Send message</button>
                </form>
            </div>
        </section>
    )
}
export default Feedbackpage;