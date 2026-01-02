<template>
  <div class="css-interview-knowledge">
    <header class="page-header">
      <h1 class="title">CSS面试知识点大全</h1>
      <p class="subtitle">前端开发必备CSS核心知识点整理</p>
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
        <!-- 布局与定位 -->
        <section v-if="activeCategory === 'layout'" class="knowledge-section">
          <h2>布局与定位</h2>
          <div class="knowledge-list">
            <div v-for="item in layoutPositioning" :key="item.id" class="knowledge-item">
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
          <h2>盒模型</h2>
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

        <!-- 选择器与优先级 -->
        <section v-if="activeCategory === 'selectors'" class="knowledge-section">
          <h2>选择器与优先级</h2>
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

        <!-- Flex布局 -->
        <section v-if="activeCategory === 'flex'" class="knowledge-section">
          <h2>Flex布局</h2>
          <div class="knowledge-list">
            <div v-for="item in flexLayout" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- Grid布局 -->
        <section v-if="activeCategory === 'grid'" class="knowledge-section">
          <h2>Grid布局</h2>
          <div class="knowledge-list">
            <div v-for="item in gridLayout" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 动画与过渡 -->
        <section v-if="activeCategory === 'animation'" class="knowledge-section">
          <h2>动画与过渡</h2>
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

        <!-- 响应式设计 -->
        <section v-if="activeCategory === 'responsive'" class="knowledge-section">
          <h2>响应式设计</h2>
          <div class="knowledge-list">
            <div v-for="item in responsive" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 性能优化 -->
        <section v-if="activeCategory === 'performance'" class="knowledge-section">
          <h2>性能优化</h2>
          <div class="knowledge-list">
            <div v-for="item in performance" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 其他重要知识点 -->
        <section v-if="activeCategory === 'other'" class="knowledge-section">
          <h2>其他重要知识点</h2>
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
      <p>CSS知识点总结 - 持续更新</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 响应式数据
const activeCategory = ref('layout');

// 分类数据
const categories = [
  { id: 'layout', name: '布局与定位' },
  { id: 'box-model', name: '盒模型' },
  { id: 'selectors', name: '选择器与优先级' },
  { id: 'flex', name: 'Flex布局' },
  { id: 'grid', name: 'Grid布局' },
  { id: 'animation', name: '动画与过渡' },
  { id: 'responsive', name: '响应式设计' },
  { id: 'performance', name: '性能优化' },
  { id: 'other', name: '其他重要知识点' }
];

// 布局与定位
const layoutPositioning = [
  {
    id: 1,
    title: 'position属性',
    content: 'static | relative | absolute | fixed | sticky，控制元素定位方式。',
    example: '.box { position: absolute; top: 10px; left: 20px; }'
  },
  {
    id: 2,
    title: '浮动与清除浮动',
    content: 'float使元素脱离文档流，clear清除浮动影响。',
    example: '.float-left { float: left; }\n.clearfix::after { content: ""; display: table; clear: both; }'
  },
  {
    id: 3,
    title: 'display属性',
    content: 'block | inline | inline-block | none | flex | grid，控制元素显示类型。',
    example: '.inline-block { display: inline-block; }'
  },
  {
    id: 4,
    title: 'BFC（块级格式化上下文）',
    content: '独立的渲染区域，内部元素不会影响外部元素。',
    example: '.bfc { overflow: hidden; }'
  },
  {
    id: 5,
    title: '垂直居中方案',
    content: '多种实现垂直居中的方法，如flex、grid、transform等。',
    example: '.center { display: flex; align-items: center; justify-content: center; }'
  },
  {
    id: 6,
    title: '水平居中方案',
    content: 'margin: auto、text-align、flex、grid等实现水平居中。',
    example: '.horizontal-center { margin: 0 auto; }'
  },
  {
    id: 7,
    title: '圣杯布局与双飞翼布局',
    content: '传统三栏布局解决方案，中间内容优先渲染。'
  },
  {
    id: 8,
    title: 'z-index与层叠上下文',
    content: '控制元素层叠顺序，z-index只在定位元素和flex/grid子元素中生效。',
    example: '.modal { position: fixed; z-index: 1000; }'
  },
  {
    id: 9,
    title: 'sticky定位',
    content: 'relative和fixed的结合，在阈值范围内相对定位，超出后固定定位。',
    example: '.sticky { position: sticky; top: 0; }'
  },
  {
    id: 10,
    title: '多列布局',
    content: 'column-count、column-gap、column-rule实现多列文本布局。',
    example: '.multi-column { column-count: 3; column-gap: 20px; }'
  }
];

