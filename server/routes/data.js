import express from "express";
//import data from "./placeHolder.json" assert { type: "json" };
import mongoose from "mongoose"
import db from "../app.js"
const router = express.Router();
import Quote from "../models/quote.js"

router.route('/:ID').get( async (req,res) => {
    let { ID } = req.params
    ID = ID.substring(1)
    let quotes = []
   console.log(ID)
    quotes = await Quote.find({email:ID})

    // mongoose.connection.db.collection('quotes')
    //     .find({ email: id }, { realPrice:1, suggPrice: 1, deliveryDate: 1, address: 1, gallonsRequested:1 })
    //     .sort({ deliveryDate : 1})
    //     .forEach(quote => quotes.push(quote))
    //     .then(() => {
    //         res.status(200).json(books)
    //     })
    //     .catch(() => {
    //         res.status(500).json({error: 'Could not fetch the documents'})
    //     })
        
        // res.json({mssg: 'welcome to the api'})

    res.status(201);
    return res.json(quotes); //return saved user to frontend
})

// router.route('/:ID').delete((req,res) => {
//     const { id } = req.params.ID
    
//     mongoose.connection.db.collection('quotes')
//         .deleteOne({ email: id })
//         .then(() => {
//             res.status(200).json(books)
//         })
//         .catch(() => {
//             res.status(500).json({error: 'Could not delete the documents'})
//         })
        
//         // res.json({mssg: 'welcome to the api'})
// })

export default router
