import express from "express";

import {
  createWorkspace,
  getUserWorkspaces,
  getRecentWorkspace,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
  generateInviteLink,
  joinWorkspaceViaInvite,
} from "../controllers/workspace.controller.js";

import {
  authMiddleware,
  workspaceMiddleware,
} from "../middlewares/index.js";

const router = express.Router();

router.post("/", authMiddleware, createWorkspace);

router.get("/", authMiddleware, getUserWorkspaces);


router.get("/recent", authMiddleware, getRecentWorkspace);

router.post("/join/:inviteCode", authMiddleware, joinWorkspaceViaInvite);

// Generate invite link for a workspace
router.post(
  "/:workspaceId/invite",
  authMiddleware,
  workspaceMiddleware,
  generateInviteLink
);

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