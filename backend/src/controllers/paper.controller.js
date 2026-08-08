import Paper from "../models/paper.model.js";
import Workspace from "../models/workspace.model.js";
import uploadToCloudinary from "../utils/uploadtocloudinary.js"

/* =====================================================
   Upload Paper
===================================================== */

import slugify from "slugify";

export const proxyArxivPdf = async (req, res) => {
  try {
    const { arxivId } = req.params;

    // Validate arXiv ID format (e.g., 2402.06196 or old format physics/0307015)
    if (!arxivId || !/^[a-zA-Z.-]+\/\d{7}$|^\d{4}\.\d{4,5}(v\d+)?$/.test(arxivId)) {
      return res.status(400).json({ message: "Invalid arXiv ID format" });
    }

    const arxivPdfUrl = `https://arxiv.org/pdf/${arxivId}.pdf`;

    const response = await fetch(arxivPdfUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "Failed to fetch PDF from arXiv" });
    }

    // Set standard PDF headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${arxivId}.pdf"`);

    // Stream the PDF arrayBuffer to res (Node 18+)
    const arrayBuffer = await response.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error("Error proxying arXiv PDF:", error);
    return res.status(500).json({ message: "Internal server error fetching PDF" });
  }
};

export const addPaperViaLink = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { url, title, authors } = req.body;
    const userId = req.user._id;

    if (!url) {
      return res.status(400).json({ success: false, message: "URL is required" });
    }

    // Determine source enum from URL
    let source = "url";
    if (url.includes("arxiv.org")) source = "arxiv";
    else if (url.includes("doi.org")) source = "doi";

    // Fallback title generation if not provided
    const fallbackTitle = url.split("/").pop().replace(/\.pdf$/i, "") || "Untitled Research Paper";
    const paperTitle = title || fallbackTitle;

    // Generate unique slug
    const generatedSlug = slugify(paperTitle, { lower: true, strict: true }) + "-" + Date.now().toString().slice(-4);

    const paper = await Paper.create({
      workspace: workspaceId,
      uploadedBy: userId,
      title: paperTitle,
      authors: Array.isArray(authors) ? authors : authors ? [authors] : [],
      pdfUrl: url,
      pdfPublicId: `link_${Date.now()}`, // Satisfies required pdfPublicId schema constraint
      source,
      status: "ready", // Must be one of ["uploading", "processing", "ready", "failed", "archived"]
      slug: generatedSlug,
    });

    // Update workspace timestamp
    await Workspace.findByIdAndUpdate(workspaceId, { lastActivityAt: new Date() });

    return res.status(201).json({
      success: true,
      message: "Paper added via link successfully",
      paper,
    });
  } catch (error) {
    console.error("Error adding paper via link:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to add paper via link",
    });
  }
};


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