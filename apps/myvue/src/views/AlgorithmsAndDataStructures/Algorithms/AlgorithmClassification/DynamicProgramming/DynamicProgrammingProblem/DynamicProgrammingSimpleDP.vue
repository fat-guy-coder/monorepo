<template>
  <div class="dp-container">
    <header class="header">
      <h1>简单动态规划算法题解手册</h1>
      <p class="subtitle">经典问题解析与TypeScript实现</p>
    </header>

    <div class="search-box">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="搜索动态规划题目..."
        class="search-input"
      />
      <button class="search-btn">
        <i class="icon-search"></i>
      </button>
    </div>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-value">{{ problems.length }}</div>
        <div class="stat-label">收录题目</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">10+</div>
        <div class="stat-label">应用场景</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">8</div>
        <div class="stat-label">核心模式</div>
      </div>
    </div>

    <div class="content">
      <div class="problems-list">
        <div
          v-for="(problem, index) in filteredProblems"
          :key="problem.id"
          class="problem-card"
          :class="{ active: activeProblem === index }"
          @click="activeProblem = index"
        >
          <div class="problem-header">
            <span class="problem-id">#{{ index + 1 }}</span>
            <h3 class="problem-title">{{ problem.title }}</h3>
            <span class="problem-difficulty" :class="problem.difficulty">{{
              problem.diffText
            }}</span>
          </div>
          <p class="problem-desc">{{ problem.desc }}</p>
          <div class="problem-tags">
            <span v-for="tag in problem.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>

      <div class="problem-detail">
        <div v-if="activeProblem !== null" class="detail-content">
          <div class="detail-header">
            <h2>{{ currentProblem?.title }}</h2>
            <div class="problem-meta">
              <span class="meta-item">
                <i class="icon-difficulty"></i> 难度: {{ currentProblem?.diffText }}
              </span>
              <span class="meta-item">
                <i class="icon-time"></i> 时间复杂度: {{ currentProblem?.timeComplexity }}
              </span>
              <span class="meta-item">
                <i class="icon-space"></i> 空间复杂度: {{ currentProblem?.spaceComplexity }}
              </span>
            </div>
          </div>

          <div class="section">
            <h3><i class="icon-problem"></i> 问题描述</h3>
            <p>{{ currentProblem?.problem }}</p>
          </div>

          <div class="section">
            <h3><i class="icon-idea"></i> 动态规划思路</h3>
            <p>{{ currentProblem?.dpApproach }}</p>
          </div>

          <div class="section">
            <h3><i class="icon-steps"></i> 算法步骤</h3>
            <ol class="steps">
              <li v-for="(step, idx) in currentProblem?.steps" :key="idx">{{ step }}</li>
            </ol>
          </div>

          <div class="section">
            <h3><i class="icon-formula"></i> 状态转移方程</h3>
            <div class="formula-box">
              {{ currentProblem?.stateEquation }}
            </div>
          </div>

          <div class="section">
            <h3><i class="icon-code"></i> TypeScript实现</h3>
            <pre class="code-block"><code>{{ currentProblem?.code }}</code></pre>
          </div>

          <div class="section">
            <h3><i class="icon-example"></i> 示例分析</h3>
            <div class="example">
              <p><strong>输入:</strong> {{ currentProblem?.example.input }}</p>
              <p><strong>输出:</strong> {{ currentProblem?.example.output }}</p>
              <p><strong>解释:</strong> {{ currentProblem?.example.explanation }}</p>
            </div>
          </div>

          <div class="section">
            <h3><i class="icon-app"></i> 应用场景</h3>
            <p>{{ currentProblem?.applications }}</p>
          </div>
        </div>

        <div v-else class="empty-state">
          <i class="icon-select"></i>
          <h3>选择一个问题查看详情</h3>
          <p>左侧列表中选择动态规划题目查看详细题解和代码实现</p>
        </div>
      </div>
    </div>

    <div class="dp-patterns">
      <h2>常见动态规划模式</h2>
      <div class="patterns-grid">
        <div class="pattern-card">
          <h3>斐波那契模式</h3>
          <p>当前状态只依赖前两个状态</p>
          <div class="pattern-example">dp[i] = dp[i-1] + dp[i-2]</div>
        </div>
        <div class="pattern-card">
          <h3>背包模式</h3>
          <p>物品选择问题，有限容量</p>
          <div class="pattern-example">dp[i][j] = max(dp[i-1][j], dp[i-1][j-w] + v)</div>
        </div>
        <div class="pattern-card">
          <h3>最长公共子序列</h3>
          <p>两个序列的匹配问题</p>
          <div class="pattern-example">
            dp[i][j] = dp[i-1][j-1] + 1 或 max(dp[i-1][j], dp[i][j-1])
          </div>
        </div>
        <div class="pattern-card">
          <h3>矩阵路径</h3>
          <p>网格中寻找最优路径</p>
          <div class="pattern-example">dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])</div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>动态规划算法题解手册 © 2023 | 将复杂问题分解为简单子问题，存储子问题的解</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface ProblemExample {
  input: string
  output: string
  explanation: string
}

