<template>
  <div class="linux-commands-container">
    <h1 class="main-title">Linux命令参考手册</h1>
    <div class="search-box">
      <input v-model="searchTerm" placeholder="搜索Linux命令..." class="search-input" />
      <span class="search-icon">🔍</span>
    </div>

    <div class="priority-key">
      <span class="priority-1">高优先级</span>
      <span class="priority-2">中优先级</span>
      <span class="priority-3">低优先级</span>
    </div>

    <div class="commands-wrapper">
      <div v-for="category in filteredCategories" :key="category.name" class="command-category">
        <h2 class="category-title">{{ category.name }}</h2>
        <div class="commands-grid">
          <div v-for="cmd in category.commands" :key="cmd.name"
            :class="['command-card', `priority-${cmd.priorityNum}`]">
            <div class="command-header">
              <code class="command-name">{{ cmd.name }}</code>
              <span class="command-priority">优先级: {{ cmd.priority }}</span>
            </div>
            <div class="command-description">{{ cmd.description }}</div>
            <div v-if="cmd.example" class="command-example">
              <span>示例: </span><code>{{ cmd.example }}</code>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import data from './JSON/index.json';

interface LinuxCommandData {
  name: string;
  commands: LinuxCommand[];
}

interface LinuxCommand {
  name: string;
  description: string;
  category: string;
  priority: '高' | '中' | '低';
  priorityNum?: number;
  example?: string;
}

const commandData = ref<LinuxCommandData[]>([]);

onMounted(async () => {
  const { default: data } = await import('./JSON/index.json');
  commandData.value = data as LinuxCommandData[];
});

const searchTerm = ref('');
const filteredCategories = computed(() => {
  return commandData.value.filter((category: LinuxCommandData) =>
    category.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});


</script>

<style scoped lang="less">
.linux-commands-container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-icon {
  margin-left: 10px;
}

.priority-key {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.priority-1 {
  color: red;
  background-color: rgb(235, 176, 176);
}

.priority-2 {
  color: orange;
  background-color: rgb(235, 176, 176);
}

.priority-3 {
  color: green;
  background-color: rgb(235, 176, 176);
}

.command-category {
  margin-bottom: 20px;
}

.command-card {
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.command-header {
  display: flex;
}

.command-name {
  font-weight: bold;
}

.command-description {
  margin-top: 10px;
}

.command-example {
  margin-top: 10px;
}
</style>