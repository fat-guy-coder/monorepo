<template>
  <div class="vapor-principle">
    <div class="hero">
      <div class="hero-content">
        <h1>Vue Vapor模式原理深度解析</h1>
        <p class="subtitle">揭开下一代无虚拟DOM渲染引擎的技术奥秘</p>
      </div>
      <div class="hero-animation">
        <div class="animation-container">
          <div class="state-circle">状态</div>
          <div class="compile-arrow">➜</div>
          <div class="instructions">编译指令</div>
          <div class="dom-arrow">➜</div>
          <div class="dom-circle">DOM更新</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">📜 Vapor模式核心设计理念</h2>

      <div class="core-principles">
        <div class="principle">
          <div class="principle-icon">⚡</div>
          <div>
            <h3>编译时优化</h3>
            <p>在构建阶段分析模板结构，生成高效的更新指令</p>
          </div>
        </div>

        <div class="principle">
          <div class="principle-icon">🗜️</div>
          <div>
            <h3>轻量化运行时</h3>
            <p>移除虚拟DOM及其相关开销，直接操作原生DOM</p>
          </div>
        </div>

        <div class="principle">
          <div class="principle-icon">🎯</div>
          <div>
            <h3>精细化更新</h3>
            <p>仅更新实际变化的DOM节点，避免不必要的操作</p>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">🔄 传统虚拟DOM更新流程</h2>

      <div class="update-process">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>状态变化</h3>
            <p>响应式数据发生变化</p>
          </div>
        </div>

        <div class="arrow">➜</div>

        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>创建虚拟DOM树</h3>
            <p>重新生成整个组件的虚拟DOM表示</p>
            <div class="code-snippet">
              <pre>const vnode = { tag: 'div', children: [...] }</pre>
            </div>
          </div>
        </div>

        <div class="arrow">➜</div>

        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>Diff算法比较</h3>
            <p>对比新旧虚拟DOM树，找出差异</p>
            <div class="complexity">O(n)时间复杂度</div>
          </div>
        </div>

        <div class="arrow">➜</div>

        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>生成更新操作</h3>
            <p>将差异转换为DOM操作指令</p>
            <div class="code-snippet">
              <pre>patch(el, oldVNode, newVNode)</pre>
            </div>
          </div>
        </div>

        <div class="arrow">➜</div>

        <div class="step">
          <div class="step-number">5</div>
          <div class="step-content">
            <h3>应用DOM更新</h3>
            <p>执行DOM操作更新界面</p>
          </div>
        </div>
      </div>

      <div class="limitation">
        <div class="limitation-icon">⚠️</div>
        <div class="limitation-content">
          <h3>核心问题：双重开销</h3>
          <p>1. 创建虚拟DOM树的开销 (内存 + CPU)</p>
          <p>2. Diff算法执行的开销 (O(n)复杂度)</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">🚀 Vapor模式更新原理</h2>

      <div class="vapor-update-process">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>编译阶段</h3>
            <p>分析模板结构，生成更新指令</p>
            <div class="code-snippet">
              <pre>// 编译时生成的更新函数
function update_count(val) {
  setText(__ctx.countEl, val)
}</pre>
            </div>
          </div>
        </div>

        <div class="arrow">➜</div>

        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>状态变化</h3>
            <p>响应式数据发生变化</p>
          </div>
        </div>

        <div class="arrow">➜</div>

        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>直接执行更新函数</h3>
            <p>调用编译生成的精确更新指令</p>
            <div class="code-snippet">
              <pre>// 状态变化时直接调用
