require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware đọc dữ liệu JSON trong body request
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Kết nối thành công đến MongoDB container (nammongodb)'))
  .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// Routes
app.use('/api/products', productRoutes);

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});