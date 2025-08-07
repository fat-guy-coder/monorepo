<template>
  <div class="huffman-container">
    <!-- 标题区域 -->
    <section class="header-section">
      <h1 class="title">霍夫曼编码</h1>
      <div class="subtitle">数据压缩的艺术</div>
      <div class="header-stats">
        <div class="stat-card">
          <div class="stat-icon">📉</div>
          <div class="stat-value">20-90%</div>
          <div class="stat-label">压缩率</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⏱️</div>
          <div class="stat-value">1952年</div>
          <div class="stat-label">发明时间</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🧠</div>
          <div class="stat-value">David Huffman</div>
          <div class="stat-label">发明者</div>
        </div>
      </div>
    </section>

    <!-- 概念介绍 -->
    <section class="content-section">
      <h2 class="section-title">📖 什么是霍夫曼编码？</h2>
      <div class="concept-card">
        <div class="concept-text">
          <p>
            <strong>霍夫曼编码</strong>是一种基于字符出现频率的<strong>无损数据压缩算法</strong>，
            由David A. Huffman于1952年在MIT攻读博士学位时发明。
          </p>
          <p>
            它的核心思想是为<strong>出现频率高的字符分配较短的编码</strong>，
            为<strong>出现频率低的字符分配较长的编码</strong>，
            从而减少数据的整体存储空间。
          </p>
          <div class="highlight-box">
            <div class="highlight-icon">💡</div>
            <div class="highlight-content">
              霍夫曼编码是<strong>前缀编码</strong>的一种，即任何字符的编码都不是另一个字符编码的前缀，
              这种特性使得编码可以直接解码而无需分隔符。
            </div>
          </div>
        </div>
        <div class="concept-visual">
          <div class="visual-title">编码示例</div>
          <div class="coding-example">
            <div class="coding-item">
              <span class="char">A</span>
              <span class="freq">(45%)</span>
              <span class="code">0</span>
            </div>
            <div class="coding-item">
              <span class="char">B</span>
              <span class="freq">(13%)</span>
              <span class="code">101</span>
            </div>
            <div class="coding-item">
              <span class="char">C</span>
              <span class="freq">(12%)</span>
              <span class="code">100</span>
            </div>
            <div class="coding-item">
              <span class="char">D</span>
              <span class="freq">(16%)</span>
              <span class="code">111</span>
            </div>
            <div class="coding-item">
              <span class="char">E</span>
              <span class="freq">(9%)</span>
              <span class="code">1101</span>
            </div>
            <div class="coding-item">
              <span class="char">F</span>
              <span class="freq">(5%)</span>
              <span class="code">1100</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心原理 -->
    <section class="content-section">
      <h2 class="section-title">⚙️ 霍夫曼编码原理</h2>

      <div class="principles-container">
        <div class="principle-card">
          <div class="principle-icon">1️⃣</div>
          <div class="principle-content">
            <h3>频率统计</h3>
            <p>计算文本中每个字符出现的频率</p>
          </div>
        </div>

        <div class="principle-card">
          <div class="principle-icon">2️⃣</div>
          <div class="principle-content">
            <h3>构建优先队列</h3>
            <p>将每个字符作为节点放入优先队列（频率作为优先级）</p>
          </div>
        </div>

        <div class="principle-card">
          <div class="principle-icon">3️⃣</div>
          <div class="principle-content">
            <h3>构建霍夫曼树</h3>
            <p>反复合并频率最低的两个节点，直到只剩一个根节点</p>
          </div>
        </div>

        <div class="principle-card">
          <div class="principle-icon">4️⃣</div>
          <div class="principle-content">
            <h3>分配编码</h3>
            <p>从根节点开始，向左分支分配0，向右分支分配1</p>
          </div>
        </div>

        <div class="principle-card">
          <div class="principle-icon">5️⃣</div>
          <div class="principle-content">
            <h3>生成编码表</h3>
            <p>遍历到叶子节点得到每个字符的二进制编码</p>
          </div>
        </div>
      </div>

      <div class="huffman-tree">
        <div class="tree-node root">
          <div class="node-value">100%</div>
          <div class="branches">
            <div class="branch left">
              <div class="node">
                <div class="node-value">55%</div>
                <div class="branches">
                  <div class="branch left">
                    <div class="leaf">
                      <div class="char">A</div>
                      <div class="freq">45%</div>
                      <div class="code">0</div>
                    </div>
                  </div>
                  <div class="branch right">
                    <div class="node">
                      <div class="node-value">10%</div>
                      <div class="branches">
                        <div class="branch left">
                          <div class="leaf">
                            <div class="char">F</div>
                            <div class="freq">5%</div>
                            <div class="code">1100</div>
                          </div>
                        </div>
                        <div class="branch right">
                          <div class="leaf">
                            <div class="char">E</div>
                            <div class="freq">5%</div>
                            <div class="code">1101</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="branch right">
              <div class="node">
                <div class="node-value">45%</div>
                <div class="branches">
                  <div class="branch left">
                    <div class="node">
                      <div class="node-value">20%</div>
                      <div class="branches">
                        <div class="branch left">
                          <div class="leaf">
                            <div class="char">C</div>
                            <div class="freq">12%</div>
                            <div class="code">100</div>
                          </div>
                        </div>
                        <div class="branch right">
                          <div class="leaf">
                            <div class="char">B</div>
                            <div class="freq">13%</div>
                            <div class="code">101</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="branch right">
                    <div class="leaf">
                      <div class="char">D</div>
                      <div class="freq">16%</div>
                      <div class="code">111</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tree-legend">
          <div class="legend-item"><span class="branch-indicator left">0</span> 左分支</div>
          <div class="legend-item"><span class="branch-indicator right">1</span> 右分支</div>
          <div class="legend-item"><div class="node-sample"></div> 内部节点</div>
          <div class="legend-item"><div class="leaf-sample"></div> 叶子节点（字符）</div>
        </div>
      </div>
    </section>

    <!-- 优点与缺点 -->
    <section class="content-section">
      <h2 class="section-title">✅ 优点 vs  ⚠️ 局限性</h2>

      <div class="pros-cons">
        <div class="pros">
          <h3><span class="icon">✅</span> 优点</h3>
          <ul>
            <li><strong>无损压缩</strong>：解压后数据与原数据完全一致</li>
            <li><strong>高效压缩</strong>：接近信息熵的理论极限</li>
            <li><strong>简单高效</strong>：编码和解码算法复杂度均为O(n log n)</li>
            <li><strong>自适应能力</strong>：可根据输入数据分布自动调整编码</li>
            <li><strong>无需字典</strong>：编码树可嵌入压缩数据中</li>
          </ul>
        </div>

        <div class="cons">
          <h3><span class="icon">⚠️</span> 局限性</h3>
          <ul>
            <li><strong>两次扫描</strong>：需要先统计频率再编码</li>
            <li><strong>静态编码表</strong>：对短文本效率较低</li>
            <li><strong>编码表开销</strong>：对小文件压缩率可能为负</li>
            <li><strong>易受攻击</strong>：频率分析可能暴露信息（加密文本）</li>
            <li><strong>不适合并行</strong>：编码过程本质上是顺序的</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 应用场景 -->
    <section class="content-section">
      <h2 class="section-title">🌐 应用场景</h2>

      <div class="applications-grid">
        <div class="app-card">
          <div class="app-icon">🗜️</div>
          <h3>文件压缩</h3>
          <p>ZIP、GZIP、PKZIP等压缩工具的组成部分</p>
        </div>

        <div class="app-card">
          <div class="app-icon">🖼️</div>
          <h3>图像压缩</h3>
          <p>JPEG、PNG等图像格式的熵编码阶段</p>
        </div>

        <div class="app-card">
          <div class="app-icon">🎬</div>
          <h3>视频编码</h3>
          <p>MPEG、H.264、HEVC等视频编码标准</p>
        </div>

        <div class="app-card">
          <div class="app-icon">📡</div>
          <h3>通信传输</h3>
          <p>减少网络传输数据量，提高传输效率</p>
        </div>

        <div class="app-card">
          <div class="app-icon">💾</div>
          <h3>数据库存储</h3>
          <p>压缩文本字段，减少存储空间</p>
        </div>

        <div class="app-card">
          <div class="app-icon">🔐</div>
          <h3>加密系统</h3>
          <p>与加密算法结合，增加密码分析难度</p>
        </div>
      </div>
    </section>

    <!-- 示例演示 -->
    <section class="content-section">
      <h2 class="section-title">🔍 编码示例</h2>

      <div class="example-container">
        <div class="original-text">
          <h3>原始文本：</h3>
          <div class="text-content">"HUFFMAN CODING IS EFFICIENT"</div>
          <div class="text-stats">
            <div>长度：<strong>26个字符</strong></div>
            <div>大小：<strong>208比特 (ASCII)</strong></div>
          </div>
        </div>

        <div class="frequency-table">
          <h3>字符频率：</h3>
          <div class="table">
            <div class="table-row header">
              <div>字符</div>
              <div>出现次数</div>
              <div>频率</div>
              <div>霍夫曼编码</div>
            </div>
            <div class="table-row">
              <div>F</div>
              <div>4</div>
              <div>15.4%</div>
              <div>00</div>
            </div>
            <div class="table-row">
              <div>空格</div>
              <div>4</div>
              <div>15.4%</div>
              <div>01</div>
            </div>
            <div class="table-row">
              <div>I</div>
              <div>3</div>
              <div>11.5%</div>
              <div>100</div>
            </div>
            <div class="table-row">
              <div>C</div>
              <div>2</div>
              <div>7.7%</div>
              <div>1010</div>
            </div>
            <div class="table-row">
              <div>N</div>
              <div>2</div>
              <div>7.7%</div>
              <div>1011</div>
            </div>
            <div class="table-row">
              <div>H</div>
              <div>1</div>
              <div>3.8%</div>
              <div>11000</div>
            </div>
            <div class="table-row">
              <div>U</div>
              <div>1</div>
              <div>3.8%</div>
              <div>11001</div>
            </div>
            <div class="table-row">
              <div>M</div>
              <div>1</div>
              <div>3.8%</div>
              <div>11010</div>
            </div>
            <div class="table-row">
              <div>A</div>
              <div>1</div>
              <div>3.8%</div>
              <div>11011</div>
            </div>
            <div class="table-row">
              <div>O</div>
              <div>1</div>
              <div>3.8%</div>
              <div>11100</div>
            </div>
            <div class="table-row">
              <div>D</div>
              <div>1</div>
              <div>3.8%</div>
              <div>11101</div>
            </div>
            <div class="table-row">
              <div>G</div>
              <div>1</div>
              <div>3.8%</div>
              <div>11110</div>
            </div>
            <div class="table-row">
              <div>S</div>
              <div>1</div>
              <div>3.8%</div>
              <div>11111</div>
            </div>
          </div>
        </div>

        <div class="compression-result">
          <h3>压缩结果：</h3>
          <div class="result-content">
            <div class="result-item">
              <div>原始大小：</div>
              <div>208 bits</div>
            </div>
            <div class="result-item">
              <div>压缩后大小：</div>
              <div>85 bits</div>
            </div>
            <div class="result-item">
              <div>压缩率：</div>
              <div>59.1%</div>
            </div>
            <div class="result-item">
              <div>平均编码长度：</div>
              <div>3.27 bits/字符</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 算法实现 -->
    <section class="content-section">
      <h2 class="section-title">💻 算法实现思路</h2>

      <div class="implementation">
        <div class="code-snippet">
          <pre><code>function buildHuffmanTree(text) {
  // 1. 计算字符频率
  const freqMap = new Map();
  for (const char of text) {
    freqMap.set(char, (freqMap.get(char) || 0) + 1);
  }

  // 2. 创建优先级队列
  const queue = new PriorityQueue({
    comparator: (a, b) => a.freq - b.freq
  });

  for (const [char, freq] of freqMap) {
    queue.enqueue({ char, freq, left: null, right: null });
  }

  // 3. 构建霍夫曼树
  while (queue.length > 1) {
    const left = queue.dequeue();
    const right = queue.dequeue();
    const node = {
      char: null,
      freq: left.freq + right.freq,
      left,
      right
    };
    queue.enqueue(node);
  }

  // 4. 返回根节点
  return queue.dequeue();
}</code></pre>
        </div>

        <div class="implementation-steps">
          <h3>关键步骤：</h3>
          <ol>
            <li>统计输入数据中每个字符的出现频率</li>
            <li>为每个字符创建叶子节点，并根据频率排序</li>
            <li>循环取出频率最低的两个节点合并为新节点</li>
            <li>新节点频率为子节点频率之和</li>
            <li>将新节点放回优先级队列</li>
            <li>重复直到队列中只剩一个节点（树的根节点）</li>
            <li>从根节点遍历树，分配二进制编码</li>
          </ol>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section class="content-section summary-section">
      <h2 class="section-title">🎯 总结</h2>

      <div class="summary-content">
        <div class="key-point">
          <div class="point-icon">🔑</div>
          <div class="point-text">霍夫曼编码是<strong>最优的前缀编码方法</strong>，对任意概率分布都能生成最小平均码长</div>
        </div>

        <div class="key-point">
          <div class="point-icon">📊</div>
          <div class="point-text">压缩效率取决于<strong>输入数据的概率分布</strong>，分布越不均匀压缩效果越好</div>
        </div>

        <div class="key-point">
          <div class="point-icon">⚖️</div>
          <div class="point-text">霍夫曼编码是<strong>无损压缩的黄金标准</strong>，在压缩率和速度之间取得良好平衡</div>
        </div>

        <div class="key-point">
          <div class="point-icon">🚀</div>
          <div class="point-text">现代变体如<strong>自适应霍夫曼编码</strong>可以动态更新编码树，提高实时压缩效率</div>
        </div>
      </div>

      <div class="quote-box">
        <div class="quote-icon">💬</div>
        <div class="quote-content">
          "霍夫曼编码的美妙之处在于其简单性和最优性：对于一个给定的字符概率分布，
          没有其他前缀编码的平均长度能小于霍夫曼编码的平均长度。"
          <div class="quote-author">- David A. Huffman</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑代码
