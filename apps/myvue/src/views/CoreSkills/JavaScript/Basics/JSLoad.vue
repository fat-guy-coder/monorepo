<template>
  <div class="js-loading-container">
    <header class="header">
      <h1>JavaScript <span class="highlight">加载方式</span>详解</h1>
      <p class="subtitle">探索不同加载方式对页面性能和用户体验的影响</p>
    </header>

    <div class="content">
      <section class="intro">
        <p>在现代Web开发中，JavaScript的加载方式直接影响页面性能、用户体验和SEO。选择正确的加载策略是优化网站性能的关键步骤。</p>
      </section>

      <div class="loading-methods">
        <div class="method-card">
          <div class="method-header">
            <div class="icon">🔵</div>
            <h2>标准加载 (无属性)</h2>
          </div>
          <div class="method-content">
            <div class="code-block">&lt;script src="app.js"&gt;&lt;/script&gt;</div>
            <div class="characteristics">
              <h3>特性：</h3>
              <ul>
                <li><strong>执行顺序：</strong> 同步执行，立即阻塞HTML解析</li>
                <li><strong>阻塞渲染：</strong> 是，直到脚本下载并执行完成</li>
                <li><strong>使用场景：</strong> 关键功能脚本、页面核心逻辑</li>
              </ul>
            </div>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点：</h4>
                <ul>
                  <li>简单直接，无兼容性问题</li>
                  <li>保证执行顺序</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点：</h4>
                <ul>
                  <li>严重阻塞页面渲染</li>
                  <li>影响首屏加载时间</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="method-card">
          <div class="method-header">
            <div class="icon">🟡</div>
            <h2>async 属性</h2>
          </div>
          <div class="method-content">
            <div class="code-block">&lt;script src="app.js" <span class="attr">async</span>&gt;&lt;/script&gt;</div>
            <div class="characteristics">
              <h3>特性：</h3>
              <ul>
                <li><strong>执行顺序：</strong> 异步下载，下载完成后立即执行</li>
                <li><strong>阻塞渲染：</strong> 下载不阻塞，执行时阻塞</li>
                <li><strong>使用场景：</strong> 独立脚本、分析工具、广告脚本</li>
              </ul>
            </div>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点：</h4>
                <ul>
                  <li>不阻塞HTML解析</li>
                  <li>下载与页面渲染并行</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点：</h4>
                <ul>
                  <li>执行顺序无法保证</li>
                  <li>执行时仍会阻塞渲染</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="method-card">
          <div class="method-header">
            <div class="icon">🟢</div>
            <h2>defer 属性</h2>
          </div>
          <div class="method-content">
            <div class="code-block">&lt;script src="app.js" <span class="attr">defer</span>&gt;&lt;/script&gt;</div>
            <div class="characteristics">
              <h3>特性：</h3>
              <ul>
                <li><strong>执行顺序：</strong> 异步下载，在DOMContentLoaded前顺序执行</li>
                <li><strong>阻塞渲染：</strong> 下载不阻塞，执行在页面渲染后</li>
                <li><strong>使用场景：</strong> 依赖DOM的脚本、多个有依赖关系的脚本</li>
              </ul>
            </div>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点：</h4>
                <ul>
                  <li>不阻塞HTML解析</li>
                  <li>保持脚本执行顺序</li>
                  <li>在DOM完全解析后执行</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点：</h4>
                <ul>
                  <li>不支持IE9以下浏览器</li>
                  <li>执行时间较晚</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="method-card">
          <div class="method-header">
            <div class="icon">🟣</div>
            <h2>ES模块</h2>
            <a @click="goToESModule">跳转详细</a>
          </div>
          <div class="method-content">
            <div class="code-block">
              <pre>&lt;script type="module" src="app.js"&gt;&lt;/script&gt;</pre>
            </div>
            <div class="characteristics">
              <h3>特性：</h3>
              <ul>
                <li><strong>执行顺序：</strong> 下载完成后会解析依赖，按依赖继续下载imoprt的js</li>
                <li><strong>执行时机：</strong> 全部下载完成后，递归解析依赖(ast)，为每个模块创建作用域，分配内存空间，按依赖顺序执行</li>
                <li><strong>阻塞渲染：</strong> 下载不阻塞，执行时阻塞</li>
                <li><strong>使用场景：</strong> 按需加载、非关键脚本</li>
              </ul>
            </div>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点：</h4>
                <ul>
                  <li>完全控制加载时机</li>
                  <li>减少初始加载时间</li>
                  <li>精细控制资源加载</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点：</h4>
                <ul>
                  <li>需要手动管理</li>
                  <li>可能造成执行顺序问题</li>
                  <li>错误处理复杂</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="method-card"></div>
      </div>

      <div class="comparison-section">
        <h2>加载方式对比</h2>
        <div class="comparison-table">
          <div class="table-header">
            <div class="header-item">特性</div>
            <div class="header-item">标准</div>
            <div class="header-item">async</div>
            <div class="header-item">defer</div>
            <div class="header-item">动态</div>
            <div class="header-item">ES模块</div>
          </div>
          <div class="table-row">
            <div class="row-title">阻塞HTML解析</div>
            <div class="row-item">是</div>
            <div class="row-item">下载否/执行是</div>
            <div class="row-item">否</div>
            <div class="row-item">否</div>
            <div class="row-item">否</div>
          </div>
          <div class="table-row">
            <div class="row-title">执行顺序</div>
            <div class="row-item">顺序</div>
            <div class="row-item">下载完成顺序</div>
            <div class="row-item">顺序</div>
            <div class="row-item">加载完成顺序</div>
            <div class="row-item">加载完成顺序</div>
          </div>
          <div class="table-row">
            <div class="row-title">执行时机</div>
            <div class="row-item">立即</div>
            <div class="row-item">下载完成后立即</div>
            <div class="row-item">DOM解析完成后</div>
            <div class="row-item">加载完成后立即</div>
            <div class="row-item">加载完成顺序</div>
          </div>
          <div class="table-row">
            <div class="row-title">DOMContentLoaded</div>
            <div class="row-item">脚本执行后</div>
            <div class="row-item">可能前/后</div>
            <div class="row-item">前</div>
            <div class="row-item">可能前/后</div>
            <div class="row-item">可能前/后</div>
          </div>
          <div class="table-row">
            <div class="row-title">适用场景</div>
            <div class="row-item">关键脚本</div>
            <div class="row-item">独立脚本</div>
            <div class="row-item">依赖DOM的脚本</div>
            <div class="row-item">按需加载脚本</div>
            <div class="row-item">按需加载脚本</div>
          </div>
        </div>
      </div>

      <div class="advanced-section">
        <h2>高级加载技术</h2>
        <div class="advanced-methods">
          <div class="advanced-card">
            <h3><span class="icon">🔗</span> Preload</h3>
            <div class="code-block">&lt;link rel="preload" href="app.js" as="script"&gt;</div>
            <p><strong>执行时机：</strong> 不自动执行，只是提前加载。需要配合<code>&lt;script&gt;</code>标签使用</p>
            <p><strong>使用场景：</strong> 关键资源提前加载，提高优先级</p>
            <p><strong>注意事项：</strong> 过度使用可能导致带宽竞争</p>
            <p>优点</p>
            <ul>
              <li>可以提前加载关键 JavaScript 资源，减少首屏等待时间</li>
              <li>提升脚本的加载优先级，避免被其他资源阻塞</li>
              <li>与 <code>&lt;script&gt;</code> 标签配合，保证执行顺序可控</li>
              <li>适合需要在页面渲染初期就用到的脚本</li>
              <li>有助于优化性能，提升用户体验</li>
            </ul>
            <p>执行代码</p>
            <ul>
              <li><p>静态imopr引入，会自动执行，前提是app.js是ES模块</p>
              <pre><code> import 'module' from 'app.js'</code></pre></li>
              <li><p>动态import引入，会自动执行，前提是app.js是ES模块</p>
              <pre><code>import('./app.js').then(module =&gt; {
console.log('模块已加载', module);
}).catch(err =&gt; {
console.error('模块加载失败', err);
});</code></pre></li>
              <li><p>动态添加script标签引入，会自动执行，没限制</p>
              <pre><code>const script = document.createElement('script');
