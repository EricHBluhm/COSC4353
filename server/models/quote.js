import mongoose from "mongoose"

const quoteSchema = new mongoose.Schema({
    realPrice: {
        type: String,
        required: true
    },
    suggPrice: {
        type: String,
        required: true
    },
    deliveryDate: {
        type:Date,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    gallonsRequested: {
        type: String,
        required: true
    }



})

export default mongoose.model('Quote', quoteSchema)