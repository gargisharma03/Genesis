import KnowledgeBlock from "../models/knowledgeBlock.model.js";

/* =====================================================
   Create Block
===================================================== */
export const createBlock = async (req, res) => {
  try {
    const {
      type,
      title,
      content,
      position,
      size,
      style,
      linkedPaper,
      linkedPage,
      linkedAnnotation,
      linkedCitation,
      linkedAnalysis,
      tags,
    } = req.body;

    // Resolve workspace ID safely from note or middleware parameter
    const workspaceId =
      req.workspace?._id ||
      req.note?.workspace ||
      req.params.workspaceId;

    if (!workspaceId) {
      return res.status(400).json({
        success: false,
        message: "Workspace context is required to create a block.",
      });
    }

    // Normalize type string against enum
    let normalizedType = type || "paragraph";
    if (normalizedType === "text") {
      normalizedType = "paragraph";
    }

    // Safely structure content if passed as plain object or string
    let formattedContent = content;
    if (typeof content === "string") {
      formattedContent = { text: content };
    } else if (!content) {
      formattedContent = { text: "" };
    }

    const block = await KnowledgeBlock.create({
      note: req.note._id,
      workspace: workspaceId,

      createdBy: req.user._id,
      lastEditedBy: req.user._id,

      type: normalizedType,
      title: title || "",
      content: formattedContent,

      position: position || { x: 0, y: 0, z: 0 },
      size: size || { width: 200, height: 150 },
      style: style || {},

      linkedPaper: linkedPaper || null,
      linkedPage: linkedPage || null,
      linkedAnnotation: linkedAnnotation || null,
      linkedCitation: linkedCitation || null,
      linkedAnalysis: linkedAnalysis || null,

      tags: tags || [],
    });

    return res.status(201).json({
      success: true,
      block,
    });
  } catch (error) {
    console.error("Error creating block:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   Get All Blocks
===================================================== */
export const getBlocks = async (req, res) => {
  try {
    const blocks = await KnowledgeBlock.find({
      note: req.note._id,
      isArchived: false,
    })
      .populate("createdBy", "name username")
      .populate("linkedPaper", "title")
      .sort({
        "position.z": 1,
        createdAt: 1,
      });

    return res.status(200).json({
      success: true,
      count: blocks.length,
      blocks,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   Update Block
===================================================== */
export const updateBlock = async (req, res) => {
  try {
    const block = req.block;

    const {
      title,
      content,
      style,
      tags,
      linkedPaper,
      linkedAnnotation,
      linkedCitation,
      linkedAnalysis,
    } = req.body;

    if (title !== undefined) block.title = title;
    if (content !== undefined) block.content = content;
    if (style !== undefined) block.style = style;
    if (tags !== undefined) block.tags = tags;

    if (linkedPaper !== undefined) block.linkedPaper = linkedPaper;
    if (linkedAnnotation !== undefined) block.linkedAnnotation = linkedAnnotation;
    if (linkedCitation !== undefined) block.linkedCitation = linkedCitation;
    if (linkedAnalysis !== undefined) block.linkedAnalysis = linkedAnalysis;

    block.lastEditedBy = req.user._id;

    await block.save();

    return res.status(200).json({
      success: true,
      block,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   Move / Resize Block
===================================================== */
export const moveBlock = async (req, res) => {
  try {
    const block = req.block;

    const { position, size } = req.body;

    if (position) block.position = position;
    if (size) block.size = size;

    block.lastEditedBy = req.user._id;

    await block.save();

    return res.status(200).json({
      success: true,
      block,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   Delete Block
===================================================== */
export const deleteBlock = async (req, res) => {
  try {
    await req.block.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Block deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   Batch Move/Update Blocks
===================================================== */
export const batchUpdateBlocks = async (req, res) => {
  try {
    const { updates } = req.body;

    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Updates array is required.",
      });
    }

    const bulkOps = updates.map((item) => ({
      updateOne: {
        filter: { _id: item._id, note: req.note._id },
        update: {
          $set: {
            ...(item.position && { position: item.position }),
            ...(item.size && { size: item.size }),
            ...(item.style && { style: item.style }),
            lastEditedBy: req.user._id,
          },
        },
      },
    }));

    await KnowledgeBlock.bulkWrite(bulkOps);

    return res.status(200).json({
      success: true,
      message: "Blocks updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   Duplicate / Clone Block
===================================================== */
export const duplicateBlock = async (req, res) => {
  try {
    const originalBlock = req.block;

    const newBlock = await KnowledgeBlock.create({
      ...originalBlock.toObject(),
      _id: undefined,
      createdBy: req.user._id,
      lastEditedBy: req.user._id,
      position: {
        x: originalBlock.position.x + 20,
        y: originalBlock.position.y + 20,
        z: (originalBlock.position?.z || 0) + 1,
      },
      createdAt: undefined,
      updatedAt: undefined,
    });

    return res.status(201).json({
      success: true,
      block: newBlock,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};