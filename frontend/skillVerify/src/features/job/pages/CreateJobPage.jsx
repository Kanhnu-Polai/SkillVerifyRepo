// src/pages/CreateJobWizard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ClipboardCheck,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Wand2,
} from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../../../utils/footer/Footer";
import { useNavigate } from "react-router-dom";

const fieldClass =
  "w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-blue-500 outline-none transition";

const CreateJobWizard = () => {
  const navigate = useNavigate();
  const publisherEmail =
    localStorage.getItem("userEmail") ?? "test@skillverify.com";

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    companyName: "",
    jobTitle: "",
    jobDescription: "",
    expectedSalary: "",
    experience: "",
    noOfOpenings: "",
    jobType: "Full-time",
    skills: "",
    jobLocation: "",
    examRequired: false,
    round1Required: false,
    round2Required: false,
    examTopics: "",
    lastDateToApply: "",
    companyLogo: null,
  });

  const list = (str) =>
    str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const onChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm((p) => ({
      ...p,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const next = () => setStep((s) => Math.min(s + 1, 9));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  // 🧭 Smooth scroll on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  /* 🔮 AI Job Description Generator */
  const generateJD = async () => {
    if (!form.jobTitle || !form.companyName) {
      toast.error("Please fill Job Title and Company Name first.");
      return;
    }
    try {
      toast.loading("Generating job description...");
      // Example mock AI generator
      const generated = `We are looking for a passionate ${form.jobTitle} to join ${form.companyName}. The ideal candidate should have experience with modern technologies, a problem-solving mindset, and the ability to collaborate effectively within a fast-paced environment. Responsibilities include designing, building, and maintaining scalable systems, working closely with cross-functional teams, and ensuring high-quality deliverables.`;
      setTimeout(() => {
        setForm((prev) => ({ ...prev, jobDescription: generated }));
        toast.dismiss();
        toast.success("AI generated a sample job description!");
      }, 1500);
    } catch (err) {
      toast.dismiss();
      toast.error("AI generation failed. Try again later.");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!form.companyLogo) {
      toast.error("Please upload a company logo");
      return;
    }

    const jobCreateDto = {
      publisherEmail,
      jobTitle: form.jobTitle,
      jobDescription: form.jobDescription,
      companyName: form.companyName,
      noOfOpenings: Number(form.noOfOpenings || 0),
      experience: Number(form.experience || 0),
      jobType: form.jobType,
      examRequired: form.examRequired,
      round1Required: form.round1Required,
      round2Required: form.round2Required,
      requiredSkill: list(form.skills),
      location: list(form.jobLocation),
      examTopics: list(form.examTopics),
      lastDateToApply: form.lastDateToApply || null,
    };

    const fd = new FormData();
    fd.append("companyPhoto", form.companyLogo);
    fd.append(
      "jobCreateDto",
      new Blob([JSON.stringify(jobCreateDto)], { type: "application/json" })
    );

    try {
      toast.loading("Posting job…");
      await axios.post("http://localhost:8086/api/job/create", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.dismiss();
      toast.success("Job posted successfully!");
      navigate("/profile/my-listed-jobs");
    } catch (err) {
      toast.dismiss();
      const msg = err.response?.data?.errorMessage || err.message;
      toast.error(`Failed: ${msg}`);
      console.error(err);
    }
  };

  /* ───────────── Steps Definition ───────────── */
  const steps = [
    {
      title: "Job Role Details",
      content: (
        <>
          <div>
            <label className="block font-medium mb-2">Job Title*</label>
            <input
              name="jobTitle"
              className={fieldClass}
              placeholder="e.g. Product Manager"
              value={form.jobTitle}
              onChange={onChange}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block font-medium mb-2">Company Name*</label>
            <input
              name="companyName"
              className={fieldClass}
              placeholder="e.g. Yamaha Motors"
              value={form.companyName}
              onChange={onChange}
              required
            />
          </div>
        </>
      ),
    },
    {
      title: "Job Information",
      content: (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">
              Expected Salary (₹ / month)
            </label>
            <input
              name="expectedSalary"
              className={fieldClass}
              value={form.expectedSalary}
              onChange={onChange}
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Experience (years)</label>
            <input
              type="number"
              name="experience"
              className={fieldClass}
              value={form.experience}
              onChange={onChange}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Vacancies & Job Type",
      content: (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Vacancies</label>
            <input
              type="number"
              name="noOfOpenings"
              className={fieldClass}
              value={form.noOfOpenings}
              onChange={onChange}
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Job Type</label>
            <select
              name="jobType"
              value={form.jobType}
              onChange={onChange}
              className={fieldClass}
            >
              {["Full-time", "Part-time", "Internship", "Contract"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      ),
    },
    {
      title: "Job Description",
      content: (
        <>
          <label className="block font-medium mb-2">Job Description*</label>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <textarea
              name="jobDescription"
              className={`${fieldClass} h-32 flex-1 resize-none`}
              placeholder="Describe the responsibilities, expectations, and requirements..."
              value={form.jobDescription}
              onChange={onChange}
            />
            <button
              type="button"
              onClick={generateJD}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-sm w-full sm:w-auto"
            >
              <Wand2 size={18} />
              <span className="text-sm font-medium">Generate with AI</span>
            </button>
          </div>
        </>
      ),
    },
    {
      title: "AI Skill Assistant",
      content: (
        <>
          <label className="block font-medium mb-2">Required Skills</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              name="skills"
              className={`${fieldClass} flex-1`}
              placeholder="e.g. Java, Spring Boot, React"
              value={form.skills}
              onChange={onChange}
            />
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm w-full sm:w-auto"
            >
              <Sparkles size={18} />
              <span className="text-sm font-medium">Suggest Skills</span>
            </button>
          </div>
        </>
      ),
    },
    {
      title: "Job Location",
      content: (
        <div>
          <label className="block font-medium mb-2">Location(s)</label>
          <input
            name="jobLocation"
            className={fieldClass}
            placeholder="e.g. Bhubaneswar, Hyderabad"
            value={form.jobLocation}
            onChange={onChange}
          />
        </div>
      ),
    },
    {
      title: "Exam Requirements",
      content: (
        <div className="flex flex-wrap gap-4">
          {[
            { name: "examRequired", label: "Exam Required" },
            { name: "round1Required", label: "First Round" },
            { name: "round2Required", label: "Second Round" },
          ].map(({ name, label }) => (
            <label key={name} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={name}
                checked={form[name]}
                onChange={onChange}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: "Exam Topics & Last Date",
      content: (
        <>
          <label className="block font-medium mb-2">Exam Topics</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <textarea
              name="examTopics"
              className={`${fieldClass} h-24 flex-1 resize-none`}
              placeholder="e.g. Java Basics, Spring Boot, REST APIs"
              value={form.examTopics}
              onChange={onChange}
              disabled={!form.examRequired}
            />
            <button
              type="button"
              disabled={!form.examRequired}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all shadow-sm w-full sm:w-auto ${
                form.examRequired
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              <Sparkles size={18} />
              <span className="text-sm font-medium">Generate Topics</span>
            </button>
          </div>

          <div className="mt-4">
            <label className="block font-medium mb-2">Last Date to Apply</label>
            <input
              type="date"
              name="lastDateToApply"
              className={fieldClass}
              value={form.lastDateToApply}
              onChange={onChange}
            />
          </div>
        </>
      ),
    },
    {
  title: "Company Logo & Submit",
  content: (
    <div className="space-y-4">
      <div>
        <label className="block font-medium text-gray-800 mb-2">
          Upload Company Logo <span className="text-red-500">*</span>
        </label>
        
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="companyLogo"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.9A4.001 4.001 0 0115 8h1a4 4 0 010 8h-1m-4 4l-4-4m0 0l4-4m-4 4h12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, or JPEG (max 1MB)</p>
            </div>
            <input
              id="companyLogo"
              type="file"
              name="companyLogo"
              accept="image/*"
              className="hidden"
              onChange={onChange}
            />
          </label>
        </div>

        {form.companyLogo && (
          <div className="mt-4 flex justify-center">
            <img
              src={form.companyLogo}
              alt="Company Logo Preview"
              className="w-32 h-32 object-cover rounded-xl border border-gray-200 shadow-sm"
            />
          </div>
        )}

        <p className="text-gray-500 text-sm mt-2 text-center">
          Recommended: square image under 1MB
        </p>
      </div>

      
    </div>
  ),
},
  ];

  /* ───────────── UI ───────────── */
  return (
    <div className="bg-[#f4f6f8] min-h-screen pt-10 pb-24 w-full overflow-y-auto">
      <div className="flex justify-center items-start min-h-full w-full p-4">
        <div className="md:max-w-xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
            {steps[step - 1].title}
          </h2>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {steps[step - 1].content}
          </motion.div>

          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                onClick={prev}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
              >
                <ArrowLeft size={18} /> Back
              </button>
            ) : (
              <div />
            )}

            {step < steps.length ? (
              <button
                onClick={next}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                Next <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={submitHandler}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
              >
                <ClipboardCheck size={18} /> Submit
              </button>
            )}
          </div>

          <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>

          <p className="text-sm text-center text-gray-500 mt-3">
            Step {step} of {steps.length}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateJobWizard;