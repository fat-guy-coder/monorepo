const fs = require('fs');
const path = require('path');
const {{modelName}} = require('{{modelPath}}');

// --- 动态响应消息辅助函数 ---
const statusCodesPath = path.join(__dirname, '{{relativeConfigPath}}');
const statusCodes = JSON.parse(fs.readFileSync(statusCodesPath, 'utf8'));
const modelDisplayName = '{{modelName}}'; // The PascalCase name for display
const resourceKey = '{{resourceNameLowercase}}'; // The lowercase name for keys

const getResponse = (action) => {
  const resourceSpecific = statusCodes.resources[resourceKey] && statusCodes.resources[resourceKey][action];
  const template = resourceSpecific || statusCodes.default[action];
  
  // Create a copy to avoid modifying the original object
  const response = { ...template };

  // Dynamically replace the placeholder with the actual model name
  if (response.message) {
    response.message = response.message.replace(/{{modelName}}/g, modelDisplayName);
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

const allowedFields = {{allowedFields}};

// START:create
exports.create = async (req, res) => {
  try {
    const data = Array.isArray(req.body)
      ? await {{modelName}}.insertMany(req.body.map(doc => filterBody(doc, allowedFields)))
      : await new {{modelName}}(filterBody(req.body, allowedFields)).save();
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
    const data = await {{modelName}}.find();
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
    const data = await {{modelName}}.findById(req.params.id);
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
    const data = await {{modelName}}.findByIdAndUpdate(req.params.id, filterBody(req.body, allowedFields), { new: true, runValidators: true });
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
    const data = await {{modelName}}.findByIdAndDelete(req.params.id);
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

// START:updateMany
exports.updateMany = async (req, res) => {
  try {
    const operations = req.body.map(doc => ({ updateOne: { filter: { _id: doc._id }, update: { $set: filterBody(doc, allowedFields) } } }));
    const data = await {{modelName}}.bulkWrite(operations);
    const response = getResponse('updateSuccess');
    res.status(response.statusCode).json({ message: response.message, data });
  } catch (error) {
    const response = getResponse('badRequest');
    res.status(response.statusCode).json({ message: response.message, error: error.message });
  }
};
// END:updateMany

// START:deleteMany
exports.deleteMany = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids) throw new Error('请求体必须包含一个 "ids" 数组。');
    const data = await {{modelName}}.deleteMany({ _id: { $in: ids } });
    const response = getResponse('deleteSuccess');
    res.status(response.statusCode).json({ message: `成功删除 ${data.deletedCount} 个{{modelName}}。`, data });
  } catch (error) {
    const response = getResponse(error instanceof Error ? 'badRequest' : 'serverError');
    res.status(response.statusCode).json({ message: response.message, error: error.message });
  }
};
// END:deleteMany
