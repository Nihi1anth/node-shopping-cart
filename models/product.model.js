const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title:        {type: String, maxlength: 100},
  category:     {type: String, maxlength: 50},
  description:  {type: String},
  features:     {type: String},
  status:       {type: String},
  images:       [Array],
  price:        {type: Number}
});

ProductSchema
  .virtual('url')
  .get(function () {
    return '/catalog/' + this._id;
});

module.exports = mongoose.model('Products', ProductSchema);