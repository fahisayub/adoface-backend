const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: {
        type: String, required: true, unique: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    bio: {
        type: String,
        maxlength: 200,
    },

}, { timestamps: true });

const UserModel = mongoose.model('user', userSchema);

module.exports = {
    UserModel,
}