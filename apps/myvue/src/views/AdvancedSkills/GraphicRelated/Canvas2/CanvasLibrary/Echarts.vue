<template>
  <div class="echarts-container">
    <header class="header">
      <div class="title-wrapper">
        <h1>Apache ECharts</h1>
        <div class="logo">
          <div class="logo-circle">E</div>
        </div>
      </div>
      <p class="subtitle">一个基于 JavaScript 的开源可视化图表库 <a href="https://echarts.apache.org/zh/index.html"
          target="_blank">echarts官网</a></p>
    </header>

    <div class="content">
      <section class="overview">
        <h2 class="section-title">
          <div class="icon-badge"><i class="fas fa-history"></i></div>
          <span>ECharts 概述</span>
        </h2>
        <div class="card">
          <div class="overview-content">
            <div class="text-content">
              <h3>发展历程</h3>
              <p>ECharts 最初由百度团队于2013年开源，2018年1月正式进入 Apache 孵化器，2018年12月毕业成为 Apache 顶级项目。</p>

              <h3>核心特点</h3>
              <ul>
                <li>丰富的可视化类型：支持 20+ 种图表类型</li>
                <li>多种数据格式支持：JSON、二维表、key-value 等</li>
                <li>流式数据支持：千万级数据实时展现</li>
                <li>移动端优化：跨平台和自适应设计</li>
                <li>强大的交互能力：数据筛选、视图缩放等</li>
              </ul>

              <div class="stats">
                <div class="stat-item">
                  <div class="stat-value">75K+</div>
                  <div class="stat-label">GitHub Stars</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">300+</div>
                  <div class="stat-label">贡献者</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">20K+</div>
                  <div class="stat-label">企业用户</div>
                </div>
              </div>
            </div>
            <div class="chart-placeholder">
              <div class="mock-chart">
                <div class="chart-title">ECharts 生态系统</div>
                <div class="chart-content">
                  <div class="ecosystem-item" style="--size: 100">核心库</div>
                  <div class="ecosystem-item" style="--size: 85">ZRender</div>
                  <div class="ecosystem-item" style="--size: 75">扩展库</div>
                  <div class="ecosystem-item" style="--size: 65">GL</div>
                  <div class="ecosystem-item" style="--size: 50">社区插件</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="installation">
        <h2 class="section-title">
          <div class="icon-badge"><i class="fas fa-download"></i></div>
          <span>安装与使用</span>
        </h2>
        <div class="card">
          <div class="usage-grid">
            <div class="usage-section">
              <h3>安装 ECharts</h3>
              <div class="code-block">
                <pre><code># 使用 npm 安装
npm install echarts --save

# 使用 yarn 安装
yarn add echarts

# 使用 pnpm 安装
pnpm add echarts</code></pre>
              </div>
            </div>

            <div class="usage-section">
              <h3>Vue 3 基本使用</h3>
              <div class="code-block">
                <pre><code>&lt;template&gt;
  &lt;div ref="chartRef" style="width: 600px; height: 400px;"&gt;&lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref&lt;HTMLDivElement | null&gt;(null);

