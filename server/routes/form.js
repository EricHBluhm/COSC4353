import express from "express"
import { createForm, getUserInfo, checkHistory } from '../controller/forms.js'
import quoteSchema from '../schemas/quoteFormSchema.js'
import quoteValidation from '../middleware/formValidate.js'


const router = express.Router();


router.post("/quoteForm", quoteValidation(quoteSchema), createForm)
router.get("/getUserInfo/:ID", getUserInfo)
router.get("/checkHistory/:ID", checkHistory)

export default router;