interface Problem {
  id: number
  title: string
  desc: string
  problem: string
  difficulty: string
  diffText: string
  tags: string[]
  dpApproach: string
  steps: string[]
  stateEquation: string
  code: string
  example: ProblemExample
  applications: string
  timeComplexity: string
  spaceComplexity: string
}

// 搜索查询
const searchQuery = ref('')

// 当前激活的问题索引
const activeProblem = ref<number | null>(0)

// 所有动态规划问题
const problems = ref<Problem[]>([
  {
    id: 1,
    title: '斐波那契数列',
    desc: '计算第n个斐波那契数',
    problem:
      '斐波那契数列由0和1开始，之后的斐波那契数就是由之前的两数相加而得出。给定n，计算F(n)。',
    difficulty: 'easy',
    diffText: '简单',
    tags: ['基础DP', '递归'],
    dpApproach: '使用动态规划存储中间结果，避免递归中的重复计算。',
    steps: [
      '定义dp数组，dp[i]表示第i个斐波那契数',
      '初始化dp[0] = 0, dp[1] = 1',
      '从2到n遍历，dp[i] = dp[i-1] + dp[i-2]',
      '返回dp[n]',
    ],
    stateEquation: 'dp[i] = dp[i-1] + dp[i-2]',
    code: `function fib(n: number): number {
  if (n < 2) return n;

  // 使用两个变量代替数组，优化空间复杂度
  let prev = 0, curr = 1;

  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
}

// 示例使用
console.log(fib(10)); // 55`,
    example: {
      input: 'n = 10',
      output: '55',
      explanation: '斐波那契数列：0,1,1,2,3,5,8,13,21,34,55',
    },
    applications: '数学计算、算法教学、金融模型',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 2,
    title: '爬楼梯',
    desc: '每次爬1或2阶，到顶的方法数',
    problem:
      '假设你正在爬楼梯。需要n阶你才能到达楼顶。每次你可以爬1或2个台阶。你有多少种不同的方法可以爬到楼顶？',
    difficulty: 'easy',
    diffText: '简单',
    tags: ['基础DP', '斐波那契'],
    dpApproach: '到达第i阶的方法数 = 到达第i-1阶的方法数 + 到达第i-2阶的方法数。',
    steps: [
      '定义dp数组，dp[i]表示到达第i阶的方法数',
      '初始化dp[0] = 1, dp[1] = 1',
      '从2到n遍历，dp[i] = dp[i-1] + dp[i-2]',
      '返回dp[n]',
    ],
    stateEquation: 'dp[i] = dp[i-1] + dp[i-2]',
    code: `function climbStairs(n: number): number {
  if (n <= 2) return n;

  let prev = 1, curr = 2;

  for (let i = 3; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
}

// 示例使用
console.log(climbStairs(5)); // 8`,
    example: {
      input: 'n = 5',
      output: '8',
      explanation:
        '有8种方法爬5阶楼梯：1+1+1+1+1, 1+1+1+2, 1+1+2+1, 1+2+1+1, 2+1+1+1, 1+2+2, 2+1+2, 2+2+1',
    },
    applications: '路径规划、游戏算法、概率计算',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 3,
    title: '最大子序和',
    desc: '和最大的连续子数组',
    problem:
      '给定一个整数数组nums，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。',
    difficulty: 'easy',
    diffText: '简单',
    tags: ['数组', '子序列'],
    dpApproach: '使用dp[i]表示以第i个元素结尾的最大子序和，全局最大值在遍历过程中更新。',
    steps: [
      '初始化dp[0] = nums[0]，maxSum = nums[0]',
      '从1开始遍历数组',
      'dp[i] = max(nums[i], dp[i-1] + nums[i])',
      '更新maxSum = max(maxSum, dp[i])',
      '返回maxSum',
    ],
    stateEquation: 'dp[i] = max(nums[i], dp[i-1] + nums[i])',
    code: `function maxSubArray(nums: number[]): number {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // 当前元素是否开始新的子数组
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

// 示例使用
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6`,
    example: {
      input: '[-2,1,-3,4,-1,2,1,-5,4]',
      output: '6',
      explanation: '连续子数组 [4,-1,2,1] 的和最大为6',
    },
    applications: '金融分析、信号处理、数据挖掘',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 4,
    title: '打家劫舍',
    desc: '不能偷相邻房屋的最大收益',
    problem:
      '给定一个代表每个房屋存放金额的非负整数数组，计算在不触动警报装置的情况下（即不能偷相邻的房屋），能够偷窃到的最高金额。',
    difficulty: 'medium',
    diffText: '中等',
    tags: ['序列DP', '状态机'],
    dpApproach: '每个房屋有两种状态：偷或不偷。dp[i]表示前i个房屋能偷到的最大金额。',
    steps: [
      '定义dp数组，dp[i]表示前i个房屋的最大收益',
      '初始化dp[0] = nums[0], dp[1] = max(nums[0], nums[1])',
      '从i=2开始遍历：dp[i] = max(dp[i-1], dp[i-2] + nums[i])',
      '返回dp[n-1]',
    ],
    stateEquation: 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])',
    code: `function rob(nums: number[]): number {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev = nums[0];
  let curr = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    const next = Math.max(curr, prev + nums[i]);
    prev = curr;
    curr = next;
  }

  return curr;
}

// 示例使用
console.log(rob([2,7,9,3,1])); // 12 (2+9+1)`,
    example: {
      input: '[2,7,9,3,1]',
      output: '12',
      explanation: '偷第1间(2)、第3间(9)和第5间(1)，总金额12',
    },
    applications: '资源分配、投资决策、网络安全',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 5,
    title: '零钱兑换',
    desc: '凑成金额的最少硬币数',
    problem:
      '给定不同面额的硬币coins和一个总金额amount，计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回-1。',
    difficulty: 'medium',
    diffText: '中等',
    tags: ['背包问题', '最优化'],
    dpApproach: '使用dp[i]表示凑成金额i所需的最少硬币数，遍历所有硬币面额进行状态转移。',
    steps: [
      '创建长度为amount+1的dp数组，初始化为Infinity',
      'dp[0] = 0（金额0需要0个硬币）',
      '从1到amount遍历每个金额',
      '对于每个硬币，如果金额>=硬币面额，更新dp[i] = min(dp[i], dp[i-coin] + 1)',
      '返回dp[amount]（如果是Infinity则返回-1）',
    ],
    stateEquation: 'dp[i] = min(dp[i], dp[i - coin] + 1) 对所有coin',
    code: `function coinChange(coins: number[], amount: number): number {
  // 初始化dp数组，amount+1作为特殊值
  const dp: number[] = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

// 示例使用
console.log(coinChange([1, 2, 5], 11)); // 3 (5+5+1)`,
    example: {
      input: 'coins = [1,2,5], amount = 11',
      output: '3',
      explanation: '5 + 5 + 1 = 11，最少需要3枚硬币',
    },
    applications: '自动售货机、收银系统、金融计算',
    timeComplexity: 'O(amount * n) n为硬币种类数',
    spaceComplexity: 'O(amount)',
  },
  {
    id: 6,
    title: '最长递增子序列',
    desc: '找到最长严格递增子序列',
    problem: '给定一个整数数组nums，找到其中最长严格递增子序列的长度。子序列不要求连续。',
    difficulty: 'medium',
    diffText: '中等',
    tags: ['子序列', '二分查找'],
    dpApproach: '使用dp[i]表示以nums[i]结尾的最长递增子序列长度，两层循环遍历所有元素对。',
    steps: [
      '创建dp数组，初始化为1（每个元素自身构成长度为1的子序列）',
      '从i=0到n-1遍历',
      '对于每个i，从j=0到i-1遍历',
      '如果nums[i] > nums[j]，更新dp[i] = max(dp[i], dp[j] + 1)',
      '返回dp数组中的最大值',
    ],
    stateEquation: 'dp[i] = max(dp[i], dp[j] + 1) 当 nums[i] > nums[j] 且 j < i',
    code: `function lengthOfLIS(nums: number[]): number {
  const n = nums.length;
  const dp = new Array(n).fill(1);
  let maxLen = 1;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
  }

  return maxLen;
}

// 示例使用
console.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // 4 (2,5,7,101)`,
    example: {
      input: '[10,9,2,5,3,7,101,18]',
      output: '4',
      explanation: '最长递增子序列是 [2,5,7,101] 或 [2,5,7,18]，长度4',
    },
    applications: '生物信息学、股票分析、数据序列分析',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(n)',
  },
  {
    id: 7,
    title: '最小路径和',
    desc: '网格中从左上到右下的最小路径',
    problem:
      '给定一个包含非负整数的m x n网格grid，找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。每次只能向下或者向右移动一步。',
    difficulty: 'medium',
    diffText: '中等',
    tags: ['矩阵DP', '路径规划'],
    dpApproach: '使用二维dp数组，每个位置的最小路径和由其上方和左方的最小值加上当前值决定。',
    steps: [
      '创建二维dp数组，大小与grid相同',
      '初始化左上角：dp[0][0] = grid[0][0]',
      '初始化第一行：dp[0][j] = dp[0][j-1] + grid[0][j]',
      '初始化第一列：dp[i][0] = dp[i-1][0] + grid[i][0]',
      '遍历剩余网格：dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]',
      '返回dp[m-1][n-1]',
    ],
    stateEquation: 'dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]',
    code: `function minPathSum(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  // 创建dp数组
  const dp = Array.from({length: m}, () => new Array(n).fill(0));

  // 初始化起点
  dp[0][0] = grid[0][0];

  // 初始化第一行
  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j-1] + grid[0][j];
  }

  // 初始化第一列
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i-1][0] + grid[i][0];
  }

  // 填充剩余网格
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
    }
  }

  return dp[m-1][n-1];
}

// 示例使用
const grid = [
  [1,3,1],
  [1,5,1],
  [4,2,1]
];
console.log(minPathSum(grid)); // 7 (1→3→1→1→1)`,
    example: {
      input: '[[1,3,1],[1,5,1],[4,2,1]]',
      output: '7',
      explanation: '路径 1→3→1→1→1 的总和最小为7',
    },
    applications: '机器人导航、游戏路径规划、资源优化',
    timeComplexity: 'O(m×n)',
    spaceComplexity: 'O(m×n) 可优化到O(n)',
  },
  {
    id: 8,
    title: '不同路径',
    desc: '网格中从左上到右下的路径数',
    problem:
      '一个机器人位于一个m x n网格的左上角。机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角。问总共有多少条不同的路径？',
    difficulty: 'medium',
    diffText: '中等',
    tags: ['组合数学', '矩阵DP'],
    dpApproach: '使用二维dp数组，每个位置的路径数等于上方和左方路径数之和。',
    steps: [
      '创建二维dp数组，初始化为0',
      '初始化第一行和第一列为1（只有一条直线路径）',
      '遍历剩余网格：dp[i][j] = dp[i-1][j] + dp[i][j-1]',
      '返回dp[m-1][n-1]',
    ],
    stateEquation: 'dp[i][j] = dp[i-1][j] + dp[i][j-1]',
    code: `function uniquePaths(m: number, n: number): number {
  // 创建dp数组
  const dp = Array.from({length: m}, () => new Array(n).fill(0));

  // 初始化第一列
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }

  // 初始化第一行
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
  }

  // 填充剩余网格
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i-1][j] + dp[i][j-1];
    }
  }

  return dp[m-1][n-1];
}

// 示例使用
console.log(uniquePaths(3, 7)); // 28`,
    example: {
      input: 'm=3, n=7',
      output: '28',
      explanation: '从左上角到右下角共有28条不同路径',
    },
    applications: '机器人导航、概率计算、组合数学',
    timeComplexity: 'O(m×n)',
    spaceComplexity: 'O(m×n) 可优化到O(n)',
  },
])

