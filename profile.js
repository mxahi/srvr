// profileRoute.js
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const secretKey = 'secretkey';

router.post('/', verifyToken, (req, resp) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            resp.send({ result: 'invalid token' });
        } else {
            resp.json({
                message: 'profile accessed ',
                authData
            });
        }
    });
});

function verifyToken(req, resp, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        resp.send({
            result: 'token is not valid'
        });
    }
}

module.exports = router;
