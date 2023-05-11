"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInventory = exports.deleteInventory = exports.createInventory = exports.getInventory = exports.getAllInventory = void 0;
const InventoryModel_1 = __importDefault(require("../models/InventoryModel"));
const mongoose_1 = __importDefault(require("mongoose"));
// GET
const getAllInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!user_id) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const inventory = yield InventoryModel_1.default.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(inventory);
});
exports.getAllInventory = getAllInventory;
// GET byID
const getInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such data" });
    }
    try {
        const inventory = yield InventoryModel_1.default.findById(id);
        if (!inventory) {
            return res.status(404).json({ error: "No such data" });
        }
        res.status(200).json(inventory);
    }
    catch (error) {
        res.status(500).json({ error: "Error getting inventory" });
    }
});
exports.getInventory = getInventory;
// CREATE
const createInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, quantity, price, isAvailable } = req.body;
    try {
        const user_id = req.user._id;
        const inventory = yield InventoryModel_1.default.create({ name, quantity, price, isAvailable, user_id });
        res.status(200).json(inventory);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating inventory" });
    }
});
exports.createInventory = createInventory;
// DELETE
const deleteInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such data" });
    }
    try {
        const inventory = yield InventoryModel_1.default.findByIdAndDelete(id);
        if (!inventory) {
            return res.status(404).json({ error: "No such data" });
        }
        res.status(200).json(inventory);
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting inventory" });
    }
});
exports.deleteInventory = deleteInventory;
// UPDATE
const updateInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such data" });
    }
    try {
        const inventory = yield InventoryModel_1.default.findByIdAndUpdate(id, Object.assign({}, req.body));
        if (!inventory) {
            return res.status(404).json({ error: "No such data" });
        }
        res.status(200).json(inventory);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating inventory" });
    }
});
exports.updateInventory = updateInventory;
//# sourceMappingURL=InventoryController.js.map