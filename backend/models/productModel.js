const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    category: String,
    description: String,
    price: Number
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);