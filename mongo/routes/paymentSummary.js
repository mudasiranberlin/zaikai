import express from 'express';
import { CartItem, Product, DeliveryOption, HIDE } from '../models/index.js';

const router = express.Router();

// GET /api/payment-summary
router.get('/', async (req, res) => {
  const cartItems = await CartItem.find().lean();
  const products = await Product.find().select(HIDE).lean();
  const deliveryOptions = await DeliveryOption.find().select(HIDE).lean();

  let totalItems = 0;
  let productCostCents = 0;
  let shippingCostCents = 0;

  for (const item of cartItems) {
    const product = products.find((p) => p.id === item.productId);
    const deliveryOption = deliveryOptions.find((o) => o.id === item.deliveryOptionId);
    totalItems += item.quantity;
    productCostCents += product.priceCents * item.quantity;
    shippingCostCents += deliveryOption.priceCents;
  }

  const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
  const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);
  const totalCostCents = totalCostBeforeTaxCents + taxCents;

  res.json({
    totalItems,
    productCostCents,
    shippingCostCents,
    totalCostBeforeTaxCents,
    taxCents,
    totalCostCents
  });
});

export default router;
