import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addInterview } from "@/services/interviewService";

import {
  ArrowLeft,
  User,
  Briefcase,
  CalendarDays,
  FileText,
  Building2,
  UploadCloud,
  Plus,
  X,
  CheckCircle2,
} from "lucide-react";

/* ===========================================
   PRIMARY BUTTON (Responsive Widths)
=========================================== */
function PrimaryButton({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-blue-200",
    secondary:
      "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-4 focus:ring-slate-100",
  };

  return (
    <button
      {...props}
      className={` h-12  px-6  sm:px-8  rounded-xl  font-semibold  transition-all  duration-300  w-full  sm:w-auto
        text-center
        flex
        items-center
        justify-center
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

/* ===========================================
   INPUT & SELECT FIELD (Responsive Types)
=========================================== */
function Field({
  label,
  className = "",
  type = "text",
  options = [],
  ...props
}) {
  const baseInputStyles = `w-full  h-14  rounded-xl border border-slate-300  bg-white px-4  text-base  outline-none
    transition-all
    duration-200
    placeholder:text-slate-400
    focus:border-blue-600
    focus:ring-4
    focus:ring-blue-100
  `;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      {type === "select" ? (
        <select {...props} className={baseInputStyles}>
          <option value="" disabled hidden>
            {props.placeholder || "Select option"}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} {...props} className={baseInputStyles} />
      )}
    </div>
  );
}

/* ===========================================
   TEXTAREA
=========================================== */
function TextArea({
  label,
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <textarea
        {...props}
        className="  min-h-40 rounded-xl border
          border-slate-300
          bg-white
          p-4
          outline-none
          resize-none
          transition-all
          duration-200
          focus:border-blue-600
          focus:ring-4
          focus:ring-blue-100
        "
      />
    </div>
  );
}

/* ===========================================
   SECTION CARD (Responsive Padding & Grid)
=========================================== */
function Section({
  icon,
  title,
  subtitle,
  children,
}) {
  return (
    <div
      className="  bg-white  rounded-2xl  sm:rounded-3xl  border  border-slate-200  shadow-md  sm:shadow-lg  p-5
        sm:p-8
        md:p-10
        mb-6
        sm:mb-10
      "
    >
      <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
        <div
          className="  w-12  h-12  sm:w-14  sm:h-14  rounded-xl  sm:rounded-2xl  bg-blue-50 flex items-center
            justify-center
            text-blue-600
            shrink-0
          "
        >
          {icon}
        </div>

        <div>
          <p className="uppercase tracking-widest text-xs sm:text-sm text-slate-500">
            {subtitle}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            {title}
          </h2>
        </div>
      </div>

      <div
        className="  grid  grid-cols-1  md:grid-cols-2  gap-x-8  gap-y-5  sm:gap-y-7
        "
      >
        {children}
      </div>
    </div>
  );
}

/* ===========================================
   FILE UPLOAD (Responsive Touch Safe Zone)
=========================================== */
function UploadBox({
  onChange,
}) {
  return (
    <label
      className=" flex flex-col items-center justify-center border-2  border-dashed  border-slate-300  rounded-2xl  py-8  sm:py-12  px-4  cursor-pointer
        hover:border-blue-600
        hover:bg-blue-50
        transition-all
        text-center
      "
    >
      <UploadCloud
        size={38}
        className="text-blue-600 mb-3 sm:mb-4"
      />
      <h3 className="font-semibold text-base sm:text-lg">
        Upload Resume
      </h3>
      <p className="text-slate-500 text-xs sm:text-sm mt-1 sm:mt-2">
        PDF, DOC or DOCX
      </p>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
}

/* ===========================================
   EXTRA EDUCATION ENTRY CARD
   (Optional, repeatable — 12th / UG / PG / etc.)
=========================================== */
function EducationEntry({ entry, index, onChange, onRemove }) {
  return (
    <div
      className=" md:col-span-2 relative rounded-2xl border border-slate-200
        bg-slate-50
        p-4
        sm:p-6
      "
    >
      <button
        type="button"
        onClick={() => onRemove(entry.id)}
        aria-label="Remove education entry"
        className="  absolute  top-3  right-3  w-8  h-8  rounded-full bg-white  border  border-slate-200  text-slate-500  hover:text-red-600  hover:border-red-300
          flex items-center  justify-center transition-colors
        "
      >
        <X size={16} />
      </button>

      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
        Education #{index + 2}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pr-8">
        <Field
          label="Qualification"
          value={entry.qualification}
          onChange={(e) => onChange(entry.id, "qualification", e.target.value)}
          placeholder="e.g. 12th, B.Tech, MBA"
        />

        <Field
          label="School / College / University"
          value={entry.schoolName}
          onChange={(e) => onChange(entry.id, "schoolName", e.target.value)}
          placeholder="Institution name"
        />

        <Field
          label="Board / University"
          value={entry.board}
          onChange={(e) => onChange(entry.id, "board", e.target.value)}
          placeholder="e.g. CBSE, State Board, XYZ University"
        />

        <Field
          label="Year of Passing"
          value={entry.yearOfPassing}
          onChange={(e) => onChange(entry.id, "yearOfPassing", e.target.value)}
          placeholder="e.g. 2022"
          maxLength={4}
        />

        <Field
          label="Percentage / CGPA"
          value={entry.marks}
          onChange={(e) => onChange(entry.id, "marks", e.target.value)}
          placeholder="e.g. 82% or 8.2 CGPA"
          className="md:col-span-2"
        />
      </div>
    </div>
  );
}

/* ===========================================
   EXTRA WORK EXPERIENCE ENTRY CARD
   (Optional, repeatable — previous jobs)
=========================================== */
function ExperienceEntry({ entry, index, onChange, onRemove }) {
  return (
    <div
      className="  md:col-span-2 relative rounded-2xl border  border-slate-200 bg-slate-50
        p-4
        sm:p-6
      "
    >
      <button
        type="button"
        onClick={() => onRemove(entry.id)}
        aria-label="Remove experience entry"
        className="  absolute  top-3  right-3  w-8  h-8  rounded-full  bg-white  border  border-slate-200  text-slate-500  hover:text-red-600
          hover:border-red-300
          flex
          items-center
          justify-center
          transition-colors
        "
      >
        <X size={16} />
      </button>

      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
        Experience #{index + 1}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pr-8">
        <Field
          label="Company Name"
          value={entry.companyName}
          onChange={(e) => onChange(entry.id, "companyName", e.target.value)}
          placeholder="e.g. Acme Corp"
        />

        <Field
          label="Designation"
          value={entry.designation}
          onChange={(e) => onChange(entry.id, "designation", e.target.value)}
          placeholder="e.g. Frontend Developer"
        />

        <Field
          label="From"
          type="date"
          value={entry.fromDate}
          onChange={(e) => onChange(entry.id, "fromDate", e.target.value)}
        />

        <Field
          label="To"
          type="date"
          value={entry.toDate}
          onChange={(e) => onChange(entry.id, "toDate", e.target.value)}
        />

        <Field
          label="Description"
          value={entry.description}
          onChange={(e) => onChange(entry.id, "description", e.target.value)}
          placeholder="Brief role summary"
          className="md:col-span-2"
        />
      </div>
    </div>
  );
}

/* ===========================================
   SUCCESS MODAL (shown after submission)
=========================================== */
function SuccessModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="  fixed  inset-0  z-50  flex  items-center  justify-center  bg-slate-900/60  backdrop-blur-sm
        px-4
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="  bg-white  rounded-2xl  sm:rounded-3xl  shadow-2xl  w-full
          max-w-md
          p-6
          sm:p-8
          text-center
          animate-[fadeIn_0.2s_ease-out]
        "
      >
        <div
          className="  w-16  h-16  sm:w-20  sm:h-20  rounded-full  bg-green-50  flex
            items-center
            justify-center
            mx-auto
            mb-5
            sm:mb-6
          "
        >
          <CheckCircle2 size={40} className="text-green-600" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
          Registration Successful!
        </h3>

        <p className="text-sm sm:text-base text-slate-500 mt-3 leading-relaxed">
          Your interview form has been submitted successfully. Please
          proceed to the <span className="font-semibold text-slate-700">lobby area</span> and
          wait — our team will call you shortly.
        </p>

        <PrimaryButton onClick={onClose} className="mt-7 sm:mt-8 mx-auto">
          Okay, Got It
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ===========================================
   INTERVIEW REGISTRATION MAIN PAGE
=========================================== */
export default function InterviewForm() {
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    tenthSchoolName: "",
    tenthBoard: "",
    tenthYearOfPassing: "",
    tenthMarks: "",
    applyingFor: "",
    interviewer: "",
    interviewDate: "",
    interviewTime: "",
    remarks: "",
  });

  // Additional education entries beyond 10th (12th, UG, PG, diploma, etc.)
  // Each entry: { id, qualification, schoolName, board, yearOfPassing, marks }
  const [educationList, setEducationList] = useState([]);

  // Additional work experience entries (previous companies/roles)
  // Each entry: { id, companyName, designation, fromDate, toDate, description }
  const [experienceList, setExperienceList] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResume = (e) => {
    if (e.target.files?.[0]) {
      setResume(e.target.files[0]);
    }
  };

  const addEducationEntry = () => {
    setEducationList((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        qualification: "",
        schoolName: "",
        board: "",
        yearOfPassing: "",
        marks: "",
      },
    ]);
  };

  const removeEducationEntry = (id) => {
    setEducationList((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleEducationChange = (id, field, value) => {
    setEducationList((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addExperienceEntry = () => {
    setExperienceList((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        companyName: "",
        designation: "",
        fromDate: "",
        toDate: "",
        description: "",
      },
    ]);
  };

  const removeExperienceEntry = (id) => {
    setExperienceList((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleExperienceChange = (id, field, value) => {
    setExperienceList((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const resetForm = () => {
    setResume(null);
    setEducationList([]);
    setExperienceList([]);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      gender: "",
      address: "",
      tenthSchoolName: "",
      tenthBoard: "",
      tenthYearOfPassing: "",
      tenthMarks: "",
      applyingFor: "",
      interviewer: "",
      interviewDate: "",
      interviewTime: "",
      remarks: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Append additional education entries as JSON
      data.append("education", JSON.stringify(educationList));

      // Append additional experience entries as JSON
      data.append("experienceDetails", JSON.stringify(experienceList));

      // Append resume file
      if (resume) {
        data.append("resume", resume);
      }

      await addInterview(data);

      setShowSuccessModal(true);

      resetForm();
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white flex flex-col justify-between">
      <div>
        {/* HEADER */}
        <header className="bg-slate-900 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
                <Building2 size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white leading-tight">
                  SHOEPAL'S
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Interview Portal
                </p>
              </div>
            </div>

            <Link
              to="/"
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-white hover:text-blue-300 transition shrink-0"
            >
              <ArrowLeft size={16} />
              <span className="hidden xs:inline">Back to </span>Home
            </Link>
          </div>
        </header>

        {/* MAIN BODY CONTAINER */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Interview Registration
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-500 mt-3 sm:mt-4 max-w-xl mx-auto">
              Complete the interview configuration registration form below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10">
            {/* SECTION 1: CANDIDATE INFO */}
            <Section
              icon={<User size={24} />}
              title="Candidate Information"
              subtitle="Section 1"
            >
              <Field
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />

              <Field
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
              />

              <Field
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                maxLength={10}
                required
              />

              {/* Enhanced UX native select for cleaner mobile control */}
              <Field
                label="Gender"
                type="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Select Gender"
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                  { label: "Other", value: "Other" },
                ]}
              />

              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">
                  Academic Qualification
                </h3>
              </div>

              {/* 10th — the only mandatory education block */}
              <Field
                label="School Name"
                name="tenthSchoolName"
                value={formData.tenthSchoolName}
                onChange={handleChange}
                placeholder="Institution name"
                required
              />

              <Field
                label="Board"
                name="tenthBoard"
                value={formData.tenthBoard}
                onChange={handleChange}
                placeholder="e.g. CBSE, State Board"
                required
              />

              <Field
                label="Year of Passing"
                name="tenthYearOfPassing"
                value={formData.tenthYearOfPassing}
                onChange={handleChange}
                placeholder="e.g. 2020"
                maxLength={4}
                required
              />

              <Field
                label="10th Percentage / CGPA"
                name="tenthMarks"
                value={formData.tenthMarks}
                onChange={handleChange}
                placeholder="e.g. 88% or 8.8 CGPA"
                required
              />

              {/* Dynamically added education entries (12th, UG, PG, diploma, etc.) */}
              {educationList.map((entry, index) => (
                <EducationEntry
                  key={entry.id}
                  entry={entry}
                  index={index}
                  onChange={handleEducationChange}
                  onRemove={removeEducationEntry}
                />
              ))}

              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={addEducationEntry}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    w-full
                    h-12
                    rounded-xl
                    border-2
                    border-dashed
                    border-blue-300
                    text-blue-600
                    font-semibold
                    hover:bg-blue-50
                    hover:border-blue-600
                    transition-all
                  "
                >
                  <Plus size={18} />
                  Add Education
                </button>
              </div>

              <Field
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter complete address"
                className="md:col-span-2"
              />
            </Section>

            {/* SECTION 2: JOB DETAILS */}
            <Section
              icon={<Briefcase size={24} />}
              title="Job Details"
              subtitle="Section 2"
            >
              <Field
                label="Applying For"
                name="applyingFor"
                value={formData.applyingFor}
                onChange={handleChange}
                placeholder="Frontend Developer"
                required
              />

              <Field
                label="Interviewer"
                name="interviewer"
                value={formData.interviewer}
                onChange={handleChange}
                placeholder="Mr. Rahul Sharma"
                required
              />

              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">
                  Work Experience
                </h3>
              </div>

              {/* Dynamically added work experience entries */}
              {experienceList.map((entry, index) => (
                <ExperienceEntry
                  key={entry.id}
                  entry={entry}
                  index={index}
                  onChange={handleExperienceChange}
                  onRemove={removeExperienceEntry}
                />
              ))}

              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={addExperienceEntry}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    w-full
                    h-12
                    rounded-xl
                    border-2
                    border-dashed
                    border-blue-300
                    text-blue-600
                    font-semibold
                    hover:bg-blue-50
                    hover:border-blue-600
                    transition-all
                  "
                >
                  <Plus size={18} />
                  Add Experience
                </button>
              </div>
            </Section>

            {/* SECTION 3: INTERVIEW SCHEDULE */}
            <Section
              icon={<CalendarDays size={24} />}
              title="Interview Schedule"
              subtitle="Section 3"
            >
              <Field
                type="date"
                label="Interview Date"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />

            </Section>

            {/* SECTION 4: RESUME UPLOAD */}
            <Section
              icon={<UploadCloud size={24} />}
              title="Resume Upload"
              subtitle="Section 4"
            >
              <div className="md:col-span-2">
                <UploadBox onChange={handleResume} />

                {resume && (
                  <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-4 break-words">
                    <p className="font-semibold text-green-700 text-sm">
                      Selected File
                    </p>
                    <p className="text-xs sm:text-sm mt-1 text-slate-600">
                      {resume.name}
                    </p>
                  </div>
                )}
              </div>
            </Section>

            {/* SECTION 5: REMARKS */}
            <Section
              icon={<FileText size={24} />}
              title="Additional Remarks"
              subtitle="Section 5"
            >
              <div className="md:col-span-2">
                <TextArea
                  label="Remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Write any additional remarks..."
                />
              </div>
            </Section>

            {/* ACTION FOOTER BAR */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg border border-slate-200 p-5 sm:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
                    Ready to Register?
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Please verify all interview details before submitting.
                  </p>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 w-full md:w-auto">
                  <PrimaryButton
                    type="button"
                    variant="secondary"
                    onClick={resetForm}
                    disabled={loading}
                  >
                    Reset Form
                  </PrimaryButton>

                  <PrimaryButton type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Register Interview"}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t mt-12 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-bold text-slate-800 text-base sm:text-lg">
              SHOEPAL'S
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Interview Management Portal
            </p>
          </div>

          <div className="text-slate-400 text-xs sm:text-sm sm:text-right">
            <p>© {new Date().getFullYear()} SHOEPAL's</p>
            <p className="mt-0.5">All Rights Reserved</p>
          </div>
        </div>
      </footer>

      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}