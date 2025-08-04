<template>
  <div class="dp-container">
    <!-- 头部区域 -->
    <div class="header">
      <div class="header-content">
        <h1><i class="icon fas fa-layer-group"></i> 动态规划算法分类基础介绍</h1>
        <p class="subtitle">探索五大动态规划类别及其应用场景</p>

        <div class="stats">
          <div class="stat-card">
            <div class="stat-value">5</div>
            <div class="stat-label">主要分类</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">10+</div>
            <div class="stat-label">经典问题</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">O(n)</div>
            <div class="stat-label">时间复杂度</div>
          </div>
        </div>
      </div>

      <div class="header-visual">
        <div class="dp-pyramid">
          <div class="pyramid-layer" v-for="(layer, index) in pyramidLayers" :key="index" :class="`layer-${index + 1}`">
            {{ layer.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- 分类导航 -->
    <div class="category-nav">
      <button v-for="category in categories" :key="category.id"
        :class="['nav-btn', { active: activeCategory === category.id }]" @click="activeCategory = category.id">
        <i :class="category.icon"></i>
        {{ category.name }}
      </button>
    </div>

    <!-- 分类详情 -->
    <div class="category-content">
      <div class="category-info">
        <h2><i :class="currentCategory.icon"></i> {{ currentCategory.name }}</h2>
        <div class="category-description">
          <p>{{ currentCategory.description }}</p>
        </div>

        <div class="features">
          <h3>核心特征：</h3>
          <ul>
            <li v-for="(feature, index) in currentCategory.features" :key="index">
              <i class="fas fa-check-circle"></i> {{ feature }}
            </li>
          </ul>
        </div>

        <div class="applications">
          <h3>典型应用场景：</h3>
          <div class="application-tags">
            <span v-for="(app, index) in currentCategory.applications" :key="index" class="tag">
              {{ app }}
            </span>
          </div>
        </div>
      </div>

      <div class="code-section">
        <div class="code-header">
          <h3>{{ currentCategory.exampleTitle }}</h3>
          <button class="copy-btn" @click="copyCode(currentCategory.code)">
            <i class="fas fa-copy"></i> 复制代码
          </button>
        </div>
        <pre><code>{{ currentCategory.code }}</code></pre>

        <div class="code-explanation">
          <h4>代码解析：</h4>
          <ul>
            <li v-for="(explanation, index) in currentCategory.explanations" :key="index">
              <i class="fas fa-caret-right"></i> {{ explanation }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 算法比较表格 -->
    <div class="comparison-section">
      <h2><i class="fas fa-table"></i> 动态规划分类比较</h2>
      <div class="comparison-table">
        <div class="table-header">
          <div>分类</div>
          <div>时间复杂度</div>
          <div>空间复杂度</div>
          <div>典型问题</div>
          <div>难度</div>
        </div>
        <div v-for="category in categories" :key="category.id" class="table-row">
          <div><i :class="category.icon"></i> {{ category.name }}</div>
          <div>{{ category.comparison.time }}</div>
          <div>{{ category.comparison.space }}</div>
          <div>{{ category.comparison.problem }}</div>
          <div>
            <div class="difficulty">
              <i v-for="star in 5" :key="star"
                :class="['fas fa-star', { active: star <= category.comparison.difficulty }]"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>动态规划算法分类基础介绍 | 使用 Vue3 + TypeScript 构建 | © 2023</p>
      <div class="actions">
        <button class="action-btn">
          <i class="fas fa-download"></i> 导出PDF
        </button>
        <button class="action-btn">
          <i class="fas fa-share-alt"></i> 分享
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 当前激活的分类
const activeCategory = ref('linear');

// 金字塔层次
const pyramidLayers = [
  { label: '状态压缩DP' },
  { label: '树形DP' },
  { label: '区间DP' },
  { label: '背包DP' },
  { label: '线性DP' }
];

// 动态规划分类数据
const categories = ref([
  {
    id: 'linear',
    name: '线性动态规划',
    icon: 'fas fa-arrows-alt-h',
    description: '沿着线性结构（如数组、字符串）进行状态转移的动态规划，状态定义通常为一维或二维数组，状态转移沿着线性方向推进。',
    features: [
      '状态定义通常为 dp[i] 表示前 i 个元素的最优解',
      '状态转移方程沿着索引 i 的线性方向',
      '通常需要初始化边界条件',
      '遍历顺序通常为从左到右'
    ],
    applications: [
      '最长递增子序列',
      '最大子数组和',
      '编辑距离',
      '斐波那契数列',
      '爬楼梯问题'
    ],
    exampleTitle: '最长递增子序列 (LIS)',
    code: `// 最长递增子序列 - 线性动态规划
function lengthOfLIS(nums: number[]): number {
  // 边界情况处理
  if (nums.length === 0) return 0;

  // 1. 定义DP数组：dp[i]表示以nums[i]结尾的最长递增子序列长度
  const dp: number[] = new Array(nums.length).fill(1);

  // 2. 初始化：每个元素本身至少构成一个长度为1的子序列
  let maxLength = 1;

  // 3. 状态转移：遍历每个元素，与之前的元素比较
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // 如果当前元素大于之前的元素，可以形成更长的子序列
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    // 更新最大长度
    maxLength = Math.max(maxLength, dp[i]);
  }

  return maxLength;
}

// 示例使用
const nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(nums)); // 输出：4 (序列 [2, 5, 7, 101])`,
    explanations: [
      'dp[i] 表示以 nums[i] 结尾的最长递增子序列的长度',
      '初始化每个 dp[i] = 1，因为每个元素本身就是一个子序列',
      '对于每个元素 nums[i]，遍历它之前的所有元素 nums[j] (j < i)',
      '如果 nums[i] > nums[j]，则更新 dp[i] = max(dp[i], dp[j] + 1)',
      '最终结果是 dp 数组中的最大值'
    ],
    comparison: {
      time: 'O(n²)',
      space: 'O(n)',
      problem: 'LIS, LCS',
      difficulty: 2
    }
  },
  {
    id: 'knapsack',
    name: '背包动态规划',
    icon: 'fas fa-suitcase',
    description: '解决资源分配问题，在有限容量下选择物品以达到最优值。主要分为01背包、完全背包、多重背包等变体。',
    features: [
      '状态定义通常为 dp[i][w] 表示前i个物品在容量w下的最优解',
      '状态转移方程包含放入或不放入当前物品的决策',
      '需要处理物品重量和价值',
      '遍历顺序取决于背包类型'
    ],
    applications: [
      '01背包问题',
      '完全背包问题',
      '多重背包问题',
      '分组背包问题',
      '硬币找零问题'
    ],
    exampleTitle: '01背包问题',
    code: `// 01背包问题 - 动态规划解法
function knapSack(capacity: number, weights: number[], values: number[]): number {
  const n = weights.length;

  // 1. 创建DP数组：dp[i][w] 表示前i个物品在容量w下的最大价值
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array(capacity + 1).fill(0)
  );

  // 2. 填充DP数组
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      // 当前物品重量小于等于当前容量
      if (weights[i-1] <= w) {
        // 选择放入或不放入当前物品的最大值
        dp[i][w] = Math.max(
          values[i-1] + dp[i-1][w - weights[i-1]],
          dp[i-1][w]
        );
      } else {
        // 当前物品重量大于容量，无法放入
        dp[i][w] = dp[i-1][w];
      }
    }
  }

  // 3. 返回结果
  return dp[n][capacity];
}

// 示例数据
const weights = [2, 3, 4, 5]; // 物品重量
const values = [3, 4, 5, 6];  // 物品价值
const capacity = 8;            // 背包容量

console.log(knapSack(capacity, weights, values)); // 输出：10 (选择重量3和5的物品)`,
    explanations: [
      'dp[i][w] 表示前i个物品在背包容量为w时能获得的最大价值',
      '初始化：dp[0][w] = 0（没有物品时价值为0）',
      '遍历每个物品和每种背包容量',
      '如果当前物品重量 ≤ 当前背包容量，可以选择放入或不放入：',
      '  放入：价值 = 当前物品价值 + dp[i-1][w-当前物品重量]',
      '  不放入：价值 = dp[i-1][w]',
      '取两者中的最大值作为dp[i][w]的值',
      '最终结果存储在dp[n][capacity]中'
    ],
    comparison: {
      time: 'O(n×W)',
      space: 'O(n×W)',
      problem: '背包问题',
      difficulty: 3
    }
  },
  {
    id: 'interval',
    name: '区间动态规划',
    icon: 'fas fa-expand-alt',
    description: '处理区间或序列上的问题，通常涉及合并、分割或处理子区间的最优解。状态定义通常为dp[i][j]表示区间[i, j]上的最优解。',
    features: [
      '状态定义通常为 dp[i][j] 表示区间 [i, j] 的最优解',
      '状态转移通常涉及区间分割点k',
      '遍历顺序通常为区间长度从小到大',
      '需要处理区间边界情况'
    ],
    applications: [
      '矩阵链乘法',
      '石子合并问题',
      '最长回文子序列',
      '布尔括号化问题',
      '最优二叉搜索树'
    ],
    exampleTitle: '最长回文子序列',
    code: `// 最长回文子序列 - 区间动态规划
function longestPalindromeSubseq(s: string): number {
  const n = s.length;

  // 1. 创建DP数组：dp[i][j]表示s[i..j]的最长回文子序列长度
  const dp: number[][] = Array.from({ length: n }, () =>
    new Array(n).fill(0)
  );

  // 2. 初始化：单个字符是长度为1的回文
  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }

  // 3. 按区间长度从小到大遍历
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;

      // 情况1：首尾字符相同
      if (s[i] === s[j]) {
        dp[i][j] = dp[i+1][j-1] + 2;
      } else {
        // 情况2：首尾字符不同，取较大值
        dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]);
      }
    }
  }

  // 4. 返回整个字符串的最长回文子序列长度
  return dp[0][n-1];
}

// 示例使用
const str = "bbbab";
console.log(longestPalindromeSubseq(str)); // 输出：4 (bbbb)`,
    explanations: [
      'dp[i][j] 表示字符串 s 在区间 [i, j] 内的最长回文子序列长度',
      '初始化：所有长度为1的子串，dp[i][i] = 1',
      '遍历顺序：按区间长度从小到大（从2到n）',
      '如果 s[i] === s[j]，则 dp[i][j] = dp[i+1][j-1] + 2',
      '如果 s[i] !== s[j]，则 dp[i][j] = max(dp[i+1][j], dp[i][j-1])',
      '最终结果为 dp[0][n-1]'
    ],
    comparison: {
      time: 'O(n²)',
      space: 'O(n²)',
      problem: '矩阵链乘法',
      difficulty: 4
    }
  },
  {
    id: 'tree',
    name: '树形动态规划',
    icon: 'fas fa-tree',
    description: '在树形数据结构上应用动态规划，通常需要后序遍历或DFS来收集子树信息。状态转移依赖于子节点的状态。',
    features: [
      '在树结构上定义状态',
      '通常使用DFS后序遍历',
      '状态转移基于子节点的状态',
      '需要处理节点间的父子关系'
    ],
    applications: [
      '二叉树直径',
      '二叉树最大路径和',
      '树的最大独立集',
      '树的最小顶点覆盖',
      '树的最小支配集'
    ],
    exampleTitle: '二叉树最大路径和',
    code: `// 二叉树节点定义
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}

// 二叉树最大路径和 - 树形动态规划
function maxPathSum(root: TreeNode | null): number {
  let maxSum = -Infinity;

  // 递归函数：计算以当前节点为起点的最大路径和
  function dfs(node: TreeNode | null): number {
    if (!node) return 0;

    // 递归计算左右子树的最大贡献值
    const leftGain = Math.max(dfs(node.left), 0);
    const rightGain = Math.max(dfs(node.right), 0);

    // 当前节点的最大路径和（当前节点+左右子树）
    const priceNewPath = node.val + leftGain + rightGain;

    // 更新全局最大路径和
    maxSum = Math.max(maxSum, priceNewPath);

    // 返回当前节点的最大贡献值（只能选择一条子树路径）
    return node.val + Math.max(leftGain, rightGain);
  }

  dfs(root);
  return maxSum;
}

/* 示例树结构：
     -10
     / \\
    9  20
      /  \\
     15   7
*/
const root = new TreeNode(-10);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

console.log(maxPathSum(root)); // 输出：42 (15 -> 20 -> 7)`,
    explanations: [
      '使用DFS后序遍历二叉树',
      '对每个节点，计算其左右子树的最大贡献值（非负）',
      '当前节点的最大路径和 = 节点值 + 左子树贡献 + 右子树贡献',
      '更新全局最大路径和 maxSum',
      '当前节点的贡献值 = 节点值 + max(左子树贡献, 右子树贡献)',
      '注意：贡献值只能选择一条子树路径（左或右）'
    ],
    comparison: {
      time: 'O(n)',
      space: 'O(h)',
      problem: '树路径问题',
      difficulty: 4
    }
  },
  {
    id: 'state',
    name: '状态压缩动态规划',
    icon: 'fas fa-microchip',
    description: '使用位运算等技巧压缩状态空间，解决状态空间较大的问题（如旅行商问题）。通常用于处理状态集合的问题。',
    features: [
      '使用位掩码表示状态集合',
      '状态转移涉及位运算操作',
      '适用于状态数量有限但组合较多的情况',
      '需要处理状态压缩和展开'
    ],
    applications: [
      '旅行商问题(TSP)',
      '哈密顿路径',
      '数独求解',
      '棋盘覆盖问题',
      '任务分配问题'
    ],
    exampleTitle: '旅行商问题 (TSP)',
    code: `// 旅行商问题 - 状态压缩动态规划
function tsp(graph: number[][]): number {
  const n = graph.length;
  // 1. 创建DP数组：dp[mask][i]表示访问过mask中的城市，最后在i的最小花费
  const dp: number[][] = Array.from({ length: 1 << n }, () =>
    new Array(n).fill(Infinity)
  );

  // 2. 初始化：从0号城市开始
  dp[1][0] = 0; // 只访问过0号城市，最后在0号城市的花费为0

  // 3. 遍历所有状态
  for (let mask = 1; mask < (1 << n); mask++) {
    for (let i = 0; i < n; i++) {
      // 如果当前状态不包含城市i，跳过
      if ((mask & (1 << i)) === 0) continue;

      // 尝试从城市j转移到城市i
      for (let j = 0; j < n; j++) {
        // 如果当前状态包含城市j，且j不等于i
        if ((mask & (1 << j)) && j !== i) {
          // 更新状态：从mask中除去i的状态 + j到i的路径
          dp[mask][i] = Math.min(
            dp[mask][i],
            dp[mask ^ (1 << i)][j] + graph[j][i]
          );
        }
      }
    }
  }

  // 4. 返回访问所有城市后回到起点的最小花费
  let minCost = Infinity;
  for (let i = 1; i < n; i++) {
    minCost = Math.min(minCost, dp[(1 << n) - 1][i] + graph[i][0]);
  }

  return minCost;
}

// 示例图（邻接矩阵）
const graph = [
  [0, 10, 15, 20],
  [10, 0, 35, 25],
  [15, 35, 0, 30],
  [20, 25, 30, 0]
];

console.log(tsp(graph)); // 输出：80 (0->1->3->2->0)`,
    explanations: [
      'dp[mask][i] 表示访问过mask中的城市，最后在i的最小花费',
      'mask 是位掩码，表示访问过的城市集合',
      '初始化：只访问过0号城市，最后在0号城市的花费为0',
      '遍历所有状态和所有城市',
      '状态转移：dp[mask][i] = min(dp[mask][i], dp[mask^(1<<i)][j] + graph[j][i])',
      '最终结果：访问所有城市后回到起点的最小花费'
    ],
    comparison: {
      time: 'O(n²×2ⁿ)',
      space: 'O(n×2ⁿ)',
      problem: '旅行商问题',
      difficulty: 5
    }
  }
]);

// 当前分类信息
const currentCategory = computed(() => {
  return categories.value.find(cat => cat.id === activeCategory.value) || categories.value[0];
});

// 复制代码到剪贴板
const copyCode = (code: string) => {
  navigator.clipboard.writeText(code)
    .then(() => {
      alert('代码已复制到剪贴板！');
    })
    .catch(err => {
      console.error('复制失败:', err);
    });
};
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

// 颜色变量
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #9b59b6;
@dark-color: #2c3e50;
@text-color: #34495e;
@light-color: #ecf0f1;
@background-light: #f8fafc;
@card-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
@header-gradient: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);

.dp-container {
  font-family: 'Roboto', 'Segoe UI', sans-serif;
  background: @background-light;
  color: @text-color;
  line-height: 1.6;
  min-height: 100vh;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  background: white;
  border-radius: 16px;
  box-shadow: @card-shadow;
  padding: 30px;
  margin-bottom: 30px;
  display: flex;
  gap: 30px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, @primary-color, @accent-color, @secondary-color);
  }

  .header-content {
    flex: 1;

    h1 {
      font-size: 2.4rem;
      margin-bottom: 15px;
      font-weight: 700;
      color: @dark-color;
      display: flex;
      align-items: center;

      .icon {
        background: linear-gradient(135deg, @primary-color, @accent-color);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        font-size: 24px;
      }
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin-bottom: 25px;
    }
  }

  .stats {
    display: flex;
    gap: 15px;
    margin-top: 20px;

    .stat-card {
      background: @background-light;
      border-radius: 12px;
      padding: 15px;
      text-align: center;
      min-width: 100px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

      .stat-value {
        font-size: 1.8rem;
        font-weight: 700;
        color: @primary-color;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 0.95rem;
        color: @text-color;
      }
    }
  }

  .header-visual {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;

    .dp-pyramid {
      display: flex;
      flex-direction: column;
      align-items: center;

      .pyramid-layer {
        background: linear-gradient(to right, #3498db, #2ecc71);
        color: white;
        font-weight: 600;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

        &.layer-1 {
          width: 250px;
          height: 60px;
          font-size: 1.1rem;
          border-radius: 8px 8px 0 0;
        }

        &.layer-2 {
          width: 200px;
          height: 50px;
          font-size: 1rem;
        }

        &.layer-3 {
          width: 150px;
          height: 40px;
          font-size: 0.95rem;
        }

        &.layer-4 {
          width: 100px;
          height: 30px;
          font-size: 0.9rem;
        }

        &.layer-5 {
          width: 50px;
          height: 20px;
          font-size: 0.8rem;
          border-radius: 0 0 8px 8px;
        }
      }
    }
  }
}

.category-nav {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;

  .nav-btn {
    background: white;
    border: none;
    border-radius: 50px;
    padding: 12px 25px;
    font-size: 1rem;
    font-weight: 500;
    color: @text-color;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: @card-shadow;
    transition: all 0.3s ease;

    i {
      color: @primary-color;
    }

    &:hover {
      background: @primary-color;
      color: white;

      i {
        color: white;
      }
    }

    &.active {
      background: @primary-color;
      color: white;
      box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);

      i {
        color: white;
      }
    }
  }
}

