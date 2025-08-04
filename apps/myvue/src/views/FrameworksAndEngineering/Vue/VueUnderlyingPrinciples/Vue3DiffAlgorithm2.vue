<template>
  <div class="diff-algorithm-container">
    <!-- 头部标题区域 -->
    <header class="header">
      <h1><i class="fas fa-bolt"></i> Vue3 Diff算法解析</h1>
      <p class="subtitle">探索Vue3高效的虚拟DOM更新机制</p>
    </header>

    <!-- 主内容区域 -->
    <main class="content">
      <!-- 概述卡片 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-lightbulb"></i>
          <h2>Diff算法概述</h2>
        </div>
        <div class="card-content">
          <div class="definition">
            <p><strong>Diff算法</strong> 是Vue3虚拟DOM的核心，用于比较新旧虚拟DOM树的差异，并最小化DOM操作。</p>
            <p>Vue3的Diff算法通过编译时优化和运行时优化，实现了比Vue2更高效的更新机制。</p>
          </div>

          <div class="key-features">
            <div class="feature">
              <div class="icon">
                <i class="fas fa-arrow-up"></i>
              </div>
              <div class="content">
                <h3>静态提升</h3>
                <p>编译时提取静态节点，跳过Diff过程</p>
              </div>
            </div>
            <div class="feature">
              <div class="icon">
                <i class="fas fa-flag"></i>
              </div>
              <div class="content">
                <h3>补丁标志</h3>
                <p>精确标记动态内容，减少比较范围</p>
              </div>
            </div>
            <div class="feature">
              <div class="icon">
                <i class="fas fa-tree"></i>
              </div>
              <div class="content">
                <h3>块树优化</h3>
                <p>树结构优化，减少遍历深度</p>
              </div>
            </div>
            <div class="feature">
              <div class="icon">
                <i class="fas fa-sort-amount-up"></i>
              </div>
              <div class="content">
                <h3>最长递增子序列</h3>
                <p>高效处理列表变动，最大化节点复用</p>
              </div>
            </div>
          </div>

          <div class="performance-chart">
            <div class="chart-bars">
              <div class="chart-bar vue2" :style="{ height: '80%' }">
                <div class="bar-label">Vue2</div>
                <div class="bar-value">100%</div>
              </div>
              <div class="chart-bar vue3" :style="{ height: '35%' }">
                <div class="bar-label">Vue3</div>
                <div class="bar-value">35%</div>
              </div>
            </div>
            <div class="chart-title">Diff操作量对比</div>
          </div>
        </div>
      </section>

      <!-- 核心原理 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-cogs"></i>
          <h2>核心原理</h2>
        </div>
        <div class="card-content">
          <div class="process-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>编译时优化</h3>
                <p>在编译阶段识别静态节点并提升，添加补丁标志标记动态内容</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>块树结构</h3>
                <p>将模板划分为动态块和静态块，仅追踪动态部分</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>双端比较</h3>
                <p>对动态节点进行双端比较，处理常见DOM操作场景</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>最长递增子序列</h3>
                <p>处理列表更新时，计算最长递增子序列最大化复用节点</p>
              </div>
            </div>
          </div>

          <div class="visualization">
            <div class="block-tree">
              <div class="block root-block">
                <div class="block-header">根块</div>
                <div class="static-nodes">
                  <div class="node">静态节点</div>
                  <div class="node">静态节点</div>
                </div>
                <div class="dynamic-block">
                  <div class="block-header">动态块</div>
                  <div class="node">动态节点</div>
                  <div class="node">动态节点</div>
                </div>
              </div>
            </div>

            <div class="comparison">
              <div class="vue2-diff">
                <h4>Vue2 Diff过程</h4>
                <div class="process">
                  <div class="step">遍历整个虚拟DOM树</div>
                  <div class="step">比较每个节点</div>
                  <div class="step">时间复杂度: O(n)</div>
                </div>
              </div>

              <div class="vue3-diff">
                <h4>Vue3 Diff过程</h4>
                <div class="process">
                  <div class="step">跳过静态块</div>
                  <div class="step">仅比较动态块</div>
                  <div class="step">时间复杂度: O(动态节点)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 算法实现 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-code"></i>
          <h2>算法实现</h2>
        </div>
        <div class="card-content">
          <div class="code-section">
            <h3>Diff算法核心代码（简化版）</h3>
            <pre class="code-block"><code>// 虚拟DOM节点结构
