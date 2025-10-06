// ────────────────────────────────────────────────────────────────
//  src/pages/CreateJobPage.jsx
// ────────────────────────────────────────────────────────────────
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Building2,
  Briefcase,
  AlignLeft,
  Wallet,
  ListChecks,
  MapPin,
  ClipboardCheck,
  BookOpenCheck,
  Upload,
  CalendarCheck,
  Users as UsersIcon,
  Type as TypeIcon,
} from "lucide-react";
import Footer from "../utils/footer/Footer";
import { useNavigate } from "react-router-dom";

/* ───────────── reusable input wrapper ───────────── */
const fieldClass =
  "w-full bg-white border border-gray-300 rounded-lg pl-11 pr-3 py-2 " +
  "focus:border-blue-500 focus:ring-blue-500 outline-none transition";

const FormRow = ({ icon: Icon, children }) => (
  <div className="relative flex-1 min-w-[250px]">
    <Icon
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      size={18}
    />
    {children}
  </div>
);

const CreateJobPage = () => {
  const navigate = useNavigate()
  const publisherEmail =
    localStorage.getItem("userEmail") ?? "test@skillverify.com";

  /* ——— local state ——— */
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

  /* ——— helpers ——— */
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

  /* ——— submit ——— */
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!form.companyLogo) {
      toast.error("Please choose a company logo");
      return;
    }

    /* 1️⃣ build the DTO exactly like backend expects */
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
      /* the server will fill companyPhotoLink after Cloudinary upload */
    };

    /* 2️⃣ build multipart body */
    const fd = new FormData();
    fd.append("companyPhoto", form.companyLogo); // file
    fd.append(
      "jobCreateDto",
      new Blob(
        [JSON.stringify(jobCreateDto)], // dto
        { type: "application/json" }
      )
    );

    try {
      toast.loading("Posting job…");
      const { data } = await axios.post(
        "http://localhost:8086/api/job/create",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.dismiss();
      toast.success("Job posted!");
      console.log("✅ Created:", data);
      navigate("/profile/my-listed-jobs");
      /* optionally reset form */
      // setForm((p)=>({...p, jobTitle:"", ... etc }))
    } catch (err) {
      toast.dismiss();
      const msg = err.response?.data?.errorMessage || err.message;
      toast.error(`Failed: ${msg}`);
      console.error(err);
    }
  };

  /* ——— UI ——— */
  return (
    <div className="bg-[#f4f6f8] min-h-screen pt-12 pb-24">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          Post a New Job
        </h2>

        <form onSubmit={submitHandler} className="space-y-8">
          <div className="md:grid md:grid-cols-2 md:gap-8 space-y-8 md:space-y-0">
            {/* ——— many inputs, unchanged ——— */}
            <FormRow icon={Building2}>
              <input
                className={fieldClass}
                name="companyName"
                placeholder="Company Name*"
                value={form.companyName}
                onChange={onChange}
                required
              />
            </FormRow>
            <FormRow icon={Briefcase}>
              <input
                className={fieldClass}
                name="jobTitle"
                placeholder="Job Title*"
                value={form.jobTitle}
                onChange={onChange}
                required
              />
            </FormRow>
            <FormRow icon={Wallet}>
              <input
                className={fieldClass}
                name="expectedSalary"
                placeholder="Expected Salary (₹ / month)"
                value={form.expectedSalary}
                onChange={onChange}
              />
            </FormRow>
            <FormRow icon={CalendarCheck}>
              <input
                className={fieldClass}
                name="experience"
                type="number"
                min="0"
                placeholder="Experience (years)"
                value={form.experience}
                onChange={onChange}
              />
            </FormRow>
            <FormRow icon={UsersIcon}>
              <input
                className={fieldClass}
                name="noOfOpenings"
                type="number"
                min="1"
                placeholder="No. of Vacancies"
                value={form.noOfOpenings}
                onChange={onChange}
                required
              />
            </FormRow>
            <FormRow icon={TypeIcon}>
              <select
                className={`${fieldClass} appearance-none`}
                name="jobType"
                value={form.jobType}
                onChange={onChange}
              >
                {["Full-time", "Part-time", "Internship", "Contract"].map(
                  (t) => (
                    <option key={t}>{t}</option>
                  )
                )}
              </select>
            </FormRow>
            <FormRow icon={ListChecks}>
              <input
                className={fieldClass}
                name="skills"
                placeholder="Skills (comma-separated)"
                value={form.skills}
                onChange={onChange}
              />
            </FormRow>
            <FormRow icon={MapPin}>
              <input
                className={fieldClass}
                name="jobLocation"
                placeholder="Location(s) (comma-separated)"
                value={form.jobLocation}
                onChange={onChange}
              />
            </FormRow>
            {/* full-width description */}
            <div className="md:col-span-2">
              <FormRow icon={AlignLeft}>
                <textarea
                  className={`${fieldClass} h-28 resize-none`}
                  name="jobDescription"
                  placeholder="Job Description*"
                  value={form.jobDescription}
                  onChange={onChange}
                  required
                />
              </FormRow>
            </div>
            <FormRow icon={CalendarCheck}>
              <input
                type="date"
                className={fieldClass}
                name="lastDateToApply"
                value={form.lastDateToApply}
                onChange={onChange}
              />
            </FormRow>

            {/* aligned upload */}
            <FormRow icon={Upload}>
              <label className="w-full cursor-pointer">
                <input
                  type="file"
                  name="companyLogo"
                  accept="image/*"
                  onChange={onChange}
                  className="sr-only"
                />
                <div
                  className={`${fieldClass} flex justify-between items-center pointer-events-none`}
                >
                  <span className="truncate text-gray-700">
                    {form.companyLogo
                      ? form.companyLogo.name
                      : "Upload company logo*"}
                  </span>
                  <span className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-full">
                    Browse
                  </span>
                </div>
              </label>
            </FormRow>
          </div>

          {/* toggles */}
          <div className="flex flex-wrap gap-6">
            {[
              { name: "examRequired", label: "Exam Required" },
              { name: "round1Required", label: "First Round Needed" },
              { name: "round2Required", label: "Second Round Needed" },
            ].map(({ name, label }) => (
              <label
                key={name}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={name}
                  checked={form[name]}
                  onChange={onChange}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 rounded-full bg-gray-300 peer-checked:bg-blue-500 relative transition-colors">
                  <span
                    className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white
                                   transition-transform peer-checked:translate-x-5"
                  />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </label>
            ))}
          </div>

          {/* topics */}
          <FormRow icon={BookOpenCheck}>
            <textarea
              className={`${fieldClass} h-24 resize-none`}
              name="examTopics"
              placeholder="Exam Topics (comma-separated)"
              value={form.examTopics}
              onChange={onChange}
              disabled={!form.examRequired}
            />
          </FormRow>

          {/* submit */}
          <button
            type="submit"
            className="w-full md:w-auto block mx-auto bg-blue-600 hover:bg-blue-700
                             text-white font-semibold px-10 py-2 rounded-full flex items-center
                             gap-2 justify-center transition"
          >
            <ClipboardCheck size={18} /> Post Job
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateJobPage;
