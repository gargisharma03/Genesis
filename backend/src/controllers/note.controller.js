import Note from "../models/note.model.js";
import KnowledgeBlock from "../models/knowledgeblock.model.js";




export const createNote = async (req, res) => {
    try {
        const workspace = req.workspace;

        const {
            title,
            description,
            color,
            tags,
            linkedPaper,
            linkedPage,
        } = req.body;

        const note = await Note.create({
            workspace: req.workspace._id,
            createdBy: req.user._id,
            lastEditedBy: req.user._id,

            title: title || "Untitled Note",
            description: description || "",
            color: color || "#FFFFFF",
            tags: tags || [],

            linkedPaper: linkedPaper || null,
            linkedPage: linkedPage ?? null,
        });
        workspace.lastActivityAt = new Date();
        await workspace.save();

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