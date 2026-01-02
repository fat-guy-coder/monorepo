<template>
  <div class="low-code-container">
    <header class="header">
      <h1>低代码开发平台基础介绍</h1>
      <p class="subtitle">可视化开发、快速交付、降低技术门槛</p>
    </header>

    <div class="content">
      <section class="card concept">
        <div class="concept-content">
          <div class="concept-text">
            <h2>什么是低代码？</h2>
            <p>低代码（Low-Code）是一种可视化应用开发方法，使开发者能够通过图形界面和配置代替传统手工编码，快速构建应用软件。</p>
            <p class="highlight">低代码平台的核心价值：</p>
            <ul>
              <li>减少70%-80%的手工编码工作量</li>
              <li>加速应用开发与交付速度</li>
              <li>降低技术门槛，业务人员可参与开发</li>
              <li>提升开发过程的可视化和协作能力</li>
            </ul>
          </div>
          <div class="concept-image">
            <div class="development-pyramid">
              <div class="layer layer-1">
                <div class="title">传统编码</div>
                <div class="desc">100% 手工编码</div>
              </div>
              <div class="layer layer-2">
                <div class="title">低代码</div>
                <div class="desc">30% 编码 + 70% 配置</div>
              </div>
              <div class="layer layer-3">
                <div class="title">无代码</div>
                <div class="desc">100% 可视化配置</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="card architecture">
        <h2>低代码平台核心架构</h2>
        <div class="architecture-content">
          <div class="architecture-diagram">
            <div class="layer user-interface">
              <div class="title">用户界面层</div>
              <div class="components">
                <div class="component">可视化设计器 </div>
                <div class="component">应用预览</div>
                <div class="component">调试工具</div>
              </div>
            </div>
            <div class="layer core-engine">
              <div class="title">核心引擎层</div>
              <div class="components">
                <div class="component">元数据引擎</div>
                <div class="component">流程引擎</div>
                <div class="component">规则引擎</div>
                <div class="component">表单引擎</div>
              </div>
            </div>
            <div class="layer services">
              <div class="title">服务层</div>
              <div class="components">
                <div class="component">API集成</div>
                <div class="component">数据连接器</div>
                <div class="component">用户权限</div>
                <div class="component">部署管理</div>
              </div>
            </div>
            <div class="layer infrastructure">
              <div class="title">基础设施层</div>
              <div class="components">
                <div class="component">云服务</div>
                <div class="component">数据库</div>
                <div class="component">容器化</div>
              </div>
            </div>
          </div>

          <div class="architecture-desc">
            <h3>关键技术实现原理</h3>
            <div class="principles">
              <div class="principle">
                <div class="icon">🧩</div>
                <h4>元数据驱动</h4>
                <p>所有应用元素抽象为元数据存储，运行时动态解析</p>
              </div>
              <div class="principle">
                <div class="icon">🔄</div>
                <h4>可视化建模</h4>
                <p>拖拽式界面设计，实时生成配置数据</p>
              </div>
              <div class="principle">
                <div class="icon">⚙️</div>
                <h4>模型转换引擎</h4>
                <p>将可视化模型转换为可执行代码</p>
              </div>
              <div class="principle">
                <div class="icon">🔌</div>
                <h4>API集成</h4>
                <p>预置连接器对接第三方系统和数据源</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="card workflow">
        <h2>低代码开发工作流程</h2>
        <div class="workflow-steps">
          <div class="step">
            <div class="step-icon">1</div>
            <h3>需求分析</h3>
            <p>明确业务需求和应用目标</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-icon">2</div>
            <h3>数据建模</h3>
            <p>定义数据结构和关系</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-icon">3</div>
            <h3>界面设计</h3>
            <p>拖拽组件构建用户界面</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-icon">4</div>
            <h3>逻辑编排</h3>
            <p>可视化配置业务逻辑</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-icon">5</div>
            <h3>测试部署</h3>
            <p>一键测试并发布应用</p>
          </div>
        </div>

        <div class="workflow-demo">
          <h3>示例：用户注册流程可视化配置</h3>
          <div class="demo-content">
            <div class="logic-flow">
              <div class="node start">开始</div>
              <div class="arrow">→</div>
              <div class="node form">表单验证</div>
              <div class="arrow">→</div>
              <div class="node db">保存数据</div>
              <div class="arrow">→</div>
              <div class="node email">发送邮件</div>
              <div class="arrow">→</div>
              <div class="node end">结束</div>
            </div>
            <div class="config-panel">
              <pre class="code-block">{
  "process": "用户注册",
  "steps": [
    {
      "type": "form",
      "fields": ["username", "password", "email"],
      "validations": [
        { "field": "email", "rule": "email" }
      ]
    },
    {
      "type": "database",
      "action": "create",
      "model": "User"
    },
    {
      "type": "email",
      "template": "welcome_email",
      "recipient": "${form.email}"
    }
  ]
}</pre>
            </div>
          </div>
        </div>
      </section>

      <section class="card use-cases">
        <h2>低代码典型应用场景</h2>
        <div class="case-cards">
          <div class="case-card">
            <div class="case-icon">📝</div>
            <h3>业务流程管理</h3>
            <p>审批流、报销流程、请假系统等</p>
            <div class="case-stats">
              <div class="stat">开发效率提升 <span>5-10倍</span></div>
            </div>
          </div>
          <div class="case-card">
            <div class="case-icon">📊</div>
            <h3>数据看板</h3>
            <p>业务数据可视化、实时报表</p>
            <div class="case-stats">
              <div class="stat">开发时间减少 <span>70%</span></div>
            </div>
          </div>
          <div class="case-card">
            <div class="case-icon">🛒</div>
            <h3>电商应用</h3>
            <p>商品管理、订单处理、客户服务</p>
            <div class="case-stats">
              <div class="stat">迭代速度提升 <span>3-5倍</span></div>
            </div>
          </div>
          <div class="case-card">
            <div class="case-icon">🏢</div>
            <h3>企业内部系统</h3>
            <p>CRM、ERP、HR管理系统</p>
            <div class="case-stats">
              <div class="stat">成本降低 <span>40-60%</span></div>
            </div>
          </div>
          <div class="case-card">
            <div class="case-icon">📱</div>
            <h3>移动应用</h3>
            <p>跨平台移动应用快速开发</p>
            <div class="case-stats">
              <div class="stat">开发周期缩短 <span>50-80%</span></div>
            </div>
          </div>
          <div class="case-card">
            <div class="case-icon">🔄</div>
            <h3>系统集成</h3>
            <p>连接不同系统，实现数据互通</p>
            <div class="case-stats">
              <div class="stat">集成效率提升 <span>3-4倍</span></div>
            </div>
          </div>
        </div>
      </section>

      <section class="card pros-cons">
        <h2>低代码平台优缺点分析</h2>
        <div class="comparison">
          <div class="pros">
            <h3>✅ 优势</h3>
            <ul>
              <li>
                <strong>开发效率提升</strong>
                <p>相比传统开发，效率提升5-10倍</p>
              </li>
              <li>
                <strong>降低技术门槛</strong>
                <p>业务人员可参与应用开发</p>
              </li>
              <li>
                <strong>降低开发成本</strong>
                <p>减少专业开发人员投入</p>
              </li>
              <li>
                <strong>快速迭代能力</strong>
                <p>业务需求变化时可快速调整</p>
              </li>
              <li>
                <strong>统一技术栈</strong>
                <p>平台提供标准化解决方案</p>
              </li>
            </ul>
          </div>
          <div class="cons">
            <h3>⚠️ 挑战与局限</h3>
            <ul>
              <li>
                <strong>复杂逻辑实现困难</strong>
                <p>高度定制化需求难以满足</p>
              </li>
              <li>
                <strong>平台锁定风险</strong>
                <p>应用与平台绑定，迁移成本高</p>
              </li>
              <li>
                <strong>性能问题</strong>
                <p>自动生成代码可能不如手工优化</p>
              </li>
              <li>
                <strong>扩展性限制</strong>
                <p>超出平台能力时难以扩展</p>
              </li>
              <li>
                <strong>安全性与合规性</strong>
                <p>依赖平台的安全保障措施</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="selection-guide">
          <h3>低代码平台选型指南</h3>
          <div class="guide-points">
            <div class="point">
              <div class="point-icon">1</div>
              <p>评估业务需求复杂度</p>
            </div>
            <div class="point">
              <div class="point-icon">2</div>
              <p>考察平台扩展能力</p>
            </div>
            <div class="point">
              <div class="point-icon">3</div>
              <p>检查系统集成能力</p>
            </div>
            <div class="point">
              <div class="point-icon">4</div>
              <p>验证安全与合规标准</p>
            </div>
            <div class="point">
              <div class="point-icon">5</div>
              <p>评估长期维护成本</p>
            </div>
          </div>
        </div>
      </section>

      <section class="card market">
        <h2>低代码市场与发展趋势</h2>
        <div class="market-content">
          <div class="market-stats">
            <div class="stat-card">
              <div class="stat-value">$187亿</div>
              <div class="stat-label">2023年全球市场规模</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">65%</div>
              <div class="stat-label">企业采用低代码开发</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">26.1%</div>
              <div class="stat-label">年复合增长率 (2020-2027)</div>
            </div>
          </div>

          <div class="trends">
            <h3>未来发展趋势</h3>
            <ul>
              <li>
                <strong>AI增强开发</strong> - 结合AI实现智能代码生成和建议
              </li>
              <li>
                <strong>垂直行业解决方案</strong> - 针对特定行业的低代码平台
              </li>
              <li>
                <strong>融合开发模式</strong> - 低代码与传统代码开发融合
              </li>
              <li>
                <strong>移动优先</strong> - 增强移动端开发能力
              </li>
              <li>
                <strong>生态扩展</strong> - 建立组件市场和开发者社区
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>低代码开发平台 | 加速数字化转型，释放创新潜力</p>
      <div class="links">
        <a href="https://www.outsystems.com/" target="_blank">OutSystems</a>
        <a href="https://www.mendix.com/" target="_blank">Mendix</a>
        <a href="https://powerplatform.microsoft.com/" target="_blank">Microsoft Power Platform</a>
        <a href="https://www.appian.com/" target="_blank">Appian</a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// 示例响应式数据
