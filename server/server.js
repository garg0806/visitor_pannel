
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

// Allowed frontend origins
const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

const allowedOrigins = new Set([
  FRONTEND_URL.replace(/\/$/, ""),
  "https://visitor-pannel.vercel.app",
  "http://localhost:5173",
]);

const app = express();

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without Origin, e.g. server health checks
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.has(normalizedOrigin)) {
        return callback(null, true);
      }

      console.warn(`CORS blocked origin: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON request bodies
app.use(express.json());

// Uploads directory
const uploadsDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static(uploadsDir));

// API routes
console.log("Loading API routes...");

app.use("/api/visitors", visitorRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);

console.log("Visitor, Interview, Dashboard and Auth routes loaded");

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Company Portal API Running",
  });
});

// Health-check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "OK",
  });
});

// Start server after connecting to MongoDB
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Allowed frontend origins: ${[
        ...allowedOrigins,
      ].join(", ")}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

start();
