import mongoose from "mongoose";

const knowledgeBlockSchema = new mongoose.Schema(
  {
    note: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
      required: true,
      index: true,
    },
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
    type: {
      type: String,
      enum: [
        "text",
        "heading",
        "paragraph",
        "code",
        "equation",
        "citation",
        "reference",
        "todo",
        "image",
        "divider",
        "ai-summary",
      ],
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    content: {
      text: String,
      code: String,
      language: String,
      latex: String,
    },
    position: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      z: { type: Number, default: 0 },
    },
    size: {
      width: { type: Number, default: 200 },
      height: { type: Number, default: 150 },
      collapsed: {
        type: Boolean,
        default: false,
      },
    },
    style: {
      color: {
        type: String,
        default: "#FFF9A6",
      },
      background: {
        type: String,
        default: "#FFFFFF",
      },
      opacity: {
        type: Number,
        default: 1,
      },
      fontSize: {
        type: Number,
        default: 16,
      },
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
    linkedAnnotation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Annotation",
      default: null,
    },
    linkedCitation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citation",
      default: null,
    },
    linkedAnalysis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaperAnalysis",
      default: null,
    },
    order: {
      type: Number,
      default: 0,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        trim: true,
        index: true,
      },
    ],
  },
  { timestamps: true }
);

// High-performance compound indexes for multiplayer canvas reads & updates
knowledgeBlockSchema.index({ note: 1, isArchived: 1 });
knowledgeBlockSchema.index({ workspace: 1, tags: 1 });

const KnowledgeBlock =
  mongoose.models.KnowledgeBlock ||
  mongoose.model("KnowledgeBlock", knowledgeBlockSchema);

export default KnowledgeBlock;