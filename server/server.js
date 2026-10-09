import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import visitorRoutes from "./routes/visitorRoute.js";
import interviewRoutes from "./routes/interviewRoute.js";
import dashboardRoutes from "./routes/dashboardRoute.js";
import authRoutes from "./routes/authRoute.js";
import path from "path";



dotenv.config();

connectDB();



const app = express();

app.use(cors());

app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});

