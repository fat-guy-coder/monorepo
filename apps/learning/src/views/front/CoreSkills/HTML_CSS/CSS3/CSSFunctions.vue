<template>
  <div class="css-functions-guide">
    <h1 class="main-title">🎨 CSS 函数基本指南</h1>

    <NavBar :list="allData" show-child @click="activeCategoryToAll" />

    <!-- 函数分类导航 -->
    <nav class="function-nav">
      <button v-for="category in categories" :key="category.name"
        :class="{ active: activeCategory.type === category.type }" @click="activeCategory = category">
        {{ category.name }}
      </button>
    </nav>

    <!-- 常用函数 -->
    <section v-show="activeCategory.type === 'common'" class="function-section">
      <FunctionCard title="var()" description="定义css变量,插入自定义的属性值" syntax="var(--custom-property, fallback)"
        example="root: {--primary-color: #333;} body: {--primary-color: #333;} 定义:var(--primary-color, #333); 使用:color: var(--primary-color, #333); "
        :scenes="['主题切换', '统一样式管理']" :pros="['提高可维护性', '支持动态修改']" :cons="['旧浏览器不支持']" color-type="other">
      </FunctionCard>
      <FunctionCard title="calc()" syntax="calc(expression)" description="允许计算 CSS 的属性值，比如动态计算长度值"
        example="width: calc(100% - 60px);" :scenes="['响应式布局', '动态尺寸计算']" :pros="['混合单位计算', '实时响应变化']"
        :cons="['嵌套计算可读性差']" color-type="math">
      </FunctionCard>

      <FunctionCard title="attr()" syntax="attr(attribute-name)" description="获取元素的属性值"
        example="width: attr(width); width: attr(width, number);" :scenes="['获取元素的属性值', '动态设置元素的属性值']"
        :pros="['获取元素的属性值', '动态设置元素的属性值']" :cons="['不支持旧浏览器']" color-type="other">
      </FunctionCard>

      <FunctionCard title="max()" syntax="max(value1, value2, ...)" description="一个逗号分隔的表达式列表中选择最大的值作为属性的值"
        example="width: max(100px, 10%);" :scenes="['限制最小宽度', '响应式设计']" :pros="['简化条件判断', '提高可读性']" :cons="['不支持旧浏览器']"
        color-type="math">
      </FunctionCard>

      <FunctionCard title="min()" description="一个逗号分隔的表达式列表中选择最小的值作为属性的值" syntax="min(value1, value2, ...)"
        example="width: min(50%, 300px);" :scenes="['限制最大宽度', '响应式设计']" :pros="['简化条件判断', '提高可读性']" :cons="['不支持旧浏览器']"
        color-type="math">
      </FunctionCard>

      <FunctionCard title="minmax()" description="定义了一个长宽范围的闭区间，它与CSS 网格布局一起使用" syntax="minmax(min, max)"
        example="grid-template-columns: minmax(200px, 1fr); grid-template-rows: minmax(100px, 1fr);"
        :scenes="['自适应布局', '限制尺寸范围']" :pros="['简化响应式设计', '避免过小或过大的尺寸']" :cons="['不支持旧浏览器']" color-type="math">
      </FunctionCard>

    </section>

    <!-- 数学函数 -->
    <section v-show="activeCategory.type === 'math'" class="function-section">
      <FunctionCard title="calc()" syntax="calc(expression)" description="允许计算 CSS 的属性值，比如动态计算长度值"
        example="width: calc(100% - 60px);" :scenes="['响应式布局', '动态尺寸计算']" :pros="['混合单位计算', '实时响应变化']"
        :cons="['嵌套计算可读性差']" color-type="math">
      </FunctionCard>
      <FunctionCard title="min()" description="一个逗号分隔的表达式列表中选择最小的值作为属性的值" syntax="min(value1, value2, ...)"
        example="width: min(50%, 300px);" :scenes="['限制最大宽度', '响应式设计']" :pros="['简化条件判断', '提高可读性']" :cons="['不支持旧浏览器']"
        color-type="math">
      </FunctionCard>
      <FunctionCard title="max()" syntax="max(value1, value2, ...)" example="width: max(100px, 10%);"
        description="一个逗号分隔的表达式列表中选择最大的值作为属性的值" :scenes="['限制最小宽度', '响应式设计']" :pros="['简化条件判断', '提高可读性']"
        :cons="['不支持旧浏览器']" color-type="math">
      </FunctionCard>

      <FunctionCard title="minmax()" syntax="minmax(200px, 1fr)" example="grid-template-columns:minmax(200px, 1fr);"
        description="定义了一个长宽范围的闭区间，它与CSS 网格布局一起使用" :scenes="['限制最小最大宽度', '响应式设计']" :pros="['简化条件判断', '提高可读性']"
        :cons="['不支持旧浏览器']" color-type="math">
      </FunctionCard>

      <FunctionCard title="clamp()夹紧" syntax="clamp(min, preferred, max)"
        description="把一个值限制在一个上限和下限之间，当这个值超过最小值和最大值的范围时，在最小值和最大值之间选择一个值使用" example="font-size:
