import mongoose from 'mongoose';

export const CartItem = mongoose.model('CartItem', new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  deliveryOptionId: { type: String, required: true, default: '1' }
}));
