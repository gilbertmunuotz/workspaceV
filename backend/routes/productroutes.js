var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

/* GET Home Page*/
router.get('/', productController.getSignal);

/* POST New Product*/
router.post('/api/newProduct', productController.newProduct);

module.exports = router;