script.src = 'app.js';
document.body.appendChild(script);</code></pre></li>
            </ul>
            <p>tips:只要js导出内容，浏览器会自动识别为模块js(type="module")</p>
          </div>

          <div class="advanced-card">
            <h3><span class="icon">🔗</span> Module Preload</h3>
            <div class="code-block">&lt;link rel="modulepreload" href="app.js"&gt;</div>
            <p>它不需要 as 属性，因为它默认知道这是一个模块</p>
            <p>专门应用于模块化 JavaScript 的场景，使得模块在需要使用时已经准备好</p>
            <p><strong>执行时机：</strong> 不自动执行，只是提前加载。需要配合<code>&lt;script&gt;</code>标签使用</p>
            <p><strong>使用场景：</strong> 关键资源提前加载，提高优先级，ES模块</p>
            <p><strong>注意事项：</strong> 过度使用可能导致带宽竞争</p>
            <p>优点</p>
            <ul>
              <li>专为 ES 模块设计，自动识别模块类型，无需 as 属性</li>
              <li>并行加载，提前加载模块依赖，减少首次执行时的等待时间</li>
              <li>提升模块加载优先级，优化页面性能</li>
              <li>适合大型应用的模块化按需加载场景</li>
              <li>与 <code>&lt;script type="module"&gt;</code> 配合，保证模块顺序和依赖关系</li>
              <li>有助于实现更高效的代码分割和懒加载</li>
            </ul>
            <p>执行代码</p>
            <ul>
              <li><p>静态imopr引入，会自动执行</p>
              <pre><code> import 'module' from 'app.js'</code></pre></li>
              <li><p>动态import引入，会自动执行</p>
              <pre><code>import('./app.js').then(module =&gt; {
console.log('模块已加载', module);
}).catch(err =&gt; {
console.error('模块加载失败', err);
});</code></pre></li>
              <li><p>动态添加script标签引入，会自动执行，没限制</p>
              <li>其实多此一举，上面的方法足够了(因为是es模块)</li>
              <pre><code>const script = document.createElement('script');
