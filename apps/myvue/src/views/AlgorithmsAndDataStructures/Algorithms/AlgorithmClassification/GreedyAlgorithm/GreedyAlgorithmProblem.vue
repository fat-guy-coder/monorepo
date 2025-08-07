<template>
  <div class="greedy-container">
    <header class="header">
      <h1>贪心算法题解手册</h1>
      <p class="subtitle">经典问题解析与TypeScript实现</p>
    </header>

    <div class="search-box">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="搜索贪心算法题目..."
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
        <div class="stat-value">8+</div>
        <div class="stat-label">应用场景</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">15+</div>
        <div class="stat-label">代码示例</div>
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
            <h3><i class="icon-idea"></i> 贪心策略</h3>
            <p>{{ currentProblem?.greedyStrategy }}</p>
          </div>

          <div class="section">
            <h3><i class="icon-steps"></i> 算法步骤</h3>
            <ol class="steps">
              <li v-for="(step, idx) in currentProblem?.steps" :key="idx">{{ step }}</li>
            </ol>
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
          <p>左侧列表中选择贪心算法题目查看详细题解和代码实现</p>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>贪心算法题解手册 © 2023 | 在每一步选择中都采取当前状态下最优的选择</p>
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
  greedyStrategy: string
  steps: string[]
  code: string
  example: ProblemExample
  applications: string
  timeComplexity: string
  spaceComplexity: string
}

// 搜索查询
const searchQuery = ref('')

// 当前激活的问题索引
const activeProblem = ref<number | null>(null)

