<template>
  <div class="mockjs-guide-container">
    <header class="guide-header">
      <h1>Mock.js 使用指南</h1>
      <p>轻松生成随机数据，拦截 AJAX 请求，提升前端开发效率</p>
      <p><a href="https://mockjs.fenxianglu.cn/" target="_blank">Mock.js 中文官网</a></p>
    </header>

    <div class="guide-content">
      <!-- 导航 -->
      <nav class="navigation">
        <ul>
          <li v-for="section in sections" :key="section.id" @click="scrollToSection(section.id)">
            {{ section.title }}
          </li>
        </ul>
      </nav>

      <!-- 内容区域 -->
      <div class="content">
        <!-- 什么是Mock.js -->
        <section id="what-is-mockjs" class="guide-section">
          <h2>1. 什么是 Mock.js？</h2>
          <p>
            Mock.js 是一个用于生成随机数据、拦截 AJAX
            请求的前端库。它可以让前端开发人员独立于后端进行开发，通过定义数据模板生成模拟数据，实现前后端分离开发。
          </p>
          <div class="feature-grid">
            <div class="feature-card">
              <div class="feature-icon">📊</div>
              <h3>数据模拟</h3>
              <p>根据模板生成随机数据，支持多种数据类型</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔌</div>
              <h3>AJAX 拦截</h3>
              <p>拦截 AJAX 请求并返回模拟数据</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⚙️</div>
              <h3>语法丰富</h3>
              <p>提供多种数据占位符和生成规则</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <h3>开发加速</h3>
              <p>无需等待后端接口，前端可独立开发</p>
            </div>
          </div>
        </section>

        <!-- 安装与配置 -->
        <section id="installation" class="guide-section">
          <h2>2. 安装与配置</h2>
          <h3>安装</h3>
          <pre class="code-block">
npm install mockjs --save-dev
# 或
yarn add mockjs --dev</pre
          >

          <h3>在 Vue 项目中配置</h3>
          <p>在项目中创建 <code>src/mock/index.ts</code> 文件：</p>
          <pre class="code-block">
import Mock from 'mockjs'

// 创建 Mock.Random 实例
const Random = Mock.Random

// 设置全局延时
Mock.setup({
  timeout: '200-600' // 200ms 到 600ms 随机延时
})

// 导出 Mock 和 Random
export { Mock, Random }</pre
          >

          <p>在 <code>main.ts</code> 中引入：</p>
          <pre class="code-block">
import { createApp } from 'vue'
import App from './App.vue'
import './mock' // 引入 mock 配置

createApp(App).mount('#app')</pre
          >
        </section>

        <!-- 基本使用 -->
        <section id="basic-usage" class="guide-section">
          <h2>3. 基本使用</h2>
          <h3>创建模拟数据</h3>
          <pre class="code-block">
import { Mock } from 'mockjs'

// 定义数据模板
const template = {
  'list|5-10': [ // 随机生成 5-10 个元素
    {
      'id|+1': 1, // 自增 ID
      name: '@cname', // 随机中文名
      age: '@integer(20,60)', // 20-60 之间的整数
      email: '@email', // 随机邮箱
      address: '@county(true)', // 随机省市区
      birth: '@date("yyyy-MM-dd")', // 随机日期
      avatar: Random.image('100x100', '#4A7BF7', '#fff', 'avatar') // 随机图片
    }
  ]
}

// 生成模拟数据
const mockData = Mock.mock(template)
console.log(mockData)</pre
          >

          <h3>拦截 AJAX 请求</h3>
          <pre class="code-block">
// 在 mock/index.ts 中添加
Mock.mock('/api/users', 'get', {
  code: 200,
  message: 'success',
  data: {
    'list|10': [
      {
        'id|+1': 1,
        name: '@cname',
        'age|20-60': 1,
        'gender|1': ['男', '女']
      }
    ]
  }
})

