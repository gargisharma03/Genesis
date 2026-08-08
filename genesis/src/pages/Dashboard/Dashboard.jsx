import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, UserPlus } from "lucide-react";
import Greeting from "../../components/Dashboard/Greeting";
import Currentcard from "../../components/Dashboard/Currentcard";
import { getRecentWorkspace } from "../../api/workspaceApi";
import WorkspaceGrid from "./WorkspaceGrid";
import JoinWorkspace from "../Workspace/JoinWorkspace";

export default function Dashboard() {
    const { inviteCode } = useParams();
    const navigate = useNavigate();
    const [workspace, setWorkspace] = useState(null);
    const [manualCode, setManualCode] = useState("");
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        fetchWorkspace();
    }, []);

    const fetchWorkspace = async () => {
        try {
            const res = await getRecentWorkspace();
            setWorkspace(res.data?.workspace || res.data?.data?.workspace);
        } catch (error) {
            console.error("Failed to fetch recent workspace:", error);
        }
    };

    const handleManualSubmit = (e) => {
        e.preventDefault();
        if (manualCode.trim()) {
            navigate(`/join/${manualCode.trim()}`);
            setShowInput(false);
            setManualCode("");
        }
    };

    return (
        <div className="space-y-6">
            {/* Top Action Bar for Manual Code Input */}
            <div className="flex items-center justify-end gap-2">
                {!showInput ? (
                    <button
                        onClick={() => setShowInput(true)}
                        className="flex items-center gap-2 rounded-xl bg-zinc-900 px-3.5 py-2 text-xs font-medium text-white hover:bg-zinc-800 transition-colors"
                    >
                        <UserPlus className="h-4 w-4" />
                        Join with Code
                    </button>
                ) : (
                    <form onSubmit={handleManualSubmit} className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Enter invite code..."
                            value={manualCode}
                            onChange={(e) => setManualCode(e.target.value)}
                            className="rounded-xl border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-fuchsia-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="rounded-xl bg-fuchsia-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-fuchsia-700"
                        >
                            Join
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowInput(false)}
                            className="text-xs text-zinc-500 hover:text-zinc-700"
                        >
                            Cancel
                        </button>
                    </form>
                )}
            </div>

            {/* Embedded URL-based Join Status */}
            {inviteCode && <JoinWorkspace />}

            {/* Main Sections */}
            <Greeting />
            <Currentcard workspace={workspace} />
            <WorkspaceGrid />
        </div>
    );
}