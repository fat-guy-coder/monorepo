<template>
  <div class="css3-interview-knowledge">
    <header class="page-header">
      <h1 class="title">CSS3面试知识点大全</h1>
      <p class="subtitle">前端开发必备CSS3核心知识点整理</p>
    </header>

    <div class="content-wrapper">
      <nav class="nav-sidebar">
        <ul class="nav-list">
          <li
            v-for="category in categories"
            :key="category.id"
            :class="{ active: activeCategory === category.id }"
            @click="activeCategory = category.id"
          >
            {{ category.name }}
            <span class="count">{{ getCategoryCount(category.id) }}</span>
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- 选择器 -->
        <section v-if="activeCategory === 'selectors'" class="knowledge-section">
          <h2>CSS3选择器</h2>
          <div class="knowledge-list">
            <div v-for="item in selectors" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 盒模型 -->
        <section v-if="activeCategory === 'box-model'" class="knowledge-section">
          <h2>盒模型增强</h2>
          <div class="knowledge-list">
            <div v-for="item in boxModel" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 背景与边框 -->
        <section v-if="activeCategory === 'background'" class="knowledge-section">
          <h2>背景与边框</h2>
          <div class="knowledge-list">
            <div v-for="item in backgroundBorder" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 文本效果 -->
        <section v-if="activeCategory === 'text'" class="knowledge-section">
          <h2>文本效果</h2>
          <div class="knowledge-list">
            <div v-for="item in textEffects" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 2D/3D转换 -->
        <section v-if="activeCategory === 'transform'" class="knowledge-section">
          <h2>2D/3D转换</h2>
          <div class="knowledge-list">
            <div v-for="item in transform" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 过渡与动画 -->
        <section v-if="activeCategory === 'animation'" class="knowledge-section">
          <h2>过渡与动画</h2>
          <div class="knowledge-list">
            <div v-for="item in animation" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 多列布局 -->
        <section v-if="activeCategory === 'multicol'" class="knowledge-section">
          <h2>多列布局</h2>
          <div class="knowledge-list">
            <div v-for="item in multiColumn" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 用户界面 -->
        <section v-if="activeCategory === 'ui'" class="knowledge-section">
          <h2>用户界面</h2>
          <div class="knowledge-list">
            <div v-for="item in userInterface" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 滤镜效果 -->
        <section v-if="activeCategory === 'filter'" class="knowledge-section">
          <h2>滤镜效果</h2>
          <div class="knowledge-list">
            <div v-for="item in filterEffects" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 其他新特性 -->
        <section v-if="activeCategory === 'other'" class="knowledge-section">
          <h2>其他新特性</h2>
          <div class="knowledge-list">
            <div v-for="item in other" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="page-footer">
      <p>CSS3知识点总结 - 持续更新</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 响应式数据
const activeCategory = ref('selectors');

// 分类数据
const categories = [
  { id: 'selectors', name: '选择器' },
  { id: 'box-model', name: '盒模型' },
  { id: 'background', name: '背景与边框' },
  { id: 'text', name: '文本效果' },
  { id: 'transform', name: '2D/3D转换' },
  { id: 'animation', name: '过渡与动画' },
  { id: 'multicol', name: '多列布局' },
  { id: 'ui', name: '用户界面' },
  { id: 'filter', name: '滤镜效果' },
  { id: 'other', name: '其他新特性' }
];

// 选择器
const selectors = [
  {
    id: 1,
    title: '属性选择器增强',
    content: '[attr^=value]、[attr$=value]、[attr*=value]等新的属性选择器。',
    example: 'a[href^="https"] { color: green; }\na[href$=".pdf"]::after { content: " (PDF)"; }'
  },
  {
    id: 2,
    title: '结构伪类选择器',
    content: ':nth-child()、:nth-last-child()、:nth-of-type()、:nth-last-of-type()等。',
    example: 'li:nth-child(odd) { background: #f0f0f0; }\ntr:nth-of-type(2n) { background: #e0e0e0; }'
  },
  {
    id: 3,
    title: 'UI元素状态伪类',
    content: ':enabled、:disabled、:checked、:indeterminate等。',
    example: 'input:checked + label { font-weight: bold; }\ninput:disabled { opacity: 0.5; }'
  },
  {
    id: 4,
    title: '目标伪类',
    content: ':target选择当前活动的锚点目标元素。',
    example: '#section1:target { background: yellow; }'
  },
  {
    id: 5,
    title: '否定伪类',
    content: ':not()选择不匹配指定选择器的元素。',
    example: 'div:not(.special) { border: 1px solid #ccc; }'
  },
  {
    id: 6,
    title: '空元素伪类',
    content: ':empty选择没有任何子元素的元素。',
    example: 'div:empty { display: none; }'
  },
  {
    id: 7,
    title: '根元素伪类',
    content: ':root选择文档的根元素（HTML文档中就是html元素）。',
    example: ':root { --main-color: #06c; }'
  }
];

