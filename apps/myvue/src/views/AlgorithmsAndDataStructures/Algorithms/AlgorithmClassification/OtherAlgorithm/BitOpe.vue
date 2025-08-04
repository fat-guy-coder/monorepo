<template>
  <div class="sampling-hash-container">
    <header class="header">
      <h1>抽样哈希（Sampling Hash）技术基础介绍</h1>
      <p class="subtitle">高效的大规模数据去重与相似性检测解决方案</p>
    </header>

    <div class="overview-section">
      <div class="overview-card">
        <div class="icon-wrapper">
          <svg class="icon" viewBox="0 0 24 24">
            <path
              d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z" />
          </svg>
        </div>
        <h2>什么是抽样哈希？</h2>
        <p>抽样哈希是一种通过提取数据样本生成唯一标识的技术，它结合了<strong>数据抽样</strong>和<strong>哈希算法</strong>的优势，能够高效地处理大规模数据集。</p>
      </div>

      <div class="overview-card">
        <div class="icon-wrapper">
          <svg class="icon" viewBox="0 0 24 24">
            <path
              d="M9,7V17H11V13H14V11H11V9H15V7H9M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3Z" />
          </svg>
        </div>
        <h2>核心思想</h2>
        <p>从大数据集中提取代表性样本，对这些样本应用哈希函数生成固定长度的唯一标识符，代替对整个数据集进行哈希计算。</p>
      </div>
    </div>

    <div class="content-section">
      <div class="section">
        <h2 class="section-title">
          <span class="icon-badge">📊</span>
          抽样哈希的核心作用
        </h2>

        <div class="features-grid">
          <div class="feature-card">
            <h3>提升计算效率</h3>
            <p>避免处理整个数据集，计算复杂度从 O(n) 降低到 O(k)，k为样本大小</p>
          </div>

          <div class="feature-card">
            <h3>节省存储空间</h3>
            <p>哈希值大小固定（通常128-256位），远小于原始数据</p>
          </div>

          <div class="feature-card">
            <h3>支持相似性比较</h3>
            <p>通过比较哈希值可以判断数据相似度，适用于模糊匹配</p>
          </div>

          <div class="feature-card">
            <h3>降低网络传输</h3>
            <p>传输小尺寸哈希值代替大文件，节省带宽资源</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">
          <span class="icon-badge">🔍</span>
          关键技术原理
        </h2>

        <div class="principles">
          <div class="principle">
            <h3>1. 数据抽样策略</h3>
            <p>选择最能代表整体数据的样本：</p>
            <ul>
              <li><strong>固定间隔抽样</strong>：每N字节/元素取一个样本</li>
              <li><strong>关键特征抽样</strong>：提取文件头、特定偏移量数据</li>
              <li><strong>内容感知抽样</strong>：基于内容特征选择样本点</li>
            </ul>
          </div>

          <div class="principle">
            <h3>2. 哈希算法选择</h3>
            <p>根据需求选择合适的哈希函数：</p>
            <div class="algorithms">
              <div class="algorithm">
                <div class="algorithm-name">MD5</div>
                <div class="algorithm-desc">128位，计算快，安全性低</div>
              </div>
              <div class="algorithm">
                <div class="algorithm-name">SHA-256</div>
                <div class="algorithm-desc">256位，安全性高，计算较慢</div>
              </div>
              <div class="algorithm">
                <div class="algorithm-name">MurmurHash</div>
                <div class="algorithm-desc">高性能，非加密场景首选</div>
              </div>
              <div class="algorithm">
                <div class="algorithm-name">SimHash</div>
                <div class="algorithm-desc">专为相似性检测设计</div>
              </div>
            </div>
          </div>

          <div class="principle">
            <h3>3. 哈希值比较</h3>
            <p>通过汉明距离或相似度算法比较哈希值：</p>
            <div class="similarity">
              <div class="similarity-example">
                <div>哈希A: <code>10110101</code></div>
                <div>哈希B: <code>10011101</code></div>
                <div class="distance">汉明距离: 2</div>
              </div>
              <div class="similarity-formula">
                相似度 = 1 - (汉明距离 / 总位数)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">
          <span class="icon-badge">🚀</span>
          实际应用场景
        </h2>

        <div class="scenarios">
          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">🔄</div>
              <h3>文件去重系统</h3>
            </div>
            <p>识别重复文件，即使文件名不同或小部分内容修改</p>
            <ul>
              <li>云存储服务节省空间</li>
              <li>数据备份系统消除冗余</li>
              <li>内容管理系统避免重复上传</li>
            </ul>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">🔗</div>
              <h3>P2P文件共享</h3>
            </div>
            <p>快速查找网络中的相似文件资源</p>
            <ul>
              <li>BitTorrent协议的文件分块验证</li>
              <li>分布式系统中的内容寻址</li>
              <li>跨节点数据同步</li>
            </ul>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">🛡️</div>
              <h3>安全与审计</h3>
            </div>
            <p>检测文件篡改和恶意软件变种</p>
            <ul>
              <li>入侵检测系统(IDS)</li>
              <li>数字取证分析</li>
              <li>病毒特征识别</li>
            </ul>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">📱</div>
              <h3>内容推荐系统</h3>
            </div>
            <p>基于内容相似度的个性化推荐</p>
            <ul>
              <li>视频/音乐内容推荐</li>
              <li>文档/新闻相似推荐</li>
              <li>图片/视觉内容匹配</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">
          <span class="icon-badge">💻</span>
          实现示例
        </h2>

        <div class="implementation">
          <div class="code-block">
            <h3>抽样哈希生成算法（TypeScript）</h3>
            <pre><code>import { createHash } from 'crypto';