// 盒模型
const boxModel = [
  {
    id: 1,
    title: '标准盒模型 vs IE盒模型',
    content: '标准盒模型：width/height = content；IE盒模型：width/height = content + padding + border。',
    example: '.standard { box-sizing: content-box; }\n.ie { box-sizing: border-box; }'
  },
  {
    id: 2,
    title: 'margin折叠',
    content: '相邻块级元素的垂直margin会合并，取较大值。',
    example: '/* 两个相邻div的margin-top:20px和margin-bottom:30px会合并为30px */'
  },
  {
    id: 3,
    title: 'margin负值',
    content: '负margin可以用于元素重叠、布局调整等场景。',
    example: '.overlap { margin-left: -10px; }'
  },
  {
    id: 4,
    title: 'padding vs margin',
    content: 'padding在边框内，影响元素内容区域；margin在边框外，影响元素外部空间。'
  },
  {
    id: 5,
    title: 'border-radius',
    content: '设置元素边框圆角，可以设置四个角的不同值。',
    example: '.rounded { border-radius: 10px; }\n.ellipse { border-radius: 50%; }'
  },
  {
    id: 6,
    title: 'box-shadow',
    content: '为元素添加阴影效果，支持内阴影和外阴影。',
    example: '.shadow { box-shadow: 2px 2px 10px rgba(0,0,0,0.3); }'
  },
  {
    id: 7,
    title: 'outline',
    content: '在border外绘制轮廓，不占用空间，不影响布局。',
    example: '.outline { outline: 2px solid red; }'
  },
  {
    id: 8,
    title: 'overflow属性',
    content: 'visible | hidden | scroll | auto，控制内容溢出时的处理方式。',
    example: '.scrollable { overflow: auto; }'
  }
];

// 选择器与优先级
const selectors = [
  {
    id: 1,
    title: 'CSS选择器类型',
    content: '元素选择器、类选择器、ID选择器、属性选择器、伪类选择器、伪元素选择器等。',
    example: 'div, .class, #id, [type="text"], :hover, ::before'
  },
  {
    id: 2,
    title: '选择器优先级',
    content: '!important > 内联样式 > ID选择器 > 类/属性/伪类选择器 > 元素/伪元素选择器。',
    example: '优先级计算：(0,0,0,0) -> (行内,ID,类,元素)'
  },
  {
    id: 3,
    title: '!important规则',
    content: '最高优先级，但应谨慎使用，避免样式难以维护。',
    example: '.important { color: red !important; }'
  },
  {
    id: 4,
    title: '继承属性',
    content: 'font、color、text-align等属性会继承，margin、padding、border等不会继承。'
  },
  {
    id: 5,
    title: '属性选择器',
    content: '[attr]、[attr=value]、[attr^=value]、[attr$=value]、[attr*=value]等。',
    example: 'a[href^="https"] { color: green; }'
  },
  {
    id: 6,
    title: '结构伪类选择器',
    content: ':first-child、:last-child、:nth-child()、:nth-of-type()等。',
    example: 'li:nth-child(odd) { background: #f0f0f0; }'
  },
  {
    id: 7,
    title: '状态伪类选择器',
    content: ':hover、:active、:focus、:visited、:checked等。',
    example: 'button:hover { background: blue; }'
  },
  {
    id: 8,
    title: '伪元素',
    content: '::before、::after、::first-letter、::first-line等。',
    example: 'p::first-letter { font-size: 2em; }'
  },
  {
    id: 9,
    title: '组合选择器',
    content: '后代选择器(空格)、子选择器(>)、相邻兄弟选择器(+)、通用兄弟选择器(~)。',
    example: 'div p { }  /* 后代 */\ndiv > p { }  /* 子元素 */\ndiv + p { }  /* 相邻兄弟 */'
  }
];

// Flex布局
const flexLayout = [
  {
    id: 1,
    title: 'flex容器属性',
    content: 'display: flex | inline-flex，定义flex容器。',
    example: '.container { display: flex; }'
  },
  {
    id: 2,
    title: 'flex-direction',
    content: 'row | row-reverse | column | column-reverse，定义主轴方向。',
    example: '.container { flex-direction: row; }'
  },
  {
    id: 3,
    title: 'justify-content',
    content: 'flex-start | flex-end | center | space-between | space-around | space-evenly，主轴对齐。',
    example: '.container { justify-content: space-between; }'
  },
  {
    id: 4,
    title: 'align-items',
    content: 'stretch | flex-start | flex-end | center | baseline，交叉轴对齐。',
    example: '.container { align-items: center; }'
  },
  {
    id: 5,
    title: 'flex-wrap',
    content: 'nowrap | wrap | wrap-reverse，是否换行。',
    example: '.container { flex-wrap: wrap; }'
  },
  {
    id: 6,
    title: 'align-content',
    content: '多行内容在交叉轴上的对齐方式。',
    example: '.container { align-content: space-around; }'
  },
  {
    id: 7,
    title: 'flex子项属性',
    content: 'order、flex-grow、flex-shrink、flex-basis、align-self。',
    example: '.item { flex: 1; }  /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */'
  },
  {
    id: 8,
    title: 'flex-grow',
    content: '定义项目的放大比例，默认为0（不放大）。',
    example: '.item { flex-grow: 1; }'
  },
  {
    id: 9,
    title: 'flex-shrink',
    content: '定义项目的缩小比例，默认为1（空间不足时缩小）。',
    example: '.item { flex-shrink: 0; }  /* 不缩小 */'
  },
  {
    id: 10,
    title: 'flex-basis',
    content: '定义在分配多余空间之前，项目占据的主轴空间。',
    example: '.item { flex-basis: 200px; }'
  }
];

