import mongoose from "mongoose";

const paperAnalysisSchema = new mongoose.Schema(
  {
    paper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paper",
      required: true,
      unique: true,
      index: true,
    },

    summary: {
      type: String,
      default: "",
    },

    methodology: {
      type: String,
      default: "",
    },

    datasets: [
      {
        type: String,
      },
    ],

    results: {
      type: String,
      default: "",
    },

    limitations: {
      type: String,
      default: "",
    },

    futureWork: {
      type: String,
      default: "",
    },

    keyContributions: [
      {
        type: String,
      },
    ],

    strengths: [
      {
        type: String,
      },
    ],

    weaknesses: [
      {
        type: String,
      },
    ],

    researchGap: {
      type: String,
      default: "",
    },

    assumptions: [
      {
        type: String,
      },
    ],

    evaluationMetrics: [
      {
        type: String,
      },
    ],

    // AI analysis state
    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "completed",
        "failed",
      ],
      default: "pending",
    },

    confidence: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    error: {
      type: String,
      default: "",
    },

    modelInfo: {
      provider: {
        type: String,
        default: "",
      },

      model: {
        type: String,
        default: "",
      },

      version: {
        type: String,
        default: "",
      },

      analyzedAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "PaperAnalysis",
  paperAnalysisSchema
);