// 在组件中请求
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data))</pre
          >
        </section>

        <!-- 数据模板语法 -->
        <section id="template-syntax" class="guide-section">
          <h2>4. 数据模板语法</h2>
          <p>Mock.js 使用特殊语法定义数据模板：</p>

          <div class="syntax-examples">
            <div class="example">
              <h3>基本格式</h3>
              <pre class="code-block">'name|rule': value</pre>
              <p>其中 <code>rule</code> 是生成规则，<code>value</code> 是值</p>
            </div>

            <div class="example">
              <h3>属性值是字符串</h3>
              <pre class="code-block">
{
  'name|1-10': '★',    // 重复 1-10 个星号
  'email|3': '@email'  // 重复 3 次随机邮箱
}</pre
              >
            </div>

            <div class="example">
              <h3>属性值是数字</h3>
              <pre class="code-block">
{
  'age|1-100': 1,       // 1-100 之间的整数
  'score|80-100.1-2': 1 // 80-100 之间的浮点数，小数点后1-2位
}</pre
              >
            </div>

            <div class="example">
              <h3>属性值是布尔值</h3>
              <pre class="code-block">
{
  'isAdmin|1': true,    // 50% 概率为 true
  'isActive|1-9': true  // 1/10 概率为 true，9/10 概率为 false
}</pre
              >
            </div>
          </div>
        </section>

        <!-- 占位符 -->
        <section id="placeholders" class="guide-section">
          <h2>5. 常用占位符</h2>
          <div class="placeholder-table">
            <table>
              <thead>
                <tr>
                  <th>占位符</th>
                  <th>描述</th>
                  <th>示例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>@boolean</code></td>
                  <td>随机布尔值</td>
                  <td><code>@boolean</code></td>
                </tr>
                <tr>
                  <td><code>@natural</code></td>
                  <td>自然数(大于等于0的整数)</td>
                  <td><code>@natural(1, 100)</code></td>
                </tr>
                <tr>
                  <td><code>@integer</code></td>
                  <td>整数</td>
                  <td><code>@integer(-100, 100)</code></td>
                </tr>
                <tr>
                  <td><code>@float</code></td>
                  <td>浮点数</td>
                  <td><code>@float(0, 100, 2, 4)</code></td>
                </tr>
                <tr>
                  <td><code>@character</code></td>
                  <td>随机字符</td>
                  <td><code>@character("aeiou")</code></td>
                </tr>
                <tr>
                  <td><code>@string</code></td>
                  <td>随机字符串</td>
                  <td><code>@string(5, 10)</code></td>
                </tr>
                <tr>
                  <td><code>@range</code></td>
                  <td>整数数组</td>
                  <td><code>@range(1, 10, 2)</code></td>
                </tr>
                <tr>
                  <td><code>@date</code></td>
                  <td>日期</td>
                  <td><code>@date("yyyy-MM-dd")</code></td>
                </tr>
                <tr>
                  <td><code>@time</code></td>
                  <td>时间</td>
                  <td><code>@time("HH:mm:ss")</code></td>
                </tr>
                <tr>
                  <td><code>@datetime</code></td>
                  <td>日期时间</td>
                  <td><code>@datetime</code></td>
                </tr>
                <tr>
                  <td><code>@image</code></td>
                  <td>图片URL</td>
                  <td><code>@image("200x100")</code></td>
                </tr>
                <tr>
                  <td><code>@color</code></td>
                  <td>颜色</td>
                  <td><code>@color</code></td>
                </tr>
                <tr>
                  <td><code>@cname</code></td>
                  <td>中文姓名</td>
                  <td><code>@cname</code></td>
                </tr>
                <tr>
                  <td><code>@cword</code></td>
                  <td>中文词语</td>
                  <td><code>@cword(2, 4)</code></td>
                </tr>
                <tr>
                  <td><code>@csentence</code></td>
                  <td>中文句子</td>
                  <td><code>@csentence(5, 10)</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 高级用法 -->
        <section id="advanced-usage" class="guide-section">
          <h2>6. 高级用法</h2>

          <h3>自定义占位符</h3>
          <pre class="code-block">
import { Random } from 'mockjs'

// 扩展占位符
Random.extend({
  constellation: function() {
    const constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
    return this.pick(constellations)
  }
})

// 使用自定义占位符
Mock.mock({
  'list|5': [{
    name: '@cname',
    constellation: '@constellation'
  }]
})</pre
          >

          <h3>使用函数生成数据</h3>
          <pre class="code-block">
Mock.mock('/api/user', 'get', function(options) {
  // options 包含请求信息
  console.log(options.url) // /api/user
  console.log(options.type) // GET

  return Mock.mock({
    id: '@id',
    name: '@cname',
    'age|20-50': 1,
    token: Mock.Random.guid()
  })
})</pre
          >

          <h3>根据请求参数动态响应</h3>
          <pre class="code-block">
Mock.mock(/\/api\/user\/\d+/, 'get', function(options) {
  // 从 URL 中提取用户 ID
  const id = options.url.split('/').pop()

  return Mock.mock({
    code: 200,
    data: {
      id: id,
      name: '@cname',
      email: '@email',
      role: '@pick(["admin", "editor", "user"])'
    }
  })
})</pre
          >
        </section>

        <!-- 最佳实践 -->
        <section id="best-practices" class="guide-section">
          <h2>7. 最佳实践</h2>
          <div class="practices">
            <div class="practice">
              <h3>模块化管理</h3>
              <p>将不同模块的 mock 数据分开管理：</p>
              <pre class="code-block">
