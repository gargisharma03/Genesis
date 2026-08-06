import KnowledgeBlock from "../models/knowledgeBlock.model.js";

const knowledgeBlockMiddleware = async (req, res, next) => {
    try {

        const { blockId } = req.params;

        const block = await KnowledgeBlock.findById(blockId);

        if (!block) {
            return res.status(404).json({
                success: false,
                message: "Knowledge block not found.",
            });
        }

        // Ensure the block belongs to the current workspace
        if (block.workspace.toString() !== req.workspace._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Block does not belong to this workspace.",
            });
        }

        req.block = block;

        next();

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export default knowledgeBlockMiddleware;