import {useState} from 'react';
import PDFcanvas from "./PDFcanvas";
import PDFtoolbar from "./PDFtoolbar";
import Emptystate from "./Emptystate";


export default function PDFviewer({selectedPaper}){
    const [viewerState, setViewerState] = useState({
        zoom: 1,
        pageNumber: 1,
        numPages: 0,
    });
    if (!selectedPaper){
        return <Emptystate />;
    }

    return (
        <div className="h-full flex flex-col rounded-2xl border bg-white">

            <PDFtoolbar
                selectedPaper={selectedPaper}
                viewerState={viewerState}
                setViewerState={setViewerState}
            />

            <div className="flex-1 min-h-0">
                <PDFcanvas 
                    selectedPaper={selectedPaper}
                    viewerState={viewerState}
                    setViewerState={setViewerState} />
            </div>

        </div>
    )
}