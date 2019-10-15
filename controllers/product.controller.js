var Products = require('../models/product.model');
var multer = require('multer');
var path = require('path');

const storageEngine = multer.diskStorage({
  destination: '/images',
  filename: function(req, file, fn) {
    fn(null, new Date().getTime.toString()+'-'+file.fieldname+path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storageEngine,
  limits: {fileSize: 200000},
  fileFilter: function(req, file, callback) {
    validateFile(file, callback)
  }
}).single('photo');

var validateFile = function(file, cb) {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedFileTypes.test(file.mimetype);
  if (extension && mimeType) {
    return cb(null, true);
  } else {
    cb("Invalid file type.")
  }
}

exports.goHome = function (req, res) {
  Products.find(function (error, products) {
    if (error) res.render(error);
    res.render('catalog/index', {title: 'Добро пожаловать', products: products});
  });
}

exports.gallery = function (req, res) {
  res.render('gallery', {title: 'Галерея'})
}

exports.getAllProducts = function (req, res) {
  Products.find(function (error, products) {
    if (error) res.render(error);
    res.render('admin/index', {title: 'Все товары', products: products});
  });
};

exports.productDetailAdmin = function (req, res) {
  Products.findById(req.params.id, function(error, product) {
    if (error) res.render(error);
    res.render('admin/prodDetailsAdmin', {title: product.title, product: product});
  });
};

//показать форму добавления товара
exports.productCreateGet = function (req, res) {
  res.render('admin/createForm', {title: 'Добавить товар'});
};

//добавить товар по запросу POST
exports.productCreatePost = function (req, res) {
  var form = req.body;

  new Products({
    title: form.title,
    category: form.category,
    description: form.description,
    features: form.features,
    status: form.status,
    images: form.images.split('\r\n'),
    price: form.price
  }).save().then(function(doc) {
    console.log('Сохранен объект: ', doc);
  }).catch(function(error) {
    console.log(error);
  });
  
  res.redirect('/admin');
};

// Показать форму удаления товара по запросу GET.
exports.productDeleteGet = function(req, res) {
  res.send('NOT IMPLEMENTED: Product: ' + req.params.id + ' delete GET');
};

// Удалить товар по запросу DELETE.
exports.productDelete = function(req, res) {
  // res.send('NOT IMPLEMENTED: Product: ' + req.params.id + ' delete POST');
  Products.findByIdAndDelete(req.params.id, function(error, product) {
    console.log('Документ->'+ product.title + '<-был удален');
  });
  res.redirect('/admin');
};

// Показать форму обновления товара по запросу GET.
exports.productUpdateGet = function(req, res) {
  // res.send('NOT IMPLEMENTED: Product ' + req.params.id + ' update GET');
  Products.findById(req.params.id, function(error, product) {
    if (error) res.send(error);
    res.render('admin/updateForm', {title: 'Редактирование товара ' + product.title, product: product});
  });
};

// Обновить автора по запросу PUT.
exports.productUpdatePut = function(req, res) {
  // res.send('NOT IMPLEMENTED: Product ' + req.params.id + ' update PUT');
  var updatedProduct = {
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    status: req.body.status,
    images: req.body.images.split(','),
    price: req.body.price
  }

  Products.findByIdAndUpdate(req.params.id, updatedProduct, function(error, product) {
    if (error) {
      res.send(error);
    } else {
      res.redirect('/admin');
    }
  });
};