import { ref } from 'vue';

// 示例数据
const compressionStats = ref({
  originalSize: 208,
  compressedSize: 85,
  compressionRatio: 59.1,
  avgCodeLength: 3.27
});
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #4a6cf7;
@secondary-color: #6e45e2;
@accent-color: #42b983;
@light-bg: #f8f9ff;
@border-color: #e0e7ff;
@text-color: #2c3e50;
@text-light: #7e8a9a;
@card-shadow: 0 4px 12px rgba(110, 69, 226, 0.08);
@highlight-bg: rgba(74, 108, 247, 0.05);
@tree-node-bg: #e6f0ff;
@leaf-node-bg: #d6f5e3;

// 基础样式
.huffman-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: @text-color;
  background-color: white;
  line-height: 1.6;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, @light-bg, transparent);
  border-radius: 16px;

  .title {
    font-size: 2.75rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.3rem;
    color: @text-light;
    margin-bottom: 2rem;
    font-weight: 400;
  }
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;

  .stat-card {
    background: white;
    padding: 1.5rem 1rem;
    border-radius: 12px;
    box-shadow: @card-shadow;
    min-width: 140px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .stat-icon {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }

    .stat-value {
      font-size: 1.4rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      color: @text-light;
      font-size: 0.95rem;
    }
  }
}

