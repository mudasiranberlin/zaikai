import express from 'express';
import { DeliveryOption, HIDE } from '../models/index.js';

const router = express.Router();

// GET /api/delivery-options?expand=estimatedDeliveryTime
router.get('/', async (req, res) => {
  const options = await DeliveryOption.find().select(HIDE).lean();

  if (req.query.expand === 'estimatedDeliveryTime') {
    return res.json(options.map((option) => ({
      ...option,
      estimatedDeliveryTimeMs: Date.now() + option.deliveryDays * 24 * 60 * 60 * 1000
    })));
  }

  res.json(options);
});

export default router;
