var express = require('express');
var router = express.Router();
var Product = require('../models/products');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find((error, doc) => {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < doc.length; i += chunkSize) {
      productChunks.push(doc.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Светодиодное освещение', products: productChunks });
  });
});

router.get('/details/:id', function(req, res, next) {
  var id = req.params.id;
  Product.findById(id, (error, doc) => {
    if (error) {
      res.render(error)
    } else{
      res.render('shop/details', {title: doc.title, data: doc});
    }
  });
});

router.get('/admin', function(req, res, next) {
  res.render('admin/index', { title: 'Admin'});
});

module.exports = router;
