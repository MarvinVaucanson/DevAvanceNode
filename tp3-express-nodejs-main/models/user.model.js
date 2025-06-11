import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Il faut un nom"]
    },
    email: {
        type: String,
        required: [true, 'Il faut un email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Il faut un mot de passe'],
        minlength: 8
    },
    role: {
        type: String,
        enum: ['user', 'moderator', 'guest', 'admin'],
        default: 'user'
    }
})

export const User = mongoose.model('User', userSchema)