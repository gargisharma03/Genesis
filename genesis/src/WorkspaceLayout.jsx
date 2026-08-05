import { Outlet } from "react-router-dom";

export default function WorkspaceLayout() {
    return (
        <div className="h-screen bg-zinc-50 overflow-hidden">
            <Outlet />
        </div>
    );
}