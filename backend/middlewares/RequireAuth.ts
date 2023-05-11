import jwt, { JwtPayload } from "jsonwebtoken"
import User, { IUser } from "../models/UserModel"
import { Request, Response } from "express"

interface IRequest extends Request {
    user: IUser
}

export const requireAuth = async (req: IRequest, res: Response, next: () => void) => {
    // verify authentication

    const { authorization } =  req.headers

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required!" })
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET_TOKEN) as JwtPayload;

        console.log('token verified:', _id);

        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: "Request token is not authorized" })
    }
}
