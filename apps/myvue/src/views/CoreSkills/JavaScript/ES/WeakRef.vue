<template>
  <div class="weak-container">
    <header>
      <h1><i class="fas fa-shield-alt"></i> JavaScript弱引用机制介绍</h1>
      <p class="subtitle">WeakRef, WeakMap和WeakSet的工作原理与应用场景</p>
    </header>

    <div class="content-grid">
      <!-- 概述部分 -->
      <section class="card overview">
        <h2><i class="fas fa-info-circle"></i> 弱引用概述</h2>
        <p>
          弱引用是JavaScript中一种特殊的内存管理机制，允许对象在不影响垃圾回收的情况下被引用。WeakRef、WeakMap和WeakSet是ES6引入的弱引用数据结构。
        </p>

        <div class="feature-list">
          <div class="feature">
            <i class="fas fa-memory"></i>
            <h3>核心特点</h3>
            <p>弱引用不会阻止垃圾回收器回收对象</p>
          </div>
          <div class="feature">
            <i class="fas fa-trash-alt"></i>
            <h3>内存管理</h3>
            <p>防止内存泄漏，优化应用性能</p>
          </div>
          <div class="feature">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>使用限制</h3>
            <p>键必须是对象，不可遍历，不可查看大小</p>
          </div>
        </div>
      </section>

      <!-- WeakRef介绍 -->
      <section class="card weakref">
        <div class="section-header">
          <h2><i class="fas fa-link"></i> WeakRef</h2>
          <div class="tag">弱引用对象</div>
        </div>

        <div class="definition">
          <h3><i class="fas fa-book"></i> 定义</h3>
          <p>WeakRef是对对象的弱引用，不会阻止垃圾回收器回收该对象</p>
        </div>

        <div class="content-columns">
          <div class="column">
            <h3><i class="fas fa-code"></i> 基本用法</h3>
            <div class="code-block">
              <pre><code>// 创建对象
let obj = { data: "重要数据" };

// 创建弱引用
const weakRef = new WeakRef(obj);

// 访问引用的对象
const target = weakRef.deref();
if (target) {
  console.log(target.data); // "重要数据"
}

// 当obj不再被强引用时
obj = null;

// 垃圾回收后
setTimeout(() => {
  console.log(weakRef.deref()); // undefined
}, 1000);</code></pre>
            </div>
          </div>

          <div class="column">
            <h3><i class="fas fa-cogs"></i> 工作原理</h3>
            <div class="workflow">
              <div class="step">
                <div class="step-number">1</div>
                <p>创建对象并建立强引用</p>
              </div>
              <div class="arrow"><i class="fas fa-arrow-right"></i></div>
              <div class="step">
                <div class="step-number">2</div>
                <p>WeakRef创建弱引用</p>
              </div>
              <div class="arrow"><i class="fas fa-arrow-right"></i></div>
              <div class="step">
                <div class="step-number">3</div>
                <p>移除强引用</p>
              </div>
              <div class="arrow"><i class="fas fa-arrow-right"></i></div>
              <div class="step">
                <div class="step-number">4</div>
                <p>垃圾回收器回收对象</p>
              </div>
            </div>

            <h3><i class="fas fa-lightbulb"></i> 适用场景</h3>
            <ul class="scenarios">
              <li>缓存大型对象</li>
              <li>监听对象生命周期</li>
              <li>资源清理回调</li>
              <li>内存敏感型应用</li>
            </ul>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <h3><i class="fas fa-check-circle"></i> 优点</h3>
            <ul>
              <li>避免内存泄漏</li>
              <li>精确控制对象生命周期</li>
              <li>提高内存使用效率</li>
            </ul>
          </div>
          <div class="cons">
            <h3><i class="fas fa-exclamation-circle"></i> 缺点</h3>
            <ul>
              <li>行为不可预测</li>
              <li>需要手动检查引用状态</li>
              <li>不适合所有场景</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- WeakMap介绍 -->
      <section class="card weakmap">
        <div class="section-header">
          <h2><i class="fas fa-map"></i> WeakMap</h2>
          <div class="tag">弱引用映射</div>
        </div>

        <div class="definition">
          <h3><i class="fas fa-book"></i> 定义</h3>
          <p>WeakMap是键值对的集合，其中键必须是对象，且键是弱引用的</p>
        </div>

        <div class="content-columns">
          <div class="column">
            <h3><i class="fas fa-code"></i> 基本用法</h3>
            <div class="code-block">
              <pre><code>// 创建对象作为键
let user = { id: 1, name: "Alice" };

// 创建WeakMap
const weakMap = new WeakMap();

// 设置键值对
weakMap.set(user, "敏感数据");

// 获取值
console.log(weakMap.get(user)); // "敏感数据"

// 当user不再被引用时
user = null;

