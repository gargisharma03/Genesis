import Paper from "../../models/paper.model.js";
import PaperProcessing from "../../models/paperProcessing.model.js";

import CloudinaryService from "../storage/cloudinary.service.js";
import PDFParserService from "./pdfParser.service.js";
import CitationExtractionService from "../ai/citationExtraction.service.js";

class PaperProcessingService {

  async processPaper(paperId) {

    const paper = await Paper.findById(paperId);

    if (!paper) {
      throw new Error("Paper not found");
    }

    let processing =
      await PaperProcessing.findOne({
        paper: paperId,
      });

    if (!processing) {
      processing =
        await PaperProcessing.create({
          paper: paperId,
          status: "queued",
        });
    }

    if (
      processing.status === "completed" &&
      processing.extractedText
    ) {
      return processing;
    }

    try {

      processing.status = "processing";
      processing.startedAt = new Date();
      processing.error = "";

      await processing.save();

      // 1. Download PDF from Cloudinary
      const pdfBuffer =
        await CloudinaryService.downloadFile(
          paper.pdfUrl
        );

      // 2. Parse PDF
      const parsed =
        await PDFParserService.parseBuffer(
          pdfBuffer
        );

      // 3. Store extracted text
      processing.extractedText =
        parsed.fullText;

      // 4. Extract references
      const references =
        CitationExtractionService.extract(
          parsed.fullText
        );

      processing.referencesParsed =
        references.length > 0;

      // TODO:
      // Save references once Reference model
      // is connected to the processing pipeline.

      processing.status = "completed";
      processing.finishedAt = new Date();

      await processing.save();

      return processing;

    } catch (error) {

      processing.status = "failed";
      processing.error = error.message;
      processing.finishedAt = new Date();

      await processing.save();

      throw error;
    }
  }
}

export default new PaperProcessingService();