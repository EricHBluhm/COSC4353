import express from "express";
//import data from "./placeHolder.json" assert { type: "json" };
import mongoose from "mongoose"
const router = express.Router();

router.route('/:ID').get((req,res) => {
    const { id } = req.params.ID
    let quotes = []
    
    mongoose.connection.db.collection('quotes')
        .find({ email: id }, { realPrice:1, suggPrice: 1, deliveryDate: 1, address: 1, gallonsRequested:1 })
        .sort({ deliveryDate : 1})
        .forEach(quote => quotes.push(quote))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch the documents'})
        })
        
        // res.json({mssg: 'welcome to the api'})
})

router.route('/:ID').delete((req,res) => {
    const { id } = req.params.ID
    
    mongoose.connection.db.collection('quotes')
        .deleteOne({ email: id })
        .then(() => {
            res.status(200).json(books)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not delete the documents'})
        })
        
        // res.json({mssg: 'welcome to the api'})
})

export default router