count.value++  =>  update_count(1)</pre>
            </div>
          </div>
        </div>

        <div class="arrow">➜</div>

        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>DOM精确更新</h3>
            <p>直接修改受影响的具体DOM节点</p>
          </div>
        </div>
      </div>

      <div class="vapor-advantages">
        <div class="advantage">
          <div class="advantage-icon">🚫</div>
          <div>
            <h3>无虚拟DOM创建</h3>
            <p>节省创建虚拟DOM树的时间和内存</p>
          </div>
        </div>

        <div class="advantage">
          <div class="advantage-icon">❌</div>
          <div>
            <h3>无Diff算法</h3>
            <p>避免O(n)复杂度的比较操作</p>
          </div>
        </div>

        <div class="advantage">
          <div class="advantage-icon">🎯</div>
          <div>
            <h3>精确更新</h3>
            <p>直接定位到需要更新的DOM节点</p>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">🔧 编译时优化技术</h2>

      <div class="compilation-tech">
        <div class="tech">
          <h3><span class="tech-icon">🏷️</span> 静态提升</h3>
          <div class="tech-content">
            <p>将静态内容提升到组件范围外，避免重复创建</p>
            <div class="code-comparison">
              <div class="code-block">
                <h4>原始模板</h4>
                <pre>&lt;div&gt;
  &lt;h1&gt;Static Title&lt;/h1&gt;
  &lt;p&gt;&#123;&#123; dynamicContent &#125;&#125;&lt;/p&gt;
&lt;/div&gt;</pre>
              </div>
              <div class="arrow">➜</div>
              <div class="code-block">
                <h4>编译后</h4>
                <pre>const _hoisted = createStaticVNode(
  "&lt;h1&gt;Static Title&lt;/h1&gt;"
)

function render() {
  return [
    _hoisted,
    createTextNode(ctx.dynamicContent)
  ]
}</pre>
              </div>
            </div>
          </div>
        </div>

        <div class="tech">
          <h3><span class="tech-icon">📍</span> 锚点定位</h3>
          <div class="tech-content">
            <p>为动态节点创建直接引用</p>
            <div class="code-snippet">
              <pre>// 编译时生成锚点引用
const __ctx = {
  countEl: /* 定位到count元素 */
}</pre>
            </div>
            <div class="visual-example">
              <div class="dom-node">
                &lt;div&gt;
                <div class="dom-node dynamic">
                  &lt;p&gt;Count: &#123;&#123; count &#125;&#125;&lt;/p&gt;
                  <div class="anchor">anchored</div>
                </div>
                &lt;/div&gt;
              </div>
            </div>
          </div>
        </div>

        <div class="tech">
          <h3><span class="tech-icon">📌</span> 更新指令</h3>
          <div class="tech-content">
            <p>为每个响应式数据生成更新函数</p>
            <div class="code-snippet">
              <pre>// 编译时生成的更新函数
function update_count(value) {
  setText(__ctx.countEl, value)
}</pre>
            </div>
            <div class="explanation">
              <p>响应式数据变化时直接调用此函数更新DOM</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">⚙️ 响应式系统集成</h2>

      <div class="reactivity-integration">
        <div class="integration-step">
          <div class="step-header">
            <div class="step-number">1</div>
            <h3>响应式依赖追踪</h3>
          </div>
          <p>编译时分析模板中的响应式依赖关系</p>
          <div class="code-snippet">
            <pre>// 模板: &lt;p&gt;&#123;&#123; count&#125;&#125;&lt;/p&gt;
