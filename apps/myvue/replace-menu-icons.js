import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 关键词-图标映射规则
const iconRules = [
  { keywords: ["HTML"], icon: "📄" },
  { keywords: ["CSS"], icon: "🎨" },
  { keywords: ["JS", "JavaScript", "ES+"], icon: "📜" },
  { keywords: ["TypeScript"], icon: "🔵" },
  { keywords: ["Node", "包管理", "npm", "yarn", "pnpm", "模块", "栈", "队列", "堆", "包"], icon: "📦" },
  { keywords: ["算法", "递归", "动态规划", "贪心", "回溯", "分治", "排序", "链表", "数组"], icon: "🔄" },
  { keywords: ["数据结构"], icon: "📊" },
  { keywords: ["网络", "HTTP", "TCP", "DNS", "CDN", "Socket"], icon: "🌐" },
  { keywords: ["安全", "XSS", "CSRF", "加密"], icon: "🛡️" },
  { keywords: ["测试", "单元测试", "E2E", "性能", "优化"], icon: "🔍" },
  { keywords: ["动画", "过渡", "requestAnimationFrame"], icon: "🎞️" },
  { keywords: ["项目", "工程", "软技能"], icon: "📦" },
  { keywords: ["设计模式", "工厂", "单例", "装饰者", "代理", "命令", "状态", "模板方法"], icon: "📜" },
  { keywords: ["工具", "构建", "打包", "发布"], icon: "🛠️" },
  { keywords: ["图片", "SVG", "Canvas", "图形"], icon: "🖼️" },
  { keywords: ["团队", "协作", "GIT"], icon: "🤝" },
  { keywords: ["AI"], icon: "🤖" },
  { keywords: ["学习", "网站", "路线", "推荐"], icon: "📚" },
];

// 匹配label文本，返回合适的图标
function getIcon (label) {
  for (const rule of iconRules) {
    for (const kw of rule.keywords) {
      if (label.includes(kw)) return rule.icon;
    }
  }
  return null;
}

// 替换label中的图标
function replaceLabelIcon (label) {
  // 去除原有图标（假设图标在最前面，后跟空格）
  const text = label.replace(/^\p{Emoji_Presentation}|^\p{Extended_Pictographic}|^\p{Emoji}/gu, '').replace(/^\s+/, '');
  const icon = getIcon(label);
  if (icon) {
    // 保留后面的星星等
    const starIdx = text.indexOf('⭐');
    if (starIdx !== -1) {
      return icon + ' ' + text.slice(0, starIdx).trim() + ' ' + text.slice(starIdx).trim();
    }
    return icon + ' ' + text.trim();
  }
  return label;
}

// 递归遍历对象，替换所有label
function traverse (obj) {
  if (Array.isArray(obj)) {
    return obj.map(traverse);
  } else if (typeof obj === 'object' && obj !== null) {
    const newObj = { ...obj };
    if (typeof newObj.label === 'string') {
      newObj.label = replaceLabelIcon(newObj.label);
    }
    if (newObj.children) {
      newObj.children = traverse(newObj.children);
    }
    return newObj;
  }
  return obj;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'src/router/menu.json');
const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const newJson = traverse(json);
fs.writeFileSync(filePath, JSON.stringify(newJson, null, 2), 'utf8');
console.log('所有label图标已自动替换完成！');
