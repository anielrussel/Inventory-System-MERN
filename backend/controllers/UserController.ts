import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import { Response, Request } from "express";

// create a token
const createToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.SECRET_TOKEN, { expiresIn: "3d" });
};
// user login
export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // create token
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// user signup
export const userSignup = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        // create token
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}