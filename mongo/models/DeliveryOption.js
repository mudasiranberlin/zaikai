import mongoose from 'mongoose';

export const DeliveryOption = mongoose.model('DeliveryOption', new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  deliveryDays: { type: Number, required: true },
  priceCents: { type: Number, required: true }
}));
