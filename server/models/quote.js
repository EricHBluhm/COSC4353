import mongoose from "mongoose"

const quoteSchema = new mongoose.Schema({
    realPrice: {
        type: Number,
        required: true,
        min: 0
    },
    suggPrice: {
        type: Number,
        required: true,
        min: 0
    },
    deliveryDate: {
        type:Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
        min: 12,
        max: 250
    },
    gallonsRequested: {
        type: Number,
        required: true,
        min: 0
    },
    email: {
        type: String,
        required: true,
        min: 5
    }



})

export default mongoose.model('Quote', quoteSchema)