// seeder.js
const mongoose = require('mongoose');
const Department = require('./models/Department');
const Product = require('./models/Product');

const MONGO_URI = 'mongodb+srv://akash2884182:akash2884182@cluster0.kjkkhyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // change your DB name

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    // Clear existing data
    await Department.deleteMany();
    await Product.deleteMany();

    // Dummy departments
    const departments = await Department.insertMany([
      { name: 'Electronics' },
      { name: 'Clothing' },
      { name: 'Groceries' },
    ]);

    // Dummy products
    const products = [
      {
        name: 'Laptop',
        description: 'High performance laptop',
        price: 999.99,
        department: departments[0]._id,
      },
      {
        name: 'T-Shirt',
        description: 'Cotton t-shirt',
        price: 19.99,
        department: departments[1]._id,
      },
      {
        name: 'Apple',
        description: 'Fresh red apples',
        price: 2.99,
        department: departments[2]._id,
      },
    ];

    await Product.insertMany(products);
    console.log('Dummy data inserted');

    process.exit(0); // exit the process
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seed();
