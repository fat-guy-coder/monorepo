<template>
  <div class="backtracking-container">
    <header class="header">
      <h1>回溯算法解题指南</h1>
      <p class="subtitle">探索问题求解的通用框架与经典案例</p>
    </header>

    <div class="content">
      <div class="columns">
        <div class="column intro-column">
          <section class="intro-card">
            <div class="card-header">
              <h2>回溯算法核心概念</h2>
              <div class="algorithm-icon">
                <svg width="48" height="48" viewBox="0 0 24 24">
                  <path fill="#4f5bd5"
                    d="M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z" />
                </svg>
              </div>
            </div>
            <div class="card-content">
              <p>回溯法是暴力搜索的一种优化，通过"尝试-回溯"的方式系统地遍历所有可能的解。</p>

              <div class="backtrack-process">
                <div class="step">
                  <div class="step-icon">1</div>
                  <h3>选择路径</h3>
                  <p>做出一个选择，进入下一层决策树</p>
                </div>
                <div class="step">
                  <div class="step-icon">2</div>
                  <h3>约束条件</h3>
                  <p>检查当前选择是否满足条件</p>
                </div>
                <div class="step">
                  <div class="step-icon">3</div>
                  <h3>目标判断</h3>
                  <p>检查是否达到目标状态</p>
                </div>
                <div class="step">
                  <div class="step-icon">4</div>
                  <h3>回溯撤销</h3>
                  <p>撤销选择，尝试其他路径</p>
                </div>
              </div>

              <p class="highlight-box">时间复杂度通常为 O(2<sup>n</sup>) 或 O(n!)，适合解决组合、排列、子集等问题</p>
            </div>
          </section>

          <section class="pattern-section">
            <h3>通用解题模板</h3>
            <pre class="pattern-code">function backtrack(路径, 选择列表) {
  if (满足结束条件) {
    将路径添加到结果集;
    return;
  }

  for (选择 in 选择列表) {
    if (不满足约束条件) continue; // 剪枝

    做选择;
    backtrack(新路径, 新选择列表);
    撤销选择;
  }
}</pre>
          </section>
        </div>

        <div class="column">
          <section class="problem-section">
            <h2>经典回溯问题解析</h2>

            <div class="problem-card">
              <div class="problem-header">
                <h3>1. 全排列问题</h3>
                <div class="difficulty easy">中等</div>
              </div>
              <p class="problem-desc">给定一个不含重复数字的数组，返回其所有可能的全排列</p>

              <div class="problem-solution">
                <div class="code-block">
                  <div class="code-header">解题思路</div>
                  <ul>
                    <li>使用路径数组记录当前排列</li>
                    <li>使用visited数组标记已使用的数字</li>
                    <li>当路径长度等于原数组长度时，保存结果</li>
                    <li>回溯时撤销选择和标记</li>
                  </ul>
                </div>

                <div class="code-block">
                  <div class="code-header">代码实现</div>
                  <pre>function permute(nums: number[]): number[][] {
  const res: number[][] = [];
  const visited = new Array(nums.length).fill(false);

  function backtrack(path: number[]) {
    if (path.length === nums.length) {
      res.push([...path]); // 保存当前排列
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (visited[i]) continue; // 跳过已使用的数字

      // 做选择
      visited[i] = true;
      path.push(nums[i]);

      // 进入下一层决策树
      backtrack(path);

      // 撤销选择
      path.pop();
      visited[i] = false;
    }
  }

  backtrack([]);
  return res;
}</pre>
                </div>
              </div>
            </div>

            <div class="problem-card">
              <div class="problem-header">
                <h3>2. N皇后问题</h3>
                <div class="difficulty hard">困难</div>
              </div>
              <p class="problem-desc">在n×n的棋盘上放置n个皇后，使其不能相互攻击</p>

              <div class="problem-solution">
                <div class="code-block">
                  <div class="code-header">解题思路</div>
                  <ul>
                    <li>按行放置皇后，每行只能放一个</li>
                    <li>使用三个集合记录列、主对角线和副对角线的占用情况</li>
                    <li>当前位置满足约束条件时才放置皇后</li>
                    <li>成功放置n个皇后时保存解法</li>
                  </ul>
                </div>

                <div class="code-block">
                  <div class="code-header">代码实现</div>
                  <pre>function solveNQueens(n: number): string[][] {
  const res: string[][] = [];
  // 初始化棋盘
  const board = Array(n).fill(null).map(() => Array(n).fill('.'));

  // 列、主对角线、副对角线的占用情况
  const colUsed = new Set &lt;number&gt;();
  const mainDiag = new Set &lt;number&gt;(); // row - col
  const antiDiag = new Set &lt;number&gt;(); // row + col

  function backtrack(row: number) {
    if (row === n) {
      // 保存解法
      res.push(board.map(row => row.join('')));
      return;
    }

    for (let col = 0; col < n; col++) {
      // 检查约束条件
      if (colUsed.has(col)) continue;
      if (mainDiag.has(row - col)) continue;
      if (antiDiag.has(row + col)) continue;

      // 放置皇后
      board[row][col] = 'Q';
      colUsed.add(col);
      mainDiag.add(row - col);
      antiDiag.add(row + col);

      // 下一行
      backtrack(row + 1);

      // 回溯
      board[row][col] = '.';
      colUsed.delete(col);
      mainDiag.delete(row - col);
      antiDiag.delete(row + col);
    }
  }

  backtrack(0);
  return res;
}</pre>
                </div>
              </div>
            </div>

            <div class="problem-card">
              <div class="problem-header">
                <h3>3. 组合总和问题</h3>
                <div class="difficulty medium">中等</div>
              </div>
              <p class="problem-desc">找出所有和为target的数字组合，数字可重复使用</p>

              <div class="problem-solution">
                <div class="code-block">
                  <div class="code-header">解题思路</div>
                  <ul>
                    <li>排序数组便于剪枝</li>
                    <li>记录当前路径和与目标值的差值</li>
                    <li>当差值为0时保存路径</li>
                    <li>当差值小于0或遍历完成后停止</li>
                    <li>通过起始索引避免重复组合</li>
                  </ul>
                </div>

                <div class="code-block">
                  <div class="code-header">代码实现</div>
                  <pre>function combinationSum(candidates: number[], target: number): number[][] {
  const res: number[][] = [];
  candidates.sort((a, b) => a - b); // 排序便于剪枝

  function backtrack(start: number, path: number[], remain: number) {
    if (remain === 0) {
      res.push([...path]); // 保存有效组合
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      // 剪枝：剩余值小于当前数字
      if (remain < candidates[i]) break;

      path.push(candidates[i]);
      // 递归：数字可重复使用，所以起始索引仍为i
      backtrack(i, path, remain - candidates[i]);
      path.pop(); // 回溯
    }
  }

  backtrack(0, [], target);
  return res;
}</pre>
                </div>
              </div>
            </div>

            <div class="problem-card">
              <div class="problem-header">
                <h3>4. 子集问题</h3>
                <div class="difficulty medium">中等</div>
              </div>
              <p class="problem-desc">给定不含重复元素的数组，返回所有可能的子集</p>

              <div class="problem-solution">
                <div class="code-block">
                  <div class="code-header">解题思路</div>
                  <ul>
                    <li>子集问题等价于对每个元素做"选"或"不选"的决策</li>
                    <li>通过起始索引避免重复子集</li>
                    <li>每次递归都保存当前路径</li>
                    <li>不需要显式结束条件，遍历完成自动结束</li>
                  </ul>
                </div>

                <div class="code-block">
                  <div class="code-header">代码实现</div>
                  <pre>function subsets(nums: number[]): number[][] {
  const res: number[][] = [];

  function backtrack(start: number, path: number[]) {
    res.push([...path]); // 保存当前子集

    for (let i = start; i < nums.length; i++) {
      // 选择当前元素
      path.push(nums[i]);

      // 递归下一层，索引i+1避免重复
      backtrack(i + 1, path);

      // 回溯，撤销选择
      path.pop();
    }
  }

  backtrack(0, []);
  return res;
}</pre>
                </div>
              </div>
            </div>

            <div class="problem-card">
              <div class="problem-header">
                <h3>5. 单词搜索</h3>
                <div class="difficulty medium">中等</div>
              </div>
              <p class="problem-desc">在二维字母表中查找给定单词是否存在</p>

              <div class="problem-solution">
                <div class="code-block">
                  <div class="code-header">解题思路</div>
                  <ul>
                    <li>遍历网格的每个单元格作为起点</li>
                    <li>深度优先搜索四个方向</li>
                    <li>使用visited标记访问过的位置</li>
                    <li>字符匹配失败时及时回溯</li>
                  </ul>
                </div>

                <div class="code-block">
                  <div class="code-header">代码实现</div>
                  <pre>function exist(board: string[][], word: string): boolean {
  const m = board.length, n = board[0].length;
  const visited = Array(m).fill(null)
                    .map(() => Array(n).fill(false));

  // 方向数组：上右下左
  const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  function dfs(i: number, j: number, idx: number): boolean {
    // 找到完整单词
    if (idx === word.length) return true;

    // 检查边界和访问状态
    if (i < 0 || i >= m || j < 0 || j >= n ||
        visited[i][j] || board[i][j] !== word[idx]) {
      return false;
    }

    visited[i][j] = true; // 标记访问

    // 探索四个方向
    for (const [dx, dy] of dirs) {
      if (dfs(i + dx, j + dy, idx + 1))
        return true;
    }

    visited[i][j] = false; // 回溯，取消标记
    return false;
  }

  // 遍历每个点作为起点
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }

  return false;
}</pre>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>回溯算法总结：明确路径选择 → 设计约束剪枝 → 定义目标状态 → 回溯恢复现场</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

