import express from 'express';
import { createOrder, getOrders, getOrderById } from '../controllers/orderController.js';

const router = express.Router();

router.route('/')
  .get(getOrders)
  .post(createOrder);

router.get('/:id', getOrderById);

export default router;
