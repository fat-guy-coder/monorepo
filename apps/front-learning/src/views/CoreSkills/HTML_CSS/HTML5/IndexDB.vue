<template>
  <div class="indexeddb-container">
    <header class="header">
      <h1>IndexedDB 浏览器数据库指南</h1>
      <p class="subtitle">现代Web应用的客户端存储解决方案</p>
    </header>

    <div class="content-wrapper">
      <section class="section">
        <div class="concept-cards">
          <div class="card">

            <h3>什么是IndexedDB？</h3>
            <p>IndexedDB是一种底层API，用于在客户端存储大量结构化数据（包括文件/blob）。它是一种事务型数据库系统，类似于基于SQL的RDBMS，但使用JavaScript对象而非固定列。</p>
          </div>

          <div class="card">

            <h3>核心特点</h3>
            <ul>
              <li>键值存储 - 存储任意JavaScript对象</li>
              <li>异步API - 不会阻塞UI线程</li>
              <li>支持事务 - 保证数据一致性</li>
              <li>支持索引 - 高效查询数据</li>
              <li>支持大容量存储 - 通常允许存储超过50%的磁盘空间</li>
            </ul>
          </div>

          <div class="card">

            <h3>与其他存储方案对比</h3>
            <div class="comparison-table">
              <div class="table-row header">
                <div>存储类型</div>
                <div>容量</div>
                <div>数据类型</div>
                <div>持久性</div>
              </div>
              <div class="table-row">
                <div>LocalStorage</div>
                <div>~5MB</div>
                <div>字符串</div>
                <div>持久</div>
              </div>
              <div class="table-row">
                <div>SessionStorage</div>
                <div>~5MB</div>
                <div>字符串</div>
                <div>会话级</div>
              </div>
              <div class="table-row">
                <div>Cookies</div>
                <div>~4KB</div>
                <div>字符串</div>
                <div>可配置</div>
              </div>
              <div class="table-row highlighted">
                <div>IndexedDB</div>
                <div>大容量</div>
                <div>结构化数据</div>
                <div>持久</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">
          使用方法
        </h2>
        <div class="usage-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>打开/创建数据库</h3>
              <pre><code>const request = indexedDB.open('myDatabase', 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  // 创建对象存储空间（类似于表）
  const store = db.createObjectStore('books', { keyPath: 'id' });
  // 创建索引
  store.createIndex('by_title', 'title', { unique: false });
};

request.onsuccess = (event) => {
  const db = event.target.result;
  // 数据库操作...
};</code></pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>添加数据</h3>
              <pre><code>const transaction = db.transaction('books', 'readwrite');
const store = transaction.objectStore('books');

const book = {
  id: '1',
  title: 'JavaScript高级程序设计',
  author: 'Nicholas C. Zakas',
  year: 2020
};

const request = store.add(book);

request.onsuccess = () => {
  console.log('数据添加成功');
};</code></pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>查询数据</h3>
              <pre><code>// 通过主键获取
const request = store.get('1');

// 通过索引查询
const index = store.index('by_title');
const request = index.get('JavaScript高级程序设计');

request.onsuccess = () => {
  console.log('查询结果:', request.result);
};</code></pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>更新和删除数据</h3>
              <pre><code>// 更新数据
const updateRequest = store.put({
  id: '1',
  title: 'JavaScript高级程序设计(第4版)',
  author: 'Nicholas C. Zakas',
  year: 2023
});

// 删除数据
const deleteRequest = store.delete('1');</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">
          使用场景
        </h2>
        <div class="scenario-grid">
          <div class="scenario-card">

            <h3>离线应用</h3>
            <p>存储应用核心数据，在离线状态下提供完整功能体验，待网络恢复后同步数据。</p>
          </div>

          <div class="scenario-card">

            <h3>性能优化</h3>
            <p>缓存API响应、用户首选项、历史记录等，减少网络请求，提升应用响应速度。</p>
          </div>

          <div class="scenario-card">

            <h3>媒体资源存储</h3>
            <p>存储图片、音频、视频等二进制文件，支持文件离线访问。</p>
          </div>

          <div class="scenario-card">

            <h3>复杂数据管理</h3>
            <p>处理需要索引和高效查询的复杂数据结构，如产品目录、用户数据等。</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">
          注意事项
        </h2>
        <div class="warnings">
          <div class="warning-item">

            <div>
              <h3>浏览器兼容性</h3>
              <p>虽然现代浏览器都支持IndexedDB，但不同浏览器实现可能有细微差异。使用前需检查兼容性，并考虑提供polyfill或备用方案。</p>
            </div>
          </div>

          <div class="warning-item">

            <div>
              <h3>安全与隐私</h3>
              <p>IndexedDB遵循同源策略，不同源无法访问彼此的数据。但需注意：</p>
              <ul>
                <li>避免存储敏感信息（如密码、支付信息）</li>
                <li>用户可随时清除存储数据</li>
                <li>隐私模式下数据库在会话结束后会被清除</li>
              </ul>
            </div>
          </div>

          <div class="warning-item">

            <div>
              <h3>错误处理</h3>
              <p>必须妥善处理所有可能的错误：</p>
              <pre><code>request.onerror = (event) => {
  console.error('数据库错误:', event.target.error);
};</code></pre>
              <p>常见错误包括：版本冲突、存储空间不足、事务中断等。</p>
            </div>
          </div>

          <div class="warning-item">
            <div>
              <h3>存储限制</h3>
              <p>浏览器对IndexedDB的存储空间有限制（通常为磁盘的50%）。应用应：</p>
              <ul>
                <li>优雅处理QUOTA_EXCEEDED_ERR错误</li>
                <li>提供清理旧数据的机制</li>
                <li>向用户请求额外存储空间权限</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>IndexedDB为现代Web应用提供了强大的客户端存储能力，适用于需要离线功能、高性能数据访问或大容量存储的场景。</p>
      <div class="footer-links">
        <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API" target="_blank">MDN文档</a>
        <a href="https://dexie.org/" target="_blank">Dexie.js (IndexedDB封装库)</a>
        <a href="https://web.dev/indexeddb/" target="_blank">最佳实践</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>


