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

    // Integrate Multer Logic Here
    uploads.single('image')(req, res, async (error) => {
        // Handle Multer Errors
        if (error) {
            console.error("Multer Error", error);
            return res.status(400).json({ status: 'error', message: "Multer Error" });
        }

        // Destructure Request Body
        const { name, category, description, price } = req.body;

        try {
            // Validation with Joi (unchanged)
            const productSchema = Joi.object().keys({
                name: Joi.string().required(),
                category: Joi.string().required(),
                description: Joi.string().required(),
                price: Joi.number().required(),
            }).options({ abortEarly: false });

            const { error } = productSchema.validate(req.body, { abortEarly: false });

            if (error) {
                return res.status(400).json({ errors: error.details.map(detail => detail.message) });
            }

            // Extract Filename (New Logic)
            const { filename, path } = req.file || {}; // Handle case where no file is uploaded
            const extractedFilename = filename || ""; // Use filename if available, otherwise empty string

            // Create new product with extractedFilename
            try {
                const newProduct = await productModel.create({
                    name,
                    category,
                    description,
                    price,
                    imageURL: extractedFilename,
                });
                res.status(201).json({ message: "Product created successfully!" });
            } catch (error) {
                console.error("Error Uploading Product", error);
                return res.status(500).json({ status: 'error', message: 'Error uploading Product' });
            }

        } catch (error) {
            next(error);
            console.error("Error Uploading Product", error);
            res.status(500).json({ status: 'error', message: "Internal Server Error" });
        }
    });
}

//(DESC) Read All Products
async function getAllProducts(req, res, next) {
    try {
        const products = await productModel.find({})
        res.status(200).json({ products })
    } catch (error) {
        next(error)
        console.error("Error Getting Product", error);
        res.status(500).json({ status: 'error', message: "Internal Server Error" });
    }

}

//(DESC) EDIT Product By Id
async function getAsingleProduct(req, res, next) {

    try {
        //Destructure the Id from Req.body
        const { id } = req.params;

        const product = await productModel.findById(id);

        if (!product) {
            res.status(404).json({ status: 'error', message: "Product Not found" });
        } else {
            return res.status(200).json(product);
        }

    } catch (error) {
        next(error)
        console.error("Error Getting Product", error);
        res.status(500).json({ status: 'error', message: "Internal Server Error" });
    }
}


async function updateProduct(req, res, next) {
    // Integrate Multer Logic Here 
    uploads.single('image')(req, res, async (error) => { // Ensure Single File upload for image field

        // Handle Multer Errors
        if (error) {
            console.error("Multer Error", error);
            return res.status(400).json({ status: 'error', message: "Multer Error" });
        }

        // Destructure Request Body
        const { name, category, description, price } = req.body;
        const { id } = req.params; // Assuming productId is passed in the URL params

        try {
            // Access uploaded image details from req.file (if successful upload)
            const imageURL = req.file ? req.file.path : ""; // Get image path or an empty string

            const updatedProduct = { name: name, category: category, description: description, price: price, imageURL: imageURL };

            const results = await productModel.findByIdAndUpdate(id, updatedProduct, { new: true });
            if (!results) {
                return res.status(400).json({ status: 'error', message: "Product Not Found" });
            } else {
                return res.status(200).json({ message: "Updated Successfully" });
            }
        } catch (error) {
            console.error("Error updating Product", error);
            return res.status(500).json({ status: 'error', message: 'Error updating Product' });
        }
    });
}

//(DESC) DELETE a Product 
async function deletePro(req, res, next) {
    try {

        const { id } = req.params;

        const deleteProduct = await productModel.findByIdAndDelete(id);

        if (!deleteProduct) {
            res.status(404).json({ status: 'error', message: "Product Not found" });
        } else {
            res.status(200).json({ message: "Product Deleted Succesfully" });
        }
    } catch (error) {
        next(error)
        console.error("Error Updating Product", error);
        res.status(500).json({ status: 'error', message: "Internal Server Error" });
    }
}


module.exports = { getSignal, newProduct, getAllProducts, getAsingleProduct, updateProduct, deletePro };