// 盒模型增强
const boxModel = [
  {
    id: 1,
    title: 'box-sizing',
    content: 'content-box | border-box，控制盒模型计算方式。',
    example: '.box { box-sizing: border-box; width: 100px; padding: 10px; } /* 实际宽度100px */'
  },
  {
    id: 2,
    title: 'border-radius',
    content: '设置元素边框圆角，支持椭圆和四个角独立设置。',
    example: '.rounded { border-radius: 10px; }\n.ellipse { border-radius: 50%; }\n.complex { border-radius: 10px 20px 30px 40px; }'
  },
  {
    id: 3,
    title: 'box-shadow',
    content: '为元素添加阴影效果，支持内阴影、多阴影和扩散半径。',
    example: '.shadow { box-shadow: 2px 2px 10px rgba(0,0,0,0.3); }\n.inset-shadow { box-shadow: inset 0 0 10px #000; }\n.multi-shadow { box-shadow: 0 0 5px red, 0 0 10px blue; }'
  },
  {
    id: 4,
    title: 'outline-offset',
    content: '设置轮廓与元素边框的偏移距离。',
    example: '.outline { outline: 2px solid red; outline-offset: 5px; }'
  },
  {
    id: 5,
    title: 'resize',
    content: 'none | both | horizontal | vertical，控制元素是否可调整大小。',
    example: '.resizable { resize: both; overflow: auto; }'
  }
];

// 背景与边框
const backgroundBorder = [
  {
    id: 1,
    title: '多背景图片',
    content: '一个元素可以设置多个背景图片，用逗号分隔。',
    example: '.multi-bg { background: url(bg1.png) top left no-repeat, url(bg2.png) bottom right no-repeat; }'
  },
  {
    id: 2,
    title: 'background-size',
    content: 'contain | cover | length | percentage，控制背景图片尺寸。',
    example: '.cover { background-size: cover; }\n.contain { background-size: contain; }\n.custom { background-size: 50% 100px; }'
  },
  {
    id: 3,
    title: 'background-origin',
    content: 'padding-box | border-box | content-box，控制背景定位区域。',
    example: '.bg-origin { background-origin: content-box; }'
  },
  {
    id: 4,
    title: 'background-clip',
    content: 'padding-box | border-box | content-box | text，控制背景绘制区域。',
    example: '.bg-clip { background-clip: content-box; }\n.text-bg { background-clip: text; color: transparent; }'
  },
  {
    id: 5,
    title: '渐变背景',
    content: 'linear-gradient()、radial-gradient()等渐变函数。',
    example: '.gradient { background: linear-gradient(to right, red, yellow); }\n.radial { background: radial-gradient(circle, red, yellow, green); }'
  },
  {
    id: 6,
    title: 'border-image',
    content: '使用图片作为边框，可设置切片和重复方式。',
    example: '.border-img { border: 10px solid transparent; border-image: url(border.png) 30 round; }'
  }
];

// 文本效果
const textEffects = [
  {
    id: 1,
    title: 'text-shadow',
    content: '为文本添加阴影效果，支持多阴影。',
    example: '.text-shadow { text-shadow: 2px 2px 5px rgba(0,0,0,0.5); }\n.multi-text-shadow { text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue; }'
  },
  {
    id: 2,
    title: 'word-wrap',
    content: 'normal | break-word，控制长单词或URL地址换行。',
    example: '.break-word { word-wrap: break-word; }'
  },
  {
    id: 3,
    title: 'word-break',
    content: 'normal | break-all | keep-all，控制文本换行方式。',
    example: '.break-all { word-break: break-all; }'
  },
  {
    id: 4,
    title: 'text-overflow',
    content: 'clip | ellipsis | string，控制文本溢出显示方式。',
    example: '.ellipsis { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }'
  },
  {
    id: 5,
    title: '@font-face',
    content: '定义自定义字体，支持多种字体格式。',
    example: '@font-face { font-family: "MyFont"; src: url("myfont.woff2") format("woff2"); }\n.custom-font { font-family: "MyFont"; }'
  },
  {
    id: 6,
    title: 'font-feature-settings',
    content: '控制OpenType字体的高级排版特性。',
    example: '.ligatures { font-feature-settings: "liga" 1, "dlig" 1; }'
  }
];

