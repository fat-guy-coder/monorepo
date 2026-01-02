<template>
  <div class="container">
    <header class="header">
      <h1 class="title">Restful 与 GraphQL 对比</h1>
      <p class="subtitle">API设计风格的异同与选择指南</p>
    </header>

    <main class="main-content">
      <!-- 基本介绍 -->
      <section class="section">
        <h2 class="section-title">什么是Restful和GraphQL？</h2>
        <div class="section-content">
          <div class="intro-grid">
            <div class="intro-card">
              <h3>Restful API</h3>
              <p>
                表现层状态转移（REST）是一种软件架构风格，基于HTTP协议设计，
                使用标准的HTTP方法（GET、POST、PUT、DELETE等）操作资源， 每个资源对应一个特定的URL。
              </p>
              <div class="code-example">
                <pre><code>// 获取用户列表
GET /api/users

// 获取特定用户
GET /api/users/123

// 创建用户
POST /api/users

// 更新用户
PUT /api/users/123

// 删除用户
DELETE /api/users/123</code></pre>
              </div>
            </div>
            <div class="intro-card">
              <h3>GraphQL</h3>
              <p>
                GraphQL是一种API查询语言和运行时，由Facebook开发，
                允许客户端精确指定需要获取的数据，通过单一端点提供灵活的数据查询能力，
                避免了过度获取或获取不足的问题。
              </p>
              <div class="code-example">
                <pre><code>// 查询特定用户的指定字段
