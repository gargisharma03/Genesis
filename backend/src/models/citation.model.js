import mongoose from "mongoose";

const citationSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },

    paper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paper",
      required: true,
      index: true,
    },

    citedPaper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paper",
      default: null,
    },

    citationType: {
      type: String,
      enum: [
        "journal",
        "conference",
        "book",
        "website",
        "thesis",
        "report",
        "preprint",
        "dataset",
        "other",
      ],
      default: "other",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    authors: [
      {
        type: String,
        trim: true,
      },
    ],

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

    url: {
      type: String,
      default: "",
      trim: true,
    },

    citationText: {
      type: String,
      default: "",
      trim: true,
    },

    citationStyle: {
      type: String,
      enum: [
        "APA",
        "IEEE",
        "MLA",
        "Chicago",
        "BibTeX",
        "Unknown",
      ],
      default: "Unknown",
    },

    referenceNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    extractedBy: {
      type: String,
      enum: ["ai", "user"],
      default: "ai",
    },
  },
  {
    timestamps: true,
  }
);

/* ===========================
   INDEXES
=========================== */

citationSchema.index({
  paper: 1,
  referenceNumber: 1,
});

citationSchema.index({
  workspace: 1,
  doi: 1,
});

citationSchema.index({
  title: "text",
  citationText: "text",
});

export const Citation = mongoose.model("Citation", citationSchema);

