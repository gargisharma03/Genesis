import mongoose from "mongoose";
import KnowledgeBlock from "../models/knowledgeBlock.model.js";

const knowledgeBlockMiddleware = async (req, res, next) => {
  try {
    const { blockId } = req.params;

    // 1. Validate ObjectId format to avoid CastError 500s
    if (!blockId || !mongoose.Types.ObjectId.isValid(blockId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing block ID.",
      });
    }

    // 2. Ensure upstream workspace middleware populates req.workspace
    if (!req.workspace?._id) {
      return res.status(500).json({
        success: false,
        message: "Workspace context missing in request pipeline.",
      });
    }

    // 3. Find Knowledge Block
    const block = await KnowledgeBlock.findById(blockId);

    if (!block) {
      return res.status(404).json({
        success: false,
        message: "Knowledge block not found.",
      });
    }

    // 4. Verify workspace ownership safely
    if (block.workspace.toString() !== req.workspace._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Block does not belong to this workspace.",
      });
    }

    // 5. Verify note ownership (if note middleware exists in stack)
    if (req.note?._id && block.note.toString() !== req.note._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Block does not belong to this note.",
      });
    }

    req.block = block;
    next();
  } catch (error) {
    console.error("Error in knowledgeBlockMiddleware:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error in block middleware.",
    });
  }
};

export default knowledgeBlockMiddleware;