// 编译结果:
watchEffect(() => {
  update_count(count.value)
})</pre>
          </div>
        </div>

        <div class="integration-step">
          <div class="step-header">
            <div class="step-number">2</div>
            <h3>高效更新触发</h3>
          </div>
          <p>响应式数据变化时直接调用更新函数</p>
          <div class="code-snippet">
            <pre>count.value++  // => update_count(count.value)</pre>
          </div>
          <div class="performance-note">
            <div class="perf-icon">⚡</div>
            <p>直接更新DOM，无中间处理步骤</p>
          </div>
        </div>

        <div class="integration-step">
          <div class="step-header">
            <div class="step-number">3</div>
            <h3>DOM操作优化</h3>
          </div>
          <p>批量处理连续更新，减少重排重绘</p>
          <div class="code-snippet">
            <pre>batch(() => {
  update_name(newName)
  update_age(newAge)
})</pre>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">📊 性能优化机制</h2>

      <div class="performance-mechanisms">
        <div class="mechanism">
          <h3><span class="mech-icon">📦</span> 内存优化</h3>
          <div class="mech-content">
            <div class="perf-bar">
              <div class="bar-label">虚拟DOM：250KB</div>
              <div class="bar virtual" style="width: 100%"></div>
            </div>
            <div class="perf-bar">
              <div class="bar-label">Vapor模式：80KB</div>
              <div class="bar vapor" style="width: 32%"></div>
            </div>
            <p>移除虚拟DOM存储，减少60%以上内存占用</p>
          </div>
        </div>

        <div class="mechanism">
          <h3><span class="mech-icon">⏱️</span> 执行时间优化</h3>
          <div class="timeline">
            <div class="timeline-virtual">
              <div class="time-label">虚拟DOM更新: 12ms</div>
              <div class="time-segment" style="width: 100%"></div>
            </div>
            <div class="timeline-vapor">
              <div class="time-label">Vapor更新: 3ms</div>
              <div class="time-segment" style="width: 25%"></div>
            </div>
          </div>
          <p>跳过虚拟DOM操作，减少75%更新时间</p>
        </div>

        <div class="mechanism">
          <h3><span class="mech-icon">🔄</span> 更新粒度优化</h3>
          <div class="update-granularity">
            <div class="virtual-update">
              <div class="title">虚拟DOM</div>
              <div class="update-area">
                <div class="updated">更新节点</div>
                <div class="unchanged">未变化</div>
                <div class="unchanged">未变化</div>
                <div class="unchanged">未变化</div>
              </div>
            </div>
            <div class="vapor-update">
              <div class="title">Vapor模式</div>
              <div class="update-area">
                <div class="updated">更新节点</div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <p>仅更新实际变化的节点，避免额外操作</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">🔍 Vapor模式与传统模式对比</h2>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>传统虚拟DOM</th>
              <th>Vapor模式</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>更新机制</td>
              <td>虚拟DOM Diff/补丁</td>
              <td>直接DOM操作</td>
            </tr>
            <tr>
              <td>内存使用</td>
              <td>高（存储虚拟DOM树）</td>
              <td>低（仅DOM引用）</td>
            </tr>
            <tr>
              <td>CPU开销</td>
              <td>高（Diff算法）</td>
              <td>低（直接更新）</td>
            </tr>
            <tr>
              <td>初次渲染</td>
              <td>较快</td>
              <td>稍慢（编译优化）</td>
            </tr>
            <tr>
              <td>更新性能</td>
              <td>中等</td>
              <td>极快（2-5倍提升）</td>
            </tr>
            <tr>
              <td>复杂场景</td>
              <td>动态模板支持好</td>
              <td>静态模板优化强</td>
            </tr>
            <tr>
              <td>适用场景</td>
              <td>通用应用</td>
              <td>性能关键组件</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">🚀 Vapor模式的未来演进</h2>

      <div class="future-evolution">
        <div class="evolution-item">
          <h3><span class="evolution-icon">🔮</span> 编译器增强</h3>
          <ul>
            <li>更智能的静态分析</li>
            <li>更细粒度的更新指令</li>
            <li>优化模板控制流</li>
          </ul>
        </div>

        <div class="evolution-item">
          <h3><span class="evolution-icon">🛠️</span> 混合模式增强</h3>
          <ul>
            <li>无缝切换虚拟DOM与Vapor模式</li>
            <li>优化混合模式通信机制</li>
            <li>跨模式组件交互优化</li>
          </ul>
        </div>

        <div class="evolution-item">
          <h3><span class="evolution-icon">⚙️</span> 开发者体验</h3>
          <ul>
            <li>增强调试工具支持</li>
            <li>性能分析工具集成</li>
            <li>迁移辅助工具</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="conclusion">
      <h2>💎 Vapor模式的核心价值</h2>
      <p>Vapor模式代表了前端框架性能优化的新方向，通过创新的编译时优化和直接DOM操作策略，为性能关键应用提供了新的解决方案。它尤其适用于需要高频更新、大数据量渲染和低性能设备的场景。</p>

      <div class="resources">
        <h3>深入学习资源：</h3>
        <ul>
          <li><a href="#">Vapor模式技术白皮书</a></li>
          <li><a href="#">编译优化原理基础介绍</a></li>
          <li><a href="#">性能基准测试报告</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑（演示用）
