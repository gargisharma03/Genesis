import express from "express";

import {
  uploadPaper,
  addPaperViaLink, // 👈 Added controller import
  getWorkspacePapers,
  getPaper,
  updatePaper,
  archivePaper,
  restorePaper,
  favoritePaper,
  openPaper,
  deletePaper,
  proxyArxivPdf
} from "../controllers/paper.controller.js";

import {
  authMiddleware,
  workspaceMiddleware,
  paperMiddleware,
  uploadMiddleware,
} from "../middlewares/index.js";

const router = express.Router({
  mergeParams: true,
});



/* ==========================================
   Global Middlewares
========================================== */

router.use(authMiddleware);

router.use(workspaceMiddleware);

/* ==========================================
   Paper Routes
========================================== */

// Upload a paper (File Upload)
// POST /api/workspaces/:workspaceId/papers
router.post(
  "/",
  uploadMiddleware.single("pdf"), // Must match the FormData field name
  uploadPaper
);

// Add a paper via Link / URL / DOI
// POST /api/workspaces/:workspaceId/papers/link
router.post(
  "/link",
  addPaperViaLink // 👈 New route handler
);

// Get all papers in a workspace
// GET /api/workspaces/:workspaceId/papers
router.get(
  "/",
  getWorkspacePapers
);

// Get one paper
// GET /api/workspaces/:workspaceId/papers/:paperId
router.get(
  "/:paperId",
  paperMiddleware,
  getPaper
);

// Update paper metadata
// PATCH /api/workspaces/:workspaceId/papers/:paperId
router.patch(
  "/:paperId",
  paperMiddleware,
  updatePaper
);

// Archive paper
// PATCH /api/workspaces/:workspaceId/papers/:paperId/archive
router.patch(
  "/:paperId/archive",
  paperMiddleware,
  archivePaper
);

// Restore archived paper
// PATCH /api/workspaces/:workspaceId/papers/:paperId/restore
router.patch(
  "/:paperId/restore",
  paperMiddleware,
  restorePaper
);

// Mark / Unmark favorite
// PATCH /api/workspaces/:workspaceId/papers/:paperId/favorite
router.patch(
  "/:paperId/favorite",
  paperMiddleware,
  favoritePaper
);

// Update last opened time
// PATCH /api/workspaces/:workspaceId/papers/:paperId/open
router.patch(
  "/:paperId/open",
  paperMiddleware,
  openPaper
);

// Delete paper
// DELETE /api/workspaces/:workspaceId/papers/:paperId
router.delete(
  "/:paperId",
  paperMiddleware,
  deletePaper
);

export default router;