import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/auth/AuthContext";

const InterviewData = () => {
  const { checkAuth } = useContext(AuthContext);
  const [interviewdata, setInterviewData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const Navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const capitalizeFirstWord = (text) => {
    if (!text || typeof text !== "string") return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const funcAllowed = async () => {
    const rollNumber = parseInt(localStorage.getItem('studRoll'));
    const flag = await checkAuth();

    if (!rollNumber || !flag) {
      Navigate("/");
      toast.error('Please login to access', { position: toast.POSITION.TOP_CENTER });
    }
  };

  useEffect(() => {
    // funcAllowed();
  }, []);

  useEffect(() => {
    async function fetchForms() {
      try {
        const response = await fetch("https://mesa-library.onrender.com/api/interviewdata");
        const data = await response.json();

        if (Array.isArray(data)) {
          setInterviewData(data);
        } else {
          setInterviewData([]);
        }
      } catch (error) {
        // console.error("Failed to fetch data:", error);
        setInterviewData([]);
      }
    }
    fetchForms();
  }, []);

  const goToDetails = (info) => {
    Navigate("/interview-details", { state: info });
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const getSortedData = (data) => {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
      const valA = a[sortColumn]?.toString().toLowerCase() || "";
      const valB = b[sortColumn]?.toString().toLowerCase() || "";

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filteredData = Array.isArray(interviewdata)
    ? getSortedData(
        interviewdata.filter((info) =>
          search.toLowerCase() === ""
            ? true
            : info.company.toLowerCase().includes(search.toLowerCase())
        )
      )
    : [];

  const renderSortIcon = (column) => {
    if (sortColumn !== column) return "↕️";
    return sortOrder === "asc" ? "🔼" : "🔽";
  };

  return (
    <div className="relative min-h-screen">
      <section style={{ background: "#f1f9fc" }} className="py-8 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
            <span className="cursor-pointer text-blue-600 hover:underline">
              <Link to={"/library/placements"}>← Go Back</Link>
            </span>
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                IITG Student's Placement Interviews
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center mb-6 sm:mb-8">
              <label htmlFor="search" className="text-lg text-gray-700 font-medium mb-2 sm:mb-0 sm:mr-4">
                Enter company name:
              </label>
              <input
                type="search"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-80 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-md"
                placeholder="Search by company name..."
              />
            </div>

            <div className="overflow-x-auto mt-6">
              {filteredData.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                  <thead className="bg-gray-100 text-gray-700 font-semibold">
                    <tr>
                      <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort("name")}>
                        Name {renderSortIcon("name")}
                      </th>
                      <th className="px-6 py-3 text-left">Program</th>
                      <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort("email")}>
                        Email {renderSortIcon("email")}
                      </th>
                      <th className="px-6 py-3 text-left">Branch</th>
                      <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort("company")}>
                        Company {renderSortIcon("company")}
                      </th>
                      <th className="px-6 py-3 text-left">Summer Intern</th>
                      <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort("jobTitle")}>
                        Profile {renderSortIcon("jobTitle")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((info, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} cursor-pointer hover:bg-blue-100 transition-all duration-200 ease-in-out`}
                        onClick={() => goToDetails(info)}
                      >
                        <td className="px-6 py-4 border-b border-gray-300 text-gray-700 break-words">
                          {capitalizeFirstWord(info.name)}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-gray-700">B.Tech</td>
                        <td className="px-6 py-4 border-b border-gray-300 text-gray-700 lowercase">{info.email}</td>
                        <td className="px-6 py-4 border-b border-gray-300 text-gray-700">Mechanical Engineering</td>
                        <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                          {capitalizeFirstWord(info.company)}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                          {capitalizeFirstWord(info.infoo)}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
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
    </div>
  );
};

export default InterviewData;