import { ref } from 'vue';

// 示例状态
const demoVisible = ref(false);

// 切换示例显示状态
const toggleDemo = () => {
  demoVisible.value = !demoVisible.value;
};
</script>

<style lang="less" scoped>
@font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@primary-color: #42b883;
@secondary-color: #35495e;
@text-primary: #2c3e50;
@text-secondary: #7f8c8d;
@border-color: #e0e0e0;
@background-light: #f8fafc;
@card-bg: #ffffff;
@virtual-color: #e74c3c;
@vapor-color: #42b883;
@warning-color: #ff9800;

.vapor-principle {
  font-family: @font-family;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 25px;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
}

.hero {
  background: linear-gradient(135deg, fade(@primary-color, 10%), fade(@primary-color, 5%));
  border-radius: 16px;
  padding: 50px 40px;
  margin-bottom: 40px;
  text-align: center;
  border: 1px solid fade(@primary-color, 15%);

  .hero-content {
    max-width: 800px;
    margin: 0 auto 30px;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 20px;
      color: @text-primary;
    }

    .subtitle {
      font-size: 1.4rem;
      color: @text-secondary;
      max-width: 600px;
      margin: 0 auto;
    }
  }

  .hero-animation {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);

    .animation-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;

      >div {
        padding: 20px 30px;
        border-radius: 8px;
        font-weight: bold;
      }

      .state-circle {
        background: fade(@primary-color, 15%);
        color: darken(@primary-color, 15%);
        border: 2px dashed @primary-color;
      }

      .instructions {
        background: fade(@warning-color, 15%);
        color: darken(@warning-color, 20%);
        border: 2px solid @warning-color;
      }

      .dom-circle {
        background: fade(@vapor-color, 15%);
        color: darken(@vapor-color, 15%);
        border: 2px solid @vapor-color;
      }

      .compile-arrow,
      .dom-arrow {
        font-size: 2.5rem;
        color: @text-secondary;
      }
    }
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  padding: 35px;
  margin-bottom: 35px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .section-title {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid fade(@primary-color, 10%);
    display: flex;
    align-items: center;
    gap: 15px;
  }
}

.core-principles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;

  .principle {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    padding: 20px;
    background: fade(@primary-color, 5%);
    border-radius: 12px;
    border-left: 4px solid @primary-color;

    .principle-icon {
      font-size: 2.2rem;
      min-width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: fade(@primary-color, 15%);
      color: @primary-color;
      border-radius: 50%;
    }

    h3 {
      font-size: 1.3rem;
      margin-top: 0;
      margin-bottom: 10px;
    }

    p {
      margin: 0;
      color: @text-secondary;
      line-height: 1.7;
    }
  }
}

