import express from "express"
import { getUserInfo, checkHistory } from "../controller/formtest.js";
import quoteSchema from '../schemas/quoteFormSchema.js'
import quoteValidation from '../middleware/formValidate.js'

const router = express.Router();

router.get("/getUserInfo/:ID",  getUserInfo) // /server/auth/register
router.get("/checkHistory/:ID",  checkHistory) // /server/auth/register

export default router