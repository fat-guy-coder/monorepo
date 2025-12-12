const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Comment = require('../models/Comment');
const User = require('../models/User');

// --- 获取所有评论 ---
// @route   GET /api/comments
// @desc    获取所有评论
// @access  Public
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('user', ['username']) // 关联查询，只返回用户的 username 字段
      .sort({ createdAt: -1 }); // 按创建时间降序排序
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

// --- 发表新评论 ---
// @route   POST /api/comments
// @desc    发表一条新评论
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ msg: '评论内容不能为空' });
  }

  try {
    const newComment = new Comment({
      text,
      user: req.user.id, // 从认证中间件获取用户 ID
    });

    const comment = await newComment.save();

    // 关联查询以返回用户信息
    const populatedComment = await Comment.findById(comment.id).populate('user', ['username']);

    res.json(populatedComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
});

module.exports = router;

