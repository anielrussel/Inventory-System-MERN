import express from "express";
import {
  getAllInventory,
  getInventory,
  createInventory,
  deleteInventory,
  updateInventory,
} from "../controllers/InventoryController";
import { requireAuth } from "../middlewares/RequireAuth";

const router = express.Router();

// require auth for all inventory routes
router.use(requireAuth)

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