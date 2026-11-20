import express from "express";

import {
  createMatrix,
  getMatrix,
  addPaperToMatrix,
} from "../controllers/synthesisMatrix.controller.js";

import { authMiddleware } from "../middlewares/index.js";

const router = express.Router();

router.post(
  "/:workspaceId",
  authMiddleware,
  createMatrix
);

router.get(
  "/:workspaceId",
  authMiddleware,
  getMatrix
);

router.post(
  "/:workspaceId/papers/:paperId",
  authMiddleware,
  addPaperToMatrix
);

export default router;