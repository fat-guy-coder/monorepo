<template>
  <div class="lossy-compression-container">
    <!-- 标题区域 -->
    <section class="header-section">
      <h1 class="title">有损压缩算法</h1>
      <div class="subtitle">在质量与效率之间寻找平衡</div>
      <div class="header-stats">
        <div class="stat-card">
          <div class="stat-icon">📉</div>
          <div class="stat-value">50-95%</div>
          <div class="stat-label">压缩率范围</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-value">高速</div>
          <div class="stat-label">压缩速度</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">👁️</div>
          <div class="stat-value">感知压缩</div>
          <div class="stat-label">核心思想</div>
        </div>
      </div>
    </section>

    <!-- 概念介绍 -->
    <section class="content-section">
      <h2 class="section-title">📖 什么是有损压缩？</h2>
      <div class="concept-card">
        <div class="concept-text">
          <p>
            <strong>有损压缩算法</strong>是一种通过<strong>永久性删除部分数据</strong>来减小文件大小的压缩方法，
            利用人类感知系统的局限性，去除人眼或人耳不易察觉的信息。
          </p>
          <p>
            与无损压缩不同，有损压缩<strong>无法完全恢复原始数据</strong>，
            但能实现远高于无损压缩的压缩率，特别适合多媒体数据。
          </p>
          <div class="highlight-box">
            <div class="highlight-icon">💡</div>
            <div class="highlight-content">
              有损压缩的核心是<strong>感知编码</strong>，利用人类视觉系统(HVS)和听觉系统(HAS)的局限性，
              去除冗余信息和不可感知信息以节省空间。
            </div>
          </div>
        </div>
        <div class="compression-visual">
          <div class="visual-title">有损压缩过程</div>
          <div class="process-diagram">
            <div class="process-step">
              <div class="step-icon">1</div>
              <div class="step-content">
                <strong>原始数据</strong>
                <div class="data-representation original"></div>
              </div>
            </div>
            <div class="process-arrow">→</div>
            <div class="process-step">
              <div class="step-icon">2</div>
              <div class="step-content">
                <strong>感知模型分析</strong>
                <div class="data-representation filtered"></div>
              </div>
            </div>
            <div class="process-arrow">→</div>
            <div class="process-step">
              <div class="step-icon">3</div>
              <div class="step-content">
                <strong>压缩输出</strong>
                <div class="data-representation compressed"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心原理 -->
    <section class="content-section">
      <h2 class="section-title">⚙️ 有损压缩技术原理</h2>

      <div class="principles-container">
        <div class="principle-card">
          <div class="principle-icon">👁️</div>
          <div class="principle-content">
            <h3>感知模型</h3>
            <p>利用人类感官的局限性识别可移除信息</p>
          </div>
        </div>

        <div class="principle-card">
          <div class="principle-icon">📊</div>
          <div class="principle-content">
            <h3>变换编码</h3>
            <p>使用DCT/小波变换将数据转换到频域</p>
          </div>
        </div>

        <div class="principle-card">
          <div class="principle-icon">⚖️</div>
          <div class="principle-content">
            <h3>量化</h3>
            <p>降低高频分量精度，进行数值离散化</p>
          </div>
        </div>

        <div class="principle-card">
          <div class="principle-icon">🧩</div>
          <div class="principle-content">
            <h3>预测编码</h3>
            <p>基于邻近像素预测当前值，编码差异</p>
          </div>
        </div>

        <div class="principle-card">
          <div class="principle-icon">📦</div>
          <div class="principle-content">
            <h3>熵编码</h3>
            <p>使用霍夫曼/算术编码压缩量化数据</p>
          </div>
        </div>
      </div>

      <div class="compression-comparison">
        <div class="comparison-header">
          <h3>有损压缩 VS 无损压缩</h3>
        </div>
        <div class="comparison-table">
          <div class="table-header">
            <div class="header-item">特性</div>
            <div class="header-item">有损压缩</div>
            <div class="header-item">无损压缩</div>
          </div>
          <div class="table-row">
            <div class="row-item">数据恢复</div>
            <div class="row-item lossy">无法恢复原始数据</div>
            <div class="row-item lossless">可完全恢复</div>
          </div>
          <div class="table-row">
            <div class="row-item">压缩率</div>
            <div class="row-item lossy">高 (10:1 到 100:1)</div>
            <div class="row-item lossless">低 (2:1 到 10:1)</div>
          </div>
          <div class="table-row">
            <div class="row-item">适用场景</div>
            <div class="row-item lossy">多媒体、流媒体</div>
            <div class="row-item lossless">文本、代码、数据库</div>
          </div>
          <div class="table-row">
            <div class="row-item">压缩速度</div>
            <div class="row-item lossy">较快（非实时）到极快（实时）</div>
            <div class="row-item lossless">中度到较慢</div>
          </div>
          <div class="table-row">
            <div class="row-item">算法复杂度</div>
            <div class="row-item lossy">高（编码）低（解码）</div>
            <div class="row-item lossless">对称</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 主要算法 -->
    <section class="content-section">
      <h2 class="section-title">📚 主要算法与技术</h2>

      <div class="algorithm-tabs">
        <div class="tabs-header">
          <div
            v-for="(algo, index) in algorithms"
            :key="index"
            :class="['tab-item', { active: activeTab === index }]"
            @click="activeTab = index"
          >
            {{ algo.name }}
          </div>
        </div>

        <div class="tab-content">
          <div v-if="activeAlgorithm" class="algorithm-detail">
            <div class="algorithm-header">
              <div class="algo-icon">{{ activeAlgorithm.icon }}</div>
              <div class="algo-info">
                <h3>{{ activeAlgorithm.name }} ({{ activeAlgorithm.year }})</h3>
                <div class="algo-description">{{ activeAlgorithm.description }}</div>
              </div>
            </div>

            <div class="algorithm-stats">
              <div class="stat">
                <div class="stat-label">压缩率</div>
                <div class="stat-bar">
                  <div
                    class="bar-fill"
                    :style="{ width: activeAlgorithm.compressionRatio + '%' }"
                  ></div>
                  <div class="bar-label">{{ activeAlgorithm.compressionRatio }}%</div>
                </div>
              </div>

              <div class="stat">
                <div class="stat-label">压缩速度</div>
                <div class="stat-bar">
                  <div
                    class="bar-fill"
                    :style="{ width: activeAlgorithm.speed + '%' }"
                  ></div>
                  <div class="bar-label">{{ activeAlgorithm.speedLabel }}</div>
                </div>
              </div>

              <div class="stat">
                <div class="stat-label">质量保持</div>
                <div class="stat-bar">
                  <div
                    class="bar-fill"
                    :style="{ width: activeAlgorithm.quality + '%' }"
                  ></div>
                  <div class="bar-label">{{ activeAlgorithm.qualityLabel }}</div>
                </div>
              </div>
            </div>

            <div class="algorithm-techniques">
              <h4>核心技术：</h4>
              <ul>
                <li v-for="(tech, idx) in activeAlgorithm.techniques" :key="idx">{{ tech }}</li>
              </ul>
            </div>

            <div class="algorithm-applications">
              <h4>典型应用：</h4>
              <div class="app-tags">
                <span v-for="(app, idx) in activeAlgorithm.applications" :key="idx" class="app-tag">
                  {{ app }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 压缩率与质量 -->
    <section class="content-section">
      <h2 class="section-title">📏 压缩率与质量平衡</h2>

      <div class="quality-compression">
        <div class="rate-quality-chart">
          <div class="chart-title">压缩率 vs 感知质量</div>
          <div class="chart-container">
            <div class="chart-y-axis">
              <div>100%</div>
              <div>75%</div>
              <div>50%</div>
              <div>25%</div>
              <div>0%</div>
            </div>
            <div class="chart-grid">
              <div class="grid-line" v-for="i in 5" :key="i"></div>
            </div>
            <div
              class="quality-curve"
              :style="{ height: '220px', background: 'linear-gradient(to top, #4a6cf7, #42b983)' }"
            >
              <div
                v-for="(point, idx) in qualityCurve"
                :key="idx"
                class="curve-point"
                :style="{ left: point.position + '%', top: 100 - point.quality + '%' }"
              >
                <div class="point-value">{{ point.compression }}:1</div>
              </div>
            </div>
            <div class="chart-x-axis">
              <div>5:1</div>
              <div>10:1</div>
              <div>20:1</div>
              <div>50:1</div>
              <div>100:1</div>
            </div>
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <div class="color-box" style="background-color: #4a6cf7;"></div>
              <div>高感知质量区域</div>
            </div>
            <div class="legend-item">
              <div class="color-box" style="background-color: #42b983;"></div>
              <div>可接受质量区域</div>
            </div>
          </div>
        </div>

        <div class="quality-factors">
          <h3>影响感知质量的关键因素</h3>
          <ul>
            <li>
              <strong>量化参数(QP)</strong>：控制压缩程度的主要参数
              <div class="qp-example">
                <div class="qp-item" v-for="qp in [10, 25, 40, 60]" :key="qp">
                  <div class="qp-label">QP {{ qp }}</div>
                  <div class="qp-bar" :style="{ width: (100 - qp) + '%' }"></div>
                </div>
              </div>
            </li>
            <li>
              <strong>码率控制</strong>：恒定码率(CBR) vs 可变码率(VBR)
              <div class="bitrate-comparison">
                <div class="bitrate-type">
                  <div class="bitrate-label">CBR</div>
                  <div class="bitrate-bar constant"></div>
                </div>
                <div class="bitrate-type">
                  <div class="bitrate-label">VBR</div>
                  <div class="bitrate-bar variable"></div>
                </div>
              </div>
            </li>
            <li>
              <strong>关键帧间隔</strong>：影响随机访问能力和压缩效率
            </li>
            <li>
              <strong>分辨率与采样率</strong>：源数据质量直接影响压缩效果
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 应用场景 -->
    <section class="content-section">
      <h2 class="section-title">🌐 应用场景</h2>

      <div class="applications-grid">
        <div class="app-card">
          <div class="app-icon">🖼️</div>
          <h3>图像压缩</h3>
          <p>JPEG, WebP, HEIC格式广泛应用于摄影、网页</p>
          <div class="compression-stats">
            <span>压缩率: 10:1 - 20:1</span>
            <span>质量标准: SSIM > 0.95</span>
          </div>
        </div>

        <div class="app-card">
          <div class="app-icon">🎬</div>
          <h3>视频流媒体</h3>
          <p>H.264, HEVC, AV1用于YouTube, Netflix等平台</p>
          <div class="compression-stats">
            <span>压缩率: 50:1 - 100:1</span>
            <span>码率: 1-8 Mbps (1080p)</span>
          </div>
        </div>

        <div class="app-card">
          <div class="app-icon">🎵</div>
          <h3>音频压缩</h3>
          <p>MP3, AAC, Opus用于音乐流媒体和语音通话</p>
          <div class="compression-stats">
            <span>压缩率: 10:1 - 20:1</span>
            <span>码率: 64-256 kbps</span>
          </div>
        </div>

        <div class="app-card">
          <div class="app-icon">📡</div>
          <h3>实时通信</h3>
          <p>视频会议、直播使用VP9, AV1等低延迟编解码器</p>
          <div class="compression-stats">
            <span>延迟: <100ms</span>
            <span>分辨率: 720p - 4K</span>
          </div>
        </div>

        <div class="app-card">
          <div class="app-icon">🎮</div>
          <h3>游戏与VR</h3>
          <p>纹理压缩、几何压缩用于实时渲染</p>
          <div class="compression-stats">
            <span>压缩率: 4:1 - 6:1</span>
            <span>格式: ASTC, ETC2</span>
          </div>
        </div>

        <div class="app-card">
          <div class="app-icon">📱</div>
          <h3>移动设备</h3>
          <p>高效格式节省存储空间和带宽</p>
          <div class="compression-stats">
            <span>格式: HEIF, HEVC</span>
            <span>节省: 50%存储</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 未来趋势 -->
    <section class="content-section">
      <h2 class="section-title">🚀 未来发展趋势</h2>

      <div class="future-trends">
        <div class="trend-card">
          <div class="trend-icon">🧠</div>
          <h3>AI驱动的压缩</h3>
          <p>神经网络学习最优压缩策略，超越传统编码工具</p>
          <div class="trend-stats">
            <div class="trend-bar">
              <div class="bar-fill ai"></div>
              <div>效率提升30-50%</div>
            </div>
          </div>
        </div>

        <div class="trend-card">
          <div class="trend-icon">🌍</div>
          <h3>沉浸式媒体</h3>
          <p>VR/AR、360°视频、点云压缩技术发展</p>
          <div class="trend-stats">
            <div class="trend-bar">
              <div class="bar-fill vr"></div>
              <div>压缩需求增长5倍</div>
            </div>
          </div>
        </div>

        <div class="trend-card">
          <div class="trend-icon">📱</div>
          <h3>端侧智能压缩</h3>
          <p>手机本地实时压缩，减少云依赖</p>
          <div class="trend-stats">
            <div class="trend-bar">
              <div class="bar-fill edge"></div>
              <div>延迟降低80%</div>
            </div>
          </div>
        </div>

        <div class="trend-card">
          <div class="trend-icon">🧬</div>
          <h3>感知模型优化</h3>
          <p>基于个体差异的自适应压缩策略</p>
          <div class="trend-stats">
            <div class="trend-bar">
              <div class="bar-fill adaptive"></div>
              <div>质量提升感知20%</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section class="content-section summary-section">
      <h2 class="section-title">🎯 总结</h2>

      <div class="summary-content">
        <div class="key-point">
          <div class="point-icon">🔑</div>
          <div class="point-text">有损压缩是现代多媒体技术的基石，在<strong>感知质量</strong>和<strong>存储效率</strong>之间找到最佳平衡点</div>
        </div>

        <div class="key-point">
          <div class="point-icon">📱</div>
          <div class="point-text">从流媒体服务到移动设备，有损压缩使<strong>高质量多媒体内容</strong>在全球范围内高效分发成为可能</div>
        </div>

        <div class="key-point">
          <div class="point-icon">🧠</div>
          <div class="point-text">AI和机器学习正在推动新一代感知压缩技术发展，实现<strong>更高压缩率</strong>和<strong>更好视觉效果</strong></div>
        </div>

        <div class="key-point">
          <div class="point-icon">⚙️</div>
          <div class="point-text">选择合适的有损压缩算法需要权衡<strong>压缩率</strong>、<strong>质量要求</strong>、<strong>处理能力</strong>和<strong>延迟限制</strong></div>
        </div>
      </div>

      <div class="quote-box">
        <div class="quote-icon">💬</div>
        <div class="quote-content">
          "优秀的有损压缩算法不是简单地丢弃数据，而是以艺术的方式保留最重要的信息，
          让人类感知系统认为没有丢失任何有价值的内容。"
          <div class="quote-author">- 多媒体压缩领域专家</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 算法数据
const algorithms = ref([
  {
    name: "JPEG",
    year: "1992",
    icon: "🖼️",
    description: "最广泛使用的图像压缩标准，特别适合照片和逼真图像",
    compressionRatio: 85,
    speed: 90,
    quality: 75,
    speedLabel: "非常快",
    qualityLabel: "良好（存在块效应）",
    techniques: [
      "离散余弦变换(DCT)",
      "色彩空间转换(YCbCr)",
      "量化表控制压缩级别",
      "之字形扫描",
      "霍夫曼编码"
    ],
    applications: ["数码摄影", "网页图像", "电子邮件附件", "社交分享"]
  },
  {
    name: "MP3",
    year: "1993",
    icon: "🎵",
    description: "音频压缩的革命性技术，使数字音乐成为主流",
    compressionRatio: 90,
    speed: 85,
    quality: 80,
    speedLabel: "快速",
    qualityLabel: "良好（高频衰减）",
    techniques: [
      "心理声学模型",
      "掩蔽效应利用",
      "改进离散余弦变换(MDCT)",
      "比特池技术",
      "哈夫曼编码"
    ],
    applications: ["音乐流媒体", "播客", "数字电台", "音频存储"]
  },
  {
    name: "H.264/AVC",
    year: "2003",
    icon: "📹",
    description: "最流行的视频压缩标准，广泛用于流媒体和广播",
    compressionRatio: 75,
    speed: 70,
    quality: 85,
    speedLabel: "中等",
    qualityLabel: "优秀",
    techniques: [
      "帧间预测",
      "运动估计与补偿",
      "4×4整数变换",
      "熵编码(CAVLC/CABAC)",
      "去块效应滤波器"
    ],
    applications: ["蓝光光盘", "YouTube", "视频会议", "电视广播"]
  },
  {
    name: "HEVC/H.265",
    year: "2013",
    icon: "🎞️",
    description: "H.264的继任者，提供两倍的压缩效率",
    compressionRatio: 50,
    speed: 50,
    quality: 90,
    speedLabel: "较慢",
    qualityLabel: "卓越",
    techniques: [
      "更大的编码单元(64×64)",
      "35种预测方向",
      "采样点自适应偏移",
      "并行处理结构",
      "更高效的熵编码"
    ],
    applications: ["4K/8K视频", "HEIF图像", "VR内容", "移动流媒体"]
  },
  {
    name: "AV1",
    year: "2018",
    icon: "🆕",
    description: "开源免版税视频编码，Netflix和YouTube的新选择",
    compressionRatio: 45,
    speed: 45,
    quality: 92,
    speedLabel: "慢（编码）",
    qualityLabel: "卓越",
    techniques: [
      "递归分区",
      "帧内方向预测",
      "运动补偿时序滤波",
      "约束方向增强",
      "多符号算术编码"
    ],
    applications: ["WebRTC", "浏览器视频", "开源平台", "低带宽场景"]
  }
]);

const activeTab = ref(0);

const activeAlgorithm = computed(() => {
  return algorithms.value[activeTab.value];
});

// 压缩率-质量曲线数据
const qualityCurve = computed(() => {
  return [
    { compression: 5, quality: 95, position: 5 },
    { compression: 10, quality: 85, position: 15 },
    { compression: 20, quality: 75, position: 30 },
    { compression: 50, quality: 40, position: 60 },
    { compression: 100, quality: 15, position: 90 }
  ];
});
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #4a6cf7;
@secondary-color: #6e45e2;
@accent-color: #42b983;
@warning-color: #ff9f43;
@light-bg: #f8f9ff;
@border-color: #e0e7ff;
@text-color: #2c3e50;
@text-light: #7e8a9a;
@card-shadow: 0 4px 12px rgba(110, 69, 226, 0.08);
@highlight-bg: rgba(74, 108, 247, 0.05);

// 基础样式
.lossy-compression-container {
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

  .compression-visual {
    flex: 0 0 380px;
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

// 压缩过程可视化
.process-diagram {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;

  .process-step {
    text-align: center;
    flex: 1;

    .step-icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      line-height: 30px;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }
  }

  .process-arrow {
    font-size: 1.5rem;
    color: @text-light;
    margin: 0 0.5rem;
  }
}

.data-representation {
  height: 80px;
  margin-top: 0.5rem;
  border-radius: 6px;

  &.original {
    background: linear-gradient(to right,
      #4a6cf7, #6e45e2, #ff9f43, #42b983, #4a6cf7, #6e45e2);
  }

  &.filtered {
    background: linear-gradient(to right,
      #4a6cf7, #6e45e2, #ff9f43, #42b983);
  }

  &.compressed {
    background: linear-gradient(to right,
      #4a6cf7, #42b983);
  }
}

.principles-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;

  .principle-card {
    flex: 1;
    min-width: 180px;
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

.compression-comparison {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

  .comparison-header {
    text-align: center;
    margin-bottom: 1.5rem;

    h3 {
      margin: 0;
      color: @primary-color;
    }
  }

  .comparison-table {
    display: table;
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;

    .table-header, .table-row {
      display: table-row;

      > div {
        display: table-cell;
        padding: 1rem;
        border: 1px solid @border-color;
      }
    }

    .table-header {
      background: @light-bg;
      font-weight: 700;

      > div {
        text-align: center;
      }
    }

    .table-row {
      &:nth-child(odd) {
        background: white;
      }

      &:nth-child(even) {
        background: #fafbff;
      }
    }

    .lossy {
      color: @warning-color;
      font-weight: 500;
    }

    .lossless {
      color: @accent-color;
      font-weight: 500;
    }
  }
}

.algorithm-tabs {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

  .tabs-header {
    display: flex;
    background: @light-bg;
    border-bottom: 1px solid @border-color;

    .tab-item {
      padding: 1.2rem 1.5rem;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
      border-bottom: 3px solid transparent;

      &.active {
        border-bottom: 3px solid @primary-color;
        background: white;
        color: @primary-color;
      }

      &:hover:not(.active) {
        background: rgba(255, 255, 255, 0.7);
      }
    }
  }

  .tab-content {
    padding: 2rem;

    .algorithm-detail {
      .algorithm-header {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid @border-color;

        .algo-icon {
          font-size: 2.5rem;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: @light-bg;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .algo-info {
          flex: 1;

          h3 {
            margin: 0 0 0.5rem;
          }

          .algo-description {
            color: @text-light;
          }
        }
      }
    }
  }
}

.algorithm-stats {
  margin: 1.5rem 0;

  .stat {
    margin-bottom: 1rem;

    .stat-label {
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .stat-bar {
      height: 28px;
      background: #f0f4ff;
      border-radius: 14px;
      position: relative;

      .bar-fill {
        height: 100%;
        background: linear-gradient(to right, @primary-color, @accent-color);
        border-radius: 14px;
        min-width: 40px;
      }

      .bar-label {
        position: absolute;
        top: 0;
        left: 15px;
        line-height: 28px;
        color: white;
        font-weight: 500;
      }
    }
  }
}

.algorithm-techniques {
  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      position: relative;
      padding-left: 1.25rem;

      &::before {
        content: "•";
        color: @primary-color;
        font-weight: bold;
        position: absolute;
        left: 0;
      }
    }
  }
}

.algorithm-applications {
  margin-top: 1.5rem;

  .app-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    .app-tag {
      background: @light-bg;
      color: @primary-color;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.9rem;
      border: 1px solid @border-color;
    }
  }
}

.quality-compression {
  display: flex;
  gap: 2rem;

  .rate-quality-chart {
    flex: 1;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    .chart-title {
      font-weight: 600;
      text-align: center;
      margin-bottom: 1.5rem;
      color: @primary-color;
    }
  }

  .quality-factors {
    flex: 1;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    ul {
      padding-left: 1.2rem;

      li {
        margin-bottom: 1.5rem;
      }
    }
  }
}

.chart-container {
  display: flex;
  height: 250px;
  margin-bottom: 1.5rem;
}

.chart-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  font-size: 0.85rem;
  color: @text-light;
  padding-right: 0.5rem;
}

.chart-grid {
  flex: 1;
  position: relative;
  border-left: 1px solid @border-color;
  border-bottom: 1px solid @border-color;

  .grid-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: @border-color;

    &:nth-child(1) { top: 0%; }
    &:nth-child(2) { top: 25%; }
    &:nth-child(3) { top: 50%; }
    &:nth-child(4) { top: 75%; }
    &:nth-child(5) { top: 100%; }
  }
}

.quality-curve {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 4px 4px 0 0;
}

.curve-point {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border: 2px solid white;
  border-radius: 50%;
  background: @primary-color;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  .point-value {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    background: @light-bg;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
    font-weight: 500;
  }
}

.chart-x-axis {
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: @text-light;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .color-box {
      width: 20px;
      height: 20px;
      border-radius: 4px;
    }
  }
}

.qp-example {
  margin-top: 0.5rem;

  .qp-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    .qp-label {
      width: 60px;
      font-size: 0.9rem;
      color: @text-light;
    }

    .qp-bar {
      height: 8px;
      background: linear-gradient(to right, @accent-color, @warning-color);
      border-radius: 4px;
    }
  }
}

.bitrate-comparison {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  .bitrate-type {
    flex: 1;

    .bitrate-label {
      font-size: 0.9rem;
      color: @text-light;
    }

    .bitrate-bar {
      height: 10px;
      border-radius: 5px;
      margin-top: 0.25rem;

      &.constant {
        background: repeating-linear-gradient(
          90deg,
          @primary-color,
          @primary-color 10px,
          lighten(@primary-color, 30%) 10px,
          lighten(@primary-color, 30%) 20px
        );
      }

      &.variable {
        background: linear-gradient(
          90deg,
          @accent-color,
          @primary-color 30%,
          @accent-color 60%,
          @primary-color
        );
      }
    }
  }
}

.applications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
      margin: 0 0 1rem;
      color: @text-light;
      font-size: 0.98rem;
    }

    .compression-stats {
      display: flex;
      justify-content: center;
      gap: 1rem;
      font-size: 0.9rem;
      color: @text-light;
      flex-wrap: wrap;

      span {
        background: @light-bg;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
      }
    }
  }
}

