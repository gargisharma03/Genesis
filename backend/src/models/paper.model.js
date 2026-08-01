import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, "Paper title is required"],
      trim: true,
      maxlength: 500,
    },

    authors: [
      {
        type: String,
        trim: true,
      },
    ],

    abstract: {
      type: String,
      default: "",
      trim: true,
    },

    venue: {
      type: String,
      default: "",
      trim: true,
    },

    year: {
      type: Number,
      min: 1800,
      max: new Date().getFullYear() + 1,
    },

    doi: {
      type: String,
      default: "",
      trim: true,
    },

    keywords: [
      {
        type: String,
        trim: true,
      },
    ],

    language: {
      type: String,
      default: "English",
      trim: true,
    },

    source: {
      type: String,
      enum: ["upload", "doi", "arxiv", "url"],
      default: "upload",
    },

    citationCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    referenceCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["active", "archived", "deleted"],
      default: "active",
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    isFavorite: {
      type: Boolean,
      default: false,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    lastOpenedAt: {
      type: Date,
      default: Date.now,
    },
    slug: {
    type: String,
    unique: true,
    sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ===========================
   INDEXES
=========================== */

paperSchema.index({
  workspace: 1,
  createdAt: -1,
});

paperSchema.index({
  uploadedBy: 1,
});

paperSchema.index({
  title: "text",
  abstract: "text",
  authors: "text",
  keywords: "text",
});

/* ===========================
   EXPORT
=========================== */

const Paper = mongoose.model("Paper", paperSchema);

export default Paper;