interface VNode {
  type: string | symbol;
  props: Record&lt;string, any&gt;;
  children: VNode[] | string;
  key: string | number | null;
  el: HTMLElement | null;
  patchFlag: number; // 补丁标志
  dynamicChildren: VNode[] | null; // 动态子节点
}

// 核心Diff函数
function patch(
  n1: VNode | null, // 旧节点
  n2: VNode,        // 新节点
  container: HTMLElement,
  anchor: ChildNode | null = null
) {
  // 1. 如果是不同类型的节点，直接替换
  if (n1 && !isSameVNodeType(n1, n2)) {
    unmount(n1);
    n1 = null;
  }

  // 2. 处理相同类型的节点
  const { type, patchFlag } = n2;

  // 3. 根据补丁标志进行优化处理
  if (patchFlag > 0) {
    // 有补丁标志，进行优化更新
    processElement(n1, n2, container, anchor);
  } else {
    // 没有补丁标志，进行全量比较
    patchElement(n1, n2, container, anchor);
  }
}

// 处理元素节点
function processElement(
  n1: VNode | null,
  n2: VNode,
  container: HTMLElement,
  anchor: ChildNode | null
) {
  // 4. 如果旧节点不存在，挂载新节点
  if (n1 === null) {
    mountElement(n2, container, anchor);
  } else {
    // 5. 更新现有节点
    patchElement(n1, n2, container, anchor);
  }
}

// 更新元素节点
function patchElement(
  n1: VNode,
  n2: VNode,
  container: HTMLElement,
  anchor: ChildNode | null
) {
  const el = (n2.el = n1.el!);
  const oldProps = n1.props;
  const newProps = n2.props;

  // 6. 根据补丁标志更新属性
  if (n2.patchFlag) {
    // 只更新有变化的属性
    if (n2.patchFlag & PatchFlags.CLASS) {
      // 更新class
    }
    if (n2.patchFlag & PatchFlags.STYLE) {
      // 更新style
    }
    if (n2.patchFlag & PatchFlags.PROPS) {
      // 更新props
    }
    // ... 其他补丁标志处理
  } else {
    // 没有补丁标志，全量更新属性
    patchProps(el, oldProps, newProps);
  }

  // 7. 更新子节点
  patchChildren(n1, n2, el);
}

// 更新子节点（核心Diff逻辑）
function patchChildren(
  n1: VNode,
  n2: VNode,
  container: HTMLElement
) {
  const c1 = n1.children as VNode[];
  const c2 = n2.children as VNode[];

  // 8. 如果新子节点是文本
  if (typeof c2 === 'string') {
    // 处理文本内容
  }
  // 9. 如果新子节点是数组
  else if (Array.isArray(c2)) {
    // 10. 如果旧子节点也是数组
    if (Array.isArray(c1)) {
      // 双端Diff算法
      patchKeyedChildren(c1, c2, container);
    } else {
      // 旧子节点不存在或为文本，挂载新子节点
    }
  }
}

