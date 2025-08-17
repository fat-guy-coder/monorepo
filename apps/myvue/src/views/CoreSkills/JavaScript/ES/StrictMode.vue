<template>
  <div class="page-container">
    <div class="content-wrapper">
      <!-- 页面头部 -->
      <header class="page-header">
        <h1 class="page-title">
          <span class="card-icon">🔒</span>
          JavaScript 严格模式介绍
        </h1>
        <p class="page-subtitle">提升代码质量与安全性的关键特性</p>
      </header>

      <!-- 介绍部分 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🔒</span>
            什么是严格模式？
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-2">
            <div class="definition-card">
              <div class="strict-icon">🔒</div>
              <div>
                <h3 class="text-lg font-semibold mb-md">严格模式定义</h3>
                <p class="text-secondary">
                  严格模式（Strict Mode）是ECMAScript
                  5引入的一种<strong>受限的JavaScript变体</strong>，它通过抛出错误来消除一些静默错误，使JavaScript引擎能够执行更多优化，并禁止使用一些可能在未来版本中定义的语法。
                </p>
              </div>
            </div>

            <div class="benefits-card">
              <h3 class="text-lg font-semibold mb-md">使用严格模式的好处</h3>
              <div class="benefits-grid">
                <div class="benefit-item">
                  <div class="benefit-icon">🚫</div>
                  <h4>消除静默错误</h4>
                  <p>将静默错误转为抛出错误</p>
                </div>
                <div class="benefit-item">
                  <div class="benefit-icon">⚡</div>
                  <h4>优化执行效率</h4>
                  <p>帮助JavaScript引擎优化代码</p>
                </div>
                <div class="benefit-item">
                  <div class="benefit-icon">🛡️</div>
                  <h4>避免意外全局变量</h4>
                  <p>防止意外创建全局变量</p>
                </div>
                <div class="benefit-item">
                  <div class="benefit-icon">🔮</div>
                  <h4>面向未来</h4>
                  <p>禁止未来可能保留的语法</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 启用方法 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">⚙️</span>
            启用严格模式
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-3">
            <div class="method-card">
              <h3 class="text-lg font-semibold mb-md">全局启用</h3>
              <div class="code-block">
                <pre><code>'use strict';

// 整个脚本将运行在严格模式
function doSomething() {
  // 严格模式代码
}</code></pre>
              </div>
            </div>
            <div class="method-card">
              <h3 class="text-lg font-semibold mb-md">函数作用域启用</h3>
              <div class="code-block">
                <pre><code>function strictFunction() {
  'use strict';

  // 仅在该函数内启用严格模式
}</code></pre>
              </div>
            </div>
            <div class="method-card">
              <h3 class="text-lg font-semibold mb-md">模块自动启用</h3>
              <div class="code-block">
                <pre><code>// ES6模块默认在严格模式下执行