clamp(16px, 1vw + 1rem, 32px);
浏览器首先会尝试使用1vw + 1rem这个计算出来的值作为字体大小
如果这个值小于 16px，就会使用 16px
如果这个值大于 32px，就会使用 32px" :scenes="['自适应布局', '限制尺寸范围']" :pros="['简化响应式设计', '避免过小或过大的尺寸']" :cons="['不支持旧浏览器']"
        color-type="math">
      </FunctionCard>
      <FunctionCard title="cubic-bezier" description="定义动画曲线，和过渡曲线" syntax="cubic-bezier(0.1, 0.7, 1.0, 0.1)"
        example="cubic-bezier(0.1, 0.7, 1.0, 0.1);" :scenes="['定义动画曲线，和过渡曲线']" color-type="other">

      </FunctionCard>
    </section>


    <!-- 颜色函数 -->
    <section v-show="activeCategory.type === 'color'" class="function-section">
      <FunctionCard title="rgb()/rgba()" syntax="rgb(red, green, blue) / rgba(red, green, blue, alpha)"
        example="background: rgba(255, 0, 120, 0.8);" :scenes="['半透明背景', '颜色叠加效果']" :pros="['直观的颜色控制', '良好的浏览器支持']"
        :cons="['不易进行颜色调整', '不够语义化']" color-type="color">
        <div class="color-demo rgb-demo"></div>
      </FunctionCard>

      <FunctionCard title="hsl()/hsla()" syntax="hsl(hue, saturation%, lightness%)"
        example="color: hsl(200, 100%, 50%);" :scenes="['动态主题色', '颜色渐变过渡']" :pros="['直观的颜色调节', '便于生成颜色变体']"
        :cons="['旧浏览器支持有限']" color-type="color">
        <div class="color-demo hsl-demo"></div>
      </FunctionCard>
    </section>

    <!-- light-dark函数 -->
    <section v-show="activeCategory.type === 'light-dark'" class="function-section">
      <FunctionCard title="light-dark()" syntax="light-dark(light-color, dark-color)" description="用于变更主题色"
        example="body { background-color: light-dark(red, blue); }" :scenes="['深色模式', '颜色调整']"
        :pros="['自动适应系统设置', '统一样式管理', '切换类名dark-mode和light-mode即可实现主题切换']" :cons="['不支持旧浏览器']" color-type="other">
        <div class="color-demo light-dark-demo"></div>
      </FunctionCard>
    </section>

    <!-- 渐变函数 -->
    <section v-show="activeCategory.type === 'gradient'" class="function-section">
      <FunctionCard title="linear-gradient(),radial-gradient(),conic-gradient()"
        syntax="linear-gradient(direction, color-stop1, color-stop2,...)"
        example="background: linear-gradient(45deg, #ff6b6b, #4ecdc4);" :scenes="['背景装饰', '按钮效果', '图像遮罩']"
        :pros="['创建平滑过渡', '支持多颜色节点']" :cons="['复杂渐变性能消耗']" color-type="gradient">
        <div class="gradient-demo linear"></div>
      </FunctionCard>
    </section>

    <!-- 贝塞尔曲线函数 -->
    <section class="cubic-bezier-section" v-if="activeCategory.type === 'math'">
      <h3>贝塞尔曲线函数</h3>
      <h4>摘自<a href="https://www.runoob.com/cssref/func-cubic-bezier.html" target="_blank">菜鸟教程</a></h4>
      <h4>cubic-bezier() 函数定义了一个贝塞尔曲线(Cubic Bezier)。
        贝塞尔曲线曲线由四个点 P0，P1，P2 和 P3 定义。P0 和 P3 是曲线的起点和终点。P0是（0,0）并且表示初始时间和初始状态，P3是（1,1）并且表示最终时间和最终状态</h4>
      <p><img src="@/assets/image/css/cubic-bezier-01.png" alt="加载失败" loading="lazy"></p>
      <p><img src="@/assets/image/css/cubic-bezier-02.jpg" alt="加载失败" loading="lazy"></p>
      <pre><code>
