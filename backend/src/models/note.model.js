import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastEditedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      default: "Untitled Note",
    },
    description: {
      type: String,
      default: "",
    },
    linkedPaper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paper",
      default: null,
    },
    linkedPage: {
      type: Number,
      default: null,
    },
    color: {
      type: String,
      default: "#FFFFFF",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

// Compound index for rendering workspace dashboard fast
noteSchema.index({ workspace: 1, isArchived: 1, updatedAt: -1 });

export default mongoose.models.Note || mongoose.model("Note", noteSchema);