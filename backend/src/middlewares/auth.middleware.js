import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authMiddleware= async(req,res,next)=> {
    try {
        const authHeader= req.Headers.authorization;
        if(!authHeader || !authHeader.startswith('Bearer ')) {
            return res.json({
                message: 'authorization header missing or invalid',
            })
         }

        const token =authHeader.split(' ')[1];
        const decoded=jwt.verify(token, process.env.JWT_SECRET);

        const user= await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found.",
            });
        }

            // Attach user to request
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token.",
        });
    }
};