// 当前选中的问题
const currentProblem = computed(() => {
  return activeProblem.value !== null ? problems.value[activeProblem.value] : null
})

// 过滤问题列表
const filteredProblems = computed(() => {
  if (!searchQuery.value) return problems.value

  const query = searchQuery.value.toLowerCase()
  return problems.value.filter(
    (problem) =>
      problem.title.toLowerCase().includes(query) ||
      problem.desc.toLowerCase().includes(query) ||
      problem.tags.some((tag) => tag.toLowerCase().includes(query)),
  )
})
</script>

<style scoped lang="less">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 颜色变量
@primary: #4361ee;
@primary-light: #eef1fe;
@secondary: #3a0ca3;
@success: #06d6a0;
@warning: #ffd166;
@danger: #ef476f;
@light-bg: #f8f9fa;
@dark-text: #212529;
@gray-text: #6c757d;
@border-color: #dee2e6;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

// 字体
body {
  font-family: 'Inter', sans-serif;
  background-color: #f5f7ff;
  color: @dark-text;
  line-height: 1.6;
}

.dp-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.header {
  text-align: center;
  padding: 30px 0;
  margin-bottom: 20px;
  background: linear-gradient(135deg, @primary-light, #ffffff);
  border-radius: 12px;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: @primary;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @gray-text;
    max-width: 700px;
    margin: 0 auto;
  }
}

