import fs from "fs/promises";
import { PDFParse } from "pdf-parse";

class PDFParserService {
  async parseBuffer(buffer) {
    try {
      if (!buffer || !Buffer.isBuffer(buffer)) {
        throw new Error("PDF buffer is empty or invalid");
      }

      const parser = new PDFParse({
        data: buffer,
      });

      const result = await parser.getText();

      await parser.destroy();

      return {
        title: "",
        author: "",
        totalPages: result.total || 0,
        metadata: {},
        fullText: result.text || "",
      };
    } catch (error) {
      throw new Error(
        `Failed to parse PDF: ${error.message}`
      );
    }
  }

  async parsePDF(filePath) {
    try {
      const buffer = await fs.readFile(filePath);

      return await this.parseBuffer(buffer);
    } catch (error) {
      throw new Error(
        `Failed to parse PDF: ${error.message}`
      );
    }
  }
}

export default new PDFParserService();