:root {
  --primary-color: #4361ee;
  --secondary-color: #3a0ca3;
  --accent-color: #4cc9f0;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --success-color: #2ec4b6;
  --warning-color: #ff9f1c;
  --danger-color: #e71d36;
  --gray-light: #e9ecef;
  --gray-medium: #adb5bd;
  --border-radius: 8px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.indexeddb-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  color: var(--dark-color);
  line-height: 1.6;
  background-color: #fff;
}

.header {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-radius: var(--border-radius);
  margin: 20px 0 30px;
  box-shadow: var(--box-shadow);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 700;
    color: #000;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
  }
}

.section {
  margin-bottom: 50px;
  background: white;
  border-radius: var(--border-radius);
  padding: 30px;
  box-shadow: var(--box-shadow);

  &:last-child {
    margin-bottom: 30px;
  }
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--gray-light);
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--secondary-color);
}

// 概念介绍样式
.concept-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.card {
  background: var(--light-color);
  border-radius: var(--border-radius);
  padding: 25px;
  transition: var(--transition);
  border: 1px solid var(--gray-light);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .card-icon {
    width: 60px;
    height: 60px;
    background: rgba(67, 97, 238, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    svg {
      width: 30px;
      height: 30px;
      color: var(--primary-color);
    }
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--secondary-color);
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
    }
  }
}

.comparison-table {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-top: 15px;

  .table-row {
    padding: 12px 15px;
    border-bottom: 1px solid var(--gray-light);

    &:last-child {
      border-bottom: none;
    }

    &.header {
      font-weight: 600;
      background: rgba(67, 97, 238, 0.05);
    }

    &.highlighted {
      background: rgba(76, 201, 240, 0.1);
      font-weight: 600;
      color: var(--secondary-color);
    }

    div {
      text-align: center;
    }
  }
}

// 使用方法样式
.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.step {
  display: flex;
  gap: 20px;

  .step-number {
    min-width: 40px;
    height: 40px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 5px;
  }

  .step-content {
    flex: 1;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: var(--secondary-color);
    }

    pre {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 20px;
      border-radius: var(--border-radius);
      overflow-x: auto;
      margin-top: 10px;
      font-size: 0.9rem;
      line-height: 1.5;

      code {
        font-family: 'Fira Code', 'Consolas', monospace;
      }
    }
  }
}

// 使用场景样式
.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.scenario-card {
  background: white;
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  padding: 25px;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  }

  .scenario-icon {
    width: 50px;
    height: 50px;
    background: rgba(67, 97, 238, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    svg {
      width: 24px;
      height: 24px;
      color: var(--primary-color);
    }
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 12px;
    color: var(--secondary-color);
  }

  p {
    color: #495057;
  }
}

// 注意事项样式
.warnings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.warning-item {
  display: flex;
  gap: 15px;
  background: #fff9f9;
  border-left: 4px solid var(--danger-color);
  border-radius: var(--border-radius);
  padding: 20px;

  .warning-icon {
    min-width: 40px;
    height: 40px;
    background: rgba(231, 29, 54, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      height: 20px;
      color: var(--danger-color);
    }
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: var(--danger-color);
  }

  ul {
    padding-left: 20px;
    margin: 10px 0;

    li {
      margin-bottom: 5px;
    }
  }

  pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: var(--border-radius);
    overflow-x: auto;
    margin-top: 10px;
    font-size: 0.85rem;
  }
}

// 页脚样式
.footer {
  text-align: center;
  padding: 30px 20px;
  margin-top: 40px;
  border-top: 1px solid var(--gray-light);
  color: #495057;

  p {
    max-width: 800px;
    margin: 0 auto 20px;
    font-size: 1.1rem;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    flex-wrap: wrap;

    a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: var(--transition);

      &:hover {
        color: var(--secondary-color);
        text-decoration: underline;
      }
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 2rem;
    }
  }

  .section {
    padding: 20px;
  }

  .comparison-table {
    grid-template-columns: 1fr;

    .table-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .step {
    flex-direction: column;

    .step-number {
      align-self: flex-start;
    }
  }
}
</style>
