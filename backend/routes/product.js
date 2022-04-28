const express = require('express');
const app = require('../app');
const router = express.Router();

const { deleteProduct, getProduct, getProducts, createProduct, updateProduct, addReview } = require('../controllers/product')

const { checkAuth, requireSignin, checkAdmin } = require('../middleware/auth')


router.post('/product/create', requireSignin, checkAuth, checkAdmin, createProduct);
router.get('/product/:id', getProduct);
router.get('/products', getProducts);
router.put('/product/update/:id', requireSignin, checkAuth, checkAdmin, updateProduct);
router.delete('/product/delete/:id', requireSignin, checkAuth, checkAdmin, deleteProduct)

router.put('/product/review', requireSignin, addReview)

module.exports = router