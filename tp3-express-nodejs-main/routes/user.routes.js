import express from 'express'
import { getAllUsers, updateUser, signup, getUserById, login, createUser, deleteUser } from '../controllers/user.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { checkRole } from '../middleware/checkRole.js'

const userRouter = express.Router()

userRouter
    .route('/')
    .get(verifyToken,getAllUsers)

userRouter
    .route('/signup')
    .post(signup)

userRouter
    .route('/login')
    .post(login)

userRouter
    .route('/admin')
    .get(verifyToken,checkRole('admin'),getAllUsers)
    .post(verifyToken,checkRole('admin'),createUser)

userRouter
    .route('/admin/:id')
    .get(verifyToken,checkRole('admin'),getUserById)
    .put(verifyToken,checkRole('admin'),updateUser)
    .delete(verifyToken,checkRole('admin'),deleteUser)

export { userRouter }