.backtracking-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
  background: linear-gradient(135deg, #fafbff 0%, #f0f4ff 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 128, 0.08);
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2e3a8c;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, #2e3a8c 0%, #4f5bd5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #6b7280;
    font-weight: 400;
  }
}

.content {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.columns {
  display: flex;
  gap: 2rem;
}

.column {
  flex: 1;

  &.intro-column {
    max-width: 320px;
  }
}

.intro-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(99, 102, 241, 0.1);
  margin-bottom: 2rem;
  border: 1px solid #e0e7ff;

  .card-header {
    background: linear-gradient(135deg, #4f5bd5 0%, #2e3a8c 100%);
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      color: white;
      font-size: 1.5rem;
      margin: 0;
      flex: 1;
    }
  }

  .algorithm-icon {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 0.5rem;
  }
}

.card-content {
  padding: 1.8rem;

  p {
    color: #4b5563;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
}

.backtrack-process {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 1.5rem 0;

  .step {
    display: flex;
    align-items: flex-start;

    .step-icon {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #4f5bd5 0%, #2e3a8c 100%);
      border-radius: 50%;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      font-weight: 600;
      flex-shrink: 0;
      margin-right: 1rem;
      margin-top: 0.2rem;
    }

    h3 {
      font-size: 1.15rem;
      color: #2e3a8c;
      margin-bottom: 0.3rem;
    }

    p {
      color: #6b7280;
      font-size: 0.95rem;
      margin-bottom: 0;
    }
  }
}

.highlight-box {
  background: #f0f5ff;
  border-left: 4px solid #4f5bd5;
  padding: 1rem;
  border-radius: 0 8px 8px 0;
  font-weight: 500;
}

.pattern-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 6px 15px rgba(99, 102, 241, 0.1);
  border: 1px solid #e0e7ff;

  h3 {
    font-size: 1.3rem;
    color: #2e3a8c;
    margin-top: 0;
    margin-bottom: 1rem;
  }
}

