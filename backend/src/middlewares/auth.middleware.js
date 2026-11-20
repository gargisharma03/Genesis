import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    try {
        console.log(req.headers);
        console.log(req.headers.authorization);

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization header missing or invalid",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found.",
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.error("Auth error:", error.name, error.message);

        return res.status(401).json({
            message: "Invalid or expired token.",
        });
    }
};

export default authMiddleware;