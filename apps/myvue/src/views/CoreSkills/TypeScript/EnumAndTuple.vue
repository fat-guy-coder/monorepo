<template>
  <div class="enum-tuple-guide">
    <header class="guide-header">
      <h1 class="title">枚举(Enum)与元组(Tuple)指南</h1>
      <p class="subtitle">TypeScript特有的数据结构解决方案</p>
    </header>

    <div class="content-columns">
      <!-- 枚举部分 -->
      <section class="enum-section">
        <h2 class="section-title">🔢 枚举(Enum)</h2>
        <div class="feature-card">
          <h3>数字枚举</h3>
          <pre class="code-block"><code>enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

const move = (dir: Direction) => {
  // 方向处理逻辑
}</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>有限选项集合、状态码、模式标识</p>
        </div>

        <div class="feature-card">
          <h3>字符串枚举</h3>
          <pre class="code-block"><code>enum LogLevel {
  Error = 'ERROR',
  Warn = 'WARN',
  Info = 'INFO'
}

function log(message: string, level: LogLevel) {
  console[level](message)
}</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>需要可读性高的常量、日志级别、API动作类型</p>
        </div>

        <div class="feature-card">
          <h3>常量枚举</h3>
          <pre class="code-block"><code>const enum HttpCode {
  OK = 200,
  NotFound = 404,
  ServerError = 500
}

// 编译后会被替换为字面量
const code = HttpCode.OK  // => 编译为 const code = 200</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>性能敏感场景、避免生成额外代码</p>
        </div>
      </section>

      <!-- 元组部分 -->
      <section class="tuple-section">
        <h2 class="section-title">🧩 元组(Tuple)</h2>
        <div class="feature-card">
          <h3>基础元组</h3>
          <pre class="code-block"><code>type Point = [number, number]
const p: Point = [10, 20]

function moveTo([x, y]: Point) {
  console.log(`移动到坐标: ${x}, ${y}`)
}</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>坐标点、固定长度的数据集合</p>
        </div>

        <div class="feature-card">
          <h3>带标签的元组</h3>
          <pre class="code-block"><code>type HttpResponse = [
  status: number,
  data: string,
  headers?: Record &lt;string, string&gt;
]

const res: HttpResponse = [
  200,
  '{"success": true}',
  { 'Content-Type': 'application/json' }
]</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>函数多返回值、结构化数据、增强可读性</p>
        </div>

        <div class="feature-card">
          <h3>可变长度元组</h3>
          <pre class="code-block"><code>type StringNumberPairs = [string, number, ...string[]]

const pair1: StringNumberPairs = ['age', 25]
const pair2: StringNumberPairs = ['colors', 3, 'red', 'green', 'blue']</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>灵活长度的参数列表、混合类型数组</p>
        </div>
      </section>
    </div>

    <section class="comparison-section">
      <h2 class="section-title">⚖️ 核心差异与选择建议</h2>
      <div class="comparison-grid">
        <div class="pros-card">
          <h3>何时使用枚举？</h3>
          <ul>
            <li>需要<strong>命名常量集合</strong>时</li>
            <li>提高代码<strong>可读性</strong>和<strong>可维护性</strong></li>
            <li>与后端<strong>枚举值</strong>保持同步</li>
            <li>需要<strong>反向映射</strong>功能时</li>
          </ul>
        </div>
        <div class="pros-card">
          <h3>何时使用元组？</h3>
          <ul>
            <li>处理<strong>固定长度</strong>的异构集合</li>
            <li>函数返回<strong>多个值</strong>时</li>
            <li>需要<strong>精确位置类型</strong>控制</li>
            <li>React的<strong>useState</strong>返回类型</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="best-practice">
      <h2 class="section-title">🏆 最佳实践</h2>
      <div class="practice-tips">
        <div class="tip-card">
          <h3>枚举优化技巧</h3>
          <pre class="code-block"><code>// 使用常量枚举减少运行时开销
const enum Size {
  Small,
  Large
}

// 字符串枚举提供更好调试体验
enum Env {
  Dev = 'development',
  Prod = 'production'
}</code></pre>
        </div>
        <div class="tip-card">
          <h3>元组使用建议</h3>
          <pre class="code-block"><code>// 使用解构处理元组
const [id, name] = getUserInfo()

// 标签元组增强可读性
type Config = [
  port: number,
  host: string,
  ssl?: boolean
]</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 示例枚举定义
enum ExampleStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

// 示例元组定义
type ExampleCoords = [latitude: number, longitude: number]
</script>

<style lang="less" scoped>
.enum-tuple-guide {
  max-width: 1200px;
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

.content-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

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
  margin-bottom: 3rem;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.pros-card {
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

  ul {
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.8rem;
      color: #475569;

      strong {
        color: #1e40af;
      }
    }
  }
}

.best-practice {
  margin-top: 2rem;
}

.practice-tips {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.tip-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

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