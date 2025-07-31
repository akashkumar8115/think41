// seed.js
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csvParse = require('csv-parse/lib/sync');
const Department = require('./models/Department');
const Product = require('./models/Product');

const MONGO_URI = 'mongodb+srv://akash2884182:akash2884182@cluster0.kjkkhyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // change your DB name

const DEPARTMENTS_CSV = path.join(__dirname, 'departments.csv');
const PRODUCTS_CSV = path.join(__dirname, 'products.csv');

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    // Clear existing data
    await Department.deleteMany();
    await Product.deleteMany();

    // Load departments from CSV
    const departmentsCsv = fs.readFileSync(DEPARTMENTS_CSV, 'utf8');
    const departmentsRows = csvParse(departmentsCsv, { columns: true, skip_empty_lines: true });
    const departments = await Department.insertMany(departmentsRows);
    const departmentMap = {};
    departments.forEach(dep => {
      departmentMap[dep.name] = dep._id;
    });

    // Load products from CSV
    const productsCsv = fs.readFileSync(PRODUCTS_CSV, 'utf8');
    const productsRows = csvParse(productsCsv, { columns: true, skip_empty_lines: true });
    const products = productsRows.map(prod => ({
      name: prod.name,
      description: prod.description,
      price: parseFloat(prod.price),
      department: departmentMap[prod.department],
    }));
    await Product.insertMany(products);
    console.log('CSV data inserted');

    process.exit(0); // exit the process
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seed();
