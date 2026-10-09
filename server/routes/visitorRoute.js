



import express from "express";
import {
  createVisitor,
  getVisitors,
  getVisitor,
  updateVisitor,
  deleteVisitor,
  addVisitorReview
} from "../controllers/visitorController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

// Public (Visitor fills the form)
router.post("/", createVisitor);

// Protected (Admin only)
router.get("/", authMiddleware, getVisitors);
router.get("/:id", authMiddleware, getVisitor);
router.put("/:id", authMiddleware, updateVisitor);
router.delete("/:id", authMiddleware, deleteVisitor);
router.put(
  "/:id/review",
  authMiddleware,
  addVisitorReview
);

export default router;