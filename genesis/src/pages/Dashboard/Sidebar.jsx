import { useState } from "react";
import {
    Menu,
    LayoutDashboard,
    FileText,
    FolderOpen,
    NotebookPen,
    Bot,
    Settings
} from "lucide-react";
import { useAuth } from "../../contexts/authcontext";

const menu = [
    { title: "Workspace", icon: LayoutDashboard },
    { title: "Papers", icon: FileText },
    { title: "Collections", icon: FolderOpen },
    { title: "AI Assistant", icon: Bot },
    { title: "Notes", icon: NotebookPen },
];

export default function Sidebar({ collapsed, setCollapsed }) {
    const { user, loading } = useAuth();
    const [active, setActive] = useState("Workspace");

    return (
        <aside
            className={`
                fixed left-0 top-0 h-screen ${collapsed ? "bg-white" : " bg-fuchsia-100"} border-r border-zinc-200
                transition-all duration-300 z-50
                ${collapsed ? "w-20" : "w-64"}
            `}
        >
            <div className="h-20 flex items-center justify-between px-5">
                {!collapsed && (
                    <div>
                        <h1 className="text-xl font-bold">GENESIS</h1>
                        <p className="text-xs text-zinc-500">Research OS</p>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg hover:bg-zinc-100"
                >
                    <Menu size={20} />
                </button>
            </div>

            <nav className="px-3 mt-5">
                {menu.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.title;

                    return (
                        <button
                            key={item.title}
                            title={collapsed ? item.title : undefined}
                            onClick={() => setActive(item.title)}
                            className={`
                                w-full mb-2 rounded-xl flex items-center gap-4 px-4 py-3
                                transition
                                ${collapsed ? "justify-center" : "justify-start"}
                                ${isActive ? "bg-fuchsia-500 text-white" : "hover:bg-zinc-100 text-zinc-700"}
                            `}
                        >
                            <Icon size={20} />
                            {!collapsed && <span>{item.title}</span>}
                        </button>
                    );
                })}
            </nav>

            <div className="absolute bottom-6 w-full px-3">
                <button
                    title={collapsed ? "Settings" : undefined}
                    className={`w-full rounded-xl px-4 py-3 flex items-center gap-4 hover:bg-zinc-100 ${collapsed ? "justify-center" : ""}`}
                >
                    <Settings size={20} />
                    {!collapsed && "Settings"}
                </button>

                <div className={`mt-4 flex items-center gap-3 px-4 ${collapsed ? "justify-center px-0" : ""}`}>
                    <div
                        className="h-10 w-10 rounded-full text-white flex items-center justify-center font-semibold shrink-0"
                        style={{ backgroundColor: user?.avatarColor || "#4F46E5" }}
                    >
                        {loading ? "..." : user?.initials}
                    </div>
                    {!collapsed && (
                        <div>
                            <h4 className="font-medium">{user?.username}</h4>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}