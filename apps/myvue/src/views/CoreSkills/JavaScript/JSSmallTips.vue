<template>
  <div class="tips-container">
    <h1 class="main-title">JavaScript开发小技巧</h1>

    <Nav :list="categories" show-child />

    <div>
      <section
        v-for="category in categories"
        :key="category.id"
        :id="category.id"
        class="category-section"
      >
        <h2 class="category-title">
          {{ category.name }}
          <a v-if="category.route" class="jump-link" @click="goToByRouteName(category.route)"
            >跳转详细</a
          >
        </h2>
        <div class="tips-grid">
          <div v-for="(tip, index) in category.children" :key="index" :id="tip.id" class="tip-card">
            <div class="tip-header">
              <span class="tip-index">#{{ index + 1 }}</span>
              <h3>{{ tip.name }}</h3>
            </div>
            <p class="tip-desc">{{ tip.description }}</p>
            <pre class="code-example">{{ tip.example }}</pre>
            <p v-if="tip.notice" class="notice">注意:{{ tip.notice }}</p>
            <a v-if="tip.route" class="jump-link" @click="goToByRouteName(tip.route)">跳转详细</a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Nav from '@/components/Nav/ScrollNav.vue'
import { defineEmits, onMounted, ref, onBeforeUnmount } from 'vue'
// import { useAutoScroll } from '@/hooks/useAutoScroll'

const emit = defineEmits(['goToByRouteName'])

function goToByRouteName(name: string) {
  emit('goToByRouteName', name)
}

interface JSTip {
  name: string
  id: string
  description: string
  example: string
  notice?: string
  route?: string
}

interface TipCategory {
  name: string
  id: string
  route?: string
  children: JSTip[]
}

const categories = ref<TipCategory[]>([])

onMounted(async () => {
  const data = await import('./JSON/JSSmallTips.json')
  categories.value = data.default
  // useAutoScroll({ name: 'JSSmallTips' })
})

onBeforeUnmount(() => {
  categories.value = []
})
</script>

<style scoped>
.tips-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #2d3748;
}

.main-title {
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.6rem;
  background: linear-gradient(45deg, #2c3e50, #42b983);
  color: #fff;
}

.category-section {
  margin: 3rem 0;
}

.category-title {
  color: #42b983;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.jump-link {
  color: #42b983;
  cursor: pointer;
  font-size: 1rem;
}

.tip-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.tip-card:hover {
  transform: translateY(-3px);
}

.tip-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.notice {
  color: rgba(243, 71, 71, 1);
}

.tip-index {
  background: #42b983;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.code-example {
  background: #1e293b;
  color: #f8fafc;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  margin-top: 1rem;
  overflow-x: auto;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }

  .category-title {
    font-size: 1.5rem;
  }
}
</style>