// Grid布局
const gridLayout = [
  {
    id: 1,
    title: 'grid容器属性',
    content: 'display: grid | inline-grid，定义grid容器。',
    example: '.container { display: grid; }'
  },
  {
    id: 2,
    title: 'grid-template-columns/rows',
    content: '定义网格的列和行大小。',
    example: '.container { grid-template-columns: 100px 1fr 2fr; }'
  },
  {
    id: 3,
    title: 'grid-template-areas',
    content: '通过命名网格区域来定义布局。',
    example: '.container { grid-template-areas: "header header" "sidebar content"; }'
  },
  {
    id: 4,
    title: 'grid-gap',
    content: 'grid-row-gap和grid-column-gap的简写，定义网格间距。',
    example: '.container { gap: 20px; }'
  },
  {
    id: 5,
    title: 'justify-items / align-items',
    content: '网格项在单元格内的对齐方式。',
    example: '.container { justify-items: center; align-items: center; }'
  },
  {
    id: 6,
    title: 'justify-content / align-content',
    content: '整个网格在容器内的对齐方式。',
    example: '.container { justify-content: space-between; }'
  },
  {
    id: 7,
    title: 'grid-auto-flow',
    content: 'row | column | row dense | column dense，自动放置算法。',
    example: '.container { grid-auto-flow: row dense; }'
  },
  {
    id: 8,
    title: 'grid子项属性',
    content: 'grid-column、grid-row、grid-area等。',
    example: '.item { grid-column: 1 / 3; grid-row: 1; }'
  },
  {
    id: 9,
    title: 'grid-column / grid-row',
    content: '定义项目在网格中的位置。',
    example: '.item { grid-column: span 2; grid-row: 2 / 4; }'
  },
  {
    id: 10,
    title: 'grid-area',
    content: '指定项目在哪个网格区域，或定义项目位置。',
    example: '.item { grid-area: header; }'
  }
];

// 动画与过渡
const animation = [
  {
    id: 1,
    title: 'transition过渡',
    content: '属性变化时的平滑过渡效果。',
    example: '.box { transition: all 0.3s ease-in-out; }'
  },
  {
    id: 2,
    title: 'transition属性',
    content: 'transition-property、transition-duration、transition-timing-function、transition-delay。',
    example: '.box { transition: opacity 0.3s ease 0.1s; }'
  },
  {
    id: 3,
    title: '@keyframes规则',
    content: '定义动画序列。',
    example: '@keyframes slidein { from { transform: translateX(-100%); } to { transform: translateX(0); } }'
  },
  {
    id: 4,
    title: 'animation属性',
    content: 'animation-name、animation-duration、animation-timing-function、animation-delay、animation-iteration-count、animation-direction、animation-fill-mode、animation-play-state。',
    example: '.box { animation: slidein 1s ease-in-out infinite alternate; }'
  },
  {
    id: 5,
    title: 'transform变换',
    content: 'translate、rotate、scale、skew等2D/3D变换。',
    example: '.box { transform: translate(50px, 100px) rotate(45deg); }'
  },
  {
    id: 6,
    title: 'transform-origin',
    content: '设置变换的原点。',
    example: '.box { transform-origin: center bottom; }'
  },
  {
    id: 7,
    title: 'will-change',
    content: '提示浏览器元素将要发生的变化，用于性能优化。',
    example: '.box { will-change: transform; }'
  }
];

