import { Request, Response } from "express"
import Inventory from "../models/InventoryModel"
import mongoose from "mongoose"

// GET
export const getAllInventory = async (req: Request, res: Response) => {
    const inventory = await Inventory.find().sort({ createdAt: -1 })
    res.status(200).json(inventory)
}
// GET byID
export const getInventory = async (req: Request, res: Response) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such data"})
    }

    const inventory = await Inventory.findById(id)

    if (!inventory) {
        return res.status(404).json({error: "No such data"})
    }
    res.status(200).json(inventory)
}
// CREATE
export const createInventory = async (req: Request, res: Response) => {
    const { name, quantity, price, isAvailable } = req.body

    // add to database
    try {
        const inventory = await Inventory.create({ name, quantity, price, isAvailable })
        res.status(200).json(inventory)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }

}
// DELETE
export const deleteInventory = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such data"})
    }

    const inventory = await Inventory.findByIdAndDelete(id)

    if (!inventory) {
        return res.status(404).json({error: "No such data"})
    }
    res.status(200).json(inventory)
}
// UPDATE
export const updateInventory = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such data"})
    }

    const inventory = await Inventory.findByIdAndUpdate(id, {
        ...req.body
    })

    if (!inventory) {
        return res.status(404).json({error: "No such data"})
    }
    res.status(200).json(inventory)
}