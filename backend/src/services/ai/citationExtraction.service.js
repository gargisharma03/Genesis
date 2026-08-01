class CitationExtractionService {
  extract(text) {
    // Locate the References section
    const referencesIndex = text.search(/references/i);

    if (referencesIndex === -1) {
      return [];
    }

    const referencesText = text.slice(referencesIndex);

    // Split by numbered references
    const rawCitations = referencesText
      .split(/\n\s*\[\d+\]|\n\s*\d+\./)
      .filter((citation) => citation.trim().length > 0);

    return rawCitations.map((citation, index) => ({
      referenceNumber: index + 1,
      citationText: citation.trim(),
      extractedBy: "ai",
      verified: false,
    }));
  }
}

export default new CitationExtractionService();