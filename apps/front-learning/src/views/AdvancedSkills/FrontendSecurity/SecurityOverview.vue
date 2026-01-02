<template>
  <div class="security-guide">
    <h2>前端安全防护指南</h2>
    <div v-for="(item, index) in securityList" :key="index" class="security-item">
      <h3>{{ index + 1 }}. {{ item.title }} ({{ item.frequency }})</h3>
      <p class="desc">{{ item.description }}</p>
      <div v-if="item.solutionCode" class="solution">
        <pre>{{ item.solutionCode }}</pre>
      </div>
      <p v-if="item.config" class="config">{{ item.config }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SecurityItem {
  title: string;
  frequency: string;  // 出现频率
  description: string;
  solutionCode?: string;
  config?: string;
}

const securityList: SecurityItem[] = [
  {
    title: "XSS跨站脚本攻击",
    frequency: "极高",
    description: "恶意脚本注入页面，窃取用户数据或会话",
    solutionCode: `// 使用DOMPurify库过滤\nimport DOMPurify from 'dompurify';\n\nconst cleanHTML = DOMPurify.sanitize(dirtyHTML);`,
    config: "Content-Security-Policy: default-src 'self';"
  },
  {
    title: "CSRF跨站请求伪造",
    frequency: "高",
    description: "诱导用户发起非预期操作，如转账",
    solutionCode: `// 后端生成token，前端在请求头携带\naxios.interceptors.request.use(config => {\n  config.headers['X-CSRF-Token'] = getCSRFToken();\n  return config;\n});`,
    config: "SameSite Cookie属性: Set-Cookie: key=value; SameSite=Strict"
  },
  {
    title: "点击劫持",
    frequency: "中高",
    description: "透明层覆盖诱导用户点击恶意内容",
    config: "X-Frame-Options: DENY 或 Content-Security-Policy: frame-ancestors 'none';"
  },
  {
    title: "敏感数据泄露",
    frequency: "中",
    description: "前端硬编码密钥、API凭证等敏感信息",
    solutionCode: `// 永远不要在前端存储机密信息\n// 错误示例：\nconst API_KEY = 'sk_live_xxxxxxx';`
  },
  {
    title: "CORS配置错误",
    frequency: "中",
    description: "不当的跨域资源共享策略导致数据泄露",
    config: "Access-Control-Allow-Origin: 精确域名 或 Access-Control-Allow-Credentials: true 时需指定域名"
  },
  {
    title: "第三方依赖风险",
    frequency: "中",
    description: "NPM包存在安全漏洞或恶意代码",
    config: "定期执行：npm audit 或 yarn audit"
  },
  {
    title: "HTTP头缺失",
    frequency: "中低",
    description: "缺少安全头部导致基础防护失效",
    config: `X-Content-Type-Options: nosniff\nX-XSS-Protection: 1; mode=block\nReferrer-Policy: no-referrer-when-downgrade`
  },
  {
    title: "SSRF服务端请求伪造",
    frequency: "低",
    description: "利用前端接口代理功能攻击内网",
    solutionCode: `// 验证用户输入的URL\nfunction isValidURL(url: string) {\n  return /^https?:\\/\\/[\\w\\.]+\\.[a-z]{2,}(\\/\\S*)?$/i.test(url);\n}`
  }
];
</script>

<style lang="less" scoped>
.security-guide {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', system-ui;

  h2 {
    color: #2c3e50;
    border-bottom: 2px solid #42b983;
    padding-bottom: 10px;
  }

  .security-item {
    margin: 25px 0;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

    h3 {
      color: #34495e;
      margin-bottom: 8px;
      font-size: 1.2em;
    }

    .desc {
      color: #7f8c8d;
      margin-bottom: 12px;
      line-height: 1.5;
    }

    .solution,
    .config {
      background: #2c3e50;
      color: #f8f9fa;
      padding: 12px;
      border-radius: 6px;
      overflow-x: auto;
      font-size: 0.9em;
      margin-top: 10px;
    }

    pre {
      margin: 0;
      font-family: 'Fira Code', monospace;
    }
  }
}
</style>