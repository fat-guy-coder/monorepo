<template>
  <div class="es-features-guide">
    <header class="guide-header">
      <h1 class="title">ECMAScript 新特性演进</h1>
      <p class="subtitle">从 ES5 到 ES2025 的核心特性解析</p>
    </header>

    <div class="version-timeline">
      <div
        v-for="version in versions"
        :key="version.year"
        class="version-card"
        :class="'version-' + version.year"
      >
        <h2 class="version-title">ES{{ version.year }}</h2>
        <div class="features-list">
          <div v-for="feature in version.features" :key="feature.name" class="feature-item">
            <h3 class="feature-name">
              {{ feature.name }} <a @click="handleClick(feature.route)">跳转详细</a>
            </h3>
            <p class="feature-desc">{{ feature.description }}</p>
            <pre class="feature-code"><code>{{ feature.code }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits } from 'vue'

const versions = ref<ESVersion[]>([])

onMounted(async () => {
  const res = await import('../JSON/Es+.json')
  versions.value = res.default
})

const emit = defineEmits(['goToByRouteName'])

const handleClick = (route: string) => {
  emit('goToByRouteName', route)
}

interface ESFeature {
  name: string
  description: string
  code: string
  route: string
}

interface ESVersion {
  year: string
  features: ESFeature[]
}
</script>

<style lang="less" scoped>
.es-features-guide {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #2d3748;
}

.guide-header {
  text-align: center;
  margin-bottom: 3rem;

  .title {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #2d3748;
    font-weight: 800;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
    font-weight: 400;
  }
}

.version-timeline {
  display: grid;
  gap: 2rem;
}

.version-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  }
}

.version-title {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
  color: #1e40af;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #3b82f6;
    margin-right: 0.5rem;
  }
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.feature-item {
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
}

.feature-name {
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #1e40af;
}

.feature-desc {
  color: #475569;
  font-size: 0.9rem;
  margin-top: 0;
  margin-bottom: 0.8rem;
  line-height: 1.5;
}

.feature-code {
  background: #1e293b;
  border-radius: 0.375rem;
  padding: 0.8rem;
  margin: 0;
  overflow-x: auto;

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    color: #f8fafc;
    line-height: 1.4;
    white-space: pre;
  }
}

// 不同版本的颜色主题
.version-5 {
  .version-title {
    color: #1e40af;
  }

  .feature-name {
    color: #1e40af;
  }

  &::before {
    background: #3b82f6;
  }
}

.version-2015 {
  .version-title {
    color: #9d174d;
  }

  .feature-name {
    color: #9d174d;
  }

  &::before {
    background: #db2777;
  }
}

.version-2016 {
  .version-title {
    color: #065f46;
  }

  .feature-name {
    color: #065f46;
  }

  &::before {
    background: #059669;
  }
}

.version-2017 {
  .version-title {
    color: #92400e;
  }

  .feature-name {
    color: #92400e;
  }

  &::before {
    background: #d97706;
  }
}

.version-2018 {
  .version-title {
    color: #5b21b6;
  }

  .feature-name {
    color: #5b21b6;
  }

  &::before {
    background: #7c3aed;
  }
}

.version-2019 {
  .version-title {
    color: #9f1239;
  }

  .feature-name {
    color: #9f1239;
  }

  &::before {
    background: #be123c;
  }
}

.version-2020 {
  .version-title {
    color: #0f766e;
  }

  .feature-name {
    color: #0f766e;
  }

  &::before {
    background: #0d9488;
  }
}

.version-2021 {
  .version-title {
    color: #713f12;
  }

  .feature-name {
    color: #713f12;
  }

  &::before {
    background: #854d0e;
  }
}

.version-2022 {
  .version-title {
    color: #3730a3;
  }

  .feature-name {
    color: #3730a3;
  }

  &::before {
    background: #4f46e5;
  }
}

.version-2023 {
  .version-title {
    color: #831843;
  }

  .feature-name {
    color: #831843;
  }

  &::before {
    background: #9d174d;
  }
}

.version-2024 {
  .version-title {
    color: #064e3b;
  }

  .feature-name {
    color: #064e3b;
  }

  &::before {
    background: #047857;
  }
}

.version-2025 {
  .version-title {
    color: #701a75;
  }

  .feature-name {
    color: #701a75;
  }

  &::before {
    background: #86198f;
  }
}
</style>
