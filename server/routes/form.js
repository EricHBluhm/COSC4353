import express from "express"
import { createForm } from '../controller/forms.js'
import quoteSchema from '../Validation/quoteFormSchema.js'
import quoteValidation from '../middleware/formValidate.js'


const router = express.Router();


router.post("/quoteForm", quoteValidation(quoteSchema), createForm)


export default router;
