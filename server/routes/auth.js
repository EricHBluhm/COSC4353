import express from "express"
import { login,register,accInfo } from "../controller/auth.js";

const router = express.Router();

router.post("/register", register) // /server/auth/register
router.post("/login", login) // /server/auth/login
router.post("/accInfo", accInfo) // /server/auth/accInfo

export default router



//this goes to localhost:8800/server/auth/test for the endpoint
// router.get("/test", (req,res)=>{ 
//     res.json("this is post")
// })