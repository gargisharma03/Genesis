import Workspace from "../models/workspace.model.js";

const workspaceMiddleware= async (req,res,next)=> {
    try {
        const workspaceId=req.params;
        const workspace= await Workspace.findById(workspaceId);

        if(!workspace){
            return res.status(404).json({
                message:"Workspace not found"
            })
        }

        const member=workspace.members.find(
            (member)=> member.user.toString()===req.user._id.tostring()
        );

        if(!member){
            return res.status(403).json({
                message:"Not a member"
            })
        }

        req.workspace=workspace;
        req.workspacerole=member.role();
        next();
    } catch (err) {
        return res.status(500).json({
            message:"server error",
        })
    }
}