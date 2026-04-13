<template>
  <div class="comments-container">
    <header class="app-header">
      <h1>JavaScript 代码注释与说明规范</h1>
      <p class="subtitle">编写清晰、一致且可维护的代码文档指南</p>
    </header>

    <div class="content-wrapper">
      <!-- 介绍部分 -->
      <section class="intro-section">
        <div class="info-card">
          <div class="header-with-icon">
            <div class="icon">📝</div>
            <h2>为什么需要良好的注释？</h2>
          </div>
          <p>良好的注释是高质量代码的重要组成部分，它能提高代码的可读性、可维护性和协作效率。研究表明，开发人员大约花费70%的时间阅读和理解代码，而只有30%的时间编写新代码。</p>

          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon">👁️</div>
              <h3>提高可读性</h3>
              <p>解释复杂逻辑和算法意图</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">🤝</div>
              <h3>促进协作</h3>
              <p>帮助团队成员理解代码</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">⏱️</div>
              <h3>节省时间</h3>
              <p>减少理解代码所需时间</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">🔍</div>
              <h3>辅助调试</h3>
              <p>提供上下文和设计决策</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 基础注释 -->
      <section class="basic-section">
        <h2 class="section-title">基础注释规范</h2>

        <div class="basic-grid">
          <div class="basic-card">
            <div class="basic-header">
              <div class="icon">💬</div>
              <h3>单行注释</h3>
            </div>
            <pre class="code-block">// 单行注释：用于简短的说明

// 避免一行代码后跟长注释
const value = 42; // 这个值代表...

// 更好的方式
// 这个值代表...
const value = 42;</pre>
            <div class="best-practice">
              <h4>最佳实践：</h4>
              <ul>
                <li>使用<code>//</code>进行单行注释</li>
                <li>注释与代码间保留一个空格</li>
                <li>避免行尾长注释（超过40字符）</li>
                <li>注释应解释"为什么"，而非"是什么"</li>
              </ul>
            </div>
          </div>

          <div class="basic-card">
            <div class="basic-header">
              <div class="icon">📄</div>
              <h3>多行注释</h3>
            </div>
            <pre class="code-block">/*
 * 多行注释用于较长的解释
 * 每行以星号开头并保持对齐
 * 适用于文件头部或复杂逻辑块
 */

/**
 * JSDoc风格的多行注释
 * 用于函数、类等文档说明
 */</pre>
            <div class="best-practice">
              <h4>最佳实践：</h4>
              <ul>
                <li>使用<code>/* ... */</code>格式</li>
                <li>每行开头使用星号并保持对齐</li>
                <li>首行和末行留空</li>
                <li>复杂逻辑前使用多行注释</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 函数注释 -->
      <section class="function-section">
        <h2 class="section-title">函数注释规范 (JSDoc)</h2>

        <div class="function-examples">
          <div class="example-card">
            <h3>基础函数注释</h3>
            <pre class="code-block">/**
 * 计算两个数字的和
 *
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两个数字的和
 */
function add(a, b) {
  return a + b;
}</pre>
          </div>

          <div class="example-card">
            <h3>带可选参数和默认值</h3>
            <pre class="code-block">/**
 * 格式化用户信息
 *
 * @param {string} name - 用户名
 * @param {number} [age=18] - 用户年龄（可选）
 * @param {string} [country='未知'] - 用户国家（可选）
 * @returns {string} 格式化后的用户信息
 */
function formatUser(name, age = 18, country = '未知') {
  return `${name}, ${age}岁, 来自${country}`;
}</pre>
          </div>

          <div class="example-card">
            <h3>复杂函数注释</h3>
            <pre class="code-block">/**
 * 使用二分查找算法在排序数组中查找元素
 *
 * @example
 * // 返回 2
 * binarySearch([1, 2, 3, 4], 3);
 *
 * @param {Array} sortedArray - 已排序的数组
 * @param {number} target - 要查找的目标值
 * @returns {number} 目标值的索引，未找到返回-1
 * @throws {TypeError} 如果输入不是数组
 */
