<template>
  <div class="gasp-guide-container">
    <header class="guide-header">
      <h1>GSAP 动画库使用指南</h1>
      <p>GreenSock Animation Platform - 专业级 JavaScript 动画解决方案</p>
      <P><a href="https://gsap.framer.wiki/stated" target="_blank">GSAP 中文文档</a></P>
    </header>

    <div class="content-wrapper">
      <!-- 导航 -->
      <nav class="navigation">
        <ul>
          <li v-for="section in sections" :key="section.id" @click="scrollToSection(section.id)">
            {{ section.title }}
          </li>
        </ul>
      </nav>

      <!-- 内容区域 -->
      <div class="content">
        <!-- 介绍部分 -->
        <section id="introduction" class="guide-section">
          <div class="intro-header">
            <div class="logo-container">
              <div class="gsap-logo">GSAP</div>
            </div>
            <div class="intro-text">
              <h2>什么是 GSAP？</h2>
              <p>
                GSAP (GreenSock Animation Platform) 是一个强大的 JavaScript
                动画库，用于创建高性能、跨浏览器的动画效果。 它提供了丰富的 API
                和工具，使开发者能够轻松创建复杂的动画序列、时间轴控制和交互式动画体验。
              </p>
            </div>
          </div>

          <div class="feature-grid">
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <h3>卓越性能</h3>
              <p>优化动画性能，60fps 流畅运行</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🌐</div>
              <h3>跨浏览器</h3>
              <p>支持所有现代浏览器和旧版 IE</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🧩</div>
              <h3>模块化</h3>
              <p>按需导入核心和插件功能</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔄</div>
              <h3>时间轴控制</h3>
              <p>精确控制复杂动画序列</p>
            </div>
          </div>
        </section>

        <!-- 核心概念 -->
        <section id="core-concepts" class="guide-section">
          <h2>核心概念</h2>

          <div class="concept-grid">
            <div class="concept-card">
              <h3>🎯 Tweens</h3>
              <p>用于单个元素的动画，控制属性随时间变化</p>
              <pre class="code-block">
gsap.to(".box", {
  duration: 1,
  x: 100,
  rotation: 360,
  opacity: 0.5
});</pre
              >
            </div>

            <div class="concept-card">
              <h3>📜 Timelines</h3>
              <p>创建有序或重叠的动画序列</p>
              <pre class="code-block">
const tl = gsap.timeline();
tl.to(".box1", {x: 100})
  .to(".box2", {y: 50}, "&lt;0.5") // 在前一个动画结束前0.5秒开始
  .to(".box3", {rotation: 180}, "+=1"); // 延迟1秒</pre
              >
            </div>

            <div class="concept-card">
              <h3>🎚️ Easing</h3>
              <p>控制动画的速度变化曲线</p>
              <div class="ease-grid">
                <div
                  class="ease-example"
                  :style="{ background: ease.color }"
                  v-for="ease in eases"
                  :key="ease.name"
                >
                  <div class="ease-name">{{ ease.name }}</div>
                  <div class="ease-visual"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 常用 API -->
        <section id="api" class="guide-section">
          <h2>常用 API</h2>

          <div class="api-tabs">
            <div class="tabs-header">
              <button
                v-for="(tab, index) in tabs"
                :key="index"
                :class="{ active: activeTab === index }"
                @click="activeTab = index"
              >
                {{ tab.title }}
              </button>
            </div>

            <div class="tabs-content">
              <div v-if="activeTab === 0" class="tab-panel">
                <h3>gsap.to()</h3>
                <p>从当前状态动画到目标状态</p>
                <pre class="code-block">
gsap.to(element, {
  duration: 1,
  x: 200,
  backgroundColor: "#ff0000",
  ease: "power2.out"
});</pre
                >

                <h3>gsap.from()</h3>
                <p>从指定状态动画到当前状态</p>
                <pre class="code-block">
gsap.from(element, {
  duration: 0.8,
  opacity: 0,
  y: 50,
  stagger: 0.1 // 多个元素时错开动画
});</pre
                >
              </div>

              <div v-if="activeTab === 1" class="tab-panel">
                <h3>创建时间轴</h3>
                <pre class="code-block">
