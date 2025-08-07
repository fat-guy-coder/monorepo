<template>
  <div class="browser-layers">
    <header class="header">
      <h1>浏览器图层技术解析</h1>
      <p>深入理解现代浏览器渲染性能优化的核心机制</p>
    </header>

    <div class="content-container">
      <section class="concept-section">
        <div class="section-header">
          <div class="icon">🔍</div>
          <h2>浏览器图层基础概念</h2>
        </div>

        <div class="content-card">
          <div class="definition">
            <h3>什么是浏览器图层？</h3>
            <p>浏览器图层(Layers)是浏览器渲染引擎内部的一种优化机制，它将页面内容分解为多个独立的图像层，通过分层管理和合成技术实现高效的页面渲染。</p>
          </div>

          <div class="render-flow">
            <h3>浏览器渲染流程中的图层</h3>
            <div class="flow-diagram">
              <div class="step">
                <div class="step-icon">1</div>
                <div class="step-content">
                  <h4>DOM树构建</h4>
                  <p>解析HTML生成DOM树</p>
                </div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-icon">2</div>
                <div class="step-content">
                  <h4>样式计算</h4>
                  <p>解析CSS生成CSSOM</p>
                </div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-icon">3</div>
                <div class="step-content">
                  <h4>布局(Layout)</h4>
                  <p>计算元素位置和大小</p>
                </div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-icon">4</div>
                <div class="step-content">
                  <h4>图层分层</h4>
                  <p>创建独立的渲染层</p>
                </div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-icon">5</div>
                <div class="step-content">
                  <h4>绘制(Paint)</h4>
                  <p>填充像素数据</p>
                </div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-icon">6</div>
                <div class="step-content">
                  <h4>合成(Composite)</h4>
                  <p>合并图层到屏幕</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="types-section">
        <div class="section-header">
          <div class="icon">📚</div>
          <h2>浏览器图层类型</h2>
        </div>

        <div class="layer-types">
          <div class="layer-card">
            <div class="layer-icon">1</div>
            <h3>根图层</h3>
            <p>整个页面的基础层，包含所有内容</p>
            <div class="characteristics">
              <span class="char-tag">位置固定</span>
              <span class="char-tag">包含所有元素</span>
            </div>
          </div>

          <div class="layer-card">
            <div class="layer-icon">2</div>
            <h3>渲染层</h3>
            <p>具有特定样式的DOM子树</p>
            <div class="characteristics">
              <span class="char-tag">独立绘制</span>
              <span class="char-tag">可单独更新</span>
            </div>
          </div>

          <div class="layer-card">
            <div class="layer-icon">3</div>
            <h3>合成层</h3>
            <p>由GPU处理的独立图层</p>
            <div class="characteristics">
              <span class="char-tag">硬件加速</span>
              <span class="char-tag">高效合成</span>
            </div>
          </div>

          <div class="layer-card">
            <div class="layer-icon">4</div>
            <h3>滚动层</h3>
            <p>处理滚动内容的图层</p>
            <div class="characteristics">
              <span class="char-tag">独立滚动</span>
              <span class="char-tag">平滑滚动</span>
            </div>
          </div>
        </div>
      </section>

      <section class="function-section">
        <div class="section-header">
          <div class="icon">💡</div>
          <h2>浏览器图层的作用</h2>
        </div>

        <div class="functions">
          <div class="function-card">
            <div class="func-icon">⚡</div>
            <h3>性能优化</h3>
            <p>减少重绘和重排范围，仅更新变化图层</p>
          </div>

          <div class="function-card">
            <div class="func-icon">🎨</div>
            <h3>动画流畅</h3>
            <p>GPU加速动画，避免主线程阻塞</p>
          </div>

          <div class="function-card">
            <div class="func-icon">🔄</div>
            <h3>高效渲染</h3>
            <p>并行处理图层，充分利用多核CPU/GPU</p>
          </div>

          <div class="function-card">
            <div class="func-icon">🛡️</div>
            <h3>内容隔离</h3>
            <p>防止内容重叠和显示问题</p>
          </div>
        </div>

        <div class="performance-comparison">
          <h3>图层优化前后的性能对比</h3>
          <div class="comparison-chart">
            <div class="chart-bar">
              <div class="bar-label">无图层优化</div>
              <div class="bar-container">
                <div class="bar bad" :style="{ width: '85%' }">85% CPU占用</div>
              </div>
            </div>
            <div class="chart-bar">
              <div class="bar-label">启用图层加速</div>
              <div class="bar-container">
                <div class="bar good" :style="{ width: '30%' }">30% CPU占用</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="acceleration-section">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>启用图层加速技术</h2>
        </div>

        <div class="acceleration-methods">
          <div class="method-card">
            <div class="method-icon">🎛️</div>
            <h3>CSS属性触发</h3>
            <div class="code-examples">
              <pre><code>transform: translateZ(0);</code></pre>
              <pre><code>will-change: transform;</code></pre>
              <pre><code>backface-visibility: hidden;</code></pre>
            </div>
          </div>

          <div class="method-card">
            <div class="method-icon">🖼️</div>
            <h3>元素特性触发</h3>
            <ul class="element-list">
              <li>3D变换元素 (transform: translate3d)</li>
              <li>视频和Canvas元素</li>
              <li>透明元素 (opacity &lt; 1)</li>
              <li>CSS滤镜元素 (filter)</li>
              <li>固定定位元素 (position: fixed)</li>
            </ul>
          </div>
        </div>

        <div class="best-practices">
          <h3>图层优化最佳实践</h3>
          <div class="practice-grid">
            <div class="practice">
              <div class="practice-icon">✅</div>
              <h4>合理使用will-change</h4>
              <p>仅对需要动画的元素应用</p>
            </div>
            <div class="practice">
              <div class="practice-icon">✅</div>
              <h4>避免过度分层</h4>
              <p>过多图层消耗内存</p>
            </div>
            <div class="practice">
              <div class="practice-icon">✅</div>
              <h4>优先使用transform/opacity</h4>
              <p>这些属性可被GPU加速</p>
            </div>
            <div class="practice">
              <div class="practice-icon">✅</div>
              <h4>使用CSS动画而非JS动画</h4>
              <p>CSS动画更易被浏览器优化</p>
            </div>
          </div>
        </div>
      </section>

      <section class="devtools-section">
        <div class="section-header">
          <div class="icon">🔧</div>
          <h2>开发者工具分析</h2>
        </div>

        <div class="devtools-content">
          <div class="devtools-image">
            <div class="placeholder">
              <div class="browser-frame">
                <div class="browser-tabs">
                  <div class="tab active">Layers</div>
                  <div class="tab">Performance</div>
                  <div class="tab">Rendering</div>
                </div>
                <div class="layers-panel">
                  <div class="layer-item">
                    <div class="layer-color"></div>
                    <div class="layer-info">Root Layer</div>
                  </div>
                  <div class="layer-item">
                    <div class="layer-color" style="background: #FF6B6B;"></div>
                    <div class="layer-info">Header Layer</div>
                  </div>
                  <div class="layer-item">
                    <div class="layer-color" style="background: #4ECDC4;"></div>
                    <div class="layer-info">Animation Layer</div>
                  </div>
                  <div class="layer-item">
                    <div class="layer-color" style="background: #FFD166;"></div>
                    <div class="layer-info">Video Layer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="devtools-steps">
            <h3>Chrome图层分析步骤</h3>
            <ol>
              <li>打开开发者工具 (F12)</li>
              <li>切换到"Layers"面板</li>
              <li>查看页面图层结构</li>
              <li>分析图层边界和深度</li>
              <li>检查图层更新频率</li>
              <li>识别不必要的图层</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 用于动画的响应式数据
