import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

export const Order = mongoose.model('Order', new mongoose.Schema({
  id: { type: String, default: () => randomUUID(), unique: true },
  orderTimeMs: { type: Number, required: true },
  totalCostCents: { type: Number, required: true },
  products: [{
    _id: false,
    productId: String,
    quantity: Number,
    estimatedDeliveryTimeMs: Number
  }]
}));
