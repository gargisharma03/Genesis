import { useState } from "react";

import WorkspaceHeader from "../../components/Workspace/WorkspaceHeader";
import WorkspaceTabs from "../../components/Workspace/WorkspaceTabs";
import ReadingView from "../../components/Workspace/ReadingViewer";

export default function Workspace() {
    const [activeTab, setActiveTab] = useState("reading");

    return (
        <div className="px-10 py-8">

            <WorkspaceHeader />

            <WorkspaceTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {activeTab === "reading" && (
                <ReadingView />
            )}

            {activeTab === "manuscript" && (
                <div className="mt-8 text-zinc-400">
                    Manuscript Editor (Coming Soon)
                </div>
            )}

            {activeTab === "references" && (
                <div className="mt-8 text-zinc-400">
                    References (Coming Soon)
                </div>
            )}

            {activeTab === "matrix" && (
                <div className="mt-8 text-zinc-400">
                    Synthesis Matrix (Coming Soon)
                </div>
            )}

        </div>
    );
}