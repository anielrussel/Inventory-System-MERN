"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const InventoryRoutes_1 = __importDefault(require("./routes/InventoryRoutes"));
dotenv_1.default.config();
// express app
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
// routes
app.use('/api/inventory', InventoryRoutes_1.default);
// connect to database
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
}
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT, () => {
        console.log("listening to port", process.env.PORT);
    });
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=server.js.map