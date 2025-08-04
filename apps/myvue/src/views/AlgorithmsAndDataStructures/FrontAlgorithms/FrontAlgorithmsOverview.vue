<template>
  <div class="algorithms-container">
    <!-- 头部区域 -->
    <header class="header">
      <h1>前端开发算法指南</h1>
      <p class="subtitle">这些算法只是基础中的基础，要想更好的提升，需要学习更多的算法，<a @click="gotoDetail"
          style="color: #3498db; cursor: pointer;">跳转</a></p>
    </header>

    <!-- 主要内容 -->
    <main class="main-content">
      <!-- 搜索和过滤 -->
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="搜索算法..." class="search-input">
        <div class="filter-tags">
          <span v-for="tag in tags" :key="tag" :class="{ active: activeTag === tag }" @click="toggleTag(tag)"
            class="tag">
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- 算法列表 -->
      <div class="algorithm-list">
        <!-- 数据结构相关 -->
        <section class="category">
          <h2 class="category-title">数据结构相关算法</h2>
          <div class="algorithm-grid">
            <div v-for="algo in filteredAlgorithms('数据结构')" :key="algo.name" class="algorithm-card">
              <h3 class="algorithm-name">{{ algo.name }}</h3>
              <div class="algorithm-scene">使用场景：{{ algo.scene }}</div>
              <div class="algorithm-desc">{{ algo.desc }}</div>
              <div class="algorithm-tags">
                <span v-for="tag in algo.tags" :key="tag" class="tag mini">{{ tag }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 排序和搜索 -->
        <section class="category">
          <h2 class="category-title">排序和搜索算法</h2>
          <div class="algorithm-grid">
            <div v-for="algo in filteredAlgorithms('排序搜索')" :key="algo.name" class="algorithm-card">
              <h3 class="algorithm-name">{{ algo.name }}</h3>
              <div class="algorithm-scene">使用场景：{{ algo.scene }}</div>
              <div class="algorithm-desc">{{ algo.desc }}</div>
              <div class="algorithm-tags">
                <span v-for="tag in algo.tags" :key="tag" class="tag mini">{{ tag }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 树和图算法 -->
        <section class="category">
          <h2 class="category-title">树和图算法</h2>
          <div class="algorithm-grid">
            <div v-for="algo in filteredAlgorithms('树图')" :key="algo.name" class="algorithm-card">
              <h3 class="algorithm-name">{{ algo.name }}</h3>
              <div class="algorithm-scene">使用场景：{{ algo.scene }}</div>
              <div class="algorithm-desc">{{ algo.desc }}</div>
              <div class="algorithm-tags">
                <span v-for="tag in algo.tags" :key="tag" class="tag mini">{{ tag }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 字符串算法 -->
        <section class="category">
          <h2 class="category-title">字符串处理算法</h2>
          <div class="algorithm-grid">
            <div v-for="algo in filteredAlgorithms('字符串')" :key="algo.name" class="algorithm-card">
              <h3 class="algorithm-name">{{ algo.name }}</h3>
              <div class="algorithm-scene">使用场景：{{ algo.scene }}</div>
              <div class="algorithm-desc">{{ algo.desc }}</div>
              <div class="algorithm-tags">
                <span v-for="tag in algo.tags" :key="tag" class="tag mini">{{ tag }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 动态规划 -->
        <section class="category">
          <h2 class="category-title">动态规划算法</h2>
          <div class="algorithm-grid">
            <div v-for="algo in filteredAlgorithms('动态规划')" :key="algo.name" class="algorithm-card">
              <h3 class="algorithm-name">{{ algo.name }}</h3>
              <div class="algorithm-scene">使用场景：{{ algo.scene }}</div>
              <div class="algorithm-desc">{{ algo.desc }}</div>
              <div class="algorithm-tags">
                <span v-for="tag in algo.tags" :key="tag" class="tag mini">{{ tag }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 其他算法 -->
        <section class="category">
          <h2 class="category-title">其他实用算法</h2>
          <div class="algorithm-grid">
            <div v-for="algo in filteredAlgorithms('其他')" :key="algo.name" class="algorithm-card">
              <h3 class="algorithm-name">{{ algo.name }}</h3>
              <div class="algorithm-scene">使用场景：{{ algo.scene }}</div>
              <div class="algorithm-desc">{{ algo.desc }}</div>
              <div class="algorithm-tags">
                <span v-for="tag in algo.tags" :key="tag" class="tag mini">{{ tag }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>前端算法指南 © {{ new Date().getFullYear() }} | 持续学习，持续进步</p>
      <p>共收录 {{ algorithms.length }} 个前端实用算法</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTabistStore } from '@/stores/tab'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useTabistStore()


function gotoDetail() {
  store.activateTab({
    path: "/AlgorithmsAndDataStructures/Algorithms/AlgorithmIntroduction",
    name: "AlgorithmIntroduction",
    label: "AlgorithmIntroduction",
  }, (path) => {
    router.push({ path })
  })
}

// 搜索查询和活动标签
const searchQuery = ref('');
const activeTag = ref('全部');
const tags = ref(['全部', '数据结构', '排序搜索', '树图', '字符串', '动态规划', '其他']);

// 算法数据
const algorithms = ref([
  // 数据结构相关
  {
    name: '栈的应用',
    scene: '撤销/重做功能、括号匹配',
    desc: '利用后进先出特性实现操作历史记录',
    category: '数据结构',
    tags: ['栈', '基础']
  },
  {
    name: '队列的应用',
    scene: '任务队列、消息队列',
    desc: '利用先进先出特性处理顺序任务',
    category: '数据结构',
    tags: ['队列', '基础']
  },
  {
    name: '链表操作',
    scene: '音乐播放列表、图片轮播',
    desc: '高效插入和删除元素的链式结构',
    category: '数据结构',
    tags: ['链表', '基础']
  },
  {
    name: '哈希表应用',
    scene: '快速查找、数据去重',
    desc: 'O(1)时间复杂度的快速查找结构',
    category: '数据结构',
    tags: ['哈希表', '性能优化']
  },
  {
    name: '堆的应用',
    scene: '优先队列、Top K问题',
    desc: '快速获取最大/最小值的树形结构',
    category: '数据结构',
    tags: ['堆', '高级']
  },

  // 排序和搜索
  {
    name: '快速排序',
    scene: '大规模数据排序',
    desc: '分而治之的高效排序算法，平均O(n log n)',
    category: '排序搜索',
    tags: ['排序', '性能优化']
  },
  {
    name: '归并排序',
    scene: '稳定排序需求、外部排序',
    desc: '稳定排序算法，时间复杂度O(n log n)',
    category: '排序搜索',
    tags: ['排序', '稳定']
  },
  {
    name: '二分查找',
    scene: '有序数组查找',
    desc: 'O(log n)时间复杂度的查找算法',
    category: '排序搜索',
    tags: ['搜索', '基础']
  },
  {
    name: '深度优先搜索(DFS)',
    scene: '路径查找、状态空间搜索',
    desc: '沿着树或图的深度遍历节点',
    category: '排序搜索',
    tags: ['搜索', '图论']
  },
  {
    name: '广度优先搜索(BFS)',
    scene: '最短路径、社交网络关系',
    desc: '按层次遍历树或图的算法',
    category: '排序搜索',
    tags: ['搜索', '图论']
  },

  // 树和图算法
  {
    name: '二叉树遍历',
    scene: '文件系统导航、DOM树操作',
    desc: '前序、中序、后序和层序遍历',
    category: '树图',
    tags: ['树', '基础']
  },
  {
    name: 'Trie树',
    scene: '自动补全、拼写检查',
    desc: '高效存储和检索字符串集合',
    category: '树图',
    tags: ['树', '字符串']
  },
  {
    name: '最小生成树',
    scene: '网络设计、电路设计',
    desc: 'Prim和Kruskal算法解决连接问题',
    category: '树图',
    tags: ['图', '高级']
  },
  {
    name: '最短路径算法',
    scene: '地图导航、网络路由',
    desc: 'Dijkstra和Floyd算法寻找最短路径',
    category: '树图',
    tags: ['图', '性能优化']
  },
  {
    name: '拓扑排序',
    scene: '任务调度、依赖解析',
    desc: '有向无环图的线性序列排序',
    category: '树图',
    tags: ['图', '依赖管理']
  },

  // 字符串算法
  {
    name: 'KMP算法',
    scene: '文本编辑器查找功能',
    desc: '高效字符串匹配算法，O(n+m)时间复杂度',
    category: '字符串',
    tags: ['字符串匹配', '高效']
  },
  {
    name: '正则表达式',
    scene: '表单验证、文本提取',
    desc: '强大的字符串匹配和处理工具',
    category: '字符串',
    tags: ['字符串处理', '实用']
  },
  {
    name: 'Levenshtein距离',
    scene: '拼写纠正、相似度计算',
    desc: '计算两个字符串差异的最小编辑次数',
    category: '字符串',
    tags: ['字符串比较', '实用']
  },
  {
    name: 'Rabin-Karp算法',
    scene: '抄袭检测、模式匹配',
    desc: '使用哈希的字符串匹配算法',
    category: '字符串',
    tags: ['字符串匹配', '哈希']
  },

  // 动态规划
  {
    name: '背包问题',
    scene: '资源优化分配',
    desc: '解决有限资源下的最优选择问题',
    category: '动态规划',
    tags: ['优化', '经典']
  },
  {
    name: '最长公共子序列',
    scene: '文件差异比较、DNA分析',
    desc: '寻找两个序列共有的最长子序列',
    category: '动态规划',
    tags: ['序列比较', '实用']
  },
  {
    name: '斐波那契数列',
    scene: '性能优化、算法教学',
    desc: '展示递归和动态规划的经典问题',
    category: '动态规划',
    tags: ['基础', '教学']
  },

  // 其他算法
  {
    name: 'LRU缓存',
    scene: '浏览器缓存、资源管理',
    desc: '最近最少使用缓存淘汰策略',
    category: '其他',
    tags: ['缓存', '性能优化']
  },
  {
    name: '布隆过滤器',
    scene: '缓存穿透防护、存在性检测',
    desc: '高效的概率型数据结构',
    category: '其他',
    tags: ['数据结构', '概率']
  },
  {
    name: '一致性哈希',
    scene: '分布式系统、负载均衡',
    desc: '解决分布式缓存扩展问题',
    category: '其他',
    tags: ['分布式', '高级']
  },
  {
    name: 'Fisher-Yates洗牌',
    scene: '随机播放、抽奖系统',
    desc: '生成随机排列的高效算法',
    category: '其他',
    tags: ['随机', '实用']
  },
  {
    name: '双指针技巧',
    scene: '数组去重、有序数组操作',
    desc: '高效处理数组问题的常用技巧',
    category: '其他',
    tags: ['技巧', '高效']
  }
]);

// 过滤算法
const filteredAlgorithms = computed(() => {
  return (category: string) => {
    return algorithms.value.filter(algo => {
      // 检查类别
      const categoryMatch = activeTag.value === '全部' ||
        algo.category === activeTag.value ||
        (activeTag.value === '全部' && category === algo.category);

      // 检查搜索查询
      const searchMatch = !searchQuery.value ||
        algo.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        algo.desc.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        algo.scene.toLowerCase().includes(searchQuery.value.toLowerCase());

      return categoryMatch && searchMatch && algo.category === category;
    });
  };
});

// 切换标签
const toggleTag = (tag: string) => {
  activeTag.value = tag;
};
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #eaeaea;
@tag-bg: #e0f7ff;
@dark-tag-bg: darken(@tag-bg, 5%);

.algorithms-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @light-bg;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: darken(@primary-color, 10%);
  }

  .subtitle {
    font-size: 1.2rem;
    color: lighten(@text-color, 20%);
  }
}

.search-bar {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .search-input {
    padding: 12px 15px;
    border: 2px solid @primary-color;
    border-radius: 30px;
    font-size: 1rem;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
      box-shadow: 0 0 0 3px fade(@primary-color, 30%);
    }
  }
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;

  .tag {
    padding: 8px 15px;
    background-color: @tag-bg;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;

    &:hover {
      background-color: @dark-tag-bg;
    }

    &.active {
      background-color: @primary-color;
      color: white;
      font-weight: 600;
    }
  }
}

.category {
  margin-bottom: 40px;

  .category-title {
    font-size: 1.6rem;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid fade(@primary-color, 30%);
    color: darken(@primary-color, 15%);
  }
}

.algorithm-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.algorithm-card {
  background-color: @card-bg;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 4px solid @primary-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .algorithm-name {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: darken(@primary-color, 10%);
  }

  .algorithm-scene {
    font-weight: 600;
    margin-bottom: 8px;
    color: @secondary-color;
    font-size: 0.95rem;
  }

  .algorithm-desc {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 15px;
    color: lighten(@text-color, 15%);
  }
}

.algorithm-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  .tag.mini {
    padding: 4px 10px;
    background-color: fade(@tag-bg, 70%);
    border-radius: 15px;
    font-size: 0.8rem;
  }
}

.footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 40px;
  border-top: 1px solid @border-color;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;

  p {
    margin: 5px 0;
  }
}

@media (max-width: 768px) {
  .algorithm-grid {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 2rem;
  }

  .category .category-title {
    font-size: 1.4rem;
  }
}
</style>