function binarySearch(sortedArray, target) {
  if (!Array.isArray(sortedArray)) {
    throw new TypeError('输入必须是数组');
  }

  let left = 0;
  let right = sortedArray.length - 1;

  while (left <= right) {
    // ... 二分查找实现
  }

  return -1;
}</pre>
          </div>
        </div>

        <div class="jsdoc-tags">
          <h3>常用JSDoc标签</h3>
          <div class="tags-grid">
            <div class="tag-card">
              <code>@param</code>
              <p>描述函数参数</p>
              <pre>@param {type} name - 描述</pre>
            </div>
            <div class="tag-card">
              <code>@returns</code>
              <p>描述返回值</p>
              <pre>@returns {type} 描述</pre>
            </div>
            <div class="tag-card">
              <code>@throws</code>
              <p>描述可能抛出的错误</p>
              <pre>@throws {ErrorType} 描述</pre>
            </div>
            <div class="tag-card">
              <code>@example</code>
              <p>提供使用示例</p>
              <pre>@example // 示例代码</pre>
            </div>
            <div class="tag-card">
              <code>@deprecated</code>
              <p>标记已弃用函数</p>
              <pre>@deprecated 使用新函数代替</pre>
            </div>
            <div class="tag-card">
              <code>@typedef</code>
              <p>定义自定义类型</p>
              <pre>@typedef {Object} TypeName</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 变量注释 -->
      <section class="variable-section">
        <h2 class="section-title">变量注释规范</h2>

        <div class="variable-grid">
          <div class="variable-card">
            <div class="variable-header">
              <div class="icon">🔢</div>
              <h3>常量注释</h3>
            </div>
            <pre class="code-block">/**
 * 圆周率近似值 - 用于几何计算
 * @const {number}
 */
const PI = 3.14159;

// 或使用单行注释
// API基础URL - 所有请求以此开头
const API_BASE_URL = 'https://api.example.com';</pre>
          </div>

          <div class="variable-card">
            <div class="variable-header">
              <div class="icon">📦</div>
              <h3>对象/类注释</h3>
            </div>
            <pre class="code-block">/**
 * 用户信息对象
 * @typedef {Object} User
 * @property {string} id - 用户唯一ID
 * @property {string} name - 用户全名
 * @property {number} age - 用户年龄
 * @property {string} [email] - 用户邮箱（可选）
 */

/** @type {User} */
const currentUser = {
  id: 'u123',
  name: '张三',
  age: 30
};</pre>
          </div>

          <div class="variable-card">
            <div class="variable-header">
              <div class="icon">🔄</div>
              <h3>复杂变量注释</h3>
            </div>
            <pre class="code-block">/**
 * 配置对象 - 应用全局设置
 * @type {Object}
 * @property {boolean} debugMode - 是否启用调试模式
 * @property {number} maxRetries - API调用最大重试次数
 * @property {string[]} allowedDomains - 允许的域名列表
 */
const appConfig = {
  debugMode: true,
  maxRetries: 3,
  allowedDomains: ['example.com', 'test.com']
};</pre>
          </div>

          <div class="variable-card">
            <div class="variable-header">
              <div class="icon">🚩</div>
              <h3>标志位注释</h3>
            </div>
            <pre class="code-block">// 使用位标志表示权限
// 注意：使用位运算时务必注释说明每个标志的含义
const PERMISSIONS = {
  READ: 1 << 0,   // 0001 - 读权限
  WRITE: 1 << 1,  // 0010 - 写权限
  DELETE: 1 << 2, // 0100 - 删除权限
  ADMIN: 1 << 3   // 1000 - 管理员权限
};

// 用户权限组合
const userPermissions = PERMISSIONS.READ | PERMISSIONS.WRITE;</pre>
          </div>
        </div>
      </section>

      <!-- 高级注释 -->
      <section class="advanced-section">
        <h2 class="section-title">高级注释技巧</h2>

        <div class="advanced-grid">
          <div class="advanced-card">
            <div class="advanced-header">
              <div class="icon">🛠️</div>
              <h3>特殊标记</h3>
            </div>
            <div class="advanced-content">
              <pre class="code-block">// TODO: 重构此函数以支持多语言
function greet(user) {
  return `Hello, ${user.name}`;
}

// FIXME: 时区处理有问题，需使用UTC
function formatDate(date) {
  // ...
}

// NOTE: 由于API限制，这里使用轮询而非WebSocket
function fetchUpdates() {
  // ...
}

