import { useEffect, useState } from "react";

export default function ReviewVisitorModal({
  visitor,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({
    visitStatus: "Pending",
    rating: 0,
    adminReview: "",
  });

  useEffect(() => {
    if (visitor) {
      setFormData({
        visitStatus: visitor.visitStatus || "Pending",
        rating: visitor.rating || 0,
        adminReview: visitor.adminReview || "",
      });
    }
  }, [visitor]);

  if (!visitor) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...visitor,
      ...formData,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Visitor Review
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Name */}

          <div>

            <label className="font-semibold text-slate-700">
              Visitor
            </label>

            <input
              disabled
              value={`${visitor.firstName} ${visitor.lastName}`}
              className="w-full mt-2 border rounded-xl p-3 bg-slate-100"
            />

          </div>

          {/* Status */}

          <div>

            <label className="font-semibold text-slate-700">
              Visit Status
            </label>

            <select
              value={formData.visitStatus}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  visitStatus: e.target.value,
                })
              }
              className="w-full mt-2 border rounded-xl p-3"
            >

              <option>Pending</option>
              <option>Checked In</option>
              <option>Checked Out</option>

            </select>

          </div>

          {/* Rating */}

          <div>

            <label className="font-semibold text-slate-700">
              Rating
            </label>

            <div className="flex gap-3 mt-3">

              {[1, 2, 3, 4, 5].map((star) => (

                <button
                  type="button"
                  key={star}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      rating: star,
                    })
                  }
                  className={`text-3xl transition ${
                    formData.rating >= star
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>

              ))}

            </div>

          </div>

          {/* Review */}

          <div>

            <label className="font-semibold text-slate-700">
              Admin Review
            </label>

            <textarea
              rows={5}
              placeholder="Write your review..."
              value={formData.adminReview}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  adminReview: e.target.value,
                })
              }
              className="w-full mt-2 border rounded-xl p-4 resize-none"
            />

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Review
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}