query {
  user(id: "123") {
    name
    email
    posts {
      title
    }
  }
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心作用 -->
      <section class="section">
        <h2 class="section-title">核心作用</h2>
        <div class="section-content">
          <div class="purpose-grid">
            <div class="purpose-card">
              <h3>Restful API 的核心作用</h3>
              <ul>
                <li>通过标准HTTP方法实现资源的CRUD操作</li>
                <li>利用URL路径标识资源和资源间关系</li>
                <li>使用HTTP状态码表示请求结果状态</li>
                <li>通过内容协商实现数据格式灵活性</li>
                <li>基于无状态原则设计，便于缓存和扩展</li>
              </ul>
            </div>
            <div class="purpose-card">
              <h3>GraphQL 的核心作用</h3>
              <ul>
                <li>允许客户端精确指定所需数据结构</li>
                <li>通过单一端点提供所有数据查询能力</li>
                <li>支持复杂数据关系的一次性查询</li>
                <li>使用类型系统定义API契约</li>
                <li>提供实时数据订阅功能</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用难易度 -->
      <section class="section">
        <h2 class="section-title">使用难易度</h2>
        <div class="section-content">
          <div class="difficulty-grid">
            <div class="difficulty-card">
              <h3>Restful API</h3>
              <div class="difficulty-meter">
                <div class="meter-label">入门难度</div>
                <div class="meter-bar low">
                  <div class="meter-fill" style="width: 30%"></div>
                </div>
              </div>
              <ul class="difficulty-points">
                <li>概念简单直观，易于理解</li>
                <li>与HTTP协议紧密结合，开发者熟悉度高</li>
                <li>无需学习新的查询语言</li>
                <li>成熟的工具链和文档支持</li>
                <li>复杂系统中API设计和版本管理难度增加</li>
              </ul>
            </div>
            <div class="difficulty-card">
              <h3>GraphQL</h3>
              <div class="difficulty-meter">
                <div class="meter-label">入门难度</div>
                <div class="meter-bar medium">
                  <div class="meter-fill" style="width: 60%"></div>
                </div>
              </div>
              <ul class="difficulty-points">
                <li>需要学习新的查询语言和类型系统</li>
                <li>客户端和服务器端都需要额外工具支持</li>
                <li>初期配置和类型定义工作量较大</li>
                <li>复杂查询可能导致性能优化挑战</li>
                <li>长期来看，灵活的查询能力可能降低维护成本</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点对比 -->
      <section class="section">
        <h2 class="section-title">优缺点对比</h2>
        <div class="section-content">
          <div class="pros-cons-grid">
            <div class="pros-cons-card">
              <h3>Restful API</h3>
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>符合HTTP规范，缓存机制成熟</li>
                  <li>易于理解和上手，开发成本低</li>
                  <li>各端点可独立部署和扩展</li>
                  <li>清晰的资源导向设计</li>
                  <li>广泛的工具和生态系统支持</li>
                  <li>适合简单的数据获取场景</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>过度获取或获取不足数据</li>
                  <li>复杂数据关系需要多次请求</li>
                  <li>API版本管理复杂</li>
                  <li>扩展字段需修改所有相关端点</li>
                  <li>前端需求变化可能需要频繁调整API</li>
                </ul>
              </div>
            </div>
            <div class="pros-cons-card">
              <h3>GraphQL</h3>
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>客户端可精确获取所需数据</li>
                  <li>单一端点减少网络请求次数</li>
                  <li>类型系统提供清晰的API契约</li>
                  <li>前端可自主调整数据需求，无需等待后端</li>
                  <li>内置的自省功能便于文档生成</li>
                  <li>支持实时数据订阅</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>缓存实现复杂</li>
                  <li>可能导致复杂查询的性能问题</li>
                  <li>学习曲线较陡</li>
                  <li>文件上传等功能需要额外处理</li>
                  <li>不适合简单场景，有过度设计之嫌</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 适用场景 -->
      <section class="section">
        <h2 class="section-title">适用场景</h2>
        <div class="section-content">
          <div class="use-cases-grid">
            <div class="use-case-card">
              <h3>优先选择 Restful API 的场景</h3>
              <ul>
                <li>简单的CRUD操作应用</li>
                <li>需要充分利用HTTP缓存机制的场景</li>
                <li>团队熟悉HTTP协议，希望降低学习成本</li>
                <li>API功能相对稳定，变化不频繁</li>
                <li>需要对不同资源进行独立权限控制</li>
                <li>服务端渲染(SSR)应用</li>
                <li>资源导向的简单应用</li>
              </ul>
            </div>
            <div class="use-case-card">
              <h3>优先选择 GraphQL 的场景</h3>
              <ul>
                <li>数据需求复杂且多变的应用</li>
                <li>移动应用(减少带宽使用)</li>
                <li>需要聚合多个数据源的场景</li>
                <li>前端团队希望自主控制数据获取</li>
                <li>实时数据更新需求高的应用</li>
                <li>API版本管理复杂的大型应用</li>
                <li>需要频繁迭代和快速适应变化的产品</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结建议 -->
      <section class="section">
        <h2 class="section-title">总结与选择建议</h2>
        <div class="section-content summary-card">
          <p>
            Restful和GraphQL并非相互替代的技术，而是各有优势的API设计方案。选择时应根据项目特点、团队熟悉度和实际需求综合考虑：
          </p>
          <ul class="summary-points">
            <li><strong>小型项目或快速原型</strong>：优先考虑Restful，开发速度快，学习成本低</li>
            <li><strong>大型复杂应用</strong>：可考虑GraphQL，尤其是前端需求多变的场景</li>
            <li><strong>混合策略</strong>：不必局限于单一方案，可在不同模块使用最适合的API风格</li>
            <li><strong>团队因素</strong>：选择团队更熟悉的技术，或有足够时间学习新技术</li>
            <li><strong>渐进式采用</strong>：可先在部分功能中尝试GraphQL，验证其价值后再扩展</li>
          </ul>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>Restful与GraphQL对比介绍 &copy; {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑部分，当前为静态展示
</script>

<style scoped lang="less">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9fafb;
  color: #334155;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;

  .title {
    color: #1e293b;
    margin: 0 0 10px 0;
    font-size: 1.8rem;
  }

  .subtitle {
    color: #64748b;
    margin: 0;
    font-size: 1.1rem;
    font-weight: 400;
  }
}

.main-content {
  .section {
    margin-bottom: 40px;

    .section-title {
      color: #1e293b;
      border-bottom: 2px solid #dbeafe;
      padding-bottom: 8px;
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 1.4rem;
    }

    .section-content {
      background-color: #fff;
      padding: 25px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
  }

  .code-example {
    background-color: #f8fafc;
    border-radius: 6px;
    margin: 15px 0 0 0;
    overflow-x: auto;
    border: 1px solid #e2e8f0;

    pre {
      margin: 0;
      padding: 15px;

      code {
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        color: #0f172a;
      }
    }
  }

  .intro-grid,
  .purpose-grid,
  .difficulty-grid,
  .pros-cons-grid,
  .use-cases-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .intro-card,
  .purpose-card,
  .difficulty-card,
  .pros-cons-card,
  .use-case-card {
    background-color: #f8fafc;
    border-radius: 6px;
    padding: 20px;
    border: 1px solid #e2e8f0;

    h3 {
      margin-top: 0;
      color: #1e293b;
      margin-bottom: 15px;
      font-size: 1.2rem;
      padding-bottom: 8px;
      border-bottom: 1px dashed #e2e8f0;
    }

    ul {
      margin: 0;
      padding-left: 25px;

      li {
        margin-bottom: 8px;
        position: relative;

        &::before {
          content: '•';
          color: #6366f1;
          font-weight: bold;
          position: absolute;
          left: -20px;
        }
      }
    }
  }

  .difficulty-meter {
    margin-bottom: 15px;

    .meter-label {
      font-size: 0.9rem;
      color: #64748b;
      margin-bottom: 5px;
    }

    .meter-bar {
      height: 8px;
      background-color: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;

      &.low .meter-fill {
        background-color: #22c55e;
      }

      &.medium .meter-fill {
        background-color: #f59e0b;
      }

      &.high .meter-fill {
        background-color: #ef4444;
      }

      .meter-fill {
        height: 100%;
        transition: width 0.3s ease;
      }
    }
  }

  .pros-cons-card {
    .pros,
    .cons {
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      h4 {
        margin: 0 0 10px 0;
        font-size: 1rem;
        color: #1e293b;
      }

      ul {
        padding-left: 20px;
      }
    }

    .pros {
      color: #15803d;
    }

    .cons {
      color: #b91c1c;
    }
  }

  .summary-card {
    background-color: #eff6ff;
    border: 1px solid #dbeafe;

    .summary-points {
      padding-left: 25px;
      margin-top: 15px;

      li {
        margin-bottom: 10px;

        strong {
          color: #1e40af;
        }
      }
    }
  }
}

footer.footer {
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
  text-align: center;
  color: #94a3b8;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .intro-grid,
  .purpose-grid,
  .difficulty-grid,
  .pros-cons-grid,
  .use-cases-grid {
    grid-template-columns: 1fr;
  }

  .header .title {
    font-size: 1.5rem;
  }
}
</style>
