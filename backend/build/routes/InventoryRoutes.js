"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InventoryController_1 = require("../controllers/InventoryController");
const router = express_1.default.Router();
// get all
router.get("/", InventoryController_1.getAllInventory);
// get by id
router.get('/:id', InventoryController_1.getInventory);
// create
router.post('/', InventoryController_1.createInventory);
// delete
router.delete('/:id', InventoryController_1.deleteInventory);
// update
router.put('/:id', InventoryController_1.updateInventory);
exports.default = router;
//# sourceMappingURL=InventoryRoutes.js.map