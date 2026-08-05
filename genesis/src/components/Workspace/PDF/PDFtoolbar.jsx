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

export default function PDFToolbar({
    selectedPaper,
    viewerState,
    setViewerState,
}) {
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

                    <button className="p-2 rounded hover:bg-zinc-100 transition">
                        <ChevronLeft size={18} />
                    </button>

                    <button className="p-2 rounded hover:bg-zinc-100 transition">
                        <ChevronRight size={18} />
                    </button>

                    <span className="text-sm text-zinc-600">

                        {viewerState.pageNumber} / {viewerState.numPages || "--"}

                    </span>

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

                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 transition">

                        <Columns2 size={16} />

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