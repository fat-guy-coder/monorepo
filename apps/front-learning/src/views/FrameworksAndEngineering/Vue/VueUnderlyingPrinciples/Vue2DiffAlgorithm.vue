<template>
  <div class="diff-algorithm-container">
    <!-- 头部标题区域 -->
    <header class="header">
      <h1><i class="fas fa-code-branch"></i> Vue2 Diff算法解析</h1>
      <p class="subtitle">深入理解虚拟DOM的更新机制</p>
    </header>

    <!-- 主内容区域 -->
    <main class="content">
      <!-- 核心概念卡片 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-lightbulb"></i>
          <h2>Diff算法核心概念</h2>
        </div>
        <div class="card-content">
          <div class="definition">
            <p><strong>Diff算法</strong> 是Vue2虚拟DOM的核心，用于比较新旧虚拟DOM树的差异，并最小化DOM操作。</p>
            <p>Vue2的Diff算法基于<strong>同级比较</strong>和<strong>双端比较</strong>策略，在O(n)复杂度内高效完成DOM更新。</p>
          </div>

          <div class="key-features">
            <div class="feature">
              <div class="icon">
                <i class="fas fa-layer-group"></i>
              </div>
              <div class="content">
                <h3>同级比较</h3>
                <p>只比较同一层级的节点，不跨层级比较</p>
              </div>
            </div>
            <div class="feature">
              <div class="icon">
                <i class="fas fa-exchange-alt"></i>
              </div>
              <div class="content">
                <h3>双端比较</h3>
                <p>从新旧节点的两端向中间进行比较</p>
              </div>
            </div>
            <div class="feature">
              <div class="icon">
                <i class="fas fa-key"></i>
              </div>
              <div class="content">
                <h3>Key的重要性</h3>
                <p>使用key标识节点，提高复用率</p>
              </div>
            </div>
          </div>

          <div class="comparison">
            <div class="without-key">
              <h4><i class="fas fa-exclamation-triangle warning"></i> 不使用Key</h4>
              <div class="node-sequence">
                <div class="node old">A</div>
                <div class="node old">B</div>
                <div class="node old">C</div>
                <div class="node old">D</div>
                <div class="arrow">→</div>
                <div class="node new">D</div>
                <div class="node new">A</div>
                <div class="node new">B</div>
                <div class="node new">C</div>
              </div>
              <div class="result">
                <p>3次DOM更新操作</p>
              </div>
            </div>
            <div class="with-key">
              <h4><i class="fas fa-check-circle success"></i> 使用Key</h4>
              <div class="node-sequence">
                <div class="node old key">A</div>
                <div class="node old key">B</div>
                <div class="node old key">C</div>
                <div class="node old key">D</div>
                <div class="arrow">→</div>
                <div class="node new key">D</div>
                <div class="node new key">A</div>
                <div class="node new key">B</div>
                <div class="node new key">C</div>
              </div>
              <div class="result">
                <p>1次DOM移动操作</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 算法原理 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-cogs"></i>
          <h2>Diff算法实现原理</h2>
        </div>
        <div class="card-content">
          <div class="process-steps">
            <h3>双端比较四指针法</h3>
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>创建四个指针</h4>
                <p>旧前(OldStartIdx)、旧后(OldEndIdx)、新前(NewStartIdx)、新后(NewEndIdx)</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>四种比较情形</h4>
                <ul>
                  <li>旧前 vs 新前</li>
                  <li>旧后 vs 新后</li>
                  <li>旧前 vs 新后</li>
                  <li>旧后 vs 新前</li>
                </ul>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>处理剩余节点</h4>
                <p>当指针交叉后，处理剩余的新增或删除节点</p>
              </div>
            </div>
          </div>

          <div class="visualization">
            <div class="node-comparison">
              <div class="old-nodes">
                <div class="node old-start">A</div>
                <div class="node">B</div>
                <div class="node">C</div>
                <div class="node old-end">D</div>
              </div>
              <div class="arrows">
                <i class="fas fa-arrows-alt-h"></i>
              </div>
              <div class="new-nodes">
                <div class="node new-start">D</div>
                <div class="node">C</div>
                <div class="node">E</div>
                <div class="node new-end">A</div>
              </div>
            </div>
            <div class="comparison-steps">
              <div class="step">
                <div class="step-label">第1步</div>
                <div class="step-content">
                  <div class="node old-start">A</div>
                  <i class="fas fa-times not-equal"></i>
                  <div class="node new-start">D</div>
                </div>
              </div>
              <div class="step">
                <div class="step-label">第2步</div>
                <div class="step-content">
                  <div class="node old-end">D</div>
                  <i class="fas fa-times not-equal"></i>
                  <div class="node new-end">A</div>
                </div>
              </div>
              <div class="step">
                <div class="step-label">第3步</div>
                <div class="step-content">
                  <div class="node old-start">A</div>
                  <i class="fas fa-times not-equal"></i>
                  <div class="node new-end">A</div>
                </div>
              </div>
              <div class="step">
                <div class="step-label">第4步</div>
                <div class="step-content">
                  <div class="node old-end">D</div>
                  <i class="fas fa-check equal"></i>
                  <div class="node new-start">D</div>
                </div>
                <div class="step-result">移动节点D到最前面</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 代码实现 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-code"></i>
          <h2>Diff算法实现代码</h2>
        </div>
        <div class="card-content">
          <div class="code-section">
            <pre class="code-block"><code>// Vue2 diff算法核心实现（简化版）
