var Joi = require('joi');
var productModel = require('../models/productModel');
var uploads = require('../middlewares/multermiddleware');

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


//(DESC) Create New Product
async function newProduct(req, res, next) {

    //Destructure Request Body
    const { name, image, category, descrption, price } = req.body
    try {

        const productSchema = Joi.object().keys({
            name: Joi.string().required(),
            image: Joi.string().required(),
            category: Joi.string().required(),
            descrption: Joi.string().required(),
            price: Joi.number().required(),
        }).options({ abortEarly: false });

        const { error } = productSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ errors: error.details.map(detail => detail.message) });
        }

    } catch (error) {
        next(error)
        console.error("Error Uploading Product", error);
        res.status(500).json({ status: 'error', message: "Internal Server Error" });
    }
}



module.exports = { getSignal, newProduct };