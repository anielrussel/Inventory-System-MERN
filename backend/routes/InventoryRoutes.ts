import express from "express";
import {
  getAllInventory,
  getInventory,
  createInventory,
  deleteInventory,
  updateInventory,
} from "../controllers/InventoryController";

const router = express.Router();

// get all
router.get("/", getAllInventory);

// get by id
router.get('/:id', getInventory)

// create
router.post('/', createInventory)

// delete
router.delete('/:id', deleteInventory)

// update
router.put('/:id', updateInventory)

export default router