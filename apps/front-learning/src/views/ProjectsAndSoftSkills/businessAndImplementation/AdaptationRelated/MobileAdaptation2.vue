<template>
  <div class="mobile-adaptation-container">
    <header class="header">
      <h1>移动端适配方案指南</h1>
      <p class="subtitle">构建响应式、灵活且用户体验良好的移动应用</p>
    </header>

    <div class="content">
      <div class="intro-card">
        <div class="icon-box">📱</div>
        <div class="intro-content">
          <h2>为什么需要移动端适配？</h2>
          <p>随着移动设备屏幕尺寸的多样化，为不同设备提供一致的用户体验变得至关重要。移动端适配确保您的应用在各种设备上都能正确显示，包括不同的屏幕尺寸、分辨率和方向。</p>
        </div>
      </div>

      <div class="schemes-container">
        <div class="scheme-card" v-for="scheme in schemes" :key="scheme.id">
          <div class="scheme-header">
            <div class="scheme-icon">{{ scheme.icon }}</div>
            <h3>{{ scheme.title }}</h3>
            <div class="scheme-tags">
              <span v-for="tag in scheme.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>

          <div class="scheme-body">
            <div class="principle">
              <h4>实现原理</h4>
              <p>{{ scheme.principle }}</p>
            </div>

            <div class="usage">
              <h4>使用场景</h4>
              <ul>
                <li v-for="(scene, index) in scheme.usage" :key="index">{{ scene }}</li>
              </ul>
            </div>

            <div class="pros-cons">
              <div class="pros">
                <h4>✅ 优点</h4>
                <ul>
                  <li v-for="(pro, index) in scheme.pros" :key="'pro' + index">{{ pro }}</li>
                </ul>
              </div>
              <div class="cons">
                <h4>⚠️ 缺点</h4>
                <ul>
                  <li v-for="(con, index) in scheme.cons" :key="'con' + index">{{ con }}</li>
                </ul>
              </div>
            </div>

            <div v-if="scheme.codeExample" class="code-example">
              <h4>代码示例</h4>
              <pre><code>{{ scheme.codeExample }}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="comparison-table">
        <h2>适配方案对比</h2>
        <table>
          <thead>
            <tr>
              <th>方案</th>
              <th>实现复杂度</th>
              <th>浏览器支持</th>
              <th>灵活性</th>
              <th>性能影响</th>
              <th>推荐指数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="scheme in schemes" :key="'table-' + scheme.id">
              <td>{{ scheme.title }}</td>
              <td>{{ scheme.complexity }}</td>
              <td>{{ scheme.support }}</td>
              <td>{{ scheme.flexibility }}</td>
              <td>{{ scheme.performance }}</td>
              <td>
                <div class="rating">
                  <span v-for="n in 5" :key="n" :class="{ 'filled': n <= scheme.rating }">★</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="best-practices">
        <h2>最佳实践建议</h2>
        <div class="practices-grid">
          <div class="practice-card" v-for="(practice, index) in practices" :key="index">
            <div class="practice-icon">{{ practice.icon }}</div>
            <h3>{{ practice.title }}</h3>
            <p>{{ practice.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p> 移动端适配方案指南 | 构建跨设备一致的用户体验</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 移动端适配方案数据
const schemes = ref([
  {
    id: 1,
    icon: '📐',
    title: '媒体查询 (Media Queries)',
    tags: ['CSS3', '响应式'],
    principle: '通过CSS3的@media规则，根据不同的设备特性（如屏幕宽度、高度、方向等）应用不同的样式规则。',
    usage: [
      '根据屏幕宽度调整布局结构',
      '在小屏幕上隐藏非关键元素',
      '调整字体大小和间距以适应不同屏幕',
      '横竖屏切换时改变布局'
    ],
    pros: [
      '纯CSS实现，无需JS',
      '浏览器支持良好',
      '细粒度控制不同屏幕样式'
    ],
    cons: [
      '断点选择需要经验',
      '维护多个断点样式可能复杂',
      '不能完全解决所有适配问题'
    ],
    codeExample: `/* 移动设备优先的响应式设计 */
.container {
  padding: 10px;
}

/* 平板设备 */
@media (min-width: 768px) {
  .container {
    padding: 20px;
    max-width: 720px;
  }
}

/* 桌面设备 */
@media (min-width: 992px) {
  .container {
    max-width: 960px;
    margin: 0 auto;
  }
}`,
    complexity: '中等',
    support: '优秀',
    flexibility: '高',
    performance: '低',
    rating: 5
  },
  {
    id: 2,
    icon: '📏',
    title: 'REM 布局',
    tags: ['相对单位', '动态计算'],
    principle: '使用相对于根元素(html)字体大小的单位，通过JS动态计算根字体大小，实现页面元素按比例缩放。',
    usage: [
      '需要整体缩放的应用',
      '设计稿尺寸固定的项目',
      '与移动端设计工具(如蓝湖)配合',
      '需要精确控制元素比例的场景'
    ],
    pros: [
      '保持元素比例关系',
      '实现整体缩放效果',
      '兼容性良好'
    ],
    cons: [
      '需要JS配合计算',
      '图片也需要缩放处理',
      '调试相对复杂'
    ],
    codeExample: `/* 设置根元素字体大小 */
html {
  font-size: 16px;
}

/* 设计稿为750px宽时，1rem = 100px */
@media screen and (min-width: 750px) {
  html {
    font-size: 100px;
  }
}

/* 使用rem定义元素尺寸 */
.header {
  height: 0.88rem;
  font-size: 0.32rem;
}

/* JS动态计算 */
function setRem() {
  const docEl = document.documentElement;
  const width = docEl.clientWidth;
  const rem = width / 7.5; // 750px设计稿分成7.5份
  docEl.style.fontSize = rem + 'px';
}`,
    complexity: '较高',
    support: '优秀',
    flexibility: '中',
    performance: '中',
    rating: 4
  },
  {
    id: 3,
    icon: '🔍',
    title: 'Viewport 单位 (vw/vh)',
    tags: ['CSS3', '视口单位'],
    principle: '使用相对于视口宽度的单位(vw)和相对于视口高度的单位(vh)，1vw等于视口宽度的1%。',
    usage: [
      '创建流式布局',
      '字体大小自适应',
      '元素宽高按比例缩放',
      '全屏布局元素'
    ],
    pros: [
      '纯CSS解决方案',
      '不需要JS计算',
      '响应式效果好',
      '现代浏览器支持良好'
    ],
    cons: [
      '低版本浏览器兼容性有限',
      '计算精度问题',
      '需要处理极端宽高比'
    ],
    codeExample: `/* 使用vw定义字体大小 */
.title {
  font-size: 4vw; /* 视口宽度的4% */
}

/* 保持元素宽高比 */
.banner {
  width: 100%;
  height: 56.25vw; /* 16:9宽高比 (9/16=0.5625) */
}

/* 结合calc()函数使用 */
.sidebar {
  width: 300px;
  width: calc(20vw + 100px);
}

/* 设置最大最小尺寸 */
.container {
  width: 90vw;
  max-width: 1200px;
  min-width: 320px;
}`,
    complexity: '中等',
    support: '良好',
    flexibility: '高',
    performance: '低',
    rating: 5
  },
  {
    id: 4,
    icon: '🔄',
    title: 'Flexible 方案 (手淘方案)',
    tags: ['动态REM', 'lib-flexible'],
    principle: '通过JS动态设置根元素的字体大小，将页面分成10份，每份宽度为1rem，同时处理设备像素比(DPR)。',
    usage: [
      '淘宝、天猫等电商应用',
      '需要处理高清屏(Retina)的项目',
      '固定设计稿尺寸的移动端项目',
      '需要快速实现适配的复杂应用'
    ],
    pros: [
      '成熟的解决方案',
      '自动处理高清屏',
      '保持元素比例',
      '社区支持良好'
    ],
    cons: [
      '需要引入额外库',
      '不适用于PC端',
      '需要特殊处理图片',
      '逐渐被现代方案取代'
    ],
    codeExample: `/* 安装依赖 */
npm install lib-flexible --save

/* 在入口文件引入 */
import 'lib-flexible'

/* 在CSS中使用rem */
.header {
  height: 0.88rem;
  font-size: 0.32rem;
}

/* 处理Retina屏图片 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
  .logo {
    background-image: url(logo@2x.png);
    background-size: 100% 100%;
  }
}`,
    complexity: '中等',
    support: '优秀',
    flexibility: '中',
    performance: '中',
    rating: 4
  },
  {
    id: 5,
    icon: '🧩',
    title: 'Flexbox + Grid 布局',
    tags: ['现代布局', 'CSS3'],
    principle: '使用Flexbox进行一维布局控制，使用Grid进行二维布局控制，结合使用创建灵活、响应式的布局结构。',
    usage: [
      '复杂网格布局',
      '卡片式布局',
      '等高列布局',
      '内容流自适应布局',
      '多列对齐控制'
    ],
    pros: [
      '强大的布局能力',
      '减少浮动和定位使用',
      '简化复杂布局实现',
      '现代浏览器支持良好'
    ],
    cons: [
      '旧浏览器支持有限',
      '学习曲线较陡',
      '需要处理不同浏览器的前缀'
    ],
    codeExample: `/* Flexbox 示例 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Grid 示例 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}

/* 组合使用 */
.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.card {
  display: flex;
  flex-direction: column;
}`,
    complexity: '中等',
    support: '良好',
    flexibility: '高',
    performance: '低',
    rating: 5
  },
  {
    id: 6,
    icon: '🖼️',
    title: '响应式图片',
    tags: ['内容适配', '性能优化'],
    principle: '使用srcset、sizes属性和picture元素，根据设备分辨率、屏幕大小和像素密度提供最合适的图片资源。',
    usage: [
      '优化移动端图片加载',
      '处理Retina高清屏',
      '艺术方向(Art Direction)调整',
      '不同设备加载不同尺寸图片',
      '节省带宽提升性能'
    ],
    pros: [
      '显著提升性能',
      '改善用户体验',
      '节省带宽',
      '现代浏览器支持良好'
    ],
    cons: [
      '需要准备多套图片',
      'HTML结构较复杂',
      '旧浏览器支持有限'
    ],
    codeExample: `<!-- srcset 示例 -->
<img src="image-small.jpg"
     srcset="image-medium.jpg 1000w,
             image-large.jpg 2000w"
     sizes="(max-width: 600px) 100vw,
            (max-width: 1200px) 50vw,
            1000px"
     alt="示例图片">

<!-- picture 元素示例 -->
<picture>
  <source media="(min-width: 1000px)"
          srcset="desktop.jpg, desktop-2x.jpg 2x">
  <source media="(min-width: 600px)"
          srcset="tablet.jpg, tablet-2x.jpg 2x">
  <img src="mobile.jpg"
       srcset="mobile-2x.jpg 2x"
       alt="示例图片">
</picture>`,
    complexity: '中等',
    support: '良好',
    flexibility: '高',
    performance: '高',
    rating: 4
  }
]);

// 最佳实践
const practices = ref([
  {
    icon: '📱',
    title: '移动优先设计',
    description: '优先为小屏幕设计，然后逐步增强为大屏幕体验。确保核心功能在移动设备上表现良好。'
  },
  {
    icon: '📐',
    title: '使用相对单位',
    description: '优先使用em、rem、vw、vh等相对单位，避免固定像素值，使元素能够根据环境变化。'
  },
  {
    icon: '⚖️',
    title: '设置合理的断点',
    description: '基于内容设置断点，而不是特定设备尺寸。常用断点：320px、480px、768px、1024px、1280px。'
  },
  {
    icon: '🏗️',
    title: '弹性布局',
    description: '使用Flexbox和Grid布局创建灵活的界面，减少媒体查询的需求，提高布局适应性。'
  },
  {
    icon: '🖼️',
    title: '图片优化',
    description: '使用响应式图片技术，为不同设备提供合适尺寸的图片，减少不必要的带宽消耗。'
  },
  {
    icon: '🧪',
    title: '设备测试',
    description: '在实际设备上测试而不仅仅是模拟器，确保在各种设备上都能提供良好的用户体验。'
  }
]);
</script>

<style scoped lang="less">
// 变量定义
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #e74c3c;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e1e4e8;
@text-color: #333333;
@light-text: #6c757d;
@success-color: #2ecc71;
@warning-color: #f39c12;
@shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

// 基础样式
.mobile-adaptation-container {
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @light-bg;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  border-radius: 12px;
  box-shadow: @shadow;
  color: white;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
    font-weight: 300;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }
}

.intro-card {
  display: flex;
  align-items: center;
  background: @card-bg;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: @shadow;

  .icon-box {
    font-size: 3rem;
    margin-right: 25px;
    min-width: 80px;
    text-align: center;
  }

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
  }
}

