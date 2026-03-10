<template>
  <div class="theme-switch-container">
    <!-- 标题部分 -->
    <header class="header">
      <h1>🎨 网站主题切换方案</h1>
      <p class="subtitle">多模式主题切换实现基本指南</p>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 核心方案 -->
      <section class="solution-section">
        <h2 class="section-title">
          <span class="icon">🌟</span>
          核心实现方案
        </h2>
        <div class="solution-grid">
          <div v-for="solution in coreSolutions" :key="solution.name" class="solution-card" :class="solution.type">
            <div class="solution-header">
              <span class="solution-icon">{{ solution.icon }}</span>
              <h3>{{ solution.name }}</h3>
            </div>
            <div class="solution-body">
              <div class="implementation">
                <h4>实现方式</h4>
                <pre class="code-sample">{{ solution.implementation }}</pre>
              </div>
              <div class="pros-cons">
                <div class="pros">
                  <h4>✅ 优点</h4>
                  <ul>
                    <li v-for="(pro, pIndex) in solution.pros" :key="pIndex">{{ pro }}</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>❌ 缺点</h4>
                  <ul>
                    <li v-for="(con, cIndex) in solution.cons" :key="cIndex">{{ con }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <div class="notice-section">
        <h3>⚠️ 实施建议</h3>
        <ul>
          <li>优先使用CSS变量方案</li>
          <li>配合CSS预处理提升维护性</li>
          <li>提供系统主题跟随功能</li>
          <li>注意颜色对比度可访问性</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
interface ThemeSolution {
  name: string;
  type: 'core' | 'modern';
  icon: string;
  implementation: string;
  pros: string[];
  cons: string[];
}

const coreSolutions = ref<ThemeSolution[]>([
  {
    name: 'CSS变量方案',
    type: 'core',
    icon: '🎚️',
    implementation: `:root {
  --primary-color: #2196f3;
  --background: #ffffff;
}

[data-theme="dark"] {
  --primary-color: #90caf9;
  --background: #121212;
}

.element {
  color: var(--primary-color);
  background: var(--background);
}`,
    pros: [
      '只需切换根元素属性',
      '支持实时动态更新',
      '维护成本低'
    ],
    cons: [
      'IE不兼容需polyfill',
      '需统一变量命名规范'
    ]
  },
  {
    name: '类名切换方案',
    type: 'core',
    icon: '🏷️',
    implementation: `// 样式定义
.light-theme {
  .button { background: #fff; }
}

.dark-theme {
  .button { background: #333; }
}

// 切换逻辑
document.documentElement.className = 'dark-theme';`,
    pros: [
      '兼容性极佳',
      '实现简单直接',
      '支持预处理嵌套'
    ],
    cons: [
      '需维护多套样式',
      '全局类名可能冲突'
    ]
  },
  {
    name: 'CSS-in-JS方案',
    type: 'modern',
    icon: '💅',
    implementation: `// 使用styled-components
const Button = styled.button\`
  background: \${({ theme }) => theme.background};
  color: \${({ theme }) => theme.text};
\`;

// 主题Provider
<ThemeProvider theme={currentTheme}>`,
    pros: [
      '组件级作用域',
      '动态主题能力强',
      '类型安全'
    ],
    cons: [
      '增加运行时开销',
      '需要额外依赖'
    ]
  }

]);


</script>

<style lang="less" scoped>
@primary-color: #2196f3;
@success-color: #4caf50;
@warning-color: #ff9800;
@error-color: #e53935;
@text-color: #2c3e50;

.theme-switch-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);

  .header {
    text-align: center;
    margin-bottom: 3rem;

    h1 {
      font-size: 2.5rem;
      color: @text-color;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: lighten(@text-color, 30%);
      font-size: 1.1rem;
    }
  }

  .solution-section {
    margin-bottom: 3rem;

    .section-title {
      font-size: 1.8rem;
      color: @text-color;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      gap: 1rem;

      .icon {
        font-size: 1.5em;
      }
    }

    .solution-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;

      .solution-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        border-left: 4px solid @primary-color;

        &.modern {
          border-color: @success-color;
        }

        .solution-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;

          .solution-icon {
            font-size: 1.8rem;
          }
        }

        .solution-body {
          .implementation {
            margin-bottom: 1.5rem;

            h4 {
              color: @text-color;
              margin-bottom: 0.5rem;
            }

            .code-sample {
              background: #2c3e50;
              color: white;
              padding: 1rem;
              border-radius: 8px;
              font-family: 'Fira Code', monospace;
              white-space: pre-wrap;
            }
          }

          .pros-cons {
            display: grid;
            gap: 1.5rem;

            .pros h4 {
              color: @success-color;
            }

            .cons h4 {
              color: @error-color;
            }

            ul {
              list-style: none;
              padding-left: 1rem;

              li {
                padding: 0.3rem 0;
                position: relative;

                &::before {
                  content: "•";
                  position: absolute;
                  left: -1rem;
                }
              }
            }
          }
        }
      }
    }
  }

  .notice-section {
    background: #fff3e0;
    border-radius: 12px;
    padding: 1.5rem;
    margin-top: 2rem;

    ul {
      list-style: none;
      padding-left: 1rem;

      li {
        padding: 0.5rem 0;
        position: relative;

        &::before {
          content: "•";
          color: @warning-color;
          position: absolute;
          left: -1rem;
        }
      }
    }
  }
}
</style>