const animatedValue = ref(0);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4895ef;
@layer-color-1: #4ECDC4;
@layer-color-2: #FF6B6B;
@layer-color-3: #FFD166;
@layer-color-4: #1A535C;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2b2d42;
@border-color: #e9ecef;
@success-color: #4cc9f0;
@bad-color: #ff6b6b;
@good-color: #06d6a0;

.browser-layers {
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

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

.flow-diagram {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 2rem;

  .step {
    flex: 1;
    min-width: 120px;
    text-align: center;
    position: relative;

    .step-icon {
      width: 50px;
      height: 50px;
      background: @accent-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0 auto 1rem;
    }

    .step-content {
      background: @light-bg;
      border-radius: 10px;
      padding: 1rem;

      h4 {
        color: @secondary-color;
        margin-bottom: 0.5rem;
      }
    }
  }

  .arrow {
    font-size: 2rem;
    color: @primary-color;
    font-weight: bold;
    padding: 0 10px;
  }
}

.layer-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.8rem;
  margin-bottom: 2rem;
}

.layer-card {
  background: @card-bg;
  border-radius: 14px;
  padding: 1.8rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border-top: 4px solid @layer-color-1;

  &:nth-child(2) {
    border-top-color: @layer-color-2;
  }

  &:nth-child(3) {
    border-top-color: @layer-color-3;
  }

  &:nth-child(4) {
    border-top-color: @layer-color-4;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .layer-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: @primary-color;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.2rem;
  }

  h3 {
    color: @secondary-color;
    margin-bottom: 0.8rem;
    font-size: 1.4rem;
  }

  p {
    color: lighten(@text-color, 15%);
    margin-bottom: 1.2rem;
  }
}

