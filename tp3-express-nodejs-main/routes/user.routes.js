import express from 'express'
import { getAllUsers, updateUser, signup, getUserById, connection, createUser, deleteUser } from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter
    .route('/')
    .get(getAllUsers)

userRouter
    .route('/signup')
    .post(signup)

userRouter
    .route('/login')
    .post(connection)

userRouter
    .route('/admin')
    .get(getAllUsers)
    .post(createUser)

    userRouter
    .route('/admin/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)
    
export { userRouter }