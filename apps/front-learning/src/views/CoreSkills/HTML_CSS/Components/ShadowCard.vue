<!-- ShadowCard.vue -->
<template>
  <div class="shadow-card">
    <div class="card-header">
      <h3>{{ title }}</h3>
      <div class="preview-text" v-if="text" :style="{ textShadow: (style as any).textShadow }">
        {{ text }}
      </div>
    </div>

    <div class="preview-box" :style="style"></div>

    <div class="code-block">
      <pre>{{ code }}</pre>
    </div>

    <div class="detail-grid">
      <div class="usage-section">
        <h4>使用场景</h4>
        <ul>
          <li v-for="scene in scenes" :key="scene as string">{{ scene }}</li>
        </ul>
      </div>

      <div class="pros-cons">
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
  style: Object,
  code: String,
  scenes: Array,
  pros: Array,
  cons: Array,
  text: String,
})
</script>

<style scoped>
h3,
h4 {
  color: #000;
}
.shadow-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.shadow-card:hover {
  transform: translateY(-5px);
}

.preview-box {
  height: 150px;
  background: white;
  margin: 1rem 0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.preview-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  padding: 1rem;
}

.code-block pre {
  background: #1e1e1e;
  color: #dcdcdc;
  padding: 1rem;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
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
  color: #666;
}
</style>
