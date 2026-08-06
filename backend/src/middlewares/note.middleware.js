import mongoose from "mongoose";
import Note from "../models/note.model.js";

export const noteMiddleware = async (req, res, next) => {
    try {

        const { noteId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid note id",
            });
        }

        const note = await Note.findById(noteId);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }

        req.note = note;

        next();

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export default noteMiddleware;