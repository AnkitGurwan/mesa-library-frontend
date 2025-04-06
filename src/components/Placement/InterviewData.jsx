import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/IntroPage/homeNavBar"
import Footer from "../../components/IntroPage/footer"
import { useNavigate } from "react-router-dom";

const InterviewData = () => {
  const [interviewdata, setInterviewData] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const goToDetails = (info) => {
    navigate("/interview-details", { state: info });
  };

  useEffect(() => {
    async function fetchForms() {
      try {
        const response = await fetch("https://mesa-library-frontend.vercel.app/api/interviewdata");
        const data = await response.json();
        setInterviewData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchForms();
  }, []);

  return (
    <div>
      <Navbar className="shadow-lg bg-white border border-gray-300" />
    <section className="py-8 bg-gray-65 min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-lg p-6 sm:p-8">
        <div className="flex justify-end">
        <div className="flex justify-end">
          <NavLink
            to="/contribution"
            className="py-2 px-4 rounded-lg bg-[#6699ff] text-white transition duration-200 hover:bg-[#0055ff]"
          >
            Contribute
          </NavLink>
        </div>

      </div>

          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Interview Experiences
            </h2>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row justify-center items-center mb-6 sm:mb-8">
            <label
              htmlFor="search"
              className="text-lg text-gray-700 font-medium mb-2 sm:mb-0 sm:mr-4"
            >
              Enter company name:
            </label>
            <input
              type="search"
              id="search"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by company name..."
            />
          </div>

          {interviewdata
            .filter((info) =>
              search.toLowerCase() === ""
                ? info
                : info.company.toLowerCase().includes(search.toLowerCase())
            )
            .map((info, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-md p-6 mb-6 overflow-hidden w-full sm:w-auto"
              >
                <h3 onClick={() => goToDetails(info)} className="text-xl font-semibold text-blue-800 mb-4 cursor-pointer hover:text-blue-600 break-words">
                  {info.company} Interview Rounds and Process
                </h3>

                <h4 className="text-lg font-medium text-gray-800 mb-2 break-words">
                  {info.jobTitle} Interview Questions
                </h4>
                <p className="text-gray-600 mb-4 break-words">Shared by: {info.name}</p>
              </div>

            ))}
        </div>
      </div>
    </section>
       <Footer></Footer> 
     </div> 
  );
};

export default InterviewData;
