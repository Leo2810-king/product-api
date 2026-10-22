const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 1. CREATE: Tạo sản phẩm mới
router.post('/', async (req, res) => {
  try {
    const { pid, pname, price, quantity } = req.body;
    const finalPid = pid || 'PRD-' + Date.now();
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

// READ ONE - tim theo pid
router.get('/:pid', async (req, res) => {
  try {
    const p = await Product.findOne({ pid: req.params.pid });
    if (!p) return res.status(404).json({ message: 'Khong tim thay' });
    res.json(p);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// UPDATE - sua theo pid
router.put('/:pid', async (req, res) => {
  try {
    const { pname, price, quantity } = req.body;
    const p = await Product.findOneAndUpdate(
      { pid: req.params.pid }, { pname, price, quantity },
      { new: true, runValidators: true }
    );
    if (!p) return res.status(404).json({ message: 'Khong tim thay' });
    res.json(p);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

// DELETE - xoa theo pid
router.delete('/:pid', async (req, res) => {
  try {
    const p = await Product.findOneAndDelete({ pid: req.params.pid });
    if (!p) return res.status(404).json({ message: 'Khong tim thay' });
    res.json({ message: 'Da xoa', product: p });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;