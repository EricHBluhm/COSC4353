import express from "express";
import data from "./placeHolder.json" assert { type: "json" };
const router = express.Router();

router.route('/').get((req,res) => {
    res.json(data)
})

router.route('/').get((req,res) => {  
    res.sendStatus(200)
})

router.route('/:ID').delete((req,res) => {
    const { ID } = req.params;
    delete data[ID]
    // HERE database queries
    
})

export default router