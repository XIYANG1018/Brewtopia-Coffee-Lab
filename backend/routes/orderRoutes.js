import express from 'express';
const router = express.Router();
import {
    addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getAllOrders
} from '../controllers/orderController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

// '/' 是指'/api/orders'
router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders);
router.get('/mine', protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);


export default router;