import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PDFcanvas({ selectedPaper, viewerState, setViewerState, containerRef }) {
  const pageRefs = useRef([]);
  const PDF_WIDTH = 850;

  useEffect(() => {
    const page = pageRefs.current[viewerState.pageNumber - 1];

    if (page) {
      page.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [viewerState.pageNumber]);

  function onLoadSuccess({ numPages }) {
    console.log("PDF Loaded");
    console.log("Pages:", numPages);

    setViewerState((prev) => ({
      ...prev,
      numPages,
    }));
  }

  function onLoadError(error) {
    console.error("PDF Error:", error);
  }

  // Resolve arXiv URLs to backend proxy endpoint while passing normal URLs unchanged
  const getPdfSource = () => {
    if (!selectedPaper?.pdfUrl) return null;

    const rawUrl = selectedPaper.pdfUrl;
    const arxivMatch = rawUrl.match(/(?:abs|pdf)\/(\d{4}\.\d{4,5}(?:v\d+)?|[a-zA-Z.-]+\/\d{7})/);

    if (arxivMatch) {
      const arxivId = arxivMatch[1];
      return `http://localhost:5000/api/papers/arxiv-proxy/${arxivId}`;
    }

    return rawUrl;
  };

  const pdfSource = getPdfSource();

  return (
    <div ref={containerRef} className="h-full overflow-y-auto bg-zinc-100 p-8">
      <div className="flex flex-col items-center">
        {pdfSource ? (
          <Document
            file={pdfSource}
            onLoadSuccess={onLoadSuccess}
            onLoadError={onLoadError}
            loading={<p>Loading PDF...</p>}
          >
            {Array.from(new Array(viewerState.numPages || 0), (_, index) => (
              <div
                key={index}
                ref={(el) => (pageRefs.current[index] = el)}
                className="mb-6 flex justify-center"
              >
                <Page
                  pageNumber={index + 1}
                  width={PDF_WIDTH * viewerState.zoom}
                />
              </div>
            ))}
          </Document>
        ) : (
          <p className="text-zinc-500">No PDF URL provided</p>
        )}
      </div>
    </div>
  );
}