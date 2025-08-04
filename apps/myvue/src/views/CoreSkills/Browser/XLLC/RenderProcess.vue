<template>
  <div class="rendering-container">
    <div class="header">
      <h1>浏览器渲染过程解析</h1>
      <p class="subtitle">从HTML/CSS到像素绘制的完整流程</p>
    </div>

    <div class="visualization">
      <img :src="img" style="width: 100%;" alt="浏览器加载过程" loading="lazy">
    </div>

    <div class="visualization">
      <div class="process-diagram">
        <div class="process-step" v-for="(step, index) in steps" :key="index" :class="{ active: activeStep === index }"
          @click="activeStep = index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-info">
            <h3>{{ step.title }}</h3>
            <p>{{ step.subtitle }}</p>
          </div>
          <div class="step-icon">
            {{ step.icon }}
          </div>
        </div>
      </div>

      <div class="explanation-area">
        <div class="visual-representation">
          <transition name="fade">
            <div v-if="activeStep === 0" class="dom-representation">
              <div class="html-node">html</div>
              <div class="children">
                <div class="head-node">head</div>
                <div class="body-node">body</div>
                <div class="children">
                  <div class="container-node">div.container</div>
                  <div class="children">
                    <div class="h1-node">h1</div>
                    <div class="p-node">p</div>
                    <div class="img-node">img</div>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="activeStep === 1" class="cssom-representation">
              <div class="css-rule">
                <span class="selector">body</span> {
                <div class="property">margin: 0;</div>
                <div class="property">font-family: Arial;</div>
                }
              </div>
              <div class="css-rule">
                <span class="selector">.container</span> {
                <div class="property">width: 80%;</div>
                <div class="property">margin: 0 auto;</div>
                }
              </div>
              <div class="css-rule">
                <span class="selector">h1</span> {
                <div class="property">color: #3498db;</div>
                <div class="property">font-size: 2rem;</div>
                }
              </div>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="activeStep === 2" class="render-tree">
              <div class="render-node">body (block)</div>
              <div class="render-node">div.container (block)</div>
              <div class="children">
                <div class="render-node">h1 (block)</div>
                <div class="render-node">p (block)</div>
                <div class="render-node">img (inline)</div>
              </div>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="activeStep === 3" class="layout-representation">
              <div class="viewport">
                <div class="element body">body
                  <div class="element container">.container
                    <div class="element h1">h1</div>
                    <div class="element p">p</div>
                    <div class="element img">img</div>
                  </div>
                </div>
              </div>
              <div class="layout-metrics">
                <div class="metric">
                  <div class="label">视口尺寸</div>
                  <div class="value">1200×800px</div>
                </div>
                <div class="metric">
                  <div class="label">节点数</div>
                  <div class="value">246</div>
                </div>
                <div class="metric">
                  <div class="label">布局时间</div>
                  <div class="value">5.8ms</div>
                </div>
              </div>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="activeStep === 4" class="paint-representation">
              <div class="paint-layers">
                <div class="layer" v-for="layer in paintLayers" :key="layer.id">
                  <div class="layer-name">{{ layer.name }}</div>
                  <div class="progress-bar">
                    <div class="progress" :style="{ width: layer.progress + '%' }"></div>
                  </div>
                  <div class="progress-value">{{ layer.progress }}%</div>
                </div>
              </div>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="activeStep === 5" class="composite-representation">
              <div class="layers">
                <div class="layer background">背景层</div>
                <div class="layer content">内容层</div>
                <div class="layer overlay">叠加层</div>
              </div>
              <div class="final-output">
                <div class="screen">
                  <h2>渲染完成</h2>
                  <p>内容已绘制到屏幕</p>
                  <div class="fps-indicator">60 FPS</div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <div class="explanation">
          <transition name="fade">
            <div v-if="activeStep === 0" class="step-explanation">
              <h3>DOM构建过程</h3>
              <p>浏览器处理HTML文档并构建文档对象模型(DOM)：</p>
              <ul>
                <li>字节 → 字符 → 令牌 → 节点 → DOM树</li>
                <li>每个HTML元素成为DOM树中的一个节点</li>
                <li>HTML解析是增量式进行的</li>
                <li>遇到CSS或JS会暂停解析</li>
                <li>生成树状结构的节点层次关系</li>
              </ul>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="activeStep === 1" class="step-explanation">
              <h3>CSSOM构建过程</h3>
              <p>浏览器处理CSS样式表，构建CSS对象模型：</p>
              <ul>
                <li>CSS规则具有层叠和继承特性</li>
                <li>CSS解析是阻塞渲染的过程</li>
                <li>样式规则按特定优先级组织</li>
                <li>浏览器生成包含所有样式信息的样式规则树</li>
                <li>CSS选择器从右向左匹配</li>
              </ul>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="activeStep === 2" class="step-explanation">
              <h3>渲染树构建</h3>
              <p>浏览器将DOM和CSSOM合并生成渲染树：</p>
              <ul>
                <li>只包含可见内容（排除display:none等）</li>
                <li>每个节点包含所有CSS样式信息</li>
                <li>计算每个节点的最终样式值</li>
                <li>形成可视化元素的树状结构</li>
                <li>渲染树是布局和绘制的基础</li>
              </ul>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="activeStep === 3" class="step-explanation">
              <h3>布局（重排）过程</h3>
              <p>浏览器计算渲染树中每个节点的确切几何位置：</p>
              <ul>
                <li>计算每个节点的位置和大小</li>
                <li>基于盒子模型进行计算</li>
                <li>从根节点开始递归遍历渲染树</li>
                <li>输出元素的位置和尺寸信息</li>
                <li>回流(Reflow) - 布局的重新计算</li>
              </ul>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="activeStep === 4" class="step-explanation">
              <h3>绘制（光栅化）过程</h3>
              <p>浏览器将渲染树的每个节点转换为屏幕上的实际像素：</p>
              <ul>
                <li>绘制列表 - 记录绘制操作的列表</li>
                <li>光栅化 - 将矢量转换为位图</li>
                <li>浏览器使用多个绘制层</li>
                <li>分为主线程绘制和合成器线程绘制</li>
                <li>文本、边框、背景等分别绘制</li>
              </ul>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="activeStep === 5" class="step-explanation">
              <h3>合成与显示</h3>
              <p>浏览器将各个图层合并并最终显示到屏幕上：</p>
              <ul>
                <li>合成图层 - 浏览器创建多个图层</li>
                <li>分块 - 将图层分割为多个图块</li>
                <li>光栅线程 - 并行光栅化图块</li>
                <li>绘制四边形 - 计算图块在内存中的位置</li>
                <li>显示 - 通过图形卡显示页面</li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <section class="js-blocking-section">
      <h2>JavaScript 阻塞页面渲染解析</h2>
      <div class="js-blocking-content">
        <div class="js-blocking-explanation">
          <h3>为什么 JavaScript 会阻塞渲染？</h3>
          <ul>
            <li>浏览器在解析 HTML 时遇到 <code>&lt;script&gt;</code> 标签会<strong>暂停 DOM 构建</strong>，直到脚本下载并执行完成。</li>
            <li>原因：JavaScript 可能会通过 <code>document.write</code> 或 DOM API 修改页面结构，影响后续解析。</li>
            <li>外部脚本未加 <code>async</code> 或 <code>defer</code> 属性时，默认会阻塞渲染。</li>
            <li>阻塞期间，CSSOM 也可能未构建完成，导致渲染树无法生成。</li>
          </ul>
          <h3>JavaScript 参与 DOM 生成的过程</h3>
          <ul>
            <li>脚本可动态创建、修改、删除 DOM 节点。</li>
            <li>部分页面内容依赖 JS 动态生成（如 SPA 框架）。</li>
            <li>JS 操作 DOM 需等待 DOM 解析完成（如 <code>DOMContentLoaded</code> 事件）。</li>
          </ul>
        </div>
        <div class="js-blocking-visual">
          <div class="js-blocking-diagram">
            <div class="diagram-row">
              <div class="diagram-block html">HTML 解析</div>
              <div class="diagram-arrow">→</div>
              <div class="diagram-block script">遇到 JS</div>
              <div class="diagram-arrow">⏸</div>
              <div class="diagram-block wait">阻塞</div>
              <div class="diagram-arrow">→</div>
              <div class="diagram-block dom">继续 DOM 构建</div>
            </div>
            <div class="diagram-note">
              <span>未加 <code>async</code>/<code>defer</code> 时，JS 阻塞 DOM 解析</span>
            </div>
          </div>
        </div>
      </div>
      <div class="js-blocking-tips">
        <strong>优化建议：</strong>
        <ul>
          <li>将 JS 脚本放在页面底部，或使用 <code>defer</code>/<code>async</code> 属性</li>
          <li>避免在 <code>&lt;head&gt;</code> 中同步加载大体积 JS</li>
          <li>合理拆分和异步加载非关键 JS</li>
        </ul>
      </div>
    </section>

    <div class="performance-tips">
      <h2>性能优化建议</h2>
      <div class="tips-grid">
        <div class="tip">
          <div class="tip-icon">🚫</div>
          <h3>减少重排</h3>
          <p>避免布局抖动，批量DOM操作</p>
        </div>
        <div class="tip">
          <div class="tip-icon">🎯</div>
          <h3>减少重绘</h3>
          <p>使用transform/opacity属性</p>
        </div>
        <div class="tip">
          <div class="tip-icon">⚡</div>
          <h3>利用GPU</h3>
          <p>合理使用CSS硬件加速</p>
        </div>
        <div class="tip">
          <div class="tip-icon">📦</div>
          <h3>优化图层</h3>
          <p>避免不必要的图层创建</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, } from 'vue';
