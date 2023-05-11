"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const router = express_1.default.Router();
// user login
router.post('/login', UserController_1.userLogin);
// user signup
router.post('/signup', UserController_1.userSignup);
exports.default = router;
//# sourceMappingURL=UserRoutes.js.map