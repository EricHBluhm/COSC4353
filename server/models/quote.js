import mongoose from "mongoose"

const quoteSchema = new mongoose.Schema({
    realPrice: {
        type: Number,
        required: true,
        min: 50
    },
    suggPrice: {
        type: Number,
        required: true,
        min: 2
    },
    deliveryDate: {
        type:Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
        min: 12,
        max: 50
    },
    gallonsRequested: {
        type: Number,
        required: true,
        min: 100
    },
    email: {
        type: String,
        required: true,
        min: 12
    }



})

export default mongoose.model('Quote', quoteSchema)