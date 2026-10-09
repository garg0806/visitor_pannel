import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function RecentVisitors({ visitors = [] }) {
  const ITEMS_PER_PAGE = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(visitors.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentVisitors = visitors.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [visitors]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-slate-800">
          Recent Visitors
        </h2>

        {visitors.length > 0 && (
          <span className="text-sm text-slate-500">
            {visitors.length} Visitor
            {visitors.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {visitors.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          No visitors found
        </div>
      ) : (
        <>
          <div className="space-y-1">
            {currentVisitors.map((v) => (
              <div
                key={v._id}
                className="flex justify-between items-center border-b py-4 hover:bg-slate-50 rounded-lg px-2 transition"
              >
                <div>
                  <p className="font-semibold text-slate-800">
                    {v.firstName} {v.lastName}
                    {/* {v.firstNmame} {v.lastName} */}
                  </p>

                  <p className="text-sm text-slate-500">
                    {v.company || "No Company"}
                    {/* {v.position && "${v.postion}"} */}
                  </p>
                </div>

                <span className="text-sm text-slate-400">
                  {new Date(v.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  
                </span>
                {/* <span className="text-sm text-2xl lg:text-2xl md:text-lg">
                  {new Date(v.createdAt).toLocaleDateString([],{
                    dateStyle: "medium"
                  })}
                </span> */}

              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-5 pt-4 border-t">
              {/* Previous */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                  // setCurrentPage((prev)=> Math.max(prev-1,1))
                }
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-slate-100 disabled:opacity-50"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 hover:bg-slate-200"
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
                className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-slate-100 disabled:opacity-50"
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