src/mock/
├── index.ts         # 入口文件
├── user.ts          # 用户相关 mock
├── product.ts       # 产品相关 mock
└── order.ts         # 订单相关 mock</pre
              >
            </div>

            <div class="practice">
              <h3>环境区分</h3>
              <p>只在开发环境启用 mock：</p>
              <pre class="code-block">
// main.ts
if (process.env.NODE_ENV === 'development') {
  import('./mock')
}</pre
              >
            </div>

            <div class="practice">
              <h3>真实数据模拟</h3>
              <p>尽量模拟真实数据结构，包括状态码、消息和数据结构：</p>
              <pre class="code-block">
Mock.mock('/api/login', 'post', {
  code: 200,
  message: '登录成功',
  data: {
    userId: '@id',
    token: '@guid',
    expire: '@datetime'
  }
})</pre
              >
            </div>
          </div>
        </section>

        <!-- 总结 -->
        <section id="conclusion" class="guide-section">
          <h2>8. 总结</h2>
          <div class="summary">
            <p>Mock.js 是一个强大的前端数据模拟工具，可以帮助开发者：</p>
            <ul>
              <li>独立于后端进行开发，提高开发效率</li>
              <li>生成丰富多样的随机数据</li>
              <li>拦截 AJAX 请求并返回模拟数据</li>
              <li>自定义数据生成规则和占位符</li>
              <li>实现真实场景的数据模拟</li>
            </ul>
            <p>通过合理使用 Mock.js，可以显著提升前端开发体验和效率。</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 导航部分
const sections = ref([
  { id: 'what-is-mockjs', title: '什么是 Mock.js？' },
  { id: 'installation', title: '安装与配置' },
  { id: 'basic-usage', title: '基本使用' },
  { id: 'template-syntax', title: '数据模板语法' },
  { id: 'placeholders', title: '常用占位符' },
  { id: 'advanced-usage', title: '高级用法' },
  { id: 'best-practices', title: '最佳实践' },
  { id: 'conclusion', title: '总结' },
])

// 滚动到指定部分
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped lang="less">
@primary-color: #4a7bf7;
@secondary-color: #6c5ce7;
@text-color: #2d3436;
@light-bg: #f8f9fa;
@border-color: #e0e0e0;
@code-bg: #f5f7fa;

.mockjs-guide-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.guide-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    color: @primary-color;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
  }
}

.guide-content {
  display: flex;
  gap: 2rem;
}

.navigation {
  flex: 0 0 240px;
  position: sticky;
  top: 2rem;
  height: fit-content;
  background: @light-bg;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.8rem 1rem;
      margin-bottom: 0.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;

      &:hover {
        background: lighten(@primary-color, 40%);
        color: @primary-color;
      }

      &:active {
        transform: translateY(1px);
      }
    }
  }
}

.content {
  flex: 1;
}

.guide-section {
  margin-bottom: 3rem;
  padding: 1.5rem 2rem;
  background: @light-bg;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

  h2 {
    color: @secondary-color;
    font-size: 1.8rem;
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid lighten(@secondary-color, 40%);
  }

  h3 {
    color: @primary-color;
    font-size: 1.3rem;
    margin-top: 1.5rem;
  }

  p {
    line-height: 1.6;
    margin-bottom: 1.2rem;
  }
}

.code-block {
  display: block;
  background: @code-bg;
  border-radius: 6px;
  padding: 1.2rem;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.95rem;
  overflow-x: auto;
  margin: 1.2rem 0;
  border-left: 4px solid @primary-color;
  line-height: 1.5;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0.5rem 0;
    font-size: 1.2rem;
  }

  p {
    font-size: 0.95rem;
    color: lighten(@text-color, 20%);
    margin: 0;
  }
}

.syntax-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.example {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
  }
}

.placeholder-table {
  overflow-x: auto;
  margin: 1.5rem 0;

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: lighten(@primary-color, 45%);
      font-weight: 600;
    }

    tr:last-child td {
      border-bottom: none;
    }

    code {
      background: @code-bg;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: monospace;
    }
  }
}

.practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.practice {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
  }
}

.summary {
  background: lighten(@primary-color, 48%);
  border-radius: 8px;
  padding: 1.5rem;

  p {
    font-weight: 500;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.5;
    }
  }
}

@media (max-width: 768px) {
  .guide-content {
    flex-direction: column;
  }

  .navigation {
    position: static;
    margin-bottom: 1.5rem;
  }
}
</style>
