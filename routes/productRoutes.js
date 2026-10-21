const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 1. CREATE: Tạo sản phẩm mới
router.post('/', async (req, res) => {
  try {
    const { pid, pname, price, quantity } = req.body;
    // Nếu pid không truyền lên thì tự tạo chuỗi ID ngẫu nhiên bằng Math.random
    const finalPid = pid || 'PRD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    
    const newProduct = new Product({ pid: finalPid, pname, price, quantity });
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// 2. READ ALL: Lấy danh sách tất cả sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// 3. READ ONE: Lấy 1 sản phẩm theo pid
router.get('/:pid', async (req, res) => {
  try {
    const product = await Product.findOne({ pid: req.params.pid });
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;