.update-process,
.vapor-update-process {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;

  .step {
    min-width: 200px;
    padding: 20px;
    border-radius: 12px;
    background: fade(@text-secondary, 5%);
    text-align: center;
    flex: 1;

    .step-number {
      width: 40px;
      height: 40px;
      background: @virtual-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 15px;
      font-weight: bold;
      font-size: 1.2rem;
    }

    h3 {
      font-size: 1.2rem;
      margin-top: 0;
      margin-bottom: 10px;
    }

    p {
      margin: 0;
      color: @text-secondary;
      font-size: 0.95rem;
    }

    .complexity {
      margin-top: 10px;
      padding: 8px;
      background: fade(@virtual-color, 10%);
      border-radius: 6px;
      font-weight: 500;
      color: @virtual-color;
    }
  }

  .arrow {
    font-size: 2rem;
    color: @text-secondary;
    flex-shrink: 0;
  }
}

.vapor-update-process .step .step-number {
  background: @vapor-color;
}

.limitation {
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background: fade(@virtual-color, 8%);
  border-radius: 12px;
  border-left: 4px solid @virtual-color;

  .limitation-icon {
    font-size: 2.5rem;
  }

  h3 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 10px;
    color: @virtual-color;
  }

  p {
    margin: 5px 0;
    color: @text-secondary;
  }
}

.vapor-advantages {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;

  .advantage {
    display: flex;
    gap: 15px;
    padding: 20px;
    background: fade(@vapor-color, 8%);
    border-radius: 12px;

    .advantage-icon {
      font-size: 1.8rem;
      min-width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: fade(@vapor-color, 15%);
      color: @vapor-color;
      border-radius: 50%;
    }

    h3 {
      font-size: 1.2rem;
      margin-top: 0;
      margin-bottom: 8px;
    }

    p {
      margin: 0;
      color: @text-secondary;
      font-size: 0.95rem;
    }
  }
}

.compilation-tech {
  .tech {
    margin-bottom: 35px;

    h3 {
      font-size: 1.4rem;
      margin-top: 0;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .tech-icon {
      font-size: 1.4rem;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: fade(@primary-color, 15%);
      color: @primary-color;
      border-radius: 50%;
    }

    p {
      margin-top: 0;
      margin-bottom: 15px;
      color: @text-secondary;
    }
  }
}

.code-comparison {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;

  .code-block {
    flex: 1;
    min-width: 300px;

    h4 {
      font-size: 1.1rem;
      margin-top: 0;
      margin-bottom: 10px;
      color: @text-secondary;
      font-weight: 500;
    }
  }

  .arrow {
    font-size: 1.8rem;
    color: @text-secondary;
  }
}

.code-snippet {
  background: #2d3747;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 10px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  overflow-x: auto;
  margin: 15px 0;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);

  pre {
    margin: 0;
  }
}

.visual-example {
  margin-top: 20px;
  padding: 20px;
  background: fade(@text-secondary, 5%);
  border-radius: 12px;

  .dom-node {
    font-family: 'Fira Code', monospace;
    padding: 15px;
    background: white;
    border: 1px solid @border-color;
    border-radius: 8px;

    .dynamic {
      position: relative;
      margin: 10px 0 0 20px;
      padding: 10px;
      background: fade(@vapor-color, 10%);
      border: 1px dashed fade(@vapor-color, 50%);
      border-radius: 6px;

      .anchor {
        position: absolute;
        top: -12px;
        right: -12px;
        background: @vapor-color;
        color: white;
        font-size: 0.7rem;
        padding: 3px 8px;
        border-radius: 20px;
      }
    }
  }
}

.reactivity-integration {
  .integration-step {
    margin-bottom: 35px;
    padding-bottom: 25px;
    border-bottom: 1px solid @border-color;

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    .step-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 15px;

      .step-number {
        min-width: 36px;
        height: 36px;
        background: @vapor-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }
    }

    p {
      color: @text-secondary;
      margin-top: 0;
      margin-bottom: 15px;
    }
  }
}

.performance-mechanisms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 30px;

  .mechanism {
    h3 {
      font-size: 1.3rem;
      margin-top: 0;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .mech-icon {
      font-size: 1.4rem;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: fade(@primary-color, 15%);
      color: @primary-color;
      border-radius: 50%;
    }

    p {
      margin-top: 15px;
      color: @text-secondary;
    }
  }
}