import img from '@/assets/browerRenderProcess.jfif';

const activeStep = ref(0);

const steps = [
  { title: 'DOM构建', subtitle: 'HTML解析生成DOM树', icon: '📄' },
  { title: 'CSSOM构建', subtitle: 'CSS解析生成样式树', icon: '🎨' },
  { title: '渲染树', subtitle: '合并DOM和CSSOM', icon: '🌳' },
  { title: '布局', subtitle: '计算元素位置和大小', icon: '📏' },
  { title: '绘制', subtitle: '填充像素数据', icon: '🖌️' },
  { title: '合成', subtitle: '图层合并与显示', icon: '🧩' }
];

const paintLayers = [
  { id: 1, name: '背景层', progress: 100 },
  { id: 2, name: '文本层', progress: 85 },
  { id: 3, name: '图像层', progress: 60 },
  { id: 4, name: '边框层', progress: 40 },
  { id: 5, name: '特效层', progress: 25 }
];

// 自动轮播渲染步骤

</script>

<style scoped lang="less">
@primary: #3498db;
@secondary: #2ecc71;
@accent: #9b59b6;
@background: #f8f9fa;
@text: #2c3e50;
@light-text: #7f8c8d;
@border-radius: 12px;
@box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
@transition: all 0.4s ease;

