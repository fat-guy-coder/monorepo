<template>
  <div class="type-card">
    <div class="type-header">
      <span class="type-name">{{ type.name }}</span>
      <span class="type-tag">type</span>
    </div>

    <pre class="type-code"><code>{{ type.code }}</code></pre>

    <div class="type-content">
      <p class="type-description">{{ type.description }}</p>

      <div class="scenarios">
        <h4>适用场景</h4>
        <ul>
          <li v-for="(scenario, index) in type.scenarios" :key="index">
            {{ scenario }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type: {
    name: string
    code: string
    description: string
    scenarios: string[]
  }
}>()
</script>

<style lang="less" scoped>
.type-card {
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
}

.type-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
}

.type-name {
  font-family: 'Fira Code', monospace;
  font-weight: 600;
  color: #3b82f6;
  font-size: 1.1rem;
}

.type-tag {
  background: #dbeafe;
  color: #1d4ed8;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
}

.type-code {
  margin: 0;
  padding: 1rem;
  background: #f8fafc;
  overflow-x: auto;

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    color: #334155;
    line-height: 1.5;
    white-space: pre;
  }
}

.type-content {
  padding: 1rem;
}

.type-description {
  color: #475569;
  margin-top: 0;
  margin-bottom: 1rem;
}

.scenarios {
  h4 {
    font-size: 0.9rem;
    color: #64748b;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  ul {
    padding-left: 1.25rem;
    margin: 0;

    li {
      color: #475569;
      font-size: 0.85rem;
      line-height: 1.5;
      margin-bottom: 0.25rem;

      &::marker {
        color: #94a3b8;
      }
    }
  }
}
</style>