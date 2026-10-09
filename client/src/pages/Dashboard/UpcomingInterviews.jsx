
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function UpcomingInterviews({ interviews = [] }) {
  const ITEMS_PER_PAGE = 2;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(interviews.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentInterviews = interviews.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  // const formateDate =(dateString)=>{
  //   const date =new Date(dateString);
  //   const options ={dateStlye:"medium",timsStyle:"short"}
  //   return date.toLocaleDateString(undefined,options)

  // }

  // Reset to first page whenever interview list changes
  useEffect(() => {
    setCurrentPage(1);
  }, [interviews]);


  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 h-full min-w-0">
      <div className="flex items-center justify-between gap-2 mb-5">
        <h2 className="text-xl font-bold text-slate-800 truncate">
          Upcoming Interviews
        </h2>

        {interviews.length > 0 && (
          <span className="text-sm text-slate-500 shrink-0">
            {interviews.length} Interview
            {interviews.length > 1 ? "s" : ""}

            
          </span>
        )}
      </div>

      {interviews.length === 0 ? (
        <div className="text-center text-slate-400 py-10">
          No upcoming interviews
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {currentInterviews.map((item) => (
              <div
                key={item._id}
                className="border rounded-xl p-4 hover:bg-slate-50 transition duration-300 min-w-0"
              >
                <div className="flex items-center gap-2 font-semibold text-slate-800 min-w-0">
                  <User size={18} className="shrink-0" />
                  <span className="truncate">{item.fullName}</span>
                </div>

                <p className="text-sm text-slate-500 mt-1 truncate">
                  {item.applyingFor}
                </p>

                <div className="flex items-center justify-between mt-3 text-sm text-slate-500 gap-2">
                  <span className="flex items-center gap-1 min-w-0">
                    <Calendar size={15} className="shrink-0" />
                    <span className="truncate">{item.interviewDate}</span>
                  </span>
                </div>
                
                

                <div className="mt-3">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
              {/* Previous */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-2 flex-wrap justify-center overflow-x-auto max-w-full">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-9 h-9 shrink-0 rounded-lg text-sm font-medium transition ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}