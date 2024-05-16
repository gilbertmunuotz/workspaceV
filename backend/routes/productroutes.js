var express = require('express');
var router = express.Router();
var uploads = require('../middlewares/multermiddleware');
var productController = require('../controllers/productController');

/* GET Home Page*/
router.get('/', productController.getSignal);

/* POST New Product*/
router.post('/api/newProduct', productController.newProduct);

/* GET All Products*/
router.get('/api/allProducts', productController.getAllProducts);

/* GET A single Product By Id*/
router.get('/api/product/:id', productController.getAsingleProduct);

/* UPDATE a Product By Id*/
router.put('/api/updateProduct/:id', uploads.single('image'), productController.updateProduct);

/* DELETE a product*/
router.delete('/api/delete/:id', productController.deletePro);


module.exports = router;