.search-box {
  display: flex;
  max-width: 600px;
  margin: 0 auto 30px;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: @card-shadow;

  .search-input {
    flex: 1;
    padding: 15px 25px;
    border: none;
    font-size: 1rem;
    background: @light-bg;

    &:focus {
      outline: none;
      background: white;
    }
  }

  .search-btn {
    padding: 0 25px;
    background: @primary;
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: darken(@primary, 10%);
    }
  }
}

.stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;

  .stat-card {
    background: white;
    border-radius: 12px;
    padding: 20px 30px;
    text-align: center;
    box-shadow: @card-shadow;
    transition: transform 0.3s;
    min-width: 150px;

    &:hover {
      transform: translateY(-5px);
    }

    .stat-value {
      font-size: 2.2rem;
      font-weight: 700;
      color: @primary;
      margin-bottom: 5px;
    }

    .stat-label {
      font-size: 0.9rem;
      color: @gray-text;
    }
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 25px;
  margin-bottom: 30px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.problems-list {
  display: flex;
  flex-direction: column;
  gap: 15px;

  .problem-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s;
    border: 2px solid @border-color;

    &:hover,
    &.active {
      border-color: @primary;
      box-shadow: 0 5px 15px rgba(67, 97, 238, 0.15);
      transform: translateY(-2px);
    }

    &.active {
      background: @primary-light;
    }

    .problem-header {
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      .problem-id {
        background: @light-bg;
        color: @gray-text;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        font-weight: 600;
      }

      .problem-title {
        font-size: 1.2rem;
        font-weight: 600;
        margin: 0;
        flex: 1;
      }

      .problem-difficulty {
        font-size: 0.8rem;
        padding: 4px 12px;
        border-radius: 20px;
        font-weight: 600;

        &.easy {
          background: fade(@success, 15%);
          color: darken(@success, 20%);
        }

        &.medium {
          background: fade(@warning, 15%);
          color: darken(@warning, 30%);
        }

        &.hard {
          background: fade(@danger, 15%);
          color: darken(@danger, 20%);
        }
      }
    }

    .problem-desc {
      color: @gray-text;
      font-size: 0.95rem;
      margin-bottom: 15px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .problem-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .tag {
        background: @light-bg;
        color: @gray-text;
        font-size: 0.8rem;
        padding: 4px 12px;
        border-radius: 20px;
      }
    }
  }
}