const activeTab = ref('concept');

onMounted(() => {
  console.log('低代码平台介绍组件已挂载');
});
</script>

<style lang="less" scoped>


* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.low-code-container {
  font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
  color: #334155;
  min-height: 100vh;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  border-bottom: 1px solid #e2e8f0;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 12px;
    font-weight: 700;
    color: #1e293b;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e2e8f0;
    color: #1e293b;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 80px;
      height: 2px;
      background: #3b82f6;
    }
  }
}

.concept {
  .concept-content {
    display: flex;
    gap: 30px;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .concept-text {
    flex: 1;

    p {
      margin-bottom: 20px;
      font-size: 1.1rem;
      color: #475569;
    }

    .highlight {
      font-weight: 600;
      color: #3b82f6;
      margin: 25px 0 15px;
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 12px;
        padding-left: 25px;
        position: relative;
        line-height: 1.7;

        &::before {
          content: '▹';
          position: absolute;
          left: 0;
          color: #3b82f6;
          font-weight: bold;
        }
      }
    }
  }

  .concept-image {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .development-pyramid {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .layer {
      padding: 25px;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
      color: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: rgba(255, 255, 255, 0.3);
      }

      &:hover {
        transform: translateX(10px);
      }

      .title {
        font-size: 1.3rem;
        margin-bottom: 8px;
      }

      .desc {
        font-size: 0.95rem;
        opacity: 0.9;
      }
    }

    .layer-1 {
      background: linear-gradient(135deg, #ef4444, #f87171);
      z-index: 4;
    }

    .layer-2 {
      background: linear-gradient(135deg, #3b82f6, #60a5fa);
      margin-left: 20px;
      z-index: 3;
    }

    .layer-3 {
      background: linear-gradient(135deg, #10b981, #34d399);
      margin-left: 40px;
      z-index: 2;
    }
  }
}

.architecture {
  .architecture-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .architecture-diagram {
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: #f1f5f9;
    border-radius: 12px;
    padding: 25px;
    border: 1px solid #e2e8f0;

    .layer {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      .title {
        font-weight: 700;
        margin-bottom: 15px;
        color: #3b82f6;
        padding-bottom: 10px;
        border-bottom: 1px solid #e2e8f0;
      }

      .components {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;

        .component {
          background: #dbeafe;
          color: #1d4ed8;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
        }
      }
    }

    .user-interface {
      background: linear-gradient(to right, #f0f9ff, #e0f2fe);
    }

    .core-engine {
      background: linear-gradient(to right, #f0fdf4, #dcfce7);
    }

    .services {
      background: linear-gradient(to right, #fdf2f8, #fce7f3);
    }

    .infrastructure {
      background: linear-gradient(to right, #fffbeb, #fef3c7);
    }
  }

  .architecture-desc {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
    }
  }

  .principles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;

    .principle {
      background: white;
      border-radius: 10px;
      padding: 25px;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
      text-align: center;

      &:hover {
        border-color: #3b82f6;
        box-shadow: 0 6px 15px rgba(59, 130, 246, 0.1);
      }

      .icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }

      h4 {
        font-size: 1.3rem;
        margin-bottom: 10px;
        color: #1e293b;
      }

      p {
        color: #64748b;
        font-size: 0.95rem;
      }
    }
  }
}

.workflow {
  .workflow-steps {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 30px 0;

    @media (max-width: 900px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .step {
    text-align: center;
    padding: 20px;
    background: #f0f7ff;
    border-radius: 10px;
    min-width: 150px;
    transition: all 0.3s ease;
    border: 1px solid #b4d0ff;

    @media (max-width: 900px) {
      margin-bottom: 20px;
    }

    &:hover {
      background: #d6e7ff;
      transform: translateY(-5px);
    }

    .step-icon {
      width: 40px;
      height: 40px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin: 0 auto 15px;
      font-size: 1.2rem;
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 10px;
      color: #1e293b;
    }

    p {
      font-size: 0.95rem;
      color: #64748b;
    }
  }

  .step-arrow {
    font-size: 1.8rem;
    color: #94a3b8;
    padding: 0 10px;

    @media (max-width: 900px) {
      transform: rotate(90deg);
      margin: -10px auto;
      padding: 10px 0;
    }
  }

  .workflow-demo {
    margin-top: 40px;
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
    }
  }

  .demo-content {
    display: flex;
    gap: 30px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .logic-flow {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 8px;
    padding: 30px 20px;
    border: 1px solid #e2e8f0;

    .node {
      background: #3b82f6;
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      font-weight: 600;
      min-width: 100px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
    }

    .arrow {
      padding: 0 15px;
      color: #94a3b8;
      font-weight: bold;
    }
  }

  .config-panel {
    flex: 1;
  }
}

.use-cases {
  .case-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .case-card {
    background: white;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
      border-color: #3b82f6;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: #3b82f6;
    }

    .case-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
      color: #3b82f6;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 12px;
      color: #1e293b;
    }

    p {
      color: #64748b;
      margin-bottom: 20px;
      font-size: 0.95rem;
    }
  }

  .case-stats {
    background: #f1f5f9;
    border-radius: 6px;
    padding: 10px;

    .stat {
      font-size: 0.9rem;
      color: #475569;

      span {
        font-weight: bold;
        color: #3b82f6;
        margin-left: 5px;
      }
    }
  }
}

.pros-cons {
  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .pros,
  .cons {
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid;
    }
  }

  .pros {
    border-top: 4px solid #10b981;

    h3 {
      color: #10b981;
      border-bottom-color: #10b981;
    }
  }

  .cons {
    border-top: 4px solid #ef4444;

    h3 {
      color: #ef4444;
      border-bottom-color: #ef4444;
    }
  }

  ul {
    list-style: none;

    li {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e2e8f0;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      strong {
        display: block;
        font-size: 1.1rem;
        margin-bottom: 8px;
        color: #1e293b;
      }

      p {
        color: #64748b;
        font-size: 0.95rem;
      }
    }
  }

  .selection-guide {
    background: #f0f7ff;
    border-radius: 10px;
    padding: 25px;
    border-left: 4px solid #3b82f6;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
    }
  }

  .guide-points {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 15px;

    .point {
      background: white;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      }

      .point-icon {
        width: 40px;
        height: 40px;
        background: #3b82f6;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin: 0 auto 15px;
        font-size: 1.2rem;
      }

      p {
        font-weight: 500;
        color: #475569;
      }
    }
  }
}

.market {
  .market-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .market-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;

    .stat-card {
      background: white;
      border-radius: 10px;
      padding: 25px;
      text-align: center;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
      }

      .stat-value {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 10px;
        color: #3b82f6;
      }

      .stat-label {
        color: #64748b;
        font-size: 1rem;
      }
    }
  }

  .trends {
    background: #f0f7ff;
    border-radius: 10px;
    padding: 25px;
    border-left: 4px solid #3b82f6;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
    }

    ul {
      list-style: none;

      li {
        margin-bottom: 15px;
        padding-left: 30px;
        position: relative;
        line-height: 1.7;

        &::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #3b82f6;
          font-weight: bold;
        }

        strong {
          color: #1d4ed8;
        }
      }
    }
  }
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 18px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  margin: 15px 0;
  line-height: 1.5;
  border: 1px solid #334155;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px 8px 0 0;
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 30px 0;
  border-top: 1px solid #e2e8f0;
  color: #64748b;

  .links {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;

    a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
      position: relative;
      padding: 5px 10px;

      &::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 0;
        height: 2px;
        background: #3b82f6;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }
    }
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2.2rem;
  }

  .workflow-steps {
    .step-arrow {
      margin: 10px auto;
    }
  }
}
</style>
