import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import WorkspaceHeader from "../../components/Workspace/WorkspaceHeader";
import WorkspaceTabs from "../../components/Workspace/WorkspaceTabs";
import WorkspaceSidebar from "../../components/Workspace/WorkspaceSidebar";
import ReadingView from "../../components/Workspace/ReadingViewer";
import { getRecentWorkspace } from "../../api/workspaceApi"; // Ensure this matches your API requirements
import { getWorkspacePapers } from "../../api/paperApi";

export default function Workspace() {
    const { workspaceId } = useParams();

    const [activeTab, setActiveTab] = useState("reading");
    const [collapsed, setCollapsed] = useState(false);

    const [papers, setPapers] = useState([]);
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [workspace, setWorkspace] = useState(null);
    useEffect(() => {
        console.log("Selected Paper:", selectedPaper);
    }, [selectedPaper]);

    useEffect(() => {
        if (!workspaceId) return;

        fetchWorkspace();
        fetchPapers();
    }, [workspaceId]);

    const fetchWorkspace = async () => {
        try {
            const res = await getRecentWorkspace(workspaceId);
            setWorkspace(res.data.workspace);
        } catch (error) {
            console.error("Error fetching workspace:", error);
        }
    };

    async function fetchPapers() {
        try {
            const res = await getWorkspacePapers(workspaceId);
            const fetchedPapers = res.data.papers || [];
            
            setPapers(fetchedPapers);

            if (fetchedPapers.length > 0) {
                setSelectedPaper(fetchedPapers[0]);
            }
        } catch (err) {
            console.error("Error fetching papers:", err);
        }
    }

    return (
        <div className="flex h-screen overflow-hidden bg-zinc-50">

            {/* Sidebar */}
            <WorkspaceSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                papers={papers}
                selectedPaper={selectedPaper}
                setSelectedPaper={setSelectedPaper}
                refreshPapers={fetchPapers}
            />

            {/* Main Content */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300 ${
                    collapsed ? "ml-20" : "ml-72"
                }`}
            >
                {/* Passed paperCount explicitly */}
                <WorkspaceHeader 
                    workspace={workspace} 
                    paperCount={papers.length} 
                />

                <main className="flex-1 flex flex-col overflow-hidden px-10 py-8">

                    <WorkspaceTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <div className="flex-1 min-h-0 mt-6">

                        {activeTab === "reading" && (
                            <ReadingView
                                selectedPaper={selectedPaper}
                            />
                        )}

                        {activeTab === "manuscript" && (
                            <div className="text-zinc-500 text-lg">
                                Manuscript Editor (Coming Soon)
                            </div>
                        )}

                        {activeTab === "references" && (
                            <div className="text-zinc-500 text-lg">
                                References (Coming Soon)
                            </div>
                        )}

                        {activeTab === "matrix" && (
                            <div className="text-zinc-500 text-lg">
                                Synthesis Matrix (Coming Soon)
                            </div>
                        )}

                    </div>

                </main>

            </div>

        </div>
    );
}