<template>
  <div class="chalk-demo">
    <header>
      <h1>Chalk.js API 文档</h1>
      <p>终端字符串样式化工具库，提供简单直观的API为控制台输出添加颜色和样式</p>
    </header>

    <div class="api-section">
      <h2>基础颜色</h2>
      <div class="api-grid">
        <div v-for="api in basicColors" :key="api.name" class="api-card">
          <div class="api-header">
            <code class="api-name">{{ api.name }}</code>
            <div class="api-example" :class="api.cssClass">{{ api.example }}</div>
          </div>
          <p class="api-description">{{ api.description }}</p>
        </div>
      </div>
    </div>

    <div class="api-section">
      <h2>背景颜色</h2>
      <div class="api-grid">
        <div v-for="api in backgroundColors" :key="api.name" class="api-card">
          <div class="api-header">
            <code class="api-name">{{ api.name }}</code>
            <div class="api-example" :class="api.cssClass">{{ api.example }}</div>
          </div>
          <p class="api-description">{{ api.description }}</p>
        </div>
      </div>
    </div>

    <div class="api-section">
      <h2>文本样式</h2>
      <div class="api-grid">
        <div v-for="api in textStyles" :key="api.name" class="api-card">
          <div class="api-header">
            <code class="api-name">{{ api.name }}</code>
            <div class="api-example" :class="api.cssClass">{{ api.example }}</div>
          </div>
          <p class="api-description">{{ api.description }}</p>
        </div>
      </div>
    </div>

    <div class="api-section">
      <h2>组合样式</h2>
      <div class="api-grid">
        <div v-for="api in combinedStyles" :key="api.name" class="api-card">
          <div class="api-header">
            <code class="api-name">{{ api.name }}</code>
            <div class="api-example" :class="api.cssClass">{{ api.example }}</div>
          </div>
          <p class="api-description">{{ api.description }}</p>
        </div>
      </div>
    </div>

    <div class="usage-section">
      <h2>使用示例</h2>
      <pre class="code-block"><code>// 安装
npm install chalk

// 基本使用
import chalk from 'chalk';

console.log(chalk.blue('蓝色文本'));
console.log(chalk.bgRed.white('白色文本红色背景'));
console.log(chalk.underline.green('带下划线的绿色文本'));

// 组合样式
const error = chalk.bold.red;
const warning = chalk.hex('#FFA500');
console.log(error('错误信息'));
console.log(warning('警告信息'));

// 模板字符串
console.log(chalk`
  {rgb(255,131,0).bold 橙色加粗文本}
  {bgWhite.black 黑色文本白色背景}
  {underline.italic 带下划线的斜体文本}
`);</code></pre>
    </div>

    <footer>
      <p>Chalk.js v5.3.0 | MIT License | 在终端中创建丰富多彩的输出</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 定义API类型
interface ChalkAPI {
  name: string
  example: string
  description: string
  cssClass: string
}

// 基础颜色API
const basicColors = ref<ChalkAPI[]>([
  {
    name: 'chalk.black',
    example: '黑色文本',
    description: '设置文本颜色为黑色',
    cssClass: 'black',
  },
  {
    name: 'chalk.red',
    example: '红色文本',
    description: '设置文本颜色为红色',
    cssClass: 'red',
  },
  {
    name: 'chalk.green',
    example: '绿色文本',
    description: '设置文本颜色为绿色',
    cssClass: 'green',
  },
  {
    name: 'chalk.yellow',
    example: '黄色文本',
    description: '设置文本颜色为黄色',
    cssClass: 'yellow',
  },
  {
    name: 'chalk.blue',
    example: '蓝色文本',
    description: '设置文本颜色为蓝色',
    cssClass: 'blue',
  },
  {
    name: 'chalk.magenta',
    example: '品红色文本',
    description: '设置文本颜色为品红',
    cssClass: 'magenta',
  },
  {
    name: 'chalk.cyan',
    example: '青色文本',
    description: '设置文本颜色为青色',
    cssClass: 'cyan',
  },
  {
    name: 'chalk.white',
    example: '白色文本',
    description: '设置文本颜色为白色',
    cssClass: 'white',
  },
])

// 背景颜色API
const backgroundColors = ref<ChalkAPI[]>([
  {
    name: 'chalk.bgBlack',
    example: '黑色背景',
    description: '设置背景颜色为黑色',
    cssClass: 'bg-black',
  },
  {
    name: 'chalk.bgRed',
    example: '红色背景',
    description: '设置背景颜色为红色',
    cssClass: 'bg-red',
  },
  {
    name: 'chalk.bgGreen',
    example: '绿色背景',
    description: '设置背景颜色为绿色',
    cssClass: 'bg-green',
  },
  {
    name: 'chalk.bgYellow',
    example: '黄色背景',
    description: '设置背景颜色为黄色',
    cssClass: 'bg-yellow',
  },
  {
    name: 'chalk.bgBlue',
    example: '蓝色背景',
    description: '设置背景颜色为蓝色',
    cssClass: 'bg-blue',
  },
  {
    name: 'chalk.bgMagenta',
    example: '品红色背景',
    description: '设置背景颜色为品红',
    cssClass: 'bg-magenta',
  },
  {
    name: 'chalk.bgCyan',
    example: '青色背景',
    description: '设置背景颜色为青色',
    cssClass: 'bg-cyan',
  },
  {
    name: 'chalk.bgWhite',
    example: '白色背景',
    description: '设置背景颜色为白色',
    cssClass: 'bg-white',
  },
])

