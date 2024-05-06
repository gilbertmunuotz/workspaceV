var jwt = require("jsonwebtoken");

// Use a default value for JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET;
function generateToken(res, payload) {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); // Set expiry time to 1 day

    res.cookie('jwttoken', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })

    return token; // Make sure to return the token
}

module.exports = { generateToken };