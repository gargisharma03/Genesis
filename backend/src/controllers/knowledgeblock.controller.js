import KnowledgeBlock from "../models/knowledgeBlock.model.js";

/* =====================================================
   Create Block
===================================================== */

export const createBlock = async (req, res) => {
    try {
        const {
            type,
            title,
            content,
            position,
            size,
            style,
            linkedPaper,
            linkedPage,
            linkedAnnotation,
            linkedCitation,
            linkedAnalysis,
            tags,
        } = req.body;

        if (!type) {
            return res.status(400).json({
                success: false,
                message: "Block type is required.",
            });
        }

        const block = await KnowledgeBlock.create({
            note: req.note._id,
            workspace: req.workspace._id,

            createdBy: req.user._id,
            lastEditedBy: req.user._id,

            type,
            title,
            content,

            position,
            size,
            style,

            linkedPaper,
            linkedPage,
            linkedAnnotation,
            linkedCitation,
            linkedAnalysis,

            tags,
        });

        return res.status(201).json({
            success: true,
            block,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


/* =====================================================
   Get All Blocks
===================================================== */

export const getBlocks = async (req, res) => {
    try {

        const blocks = await KnowledgeBlock.find({
            note: req.note._id,
        })
            .populate("createdBy", "name username")
            .populate("linkedPaper", "title")
            .sort({
                "position.z": 1,
                createdAt: 1,
            });

        return res.status(200).json({
            success: true,
            count: blocks.length,
            blocks,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


/* =====================================================
   Update Block
===================================================== */

export const updateBlock = async (req, res) => {
    try {

        const block = req.block;

        const {
            title,
            content,
            style,
            tags,
            linkedPaper,
            linkedAnnotation,
            linkedCitation,
            linkedAnalysis,
        } = req.body;

        if (title !== undefined)
            block.title = title;

        if (content !== undefined)
            block.content = content;

        if (style !== undefined)
            block.style = style;

        if (tags !== undefined)
            block.tags = tags;

        if (linkedPaper !== undefined)
            block.linkedPaper = linkedPaper;

        if (linkedAnnotation !== undefined)
            block.linkedAnnotation = linkedAnnotation;

        if (linkedCitation !== undefined)
            block.linkedCitation = linkedCitation;

        if (linkedAnalysis !== undefined)
            block.linkedAnalysis = linkedAnalysis;

        await block.save();

        return res.status(200).json({
            success: true,
            block,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


/* =====================================================
   Move / Resize Block
===================================================== */

export const moveBlock = async (req, res) => {

    try {

        const block = req.block;

        const {
            position,
            size,
        } = req.body;

        if (position)
            block.position = position;

        if (size)
            block.size = size;

        await block.save();

        return res.status(200).json({
            success: true,
            block,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


/* =====================================================
   Delete Block
===================================================== */

export const deleteBlock = async (req, res) => {

    try {

        await req.block.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Block deleted successfully.",
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};