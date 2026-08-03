import mongoose from "mongoose";
import Paper from "../models/paper.model.js";

const paperMiddleware = async (req, res, next) => {
  try {
    const { paperId } = req.params;

    // Validate MongoDB ObjectId format before querying
    if (!mongoose.Types.ObjectId.isValid(paperId)) {
      return res.status(400).json({
        message: "Invalid paper ID format.",
      });
    }

    // Ensure prerequisite middleware (workspace) ran properly
    if (!req.workspace?._id) {
      return res.status(500).json({
        message: "Workspace context missing. Ensure workspaceMiddleware runs prior to paperMiddleware.",
      });
    }

    const paper = await Paper.findById(paperId);

    if (!paper) {
      return res.status(404).json({
        message: "Paper not found.",
      });
    }

    // Ensure paper belongs to the current workspace
    if (!paper.workspace.equals(req.workspace._id)) {
      return res.status(403).json({
        message: "This paper does not belong to the current workspace.",
      });
    }

    req.paper = paper;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Failed to verify paper access.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export default paperMiddleware;