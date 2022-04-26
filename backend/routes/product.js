const express = require('express');
const app = require('../app');
const router = express.Router();

const { deleteProduct, getProduct, getProducts, createProduct, updateProduct } = require('../controllers/product')

router.post('/product/create', createProduct);
router.get('/product/:id', getProduct);
router.get('/products', getProducts);
router.put('/product/update/:id', updateProduct);
router.delete('/product/delete/:id', deleteProduct)

module.exports = router