import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import visitorRoutes from "./routes/visitorRoute.js";
import interviewRoutes from "./routes/interviewRoute.js";
import dashboardRoutes from "./routes/dashboardRoute.js";
import authRoutes from "./routes/authRoute.js";
import path from "path";
import fs from "fs";



dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const app = express();

app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use(
  "/uploads",
  express.static(uploadsDir)
);
console.log("Visitor Routes Loaded");
app.use("/api/visitors", visitorRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Company Portal API Running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "OK" });
});

const PORT = process.env.PORT || 5000;

// Connect DB first, then listen (fails fast on bad MONGODB_URI)
const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server Running On ${PORT}`);
  });
};

start();


