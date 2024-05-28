var Joi = require('joi');
var productModel = require('../models/productModel');
var categoryModel = require('../models/categoryModel');
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
}

//(DESC) Read All Products
async function getAllProducts(req, res, next) {
    try {
        const { category } = req.query;

        let filteredProducts = [];

        // Filter products based on the category
        if (category) {
            filteredProducts = await productModel.find({ category });
            res.status(200).json({ products: filteredProducts });
        } else {
            const products = await productModel.find({});
            res.status(200).json({ products });
        }
    } catch (error) {
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

//(DESC) UPDATE Product By Id
async function updateProduct(req, res, next) {
    // Destructure Request Body
    const productData = JSON.parse(req.body.data);

    const { name, category, description, price } = productData;

    const { id } = req.params; // Assuming productId is passed in the URL params

    try {
        // Access uploaded image details from req.file (if successful upload)

        const uploadedImage = req.file;

        const imageURL = uploadedImage ? uploadedImage.filename : req.body.data.imageURL; // Use ternary operator

        const updatedProduct = { name, category, description, price, imageURL };

        const results = await productModel.findByIdAndUpdate(id, updatedProduct, { new: true });

        if (!results) {
            return res.status(400).json({ status: 'error', message: "Product Not Found" });
        } else {
            return res.status(200).json({ status: 'success', message: "Updated Successfully" });
        }
    } catch (error) {
        console.error("Error updating Product", error);
        return res.status(500).json({ status: 'error', message: 'Error updating Product' });
    }
};

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

//(DESC) ADD Category
async function addCategory(req, res, next) {

    //Destructure Request Body
    const { category } = req.body;

    try {
        // Validation with Joi
        const categorySchema = Joi.object().keys({
            category: Joi.string().required(),
        }).options({ abortEarly: false });

        const { error } = categorySchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ errors: error.details.map(detail => detail.message) });
        }

        try {
            const InstanceCategory = new categoryModel({ category });
            const newCategory = InstanceCategory.save();
            res.status(201).json({ message: "Category created successfully!" });

        } catch (error) {
            console.error("Error Adding Category", error);
            return res.status(500).json({ status: 'error', message: 'Error Adding Category' });
        }

    } catch (error) {
        next(error)
        console.error("Error Adding Category", error);
        res.status(500).json({ status: 'error', message: "Internal Server Error" })
    }
}

//DESC Read All Categories
async function getCategories(req, res, next) {

    try {
        const categories = await categoryModel.find();
        res.status(200).json({ data: categories });

    } catch (error) {
        next(error)
        console.error("Error Getting Categories", error);
        res.status(500).json({ status: 'error', message: "Internal Server Eror" });
    }
}

module.exports = { getSignal, newProduct, getAllProducts, getAsingleProduct, updateProduct, deletePro, addCategory, getCategories };