import express from "express";
//import data from "./placeHolder.json" assert { type: "json" };
import mongoose from "mongoose"
const router = express.Router();
import Quote from "../models/quote.js"

router.route('/:ID').get( async (req,res) => {
    let { ID } = req.params
    ID = ID.substring(1)
    let quotes = []
    console.log(ID)

    quotes = await Quote.find({ email: ID} ); //check to see if user exists

    // if(!foundUser) //if user doesn't exist
    // {
    //         console.log("Not email for this quote request.")
    //         return res.status(501).json('Could not fetch the documents.')
    // }
    // else{

    //     quotes = await Quote
    //         .find({ email: ID }, { realPrice:1, suggPrice: 1, deliveryDate: 1, address: 1, gallonsRequested:1 })
    //         .sort({ deliveryDate : 1})
    //         .then(() => {
    //             res.status(201);
    //         })
        

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

        return res.json(quotes); //return saved user to frontend
    //}
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

