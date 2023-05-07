import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import InventoryRoutes from "./routes/InventoryRoutes"

dotenv.config()

// express app
const app = express()

// middlewares
app.use(express.json())

// routes
app.use('/api/inventory', InventoryRoutes)

// connect to database
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined")
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("connected to database")

        app.listen(process.env.PORT, () => {
            console.log("listening to port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })