import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const signin = async(req,res)=>{

    const {username,email,password}=req.body;

    const userExists=await User.findOne({email});

    if(userExists){
        return res.status(400).json({
            message:"User already exists"
        });
    }

    const user=await User.create({
        username,
        email,
        password
    });

    const token=generateToken(user._id);

    res.status(201).json({
        token,
        user
    });

}

export const login=async(req,res)=>{

    const {email,password}=req.body;

    const user=await User.findOne({email});

    if(!user){
        return res.status(404).json({
            message:"User not found"
        });
    }

    const isMatch=await user.matchPassword(password);

    if(!isMatch){
        return res.status(401).json({
            message:"Invalid credentials"
        });
    }

    const token=generateToken(user._id);

    res.json({
        token,
        user
    });

}