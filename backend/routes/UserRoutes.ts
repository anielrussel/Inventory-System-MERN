import express from "express"
import { userLogin, userSignup } from "../controllers/UserController"

const router = express.Router()

// user login
router.post('/login', userLogin)

// user signup
router.post('/signup', userSignup)

export default router