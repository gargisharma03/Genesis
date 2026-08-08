import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Group, Panel, Separator } from "react-resizable-panels";
import { Maximize2, Minimize2, GripVertical, Share2 } from "lucide-react";

import WorkspaceHeader from "../../components/Workspace/WorkspaceHeader";
import WorkspaceTabs from "../../components/Workspace/WorkspaceTabs";
import WorkspaceSidebar from "../../components/Workspace/WorkspaceSidebar";
import ReadingView from "../../components/Workspace/ReadingViewer";
import ShareWorkspaceModal from "../../components/Workspace/ShareWorkspaceModal";

import { getWorkspace } from "../../api/workspaceApi";
import { getWorkspacePapers } from "../../api/paperApi";
import { getWorkspaceNotes } from "../../api/noteApi";

import { useBoardSocket } from "../../hooks/useBoardSocket";
import { useAuth } from "../../contexts/authcontext";

export default function Workspace() {
  const { workspaceId } = useParams();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("reading");
  const [collapsed, setCollapsed] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [workspace, setWorkspace] = useState(null);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Blocks state for real-time board
  const [blocks, setBlocks] = useState([]);

  // Socket connection hook
  const { 
    onlineMembers, 
    focusedBlocks, 
    emitBlockFocus, 
    emitCreateBlock, 
    emitUpdateBlock, 
    emitDeleteBlock 
  } = useBoardSocket(workspaceId, user, setBlocks);

  const fetchWorkspaceData = useCallback(async () => {
    if (!workspaceId) return;
    setIsLoading(true);

    // 1. Reset state on workspace navigation to prevent showing stale data
    setWorkspace(null);
    setPapers([]);
    setSelectedPaper(null);
    setNotes([]);
    setSelectedNote(null);

    try {
      const [workspaceRes, papersRes, notesRes] = await Promise.allSettled([
        getWorkspace(workspaceId),
        getWorkspacePapers(workspaceId),
        getWorkspaceNotes(workspaceId),
      ]);

      if (workspaceRes.status === "fulfilled") {
        setWorkspace(workspaceRes.value.data.workspace);
      }

      if (papersRes.status === "fulfilled") {
        const fetchedPapers = papersRes.value.data.papers || [];
        setPapers(fetchedPapers);
        // Set the active paper directly from the new workspace
        setSelectedPaper(fetchedPapers.length > 0 ? fetchedPapers[0] : null);
      }

      if (notesRes.status === "fulfilled") {
        const fetchedNotes = notesRes.value.data.notes || [];
        setNotes(fetchedNotes);
        // Set the active note directly from the new workspace
        setSelectedNote(fetchedNotes.length > 0 ? fetchedNotes[0] : null);
      }
    } catch (error) {
      console.error("Error loading workspace resources:", error);
    } finally {
      setIsLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    fetchWorkspaceData();
  }, [fetchWorkspaceData]);

  const handleRefreshPapers = async () => {
    try {
      const res = await getWorkspacePapers(workspaceId);
      const fetchedPapers = res.data.papers || [];
      setPapers(fetchedPapers);
    } catch (err) {
      console.error("Error refreshing papers:", err);
    }
  };

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-white text-zinc-900 selection:bg-blue-100">
      {/* 1. Outer App Sidebar */}
      {!isFocusMode && (
        <WorkspaceSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          papers={papers}
          selectedPaper={selectedPaper}
          setSelectedPaper={setSelectedPaper}
          refreshPapers={handleRefreshPapers}
        />
      )}

      {/* 2. Main Content Wrapper */}
      <div
        className={`flex flex-1 flex-col h-full min-w-0 transition-all duration-300 ease-in-out ${
          isFocusMode ? "pl-0" : collapsed ? "pl-16" : "pl-64"
        }`}
      >
        {/* Header */}
        {!isFocusMode && (
          <div className="shrink-0 border-b border-zinc-200 bg-white">
            <WorkspaceHeader workspace={workspace} paperCount={papers.length} />
          </div>
        )}

        <main className={`flex flex-1 flex-col min-h-0 overflow-hidden ${isFocusMode ? "p-0 bg-zinc-950" : "p-4"}`}>
          {!isFocusMode && (
            <div className="flex items-center justify-between shrink-0 mb-3">
              <WorkspaceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              
              <div className="flex items-center gap-3">
                {onlineMembers.length > 0 && (
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-zinc-200 rounded-lg">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      {onlineMembers.map((member) => (
                        <div
                          key={member.socketId || member._id}
                          title={`${member.name} (Online)`}
                          className="relative inline-block h-6 w-6 rounded-full border-2 border-white bg-fuchsia-100 text-fuchsia-900 text-[10px] font-bold flex items-center justify-center shadow-xs"
                        >
                          {member.name ? member.name.charAt(0).toUpperCase() : "U"}
                          <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-fuchsia-500 ring-1 ring-white" />
                        </div>
                      ))}
                    </div>
                    <span className="text-[11px] font-medium text-zinc-500">
                      {onlineMembers.length} active
                    </span>
                  </div>
                )}

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-medium text-fuchsia-700 hover:text-fuchsia-950 bg-fuchsia-50 hover:bg-fuchsia-100/70 border border-fuchsia-200 px-3 py-1.5 rounded-lg shadow-2xs transition-all active:scale-95"
                >
                  <Share2 className="w-3.5 h-3.5 text-fuchsia-600" />
                  <span>Share</span>
                </button>

                <button
                  onClick={() => setIsFocusMode(true)}
                  className="flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 bg-white hover:bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-lg shadow-2xs transition-all"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Focus Mode</span>
                </button>
              </div>
            </div>
          )}

          <div className={`relative flex-1 min-h-0 rounded-xl border overflow-hidden ${
            isFocusMode ? "border-zinc-800 bg-white rounded-none border-0" : "border-zinc-200 bg-white shadow-xs"
          }`}>
            {isFocusMode && (
              <button
                onClick={() => setIsFocusMode(false)}
                className="absolute top-4 right-6 z-50 flex items-center gap-2 text-xs font-medium text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 hover:text-white px-3.5 py-2 rounded-full border border-zinc-700/80 backdrop-blur-md shadow-xl transition-all"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                Exit Focus Mode
              </button>
            )}

            {isLoading ? (
              <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                Loading workspace...
              </div>
            ) : (
              <>
                {activeTab === "reading" && (
                  <Group direction="horizontal" className="h-full w-full">
                    <Panel defaultSize={50} minSize={25} className="h-full min-w-0">
                      <div className="h-full w-full overflow-auto">
                        <ReadingView
                          selectedPaper={selectedPaper}
                          selectedNote={selectedNote}
                          notes={notes}
                          pane="pdf"
                        />
                      </div>
                    </Panel>

                    <Separator className="relative flex w-2 items-center justify-center bg-white hover:bg-fuchsia-500 active:bg-fuchsia-600 transition-colors cursor-col-resize group z-10">
                      <div className="flex h-7 w-3 items-center justify-center rounded bg-zinc-300 group-hover:bg-fuchsia-600 text-white shadow-xs transition-colors">
                        <GripVertical className="h-3 w-3" />
                      </div>
                    </Separator>

                    <Panel defaultSize={50} minSize={25} className="h-full min-w-0">
                      <div className="h-full w-full overflow-auto bg-white">
                        <ReadingView
                          selectedPaper={selectedPaper}
                          selectedNote={selectedNote}
                          notes={notes}
                          blocks={blocks}
                          focusedBlocks={focusedBlocks}
                          emitBlockFocus={emitBlockFocus}
                          emitCreateBlock={emitCreateBlock}
                          emitUpdateBlock={emitUpdateBlock}
                          emitDeleteBlock={emitDeleteBlock}
                          pane="notes"
                        />
                      </div>
                    </Panel>
                  </Group>
                )}

                {activeTab !== "reading" && (
                  <div className="flex h-full items-center justify-center text-zinc-500">
                    {activeTab.toUpperCase()} Module
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <ShareWorkspaceModal
        workspaceId={workspaceId}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}