const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const signupRoute = require('./signup');
const loginRoute = require('./login');
const profileRoute = require('./profile');
const items = require('./routes/items');
const products = require('./routes/products');
const usersRoute = require('./routes/users'); 
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 5000

const localIP = '192.168.100.6'; // Replace with your machine's local IPv4 address

// Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/xyz');
mongoose.connect(process.env.DB_URL);
// mongoose.connect('mongodb+srv://admin:admin112233@cluster0.361oh7h.mongodb.net/');






mongoose.connection.on('connected', () => {
    console.log('Connected to database');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to database: ' + err);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        jwt.verify(token, 'secretkey', (err, authData) => {
            if (err) {
                res.status(403).json({
                    result: 'Invalid token'
                });
            } else {
                req.authData = authData;  // Agar aap future routes mein use karna chahte hain
                next();
            }
        });
    } else {
        res.status(401).json({
            result: 'Token is not provided'
        });
    }
}

// Routes
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/profile', profileRoute);
app.use('/users', usersRoute);
// Protected routes
app.use('/'  , items);
app.use('/', products);

// Testing server
app.get('/', (req, res) => {
    res.send('Hello');
});
// Add this route before app.listen()
app.get('/users/checkJWTtoken', verifyToken, (req, res) => {
    res.json({ user: req.authData.user });
});

app.listen(PORT, localIP, () => {
    console.log('Server is running at http://' + localIP + ':' + PORT);
});
