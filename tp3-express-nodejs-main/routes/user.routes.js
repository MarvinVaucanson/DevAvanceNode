import express from 'express'
import { getAllUsers, updateUser, signup, getUserById, login, createUser, deleteUser } from '../controllers/user.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'

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
    .get(verifyToken,getAllUsers)
    .post(verifyToken,createUser)

userRouter
    .route('/admin/:id')
    .get(verifyToken,getUserById)
    .put(verifyToken,updateUser)
    .delete(verifyToken,deleteUser)

export { userRouter }