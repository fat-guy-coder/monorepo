const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --- 用户注册 ---
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 检查用户或邮箱是否已存在
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ msg: '用户或电子邮箱已存在' });
    }

    // 创建新用户实例
    user = new User({
      username,
      email,
      password,
    });

    // 保存用户 (密码将在此步通过 pre-save hook 自动哈希)
    await user.save();

    res.status(201).json({ msg: '用户注册成功' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

// --- 用户登录 ---
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 检查用户是否存在
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ msg: '无效的凭据' });
    }

    // 比较密码
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: '无效的凭据' });
    }

    // 创建并返回 JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    // 警告: 在生产环境中，请务必将此密钥存储在 .env 文件中！
    const jwtSecret = 'your_very_secret_and_long_jwt_secret_key';

    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: '5h' }, // 令牌有效期 5 小时
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

module.exports = router;

