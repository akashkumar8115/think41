const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Department = require('../models/Department');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const departmentsMap = new Map();

fs.createReadStream('./data/products.csv')
  .pipe(csv())
  .on('data', async (row) => {
    let deptId;
    if (!departmentsMap.has(row.department)) {
      const dept = new Department({ name: row.department });
      await dept.save();
      departmentsMap.set(row.department, dept._id);
      deptId = dept._id;
    } else {
      deptId = departmentsMap.get(row.department);
    }

    const product = new Product({
      name: row.name,
      price: row.price,
      image: row.image,
      description: row.description,
      department: deptId,
    });

    await product.save();
  })
  .on('end', () => {
    console.log('CSV load complete');
    mongoose.disconnect();
  });