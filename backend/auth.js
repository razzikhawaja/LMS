const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');

const secretKey = 'your_secret_key'; // Replace with a strong secret key

// Middleware to generate a JWT token for a user
exports.generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
};

// Middleware to protect routes
exports.requireAuth = expressJwt({ secret: secretKey, algorithms: ['HS256'] });
