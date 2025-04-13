import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from "../../components/IntroPage/homeNavBar";
// import Footer from "../../components/IntroPage/footer";

const InterviewDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc]">
        <p className="text-center text-red-600 text-lg font-semibold">
          No data found. Please go back and select an interview.
        </p>
      </div>
    );
  }

  const {
    infoo, round1, round1Name,
    round2, round2Name,
    round3, round3Name,
    round4, round4Name,
    company, jobTitle, name,
    graduation, tips, cpi, resumeFilePath,
  } = state;

  const rounds = [
    { name: round1Name, content: round1 },
    { name: round2Name, content: round2 },
    { name: round3Name, content: round3 },
    { name: round4Name, content: round4 },
  ];

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#f8f9fc]">
      {/* <Navbar /> */}

      <main className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-200 space-y-8">

          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to Interviews
          </button>

          <section className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold capitalize text-blue-900 break-words">
              <span className="text-red-600">{company}</span> - Interview Experience
            </h1>
            <div className="text-gray-600 text-sm flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <span>Shared by <span className="font-medium text-black capitalize">{name}</span></span>
              <span className="hidden sm:inline">|</span>
              <span>Email: <span className="font-medium text-black">{email}</span></span>
              <span className="hidden sm:inline">|</span>
              <span>Graduation: <span className="font-medium text-black">{graduation}</span></span>
              <span className="hidden sm:inline">|</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
                Position: {jobTitle}
              </span>
            </div>
          </section>

          <section className="grid gap-4 border-t pt-6">
            <p className="text-gray-700">
              <strong className="text-gray-900">Have Summer Intern here:</strong> <span className="capitalize text-red-500">{infoo}</span>
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-900">CPI Criteria:</strong> <span className="text-red-500">{cpi}</span>
            </p>
            {resumeFilePath && (
              <a
                href={resumeFilePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-fit bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full shadow hover:from-blue-700 hover:to-indigo-700 transition font-medium text-sm"
              >
                View Resume
              </a>
            )}
          </section>

          <section className="space-y-6 border-t pt-6">
            {rounds.map((round, idx) => (
              round.name && (
                <div
                  key={idx}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-blue-800 mb-2 capitalize">
                    Round {idx + 1} ({round.name})
                  </h3>
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {round.content}
                  </p>
                </div>
              )
            ))}
          </section>

          {tips && (
            <section className="border-t pt-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-1">
                  Tips & Advice
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {tips}
                </p>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default InterviewDetails;
