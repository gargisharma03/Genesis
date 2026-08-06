import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import workspaceRouter from "./routes/workspace.routes.js";
import paperRouter from "./routes/paper.routes.js";
import noteRouter from "./routes/note.routes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/workspaces", workspaceRouter);
app.use("/api/workspaces/:workspaceId/papers", paperRouter);
app.use(
    "/api/workspaces/:workspaceId/notes",
    noteRouter
);

export { app };