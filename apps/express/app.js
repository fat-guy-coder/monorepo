// 引入 dotenv 用于加载环境变量 (如果无法创建 .env 文件，则会优雅地跳过)
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 引入路由文件
const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/comments');

// 初始化 Express 应用
const app = express();

// --- 中间件 ---
// 启用 CORS (跨域资源共享)
app.use(cors());
// 解析 JSON 格式的请求体
app.use(express.json());

// --- 数据库连接 ---
const connectDB = async () => {
  try {
    // 警告: 在生产环境中，请务必将此连接字符串存储在 .env 文件中！
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/personal-website';
    await mongoose.connect(mongoURI);
    console.log('MongoDB 连接成功...');
  } catch (err) {
    console.error('MongoDB 连接失败:', err.message);
    // 如果连接失败，则退出进程
    process.exit(1);
  }
};

connectDB();

// --- API 路由 ---
// 挂载认证路由
app.use('/api/auth', authRoutes);
// 挂载评论路由
app.use('/api/comments', commentRoutes);

// --- 启动服务器 ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`服务器已在端口 ${PORT} 上启动`));

