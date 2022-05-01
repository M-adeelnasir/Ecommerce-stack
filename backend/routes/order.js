const express = require('express');
const app = require('../app');
const router = express.Router();

const { createOrder, getOrder, getOrders, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/order')

const { checkAuth, requireSignin, checkAdmin } = require('../middleware/auth')


router.post('/order/create', requireSignin, checkAuth, createOrder);
router.get('/order/:id', requireSignin, checkAuth, getOrder);
router.get('/my/orders', requireSignin, checkAuth, getOrders);


router.get('/admin/orders', requireSignin, checkAuth, checkAdmin, getAllOrders);
router.put('/admin/order/update/statuts', requireSignin, checkAuth, checkAdmin, updateOrderStatus);
router.delete('/admin/order/delete', requireSignin, checkAuth, checkAdmin, deleteOrder)

module.exports = router