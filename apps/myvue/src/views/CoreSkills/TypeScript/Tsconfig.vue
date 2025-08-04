<template>
  <div class="tsconfig-doc">
    <h1 class="title">TypeScript tsconfig.json 配置基础介绍</h1>
    <p class="intro">tsconfig.json 是 TypeScript 项目的核心配置文件，用于控制编译器的行为。</p>

    <div class="toc-container">
      <h3 class="toc-title">目录导航</h3>
      <ul class="toc-list">
        <li v-for="section in sections" :key="section.id">
          <a :href="`#${section.id}`" class="toc-link">{{ section.title }}</a>
        </li>
      </ul>
    </div>

    <section v-for="section in sections" :id="section.id" :key="section.id" class="config-section">
      <h2 class="section-title">{{ section.title }}</h2>
      <div class="section-content">
        <div v-for="item in section.items" :key="item.name" class="config-card">
          <div class="config-header">
            <h3 class="config-name">{{ item.name }}</h3>
            <div class="config-meta">
              <span class="config-type">{{ item.type }}</span>
              <span v-if="item.default" class="config-default">默认值: {{ item.default }}</span>
            </div>
          </div>

          <p class="config-desc">{{ item.description }}</p>

          <p class="config-details">{{ item.details }}</p>

          <div v-if="item.options" class="config-options">
            <h4 class="options-title">可选值:</h4>
            <ul class="options-list">
              <li v-for="(desc, opt) in item.options" :key="opt" class="option-item">
                <code class="option-value">{{ opt }}</code>
                <span class="option-desc">{{ desc }}</span>
              </li>
            </ul>
          </div>

          <div class="config-example">
            <h4 class="example-title">配置示例:</h4>
            <pre class="code-block">"{{ item.name }}": {{ item.example }}</pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from 'vue';

interface ConfigItem {
  name: string;
  type: string;
  description: string;
  default?: string;
  options?: Record<string, string>;
  example: string;
  details: string;
}

interface Section {
  id: string;
  title: string;
  items: ConfigItem[];
}

const sections = ref<Section[]>([]);

onMounted(async () => {
  const { default: data } = await import('./JSON/TsConfig.json')
  sections.value = data as unknown as Section[]
})

onUnmounted(() => {
  sections.value = []
})
</script>

<style lang="less" scoped>
.tsconfig-doc {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;
  background-color: #fff;

  .title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f0f0f0;
    font-size: 2.2rem;
  }

  .intro {
    text-align: center;
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 2rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .toc-container {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .toc-title {
      margin-top: 0;
      color: #3498db;
      font-size: 1.2rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .toc-list {
      columns: 2;
      column-gap: 2rem;
      padding-left: 1.5rem;
      margin: 0;

      @media (max-width: 768px) {
        columns: 1;
      }
    }

    .toc-link {
      color: #555;
      text-decoration: none;
      transition: color 0.2s;
      display: block;
      padding: 0.3rem 0;

      &:hover {
        color: #3498db;
      }
    }
  }

  .config-section {
    margin-bottom: 3rem;
    background-color: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

    .section-title {
      color: #3498db;
      margin-top: 0;
      padding-bottom: 0.8rem;
      border-bottom: 1px solid #eee;
      margin-bottom: 1.5rem;
      font-size: 1.6rem;
    }
  }

  .config-card {
    background-color: #f8f9fa;
    border-radius: 6px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-left: 4px solid #3498db;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .config-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0.8rem;
      flex-wrap: wrap;
    }

    .config-name {
      margin: 0;
      color: #2c3e50;
      font-size: 1.3rem;
      font-weight: 600;
    }

    .config-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.9rem;
    }

    .config-type {
      background-color: #e7f5fe;
      color: #3498db;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-family: 'Courier New', Courier, monospace;
    }

    .config-default {
      color: #666;
      font-style: italic;
    }

    .config-desc {
      margin: 0.8rem 0;
      color: #444;
      line-height: 1.7;
    }

    .config-details {
      margin: 0.8rem 0;
      color: #444;
      line-height: 1.7;
    }

    .config-options {
      margin: 1rem 0;

      .options-title {
        margin: 0.5rem 0;
        font-size: 1rem;
        color: #555;
      }

      .options-list {
        list-style-type: none;
        padding-left: 0;
        margin: 0.5rem 0;
      }

      .option-item {
        margin-bottom: 0.5rem;
        display: flex;
        align-items: baseline;
      }

      .option-value {
        background-color: #f0f0f0;
        padding: 0.2rem 0.4rem;
        border-radius: 3px;
        margin-right: 0.8rem;
        min-width: 100px;
        text-align: center;
        font-family: 'Courier New', Courier, monospace;
      }

      .option-desc {
        color: #666;
        flex: 1;
      }
    }

    .config-example {
      margin-top: 1rem;

      .example-title {
        margin: 0.5rem 0;
        font-size: 1rem;
        color: #555;
      }
    }
  }

  .code-block {
    background-color: #282c34;
    color: #abb2bf;
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0.5rem 0;
  }
}

@media (max-width: 768px) {
  .tsconfig-doc {
    padding: 1rem;

    .title {
      font-size: 1.8rem;
    }

    .config-card {
      padding: 1rem;

      .config-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .config-meta {
        margin-top: 0.5rem;
      }
    }
  }
}
</style>