script.src = 'app.js';
document.body.appendChild(script);</code></pre></li>
            </ul>
          </div>

          <div class="advanced-card">
            <h3><span class="icon">🔗</span> Prefetch</h3>
            <div class="code-block">&lt;link rel="prefetch" href="app.js" as="script"&gt;</div>
            <p><strong>执行时机：</strong> 空闲时加载，不执行。当需要时通过脚本引入</p>
            <p><strong>使用场景：</strong> 预加载下一页资源或非关键资源</p>
            <p><strong>注意事项：</strong> 低优先级，浏览器空闲时加载</p>
            <p>优点</p>
          <ul>
            <li>空闲时加载模块，不阻塞页面渲染</li>
            <li>有助于实现更高效的代码分割和懒加载(预加载)</li>
            <li>适合大型应用的模块化按需加载场景</li>
            <li>提升模块加载优先级，优化页面性能</li>
          </ul>
          <p>执行代码</p>
          <p>同上</p>
          </div>

        </div>
      </div>

      <div class="best-practices">
        <h2>最佳实践与注意事项</h2>
        <div class="practices-grid">
          <div class="practice-card">
            <h3>脚本位置</h3>
            <p>将脚本放在<code>&lt;body&gt;</code>底部，除非使用<code>async</code>/<code>defer</code></p>
          </div>
          <div class="practice-card">
            <h3>关键脚本</h3>
            <p>关键脚本使用标准加载或preload，非关键脚本使用async/defer</p>
          </div>
          <div class="practice-card">
            <h3>模块化</h3>
            <p>使用ES模块(<code>type="module"</code>)默认具有defer行为</p>
          </div>
          <div class="practice-card">
            <h3>依赖管理</h3>
            <p>有依赖关系的脚本使用defer，独立脚本使用async</p>
          </div>
          <div class="practice-card">
            <h3>动态加载</h3>
            <p>使用<code>import()</code>动态导入实现代码分割</p>
          </div>
          <div class="practice-card">
            <h3>错误处理</h3>
            <p>为动态加载的脚本添加错误处理逻辑</p>
          </div>
        </div>
      </div>

      <div class="summary">
        <h2>总结</h2>
        <p>选择合适的JavaScript加载方式需要权衡执行顺序、阻塞行为和脚本重要性：</p>
        <ul>
          <li>对于<strong>关键渲染路径</strong>上的脚本，使用<code>preload</code>+标准加载或<code>defer</code></li>
          <li>对于<strong>独立、无依赖</strong>的脚本，使用<code>async</code></li>
          <li>对于<strong>非关键、按需加载</strong>的脚本，使用动态加载或<code>prefetch</code></li>
          <li>避免在<code>&lt;head&gt;</code>中使用无属性的<code>&lt;script&gt;</code>标签</li>
        </ul>
        <p>合理组合这些技术可以显著提升页面加载性能和用户体验。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['goToByRouteName'])
const goToESModule = () => {
  emit('goToByRouteName', 'ESModule')
}

