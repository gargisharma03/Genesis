import Paper from "../models/paper.model.js";
import Workspace from "../models/workspace.model.js";
import uploadToCloudinary from "../utils/uploadtocloudinary.js"

/* =====================================================
   Upload Paper
===================================================== */



export const uploadPaper = async (req, res) => {
  try {
    console.log("========== UPLOAD ==========");
    console.log("Body:", req.body);
    console.log("File:", req.file);
    console.log("===========================");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file not received.",
      });
    }

    const {
      title,
      authors,
      abstract,
      publication,
      year,
      doi,
      keywords,
      language,
    } = req.body;

    const workspace = req.workspace;

    console.log("1️⃣ Controller reached");

    console.log("2️⃣ About to upload to Cloudinary...");

    const result = await uploadToCloudinary(req.file.buffer);

    console.log("3️⃣ Cloudinary upload successful");
    console.log(result);

    console.log("4️⃣ About to create Paper document...");

    const paper = await Paper.create({
      workspace: workspace._id,
      uploadedBy: req.user._id,

      title,
      authors: authors || [],
      abstract: abstract || "",
      publication: publication || "",
      year: year || undefined,
      doi: doi || "",
      keywords: keywords || [],
      language: language || "English",

      pdfUrl: result.secure_url,
      pdfPublicId: result.public_id,

      status: "uploading",
    });

    console.log("5️⃣ Paper created successfully");
    console.log(paper._id);

    workspace.lastActivityAt = new Date();

    console.log("6️⃣ Updating workspace...");

    await workspace.save();

    console.log("7️⃣ Workspace updated");

    return res.status(201).json({
      success: true,
      paper,
    });

  } catch (error) {
    console.error("========== UPLOAD ERROR ==========");
    console.error(error);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("==================================");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   Get All Papers of Workspace
===================================================== */

export const getWorkspacePapers = async (req, res) => {
  try {
    const papers = await Paper.find({
      workspace: req.workspace._id,
      isArchived: false,
    })
      .sort({ updatedAt: -1 })
      .populate("uploadedBy", "username name avatar");

    return res.status(200).json({
      success: true,
      count: papers.length,
      papers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   Get Single Paper
===================================================== */

export const getPaper = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.paperId)
      .populate("uploadedBy", "username name avatar")
      .populate("workspace", "name icon");

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    res.status(200).json({
      success: true,
      paper,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   Update Paper Metadata
===================================================== */

export const updatePaper = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.paperId);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    const {
      title,
      authors,
      abstract,
      publication,
      year,
      doi,
      keywords,
      language,
    } = req.body;

    if (title !== undefined) paper.title = title;
    if (authors !== undefined) paper.authors = authors;
    if (abstract !== undefined) paper.abstract = abstract;
    if (publication !== undefined) paper.publication = publication;
    if (year !== undefined) paper.year = year;
    if (doi !== undefined) paper.doi = doi;
    if (keywords !== undefined) paper.keywords = keywords;
    if (language !== undefined) paper.language = language;

    await paper.save();

    res.status(200).json({
      success: true,
      paper,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   Archive Paper
===================================================== */

export const archivePaper = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.paperId);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    paper.isArchived = true;

    await paper.save();

    res.status(200).json({
      success: true,
      message: "Paper archived successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   Restore Paper
===================================================== */

export const restorePaper = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.paperId);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    paper.isArchived = false;

    await paper.save();

    res.status(200).json({
      success: true,
      message: "Paper restored successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   Favorite / Unfavorite Paper
===================================================== */

export const favoritePaper = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.paperId);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    paper.isFavorite = !paper.isFavorite;

    await paper.save();

    res.status(200).json({
      success: true,
      paper,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   Open Paper
===================================================== */

export const openPaper = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.paperId);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    paper.lastOpenedAt = new Date();

    await paper.save();

    res.status(200).json({
      success: true,
      paper,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   Delete Paper
===================================================== */

export const deletePaper = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.paperId);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    await paper.deleteOne();

    res.status(200).json({
      success: true,
      message: "Paper deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};