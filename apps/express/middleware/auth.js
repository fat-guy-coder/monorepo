const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 从请求头中获取 token
  const token = req.header('x-auth-token');

  // 检查 token 是否存在
  if (!token) {
    return res.status(401).json({ msg: '没有找到 token，授权被拒绝' });
  }

  try {
    // 警告: 在生产环境中，请务必将此密钥存储在 .env 文件中！
    const jwtSecret = 'your_very_secret_and_long_jwt_secret_key';

    // 验证 token
    const decoded = jwt.verify(token, jwtSecret);

    // 将解码后的用户信息附加到请求对象上
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token 无效' });
  }
};