.future-trends {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  .trend-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    border-top: 3px solid @primary-color;

    .trend-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.75rem;
    }

    p {
      margin: 0 0 1rem;
      color: @text-light;
    }

    .trend-stats {
      .trend-bar {
        height: 20px;
        background: #f0f4ff;
        border-radius: 10px;
        position: relative;
        overflow: hidden;

        .bar-fill {
          height: 100%;
          position: absolute;
          border-radius: 10px;

          &.ai {
            width: 85%;
            background: linear-gradient(to right, #4a6cf7, #6e45e2);
          }
          &.vr {
            width: 75%;
            background: linear-gradient(to right, #ff9f43, #ff6b6b);
          }
          &.edge {
            width: 65%;
            background: linear-gradient(to right, #42b983, #10c2a5);
          }
          &.adaptive {
            width: 60%;
            background: linear-gradient(to right, #b983ff, #6e45e2);
          }
        }

        > div:last-child {
          position: absolute;
          top: 0;
          left: 15px;
          line-height: 20px;
          color: white;
          font-weight: 500;
        }
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
  .lossy-compression-container {
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

  .quality-compression {
    flex-direction: column;
  }

  .summary-content {
    grid-template-columns: 1fr !important;
  }

  .algorithm-tabs {
    .tabs-header {
      flex-wrap: wrap;
    }
  }

  .applications-grid {
    grid-template-columns: 1fr;
  }
}
</style>
