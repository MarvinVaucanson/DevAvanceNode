import express from 'express'
import { getAllUsers, updateUser, signup, getUserById, connection } from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter
    .route('/')
    .get(getAllUsers)

userRouter
    .route('/:id')
    .get(getUserById)
    .put(updateUser)

userRouter
    .route('/signup')
    .post(signup)

userRouter
    .route('login')
    .post(connection)

export { userRouter }