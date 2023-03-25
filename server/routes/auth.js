import express from "express"
import { login,register,accInfo } from "../controller/auth.js";
import validate from "../middleware/validate.js";
import regSchema from "../schemas/regSchema.js";
import loginSchema from "../schemas/loginSchema.js";
import accInfoSchema from "../schemas/accInfoSchema.js";

const router = express.Router();

router.post("/register", validate(regSchema), register) // /server/auth/register
router.post("/login",  login) // /server/auth/login
router.post("/accInfo", validate(accInfoSchema), accInfo) // /server/auth/accInfo

export default router



//this goes to localhost:8800/server/auth/test for the endpoint
// router.get("/test", (req,res)=>{ 
//     res.json("this is post")
// })