<template>
  <div class="i18n-container">
    <header class="header">
      <h1>前端国际化方案基本指南</h1>
      <p class="subtitle">构建多语言应用的现代解决方案</p>

      <div class="stats">
        <div class="stat-card">
          <div class="stat-icon">🌐</div>
          <div class="stat-content">
            <div class="stat-value">全球化覆盖</div>
            <div class="stat-label">支持150+语言</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-content">
            <div class="stat-value">高效翻译</div>
            <div class="stat-label">AI加速本地化</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔄</div>
          <div class="stat-content">
            <div class="stat-value">无缝切换</div>
            <div class="stat-label">实时语言切换</div>
          </div>
        </div>
      </div>
    </header>

    <section class="section">
      <h2 class="section-title">
        <span class="icon">🧩</span>
        为什么需要国际化？
      </h2>

      <div class="reasons-grid">
        <div class="reason-card">
          <div class="reason-icon">📈</div>
          <h3>市场扩张</h3>
          <p>进入国际市场，扩大用户基础</p>
        </div>

        <div class="reason-card">
          <div class="reason-icon">👥</div>
          <h3>用户体验</h3>
          <p>为不同语言用户提供本地化体验</p>
        </div>

        <div class="reason-card">
          <div class="reason-icon">🏢</div>
          <h3>企业需求</h3>
          <p>满足跨国企业的多语言要求</p>
        </div>

        <div class="reason-card">
          <div class="reason-icon">📜</div>
          <h3>合规要求</h3>
          <p>满足特定地区的语言法规</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">
        <span class="icon">🔧</span>
        核心国际化方案
      </h2>

      <div class="solution-card">
        <div class="solution-header">
          <div class="solution-icon">i18n</div>
          <h3>传统i18n方案</h3>
          <span class="tag popular">最常用</span>
        </div>

        <div class="solution-content">
          <p>基于键值对映射的国际化解决方案，通过JSON/YAML文件管理翻译内容</p>

          <h4>主要特点</h4>
          <ul>
            <li>分离代码与翻译内容</li>
            <li>支持变量插值、复数形式</li>
            <li>成熟的生态系统</li>
            <li>支持语言包懒加载</li>
          </ul>

          <h4>推荐库</h4>
          <div class="libraries">
            <div class="library">
              <div class="library-icon">V</div>
              <div class="library-info">
                <div class="name">vue-i18n</div>
                <div class="stats">★ 6.5k · 支持Vue2/3</div>
              </div>
            </div>
            <div class="library">
              <div class="library-icon">R</div>
              <div class="library-info">
                <div class="name">react-i18next</div>
                <div class="stats">★ 6.1k · 支持React</div>
              </div>
            </div>
            <div class="library">
              <div class="library-icon">i18</div>
              <div class="library-info">
                <div class="name">i18next</div>
                <div class="stats">★ 7.2k · 框架无关</div>
              </div>
            </div>
          </div>

          <h4>代码示例</h4>
          <pre><code>// 语言包
{
  "en": {
    "welcome": "Hello, {name}!"
  },
  "zh": {
    "welcome": "你好, {name}!"
  }
}

// Vue组件中使用
&lt;template&gt;
  &lt;p&gt;&#123;&#123; $t('welcome', { name: 'John' }) &#125;&#125;&lt;/p&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">
        <span class="icon">🤖</span>
        AI驱动的自动化方案
      </h2>

      <div class="auto-grid">
        <div class="auto-card">
          <div class="auto-header">
            <div class="auto-icon">🔄</div>
            <h3>自动提取插件</h3>
            <span class="tag new">创新</span>
          </div>

          <div class="auto-content">
            <p>在构建时自动提取文本并生成翻译文件</p>

            <h4>代表工具</h4>
            <ul>
              <li><strong>i18next-parser</strong> - 扫描代码自动生成JSON</li>
              <li><strong>vue-i18n-extract</strong> - 专为Vue设计</li>
              <li><strong>@formatjs/cli</strong> - 支持React/TypeScript</li>
            </ul>

            <h4>工作流程</h4>
            <div class="workflow">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-text">代码中标记文本</div>
              </div>
              <div class="step-arrow">→</div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-text">构建时提取文本</div>
              </div>
              <div class="step-arrow">→</div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-text">生成翻译文件</div>
              </div>
            </div>
          </div>
        </div>

        <div class="auto-card">
          <div class="auto-header">
            <div class="auto-icon">🧠</div>
            <h3>AI翻译库</h3>
            <span class="tag ai">AI驱动</span>
          </div>

          <div class="auto-content">
            <p>使用AI模型实时翻译应用内容</p>

            <h4>代表库</h4>
            <ul>
              <li><strong>i18next-chained-backend</strong> + 翻译API</li>
              <li><strong>LinguiJS</strong> + ChatGPT插件</li>
              <li><strong>Mozilla Pontoon</strong> - 开源本地化平台</li>
            </ul>

            <h4>集成AI服务</h4>
            <div class="ai-services">
              <div class="service">
                <div class="service-logo">G</div>
                <div class="service-name">Google Translate API</div>
              </div>
              <div class="service">
                <div class="service-logo">A</div>
                <div class="service-name">Azure Translator</div>
              </div>
              <div class="service">
                <div class="service-logo">D</div>
                <div class="service-name">DeepL API</div>
              </div>
            </div>

            <h4>代码示例</h4>
            <pre><code>// 使用i18next和Google翻译API
