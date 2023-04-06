import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id', updateOrderById);
router.delete('/orders/:id', deleteOrderById);

export default router;