.rendering-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text;
  background: @background;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: @border-radius;
  box-shadow: @box-shadow;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: @text;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @light-text;
    margin-top: 0;
  }
}

.visualization {
  background: white;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  overflow: hidden;
  margin-bottom: 2rem;
}

.process-diagram {
  display: flex;
  background: linear-gradient(to right, #1a5276, #3498db);
  padding: 1rem;
  overflow-x: auto;

  .process-step {
    flex: 1;
    min-width: 160px;
    display: flex;
    align-items: center;
    padding: 1rem;
    margin: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    cursor: pointer;
    transition: @transition;
    position: relative;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.15);

    &.active {
      background: rgba(255, 255, 255, 0.25);
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
      transform: translateY(-5px);

      .step-number {
        background: @secondary;
        color: white;
      }
    }

    .step-number {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: white;
      color: @primary;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .step-info {
      flex-grow: 1;

      h3 {
        margin: 0;
        color: white;
        font-size: 1.1rem;
      }

      p {
        margin: 4px 0 0;
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.85rem;
      }
    }

    .step-icon {
      font-size: 1.4rem;
      margin-left: 10px;
    }
  }
}

.explanation-area {
  display: flex;
  min-height: 400px;
  padding: 2rem;

  .visual-representation {
    flex: 1;
    padding: 1.5rem;
    background: #f8fcff;
    border-radius: @border-radius;
    margin-right: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e3f2fd;
  }

  .explanation {
    flex: 1;
    padding: 1.5rem;
    background: white;
    border-radius: @border-radius;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dom-representation {
  font-family: 'Fira Code', monospace;

  .html-node,
  .head-node,
  .body-node,
  .container-node,
  .h1-node,
  .p-node,
  .img-node {
    padding: 12px 20px;
    border-radius: 6px;
    margin: 10px 0;
    font-weight: 500;
    position: relative;
    padding-left: 40px;

    &::before {
      content: '<';
      position: absolute;
      left: 20px;
    }

    &::after {
      content: '>';
      position: absolute;
    }
  }

  .html-node {
    background: #e8f5e9;
    border-left: 4px solid #4caf50;
  }

  .head-node {
    background: #f3e5f5;
    border-left: 4px solid #9c27b0;
  }

  .body-node {
    background: #fff3e0;
    border-left: 4px solid #ff9800;
  }

  .container-node {
    background: #e3f2fd;
    border-left: 4px solid #2196f3;
  }

  .h1-node {
    background: #ffebee;
    border-left: 4px solid #f44336;
  }

  .p-node {
    background: #e8f5e9;
    border-left: 4px solid #4caf50;
  }

  .img-node {
    background: #fffde7;
    border-left: 4px solid #ffeb3b;
  }

  .children {
    margin-left: 40px;
    border-left: 2px solid #bbdefb;
    padding-left: 20px;
  }
}

.cssom-representation {
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;

  .css-rule {
    background: #f5f5f5;
    border-left: 4px solid @primary;
    padding: 15px;
    margin: 15px 0;
    border-radius: 0 6px 6px 0;
    max-width: 300px;
  }

  .selector {
    color: #9c27b0;
    font-weight: 500;
  }

  .property {
    margin-left: 20px;
    color: @text;
  }
}

.render-tree {
  .render-node {
    padding: 12px 20px;
    background: #e3f2fd;
    border-radius: 6px;
    margin: 10px 0;
    font-weight: 500;
    border: 1px solid #bbdefb;
    position: relative;
    padding-left: 40px;

    &::before {
      content: '■';
      position: absolute;
      left: 20px;
      color: @primary;
    }
  }

  .children {
    margin-left: 40px;
    border-left: 2px solid #bbdefb;
    padding-left: 20px;
  }
}

.layout-representation {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .viewport {
    width: 300px;
    height: 250px;
    border: 2px dashed #95a5a6;
    border-radius: 8px;
    position: relative;
    background: #f8f9fa;
    overflow: hidden;
  }

  .element {
    position: absolute;
    background: rgba(52, 152, 219, 0.15);
    border: 1px solid rgba(52, 152, 219, 0.3);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: @primary;
    overflow: hidden;
    box-sizing: border-box;
  }

  .body {
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
  }

  .container {
    top: 30px;
    left: 40px;
    right: 40px;
    bottom: 30px;
  }

  .h1 {
    top: 20px;
    left: 20px;
    right: 20px;
    height: 40px;
  }

  .p {
    top: 75px;
    left: 20px;
    right: 20px;
    height: 70px;
  }

  .img {
    top: 160px;
    left: 40px;
    right: 40px;
    height: 70px;
  }

  .layout-metrics {
    display: flex;
    gap: 20px;
    margin-top: 20px;

    .metric {
      text-align: center;
      background: white;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      min-width: 80px;

      .label {
        font-size: 0.9rem;
        color: @light-text;
        margin-bottom: 5px;
      }

      .value {
        font-size: 1.3rem;
        font-weight: 700;
        color: @text;
      }
    }
  }
}

.paint-representation {
  width: 100%;

  .paint-layers {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
  }

  .layer {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }

  .layer-name {
    width: 100px;
    font-weight: 500;
  }

  .progress-bar {
    flex: 1;
    height: 12px;
    background: #e9ecef;
    border-radius: 6px;
    overflow: hidden;
  }

  .progress {
    height: 100%;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    border-radius: 6px;
    transition: width 1s ease;
  }

  .progress-value {
    width: 50px;
    text-align: right;
    font-weight: 500;
    color: @text;
  }
}

.composite-representation {
  display: flex;
  width: 100%;
  gap: 30px;

  .layers {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
  }

  .layer {
    padding: 25px;
    border-radius: 8px;
    text-align: center;
    font-weight: 500;
    color: white;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    transform: translateX(-20px);
    opacity: 0.9;
    transition: @transition;

    &.background {
      background: linear-gradient(135deg, #3498db, #1a5276);
      transform: translateX(0);
      opacity: 1;
      z-index: 1;
    }

    &.content {
      background: linear-gradient(135deg, #2ecc71, #27ae60);
      transform: translateX(10px);
      opacity: 0.95;
      z-index: 2;
    }

    &.overlay {
      background: linear-gradient(135deg, #9b59b6, #8e44ad);
      transform: translateX(20px);
      z-index: 3;
    }
  }

  .final-output {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .screen {
      width: 200px;
      height: 150px;
      background: linear-gradient(135deg, #2c3e50, #34495e);
      border-radius: 12px;
      padding: 20px;
      color: white;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.05));
      }

      h2 {
        font-size: 1.2rem;
        margin: 0 0 10px;
      }

      p {
        font-size: 0.9rem;
        opacity: 0.8;
        margin: 0;
      }
    }

    .fps-indicator {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: rgba(46, 204, 113, 0.2);
      color: #2ecc71;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
    }
  }
}

.step-explanation {
  h3 {
    margin-top: 0;
    color: @primary;
    font-size: 1.5rem;
  }

  p {
    line-height: 1.6;
    color: @text;
  }

  ul {
    padding-left: 20px;
    margin-top: 1rem;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.5;
      position: relative;
      padding-left: 1.5rem;

      &::before {
        content: '•';
        color: @primary;
        font-weight: bold;
        position: absolute;
        left: 0;
      }
    }
  }
}

.performance-tips {
  background: white;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  padding: 2rem;

  h2 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 2rem;
    color: @text;
  }

  .tips-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;

    .tip {
      background: linear-gradient(135deg, #f8f9fa, #e9ecef);
      border-radius: @border-radius;
      padding: 1.5rem;
      text-align: center;
      transition: @transition;
      border: 1px solid #e9ecef;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
      }

      .tip-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0 0 0.5rem;
        color: @text;
      }

      p {
        margin: 0;
        color: @light-text;
        line-height: 1.5;
      }
    }
  }
}

