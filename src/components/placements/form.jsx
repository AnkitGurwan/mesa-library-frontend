import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Form = () => {
  const { state } = useLocation();
  const [rounds, setRounds] = useState(1);
  const [roundDetails, setRoundDetails] = useState([]);
  const [materials, setMaterials] = useState("");

  const handleRoundChange = (index, field, value) => {
    const updatedDetails = [...roundDetails];
    if (!updatedDetails[index]) updatedDetails[index] = {};
    updatedDetails[index][field] = value;
    setRoundDetails(updatedDetails);
  };

  const handleSubmit = () => {
    console.log("Submitted Details:", { state, materials, roundDetails });
    alert("Details Submitted Successfully! Check the console for data.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-800 via-gray-700 to-gray-600 px-6 py-12">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Placement Process Details
        </h1>

        {/* User Info */}
        <div className="mb-6 bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-lg font-medium text-gray-800">
            <span className="text-purple-600 font-semibold">Name:</span>{" "}
            {state.isAnonymous ? "Anonymous" : state.name}
          </p>
          <p className="text-lg font-medium text-gray-800">
            <span className="text-purple-600 font-semibold">Company:</span>{" "}
            {state.company}
          </p>
          <p className="text-lg font-medium text-gray-800">
            <span className="text-purple-600 font-semibold">Role:</span>{" "}
            {state.role}
          </p>
        </div>

        {/* Materials */}
        <div className="mb-6">
          <label
            htmlFor="materials"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Materials Used for Preparation
          </label>
          <textarea
            id="materials"
            rows="3"
            value={materials}
            onChange={(e) => setMaterials(e.target.value)}
            placeholder="E.g., LeetCode, Mock Interviews, Glassdoor Reviews"
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Rounds */}
        <div className="mb-6">
          <label htmlFor="rounds" className="text-lg font-medium text-gray-700">
            Number of Rounds
          </label>
          <input
            id="rounds"
            type="number"
            min="1"
            value={rounds}
            onChange={(e) => setRounds(Number(e.target.value))}
            className="w-20 px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Round Details */}
        <div className="space-y-6">
          {Array.from({ length: rounds }).map((_, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Round {index + 1} Details
              </h3>
              <input
                type="text"
                placeholder="Round Description (e.g., Technical Interview)"
                className="w-full px-4 py-3 mb-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
                onChange={(e) =>
                  handleRoundChange(index, "details", e.target.value)
                }
              />
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Difficulty (1-5)"
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
                onChange={(e) =>
                  handleRoundChange(index, "difficulty", e.target.value)
                }
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-8 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform transform"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;