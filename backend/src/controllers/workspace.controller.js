import Workspace from "../models/workspace.model.js";
import User from "../models/user.model.js";
import crypto from "crypto";

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
  try {
    // If middleware already set req.workspace, ensure it is populated and returned properly
    if (req.workspace) {
      return res.status(200).json({
        success: true,
        workspace: req.workspace,
      });
    }

    const workspace = await Workspace.findById(req.params.workspaceId || req.params.id)
      .populate("owner", "name email")
      .populate("members.user", "name avatar avatarColor");

    if (!workspace) {
      return res.status(404).json({ success: false, message: "Workspace not found" });
    }

    res.status(200).json({
      success: true,
      workspace,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
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

// ✅ FIX 1: Allow members (not just owners) to fetch recent workspace
export const getRecentWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findOne({
      "members.user": req.user._id, // 👈 Match if user is an owner OR a member
      isArchived: false,
    })
      .sort({ updatedAt: -1 })
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

export const generateInviteLink = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    let workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ success: false, message: "Workspace not found" });
    }

    if (!workspace.inviteCode) {
      workspace.inviteCode = crypto.randomBytes(4).toString("hex");
      await workspace.save();
    }

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    const inviteUrl = `${clientUrl}/join/${workspace.inviteCode}`;

    return res.status(200).json({
      success: true,
      inviteUrl,
      inviteCode: workspace.inviteCode,
    });
  } catch (error) {
    console.error("Error generating invite:", error);
    return res.status(500).json({ success: false, message: "Failed to generate invite link" });
  }
};

// ✅ FIX 2: Push new workspace ID to user document when joining
export const joinWorkspaceViaInvite = async (req, res) => {
  try {
    const { inviteCode } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const workspace = await Workspace.findOne({ inviteCode });

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired invite link",
      });
    }

    const isAlreadyMember = workspace.members.some(
      (member) => member.user?.toString() === userId.toString()
    );

    if (isAlreadyMember) {
      return res.status(200).json({
        success: true,
        message: "You are already a member of this workspace",
        workspaceId: workspace._id,
      });
    }

    workspace.members.push({
      user: userId,
      role: "editor",
    });

    await workspace.save();

    // Also link workspace ID inside User document
    await User.findByIdAndUpdate(userId, {
      $addToSet: { workspaces: workspace._id },
      lastWorkspace: workspace._id,
    });

    return res.status(200).json({
      success: true,
      message: "Successfully joined workspace",
      workspaceId: workspace._id,
    });
  } catch (error) {
    console.error("Error joining workspace:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to join workspace",
    });
  }
};