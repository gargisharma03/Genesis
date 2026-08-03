import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./pages/Dashboard/Sidebar";
import Navbar from "./pages/Dashboard/Navbar";

export default function AppLayout() {

    const [collapsed, setCollapsed] = useState(true);

    return (

        <div className="h-screen bg-zinc-50 flex overflow-hidden">

            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <div
                className={`
                    flex flex-col flex-1
                    transition-all duration-300
                    ${collapsed ? "ml-20" : "ml-72"}
                `}
            >

                <Navbar />

                <main className="flex-1 overflow-y-auto p-8">

                    <Outlet />

                </main>

            </div>

        </div>

    );
}