// 2D/3D转换
const transform = [
  {
    id: 1,
    title: 'transform 2D变换',
    content: 'translate()、rotate()、scale()、skew()等2D变换函数。',
    example: '.transform-2d { transform: translate(50px, 100px) rotate(45deg) scale(1.5) skew(10deg, 5deg); }'
  },
  {
    id: 2,
    title: 'transform 3D变换',
    content: 'translate3d()、rotate3d()、scale3d()等3D变换函数。',
    example: '.transform-3d { transform: translate3d(100px, 100px, 100px) rotate3d(1, 1, 1, 45deg); }'
  },
  {
    id: 3,
    title: 'transform-origin',
    content: '设置变换的原点位置。',
    example: '.origin { transform-origin: 50% 50%; }\n.origin-top-left { transform-origin: 0 0; }'
  },
  {
    id: 4,
    title: 'perspective',
    content: '设置3D变换的透视距离，创建3D空间。',
    example: '.perspective { perspective: 500px; }'
  },
  {
    id: 5,
    title: 'perspective-origin',
    content: '设置3D透视的消失点位置。',
    example: '.perspective-origin { perspective-origin: 25% 75%; }'
  },
  {
    id: 6,
    title: 'backface-visibility',
    content: 'visible | hidden，控制元素背面是否可见。',
    example: '.backface-hidden { backface-visibility: hidden; }'
  },
  {
    id: 7,
    title: 'transform-style',
    content: 'flat | preserve-3d，控制子元素是否位于3D空间中。',
    example: '.preserve-3d { transform-style: preserve-3d; }'
  }
];

// 过渡与动画
const animation = [
  {
    id: 1,
    title: 'transition过渡',
    content: '属性变化时的平滑过渡效果。',
    example: '.transition { transition: all 0.3s ease-in-out; }\n.specific { transition: opacity 0.5s ease 0.1s; }'
  },
  {
    id: 2,
    title: '@keyframes规则',
    content: '定义动画序列的关键帧。',
    example: '@keyframes slidein { from { transform: translateX(-100%); } to { transform: translateX(0); } }'
  },
  {
    id: 3,
    title: 'animation属性',
    content: 'animation-name、duration、timing-function、delay、iteration-count、direction、fill-mode、play-state。',
    example: '.animate { animation: slidein 1s ease-in-out infinite alternate; }'
  },
  {
    id: 4,
    title: 'animation-fill-mode',
    content: 'none | forwards | backwards | both，控制动画执行前后如何应用样式。',
    example: '.fill-forwards { animation-fill-mode: forwards; }'
  },
  {
    id: 5,
    title: 'animation-direction',
    content: 'normal | reverse | alternate | alternate-reverse，控制动画播放方向。',
    example: '.alternate { animation-direction: alternate; }'
  },
  {
    id: 6,
    title: 'steps()缓动函数',
    content: 'steps(n, start|end)，创建逐帧动画效果。',
    example: '.steps { animation-timing-function: steps(5, end); }'
  },
  {
    id: 7,
    title: 'cubic-bezier()缓动函数',
    content: '自定义贝塞尔曲线缓动函数。',
    example: '.custom-ease { animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }'
  }
];

