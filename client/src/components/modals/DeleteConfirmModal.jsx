import { Trash2, X } from "lucide-react";

export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Delete Item",
  message = "This item will be permanently deleted. This action cannot be undone.",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Trash2 className="text-red-600" size={30} />
          </div>

          <h3 className="text-lg font-semibold text-slate-800">
            Are you sure?
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {message}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-300 py-3 font-medium hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 rounded-xl bg-red-600 py-3 font-medium text-white hover:bg-red-700 transition"
            >
              Delete
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}