.characteristics {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  flex-wrap: wrap;

  .char-tag {
    background: @light-bg;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
    color: @primary-color;
    border: 1px solid @border-color;
  }
}

.functions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.8rem;
  margin-bottom: 2.5rem;
}

.function-card {
  background: @card-bg;
  border-radius: 14px;
  padding: 1.8rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);

  .func-icon {
    font-size: 3rem;
    margin-bottom: 1.2rem;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }
}

.performance-comparison {
  background: @light-bg;
  border-radius: 14px;
  padding: 1.8rem;

  h3 {
    text-align: center;
    color: @secondary-color;
    margin-bottom: 1.5rem;
  }
}

.comparison-chart {
  max-width: 600px;
  margin: 0 auto;

  .chart-bar {
    margin-bottom: 1.5rem;

    .bar-label {
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .bar-container {
      height: 30px;
      background: #e9ecef;
      border-radius: 15px;
      overflow: hidden;

      .bar {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 15px;
        font-weight: 500;
        color: white;
        min-width: 80px;
      }

      .bad {
        background: linear-gradient(90deg, #ff6b6b, #ff8e8e);
      }

      .good {
        background: linear-gradient(90deg, #06d6a0, #4ecdc4);
      }
    }
  }
}

.acceleration-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.method-card {
  background: @card-bg;
  border-radius: 14px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);

  .method-icon {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 1.2rem;
    color: @primary-color;
  }

  h3 {
    color: @secondary-color;
    text-align: center;
    margin-bottom: 1.5rem;
  }
}

.code-examples {
  background: #2b2d42;
  border-radius: 8px;
  padding: 1.2rem;
  color: #f8f9fa;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;

  pre {
    margin: 0.8rem 0;
    overflow-x: auto;

    code {
      display: block;
      padding: 0.5rem 1rem;
      background: #34374c;
      border-radius: 4px;
    }
  }
}

.element-list {
  list-style: none;
  padding: 0;

  li {
    padding: 0.8rem 0;
    border-bottom: 1px dashed @border-color;

    &:last-child {
      border-bottom: none;
    }
  }
}

.best-practices {
  background: @light-bg;
  border-radius: 14px;
  padding: 1.8rem;

  h3 {
    text-align: center;
    color: @secondary-color;
    margin-bottom: 1.5rem;
  }
}

.practice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.practice {
  background: @card-bg;
  border-radius: 10px;
  padding: 1.2rem;
  text-align: center;

  .practice-icon {
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
  }

  h4 {
    color: @primary-color;
    margin-bottom: 0.5rem;
  }
}

.devtools-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.devtools-image {
  .placeholder {
    background: @card-bg;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  }
}

.browser-frame {
  border: 1px solid @border-color;
  border-radius: 8px;
  overflow: hidden;
}

.browser-tabs {
  display: flex;
  background: @light-bg;
  border-bottom: 1px solid @border-color;

  .tab {
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
    cursor: pointer;

    &.active {
      background: white;
      border-bottom: 2px solid @primary-color;
      font-weight: 500;
    }
  }
}

.layers-panel {
  background: white;
  padding: 1rem;

  .layer-item {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    border-bottom: 1px solid @border-color;

    &:last-child {
      border-bottom: none;
    }

    .layer-color {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      background: @primary-color;
      margin-right: 1rem;
    }
  }
}

.devtools-steps {
  ol {
    padding-left: 1.5rem;

    li {
      padding: 0.8rem 0;
      border-bottom: 1px dashed @border-color;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1.5rem;

    h1 {
      font-size: 2rem;
    }
  }

  .flow-diagram {
    .step {
      min-width: 100%;
      margin-bottom: 2rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .arrow {
      transform: rotate(90deg);
      margin: 0.5rem auto;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
