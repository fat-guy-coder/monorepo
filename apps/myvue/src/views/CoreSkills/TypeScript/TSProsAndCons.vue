<template>
  <div class="ts-analysis">
    <header class="header">
      <h1>TypeScript在项目中的利与弊</h1>
      <div class="subtitle">深入分析TS在开发中的实际影响</div>
    </header>

    <div class="content-container">
      <div class="intro-section">
        <div class="stats-card">
          <div class="stat-item">
            <div class="stat-value">76%</div>
            <div class="stat-label">开发者认为TS提高了代码质量</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">63%</div>
            <div class="stat-label">团队认为TS减少了bug数量</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">42%</div>
            <div class="stat-label">开发者表示学习曲线陡峭</div>
          </div>
        </div>
        <div class="summary">
          <p>TypeScript作为JavaScript的超集，为开发带来了静态类型检查等强大功能，但也增加了开发复杂性。本分析从工作量、心智负担、团队协作和适用场景四个维度深入探讨TS的优缺点。</p>
        </div>
      </div>

      <div class="comparison-section">
        <div class="benefits">
          <h2 class="section-title benefit-title">✅ TypeScript的优势</h2>

          <div class="category">
            <h3>工作量方面</h3>
            <ul>
              <li>
                <strong>减少调试时间</strong>
                <p>类型检查在编译期捕获约15-30%的错误，减少运行时调试</p>
              </li>
              <li>
                <strong>更快的代码重构</strong>
                <p>类型系统支持安全的重命名和组件重构</p>
              </li>
              <li>
                <strong>更可靠的第三方库集成</strong>
                <p>类型定义提供清晰的API文档和使用指引</p>
              </li>
            </ul>
          </div>

          <div class="category">
            <h3>心智层面</h3>
            <ul>
              <li>
                <strong>增强代码可读性</strong>
                <p>类型注解作为文档，降低理解代码的认知负荷</p>
              </li>
              <li>
                <strong>减少不确定性</strong>
                <p>明确的接口定义消除对数据结构的猜测</p>
              </li>
              <li>
                <strong>更好的编辑器支持</strong>
                <p>VSCode提供精准的自动补全和类型提示</p>
              </li>
            </ul>
          </div>

          <div class="category">
            <h3>团队合作</h3>
            <ul>
              <li>
                <strong>统一代码规范</strong>
                <p>类型系统强制实施接口约定，减少风格差异</p>
              </li>
              <li>
                <strong>降低新人上手成本</strong>
                <p>类型提示帮助新成员快速理解项目结构</p>
              </li>
              <li>
                <strong>提高代码审查效率</strong>
                <p>类型错误在PR前已被捕获，审查更关注逻辑</p>
              </li>
            </ul>
          </div>

          <div class="category">
            <h3>适用场景</h3>
            <ul>
              <li>
                <strong>中大型复杂项目</strong>
                <p>模块间依赖多的系统更能体现TS价值</p>
              </li>
              <li>
                <strong>长期维护的项目</strong>
                <p>类型系统作为文档，降低长期维护成本</p>
              </li>
              <li>
                <strong>多人协作项目</strong>
                <p>减少接口不一致导致的集成问题</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="drawbacks">
          <h2 class="section-title drawback-title">⚠️ TypeScript的挑战</h2>

          <div class="category">
            <h3>工作量方面</h3>
            <ul>
              <li>
                <strong>初期配置成本高</strong>
                <p>需要配置tsconfig、类型定义等，增加启动时间</p>
              </li>
              <li>
                <strong>类型定义额外工作</strong>
                <p>编写类型声明增加约20-30%的编码时间</p>
              </li>
              <li>
                <strong>第三方库类型问题</strong>
                <p>处理无类型或类型错误的库消耗额外时间</p>
              </li>
            </ul>
          </div>

          <div class="category">
            <h3>心智层面</h3>
            <ul>
              <li>
                <strong>学习曲线陡峭</strong>
                <p>泛型、高级类型等概念增加认知负担</p>
              </li>
              <li>
                <strong>类型系统复杂性</strong>
                <p>解决复杂类型问题可能占用大量心智资源</p>
              </li>
              <li>
                <strong>JavaScript思维转换</strong>
                <p>动态类型习惯需要调整为静态类型思维</p>
              </li>
            </ul>
          </div>

          <div class="category">
            <h3>团队合作</h3>
            <ul>
              <li>
                <strong>技能门槛提高</strong>
                <p>团队需要统一的TS知识水平，否则成为瓶颈</p>
              </li>
              <li>
                <strong>类型定义分歧</strong>
                <p>复杂的类型设计可能导致团队理解不一致</p>
              </li>
              <li>
                <strong>严格性差异</strong>
                <p>团队成员对类型严格程度可能有不同标准</p>
              </li>
            </ul>
          </div>

          <div class="category">
            <h3>适用场景</h3>
            <ul>
              <li>
                <strong>小型项目或原型</strong>
                <p>TS配置成本可能超过其收益</p>
              </li>
              <li>
                <strong>高度动态的代码</strong>
                <p>需要大量类型断言或any类型，降低价值</p>
              </li>
              <li>
                <strong>严格deadline项目</strong>
                <p>学习曲线可能影响初期开发速度</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="recommendation">
        <h2>📝 使用建议</h2>
        <div class="suggestions">
          <div class="suggestion-card">
            <div class="icon">🚀</div>
            <h3>渐进式采用</h3>
            <p>从any开始，逐步添加类型，避免初期过度设计</p>
          </div>
          <div class="suggestion-card">
            <div class="icon">🧩</div>
            <h3>合理使用any</h3>
            <p>对复杂或第三方代码可暂时使用any，后续改进</p>
          </div>
          <div class="suggestion-card">
            <div class="icon">🔧</div>
            <h3>统一配置</h3>
            <p>团队共享tsconfig和ESLint规则，减少分歧</p>
          </div>
          <div class="suggestion-card">
            <div class="icon">📚</div>
            <h3>持续学习</h3>
            <p>定期分享TS技巧，提高团队整体水平</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑
