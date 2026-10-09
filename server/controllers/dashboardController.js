import Visitor from "../models/Visitor.js";
import Interviewee from "../models/Interviewee.js";

export const getDashboardData = async (req, res) => {
  try {
    // Today's Date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Dashboard Counts
    const totalVisitors = await Visitor.countDocuments();
    const totalInterviewees = await Interviewee.countDocuments();
   

    const todayVisitors = await Visitor.countDocuments({
      createdAt: { $gte: today },
      
    });

    const todayInterviewees = await Interviewee.countDocuments({
      createdAt: { $gte: today },
      
    });

    // Recent Visitors
    const recentVisitors = await Visitor.find()
      .sort({ createdAt: -1 })
      .limit(5);


 

      const upcomingInterviews = await Interviewee.find()
  .sort({ interviewDate: 1, interviewTime: 1 })
  .limit(5);

    // ============================
    // Visitor Analytics (Bar Chart)
    // ============================

    const visitorChart = await Visitor.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
          },
          visitors: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const chartData = monthNames.map((month) => ({
      month,
      visitors: 0,
    }));

    visitorChart.forEach((item) => {
      chartData[item._id.month - 1].visitors = item.visitors;
      
    });

    // ============================
    // Interview Status (Pie Chart)
    // ============================

    const interviewStatus = await Interviewee.aggregate([
      {
        $group: {
          _id: "$status",
          value: { $sum: 1 },
        },
      },
    ]);

    const statusData = interviewStatus.map((item) => ({
      name: item._id,
      value: item.value,
    }));

    // ============================
    // Response
    // ============================

    res.status(200).json({
      success: true,
      data: {
        totalVisitors,
        totalInterviewees,
        todayVisitors,
        todayInterviewees,
        
        recentVisitors,
        upcomingInterviews,
        

        visitorChart: chartData,

        interviewStatus: statusData,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};