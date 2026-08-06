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

    description:{
        type:String,
        default:"",
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

    linkedPage: {
      type: Number,
      default: null,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    isPinned: {
      type: Boolean,
      default: false,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", noteSchema);