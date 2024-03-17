// signup.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('./models/User'); // Import the Mongoose User model

const secretKey = 'secretkey';

router.post('/', async (req, res) => {
    const { username, password ,role} = req.body;

    try {
        // Check if the username already exists in the database
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            res.status(400).json({ error: 'Username already exists' });
        } else {
            // Create a new user
            const newUser = new User({
                username,
                password,
                role,
            });

            // Save the new user to the database
            const savedUser = await newUser.save();

            res.json({ message: 'User registered successfully', user: savedUser });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
