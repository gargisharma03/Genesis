import express from "express";

import {
  analyzePaper,
  getPaperAnalysis,
} from "../controllers/paperAnalysis.controller.js";

import { authMiddleware } from "../middlewares/index.js";

const router = express.Router();

router.post(
  "/:paperId/analyze",
  authMiddleware,
  analyzePaper
);

router.get(
  "/:paperId",
  authMiddleware,
  getPaperAnalysis
);

export default router;