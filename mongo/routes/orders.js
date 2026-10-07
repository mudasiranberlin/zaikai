import express from 'express';
import { Order, Product, DeliveryOption, CartItem, HIDE } from '../models/index.js';

const router = express.Router();

// Adds the full product to each line of an order (for ?expand=products)
async function addProducts(order) {
  const products = await Product.find().select(HIDE).lean();
  return {
    ...order,
    products: order.products.map((line) => ({
      ...line,
      product: products.find((p) => p.id === line.productId)
    }))
  };
}

// GET /api/orders?expand=products   (newest first)
router.get('/', async (req, res) => {
  let orders = await Order.find().sort({ orderTimeMs: -1 }).select(HIDE).lean();

  if (req.query.expand === 'products') {
    orders = await Promise.all(orders.map(addProducts));
  }

  res.json(orders);
});

// POST /api/orders   (turns the cart into an order, then empties the cart)
router.post('/', async (req, res) => {
  const cartItems = await CartItem.find().lean();
  if (cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  let totalCostCents = 0;
  const products = [];

  for (const item of cartItems) {
    const product = await Product.findOne({ id: item.productId });
    const deliveryOption = await DeliveryOption.findOne({ id: item.deliveryOptionId });
    if (!product) throw new Error(`Product not found: ${item.productId}`);
    if (!deliveryOption) throw new Error(`Invalid delivery option: ${item.deliveryOptionId}`);

    totalCostCents += product.priceCents * item.quantity + deliveryOption.priceCents;
    products.push({
      productId: item.productId,
      quantity: item.quantity,
      estimatedDeliveryTimeMs: Date.now() + deliveryOption.deliveryDays * 24 * 60 * 60 * 1000
    });
  }

  totalCostCents = Math.round(totalCostCents * 1.1); // 10% tax

  const order = await Order.create({ orderTimeMs: Date.now(), totalCostCents, products });
  await CartItem.deleteMany();

  res.status(201).json(await Order.findById(order._id).select(HIDE).lean());
});

// GET /api/orders/:orderId?expand=products
router.get('/:orderId', async (req, res) => {
  const order = await Order.findOne({ id: req.params.orderId }).select(HIDE).lean();
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.json(req.query.expand === 'products' ? await addProducts(order) : order);
});

export default router;
