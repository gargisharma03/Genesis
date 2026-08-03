import express from "express";

import {
  createWorkspace,
  getUserWorkspaces,
  getRecentWorkspace,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from "../controllers/workspace.controller.js";

import {
  authMiddleware,
  workspaceMiddleware,
} from "../middlewares/index.js";

const router = express.Router();

router.post("/", authMiddleware, createWorkspace);

router.get("/", authMiddleware, getUserWorkspaces);

// ⭐ Must come BEFORE "/:workspaceId"
router.get("/recent", authMiddleware, getRecentWorkspace);

router.get(
  "/:workspaceId",
  authMiddleware,
  workspaceMiddleware,
  getWorkspace
);

router.patch(
  "/:workspaceId",
  authMiddleware,
  workspaceMiddleware,
  updateWorkspace
);

router.delete(
  "/:workspaceId",
  authMiddleware,
  workspaceMiddleware,
  deleteWorkspace
);

export default router;