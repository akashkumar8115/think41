// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
});

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