i18next
  .use(Backend)
  .init({
    backend: {
      loadPath: 'https://translation-api.com/&#123;&#123; lng &#125;&#125;/&#123;&#123; ns &#125;&#125;',
      // 添加AI翻译选项
      aiTranslation: {
        provider: 'google',
        apiKey: 'YOUR_API_KEY',
        fallbackLng: 'en'
      }
    }
  });</code></pre>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">
        <span class="icon">🔍</span>
        其他创新方案
      </h2>

      <div class="innovation-grid">
        <div class="innovation-card">
          <div class="innovation-header">
            <div class="innovation-icon">💾</div>
            <h3>CDN动态加载</h3>
          </div>
          <p>从CDN按需加载语言包，减少初始加载时间</p>
          <div class="innovation-footer">
            <span class="tag">优化性能</span>
          </div>
        </div>

        <div class="innovation-card">
          <div class="innovation-header">
            <div class="innovation-icon">🧩</div>
            <h3>组件级国际化</h3>
          </div>
          <p>将翻译文件与组件放在一起，简化维护</p>
          <div class="innovation-footer">
            <span class="tag">微前端友好</span>
          </div>
        </div>

        <div class="innovation-card">
          <div class="innovation-header">
            <div class="innovation-icon">📱</div>
            <h3>混合模式</h3>
          </div>
          <p>AI翻译 + 人工校对，保证质量与效率</p>
          <div class="innovation-footer">
            <span class="tag">平衡方案</span>
          </div>
        </div>

        <div class="innovation-card">
          <div class="innovation-header">
            <div class="innovation-icon">🛠️</div>
            <h3>低代码解决方案</h3>
          </div>
          <p>Phrase, Lokalise等平台提供完整解决方案</p>
          <div class="innovation-footer">
            <span class="tag">企业级</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">
        <span class="icon">📊</span>
        方案对比与选择
      </h2>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>方案类型</th>
              <th>易用性</th>
              <th>维护成本</th>
              <th>翻译质量</th>
              <th>适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>传统i18n</td>
              <td>⭐️⭐️⭐️⭐️</td>
              <td>中</td>
              <td>高（人工翻译）</td>
              <td>中小项目，需要高质量翻译</td>
            </tr>
            <tr>
              <td>自动提取插件</td>
              <td>⭐️⭐️⭐️</td>
              <td>低</td>
              <td>依赖人工</td>
              <td>大型项目，频繁更新内容</td>
            </tr>
            <tr>
              <td>AI翻译库</td>
              <td>⭐️⭐️⭐️⭐️</td>
              <td>极低</td>
              <td>中（需校对）</td>
              <td>快速原型，内容量大</td>
            </tr>
            <tr>
              <td>混合模式</td>
              <td>⭐️⭐️⭐️</td>
              <td>中高</td>
              <td>高</td>
              <td>企业级应用，多语言支持</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="selection-guide">
        <h3>选择指南</h3>
        <div class="guide-steps">
          <div class="guide-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>评估需求</h4>
              <p>确定支持语言数量、更新频率和质量要求</p>
            </div>
          </div>
          <div class="guide-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>考虑团队</h4>
              <p>是否有翻译团队？开发人员熟悉哪种方案？</p>
            </div>
          </div>
          <div class="guide-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>预算限制</h4>
              <p>AI翻译API有成本，人工翻译费用更高</p>
            </div>
          </div>
          <div class="guide-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>长期维护</h4>
              <p>选择与项目架构匹配的可持续方案</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">
        <span class="icon">🚀</span>
        最佳实践
      </h2>

      <div class="best-practices">
        <div class="practice-card">
          <div class="practice-icon">🔑</div>
          <div class="practice-content">
            <h3>键名规范</h3>
            <p>使用有意义的键名：<code>navbar.home</code>而非<code>home</code></p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">📝</div>
          <div class="practice-content">
            <h3>上下文信息</h3>
            <p>为翻译人员提供上下文，避免歧义</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">📏</div>
          <div class="practice-content">
            <h3>设计留白</h3>
            <p>不同语言文本长度差异可达300%，UI需有弹性</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">🔄</div>
          <div class="practice-content">
            <h3>持续更新</h3>
            <p>建立流程确保新增文本及时翻译</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">🌍</div>
          <div class="practice-content">
            <h3>文化适配</h3>
            <p>本地化不仅仅是翻译，包括日期、货币等格式</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">🧪</div>
          <div class="practice-content">
            <h3>测试覆盖</h3>
            <p>自动化测试确保所有语言包完整</p>
          </div>
        </div>
      </div>

      <div class="conclusion">
        <div class="conclusion-icon">💡</div>
        <div class="conclusion-content">
          <h3>专家建议</h3>
          <p>
            对于新项目，推荐使用<strong>vue-i18n</strong>或<strong>react-i18next</strong>作为基础，结合<strong>i18next-parser</strong>自动提取文本。大型项目可考虑集成AI翻译API进行初稿翻译，再由人工校对，平衡效率与质量。
          </p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>前端国际化解决方案 · 让应用无国界</p>
      <div class="footer-links">
        <a href="#">vue-i18n文档</a> ·
        <a href="#">i18next学习</a> ·
        <a href="#">AI翻译比较</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 不需要实际逻辑，仅用于演示
