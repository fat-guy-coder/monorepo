<template>
  <div class="compression-algorithms">
    <header class="header">
      <h1>无损压缩算法解析</h1>
      <p>深入理解数据压缩的核心技术与应用场景</p>
    </header>

    <div class="content-container">
      <section class="intro-section">
        <div class="section-header">
          <div class="icon">📚</div>
          <h2>无损压缩基础概念</h2>
        </div>

        <div class="content-card">
          <div class="definition">
            <h3>什么是无损压缩？</h3>
            <p>无损压缩是一种数据压缩方法，它允许原始数据从压缩数据中完全重建，没有任何信息丢失。这种方法在需要精确数据重建的场景中至关重要。</p>
          </div>

          <div class="compression-stats">
            <div class="stat">
              <div class="stat-value">100%</div>
              <div class="stat-label">数据完整性</div>
            </div>
            <div class="stat">
              <div class="stat-value">2:1 - 10:1</div>
              <div class="stat-label">典型压缩比</div>
            </div>
            <div class="stat">
              <div class="stat-value">0</div>
              <div class="stat-label">信息丢失</div>
            </div>
          </div>

          <div class="compression-flow">
            <div class="flow-step">
              <div class="step-icon">1</div>
              <h4>原始数据</h4>
              <div class="data-example">A A A B B C C C C</div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">2</div>
              <h4>压缩处理</h4>
              <div class="data-example">3A 2B 4C</div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">3</div>
              <h4>解压恢复</h4>
              <div class="data-example">A A A B B C C C C</div>
            </div>
          </div>
        </div>
      </section>

      <section class="algorithms-section">
        <div class="section-header">
          <div class="icon">🔍</div>
          <h2>核心无损压缩算法</h2>
        </div>

        <div class="algorithm-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="algorithm-details">
          <div v-if="activeTab === 'huffman'" class="algorithm-card">
            <div class="algorithm-header">
              <div class="algo-icon">🌳</div>
              <div>
                <h3>霍夫曼编码 (Huffman Coding)</h3>
                <div class="algo-meta">
                  <span>1952年 | David Huffman</span>
                </div>
              </div>
            </div>

            <div class="algo-content">
              <div class="algo-principle">
                <h4>基本原理</h4>
                <p>基于字符出现频率构建最优二叉树，频率高的字符使用短编码，频率低的字符使用长编码。</p>
                <div class="huffman-tree">
                  <div class="tree-node root">Root (100%)</div>
                  <div class="tree-level">
                    <div class="tree-node">0 (60%)</div>
                    <div class="tree-node">1 (40%)</div>
                  </div>
                  <div class="tree-level">
                    <div class="tree-node">A: 00 (25%)</div>
                    <div class="tree-node">B: 01 (35%)</div>
                    <div class="tree-node">C: 10 (20%)</div>
                    <div class="tree-node">D: 11 (20%)</div>
                  </div>
                </div>
              </div>

              <div class="algo-stats">
                <div class="stat-item">
                  <h4>压缩率</h4>
                  <div class="stat-bar">
                    <div class="bar-fill" :style="{ width: '75%' }">20-50%</div>
                  </div>
                  <p>取决于数据熵值</p>
                </div>
                <div class="stat-item">
                  <h4>压缩速度</h4>
                  <div class="stat-bar">
                    <div class="bar-fill medium" :style="{ width: '60%' }">中等</div>
                  </div>
                  <p>需要构建树结构</p>
                </div>
                <div class="stat-item">
                  <h4>解压速度</h4>
                  <div class="stat-bar">
                    <div class="bar-fill fast" :style="{ width: '90%' }">快速</div>
                  </div>
                  <p>树结构固定</p>
                </div>
              </div>

              <div class="algo-usage">
                <h4>适用场景</h4>
                <ul>
                  <li>文本文件压缩 (ZIP, GZIP)</li>
                  <li>JPEG图像中的AC系数编码</li>
                  <li>传真传输 (CCITT Group 3)</li>
                </ul>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'lzw'" class="algorithm-card">
            <div class="algorithm-header">
              <div class="algo-icon">📖</div>
              <div>
                <h3>LZW算法 (Lempel-Ziv-Welch)</h3>
                <div class="algo-meta">
                  <span>1984年 | Welch改进</span>
                </div>
              </div>
            </div>

            <div class="algo-content">
              <div class="algo-principle">
                <h4>基本原理</h4>
                <p>动态构建字典，将输入数据中的重复序列替换为字典索引。</p>
                <div class="lzw-example">
                  <div class="example-step">
                    <div>输入: ABABABA</div>
                    <div>字典: A=1, B=2</div>
                  </div>
                  <div class="example-step">
                    <div>发现AB: 添加AB=3</div>
                    <div>输出: 1</div>
                  </div>
                  <div class="example-step">
                    <div>发现BA: 添加BA=4</div>
                    <div>输出: 2</div>
                  </div>
                  <div class="example-step">
                    <div>发现ABA: 添加ABA=5</div>
                    <div>输出: 3</div>
                  </div>
                  <div class="example-step">
                    <div>最终输出: 1,2,3,5</div>
                  </div>
                </div>
              </div>

              <div class="algo-stats">
                <div class="stat-item">
                  <h4>压缩率</h4>
                  <div class="stat-bar">
                    <div class="bar-fill" :style="{ width: '80%' }">30-60%</div>
                  </div>
                  <p>对重复数据高效</p>
                </div>
                <div class="stat-item">
                  <h4>压缩速度</h4>
                  <div class="stat-bar">
                    <div class="bar-fill fast" :style="{ width: '85%' }">快速</div>
                  </div>
                  <p>单次遍历数据</p>
                </div>
                <div class="stat-item">
                  <h4>解压速度</h4>
                  <div class="stat-bar">
                    <div class="bar-fill fast" :style="{ width: '90%' }">快速</div>
                  </div>
                  <p>字典重建简单</p>
                </div>
              </div>

              <div class="algo-usage">
                <h4>适用场景</h4>
                <ul>
                  <li>GIF图像格式</li>
                  <li>Unix压缩工具</li>
                  <li>TIFF图像格式</li>
                  <li>早期ZIP格式</li>
                </ul>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'deflate'" class="algorithm-card">
            <div class="algorithm-header">
              <div class="algo-icon">🚀</div>
              <div>
                <h3>Deflate算法</h3>
                <div class="algo-meta">
                  <span>1993年 | PKZIP 2.0</span>
                </div>
              </div>
            </div>

            <div class="algo-content">
              <div class="algo-principle">
                <h4>基本原理</h4>
                <p>结合LZ77算法和霍夫曼编码，先通过LZ77查找重复字符串，然后使用霍夫曼编码进一步压缩。</p>
                <div class="deflate-flow">
                  <div class="flow-step">
                    <div class="step-label">原始数据</div>
                    <div class="step-data">ABABABABCABCABC</div>
                  </div>
                  <div class="flow-arrow">↓ LZ77</div>
                  <div class="flow-step">
                    <div class="step-label">LZ77输出</div>
                    <div class="step-data">A B (2,2) (5,3) C (8,3)</div>
                  </div>
                  <div class="flow-arrow">↓ Huffman</div>
                  <div class="flow-step">
                    <div class="step-label">最终压缩</div>
                    <div class="step-data">1101011010111010</div>
                  </div>
                </div>
              </div>

              <div class="algo-stats">
                <div class="stat-item">
                  <h4>压缩率</h4>
                  <div class="stat-bar">
                    <div class="bar-fill" :style="{ width: '90%' }">50-80%</div>
                  </div>
                  <p>目前最常用算法</p>
                </div>
                <div class="stat-item">
                  <h4>压缩速度</h4>
                  <div class="stat-bar">
                    <div class="bar-fill medium" :style="{ width: '65%' }">中等</div>
                  </div>
                  <p>双重压缩处理</p>
                </div>
                <div class="stat-item">
                  <h4>解压速度</h4>
                  <div class="stat-bar">
                    <div class="bar-fill fast" :style="{ width: '85%' }">快速</div>
                  </div>
                  <p>硬件优化良好</p>
                </div>
              </div>

              <div class="algo-usage">
                <h4>适用场景</h4>
                <ul>
                  <li>ZIP文件格式</li>
                  <li>GZIP压缩</li>
                  <li>PNG图像格式</li>
                  <li>HTTP内容压缩</li>
                </ul>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'bwt'" class="algorithm-card">
            <div class="algorithm-header">
              <div class="algo-icon">🔄</div>
              <div>
                <h3>BWT变换 (Burrows-Wheeler)</h3>
                <div class="algo-meta">
                  <span>1994年 | Burrows & Wheeler</span>
                </div>
              </div>
            </div>

            <div class="algo-content">
              <div class="algo-principle">
                <h4>基本原理</h4>
                <p>对输入数据进行可逆排列，使相似字符聚集，再通过MTF和熵编码进一步压缩。</p>
                <div class="bwt-example">
                  <div class="example-step">
                    <div>原始: "BANANA"</div>
                    <div>循环移位:</div>
                    <div>1. BANANA</div>
                    <div>2. ANANAB</div>
                    <div>3. NANABA</div>
                    <div>4. ANABAN</div>
                    <div>5. NABANA</div>
                    <div>6. ABANAN</div>
                  </div>
                  <div class="example-step">
                    <div>排序后:</div>
                    <div>1. ABANAN</div>
                    <div>2. ANANAB</div>
                    <div>3. ANABAN</div>
                    <div>4. BANANA</div>
                    <div>5. NABANA</div>
                    <div>6. NANABA</div>
                  </div>
                  <div class="example-step">
                    <div>最后一列: "NNBAAA"</div>
                    <div>原始索引: 4</div>
                  </div>
                </div>
              </div>

              <div class="algo-stats">
                <div class="stat-item">
                  <h4>压缩率</h4>
                  <div class="stat-bar">
                    <div class="bar-fill" :style="{ width: '85%' }">40-70%</div>
                  </div>
                  <p>对文本高效</p>
                </div>
                <div class="stat-item">
                  <h4>压缩速度</h4>
                  <div class="stat-bar">
                    <div class="bar-fill slow" :style="{ width: '40%' }">较慢</div>
                  </div>
                  <p>需要排序操作</p>
                </div>
                <div class="stat-item">
                  <h4>解压速度</h4>
                  <div class="stat-bar">
                    <div class="bar-fill medium" :style="{ width: '70%' }">中等</div>
                  </div>
                  <p>需要逆变换</p>
                </div>
              </div>

              <div class="algo-usage">
                <h4>适用场景</h4>
                <ul>
                  <li>bzip2压缩工具</li>
                  <li>生物信息学序列分析</li>
                  <li>DNA序列压缩</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <div class="section-header">
          <div class="icon">📊</div>
          <h2>算法性能对比</h2>
        </div>

        <div class="comparison-charts">
          <div class="chart">
            <h3>压缩率比较</h3>
            <div class="chart-bars">
              <div class="bar" v-for="algo in compressionRate" :key="algo.name">
                <div class="bar-label">{{ algo.name }}</div>
                <div class="bar-container">
                  <div class="bar-fill" :style="{ width: algo.rate + '%' }">
                    <span class="bar-value">{{ algo.rate }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="chart">
            <h3>压缩速度比较</h3>
            <div class="chart-bars">
              <div class="bar" v-for="algo in compressionSpeed" :key="algo.name">
                <div class="bar-label">{{ algo.name }}</div>
                <div class="bar-container">
                  <div class="bar-fill" :style="{ width: algo.speed + '%' }">
                    <span class="bar-value">{{ algo.speed }}MB/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="usage-table">
          <h3>适用场景总结</h3>
          <table>
            <thead>
              <tr>
                <th>算法</th>
                <th>文本数据</th>
                <th>二进制数据</th>
                <th>实时压缩</th>
                <th>低内存环境</th>
                <th>高压缩率</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in usageTable" :key="row.algorithm">
                <td>{{ row.algorithm }}</td>
                <td><span :class="row.textClass">{{ row.text }}</span></td>
                <td><span :class="row.binaryClass">{{ row.binary }}</span></td>
                <td><span :class="row.realtimeClass">{{ row.realtime }}</span></td>
                <td><span :class="row.memoryClass">{{ row.memory }}</span></td>
                <td><span :class="row.ratioClass">{{ row.ratio }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="application-section">
        <div class="section-header">
          <div class="icon">💼</div>
          <h2>实际应用场景</h2>
        </div>

        <div class="application-cards">
          <div class="app-card">
            <div class="app-icon">📁</div>
            <h3>文件压缩</h3>
            <p>ZIP、RAR、7z等格式使用多种无损算法组合</p>
          </div>
          <div class="app-card">
            <div class="app-icon">🌐</div>
            <h3>网络传输</h3>
            <p>HTTP内容压缩(GZIP, Brotli)减少带宽使用</p>
          </div>
          <div class="app-card">
            <div class="app-icon">🖼️</div>
            <h3>图像存储</h3>
            <p>PNG、TIFF等格式使用无损压缩保存图像</p>
          </div>
          <div class="app-card">
            <div class="app-icon">💾</div>
            <h3>数据库存储</h3>
            <p>列式数据库使用无损压缩减少存储空间</p>
          </div>
          <div class="app-card">
            <div class="app-icon">🔬</div>
            <h3>科学数据</h3>
            <p>医学影像、遥感数据等需要精确重建的领域</p>
          </div>
          <div class="app-card">
            <div class="app-icon">📜</div>
            <h3>版本控制</h3>
            <p>Git等系统使用无损压缩存储历史版本</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 算法标签页
const tabs = [
  { id: 'huffman', label: '霍夫曼编码' },
  { id: 'lzw', label: 'LZW算法' },
  { id: 'deflate', label: 'Deflate' },
  { id: 'bwt', label: 'BWT变换' }
];

const activeTab = ref('huffman');

// 压缩率数据
const compressionRate = [
  { name: 'Huffman', rate: 45 },
  { name: 'LZW', rate: 55 },
  { name: 'Deflate', rate: 75 },
  { name: 'BWT', rate: 65 }
];

// 压缩速度数据
const compressionSpeed = [
  { name: 'Huffman', speed: 35 },
  { name: 'LZW', speed: 70 },
  { name: 'Deflate', speed: 50 },
  { name: 'BWT', speed: 20 }
];

// 适用场景表格
const usageTable = [
  {
    algorithm: 'Huffman',
    text: '优秀',
    binary: '良好',
    realtime: '中等',
    memory: '良好',
    ratio: '中等',
    textClass: 'good',
    binaryClass: 'good',
    realtimeClass: 'medium',
    memoryClass: 'good',
    ratioClass: 'medium'
  },
  {
    algorithm: 'LZW',
    text: '优秀',
    binary: '中等',
    realtime: '优秀',
    memory: '中等',
    ratio: '良好',
    textClass: 'good',
    binaryClass: 'medium',
    realtimeClass: 'good',
    memoryClass: 'medium',
    ratioClass: 'good'
  },
  {
    algorithm: 'Deflate',
    text: '优秀',
    binary: '优秀',
    realtime: '良好',
    memory: '中等',
    ratio: '优秀',
    textClass: 'good',
    binaryClass: 'good',
    realtimeClass: 'good',
    memoryClass: 'medium',
    ratioClass: 'good'
  },
  {
    algorithm: 'BWT',
    text: '卓越',
    binary: '中等',
    realtime: '较差',
    memory: '较差',
    ratio: '卓越',
    textClass: 'excellent',
    binaryClass: 'medium',
    realtimeClass: 'bad',
    memoryClass: 'bad',
    ratioClass: 'excellent'
  }
];
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4895ef;
@huffman-color: #4cc9f0;
@lzw-color: #7209b7;
@deflate-color: #f72585;
@bwt-color: #06d6a0;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2b2d42;
@border-color: #e9ecef;
@good-color: #4caf50;
@medium-color: #ff9800;
@bad-color: #f44336;
@excellent-color: #2196f3;

.compression-algorithms {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: @text-color;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  min-height: 100vh;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: linear-gradient(120deg, @primary-color, @secondary-color);
  border-radius: 16px;
  color: white;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);

  h1 {
    font-size: 2.8rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.8rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid @primary-color;

  .icon {
    font-size: 2rem;
    background: @primary-color;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
  }
}

.content-card {
  background: @card-bg;
  border-radius: 16px;
  padding: 2.2rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);

  h3 {
    color: @primary-color;
    margin-bottom: 1.5rem;
    font-size: 1.6rem;
  }

  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.8;
  }
}

