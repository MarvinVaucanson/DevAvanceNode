import bcrypt from 'bcrypt'
import { User } from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const signup = async (req, res) => {
    try{
        const { name, email, password, role} = req.body

        if (role === 'admin'){
            return res.status(500).json({
                status: 'fail',
                message: 'Erreur, seul un admin peut créer un admin'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
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
        res.status(500).json({
            status: 'error',
            message: err
        })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email ou mot de passe incorrect'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email ou mot de passe incorrect'
            })
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role},
            process.env.JWT_KEY || 'bapt-secret',
            { expiresIn: '2d' }
        )

        res.status(200).json({
            status: 'success',
            data: {
                userId: user._id,
                role: user.role,
                token
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        })
    }
}
//CRUD 
const createUser = async (req, res) => {
    try{
        const { name, email, password, role} = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
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
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
}
const getAllUsers = async (req, res) => {
    try{
        const current = "admin"
        const users = await User.find()
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: { users }
        })
    }catch(err){
        res.status(500).json({
            status: 'error',
            message: err
        })
    }
}
const getUserById = async (req, res) => {
    try{
        //à remplacer
        const current = "admin"
        if (current !== 'admin') {
            return res.status(403).json({
                status: 'fail',
                message: 'Accès réservé à admin'
            })
        }

        const user = await User.findById(req.params.id).select('-password')
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not find'
            })
        }
        res.status(200).json({
            status: 'success',
            data: { user }
        })
    } catch {
        res.status(500).json({
            status: 'error',
            message: err
        })
    }
}
const updateUser = async (req, res) => {
try {

    const updates = { ...req.body }
    if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10)
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
    ).select('-password')

     if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not find'
        })
    }

    res.status(200).json({
        status: 'success',
        data: { user }
    })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
}
const deleteUser = async (req, res) => {
    try {

        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not find'
            })
        }

        res.status(204).json({
            status: 'success',
            message: 'User supprimé'
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        })
    }
}

export { getAllUsers, updateUser, signup, getUserById, login, createUser, deleteUser }