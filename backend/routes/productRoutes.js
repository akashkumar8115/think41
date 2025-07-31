const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// List products, optionally filter by department
router.get('/', async (req, res) => {
  const filter = req.query.department ? { department: req.query.department } : {};
  const products = await Product.find(filter).populate('department');
  res.json(products);
});

// Get product detail
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).populate('department');
  res.json(product);
});

// Create product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, department } = req.body;
    if (!name || !description || !price || !department) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const product = new Product({ name, description, price, department });
    await product.save();
    const populatedProduct = await Product.findById(product._id).populate('department');
    res.status(201).json(populatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product.' });
  }
});

module.exports = router;