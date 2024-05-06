var express = require('express');
var router = express.Router();
var admincontrollers = require('../controllers/adminController')

/* GET home page. */
router.get('/', admincontrollers.getSignal);

/* Register Admin*/
router.post('/api/register', admincontrollers.adminRegisters);

/* Login Admin*/
router.post('/api/login', admincontrollers.adminLogins);

/* Logout Admin*/
router.get('/api/logout', admincontrollers.adminLogouts);


module.exports = router;