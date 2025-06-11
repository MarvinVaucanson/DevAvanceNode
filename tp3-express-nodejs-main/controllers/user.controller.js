import bcrypt from 'bcrypt'
import { User } from '../models/user.model.js'

const getAllUsers = (req, res) => {
    req.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    })
}

const signup = async (req, res) => {
    try{
        const { name, email, password, role} = req.body

        //non implémenter pour le moment, il faut faire l'auth
        if (role === 'admin'){
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({
                    status: 'fail',
                    message: 'Erreur, seul un admin peut créer un admin'
                })
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            email,
            hashedPassword,
            role
        })

        res.status(200).json({
            status: 'sucess',
            data: {
                user:{
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            }
        })
    } catch (err){
        req.status(500).json({
            status: 'error',
            message: err.message
        })
    }
}

const getUserById = (req, res) => {
    req.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    })
}

const updateUser = (req, res) => {
    req.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    })
}

const connection = (req, res) => {
    req.status(500).json({
        status: 'error',
        message: 'This route is not yet implemented'
    })
}

export { getAllUsers, updateUser, signup, getUserById, connection }