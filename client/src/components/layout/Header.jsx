
import { useContext } from "react";
import { AdminContext } from "@/context/AdminContext";

export default function Header() {
  const { admin } = useContext(AdminContext);

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-16 md:h-20">

        {/* Left */}
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-xs md:text-sm text-slate-500">
            Welcome back, {admin?.username || "Admin"}
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 md:gap-5">

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            {admin?.username?.charAt(0).toUpperCase() || "A"}
          </div>

          {/* Hide text on very small screens */}
          <div className="hidden sm:block">
            <p className="font-semibold text-slate-800">
              {admin?.username || "Admin"}
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>

        </div>
      </div>
    </header>
  );
}