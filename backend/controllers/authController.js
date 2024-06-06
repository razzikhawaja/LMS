const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Make sure this is the same secret used for verification

exports.login = (req, res) => {
    const { email, contact_number } = req.body;

    // Simulate user verification
    if (email === "ali@gmail.com" && contact_number === "1234567890") {
        const user = { id: 1, email: email };
        const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
};