// 响应式设计
const responsive = [
  {
    id: 1,
    title: '媒体查询',
    content: '@media规则，根据设备特性应用不同的样式。',
    example: '@media (max-width: 768px) { .container { padding: 10px; } }'
  },
  {
    id: 2,
    title: '视口单位',
    content: 'vw、vh、vmin、vmax，相对于视口尺寸的单位。',
    example: '.full-screen { width: 100vw; height: 100vh; }'
  },
  {
    id: 3,
    title: 'rem单位',
    content: '相对于根元素(html)字体大小的单位。',
    example: 'html { font-size: 16px; }\n.box { width: 10rem; }  /* 160px */'
  },
  {
    id: 4,
    title: '移动端适配',
    content: 'viewport meta标签、rem布局、flexible方案等。',
    example: '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
  },
  {
    id: 5,
    title: '响应式图片',
    content: 'srcset、sizes属性，picture元素。',
    example: '<img srcset="small.jpg 500w, large.jpg 1000w" sizes="(max-width: 600px) 500px, 1000px">'
  },
  {
    id: 6,
    title: 'CSS变量',
    content: '自定义属性，可在媒体查询中修改实现响应式。',
    example: ':root { --main-color: blue; }\n@media (max-width: 768px) { :root { --main-color: red; } }'
  }
];

// 性能优化
const performance = [
  {
    id: 1,
    title: 'CSS选择器性能',
    content: '避免过度具体的选择器，减少嵌套深度。',
    example: '/* 不好 */ div nav ul li a { }\n/* 更好 */ .nav-link { }'
  },
  {
    id: 2,
    title: '重排与重绘',
    content: '重排影响布局，重绘只影响外观，应尽量减少重排。',
    example: '/* 触发重排 */ element.style.width = "100px";\n/* 触发重绘 */ element.style.color = "red";'
  },
  {
    id: 3,
    title: '硬件加速',
    content: '使用transform和opacity触发GPU加速。',
    example: '.animate { transform: translateZ(0); }'
  },
  {
    id: 4,
    title: 'CSS精灵图',
    content: '将多个小图标合并为一张大图，减少HTTP请求。',
    example: '.icon { background: url(sprite.png) no-repeat; background-position: -10px -20px; }'
  },
  {
    id: 5,
    title: 'CSS压缩',
    content: '移除空白、注释，缩短属性名等减少文件大小。'
  },
  {
    id: 6,
    title: '关键CSS',
    content: '提取首屏所需CSS内联加载，提高首屏渲染速度。'
  },
  {
    id: 7,
    title: 'CSS加载优化',
    content: '避免@import，使用link标签，媒体查询异步加载等。',
    example: '<link rel="stylesheet" href="print.css" media="print">'
  }
];

// 其他重要知识点
const other = [
  {
    id: 1,
    title: 'CSS Reset vs Normalize.css',
    content: 'Reset重置所有默认样式，Normalize保留有用的默认样式并修复浏览器差异。'
  },
  {
    id: 2,
    title: '字体图标',
    content: '使用字体文件包含图标，如Font Awesome、Material Icons等。',
    example: '<i class="fas fa-user"></i>'
  },
  {
    id: 3,
    title: 'CSS预处理器',
    content: 'Sass、Less、Stylus，提供变量、嵌套、混合等功能。',
    example: '// Sass\n$primary-color: #333;\n.button { background: $primary-color; }'
  },
  {
    id: 4,
    title: 'CSS后处理器',
    content: 'PostCSS，使用插件转换CSS，如autoprefixer。',
    example: '/* 输入 */ .box { display: flex; }\n/* 输出 */ .box { display: -webkit-box; display: -ms-flexbox; display: flex; }'
  },
  {
    id: 5,
    title: 'CSS模块化',
    content: 'CSS Modules、Styled Components、CSS-in-JS等解决方案。'
  },
  {
    id: 6,
    title: 'CSS自定义属性',
    content: '变量功能，可在JavaScript中动态修改。',
    example: ':root { --theme-color: blue; }\n.element { color: var(--theme-color); }'
  },
  {
    id: 7,
    title: 'CSS函数',
    content: 'calc()、min()、max()、clamp()等数学函数。',
    example: '.responsive { width: calc(100% - 20px); }'
  },
  {
    id: 8,
    title: '滤镜效果',
    content: 'filter属性，模糊、亮度、对比度等效果。',
    example: '.blur { filter: blur(5px); }\n.grayscale { filter: grayscale(100%); }'
  },
  {
    id: 9,
    title: '混合模式',
    content: 'background-blend-mode和mix-blend-mode，图层混合效果。',
    example: '.blend { mix-blend-mode: multiply; }'
  },
  {
    id: 10,
    title: 'CSS Houdini',
    content: 'CSS引擎API，允许开发者扩展CSS功能。'
  }
];

// 计算每个分类的项目数量
const getCategoryCount = (categoryId: string) => {
  const counts: { [key: string]: number } = {
    'layout': layoutPositioning.length,
    'box-model': boxModel.length,
    'selectors': selectors.length,
    'flex': flexLayout.length,
    'grid': gridLayout.length,
    'animation': animation.length,
    'responsive': responsive.length,
    'performance': performance.length,
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
.css-interview-knowledge {
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