const tl = gsap.timeline({
  defaults: { // 默认值
    duration: 0.5,
    ease: "sine.out"
  }
});</pre
                >

                <h3>时间轴控制</h3>
                <pre class="code-block">
// 添加动画到时间轴
tl.to(".box1", {x: 100})
  .to(".box2", {y: 50}, "&lt;") // 与前一动画同时开始
  .to(".box3", {rotation: 45}, "+=0.5"); // 延迟0.5秒

// 控制时间轴
tl.play();
tl.pause();
tl.reverse();
tl.seek(1.5); // 跳转到1.5秒位置</pre
                >
              </div>

              <div v-if="activeTab === 2" class="tab-panel">
                <h3>ScrollTrigger</h3>
                <p>基于滚动位置触发动画</p>
                <pre class="code-block">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  scrollTrigger: {
    trigger: ".container",
    start: "top center",
    end: "bottom 80%",
    scrub: true, // 跟随滚动
    markers: true // 调试标记
  },
  x: 500,
  rotation: 360
});</pre
                >

                <h3>其他实用插件</h3>
                <ul>
                  <li><strong>TextPlugin</strong> - 文字动画</li>
                  <li><strong>MorphSVGPlugin</strong> - SVG 变形动画</li>
                  <li><strong>DrawSVGPlugin</strong> - SVG 路径绘制动画</li>
                  <li><strong>MotionPathPlugin</strong> - 沿路径运动</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 学习曲线 -->
        <section id="learning" class="guide-section">
          <h2>学习曲线</h2>

          <div class="learning-curve">
            <div class="curve-chart">
              <div class="curve-axis">
                <div class="axis-label">学习难度</div>
                <div class="axis-label">掌握程度</div>
              </div>
              <div class="curve-line">
                <div class="curve-point" style="left: 10%; bottom: 20%">
                  <div class="point-label">基础动画</div>
                </div>
                <div class="curve-point" style="left: 40%; bottom: 50%">
                  <div class="point-label">时间轴</div>
                </div>
                <div class="curve-point" style="left: 70%; bottom: 70%">
                  <div class="point-label">高级插件</div>
                </div>
              </div>
            </div>

            <div class="learning-content">
              <h3>学习资源</h3>
              <ul>
                <li><strong>官方文档</strong> - 详尽的 API 文档和示例</li>
                <li><strong>GSAP 学习中心</strong> - 免费教程和课程</li>
                <li><strong>CodePen 示例</strong> - 大量社区创作示例</li>
                <li><strong>官方论坛</strong> - 活跃的开发者社区</li>
              </ul>

              <h3>学习路径建议</h3>
              <ol>
                <li>学习基础 Tween 动画</li>
                <li>掌握时间轴控制</li>
                <li>理解缓动函数</li>
                <li>学习 ScrollTrigger 插件</li>
                <li>探索其他高级插件</li>
              </ol>
            </div>
          </div>
        </section>

        <!-- 性能分析 -->
        <section id="performance" class="guide-section">
          <h2>性能分析</h2>

          <div class="performance-grid">
            <div class="perf-card">
              <h3>⚡ 性能优势</h3>
              <ul>
                <li>硬件加速动画</li>
                <li>自动优化属性更新</li>
                <li>高效的内存管理</li>
                <li>避免布局抖动</li>
                <li>智能更新批处理</li>
              </ul>
            </div>

            <div class="perf-card">
              <h3>📊 性能对比</h3>
              <div class="perf-chart">
                <div class="chart-bars">
                  <div class="bar" style="height: 90%; width: 25%; background: #4a7bf7">
                    <div class="bar-label">GSAP</div>
                  </div>
                  <div class="bar" style="height: 75%; width: 25%; background: #6c5ce7">
                    <div class="bar-label">Anime.js</div>
                  </div>
                  <div class="bar" style="height: 60%; width: 25%; background: #00cec9">
                    <div class="bar-label">Animate.css</div>
                  </div>
                  <div class="bar" style="height: 40%; width: 25%; background: #fd79a8">
                    <div class="bar-label">jQuery</div>
                  </div>
                </div>
                <div class="chart-title">动画性能对比（帧率稳定性）</div>
              </div>
            </div>

            <div class="perf-card">
              <h3>🏎️ 优化技巧</h3>
              <ul>
                <li>使用 will-change 属性</li>
                <li>避免动画布局相关属性</li>
                <li>使用 transform 和 opacity</li>
                <li>合理使用 force3D: "auto"</li>
                <li>避免在动画中使用滤镜</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 适用场景 -->
        <section id="use-cases" class="guide-section">
          <h2>适用场景</h2>

          <div class="scenario-grid">
            <div class="scenario-card">
              <div class="scenario-icon">💻</div>
              <h3>复杂 UI 动画</h3>
              <p>仪表盘、数据可视化、交互式界面</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">📱</div>
              <h3>网站特效</h3>
              <p>页面过渡、滚动动画、微交互</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🎮</div>
              <h3>游戏动画</h3>
              <p>角色动画、特效、界面元素</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">📊</div>
              <h3>数据可视化</h3>
              <p>图表动画、数据过渡效果</p>
            </div>
          </div>

          <div class="comparison-section">
            <h3>与其他动画库对比</h3>
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>GSAP</th>
                    <th>Anime.js</th>
                    <th>Framer Motion</th>
                    <th>Animate.css</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>性能</td>
                    <td>⭐️⭐️⭐️⭐️⭐️</td>
                    <td>⭐️⭐️⭐️⭐️</td>
                    <td>⭐️⭐️⭐️</td>
                    <td>⭐️⭐️</td>
                  </tr>
                  <tr>
                    <td>学习曲线</td>
                    <td>中等</td>
                    <td>简单</td>
                    <td>简单</td>
                    <td>非常简单</td>
                  </tr>
                  <tr>
                    <td>功能丰富度</td>
                    <td>⭐️⭐️⭐️⭐️⭐️</td>
                    <td>⭐️⭐️⭐️</td>
                    <td>⭐️⭐️⭐️⭐️</td>
                    <td>⭐️⭐️</td>
                  </tr>
                  <tr>
                    <td>时间轴控制</td>
                    <td>⭐️⭐️⭐️⭐️⭐️</td>
                    <td>⭐️⭐️⭐️</td>
                    <td>⭐️⭐️⭐️</td>
                    <td>❌</td>
                  </tr>
                  <tr>
                    <td>插件系统</td>
                    <td>⭐️⭐️⭐️⭐️⭐️</td>
                    <td>⭐️⭐️</td>
                    <td>⭐️⭐️⭐️</td>
                    <td>❌</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- 示例代码 -->
        <section id="examples" class="guide-section">
          <h2>示例代码</h2>

          <div class="code-examples">
            <div class="example-card">
              <h3>基本动画</h3>
              <pre class="code-block">