// 双端Diff算法（处理keyed children）
function patchKeyedChildren(
  c1: VNode[],
  c2: VNode[],
  container: HTMLElement
) {
  let i = 0;
  let e1 = c1.length - 1;
  let e2 = c2.length - 1;

  // 11. 从头部开始比对
  while (i <= e1 && i <= e2) {
    const n1 = c1[i];
    const n2 = c2[i];
    if (isSameVNodeType(n1, n2)) {
      patch(n1, n2, container);
    } else {
      break;
    }
    i++;
  }

  // 12. 从尾部开始比对
  while (i <= e1 && i <= e2) {
    const n1 = c1[e1];
    const n2 = c2[e2];
    if (isSameVNodeType(n1, n2)) {
      patch(n1, n2, container);
    } else {
      break;
    }
    e1--;
    e2--;
  }

  // 13. 处理新增节点
  if (i > e1 && i <= e2) {
    // 添加新节点
  }
  // 14. 处理删除节点
  else if (i > e2 && i <= e1) {
    // 删除旧节点
  }
  // 15. 处理未知序列
  else {
    // 16. 构建key到新节点索引的映射
    const keyToNewIndexMap = new Map();
    for (let j = i; j <= e2; j++) {
      keyToNewIndexMap.set(c2[j].key, j);
    }

    // 17. 遍历旧节点，尝试patch匹配的节点，移除不存在的节点
    const newIndexToOldIndexMap = new Array(e2 - i + 1).fill(0);
    for (let j = i; j <= e1; j++) {
      const oldChild = c1[j];
      const newIndex = keyToNewIndexMap.get(oldChild.key);

      if (newIndex === undefined) {
        // 移除节点
        unmount(oldChild);
      } else {
        newIndexToOldIndexMap[newIndex - i] = j + 1;
        // 递归patch
        patch(oldChild, c2[newIndex], container);
      }
    }

    // 18. 计算最长递增子序列（LIS）
    const increasingNewIndexSequence = getSequence(newIndexToOldIndexMap);
    let j = increasingNewIndexSequence.length - 1;

    // 19. 从尾部开始处理移动和新增节点
    for (let k = e2 - i; k >= 0; k--) {
      const currentIndex = i + k;
      const child = c2[currentIndex];

      if (newIndexToOldIndexMap[k] === 0) {
        // 新增节点
        patch(null, child, container);
      } else if (k !== increasingNewIndexSequence[j]) {
        // 移动节点
        container.insertBefore(child.el, container.children[currentIndex + 1]);
      } else {
        // 在LIS中的节点不需要移动
        j--;
      }
    }
  }
}

// 辅助函数：获取最长递增子序列
function getSequence(arr: number[]): number[] {
  // 实现最长递增子序列算法
  // 返回索引数组
}</code></pre>
          </div>

          <div class="code-explanation">
            <h3>代码关键点解析</h3>
            <div class="explanation-points">
              <div class="point">
                <div class="point-number">1-3</div>
                <div class="point-content">
                  <h4>节点类型判断</h4>
                  <p>首先检查节点类型是否相同，不同类型直接替换</p>
                </div>
              </div>
              <div class="point">
                <div class="point-number">4-5</div>
                <div class="point-content">
                  <h4>挂载/更新决策</h4>
                  <p>根据旧节点是否存在决定是挂载新节点还是更新现有节点</p>
                </div>
              </div>
              <div class="point">
                <div class="point-number">6-7</div>
                <div class="point-content">
                  <h4>补丁标志优化</h4>
                  <p>使用补丁标志确定需要更新的属性范围，避免全量比较</p>
                </div>
              </div>
              <div class="point">
                <div class="point-number">8-10</div>
                <div class="point-content">
                  <h4>子节点类型处理</h4>
                  <p>根据子节点类型（文本/数组）进行不同处理</p>
                </div>
              </div>
              <div class="point">
                <div class="point-number">11-15</div>
                <div class="point-content">
                  <h4>双端比较</h4>
                  <p>从头部和尾部同时开始比较，处理常见DOM操作场景</p>
                </div>
              </div>
              <div class="point">
                <div class="point-number">16-19</div>
                <div class="point-content">
                  <h4>最长递增子序列</h4>
                  <p>对未知序列使用最长递增子序列算法，最大化节点复用</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 性能优势 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-tachometer-alt"></i>
          <h2>性能优势</h2>
        </div>
        <div class="card-content">
          <div class="performance-comparison">
            <div class="comparison-item">
              <div class="metric">
                <div class="metric-value">2-5x</div>
                <div class="metric-label">渲染速度提升</div>
              </div>
              <div class="description">
                <p>通过静态提升和补丁标志，减少不必要的比较操作</p>
              </div>
            </div>
            <div class="comparison-item">
              <div class="metric">
                <div class="metric-value">40%</div>
                <div class="metric-label">内存占用减少</div>
              </div>
              <div class="description">
                <p>块树结构减少内存使用，提高应用性能</p>
              </div>
            </div>
            <div class="comparison-item">
              <div class="metric">
                <div class="metric-value">90%</div>
                <div class="metric-label">DOM操作减少</div>
              </div>
              <div class="description">
                <p>最长递增子序列算法最大化节点复用，减少DOM操作</p>
              </div>
            </div>
          </div>

          <div class="use-cases">
            <h3>最佳实践场景</h3>
            <div class="case">
              <div class="case-icon">
                <i class="fas fa-list"></i>
              </div>
              <div class="case-content">
                <h4>大型列表渲染</h4>
                <p>使用key和LIS算法优化大型列表更新</p>
              </div>
            </div>
            <div class="case">
              <div class="case-icon">
                <i class="fas fa-table"></i>
              </div>
              <div class="case-content">
                <h4>数据表格</h4>
                <p>利用静态提升优化静态表头和表尾</p>
              </div>
            </div>
            <div class="case">
              <div class="case-icon">
                <i class="fas fa-sliders-h"></i>
              </div>
              <div class="case-content">
                <h4>动态UI组件</h4>
                <p>使用补丁标志精确更新变化的属性</p>
              </div>
            </div>
            <div class="case">
              <div class="case-icon">
                <i class="fas fa-chart-bar"></i>
              </div>
              <div class="case-content">
                <h4>数据可视化</h4>
                <p>高效更新大量数据点，保持UI流畅</p>
              </div>
            </div>
          </div>

          <div class="optimization-tips">
            <h3>优化技巧</h3>
            <ul>
              <li>始终为v-for提供唯一且稳定的key</li>
              <li>避免在模板中使用复杂表达式</li>
              <li>合理使用v-once标记静态内容</li>
              <li>将大型组件拆分为更小的组件</li>
              <li>使用计算属性减少模板中的计算量</li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>Vue3 Diff算法解析 | 深入理解虚拟DOM更新机制 | 性能优化实践</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const showDetails = ref(false);
