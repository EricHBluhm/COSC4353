import express from "express"
import { getUserInfo, checkHistory } from "../controller/formtest.js";
import quoteSchema from '../schemas/quoteFormSchema.js'
import quoteValidation from '../middleware/formValidate.js'

const router = express.Router();

router.get("/getUserInfo/:ID",quoteValidation(quoteSchema),  getUserInfo) // /server/auth/register
router.get("/checkHistory/:ID", quoteValidation(quoteSchema), checkHistory) // /server/auth/register

export default router