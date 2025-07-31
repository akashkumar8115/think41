const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
  const filter = req.query.department ? { department: req.query.department } : {};
  const products = await Product.find(filter).populate('department');
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).populate('department');
  res.json(product);
});

module.exports = router;