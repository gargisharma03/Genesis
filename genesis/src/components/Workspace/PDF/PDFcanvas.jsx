import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

export default function PDFcanvas({ selectedPaper,viewerState,setViewerState }) {
    

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

    return (
        <div className="h-full overflow-y-auto bg-zinc-100 p-8">
            <div className="flex flex-col items-center">
                <Document
                    file={selectedPaper.pdfUrl}
                    onLoadSuccess={onLoadSuccess}
                    onLoadError={onLoadError}
                    loading={<p>Loading PDF...</p>}
                >
                    {Array.from(new Array(viewerState.numPages), (_, index) => (
                        <div
                            key={index}
                            className="mb-6 flex justify-center"
                        >
                            <Page
                                pageNumber={index + 1}
                                width={850 * viewerState.zoom}
                            />
                        </div>
                    ))}
                </Document>
            </div>
        </div>
    );
}