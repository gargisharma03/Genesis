import SynthesisMatrixService
  from "../services/matrix/synthesisMatrix.service.js";


export const createMatrix = async (
  req,
  res
) => {
  try {

    const { workspaceId } =
      req.params;

    const { title } = req.body;

    const matrix =
      await SynthesisMatrixService.createMatrix(
        workspaceId,
        req.user._id,
        title
      );

    return res.status(201).json({
      success: true,
      matrix,
    });

  } catch (error) {

    console.error(
      "Create matrix error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getMatrix = async (
  req,
  res
) => {
  try {

    const { workspaceId } =
      req.params;

    const matrix =
      await SynthesisMatrixService.getMatrix(
        workspaceId
      );

    return res.status(200).json({
      success: true,
      matrix,
    });

  } catch (error) {

    console.error(
      "Get matrix error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const addPaperToMatrix = async (
  req,
  res
) => {
  try {

    const {
      workspaceId,
      paperId,
    } = req.params;

    const matrix =
      await SynthesisMatrixService.addPaper(
        workspaceId,
        paperId,
        req.user._id
      );

    return res.status(200).json({
      success: true,
      message:
        "Paper added to synthesis matrix",
      matrix,
    });

  } catch (error) {

    console.error(
      "Add paper to matrix error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};