onMounted(() => {
  if (chartRef.value) {
    const chart = echarts.init(chartRef.value);

    const option = {
      title: { text: '销售数据统计' },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };

    chart.setOption(option);

    // 响应式调整
    window.addEventListener('resize', () => chart.resize());
  }
});
&lt;/script&gt;</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="common-apis">
        <h2 class="section-title">
          <div class="icon-badge"><i class="fas fa-code"></i></div>
          <span>常用 API</span>
        </h2>
        <div class="card">
          <div class="api-grid">
            <div class="api-item">
              <div class="api-icon"><i class="fas fa-project-diagram"></i></div>
              <h3>echarts.init()</h3>
              <p>初始化图表实例</p>
              <pre><code>const chart = echarts.init(domElement);</code></pre>
            </div>

            <div class="api-item">
              <div class="api-icon"><i class="fas fa-cog"></i></div>
              <h3>chart.setOption()</h3>
              <p>设置图表配置项</p>
              <pre><code>chart.setOption(option);</code></pre>
            </div>

            <div class="api-item">
              <div class="api-icon"><i class="fas fa-expand-arrows-alt"></i></div>
              <h3>chart.resize()</h3>
              <p>调整图表尺寸</p>
              <pre><code>chart.resize();</code></pre>
            </div>

            <div class="api-item">
              <div class="api-icon"><i class="fas fa-sync-alt"></i></div>
              <h3>chart.clear()</h3>
              <p>清空当前图表</p>
              <pre><code>chart.clear();</code></pre>
            </div>

            <div class="api-item">
              <div class="api-icon"><i class="fas fa-download"></i></div>
              <h3>chart.getDataURL()</h3>
              <p>导出图表为图片</p>
              <pre><code>const img = chart.getDataURL();</code></pre>
            </div>

            <div class="api-item">
              <div class="api-icon"><i class="fas fa-trash-alt"></i></div>
              <h3>chart.dispose()</h3>
              <p>销毁图表实例</p>
              <pre><code>chart.dispose();</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="chart-types">
        <h2 class="section-title">
          <div class="icon-badge"><i class="fas fa-chart-bar"></i></div>
          <span>常用图表类型</span>
        </h2>
        <div class="card">
          <div class="charts-grid">
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-icon"><i class="fas fa-chart-line"></i></div>
                <h3>折线图</h3>
              </div>
              <div class="chart-example">
                <div class="mock-line-chart"></div>
              </div>
              <div class="chart-code">
                <pre><code>series: [{
  type: 'line',
  data: [820, 932, 901, 934, 1290, 1330, 1320]
}]</code></pre>
              </div>
            </div>

            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-icon"><i class="fas fa-chart-bar"></i></div>
                <h3>柱状图</h3>
              </div>
              <div class="chart-example">
                <div class="mock-bar-chart"></div>
              </div>
              <div class="chart-code">
                <pre><code>series: [{
  type: 'bar',
  data: [120, 200, 150, 80, 70, 110, 130]
}]</code></pre>
              </div>
            </div>

            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-icon"><i class="fas fa-chart-pie"></i></div>
                <h3>饼图</h3>
              </div>
              <div class="chart-example">
                <div class="mock-pie-chart"></div>
              </div>
              <div class="chart-code">
                <pre><code>series: [{
  type: 'pie',
  data: [
    { value: 335, name: '直接访问' },
    { value: 310, name: '邮件营销' }
  ]
}]</code></pre>
              </div>
            </div>

            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-icon"><i class="fas fa-braille"></i></div>
                <h3>散点图</h3>
              </div>
              <div class="chart-example">
                <div class="mock-scatter-chart"></div>
              </div>
              <div class="chart-code">
                <pre><code>series: [{
  type: 'scatter',
  data: [
    [10.0, 8.04], [8.0, 6.95],
    [13.0, 7.58], [9.0, 8.81]
  ]
}]</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="use-cases">
        <h2 class="section-title">
          <div class="icon-badge"><i class="fas fa-laptop-code"></i></div>
          <span>使用场景</span>
        </h2>
        <div class="card">
          <div class="cases-grid">
            <div class="case-item">
              <div class="case-icon"><i class="fas fa-chart-line"></i></div>
              <h3>业务数据监控</h3>
              <p>实时监控关键业务指标，如销售额、用户增长等</p>
            </div>

            <div class="case-item">
              <div class="case-icon"><i class="fas fa-map-marked-alt"></i></div>
              <h3>地理数据可视化</h3>
              <p>展示地域分布数据，如销售区域、用户分布等</p>
            </div>

            <div class="case-item">
              <div class="case-icon"><i class="fas fa-project-diagram"></i></div>
              <h3>关系网络图</h3>
              <p>展示复杂关系网络，如社交关系、知识图谱等</p>
            </div>

            <div class="case-item">
              <div class="case-icon"><i class="fas fa-tachometer-alt"></i></div>
              <h3>实时数据仪表盘</h3>
              <p>创建实时更新的数据监控仪表盘</p>
            </div>

            <div class="case-item">
              <div class="case-icon"><i class="fas fa-file-medical-alt"></i></div>
              <h3>医疗健康数据</h3>
              <p>可视化医疗数据，如病例分布、健康指标等</p>
            </div>

            <div class="case-item">
              <div class="case-icon"><i class="fas fa-industry"></i></div>
              <h3>工业物联网</h3>
              <p>监控设备运行状态，展示传感器数据</p>
            </div>
          </div>
        </div>
      </section>

      <section class="resources">
        <h2 class="section-title">
          <div class="icon-badge"><i class="fas fa-link"></i></div>
          <span>学习资源</span>
        </h2>
        <div class="card">
          <div class="resources-grid">
            <a href="https://echarts.apache.org/" target="_blank" class="resource-item">
              <i class="fas fa-book"></i>
              <span>官方文档</span>
            </a>

            <a href="https://github.com/apache/echarts" target="_blank" class="resource-item">
              <i class="fab fa-github"></i>
              <span>GitHub 仓库</span>
            </a>

            <a href="https://echarts.apache.org/examples/" target="_blank" class="resource-item">
              <i class="fas fa-laptop-code"></i>
              <span>官方示例</span>
            </a>

            <a href="https://makeapullrequest.com/" target="_blank" class="resource-item">
              <i class="fas fa-hands-helping"></i>
              <span>贡献指南</span>
            </a>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Apache ECharts | 强大的可视化图表解决方案</p>
      <p class="copyright">Apache License 2.0 | Copyright © 2017-2023 Apache ECharts</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// 模拟图表初始化效果
