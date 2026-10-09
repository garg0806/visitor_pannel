
import { motion } from "framer-motion";
import {
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function StatCard({
  title,
  value,
  icon,
  color,
  change,
  subtitle = "Compared to yesterday",
  onClick,
}) {
  const styles = {
    blue: {
      bg: "from-blue-500 to-blue-600",
      light: "bg-blue-100",
      text: "text-blue-600",
    },
    green: {
      bg: "from-green-500 to-green-600",
      light: "bg-green-100",
      text: "text-green-600",
    },
    orange: {
      bg: "from-orange-500 to-orange-600",
      light: "bg-orange-100",
      text: "text-orange-600",
    },
    purple: {
      bg: "from-purple-500 to-purple-600",
      light: "bg-purple-100",
      text: "text-purple-600",
    },
  };

  const current = styles[color] || styles.blue;

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 cursor-pointer hover:shadow-2xl transition-all duration-300"
    >
      {/* Top */}
      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-4 text-slate-800">
            {value}
          </h2>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl ${current.light} flex items-center justify-center ${current.text}`}
        >
          {icon}
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div
            className={`w-7 h-7 rounded-full bg-gradient-to-r ${current.bg} flex items-center justify-center`}
          >
            <TrendingUp
              className="text-white"
              size={15}
            />
          </div>

          <span className={`font-semibold ${current.text}`}>
            {change}
          </span>

          <span className="text-slate-400 text-sm">
            {subtitle}
          </span>

        </div>

        <div className="flex items-center gap-1 text-blue-600 font-medium text-sm">
          View
          <ArrowRight size={16} />
        </div>

      </div>

    </motion.div>
  );
}