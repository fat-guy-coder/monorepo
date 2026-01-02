<template>
  <div class="btree-container">
    <header class="page-header">
      <h1>B树与B+树详解</h1>
      <p class="subtitle">数据库索引的核心数据结构</p>
    </header>

    <div class="intro-section">
      <p>B树和B+树是专门为磁盘存储设计的多路平衡搜索树，广泛应用于数据库和文件系统中。它们通过减少磁盘I/O次数来优化大规模数据访问性能。</p>
    </div>

    <div class="navigation-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['nav-tab', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        {{ tab.label }}
      </button>
    </div>

    <div class="content-area">
      <!-- B树内容 -->
      <section v-if="activeTab === 'btree'" class="tree-section">
        <div class="section-header">
          <h2>B树 (B-Tree)</h2>
          <div class="complexity-tag">
            <span>高度: O(logₘn)</span>
            <span>操作: O(log n)</span>
          </div>
        </div>

        <div class="content-grid">
          <div class="description-content">
            <div class="concept-box">
              <h3>基本概念</h3>
              <p>B树是一种自平衡的多路搜索树，每个节点可以包含多个键和多个子节点指针。B树保持所有叶子节点在同一层级，确保稳定的查询性能。</p>
            </div>

            <div class="features-list">
              <h3>结构特点</h3>
              <div class="features-grid">
                <div class="feature-item">
                  <div class="feature-icon">🌳</div>
                  <h4>多路平衡</h4>
                  <p>每个节点最多有m个子节点，保持树的平衡</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">📊</div>
                  <h4>节点填充</h4>
                  <p>除根节点外，每个节点至少有⌈m/2⌉-1个键</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🔄</div>
                  <h4>自平衡</h4>
                  <p>通过分裂和合并操作自动维持平衡</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">💾</div>
                  <h4>磁盘优化</h4>
                  <p>节点大小通常设置为磁盘页大小</p>
                </div>
              </div>
            </div>

            <div class="visualization">
              <h3>B树结构示例</h3>
              <div class="tree-diagram">
                <div class="tree-level level-0">
                  <div class="node btree-node">
                    <div class="node-type">内部节点</div>
                    <div class="keys">
                      <span class="key">30</span>
                      <span class="key">60</span>
                    </div>
                  </div>
                </div>
                <div class="tree-level level-1">
                  <div class="node btree-node">
                    <div class="keys">
                      <span class="key">10</span>
                      <span class="key">20</span>
                    </div>
                  </div>
                  <div class="node btree-node">
                    <div class="keys">
                      <span class="key">40</span>
                      <span class="key">50</span>
                    </div>
                  </div>
                  <div class="node btree-node">
                    <div class="keys">
                      <span class="key">70</span>
                      <span class="key">80</span>
                      <span class="key">90</span>
                    </div>
                  </div>
                </div>
                <div class="tree-level level-2">
                  <div class="node leaf-node">
                    <div class="node-type">叶子节点</div>
                    <div class="keys">
                      <span class="key">5</span>
                      <span class="key">8</span>
                    </div>
                  </div>
                  <div class="node leaf-node">
                    <div class="keys">
                      <span class="key">15</span>
                      <span class="key">18</span>
                    </div>
                  </div>
                  <div class="node leaf-node">
                    <div class="keys">
                      <span class="key">25</span>
                      <span class="key">28</span>
                    </div>
                  </div>
                  <div class="node leaf-node">
                    <div class="keys">
                      <span class="key">35</span>
                      <span class="key">38</span>
                    </div>
                  </div>
                  <div class="node leaf-node">
                    <div class="keys">
                      <span class="key">45</span>
                      <span class="key">48</span>
                    </div>
                  </div>
                  <div class="node leaf-node">
                    <div class="keys">
                      <span class="key">55</span>
                      <span class="key">58</span>
                    </div>
                  </div>
                  <div class="node leaf-node">
                    <div class="keys">
                      <span class="key">65</span>
                      <span class="key">68</span>
                    </div>
                  </div>
                  <div class="node leaf-node">
                    <div class="keys">
                      <span class="key">75</span>
                      <span class="key">78</span>
                    </div>
                  </div>
                  <div class="node leaf-node">
                    <div class="keys">
                      <span class="key">85</span>
                      <span class="key">88</span>
                    </div>
                  </div>
                  <div class="node leaf-node">
                    <div class="keys">
                      <span class="key">95</span>
                      <span class="key">98</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="technical-content">
            <div class="pros-cons">
              <div class="pros">
                <h3>B树优点 ✅</h3>
                <div class="advantage-list">
                  <div class="advantage-item">
                    <h4>高效随机访问</h4>
                    <p>数据和索引存储在一起，单次查询可能找到数据</p>
                  </div>
                  <div class="advantage-item">
                    <h4>适合点查询</h4>
                    <p>等值查询性能优秀，深度可控</p>
                  </div>
                  <div class="advantage-item">
                    <h4>平衡性好</h4>
                    <p>所有叶子节点在同一层级，查询稳定</p>
                  </div>
                </div>
              </div>

              <div class="cons">
                <h3>B树缺点 ❌</h3>
                <div class="disadvantage-list">
                  <div class="disadvantage-item">
                    <h4>范围查询效率低</h4>
                    <p>需要遍历多个节点才能获取范围数据</p>
                  </div>
                  <div class="disadvantage-item">
                    <h4>内存占用大</h4>
                    <p>内部节点也存储数据，占用更多空间</p>
                  </div>
                  <div class="disadvantage-item">
                    <h4>实现复杂</h4>
                    <p>分裂和合并操作需要考虑数据位置</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="use-cases">
              <h3>使用场景</h3>
              <div class="use-case-grid">
                <div class="use-case-item">
                  <h4>文件系统</h4>
                  <p>ext3、ReiserFS等文件系统使用B树管理元数据</p>
                </div>
                <div class="use-case-item">
                  <h4>数据库索引</h4>
                  <p>某些数据库系统使用B树作为主要索引结构</p>
                </div>
                <div class="use-case-item">
                  <h4>内存数据库</h4>
                  <p>Redis等内存数据库使用B树变种</p>
                </div>
              </div>
            </div>

            <div class="algorithm-code">
              <h3>B树插入算法</h3>
              <pre><code>function BTreeInsert(tree, key, value) {
  const root = tree.root;

  // 如果根节点已满，需要分裂
  if (root.keyCount === tree.order - 1) {
    const newRoot = new BTreeNode();
    newRoot.isLeaf = false;
    newRoot.children[0] = root;
    tree.root = newRoot;
    splitChild(newRoot, 0, root);
  }

  insertNonFull(tree.root, key, value);
}

