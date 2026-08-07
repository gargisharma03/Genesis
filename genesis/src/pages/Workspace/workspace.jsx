import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Group, Panel, Separator } from "react-resizable-panels";
import { Maximize2, Minimize2, GripVertical } from "lucide-react";

import WorkspaceHeader from "../../components/Workspace/WorkspaceHeader";
import WorkspaceTabs from "../../components/Workspace/WorkspaceTabs";
import WorkspaceSidebar from "../../components/Workspace/WorkspaceSidebar";
import ReadingView from "../../components/Workspace/ReadingViewer";
import { getRecentWorkspace } from "../../api/workspaceApi";
import { getWorkspacePapers } from "../../api/paperApi";
import { getWorkspaceNotes } from "../../api/noteApi";

export default function Workspace() {
  const { workspaceId } = useParams();

  const [activeTab, setActiveTab] = useState("reading");
  const [collapsed, setCollapsed] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [workspace, setWorkspace] = useState(null);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorkspaceData = useCallback(async () => {
    if (!workspaceId) return;
    setIsLoading(true);

    try {
      const [workspaceRes, papersRes, notesRes] = await Promise.allSettled([
        getRecentWorkspace(workspaceId),
        getWorkspacePapers(workspaceId),
        getWorkspaceNotes(workspaceId),
      ]);

      if (workspaceRes.status === "fulfilled") {
        setWorkspace(workspaceRes.value.data.workspace);
      }

      if (papersRes.status === "fulfilled") {
        const fetchedPapers = papersRes.value.data.papers || [];
        setPapers(fetchedPapers);
        if (fetchedPapers.length > 0) {
          setSelectedPaper((prev) => prev || fetchedPapers[0]);
        }
      }

      if (notesRes.status === "fulfilled") {
        const fetchedNotes = notesRes.value.data.notes || [];
        setNotes(fetchedNotes);
        if (fetchedNotes.length > 0) {
          setSelectedNote((prev) => prev || fetchedNotes[0]);
        }
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
      
      {/* 1. Outer App Sidebar — Hidden in Focus Mode */}
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
        {/* Header — Hidden in Focus Mode */}
        {!isFocusMode && (
          <div className="shrink-0 border-b border-zinc-200 bg-white">
            <WorkspaceHeader workspace={workspace} paperCount={papers.length} />
          </div>
        )}

        <main className={`flex flex-1 flex-col min-h-0 overflow-hidden ${isFocusMode ? "p-0 bg-zinc-950" : "p-4"}`}>
          
          {/* Workspace Tabs + Focus Mode Toggle Bar — Hidden in Focus Mode */}
          {!isFocusMode && (
            <div className="flex items-center justify-between shrink-0 mb-3">
              <WorkspaceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              
              <button
                onClick={() => setIsFocusMode(true)}
                className="flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 bg-white hover:bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-lg shadow-sm transition-all"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                Focus Mode
              </button>
            </div>
          )}

          {/* Core Viewing Canvas / Pane Shell */}
          <div className={`relative flex-1 min-h-0 rounded-xl border overflow-hidden ${
            isFocusMode ? "border-zinc-800 bg-white rounded-none border-0" : "border-zinc-200 bg-white shadow-sm"
          }`}>

            {/* Floating Exit Button — Visible ONLY in Focus Mode */}
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
                        
                        {/* Left Pane */}
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

                        {/* Draggable Divider Handle */}
                        <Separator className="relative flex w-2 items-center justify-center bg-white hover:bg-fuchsia-500 active:bg-fuchsia-600 transition-colors cursor-col-resize group z-10">
                        <div className="flex h-7 w-3 items-center justify-center rounded bg-zinc-300 group-hover:bg-fuchsia-600 text-white shadow-sm transition-colors">
                            <GripVertical className="h-3 w-3" />
                        </div>
                        </Separator>

                        {/* Right Pane */}
                        <Panel defaultSize={50} minSize={25} className="h-full min-w-0">
                        <div className="h-full w-full overflow-auto bg-white">
                            <ReadingView
                            selectedPaper={selectedPaper}
                            selectedNote={selectedNote}
                            notes={notes}
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
    </div>
  );
}