.pattern-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.95rem;
  padding: 1.2rem;
  background: #f8fafc;
  border-radius: 8px;
  overflow-x: auto;
  color: #1e293b;
  line-height: 1.6;
  border: 1px solid #e2e8f0;
}

.problem-section {
  h2 {
    font-size: 1.8rem;
    color: #2e3a8c;
    margin-top: 0;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.5rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #4f5bd5 0%, #2e3a8c 100%);
      border-radius: 4px;
    }
  }
}

.problem-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #eef2ff;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(99, 102, 241, 0.12);
  }
}

.problem-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    font-size: 1.35rem;
    color: #2e3a8c;
    margin: 0;
    flex: 1;
  }
}

.difficulty {
  padding: 0.25rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;

  &.easy {
    background: #e8f5e9;
    color: #2e7d32;
  }

  &.medium {
    background: #fff8e1;
    color: #f57f17;
  }

  &.hard {
    background: #ffebee;
    color: #c62828;
  }
}

.problem-desc {
  color: #4b5563;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed #e2e8f0;
}

.problem-solution {
  .code-block {
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.code-block {
  ul {
    list-style-type: none;
    padding-left: 0;
    margin: 1rem 0;

    li {
      padding: 0.5rem 0;
      padding-left: 1.8rem;
      position: relative;
      color: #4b5563;
      border-bottom: 1px solid #f3f4f6;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        top: 0.5rem;
        color: #4f5bd5;
        font-size: 1.5rem;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  pre {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.95rem;
    padding: 1.2rem;
    background: #f8fafc;
    border-radius: 8px;
    overflow-x: auto;
    color: #1e293b;
    line-height: 1.6;
    border: 1px solid #e2e8f0;
    margin: 1rem 0 0;

    code {
      font-family: inherit;
    }
  }
}

.footer {
  margin-top: 2.5rem;
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
  border-radius: 12px;
  font-weight: 500;
  color: #2e3a8c;
  font-size: 1.1rem;
}

@media (max-width: 900px) {
  .columns {
    flex-direction: column;
  }

  .column.intro-column {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .backtracking-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .content {
    padding: 1.2rem;
  }
}
</style>