<template>
  <div class="two-three-tree-container">
    <header class="page-header">
      <h1>2-3树详解</h1>
      <p class="subtitle">平衡搜索树的重要成员</p>
    </header>

    <div class="intro-section">
      <p>2-3树是一种自平衡的搜索树数据结构，其中每个节点可以包含1个或2个键值，并有2个或3个子节点。它保持了完美的平衡性，确保所有叶子节点都在同一层级。</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">O(log n)</div>
        <div class="stat-label">操作复杂度</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">完美平衡</div>
        <div class="stat-label">所有叶子同层</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">2种节点</div>
        <div class="stat-label">2-节点和3-节点</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">自平衡</div>
        <div class="stat-label">节点分裂合并</div>
      </div>
    </div>

    <div class="content-layout">
      <!-- 左侧内容区域 -->
      <div class="main-content">
        <!-- 结构特点 -->
        <section class="content-section">
          <div class="section-header">
            <h2>结构特点</h2>
            <div class="section-tag">核心概念</div>
          </div>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🌳</div>
              <h3>节点类型</h3>
              <p>2-3树包含两种节点：2-节点（1个键，2个子节点）和3-节点（2个键，3个子节点）。</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">⚖️</div>
              <h3>完美平衡</h3>
              <p>所有叶子节点都在同一层级，树的高度保持最小，确保操作的高效性。</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">🔄</div>
              <h3>自平衡</h3>
              <p>通过节点分裂和合并操作自动维持平衡，无需复杂的旋转操作。</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">📊</div>
              <h3>有序存储</h3>
              <p>所有键值在节点内有序排列，左子树键值小于节点键值，右子树键值大于节点键值。</p>
            </div>
          </div>

          <div class="structure-details">
            <h3>节点结构详解</h3>
            <div class="details-grid">
              <div class="detail-item">
                <h4>2-节点结构</h4>
                <div class="node-visual two-node">
                  <div class="node-header">2-节点</div>
                  <div class="keys-section">
                    <div class="key">K1</div>
                  </div>
                  <div class="children-section">
                    <div class="child left">左子树<br>所有键 &lt; K1</div>
                    <div class="child right">右子树<br>所有键 > K1</div>
                  </div>
                </div>
                <ul>
                  <li>包含1个键值</li>
                  <li>有2个子节点</li>
                  <li>左子树键值小于K1</li>
                  <li>右子树键值大于K1</li>
                </ul>
              </div>

              <div class="detail-item">
                <h4>3-节点结构</h4>
                <div class="node-visual three-node">
                  <div class="node-header">3-节点</div>
                  <div class="keys-section">
                    <div class="key">K1</div>
                    <div class="key">K2</div>
                  </div>
                  <div class="children-section">
                    <div class="child left">左子树<br>所有键 &lt; K1</div>
                    <div class="child middle">中间子树<br>K1 &lt; 所有键 &lt; K2</div>
                    <div class="child right">右子树<br>所有键 > K2</div>
                  </div>
                </div>
                <ul>
                  <li>包含2个键值（K1 &lt; K2）</li>
                  <li>有3个子节点</li>
                  <li>左子树键值小于K1</li>
                  <li>中间子树键值在K1和K2之间</li>
                  <li>右子树键值大于K2</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 操作演示 -->
        <section class="content-section">
          <div class="section-header">
            <h2>操作演示</h2>
            <div class="section-tag">动态过程</div>
          </div>

          <div class="demo-area">
            <div class="demo-controls">
              <div class="control-group">
                <label>操作类型:</label>
                <select v-model="demoOperation" @change="resetDemo">
                  <option value="search">查找</option>
                  <option value="insert">插入</option>
                  <option value="delete">删除</option>
                </select>
              </div>
              <div class="control-group">
                <label>数值:</label>
                <input v-model="demoValue" type="number" placeholder="输入数值">
                <button @click="performDemoOperation" class="demo-btn">执行</button>
                <button @click="resetDemo" class="demo-btn secondary">重置</button>
              </div>
            </div>

            <div class="tree-visualization">
              <div class="tree-container">
                <div class="tree">
                  <div class="tree-level level-0">
                    <div class="node three-node active">
                      <div class="keys">
                        <span class="key">25</span>
                        <span class="key">40</span>
                      </div>
                    </div>
                  </div>
                  <div class="tree-level level-1">
                    <div class="node two-node">
                      <div class="keys">
                        <span class="key">15</span>
                      </div>
                    </div>
                    <div class="node two-node">
                      <div class="keys">
                        <span class="key">30</span>
                      </div>
                    </div>
                    <div class="node two-node">
                      <div class="keys">
                        <span class="key">50</span>
                      </div>
                    </div>
                  </div>
                  <div class="tree-level level-2">
                    <div class="node two-node">
                      <div class="keys">
                        <span class="key">10</span>
                      </div>
                    </div>
                    <div class="node two-node">
                      <div class="keys">
                        <span class="key">20</span>
                      </div>
                    </div>
                    <div class="node two-node">
                      <div class="keys">
                        <span class="key">27</span>
                      </div>
                    </div>
                    <div class="node two-node">
                      <div class="keys">
                        <span class="key">35</span>
                      </div>
                    </div>
                    <div class="node two-node">
                      <div class="keys">
                        <span class="key">45</span>
                      </div>
                    </div>
                    <div class="node two-node">
                      <div class="keys">
                        <span class="key">55</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="demo-status">
              <div v-if="demoStatus" :class="['status-message', demoStatus.type]">
                {{ demoStatus.message }}
              </div>
            </div>

            <div class="operation-steps">
              <h4>操作步骤</h4>
              <div class="steps">
                <div
                  v-for="(step, index) in operationSteps"
                  :key="index"
                  class="step"
                >
                  {{ step }}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 右侧侧边栏 -->
      <div class="sidebar">
        <!-- 优缺点分析 -->
        <section class="sidebar-section">
          <div class="section-header">
            <h2>优缺点分析</h2>
            <div class="section-tag">权衡</div>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <h3>优点 ✅</h3>
              <div class="advantage-list">
                <div class="advantage-item">
                  <h4>完美平衡</h4>
                  <p>所有叶子节点在同一层级，最坏情况性能有保障。</p>
                </div>
                <div class="advantage-item">
                  <h4>简单平衡操作</h4>
                  <p>通过节点分裂和合并维持平衡，比旋转操作更直观。</p>
                </div>
                <div class="advantage-item">
                  <h4>稳定性能</h4>
                  <p>搜索、插入、删除操作的时间复杂度均为O(log n)。</p>
                </div>
                <div class="advantage-item">
                  <h4>教学价值</h4>
                  <p>是理解B树和红黑树等更复杂数据结构的基础。</p>
                </div>
              </div>
            </div>

            <div class="cons">
              <h3>缺点 ❌</h3>
              <div class="disadvantage-list">
                <div class="disadvantage-item">
                  <h4>实现复杂</h4>
                  <p>相比二叉搜索树，2-3树的实现更加复杂。</p>
                </div>
                <div class="disadvantage-item">
                  <h4>空间开销</h4>
                  <p>需要维护额外的指针和键值存储空间。</p>
                </div>
                <div class="disadvantage-item">
                  <h4>常数因子大</h4>
                  <p>虽然渐进复杂度好，但实际常数因子可能较大。</p>
                </div>
                <div class="disadvantage-item">
                  <h4>应用较少</h4>
                  <p>在实际应用中，通常使用B树或红黑树替代。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 复杂度分析 -->
        <section class="sidebar-section">
          <div class="section-header">
            <h2>复杂度分析</h2>
            <div class="section-tag">性能</div>
          </div>

          <div class="complexity-analysis">
            <div class="complexity-table">
              <div class="complexity-row header">
                <div class="op">操作</div>
                <div class="time">时间复杂度</div>
                <div class="space">空间复杂度</div>
              </div>
              <div class="complexity-row">
                <div class="op">搜索</div>
                <div class="time">O(log n)</div>
                <div class="space">O(1)</div>
              </div>
              <div class="complexity-row">
                <div class="op">插入</div>
                <div class="time">O(log n)</div>
                <div class="space">O(1)</div>
              </div>
              <div class="complexity-row">
                <div class="op">删除</div>
                <div class="time">O(log n)</div>
                <div class="space">O(1)</div>
              </div>
            </div>

            <div class="complexity-notes">
              <h4>关键特性：</h4>
              <ul>
                <li>树的高度约为 log₂(n) 到 log₃(n)</li>
                <li>所有操作的最坏情况都是O(log n)</li>
                <li>空间复杂度为O(n)</li>
                <li>适合内存和外部存储</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 使用场景 -->
        <section class="sidebar-section">
          <div class="section-header">
            <h2>使用场景</h2>
            <div class="section-tag">应用领域</div>
          </div>

          <div class="use-cases">
            <div class="use-case-item">
              <div class="use-case-icon">🗄️</div>
              <div class="use-case-content">
                <h4>文件系统</h4>
                <p>用于组织和索引大量文件，提供高效的文件查找和检索能力。</p>
              </div>
            </div>

            <div class="use-case-item">
              <div class="use-case-icon">🎯</div>
              <div class="use-case-content">
                <h4>数据库索引</h4>
                <p>作为B树的前身，2-3树为现代数据库索引技术奠定了基础。</p>
              </div>
            </div>

            <div class="use-case-item">
              <div class="use-case-icon">📚</div>
              <div class="use-case-content">
                <h4>内存数据结构</h4>
                <p>在内存受限的环境中作为平衡搜索树的替代方案。</p>
              </div>
            </div>

            <div class="use-case-item">
              <div class="use-case-icon">🔍</div>
              <div class="use-case-content">
                <h4>符号表实现</h4>
                <p>用于编译器、解释器中的符号表管理，支持快速符号查找。</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 相关算法 -->
        <section class="sidebar-section">
          <div class="section-header">
            <h2>相关算法</h2>
            <div class="section-tag">扩展</div>
          </div>

          <div class="related-algorithms">
            <div class="algorithm-item">
              <h4>B树</h4>
              <p>2-3树的泛化，允许更多键值和子节点，适合磁盘存储。</p>
            </div>
            <div class="algorithm-item">
              <h4>红黑树</h4>
              <p>可以看作是2-3树的二进制表示，使用颜色标记替代节点类型。</p>
            </div>
            <div class="algorithm-item">
              <h4>B+树</h4>
              <p>B树的变种，所有数据存储在叶子节点，适合数据库索引。</p>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- 基本操作 -->
    <section class="operations-section">
      <div class="section-header">
        <h2>基本操作</h2>
        <div class="section-tag">算法细节</div>
      </div>

      <div class="operations-grid">
        <div class="operation-card">
          <h3>查找操作</h3>
          <div class="operation-steps">
            <div class="step">
              <div class="step-number">1</div>
              <p>从根节点开始搜索</p>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <p>在当前节点中比较目标键值</p>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <p>根据比较结果选择适当的子节点</p>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <p>重复直到找到目标或到达叶子节点</p>
            </div>
          </div>
          <div class="operation-code">
            <pre><code>function search(node, key) {
  while (node !== null) {
    if (node.isLeaf()) {
      return node.contains(key) ? node : null;
    }
    if (node.is2Node()) {
      if (key < node.key1) {
        node = node.left;
      } else if (key > node.key1) {
        node = node.right;
      } else {
        return node;
      }
    } else { // 3-node
      if (key < node.key1) {
        node = node.left;
      } else if (key > node.key2) {
        node = node.right;
      } else if (key > node.key1 && key < node.key2) {
        node = node.middle;
      } else {
        return node;
      }
    }
  }
  return null;
}</code></pre>
          </div>
        </div>

        <div class="operation-card">
          <h3>插入操作</h3>
          <div class="operation-steps">
            <div class="step">
              <div class="step-number">1</div>
              <p>搜索要插入的位置</p>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <p>如果节点是2-节点，直接插入</p>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <p>如果节点是3-节点，临时变成4-节点</p>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <p>将4-节点分裂成两个2-节点</p>
            </div>
            <div class="step">
              <div class="step-number">5</div>
              <p>将中间键值提升到父节点</p>
            </div>
          </div>
          <div class="operation-code">
            <pre><code>function insert(node, key) {
  if (node.isLeaf()) {
    if (node.is2Node()) {
      node.addKey(key); // 变成3-node
    } else {
      // 临时4-node，需要分裂
      const tempNode = node.addKey(key);
      return split(tempNode);
    }
  } else {
    // 递归插入到适当的子树
    const child = findChild(node, key);
    const newChild = insert(child, key);
    if (newChild !== child) {
      // 子节点分裂，需要处理提升的键
      return node.absorbSplit(newChild);
    }
  }
  return node;
}</code></pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 演示相关状态
const demoOperation = ref('search');
const demoValue = ref('');
const demoStatus = ref<{type: string, message: string} | null>(null);
const operationSteps = ref<string[]>([]);

