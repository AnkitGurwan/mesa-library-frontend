import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "../../components/IntroPage/homeNavBar";
import Footer from "../../components/IntroPage/footer";
import { useNavigate } from "react-router-dom";

const InterviewData = () => {
  const [interviewdata, setInterviewData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const capitalizeFirstWord = (text) => {
    if (!text || typeof text !== "string") return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  useEffect(() => {
    async function fetchForms() {
      try {
        // const response = await fetch("http://localhost:8000/api/interviewdata");
         const response = await fetch("https://mesa-library.onrender.com/api/interviewdata");
       // const response = await fetch("/intdata.json");

        const data = await response.json();
        setInterviewData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchForms();
  }, []);

  const goToDetails = (info) => {
    navigate("/interview-details", { state: info });
  };

  const filteredData = interviewdata.filter((info) =>
    search.toLowerCase() === ""
      ? true
      : info.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen">
      {/* <Navbar className="shadow-lg bg-white border border-gray-300" /> */}
      <section
        style={{
          background: "#86c3fc", // Changed from gradient to solid color
        }}
        className="py-8 min-h-screen px-4 sm:px-6 lg:px-8"
      >

        <div className="max-w-6xl mx-auto">
          <div className="bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-lg p-6 sm:p-8">
            {/* <div className="flex justify-end">
              <NavLink
                to="/contribution"
                className="py-2 px-4 rounded-lg bg-[#339dd6] text-white transition duration-200 hover:bg-blue-800"
              >
                Contribute
              </NavLink>
            </div> */}
            <span className="cursor-pointer text-blue-500 hover:underline">
              
              <Link to={'/library/placements'}>Go Back</Link>
            </span>
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
               IITG Student's Placement Interviews 
              </h2>
            </div>
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-80 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by company name..."
              />
            </div>
            <div className="flex justify-center gap-4 mb-6">
              {/* <button
                onClick={() => console.log("Filter logic here")}
                className="px-10 py-2 text-lg bg-[#0d91b5] text-white font-semibold rounded-lg hover:bg-[#0b5063] transition duration-200"
              >
                Apply Filter
              </button>


              <button
                onClick={() => setSearch("")}
                className="px-10 py-2 text-lg bg-white text-black font-semibold rounded-lg border border-gray-400 hover:bg-[#0eb9e8] hover:text-white transition duration-200"
              >
                Reset Filter
              </button> */}


            </div>
            <div className="overflow-x-auto">
              {filteredData.length > 0 ? (
                <table className="table-fixed w-full text-left border border-gray-300 rounded-lg overflow-hidden min-w-[700px]">
                  <thead>
                    <tr className="bg-white text-black font-bold">
                      <th className="px-4 py-2 border-b border-gray-300">Name</th>
                      <th className="px-4 py-2 border-b border-gray-300">Program</th>
                      <th className="px-4 py-2 border-b border-gray-300">Branch</th>
                      <th className="px-4 py-2 border-b border-gray-300">Company</th>
                      <th className="px-4 py-2 border-b border-gray-300">Summer Intern</th>
                      <th className="px-4 py-2 border-b border-gray-300">Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((info, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "bg-blue-50" : "bg-gray-50"} cursor-pointer hover:bg-slate-300 transition duration-200 ease-in-out`}
                        onClick={() => goToDetails(info)}
                      >
                        <td className="px-4 py-3 border-b border-gray-300 break-words">
                          {capitalizeFirstWord(info.name)}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-300 break-words">
                          <div>B.Tech</div>
                        </td>
                        <td className="px-4 py-3 border-b border-gray-300 break-words">
                          <div>Mechanical Engineering</div>
                        </td>
                        <td className="px-4 py-3 border-b border-gray-300 break-words">
                          {capitalizeFirstWord(info.company)}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-300 break-words">
                          {capitalizeFirstWord(info.infoo)}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-300 break-words">
                          {capitalizeFirstWord(info.jobTitle)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center text-gray-600 text-lg font-medium mt-8">
                  No results found.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default InterviewData;