onMounted(() => {
  const chartElements = document.querySelectorAll('.mock-chart, .chart-example');

  chartElements.forEach(el => {
    setTimeout(() => {
      el.classList.add('animated');
    }, 300);
  });
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

// 基础变量
@primary-color: #5470c6;
@secondary-color: #91cc75;
@background-light: #f8f9fa;
@text-primary: #2c3e50;
@text-secondary: #5a6d82;
@border-color: #e8e8e8;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@success-color: #73c0de;
@warning-color: #ee6666;
@info-color: #3ba272;

// 布局和基础样式
.echarts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: @text-primary;
  background-color: #fff;
  line-height: 1.6;
  padding-bottom: 40px;
}

.header {
  text-align: center;
  padding: 50px 0 30px;
  margin-bottom: 30px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, @primary-color, @secondary-color);
  }

  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 15px;
    flex-wrap: wrap;
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin: 0;
    color: @text-primary;
    background: linear-gradient(90deg, @primary-color, @secondary-color);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;

    .logo-circle {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
    }

    span {
      font-size: 1.5rem;
      font-weight: 600;
      color: @text-secondary;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-secondary;
    font-weight: 400;
    margin-top: 15px;
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: @text-primary;
  padding-bottom: 10px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, @primary-color, @secondary-color);
    border-radius: 2px;
  }

  .icon-badge {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;

    i {
      font-size: 1.2rem;
    }
  }
}

.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: @card-shadow;
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid @border-color;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-3px);
  }
}

// 概述部分
.overview-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.text-content {
  h3 {
    font-size: 1.4rem;
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 15px;
    position: relative;
    padding-left: 15px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      background: @primary-color;
      border-radius: 50%;
    }
  }

  p {
    margin-bottom: 20px;
    line-height: 1.7;
    color: @text-secondary;
  }

  ul {
    padding-left: 20px;
    margin: 20px 0;

    li {
      margin-bottom: 10px;
      position: relative;
      padding-left: 20px;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: @primary-color;
        font-size: 1.2rem;
      }
    }
  }
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  padding: 15px;
  background: linear-gradient(135deg, fade(@primary-color, 10%), fade(@secondary-color, 10%));
  border-radius: 10px;

  .stat-item {
    text-align: center;

    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: @primary-color;
    }

    .stat-label {
      font-size: 0.9rem;
      color: @text-secondary;
    }
  }
}

.chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.mock-chart {
  width: 100%;
  height: 300px;
  background: white;
  border-radius: 8px;
  border: 1px solid @border-color;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  .chart-title {
    font-weight: 600;
    margin-bottom: 15px;
    color: @primary-color;
    text-align: center;
  }

  .chart-content {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    height: calc(100% - 40px);
    padding: 0 20px;
  }

  .ecosystem-item {
    width: 50px;
    height: calc(var(--size) * 2px);
    background: linear-gradient(to top, @primary-color, @secondary-color);
    border-radius: 8px 8px 0 0;
    position: relative;
    transition: height 1s ease;

    &::after {
      content: attr(style);
      position: absolute;
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.8rem;
      color: @text-secondary;
    }
  }
}

.animated .ecosystem-item {
  height: calc(var(--size) * 2px);
}

// 安装与使用部分
.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.usage-section {
  h3 {
    font-size: 1.3rem;
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid @border-color;
  }
}

.code-block {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 15px;
  overflow-x: auto;
  border: 1px solid @border-color;

  pre {
    margin: 0;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      color: #2d3748;
    }
  }
}

// 常用 API 部分
.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.api-item {
  background: white;
  border: 1px solid @border-color;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
  border-top: 3px solid @primary-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    border-color: @primary-color;
  }

  .api-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 12px;
    color: @primary-color;
  }

  p {
    color: @text-secondary;
    margin: 0 0 15px;
    font-size: 0.95rem;
    min-height: 40px;
  }

  pre {
    background: #f0f7ff;
    border-radius: 6px;
    padding: 10px;
    font-size: 0.85rem;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      color: @primary-color;
    }
  }
}

// 图表类型部分
.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.chart-card {
  background: white;
  border: 1px solid @border-color;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
}

.chart-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background: linear-gradient(135deg, fade(@primary-color, 10%), fade(@secondary-color, 10%));

  .chart-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.2rem;
    margin: 0;
    color: @text-primary;
  }
}

.chart-example {
  height: 180px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  div[class^="mock-"] {
    width: 100%;
    height: 100%;
    background: #f9fbfd;
    border-radius: 6px;
    position: relative;
    opacity: 0;
    transition: opacity 0.8s ease;
  }

  .animated {
    opacity: 1;
  }
}

