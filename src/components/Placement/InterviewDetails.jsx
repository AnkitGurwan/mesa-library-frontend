// src/pages/InterviewDetails.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/IntroPage/homeNavBar";
import Footer from "../../components/IntroPage/footer";

const InterviewDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!state) {
    return (
      <div className="text-center mt-10 text-red-500">
        No data found. Please go back and select an interview.
      </div>
    );
  }

  const { infoo, round1Name, round2Name, round3Name, round4Name, company, jobTitle, name,graduation,tips,cpi,resumeFilePath } = state;
   console.log(state)
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <section className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-10 overflow-x-hidden w-full">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline mb-6 text-left"
          >
            ← Back
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-2 break-all">
            {company} Interview Experience
          </h2>
          <p className="text-lg text-gray-700 mb-1 break-all">Position: {jobTitle}</p>
          <p className="text-sm text-gray-600 mb-4 break-all">Shared by: {name}</p>
          <p className="text-sm text-gray-600 mb-4 break-all">Graduation Year: {graduation}</p>

          <div className="text-black text-base sm:text-lg whitespace-pre-wrap break-all mb-4">
            Interview Experience for : {infoo}
          </div>

          <div className="text-black text-base sm:text-lg whitespace-pre-wrap break-all mb-4">
            CPI Criteria : {cpi}
          </div>
          {resumeFilePath && (
            <div className="mb-4">
              <a
                href={`http://localhost:8000/${resumeFilePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#6699ff] text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                View Resume
              </a>
            </div>
          )}

          {round1Name && (
            <div className="mb-4">
              <h3 className="font-semibold text-blue-800 text-lg mb-1">Round 1:</h3>
              <p className="text-gray-800 whitespace-pre-wrap break-all">{round1Name}</p>
            </div>
          )}
          {round2Name && (
            <div className="mb-4">
              <h3 className="font-semibold text-blue-800 text-lg mb-1">Round 2:</h3>
              <p className="text-gray-800 whitespace-pre-wrap break-all">{round2Name}</p>
            </div>
          )}
          {round3Name && (
            <div className="mb-4">
              <h3 className="font-semibold text-blue-800 text-lg mb-1">Round 3:</h3>
              <p className="text-gray-800 whitespace-pre-wrap break-all">{round3Name}</p>
            </div>
          )}
          {round4Name && (
            <div className="mb-4">
              <h3 className="font-semibold text-blue-800 text-lg mb-1">Round 4:</h3>
              <p className="text-gray-800 whitespace-pre-wrap break-all">{round4Name}</p>
            </div>
          )}

        {tips && (
            <div className="mb-4">
              <h3 className="font-semibold text-blue-800 text-lg mb-1">Tips : </h3>
              <p className="text-gray-800 whitespace-pre-wrap break-all">{tips}</p>
            </div>
          )} 

   
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default InterviewDetails;
