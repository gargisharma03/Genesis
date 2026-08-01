import fs from "fs/promises";
import pdfParse from "pdf-parse";

class PDFParserService {
  async parsePDF(filePath) {
    try {
      // Read PDF
      const buffer = await fs.readFile(filePath);

      // Parse PDF
      const pdf = await pdfParse(buffer);

      return {
        title: pdf.info?.Title || "",
        author: pdf.info?.Author || "",
        totalPages: pdf.numpages,
        metadata: pdf.info || {},
        fullText: pdf.text,
      };
    } catch (error) {
      throw new Error(`Failed to parse PDF: ${error.message}`);
    }
  }
}

export default new PDFParserService();