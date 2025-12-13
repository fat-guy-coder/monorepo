const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// --- 路径定义 ---
const baseDir = path.join(__dirname, '..');
const configDir = path.join(baseDir, 'config');
const templatesDir = path.join(baseDir, 'templates');
const modelsDir = path.join(baseDir, 'models');
const controllersDir = path.join(baseDir, 'controllers');
const routesDir = path.join(baseDir, 'routes');

const configFilePath = path.join(configDir, 'server-config.json');
const registryFilePath = path.join(configDir, 'middleware-registry.json');
const statusCodesFilePath = path.join(configDir, 'status-codes.json');

// --- 辅助函数 ---
const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
};

const extractBlock = (template, blockName) => {
  const regex = new RegExp(`// START:${blockName}[\\s\\S]*?// END:${blockName}`, 'g');
  return (template.match(regex) || []).join('\n');
};

const recursiveReadDir = (dir, allFiles = []) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      recursiveReadDir(filePath, allFiles);
    } else {
      allFiles.push(filePath);
    }
  });
  return allFiles;
};

// 确保基础目录存在
ensureDirExists(modelsDir);
ensureDirExists(controllersDir);
ensureDirExists(routesDir);

// --- 配置查询 API ---
router.get('/mongoose-options', (req, res) => {
  const mongooseOptions = {
    types: ['String', 'Number', 'Date', 'Buffer', 'Boolean', 'Mixed', 'ObjectId', 'Array'],
    commonOptions: { required: { type: 'boolean' }, default: { type: 'any' }, unique: { type: 'boolean' }, index: { type: 'boolean' } },
    associationOptions: { ref: { type: 'string (ModelName)' } }
  };
  res.json(mongooseOptions);
});

router.get('/middleware-list', (req, res) => {
  try {
    const registry = JSON.parse(fs.readFileSync(registryFilePath, 'utf8'));
    res.json(registry);
  } catch (error) {
    res.status(500).json({ error: '无法读取中间件注册表。' });
  }
});

router.get('/config', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: '无法读取服务器配置。' });
  }
});

router.get('/status-codes', (req, res) => {
  try {
    const statusCodes = JSON.parse(fs.readFileSync(statusCodesFilePath, 'utf8'));
    res.json(statusCodes);
  } catch (error) {
    res.status(500).json({ error: '无法读取状态码配置文件。' });
  }
});

// --- 配置更新 API ---
router.post('/config', (req, res) => {
  try {
    fs.writeFileSync(configFilePath, JSON.stringify(req.body, null, 2));
    res.json({ message: '配置已成功更新。请重启服务器以应用更改。' });
  } catch (error) {
    res.status(500).json({ error: '无法写入服务器配置。' });
  }
});

router.post('/status-codes', (req, res) => {
  try {
    fs.writeFileSync(statusCodesFilePath, JSON.stringify(req.body, null, 2));
    res.json({ message: '状态码配置已成功更新。请重启服务器以应用更改。' });
  } catch (error) {
    res.status(500).json({ error: '无法写入状态码配置。' });
  }
});

// --- 服务器控制 API ---
router.post('/restart', (req, res) => {
  res.status(202).json({ message: '服务器正在重启...' });
  setTimeout(() => { process.exit(0); }, 500);
});

// ======================================================
//               元 编 程 接 口
// ======================================================

// --- 查询接口 ---
router.get('/models', (req, res) => {
  try {
    const files = fs.readdirSync(modelsDir).filter(f => f.endsWith('.js'));
    res.json(files.map(f => path.basename(f, '.js')));
  } catch (error) {
    res.status(500).json({ error: '无法读取模型目录。' });
  }
});

router.get('/apis', (req, res) => {
  try {
    const files = recursiveReadDir(routesDir);
    const apiPaths = files.map(f => path.relative(routesDir, f).replace(/\\/g, '/'));
    res.json(apiPaths);
  } catch (error) {
    res.status(500).json({ error: '无法读取路由目录。' });
  }
});

// --- 创建接口 ---
router.post('/models', (req, res) => {
  const { modelName, schema } = req.body;
  if (!modelName || !schema) return res.status(400).json({ error: 'modelName 和 schema 是必需的。' });

  const modelFilePath = path.join(modelsDir, `${modelName}.js`);
  if (fs.existsSync(modelFilePath)) return res.status(409).json({ error: `模型文件 ${modelName}.js 已存在。` });

  try {
    const modelTemplate = fs.readFileSync(path.join(templatesDir, 'model.js.tpl'), 'utf8');
    const modelCode = modelTemplate.replace(/{{modelName}}/g, modelName).replace('{{schemaDefinition}}', JSON.stringify(schema, null, 2));
    fs.writeFileSync(modelFilePath, modelCode);
    res.status(201).json({ message: `成功创建模型: ${modelName}。`, path: modelFilePath });
  } catch (error) {
    res.status(500).json({ error: `创建模型失败。` });
  }
});

