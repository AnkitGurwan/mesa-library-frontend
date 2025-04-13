import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/auth/AuthContext";
import { FaArrowsUpDown, FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

const InterviewData = () => {
  const { checkAuth } = useContext(AuthContext);
  const [interviewdata, setInterviewData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const Navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const capitalizeFirstWord = (text) => {
    if (!text || typeof text !== "string") return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const funcAllowed = async () => {
    const rollNumber = parseInt(localStorage.getItem('studRoll'));
    const flag = await checkAuth();

    if (!rollNumber || !flag) {
      Navigate("/library");
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
          setLoading(false);
        } else {
          setInterviewData([]);
          setLoading(false);
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
    if (sortColumn !== column) return <FaArrowsUpDown />;
    return sortOrder === "asc" ? <FaArrowUpLong /> : <FaArrowDownLong />;
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#e3e8f6]">
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-200 space-y-8">
          <div className="">
            <span className="cursor-pointer text-blue-600 hover:underline">
              <Link to={"/library/placements"}>← Back to Home</Link>
            </span>
            <div className="text-center mt-4 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Mech Student's Placement Stats
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center mb-6 sm:mb-8">
              <label htmlFor="search" className="text-lg text-gray-700 font-medium mb-2 sm:mb-0 sm:mr-4">
                Search by company name:
              </label>
              <input
                type="search"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-80 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-md"
                placeholder="Search by company name..."
              />
            </div>

            {loading
            ?
            <div className="w-full h-24 md:h-40 flex justify-center items-center">
              Loading Placement Statistics ....
            </div>
            :
            <div className="overflow-x-auto mt-6 mb-4">
              {filteredData.length > 0 ?
              <span className="flex">
                  <div className="text-red-500 pr-2">Total Responses:</div>
                  <div>{filteredData.length}</div>
              </span>
              :
              ""}
              {filteredData.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                  <thead className="bg-gray-100 text-gray-700 font-semibold">
                    <tr>
                      <th className="px-6 py-3 text-left cursor-pointer flex items-center" onClick={() => handleSort("name")}>
                        <span className="pr-1">Name</span><span>{renderSortIcon("name")}</span>
                      </th>
                      <th className="px-6 py-3 text-left">Program</th>
                      {/* <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort("email")}>
                        Email {renderSortIcon("email")}
                      </th> */}
                      {/* <th className="px-6 py-3 text-left">Branch</th> */}
                      <th className="px-6 py-3 text-left cursor-pointer flex items-center" onClick={() => handleSort("company")}>
                        <span className="pr-1">Company</span><span>{renderSortIcon("company")}</span>
                      </th>
                      <th className="px-6 py-3 text-left hidden md:block">Worked as Summer Intern Here?</th>
                      <th className="px-6 py-3 text-left cursor-pointer flex items-center" onClick={() => handleSort("jobTitle")}>
                        <span className="pr-1">Profile</span><span>{renderSortIcon("jobTitle")}</span>
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
                        {/* <td className="px-6 py-4 border-b border-gray-300 text-gray-700 lowercase">{info.email}</td> */}
                        {/* <td className="px-6 py-4 border-b border-gray-300 text-gray-700">Mechanical Engineering</td> */}
                        <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                          {capitalizeFirstWord(info.company)}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-gray-700 hidden md:block">
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
            </div>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InterviewData;
