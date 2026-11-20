import PaperAnalysisService from "../services/ai/paperAnalysis.service.js";
import PaperAnalysis from "../models/paperanalysis.model.js";

export const analyzePaper = async (req, res) => {
  try {
    const { paperId } = req.params;

    const analysis =
      await PaperAnalysisService.analyzePaper(
        paperId
      );

    return res.status(200).json({
      success: true,
      message: "Paper analyzed successfully",
      analysis,
    });
  } catch (error) {
    console.error(
      "Paper analysis error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to analyze paper",
      error: error.message,
    });
  }
};


export const getPaperAnalysis = async (
  req,
  res
) => {
  try {
    const { paperId } = req.params;

    const analysis =
      await PaperAnalysis.findOne({
        paper: paperId,
      });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Paper analysis not found",
      });
    }

    return res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error(
      "Get paper analysis error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch paper analysis",
      error: error.message,
    });
  }
};