P0：默认值 (0, 0)
P1：动态取值 (x1, y1)
P2：动态取值 (x2, y2)
P3：默认值 (1, 1)
      </code></pre>
    </section>

    <section v-show="activeCategory.type === 'all'" class="all-function-section">
      <div v-for="item in allData" :key="item.name" class="function-item" :id="item.id">
        <h3>{{ item.name }}</h3>
        <div v-for="child in item.children" :key="child.name" :id="child.id">
          <h4>{{ item.type }}-{{ child.title }}</h4>
          <p>{{ child.des }}</p>
          <pre class="code-box"><code>{{ child.code }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 使用建议 -->
    <div class="recommendation">
      <h2>💡 最佳实践建议</h2>
      <ul>
        <li>优先使用现代函数如 calc() 实现响应式布局</li>
        <li>复杂颜色操作使用 hsl() 更易维护</li>
        <li>重复值使用 CSS 变量配合 var()</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import FunctionCard from '../Components/FunctionCard.vue'
import NavBar from 'components/Nav/ScrollNav.vue'

interface Category {
  name: string
  type: string
}

const categories = ref<Category[]>([{
  name: '常用函数',
  type: 'common'
}, {
  name: '数学函数',
  type: 'math'
}, {
  name: '颜色函数',
  type: 'color'
}, {
  name: 'light-dark函数',
  type: 'light-dark'
}, {
  name: '渐变函数',
  type: 'gradient'
},
{
  name: '全部',
  type: 'all'
}
])
const activeCategory = ref<Category>(categories.value[0])

interface Data {
  id: string
  name: string
  type: string
  children: {
    title: string
    name: string
    des: string
    code: string
    id: string
  }[]
}
const allData = ref<Data[]>([])

const activeCategoryToAll = () => {
  activeCategory.value = categories.value.find(item => item.type === 'all') as { name: string; type: string }
}

onBeforeMount(async () => {
  const { default: data } = await import('../JSON/CssFunction.json')
  allData.value = data as Data[]
})
</script>

<style scoped>
.css-functions-guide {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  background-color: #f9fafb;
  color: #111827;
}

.main-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.2rem;
  font-weight: 700;
  background: none;
  -webkit-text-fill-color: inherit;
  color: #111827;
}

.function-nav {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  justify-content: center;
}

.function-nav button {
  padding: 0.6rem 1.2rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}

.function-nav button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
  transform: none;
}

.function-nav button:hover:not(.active) {
  background-color: #f3f4f6;
}

.function-section {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.color-demo {
  width: 100%;
  height: 120px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.rgb-demo {
  background: rgba(255, 0, 120, 0.8);
}

.hsl-demo {
  background: hsl(200, 100%, 50%);
}

.gradient-demo {
  height: 120px;
  border-radius: 8px;
}

.linear {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}

.recommendation {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
  border: 1px solid #e5e7eb;
}

.recommendation h2 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.recommendation ul {
  padding-left: 1.2rem;
  margin: 0;
}

.cubic-bezier-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.cubic-bezier-section h3,
.cubic-bezier-section h4 {
  margin-bottom: 0.8rem;
}

.cubic-bezier-section img {
  max-width: 100%;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.all-function-section {
  box-shadow: none;
  padding: 0;
  border-radius: 0;
}

.function-item {
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
  background-color: #fff;
}

.function-item h3 {
  font-size: 1.2rem;
  font-weight: 600;
}

.function-item h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #4b5563;
}

.code-box {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
  color: #1f2937;
}

.code-box code {
  color: #1f2937;
}
</style>
