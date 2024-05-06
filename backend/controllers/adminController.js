var Joi = require('joi');
var bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
var token = require('../jwtToken.js');
var adminModel = require('../models/adminModel');


//(DESC) A sample to test the routes & connections
async function getSignal(req, res, next) {
    try {
        res.send("Welcome Back")
    } catch (error) {
        next(error)
        console.error("Error Getting Signal", error);
        res.status(500).send({ status: 'error', message: "Internal Server Error" });
    }
}

//(DESC) Admin Registration
async function adminRegisters(req, res, next) {

    // Destructure request body
    const { username, email, password } = req.body;

    try {
        const registerSchema = Joi.object().keys({
            username: Joi.string().min(3).max(20).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(20).required(),
        }).options({ abortEarly: false });

        const { error } = registerSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ errors: error.details.map(detail => detail.message) });
        }

        // Check for existing user using usermodel (Mongoose model)
        const isExisting = await adminModel.findOne({ email })
        if (isExisting) {
            return res.status(400).json({ status: "error", message: 'An account with such email Already exists.Please Try a new one!' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new user with the hashed password using create()
        const newUser = await adminModel.create({ username, email, password: hashedPassword });

        // Access _id from the saved user document
        const userId = newUser._id;

        // Generate JWT token after successful Registration & Bind it To The User
        const payload = { userId };  // Assuming you have user id

        const Token = token.generateToken(res, payload);

        // Respond with the saved user data
        res.json({ newCreatedUser: newUser, message: "Registration successful", Token: Token });


    } catch (error) {
        next(error)
        console.error("Error Registering User", error);
        res.status(500).json({ status: 'error', message: "Internal Server Error" });
    }
}

//(DESC) Admin Log-in
async function adminLogins(req, res, next) {

    // Destructure request body
    const { email, password } = req.body;

    try {
        const loginSchema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(20).required(),
        }).options({ abortEarly: false });

        const { error } = loginSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ errors: error.details.map(detail => detail.message) });
        }

        // Check for existing user using usermodel (Mongoose model)
        const user = await adminModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ status: "error", message: 'User Doesnot Exist' });
        }

        // Compare hashed passwords using bcrypt
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ status: "error", message: 'Wrong Credentials' });
        }

        // Generate JWT token after successful login & Bind it To The User
        const payload = { userId: user._id };  // Assuming you have user id
        const Token = token.generateToken(res, payload);

        // Respond with the saved user data
        res.json({ user, message: "Login successful", Token: Token });  // Respond with the saved(loged-in) user data


    } catch (error) {
        next(error)
        console.error('Error during login', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}


//(DESC) Admin Logouts
async function adminLogouts(req, res, next) {
    try {
        res.cookie('jwttoken', '', {
            path: '/',
            httpOnly: true,
            sameSite: 'none',
            expires: new Date(0),
            sameSite: 'strict', // Prevent CSRF attacks
        });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error)
        console.error('Error during logout', error);
        res.status(500).send({ status: 'error', message: "Internal Server Error" });
    }
}


module.exports = { getSignal, adminRegisters, adminLogins, adminLogouts }