import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function VisitorChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-5">
        Visitor Analytics
      </h2>
      <ResponsiveContainer width="100%" height={350}>
    <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis allowDecimals={false} />

        <Tooltip />

        <Bar
            dataKey="visitors"
            fill="#2563eb"
            radius={[10,10,0,0]}
        />
    </BarChart>
</ResponsiveContainer>

    </div>
  );
}