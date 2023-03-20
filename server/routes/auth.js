import express from "express"
import { register,login,userInfo } from "../controllers/auth.js"

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/userInfo",userInfo);

export default router