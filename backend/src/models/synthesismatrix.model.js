import mongoose from 'mongoose';

const cellObservationSchema = new mongoose.Schema(
  {
    paper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paper',
      required: true,
    },
    columnId: {
      type: String,
      required: true,
    },
    observation: {
      type: String,
      default: '',
    },
    linkedBlocks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KnowledgeBlock',
      },
    ],
  },
  { _id: false }
);

const synthesisMatrixSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    rows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paper',
      },
    ],
    columns: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String },
      },
    ],
    cells: [cellObservationSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lastEditedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const SynthesisMatrix = mongoose.model('SynthesisMatrix', synthesisMatrixSchema);