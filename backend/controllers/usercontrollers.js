var Joi = require('joi');
var messageModel = require('../models/userModel');

//(DESC) Save User's Messages
async function contacts(req, res, next) {

    // Destructure request body
    const { name, email, message } = req.body;

    try {
        // Validate request body using Joi
        const schema = Joi.object({
            name: Joi.string().min(3).max(200),
            email: Joi.string().email(),
            message: Joi.string().min(3).max(5000),
        }).options({ abortEarly: false })

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ errors: error.details.map(detail => detail.message) });
        }

        const existingData = await messageModel.findOne({ email });

        if (existingData) {
            existingData.message.push({ message, timestamp: new Date() });
            await existingData.save();

            res.status(201).json({ message: 'Message submitted successfully!' });
        } else {
            // Create and save new Message
            const newData = new messageModel({ name, email, message: [{ message }] });
            const savedData = await newData.save();
            res.status(201).json({ message: 'Message submitted successfully!' });
        }
    } catch (error) {
        next(error)
        console.error('Error saving data', error);
        res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
}

module.exports = { contacts }; 