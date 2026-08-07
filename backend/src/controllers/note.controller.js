import Note from "../models/note.model.js";
import Paper from "../models/paper.model.js";
import KnowledgeBlock from "../models/knowledgeblock.model.js";
import mongoose from "mongoose";




export const createNote = async (req, res) => {
  try {
    const { title, description, color, tags, linkedPaper, linkedPage } = req.body;

    // Use linkedPaper from body or route param
    const paperId = linkedPaper || req.params.paperId || null;

    const note = await Note.create({
      workspace: req.workspace._id,
      createdBy: req.user._id,
      lastEditedBy: req.user._id,
      title: title || "Untitled Note",
      description: description || "",
      color: color || "#FFFFFF",
      tags: tags || [],
      linkedPaper: paperId,
      linkedPage: linkedPage ?? null,
    });

    req.workspace.lastActivityAt = new Date();
    await req.workspace.save();

    return res.status(201).json({
      success: true,
      note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWorkspaceNotes = async (req, res) => {
    try {

        const notes = await Note.find({
            workspace: req.workspace._id,
            isArchived: false,
        })
            .sort({
                isPinned: -1,
                updatedAt: -1,
            })
            .populate("createdBy", "name username avatar")
            .populate("lastEditedBy", "name username avatar");

        return res.status(200).json({
            success: true,
            count: notes.length,
            notes,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const getNote = async (req, res) => {
    try {

        const note = req.note;

        const blocks = await KnowledgeBlock.find({
            note: note._id,
            isArchived: false,
        }).sort({
            order: 1,
        });

        return res.status(200).json({
            success: true,
            note,
            blocks,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


export const updateNote = async (req, res) => {
    try {

        const note = req.note;

        const {
            title,
            description,
            color,
            tags,
        } = req.body;

        if (title !== undefined) note.title = title;
        if (description !== undefined) note.description = description;
        if (color !== undefined) note.color = color;
        if (tags !== undefined) note.tags = tags;

        note.lastEditedBy = req.user._id;

        await note.save();

        return res.status(200).json({
            success: true,
            note,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


export const pinNote = async (req, res) => {
    try {

        const note = req.note;

        note.isPinned = !note.isPinned;

        note.lastEditedBy = req.user._id;

        await note.save();

        return res.status(200).json({
            success: true,
            note,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const archiveNote = async (req, res) => {
    try {

        const note = req.note;

        note.isArchived = true;

        note.lastEditedBy = req.user._id;

        await note.save();

        return res.status(200).json({
            success: true,
            message: "Note archived successfully.",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const deleteNote = async (req, res) => {
    try {

        const note = req.note;

        await KnowledgeBlock.deleteMany({
            note: note._id,
        });

        await note.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Note deleted successfully.",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const getOrCreateBoard = async (req, res) => {
    try {
        const { workspaceId, paperId } = req.params;

        // 1. Parameter Validation
        if (!paperId || !mongoose.Types.ObjectId.isValid(paperId)) {
            return res.status(400).json({
                success: false,
                message: "Valid paperId is required.",
            });
        }

        if (!workspaceId || !mongoose.Types.ObjectId.isValid(workspaceId)) {
            return res.status(400).json({
                success: false,
                message: "Valid workspaceId is required.",
            });
        }

        // 2. Fallback User Identification
        const userId = req.user?._id || req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User identification missing in request.",
            });
        }

        // 3. Verify Paper Exists
        const paper = await Paper.findById(paperId);
        if (!paper) {
            return res.status(404).json({
                success: false,
                message: "Paper not found.",
            });
        }

        // 4. Find existing paper board
        let board = await Note.findOne({
            workspace: workspaceId,
            linkedPaper: paperId,
            isArchived: false,
        });

        // 5. Create new board if none exists
        if (!board) {
            board = await Note.create({
                workspace: workspaceId,
                title: `${paper.title || "Paper"} - Board`,
                linkedPaper: paperId,
                createdBy: userId,
                lastEditedBy: userId,
            });
        }

        // 6. Fetch blocks attached to this board
        const blocks = await KnowledgeBlock.find({
            note: board._id,
            isArchived: false,
        }).sort({ createdAt: 1 });

        return res.status(200).json({
            success: true,
            board,
            blocks,
        });
    } catch (err) {
        // Detailed server logging to isolate the exact Mongoose/Express line failure
        console.error("--- Error in getOrCreateBoard ---");
        console.error(err);
        
        return res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error in getOrCreateBoard",
        });
    }
};

export const getPaperNotes = async (req, res) => {
    try {
        const { paperId } = req.params;

        const notes = await Note.find({
            workspace: req.workspace._id,
            linkedPaper: paperId,
            isArchived: false,
        })
            .sort({ updatedAt: -1 })
            .populate("createdBy", "name username avatar")
            .populate("lastEditedBy", "name username avatar");

        return res.status(200).json({
            success: true,
            count: notes.length,
            notes,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};