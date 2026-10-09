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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-2xl font-bold">
            Edit Visitor
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 grid grid-cols-2 gap-5"
        >

          <input
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            className="border rounded-xl p-3"
            placeholder="First Name"
          />

          <input
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            className="border rounded-xl p-3"
            placeholder="Last Name"
          />

          <input
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            className="border rounded-xl p-3"
            placeholder="Phone"
          />

          <input
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="border rounded-xl p-3"
            placeholder="Email"
          />

          <input
            name="company"
            value={formData.company || ""}
            onChange={handleChange}
            className="border rounded-xl p-3"
            placeholder="Company"
          />

          <input
            name="purpose"
            value={formData.purpose || ""}
            onChange={handleChange}
            className="border rounded-xl p-3"
            placeholder="Purpose"
          />

          <div className="col-span-2 flex justify-end gap-3 mt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-blue-600 text-white"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}