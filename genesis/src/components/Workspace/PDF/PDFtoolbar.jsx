import {
    ChevronLeft,
    ChevronRight,
    Search,
    ZoomIn,
    ZoomOut,
    Download,
    Maximize2,
    Star,
    MoreHorizontal,
    Columns2
} from "lucide-react";
import {useState,useEffect} from 'react';

export default function PDFToolbar({
    selectedPaper,
    viewerState,
    setViewerState,
    onFitWidth,
}) {
    const [pageInput, setPageInput] = useState(viewerState.pageNumber);
    useEffect(() => {
        setPageInput(viewerState.pageNumber);
    }, [viewerState.pageNumber]);
    return (
        <div className="border-b bg-white">

            {/* Top Row */}

            <div className="h-14 px-6 flex items-center justify-between">

                <div className="flex items-center gap-3 min-w-0">

                    <div className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center">
                        📄
                    </div>

                    <div className="min-w-0">

                        <p className="font-medium truncate">
                            {selectedPaper?.title || "Untitled Paper"}
                        </p>

                        <p className="text-xs text-zinc-500">
                            PDF Document
                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-2">

                    <button className="p-2 rounded-lg hover:bg-zinc-100 transition">
                        <Star size={18} />
                    </button>

                    <button className="p-2 rounded-lg hover:bg-zinc-100 transition">
                        <MoreHorizontal size={18} />
                    </button>

                </div>

            </div>

            {/* Bottom Row */}

            <div className="h-12 border-t px-6 flex items-center justify-between">

                {/* Left */}

                <div className="flex items-center gap-4">

                    <button
                        className="p-2 rounded hover:bg-zinc-100 transition"
                        disabled={viewerState.pageNumber <= 1}
                        onClick={() =>
                            setViewerState(prev => ({
                                ...prev,
                                pageNumber: prev.pageNumber - 1,
                            }))
                        }
                    >
                        <ChevronLeft size={18}/>
                    </button>

                    <button 
                        className="p-2 rounded hover:bg-zinc-100 transition"
                        disabled={viewerState.pageNumber >= viewerState.numPages}
                        onClick={()=>
                            setViewerState(prev => ({
                                ...prev,
                                pageNumber: prev.pageNumber +1
                            }))
                        }>
                        <ChevronRight size={18} />
                    </button>

                    <div className="flex items-center gap-2">

                        <input
                            type="number"
                            min={1}
                            max={viewerState.numPages}
                            value={pageInput}
                            onChange={(e) => {
                                setPageInput(e.target.value);
                            }}
                            onBlur={() => {
                                let page = Number(pageInput);

                                if (isNaN(page)) {
                                    page = viewerState.pageNumber;
                                }

                                page = Math.max(
                                    1,
                                    Math.min(page, viewerState.numPages)
                                );

                                setViewerState((prev) => ({
                                    ...prev,
                                    pageNumber: page,
                                }));
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.target.blur();
                                }
                            }}
                            className="
                                w-14
                                text-center
                                border
                                rounded-md
                                py-1
                                text-sm
                                outline-none
                                focus:ring-2
                                focus:ring-black
                            "
                        />

                        <span className="text-sm text-zinc-500">
                            / {viewerState.numPages || "--"}
                        </span>

                    </div>

                </div>

                {/* Right */}

                <div className="flex items-center gap-3">

                    <button className="p-2 rounded hover:bg-zinc-100 transition">
                        <Search size={18} />
                    </button>

                    <button
                        className="p-2 rounded hover:bg-zinc-100 transition"
                        onClick={() =>
                            setViewerState((prev) => ({
                                ...prev,
                                zoom: Math.max(0.5, prev.zoom - 0.1),
                            }))
                        }
                    >
                        <ZoomOut size={18} />
                    </button>

                    <span className="w-12 text-center text-sm font-medium">

                        {Math.round(viewerState.zoom * 100)}%

                    </span>

                    <button
                        className="p-2 rounded hover:bg-zinc-100 transition"
                        onClick={() =>
                            setViewerState((prev) => ({
                                ...prev,
                                zoom: Math.min(3, prev.zoom + 0.1),
                            }))
                        }
                    >
                        <ZoomIn size={18} />
                    </button>

                    <button
                        onClick={onFitWidth}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 transition"
                    >
                        <Columns2 size={16}/>
                        <span className="text-sm">
                            Fit Width
                        </span>
                    </button>

                    <button className="p-2 rounded hover:bg-zinc-100 transition">
                        <Download size={18} />
                    </button>

                    <button className="p-2 rounded hover:bg-zinc-100 transition">
                        <Maximize2 size={18} />
                    </button>

                </div>

            </div>

        </div>
    );
}