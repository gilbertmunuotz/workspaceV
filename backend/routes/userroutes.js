var express = require('express');
var router = express.Router();
var usercontrollers = require('../controllers/usercontrollers');

/* GET home page. */
router.get('/', usercontrollers.getSignal);

/* POST user Messages*/
router.post('/api/users', usercontrollers.contacts); 

module.exports = router;