.problem-detail {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: @card-shadow;

  .detail-header {
    border-bottom: 2px solid @light-bg;
    padding-bottom: 20px;
    margin-bottom: 25px;

    h2 {
      font-size: 1.8rem;
      color: @primary;
      margin: 0 0 15px 0;
    }

    .problem-meta {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;

      .meta-item {
        display: flex;
        align-items: center;
        color: @gray-text;
        font-size: 0.9rem;
        font-weight: 500;

        i {
          margin-right: 8px;
          font-size: 1.1rem;
        }
      }
    }
  }

  .section {
    margin-bottom: 30px;

    h3 {
      font-size: 1.3rem;
      margin: 0 0 15px 0;
      display: flex;
      align-items: center;
      color: @secondary;

      i {
        margin-right: 10px;
      }
    }

    .steps {
      padding-left: 25px;

      li {
        margin-bottom: 10px;
        position: relative;
        padding-left: 15px;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 8px;
          height: 8px;
          background: @primary;
          border-radius: 50%;
        }
      }
    }

    .formula-box {
      background: #f8f9ff;
      border: 2px dashed #4361ee;
      padding: 20px;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      font-size: 1.1rem;
      font-weight: bold;
      text-align: center;
      color: #3a0ca3;
      margin: 15px 0;
    }

    .code-block {
      background: #2d3748;
      border-radius: 8px;
      padding: 20px;
      overflow-x: auto;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
      color: #e2e8f0;
      border: 1px solid #4a5568;
    }

    .example {
      background: #f8f9ff;
      border-left: 4px solid @primary;
      padding: 15px 20px;
      border-radius: 0 8px 8px 0;

      p {
        margin: 8px 0;
      }
    }
  }
}

