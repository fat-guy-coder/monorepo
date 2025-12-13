const mongoose = require('mongoose');

const {{modelName}}Schema = new mongoose.Schema(
  {{schemaDefinition}},
  { timestamps: true }
);

const {{modelName}} = mongoose.model('{{modelName}}', {{modelName}}Schema);

module.exports = {{modelName}};