export function moduleFunction() {
  // 自动启用严格模式
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 严格模式禁止事项 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🚫</span>
            严格模式禁止事项
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-2">
            <!-- 变量相关限制 -->
            <div class="prohibited-category">
              <h3 class="text-lg font-semibold mb-md text-error">变量相关限制</h3>
              <div class="prohibited-items">
                <div class="prohibited-item">
                  <div class="item-header">
                    <div class="item-icon">❌</div>
                    <h4>意外创建全局变量</h4>
                  </div>
                  <p class="text-secondary mb-sm">未声明变量直接赋值会抛出错误</p>
                  <div class="code-block">
                    <pre><code>'use strict';
mistypedVariable = 17; // 抛出 ReferenceError</code></pre>
                  </div>
                </div>

                <div class="prohibited-item">
                  <div class="item-header">
                    <div class="item-icon">❌</div>
                    <h4>删除变量</h4>
                  </div>
                  <p class="text-secondary mb-sm">删除变量、函数或函数参数会抛出语法错误</p>
                  <div class="code-block">
                    <pre><code>'use strict';
var x;
delete x; // 语法错误</code></pre>
                  </div>
                </div>

                <div class="prohibited-item">
                  <div class="item-header">
                    <div class="item-icon">❌</div>
                    <h4>保留关键字作为变量名</h4>
                  </div>
                  <p class="text-secondary mb-sm">禁止使用未来保留字作为标识符</p>
                  <div class="code-block">
                    <pre><code>'use strict';
var implements; // 语法错误
var interface;  // 语法错误
var package;    // 语法错误</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <!-- 对象操作限制 -->
            <div class="prohibited-category">
              <h3 class="text-lg font-semibold mb-md text-error">对象操作限制</h3>
              <div class="prohibited-items">
                <div class="prohibited-item">
                  <div class="item-header">
                    <div class="item-icon">❌</div>
                    <h4>只读属性赋值</h4>
                  </div>
                  <p class="text-secondary mb-sm">给不可写属性赋值会抛出错误</p>
                  <div class="code-block">
                    <pre><code>'use strict';
var obj = {};
Object.defineProperty(obj, 'x', {
  value: 42,
  writable: false
});

obj.x = 9; // 抛出 TypeError</code></pre>
                  </div>
                </div>

                <div class="prohibited-item">
                  <div class="item-header">
                    <div class="item-icon">❌</div>
                    <h4>不可扩展对象添加属性</h4>
                  </div>
                  <p class="text-secondary mb-sm">给不可扩展对象添加新属性会抛出错误</p>
                  <div class="code-block">
                    <pre><code>'use strict';
var fixed = {};
Object.preventExtensions(fixed);
fixed.newProp = 'ohai'; // 抛出 TypeError</code></pre>
                  </div>
                </div>

                <div class="prohibited-item">
                  <div class="item-header">
                    <div class="item-icon">❌</div>
                    <h4>删除不可删除属性</h4>
                  </div>
                  <p class="text-secondary mb-sm">删除不可配置属性会抛出错误</p>
                  <div class="code-block">
                    <pre><code>'use strict';
delete Object.prototype; // 抛出 TypeError</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 函数相关限制 -->
          <div class="grid grid-2 mt-xl">
            <div class="prohibited-category">
              <h3 class="text-lg font-semibold mb-md text-error">函数相关限制</h3>
              <div class="prohibited-items">
                <div class="prohibited-item">
                  <div class="item-header">
                    <div class="item-icon">❌</div>
                    <h4>重复参数名</h4>
                  </div>
                  <p class="text-secondary mb-sm">函数参数名重复会抛出语法错误</p>
                  <div class="code-block">
                    <pre><code>'use strict';
function sum(a, a, c) { // 语法错误
  return a + a + c;
}</code></pre>
                  </div>
                </div>

                <div class="prohibited-item">
                  <div class="item-header">
                    <div class="item-icon">❌</div>
                    <h4>arguments.callee</h4>
                  </div>
                  <p class="text-secondary mb-sm">禁止使用arguments.callee</p>
                  <div class="code-block">
                    <pre><code>'use strict';
function factorial(n) {
  if (n <= 1) return 1;
  return n * arguments.callee(n-1); // 类型错误
}</code></pre>
                  </div>
                </div>

                <div class="prohibited-item">
                  <div class="item-header">
                    <div class="item-icon">❌</div>
                    <h4>函数参数与arguments不同步</h4>
                  </div>
                  <p class="text-secondary mb-sm">修改参数值不会同步到arguments对象</p>
                  <div class="code-block">
                    <pre><code>'use strict';
function func(a) {
  a = 2;
  return [a, arguments[0]];
}

func(1); // 返回 [2, 1] 非严格模式返回 [2, 2]</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <!-- 其他重要限制 -->
            <div class="prohibited-category">
              <h3 class="text-lg font-semibold mb-md text-error">其他重要限制</h3>
              <div class="prohibited-items">
                <div class="prohibited-item">
                  <div class="item-header">
                    <div class="item-icon">❌</div>
                    <h4>八进制字面量</h4>
                  </div>
                  <p class="text-secondary mb-sm">禁止使用八进制数字语法（0开头）</p>
                  <div class="code-block">
                    <pre><code>'use strict';
var sum = 015 + // 语法错误
          197 +
          142;</code></pre>
                  </div>
                </div>

                <div class="prohibited-item">
                  <div class="item-header">
                    <div class="item-icon">❌</div>
                    <h4>with语句</h4>
                  </div>
                  <p class="text-secondary mb-sm">禁止使用with语句</p>
                  <div class="code-block">
                    <pre><code>'use strict';
with (Math) { // 语法错误
  x = cos(3 * PI) + sin(LN10);
}</code></pre>
                  </div>
                </div>

                <div class="prohibited-item">
                  <div class="item-header">
                    <div class="item-icon">❌</div>
                    <h4>eval创建变量</h4>
                  </div>
                  <p class="text-secondary mb-sm">eval创建的变量不会泄漏到外部作用域</p>
                  <div class="code-block">
                    <pre><code>'use strict';
eval('var x = 2');
console.log(x); // 抛出 ReferenceError</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用建议 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">💡</span>
            严格模式使用建议
          </h2>
        </div>
        <div class="card-body">
          <div class="recommendations">
            <div class="recommendation-item">
              <div class="rec-number">1</div>
              <div class="rec-content">
                <h3 class="text-lg font-semibold mb-sm">新项目默认启用</h3>
                <p class="text-secondary">
                  所有新JavaScript项目都应启用严格模式，以提高代码质量和安全性。
                </p>
              </div>
            </div>

            <div class="recommendation-item">
              <div class="rec-number">2</div>
              <div class="rec-content">
                <h3 class="text-lg font-semibold mb-sm">逐步迁移旧代码</h3>
                <p class="text-secondary">对于旧项目，可以逐个文件或函数启用严格模式，逐步迁移。</p>
              </div>
            </div>

            <div class="recommendation-item">
              <div class="rec-number">3</div>
              <div class="rec-content">
                <h3 class="text-lg font-semibold mb-sm">避免全局启用</h3>
                <p class="text-secondary">
                  在合并多个脚本的项目中，避免全局启用，以防止非严格模式脚本出现问题。
                </p>
              </div>
            </div>

            <div class="recommendation-item">
              <div class="rec-number">4</div>
              <div class="rec-content">
                <h3 class="text-lg font-semibold mb-sm">优先使用模块</h3>
                <p class="text-secondary">ES6模块自动启用严格模式，是更好的选择。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 页脚 -->
      <div class="card">
        <div class="card-body">
          <p class="text-center text-secondary">
            严格模式是编写健壮、可维护JavaScript代码的重要工具，现代JavaScript开发应该始终使用严格模式。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import '@/assets/css/unified-styles.css'

// 严格模式检测
const isStrictMode = (() => {
  'use strict'
  return !this
})()

// 示例数据
const strictModeStatus = ref(isStrictMode ? '已启用' : '未启用')
</script>

<style scoped>
/* 组件特定样式 */
.definition-card {
  display: flex;
  gap: var(--spacing-lg);
  align-items: flex-start;
}

.strict-icon {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  background: var(--primary-bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.benefit-item {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  text-align: center;
  transition: transform 0.3s ease;
}

.benefit-item:hover {
  transform: translateY(-5px);
}

.benefit-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-sm);
}

.benefit-item h4 {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--text-primary);
}

.benefit-item p {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

.method-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
}

.prohibited-category {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
}

.prohibited-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.prohibited-item {
  padding-top: var(--spacing-lg);
  border-top: 1px dashed var(--border-light);
}

.prohibited-item:first-child {
  padding-top: 0;
  border-top: none;
}

.item-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.item-icon {
  font-size: 1.5rem;
  color: var(--error-color);
}

.item-header h4 {
  margin: 0;
  color: var(--text-primary);
}

.recommendations {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.recommendation-item {
  display: flex;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg) 0;
  border-bottom: 1px solid var(--border-light);
}

.recommendation-item:last-child {
  border-bottom: none;
}

.rec-number {
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: var(--text-lg);
  flex-shrink: 0;
}

.rec-content h3 {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--text-primary);
}

.rec-content p {
  margin: 0;
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid-2,
  .grid-3 {
    grid-template-columns: 1fr;
  }

  .definition-card {
    flex-direction: column;
    text-align: center;
  }

  .recommendation-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>