.category-content {
  background: white;
  border-radius: 16px;
  box-shadow: @card-shadow;
  padding: 30px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .category-info {
    h2 {
      font-size: 1.8rem;
      margin-bottom: 20px;
      color: @dark-color;
      display: flex;
      align-items: center;
      gap: 12px;

      i {
        color: @primary-color;
        font-size: 1.5rem;
      }
    }

    .category-description {
      background: @background-light;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 25px;

      p {
        font-size: 1.1rem;
        line-height: 1.8;
      }
    }

    .features {
      margin-bottom: 25px;

      h3 {
        font-size: 1.3rem;
        margin-bottom: 15px;
        color: @dark-color;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          padding: 10px 0;
          border-bottom: 1px dashed #e2e8f0;
          display: flex;
          align-items: flex-start;
          gap: 10px;

          i {
            color: @secondary-color;
            margin-top: 5px;
          }

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }

    .applications {
      h3 {
        font-size: 1.3rem;
        margin-bottom: 15px;
        color: @dark-color;
      }

      .application-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        .tag {
          background: #e1f0fa;
          color: @primary-color;
          padding: 8px 15px;
          border-radius: 30px;
          font-size: 0.95rem;
          font-weight: 500;
        }
      }
    }
  }

  .code-section {
    background: @background-light;
    border-radius: 16px;
    overflow: hidden;

    .code-header {
      background: #0f172a;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        color: #94a3b8;
        font-size: 1.2rem;
        margin: 0;
      }

      .copy-btn {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid #475569;
        color: #94a3b8;
        padding: 8px 15px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }

    pre {
      padding: 20px;
      margin: 0;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
      color: #2d3748;
      background: white;
      max-height: 400px;
      overflow-y: auto;

      code {
        display: block;

        // 语法高亮
        .comment {
          color: #718096;
        }

        /* 注释 */
        .keyword {
          color: #805ad5;
        }

        /* 关键字 */
        .function {
          color: #3182ce;
        }

        /* 函数名 */
        .string {
          color: #38a169;
        }

        /* 字符串 */
        .number {
          color: #d69e2e;
        }

        /* 数字 */
        .operator {
          color: #e53e3e;
        }

        /* 操作符 */
      }
    }

    .code-explanation {
      padding: 20px;
      border-top: 1px solid #e2e8f0;

      h4 {
        font-size: 1.2rem;
        margin-bottom: 15px;
        color: @dark-color;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          padding: 10px 0;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          gap: 10px;

          i {
            color: @primary-color;
            margin-top: 5px;
          }

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
}

.comparison-section {
  background: white;
  border-radius: 16px;
  box-shadow: @card-shadow;
  padding: 30px;
  margin-bottom: 30px;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 25px;
    color: @dark-color;
    display: flex;
    align-items: center;
    gap: 12px;

    i {
      color: @primary-color;
    }
  }

  .comparison-table {
    display: grid;
    grid-template-columns: 1fr;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;

    .table-header,
    .table-row {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1.5fr 1fr;
      padding: 15px 20px;

      >div {
        padding: 10px;
        display: flex;
        align-items: center;
      }
    }

    .table-header {
      background: @primary-color;
      color: white;
      font-weight: 600;
    }

    .table-row {
      border-bottom: 1px solid #e2e8f0;

      &:nth-child(even) {
        background: @background-light;
      }

      &:last-child {
        border-bottom: none;
      }

      .difficulty {
        display: flex;
        gap: 3px;

        .fa-star {
          color: #e2e8f0;

          &.active {
            color: #f59e0b;
          }
        }
      }
    }
  }
}

.footer {
  background: white;
  border-radius: 16px;
  box-shadow: @card-shadow;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    color: #7f8c8d;
    font-size: 1rem;
  }

  .actions {
    display: flex;
    gap: 15px;

    .action-btn {
      background: @background-light;
      border: 1px solid #e2e8f0;
      color: @text-color;
      padding: 8px 15px;
      border-radius: 8px;
      font-size: 0.95rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;

      &:hover {
        background: @primary-color;
        color: white;
        border-color: @primary-color;
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;

    .header-visual {
      width: 100%;
      margin-top: 20px;
    }
  }

  .footer {
    flex-direction: column;
    gap: 15px;

    .actions {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