// 生成文件的抽样哈希
async function generateSamplingHash(file: File, sampleSize = 1024): Promise&lt;string&gt; {
  // 1. 获取文件样本数据
  const samples = await getFileSamples(file, sampleSize);

  // 2. 创建哈希实例
  const hash = createHash('sha256');

  // 3. 处理样本数据
  samples.forEach(sample => {
    hash.update(sample);
  });

  // 4. 生成哈希摘要
  return hash.digest('hex');
}

// 从文件中获取样本数据
async function getFileSamples(file: File, sampleSize: number): Promise&lt;Uint8Array[]&gt; {
  const samples: Uint8Array[] = [];
  const totalSamples = 10; // 抽样点数量
  const fileSize = file.size;

  // 读取文件切片作为样本
  for (let i = 0; i < totalSamples; i++) {
    const start = Math.floor((i / totalSamples) * fileSize);
    const end = Math.min(start + sampleSize, fileSize);

    const slice = file.slice(start, end);
    const arrayBuffer = await slice.arrayBuffer();
    samples.push(new Uint8Array(arrayBuffer));
  }

  // 添加文件头尾样本
  const header = file.slice(0, Math.min(1024, fileSize));
  const headerBuffer = await header.arrayBuffer();
  samples.push(new Uint8Array(headerBuffer));

  const footer = file.slice(Math.max(0, fileSize - 1024), fileSize);
  const footerBuffer = await footer.arrayBuffer();
  samples.push(new Uint8Array(footerBuffer));

  return samples;
}

// 比较两个抽样哈希的相似度
function compareSamplingHashes(hash1: string, hash2: string): number {
  // 将十六进制哈希转换为二进制字符串
  const bin1 = hexToBin(hash1);
  const bin2 = hexToBin(hash2);

  // 计算汉明距离
  let distance = 0;
  for (let i = 0; i < bin1.length; i++) {
    if (bin1[i] !== bin2[i]) distance++;
  }

  // 计算相似度 (0-1)
  return 1 - (distance / bin1.length);
}

// 十六进制转二进制
function hexToBin(hex: string): string {
  return Array.from(hex).map(h =>
    parseInt(h, 16).toString(2).padStart(4, '0')
  ).join('');
}</code></pre>
          </div>

          <div class="comparison">
            <h3>抽样哈希 vs 完整哈希</h3>
            <table>
              <thead>
                <tr>
                  <th>对比维度</th>
                  <th>抽样哈希</th>
                  <th>完整哈希</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>计算时间</td>
                  <td class="better">极快 (O(k))</td>
                  <td>慢 (O(n))</td>
                </tr>
                <tr>
                  <td>存储需求</td>
                  <td class="better">小 (固定大小)</td>
                  <td>小 (固定大小)</td>
                </tr>
                <tr>
                  <td>内存占用</td>
                  <td class="better">低 (仅样本)</td>
                  <td>高 (整个文件)</td>
                </tr>
                <tr>
                  <td>精确度</td>
                  <td>较高 (可配置)</td>
                  <td class="better">完美</td>
                </tr>
                <tr>
                  <td>篡改检测</td>
                  <td>局部修改可能遗漏</td>
                  <td class="better">任何修改都可检测</td>
                </tr>
                <tr>
                  <td>相似性检测</td>
                  <td class="better">支持</td>
                  <td>不支持</td>
                </tr>
                <tr>
                  <td>适用场景</td>
                  <td>大规模数据、相似性匹配</td>
                  <td>完整性校验、安全验证</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="best-practices">
      <h2 class="section-title">
        <span class="icon-badge">✅</span>
        最佳实践与注意事项
      </h2>

      <div class="practices-grid">
        <div class="practice-card">
          <h3>抽样策略选择</h3>
          <ul>
            <li>根据数据类型选择抽样方法（固定间隔/关键特征）</li>
            <li>平衡样本大小与计算开销</li>
            <li>对结构化数据使用分层抽样</li>
          </ul>
        </div>

        <div class="practice-card">
          <h3>哈希算法选择</h3>
          <ul>
            <li>安全场景使用SHA-256</li>
            <li>高性能需求使用MurmurHash</li>
            <li>相似性检测使用SimHash</li>
          </ul>
        </div>

        <div class="practice-card">
          <h3>避免哈希冲突</h3>
          <ul>
            <li>增加哈希长度（256位以上）</li>
            <li>组合多个哈希算法</li>
            <li>重要场景添加额外校验</li>
          </ul>
        </div>

        <div class="practice-card">
          <h3>性能优化</h3>
          <ul>
            <li>使用Web Workers后台计算</li>
            <li>增量计算哈希值</li>
            <li>缓存常用文件哈希</li>
          </ul>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>抽样哈希技术是大规模数据处理的关键技术，在效率与准确性之间取得平衡，适用于现代数据密集型应用场景</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 这里可以添加组件逻辑
