// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'], // Example roles, customize as needed
        default: 'user',
    },
    // Add other fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
