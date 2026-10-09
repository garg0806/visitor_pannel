import express from "express";
import {
  createInterviewee,
  getInterviewees,
  getInterviewee,
  updateInterviewee,
  deleteInterviewee,
} from "../controllers/interviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public
router.post("/", upload.single("resume"), createInterviewee);

// Protected
router.get("/", authMiddleware, getInterviewees);
router.get("/:id", authMiddleware, getInterviewee);
router.put("/:id", authMiddleware, updateInterviewee);
router.delete("/:id", authMiddleware, deleteInterviewee);

export default router;