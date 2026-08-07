import { Router } from "express";

import {
    createNote,
    getWorkspaceNotes,
    getPaperNotes,
    getNote,
    updateNote,
    pinNote,
    archiveNote,
    deleteNote,
    getOrCreateBoard,
} from "../controllers/note.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import workspaceMiddleware from "../middlewares/workspace.middleware.js";
import noteMiddleware from "../middlewares/note.middleware.js";
import knowledgeBlockRoutes from "./knowledgeBlock.routes.js";

const router = Router({ mergeParams: true });

/* =====================================================
   Root Collection Routes
===================================================== */

router
    .route("/")
    .post(
        authMiddleware,
        workspaceMiddleware,
        createNote
    )
    .get(
        authMiddleware,
        workspaceMiddleware,
        (req, res, next) => {
            // Smart router dispatch based on mount path
            if (req.params.paperId) {
                return getPaperNotes(req, res, next);
            }
            return getWorkspaceNotes(req, res, next);
        }
    );

/* =====================================================
   PDF Reading Mode Canvas Sync
   Path: GET /api/workspaces/:workspaceId/papers/:paperId/notes/board
===================================================== */
router.get(
    "/board",
    authMiddleware,
    workspaceMiddleware,
    getOrCreateBoard
);

/* =====================================================
   Individual Note Routes
   Path: /:noteId
===================================================== */
router
    .route("/:noteId")
    .get(
        authMiddleware,
        noteMiddleware,
        getNote
    )
    .put(
        authMiddleware,
        noteMiddleware,
        updateNote
    )
    .patch(
        authMiddleware,
        noteMiddleware,
        updateNote
    )
    .delete(
        authMiddleware,
        noteMiddleware,
        deleteNote
    );

router.patch("/:noteId/pin", authMiddleware, noteMiddleware, pinNote);
router.patch("/:noteId/archive", authMiddleware, noteMiddleware, archiveNote);

/* =====================================================
   Nested Knowledge Block Sub-router
===================================================== */
router.use("/:noteId/blocks", knowledgeBlockRoutes);

export default router;