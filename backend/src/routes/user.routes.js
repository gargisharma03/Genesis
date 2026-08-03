import express from "express";

import {
register,
login,
getCurrentUser
} from "../controllers/auth.controller.js";

import {authMiddleware} from "../middlewares/index.js";

const router=express.Router();

router.post("/register",register);

router.post("/login",login);

router.get("/me", authMiddleware, getCurrentUser);

export default router;