// 重置演示
const resetDemo = () => {
  demoStatus.value = null;
  operationSteps.value = [];
};

// 执行演示操作
const performDemoOperation = () => {
  const value = parseInt(demoValue.value);

  if (isNaN(value)) {
    demoStatus.value = {
      type: 'error',
      message: '请输入有效的数值'
    };
    return;
  }

  resetDemo();

  switch (demoOperation.value) {
    case 'search':
      simulateSearch(value);
      break;
    case 'insert':
      simulateInsert(value);
      break;
    case 'delete':
      simulateDelete(value);
      break;
  }
};

// 模拟搜索操作
const simulateSearch = (value: number) => {
  operationSteps.value = [
    `开始搜索值 ${value}`,
    '从根节点开始 (键值: 25, 40)'
  ];

  // 简化的搜索路径模拟
  if (value < 25) {
    operationSteps.value.push('值小于25，进入左子树 (键值: 15)');

    if (value < 15) {
      operationSteps.value.push('值小于15，进入左子树 (键值: 10)');
    } else if (value > 15) {
      operationSteps.value.push('值大于15，进入右子树 (键值: 20)');
    }
  } else if (value > 40) {
    operationSteps.value.push('值大于40，进入右子树 (键值: 50)');

    if (value < 50) {
      operationSteps.value.push('值小于50，进入左子树 (键值: 45)');
    } else if (value > 50) {
      operationSteps.value.push('值大于50，进入右子树 (键值: 55)');
    }
  } else {
    operationSteps.value.push('值在25和40之间，进入中间子树 (键值: 30)');

    if (value < 30) {
      operationSteps.value.push('值小于30，进入左子树 (键值: 27)');
    } else if (value > 30) {
      operationSteps.value.push('值大于30，进入右子树 (键值: 35)');
    }
  }

  operationSteps.value.push(`搜索完成，找到值 ${value}`);

  demoStatus.value = {
    type: 'success',
    message: `成功找到值 ${value}`
  };
};

