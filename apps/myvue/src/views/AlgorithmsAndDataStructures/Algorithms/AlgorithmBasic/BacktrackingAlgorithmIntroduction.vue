<template>
  <div class="backtracking-guide">
    <header>
      <h1>回溯算法精解</h1>
      <p>探索算法设计中的"试错与回退"艺术</p>
    </header>

    <main>
      <!-- 算法介绍 -->
      <section class="introduction">
        <div class="content">
          <div class="definition">
            <h2>什么是回溯算法？</h2>
            <p>回溯算法是一种通过<strong>试错</strong>来寻找问题解决方案的算法。它尝试分步解决一个问题，当发现当前步骤不能得到有效的解时，就<strong>回溯</strong>到上一步尝试其他选项。</p>
          </div>

          <div class="analogy">
            <div class="maze-container">
              <div class="maze">
                <div v-for="(row, i) in maze" :key="i" class="maze-row">
                  <div v-for="(cell, j) in row" :key="j" :class="[
                    'maze-cell',
                    cell === 1 ? 'wall' : '',
                    path.some(p => p[0] === i && p[1] === j) ? 'path' : '',
                    i === start[0] && j === start[1] ? 'start' : '',
                    i === end[0] && j === end[1] ? 'end' : ''
                  ]">
                  </div>
                </div>
              </div>
            </div>
            <div class="analogy-text">
              <h3>回溯算法类比</h3>
              <p>想象你在一个迷宫中寻找出口：</p>
              <ul>
                <li>选择一个方向前进</li>
                <li>遇到死胡同时返回上一个岔路口</li>
                <li>尝试另一个未探索的路径</li>
                <li>重复直到找到出口</li>
              </ul>
              <button @click="solveMaze">解决迷宫</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 算法框架 -->
      <section class="algorithm-framework">
        <h2>回溯算法框架</h2>
        <div class="framework">
          <div class="code-block">
            <pre><code>function backtrack(选择列表, 路径) {
  if (满足结束条件) {
    将路径加入结果集;
    return;
  }

  for (选择 of 选择列表) {
    做出选择;
    backtrack(新的选择列表, 新的路径);
    撤销选择; // 回溯关键步骤
  }
}</code></pre>
          </div>
          <div class="explanation">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>路径</h3>
                <p>记录已经做出的选择</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>选择列表</h3>
                <p>当前可以做的选择</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>结束条件</h3>
                <p>到达决策树底层，无法再做选择</p>
              </div>
            </div>
          </div>
        </div>

        <div class="key-features">
          <div class="feature">
            <div class="icon">🔄</div>
            <h3>递归结构</h3>
            <p>通过递归实现深度优先搜索</p>
          </div>
          <div class="feature">
            <div class="icon">↩️</div>
            <h3>撤销操作</h3>
            <p>回溯的关键是撤销最后的选择</p>
          </div>
          <div class="feature">
            <div class="icon">✂️</div>
            <h3>剪枝优化</h3>
            <p>提前排除无效路径减少计算</p>
          </div>
        </div>
      </section>

      <!-- 经典问题 -->
      <section class="classic-problems">
        <h2>回溯经典问题</h2>
        <div class="problems">
          <div class="problem">
            <div class="problem-header">
              <h3>全排列问题</h3>
              <div class="tags">
                <span>排列组合</span>
                <span>递归</span>
              </div>
            </div>
            <p>给定一个不含重复数字的数组，返回所有可能的排列</p>
            <div class="visualization">
              <div class="permutation-tree">
                <div class="tree-node root">Start</div>
                <div class="tree-level">
                  <div class="tree-node">1</div>
                  <div class="tree-node">2</div>
                  <div class="tree-node">3</div>
                </div>
                <div class="tree-level">
                  <div class="tree-node">2</div>
                  <div class="tree-node">3</div>
                  <div class="tree-node">1</div>
                  <div class="tree-node">3</div>
                  <div class="tree-node">1</div>
                  <div class="tree-node">2</div>
                </div>
                <div class="tree-level">
                  <div class="tree-node">3</div>
                  <div class="tree-node">2</div>
                  <div class="tree-node">3</div>
                  <div class="tree-node">1</div>
                  <div class="tree-node">2</div>
                  <div class="tree-node">1</div>
                </div>
                <div class="tree-results">
                  <div class="result">[1,2,3]</div>
                  <div class="result">[1,3,2]</div>
                  <div class="result">[2,1,3]</div>
                  <div class="result">[2,3,1]</div>
                  <div class="result">[3,1,2]</div>
                  <div class="result">[3,2,1]</div>
                </div>
              </div>
            </div>
            <div class="code-block">
              <pre><code>function permute(nums: number[]): number[][] {
  const result: number[][] = [];

  function backtrack(path: number[]) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (path.includes(nums[i])) continue; // 剪枝：已使用的数字跳过
      path.push(nums[i]);      // 做出选择
      backtrack(path);         // 递归
      path.pop();              // 撤销选择
    }
  }

  backtrack([]);
  return result;
}</code></pre>
            </div>
          </div>

          <div class="problem">
            <div class="problem-header">
              <h3>N皇后问题</h3>
              <div class="tags">
                <span>约束满足</span>
                <span>经典难题</span>
              </div>
            </div>
            <p>在N×N的棋盘上放置N个皇后，使其不能互相攻击</p>
            <div class="visualization">
              <div class="queens-board">
                <div v-for="i in 4" :key="i" class="row">
                  <div v-for="j in 4" :key="j" :class="['cell', (i + j) % 2 === 0 ? 'light' : 'dark']">
                    <div v-if="queenPositions.some(pos => pos[0] === i - 1 && pos[1] === j - 1)" class="queen">♛</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="code-block">
              <pre><code>function solveNQueens(n: number): string[][] {
  const result: string[][] = [];
  const board = Array(n).fill(null).map(() => Array(n).fill('.'));

  function isValid(row: number, col: number): boolean {
    // 检查同一列
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }

    // 检查左上对角线
    for (let i = row-1, j = col-1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }

    // 检查右上对角线
    for (let i = row-1, j = col+1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }

    return true;
  }

  function backtrack(row: number) {
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (!isValid(row, col)) continue; // 剪枝

      board[row][col] = 'Q';  // 放置皇后
      backtrack(row + 1);      // 下一行
      board[row][col] = '.';  // 撤销放置
    }
  }

  backtrack(0);
  return result;
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="use-cases">
        <h2>回溯算法应用场景</h2>
        <div class="cases">
          <div class="case">
            <div class="icon">🧩</div>
            <h3>组合问题</h3>
            <p>从n个元素中找出k个元素的组合</p>
            <p class="example">C(n, k) = n! / (k!(n-k)!)</p>
          </div>
          <div class="case">
            <div class="icon">🔢</div>
            <h3>排列问题</h3>
            <p>求n个元素的所有可能的排列</p>
            <p class="example">P(n) = n!</p>
          </div>
          <div class="case">
            <div class="icon">🎯</div>
            <h3>子集问题</h3>
            <p>求一个集合的所有子集</p>
            <p class="example">2^n 个子集</p>
          </div>
          <div class="case">
            <div class="icon">♟️</div>
            <h3>棋盘问题</h3>
            <p>N皇后、数独、骑士巡游等</p>
            <p class="example">约束满足问题</p>
          </div>
          <div class="case">
            <div class="icon">🔍</div>
            <h3>分割问题</h3>
            <p>字符串分割、划分等份子集</p>
            <p class="example">回文分割、等和子集</p>
          </div>
          <div class="case">
            <div class="icon">🔄</div>
            <h3>路径问题</h3>
            <p>在矩阵中寻找特定路径</p>
            <p class="example">迷宫寻路、单词搜索</p>
          </div>
        </div>
      </section>

      <!-- 优化策略 -->
      <section class="optimization">
        <h2>回溯算法优化策略</h2>
        <div class="strategies">
          <div class="strategy">
            <div class="number">1</div>
            <h3>剪枝 (Pruning)</h3>
            <p>提前排除不可能的解，减少递归深度</p>
            <p class="example">N皇后问题中检查对角线冲突</p>
          </div>
          <div class="strategy">
            <div class="number">2</div>
            <h3>记忆化 (Memoization)</h3>
            <p>缓存中间结果避免重复计算</p>
            <p class="example">子集问题中避免重复子集</p>
          </div>
          <div class="strategy">
            <div class="number">3</div>
            <h3>迭代加深 (Iterative Deepening)</h3>
            <p>逐步增加搜索深度限制</p>
            <p class="example">用于深度未知的问题</p>
          </div>
          <div class="strategy">
            <div class="number">4</div>
            <h3>启发式搜索 (Heuristics)</h3>
            <p>优先选择更可能的方向</p>
            <p class="example">在迷宫问题中优先选择主方向</p>
          </div>
        </div>
      </section>

      <!-- 复杂度分析 -->
      <section class="complexity">
        <h2>回溯算法复杂度分析</h2>
        <div class="complexity-content">
          <div class="chart">
            <div class="complexity-level">
              <div class="label">指数级 O(2ⁿ)</div>
              <div class="bar exponential"></div>
            </div>
            <div class="complexity-level">
              <div class="label">阶乘级 O(n!)</div>
              <div class="bar factorial"></div>
            </div>
            <div class="complexity-level">
              <div class="label">组合级 O(C(n,k))</div>
              <div class="bar combinatorial"></div>
            </div>
            <div class="complexity-level">
              <div class="label">多项式 O(nᵏ)</div>
              <div class="bar polynomial"></div>
            </div>
          </div>
          <div class="explanation">
            <p>回溯算法的时间复杂度通常较高，主要取决于：</p>
            <ul>
              <li><strong>问题规模</strong>：输入大小n</li>
              <li><strong>决策树深度</strong>：递归的最大深度</li>
              <li><strong>每个节点的分支数</strong>：每个递归步骤的选择数</li>
              <li><strong>剪枝效率</strong>：排除无效路径的能力</li>
            </ul>
            <p>空间复杂度主要取决于递归调用栈的深度，通常为O(n)</p>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p> 回溯算法精解 | 探索算法设计的艺术</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 迷宫演示数据