import { ref } from 'vue';

// 示例响应式数据
const adoptionRate = ref(78);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@benefit-color: #2ec4b6;
@drawback-color: #ff9f1c;
@light-bg: #f8f9fa;
@text-color: #343a40;
@border-color: #e9ecef;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.ts-analysis {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: @text-color;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  min-height: 100vh;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h1 {
    color: @secondary-color;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
    color: lighten(@text-color, 20%);
    font-weight: 500;
  }
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
}

.intro-section {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.stats-card {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .stat-item {
    text-align: center;
    padding: 1rem;
    border-radius: 8px;
    background: @light-bg;

    .stat-value {
      font-size: 2.2rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.95rem;
      color: lighten(@text-color, 15%);
    }
  }
}

.summary {
  flex: 2;
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  p {
    font-size: 1.1rem;
    line-height: 1.8;
  }
}

.comparison-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.benefits, .drawbacks {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .section-title {
    padding: 1.2rem 1.5rem;
    margin: 0;
    font-size: 1.5rem;
  }
}

.benefits {
  border-top: 4px solid @benefit-color;

  .benefit-title {
    background: fade(@benefit-color, 10%);
    color: darken(@benefit-color, 15%);
  }
}

.drawbacks {
  border-top: 4px solid @drawback-color;

  .drawback-title {
    background: fade(@drawback-color, 10%);
    color: darken(@drawback-color, 15%);
  }
}

.category {
  padding: 1.5rem;
  border-bottom: 1px solid @border-color;

  &:last-child {
    border-bottom: none;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 1rem;
    font-size: 1.3rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px dashed @border-color;
  }

  ul {
    list-style: none;

    li {
      padding: 0.8rem 0;

      strong {
        display: block;
        color: @secondary-color;
        margin-bottom: 0.3rem;
        font-size: 1.1rem;
      }

      p {
        color: lighten(@text-color, 15%);
      }
    }
  }
}

.recommendation {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h2 {
    text-align: center;
    color: @primary-color;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }
}

.suggestions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.suggestion-card {
  background: @light-bg;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 0.8rem;
  }

  p {
    color: lighten(@text-color, 15%);
  }
}
</style>
