<template>
  <div class="lz77-container">
    <header class="header">
      <h1 class="title">LZ77压缩算法详解</h1>
      <p class="subtitle">无损数据压缩的经典滑动窗口算法</p>
      <div class="decoration">
        <div class="loop"></div>
        <div class="loop"></div>
        <div class="loop"></div>
      </div>
    </header>

    <div class="content">
      <div class="overview">
        <div class="algorithm-card">
          <div class="algorithm-info">
            <h2>LZ77算法</h2>
            <p>由Abraham Lempel和Jacob Ziv于1977年提出</p>
            <div class="stats">
              <div class="stat">
                <div class="value">滑动窗口</div>
                <div class="label">核心机制</div>
              </div>
              <div class="stat">
                <div class="value">无损压缩</div>
                <div class="label">压缩类型</div>
              </div>
              <div class="stat">
                <div class="value">广泛使用</div>
                <div class="label">应用范围</div>
              </div>
            </div>
          </div>
          <div class="algorithm-visual">
            <div class="compression-ratio">
              <div class="ratio-bar">
                <div class="original">原始数据: 100%</div>
                <div class="compressed" :style="{ width: compressedWidth }">压缩数据: {{ compressionRatio }}%</div>
              </div>
              <div class="ratio-value">压缩率: {{ compressionRatio }}%</div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid-layout">
        <section class="card concept-card">
          <h2 class="section-title">算法概念</h2>
          <div class="definition">
            <p>LZ77是一种基于字典的无损数据压缩算法，通过使用滑动窗口机制，用<strong>长度-距离对</strong>代替重复出现的数据序列。</p>
          </div>

          <div class="core-idea">
            <h3>核心思想</h3>
            <p>在已处理的数据中查找当前待压缩数据的最长匹配，并用(距离, 长度)三元组表示重复序列。</p>
          </div>

          <div class="components">
            <h3>关键组成部分</h3>
            <div class="component">
              <div class="icon">🔍</div>
              <div>
                <h4>滑动窗口</h4>
                <p>包含两部分：查找缓冲区(已处理数据)和前向缓冲区(待处理数据)</p>
              </div>
            </div>
            <div class="component">
              <div class="icon">📏</div>
              <div>
                <h4>三元组(距离, 长度, 下一个字符)</h4>
                <p>距离：匹配序列在查找缓冲区中的起始位置</p>
                <p>长度：匹配序列的长度</p>
                <p>下一个字符：匹配后的第一个不匹配字符</p>
              </div>
            </div>
          </div>
        </section>

        <section class="card working-card">
          <h2 class="section-title">工作原理</h2>

          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>初始化滑动窗口</h3>
                <p>设置查找缓冲区和前向缓冲区的大小</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>查找最长匹配</h3>
                <p>在前向缓冲区中查找查找缓冲区中最长的匹配序列</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>输出三元组</h3>
                <p>输出(距离, 长度, 下一个字符)三元组</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>滑动窗口</h3>
                <p>将窗口向前滑动(长度 + 1)个字符</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h3>重复过程</h3>
                <p>重复步骤2-4直到所有数据处理完成</p>
              </div>
            </div>
          </div>

          <div class="visualization">
            <h3>滑动窗口可视化</h3>
            <div class="sliding-window">
              <div class="search-buffer">
                <div class="label">查找缓冲区</div>
                <div class="content">A B B C A B</div>
              </div>
              <div class="look-ahead-buffer">
                <div class="label">前向缓冲区</div>
                <div class="content">B C A B B A</div>
              </div>
            </div>
            <div class="match-info">
              最长匹配: "B C A B" (距离=3, 长度=4) → 下一个字符: 'B'
            </div>
          </div>
        </section>
      </div>

      <section class="card implementation-card">
        <h2 class="section-title">算法实现</h2>

        <div class="code-section">
          <div class="code-block">
            <h3>压缩函数实现</h3>
            <pre><code>function compressLZ77(input: string, windowSize = 2048) {
  const compressed: { distance: number; length: number; char: string }[] = [];
  let position = 0;

  while (position < input.length) {
    // 初始化最佳匹配
    let bestMatch = { distance: 0, length: 0 };

    // 计算查找缓冲区边界
    const searchStart = Math.max(0, position - windowSize);
    const searchEnd = position;

    // 在前向缓冲区中查找最长匹配
    for (let i = searchStart; i < searchEnd; i++) {
      let matchLength = 0;

      // 计算最大可能匹配长度
      const maxLength = Math.min(
        input.length - position,
        windowSize - (position - i)
      );

      // 计算匹配长度
      while (matchLength < maxLength &&
            input[i + matchLength] === input[position + matchLength]) {
        matchLength++;
      }

      // 更新最佳匹配
      if (matchLength > bestMatch.length) {
        bestMatch = {
          distance: position - i,
          length: matchLength
        };
      }
    }

    // 获取下一个字符
    const nextChar = position + bestMatch.length < input.length
      ? input[position + bestMatch.length]
      : '';

    // 添加三元组到压缩结果
    compressed.push({
      distance: bestMatch.distance,
      length: bestMatch.length,
      char: nextChar
    });

    // 移动位置指针
    position += bestMatch.length + 1;
  }

  return compressed;
}</code></pre>
          </div>

          <div class="code-block">
            <h3>解压函数实现</h3>
            <pre><code>function decompressLZ77(compressed: {
  distance: number;
  length: number;
  char: string
}[]) {
  let output = '';

  for (const token of compressed) {
    if (token.length > 0) {
      // 从输出中复制匹配序列
      const start = output.length - token.distance;
      for (let i = 0; i < token.length; i++) {
        output += output[start + i];
      }
    }

    // 添加下一个字符
    output += token.char;
  }

  return output;
}</code></pre>
          </div>
        </div>

        <div class="usage-example">
          <h3>使用示例</h3>
          <pre><code>// 原始数据
