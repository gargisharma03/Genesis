import {useState, useRef} from 'react';
import PDFcanvas from "./PDFcanvas";
import PDFtoolbar from "./PDFtoolbar";
import Emptystate from "./Emptystate";


export default function PDFviewer({selectedPaper}){
    const containerRef = useRef(null);
    const PDF_WIDTH = 850;
    const [viewerState, setViewerState] = useState({
        zoom: 1,
        pageNumber: 1,
        numPages: 0,
    });
    function handleFitWidth() {
        if (!containerRef.current) return;

        const availableWidth =
            containerRef.current.clientWidth - 64; // padding

        const fitZoom = availableWidth / PDF_WIDTH;

        setViewerState(prev => ({
            ...prev,
            zoom: fitZoom,
        }));
    }
    if (!selectedPaper){
        return <Emptystate />;
    }

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-white">

            <PDFtoolbar
                selectedPaper={selectedPaper}
                viewerState={viewerState}
                setViewerState={setViewerState}
                onFitWidth={handleFitWidth}
            />

            <div className="flex-1 min-h-0">
                <PDFcanvas 
                    selectedPaper={selectedPaper}
                    viewerState={viewerState}
                    setViewerState={setViewerState}
                    containerRef={containerRef} />
            </div>

        </div>
    )
}