.schemes-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 25px;
  margin-bottom: 40px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.scheme-card {
  background: @card-bg;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: @shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}

.scheme-header {
  background: linear-gradient(to right, @primary-color, lighten(@primary-color, 10%));
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;

  .scheme-icon {
    font-size: 2rem;
    margin-right: 15px;
  }

  h3 {
    font-size: 1.6rem;
    margin: 0;
    flex-grow: 1;
  }
}

.scheme-tags {
  display: flex;
  gap: 8px;

  .tag {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 0.85rem;
  }
}

.scheme-body {
  padding: 25px;

  h4 {
    font-size: 1.2rem;
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 15px;
    padding-bottom: 8px;
    border-bottom: 1px solid @border-color;
  }

  .principle p {
    font-size: 1.05rem;
    line-height: 1.7;
    margin-bottom: 20px;
  }

  .usage ul {
    padding-left: 20px;
    margin-bottom: 20px;

    li {
      margin-bottom: 10px;
      position: relative;
      padding-left: 15px;

      &::before {
        content: "•";
        color: @primary-color;
        position: absolute;
        left: 0;
        font-size: 1.2rem;
      }
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  .pros,
  .cons {
    ul {
      padding-left: 20px;
      margin: 0;

      li {
        margin-bottom: 10px;
        position: relative;
        padding-left: 22px;

        &::before {
          position: absolute;
          left: 0;
          top: 0;
          font-size: 1.2rem;
        }
      }
    }
  }

  .pros li::before {
    content: "✓";
    color: @success-color;
  }

  .cons li::before {
    content: "⚠";
    color: @warning-color;
  }
}

.code-example {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
  overflow-x: auto;

  pre {
    margin: 0;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    white-space: pre-wrap;
  }

  code {
    color: #2c3e50;
  }
}

.comparison-table {
  background: @card-bg;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 40px;
  box-shadow: @shadow;

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 25px;
    text-align: center;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: #f8f9fa;
      font-weight: 600;
      color: @secondary-color;
    }

    tr:hover {
      background-color: #f8f9fa;
    }
  }
}

.rating {
  color: #ddd;
  font-size: 1.2rem;

  .filled {
    color: #f39c12;
  }
}

.best-practices {
  margin-bottom: 40px;

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 30px;
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.practice-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 25px;
  box-shadow: @shadow;
  transition: transform 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }

  .practice-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  h3 {
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: @secondary-color;
  }

  p {
    font-size: 1.05rem;
    line-height: 1.7;
    margin: 0;
  }
}

.footer {
  text-align: center;
  padding: 20px;
  margin-top: 30px;
  color: @light-text;
  font-size: 0.95rem;
  border-top: 1px solid @border-color;
}
</style>