.perf-bar {
  margin-bottom: 15px;

  .bar-label {
    font-size: 0.9rem;
    margin-bottom: 8px;
    color: @text-secondary;
  }

  .bar {
    height: 25px;
    border-radius: 4px;

    &.virtual {
      background: fade(@virtual-color, 60%);
    }

    &.vapor {
      background: fade(@vapor-color, 60%);
    }
  }
}

.timeline {

  .timeline-virtual,
  .timeline-vapor {
    margin-bottom: 25px;

    .time-label {
      font-size: 0.9rem;
      margin-bottom: 8px;
      color: @text-secondary;
    }

    .time-segment {
      height: 20px;
      border-radius: 4px;
    }
  }

  .timeline-virtual .time-segment {
    background: fade(@virtual-color, 60%);
  }

  .timeline-vapor .time-segment {
    background: fade(@vapor-color, 60%);
  }
}

.update-granularity {
  display: flex;
  gap: 30px;

  >div {
    flex: 1;

    .title {
      font-weight: 500;
      margin-bottom: 10px;
      color: @text-secondary;
    }
  }

  .update-area {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;

    >div {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      font-weight: 500;
    }
  }

  .virtual-update .update-area {
    >div {
      background: fade(@virtual-color, 20%);
      border: 1px solid fade(@virtual-color, 40%);

      &.unchanged {
        background: fade(@text-secondary, 10%);
        color: @text-secondary;
        border: 1px solid @border-color;
      }
    }
  }

  .vapor-update .update-area {
    >div {
      background: @vapor-color;
      color: white;
      border: 1px solid darken(@vapor-color, 10%);

      &:empty {
        background: fade(@text-secondary, 5%);
        border: 1px dashed fade(@text-secondary, 30%);
      }
    }
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 16px 20px;
      text-align: left;
    }

    thead {
      background: @primary-color;
      color: white;

      th {
        font-weight: 600;
        border-bottom: 2px solid darken(@primary-color, 10%);
      }
    }

    tbody {
      tr:nth-child(even) {
        background: fade(@primary-color, 5%);
      }

      tr:hover {
        background: fade(@primary-color, 10%);
      }

      td {
        border-bottom: 1px solid @border-color;
      }
    }
  }
}

.future-evolution {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;

  .evolution-item {
    h3 {
      font-size: 1.3rem;
      margin-top: 0;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .evolution-icon {
      font-size: 1.4rem;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: fade(@primary-color, 15%);
      color: @primary-color;
      border-radius: 50%;
    }

    ul {
      padding-left: 20px;
      margin: 0;

      li {
        margin-bottom: 10px;
        color: @text-secondary;
      }
    }
  }
}

.conclusion {
  background: linear-gradient(135deg, fade(@primary-color, 8%), fade(@primary-color, 4%));
  border-radius: 16px;
  padding: 40px;
  margin-top: 30px;
  text-align: center;
  border: 1px solid fade(@primary-color, 15%);

  h2 {
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 25px;
  }

  p {
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto 30px;
    line-height: 1.7;
    color: @text-secondary;
  }
}

.resources {
  text-align: left;
  max-width: 600px;
  margin: 40px auto 0;
  padding-top: 20px;
  border-top: 1px solid fade(@primary-color, 20%);

  h3 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 15px;
  }

  ul {
    padding-left: 0;
    list-style: none;

    li {
      margin-bottom: 12px;

      a {
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 8px;

        &::before {
          content: "🔗";
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .hero {
    padding: 30px 20px;

    h1 {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.2rem;
    }
  }

  .section {
    padding: 25px 20px;
  }

  .update-process,
  .vapor-update-process {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      margin: 10px 0;
    }
  }

  .core-principles,
  .comparison-table,
  .future-evolution {
    grid-template-columns: 1fr;
  }
}
</style>