// 垃圾回收后，条目自动移除
// weakMap.size 不可用，无法查看大小</code></pre>
            </div>
          </div>

          <div class="column">
            <h3><i class="fas fa-cogs"></i> 与Map的区别</h3>
            <div class="comparison">
              <div class="feature">
                <div>键类型</div>
                <div class="weakmap">对象</div>
                <div class="map">任意</div>
              </div>
              <div class="feature">
                <div>可遍历</div>
                <div class="weakmap">❌</div>
                <div class="map">✅</div>
              </div>
              <div class="feature">
                <div>大小查询</div>
                <div class="weakmap">❌</div>
                <div class="map">✅</div>
              </div>
              <div class="feature">
                <div>垃圾回收</div>
                <div class="weakmap">自动</div>
                <div class="map">手动</div>
              </div>
              <div class="feature">
                <div>内存泄漏</div>
                <div class="weakmap">低风险</div>
                <div class="map">高风险</div>
              </div>
            </div>

            <h3><i class="fas fa-lightbulb"></i> 适用场景</h3>
            <ul class="scenarios">
              <li>存储对象私有数据</li>
              <li>缓存与对象关联的数据</li>
              <li>DOM元素元数据存储</li>
              <li>对象监听器管理</li>
            </ul>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <h3><i class="fas fa-check-circle"></i> 优点</h3>
            <ul>
              <li>自动内存管理</li>
              <li>保护私有数据</li>
              <li>防止内存泄漏</li>
            </ul>
          </div>
          <div class="cons">
            <h3><i class="fas fa-exclamation-circle"></i> 缺点</h3>
            <ul>
              <li>功能受限（不可遍历）</li>
              <li>只支持对象作为键</li>
              <li>调试困难</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- WeakSet介绍 -->
      <section class="card weakset">
        <div class="section-header">
          <h2><i class="fas fa-layer-group"></i> WeakSet</h2>
          <div class="tag">弱引用集合</div>
        </div>

        <div class="definition">
          <h3><i class="fas fa-book"></i> 定义</h3>
          <p>WeakSet是对象的集合，其中对象是弱引用的</p>
        </div>

        <div class="content-columns">
          <div class="column">
            <h3><i class="fas fa-code"></i> 基本用法</h3>
            <div class="code-block">
              <pre><code>// 创建对象
let item1 = { id: 1 };
let item2 = { id: 2 };

// 创建WeakSet
const weakSet = new WeakSet();

// 添加对象
weakSet.add(item1);
weakSet.add(item2);

// 检查对象是否存在
console.log(weakSet.has(item1)); // true

// 删除对象
weakSet.delete(item1);

// 当item2不再被引用时
item2 = null;

// 垃圾回收后，对象自动从集合移除</code></pre>
            </div>
          </div>

          <div class="column">
            <h3><i class="fas fa-cogs"></i> 与Set的区别</h3>
            <div class="comparison">
              <div class="feature">
                <div>值类型</div>
                <div class="weakset">对象</div>
                <div class="set">任意</div>
              </div>
              <div class="feature">
                <div>可遍历</div>
                <div class="weakset">❌</div>
                <div class="set">✅</div>
              </div>
              <div class="feature">
                <div>大小查询</div>
                <div class="weakset">❌</div>
                <div class="set">✅</div>
              </div>
              <div class="feature">
                <div>垃圾回收</div>
                <div class="weakset">自动</div>
                <div class="set">手动</div>
              </div>
              <div class="feature">
                <div>内存占用</div>
                <div class="weakset">低</div>
                <div class="set">高</div>
              </div>
            </div>

            <h3><i class="fas fa-lightbulb"></i> 适用场景</h3>
            <ul class="scenarios">
              <li>跟踪对象存在状态</li>
              <li>防止内存泄漏的监听器集合</li>
              <li>临时对象标记</li>
              <li>循环引用检测</li>
            </ul>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <h3><i class="fas fa-check-circle"></i> 优点</h3>
            <ul>
              <li>自动清理无用对象</li>
              <li>高效内存使用</li>
              <li>防止意外的对象保留</li>
            </ul>
          </div>
          <div class="cons">
            <h3><i class="fas fa-exclamation-circle"></i> 缺点</h3>
            <ul>
              <li>功能有限</li>
              <li>不支持原始值</li>
              <li>无法获取所有值</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 对比总结 -->
      <section class="card comparison">
        <h2><i class="fas fa-balance-scale"></i> 对比总结</h2>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>WeakRef</th>
                <th>WeakMap</th>
                <th>WeakSet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>数据结构</td>
                <td>单个对象引用</td>
                <td>键值对集合</td>
                <td>对象集合</td>
              </tr>
              <tr>
                <td>键/值要求</td>
                <td>对象</td>
                <td>键必须是对象</td>
                <td>值必须是对象</td>
              </tr>
              <tr>
                <td>可遍历性</td>
                <td>❌</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>大小查询</td>
                <td>❌</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>主要用途</td>
                <td>对象缓存</td>
                <td>私有数据存储</td>
                <td>对象存在跟踪</td>
              </tr>
              <tr>
                <td>垃圾回收</td>
                <td>自动</td>
                <td>自动</td>
                <td>自动</td>
              </tr>
              <tr>
                <td>内存安全</td>
                <td>高</td>
                <td>高</td>
                <td>高</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="best-practices">
          <h3><i class="fas fa-star"></i> 最佳实践</h3>
          <ul>
            <li>仅在需要避免内存泄漏时使用</li>
            <li>不要用于缓存预期长期存在的对象</li>
            <li>结合FinalizationRegistry进行资源清理</li>
            <li>避免过度依赖弱引用行为</li>
            <li>在内存敏感型应用中使用</li>
          </ul>
        </div>

        <div class="conclusion">
          <h3><i class="fas fa-clipboard-check"></i> 总结</h3>
          <p>
            WeakRef、WeakMap和WeakSet是JavaScript中强大的内存管理工具，它们通过弱引用机制允许对象在不影响垃圾回收的情况下被引用。这些数据结构特别适用于：
          </p>
          <ul>
            <li>管理大型对象或大量临时对象</li>
            <li>存储与DOM元素关联的元数据</li>
            <li>实现缓存机制而不引起内存泄漏</li>
            <li>跟踪对象生命周期</li>
          </ul>
          <p>
            正确使用这些弱引用数据结构可以显著改善应用的内存使用效率，防止内存泄漏，并提升整体性能。
          </p>
        </div>
      </section>
    </div>

    <footer>
      <p>JavaScript内存管理 &copy; 2023 - 弱引用机制介绍</p>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped>