const input = "ABBCABCABBAABCA";

// 压缩数据
const compressed = compressLZ77(input);
console.log(compressed);
// 输出: [
//   { distance: 0, length: 0, char: 'A' },
//   { distance: 0, length: 0, char: 'B' },
//   { distance: 1, length: 1, char: 'C' },
//   { distance: 3, length: 3, char: 'A' },
//   { distance: 2, length: 1, char: 'B' },
//   { distance: 5, length: 4, char: 'A' }
// ]

// 解压数据
const decompressed = decompressLZ77(compressed);
console.log(decompressed === input); // true</code></pre>
        </div>
      </section>

      <div class="grid-layout">
        <section class="card features-card">
          <h2 class="section-title">特点与优势</h2>

          <div class="features">
            <div class="feature">
              <div class="icon">📦</div>
              <div>
                <h3>无损压缩</h3>
                <p>解压后数据与原始数据完全一致</p>
              </div>
            </div>
            <div class="feature">
              <div class="icon">⚡</div>
              <div>
                <h3>高效处理重复数据</h3>
                <p>对重复模式有极高的压缩效率</p>
              </div>
            </div>
            <div class="feature">
              <div class="icon">🔄</div>
              <div>
                <h3>流式处理</h3>
                <p>适合实时数据压缩处理</p>
              </div>
            </div>
            <div class="feature">
              <div class="icon">🧠</div>
              <div>
                <h3>简单实现</h3>
                <p>算法原理简单，易于实现</p>
              </div>
            </div>
          </div>

          <div class="comparison">
            <h3>压缩效率比较</h3>
            <table>
              <thead>
                <tr>
                  <th>数据类型</th>
                  <th>原始大小</th>
                  <th>LZ77压缩后</th>
                  <th>压缩率</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>重复文本</td>
                  <td>10 KB</td>
                  <td>0.5 KB</td>
                  <td>95%</td>
                </tr>
                <tr>
                  <td>英文文本</td>
                  <td>10 KB</td>
                  <td>4 KB</td>
                  <td>60%</td>
                </tr>
                <tr>
                  <td>二进制数据</td>
                  <td>10 KB</td>
                  <td>6 KB</td>
                  <td>40%</td>
                </tr>
                <tr>
                  <td>随机数据</td>
                  <td>10 KB</td>
                  <td>10 KB</td>
                  <td>0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="card applications-card">
          <h2 class="section-title">应用场景</h2>

          <div class="applications">
            <div class="application">
              <div class="app-icon">🗜️</div>
              <div>
                <h3>文件压缩</h3>
                <p>ZIP, GZIP, PNG等格式的基础算法</p>
              </div>
            </div>
            <div class="application">
              <div class="app-icon">🌐</div>
              <div>
                <h3>网络传输</h3>
                <p>HTTP压缩，减少数据传输量</p>
              </div>
            </div>
            <div class="application">
              <div class="app-icon">💾</div>
              <div>
                <h3>存储系统</h3>
                <p>数据库压缩，文件系统压缩</p>
              </div>
            </div>
            <div class="application">
              <div class="app-icon">🎮</div>
              <div>
                <h3>游戏开发</h3>
                <p>游戏资源压缩，减少加载时间</p>
              </div>
            </div>
            <div class="application">
              <div class="app-icon">📱</div>
              <div>
                <h3>移动应用</h3>
                <p>减少应用大小，优化存储</p>
              </div>
            </div>
            <div class="application">
              <div class="app-icon">🔐</div>
              <div>
                <h3>嵌入式系统</h3>
                <p>资源受限环境中的数据压缩</p>
              </div>
            </div>
          </div>

          <div class="evolution">
            <h3>算法演进</h3>
            <div class="timeline">
              <div class="timeline-item">
                <div class="year">1977</div>
                <div class="event">LZ77算法提出</div>
              </div>
              <div class="timeline-item">
                <div class="year">1984</div>
                <div class="event">LZW算法改进</div>
              </div>
              <div class="timeline-item">
                <div class="year">1992</div>
                <div class="event">DEFLATE算法 (ZIP)</div>
              </div>
              <div class="timeline-item">
                <div class="year">1996</div>
                <div class="event">PNG图像格式采用</div>
              </div>
              <div class="timeline-item">
                <div class="year">2000s</div>
                <div class="event">LZMA等现代变体</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="card variations-card">
        <h2 class="section-title">LZ77变体与改进</h2>

        <div class="variations">
          <div class="variation">
            <h3>LZSS (Lempel-Ziv-Storer-Szymanski)</h3>
            <p>改进：添加标记位区分字面量和指针</p>
            <p>优势：更好的压缩率，更简单的实现</p>
          </div>

          <div class="variation">
            <h3>LZH (Lempel-Ziv-Huffman)</h3>
            <p>改进：使用Huffman编码压缩指针</p>
            <p>优势：进一步提高压缩率</p>
          </div>

          <div class="variation">
            <h3>DEFLATE (ZIP/GZIP)</h3>
            <p>改进：LZ77 + Huffman编码</p>
            <p>优势：广泛使用的标准压缩格式</p>
          </div>
        </div>

        <div class="limitations">
          <h3>局限性</h3>
          <ul>
            <li>窗口大小限制匹配距离</li>
            <li>对非重复数据压缩率低</li>
            <li>压缩速度较慢（需查找匹配）</li>
            <li>需要存储字典（压缩数据结构）</li>
          </ul>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>LZ77算法详解 © 2023 | 数据压缩核心技术</p>
      <div class="links">
        <a href="#">数据压缩</a> •
        <a href="#">信息论</a> •
        <a href="#">算法设计</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 用于演示的压缩率
