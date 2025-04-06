import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    isAnonymous: true,
    name: "",
    company: "",
    role: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (!formData.company || !formData.role) {
      alert("Please fill in all required fields.");
      return;
    }
    navigate("/placements/form", { state: formData });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700 px-6 py-12">
      <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-lg">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Placement Experience Portal
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Share your placement experience to guide future candidates!
        </p>

        {/* Option Buttons */}
        <div className="flex justify-around mb-8">
          <button
            onClick={() => handleChange("isAnonymous", true)}
            className={`py-3 px-6 text-lg font-semibold rounded-lg shadow-md transform transition-transform ${
              formData.isAnonymous
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white scale-105"
                : "bg-gray-100 text-gray-600 hover:scale-105 hover:shadow-lg"
            }`}
          >
            Go Anonymous
          </button>
          <button
            onClick={() => handleChange("isAnonymous", false)}
            className={`py-3 px-6 text-lg font-semibold rounded-lg shadow-md transform transition-transform ${
              !formData.isAnonymous
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white scale-105"
                : "bg-gray-100 text-gray-600 hover:scale-105 hover:shadow-lg"
            }`}
          >
            Show Identity
          </button>
        </div>

        {/* Conditional Form */}
        {!formData.isAnonymous && (
          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Company Name"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Role (e.g., Software Engineer)"
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-8 py-3 bg-gradient-to-r from-pink-600 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform transform"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Home;