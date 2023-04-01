import express from "express"
const router = express.Router();
//const DataPlaceholder = require("./placeHolder.json")

router.route('/').get( async (req,res) => {

    let {email} = req.body;
    const fuelQuotes = await quoteInfoSchema.find({email:email})

   // fuelQuotes[0].id

    res.json(fuelQuotes)
})

// router.route('/').get((req,res) => {  
//     res.sendStatus(200)
// })

export default router