import { ref } from 'vue';

const activeTab = ref('traditional');
</script>

<style lang="less" scoped>
@font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@text-primary: #2b2d42;
@text-secondary: #5c677d;
@border-color: #e1e4e8;
@background-light: #f8f9fa;
@card-bg: #ffffff;
@ai-color: #7209b7;
@popular-color: #ff9e00;
@success-color: #4cc9f0;

.i18n-container {
  font-family: @font-family;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
}

.header {
  text-align: center;
  background: linear-gradient(135deg, lighten(@primary-color, 40%), lighten(@primary-color, 35%));
  border-radius: 16px;
  padding: 40px 30px;
  margin-bottom: 30px;
  border: 1px solid fade(@primary-color, 15%);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: darken(@primary-color, 20%);
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-secondary;
    margin-bottom: 30px;
  }
}

.stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 15px;
  background: white;
  border-radius: 12px;
  padding: 15px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  min-width: 220px;

  .stat-icon {
    font-size: 1.8rem;
    width: 40px;
    height: 40px;
    background: fade(@primary-color, 10%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-value {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 2px;
    color: @text-primary;
  }

  .stat-label {
    color: @text-secondary;
    font-size: 0.85rem;
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .section-title {
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid fade(@primary-color, 10%);
    display: flex;
    align-items: center;
    gap: 10px;

    .icon {
      font-size: 1.4rem;
    }
  }
}

.reasons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
}

.reason-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-top: 4px solid fade(@primary-color, 50%);
  transition: transform 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }

  .reason-icon {
    font-size: 2.2rem;
    margin-bottom: 15px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: @text-primary;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    color: @text-secondary;
    font-size: 0.95rem;
  }
}

.solution-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.solution-header {
  background: linear-gradient(135deg, @primary-color, darken(@primary-color, 10%));
  color: white;
  padding: 20px 25px;
  display: flex;
  align-items: center;
  gap: 15px;

  .solution-icon {
    font-size: 1.2rem;
    font-weight: bold;
    background: white;
    color: @primary-color;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    margin: 0;
    font-size: 1.4rem;
    flex: 1;
  }

  .tag {
    background: white;
    color: @popular-color;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;

    &.popular {
      background: #fff3e0;
      color: @popular-color;
    }
  }
}

.solution-content {
  padding: 25px;

  h4 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 1.1rem;
    color: @text-primary;
    padding-bottom: 5px;
    border-bottom: 1px solid @border-color;
  }

  ul {
    padding-left: 20px;
    margin: 15px 0;

    li {
      margin-bottom: 8px;
      line-height: 1.5;
    }
  }
}

.libraries {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin: 15px 0;
}

