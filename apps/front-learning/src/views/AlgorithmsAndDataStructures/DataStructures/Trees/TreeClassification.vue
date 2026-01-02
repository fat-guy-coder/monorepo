<template>
  <div class="tree-introduction">
    <!-- 标题和概述部分 -->
    <header>
      <h1>树的分类</h1>
    </header>

    <!-- 树类型介绍部分 -->
    <section class="tree-types">
      <h2>常见树类型介绍</h2>
      <div class="type-cards">
        <!-- 二叉树 -->
        <div class="type-card">
          <div class="card-header">
            <h3>二叉树 (Binary Tree)</h3>
          </div>
          <div class="card-content">
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
              <div class="property">
                <h4>图形结构</h4>
                <pre class="ascii-art">{{ BinaryTree }}</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- 二叉搜索树 -->
        <div class="type-card">
          <div class="card-header">
            <h3>二叉搜索树 (BST)</h3>
          </div>
          <div class="card-content">
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
              <div class="property">
                <h4>图形结构</h4>
                <pre class="ascii-art">{{ BinarySearchTree }}</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- AVL树 -->
        <div class="type-card">
          <div class="card-header">
            <h3>AVL树</h3>
          </div>
          <div class="card-content">
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
              <div class="property">
                <h4>图形结构</h4>
                <div>
                  <h3>普通BST</h3>
                  <pre class="ascii-art">{{ CommonTree }}</pre>
                </div>
              </div>
              <div class="property">
                <h4>图形结构</h4>
                <div>
                  <h3>AVLTree</h3>
                  <pre class="ascii-art">{{ AVLTree }}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 2-3树 -->
        <div class="type-card">
          <div class="card-header">
            <h3>2-3树</h3>
          </div>
          <div class="card-content">
            <div class="properties">
              <div class="property">
                <h4>特点</h4>
                <ul>
                  <li>2-3树是一种多路平衡搜索树，它的每个节点最多有三个子节点</li>
                  <li>2-3树的每个节点要么有1个键，要么有2个键</li>
                  <li>2-3树的每个节点要么是2节点，要么是3节点</li>
                </ul>
              </div>
              <div class="property">
                <h4>优点</h4>
                <ul>
                  <li>2-3树的插入和删除操作比AVL树更高效</li>
                  <li>2-3树的查找性能接近AVL树</li>
                </ul>
              </div>
              <div class="property">
                <h4>相关算法</h4>
                <ul>
                  <li>插入操作</li>
                  <li>删除操作</li>
                </ul>
              </div>
              <div class="property">
                <h4>使用场景</h4>
                <ul>
                  <li>2-3树的插入和删除操作比AVL树更高效</li>
                  <li>2-3树的查找性能接近AVL树</li>
                </ul>
              </div>
              <div class="property-column2">
                <h4>图形结构</h4>
                <img class="object-image" :src="TwoThreeTree" alt="" />
              </div>
            </div>
          </div>
        </div>

        <!-- 红黑树 -->
        <div class="type-card">
          <div class="card-header">
            <h3>红黑树</h3>
          </div>
          <div class="card-content">
            <div class="properties">
              <div class="property">
                <h4>特点</h4>
                <ul>
                  <li>自平衡二叉搜索树</li>
                  <li>节点为红色或黑色</li>
                  <li>根节点为黑色</li>
                  <li>NIL 节点（空叶子节点）为黑色</li>
                  <li>如果一个节点是红色的，则它的两个子节点都是黑色的</li>
                  <li>从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点</li>
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
              <div class="property-column2">
                <h4>图形结构</h4>
                <img class="tree-image" :src="RedBlackTree" alt="" />
              </div>
            </div>
          </div>
        </div>

        <!-- B树 -->
        <div class="type-card">
          <div class="card-header">
            <h3>B树</h3>
          </div>
          <div class="card-content">
            <div class="properties">
              <div class="property">
                <h4>特点</h4>
                <ul>
                  <li>多路平衡搜索树</li>
                  <li>B树和2-3树的原理相同,B树是2-M树(M阶(层)B树)</li>
                  <li>根节点至少有两个孩子节点</li>
                  <li>B每个节点有M-1个关键字key（节点中的每一个元素叫关键字），并且以升序排列</li>
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
              <div class="property-column2">
                <h4>图形结构</h4>
                <img class="object-image" :src="BTree" alt="" />
              </div>
            </div>
          </div>
        </div>

        <!-- B+树 -->
        <div class="type-card">
          <div class="card-header">
            <h3>B+树</h3>
          </div>
          <div class="card-content">
            <div class="properties">
              <div class="property">
                <h4>特点</h4>
                <ul>
                  <li>B+树是B树的变体，也是一种多路平衡搜索树</li>
                  <li>B+树的非叶子节点不存储数据，只存储索引</li>
                  <li>B+树的叶子节点存储数据，并且叶子节点之间有指针相连</li>
                  <li>只有叶子节点有Data域</li>
                </ul>
              </div>
              <div class="property">
                <h4>优点</h4>
                <ul>
                  <li>B+树的非叶子节点不存储数据，只存储索引</li>
                  <li>B+树的叶子节点存储数据，并且叶子节点之间有指针相连</li>
                </ul>
              </div>
              <div class="property">
                <h4>相关算法</h4>
                <ul>
                  <li>插入操作</li>
                  <li>删除操作</li>
                </ul>
              </div>
              <div class="property">
                <h4>使用场景</h4>
                <ul>
                  <li>B+树的非叶子节点不存储数据，只存储索引</li>
                  <li>B+树的叶子节点存储数据，并且叶子节点之间有指针相连</li>
                </ul>
              </div>
              <div class="property">
                <h4>图形结构</h4>
              </div>
            </div>
          </div>
        </div>

        <!-- Trie树 -->
        <div class="type-card">
          <div class="card-header">
            <h3>Trie树（字典树）</h3>
          </div>
          <div class="card-content">
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
      <p>
        树结构是计算机科学中最重要的数据结构之一，理解不同树类型的特点和应用场景对于设计高效算法和系统至关重要。
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import RedBlackTree from '@/assets/image/js/rbtree.svg'
import BTree from '@/assets/image/js/b-tree.png'
import TwoThreeTree from '@/assets/image/js/23-tree.webp'

const BinaryTree = `
          A
         / \\
        B   C
       / \\   \\
      D   E   F`

const BinarySearchTree = `
         5
        / \\
       3   7
      / \\   \\
     2   4   8`

const AVLTree = `
         5
        / \\
       3   7
      / \\   \\
     2   4   8`

const CommonTree = `
         5
        / \\
       3   7
      /
     2
    /
  1`
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

.tree-image {
  width: 100%;
  aspect-ratio: 1/1;
}

.object-image {
  object-fit: contain;
  width: 100%;
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
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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

          .property-column2 {
            width: 100%;
            height: 100%;
            grid-column: span 2;
          }

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
