const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');

const app = express();

// --- 动态配置加载 ---
const configPath = path.join(__dirname, 'config', 'server-config.json');
let config;
try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
  console.error('致命错误: 无法读取或解析 server-config.json。', error);
  process.exit(1);
}

// 从配置中获取端口号
const port = process.env.PORT || (config.server && config.server.port) || 3000;

// 无条件应用 JSON 解析中间件，确保元 API 可以正常工作
app.use(express.json());

app.use(express.static(config.server.staticAssetsPath))

// --- SSE 日志拦截器 ---
const logService = require('./services/log.service');
if (config.logging && config.logging.sse.enabled) {
  console.log('[LogInterceptor] SSE 日志服务已启用，正在拦截 console 输出...');
  const originalConsole = {};
  ['log', 'warn', 'error', 'info', 'debug'].forEach(level => {
    originalConsole[level] = console[level];
    console[level] = (...args) => {
      originalConsole[level](...args);
      const message = args.map(arg => typeof arg === 'object' ? util.inspect(arg, { depth: null }) : arg).join(' ');
      logService.broadcast({ type: level, message, timestamp: new Date().toISOString() });
    };
  });
} else {
  console.log('[LogInterceptor] SSE 日志服务已禁用。');
}
// ------------------------

console.log('正在加载服务器配置...');
// --- 动态中间件加载 ---
for (const key in config.middleware) {
  if (config.middleware[key].enabled) {
    const options = config.middleware[key].options;
    console.log(`  -> 启用中间件: ${key}`);
    try {
      if (key === 'express.json') {
        app.use(express.json(options));
      } else if (key === 'express.urlencoded') {
        app.use(express.urlencoded(options));
      } else {
        const middlewarePackage = require(key);
        app.use(middlewarePackage(options));
      }
    } catch (e) {
      console.error(`错误: 无法加载中间件 '${key}'。请确保您已经通过 'npm install ${key}' 安装了它。`, e);
    }
  }
}
// ------------------------ //

// --- 动态加载 SSE 日志流路由 ---
if (config.logging && config.logging.sse.enabled) {
  const logStreamPath = (config.server && config.server.logStreamPath) || '/meta/logs/stream';
  app.get(logStreamPath, (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    logService.addClient(res);

    const initialMessage = { type: 'info', message: '成功连接到实时日志流。' };
    res.write(`data: ${JSON.stringify(initialMessage)}\n\n`);

    req.on('close', () => {
      logService.removeClient(res);
      res.end();
    });
  });
  console.log(`成功加载 SSE 日志流路由: ${logStreamPath}`);
}
// -------------------------- //

// --- 加载元 API 路由 --- //
const metaRouter = require('./meta');
app.use('/meta', metaRouter);
console.log('成功加载元 API 路由: /meta');
// ----------------------- //

// --- 递归动态路由加载 --- //
const routesDir = path.join(__dirname, 'routes');
const loadRoutes = (directory, prefix = '/') => {
  if (!fs.existsSync(directory)) return;
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      loadRoutes(fullPath, path.join(prefix, file));
    } else if (file.endsWith('.js')) {
      const route = require(fullPath);
      const routePath = path.join(prefix, path.basename(file, '.js'));
      const finalRoutePath = routePath.replace(/\\/g, '/').startsWith('/') ? routePath.replace(/\\/g, '/') : '/' + routePath.replace(/\\/g, '/');
      app.use(finalRoutePath, route);
      console.log(`成功加载动态路由: ${finalRoutePath} (来自 ${file})`);
    }
  });
};
console.log('正在加载动态 API 路由...');
loadRoutes(routesDir);
// -------------------------- //

app.get('/', (req, res) => {
  res.send('动态 API 生成器正在运行。');
});

app.listen(port, () => {
  console.log(`服务器正在 http://localhost:${port} 上运行`);
  console.log('使用 `npm start` 启动，由 nodemon 监视。');
});