// 所有贪心算法问题
const problems = ref<Problem[]>([
  {
    id: 1,
    title: '找零钱问题',
    desc: '用最少的硬币数量找零',
    problem:
      '给定不同面额的硬币 coins 和一个总金额 amount，计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。',
    difficulty: 'medium',
    diffText: '中等',
    tags: ['动态规划', '贪心算法'],
    greedyStrategy:
      '每次优先选择最大面额的硬币（注意：这种方法只在特定面额下有效，如标准币值系统）',
    steps: [
      '将硬币按面额从大到小排序',
      '从最大面额的硬币开始，尽可能多地选择该面额硬币',
      '用剩余金额重复上述过程，使用次大面额硬币',
      '直到金额变为0，或无法继续找零',
    ],
    code: `function coinChange(coins: number[], amount: number): number {
  coins.sort((a, b) => b - a); // 降序排序
  let count = 0;
  let remaining = amount;

  for (const coin of coins) {
    if (remaining === 0) break;
    if (coin <= remaining) {
      const num = Math.floor(remaining / coin);
      count += num;
      remaining -= num * coin;
    }
  }

  return remaining === 0 ? count : -1;
}

// 示例使用
const coins = [1, 5, 10, 25];
console.log(coinChange(coins, 36)); // 输出: 3 (25+10+1)`,
    example: {
      input: 'coins = [1, 5, 10, 25], amount = 36',
      output: '3',
      explanation: '25 + 10 + 1 = 36，共使用3枚硬币',
    },
    applications: '自动售货机找零、收银系统、金融计算',
    timeComplexity: 'O(n log n) 主要来自排序',
    spaceComplexity: 'O(1)',
  },
  {
    id: 2,
    title: '背包问题（分数）',
    desc: '最大化背包价值，物品可分割',
    problem:
      '给定背包容量 W 和一系列物品，每个物品有重量和价值。你可以取物品的一部分，求背包能装的最大价值。',
    difficulty: 'easy',
    diffText: '简单',
    tags: ['贪心算法', '优化问题'],
    greedyStrategy: '优先选择价值/重量比最高的物品',
    steps: [
      '计算每个物品的单位价值（价值/重量）',
      '按单位价值降序排序',
      '依次选择物品，尽可能多地取单位价值高的物品',
      '当背包容量不足时，取部分物品填满背包',
    ],
    code: `interface Item {
  value: number;
  weight: number;
}

function fractionalKnapsack(W: number, items: Item[]): number {
  // 计算单位价值并排序
  items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

  let totalValue = 0;
  let remaining = W;

  for (const item of items) {
    if (remaining <= 0) break;

    // 取尽可能多的当前物品
    const amount = Math.min(item.weight, remaining);
    totalValue += (item.value / item.weight) * amount;
    remaining -= amount;
  }

  return totalValue;
}

// 示例使用
const items = [
  { value: 60, weight: 10 },
  { value: 100, weight: 20 },
  { value: 120, weight: 30 }
];
console.log(fractionalKnapsack(50, items)); // 输出: 240`,
    example: {
      input: 'W=50, items = [[60,10], [100,20], [120,30]]',
      output: '240',
      explanation: '取全部第一件物品(60)、全部第二件物品(100)和2/3的第三件物品(80)',
    },
    applications: '资源分配、投资组合优化、装载问题',
    timeComplexity: 'O(n log n) 主要来自排序',
    spaceComplexity: 'O(1)',
  },
  {
    id: 3,
    title: '活动选择问题',
    desc: '选择最多数量的互不重叠活动',
    problem: '给定一组活动，每个活动有开始时间和结束时间。选择最大数量的活动，使它们互不重叠。',
    difficulty: 'medium',
    diffText: '中等',
    tags: ['区间调度', '贪心算法'],
    greedyStrategy: '优先选择结束时间最早的活动',
    steps: [
      '按结束时间对所有活动进行升序排序',
      '选择第一个活动',
      '遍历剩余活动，选择开始时间晚于或等于上一个活动结束时间的活动',
      '重复直到所有活动都被考虑',
    ],
    code: `interface Activity {
  start: number;
  end: number;
}

function activitySelection(activities: Activity[]): Activity[] {
  // 按结束时间升序排序
  activities.sort((a, b) => a.end - b.end);

  const selected: Activity[] = [];
  let lastEnd = -1;

  for (const act of activities) {
    if (act.start >= lastEnd) {
      selected.push(act);
      lastEnd = act.end;
    }
  }

  return selected;
}

// 示例使用
const activities = [
  { start: 1, end: 4 },
  { start: 3, end: 5 },
  { start: 0, end: 6 },
  { start: 5, end: 7 },
  { start: 8, end: 9 }
];
console.log(activitySelection(activities));
// 输出: [{start:1,end:4}, {start:5,end:7}, {start:8,end:9}]`,
    example: {
      input: 'activities = [[1,4], [3,5], [0,6], [5,7], [8,9]]',
      output: '3个活动',
      explanation: '可以选择活动 [1,4]、[5,7] 和 [8,9]',
    },
    applications: '会议室安排、课程表安排、任务调度',
    timeComplexity: 'O(n log n) 主要来自排序',
    spaceComplexity: 'O(1) 如果不考虑结果存储',
  },
  {
    id: 4,
    title: '跳跃游戏',
    desc: '判断能否到达数组末尾',
    problem:
      '给定一个非负整数数组 nums，你最初位于数组的第一个下标。数组中的每个元素代表你在该位置可以跳跃的最大长度。判断你是否能够到达最后一个下标。',
    difficulty: 'medium',
    diffText: '中等',
    tags: ['数组', '贪心算法'],
    greedyStrategy: '维护当前能到达的最远位置，并不断更新',
    steps: [
      '初始化最远位置为0',
      '遍历数组中的每个位置',
      '如果当前位置可达（位置索引 <= 当前最远位置），更新最远位置为 max(当前最远位置, 当前位置 + 跳跃长度)',
      '如果最远位置 >= 最后一个位置索引，返回true',
      '如果遍历结束仍未到达末尾，返回false',
    ],
    code: `function canJump(nums: number[]): boolean {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    // 如果当前位置已经超过能到达的最远位置
    if (i > maxReach) return false;

    // 更新能到达的最远位置
    maxReach = Math.max(maxReach, i + nums[i]);

    // 如果已经可以到达末尾
    if (maxReach >= nums.length - 1) return true;
  }

  return false;
}

// 示例使用
console.log(canJump([2, 3, 1, 1, 4])); // true
console.log(canJump([3, 2, 1, 0, 4])); // false`,
    example: {
      input: '[2, 3, 1, 1, 4]',
      output: 'true',
      explanation: '从索引0跳1步到索引1，然后跳3步到索引4',
    },
    applications: '游戏AI路径规划、机器人移动、网络路由',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 5,
    title: '买卖股票的最佳时机 II',
    desc: '多次买卖股票获取最大利润',
    problem:
      '给定一个数组 prices，其中 prices[i] 表示某支股票第 i 天的价格。你可以在任何时候买入或卖出股票，但最多只能持有一股股票。计算你能获得的最大利润。',
    difficulty: 'easy',
    diffText: '简单',
    tags: ['数组', '贪心算法'],
    greedyStrategy: '所有上升区间的利润之和就是最大利润',
    steps: [
      '初始化利润为0',
      '从第2天开始遍历',
      '如果当天价格高于前一天价格，将差价加入利润',
      '遍历结束后返回总利润',
    ],
    code: `function maxProfit(prices: number[]): number {
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }

  return profit;
}

// 示例使用
console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 输出: 7
console.log(maxProfit([1, 2, 3, 4, 5]));    // 输出: 4`,
    example: {
      input: '[7,1,5,3,6,4]',
      output: '7',
      explanation:
        '第2天买入(1)，第3天卖出(5) -> 利润4；第4天买入(3)，第5天卖出(6) -> 利润3；总利润7',
    },
    applications: '股票交易策略、金融分析、投资决策',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 6,
    title: '分发饼干',
    desc: '满足尽可能多的孩子',
    problem:
      '有一群孩子和一堆饼干，每个孩子有一个胃口值，每个饼干有一个大小。每个孩子最多只能分到一块饼干，且饼干的大小必须大于等于孩子的胃口值。求最多可以满足多少孩子。',
    difficulty: 'easy',
    diffText: '简单',
    tags: ['贪心算法', '双指针'],
    greedyStrategy: '优先满足胃口小的孩子',
    steps: [
      '将孩子胃口数组和饼干大小数组排序',
      '初始化两个指针分别指向孩子和饼干数组的开头',
      '遍历饼干数组，尝试满足当前孩子',
      '如果当前饼干能满足当前孩子，两个指针都前进',
      '如果不能满足，只前进饼干指针',
      '返回满足的孩子数量',
    ],
    code: `function findContentChildren(g: number[], s: number[]): number {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);

  let child = 0;
  let cookie = 0;

  while (child < g.length && cookie < s.length) {
    if (s[cookie] >= g[child]) {
      child++;
    }
    cookie++;
  }

  return child;
}

// 示例使用
console.log(findContentChildren([1,2,3], [1,1])); // 1
console.log(findContentChildren([1,2], [1,2,3])); // 2`,
    example: {
      input: 'g=[1,2,3], s=[1,1]',
      output: '1',
      explanation: '只能满足胃口为1的孩子',
    },
    applications: '资源分配、任务调度、需求匹配',
    timeComplexity: 'O(n log n) 主要来自排序',
    spaceComplexity: 'O(1)',
  },
  {
    id: 7,
    title: '无重叠区间',
    desc: '移除最小区间使所有区间不重叠',
    problem:
      '给定一个区间集合 intervals，其中 intervals[i] = [start_i, end_i]。找到需要移除区间的最小数量，使剩余区间互不重叠。',
    difficulty: 'medium',
    diffText: '中等',
    tags: ['区间调度', '贪心算法'],
    greedyStrategy: '优先保留结束早的区间',
    steps: [
      '按结束时间对所有区间进行升序排序',
      '初始化计数器和上一个保留区间的结束时间',
      '遍历排序后的区间',
      '如果当前区间与上一个保留区间不重叠，保留该区间并更新结束时间',
      '否则移除该区间',
      '返回移除的区间数量',
    ],
    code: `function eraseOverlapIntervals(intervals: number[][]): number {
  if (intervals.length === 0) return 0;

  // 按结束时间升序排序
  intervals.sort((a, b) => a[1] - b[1]);

  let count = 0;
  let lastEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < lastEnd) {
      // 有重叠，需要移除
      count++;
    } else {
      // 没有重叠，更新结束时间
      lastEnd = intervals[i][1];
    }
  }

  return count;
}

// 示例使用
console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // 1
console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]]));      // 2`,
    example: {
      input: '[[1,2],[2,3],[3,4],[1,3]]',
      output: '1',
      explanation: '移除[1,3]可以使其他区间不重叠',
    },
    applications: '日程安排、资源分配、时间线管理',
    timeComplexity: 'O(n log n) 主要来自排序',
    spaceComplexity: 'O(1)',
  },
  {
    id: 8,
    title: '任务调度器',
    desc: '安排任务并计算最短时间',
    problem:
      '给定一个用字符数组表示的CPU需要执行的任务列表。任务用大写字母A-Z表示。任务可以以任意顺序执行，并且每个任务都可以在1个单位时间内执行完。两个相同种类的任务之间必须有长度为n的冷却时间，求完成所有任务所需要的最短时间。',
    difficulty: 'hard',
    diffText: '困难',
    tags: ['贪心算法', '数组'],
    greedyStrategy: '优先安排数量最多的任务',
    steps: [
      '统计每个任务出现的次数',
      '找到出现次数最多的任务，假设次数为max',
      '计算空闲槽的数量：idleSlots = (max - 1) * n',
      '遍历其他任务，用它们填充空闲槽',
      '总时间 = 任务总数 + 剩余的空闲槽数量',
    ],
    code: `function leastInterval(tasks: string[], n: number): number {
  const freq = new Array(26).fill(0);
  for (const task of tasks) {
    freq[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
  }

  freq.sort((a, b) => b - a); // 降序排序

  const maxFreq = freq[0];
  let idleSlots = (maxFreq - 1) * n;

  for (let i = 1; i < freq.length && idleSlots > 0; i++) {
    idleSlots -= Math.min(maxFreq - 1, freq[i]);
  }

  idleSlots = Math.max(0, idleSlots);

  return tasks.length + idleSlots;
}

// 示例使用
console.log(leastInterval(["A","A","A","B","B","B"], 2)); // 8
console.log(leastInterval(["A","A","A","B","B","B"], 0)); // 6`,
    example: {
      input: `tasks = ["A","A","A","B","B","B"], n = 2`,
      output: '8',
      explanation: '一种可能的执行顺序: A -> B -> 待命 -> A -> B -> 待命 -> A -> B',
    },
    applications: 'CPU任务调度、工作流优化、生产排程',
    timeComplexity: 'O(n) 统计频率 + O(1) 排序（26个字母）',
    spaceComplexity: 'O(1) 固定大小数组',
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

function coinChange(coins: number[], amount: number): number {
  coins.sort((a, b) => b - a) // 降序排序
  let count = 0
  let remaining = amount

  for (const coin of coins) {
    if (remaining === 0) break
    if (coin <= remaining) {
      const num = Math.floor(remaining / coin)
      count += num
      remaining -= num * coin
    }
  }

  return remaining === 0 ? count : -1
}
console.log(coinChange([5], 7))
</script>

<style scoped lang="less">


// 颜色变量
@primary: #4361ee;
@primary-light: #eef1fe;
@secondary: #7209b7;
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

.greedy-container {
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

    .code-block {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
      color: #333;
      border: 1px solid @border-color;
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
