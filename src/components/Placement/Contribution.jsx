import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import fire from '../../config/firebase';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/auth/AuthContext";

const Contribution = () => {
  const { GetDetails, getToken, checkAuth, createStudent } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const Navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [data, setData] = useState({
    name: "",
    company: "",
    jobTitle: "",
    infoo: "",
    resumeScreening: "",
    round1Name: "",
    round1: "",
    round2Name: "",
    round2: "",
    round3Name: "",
    round3: "",
    round4Name: "",
    round4: "",
    round5Name: "",
    round5: "",
    graduation: 2025,
    tips: "",
    cpi: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const funcAllowed = async () => {
      const rollNumber = parseInt(localStorage.getItem('studRoll'));
      const flag = await checkAuth();

      if (!rollNumber || !flag) 
        {
          Navigate("/");
          toast.error('Please login to access', { position: toast.POSITION.TOP_CENTER });
      }
  };

  const getItem = async () => {
        funcAllowed();
    };

    useEffect(() => {
        getItem();
    }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    
  
    if (!data.name) {
      toast.error("Name is required.", { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
  
    if (!data.company) {
      toast.error("Company is required.", { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
  
    if (!data.jobTitle) {
      toast.error("Job Title is required.", { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
  
    if (!data.infoo) {
      toast.error("Information about the process is required.", { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
  
    if (!data.resumeScreening) {
      toast.error("Resume Screening field is required.", { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
  
    if (!data.graduation) {
      toast.error("Graduation Year is required.", { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
  
    if (!data.tips) {
      toast.error("Materials Used field is required.", { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
  
    if (!data.round1Name) {
      toast.error("Atleast Round 1 Name is required.", { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
  
    if (!data.round1) {
      toast.error("Atleast Round 1 Description is required.", { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
  
    setLoading(true);

    const data = {
      createdAt : new Date(),
      name : resumeFile.name,
      userId : 12345,
      createdBy : "mesa",
      pathState : "parent folder pathState",
      parent : "subExams" ,
      lastAccessed : null,
      // extension :  uploadNewFile.name? uploadNewFile.name.split(".")[1]:".txt",
      updatedAt : new Date(),
      url:""
  }
  
  const uploadFileRef = fire.storage().ref(`uploads/${data.userId}/${ resumeFile.name}`);
  
  uploadFileRef.put(resumeFile).on("state_changed",(snapshot) => {
      const progress = Math.round(
      (snapshot.bytesTransferred/ snapshot.totalBytes) * 100
      );
  },
    (error)=>{
        console.log(error)
    },
    async()=>{
        const fileData = await uploadFileRef.getDownloadURL();
  
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
      
        if (resumeFile) {
          formData.append("resumeFile", fileData);
        }
      
        try {
          const response = await fetch("https://mesa-library.onrender.com/api/contribute", {
            method: "POST",
            body: formData,
          });
      
          if (response.ok) {
            toast.success("Added Successfully", {
              position: toast.POSITION.BOTTOM_RIGHT
            });
      
            setData({
              name: "",
              company: "",
              jobTitle: "",
              infoo: "",
              resumeScreening: "",
              round1Name: "",
              round1: "",
              round2Name: "",
              round2: "",
              round3Name: "",
              round3: "",
              round4Name: "",
              round4: "",
              round5Name: "",
              round5: "",
              graduation: "",
              tips: "",
              cpi: ""
            });
            setResumeFile(null);
            navigate("/Placement");
          } else {
            toast.error("Invalid submission.", {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          }
        } catch (err) {
          toast.error("Something went wrong.", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        } finally {
          setLoading(false);
        }
      }
    )};
  

  

  return (
    <div>
      {/* <Navbar className="shadow-lg bg-white border border-gray-300" /> */}
      <div
        style={{
          background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,64,121,1) 15%, rgba(0,212,255,1) 100%)",
        }}
        className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-16 bg-gray-65"
      >
        <div className="w-full max-w-4xl bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-xl p-6 sm:p-10">
          <span className="cursor-pointer text-blue-500 hover:underline">

            <Link to={'/library/placements'}>Go Back</Link>
          </span>
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Share Your Interview Experience
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Help others by contributing your valuable insights!
            </p>
          </div>
          <form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Name*"
                name="name"
                value={data.name}
                required="true"
                onChange={handleChange}
              />
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Company Name*"
                name="company"
                value={data.company}
                required="true"
                onChange={handleChange}
              />
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Job Title*"
                name="jobTitle"
                value={data.jobTitle}
                required="true"
                onChange={handleChange}
              />
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Worked as summer intern here? (Yes/No)*"
                name="infoo"
                value={data.infoo}
                required="true"
                onChange={handleChange}
              />
              <input
                type="number"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Graduation Year*"
                name="graduation"
                required="true"
                value={data.graduation}
                onChange={handleChange}
              />
              <input
                type="number"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="CPI Criteria"
                name="cpi"
                value={data.cpi}
                onChange={handleChange}
              />
            </div>

            <div className="mt-5">
              <h3 className="text-lg font-semibold text-gray-700 mt-5">Resume :</h3>
              <div className="pt-2 pb-3 text-gray-400">Give us the doc that landed you the job - flex a little 💪😎</div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700">Resume Screening*</h3>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-indigo-600"
                    value="Yes"
                    name="resumeScreening"
                    onChange={handleChange}
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-indigo-600"
                    value="No"
                    name="resumeScreening"
                    onChange={handleChange}
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700">Materials used for preparation (e.g. LeetCode, GFG, etc.)*</h3>
              <textarea
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 mt-4"
                placeholder="If Netflix helped you prepare, we won't judge 👀"
                name="tips"
                onChange={handleChange}
              />
              {[...Array(4)].map((_, index) => (
                <div key={index} className="mt-4">
                  <input
                    type="text"
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder={`Round ${index + 1} Name (Technical/HR)`}
                    name={`round${index + 1}Name`}
                    onChange={handleChange}
                  />
                  <textarea
                    className="w-full mt-2 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                    placeholder={`Details about Round ${index + 1}`}
                    name={`round${index + 1}`}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>


            {loading
            ?
            <div className="text-center mt-6">
              <button
                type="button"
                className="py-2 px-4 rounded-lg bg-green-600 text-white transition duration-200 cursor-default"
              >
                Submitting....
              </button>
            </div>
            :
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={handleClick}
                className="py-2 px-4 rounded-lg bg-[#339dd6] text-white transition duration-200 hover:bg-blue-800"
              >
                Submit
              </button>
            </div>
            }
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Contribution;
