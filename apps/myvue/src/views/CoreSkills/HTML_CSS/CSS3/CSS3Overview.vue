<template>
  <div class="es-reference">
    <!-- 标题区域 -->
    <header class="header">
      <div class="title-container">
        <h1>CSS3 核心知识点参考</h1>
        <div class="version-tag">CSS3</div>
      </div>
      <p class="subtitle">全面梳理CSS3核心特性、语法及最佳实践，按重要性和使用频率排序</p>
    </header>
    <ScrollNav :list="knowledgeData" showChild :keyMap="{ children: 'items' }" />
    <KnowledgeUnit
      showJump
      :knowledgeData="knowledgeData"
      :selectedVersions="selectedVersions"
      :selectedTypes="selectedTypes"
      :searchTerm="searchTerm"
      @goToByRouteName="goToByRouteName"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ScrollNav from '@/components/Nav/ScrollNav.vue'
import KnowledgeUnit, { type KnowledgeCategory } from '../../Components/KnowledgeUnit.vue'

// 知识点数据
const knowledgeData = ref<KnowledgeCategory[]>([])

const loading = ref(true)

onMounted(async () => {
  const res = await import('../JSON/Css3.json')
  knowledgeData.value = res.default as unknown as KnowledgeCategory[]
  types.value = knowledgeData.value.map((category) => category.name)
  loading.value = false
})

const types = ref<string[]>(['全部'])

onUnmounted(async () => {
  knowledgeData.value = []
})

// 选中的版本
const selectedVersions = ref<string>('')

const selectedTypes = ref<string>('')
// 搜索词
const searchTerm = ref<string>('')

const emit = defineEmits(['goToByRouteName'])

const goToByRouteName = (route: string) => {
  emit('goToByRouteName', route)
}
</script>

<style scoped lang="less">
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2b2d42;

.es-reference {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: @light-bg;
  min-height: 100vh;
  color: @text-color;
  line-height: 1.5;

}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 10px 0;

  .title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 2.5rem;
    color: @secondary-color;
  }

  .version-tag {
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 1rem;
    font-weight: 600;
  }

  .subtitle {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
    max-width: 700px;
    margin: 0 auto;
  }
}

.footer {
  text-align: center;
  padding: 30px 20px 20px;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;

    .search-box {
      max-width: 100%;
    }
  }

  .knowledge-grid {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 2rem;
  }

  .category-title {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .version-filter {
    justify-content: flex-start;
  }

  .header {
    padding: 10px 0;

    h1 {
      font-size: 1.8rem;
    }

    .version-tag {
      font-size: 0.9rem;
    }
  }

  .category-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