.library {
  display: flex;
  align-items: center;
  gap: 12px;
  background: fade(@primary-color, 5%);
  border-radius: 10px;
  padding: 12px 15px;
  flex: 1;
  min-width: 200px;

  .library-icon {
    font-size: 1.1rem;
    font-weight: bold;
    background: fade(@primary-color, 15%);
    color: @primary-color;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .name {
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 3px;
  }

  .stats {
    font-size: 0.8rem;
    color: @text-secondary;
    margin: 0;
    display: block;
  }
}

pre,
code {
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
}

pre {
  background: #2b2d42;
  color: #edf2f4;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 15px 0;

  code {
    background: transparent;
    padding: 0;
  }
}

.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.auto-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.auto-header {
  padding: 18px 22px;
  display: flex;
  align-items: center;
  gap: 12px;

  .auto-icon {
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    background: fade(@ai-color, 10%);
    color: @ai-color;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    margin: 0;
    font-size: 1.3rem;
    flex: 1;
    color: @text-primary;
  }

  .tag {
    background: #f0e6ff;
    color: @ai-color;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;

    &.ai {
      background: #f0e6ff;
      color: @ai-color;
    }

    &.new {
      background: #e0f7fa;
      color: #00838f;
    }
  }
}

.auto-content {
  padding: 20px;
}

.workflow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  background: fade(@primary-color, 5%);
  border-radius: 10px;
  padding: 15px;
}

.step {
  text-align: center;
  flex: 1;

  .step-number {
    width: 32px;
    height: 32px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin: 0 auto 8px;
  }

  .step-text {
    font-size: 0.9rem;
  }
}

.step-arrow {
  color: @text-secondary;
  font-size: 1.2rem;
  margin: 0 5px;
}

.ai-services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
  margin: 15px 0;
}

.service {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: fade(@ai-color, 5%);
  border-radius: 8px;

  .service-logo {
    font-size: 1.2rem;
    font-weight: bold;
    width: 40px;
    height: 40px;
    background: fade(@ai-color, 15%);
    color: @ai-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .service-name {
    font-size: 0.85rem;
    text-align: center;
    font-weight: 500;
  }
}

.innovation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.innovation-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-top: 3px solid fade(@success-color, 50%);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
}

.innovation-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;

  .innovation-icon {
    font-size: 1.4rem;
    width: 40px;
    height: 40px;
    background: fade(@success-color, 15%);
    color: darken(@success-color, 20%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: @text-primary;
  }
}

.innovation-footer {
  margin-top: 15px;

  .tag {
    background: fade(@success-color, 15%);
    color: darken(@success-color, 20%);
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
  }
}

.comparison-table {
  overflow-x: auto;
  margin: 25px 0;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: fade(@primary-color, 5%);
      font-weight: 600;
      color: @text-primary;
    }

    tr:hover {
      background: fade(@primary-color, 3%);
    }
  }
}

.selection-guide {
  margin-top: 30px;
}

.guide-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.guide-step {
  display: flex;
  gap: 15px;

  .step-number {
    width: 32px;
    height: 32px;
    background: fade(@primary-color, 10%);
    color: @primary-color;
    border-radius: 50%;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 3px;
  }

  h4 {
    margin: 0 0 5px 0;
    font-size: 1.05rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: @text-secondary;
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 18px;
  margin-top: 20px;
}

.practice-card {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  background: white;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border-left: 3px solid @success-color;

  .practice-icon {
    font-size: 1.4rem;
    color: @success-color;
    margin-top: 3px;
  }

  h3 {
    margin: 0 0 8px 0;
    font-size: 1.05rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: @text-secondary;

    code {
      background: fade(@success-color, 10%);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.85rem;
      color: darken(@success-color, 20%);
    }
  }
}

.conclusion {
  display: flex;
  gap: 18px;
  margin-top: 30px;
  background: fade(@primary-color, 5%);
  border-radius: 12px;
  padding: 22px;
  border-left: 4px solid @primary-color;

  .conclusion-icon {
    font-size: 1.8rem;
    color: @primary-color;
    margin-top: 3px;
  }

  h3 {
    margin: 0 0 10px 0;
    color: @text-primary;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: @text-primary;

    strong {
      color: @primary-color;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: @text-secondary;
  font-size: 0.9rem;

  .footer-links {
    margin-top: 10px;

    a {
      color: @primary-color;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .section {
    padding: 20px 15px;

    .section-title {
      font-size: 1.4rem;
    }
  }

  .auto-grid {
    grid-template-columns: 1fr;
  }

  .libraries,
  .library {
    min-width: auto;
  }

  .solution-content,
  .auto-content {
    padding: 20px 15px;
  }

  pre {
    font-size: 0.8rem;
    padding: 12px;
  }
}
</style>