// 多列布局
const multiColumn = [
  {
    id: 1,
    title: 'column-count',
    content: '指定元素内容应该被分割的列数。',
    example: '.columns { column-count: 3; }'
  },
  {
    id: 2,
    title: 'column-width',
    content: '指定每列的理想宽度，浏览器会自动调整列数。',
    example: '.column-width { column-width: 200px; }'
  },
  {
    id: 3,
    title: 'column-gap',
    content: '指定列与列之间的间隙。',
    example: '.column-gap { column-gap: 20px; }'
  },
  {
    id: 4,
    title: 'column-rule',
    content: 'column-rule-width、column-rule-style、column-rule-color的简写，设置列间分隔线。',
    example: '.column-rule { column-rule: 1px solid #ccc; }'
  },
  {
    id: 5,
    title: 'column-span',
    content: 'none | all，指定元素是否横跨所有列。',
    example: '.span-all { column-span: all; }'
  },
  {
    id: 6,
    title: 'break-inside',
    content: 'auto | avoid，控制元素内部是否允许断行。',
    example: '.avoid-break { break-inside: avoid; }'
  }
];

// 用户界面
const userInterface = [
  {
    id: 1,
    title: 'box-sizing',
    content: 'content-box | border-box，更符合直觉的盒模型。',
    example: '.ui-box { box-sizing: border-box; }'
  },
  {
    id: 2,
    title: 'resize',
    content: 'none | both | horizontal | vertical，控制元素是否可调整大小。',
    example: '.resizable { resize: both; overflow: auto; }'
  },
  {
    id: 3,
    title: 'outline-offset',
    content: '设置轮廓与元素边框的偏移距离。',
    example: '.outline-offset { outline: 2px solid red; outline-offset: 5px; }'
  },
  {
    id: 4,
    title: 'nav-index、nav-up、nav-right、nav-down、nav-left',
    content: '控制使用方向键导航时的焦点顺序。',
    example: '.nav { nav-index: 1; nav-right: #button2; nav-left: #button1; }'
  },
  {
    id: 5,
    title: 'appearance',
    content: 'none | auto | button | checkbox等，改变元素的外观使其类似标准界面元素。',
    example: '.no-appearance { appearance: none; }'
  }
];

// 滤镜效果
const filterEffects = [
  {
    id: 1,
    title: 'filter属性',
    content: 'blur()、brightness()、contrast()、grayscale()、hue-rotate()、invert()、opacity()、saturate()、sepia()等滤镜函数。',
    example: '.blur { filter: blur(5px); }\n.grayscale { filter: grayscale(100%); }\n.multiple { filter: contrast(175%) brightness(150%); }'
  },
  {
    id: 2,
    title: 'backdrop-filter',
    content: '为元素后面的区域应用滤镜效果，常用于毛玻璃效果。',
    example: '.backdrop-blur { backdrop-filter: blur(10px); }'
  },
  {
    id: 3,
    title: '混合模式',
    content: 'mix-blend-mode和background-blend-mode，设置元素混合模式。',
    example: '.blend { mix-blend-mode: multiply; }\n.bg-blend { background-blend-mode: overlay; }'
  }
];

// 其他新特性
const other = [
  {
    id: 1,
    title: 'CSS变量（自定义属性）',
    content: '使用--前缀定义变量，var()函数使用变量。',
    example: ':root { --main-color: #06c; --padding: 10px; }\n.element { color: var(--main-color); padding: var(--padding); }'
  },
  {
    id: 2,
    title: 'calc()函数',
    content: '在CSS中执行计算，支持加减乘除运算。',
    example: '.calc { width: calc(100% - 20px); height: calc(50vh + 10px); }'
  },
  {
    id: 3,
    title: '媒体查询',
    content: '@media规则，根据设备特性应用不同的样式。',
    example: '@media (max-width: 768px) { .responsive { padding: 10px; } }\n@media (orientation: landscape) { .landscape { display: block; } }'
  },
  {
    id: 4,
    title: 'Flexbox布局',
    content: '一维布局模型，提供更有效的空间分配和对齐方式。',
    example: '.flex-container { display: flex; justify-content: space-between; align-items: center; }'
  },
  {
    id: 5,
    title: 'Grid布局',
    content: '二维布局系统，创建复杂的网格布局。',
    example: '.grid-container { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }'
  },
  {
    id: 6,
    title: 'will-change',
    content: '提示浏览器元素将要发生的变化，用于性能优化。',
    example: '.will-change { will-change: transform, opacity; }'
  },
  {
    id: 7,
    title: 'clip-path',
    content: '创建剪切区域，显示元素的特定部分。',
    example: '.clip { clip-path: circle(50%); }\n.polygon { clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%); }'
  },
  {
    id: 8,
    title: 'mask属性',
    content: '使用图片或渐变作为遮罩，隐藏元素的部分内容。',
    example: '.mask { mask: url(mask.png); }\n.gradient-mask { mask: linear-gradient(black, transparent); }'
  },
  {
    id: 9,
    title: 'shape-outside',
    content: '定义内容围绕的形状，用于实现文字环绕效果。',
    example: '.shape { shape-outside: circle(50%); float: left; }'
  },
  {
    id: 10,
    title: 'scroll-snap',
    content: 'scroll-snap-type、scroll-snap-align等，创建精确的滚动捕捉点。',
    example: '.snap-container { scroll-snap-type: y mandatory; }\n.snap-item { scroll-snap-align: start; }'
  }
];

