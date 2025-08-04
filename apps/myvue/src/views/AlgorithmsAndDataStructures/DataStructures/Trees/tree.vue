<template>
  <div class="tree-introduction">
    <!-- 标题和概述部分 -->
    <header>
      <h1>数据结构：树（Tree）</h1>
      <div class="tree-visualization">
        <div class="tree">
          <div class="node root">Root</div>
          <div class="branch">
            <div class="node">Node A</div>
            <div class="sub-branches">
              <div class="branch">
                <div class="node leaf">Leaf A1</div>
              </div>
              <div class="branch">
                <div class="node leaf">Leaf A2</div>
              </div>
            </div>
          </div>
          <div class="branch">
            <div class="node">Node B</div>
            <div class="sub-branches">
              <div class="branch">
                <div class="node">Node B1</div>
                <div class="sub-branches">
                  <div class="branch">
                    <div class="node leaf">Leaf B1a</div>
                  </div>
                </div>
              </div>
              <div class="branch">
                <div class="node leaf">Leaf B2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="overview">
        树是一种非线性的分层数据结构，由节点和边组成。每个节点有零个或多个子节点，除了根节点外，每个节点都有一个父节点。树结构广泛用于表示具有层级关系的数据。
      </p>
    </header>

    <!-- 树类型介绍部分 -->
    <section class="tree-types">
      <h2>常见树类型介绍</h2>
      <div class="type-cards">
        <!-- 二叉树 -->
        <div class="type-card" :class="{ expanded: activeCard === 0 }">
          <div class="card-header" @click="toggleCard(0)">
            <h3>二叉树 (Binary Tree)</h3>
            <span class="toggle-icon">{{ activeCard === 0 ? '−' : '+' }}</span>
          </div>
          <div class="card-content" v-show="activeCard === 0">
            <div class="properties">
              <div class="property">
                <h4>特点</h4>
                <ul>
                  <li>每个节点最多有两个子节点（左子节点和右子节点）</li>
                  <li>子树有左右之分，顺序不能颠倒</li>
                  <li>空树也是二叉树</li>
                </ul>
              </div>
              <div class="property">
                <h4>优点</h4>
                <ul>
                  <li>结构简单，易于理解和实现</li>
                  <li>支持高效的查找、插入和删除操作</li>
                  <li>是其他高级树结构的基础</li>
                </ul>
              </div>
              <div class="property">
                <h4>相关算法</h4>
                <ul>
                  <li>遍历算法：前序、中序、后序、层序遍历</li>
                  <li>查找算法：深度优先搜索(DFS)、广度优先搜索(BFS)</li>
                  <li>高度/深度计算</li>
                </ul>
              </div>
              <div class="property">
                <h4>使用场景</h4>
                <ul>
                  <li>表达式解析（语法树）</li>
                  <li>文件系统目录结构</li>
                  <li>游戏中的决策树</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 二叉搜索树 -->
        <div class="type-card" :class="{ expanded: activeCard === 1 }">
          <div class="card-header" @click="toggleCard(1)">
            <h3>二叉搜索树 (BST)</h3>
            <span class="toggle-icon">{{ activeCard === 1 ? '−' : '+' }}</span>
          </div>
          <div class="card-content" v-show="activeCard === 1">
            <div class="properties">
              <div class="property">
                <h4>特点</h4>
                <ul>
                  <li>左子树所有节点值小于根节点值</li>
                  <li>右子树所有节点值大于根节点值</li>
                  <li>左右子树也都是二叉搜索树</li>
                </ul>
              </div>
              <div class="property">
                <h4>优点</h4>
                <ul>
                  <li>查找、插入、删除的平均时间复杂度为O(log n)</li>
                  <li>中序遍历可以得到有序序列</li>
                  <li>支持范围查询</li>
                </ul>
              </div>
              <div class="property">
                <h4>相关算法</h4>
                <ul>
                  <li>查找节点</li>
                  <li>插入节点</li>
                  <li>删除节点（三种情况）</li>
                  <li>查找最小/最大值</li>
                </ul>
              </div>
              <div class="property">
                <h4>使用场景</h4>
                <ul>
                  <li>数据库索引</li>
                  <li>字典实现</li>
                  <li>有序数据存储</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- AVL树 -->
        <div class="type-card" :class="{ expanded: activeCard === 2 }">
          <div class="card-header" @click="toggleCard(2)">
            <h3>AVL树</h3>
            <span class="toggle-icon">{{ activeCard === 2 ? '−' : '+' }}</span>
          </div>
          <div class="card-content" v-show="activeCard === 2">
            <div class="properties">
              <div class="property">
                <h4>特点</h4>
                <ul>
                  <li>自平衡二叉搜索树</li>
                  <li>任何节点的两个子树高度差不超过1</li>
                  <li>通过旋转操作保持平衡</li>
                </ul>
              </div>
              <div class="property">
                <h4>优点</h4>
                <ul>
                  <li>严格平衡，保证O(log n)的查找性能</li>
                  <li>适合查找密集型应用</li>
                  <li>避免BST退化为链表</li>
                </ul>
              </div>
              <div class="property">
                <h4>相关算法</h4>
                <ul>
                  <li>平衡因子计算</li>
                  <li>旋转操作：左旋、右旋、左右旋、右左旋</li>
                  <li>插入后的平衡调整</li>
                </ul>
              </div>
              <div class="property">
                <h4>使用场景</h4>
                <ul>
                  <li>需要快速查找的数据库系统</li>
                  <li>内存受限环境中的有序数据结构</li>
                  <li>实时应用程序</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 红黑树 -->
        <div class="type-card" :class="{ expanded: activeCard === 3 }">
          <div class="card-header" @click="toggleCard(3)">
            <h3>红黑树</h3>
            <span class="toggle-icon">{{ activeCard === 3 ? '−' : '+' }}</span>
          </div>
          <div class="card-content" v-show="activeCard === 3">
            <div class="properties">
              <div class="property">
                <h4>特点</h4>
                <ul>
                  <li>自平衡二叉搜索树</li>
                  <li>节点有颜色（红或黑）属性</li>
                  <li>从根到叶子的最长路径不超过最短路径的两倍</li>
                </ul>
              </div>
              <div class="property">
                <h4>优点</h4>
                <ul>
                  <li>插入和删除操作比AVL树更高效</li>
                  <li>查找性能接近AVL树</li>
                  <li>广泛用于工业级应用</li>
                </ul>
              </div>
              <div class="property">
                <h4>相关算法</h4>
                <ul>
                  <li>旋转操作</li>
                  <li>颜色调整</li>
                  <li>插入修复和删除修复</li>
                </ul>
              </div>
              <div class="property">
                <h4>使用场景</h4>
                <ul>
                  <li>Java的TreeMap、TreeSet</li>
                  <li>C++的STL map/set</li>
                  <li>Linux内核的进程调度</li>
                  <li>文件系统</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- B树和B+树 -->
        <div class="type-card" :class="{ expanded: activeCard === 4 }">
          <div class="card-header" @click="toggleCard(4)">
            <h3>B树 / B+树</h3>
            <span class="toggle-icon">{{ activeCard === 4 ? '−' : '+' }}</span>
          </div>
          <div class="card-content" v-show="activeCard === 4">
            <div class="properties">
              <div class="property">
                <h4>特点</h4>
                <ul>
                  <li>多路平衡搜索树</li>
                  <li>每个节点可以有多个子节点（大于2）</li>
                  <li>B+树非叶子节点只存索引，数据全在叶子节点</li>
                  <li>叶子节点形成有序链表</li>
                </ul>
              </div>
              <div class="property">
                <h4>优点</h4>
                <ul>
                  <li>减少磁盘I/O操作</li>
                  <li>适合存储大量数据</li>
                  <li>查询效率稳定</li>
                  <li>B+树范围查询效率更高</li>
                </ul>
              </div>
              <div class="property">
                <h4>相关算法</h4>
                <ul>
                  <li>节点分裂与合并</li>
                  <li>插入和删除的平衡操作</li>
                  <li>范围查询优化</li>
                </ul>
              </div>
              <div class="property">
                <h4>使用场景</h4>
                <ul>
                  <li>数据库索引（MySQL的InnoDB）</li>
                  <li>文件系统（NTFS, ReiserFS）</li>
                  <li>大型数据存储系统</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Trie树 -->
        <div class="type-card" :class="{ expanded: activeCard === 5 }">
          <div class="card-header" @click="toggleCard(5)">
            <h3>Trie树（字典树）</h3>
            <span class="toggle-icon">{{ activeCard === 5 ? '−' : '+' }}</span>
          </div>
          <div class="card-content" v-show="activeCard === 5">
            <div class="properties">
              <div class="property">
                <h4>特点</h4>
                <ul>
                  <li>用于存储关联数组，键通常是字符串</li>
                  <li>节点不存储完整单词，而是存储字符</li>
                  <li>从根节点到某一节点的路径表示一个字符串</li>
                </ul>
              </div>
              <div class="property">
                <h4>优点</h4>
                <ul>
                  <li>前缀查找效率高</li>
                  <li>查找时间复杂度与键长度相关，与数据量无关</li>
                  <li>可以按字典序遍历</li>
                </ul>
              </div>
              <div class="property">
                <h4>相关算法</h4>
                <ul>
                  <li>插入字符串</li>
                  <li>搜索字符串</li>
                  <li>前缀匹配</li>
                  <li>删除字符串</li>
                </ul>
              </div>
              <div class="property">
                <h4>使用场景</h4>
                <ul>
                  <li>自动补全系统</li>
                  <li>拼写检查</li>
                  <li>IP路由选择</li>
                  <li>搜索建议</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <p>树结构是计算机科学中最重要的数据结构之一，理解不同树类型的特点和应用场景对于设计高效算法和系统至关重要。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeCard = ref<number | null>(0);