.mock-line-chart {
  &::before {
    content: '';
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    height: 2px;
    background: #e0e6ed;
  }

  &::after {
    content: '';
    position: absolute;
    left: 20px;
    top: 20px;
    bottom: 22px;
    width: 2px;
    background: #e0e6ed;
  }

  .line {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: calc(100% - 40px);
    height: calc(100% - 40px);

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right,
          transparent 0%,
          transparent 20%,
          @primary-color 20%,
          @primary-color 40%,
          transparent 40%,
          transparent 60%,
          @secondary-color 60%,
          @secondary-color 80%,
          transparent 80%,
          transparent 100%);
      mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Cpath d='M10,90 L40,40 L70,70 L100,20 L130,60 L160,30 L190,80' fill='none' stroke='black' stroke-width='2'/%3E%3C/svg%3E");
      mask-size: 100% 100%;
      mask-repeat: no-repeat;
    }
  }
}

.mock-bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 20px;

  &::before {
    content: '';
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    height: 2px;
    background: #e0e6ed;
  }

  .bar {
    width: 30px;
    background: linear-gradient(to top, @primary-color, @secondary-color);
    border-radius: 4px 4px 0 0;
    margin: 0 5px;
    transition: height 1s ease;

    &:nth-child(1) {
      height: 30%;
    }

    &:nth-child(2) {
      height: 80%;
    }

    &:nth-child(3) {
      height: 60%;
    }

    &:nth-child(4) {
      height: 40%;
    }

    &:nth-child(5) {
      height: 70%;
    }

    &:nth-child(6) {
      height: 50%;
    }
  }
}

.mock-pie-chart {
  display: flex;
  align-items: center;
  justify-content: center;

  .pie {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: conic-gradient(@primary-color 0% 40%,
        @secondary-color 40% 70%,
        #ee6666 70% 100%);
    position: relative;
    transition: transform 1s ease;
    transform: scale(0);
  }

  .animated .pie {
    transform: scale(1);
  }
}

.mock-scatter-chart {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    height: 2px;
    background: #e0e6ed;
  }

  &::after {
    content: '';
    position: absolute;
    left: 20px;
    top: 20px;
    bottom: 22px;
    width: 2px;
    background: #e0e6ed;
  }

  .dot {
    position: absolute;
    width: 12px;
    height: 12px;
    background: @primary-color;
    border-radius: 50%;
    transform: translate(-50%, -50%);

    &:nth-child(1) {
      top: 30%;
      left: 25%;
    }

    &:nth-child(2) {
      top: 50%;
      left: 40%;
      background: @secondary-color;
    }

    &:nth-child(3) {
      top: 70%;
      left: 35%;
    }

    &:nth-child(4) {
      top: 40%;
      left: 60%;
      background: @secondary-color;
    }

    &:nth-child(5) {
      top: 60%;
      left: 70%;
    }

    &:nth-child(6) {
      top: 80%;
      left: 50%;
      background: @secondary-color;
    }
  }
}

.chart-code {
  padding: 15px;
  background: #f9fbfd;
  border-top: 1px solid @border-color;

  pre {
    margin: 0;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.85rem;
      color: @primary-color;
    }
  }
}

// 使用场景部分
.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.case-item {
  background: white;
  border: 1px solid @border-color;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    border-color: @primary-color;
  }

  .case-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 10px;
    color: @primary-color;
  }

  p {
    color: @text-secondary;
    margin: 0;
    font-size: 0.95rem;
  }
}

// 资源部分
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.resource-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px 15px;
  background: linear-gradient(135deg, fade(@primary-color, 8%), fade(@secondary-color, 8%));
  border-radius: 8px;
  text-decoration: none;
  color: @text-primary;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: linear-gradient(135deg, fade(@primary-color, 15%), fade(@secondary-color, 15%));
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);

    i {
      color: @primary-color;
    }
  }

  i {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: @secondary-color;
    transition: color 0.3s ease;
  }

  span {
    font-weight: 600;
    font-size: 1.1rem;
  }
}

.footer {
  text-align: center;
  padding: 30px 0 20px;
  margin-top: 30px;
  border-top: 1px solid @border-color;
  color: @text-secondary;

  p {
    margin: 5px 0;
  }

  .copyright {
    font-size: 0.9rem;
    color: lighten(@text-secondary, 20%);
  }
}

// 响应式调整
@media (max-width: 768px) {
  .header {
    padding: 30px 0 20px;

    h1 {
      font-size: 2.2rem;
    }

    .logo {
      .logo-circle {
        width: 40px;
        height: 40px;
        font-size: 20px;
      }

      span {
        font-size: 1.2rem;
      }
    }
  }

  .section-title {
    font-size: 1.4rem;
  }

  .card {
    padding: 20px;
  }
}
</style>
