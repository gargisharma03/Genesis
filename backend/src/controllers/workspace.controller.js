import Workspace from "../models/workspace.model.js";
import User from "../models/user.model.js";

export const createWorkspace = async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    const slug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

    const workspace = await Workspace.create({
      name,
      description,
      icon,
      slug,
      owner: req.user._id,
      members: [
        {
          user: req.user._id,
          role: "owner",
        },
      ],
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        workspaces: workspace._id,
      },
      lastWorkspace: workspace._id,
    });

    res.status(201).json({
      success: true,
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      "members.user": req.user._id,
    }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      workspaces,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWorkspace = async (req, res) => {
  res.status(200).json({
    success: true,
    workspace: req.workspace,
  });
};

export const updateWorkspace = async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    if (name) req.workspace.name = name;
    if (description !== undefined) req.workspace.description = description;
    if (icon) req.workspace.icon = icon;

    await req.workspace.save();

    res.status(200).json({
      success: true,
      workspace: req.workspace,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRecentWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findOne({
      owner: req.user._id,
      isArchived: false,
    })
      .sort({ lastActivityAt: -1 })
      .populate("members.user", "name avatar avatarColor");

    return res.status(200).json({
      success: true,
      workspace,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteWorkspace = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        workspaces: req.workspace._id,
      },
    });

    await req.workspace.deleteOne();

    res.status(200).json({
      success: true,
      message: "Workspace deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};