// 计算每个分类的项目数量
const getCategoryCount = (categoryId: string) => {
  const counts: { [key: string]: number } = {
    'selectors': selectors.length,
    'box-model': boxModel.length,
    'background': backgroundBorder.length,
    'text': textEffects.length,
    'transform': transform.length,
    'animation': animation.length,
    'multicol': multiColumn.length,
    'ui': userInterface.length,
    'filter': filterEffects.length,
    'other': other.length
  };
  return counts[categoryId] || 0;
};
</script>

<style lang="less" scoped>
// 变量定义
@primary-color: #4a6fa5;
@primary-light: #6b8cbc;
@primary-dark: #3a5680;
@text-color: #2c3e50;
@text-light: #7f8c8d;
@border-color: #e1e8ed;
@bg-color: #ffffff;
@sidebar-bg: #f8fafc;
@card-bg: #fdfdfd;
@shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

// 基础样式
.css3-interview-knowledge {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: @text-color;
  background-color: @bg-color;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

// 页面头部
.page-header {
  background: linear-gradient(135deg, @primary-color 0%, @primary-dark 100%);
  color: white;
  padding: 2rem 1rem;
  text-align: center;
  margin-bottom: 2rem;

  .title {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0;
  }
}

// 内容布局
.content-wrapper {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  gap: 2rem;
}

// 导航侧边栏
.nav-sidebar {
  width: 250px;
  flex-shrink: 0;
  position: sticky;
  top: 2rem;
  align-self: flex-start;

  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    background: @sidebar-bg;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: @shadow;

    li {
      padding: 1rem 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:hover {
        background-color: darken(@sidebar-bg, 2%);
        color: @primary-color;
      }

      &.active {
        background-color: white;
        color: @primary-color;
        border-left-color: @primary-color;
        font-weight: 600;
      }

      .count {
        background: @primary-color;
        color: white;
        border-radius: 12px;
        padding: 0.25rem 0.5rem;
        font-size: 0.8rem;
        font-weight: 600;
      }
    }
  }
}

// 主内容区域
.main-content {
  flex: 1;
  max-width: 880px;
}

// 知识点区块
.knowledge-section {
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid @border-color;
    color: @primary-dark;
  }
}

// 知识点列表
.knowledge-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

// 知识点项
.knowledge-item {
  padding: 1.5rem;
  background: @card-bg;
  border-radius: 8px;
  box-shadow: @shadow;
  border-left: 4px solid @primary-color;

  h3 {
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: @primary-color;
  }

  p {
    margin-bottom: 1rem;
    color: @text-color;
  }

  .example {
    margin-top: 1rem;

    strong {
      display: block;
      margin-bottom: 0.5rem;
      color: @text-light;
    }

    pre {
      background: @sidebar-bg;
      border-radius: 4px;
      padding: 1rem;
      overflow-x: auto;
      margin: 0;

      code {
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 0.9rem;
        color: @text-color;
      }
    }
  }
}

// 页脚
.page-footer {
  text-align: center;
  padding: 2rem;
  margin-top: 3rem;
  background: @sidebar-bg;
  color: @text-light;
  font-size: 0.9rem;
}

// 响应式设计
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .nav-sidebar {
    width: 100%;
    position: static;

    .nav-list {
      display: flex;
      overflow-x: auto;

      li {
        flex-shrink: 0;
        border-left: none;
        border-bottom: 3px solid transparent;

        &.active {
          border-left: none;
          border-bottom-color: @primary-color;
        }
      }
    }
  }

  .page-header {
    padding: 1.5rem 1rem;

    .title {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }

  .knowledge-item {
    padding: 1rem;
  }
}
</style>