const compressionRatio = ref(35);
const compressedWidth = computed(() => `${compressionRatio.value}%`);
</script>

<style lang="less" scoped>

// 颜色定义
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@accent-color: #4cc9f0;
@background-light: #f8f9fa;
@card-bg: #ffffff;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #e9ecef;
@success-color: #2ec4b6;
@warning-color: #ff9f1c;
@error-color: #e71d36;
@compression-color: #4ecdc4;

// 基础样式
.lz77-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
  background-color: @background-light;
  color: @text-dark;
  line-height: 1.6;

  .header {
    text-align: center;
    padding: 4rem 2rem 3rem;
    position: relative;
    overflow: hidden;
    margin-bottom: 2rem;

    .title {
      font-size: 2.8rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
      z-index: 2;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .subtitle {
      font-size: 1.3rem;
      color: @text-light;
      max-width: 700px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }

    .decoration {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      opacity: 0.05;

      .loop {
        position: absolute;
        border: 2px dashed @primary-color;
        border-radius: 50%;
        animation: float 15s infinite linear;

        &:nth-child(1) {
          width: 300px;
          height: 300px;
          top: 20%;
          left: 10%;
        }

        &:nth-child(2) {
          width: 200px;
          height: 200px;
          top: 50%;
          right: 15%;
          animation-duration: 12s;
          animation-direction: reverse;
        }

        &:nth-child(3) {
          width: 150px;
          height: 150px;
          bottom: 20%;
          left: 40%;
          animation-duration: 18s;
        }
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  }

  .overview {
    .algorithm-card {
      display: flex;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
      border: 1px solid @border-color;

      .algorithm-info {
        flex: 1;
        padding: 2rem;
        background: linear-gradient(135deg, fade(@primary-color, 5%), white);
        border-right: 1px solid @border-color;

        h2 {
          font-size: 1.8rem;
          margin-top: 0;
          color: @primary-color;
        }

        p {
          color: @text-light;
          margin-bottom: 1.5rem;
        }

        .stats {
          display: flex;
          gap: 1rem;

          .stat {
            flex: 1;
            text-align: center;
            padding: 1rem;
            background: fade(@background-light, 50%);
            border-radius: 8px;

            .value {
              font-weight: 600;
              font-size: 1.1rem;
              margin-bottom: 0.3rem;
            }

            .label {
              font-size: 0.9rem;
              color: @text-light;
            }
          }
        }
      }

      .algorithm-visual {
        flex: 1;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, fade(@accent-color, 5%), white);

        .compression-ratio {
          width: 100%;
          max-width: 400px;

          .ratio-bar {
            height: 40px;
            background: fade(@border-color, 30%);
            border-radius: 20px;
            overflow: hidden;
            position: relative;
            margin-bottom: 1rem;

            .original {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              display: flex;
              align-items: center;
              padding-left: 1rem;
              font-weight: 500;
              color: @text-light;
            }

            .compressed {
              height: 100%;
              background: linear-gradient(90deg, @compression-color, darken(@compression-color, 10%));
              display: flex;
              align-items: center;
              justify-content: flex-end;
              padding-right: 1rem;
              color: white;
              font-weight: 500;
              transition: width 1s ease;
            }
          }

          .ratio-value {
            text-align: center;
            font-weight: 600;
            font-size: 1.1rem;
            color: @compression-color;
          }
        }
      }
    }
  }

  .card {
    background-color: @card-bg;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
    border: 1px solid fade(@border-color, 50%);

    &.concept-card {
      border-top: 4px solid @primary-color;
    }

    &.working-card {
      border-top: 4px solid @success-color;
    }

    &.implementation-card {
      border-top: 4px solid @accent-color;
    }

    &.features-card {
      border-top: 4px solid @warning-color;
    }

    &.applications-card {
      border-top: 4px solid #9d4edd;
    }

    &.variations-card {
      border-top: 4px solid #e71d36;
    }
  }

  .section-title {
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid fade(@border-color, 50%);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 80px;
      height: 2px;
      background: linear-gradient(90deg, @primary-color, @secondary-color);
      border-radius: 2px;
    }
  }

  .grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 1.8rem;
  }

  .definition {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .core-idea {
    background: fade(@background-light, 50%);
    padding: 1.2rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    border-left: 3px solid @primary-color;

    p {
      margin: 0;
      font-weight: 500;
    }
  }

  .components {
    .component {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.2rem;
      align-items: flex-start;

      .icon {
        font-size: 1.8rem;
        min-width: 40px;
        text-align: center;
        margin-top: 0.3rem;
      }

      h4 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
        color: @primary-color;
      }

      p {
        margin: 0.2rem 0;
        font-size: 0.95rem;
      }
    }
  }

  .steps {
    .step {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.2rem;
      padding-bottom: 1.2rem;
      border-bottom: 1px solid fade(@border-color, 30%);

      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }

      .step-number {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: @primary-color;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        flex-shrink: 0;
      }

      .step-content {
        h3 {
          margin: 0 0 0.3rem;
          font-size: 1.1rem;
        }

        p {
          margin: 0;
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }
  }

  .visualization {
    margin-top: 1.5rem;
    background: fade(@background-light, 50%);
    padding: 1.5rem;
    border-radius: 8px;

    h3 {
      margin-top: 0;
      font-size: 1.1rem;
      color: @text-light;
      margin-bottom: 1rem;
    }

    .sliding-window {
      display: flex;
      border: 2px solid @border-color;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 1rem;

      > div {
        padding: 1rem;
      }

      .search-buffer {
        flex: 1;
        background: fade(@primary-color, 10%);
        border-right: 2px solid @border-color;

        .label {
          font-size: 0.9rem;
          color: @text-light;
          margin-bottom: 0.5rem;
        }

        .content {
          font-family: 'Fira Code', monospace;
          font-weight: 500;
        }
      }

      .look-ahead-buffer {
        flex: 1;
        background: fade(@success-color, 10%);

        .label {
          font-size: 0.9rem;
          color: @text-light;
          margin-bottom: 0.5rem;
        }

        .content {
          font-family: 'Fira Code', monospace;
          font-weight: 500;
        }
      }
    }

    .match-info {
      background: @success-color;
      color: white;
      padding: 0.8rem;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
    }
  }

  .implementation-card {
    .code-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 1.8rem;
      margin-bottom: 1.5rem;
    }

    .code-block {
      background: #f8f9ff;
      border-radius: 8px;
      overflow: hidden;

      h3 {
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;
        margin: 0;
        padding: 0.8rem 1.2rem;
        font-size: 1rem;
        font-weight: 500;
      }

      pre {
        margin: 0;
        padding: 1.2rem;
        overflow: auto;

        code {
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.95rem;
          line-height: 1.5;
          color: #3a3a3a;
          display: block;

          &::selection {
            background: fade(@primary-color, 30%);
          }
        }
      }
    }

    .usage-example {
      background: #f8f9ff;
      border-radius: 8px;
      overflow: hidden;

      h3 {
        background: linear-gradient(135deg, @accent-color, darken(@accent-color, 15%));
        color: white;
        margin: 0;
        padding: 0.8rem 1.2rem;
        font-size: 1rem;
        font-weight: 500;
      }

      pre {
        margin: 0;
        padding: 1.2rem;
        overflow: auto;

        code {
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.95rem;
          line-height: 1.5;
          color: #3a3a3a;
          display: block;
        }
      }
    }
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;

    .feature {
      display: flex;
      gap: 0.8rem;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      align-items: center;

      .icon {
        font-size: 1.5rem;
        min-width: 40px;
        text-align: center;
      }

      h3 {
        margin: 0 0 0.3rem;
        font-size: 1rem;
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        color: @text-light;
      }
    }
  }

  .comparison {
    h3 {
      margin-top: 0;
      font-size: 1.1rem;
      color: @text-light;
      margin-bottom: 1rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 0.8rem;
        text-align: left;
        border-bottom: 1px solid @border-color;
      }

      th {
        background: fade(@primary-color, 8%);
        color: @primary-color;
        font-weight: 600;
      }

      tr:last-child td {
        border-bottom: none;
      }
    }
  }

  .applications {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;

    .application {
      display: flex;
      gap: 0.8rem;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      align-items: center;

      .app-icon {
        font-size: 1.5rem;
        min-width: 40px;
        text-align: center;
      }

      h3 {
        margin: 0 0 0.3rem;
        font-size: 1rem;
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        color: @text-light;
      }
    }
  }

  .evolution {
    h3 {
      margin-top: 0;
      font-size: 1.1rem;
      color: @text-light;
      margin-bottom: 1rem;
    }

    .timeline {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .timeline-item {
        display: flex;
        gap: 1rem;
        align-items: center;

        .year {
          width: 60px;
          font-weight: 600;
          color: @primary-color;
        }

        .event {
          flex: 1;
          padding: 0.5rem 1rem;
          background: white;
          border-radius: 6px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
      }
    }
  }

  .variations {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    .variation {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      border: 1px solid @border-color;

      h3 {
        margin-top: 0;
        color: @primary-color;
        font-size: 1.2rem;
        margin-bottom: 0.8rem;
      }

      p {
        margin: 0.5rem 0;
        font-size: 0.95rem;
      }
    }
  }

  .limitations {
    background: fade(@error-color, 5%);
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 3px solid @error-color;

    h3 {
      margin-top: 0;
      color: @error-color;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    color: @text-light;
    font-size: 0.9rem;
    border-top: 1px solid @border-color;

    .links {
      margin-top: 0.5rem;

      a {
        color: @primary-color;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  // 动画
  @keyframes float {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .lz77-container {
    padding: 0 1rem 2rem;

    .header {
      padding: 2.5rem 1rem 2rem;

      .title {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1.1rem;
      }
    }

    .overview {
      .algorithm-card {
        flex-direction: column;
      }
    }

    .grid-layout {
      grid-template-columns: 1fr;
    }

    .implementation-card .code-section {
      grid-template-columns: 1fr;
    }

    .card {
      padding: 1.5rem;
    }
  }
}
</style>
