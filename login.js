// login.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('./models/User'); // Import the Mongoose User model

const secretKey = 'secretkey';

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists in the database
        const user = await User.findOne({ username, password });

        if (user) {
            // Generate and send a JWT token
            jwt.sign({ user }, secretKey, { expiresIn: '24h' }, (err, token) => {
                if (err) {
                    res.status(500).json({ error: 'Error generating token' });
                } else {
                    res.json({
                        token
                    });
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
