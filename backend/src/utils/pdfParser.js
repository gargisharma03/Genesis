import pdfParse from "pdf-parse";

export async function extractPdfText(pdfBuffer) {
  if (!pdfBuffer) {
    throw new Error("PDF buffer is required");
  }

  const data = await pdfParse(pdfBuffer);

  return {
    text: data.text || "",
    totalPages: data.numpages || 0,
  };
}