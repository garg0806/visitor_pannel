import { useContext, useEffect, useState } from "react";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Star,
  FileSpreadsheet,
} from "lucide-react";

import { exportExcel } from "@/utils/exportUtils";

import AdminLayout from "@/components/layout/AdminLayout";
import { AdminContext } from "@/context/AdminContext";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";

import ReviewVisitorModal from "@/components/modals/ReviewModal";
import VisitorModal from "@/components/modals/VisitorModal";
import EditVisitorModal from "@/components/modals/EditVisitorModal";

import {
  getVisitors,
  deleteVisitor,
  updateVisitor,
  addVisitorReview,
} from "@/services/visitorService";

const PAGE_SIZE_OPTIONS = [5, 25, 50, 100];

export default function Visitors() {
  const { token } = useContext(AdminContext);

  const [loading, setLoading] = useState(true);
  const [visitors, setVisitors] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [editVisitor, setEditVisitor] = useState(null);
  const [reviewVisitor, setReviewVisitor] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedVisitorId, setSelectedVisitorId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(PAGE_SIZE_OPTIONS[0]);

  useEffect(() => {
    if (token) {
      loadVisitors();
    }
  }, [token]);

  const loadVisitors = async () => {
    try {
      setLoading(true);
      const res = await getVisitors(token);
      setVisitors(res.visitors || []);
    } catch (err) {
      console.error(err);
      setVisitors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedVisitorId(id);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteVisitor(selectedVisitorId, token);
      await loadVisitors();
      setDeleteModal(false);
      setSelectedVisitorId(null);
      alert("Visitor deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateVisitor(data._id, data, token);
      setEditVisitor(null);
      loadVisitors();
      alert("Visitor updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  const handleReview = async (data) => {
    try {
      await addVisitorReview(
        data._id,
        {
          visitStatus: data.visitStatus,
          rating: data.rating,
          adminReview: data.adminReview,
        },
        token
      );
      await loadVisitors();
      setReviewVisitor(null);
      alert("Review Saved Successfully");
    } catch (err) {
      console.error("Review Error:", err);
      alert(err.response?.data?.message || err.message);
    }
  };

  const filteredVisitors = visitors.filter((visitor) => {
    const query = search.toLowerCase();
    return (
      `${visitor.firstName} ${visitor.lastName}`
        .toLowerCase()
        .includes(query) ||
      visitor.phone?.includes(search) ||
      visitor.company?.toLowerCase().includes(query) ||
      visitor.purpose?.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, itemsPerPage]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredVisitors.length / itemsPerPage)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginatedVisitors = filteredVisitors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h2 className="text-lg md:text-xl font-semibold text-slate-500 animate-pulse">
            Loading Visitors...
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
            Visitors
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manage all registered visitors
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
              placeholder="Search visitors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-300 bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Export Excel Button */}
          <button
            onClick={() => exportExcel(visitors, "Visitors")}
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
            Visitor List
          </h2>
        </div>

        {/* ================= Mobile Card View (< md) ================= */}
        <div className="block md:hidden divide-y divide-slate-100">
          {paginatedVisitors.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              No Visitors Found
            </div>
          ) : (
            paginatedVisitors.map((visitor) => (
              <div key={visitor._id} className="p-4 space-y-3 bg-white">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">
                      {visitor.firstName} {visitor.lastName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {visitor.phone || "—"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-slate-400 block">Company</span>
                    <span className="font-medium text-slate-700">
                      {visitor.company || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Purpose</span>
                    <span className="font-medium text-slate-700">
                      {visitor.purpose || "—"}
                    </span>
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedVisitor(visitor)}
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    title="View Visitor"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => setEditVisitor(visitor)}
                    className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
                    title="Edit Visitor"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => setReviewVisitor(visitor)}
                    className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition"
                    title="Review Visitor"
                  >
                    <Star size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(visitor._id)}
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                    title="Delete Visitor"
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
                <th className="px-5 py-3.5">Name</th>
                <th className="px-4 py-3.5">Phone</th>
                <th className="px-4 py-3.5">Purpose</th>
                <th className="px-4 py-3.5">Company</th>
                <th className="px-5 py-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {paginatedVisitors.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-slate-500">
                    No Visitors Found
                  </td>
                </tr>
              ) : (
                paginatedVisitors.map((visitor) => (
                  <tr
                    key={visitor._id}
                    className="hover:bg-slate-50/80 transition"
                  >
                    <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">
                      {visitor.firstName} {visitor.lastName}
                    </td>
                    <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                      {visitor.phone || "—"}
                    </td>
                    <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                      {visitor.purpose || "—"}
                    </td>
                    <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                      {visitor.company || "—"}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex justify-center items-center gap-1">
                        <button
                          onClick={() => setSelectedVisitor(visitor)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => setEditVisitor(visitor)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => setReviewVisitor(visitor)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-500 hover:bg-amber-50 transition"
                          title="Review"
                        >
                          <Star size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(visitor._id)}
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
        {filteredVisitors.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-3.5 border-t border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>
                Showing {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredVisitors.length
                )}{" "}
                of {filteredVisitors.length}
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
      <VisitorModal
        visitor={selectedVisitor}
        onClose={() => setSelectedVisitor(null)}
      />

      <EditVisitorModal
        visitor={editVisitor}
        onClose={() => setEditVisitor(null)}
        onSave={handleUpdate}
      />

      <ReviewVisitorModal
        visitor={reviewVisitor}
        onClose={() => setReviewVisitor(null)}
        onSave={handleReview}
      />

      <DeleteConfirmModal
        open={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setSelectedVisitorId(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Visitor"
        message="This visitor will be permanently deleted. This action cannot be undone."
      />
    </AdminLayout>
  );
}