.content-section {
  margin-bottom: 3rem;
  background: @light-bg;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: @card-shadow;

  .section-title {
    font-size: 1.8rem;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 1.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid @primary-color;
    color: darken(@primary-color, 10%);

    &::before {
      margin-right: 10px;
    }
  }
}

.concept-card {
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  .concept-text {
    flex: 1;

    p {
      font-size: 1.1rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }
  }

  .concept-visual {
    flex: 0 0 300px;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    .visual-title {
      font-weight: 600;
      margin-bottom: 1rem;
      color: @primary-color;
      text-align: center;
    }
  }
}

.highlight-box {
  background: @highlight-bg;
  border-left: 4px solid @primary-color;
  border-radius: 0 8px 8px 0;
  padding: 1.25rem;
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  .highlight-icon {
    font-size: 1.8rem;
    color: @accent-color;
  }

  .highlight-content {
    font-size: 1.05rem;
    font-weight: 500;
  }
}

.coding-example {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;

  .coding-item {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    background: #f0f7ff;
    border-radius: 8px;

    .char {
      font-weight: 700;
      width: 30px;
      text-align: center;
      font-size: 1.2rem;
      color: @primary-color;
    }

    .freq {
      flex: 1;
      font-size: 0.9rem;
      color: @text-light;
    }

    .code {
      font-family: monospace;
      background: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      border: 1px solid @border-color;
    }
  }
}