function insertNonFull(node, key, value) {
  if (node.isLeaf) {
    // 在叶子节点中插入
    let i = node.keyCount - 1;
    while (i >= 0 && key < node.keys[i]) {
      node.keys[i + 1] = node.keys[i];
      node.values[i + 1] = node.values[i];
      i--;
    }
    node.keys[i + 1] = key;
    node.values[i + 1] = value;
    node.keyCount++;
  } else {
    // 找到合适的子节点
    let i = node.keyCount - 1;
    while (i >= 0 && key < node.keys[i]) {
      i--;
    }
    i++;

    // 如果子节点已满，先分裂
    if (node.children[i].keyCount === tree.order - 1) {
      splitChild(node, i, node.children[i]);
      if (key > node.keys[i]) {
        i++;
      }
    }

    insertNonFull(node.children[i], key, value);
  }
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- B+树内容 -->
      <section v-if="activeTab === 'bplustree'" class="tree-section">
        <div class="section-header">
          <h2>B+树 (B+ Tree)</h2>
          <div class="complexity-tag">
            <span>高度: O(logₘn)</span>
            <span>范围查询: 高效</span>
          </div>
        </div>

        <div class="content-grid">
          <div class="description-content">
            <div class="concept-box">
              <h3>基本概念</h3>
              <p>B+树是B树的变种，所有数据都存储在叶子节点中，内部节点只存储键值用于索引。叶子节点通过指针连接形成有序链表，支持高效的范围查询。</p>
            </div>

            <div class="features-list">
              <h3>结构特点</h3>
              <div class="features-grid">
                <div class="feature-item">
                  <div class="feature-icon">🍃</div>
                  <h4>数据在叶子</h4>
                  <p>所有实际数据都存储在叶子节点中</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🔗</div>
                  <h4>叶子链表</h4>
                  <p>叶子节点通过指针连接成有序链表</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🎯</div>
                  <h4>纯索引节点</h4>
                  <p>内部节点只包含键值和子节点指针</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🚀</div>
                  <h4>范围查询优化</h4>
                  <p>通过叶子链表支持高效的范围扫描</p>
                </div>
              </div>
            </div>

            <div class="visualization">
              <h3>B+树结构示例</h3>
              <div class="tree-diagram bplus-tree">
                <div class="tree-level level-0">
                  <div class="node internal-node">
                    <div class="node-type">内部节点(索引)</div>
                    <div class="keys">
                      <span class="key">30</span>
                      <span class="key">60</span>
                    </div>
                    <div class="pointers">
                      <span>→ 左子树</span>
                      <span>→ 中间子树</span>
                      <span>→ 右子树</span>
                    </div>
                  </div>
                </div>
                <div class="tree-level level-1">
                  <div class="node internal-node">
                    <div class="keys">
                      <span class="key">10</span>
                      <span class="key">20</span>
                    </div>
                  </div>
                  <div class="node internal-node">
                    <div class="keys">
                      <span class="key">40</span>
                      <span class="key">50</span>
                    </div>
                  </div>
                  <div class="node internal-node">
                    <div class="keys">
                      <span class="key">70</span>
                      <span class="key">80</span>
                    </div>
                  </div>
                </div>
                <div class="tree-level level-2">
                  <div class="leaf-chain">
                    <div class="node leaf-node">
                      <div class="node-type">叶子节点(数据)</div>
                      <div class="keys">
                        <span class="key">5</span>
                        <span class="key">8</span>
                      </div>
                      <div class="data">Data...</div>
                      <div class="next-pointer">→</div>
                    </div>
                    <div class="node leaf-node">
                      <div class="keys">
                        <span class="key">15</span>
                        <span class="key">18</span>
                      </div>
                      <div class="data">Data...</div>
                      <div class="next-pointer">→</div>
                    </div>
                    <div class="node leaf-node">
                      <div class="keys">
                        <span class="key">25</span>
                        <span class="key">28</span>
                      </div>
                      <div class="data">Data...</div>
                      <div class="next-pointer">→</div>
                    </div>
                    <div class="node leaf-node">
                      <div class="keys">
                        <span class="key">35</span>
                        <span class="key">38</span>
                      </div>
                      <div class="data">Data...</div>
                      <div class="next-pointer">→</div>
                    </div>
                    <div class="node leaf-node">
                      <div class="keys">
                        <span class="key">45</span>
                        <span class="key">48</span>
                      </div>
                      <div class="data">Data...</div>
                      <div class="next-pointer">→</div>
                    </div>
                    <div class="node leaf-node">
                      <div class="keys">
                        <span class="key">55</span>
                        <span class="key">58</span>
                      </div>
                      <div class="data">Data...</div>
                      <div class="next-pointer">→</div>
                    </div>
                    <div class="node leaf-node">
                      <div class="keys">
                        <span class="key">65</span>
                        <span class="key">68</span>
                      </div>
                      <div class="data">Data...</div>
                      <div class="next-pointer">→</div>
                    </div>
                    <div class="node leaf-node">
                      <div class="keys">
                        <span class="key">75</span>
                        <span class="key">78</span>
                      </div>
                      <div class="data">Data...</div>
                      <div class="next-pointer">→</div>
                    </div>
                    <div class="node leaf-node">
                      <div class="keys">
                        <span class="key">85</span>
                        <span class="key">88</span>
                      </div>
                      <div class="data">Data...</div>
                      <div class="next-pointer">→</div>
                    </div>
                    <div class="node leaf-node">
                      <div class="keys">
                        <span class="key">95</span>
                        <span class="key">98</span>
                      </div>
                      <div class="data">Data...</div>
                      <div class="next-pointer">→</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="technical-content">
            <div class="pros-cons">
              <div class="pros">
                <h3>B+树优点 ✅</h3>
                <div class="advantage-list">
                  <div class="advantage-item">
                    <h4>高效范围查询</h4>
                    <p>叶子节点链表支持顺序扫描</p>
                  </div>
                  <div class="advantage-item">
                    <h4>更高扇出</h4>
                    <p>内部节点不存数据，可以容纳更多键</p>
                  </div>
                  <div class="advantage-item">
                    <h4>缓存友好</h4>
                    <p>内部节点可以完全缓存在内存中</p>
                  </div>
                  <div class="advantage-item">
                    <h4>全表扫描高效</h4>
                    <p>遍历叶子链表即可扫描所有数据</p>
                  </div>
                </div>
              </div>

              <div class="cons">
                <h3>B+树缺点 ❌</h3>
                <div class="disadvantage-list">
                  <div class="disadvantage-item">
                    <h4>点查询稍慢</h4>
                    <p>必须访问叶子节点才能获取数据</p>
                  </div>
                  <div class="disadvantage-item">
                    <h4>实现复杂</h4>
                    <p>需要维护叶子节点链表</p>
                  </div>
                  <div class="disadvantage-item">
                    <h4>空间开销</h4>
                    <p>需要额外的指针维护链表</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="use-cases">
              <h3>使用场景</h3>
              <div class="use-case-grid">
                <div class="use-case-item">
                  <h4>数据库索引</h4>
                  <p>MySQL、Oracle等主流数据库使用B+树</p>
                </div>
                <div class="use-case-item">
                  <h4>文件系统</h4>
                  <p>NTFS、XFS等现代文件系统使用B+树</p>
                </div>
                <div class="use-case-item">
                  <h4>大数据存储</h4>
                  <p>HBase、Cassandra等使用B+树变种</p>
                </div>
              </div>
            </div>

            <div class="algorithm-code">
              <h3>B+树范围查询</h3>
              <pre><code>function BPlusTreeRangeQuery(tree, startKey, endKey) {
  const results = [];

  // 找到起始键所在的叶子节点
  let currentNode = findLeaf(tree.root, startKey);

  while (currentNode !== null) {
    // 在当前节点中查找范围内的键
    for (let i = 0; i < currentNode.keyCount; i++) {
      const key = currentNode.keys[i];

      // 如果键在范围内，添加到结果
      if (key >= startKey && key <= endKey) {
        results.push({
          key: key,
          value: currentNode.values[i]
        });
      }

      // 如果超过范围，提前结束
      if (key > endKey) {
        return results;
      }
    }

    // 移动到下一个叶子节点
    currentNode = currentNode.next;
  }

  return results;
}

function findLeaf(node, key) {
  // 递归查找包含指定键的叶子节点
  while (!node.isLeaf) {
    let i = 0;
    while (i < node.keyCount && key >= node.keys[i]) {
      i++;
    }
    node = node.children[i];
  }
  return node;
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 对比内容 -->
      <section v-if="activeTab === 'comparison'" class="tree-section">
        <div class="section-header">
          <h2>B树 vs B+树对比</h2>
          <div class="section-tag">全面分析</div>
        </div>

        <div class="comparison-content">
          <div class="comparison-table">
            <div class="comparison-header">
              <div class="aspect">对比维度</div>
              <div class="btree-col">B树</div>
              <div class="bplus-col">B+树</div>
            </div>

            <div class="comparison-row">
              <div class="aspect">数据存储位置</div>
              <div class="btree-col">内部节点和叶子节点都存储数据</div>
              <div class="bplus-col">只有叶子节点存储数据</div>
            </div>

            <div class="comparison-row">
              <div class="aspect">叶子节点连接</div>
              <div class="btree-col">叶子节点之间没有连接</div>
              <div class="bplus-col">叶子节点通过指针连接成链表</div>
            </div>

            <div class="comparison-row">
              <div class="aspect">等值查询性能</div>
              <div class="btree-col">优秀（可能提前找到数据）</div>
              <div class="bplus-col">良好（必须到达叶子节点）</div>
            </div>

            <div class="comparison-row">
              <div class="aspect">范围查询性能</div>
              <div class="btree-col">较差（需要回溯）</div>
              <div class="bplus-col">优秀（顺序扫描叶子链表）</div>
            </div>

            <div class="comparison-row">
              <div class="aspect">内存利用率</div>
              <div class="btree-col">较低（内部节点存储数据）</div>
              <div class="bplus-col">较高（内部节点只存键）</div>
            </div>

            <div class="comparison-row">
              <div class="aspect">适用场景</div>
              <div class="btree-col">文件系统、点查询为主</div>
              <div class="bplus-col">数据库、范围查询为主</div>
            </div>
          </div>

          <div class="selection-guide">
            <h3>选择指南</h3>
            <div class="guide-grid">
              <div class="guide-item">
                <h4>选择B树的情况</h4>
                <ul>
                  <li>主要进行点查询（等值查询）</li>
                  <li>数据量相对较小</li>
                  <li>内存充足，可以缓存整个索引</li>
                  <li>文件系统元数据管理</li>
                </ul>
              </div>

              <div class="guide-item">
                <h4>选择B+树的情况</h4>
                <ul>
                  <li>需要高效的范围查询</li>
                  <li>数据量非常大</li>
                  <li>内存有限，需要高扇出</li>
                  <li>数据库索引场景</li>
                  <li>需要全表扫描</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="performance-chart">
            <h3>性能特征对比</h3>
            <div class="chart-container">
              <div class="chart">
                <div class="chart-title">查询性能对比</div>
                <div class="bars">
                  <div class="bar-group">
                    <div class="bar-label">点查询</div>
                    <div class="bar btree-bar" style="width: 90%">B树: 优秀</div>
                    <div class="bar bplus-bar" style="width: 85%">B+树: 良好</div>
                  </div>
                  <div class="bar-group">
                    <div class="bar-label">范围查询</div>
                    <div class="bar btree-bar" style="width: 60%">B树: 一般</div>
                    <div class="bar bplus-bar" style="width: 95%">B+树: 优秀</div>
                  </div>
                  <div class="bar-group">
                    <div class="bar-label">内存效率</div>
                    <div class="bar btree-bar" style="width: 70%">B树: 良好</div>
                    <div class="bar bplus-bar" style="width: 90%">B+树: 优秀</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('btree');

const tabs = [
  { id: 'btree', label: 'B树详解', icon: '🌳' },
  { id: 'bplustree', label: 'B+树详解', icon: '🍃' },
  { id: 'comparison', label: '对比分析', icon: '⚖️' }
];
</script>

<style lang="less" scoped>
.btree-container {
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

.navigation-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.nav-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.2rem 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    border-color: #cbd5e1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.active {
    background: white;
    border-color: #6366f1;
    color: #6366f1;
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.12);
    transform: translateY(-2px);
  }

  .tab-icon {
    font-size: 1.4rem;
  }
}

