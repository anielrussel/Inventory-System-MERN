import { Request as ExpressRequest, Response } from "express"
import Inventory from "../models/InventoryModel"
import mongoose from "mongoose"

interface AuthenticatedRequest extends ExpressRequest {
  user: { _id: string };
}

// GET
export const getAllInventory = async (req: AuthenticatedRequest, res: Response) => {
    const user_id = req.user?._id

    if (!user_id) {
        return res.status(401).json({ error: "Unauthorized" })
    }

    const inventory = await Inventory.find({ user_id}).sort({ createdAt: -1 })
    res.status(200).json(inventory)
}


// GET byID
export const getInventory = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such data"})
  }

  try {
    const inventory = await Inventory.findById(id)

    if (!inventory) {
      return res.status(404).json({error: "No such data"})
    }

    res.status(200).json(inventory)
  } catch (error) {
    res.status(500).json({ error: "Error getting inventory" })
  }
}

// CREATE
export const createInventory = async (req: AuthenticatedRequest, res: Response) => {
  const { name, quantity, price, isAvailable } = req.body

  try {
    const user_id = req.user._id
    const inventory = await Inventory.create({ name, quantity, price, isAvailable, user_id })
    res.status(200).json(inventory)
  } catch (error) {
    res.status(500).json({ error: "Error creating inventory" })
  }
}

// DELETE
export const deleteInventory = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such data"})
  }

  try {
    const inventory = await Inventory.findByIdAndDelete(id)

    if (!inventory) {
      return res.status(404).json({error: "No such data"})
    }

    res.status(200).json(inventory)
  } catch (error) {
    res.status(500).json({ error: "Error deleting inventory" })
  }
}

// UPDATE
export const updateInventory = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such data"})
  }

  try {
    const inventory = await Inventory.findByIdAndUpdate(id, {
      ...req.body
    })

    if (!inventory) {
      return res.status(404).json({error: "No such data"})
    }

    res.status(200).json(inventory)
  } catch (error) {
    res.status(500).json({ error: "Error updating inventory" })
  }
}
