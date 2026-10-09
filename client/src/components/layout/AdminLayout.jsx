import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex flex-col flex-1 min-w-0 lg:ml-72">
        {/* Fixed Header */}
        <Header />

        {/* Page Content */}
        <main
          className=" flex-1 overflow-y-auto pt-5 px-4
 pb-4
            sm:px-6
            sm:pb-6
            lg:px-8
            lg:pb-8
          "
        >
          <div className="w-full max-w-[1700px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}