// 简单动画
gsap.to(".box", {
  duration: 1,
  x: 100,
  rotation: 360,
  backgroundColor: "#ff9900",
  ease: "bounce.out"
});</pre
              >
            </div>

            <div class="example-card">
              <h3>交错动画</h3>
              <pre class="code-block">
// 多个元素错开动画
gsap.from(".item", {
  duration: 0.5,
  opacity: 0,
  y: 50,
  stagger: 0.1, // 每个元素间隔0.1秒
  ease: "power2.out"
});</pre
              >
            </div>

            <div class="example-card">
              <h3>滚动触发动画</h3>
              <pre class="code-block">
// 滚动触发动画
gsap.to(".element", {
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  },
  x: 200,
  rotation: 90,
  duration: 1
});</pre
              >
            </div>
          </div>
        </section>

        <!-- 总结 -->
        <section id="conclusion" class="guide-section">
          <h2>总结</h2>

          <div class="conclusion-content">
            <div class="pros-cons">
              <div class="pros">
                <h3>👍 优势</h3>
                <ul>
                  <li>无与伦比的性能和稳定性</li>
                  <li>强大的时间轴控制</li>
                  <li>丰富的插件生态系统</li>
                  <li>出色的浏览器兼容性</li>
                  <li>活跃的社区和优质文档</li>
                </ul>
              </div>

              <div class="cons">
                <h3>👎 劣势</h3>
                <ul>
                  <li>学习曲线略陡峭</li>
                  <li>高级功能需要付费</li>
                  <li>文件体积相对较大</li>
                  <li>需要手动管理动画实例</li>
                </ul>
              </div>
            </div>

            <div class="final-recommendation">
              <h3>使用建议</h3>
              <p>
                GSAP
                是复杂和高性能动画场景的首选解决方案，特别适合需要精确控制、时间轴管理和高性能要求的项目。
                对于简单动画，可以考虑更轻量的替代方案，但 GSAP
                在功能深度和性能方面仍然是无与伦比的。
              </p>
              <div class="cta-button" @click="visitGSAP">访问 GSAP 官网</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 导航部分
