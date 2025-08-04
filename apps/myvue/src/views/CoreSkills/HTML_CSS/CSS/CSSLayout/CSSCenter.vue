<template>
  <div class="centering-doc">
    <!-- 头部 -->
    <header class="doc-header">
      <h1 class="title">🎯 CSS 居中基本指南</h1>
    </header>

    <!-- 内容主体 -->
    <main class="doc-content">
      <!-- 水平居中 -->
      <section class="section horizontal">
        <h2 class="section-title">↔️ 水平居中</h2>
        <div class="method-grid">
          <MethodCard title="Flexbox 方案" type="horizontal" :code="flexHorizontalCode"
            :pros="['简单直观', '响应式友好', '无需固定宽度']" :cons="['需要父容器']" />

          <MethodCard title="Margin Auto" type="horizontal" :code="marginHorizontalCode" :pros="['兼容性好', '代码简洁']"
            :cons="['需要固定宽度', '脱离文档流无效']" />
        </div>
      </section>

      <!-- 垂直居中 -->
      <section class="section vertical">
        <h2 class="section-title">↕️ 垂直居中</h2>
        <div class="method-grid">
          <MethodCard title="Flexbox 方案" type="vertical" :code="flexVerticalCode" :pros="['简单可靠', '灵活控制']"
            :cons="['需要父容器高度']" />

          <MethodCard title="Transform" type="vertical" :code="transformVerticalCode" :pros="['不需要父容器高度', '元素尺寸未知时有效']"
            :cons="['可能影响模糊', '需要前缀']" />

          <MethodCard title="align-content: center" type="vertical" :code="alignContentVerticalCode"
            :pros="['css新特性直接生效', '不需要父容器高度', '元素尺寸未知时有效']" :cons="['']" />
          <MethodCard title="vertical-align: middle" type="vertical" :code="verticalAligVerticalCode"
            :pros="['兼容性好', '代码简洁']" :cons="['需要父容器高度', '前提必须是作用在内联元素上']" />
        </div>
      </section>

      <!-- 完全居中 -->
      <section class="section both">
        <h2 class="section-title">⏺️ 完全居中</h2>
        <div class="method-grid">
          <MethodCard title="Flexbox + Grid" type="both" :code="flexGridCode" :pros="['现代方案', '响应式最佳实践']"
            :cons="['兼容性要求']" />

          <MethodCard title="绝对定位" type="both" :code="absoluteCode" :pros="['广泛兼容', '精准控制']"
            :cons="['需要定位上下文', '固定尺寸要求']" />
        </div>
      </section>

      <!-- 对比表格 -->
      <section class="section comparison">
        <h2 class="section-title">📊 方案对比</h2>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>方法</th>
              <th>兼容性</th>
              <th>适用场景</th>
              <th>推荐指数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Flexbox</td>
              <td>IE10+</td>
              <td>现代布局</td>
              <td>★★★★★</td>
            </tr>
            <tr>
              <td>Grid</td>
              <td>IE11+</td>
              <td>复杂布局</td>
              <td>★★★★☆</td>
            </tr>
            <tr>
              <td>Transform</td>
              <td>IE9+</td>
              <td>未知尺寸</td>
              <td>★★★★☆</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>

    <!-- 最佳实践 -->
    <footer class="doc-footer">
      <div class="best-practice">
        <h3>💡 最佳实践建议</h3>
        <div class="tips">
          <div class="tip">优先使用 Flex/Grid 现代布局</div>
          <div class="tip">元素尺寸未知时使用 transform</div>
          <div class="tip">兼容旧浏览器时使用 margin:auto</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import MethodCard from '../../Components/MethodCard.vue'

const flexHorizontalCode = `.parent {
  display: flex;
  justify-content: center;
}`

const marginHorizontalCode = `.child {
  width: 200px;
  margin: 0 auto;
}`

const flexVerticalCode = `.parent {
  display: flex;
  align-items: center;
}`

const transformVerticalCode = `.child {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}`

const alignContentVerticalCode = `.parent {
 align-content: center;
}`

const verticalAligVerticalCode = `.parent {
  vertical-align: middle;
}`

const flexGridCode = `.parent {
  display: grid;
  place-items: center;
}`

const absoluteCode = `.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`
</script>

<style lang="less" scoped>
.centering-doc {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  color: #111827;
}

.doc-header {
  text-align: center;
  margin-bottom: 1rem;
}

.title {
  color: #111827;
  font-size: 2.2rem;
  margin: 1rem 0;
  text-shadow: none;
  font-weight: 700;
}

.doc-content .section {
  margin-bottom: 2rem;
}

.section-title {
  color: #111827;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #e5e7eb;
}

.method-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.comparison-table th,
.comparison-table td {
  padding: 0.8rem 1rem;
  border: 1px solid #e5e7eb;
  text-align: left;
}

.comparison-table th {
  background: #f3f4f6;
  font-weight: 600;
}

.comparison-table tr:nth-child(even) {
  background: #fff;
}

.comparison-table td:last-child {
  color: #f59e0b;
}

.doc-footer {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.best-practice h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.tip {
  padding: 0.8rem 1rem;
  background: #f9fafb;
  border-radius: 6px;
  text-align: center;
  border: 1px solid #e5e7eb;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .centering-doc {
    padding: 1rem;
    margin: 1rem;
  }

  .doc-header .title {
    font-size: 2rem;
  }

  .method-grid,
  .tips {
    grid-template-columns: 1fr !important;
  }
}
</style>
