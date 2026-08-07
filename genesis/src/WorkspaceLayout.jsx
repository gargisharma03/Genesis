import { Outlet } from "react-router-dom";

export default function WorkspaceLayout() {
    return (
        <div className="h-screen bg-white overflow-hidden">
            <Outlet />
        </div>
    );
}