</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #4361ee;
  --primary-light: #eef2ff;
  --secondary: #3a0ca3;
  --success: #2ec4b6;
  --warning: #ff9f1c;
  --danger: #e71d36;
  --dark: #1e1e2c;
  --light: #f8f9fa;
  --gray: #6c757d;
  --border: #dee2e6;
  --card-bg: #ffffff;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.js-loading-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  color: var(--dark);
  background-color: var(--light);
  line-height: 1.6;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f0f4ff 0%, #e6f7ff 100%);
  border-radius: 16px;
  box-shadow: var(--shadow);

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 15px;
    color: var(--dark);

    .highlight {
      color: var(--primary);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 8px;
        background: rgba(67, 97, 238, 0.2);
        border-radius: 4px;
      }
    }
  }

  .subtitle {
    font-size: 1.3rem;
    color: var(--gray);
    max-width: 700px;
    margin: 0 auto;
    font-weight: 500;
  }
}

.content {
  background-color: var(--card-bg);
  border-radius: 16px;
  box-shadow: var(--shadow);
  padding: 40px;
}

.intro {
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--primary-light);
  font-size: 1.1rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;
}

.loading-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.method-card {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-hover);
  }
}

.method-header {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  color: white;

  .icon {
    font-size: 1.8rem;
    margin-right: 15px;
  }

  h2 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 700;
  }
}

.method-content {
  padding: 25px;
}

.code-block {
  background: #f8f9fa;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  overflow-x: auto;

  pre {
    margin: 0;
  }

  .attr {
    color: var(--primary);
    font-weight: 600;
  }
}

.characteristics {
  margin-bottom: 20px;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: var(--secondary);
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 8px;
    }
  }
}

.pros-cons {
  display: flex;
  gap: 20px;

  > div {
    flex: 1;
    padding: 15px;
    border-radius: 8px;
  }

  .pros {
    background: rgba(46, 196, 182, 0.08);
    border: 1px solid rgba(46, 196, 182, 0.2);

    h4 {
      color: var(--success);
      margin-top: 0;
    }
  }

  .cons {
    background: rgba(231, 29, 54, 0.05);
    border: 1px solid rgba(231, 29, 54, 0.2);

    h4 {
      color: var(--danger);
      margin-top: 0;
    }
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 5px;
    }
  }
}

.comparison-section {
  margin: 50px 0;

  h2 {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: var(--secondary);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: var(--primary);
      border-radius: 2px;
    }
  }
}

.comparison-table {
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: var(--shadow);
}

.table-header {
  display: grid;
  grid-template-columns: 1fr repeat(5, 1fr);
  background: var(--primary);
  color: white;
  font-weight: 600;
  text-align: center;

  .header-item {
    padding: 15px;
    border-right: 1px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-right: none;
    }
  }
}

.table-row {
  display: grid;
  grid-template-columns: 1fr repeat(5, 1fr);
  border-bottom: 1px solid var(--border);
  text-align: center;

  &:last-child {
    border-bottom: none;
  }

  .row-title {
    padding: 15px;
    background: var(--primary-light);
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .row-item {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid var(--border);

    &:last-child {
      border-right: none;
    }
  }

  &:nth-child(even) {
    background: #f9fafb;
  }
}

.advanced-section {
  margin: 50px 0;

  h2 {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: var(--secondary);
  }
}

.advanced-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
}

.advanced-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 30px;
  box-shadow: var(--shadow);
  border-top: 4px solid var(--primary);

  h3 {
    margin-top: 0;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    gap: 10px;

    .icon {
      color: var(--primary);
    }
  }

  .code-block {
    margin: 20px 0;
  }

  p {
    margin-bottom: 10px;
  }
}

.best-practices {
  margin: 50px 0;

  h2 {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: var(--secondary);
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.practice-card {
  background: var(--card-bg);
  border-radius: 10px;
  padding: 25px;
  box-shadow: var(--shadow);
  border-left: 4px solid var(--success);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }

  h3 {
    margin-top: 0;
    color: var(--secondary);
  }
}

.summary {
  background: linear-gradient(to right, #f0f7ff, #f9fbff);
  border-radius: 12px;
  padding: 30px;
  border: 1px solid var(--primary-light);
  margin-top: 40px;

  h2 {
    margin-top: 0;
    color: var(--secondary);
    text-align: center;
    font-size: 1.8rem;
  }

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 10px;
      position: relative;
      padding-left: 20px;

      &::before {
        content: '•';
        color: var(--primary);
        font-weight: bold;
        position: absolute;
        left: 0;
      }
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 2.2rem;
    }
  }

  .content {
    padding: 20px;
  }

  .loading-methods {
    grid-template-columns: 1fr;
  }

  .pros-cons {
    flex-direction: column;
  }

  .comparison-table {
    overflow-x: auto;
  }

  .advanced-methods {
    grid-template-columns: 1fr;
  }

  .table-header, .table-row {
    grid-template-columns: 150px repeat(4, 150px);
  }
}
</style>