router.post('/apis', (req, res) => {
  const { modelName, routePath, endpoints } = req.body;
  if (!modelName || !routePath || !endpoints) return res.status(400).json({ error: 'modelName, routePath, 和 endpoints 数组是必需的。' });

  const modelFilePath = path.join(modelsDir, `${modelName}.js`);
  if (!fs.existsSync(modelFilePath)) return res.status(404).json({ error: `找不到模型文件: ${modelName}.js。` });

  try {
    const controllerTemplate = fs.readFileSync(path.join(templatesDir, 'crud.controller.js.tpl'), 'utf8');
    const requiredControllerBlocks = endpoints.map(ep => extractBlock(controllerTemplate, ep)).join('\n\n');
    const controllerHeader = controllerTemplate.split('// START:')[0];
    const controllerCode = controllerHeader + requiredControllerBlocks;
    
    const controllerDir = path.join(controllersDir, path.dirname(routePath));
    ensureDirExists(controllerDir);
    const controllerFilePath = path.join(controllerDir, `${path.basename(routePath)}.js`);
    
    const relativeModelPath = path.relative(path.dirname(controllerFilePath), modelFilePath).replace(/\\/g, '/');
    const relativeConfigPath = path.relative(path.dirname(controllerFilePath), statusCodesFilePath).replace(/\\/g, '/');

    const finalControllerCode = controllerCode
        .replace(/{{modelName}}/g, modelName)
        .replace('{{modelPath}}', relativeModelPath)
        .replace('{{allowedFields}}', 'Object.keys(require("' + relativeModelPath + '").schema.obj)')
        .replace('{{relativeConfigPath}}', relativeConfigPath)
        .replace('{{resourceNameLowercase}}', modelName.toLowerCase());

    fs.writeFileSync(controllerFilePath, finalControllerCode);

    const routeTemplate = fs.readFileSync(path.join(templatesDir, 'crud.route.js.tpl'), 'utf8');
    const requiredRouteBlocks = endpoints.map(ep => extractBlock(routeTemplate, ep)).join('\n');
    const routeHeader = routeTemplate.split('// START:')[0];
    const routeFooter = '\nmodule.exports = router;';
    const routeCode = routeHeader + requiredRouteBlocks + routeFooter;

    const routeDir = path.join(routesDir, path.dirname(routePath));
    ensureDirExists(routeDir);
    const routeFilePath = path.join(routeDir, `${path.basename(routePath)}.js`);
    const relativeControllerPath = path.relative(path.dirname(routeFilePath), controllerFilePath).replace(/\\/g, '/');
    const finalRouteCode = routeCode.replace('{{controllerPath}}', relativeControllerPath);
    fs.writeFileSync(routeFilePath, finalRouteCode);

    res.status(201).json({ message: `成功为模型 ${modelName} 创建 API 接口。`, note: '请重启服务器以激活新路由。' });
  } catch (error) {
    console.error('创建 API 失败:', error);
    res.status(500).json({ error: '创建 API 失败。' });
  }
});

// --- 删除接口 ---
router.delete('/models/:modelName', (req, res) => {
  const { modelName } = req.params;
  const modelFilePath = path.join(modelsDir, `${modelName}.js`);

  if (!fs.existsSync(modelFilePath)) {
    return res.status(404).json({ error: `模型文件 ${modelName}.js 未找到。` });
  }

  try {
    fs.unlinkSync(modelFilePath);
    res.status(200).json({ message: `成功删除模型: ${modelName}。请重启服务器。` });
  } catch (error) {
    res.status(500).json({ error: `删除模型失败。` });
  }
});

router.delete('/apis', (req, res) => {
  const { routePath } = req.body;
  if (!routePath) {
    return res.status(400).json({ error: 'routePath 是必需的。' });
  }

  const routeFilePath = path.join(routesDir, routePath);
  const controllerFilePath = path.join(controllersDir, routePath);

  try {
    let deleted = false;
    if (fs.existsSync(routeFilePath)) {
      fs.unlinkSync(routeFilePath);
      deleted = true;
    }
    if (fs.existsSync(controllerFilePath)) {
      fs.unlinkSync(controllerFilePath);
      deleted = true;
    }

    if (deleted) {
      res.status(200).json({ message: `成功删除 API: ${routePath}。请重启服务器。` });
    } else {
      res.status(404).json({ error: `API 文件 ${routePath} 未找到。` });
    }
  } catch (error) {
    res.status(500).json({ error: `删除 API 失败。` });
  }
});

module.exports = router;
