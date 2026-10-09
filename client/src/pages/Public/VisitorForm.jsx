import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  User,
  Building2,
  CreditCard,
  FileText,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import { addVisitor } from "@/services/visitorService";

/* -------------------------------- */
/* Primary Button (Responsive Width) */
/* -------------------------------- */
function PrimaryButton({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-4 focus:ring-blue-100",
    secondary:
      "bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 focus:ring-4 focus:ring-slate-100",
  };

  return (
    <button
      {...props}
      className={`  h-12  px-6  sm:px-8  rounded-xl  font-semibold  transition-all  duration-300  w-full  sm:w-auto  flex
        items-center
        justify-center
        text-center
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

/* -------------------------------- */
/* Input & Dropdown Field           */
/* -------------------------------- */
function Field({
  label,
  className = "",
  type = "text",
  options = [],
  error,
  ...props
}) {
  const baseInputStyles = ` w-full h-14 rounded-xl border
    ${error ? "border-red-500" : "border-slate-300"}
    bg-white  px-4  text-base  text-slate-800  placeholder:text-slate-400  transition-all duration-200
    outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100
  `;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>




      {type === "select" ? (
        <select {...props} className={baseInputStyles}>
          <option value="" disabled hidden>
            {props.placeholder || "Select an option"}
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

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

/* -------------------------------- */
/* TextArea                         */
/* -------------------------------- */
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
        className="  w-full  min-h-40  rounded-xl  border  border-slate-300  bg-white  p-4  text-base  placeholder:text-slate-400
          outline-none  resize-none  transition-all  duration-200  focus:border-blue-600  focus:ring-4  focus:ring-blue-100
        "
      />
    </div>
  );
}

/* -------------------------------- */
/* Section Card (Responsive Padding)*/
/* -------------------------------- */
function Section({
  icon,
  title,
  subtitle,
  children,
}) {
  return (
    <div className="  bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg border border-slate-200
      p-5 sm:p-8 md:p-10 mb-6 sm:mb-10
    ">
      <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
        <div className="  w-12  h-12  sm:w-14  sm:h-14  rounded-xl  sm:rounded-2xl  bg-blue-50  flex  items-center  justify-center  text-blue-600  shrink-0
        ">
          {icon}
        </div>

        <div>
          <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-500">
            {subtitle}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            {title}
          </h2>
        </div>
      </div>

      <div className="
        grid  grid-cols-1  md:grid-cols-2  gap-x-8  gap-y-5  sm:gap-y-7">
        {children}
      </div>
    </div>
  );
}

/* -------------------------------- */
/* Success Modal (shown after submit)*/
/* -------------------------------- */
function SuccessModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="  fixed inset-0  z-50  flex items-center
        justify-center
        bg-slate-900/60
        backdrop-blur-sm
        px-4
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="  bg-white  rounded-2xl  sm:rounded-3xl  shadow-2xl w-full   max-w-md  p-6  sm:p-8  text-center
        "
      >
        <div
          className="  w-16  h-16  sm:w-20  sm:h-20  rounded-full  bg-green-50  flex  items-center  justify-center  mx-auto
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
          Your visitor pass request has been submitted. Please wait, your
          host will be notified shortly.
        </p>

        <PrimaryButton onClick={onClose} className="mt-7 sm:mt-8 mx-auto">
          Okay, Got It
        </PrimaryButton>
      </div>
    </div>
  );
}

/* -------------------------------- */
/* Visitor Registration Page        */
/* -------------------------------- */
export default function VisitorForm() {
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: "",
    purpose: "",
    designation: "",
    personVisited: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    identityType: "",
    identityNumber: "",
    gender: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({});

  const validateIdentityNumber = (type, value) => {
    const patterns = {
      Aadhaar: /^\d{12}$/, // 12 digits
      PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // ABCDE1234F
      DL: /^[A-Z]{2}[0-9]{2}[0-9]{11}$/, // Basic DL format
      Passport: /^[A-Z][0-9]{7}$/, // A1234567
      Other: /^.{5,30}$/, // 5-30 characters
    };

    return patterns[type]?.test((value || "").trim()) || false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newData = {
      ...formData,
      [name]: value,
    };

    setFormData(newData);

    if (name === "identityNumber") {
      const valid = validateIdentityNumber(newData.identityType, value);

      setErrors((prev) => ({
        ...prev,
        identityNumber: valid ? "" : "Invalid ID Number",
      }));
    }

    if (name === "identityType") {
      const valid = validateIdentityNumber(value, newData.identityNumber);

      setErrors((prev) => ({
        ...prev,
        identityNumber: valid ? "" : "Invalid ID Number",
      }));
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      company: "",
      purpose: "",
      designation: "",
      personVisited: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      identityType: "",
      identityNumber: "",
      gender: "",
      remarks: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.identityType &&
      !validateIdentityNumber(formData.identityType, formData.identityNumber)
    ) {
      setErrors((prev) => ({ ...prev, identityNumber: "Invalid ID Number" }));
      toast.error("Please enter a valid ID number");
      return;
    }

    try {
      setLoading(true);
      await addVisitor(formData);
      setShowSuccessModal(true);
      handleReset();
    } catch (err) {
      console.log(err);
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
        {/* Top Header */}
        <header className="bg-slate-900 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
                <Building2 size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white leading-tight">
                  SHOEPAL'S
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Visitor Management System
                </p>
              </div>
            </div>

            <Link
              to="/"
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white hover:text-blue-300 transition shrink-0 font-medium"
            >
              <ArrowLeft size={16} />
              <span className="hidden xs:inline">Back to </span>Home
            </Link>
          </div>
        </header>

        {/* Page Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Visitor Registration
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-500 mt-3 sm:mt-4 max-w-md mx-auto">
              Complete your details to generate a visitor pass.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10">
            {/* ================= PERSONAL INFORMATION ================= */}
            <Section
              icon={<User size={24} />}
              title="Personal Information"
              subtitle="Section 1"
            >
              <Field
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />

              <Field
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                required
              />

              <Field
                label="phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                maxLength={10}
                required
              />

              <Field
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
              />

              <Field
                label="Company Name"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="ABC Pvt Ltd"
                className="md:col-span-2"
              />
            </Section>

            {/* ================= VISIT DETAILS ================= */}
            <Section
              icon={<Building2 size={24} />}
              title="Visit Details"
              subtitle="Section 2"
            >
              <Field
                label="Purpose of Visit"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Meeting"
              />

              <Field
                label="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Software Engineer"
              />

              <Field
                label="Person To Visit"
                name="personVisited"
                value={formData.personVisited}
                onChange={handleChange}
                placeholder="Mr. Rahul Sharma"
                required
              />

              <Field
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Address"
              />

              <Field
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Noida"
              />

              <Field
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Uttar Pradesh"
              />

              <Field
                label="Zip "
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="201301"
                className="md:col-span-2"
              />
            </Section>

            {/* ================= IDENTITY ================= */}
            <Section
              icon={<CreditCard size={24} />}
              title="Identity Details"
              subtitle="Section 3"
            >
              <Field
                label="Identity Document Type"
                type="select"
                name="identityType"
                value={formData.identityType}
                onChange={handleChange}
                placeholder="Select ID Type"
                options={[
                  { label: "Aadhaar Card", value: "Aadhaar" },
                  { label: "PAN Card", value: "PAN" },
                  { label: "Driving License", value: "DL" },
                  { label: "Passport", value: "Passport" },
                  { label: "Other Official ID", value: "Other" },
                ]}
              />

              <Field
                label="Identity / ID Number"
                name="identityNumber"
                value={formData.identityNumber}
                onChange={handleChange}
                placeholder="Enter ID document number"
                error={errors.identityNumber}
              />

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
                className="md:col-span-2"
              />
            </Section>

            {/* ================= REMARKS ================= */}
            <Section
              icon={<FileText size={24} />}
              title="Additional Remarks"
              subtitle="Section 4"
            >
              <div className="md:col-span-2">
                <TextArea
                  label="Remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Write additional notes here..."
                />
              </div>
            </Section>

            {/* ================= ACTION BUTTONS ================= */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg border border-slate-200 p-5 sm:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Ready to Submit?
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Please verify all the details before submitting your visitor registration.
                  </p>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 w-full md:w-auto">
                  <PrimaryButton
                    type="button"
                    variant="secondary"
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Reset Form
                  </PrimaryButton>

                  <PrimaryButton
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Registration"}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white mt-12 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-bold text-slate-800 text-base sm:text-lg">
              SHOEPAL'S
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Visitor Management System
            </p>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            © {new Date().getFullYear()} SHOEPAL'S. All Rights Reserved.
          </p>
        </div>
      </footer>

      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}