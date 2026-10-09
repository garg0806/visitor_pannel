import { useContext, useEffect, useState } from "react";
import { Search, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, FileSpreadsheet, FileText } from "lucide-react";
import { toast } from "react-toastify";

import AdminLayout from "@/components/layout/AdminLayout";
import { AdminContext } from "@/context/AdminContext";

import InterviewModal from "@/components/modals/InterviewModal";
import EditInterviewModal from "@/components/modals/EditInterviewModal";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";
import {
  getInterviews,
  updateInterview,
  deleteInterview,
} from "@/services/interviewService";

import { exportExcel } from "@/utils/exportUtils";

const PAGE_SIZE_OPTIONS = [5, 25, 50, 100];

export default function Interviewees() {
  const { token } = useContext(AdminContext);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [interviewees, setInterviewees] = useState([]);

  const [selectedInterview, setSelectedInterview] = useState(null);
  const [editInterview, setEditInterview] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(PAGE_SIZE_OPTIONS[0]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (token) {
      loadInterviewees();
    }
  }, [token]);

  const loadInterviewees = async () => {
    try {
      setLoading(true);
      const res = await getInterviews(token);
      setInterviewees(res.interviewees || []);
    } catch (err) {
      console.error(err);
      setInterviewees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteInterview(selectedId);
      loadInterviewees();
      toast.success("Interviewee deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete interviewee.");
    } finally {
      setDeleteModal(false);
      setSelectedId(null);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateInterview(data._id, data, token);
      setEditInterview(null);
      loadInterviewees();
      toast.success("Interview updated successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Update failed.");
    }
  };

  const filteredInterviewees = interviewees.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.fullName?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query) ||
      item.phone?.includes(search) ||
      item.applyingFor?.toLowerCase().includes(query) ||
      item.interviewer?.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, itemsPerPage]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInterviewees.length / itemsPerPage)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginatedInterviewees = filteredInterviewees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-700";
      case "Confirmed":
        return "bg-cyan-100 text-cyan-700";
      case "Checked In":
        return "bg-indigo-100 text-indigo-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Selected":
        return "bg-emerald-100 text-emerald-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "On Hold":
        return "bg-orange-100 text-orange-700";
      case "Shortlisted":
        return "bg-purple-100 text-purple-700";
      case "Waiting List":
        return "bg-pink-100 text-pink-700";
      case "Offer Released":
        return "bg-lime-100 text-lime-700";
      case "Offer Accepted":
        return "bg-green-200 text-green-800";
      case "Offer Rejected":
        return "bg-red-200 text-red-800";
      case "No Show":
        return "bg-gray-200 text-gray-700";
      case "Cancelled":
        return "bg-slate-200 text-slate-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h2 className="text-lg md:text-xl font-semibold text-slate-500 animate-pulse">
            Loading Interviewees...
          </h2>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header Container */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Interviewees
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manage and track all interview candidates
          </p>
        </div>

        {/* Header Actions: Search + Export */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64 md:w-80">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search interviewee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-300 bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Export Excel Button */}
          <button
            onClick={() => exportExcel(interviewees, "Interviewees")}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition shadow-sm active:scale-95"
          >
            <FileSpreadsheet size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50">
          <h2 className="text-base md:text-lg font-semibold text-slate-800">
            Interviewee List
          </h2>
        </div>

        {/* ================= Mobile Card View (< md) ================= */}
        <div className="block md:hidden divide-y divide-slate-100">
          {paginatedInterviewees.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              No Interviewees Found
            </div>
          ) : (
            paginatedInterviewees.map((item) => (
              <div key={item._id} className="p-4 space-y-3 bg-white">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">
                      {item.fullName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{item.email}</p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-slate-400 block">Phone</span>
                    <span className="font-medium text-slate-700">{item.phone || "—"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Role</span>
                    <span className="font-medium text-slate-700">
                      {item.applyingFor || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Interviewer</span>
                    <span className="font-medium text-slate-700">
                      {item.interviewer || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Resume</span>
                    {item.resume ? (
                      <a
                        href={`http://localhost:5000${item.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <FileText size={12} /> View File
                      </a>
                    ) : (
                      <span className="text-slate-400">None</span>
                    )}
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedInterview(item)}
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => setEditInterview(item)}
                    className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
                    title="Edit Interviewee"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item._id)}
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                    title="Delete Interviewee"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ================= Desktop Table View (>= md) ================= */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <tr>
                <th className="px-5 py-3.5">Full Name</th>
                <th className="px-4 py-3.5">Email</th>
                <th className="px-4 py-3.5">Phone</th>
                <th className="px-4 py-3.5">Applying For</th>
                <th className="px-4 py-3.5">Interviewer</th>
                <th className="px-4 py-3.5">Resume</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {paginatedInterviewees.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-10 text-center text-slate-500">
                    No Interviewees Found
                  </td>
                </tr>
              ) : (
                paginatedInterviewees.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">
                      {item.fullName}
                    </td>
                    <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                      {item.email}
                    </td>
                    <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                      {item.phone}
                    </td>
                    <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                      {item.applyingFor}
                    </td>
                    <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                      {item.interviewer}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {item.resume ? (
                        <a
                          href={`http://localhost:5000${item.resume}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium text-xs transition"
                        >
                          <FileText size={14} />
                          <span>View</span>
                        </a>
                      ) : (
                        <span className="text-slate-400 text-xs">No Resume</span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex justify-center items-center gap-1">
                        <button
                          onClick={() => setSelectedInterview(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => setEditInterview(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item._id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= Pagination Controls ================= */}
        {filteredInterviewees.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-3.5 border-t border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>
                Showing {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, filteredInterviewees.length)}{" "}
                of {filteredInterviewees.length}
              </span>

              <div className="flex items-center gap-1.5">
                <span>Rows:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="border border-slate-300 bg-white rounded-md px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md border border-slate-300 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition text-xs"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`min-w-[28px] h-7 px-1.5 rounded-md text-xs font-semibold transition ${
                    page === currentPage
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100 border border-slate-300 bg-white"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-md border border-slate-300 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition text-xs"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <InterviewModal
        interview={selectedInterview}
        onClose={() => setSelectedInterview(null)}
      />

      <EditInterviewModal
        interview={editInterview}
        onClose={() => setEditInterview(null)}
        onSave={handleUpdate}
      />

      <DeleteConfirmModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Interviewee"
        message="This interviewee will be permanently deleted. This action cannot be undone."
      />
    </AdminLayout>
  );
}