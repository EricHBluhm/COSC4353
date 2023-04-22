import mongoose from "mongoose"

const quoteSchema = new mongoose.Schema({
    realPrice: {
        type: Number,
        required: true,
        //min: 1
    },
    suggPrice: {
        type: Number,
        required: true,
        //min: 0
    },
    deliveryDate: {
        type:Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
        min: 12,
        max: 200
    },
    gallonsRequested: {
        type: Number,
        required: true,
        min: 1
    },
    email: {
        type: String,
        required: true,
        //min: 12
    }



})

export default mongoose.model('Quote', quoteSchema)