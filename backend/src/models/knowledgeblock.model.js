import mongoose from 'mongoose';

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
      enum: [
          "text",
          "sticky",
          "drawing",
          "image",
          "pdf-highlight",
          "citation",
          "equation",
          "code",
          "todo",
          "ai-summary",
      ],
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
      collapsed:{
          type:Boolean,
          default:false,
      },
    },
    style:{
        color:{
            type:String,
            default:"#FFF9A6"
        },

        background:{
            type:String,
            default:"#FFFFFF"
        },

        opacity:{
            type:Number,
            default:1
        },

        fontSize:{
            type:Number,
            default:16
        }
    },
    linkedPaper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paper',
      default: null,
    },
    linkedPage: {
        type: Number,
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
    lastEditedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    order: {
        type: Number,
        default: 0,
    },
    isArchived:{
        type:Boolean,
        default:false,
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