.principles-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;

  .principle-card {
    flex: 1;
    min-width: 250px;
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    border-top: 3px solid @primary-color;

    .principle-icon {
      font-size: 1.8rem;
      flex-shrink: 0;
    }

    .principle-content {
      h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }

      p {
        margin: 0;
        color: @text-light;
        font-size: 0.98rem;
      }
    }
  }
}

.huffman-tree {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  overflow: auto;

  .tree-node {
    text-align: center;
    position: relative;
    margin: 0 auto;

    .node-value {
      display: inline-block;
      background: @tree-node-bg;
      padding: 0.5rem 1rem;
      border-radius: 30px;
      font-weight: 700;
      color: @primary-color;
      border: 2px solid @primary-color;
      margin-bottom: 3rem;
      position: relative;
      z-index: 2;
    }

    .branches {
      display: flex;
      justify-content: center;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: -2rem;
        left: 50%;
        transform: translateX(-50%);
        height: 2rem;
        width: 2px;
        background: @border-color;
      }

      .branch {
        position: relative;
        padding-top: 3rem;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          width: 50%;
          height: 2px;
          background: @border-color;
        }

        &.left {
          margin-right: 3rem;

          &::before {
            right: 0;
          }

          &::after {
            content: '0';
            position: absolute;
            top: -1.5rem;
            right: 1rem;
            color: @primary-color;
            font-weight: 700;
          }
        }

        &.right {
          margin-left: 3rem;

          &::before {
            left: 0;
          }

          &::after {
            content: '1';
            position: absolute;
            top: -1.5rem;
            left: 1rem;
            color: @primary-color;
            font-weight: 700;
          }
        }
      }
    }
  }

  .leaf {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: @leaf-node-bg;
    border-radius: 8px;
    border: 2px solid @accent-color;
    margin-top: 1rem;

    .char {
      font-size: 1.5rem;
      font-weight: 700;
      color: darken(@accent-color, 20%);
    }

    .freq {
      font-size: 0.9rem;
      color: @text-light;
    }

    .code {
      font-family: monospace;
      font-weight: 700;
      color: @primary-color;
      margin-top: 0.5rem;
    }
  }

  .tree-legend {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid @border-color;

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.95rem;

      .branch-indicator {
        display: inline-block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        text-align: center;
        line-height: 24px;
        font-weight: 700;

        &.left {
          background: rgba(@primary-color, 0.1);
          color: @primary-color;
        }

        &.right {
          background: rgba(@accent-color, 0.1);
          color: @accent-color;
        }
      }

      .node-sample {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: @tree-node-bg;
        border: 2px solid @primary-color;
      }

      .leaf-sample {
        width: 24px;
        height: 24px;
        border-radius: 8px;
        background: @leaf-node-bg;
        border: 2px solid @accent-color;
      }
    }
  }
}

