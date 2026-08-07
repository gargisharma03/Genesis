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
      <div className="h-full min-h-0 w-full overflow-hidden">
        <PDFviewer selectedPaper={selectedPaper} />
      </div>
    );
  }

  // 2. If explicitly requested as Notes/Board pane
  if (pane === "notes") {
    return (
      <div className="h-full min-h-0 w-full overflow-hidden">
        <ResearchBoard
          key={selectedPaper?._id || selectedNote?._id}
          selectedPaper={selectedPaper}
        />
      </div>
    );
  }

  // 3. Fallback: Grid layout (if used without resizable panels elsewhere)
  return (
    <div className="grid grid-cols-12 gap-6 h-full overflow-hidden">
      <div className="col-span-8 h-full min-h-0">
        <PDFviewer selectedPaper={selectedPaper} />
      </div>

      <div className="col-span-4 h-full min-h-0">
        <ResearchBoard
          key={selectedPaper?._id || selectedNote?._id}
          selectedPaper={selectedPaper}
        />
      </div>
    </div>
  );
}