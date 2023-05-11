import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { Request, Response } from "express"
import InventoryRoutes from "./routes/InventoryRoutes"
import UserRoutes from "./routes/UserRoutes"

dotenv.config()

// express app
const app = express()

// middlewares
app.use(express.json())
app.use((req: Request, res: Response, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/inventory', InventoryRoutes)
app.use('/api/user', UserRoutes)

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