.pros-cons {
  display: flex;
  gap: 2rem;

  .pros, .cons {
    flex: 1;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid @border-color;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.75rem;
        line-height: 1.5;
      }
    }
  }

  .pros {
    border-top: 3px solid @accent-color;

    h3 {
      color: darken(@accent-color, 15%);
    }
  }

  .cons {
    border-top: 3px solid #ff6b6b;

    h3 {
      color: #ff6b6b;

      .icon {
        color: #ff6b6b;
      }
    }
  }
}

.applications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  .app-card {
    background: white;
    padding: 1.75rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    text-align: center;
    transition: all 0.3s ease;
    border-top: 3px solid @primary-color;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }

    .app-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.75rem;
      color: @text-color;
    }

    p {
      margin: 0;
      color: @text-light;
      font-size: 0.98rem;
    }
  }
}

.example-container {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

  .original-text {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid @border-color;

    .text-content {
      font-family: monospace;
      font-size: 1.4rem;
      background: #f8f9ff;
      padding: 1.5rem;
      border-radius: 8px;
      margin: 1rem 0;
      text-align: center;
    }

    .text-stats {
      display: flex;
      justify-content: center;
      gap: 2rem;
      font-size: 1.1rem;

      strong {
        color: @primary-color;
      }
    }
  }

  .frequency-table {
    margin-bottom: 2rem;

    .table {
      display: table;
      width: 100%;
      border-collapse: collapse;

      .table-row {
        display: table-row;

        &.header {
          font-weight: 700;
          background: @light-bg;

          > div {
            border-bottom: 2px solid @border-color;
          }
        }

        > div {
          display: table-cell;
          padding: 0.75rem;
          border-bottom: 1px solid @border-color;
          text-align: center;

          &:first-child {
            font-weight: 700;
            text-align: left;
          }
        }

        &:nth-child(odd) {
          background: @light-bg;
        }
      }
    }
  }

  .compression-result {
    background: @highlight-bg;
    border-radius: 12px;
    padding: 1.5rem;

    .result-content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-top: 1rem;

      .result-item {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem;
        background: white;
        border-radius: 8px;
        font-weight: 500;

        div:last-child {
          font-weight: 700;
          color: @primary-color;
        }
      }
    }
  }
}

