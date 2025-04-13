import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Body = () => {
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    const roll = localStorage.getItem('studRoll');
    if (roll && Number(roll) > 210103140) {
      setIsAllowed(false);
    }
  }, []);

  const GoBackHandler = () => {
    navigate('/library/main');
  };

  const handleContributeClick = (e) => {
    if (!isAllowed) {
      e.preventDefault();
      alert("You are not allowed to contribute.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="w-full h-16 px-4 md:px-8 flex items-center justify-end border-b bg-white shadow-sm">
        <button
          onClick={GoBackHandler}
          className="text-white bg-black py-2 px-4 rounded-md hover:bg-gray-800 transition-all duration-200"
        >
          Go Back
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-10 p-6 md:p-12">
        {/* Contribute Card */}
        <div
          className="w-48 h-48 md:w-60 md:h-60 rounded-full flex items-center justify-center bg-center bg-cover shadow-lg hover:scale-105 transition-transform duration-300"
          style={{
            backgroundImage:
              "url('https://www.isponline.org/wp-content/uploads/sites/71/2020/05/TeachersTrained-1024x1024.png')",
          }}
        >
          <Link
            to={isAllowed ? "/library/placements/add" : "#"}
            onClick={handleContributeClick}
            className={`py-2 px-5 md:py-3 md:px-6 rounded-md font-semibold text-base md:text-lg transition-colors duration-200 ${
              isAllowed
                ? "bg-[#FB2576] text-white hover:bg-[#e41c69]"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            Contribute
          </Link>
        </div>

        {/* Experiences Card */}
        <div
          className="w-48 h-48 md:w-60 md:h-60 rounded-full flex items-center justify-center bg-center bg-cover shadow-lg hover:scale-105 transition-transform duration-300"
          style={{
            backgroundImage:
              "url('https://cdn-icons-png.flaticon.com/512/3334/3334309.png')",
          }}
        >
          <Link
            to="/library/placements/all"
            className="bg-[#FB2576] text-white py-2 px-5 md:py-3 md:px-6 rounded-md font-semibold text-base md:text-lg hover:bg-[#e41c69] transition-colors duration-200"
          >
            Experiences
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Body;