.compression-stats {
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;

  .stat {
    text-align: center;
    padding: 1.5rem;
    flex: 1;

    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 1.1rem;
      color: lighten(@text-color, 20%);
    }
  }
}

.compression-flow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  .flow-step {
    flex: 1;
    text-align: center;
    background: @light-bg;
    border-radius: 12px;
    padding: 1.5rem;

    .step-icon {
      width: 40px;
      height: 40px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      font-weight: bold;
      margin: 0 auto 1rem;
    }

    .data-example {
      font-family: 'Courier New', monospace;
      background: #2b2d42;
      color: white;
      padding: 0.5rem;
      border-radius: 6px;
      margin-top: 0.8rem;
    }
  }

  .flow-arrow {
    font-size: 2rem;
    color: @primary-color;
    padding: 0 1rem;
    font-weight: bold;
  }
}

.algorithm-tabs {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.8rem;
  flex-wrap: wrap;

  button {
    flex: 1;
    min-width: 150px;
    padding: 1rem;
    background: @light-bg;
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: lighten(@primary-color, 40%);
    }

    &.active {
      background: @primary-color;
      color: white;
      box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
    }
  }
}

.algorithm-card {
  background: @card-bg;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.algorithm-header {
  display: flex;
  align-items: center;
  padding: 1.8rem;
  background: linear-gradient(120deg, @primary-color, lighten(@primary-color, 10%));
  color: white;

  .algo-icon {
    font-size: 2.5rem;
    margin-right: 1.5rem;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  .algo-meta {
    font-size: 0.95rem;
    opacity: 0.9;
  }
}

.algo-content {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.algo-principle {
  h4 {
    color: @primary-color;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  p {
    margin-bottom: 1.5rem;
  }
}

.huffman-tree {
  background: @light-bg;
  border-radius: 10px;
  padding: 1.5rem;
  font-family: monospace;

  .tree-node {
    padding: 0.5rem;
    margin: 0.3rem 0;
    background: white;
    border-radius: 6px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }

  .tree-level {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 0.5rem 0;
  }

  .root {
    font-weight: bold;
    background: @huffman-color;
    color: white;
  }
}

.lzw-example, .deflate-flow, .bwt-example {
  background: @light-bg;
  border-radius: 10px;
  padding: 1.2rem;
  font-family: monospace;
  font-size: 0.95rem;

  .example-step, .flow-step {
    padding: 0.5rem 0;
    border-bottom: 1px dashed @border-color;

    &:last-child {
      border-bottom: none;
    }
  }
}

.algo-stats {
  .stat-item {
    margin-bottom: 1.5rem;

    h4 {
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
      color: @secondary-color;
    }
  }
}

.stat-bar {
  height: 25px;
  background: #e9ecef;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  overflow: hidden;

  .bar-fill {
    height: 100%;
    background: linear-gradient(90deg, @primary-color, @accent-color);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
    color: white;
    font-weight: 500;
    min-width: 80px;

    &.fast {
      background: linear-gradient(90deg, #06d6a0, #4ecdc4);
    }

    &.medium {
      background: linear-gradient(90deg, #ffd166, #ff9e00);
    }

    &.slow {
      background: linear-gradient(90deg, #ef476f, #ff6b6b);
    }
  }
}

.algo-usage {
  h4 {
    color: @primary-color;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  ul {
    padding-left: 1.5rem;

    li {
      padding: 0.5rem 0;
      border-bottom: 1px dashed @border-color;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.comparison-charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.chart {
  background: @card-bg;
  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);

  h3 {
    color: @secondary-color;
    margin-bottom: 1.5rem;
    text-align: center;
  }
}

.chart-bars {
  .bar {
    margin-bottom: 1.2rem;

    .bar-label {
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .bar-container {
      height: 30px;
      background: #e9ecef;
      border-radius: 15px;
      overflow: hidden;

      .bar-fill {
        height: 100%;
        background: linear-gradient(90deg, @primary-color, @accent-color);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 15px;
        color: white;
        font-weight: 500;
      }
    }
  }
}

.usage-table {
  background: @card-bg;
  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  overflow-x: auto;

  h3 {
    color: @secondary-color;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 1rem;
      text-align: center;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: @light-bg;
      color: @secondary-color;
      font-weight: 600;
    }

    tr:last-child td {
      border-bottom: none;
    }

    .good {
      background: fade(@good-color, 15%);
      color: darken(@good-color, 20%);
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-weight: 500;
    }

    .medium {
      background: fade(@medium-color, 15%);
      color: darken(@medium-color, 20%);
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-weight: 500;
    }

    .bad {
      background: fade(@bad-color, 15%);
      color: darken(@bad-color, 20%);
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-weight: 500;
    }

    .excellent {
      background: fade(@excellent-color, 15%);
      color: darken(@excellent-color, 25%);
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-weight: 500;
    }
  }
}

.application-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.8rem;
}

.app-card {
  background: @card-bg;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  }

  .app-icon {
    font-size: 3rem;
    margin-bottom: 1.2rem;
    color: @primary-color;
  }

  h3 {
    color: @secondary-color;
    margin-bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1.5rem;

    h1 {
      font-size: 2rem;
    }
  }

  .compression-flow {
    flex-direction: column;

    .flow-step {
      width: 100%;
      margin-bottom: 1.5rem;
    }

    .flow-arrow {
      transform: rotate(90deg);
      margin: 0.5rem 0;
    }
  }

  .algo-content {
    grid-template-columns: 1fr;
  }
}
</style>