const maze = ref([
  [0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0]
]);

const path = ref<number[][]>([]);
const start = ref([0, 0]);
const end = ref([4, 4]);

// 解决迷宫问题（简化演示）
const solveMaze = () => {
  path.value = [];
  const steps = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 4], [2, 4], [2, 3], [2, 2], [2, 1],
    [2, 0], [3, 0], [4, 0], [4, 1], [4, 2],
    [4, 3], [4, 4]
  ];

  let i = 0;
  const interval = setInterval(() => {
    if (i < steps.length) {
      path.value.push(steps[i]);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 300);
};

// N皇后位置（4x4棋盘的一个解）
const queenPositions = ref([
  [0, 1], [1, 3], [2, 0], [3, 2]
]);

// 初始化
onMounted(() => {
  path.value = [start.value];
});
</script>

<style lang="less" scoped>
@primary: #8a2be2;
@secondary: #6a0dad;
@accent: #b19cd9;
@light: #f9f5ff;
@dark: #2c0a4d;
@wall: #4a4a8a;
@path: #ff6b6b;
@start: #38b000;
@end: #ff9e00;

// 基础样式
.backtracking-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: @dark;
  line-height: 1.6;
  background: linear-gradient(to bottom, #f0e6ff, #ffffff);

  header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: @primary;
    color: white;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(@primary, 0.3);

    h1 {
      font-size: 2.8rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }
  }

  section {
    margin-bottom: 3rem;
    padding: 2.5rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    border: 1px solid #e9e1ff;

    h2 {
      font-size: 2rem;
      margin-bottom: 1.8rem;
      padding-bottom: 0.8rem;
      border-bottom: 3px solid @accent;
      color: @secondary;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 100px;
        height: 3px;
        background: @primary;
      }
    }
  }
}

