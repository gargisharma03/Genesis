import { Router } from "express";

import {
    createNote,
    getWorkspaceNotes,
    getNote,
    updateNote,
    pinNote,
    archiveNote,
    deleteNote,
} from "../controllers/note.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import workspaceMiddleware from "../middlewares/workspace.middleware.js";
import { noteMiddleware } from "../middlewares/note.middleware.js";
import knowledgeBlockRoutes from "./knowledgeblock.routes.js";

const router = Router({mergeParams: true});

/* =====================================================
   Workspace Routes
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
        getWorkspaceNotes
    );

/* =====================================================
   Note Routes
===================================================== */

router
    .route("/:noteId")
    .get(
        authMiddleware,
        noteMiddleware,
        getNote
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

router.patch(
    "/:noteId/pin",
    authMiddleware,
    noteMiddleware,
    pinNote
);

router.patch(
    "/:noteId/archive",
    authMiddleware,
    noteMiddleware,
    archiveNote
);

router.use(
    "/:noteId/blocks",
    knowledgeBlockRoutes
);

export default router;