const toggleCard = (index: number) => {
  if (activeCard.value === index) {
    activeCard.value = null;
  } else {
    activeCard.value = index;
  }
};
</script>

<style scoped lang="less">
@primary-color: #2c6e49;
@secondary-color: #4c956c;
@accent-color: #fefee3;
@background-color: #f9f9f9;
@card-color: #ffffff;
@text-color: #333333;
@border-color: #e0e0e0;

* {
  box-sizing: border-box;
}

.tree-introduction {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: @background-color;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      color: @primary-color;
      margin-bottom: 15px;
      font-size: 2.2rem;
    }

    .overview {
      max-width: 800px;
      margin: 20px auto;
      padding: 15px;
      background-color: lighten(@accent-color, 5%);
      border-radius: 8px;
      font-size: 1.1rem;
      text-align: left;
    }
  }

  .tree-visualization {
    display: flex;
    justify-content: center;
    margin: 30px 0;

    .tree {
      display: flex;
      flex-direction: column;
      align-items: center;

      .node {
        background-color: @secondary-color;
        color: white;
        border-radius: 50%;
        width: 70px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
        font-weight: bold;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        position: relative;
        z-index: 2;

        &.root {
          background-color: @primary-color;
          width: 80px;
          height: 80px;
        }

        &.leaf {
          background-color: #d68c45;
          width: 60px;
          height: 60px;
        }
      }

      .branch {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          top: -20px;
          height: 20px;
          width: 2px;
          background-color: #888;
        }
      }

      .sub-branches {
        display: flex;
        justify-content: center;
        position: relative;
        padding-top: 20px;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          height: 2px;
          width: 100%;
          background-color: #888;
        }

        .branch {
          margin: 0 20px;

          &::before {
            top: -22px;
          }
        }
      }
    }
  }

  .tree-types {
    margin: 40px 0;

    h2 {
      color: @primary-color;
      text-align: center;
      margin-bottom: 25px;
      font-size: 1.8rem;
      border-bottom: 2px solid @border-color;
      padding-bottom: 10px;
    }

    .type-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .type-card {
      background-color: @card-color;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      border: 1px solid @border-color;

      &.expanded {
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        transform: translateY(-5px);
      }

      .card-header {
        background-color: @primary-color;
        color: white;
        padding: 18px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: darken(@primary-color, 5%);
        }

        h3 {
          margin: 0;
          font-size: 1.3rem;
        }

        .toggle-icon {
          font-size: 1.5rem;
          font-weight: bold;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .card-content {
        padding: 20px;

        .properties {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;

          .property {
            h4 {
              color: @primary-color;
              margin-top: 0;
              margin-bottom: 10px;
              font-size: 1.1rem;
              border-bottom: 1px solid @border-color;
              padding-bottom: 5px;
            }

            ul {
              padding-left: 20px;
              margin: 0;

              li {
                margin-bottom: 8px;
              }
            }
          }
        }
      }
    }
  }

  footer {
    margin-top: 40px;
    padding: 20px;
    background-color: lighten(@accent-color, 2%);
    border-radius: 8px;
    text-align: center;
    font-style: italic;
    border-top: 2px solid @border-color;
  }
}

@media (max-width: 768px) {
  .tree-introduction {
    padding: 15px;

    header h1 {
      font-size: 1.8rem;
    }

    .tree-visualization .tree {
      transform: scale(0.8);
    }

    .tree-types .type-cards {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 480px) {
  .tree-visualization .tree {
    transform: scale(0.7);
  }

  .tree-introduction .tree-types .type-card .card-content .properties {
    grid-template-columns: 1fr;
  }
}
</style>
