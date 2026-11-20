import { SynthesisMatrix } from "../../models/synthesismatrix.model.js";
import Paper from "../../models/paper.model.js";
import PaperAnalysis from "../../models/paperanalysis.model.js";

import PaperAnalysisService
  from "../ai/paperAnalysis.service.js";

const DEFAULT_COLUMNS = [
  {
    id: "methodology",
    name: "Methodology",
    description:
      "Research methods and approach used.",
    analysisField: "methodology",
  },

  {
    id: "datasets",
    name: "Dataset",
    description:
      "Datasets or data sources used.",
    analysisField: "datasets",
  },

  {
    id: "results",
    name: "Results",
    description:
      "Main findings and experimental results.",
    analysisField: "results",
  },

  {
    id: "limitations",
    name: "Limitations",
    description:
      "Limitations identified in the paper.",
    analysisField: "limitations",
  },

  {
    id: "researchGap",
    name: "Research Gap",
    description:
      "Unresolved problems or research gaps.",
    analysisField: "researchGap",
  },
];


class SynthesisMatrixService {

  async createMatrix(
    workspaceId,
    userId,
    title = "Literature Synthesis"
  ) {
    const matrix =
      await SynthesisMatrix.create({
        workspace: workspaceId,
        title,
        rows: [],
        columns: DEFAULT_COLUMNS,
        cells: [],
        createdBy: userId,
        lastEditedBy: userId,
      });

    return matrix;
  }


  async getMatrix(workspaceId) {
    const matrix =
      await SynthesisMatrix.findOne({
        workspace: workspaceId,
      })
        .populate("rows")
        .populate("cells.paper")
        .populate("cells.linkedBlocks");

    return matrix;
  }


  async addPaper(
    workspaceId,
    paperId,
    userId
  ) {

    // ---------------------------------------------
    // 1. Verify paper belongs to workspace
    // ---------------------------------------------

    const paper =
      await Paper.findOne({
        _id: paperId,
        workspace: workspaceId,
      });

    if (!paper) {
      throw new Error(
        "Paper not found in this workspace"
      );
    }


    // ---------------------------------------------
    // 2. Get/create matrix
    // ---------------------------------------------

    let matrix =
      await SynthesisMatrix.findOne({
        workspace: workspaceId,
      });

    if (!matrix) {
      matrix =
        await this.createMatrix(
          workspaceId,
          userId
        );
    }


    // ---------------------------------------------
    // 3. Check if paper already exists
    // ---------------------------------------------

    const alreadyAdded =
      matrix.rows.some(
        (row) =>
          row.toString() ===
          paperId.toString()
      );

    if (alreadyAdded) {
      return matrix;
    }


    // ---------------------------------------------
    // 4. Add paper to matrix
    // ---------------------------------------------

    matrix.rows.push(paperId);

    matrix.lastEditedBy = userId;

    await matrix.save();


    // ---------------------------------------------
    // 5. Get or generate analysis
    // ---------------------------------------------

    let analysis =
      await PaperAnalysis.findOne({
        paper: paperId,
      });


    if (
      !analysis ||
      analysis.status !== "completed"
    ) {

      // This will:
      // - process PDF if necessary
      // - extract text
      // - run LLM
      // - save PaperAnalysis

      analysis =
        await PaperAnalysisService.analyzePaper(
          paperId
        );
    }


    // ---------------------------------------------
    // 6. Populate matrix cells
    // ---------------------------------------------

    await this.populateCells(
      matrix,
      paperId,
      analysis,
      userId
    );


    return matrix;
  }


  async populateCells(
    matrix,
    paperId,
    analysis,
    userId
  ) {

    for (
      const column of matrix.columns
    ) {

      if (!column.analysisField) {
        continue;
      }

      const value =
        analysis[column.analysisField];

      if (
        value === undefined ||
        value === null
      ) {
        continue;
      }


      // Convert arrays into readable text
      const observation =
        Array.isArray(value)
          ? value.join("\n• ")
          : String(value);


      const existingCell =
        matrix.cells.find(
          (cell) =>
            cell.paper.toString() ===
              paperId.toString() &&
            cell.columnId === column.id
        );


      if (existingCell) {

        // Don't overwrite researcher edits
        if (
          existingCell.source === "manual"
        ) {
          continue;
        }

        existingCell.observation =
          observation;

        existingCell.source = "ai";

        existingCell.lastEditedBy =
          userId;

        existingCell.lastEditedAt =
          new Date();

      } else {

        matrix.cells.push({
          paper: paperId,
          columnId: column.id,
          observation,
          source: "ai",
          linkedBlocks: [],
          lastEditedBy: userId,
          lastEditedAt: new Date(),
        });
      }
    }

    matrix.lastEditedBy = userId;

    await matrix.save();
  }
}


export default new SynthesisMatrixService();