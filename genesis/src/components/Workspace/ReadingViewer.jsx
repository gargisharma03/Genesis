import ResearchBoard from "./ResearchBoard/ResearchBoard";
import PDFviewer from "./PDF/PDFviewer";

export default function ReadingView({
  selectedPaper,
  selectedNote,
  pane,
}) {
  // 1. If explicitly requested as PDF pane
  if (pane === "pdf") {
    return (
      <div className="h-full min-h-0 w-full overflow-hidden relative">
        <PDFviewer selectedPaper={selectedPaper} />
      </div>
    );
  }

  // 2. If explicitly requested as Notes/Board pane
  if (pane === "notes") {
    return (
      <div className="h-full min-h-0 w-full overflow-hidden relative">
        <ResearchBoard
          key={selectedPaper?._id || selectedNote?._id}
          selectedPaper={selectedPaper}
        />
      </div>
    );
  }

  // 3. Fallback: Split layout with isolated container clipping
  return (
    <div className="flex h-full w-full min-h-0 min-w-0 overflow-hidden divide-x divide-zinc-200">
      {/* PDF Panel - Strictly bounded */}
      <div className="flex-1 h-full min-h-0 min-w-0 overflow-hidden relative bg-zinc-100">
        <PDFviewer selectedPaper={selectedPaper} />
      </div>

      {/* Research Board Panel - Isolated boundary with distinct background */}
      <div className="w-[420px] lg:w-[480px] xl:w-[560px] h-full min-h-0 shrink-0 overflow-hidden relative bg-white">
        <ResearchBoard
          key={selectedPaper?._id || selectedNote?._id}
          selectedPaper={selectedPaper}
        />
      </div>
    </div>
  );
}