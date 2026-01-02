<template>
  <div class="processor-guide">
    <h1 class="main-title">🛠 CSS 处理器基本指南</h1>

    <!-- 导航 -->
    <nav class="nav-container">
      <button v-for="tab in tabs" :key="tab" :class="{ active: activeTab === tab }" @click="activeTab = tab">
        {{ tab }}
      </button>
    </nav>

    <!-- 预处理器介绍 -->
    <section class="intro-section" v-show="activeTab === '预处理器'">
      <h2 class="section-title">🎯 什么是CSS预处理器？</h2>
      <div class="content-card">
        <p class="desc-text">CSS预处理器通过添加变量、嵌套规则、混合宏等功能，扩展了CSS的编程能力。主要解决以下问题：</p>
        <ul class="feature-list">
          <li>样式代码复用困难</li>
          <li>缺乏逻辑处理能力</li>
          <li>维护大型项目困难</li>
          <li>代码组织结构混乱</li>
        </ul>
      </div>
    </section>

    <!-- 后处理器介绍 -->
    <section class="intro-section" v-show="activeTab === '后处理器'">
      <h2 class="section-title">🎯 什么是CSS后处理器？</h2>
      <div class="content-card">
        <p class="desc-text">CSS后处理器通过添加变量、嵌套规则、混合宏等功能，扩展了CSS的编程能力。主要解决以下问题：</p>
        <ul class="feature-list">
          <li>优化和增强CSS</li>
          <li>基于AST转换</li>
          <li>自动添加浏览器前缀</li>
          <li>代码压缩和优化</li>
        </ul>
      </div>
    </section>

    <!-- 预处理器 -->
    <section v-show="activeTab === '预处理器'" class="processor-section">
      <ProcessorCard title="Sass" logo="S" href="https://www.sass.hk/docs/index.html" type="pre"
        :features="['变量', '嵌套', 'Mixin', '模块化']" :pros="['功能最强大', '社区生态完善', '支持条件语句']" :cons="['需要编译步骤', '学习曲线较陡']"
        scene="大型项目、复杂样式系统" />

      <ProcessorCard title="Less" logo="L" href="https://less.bootcss.com/" type="pre" :features="['变量', '嵌套', '运算']"
        :pros="['浏览器直接使用', '语法接近CSS']" :cons="['功能相对较少', '维护活跃度下降']" scene="快速原型开发、Bootstrap项目" />

      <ProcessorCard title="Stylus" href="https://www.stylus-lang.cn/" logo="S" type="pre"
        :features="['可选语法', '内置函数', '透明Mixins']" :pros="['高度灵活性', '简洁的语法']" :cons="['社区较小', '文档较少']"
        scene="Node.js项目、追求简洁语法" />
    </section>



    <!-- 后处理器 -->
    <section v-show="activeTab === '后处理器'" class="processor-section">
      <ProcessorCard title="PostCSS" logo="P" type="post" :features="['插件系统', '自动前缀', '未来语法']"
        :pros="['高度可扩展', '与现代工具链集成']" :cons="['配置较复杂', '插件质量参差']" scene="现代化工作流、定制处理需求" />

      <ProcessorCard title="Autoprefixer" logo="A" type="post" :features="['自动前缀', '基于规则']" :pros="['零配置使用', '保持代码简洁']"
        :cons="['依赖浏览器列表']" scene="跨浏览器兼容处理" />

      <ProcessorCard title="CSSnano" logo="C" type="post" :features="['代码压缩', '优化合并']" :pros="['显著减小体积', '安全优化']"
        :cons="['高级优化需配置']" scene="生产环境代码优化" />
    </section>

    <!-- 对比总结 -->
    <div class="comparison">
      <h2>🔍 核心差异总结</h2>
      <div class="comparison-grid">
        <div class="pre-processor">
          <h3>预处理器</h3>
          <ul>
            <li>扩展CSS语法功能</li>
            <li>开发阶段使用</li>
            <li>需要编译为CSS</li>
          </ul>
        </div>
        <div class="post-processor">
          <h3>后处理器</h3>
          <ul>
            <li>处理已生成的CSS</li>
            <li>优化和增强CSS</li>
            <li>基于AST转换</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProcessorCard from '../Components/ProcessorCard.vue'

const tabs = ref(['预处理器', '后处理器'])
const activeTab = ref('预处理器')
</script>

<style lang="less" scoped>
.processor-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui;
}

.main-title {
  text-align: center;
  color: #fff;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #667eea, #4ecdc4);
  /* -webkit-background-clip: text; */
  -webkit-text-fill-color: #fff;
}

.nav-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.nav-container button {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 8px;
  background: #f0f4ff;
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-container button.active {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.processor-section {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.comparison {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  margin-top: 3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1.5rem;
}

.pre-processor h3 {
  color: #667eea;
}

.post-processor h3 {
  color: #4ecdc4;
}

ul {
  padding-left: 1.5rem;
  color: #666;
}
</style>
