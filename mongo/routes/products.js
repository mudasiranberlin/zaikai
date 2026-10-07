import express from 'express';
import { Product, HIDE } from '../models/index.js';

const router = express.Router();

// GET /api/products?search=...
router.get('/', async (req, res) => {
  const products = await Product.find().select(HIDE).lean();
  const search = req.query.search;

  if (!search) return res.json(products);

  // Case-insensitive search in the name or in any keyword
  const text = String(search).toLowerCase();
  const matches = products.filter((product) =>
    product.name.toLowerCase().includes(text) ||
    product.keywords.some((keyword) => keyword.toLowerCase().includes(text))
  );

  res.json(matches);
});

export default router;
