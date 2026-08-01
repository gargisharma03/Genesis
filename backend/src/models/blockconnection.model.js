import mongoose from 'mongoose';

const blockConnectionSchema = new mongoose.Schema(
  {
    page: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NotebookPage',
      required: true,
      index: true,
    },
    fromBlock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'KnowledgeBlock',
      required: true,
      index: true,
    },
    toBlock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'KnowledgeBlock',
      required: true,
      index: true,
    },
    label: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      default: '#000000',
    },
  },
  { timestamps: true }
);

export const BlockConnection = mongoose.model('BlockConnection', blockConnectionSchema);