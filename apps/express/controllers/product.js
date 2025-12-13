const fs = require('fs');
const path = require('path');
const Comment = require('../models/Comment.js');

// --- 动态响应消息辅助函数 ---
const statusCodesPath = path.join(__dirname, '../config/status-codes.json');
const statusCodes = JSON.parse(fs.readFileSync(statusCodesPath, 'utf8'));
const modelDisplayName = 'Comment'; // The PascalCase name for display
const resourceKey = 'comment'; // The lowercase name for keys

const getResponse = (action) => {
  const resourceSpecific = statusCodes.resources[resourceKey] && statusCodes.resources[resourceKey][action];
  const template = resourceSpecific || statusCodes.default[action];
  
  // Create a copy to avoid modifying the original object
  const response = { ...template };

  // Dynamically replace the placeholder with the actual model name
  if (response.message) {
    response.message = response.message.replace(/Comment/g, modelDisplayName);
  }
  
  return response;
};
// -----------------------------

const filterBody = (body, allowedFields) => {
  const filtered = {};
  Object.keys(body).forEach(key => {
    if (allowedFields.includes(key)) filtered[key] = body[key];
  });
  return filtered;
};

const allowedFields = Object.keys(require("../models/Comment.js").schema.obj);

// START:create
exports.create = async (req, res) => {
  try {
    const data = Array.isArray(req.body)
      ? await Comment.insertMany(req.body.map(doc => filterBody(doc, allowedFields)))
      : await new Comment(filterBody(req.body, allowedFields)).save();
    const response = getResponse('createSuccess');
    res.status(response.statusCode).json({ message: response.message, data });
  } catch (error) {
    const response = getResponse('badRequest');
    res.status(response.statusCode).json({ message: response.message, error: error.message });
  }
};
// END:create

// START:getAll
exports.getAll = async (req, res) => {
  try {
    const data = await Comment.find();
    const response = getResponse('getSuccess');
    res.status(response.statusCode).json({ message: response.message, data });
  } catch (error) {
    const response = getResponse('serverError');
    res.status(response.statusCode).json({ message: response.message, error: error.message });
  }
};
// END:getAll

// START:getOne
exports.getOne = async (req, res) => {
  try {
    const data = await Comment.findById(req.params.id);
    if (!data) {
      const response = getResponse('notFound');
      return res.status(response.statusCode).json({ message: response.message });
    }
    const response = getResponse('getSuccess');
    res.status(response.statusCode).json({ message: response.message, data });
  } catch (error) {
    const response = getResponse('serverError');
    res.status(response.statusCode).json({ message: response.message, error: error.message });
  }
};
// END:getOne

// START:updateOne
exports.updateOne = async (req, res) => {
  try {
    const data = await Comment.findByIdAndUpdate(req.params.id, filterBody(req.body, allowedFields), { new: true, runValidators: true });
    if (!data) {
      const response = getResponse('notFound');
      return res.status(response.statusCode).json({ message: response.message });
    }
    const response = getResponse('updateSuccess');
    res.status(response.statusCode).json({ message: response.message, data });
  } catch (error) {
    const response = getResponse('badRequest');
    res.status(response.statusCode).json({ message: response.message, error: error.message });
  }
};
// END:updateOne

// START:deleteOne
exports.deleteOne = async (req, res) => {
  try {
    const data = await Comment.findByIdAndDelete(req.params.id);
    if (!data) {
      const response = getResponse('notFound');
      return res.status(response.statusCode).json({ message: response.message });
    }
    const response = getResponse('deleteSuccess');
    res.status(response.statusCode).send(response.message);
  } catch (error) {
    const response = getResponse('serverError');
    res.status(response.statusCode).json({ message: response.message, error: error.message });
  }
};
// END:deleteOne