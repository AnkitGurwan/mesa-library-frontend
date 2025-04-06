import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/IntroPage/homeNavBar"
import Footer from "../../components/IntroPage/footer"

const Contribution = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    company: "",
    jobTitle: "",
    infoo:"",
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
    graduation:"",
    tips:"",
    cpi:""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
  
    if (resumeFile) {
      formData.append("resumeFile", resumeFile); 
    }
  
    const response = await fetch("http://localhost:8000/api/contribute", {
      method: "POST",
      body: formData,
    });
  
    if (response.ok) {
      alert("Successful submission");
      setData({ 
        name: "",
        company: "",
        jobTitle: "",
        infoo:"",
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
        graduation:"",
        tips:"",
        cpi:""
       }); 
      setResumeFile(null);
      navigate("/Placement");
    } else {
      alert("Invalid submission");
    }
  };

  const [resumeFile, setResumeFile] = useState(null);

  return (
    <div>
    <Navbar className="shadow-lg bg-white border border-gray-300" />
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-16 bg-gray-65">
      <div className="w-full max-w-4xl bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-xl p-6 sm:p-10">
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
              onChange={handleChange}
            />
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Company Name*"
              name="company"
              onChange={handleChange}
            />
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Job Title*"
              name="jobTitle"
              onChange={handleChange}
            />
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Intern/Placement*"
              name="infoo"
              onChange={handleChange}
            />
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Graduation Year*"
              name="graduation"
              onChange={handleChange}
            />
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="CPI Criteria "
              name="cpi"
              onChange={handleChange}
            />
          </div>

          <div className="mt-5">
          <h3 className="text-lg font-semibold text-gray-700 mt-5">Resume :</h3>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="w-full border rounded-lg px-4 py-2"
              />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Resume Screening</h3>
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
            <h3 className="text-lg font-semibold text-gray-700">Interview Experience</h3>
            <textarea
              type="text"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 mt-4"
              placeholder="Some insightful tips"
              name="tips"
              onChange={handleChange}
            />
            {[...Array(4)].map((_, index) => (
              <div key={index} className="mt-4">
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                  placeholder={`Round ${index + 1} Name`}
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


          <div className="text-center mt-6">
            <button
              type="button"
              onClick={handleClick}
              className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Contribution;