// 介绍部分
.introduction {
  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .definition {
    h2 {
      font-size: 2.2rem;
      margin-bottom: 1.5rem;
      color: @primary;
      border: none;

      &::after {
        display: none;
      }
    }

    p {
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 1.5rem;

      strong {
        color: @primary;
        font-weight: 600;
      }
    }
  }

  .analogy {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .maze-container {
      background: #f0e6ff;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .maze {
      display: inline-block;
      border: 3px solid @secondary;
      background: white;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .maze-row {
      display: flex;
    }

    .maze-cell {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #d9c8ff;
      position: relative;

      &.wall {
        background: @wall;
        box-shadow: inset 0 0 10px darken(@wall, 20%);
      }

      &.path {
        background: @path;
        animation: pulse 1.5s infinite;

        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
      }

      &.start {
        background: @start;

        &::after {
          content: "S";
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
        }
      }

      &.end {
        background: @end;

        &::after {
          content: "E";
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
        }
      }
    }

    .analogy-text {
      h3 {
        color: @secondary;
        margin-top: 0;
      }

      ul {
        padding-left: 1.2rem;
        margin: 1.2rem 0;

        li {
          margin-bottom: 0.8rem;
          position: relative;
          padding-left: 1.5rem;

          &::before {
            content: "•";
            color: @primary;
            position: absolute;
            left: 0;
            font-size: 1.5rem;
            line-height: 1;
          }
        }
      }

      button {
        padding: 0.8rem 1.8rem;
        background: @primary;
        color: white;
        border: none;
        border-radius: 30px;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 4px 10px rgba(@primary, 0.3);

        &:hover {
          background: darken(@primary, 10%);
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(@primary, 0.4);
        }
      }
    }
  }
}

// 算法框架部分
.algorithm-framework {
  .framework {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .code-block {
    background: #2d1a4a;
    border-radius: 12px;
    padding: 1.8rem;
    overflow: auto;

    pre {
      margin: 0;

      code {
        font-family: 'Fira Code', monospace;
        color: #e2d1ff;
        font-size: 1rem;
        line-height: 1.6;
      }
    }
  }

  .explanation {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    .step {
      display: flex;
      gap: 1.2rem;
      align-items: center;
      background: #f5f0ff;
      border-radius: 12px;
      padding: 1.2rem;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      }

      .step-number {
        width: 42px;
        height: 42px;
        background: @primary;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        font-weight: bold;
        flex-shrink: 0;
      }

      h3 {
        margin: 0 0 0.3rem;
        color: @secondary;
      }

      p {
        margin: 0;
        color: #6a5a8a;
      }
    }
  }

  .key-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;

    .feature {
      text-align: center;
      padding: 1.8rem;
      background: linear-gradient(135deg, #f0e6ff, #e2d1ff);
      border-radius: 16px;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
      }

      .icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0.5rem 0;
        color: @secondary;
      }
    }
  }
}

