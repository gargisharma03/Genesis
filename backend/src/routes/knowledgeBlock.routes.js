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
} from "../controllers/knowledgeBlock.controller.js";

const router = Router({ mergeParams: true });

/* ==========================================
   Block Collection
========================================== */

router
    .route("/")
    .post(
        verifyJWT,
        workspaceMiddleware,
        noteMiddleware,
        createBlock
    )
    .get(
        verifyJWT,
        workspaceMiddleware,
        noteMiddleware,
        getBlocks
    );

/* ==========================================
   Individual Block
========================================== */

router
    .route("/:blockId")
    .patch(
        verifyJWT,
        workspaceMiddleware,
        noteMiddleware,
        knowledgeBlockMiddleware,
        updateBlock
    )
    .delete(
        verifyJWT,
        workspaceMiddleware,
        noteMiddleware,
        knowledgeBlockMiddleware,
        deleteBlock
    );

/* ==========================================
   Move / Resize
========================================== */

router.patch(
    "/:blockId/position",
    verifyJWT,
    workspaceMiddleware,
    noteMiddleware,
    knowledgeBlockMiddleware,
    moveBlock
);

export default router;