const sections = ref([
  { id: 'introduction', title: '介绍' },
  { id: 'core-concepts', title: '核心概念' },
  { id: 'api', title: '常用 API' },
  { id: 'learning', title: '学习曲线' },
  { id: 'performance', title: '性能分析' },
  { id: 'use-cases', title: '适用场景' },
  { id: 'examples', title: '示例代码' },
  { id: 'conclusion', title: '总结' },
])

// 选项卡状态
const activeTab = ref(0)
const tabs = ref([{ title: '基础动画' }, { title: '时间轴' }, { title: '插件系统' }])

// 缓动函数示例
const eases = ref([
  { name: 'linear', color: '#ff6b6b' },
  { name: 'power1.in', color: '#ff9e7d' },
  { name: 'power1.out', color: '#feca57' },
  { name: 'power2.inOut', color: '#1dd1a1' },
  { name: 'bounce.out', color: '#54a0ff' },
  { name: 'elastic', color: '#5f27cd' },
])

// 滚动到指定部分
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// 访问 GSAP 官网
const visitGSAP = () => {
  window.open('https://greensock.com/gsap/', '_blank')
}
</script>

<style scoped lang="less">
@primary-color: #4a7bf7;
@secondary-color: #6c5ce7;
@text-color: #2d3436;
@light-bg: #f8f9fa;
@border-color: #e0e0e0;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

.gasp-guide-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.guide-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    color: @primary-color;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
  }
}

.content-wrapper {
  display: flex;
  gap: 2rem;
}

.navigation {
  flex: 0 0 200px;
  position: sticky;
  top: 2rem;
  height: fit-content;
  background: @light-bg;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.8rem 1rem;
      margin-bottom: 0.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;

      &:hover {
        background: lighten(@primary-color, 40%);
        color: @primary-color;
      }

      &:active {
        transform: translateY(1px);
      }
    }
  }
}

.content {
  flex: 1;
}

.guide-section {
  margin-bottom: 3rem;
  padding: 1.5rem 2rem;
  background: @light-bg;
  border-radius: 8px;
  box-shadow: @card-shadow;

  h2 {
    color: @secondary-color;
    font-size: 1.8rem;
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid lighten(@secondary-color, 40%);
  }
}

