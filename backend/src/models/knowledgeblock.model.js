import mongoose from 'mongoose';

const knowledgeBlockSchema = new mongoose.Schema(
  {
    page: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NotebookPage',
      required: true,
      index: true,
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['text', 'evidence', 'sticky', 'drawing', 'image', 'url', 'equation', 'code', 'task'],
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
    },
    position: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      z: { type: Number, default: 0 },
    },
    size: {
      width: { type: Number, default: 200 },
      height: { type: Number, default: 150 },
    },
    style: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    linkedPaper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paper',
      default: null,
    },
    linkedAnnotation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Annotation',
      default: null,
    },
    linkedCitation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Citation',
      default: null,
    },
    linkedAnalysis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaperAnalysis',
      default: null,
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

export const KnowledgeBlock = mongoose.model('KnowledgeBlock', knowledgeBlockSchema);