.dp-patterns {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: @card-shadow;
  margin-bottom: 30px;

  h2 {
    text-align: center;
    font-size: 1.8rem;
    color: @primary;
    margin: 0 0 30px 0;
  }

  .patterns-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;

    .pattern-card {
      background: @light-bg;
      border-radius: 12px;
      padding: 25px;
      transition: all 0.3s;
      border: 1px solid @border-color;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
        border-color: @primary;
      }

      h3 {
        color: @secondary;
        margin-top: 0;
        font-size: 1.3rem;
      }

      p {
        color: @gray-text;
        margin: 10px 0 15px;
      }

      .pattern-example {
        background: white;
        padding: 15px;
        border-radius: 8px;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        color: @primary;
        border: 1px solid @border-color;
      }
    }
  }
}

.empty-state {
  text-align: center;
  padding: 50px 20px;
  color: @gray-text;

  i {
    font-size: 4rem;
    color: @border-color;
    margin-bottom: 20px;
    display: block;
  }

  h3 {
    font-size: 1.5rem;
    margin: 0 0 10px 0;
    color: @dark-text;
  }
}

.footer {
  text-align: center;
  padding: 20px;
  color: @gray-text;
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
  margin-top: 20px;
}

// 图标样式（使用伪元素）
.icon-search::before {
  content: '🔍';
}

.icon-difficulty::before {
  content: '📊';
}

.icon-time::before {
  content: '⏱️';
}

.icon-space::before {
  content: '💾';
}

.icon-problem::before {
  content: '❓';
}

.icon-idea::before {
  content: '💡';
}

.icon-steps::before {
  content: '📝';
}

.icon-formula::before {
  content: 'Σ';
  font-weight: bold;
}

.icon-code::before {
  content: '💻';
}

.icon-example::before {
  content: '📋';
}

.icon-app::before {
  content: '🚀';
}

.icon-select::before {
  content: '👉';
  font-size: 3rem;
  display: block;
  margin-bottom: 20px;
}
</style>
