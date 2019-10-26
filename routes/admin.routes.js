const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const productCtrl = require('../controllers/product.controller');

/* GET home page. */
router.get('/', productCtrl.getAllProducts);

router.get('/create', productCtrl.productCreateGet);

router.post('/create', urlencodedParser, productCtrl.productCreatePost);

router.get('/:id', productCtrl.productDetailAdmin);

router.get('/:id/update', productCtrl.productUpdateGet);

router.post('/:id/update', urlencodedParser, productCtrl.productUpdatePut);

router.get('/:id/delete', productCtrl.productDelete);

module.exports = router;