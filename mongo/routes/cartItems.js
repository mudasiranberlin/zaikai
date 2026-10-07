import express from 'express';
import { CartItem, Product, DeliveryOption, HIDE } from '../models/index.js';

const router = express.Router();

// GET /api/cart-items?expand=product
router.get('/', async (req, res) => {
  const cartItems = await CartItem.find().select(HIDE).lean();

  if (req.query.expand === 'product') {
    const products = await Product.find().select(HIDE).lean();
    return res.json(cartItems.map((item) => ({
      ...item,
      product: products.find((p) => p.id === item.productId)
    })));
  }

  res.json(cartItems);
});

// POST /api/cart-items   { productId, quantity }
router.post('/', async (req, res) => {
  const { productId, quantity } = req.body;

  if (!(await Product.exists({ id: productId }))) {
    return res.status(400).json({ error: 'Product not found' });
  }
  if (typeof quantity !== 'number' || quantity < 1 || quantity > 10) {
    return res.status(400).json({ error: 'Quantity must be a number between 1 and 10' });
  }

  let cartItem = await CartItem.findOne({ productId });
  if (cartItem) {
    cartItem.quantity += quantity;
    await cartItem.save();
  } else {
    cartItem = await CartItem.create({ productId, quantity, deliveryOptionId: '1' });
  }

  res.status(201).json(await CartItem.findById(cartItem._id).select(HIDE).lean());
});

// PUT /api/cart-items/:productId   { quantity?, deliveryOptionId? }
router.put('/:productId', async (req, res) => {
  const { productId } = req.params;
  const { quantity, deliveryOptionId } = req.body;

  const cartItem = await CartItem.findOne({ productId });
  if (!cartItem) {
    return res.status(404).json({ error: 'Cart item not found' });
  }

  if (quantity !== undefined) {
    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be a number greater than 0' });
    }
    cartItem.quantity = quantity;
  }

  if (deliveryOptionId !== undefined) {
    if (!(await DeliveryOption.exists({ id: deliveryOptionId }))) {
      return res.status(400).json({ error: 'Invalid delivery option' });
    }
    cartItem.deliveryOptionId = deliveryOptionId;
  }

  await cartItem.save();
  res.json(await CartItem.findById(cartItem._id).select(HIDE).lean());
});

// DELETE /api/cart-items/:productId
router.delete('/:productId', async (req, res) => {
  const result = await CartItem.deleteOne({ productId: req.params.productId });
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'Cart item not found' });
  }
  res.status(204).send();
});

export default router;
