import { X } from "lucide-react";

export default function InterviewModal({ interview, onClose }) {
  if (!interview) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl">

        <div className="flex justify-between items-center border-b p-6">

          <h2 className="text-2xl font-bold">
            Interview Details
          </h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6 p-6">

          <Info label="Full Name" value={interview.fullName} />
          <Info label="Email" value={interview.email} />
          <Info label="Phone" value={interview.phone} />
          <Info label="Gender" value={interview.gender} />
          <Info label="Qualification" value={interview.qualification} />
          <Info label="Experience" value={interview.experience} />
          <Info label="Applying For" value={interview.applyingFor} />
          <Info label="Interviewer" value={interview.interviewer} />
          <Info
            label="Interview Date"
            value={
              interview.interviewDate
                ? new Date(interview.interviewDate).toLocaleDateString()
                : "-"
            }
          />
          <Info label="Interview Time" value={interview.interviewTime} />
          <Info label="Status" value={interview.status} />

          <div className="col-span-2">
            <p className="text-sm text-slate-500">Remarks</p>
            <div className="mt-2 border rounded-xl p-3 bg-slate-50">
              {interview.remarks || "-"}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <h3 className="font-semibold mt-1">{value || "-"}</h3>
    </div>
  );
}