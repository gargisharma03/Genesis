import { useParams } from "react-router-dom";
import UploadPaperButton from "./UploadPaperButton";
import PaperItem from "./PaperItem";
import { deletePaper } from "../../api/paperApi"; // Ensure path points to your paperApi.js

export default function SidebarPapers({
  collapsed,
  papers,
  selectedPaper,
  setSelectedPaper,
  refreshPapers,
}) {
  const { workspaceId } = useParams();

  const handleDeletePaper = async (paperId) => {
    try {
      await deletePaper(workspaceId, paperId);

      // If the deleted paper was currently open, clear selection
      if (selectedPaper?._id === paperId) {
        setSelectedPaper(null);
      }

      // Refresh list
      if (refreshPapers) {
        refreshPapers();
      }
    } catch (err) {
      console.error("Failed to delete paper:", err);
    }
  };

  return (
    <section className="mt-8">
      {/* Header */}
      {!collapsed ? (
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-zinc-400">
            Papers
          </p>
          <UploadPaperButton
            collapsed={collapsed}
            refreshPapers={refreshPapers}
            setSelectedPaper={setSelectedPaper}
          />
        </div>
      ) : (
        <div className="flex justify-center mb-4">
          <UploadPaperButton
            collapsed={collapsed}
            refreshPapers={refreshPapers}
            setSelectedPaper={setSelectedPaper}
          />
        </div>
      )}

      {/* List */}
      <div className="space-y-2">
        {papers.length === 0 ? (
          !collapsed && (
            <div className="rounded-xl border border-dashed border-zinc-200 p-5 text-center">
              <p className="text-sm text-zinc-400">
                No papers uploaded yet
              </p>
            </div>
          )
        ) : (
          papers.map((paper) => (
            <PaperItem
              key={paper._id}
              paper={paper}
              selectedPaper={selectedPaper}
              setSelectedPaper={setSelectedPaper}
              onDeletePaper={handleDeletePaper}
              collapsed={collapsed}
            />
          ))
        )}
      </div>
    </section>
  );
}