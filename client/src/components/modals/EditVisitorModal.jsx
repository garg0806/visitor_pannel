// import { useEffect, useState } from "react";
// import { X } from "lucide-react";

// export default function EditVisitorModal({
//   visitor,
//   onClose,
//   onSave,
// }) {
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     if (visitor) {
//       setFormData(visitor);
//     }
//   }, [visitor]);

//   if (!visitor) return null;

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

//       <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">

//         <div className="flex justify-between items-center p-6 border-b">

//           <h2 className="text-2xl font-bold">
//             Edit Visitor
//           </h2>

//           <button onClick={onClose}>
//             <X />
//           </button>

//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="p-6 grid grid-cols-2 gap-5"
//         >

//           <input
//             name="firstName"
//             {/* value={formData.firstName || ""} */}
//           value={""}
//             onChange={handleChange}
//             className="border rounded-xl p-3"
//             placeholder="First Name"
//           />

//           <input
//             name="lastName"
//             value={formData.lastName || ""}
//             onChange={handleChange}
//             className="border rounded-xl p-3"
//             placeholder="Last Name"
//           />

//           <input
//             name="phone"
//             value={formData.phone || ""}
//             onChange={handleChange}
//             className="border rounded-xl p-3"
//             placeholder="Phone"
//           />

//           <input
//             name="email"
//             value={formData.email || ""}
//             onChange={handleChange}
//             className="border rounded-xl p-3"
//             placeholder="Email"
//           />

//           <input
//             name="company"
//             value={formData.company || ""}
//             onChange={handleChange}
//             className="border rounded-xl p-3"
//             placeholder="Company"
//           />

//           <input
//             name="purpose"
//             value={formData.purpose || ""}
//             onChange={handleChange}
//             className="border rounded-xl p-3"
//             placeholder="Purpose"
//           />

//           <div className="col-span-2 flex justify-end gap-3 mt-4">

//             <button
//               type="button"
//               onClick={onClose}
//               className="px-5 py-3 rounded-xl border"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="px-5 py-3 rounded-xl bg-blue-600 text-white"
//             >
//               Save Changes
//             </button>

//           </div>

//         </form>

//       </div>

//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function EditVisitorModal({
  visitor,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (visitor) {
      setFormData(visitor);
    }
  }, [visitor]);

  if (!visitor) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5">

      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4 sm:p-6">

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              Edit Visitor
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Update the visitor's information below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={22} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-6"
        >

          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="text-sm font-semibold text-slate-700">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter first name"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="text-sm font-semibold text-slate-700">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter last name"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter email address"
            />
          </div>

          {/* Company */}
          <div className="flex flex-col gap-2">
            <label htmlFor="company" className="text-sm font-semibold text-slate-700">
              Company
            </label>
            <input
              id="company"
              name="company"
              value={formData.company || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter company name"
            />
          </div>

          {/* Purpose */}
          <div className="flex flex-col gap-2">
            <label htmlFor="purpose" className="text-sm font-semibold text-slate-700">
              Purpose of Visit
            </label>
            <input
              id="purpose"
              name="purpose"
              value={formData.purpose || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter purpose of visit"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor="address" className="text-sm font-semibold text-slate-700">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              rows={3}
              className="w-full resize-y rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter address"
            />
          </div>

          {/* City */}
          <div className="flex flex-col gap-2">
            <label htmlFor="city" className="text-sm font-semibold text-slate-700">
              City
            </label>
            <input
              id="city"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter city"
            />
          </div>

          {/* State */}
          <div className="flex flex-col gap-2">
            <label htmlFor="state" className="text-sm font-semibold text-slate-700">
              State
            </label>
            <input
              id="state"
              name="state"
              value={formData.state || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter state"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t pt-4 sm:col-span-2 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
