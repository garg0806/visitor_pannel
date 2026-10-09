import { X } from "lucide-react";

export default function VisitorModal({ visitor, onClose }) {
  if (!visitor) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      {/* Modal */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold">
            Visitor Details
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto p-4 md:p-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">

            <Info label="First Name" value={visitor.firstName} />
            <Info label="Last Name" value={visitor.lastName} />

            <Info label="Phone" value={visitor.phone} />
            <Info label="Email" value={visitor.email} />

            <Info label="Company" value={visitor.company} />
            <Info label="Purpose" value={visitor.purpose} />

            <Info
              label="Person Visited"
              value={visitor.personVisited}
            />

            <Info label="Address" value={visitor.address} />

            <Info label="City" value={visitor.city} />
            <Info label="State" value={visitor.state} />

          </div>
        </div>

      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <h3 className="mt-1 text-base md:text-lg font-semibold break-words text-slate-800">
        {value || "-"}
      </h3>
    </div>
  );
}