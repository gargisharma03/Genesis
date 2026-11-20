import PaperAnalysis from "../../models/paperanalysis.model.js";
import PaperProcessing from "../../models/paperprocessing.model.js";

import PaperProcessingService from "../paper/paperProcessing.service.js";

class PaperAnalysisService {
  async analyzePaper(paperId) {
    // --------------------------------------------------
    // 1. Make sure PDF processing has happened
    // --------------------------------------------------

    let processing = await PaperProcessing.findOne({
      paper: paperId,
    });

    if (
      !processing ||
      !processing.extractedText?.trim()
    ) {
      processing =
        await PaperProcessingService.processPaper(
          paperId
        );
    }

    if (!processing.extractedText?.trim()) {
      throw new Error(
        "No extracted text available for analysis"
      );
    }

    // --------------------------------------------------
    // 2. Check whether analysis already exists
    // --------------------------------------------------

    let analysis = await PaperAnalysis.findOne({
      paper: paperId,
    });

    // Don't send the same paper to the LLM repeatedly
    if (
      analysis?.status === "completed"
    ) {
      return analysis;
    }

    // --------------------------------------------------
    // 3. Create/update analysis record
    // --------------------------------------------------

    if (!analysis) {
      analysis = await PaperAnalysis.create({
        paper: paperId,
        status: "processing",
      });
    } else {
      analysis.status = "processing";
      analysis.error = "";

      await analysis.save();
    }

    try {
      // ------------------------------------------------
      // 4. Run AI analysis
      // ------------------------------------------------

      const result =
        await this.runLLMAnalysis(
          processing.extractedText
        );

      // ------------------------------------------------
      // 5. Save structured analysis
      // ------------------------------------------------

      analysis.summary =
        result.summary || "";

      analysis.methodology =
        result.methodology || "";

      analysis.datasets =
        result.datasets || [];

      analysis.results =
        result.results || "";

      analysis.limitations =
        result.limitations || "";

      analysis.futureWork =
        result.futureWork || "";

      analysis.keyContributions =
        result.keyContributions || [];

      analysis.strengths =
        result.strengths || [];

      analysis.weaknesses =
        result.weaknesses || [];

      analysis.researchGap =
        result.researchGap || "";

      analysis.assumptions =
        result.assumptions || [];

      analysis.evaluationMetrics =
        result.evaluationMetrics || [];

      analysis.confidence =
        result.confidence || 0;

      analysis.status = "completed";

      analysis.modelInfo = {
        provider: result.modelInfo?.provider || "openai",
        model: result.modelInfo?.model || "",
        version: result.modelInfo?.version || "",
        analyzedAt: new Date(),
      };

      analysis.error = "";

      await analysis.save();

      return analysis;
    } catch (error) {
      analysis.status = "failed";
      analysis.error = error.message;

      await analysis.save();

      throw error;
    }
  }

  // ----------------------------------------------------
  // LLM implementation
  // ----------------------------------------------------

  async runLLMAnalysis(text) {
    /*
      We will connect your actual LLM here.

      For now this method defines the exact structure
      expected from the model.
    */

    throw new Error(
      "LLM analysis is not configured yet"
    );
  }
}

export default new PaperAnalysisService();