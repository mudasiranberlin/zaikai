import mongoose from 'mongoose';

export const Product = mongoose.model('Product', new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  rating: { stars: Number, count: Number },
  priceCents: { type: Number, required: true },
  keywords: [String]
}));