// 模拟插入操作
const simulateInsert = (value: number) => {
  operationSteps.value = [
    `开始插入值 ${value}`,
    '搜索插入位置...'
  ];

  // 简化的插入过程
  operationSteps.value.push('找到插入位置');
  operationSteps.value.push('检查节点容量...');

  // 模拟节点分裂
  if (value === 22) {
    operationSteps.value.push('节点需要分裂');
    operationSteps.value.push('创建新的2-节点');
    operationSteps.value.push('将中间键值提升到父节点');
  } else {
    operationSteps.value.push('直接插入到现有节点');
  }

  operationSteps.value.push(`插入完成: 值 ${value}`);

  demoStatus.value = {
    type: 'success',
    message: `成功插入值 ${value}`
  };
};

// 模拟删除操作
const simulateDelete = (value: number) => {
  operationSteps.value = [
    `开始删除值 ${value}`,
    '搜索目标值...'
  ];

  operationSteps.value.push('找到目标节点');
  operationSteps.value.push('检查删除后的平衡性...');
  operationSteps.value.push('执行必要的合并操作');
  operationSteps.value.push(`删除完成: 值 ${value}`);

  demoStatus.value = {
    type: 'success',
    message: `成功删除值 ${value}`
  };
};
</script>

<style lang="less" scoped>
.two-three-tree-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, #2c3e50 0%, #6366f1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.3rem;
    color: #64748b;
    font-weight: 400;
  }
}