.weak-container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

header {
  background: linear-gradient(135deg, #5a67d8 0%, #4c51bf 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-weight: 600;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;
  font-weight: 300;
}

.content-grid {
  gap: 25px;
  padding: 30px;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  padding: 25px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.card h2 {
  color: #2d3748;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f4f8;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.overview .feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.feature {
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.feature i {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #5a67d8;
}

.feature h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #2d3748;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f4f8;
}

.section-header h2 {
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 0;
  border: none;
}

.tag {
  background: #e9d8fd;
  color: #553c9a;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.definition {
  background: #f0f7ff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 25px;
  border-left: 4px solid #5a67d8;
}

.definition h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #2d3748;
}

.content-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 25px;
}

.column h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  color: #2d3748;
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 15px;
  line-height: 1.5;
  overflow-x: auto;
  margin-bottom: 20px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
}

pre {
  margin: 0;
}

code {
  font-family: 'Fira Code', monospace;
}

.workflow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.step {
  background: #f0f7ff;
  border: 1px solid #d0e0f0;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  flex: 1;
  max-width: 150px;
}

.step-number {
  width: 30px;
  height: 30px;
  background: #5a67d8;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 10px;
}

.arrow {
  color: #5a67d8;
  font-size: 1.5rem;
  padding: 0 10px;
}

.scenarios {
  list-style-type: none;
  padding: 0;
}

.scenarios li {
  background: #f0f7ff;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 6px;
  border-left: 3px solid #5a67d8;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.pros,
.cons {
  padding: 20px;
  border-radius: 8px;
}

.pros {
  background: #f0fff4;
  border-left: 4px solid #48bb78;
}

.cons {
  background: #fff5f5;
  border-left: 4px solid #e53e3e;
}

.pros h3,
.cons h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  color: #2d3748;
}

.pros ul,
.cons ul {
  padding-left: 20px;
}

.pros li,
.cons li {
  margin-bottom: 8px;
}

.comparison {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-bottom: 20px;
}

.feature {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.weakmap,
.weakset {
  color: #5a67d8;
  font-weight: 500;
  text-align: center;
}

.map,
.set {
  color: #718096;
  text-align: center;
}

.comparison-table {
  overflow-x: auto;
  margin: 25px 0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th,
td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background: #f7fafc;
  color: #4a5568;
  font-weight: 600;
}

tr:nth-child(even) {
  background: #f8fafc;
}

.best-practices {
  background: #f0f7ff;
  padding: 25px;
  border-radius: 8px;
  margin: 25px 0;
}

.best-practices h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  color: #2d3748;
}

.best-practices ul {
  padding-left: 25px;
}

.best-practices li {
  margin-bottom: 10px;
}

.conclusion {
  background: #f8fafc;
  padding: 25px;
  border-radius: 8px;
}

.conclusion h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  color: #2d3748;
}

.conclusion p {
  margin-bottom: 15px;
}

.conclusion ul {
  padding-left: 25px;
  margin-bottom: 15px;
}

footer {
  text-align: center;
  padding: 25px;
  background: #f0f4f8;
  color: #4a5568;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 1100px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .content-columns {
    grid-template-columns: 1fr;
  }

  .workflow {
    flex-direction: column;
    gap: 20px;
  }

  .step {
    max-width: 100%;
    width: 100%;
  }

  .arrow {
    transform: rotate(90deg);
  }
}

@media (max-width: 600px) {
  header h1 {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .card {
    padding: 20px 15px;
  }

  .pros-cons {
    grid-template-columns: 1fr;
  }
}
</style>