// HACK: 临时解决方案，需在下一个版本中重构
function temporaryFix() {
  // ...
}</pre>
              <div class="markers-table">
                <table>
                  <thead>
                    <tr>
                      <th>标记</th>
                      <th>含义</th>
                      <th>使用场景</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>TODO</td>
                      <td>计划中的改进</td>
                      <td>功能增强或重构</td>
                    </tr>
                    <tr>
                      <td>FIXME</td>
                      <td>已知问题需要修复</td>
                      <td>临时解决方案或bug</td>
                    </tr>
                    <tr>
                      <td>NOTE</td>
                      <td>重要说明</td>
                      <td>设计决策或注意事项</td>
                    </tr>
                    <tr>
                      <td>HACK</td>
                      <td>临时解决方案</td>
                      <td>非优雅但有效的代码</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="advanced-card">
            <div class="advanced-header">
              <div class="icon">📚</div>
              <h3>文件头部注释</h3>
            </div>
            <div class="advanced-content">
              <pre class="code-block">/**
 * @file 用户管理模块
 * @module services/userService
 * @author 张三
 * @version 1.2.0
 * @license MIT
 * @description 提供用户相关的创建、读取、更新和删除操作
 * @see {@link https://github.com/example/user-service|GitHub仓库}
 * @since 2023-01-15
 */

// 模块代码从这里开始...</pre>
              <div class="file-tags">
                <h4>常用文件级标签：</h4>
                <ul>
                  <li><code>@file</code> - 文件描述</li>
                  <li><code>@module</code> - 模块名称</li>
                  <li><code>@author</code> - 作者信息</li>
                  <li><code>@version</code> - 版本号</li>
                  <li><code>@license</code> - 许可协议</li>
                  <li><code>@see</code> - 相关参考链接</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 注释原则 -->
      <section class="principles-section">
        <h2 class="section-title">注释原则与反模式</h2>

        <div class="principles-grid">
          <div class="principles-card good">
            <div class="principles-header">
              <div class="icon">✅</div>
              <h3>好的注释实践</h3>
            </div>
            <ul>
              <li>解释代码的<strong>意图</strong>而非行为</li>
              <li>说明<strong>为什么</strong>这样实现</li>
              <li>记录<strong>设计决策</strong>和权衡</li>
              <li>提供<strong>使用示例</strong>和上下文</li>
              <li>保持注释<strong>简洁</strong>且<strong>最新</strong></li>
            </ul>
          </div>

          <div class="principles-card bad">
            <div class="principles-header">
              <div class="icon">❌</div>
              <h3>注释反模式</h3>
            </div>
            <ul>
              <li>描述<strong>显而易见</strong>的代码行为</li>
              <li>注释与代码<strong>不一致</strong>或<strong>过时</strong></li>
              <li>过多注释使代码<strong>难以阅读</strong></li>
              <li>使用<strong>含糊不清</strong>的语言</li>
              <li>将注释作为<strong>错误处理</strong>的替代品</li>
            </ul>
          </div>
        </div>

        <div class="example-comparison">
          <div class="bad-example">
            <h4>❌ 差的注释：</h4>
            <pre class="code-block">// 增加计数器
count = count + 1;  // 明显的行为，无需注释

// 设置用户
function setUser(user) {
  // 设置用户
  this.user = user;
}</pre>
          </div>

          <div class="good-example">
            <h4>✅ 好的注释：</h4>
            <pre class="code-block">// 增加重试次数（最多5次）
// 用于处理不稳定的API调用
if (retryCount < MAX_RETRIES) {
  retryCount++;
}

/**
 * 设置当前用户并更新UI状态
 *
 * @param {User} user - 用户对象
 * @emits 'user-change' 当用户变更时触发事件
 */
function setCurrentUser(user) {
  // 存储用户前进行数据清理
  const sanitizedUser = sanitizeUser(user);
  this.currentUser = sanitizedUser;

  // 更新UI状态
  updateUI();

  // 通知其他组件用户已变更
  this.emit('user-change', sanitizedUser);
}</pre>
          </div>
        </div>
      </section>

      <!-- 工具支持 -->
      <section class="tools-section">
        <h2 class="section-title">工具与自动化</h2>

        <div class="tools-grid">
          <div class="tool-card">
            <div class="tool-icon">🔄</div>
            <h3>JSDoc</h3>
            <p>从代码注释生成HTML文档</p>
            <pre class="code-block">npm install -g jsdoc