@media (max-width: 900px) {
  .explanation-area {
    flex-direction: column;

    .visual-representation {
      margin-right: 0;
      margin-bottom: 1.5rem;
    }
  }

  .performance-tips .tips-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .composite-representation {
    flex-direction: column;
    gap: 20px;
  }
}

@media (max-width: 600px) {
  .process-diagram {
    flex-wrap: wrap;
    justify-content: center;
  }

  .process-step {
    min-width: 100% !important;
    margin: 0.5rem 0 !important;
  }

  .performance-tips .tips-grid {
    grid-template-columns: 1fr;
  }
}

.js-blocking-section {
  margin: 2.5rem 0;
  padding: 2rem 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 2px 8px 0 rgba(52, 152, 219, 0.06);

  h2 {
    font-size: 1.6rem;
    color: @primary;
    margin-bottom: 1.2rem;
    font-weight: bold;
  }

  .js-blocking-content {
    display: flex;
    gap: 2.5rem;
    flex-wrap: wrap;

    .js-blocking-explanation {
      flex: 2;
      min-width: 260px;

      h3 {
        font-size: 1.15rem;
        color: @primary;
        margin: 1.1rem 0 0.7rem;
      }

      ul {
        margin: 0 0 1.2rem 1.2rem;
        padding: 0;
        list-style: disc;
        color: @text;
        font-size: 1rem;

        li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
      }
    }

    .js-blocking-visual {
      flex: 3;
      min-width: 260px;
      display: flex;
      align-items: center;
      justify-content: center;

      .js-blocking-diagram {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 1px 6px 0 rgba(52, 152, 219, 0.08);
        padding: 1.2rem 1.5rem;
        min-width: 260px;
        max-width: 420px;

        .diagram-row {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.7rem;

          .diagram-block {
            padding: 0.5rem 1.1rem;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 500;
            color: #fff;
            background: @primary;
            box-shadow: 0 1px 3px 0 rgba(52, 152, 219, 0.10);

            &.html {
              background: #6c9ae7;
            }

            &.script {
              background: #e67e22;
            }

            &.wait {
              background: #e74c3c;
            }

            &.dom {
              background: #27ae60;
            }
          }

          .diagram-arrow {
            font-size: 1.3rem;
            color: #888;
            margin: 0 0.2rem;

            &::selection {
              background: transparent;
            }
          }
        }

        .diagram-note {
          margin-top: 0.5rem;
          font-size: 0.95rem;
          color: @primary;
          background: #eaf6fd;
          border-radius: 4px;
          padding: 0.3rem 0.7rem;

          code {
            background: #f3f6fa;
            color: #e67e22;
            border-radius: 3px;
            padding: 0.1rem 0.3rem;
            font-size: 0.92em;
          }
        }
      }
    }
  }

  .js-blocking-tips {
    margin-top: 1.5rem;
    font-size: 1rem;
    color: @text;

    strong {
      color: @primary;
      margin-right: 0.5rem;
    }

    ul {
      margin: 0.5rem 0 0 1.2rem;
      padding: 0;
      list-style: disc;

      li {
        margin-bottom: 0.4rem;
        line-height: 1.6;
      }

      code {
        background: #f3f6fa;
        color: #e67e22;
        border-radius: 3px;
        padding: 0.1rem 0.3rem;
        font-size: 0.95em;
      }
    }
  }
}

@media (max-width: 900px) {
  .js-blocking-section .js-blocking-content {
    flex-direction: column;
    gap: 1.5rem;
  }

  .js-blocking-section .js-blocking-visual {
    justify-content: flex-start;
  }
}

@media (max-width: 600px) {
  .js-blocking-section {
    padding: 1.2rem 0.5rem;
  }

  .js-blocking-section .js-blocking-content {
    gap: 1rem;
  }

  .js-blocking-section .js-blocking-visual .js-blocking-diagram {
    padding: 0.7rem 0.5rem;
    min-width: 0;
    max-width: 100%;
  }
}
</style>