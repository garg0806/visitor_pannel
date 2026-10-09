import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  LogOut,
  Building2,
  Menu,
  X,
} from "lucide-react";
import { useContext, useState } from "react";
import { AdminContext } from "@/context/AdminContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout, admin } = useContext(AdminContext);

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      name: "Visitors",
      icon: Users,
      path: "/admin/visitors",
    },
    {
      name: "Interviewees",
      icon: Briefcase,
      path: "/admin/interviewees",
    },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center justify-between px-4 shadow-lg z-50">
        <div className="flex items-center gap-2">
          <Building2 className="text-blue-400" size={28} />
          <span className="font-bold text-lg">Sheopal's</span>
        </div>

        <button onClick={() => setIsOpen(true)}>
          <Menu size={30} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:fixed
        top-0 left-0
        h-screen
        w-72
        bg-slate-900
        text-white
        flex flex-col
        z-50
        transform
        transition-transform
        duration-300
        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        {/* Mobile Close */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={30} />
          </button>
        </div>

        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-slate-700">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-blue-400" />

            <div>
              <h2 className="font-bold text-lg">Sheopal's</h2>

              <p className="text-xs text-slate-400">
                Visitor Management
              </p>
            </div>
          </div>
        </div>

        {/* Admin */}
        <div className="py-5 px-6 border-b border-slate-700">
          <p className="text-sm text-slate-400">
            Logged in as
          </p>

          <h3 className="font-semibold text-lg mt-2">
            {admin?.username || "Admin"}
          </h3>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <item.icon size={24} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 py-3 rounded-lg transition"
          >
            <LogOut size={22} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}