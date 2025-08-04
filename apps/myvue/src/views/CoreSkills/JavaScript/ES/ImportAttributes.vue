<template>
  <div class="import-attributes-guide">
    <header class="guide-header">
      <h1 class="title">ES Import Attributes 完全解析</h1>
      <p class="subtitle">新一代模块导入的元数据控制方案</p>
    </header>

    <div class="content-grid">
      <!-- 基础介绍 -->
      <section class="intro-section">
        <h2 class="section-title">🔍 什么是 Import Attributes？</h2>
        <div class="intro-card">
          <p>
            Import Attributes 是 ECMAScript 提案（现已进入 Stage
            3）中的新特性，允许开发者在导入模块时附加元数据信息，为模块系统提供更精细的控制能力。
          </p>
          <div class="feature-highlight">
            <div class="feature-item">
              <div class="icon">🆕</div>
              <p>ES2023+ 新特性</p>
            </div>
            <div class="feature-item">
              <div class="icon">🧩</div>
              <p>模块导入的元数据控制</p>
            </div>
            <div class="feature-item">
              <div class="icon">⚡</div>
              <p>替代已废弃的 import assertions</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 基础用法 -->
      <section class="usage-section">
        <h2 class="section-title">🛠️ 基础用法</h2>
        <div class="code-example">
          <h3>JSON 导入</h3>
          <pre class="code-block"><code>import jsonData from "./data.json" with { type: "json" };

console.log(jsonData.message); // 直接使用解析后的JSON对象</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>安全导入JSON文件，避免直接eval的风险</p>
        </div>

        <div class="code-example">
          <h3>WebAssembly 导入</h3>
          <pre
            class="code-block"
          ><code>import wasmModule from "./module.wasm" with { type: "webassembly" };

const instance = await WebAssembly.instantiate(wasmModule);</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>类型安全的WASM模块导入</p>
        </div>
      </section>

      <!-- 高级用法 -->
      <section class="advanced-section">
        <h2 class="section-title">🚀 高级用法</h2>
        <div class="code-example">
          <h3>自定义模块类型</h3>
          <pre class="code-block"><code>// 配置vite等打包工具支持自定义类型
import shaderSource from "./shader.glsl" with { type: "text" };

// 在WebGL中使用
gl.shaderSource(shader, shaderSource);</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>非标准资源导入（GLSL、CSV等）</p>
        </div>

        <div class="code-example">
          <h3>条件性导入</h3>
          <pre class="code-block"><code>// 根据环境变量选择导入方式
const config = import.meta.env.PROD
  ? await import("./config.prod.json", { with: { type: "json" } })
  : await import("./config.dev.json", { with: { type: "json" } });</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>环境特定的配置加载</p>
        </div>
      </section>

      <!-- 与现有方案对比 -->
      <section class="comparison-section">
        <h2 class="section-title">⚖️ 与传统方案对比</h2>
        <div class="comparison-grid">
          <div class="comparison-card old">
            <h3>传统方式</h3>
            <pre class="code-block"><code>// 动态导入JSON
const data = await fetch('/data.json')
  .then(res => res.json());

// Webpack loader语法
import json from 'json-loader!./file.json';</code></pre>
            <ul class="drawbacks">
              <li>需要额外请求</li>
              <li>依赖构建工具</li>
              <li>类型不安全</li>
            </ul>
          </div>
          <div class="comparison-card new">
            <h3>Import Attributes</h3>
            <pre class="code-block"><code>// 静态导入
import data from './data.json'
  with { type: 'json' };

// 动态导入
const mod = await import('./mod.wasm',
  { with: { type: 'webassembly' } });</code></pre>
            <ul class="benefits">
              <li>原生浏览器支持</li>
              <li>编译时类型检查</li>
              <li>标准化语法</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 配置与支持 -->
      <section class="config-section">
        <h2 class="section-title">⚙️ 环境配置</h2>
        <div class="config-grid">
          <div class="config-card">
            <h3>TypeScript 配置</h3>
            <pre class="code-block"><code>// tsconfig.json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "types": ["vite/client"] // 对于Vite环境
  }
}</code></pre>
          </div>
          <div class="config-card">
            <h3>Vite 配置</h3>
            <pre class="code-block"><code>// vite.config.ts
export default defineConfig({
  esbuild: {
    supported: {
      'import-attributes': true // 启用支持
    }
  }
})</code></pre>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// 示例动态导入
// async function loadConfig() {
//   return await import("../config.json", {
//     with: { type: "json" }
//   });
// }
</script>

<style lang="less" scoped>
.import-attributes-guide {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #2d3748;
  line-height: 1.6;
}

.guide-header {
  text-align: center;
  margin-bottom: 3rem;

  .title {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #2d3748;
    font-weight: 800;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
    font-weight: 400;
  }
}

.section-title {
  font-size: 1.8rem;
  color: #2d3748;
  margin-top: 0;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    border-radius: 2px;
  }
}

.content-grid {
  display: grid;
  gap: 2rem;
}

.intro-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  p {
    font-size: 1.1rem;
    color: #475569;
    margin-top: 0;
  }
}

.feature-highlight {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.feature-item {
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  .icon {
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-weight: 500;
    color: #334155;
  }
}

.code-example {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    margin-top: 0;
    color: #1e40af;
    font-size: 1.2rem;
  }
}

.usage-scenario {
  margin: 0.8rem 0 0;
  font-size: 0.9rem;
  color: #64748b;

  b {
    color: #475569;
  }
}

.code-block {
  background: #1e293b;
  border-radius: 0.375rem;
  padding: 1rem;
  overflow-x: auto;

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    color: #f8fafc;
    line-height: 1.5;
    white-space: pre;
  }
}

.comparison-section {
  margin: 2rem 0;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.comparison-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    margin-top: 0;
    color: #1e40af;
    font-size: 1.3rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  pre {
    margin: 1rem 0;
  }
}

.old {
  border-top: 4px solid #f87171;

  .drawbacks {
    color: #b91c1c;
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.5rem;
      position: relative;

      &::before {
        content: '×';
        color: #ef4444;
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
      }
    }
  }
}

.new {
  border-top: 4px solid #4ade80;

  .benefits {
    color: #166534;
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.5rem;
      position: relative;

      &::before {
        content: '✓';
        color: #22c55e;
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
      }
    }
  }
}

.config-section {
  margin-top: 2rem;
}

.config-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.config-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    margin-top: 0;
    color: #1e40af;
    font-size: 1.2rem;
  }

  pre {
    margin: 0;
  }
}
</style>
