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
exports.userSignup = exports.userLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
// create a token
const createToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id }, process.env.SECRET_TOKEN, { expiresIn: "3d" });
};
// user login
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield UserModel_1.default.login(email, password);
        // create token
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.userLogin = userLogin;
// user signup
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield UserModel_1.default.signup(email, password);
        // create token
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.userSignup = userSignup;
//# sourceMappingURL=UserController.js.map