


// Form.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Form = () => {
  const { state } = useLocation();
  const [rounds, setRounds] = useState(1);
  const [roundDetails, setRoundDetails] = useState([{}]);
  const [materials, setMaterials] = useState("");

  useEffect(() => {
    setRoundDetails((prev) => {
      const updated = [...prev];
      while (updated.length < rounds) updated.push({});
      return updated.slice(0, rounds);
    });
  }, [rounds]);

  const handleRoundChange = (index, field, value) => {
    const updated = [...roundDetails];
    updated[index] = { ...updated[index], [field]: value };
    setRoundDetails(updated);
  };

  const handleSubmit = () => {
    console.log({ ...state, materials, roundDetails });
    alert("Details Submitted! Check console for output.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-800 via-gray-700 to-gray-600 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl p-10 shadow-2xl w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Placement Process Details</h1>

        <div className="bg-purple-50 p-4 rounded-xl border mb-6">
          <p className="text-lg text-gray-700"><span className="font-semibold text-purple-700">Name:</span> {state.isAnonymous ? "Anonymous" : state.name}</p>
          <p className="text-lg text-gray-700"><span className="font-semibold text-purple-700">Company:</span> {state.company}</p>
          <p className="text-lg text-gray-700"><span className="font-semibold text-purple-700">Role:</span> {state.role}</p>
        </div>

        <textarea
          rows="4"
          placeholder="Materials used for preparation (e.g. LeetCode, GFG, Mock Interviews...)"
          value={materials}
          onChange={(e) => setMaterials(e.target.value)}
          className="w-full mb-6 px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
        ></textarea>

        <div className="mb-6">
          <label className="text-lg font-medium text-gray-700">Number of Rounds</label>
          <input
            type="number"
            min="1"
            value={rounds}
            onChange={(e) => setRounds(parseInt(e.target.value))}
            className="ml-4 w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-6">
          {roundDetails.map((round, index) => (
            <div key={index} className="bg-gray-50 border rounded-xl p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Round {index + 1}</h3>
              <input
                type="text"
                placeholder="Round Description (e.g., Technical Interview)"
                value={round.details || ""}
                onChange={(e) => handleRoundChange(index, "details", e.target.value)}
                className="w-full mb-3 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="number"
                placeholder="Difficulty (1-5)"
                min="1"
                max="5"
                value={round.difficulty || ""}
                onChange={(e) => handleRoundChange(index, "difficulty", parseInt(e.target.value))}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-8 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;