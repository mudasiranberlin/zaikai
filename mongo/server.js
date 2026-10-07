import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Product } from './models/index.js';
import { seedDatabase } from './seedDatabase.js';
import productRoutes from './routes/products.js';
import deliveryOptionRoutes from './routes/deliveryOptions.js';
import cartItemRoutes from './routes/cartItems.js';
import orderRoutes from './routes/orders.js';
import paymentSummaryRoutes from './routes/paymentSummary.js';
import resetRoutes from './routes/reset.js';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

// Product images
app.use('/images', express.static(path.join(__dirname, 'images')));

// API
app.use('/api/products', productRoutes);
app.use('/api/delivery-options', deliveryOptionRoutes);
app.use('/api/cart-items', cartItemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment-summary', paymentSummaryRoutes);
app.use('/api/reset', resetRoutes);

// Frontend build (the "dist" folder), if you have one
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/{*splat}', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(indexPath)) res.sendFile(indexPath);
  else res.status(404).send('index.html not found');
});

// Errors (Express 5 sends async errors here automatically)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

await mongoose.connect(MONGO_URI);
console.log('MongoDB connected');

// First start: add the default data
if ((await Product.countDocuments()) === 0) {
  await seedDatabase();
  console.log('Default data added to the database.');
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
