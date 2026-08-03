import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const register = async(req,res)=>{

    const {username,name,email,password}=req.body;

    const userExists=await User.findOne({email});

    if(userExists){
        return res.status(400).json({
            message:"User already exists"
        });
    }

    const user=await User.create({
        username,
        name,
        email,
        password
    });

    const token=generateToken(user._id);

    res.status(201).json({
        token,
        user: user.getPublicProfile(),
    });

}

export const login=async(req,res)=>{
    console.log("BODY:", req.body);

    const { email, password } = req.body;

    console.log("EMAIL:", email);

    const user = await User.findOne({ email }).select("+password");

    console.log("USER:", user);


    if(!user){
        return res.status(404).json({
            message:"User not found"
        });
    }

    const isMatch=await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({
            message:"Invalid credentials"
        });
    }

    const token=generateToken(user._id);

    res.json({
        token,
        user: user.getPublicProfile(),
    });

}

export const getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
    lastWorkspace: req.user.lastWorkspace,
  });
};