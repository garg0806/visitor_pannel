import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STATUS_OPTIONS = [
  "Scheduled",
  "Confirmed",
  "Checked In",
  "In Progress",
  "Completed",
  "Selected",
  "Rejected",
  "On Hold",
  "Shortlisted",
  "Waiting List",
  "Offer Released",
  "Offer Accepted",
  "Offer Rejected",
  "No Show",
  "Cancelled",
];

export default function EditInterviewModal({ interview, onClose, onSave }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    qualification: "",
    experience: "",
    applyingFor: "",
    interviewer: "",
    interviewDate: "",
    interviewTime: "",
    status: "Scheduled",
    remarks: "",
  });

  useEffect(() => {
    if (interview) {
      setFormData({
        ...interview,
        interviewDate: interview.interviewDate
          ? interview.interviewDate.substring(0, 10)
          : "",
      });
    }
  }, [interview]);

  if (!interview) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4 sm:p-6 shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold">Edit Interviewee</h2>
          <button onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto">
          <form
            id="edit-interview-form"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 p-4 sm:p-6"
          >
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border rounded-xl p-3"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border rounded-xl p-3"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border rounded-xl p-3"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Qualification"
              className="w-full border rounded-xl p-3"
            />

            <input
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Experience"
              className="w-full border rounded-xl p-3"
            />

            <input
              name="applyingFor"
              value={formData.applyingFor}
              onChange={handleChange}
              placeholder="Applying For"
              className="w-full border rounded-xl p-3"
            />

            <input
              name="interviewer"
              value={formData.interviewer}
              onChange={handleChange}
              placeholder="Interviewer"
              className="w-full border rounded-xl p-3"
            />

            <input
              type="date"
              name="interviewDate"
              value={formData.interviewDate}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

            <input
              type="time"
              name="interviewTime"
              value={formData.interviewTime}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

            {/* Single, merged status field */}
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium mb-1">
                Interview Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border rounded-xl p-3"
            />

            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Remarks"
              rows={4}
              className="sm:col-span-2 w-full border rounded-xl p-3"
            />
          </form>
        </div>

        {/* Footer buttons - stick to bottom, stack on mobile */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 border-t p-4 sm:p-6 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="edit-interview-form"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}