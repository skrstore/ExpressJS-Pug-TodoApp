const mongoose = require('mongoose');

let ProductSchema = mongoose.Schema({
  name: String,
  price: Number,
});

module.exports = mongoose.model('Product', ProductSchema);
