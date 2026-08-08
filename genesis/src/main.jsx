import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Layout from "./Landinglayout.jsx";
import AppLayout from "./Dashboardlayout.jsx";

import Landing from "./pages/Landing/Landing.jsx";
import SignIn from "./pages/Signin/SignIn.jsx";
import Login from "./pages/Signin/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Workspace from "./pages/Workspace/workspace.jsx";
import WorkspaceLayout from "./WorkspaceLayout.jsx";
import JoinWorkspace from "./pages/Workspace/JoinWorkspace.jsx";

import { AuthProvider } from "./contexts/authcontext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/register",
        element: <SignIn />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/join/:inviteCode",
        element: <JoinWorkspace />,
      },
    ],
  },
  {
    element: <WorkspaceLayout />,
    children: [
      {
        path: "/workspaces/:workspaceId",
        element: <Workspace />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);