export default function PdfReferenceBlock({ block, onBlockChange, setViewerState }) {
  const pageNumber = block.content?.pageNumber || 1;
  const quote = block.content?.quote || "";

  const handleJumpToPdfPage = () => {
    if (setViewerState) {
      setViewerState((prev) => ({ ...prev, pageNumber }));
    }
  };

  return (
    <div className="flex items-start justify-between rounded-lg border border-indigo-200 bg-indigo-50/50 p-3 text-indigo-950">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700">
            PDF Ref · Page {pageNumber}
          </span>
        </div>
        <p className="text-xs italic text-indigo-900/80 font-serif">"{quote}"</p>
      </div>

      <button
        onClick={handleJumpToPdfPage}
        className="shrink-0 rounded bg-indigo-600 px-2 py-1 text-[11px] font-medium text-white hover:bg-indigo-700 transition"
      >
        Jump to Page
      </button>
    </div>
  );
}