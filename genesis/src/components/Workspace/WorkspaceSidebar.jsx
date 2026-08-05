import { Menu, Settings } from "lucide-react";

import SidebarNavigation from "./SidebarNavigation";
import SidebarPapers from "./SidebarPapers";

export default function WorkspaceSidebar({
    collapsed,
    setCollapsed,
    papers,
    selectedPaper,
    setSelectedPaper,
    refreshPapers,
}) {
    return (
        <aside
            className={`
                fixed
                left-0
                top-0
                h-screen
                bg-white
                border-r
                border-zinc-200
                transition-all
                duration-300
                z-40
                ${collapsed ? "w-20" : "w-72"}
            `}
        >
            {/* Header */}

            <div className="h-20 flex items-center justify-between px-5 border-b border-zinc-200">

                {!collapsed && (

                    <div>

                        <h1 className="text-xl font-bold">
                            GENESIS
                        </h1>

                        <p className="text-xs text-zinc-500">
                            Research OS
                        </p>

                    </div>

                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg hover:bg-zinc-100 transition"
                >
                    <Menu size={20} />
                </button>

            </div>

            {/* Body */}

            <div className="flex flex-col h-[calc(100%-80px)]">
                <div className="flex-1 overflow-y-auto px-3 py-5">

                    <SidebarNavigation
                        collapsed={collapsed}
                    />

                    {!collapsed && (
                        <SidebarPapers
                            collapsed={collapsed}
                            papers={papers}
                            selectedPaper={selectedPaper}
                            setSelectedPaper={setSelectedPaper}
                            refreshPapers={refreshPapers}
                        />
                    )}

                </div>

                {/* Footer */}

                <div className="px-3 pb-5">

                    <button
                        className="
                            w-full
                            flex
                            items-center
                            gap-4
                            rounded-xl
                            px-4
                            py-3
                            hover:bg-zinc-100
                            transition
                        "
                    >
                        <Settings size={20} />

                        {!collapsed && (
                            <span>
                                Workspace Settings
                            </span>
                        )}

                    </button>

                </div>

            </div>

        </aside>
    );
}