const express = require("express")
const router = express.Router();
const DataPlaceholder = require("./placeHolder.json")

router.route('/').get((req,res) => {
    res.json(DataPlaceholder)
})

router.route('/').get((req,res) => {  
    res.sendStatus(200)
})

module.exports = router