.intro-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  color: #475569;
  line-height: 1.7;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.3);

  .stat-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: #6366f1;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: #64748b;
    font-size: 0.9rem;
    font-weight: 500;
  }
}

.content-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.content-section, .sidebar-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }

  .section-tag {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.feature-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid #6366f1;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .feature-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.8rem;
  }

  p {
    color: #64748b;
    line-height: 1.6;
    margin: 0;
  }
}

.structure-details {
  margin-top: 2rem;

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 1.5rem;
  }
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.detail-item {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 1rem;
  }

  ul {
    color: #64748b;
    padding-left: 1.2rem;
    margin-top: 1rem;

    li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }
  }
}

.node-visual {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;

  &.two-node {
    border-color: #3b82f6;
  }

  &.three-node {
    border-color: #10b981;
  }

  .node-header {
    font-weight: 600;
    color: #475569;
    margin-bottom: 1rem;
    text-align: center;
  }

  .keys-section {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;

    .key {
      padding: 0.8rem 1.2rem;
      background: #f1f5f9;
      border: 2px solid #cbd5e1;
      border-radius: 6px;
      font-weight: 600;
      color: #374151;
    }
  }

  .children-section {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;

    .child {
      flex: 1;
      padding: 0.8rem;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      text-align: center;
      font-size: 0.9rem;
      color: #64748b;
    }
  }
}

// 演示区域样式
.demo-area {
  .demo-controls {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;

    .control-group {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      label {
        font-weight: 500;
        color: #475569;
      }

      select, input {
        padding: 0.5rem 1rem;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        background: white;
      }

      .demo-btn {
        padding: 0.5rem 1.5rem;
        background: #6366f1;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
          background: #4f46e5;
        }

        &.secondary {
          background: #64748b;

          &:hover {
            background: #475569;
          }
        }
      }
    }
  }
}

