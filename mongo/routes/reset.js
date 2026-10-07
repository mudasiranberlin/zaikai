import express from 'express';
import { seedDatabase } from '../seedDatabase.js';

const router = express.Router();

// POST /api/reset   (puts the database back to the default data)
router.post('/', async (req, res) => {
  await seedDatabase();
  res.status(204).send();
});

export default router;