const sampleData = ref({
  fileSize: "1GB",
  sampleSize: "10KB",
  hashTime: "0.5s",
  fullHashTime: "15s"
});
</script>

<style scoped lang="less">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 颜色变量
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #2ecc71;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e1e4e8;
@text-color: #333333;
@light-text: #6c757d;
@code-bg: #f5f7fa;
@success-color: #27ae60;
@warning-color: #f39c12;

// 基础样式
.sampling-hash-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: @text-color;
  background-color: @light-bg;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: @secondary-color;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @light-text;
    font-weight: 400;
  }
}

.overview-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.overview-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h2 {
    font-size: 1.6rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: @secondary-color;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
  }
}

.icon-wrapper {
  background: lighten(@primary-color, 40%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.icon {
  width: 48px;
  height: 48px;
  fill: @primary-color;
}

.section {
  background: @card-bg;
  border-radius: 12px;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 1.8rem;
  color: @secondary-color;
  margin-top: 0;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid @border-color;
  display: flex;
  align-items: center;

  .icon-badge {
    background: lighten(@primary-color, 40%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    font-size: 1.3rem;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: lighten(@primary-color, 45%);
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 4px solid @primary-color;

  h3 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 1rem;
    color: darken(@primary-color, 10%);
  }

  p {
    margin: 0;
  }
}

.principles {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.principle {
  h3 {
    font-size: 1.4rem;
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 1rem;
    padding-left: 1.8rem;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.7rem;
      width: 1.2rem;
      height: 0.3rem;
      background: @primary-color;
      border-radius: 3px;
    }
  }

  ul {
    padding-left: 1.8rem;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.6;
    }
  }
}

.algorithms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.algorithm {
  background: lighten(@accent-color, 50%);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid lighten(@accent-color, 30%);

  .algorithm-name {
    font-weight: 600;
    color: darken(@accent-color, 20%);
    margin-bottom: 0.5rem;
  }
}

.similarity {
  background: lighten(@warning-color, 45%);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
}

.similarity-example {
  font-family: 'Fira Code', monospace;
  margin-bottom: 1rem;

  .distance {
    font-weight: 600;
    color: @warning-color;
    margin-top: 0.5rem;
  }
}

.similarity-formula {
  background: @light-bg;
  border-radius: 6px;
  padding: 1rem;
  font-family: 'Fira Code', monospace;
  text-align: center;
  font-weight: 500;
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  background: @light-bg;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);

  .scenario-header {
    background: lighten(@primary-color, 35%);
    padding: 1.2rem;
    display: flex;
    align-items: center;

    .scenario-icon {
      font-size: 1.5rem;
      margin-right: 1rem;
    }

    h3 {
      margin: 0;
      color: @secondary-color;
    }
  }

  p {
    padding: 1.2rem 1.2rem 0.5rem;
    font-weight: 500;
    margin: 0;
  }

  ul {
    padding: 0.5rem 1.2rem 1.2rem 2.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
}

.implementation {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 992px) {
    grid-template-columns: 1.5fr 1fr;
  }
}

.code-block {
  background: @code-bg;
  border-radius: 8px;
  overflow: hidden;

  h3 {
    background: darken(@code-bg, 10%);
    margin: 0;
    padding: 1rem 1.5rem;
    font-size: 1.2rem;
  }

  pre {
    margin: 0;
    padding: 1.5rem;
    overflow-x: auto;

    code {
      color: #2c3e50;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
}

.comparison {
  h3 {
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: @secondary-color;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  background: @card-bg;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid @border-color;
  }

  th {
    background: lighten(@primary-color, 40%);
    font-weight: 600;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  .better {
    color: @success-color;
    font-weight: 500;
  }
}

.best-practices {
  background: @card-bg;
  border-radius: 12px;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  background: @light-bg;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 3px solid @accent-color;

  h3 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 1rem;
    color: darken(@accent-color, 15%);
  }

  ul {
    padding-left: 1.2rem;
    margin-bottom: 0;

    li {
      margin-bottom: 0.6rem;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid @border-color;
  color: @light-text;
  font-style: italic;
}

@media (max-width: 768px) {
  .sampling-hash-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .overview-section {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 1.5rem;
  }
}
</style>
