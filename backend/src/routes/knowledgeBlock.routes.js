import { Router } from "express";

import verifyJWT from "../middlewares/auth.middleware.js";
import workspaceMiddleware from "../middlewares/workspace.middleware.js";
import noteMiddleware from "../middlewares/note.middleware.js";
import knowledgeBlockMiddleware from "../middlewares/knowledgeBlock.middleware.js";

import {
    createBlock,
    getBlocks,
    updateBlock,
    moveBlock,
    deleteBlock,
    batchUpdateBlocks,
    duplicateBlock,
} from "../controllers/knowledgeBlock.controller.js";

// mergeParams: true allows access to :workspaceId and :noteId from parent routers
const router = Router({ mergeParams: true });

/* =====================================================
   Global Router Middlewares
   (Executes once for all block endpoints)
===================================================== */
router.use(verifyJWT, workspaceMiddleware, noteMiddleware);

/* =====================================================
   Block Collection Operations
   Base path: /api/workspaces/:workspaceId/notes/:noteId/blocks
===================================================== */

router
    .route("/")
    .post(createBlock)
    .get(getBlocks)
    .patch(batchUpdateBlocks); // Batch update for multi-select canvas moves/resizes

/* =====================================================
   Individual Block Operations
   Path: /api/workspaces/:workspaceId/notes/:noteId/blocks/:blockId
===================================================== */

router
    .route("/:blockId")
    .patch(knowledgeBlockMiddleware, updateBlock)
    .delete(knowledgeBlockMiddleware, deleteBlock);

// Lightweight endpoint specifically for real-time drag/resize coordinates (x, y, z, width, height)
router.patch(
    "/:blockId/position",
    knowledgeBlockMiddleware,
    moveBlock
);

// Duplicate / Clone Block
router.post(
    "/:blockId/duplicate",
    knowledgeBlockMiddleware,
    duplicateBlock
);

export default router;