</script>

<style lang="less" scoped>
@primary: #4361ee;
@primary-light: #4895ef;
@secondary: #3f37c9;
@success: #4cc9f0;
@warning: #ff9e00;
@text: #2b2d42;
@text-light: #8d99ae;
@background: #f8f9fa;
@card-bg: #ffffff;
@border: #e9ecef;
@shadow: rgba(149, 157, 165, 0.1);

.diff-algorithm-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: @background;
  color: @text;
  line-height: 1.6;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary, @secondary);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 12px @shadow;

  h1 {
    font-size: 2.2rem;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .subtitle {
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0.9;
  }
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;
}

.card {
  background: @card-bg;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px @shadow;
  border: 1px solid @border;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(149, 157, 165, 0.2);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    color: @primary;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid @border;

    h2 {
      font-size: 1.6rem;
      margin: 0;
    }

    i {
      font-size: 1.5rem;
    }
  }
}

.definition {
  background: rgba(@primary, 0.05);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 3px solid @primary;
}

.key-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
  margin: 20px 0;

  .feature {
    display: flex;
    gap: 15px;
    padding: 15px;
    background: rgba(@primary, 0.05);
    border-radius: 8px;

    .icon {
      width: 50px;
      height: 50px;
      background: rgba(@primary, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 1.5rem;
        color: @primary;
      }
    }

    .content {
      flex: 1;

      h3 {
        margin: 0 0 5px 0;
        color: @text;
      }

      p {
        margin: 0;
        color: @text-light;
        font-size: 0.95rem;
      }
    }
  }
}

