import mongoose from "mongoose";

const Schema =  mongoose.Schema

const inventorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model("Inventory", inventorySchema)