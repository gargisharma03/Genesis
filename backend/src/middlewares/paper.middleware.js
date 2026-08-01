import Paper from "../models/paper.model.js";

const paperMiddleware = async (req, res, next) => {
  try {
    const { paperId } = req.params;

    const paper = await Paper.findById(paperId);

    if (!paper) {
      return res.status(404).json({
        message: "Paper not found.",
      });
    }

    // Ensure paper belongs to current workspace
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
    });
  }
};

