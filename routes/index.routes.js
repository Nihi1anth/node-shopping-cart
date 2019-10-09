var express = require('express');
var router = express.Router();

var productCtrl = require('../controllers/product.controller');

/* GET home page. */
router.get('/', productCtrl.goHome);

module.exports = router;
