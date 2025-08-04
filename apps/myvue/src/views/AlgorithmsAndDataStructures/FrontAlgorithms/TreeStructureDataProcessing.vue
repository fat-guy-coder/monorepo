<template>
  <div class="tree-data-container">
    <!-- 头部区域 -->
    <header class="header">
      <h1>树形结构数据处理指南</h1>
      <p class="subtitle">掌握树形数据在前端开发中的常见问题与解决方案</p>
    </header>

    <!-- 搜索和过滤 -->
    <div class="controls">
      <input type="text" v-model="searchQuery" placeholder="搜索树形处理问题..." class="search-input">
      <div class="filter-tags">
        <span v-for="tag in tags" :key="tag" :class="{ active: activeTag === tag }" @click="toggleTag(tag)" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- 问题与解决方案列表 -->
    <div class="problem-list">
      <div v-for="problem in filteredProblems" :key="problem.id" class="problem-card">
        <div class="problem-header">
          <h3 class="problem-title">{{ problem.title }}</h3>
          <span class="problem-tag">{{ problem.tag }}</span>
        </div>

        <div class="problem-description">
          {{ problem.description }}
        </div>

        <div class="solution">
          <h4>解决方案：</h4>
          <div class="solution-description">
            {{ problem.solution }}
          </div>

          <div class="code-block">
            <pre>{{ problem.code }}</pre>
          </div>

          <div class="complexity">
            <strong>时间复杂度：</strong> {{ problem.timeComplexity }}
            <strong>空间复杂度：</strong> {{ problem.spaceComplexity }}
          </div>
          <div class="advantage">
            <strong>优势：</strong> {{ problem.advantage }}
          </div>
          <div class="disadvantage">
            <strong>劣势：</strong> {{ problem.disadvantage }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import problems from './JSON/TreeStructureDataProcessing.json';

// 搜索查询和活动标签
const searchQuery = ref('');
const activeTag = ref('全部');
const tags = ref(['全部', '遍历', '查找', '转换', '操作', '比对', '渲染']);

// 过滤问题
const filteredProblems = computed(() => {
  return problems.filter(problem => {
    // 检查标签
    const tagMatch = activeTag.value === '全部' ||
      problem.tag.includes(activeTag.value) ||
      activeTag.value === '全部';
    // 检查搜索查询
    const searchMatch = !searchQuery.value ||
      problem.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.value.toLowerCase());

    return tagMatch && searchMatch;
  });
});

// 切换标签
const toggleTag = (tag: string) => {
  activeTag.value = tag;
};
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #eaeaea;
@tag-bg: #e0f7ff;
@dark-tag-bg: darken(@tag-bg, 5%);

.tree-data-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @light-bg;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: darken(@primary-color, 10%);
  }

  .subtitle {
    font-size: 1.2rem;
    color: lighten(@text-color, 20%);
  }
}

.controls {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .search-input {
    padding: 12px 15px;
    border: 2px solid @primary-color;
    border-radius: 30px;
    font-size: 1rem;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
      box-shadow: 0 0 0 3px fade(@primary-color, 30%);
    }
  }
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;

  .tag {
    padding: 8px 15px;
    background-color: @tag-bg;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;

    &:hover {
      background-color: @dark-tag-bg;
    }

    &.active {
      background-color: @primary-color;
      color: white;
      font-weight: 600;
    }
  }
}

.problem-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.problem-card {
  background-color: @card-bg;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  border-left: 4px solid @primary-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

.problem-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  .problem-title {
    font-size: 1.3rem;
    margin: 0;
    color: darken(@primary-color, 10%);
  }

  .problem-tag {
    background-color: lighten(@primary-color, 40%);
    color: darken(@primary-color, 20%);
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }
}

.problem-description {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 15px;
  color: lighten(@text-color, 15%);
}

.solution {
  h4 {
    margin: 15px 0 10px;
    color: @secondary-color;
  }

  .solution-description {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 15px;
  }
}

.code-block {
  background: #2c3e50;
  color: #ecf0f1;
  border-radius: 6px;
  padding: 15px;
  margin: 15px 0;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;

  pre {
    margin: 0;
    line-height: 1.4;
    white-space: pre-wrap;
  }
}

.complexity {
  font-size: 0.9rem;
  font-style: italic;
  color: lighten(@text-color, 20%);
}

.advantage {
  font-size: 0.9rem;
  font-style: italic;
  color: lighten(@text-color, 20%);
}

.disadvantage {
  font-size: 0.9rem;
  font-style: italic;
  color: lighten(@text-color, 20%);
}

.tree-visualization {
  background: white;
  border-radius: 10px;
  padding: 30px;
  margin: 40px 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h2 {
    text-align: center;
    margin-bottom: 30px;
    color: darken(@primary-color, 10%);
  }
}

.tree {
  display: flex;
  flex-direction: column;
  align-items: center;

  .node {
    background: @primary-color;
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    margin: 10px;
    text-align: center;
    min-width: 120px;
    position: relative;

    &.root {
      background: darken(@primary-color, 15%);
      font-weight: bold;
    }

    &.with-children::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      border-top: 10px solid @primary-color;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
    }
  }

  .children {
    display: flex;
    position: relative;
    padding-top: 20px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: 2px;
      height: 20px;
      background: #ccc;
    }
  }
}

.footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 40px;
  border-top: 1px solid @border-color;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;

  p {
    margin: 5px 0;
  }
}

@media (max-width: 768px) {
  .problem-list {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 2rem;
  }

  .tree .children {
    flex-direction: column;
    align-items: center;

    &::before {
      left: 50%;
    }
  }
}
</style>