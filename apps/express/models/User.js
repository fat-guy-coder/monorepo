const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '请输入用户名'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, '请输入电子邮箱'],
    unique: true,
    match: [/.+\@.+\..+/, '请输入有效的电子邮箱'],
  },
  password: {
    type: String,
    required: [true, '请输入密码'],
    minlength: 6,
    select: false, // 在查询用户信息时，默认不返回密码字段
  },
}, { timestamps: true });

// 在保存用户之前，对密码进行哈希处理
UserSchema.pre('save', async function (next) {
  // 如果密码没有被修改，则跳过
  if (!this.isModified('password')) {
    return next();
  }

  // 生成盐并哈希密码
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 添加一个方法来比较输入的密码和数据库中哈希后的密码
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;