function updateChildren(parentElm, oldCh, newCh) {
  // 初始化指针
  let oldStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let newStartIdx = 0;
  let newEndIdx = newCh.length - 1;

  // 指针指向的节点
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 跳过undefined节点（已处理）
    if (!oldStartVnode) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (!oldEndVnode) {
      oldEndVnode = oldCh[--oldEndIdx];
    }
    // 1. 旧前 vs 新前
    else if (sameVnode(oldStartVnode, newStartVnode)) {
      // 节点相同，执行patch更新
      patchVnode(oldStartVnode, newStartVnode);
      // 移动指针
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    }
    // 2. 旧后 vs 新后
    else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    }
    // 3. 旧前 vs 新后
    else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode);
      // 移动旧前节点到旧后之后
      parentElm.insertBefore(
        oldStartVnode.elm,
        oldEndVnode.elm.nextSibling
      );
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    }
    // 4. 旧后 vs 新前
    else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode);
      // 移动旧后节点到旧前之前
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    }
    // 5. 都不匹配时，使用key查找
    else {
      // 创建旧节点key到index的映射
      if (!oldKeyToIdx) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }
      // 查找新前节点在旧节点中的位置
      idxInOld = oldKeyToIdx[newStartVnode.key];

      if (!idxInOld) {
        // 新增节点
        createElm(newStartVnode, parentElm, oldStartVnode.elm);
      } else {
        // 移动节点
        vnodeToMove = oldCh[idxInOld];
        if (sameVnode(vnodeToMove, newStartVnode)) {
          patchVnode(vnodeToMove, newStartVnode);
          // 标记已处理
          oldCh[idxInOld] = undefined;
          // 移动到旧前之前
          parentElm.insertBefore(vnodeToMove.elm, oldStartVnode.elm);
        } else {
          // key相同但节点不同，创建新节点
          createElm(newStartVnode, parentElm, oldStartVnode.elm);
        }
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }

  // 处理剩余节点
  if (oldStartIdx > oldEndIdx) {
    // 添加新增节点
    addVnodes(parentElm, newCh, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    // 删除多余节点
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
  }
}</code></pre>
          </div>

          <div class="code-explanation">
            <h3>关键函数说明</h3>
            <div class="function">
              <div class="function-name">sameVnode(a, b)</div>
              <div class="function-desc">判断两个节点是否相同（key和标签类型相同）</div>
            </div>
            <div class="function">
              <div class="function-name">patchVnode(oldVnode, newVnode)</div>
              <div class="function-desc">更新节点属性、文本和子节点</div>
            </div>
            <div class="function">
              <div class="function-name">createElm(vnode, parentElm, refElm)</div>
              <div class="function-desc">根据虚拟节点创建真实DOM</div>
            </div>
            <div class="function">
              <div class="function-name">addVnodes(parentElm, vnodes, startIdx, endIdx)</div>
              <div class="function-desc">批量添加新节点</div>
            </div>
            <div class="function">
              <div class="function-name">removeVnodes(parentElm, vnodes, startIdx, endIdx)</div>
              <div class="function-desc">批量删除旧节点</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 性能优化 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-tachometer-alt"></i>
          <h2>Diff算法性能优化</h2>
        </div>
        <div class="card-content">
          <div class="optimization-tips">
            <div class="tip">
              <div class="icon">
                <i class="fas fa-key"></i>
              </div>
              <div class="content">
                <h3>始终使用Key</h3>
                <p>使用唯一且稳定的key标识节点，提高节点复用率</p>
              </div>
            </div>
            <div class="tip">
              <div class="icon">
                <i class="fas fa-project-diagram"></i>
              </div>
              <div class="content">
                <h3>减少层级嵌套</h3>
                <p>避免过深的组件层级，减少Diff遍历深度</p>
              </div>
            </div>
            <div class="tip">
              <div class="icon">
                <i class="fas fa-sitemap"></i>
              </div>
              <div class="content">
                <h3>静态节点提升</h3>
                <p>标记静态节点，避免重复Diff计算</p>
              </div>
            </div>
          </div>

          <div class="performance-table">
            <table>
              <thead>
                <tr>
                  <th>场景</th>
                  <th>无优化</th>
                  <th>使用Key</th>
                  <th>优化率</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>列表反转</td>
                  <td>O(n)</td>
                  <td>O(1)</td>
                  <td>99%</td>
                </tr>
                <tr>
                  <td>中间插入</td>
                  <td>O(n)</td>
                  <td>O(1)</td>
                  <td>99%</td>
                </tr>
                <tr>
                  <td>头部插入</td>
                  <td>O(n)</td>
                  <td>O(n)</td>
                  <td>0%</td>
                </tr>
                <tr>
                  <td>随机重排</td>
                  <td>O(n²)</td>
                  <td>O(n)</td>
                  <td>90%+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="best-practices">
            <h3>最佳实践：</h3>
            <ul>
              <li>为v-for循环的每个元素设置唯一的key</li>
              <li>避免在循环中使用索引作为key（除非列表简单且稳定）</li>
              <li>保持DOM结构稳定，避免不必要的节点类型变化</li>
              <li>对于复杂列表，使用虚拟滚动技术</li>
              <li>合理使用v-show代替v-if减少节点销毁/重建</li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>Vue2 Diff算法解析 | Vue3实现 | 深入理解虚拟DOM更新机制</p>
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
@error: #f44336;
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 25px;

  .without-key,
  .with-key {
    padding: 15px;
    border-radius: 8px;

    h4 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 0;

      .warning {
        color: @warning;
      }

      .success {
        color: #4caf50;
      }
    }
  }

  .without-key {
    background: rgba(@warning, 0.05);
  }

  .with-key {
    background: rgba(@success, 0.05);
  }

  .node-sequence {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 15px 0;
    flex-wrap: wrap;

    .node {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-weight: bold;
      color: white;

      &.old {
        background: @primary;
      }

      &.new {
        background: @secondary;
      }

      &.key {
        border: 2px solid #4caf50;
      }
    }

    .arrow {
      font-size: 1.2rem;
      color: @text-light;
    }
  }

  .result {
    text-align: center;
    font-weight: 500;
    color: @text;
  }
}

