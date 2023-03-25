import express from "express"
import { createForm } from '../Controller/forms.js'


const router = express.Router();


router.post("/quoteForm", createForm)


export default router;