.performance-chart {
  margin-top: 30px;

  .chart-bars {
    display: flex;
    align-items: flex-end;
    gap: 60px;
    height: 200px;
    border-bottom: 2px solid @border;
    padding: 0 20px 20px;
    justify-content: center;

    .chart-bar {
      width: 80px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      &.vue2 {
        background: linear-gradient(to top, #42b983, #35a074);
      }

      &.vue3 {
        background: linear-gradient(to top, #41b883, #34a073);
      }

      .bar-label {
        position: absolute;
        top: -30px;
        font-weight: 600;
        width: 100%;
        text-align: center;
      }

      .bar-value {
        position: absolute;
        bottom: -30px;
        font-weight: 600;
        width: 100%;
        text-align: center;
      }
    }
  }

  .chart-title {
    text-align: center;
    margin-top: 15px;
    font-weight: 600;
    color: @text;
  }
}

.process-steps {
  margin: 25px 0;

  .step {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed @border;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .step-number {
      width: 30px;
      height: 30px;
      background: @primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
    }

    .step-content {
      flex: 1;

      h3 {
        margin: 0 0 8px 0;
        color: @text;
      }

      p {
        margin: 0;
        color: @text-light;
      }
    }
  }
}

.visualization {
  margin-top: 30px;

  .block-tree {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    .block {
      border: 2px solid @primary;
      border-radius: 8px;
      padding: 20px;
      max-width: 400px;

      .block-header {
        background: @primary;
        color: white;
        padding: 8px;
        text-align: center;
        border-radius: 4px;
        margin-bottom: 15px;
        font-weight: 600;
      }

      .static-nodes,
      .dynamic-block {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 15px;
      }

      .dynamic-block {
        border: 1px dashed @primary;
        border-radius: 8px;
        padding: 15px;

        .block-header {
          background: lighten(@primary, 10%);
        }
      }
    }
  }

  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .vue2-diff,
    .vue3-diff {
      border-radius: 8px;
      padding: 20px;

      h4 {
        margin-top: 0;
        color: @text;
      }
    }

    .vue2-diff {
      background: rgba(#42b983, 0.05);
      border: 1px solid rgba(#42b983, 0.3);
    }

    .vue3-diff {
      background: rgba(#41b883, 0.05);
      border: 1px solid rgba(#41b883, 0.3);
    }

    .process {
      .step {
        margin-bottom: 10px;
        padding: 10px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 4px;
      }
    }
  }
}

.code-block {
  background: #2b2d42;
  color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 20px 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.code-explanation {
  margin-top: 30px;

  h3 {
    color: @primary;
    margin-bottom: 20px;
  }

  .explanation-points {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .point {
      display: flex;
      gap: 15px;
      padding: 15px;
      background: rgba(@primary, 0.05);
      border-radius: 8px;

      .point-number {
        width: 40px;
        height: 40px;
        background: @primary;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
      }

      .point-content {
        flex: 1;

        h4 {
          margin: 0 0 8px 0;
          color: @text;
        }

        p {
          margin: 0;
          color: @text-light;
        }
      }
    }
  }
}

.performance-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;

  .comparison-item {
    display: flex;
    gap: 20px;
    padding: 20px;
    background: rgba(@primary, 0.05);
    border-radius: 8px;

    .metric {
      min-width: 100px;
      text-align: center;

      .metric-value {
        font-size: 2.5rem;
        font-weight: 700;
        color: @primary;
      }

      .metric-label {
        font-weight: 600;
      }
    }

    .description {
      flex: 1;
      display: flex;
      align-items: center;
    }
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;

  .case {
    display: flex;
    gap: 15px;
    padding: 20px;
    background: rgba(@primary, 0.05);
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .case-icon {
      width: 50px;
      height: 50px;
      background: @primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .case-content {
      flex: 1;

      h4 {
        margin: 0 0 8px 0;
        color: @text;
      }

      p {
        margin: 0;
        color: @text-light;
        font-size: 0.95rem;
      }
    }
  }
}

.optimization-tips {
  border-top: 1px solid @border;
  padding-top: 20px;
  margin-top: 20px;

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 12px;
      position: relative;
      padding-left: 25px;

      &::before {
        content: "•";
        color: @primary;
        font-weight: bold;
        position: absolute;
        left: 10px;
        font-size: 1.2rem;
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: @text-light;
  font-size: 0.9rem;
  border-top: 1px solid @border;
}
</style>
