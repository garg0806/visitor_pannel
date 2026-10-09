import { useContext, useEffect, useState } from "react";
import { Users, Briefcase, Calendar, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "@/context/AdminContext";
import AdminLayout from "@/components/layout/AdminLayout";
import StatCard from "@/components/layout/StatCard";
import InterviewStatusChart from "@/pages/Dashboard/InterviewStatusChart";
import UpcomingInterviews from "@/pages/Dashboard/UpcomingInterviews";
import VisitorChart from "@/pages/Dashboard/VisitorChart";
import RecentVisitors from "@/pages/Dashboard/RecentVisitors";

import { getDashboard } from "@/services/dashboardService";

export default function Dashboard() {
  const { token, admin } = useContext(AdminContext);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchDashboard();
    }
  }, [token]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await getDashboard(token);
      setDashboard(res.data);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !dashboard) {
    return (
      <AdminLayout>
        {/* Loading Skeleton */}
        <div className="space-y-6 animate-pulse">
          <div className="h-12 w-64 bg-slate-200 rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded-2xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-80 bg-slate-200 rounded-2xl" />
            <div className="h-80 bg-slate-200 rounded-2xl" />
          </div>
        </div>
      </AdminLayout>

      
    );
  }

  return (
    <AdminLayout>
      {/* Welcome Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Welcome, {admin?.username || "Admin"} 👋
        </h1>
        <p className="text-slate-500 mt-1 text-sm md:text-base">
          Company Visitor & Interview Management Dashboard
        </p>
      </div>

      

      {/* Stat Cards Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <div className="min-w-0">
          <StatCard
            title="Total Visitors"
            value={dashboard.totalVisitors ?? 0}
            icon={<Users size={26} />}
            color="blue"
            change="+12%"
            onClick={() => navigate("/admin/visitors")}
          />
        </div>

        <div className="min-w-0">
          <StatCard
            title="Interviewees"
            value={dashboard.totalInterviewees ?? 0}
            icon={<Briefcase size={26} />}
            color="green"
            change="+5%"
            onClick={() => navigate("/admin/interviewees")}
          />
        </div>

        <div className="min-w-0">
          <StatCard
            title="Today's Visitors"
            value={dashboard.todayVisitors ?? 0}
            icon={<Calendar size={26} />}
            color="orange"
            change="+8%"
            onClick={() => navigate("/admin/visitors")}
          />
        </div>

        <div className="min-w-0">
          <StatCard
            title="Today's Interviews"
            value={dashboard.todayInterviewees ?? 0}
            icon={<UserCheck size={26} />}
            color="purple"
            change="+2%"
            onClick={() => navigate("/admin/interviewees")}
          />
        </div>
      </div>

      {/* Charts & Analytics Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 md:mt-8">
        <div className="lg:col-span-2 min-w-0">
          <VisitorChart data={dashboard.visitorChart || []} />
        </div>

        <div className="min-w-0">
          <RecentVisitors visitors={dashboard.recentVisitors || []} />
        </div>
      </div>

      {/* Charts & Analytics Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 min-w-0">
          <InterviewStatusChart data={dashboard.interviewStatus || []} />
        </div>

        <div className="min-w-0">
          <UpcomingInterviews interviews={dashboard.upcomingInterviews || []} />
        </div>
      </div>
    </AdminLayout>
  );
}