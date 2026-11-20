import mongoose from "mongoose";

const cellObservationSchema = new mongoose.Schema(
  {
    paper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paper",
      required: true,
    },

    columnId: {
      type: String,
      required: true,
    },

    observation: {
      type: String,
      default: "",
    },

    // Where the observation came from
    source: {
      type: String,
      enum: ["manual", "ai"],
      default: "manual",
    },

    linkedBlocks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "KnowledgeBlock",
      },
    ],

    lastEditedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    lastEditedAt: {
      type: Date,
      default: null,
    },
  },
  {
    _id: false,
  }
);

const synthesisMatrixSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
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
        ref: "Paper",
      },
    ],

    columns: [
      {
        id: {
          type: String,
          required: true,
        },

        name: {
          type: String,
          required: true,
          trim: true,
        },

        description: {
          type: String,
          default: "",
        },

        // Determines whether AI should try to populate this column
        analysisField: {
          type: String,
          default: null,
        },
      },
    ],

    cells: [cellObservationSchema],

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
  },
  {
    timestamps: true,
  }
);

synthesisMatrixSchema.index({
  workspace: 1,
});

export const SynthesisMatrix = mongoose.model(
  "SynthesisMatrix",
  synthesisMatrixSchema
);