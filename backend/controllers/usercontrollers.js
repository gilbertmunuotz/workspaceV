var Joi = require('joi');
var userModel = require('../models/userModel');

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

//(DESC) Save User's Messages
async function contacts(req, res, next) {

    // Destructure request body
    const { name, email, message } = req.body;

    try {
        // Validate request body using Joi
        const schema = Joi.object({
            name: Joi.string().min(3).max(200).required(),
            email: Joi.string().email().required(),
            message: Joi.string().min(3).max(2000).required(),
        }).options({ abortEarly: false })

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ errors: error.details.map(detail => detail.message) });
        }

        // Create and save new user
        const newUser = new userModel({ name, email, message });
        const savedData = await newUser.save();

        res.json(savedData); // Respond with created user data
    } catch (error) {
        next(error)
        console.error('Error saving data', error);
        res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
}

module.exports = { getSignal, contacts }; 