.tree-visualization {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-bottom: 2rem;
  overflow: auto;
}

.tree-container {
  display: flex;
  justify-content: center;
  min-height: 300px;
}

.tree {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tree-level {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  justify-content: center;

  &:last-child {
    margin-bottom: 0;
  }
}

.node {
  padding: 1rem 1.5rem;
  border: 2px solid;
  border-radius: 8px;
  background: white;
  min-width: 120px;
  text-align: center;
  transition: all 0.3s ease;

  &.two-node {
    border-color: #3b82f6;
    background: #dbeafe;
  }

  &.three-node {
    border-color: #10b981;
    background: #d1fae5;
  }

  &.active {
    background: #fef3c7;
    border-color: #f59e0b;
    animation: pulse 1.5s infinite;
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.keys {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.key {
  padding: 0.5rem 0.8rem;
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-weight: 600;
  color: #374151;
}

.demo-status {
  margin-bottom: 1.5rem;

  .status-message {
    padding: 1rem;
    border-radius: 8px;
    font-weight: 500;

    &.success {
      background: #dcfce7;
      color: #166534;
      border-left: 4px solid #22c55e;
    }

    &.error {
      background: #fef2f2;
      color: #dc2626;
      border-left: 4px solid #ef4444;
    }
  }
}

.operation-steps {
  h4 {
    font-weight: 600;
    color: #475569;
    margin-bottom: 1rem;
  }
}

.steps {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  max-height: 200px;
  overflow-y: auto;
}

.step {
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 6px;
  border-left: 4px solid #6366f1;
  font-size: 0.9rem;
  color: #475569;

  &:last-child {
    margin-bottom: 0;
  }
}

// 优缺点样式
.pros-cons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.pros, .cons {
  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }
}

.pros h3 {
  color: #059669;
}

.cons h3 {
  color: #dc2626;
}

.advantage-list, .disadvantage-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.advantage-item, .disadvantage-item {
  background: #f8fafc;
  padding: 1.2rem;
  border-radius: 8px;
  border-left: 4px solid;

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
    line-height: 1.5;
    margin: 0;
    font-size: 0.9rem;
  }
}

.advantage-item {
  border-left-color: #10b981;
}

.disadvantage-item {
  border-left-color: #ef4444;
}

// 复杂度分析
.complexity-analysis {
  .complexity-table {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
  }

  .complexity-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-bottom: 1px solid #e2e8f0;

    &.header {
      background: #475569;
      color: white;
      font-weight: 600;
    }

    &:last-child {
      border-bottom: none;
    }

    div {
      padding: 1rem;
      text-align: center;
    }

    .op {
      font-weight: 600;
      color: #374151;
      text-align: left;
    }
  }
}

.complexity-notes {
  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 0.8rem;
  }

  ul {
    color: #64748b;
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }
  }
}

// 使用场景
.use-cases {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.use-case-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #6366f1;
}

.use-case-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.use-case-content {
  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
    line-height: 1.5;
    margin: 0;
    font-size: 0.9rem;
  }
}

// 相关算法
.related-algorithms {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.algorithm-item {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #6366f1;

  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
    line-height: 1.5;
    margin: 0;
    font-size: 0.9rem;
  }
}

// 操作部分
.operations-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 2rem;
}

.operations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.operation-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1.5rem;
  }
}

.operation-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .step-number {
    background: #6366f1;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 600;
    flex-shrink: 0;
  }

  p {
    color: #475569;
    line-height: 1.5;
    margin: 0;
  }
}

.operation-code {
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 1rem;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.8rem;
      color: #e2e8f0;
      line-height: 1.4;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .two-three-tree-container {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 2.2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .content-layout {
    gap: 1.5rem;
  }

  .content-section, .sidebar-section {
    padding: 1.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .demo-controls {
    flex-direction: column;
    gap: 1rem;

    .control-group {
      width: 100%;
    }
  }

  .tree-level {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .operations-grid {
    grid-template-columns: 1fr;
  }

  .complexity-row {
    grid-template-columns: 1fr;

    &.header {
      display: none;
    }

    div {
      text-align: left;

      &:nth-child(1)::before { content: "操作: "; font-weight: 600; }
      &:nth-child(2)::before { content: "时间复杂度: "; font-weight: 600; }
      &:nth-child(3)::before { content: "空间复杂度: "; font-weight: 600; }
    }
  }
}
</style>