// 文本样式API
const textStyles = ref<ChalkAPI[]>([
  {
    name: 'chalk.bold',
    example: '加粗文本',
    description: '设置文本为粗体',
    cssClass: 'bold',
  },
  {
    name: 'chalk.dim',
    example: '暗淡文本',
    description: '设置文本为较暗的样式',
    cssClass: 'dim',
  },
  {
    name: 'chalk.italic',
    example: '斜体文本',
    description: '设置文本为斜体',
    cssClass: 'italic',
  },
  {
    name: 'chalk.underline',
    example: '下划线文本',
    description: '为文本添加下划线',
    cssClass: 'underline',
  },
  {
    name: 'chalk.inverse',
    example: '反转颜色文本',
    description: '反转前景色和背景色',
    cssClass: 'inverse',
  },
  {
    name: 'chalk.hidden',
    example: '隐藏文本',
    description: '隐藏文本（打印但不可见）',
    cssClass: 'hidden',
  },
  {
    name: 'chalk.strikethrough',
    example: '删除线文本',
    description: '为文本添加删除线',
    cssClass: 'strikethrough',
  },
  {
    name: 'chalk.visible',
    example: '可见文本',
    description: '使隐藏文本可见',
    cssClass: 'visible',
  },
])

// 组合样式API
const combinedStyles = ref<ChalkAPI[]>([
  {
    name: 'chalk.rgb(150, 100, 255)',
    example: '自定义RGB颜色',
    description: '使用RGB值设置文本颜色',
    cssClass: 'rgb',
  },
  {
    name: 'chalk.hex("#FF8800")',
    example: '自定义HEX颜色',
    description: '使用十六进制值设置文本颜色',
    cssClass: 'hex',
  },
  {
    name: 'chalk.bgRgb(150, 100, 255)',
    example: '自定义RGB背景',
    description: '使用RGB值设置背景颜色',
    cssClass: 'bg-rgb',
  },
  {
    name: 'chalk.bgHex("#FF8800")',
    example: '自定义HEX背景',
    description: '使用十六进制值设置背景颜色',
    cssClass: 'bg-hex',
  },
])
</script>

<style lang="less" scoped>


.chalk-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f8fafc;
  color: #334155;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e2e8f0;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.1rem;
      color: #64748b;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }

  .api-section {
    margin-bottom: 2.5rem;

    h2 {
      font-size: 1.8rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e2e8f0;
    }
  }

  .api-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .api-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    transition:
      transform 0.2s,
      box-shadow 0.2s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    }
  }

  .api-header {
    padding: 1.2rem;
    border-bottom: 1px solid #f1f5f9;
  }

  .api-name {
    display: block;
    font-family: 'Source Code Pro', monospace;
    font-size: 0.95rem;
    background: #f1f5f9;
    padding: 0.5rem 0.8rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    color: #0f172a;
    overflow-x: auto;
  }

  .api-example {
    font-family: 'Source Code Pro', monospace;
    font-size: 1.1rem;
    font-weight: 500;
    padding: 0.8rem 1rem;
    border-radius: 6px;
    text-align: center;
    transition: all 0.2s;
  }

  .api-description {
    padding: 1.2rem;
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #475569;
  }

  .usage-section {
    margin-top: 3rem;

    h2 {
      font-size: 1.8rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 1.5rem;
    }
  }

  .code-block {
    background: #0f172a;
    color: #e2e8f0;
    border-radius: 10px;
    padding: 1.5rem;
    overflow-x: auto;
    font-family: 'Source Code Pro', monospace;
    font-size: 0.95rem;
    line-height: 1.6;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);

    code {
      display: block;
    }
  }

  footer {
    margin-top: 3rem;
    padding-top: 1.5rem;
    text-align: center;
    border-top: 1px solid #e2e8f0;
    color: #64748b;
    font-size: 0.9rem;
  }

  // 颜色样式类
  .black {
    color: #000;
    background: #f8fafc;
  }
  .red {
    color: #e53e3e;
    background: #fef2f2;
  }
  .green {
    color: #38a169;
    background: #f0fdf4;
  }
  .yellow {
    color: #d69e2e;
    background: #fffbeb;
  }
  .blue {
    color: #3182ce;
    background: #ebf8ff;
  }
  .magenta {
    color: #d53f8c;
    background: #fff5f7;
  }
  .cyan {
    color: #00a3c4;
    background: #ecfeff;
  }
  .white {
    color: #4a5568;
    background: #fff;
    border: 1px solid #e2e8f0;
  }

  .bg-black {
    background: #1a202c;
    color: #fff;
  }
  .bg-red {
    background: #e53e3e;
    color: #fff;
  }
  .bg-green {
    background: #38a169;
    color: #fff;
  }
  .bg-yellow {
    background: #d69e2e;
    color: #fff;
  }
  .bg-blue {
    background: #3182ce;
    color: #fff;
  }
  .bg-magenta {
    background: #d53f8c;
    color: #fff;
  }
  .bg-cyan {
    background: #00a3c4;
    color: #fff;
  }
  .bg-white {
    background: #fff;
    color: #1a202c;
    border: 1px solid #e2e8f0;
  }

  .rgb {
    color: #9664ff;
    background: #f5f3ff;
  }
  .hex {
    color: #ff8800;
    background: #fff7ed;
  }
  .bg-rgb {
    background: #9664ff;
    color: #fff;
  }
  .bg-hex {
    background: #ff8800;
    color: #fff;
  }

  // 文本样式类
  .bold {
    font-weight: 700;
  }
  .dim {
    opacity: 0.7;
  }
  .italic {
    font-style: italic;
  }
  .underline {
    text-decoration: underline;
  }
  .inverse {
    background: #334155;
    color: #f8fafc;
  }
  .hidden {
    color: transparent;
    background: #f1f5f9;
  }
  .strikethrough {
    text-decoration: line-through;
  }
  .visible {
    color: #334155;
    background: #f8fafc;
  }
}
</style>
