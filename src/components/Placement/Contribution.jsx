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
      navigate("/");
      toast.error('Please login to access', { position: toast.POSITION.TOP_CENTER });
    }
  };

  const getItem = async () => {
    await funcAllowed();
  };

  useEffect(() => {
    getItem();
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
      (snapshot) => {
        // Optional: show upload progress
      },
      (error) => {
        console.error(error);
        toast.error("Resume upload failed.");
        setLoading(false);
      },
      async () => {
        const fileData = await uploadFileRef.getDownloadURL();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });

        if (resumeFile) {
          formData.append("resumeFile", fileData);
        }

        try {
          const response = await fetch("https://mesa-library.onrender.com/api/contribute", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            toast.success("Added Successfully", {
              position: toast.POSITION.BOTTOM_RIGHT
            });

            setData({
              name: "",
              company: "",
              jobTitle: "",
              infoo: "",
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
              graduation: "",
              tips: "",
              cpi: ""
            });
            setResumeFile(null);
            navigate("/Placement");
          } else {
            toast.error("Invalid submission.", {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          }
        } catch (err) {
          toast.error("Something went wrong.", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        } finally {
          setLoading(false);
        }
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-16 bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-400">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-6 sm:p-10">
        <span className="cursor-pointer text-blue-500 hover:underline">
          <Link to={'/library/placements'}>Go Back</Link>
        </span>
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Share Your Interview Experience
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Help others by contributing your valuable insights!
          </p>
        </div>

        <form onSubmit={handleClick}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "name", placeholder: "Your Name*" },
              { name: "company", placeholder: "Company Name*" },
              { name: "jobTitle", placeholder: "Job Title*" },
              { name: "infoo", placeholder: "Summer intern? (Yes/No)*" },
              { name: "graduation", placeholder: "Graduation Year*", type: "number" },
              { name: "email", placeholder: "Email Id*", type: "email" },
              { name: "cpi", placeholder: "CPI Criteria", type: "number" },
            ].map(({ name, placeholder, type = "text" }) => (
              <input
                key={name}
                type={type}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder={placeholder}
                name={name}
                value={data[name]}
                required
                onChange={handleChange}
              />
            ))}
          </div>

          <div className="mt-5">
            <h3 className="text-lg font-semibold text-gray-700 mt-5">Resume :</h3>
            <div className="pt-2 pb-3 text-gray-400">Upload the doc that landed you the job 💪</div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Resume Screening*</h3>
            <div className="flex gap-4 mt-2">
              {["Yes", "No"].map((val) => (
                <label key={val} className="flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-indigo-600"
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

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Materials used for preparation (e.g. LeetCode, GFG, etc.)*
            </h3>
            <textarea
              name="tips"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 mt-4"
              placeholder="If Netflix helped you prepare, we won't judge 😅"
              value={data.tips}
              required
              onChange={handleChange}
            />
          </div>

          <div className="mt-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="mt-3">
                <input
                  type="text"
                  name={`round${num}Name`}
                  value={data[`round${num}Name`]}
                  placeholder={`Round ${num} Name`}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 mt-2"
                />
                <textarea
                  name={`round${num}`}
                  value={data[`round${num}`]}
                  placeholder={`Round ${num} Description`}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 mt-2"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Experience"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contribution;
