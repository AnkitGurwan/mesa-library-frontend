import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import fire from '../../config/firebase';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/auth/AuthContext";

const Contribution = () => {
  const { checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const [data, setData] = useState({
    name: "",
    company: "",
    jobTitle: "",
    infoo: "",
    email: "",
    resumeScreening: "",
    round1Name: "",
    round1: "",
    round2Name: "",
    round2: "",
    round3Name: "",
    round3: "",
    round4Name: "",
    round4: "",
    round5Name: "",
    round5: "",
    graduation: 2025,
    tips: "",
    cpi: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const funcAllowed = async () => {
    const rollNumber = parseInt(localStorage.getItem('studRoll'));

    const flag = await checkAuth();
    if (!rollNumber || !flag) {
      navigate("/library");
      toast.error('Please login to access', { position: toast.POSITION.TOP_CENTER });
    }

    const response = await fetch("https://mesa-library.onrender.com/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({rollNumber}),
    });

    const data = await response.json();
    if (data.exists) {
      toast.success("You have already submitted! 🎉", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      navigate("/library/placements");
    }
  };

  useEffect(() => {
    funcAllowed();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    const requiredFields = [
      { key: "name", msg: "Name is required." },
      { key: "company", msg: "Company is required." },
      { key: "email", msg: "Email is required." },
      { key: "jobTitle", msg: "Job Title is required." },
      { key: "infoo", msg: "Information about the process is required." },
      { key: "resumeScreening", msg: "Resume Screening field is required." },
      { key: "graduation", msg: "Graduation Year is required." },
      { key: "tips", msg: "Materials Used field is required." },
      { key: "round1Name", msg: "At least Round 1 Name is required." },
      { key: "round1", msg: "At least Round 1 Description is required." }
    ];

    for (let field of requiredFields) {
      if (!data[field.key]) {
        toast.error(field.msg, { position: toast.POSITION.BOTTOM_RIGHT });
        return;
      }
    }

    setLoading(true);

    const fileMeta = {
      createdAt: new Date(),
      name: resumeFile?.name || "",
      userId: 12345,
      createdBy: "mesa",
      pathState: "parent folder pathState",
      parent: "subExams",
      lastAccessed: null,
      updatedAt: new Date(),
      url: ""
    };

    const uploadFileRef = fire.storage().ref(`uploads/${fileMeta.userId}/${fileMeta.name}`);

    uploadFileRef.put(resumeFile).on(
      "state_changed",
      () => {},
      (error) => {
        toast.error("Resume upload failed.");
        setLoading(false);
      },
      async () => {
        const fileData = await uploadFileRef.getDownloadURL();

        const payload = {
          ...data,
          resumeFilePath: fileData,
          rollNo: localStorage.getItem('studRoll')
        };

        try {
          const response = await fetch("https://mesa-library.onrender.com/api/contribute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            toast.success("Thanks for contributing! 🎉", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            setData({
              name: "", company: "", jobTitle: "", infoo: "", email: "", resumeScreening: "",
              round1Name: "", round1: "", round2Name: "", round2: "",
              round3Name: "", round3: "", round4Name: "", round4: "",
              round5Name: "", round5: "", graduation: "", tips: "", cpi: ""
            });
            setResumeFile(null);
            navigate("/library/main");
          } else {
            toast.error("Invalid submission.", { position: toast.POSITION.BOTTOM_RIGHT });
          }
        } catch (err) {
          toast.error("Something went wrong.", { position: toast.POSITION.BOTTOM_RIGHT });
        } finally {
          setLoading(false);
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-blue-700 to-cyan-500 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 sm:p-10 overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 pb-4">
          <span className="text-blue-600 hover:underline">
            <Link to={"/library/placements"}>← Back to Home</Link>
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            Share Your Interview Journey 🚀
          </h1>
          <p className="text-gray-600 mt-1">
            Your insights could be the key to someone else's success!
          </p>
        </div>

        <form onSubmit={handleClick} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "name", placeholder: "Your Name*" },
              { name: "company", placeholder: "Company Name*" },
              { name: "jobTitle", placeholder: "Job Title*" },
              { name: "infoo", placeholder: "Worked here as a Summer Intern? (Yes/No)*" },
              { name: "graduation", placeholder: "Graduation Year*", type: "number" },
              { name: "email", placeholder: "Email ID (not Outlook)*", type: "email" },
              { name: "cpi", placeholder: "CPI Criteria", type: "number" },
            ].map(({ name, placeholder, type = "text" }) => (
              <input
                key={name}
                type={type}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 w-full"
                placeholder={placeholder}
                name={name}
                value={data[name]}
                onChange={handleChange}
                required={placeholder.includes("*")}
              />
            ))}
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Resume Upload (PDF/DOC) 💼
            </label>
            <div className="pt-1 pb-3 text-gray-400">Upload the doc that landed you the job 💪</div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              // required
            />
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-2">Resume Screening*</h3>
            <div className="flex gap-6">
              {["Yes", "No"].map((val) => (
                <label key={val} className="flex items-center text-gray-700">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    value={val}
                    name="resumeScreening"
                    onChange={handleChange}
                    checked={data.resumeScreening === val}
                  />
                  <span className="ml-2">{val}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Preparation Resources*
            </label>
            <textarea
              name="tips"
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="If Netflix helped you prepare, we won't judge 😅"
              value={data.tips}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Interview Rounds (Add up to 4)</h3>
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="mb-4">
                <input
                  type="text"
                  name={`round${num}Name`}
                  value={data[`round${num}Name`]}
                  placeholder={`Round ${num} Name`}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 mt-2"
                />
                <textarea
                  name={`round${num}`}
                  value={data[`round${num}`]}
                  placeholder={`Round ${num} Description`}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 mt-2"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow transition-transform transform hover:scale-105"
          >
            {loading ? "Submitting..." : "✨ Submit My Experience"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contribution;
