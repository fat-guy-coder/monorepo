<!-- ProcessorCard.vue -->
<template>
  <div class="processor-card" :data-type="type">
    <div class="card-header">
      <div class="logo">{{ logo }}</div>
      <h3>
        <a :href="href" target="_blank" rel="noopener noreferrer">{{ title }}</a>
      </h3>
    </div>

    <div class="features">
      <span v-for="feature in features" :key="feature as string">{{ feature }}</span>
    </div>

    <div class="detail-grid">
      <div class="pros">
        <h4>✅ 优点</h4>
        <ul>
          <li v-for="pro in pros" :key="pro as string">{{ pro }}</li>
        </ul>
      </div>

      <div class="cons">
        <h4>❌ 缺点</h4>
        <ul>
          <li v-for="con in cons" :key="con as string">{{ con }}</li>
        </ul>
      </div>
    </div>

    <div class="scene">
      <h4>🎯 适用场景</h4>
      <p>{{ scene }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  href: String,
  logo: String,
  type: String,
  features: Array,
  pros: Array,
  cons: Array,
  scene: String,
})
</script>

<style scoped>
h3,
h4,
p {
  color: #000;
}
.processor-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.processor-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.logo {
  width: 40px;
  height: 40px;
  background: #667eea;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.features span {
  background: #f0f4ff;
  color: #667eea;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.detail-grid {
  display: grid;
  gap: 1rem;
  margin: 1rem 0;
}

.pros h4 {
  color: #4caf50;
}
.cons h4 {
  color: #d32f2f;
}

ul {
  padding-left: 1.2rem;
  margin: 0.5rem 0;
  color: #666;
}

.scene {
  border-top: 2px solid #eee;
  padding-top: 1rem;
}

/* 类型颜色区分 */
.processor-card[data-type='pre'] .logo {
  background: #667eea;
}

.processor-card[data-type='post'] .logo {
  background: #4ecdc4;
}
</style>
