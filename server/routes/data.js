import express from "express"
const router = express.Router();
//const DataPlaceholder = require("./placeHolder.json")

router.route('/').get((req,res) => {
    res.json(require("./placeHolder.json"))
})

router.route('/').get((req,res) => {  
    res.sendStatus(200)
})

export default router