jsdoc your-code.js</pre>
          </div>

          <div class="tool-card">
            <div class="tool-icon">🔍</div>
            <h3>ESLint</h3>
            <p>强制注释规范</p>
            <pre class="code-block">// .eslintrc.js
module.exports = {
  rules: {
    'require-jsdoc': ['error', {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true
      }
    }],
    'valid-jsdoc': 'error'
  }
};</pre>
          </div>

          <div class="tool-card">
            <div class="tool-icon">💻</div>
            <h3>IDE支持</h3>
            <p>智能提示和文档生成</p>
            <ul>
              <li>VS Code: 内置JSDoc支持</li>
              <li>WebStorm: 智能文档生成</li>
              <li>TypeScript: 基于JSDoc的类型推断</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const commentExamples = ref([
  { type: "函数注释", code: "/**\n * 计算两个数的和\n * @param {number} a\n * @param {number} b\n * @returns {number} \n */" },
  { type: "变量注释", code: "/** @type {number} 最大重试次数 */\nconst MAX_RETRIES = 5;" },
  { type: "特殊标记", code: "// TODO: 添加错误处理" },
  { type: "文件注释", code: "/**\n * @file 用户认证模块\n * @author 张三\n */" }
]);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@code-bg: #2d2d2d;
@good-color: #2ecc71;
@bad-color: #e74c3c;

.comments-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  background-color: @light-bg;
  color: #333;
  min-height: 100vh;
  line-height: 1.6;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .subtitle {
    margin: 10px 0 0;
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.content-wrapper {
  background-color: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.8rem;
  color: @secondary-color;
  border-bottom: 2px solid @primary-color;
  padding-bottom: 10px;
  margin-top: 40px;
  margin-bottom: 20px;
}

// 介绍部分样式
.intro-section {
  .info-card {
    background-color: #eef2ff;
    border-left: 4px solid @primary-color;
    padding: 25px;
    border-radius: 8px;
    margin-bottom: 30px;

    .header-with-icon {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .icon {
        font-size: 2rem;
        margin-right: 15px;
        color: @primary-color;
      }

      h2 {
        margin: 0;
        color: @secondary-color;
        font-size: 1.6rem;
      }
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 20px;
    }
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin-top: 25px;

    .benefit-card {
      background-color: @card-bg;
      border: 1px solid @border-color;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      transition: transform 0.3s ease;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .benefit-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }

      h3 {
        margin: 0 0 10px 0;
        color: @secondary-color;
      }

      p {
        margin: 0;
        color: #555;
        font-size: 0.95rem;
      }
    }
  }
}

// 基础注释部分
.basic-section {
  .basic-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 25px;
    margin-top: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .basic-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    .basic-header {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      background: linear-gradient(to right, #f0f4ff, #e6f7ff);
      border-bottom: 1px solid @border-color;

      .icon {
        font-size: 1.8rem;
        margin-right: 15px;
        color: @primary-color;
      }

      h3 {
        margin: 0;
        color: @secondary-color;
        font-size: 1.4rem;
      }
    }
  }
}

// 代码块样式
.code-block {
  background-color: @code-bg;
  color: #f8f8f2;
  border-radius: 8px;
  padding: 18px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  overflow: auto;
  margin: 15px 0;
}

.best-practice {
  background-color: #f8f9ff;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;

  h4 {
    margin-top: 0;
    color: @primary-color;
    font-size: 1.1rem;
  }

  ul {
    padding-left: 20px;
    margin: 10px 0 0;

    li {
      margin-bottom: 8px;
      position: relative;
      padding-left: 15px;

      &::before {
        content: "•";
        color: @primary-color;
        font-weight: bold;
        position: absolute;
        left: 0;
      }

      code {
        background-color: #eef2ff;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: monospace;
      }
    }
  }
}

