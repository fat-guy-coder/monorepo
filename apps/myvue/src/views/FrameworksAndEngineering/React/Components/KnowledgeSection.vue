<template>
  <div class="knowledge-card" v-if="items.length">
    <div class="card-header">
      <span class="card-icon">{{ icon }}</span>
      <h3>{{ title }}</h3>
    </div>
    <ul class="knowledge-list">
      <li v-for="item in items" :key="item.id" class="knowledge-item">
        <div class="item-header">
          <span class="item-title">{{ item.title }}</span>
          <span class="importance" :class="'level-' + item.importance">
            {{ '★'.repeat(item.importance) }}
          </span>
        </div>
        <p class="item-desc">{{ item.description }}</p>
        <div class="item-keywords">
          <span v-for="(kw, index) in item.keywords" :key="index" class="keyword-tag">
            {{ kw }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { defineProps, type PropType } from 'vue';
const { title, icon, items } = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  items: {
    type: Array as PropType<{
      id: number;
      title: string;
      description: string;
      importance: number;
      keywords: string[];
    }[]>,
    required: true
  }
});

</script>
<style lang="less" scoped>
@card-bg: #ffffff;
@primary: #61dafb;
@secondary: #282c34;
@text-primary: #2d3748;
@text-secondary: #718096;
@border: #e2e8f0;
@background: #f8fafc;
@card-bg: #ffffff;
@success: #48bb78;
@error: #e53e3e;

.knowledge-card {
  background: @card-bg;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px;
    background: fade(@primary, 10%);
    border-bottom: 1px solid @border;

    h3 {
      margin: 0;
      font-size: 1.3rem;
      font-weight: 600;
      color: @secondary;
    }

    .card-icon {
      font-size: 1.5rem;
    }
  }
}

.knowledge-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.knowledge-item {
  padding: 18px 20px;
  border-bottom: 1px solid fade(@border, 70%);

  &:last-child {
    border-bottom: none;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .item-title {
    font-weight: 600;
    font-size: 1.05rem;
    color: darken(@text-primary, 10%);
  }

  .importance {
    font-size: 0.9rem;
    color: @success;

    &.level-5 {
      color: @error;
    }

    &.level-4 {
      color: darken(@success, 15%);
    }

    &.level-3 {
      color: @success;
    }

    &.level-2 {
      color: lighten(@success, 15%);
    }

    &.level-1 {
      color: lighten(@success, 25%);
    }
  }

  .item-desc {
    margin: 0 0 10px 0;
    font-size: 0.92rem;
    color: @text-secondary;
    line-height: 1.5;
  }

  .item-keywords {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .keyword-tag {
    font-size: 0.75rem;
    background: fade(@primary, 12%);
    color: darken(@primary, 25%);
    padding: 3px 8px;
    border-radius: 20px;
  }
}
</style>