.tree-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);

  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }
}

.complexity-tag {
  display: flex;
  gap: 1rem;

  span {
    background: rgba(255, 255, 255, 0.9);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #475569;
    border: 1px solid #cbd5e1;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.concept-box {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #64748b;
  margin-bottom: 2rem;

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 1rem;
  }

  p {
    color: #475569;
    line-height: 1.6;
    margin: 0;
  }
}

.features-list {
  margin-bottom: 2rem;

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 1.5rem;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.feature-item {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  .feature-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
    line-height: 1.5;
    margin: 0;
    font-size: 0.95rem;
  }
}

.visualization {
  margin-top: 2rem;

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 1.5rem;
  }
}

.tree-diagram {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;

  &.bplus-tree {
    .leaf-chain {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }
  }
}

.tree-level {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.node {
  padding: 1rem;
  border: 2px solid;
  border-radius: 8px;
  background: white;
  min-width: 120px;
  text-align: center;

  &.btree-node {
    border-color: #3b82f6;
    background: #dbeafe;
  }

  &.internal-node {
    border-color: #f59e0b;
    background: #fef3c7;
  }

  &.leaf-node {
    border-color: #10b981;
    background: #d1fae5;
  }
}

.node-type {
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.keys {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.key {
  padding: 0.5rem 0.8rem;
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-weight: 600;
  color: #374151;
  font-family: 'Fira Code', monospace;
}

.data {
  font-size: 0.8rem;
  color: #64748b;
  font-style: italic;
}

.next-pointer {
  color: #6366f1;
  font-weight: bold;
  margin-top: 0.5rem;
}

.pointers {
  font-size: 0.8rem;
  color: #64748b;
}

// 优缺点样式
.pros-cons {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
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

.use-cases {
  margin-bottom: 2rem;

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 1.5rem;
  }
}

.use-case-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.use-case-item {
  background: white;
  padding: 1.2rem;
  border-radius: 8px;
  border-left: 4px solid #6366f1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  h4 {
    font-size: 1.1rem;
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

.algorithm-code {
  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 1rem;
  }
}

pre {
  background: #1e293b;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;

  code {
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 0.85rem;
    color: #e2e8f0;
    line-height: 1.5;
  }
}

// 对比页面样式
.comparison-content {
  padding: 2rem;
}

.comparison-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.comparison-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: #475569;
  color: white;
  font-weight: 600;

  div {
    padding: 1.5rem;
    text-align: center;
  }
}

.comparison-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }

  div {
    padding: 1.5rem;
    display: flex;
    align-items: center;
  }

  .aspect {
    font-weight: 600;
    color: #374151;
    background: #f8fafc;
  }

  .btree-col {
    border-right: 1px solid #e2e8f0;
    color: #3b82f6;
  }

  .bplus-col {
    color: #10b981;
  }
}

.selection-guide {
  margin-bottom: 2rem;

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 1.5rem;
  }
}

.guide-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.guide-item {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1rem;
  }

  ul {
    color: #64748b;
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }
  }
}

.performance-chart {
  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 1.5rem;
  }
}

.chart-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.chart {
  .chart-title {
    font-weight: 600;
    color: #475569;
    margin-bottom: 1.5rem;
    text-align: center;
  }
}

.bar-group {
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.bar-label {
  font-weight: 500;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.bar {
  height: 30px;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
  transition: width 0.5s ease;

  &.btree-bar {
    background: linear-gradient(135deg, #3b82f6, #6366f1);
  }

  &.bplus-bar {
    background: linear-gradient(135deg, #10b981, #059669);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .btree-container {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 2.2rem;
  }

  .content-grid {
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .tree-level {
    flex-direction: column;
    align-items: center;
  }

  .comparison-header,
  .comparison-row {
    grid-template-columns: 1fr;

    .btree-col {
      border-right: none;
      border-bottom: 1px solid #e2e8f0;
    }
  }

  .guide-grid {
    grid-template-columns: 1fr;
  }
}
</style>