// 经典问题部分
.classic-problems {
  .problems {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .problem {
    background: #f9f5ff;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.2rem;

      h3 {
        margin: 0;
        color: @primary;
        font-size: 1.5rem;
      }
    }

    .tags {
      display: flex;
      gap: 0.5rem;

      span {
        padding: 0.3rem 0.8rem;
        background: #e2d1ff;
        border-radius: 20px;
        font-size: 0.85rem;
        color: @secondary;
      }
    }

    p {
      color: #5a4a7a;
      margin-bottom: 1.5rem;
    }

    .visualization {
      margin: 1.5rem 0;
      padding: 1.5rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    }
  }

  .permutation-tree {
    text-align: center;

    .tree-node {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      background: #e2d1ff;
      border-radius: 50%;
      margin: 0 10px 20px;
      font-weight: bold;
      color: @secondary;
      position: relative;

      &.root {
        background: @primary;
        color: white;
      }
    }

    .tree-level {
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: -20px;
        left: 0;
        right: 0;
        height: 2px;
        background: #d9c8ff;
      }
    }

    .tree-results {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.8rem;
      margin-top: 1rem;

      .result {
        padding: 0.5rem 1rem;
        background: #b19cd9;
        color: white;
        border-radius: 6px;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
      }
    }
  }

  .queens-board {
    display: inline-block;
    border: 3px solid @secondary;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

    .row {
      display: flex;
    }

    .cell {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;

      &.light {
        background: #f0e6ff;
      }

      &.dark {
        background: #d9c8ff;
      }
    }

    .queen {
      font-size: 2rem;
      color: @primary;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }

  .code-block {
    background: #2d1a4a;
    border-radius: 12px;
    padding: 1.5rem;
    overflow: auto;
    margin-top: 1.5rem;

    pre {
      margin: 0;

      code {
        font-family: 'Fira Code', monospace;
        color: #e2d1ff;
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }
  }
}

// 使用场景部分
.use-cases {
  .cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .case {
    text-align: center;
    padding: 2rem 1.5rem;
    background: linear-gradient(135deg, #f8f4ff, #eae1ff);
    border-radius: 16px;
    transition: all 0.3s;
    border: 1px solid #e9e1ff;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }

    .icon {
      font-size: 2.8rem;
      margin-bottom: 1.2rem;
      color: @primary;
    }

    h3 {
      margin: 0.5rem 0;
      color: @secondary;
    }

    .example {
      margin: 0.8rem 0 0;
      font-family: 'Fira Code', monospace;
      color: #7a6a9a;
      font-weight: 500;
    }
  }
}

// 优化策略部分
.optimization {
  .strategies {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.8rem;
  }

  .strategy {
    display: flex;
    gap: 1.2rem;
    align-items: flex-start;
    padding: 1.8rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    border-left: 4px solid @primary;

    .number {
      width: 40px;
      height: 40px;
      background: @primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    h3 {
      margin: 0 0 0.5rem;
      color: @secondary;
    }

    .example {
      margin: 0.5rem 0 0;
      font-style: italic;
      color: #7a6a9a;
      font-size: 0.95rem;
    }
  }
}

// 复杂度分析部分
.complexity {
  .complexity-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .chart {
    padding: 1.5rem;
    background: #f9f5ff;
    border-radius: 16px;
  }

  .complexity-level {
    margin-bottom: 1.2rem;

    .label {
      font-weight: 500;
      margin-bottom: 0.5rem;
      color: @secondary;
    }

    .bar {
      height: 30px;
      border-radius: 6px;

      &.exponential {
        width: 95%;
        background: linear-gradient(to right, #ff6b6b, #ef476f);
      }

      &.factorial {
        width: 80%;
        background: linear-gradient(to right, #ff9e00, #ff6b6b);
      }

      &.combinatorial {
        width: 65%;
        background: linear-gradient(to right, #ffd166, #ff9e00);
      }

      &.polynomial {
        width: 50%;
        background: linear-gradient(to right, #b19cd9, #ffd166);
      }
    }
  }

  .explanation {
    padding: 1.5rem;
    background: #f0e6ff;
    border-radius: 16px;

    p {
      line-height: 1.8;
    }

    ul {
      padding-left: 1.5rem;
      margin: 1.2rem 0;

      li {
        margin-bottom: 0.8rem;
        position: relative;
        padding-left: 1.8rem;

        &::before {
          content: "•";
          color: @primary;
          position: absolute;
          left: 0;
          font-size: 1.8rem;
          line-height: 1;
        }
      }
    }
  }
}

// 页脚
footer {
  text-align: center;
  margin-top: 4rem;
  padding-top: 2rem;
  color: #7a6a9a;
  font-size: 0.95rem;
  border-top: 1px solid #e9e1ff;
}

// 动画
@keyframes pulse {
  0% {
    opacity: 0.7;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.7;
  }
}
</style>