.implementation {
  display: flex;
  gap: 2rem;

  .code-snippet {
    flex: 1;
    background: #2c3e50;
    border-radius: 12px;
    overflow: hidden;

    pre {
      margin: 0;

      code {
        display: block;
        padding: 1.5rem;
        color: #f8f8f2;
        font-family: 'Fira Code', monospace;
        font-size: 0.95rem;
        line-height: 1.6;

        .comment {
          color: #6272a4;
        }
        .keyword {
          color: #ff79c6;
        }
        .function {
          color: #50fa7b;
        }
        .string {
          color: #f1fa8c;
        }
        .number {
          color: #bd93f9;
        }
      }
    }
  }

  .implementation-steps {
    flex: 0 0 300px;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    h3 {
      padding-bottom: 0.5rem;
      border-bottom: 1px solid @border-color;
      margin-top: 0;
    }

    ol {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.75rem;
        line-height: 1.5;
      }
    }
  }
}

.summary-section {
  background: linear-gradient(135deg, #e6f7ff, #f0f9ff);

  .summary-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;

    .key-point {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

      .point-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
      }

      .point-text {
        strong {
          color: @primary-color;
        }
      }
    }
  }

  .quote-box {
    background: white;
    border-left: 4px solid @accent-color;
    border-radius: 0 12px 12px 0;
    padding: 1.5rem;
    display: flex;
    gap: 1.25rem;

    .quote-icon {
      font-size: 2rem;
      color: @accent-color;
      flex-shrink: 0;
    }

    .quote-content {
      font-style: italic;
      font-size: 1.1rem;
      line-height: 1.6;

      .quote-author {
        margin-top: 1rem;
        font-weight: 500;
        text-align: right;
        color: @text-light;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .huffman-container {
    padding: 1rem;
  }

  .title {
    font-size: 2.25rem !important;
  }

  .subtitle {
    font-size: 1.1rem !important;
  }

  .header-stats {
    gap: 1rem;

    .stat-card {
      flex: 1;
      min-width: 120px;
    }
  }

  .content-section {
    padding: 1.5rem;
  }

  .concept-card {
    flex-direction: column;
  }

  .principles-container {
    .principle-card {
      min-width: 100%;
    }
  }

  .pros-cons {
    flex-direction: column;
  }

  .implementation {
    flex-direction: column;
  }

  .summary-content {
    grid-template-columns: 1fr !important;
  }
}
</style>
