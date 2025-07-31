
const express = require('express');
const Department = require('../models/Department');
const router = express.Router();

router.get('/', async (req, res) => {
  const departments = await Department.find();
  res.json(departments);
});

module.exports = router;