.process-steps {
  margin: 25px 0;

  h3 {
    color: @primary;
    text-align: center;
    margin-bottom: 20px;
  }

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

      h4 {
        margin: 0 0 8px 0;
        color: @text;
      }

      ul {
        padding-left: 20px;
        margin: 10px 0;

        li {
          margin-bottom: 5px;
        }
      }
    }
  }
}

.visualization {
  border: 1px solid @border;
  border-radius: 8px;
  padding: 20px;
  margin: 25px 0;
  background: rgba(@primary, 0.03);

  .node-comparison {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    .old-nodes,
    .new-nodes {
      display: flex;
      gap: 15px;

      .node {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        font-weight: bold;
        color: white;
        font-size: 1.2rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

        &.old-start {
          background: @primary;
          border: 2px solid darken(@primary, 10%);
        }

        &.old-end {
          background: @secondary;
          border: 2px solid darken(@secondary, 10%);
        }

        &.new-start {
          background: #4caf50;
          border: 2px solid darken(#4caf50, 10%);
        }

        &.new-end {
          background: #f44336;
          border: 2px solid darken(#f44336, 10%);
        }
      }
    }

    .arrows {
      i {
        font-size: 2rem;
        color: @text-light;
      }
    }
  }

  .comparison-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;

    .step {
      border: 1px solid @border;
      border-radius: 8px;
      padding: 15px;
      background: white;

      .step-label {
        font-weight: 600;
        margin-bottom: 10px;
        color: @primary;
        text-align: center;
      }

      .step-content {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;

        .node {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-weight: bold;
          color: white;

          &.old-start {
            background: @primary;
          }

          &.old-end {
            background: @secondary;
          }

          &.new-start {
            background: #4caf50;
          }

          &.new-end {
            background: #f44336;
          }
        }

        i {
          font-size: 1.5rem;

          &.equal {
            color: #4caf50;
          }

          &.not-equal {
            color: @warning;
          }
        }
      }

      .step-result {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px dashed @border;
        text-align: center;
        font-size: 0.9rem;
        color: @text-light;
      }
    }
  }
}

.code-block {
  background: #f8f9fa;
  color: #2b2d42;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 20px 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;

  code {
    display: block;
    white-space: pre;
  }
}

.code-explanation {
  margin-top: 30px;

  h3 {
    color: @primary;
    margin-bottom: 15px;
  }

  .function {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px dashed @border;

    .function-name {
      font-family: 'Fira Code', monospace;
      font-weight: 600;
      color: @primary;
      margin-bottom: 5px;
    }

    .function-desc {
      color: @text-light;
    }
  }
}

.optimization-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;

  .tip {
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
      flex-shrink: 0;

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

.performance-table {
  width: 100%;
  border-collapse: collapse;
  margin: 30px 0;

  th,
  td {
    padding: 12px 15px;
    text-align: center;
    border: 1px solid @border;
  }

  th {
    background: rgba(@primary, 0.1);
    color: @primary;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background: rgba(@primary, 0.03);
  }

  tr:hover {
    background: rgba(@primary, 0.05);
  }
}

.best-practices {
  border-top: 1px solid @border;
  padding-top: 20px;
  margin-top: 20px;

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 12px;
      padding-left: 10px;
      position: relative;

      &::before {
        content: "—";
        color: @primary;
        position: absolute;
        left: -15px;
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