// 函数注释部分
.function-section {
  .function-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 25px;
    margin-top: 20px;

    .example-card {
      background-color: @card-bg;
      border: 1px solid @border-color;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

      h3 {
        margin-top: 0;
        color: @secondary-color;
        font-size: 1.3rem;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
      }
    }
  }

  .jsdoc-tags {
    margin-top: 30px;

    h3 {
      color: @secondary-color;
      font-size: 1.4rem;
      margin-bottom: 15px;
    }

    .tags-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;

      .tag-card {
        background-color: #f0f7ff;
        border: 1px solid @border-color;
        border-radius: 8px;
        padding: 15px;
        transition: transform 0.2s;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
        }

        code {
          background-color: #e3f2fd;
          padding: 3px 8px;
          border-radius: 4px;
          font-family: monospace;
          font-weight: bold;
          color: @primary-color;
          display: inline-block;
          margin-bottom: 10px;
        }

        p {
          margin: 0 0 10px;
          color: #555;
        }

        pre {
          background-color: #eef7ff;
          padding: 8px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.85rem;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}

// 变量注释部分
.variable-section {
  .variable-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .variable-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    .variable-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      .icon {
        font-size: 1.5rem;
        margin-right: 10px;
        color: @primary-color;
      }

      h3 {
        margin: 0;
        color: @secondary-color;
        font-size: 1.3rem;
      }
    }
  }
}

// 高级注释部分
.advanced-section {
  .advanced-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 25px;
    margin-top: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .advanced-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    .advanced-header {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      background: linear-gradient(to right, #f0f4ff, #e6f7ff);
      border-bottom: 1px solid @border-color;

      .icon {
        font-size: 1.8rem;
        margin-right: 15px;
        color: @primary-color;
      }

      h3 {
        margin: 0;
        color: @secondary-color;
        font-size: 1.4rem;
      }
    }

    .advanced-content {
      padding: 20px;
    }
  }
}

.markers-table {
  margin-top: 20px;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid @border-color;
      padding: 10px;
      text-align: left;
    }

    th {
      background-color: #f5f5f5;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  }
}

.file-tags {
  margin-top: 20px;

  h4 {
    margin: 0 0 10px;
    color: @primary-color;
  }

  ul {
    padding-left: 20px;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;

    li {
      margin-bottom: 8px;

      code {
        background-color: #eef2ff;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: monospace;
      }
    }
  }
}

// 原则部分
.principles-section {
  .principles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 25px;
    margin-top: 20px;

    .principles-card {
      border-radius: 8px;
      padding: 25px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

      &.good {
        background-color: #e8f5e9;
        border-left: 4px solid @good-color;
      }

      &.bad {
        background-color: #ffebee;
        border-left: 4px solid @bad-color;
      }

      .principles-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .icon {
          font-size: 2rem;
          margin-right: 15px;
        }

        h3 {
          margin: 0;
          font-size: 1.4rem;
        }
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 12px;
          position: relative;
          padding-left: 25px;

          &::before {
            content: "•";
            font-weight: bold;
            position: absolute;
            left: 10px;
          }

          strong {
            color: @secondary-color;
          }
        }
      }
    }
  }

  .example-comparison {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 25px;
    margin-top: 30px;

    .bad-example,
    .good-example {
      h4 {
        margin-top: 0;
        padding-bottom: 10px;
        border-bottom: 2px solid #eee;
      }
    }

    .bad-example h4 {
      color: @bad-color;
    }

    .good-example h4 {
      color: @good-color;
    }
  }
}

// 工具部分
.tools-section {
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .tool-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 25px 20px;
    text-align: center;
    transition: transform 0.3s ease;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      border-color: @primary-color;
    }

    .tool-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
      color: @primary-color;
    }

    h3 {
      margin: 0 0 10px 0;
      color: @secondary-color;
      font-size: 1.3rem;
    }

    p {
      margin: 0 0 15px 0;
      color: #555;
    }

    pre,
    ul {
      background-color: #f5f7fa;
      border-left: 3px solid @primary-color;
      border-radius: 0 4px 4px 0;
      padding: 12px;
      font-size: 0.9rem;
      text-align: left;
      margin: 0;
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 8px;
      }
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .app-header h1 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .function-examples,
  .variable-grid,
  .advanced-grid,
  .principles-grid,
  .example-comparison {
    grid-template-columns: 1fr !important;
  }
}
</style>
