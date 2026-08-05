import { Link, NavLink, useParams } from "react-router-dom";
import {
    ArrowLeft,
    NotebookPen,
    BookMarked,
} from "lucide-react";

export default function SidebarNavigation({
    collapsed,
}) {
    const { workspaceId } = useParams();

    const menu = [
        {
            title: "Notebook",
            icon: NotebookPen,
            path: `/workspaces/${workspaceId}/notebook`,
        },
        {
            title: "References",
            icon: BookMarked,
            path: `/workspaces/${workspaceId}/references`,
        },
    ];

    return (
        <section>

            {/* Back */}

            <Link
                to="/dashboard"
                className={`
                    flex
                    items-center
                    ${collapsed ? "justify-center" : "gap-3"}
                    rounded-xl
                    px-3
                    py-3
                    text-zinc-600
                    hover:bg-zinc-100
                    hover:text-black
                    transition
                `}
            >
                <ArrowLeft size={18} />

                {!collapsed && (
                    <span className="font-medium">
                        Dashboard
                    </span>
                )}
            </Link>

            {/* Divider */}

            <div className="my-6 border-t border-zinc-200" />

            {/* Workspace */}

            {!collapsed && (
                <p className="mb-3 px-3 text-[11px] uppercase tracking-[0.18em] font-semibold text-zinc-400">
                    Workspace
                </p>
            )}

            <nav className="space-y-2">

                {menu.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.title}
                            to={item.path}
                            className={({ isActive }) =>
                                `
                                flex
                                items-center
                                ${collapsed ? "justify-center" : "gap-4"}
                                rounded-xl
                                px-3
                                py-3
                                transition

                                ${
                                    isActive
                                        ? "bg-black text-white"
                                        : "text-zinc-700 hover:bg-zinc-100"
                                }
                            `
                            }
                        >
                            <Icon size={20} />

                            {!collapsed && (
                                <span>{item.title}</span>
                            )}

                        </NavLink>
                    );
                })}

            </nav>

        </section>
    );
}