.intro-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;

  .logo-container {
    flex: 0 0 120px;

    .gsap-logo {
      width: 120px;
      height: 120px;
      background: linear-gradient(135deg, #4a7bf7, #6c5ce7);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2.5rem;
      font-weight: bold;
      box-shadow: 0 6px 15px rgba(106, 90, 247, 0.3);
    }
  }

  .intro-text {
    flex: 1;

    p {
      line-height: 1.6;
      font-size: 1.1rem;
    }
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0.5rem 0;
    font-size: 1.2rem;
  }

  p {
    font-size: 0.95rem;
    color: lighten(@text-color, 20%);
    margin: 0;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.concept-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  h3 {
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

.code-block {
  display: block;
  background: #2d3436;
  color: #f1f2f6;
  border-radius: 6px;
  padding: 1.2rem;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.95rem;
  overflow-x: auto;
  margin: 1.2rem 0;
  line-height: 1.5;
}

.ease-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.ease-example {
  border-radius: 6px;
  padding: 0.8rem;
  box-shadow: @card-shadow;

  .ease-name {
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.8rem;
    color: white;
  }

  .ease-visual {
    height: 4px;
    background: white;
    border-radius: 2px;
  }
}

.api-tabs {
  margin-top: 1.5rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: @card-shadow;
}

.tabs-header {
  display: flex;
  border-bottom: 1px solid @border-color;

  button {
    flex: 1;
    padding: 1rem;
    background: none;
    border: none;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: lighten(@primary-color, 45%);
    }

    &.active {
      background: @primary-color;
      color: white;
    }
  }
}

.tabs-content {
  padding: 1.5rem;

  .tab-panel {
    h3 {
      margin-top: 1rem;
      color: @primary-color;

      &:first-child {
        margin-top: 0;
      }
    }
  }
}

.learning-curve {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;

  .curve-chart {
    flex: 1;
    position: relative;
    height: 300px;
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: @card-shadow;

    .curve-axis {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-left: 1px solid #ddd;
      border-bottom: 1px solid #ddd;

      .axis-label {
        position: absolute;
        left: -30px;
        bottom: 0;
        transform: rotate(-90deg);
        transform-origin: 0 0;
        font-size: 0.9rem;
        color: #777;

        &:last-child {
          left: 0;
          bottom: -30px;
          transform: none;
        }
      }
    }

    .curve-line {
      position: absolute;
      bottom: 30px;
      left: 30px;
      right: 30px;
      height: 240px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 80%;
        background: linear-gradient(to top, rgba(74, 123, 247, 0.1), transparent);
        clip-path: polygon(0% 100%, 10% 80%, 40% 50%, 70% 30%, 100% 0%);
      }
    }

    .curve-point {
      position: absolute;
      width: 12px;
      height: 12px;
      background: @primary-color;
      border-radius: 50%;
      transform: translate(-50%, 50%);

      .point-label {
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        font-size: 0.9rem;
        font-weight: 500;
      }
    }
  }

  .learning-content {
    flex: 1;

    ul,
    ol {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
}

.performance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.perf-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  h3 {
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  ul {
    padding-left: 1.5rem;
  }
}

.perf-chart {
  margin-top: 1rem;

  .chart-bars {
    display: flex;
    align-items: flex-end;
    height: 200px;
    gap: 1rem;
    padding: 0 1rem;

    .bar {
      position: relative;
      border-radius: 4px 4px 0 0;

      .bar-label {
        position: absolute;
        bottom: -25px;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 0.9rem;
      }
    }
  }

  .chart-title {
    text-align: center;
    margin-top: 2rem;
    font-weight: 500;
    color: #777;
  }
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.scenario-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .scenario-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0.5rem 0;
  }
}

.comparison-table {
  overflow-x: auto;
  margin-top: 1.5rem;

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: @card-shadow;

    th,
    td {
      padding: 1rem;
      text-align: center;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: lighten(@primary-color, 45%);
      font-weight: 600;
    }

    tr:last-child td {
      border-bottom: none;
    }
  }
}

.code-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.example-card {
  background: #2d3436;
  color: #f1f2f6;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  h3 {
    margin-top: 0;
    color: #54a0ff;
  }
}

.conclusion-content {
  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;

    .pros,
    .cons {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: @card-shadow;

      h3 {
        margin-top: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }

    .pros {
      border-top: 4px solid #2ecc71;
    }

    .cons {
      border-top: 4px solid #e74c3c;
    }
  }

  .final-recommendation {
    background: lighten(@primary-color, 48%);
    border-radius: 8px;
    padding: 1.5rem;
    border-left: 4px solid @primary-color;

    p {
      line-height: 1.6;
    }
  }
}

.cta-button {
  display: inline-block;
  background: @primary-color;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(74, 123, 247, 0.3);

  &:hover {
    background: darken(@primary-color, 10%);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .navigation {
    position: static;
    margin-bottom: 1.5rem;
  }

  .intro-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .learning-curve {
    flex-direction: column;
  }

  .conclusion-content .pros-cons {
    grid-template-columns: 1fr;
  }
}
</style>
