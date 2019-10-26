const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/product.controller');

/* GET home page. */
router.get('/', productCtrl.goHome);

module.exports = router;
