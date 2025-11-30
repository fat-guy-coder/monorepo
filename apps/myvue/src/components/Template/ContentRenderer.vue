<template>
  <div class="content-renderer">
    <p v-if="item.description" class="tip-desc">{{ item.description }}</p>

    <!-- 学习计划 -->
    <div v-if="item.type === 'plan' && Array.isArray(item.data)" class="plan-list">
      <div v-for="plan in item.data" :key="plan.id" :id="plan.id" class="plan-item">
        <span class="plan-time">{{ plan.time }}</span>
        <div class="plan-content">
          <div class="plan-name">{{ plan.name }}</div>
          <div class="plan-desc">{{ plan.desc }}</div>
        </div>
      </div>
    </div>

    <!-- 要点列表 (bullet list) -->
    <ul v-if="item.type === 'list' && Array.isArray(item.data)" class="bullet-list">
      <li v-for="(line, i) in item.data" :key="i">{{ line }}</li>
    </ul>

    <!-- 代码示例 -->
    <Code v-if="item.type === 'code' && typeof item.data === 'string'" :code="item.data" language="ts" :hidden-toolbar="false" />

    <!-- 待办清单 -->
    <div v-if="item.type === 'todo' && Array.isArray(item.data)" class="todo-list">
      <label v-for="todo in item.data" :key="todo.id" :id="todo.id" class="todo-item">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
      </label>
    </div>

    <!-- 相关链接 -->
    <nav v-if="item.type === 'links' && Array.isArray(item.data)" class="link-list">
      <Link v-for="link in item.data" :key="link.id" :id="link.id" :href="link.href" :text="link.label" size="small" />
    </nav>

    <!-- 快速导航 (tags) -->
    <div v-if="item.type === 'tags' && Array.isArray(item.data)" class="chip-list">
      <Link v-for="tag in item.data" :key="tag.id" :id="tag.id" :href="tag.href" :text="tag.label" size="small" />
    </div>

    <!-- 学习进度 -->
    <div v-if="item.type === 'progress' && Array.isArray(item.data)" class="progress-list">
      <div v-for="p in item.data" :key="p.id" :id="p.id" class="progress-item">
        <div class="progress-meta">
          <span class="name">{{ p.label }}</span>
          <span class="val">{{ p.value }}%</span>
        </div>
        <div class="progress">
          <div class="bar" :style="{ '--val': p.value + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- 温馨提示 -->
    <ul v-if="item.type === 'tips' && Array.isArray(item.data)" class="tip-list">
      <li v-for="tip in item.data" :key="tip.id" :id="tip.id">{{ tip.text }}</li>
    </ul>

    <!-- 瀑布流要点列表 -->
    <div v-if="item.type === 'points' && Array.isArray(item.data)" class="waterfall-points-grid">
      <div v-for="point in item.data" :key="point.id" :id="point.id" class="waterfall-point-card">
        <div class="point-header">
          <span class="point-icon">📌</span>
          <h3 class="point-title">{{ point.title }}</h3>
        </div>
        <ul class="point-items">
          <li v-for="(pItem, i) in point.items" :key="i">{{ pItem }}</li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import Code from '@/components/Code/index.vue';
import Link from '@/components/Link/index.vue';

defineProps<{ item: any }>();
</script>

<style scoped>
/* 这里可以添加一些 ContentRenderer 特有的样式，但大多数样式应该继承自父组件 */
.content-renderer > *:not(:last-child) {
  margin-bottom: var(--margin-lg);
}
</style>
