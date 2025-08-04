<!-- FunctionCard.vue -->
<template>
  <div class="function-card" :data-type="colorType">
    <div class="card-header">
      <h3>{{ title }}</h3>
      <div class="syntax">{{ syntax }}</div>
      <div>{{ description }}</div>
    </div>

    <div class="card-content">
      <div class="visual-demo">
        <slot></slot>
      </div>

      <div class="code-example">
        <pre>{{ example }}</pre>
      </div>
    </div>

    <div class="detail-grid">
      <div class="usage-section">
        <h4>使用场景</h4>
        <ul>
          <li v-for="scene in scenes" :key="scene as string">{{ scene }}</li>
        </ul>
      </div>
      <div class="pros-cons" v-if="pros && cons">
        <div class="pros">
          <h4>优点</h4>
          <ul>
            <li v-for="pro in pros" :key="pro as string">{{ pro }}</li>
          </ul>
        </div>
        <div class="cons">
          <h4>缺点</h4>
          <ul>
            <li v-for="con in cons" :key="con as string">{{ con }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  title: String,
  syntax: String,
  description: String,
  example: String,
  scenes: Array,
  pros: Array,
  cons: Array,
  colorType: String,
})
</script>

<style scoped>
.function-card {

  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.function-card:hover {
  transform: translateY(-5px);
}

.card-header {
  border-bottom: 2px solid;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.card-header h3 {
  margin: 0;
}

.syntax {

  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
}

.visual-demo {
  margin: 1rem 0;
}

pre {
  background: #1e1e1e;
  color: #dcdcdc;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

.detail-grid {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

ul {
  padding-left: 1.2rem;
  margin: 0.5rem 0;
}

/* 颜色分类指示 */
.function-card[data-type='color'] .card-header {
  border-color: #667eea;
}

.function-card[data-type='gradient'] .card-header {
  border-color: #4ecdc4;
}

.function-card[data-type='math'] .card-header {
  border-color: #ff6b6b;
}

.function-card[data-type='other'] .card-header {
  border-color: #9c27b0;
}
</style>
