import mongoose, { Document, Model, Schema as MySchema } from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"

export interface IUser extends Document {
    email: string;
    password: string;
}

interface IUserModel extends Model<IUser> {
    login(email: string, password: string): Promise<IUser>;
    signup(email: string, password: string): Promise<IUser>;
}

const userSchema: MySchema<IUser> = new MySchema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// signup static method
userSchema.statics.signup = async function (email, password) {
    // validation
    if (!email || !password) {
        throw Error("All field must be filled")
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid email")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is too weak")
    }

    // find if existing user
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error("Email has already been used!")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })
    return user
}

// login static method
userSchema.statics.login = async function (email, password) {
    // validation
    if (!email || !password) {
        throw Error("All field must be filled")
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw Error("Incorrect email!")
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error("Incorrect password!")
    }
    return user
}

const User: IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema)

export default User