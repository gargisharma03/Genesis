class CitationExtractionService {

  extract(text) {
    if (!text) {
      return [];
    }

    const referencesMatch = text.match(
      /^\s*(references|bibliography)\s*$/im
    );

    if (!referencesMatch) {
      return [];
    }

    const referencesIndex =
      referencesMatch.index;

    const referencesText =
      text.slice(referencesIndex);

    const rawCitations = referencesText
      .split(/\n\s*(?:\[\d+\]|\d+\.)\s+/)
      .map((citation) => citation.trim())
      .filter(Boolean);

    return rawCitations.map(
      (citation, index) => ({
        referenceNumber: index + 1,
        citationText: citation,
        extractedBy: "parser",
        verified: false,
      })
    );
  }
}

export default new CitationExtractionService();