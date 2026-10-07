// npm run seed  ->  puts the default products, cart and orders into MongoDB
import 'dotenv/config';
import mongoose from 'mongoose';
import { seedDatabase } from './seedDatabase.js';

await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce');
await seedDatabase();
console.log('Database seeded');
await mongoose.disconnect();
