import mongoose from "mongoose";

const paperProcessingSchema = new mongoose.Schema(
  {
    paper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paper",
      required: true,
      unique: true,
      index: true,
    },

    status: {
      type: String,
      enum: [
        "queued",
        "processing",
        "completed",
        "failed",
      ],
      default: "queued",
    },

    extractedText: {
      type: String,
      default: "",
    },

    ocrCompleted: {
      type: Boolean,
      default: false,
    },

    chunksCreated: {
      type: Boolean,
      default: false,
    },

    embeddingsCreated: {
      type: Boolean,
      default: false,
    },

    referencesParsed: {
      type: Boolean,
      default: false,
    },

    figuresParsed: {
      type: Boolean,
      default: false,
    },

    startedAt: Date,

    finishedAt: Date,

    error: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

paperProcessingSchema.index({
  paper: 1,
});

const PaperProcessing =
  mongoose.models.PaperProcessing ||
  mongoose.model(
    "PaperProcessing",
    paperProcessingSchema
  );

export default PaperProcessing;