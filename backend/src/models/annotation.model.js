import mongoose from 'mongoose';

const annotationSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true,
      index: true,
    },
    paper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paper',
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
      enum: ['highlight', 'underline', 'strike', 'drawing', 'textbox', 'circle', 'rectangle'],
      required: true,
    },
    page: {
      type: Number,
      required: true,
      min: 1,
    },
    position: {
      x: { type: Number },
      y: { type: Number },
      width: { type: Number },
      height: { type: Number },
      boundingRect: { type: mongoose.Schema.Types.Mixed },
      rects: [{ type: mongoose.Schema.Types.Mixed }],
    },
    selectedText: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      default: '#FFD700',
    },
    linkedKnowledgeBlock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'KnowledgeBlock',
      default: null,
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Annotation = mongoose.model('Annotation', annotationSchema);