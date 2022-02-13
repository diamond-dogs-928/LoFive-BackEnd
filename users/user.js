const mongoose = require('../db/connection')

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
    email: {
        type:String,
        unique: true,
        required: true
    },
=======
>>>>>>> 4d37e4e (rebase)
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User