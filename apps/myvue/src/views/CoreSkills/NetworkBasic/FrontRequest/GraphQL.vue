<template>
  <div class="graphql-container">
    <header class="header">
      <h1> <svg width="28" height="28" viewBox="0 0 32 32" class="graphql-icon">
          <path fill="#E10098"
            d="M2 13.5h9.5v2.4H4.2v3.7h6.9v2.4H2zM16.7 22h2.4V10h-2.4zM22 10l-5.4 9.6h2.3l5.4-9.6zm7.5 13.5H20v-2.4h7.8v-3.7H21v-2.4h9.5z" />
        </svg> GraphQL 技术基本介绍</h1>
      <p class="subtitle">现代化API查询语言的基本介绍</p>
    </header>

    <div class="content-wrapper">
      <section class="section intro-section">
        <h2 class="section-title">什么是 GraphQL？</h2>
        <div class="definition-card">
          <p>GraphQL 是由 Facebook 于2015年开源的一种<strong>API查询语言</strong>和<strong>运行时环境</strong>，用于提供客户端所需数据的精确描述。</p>
        </div>

        <div class="core-concepts">
          <div class="concept">
            <div class="concept-icon">📜</div>
            <h3>查询语言</h3>
            <p>客户端指定所需数据的结构和字段</p>
          </div>
          <div class="concept">
            <div class="concept-icon">⚙️</div>
            <h3>运行时环境</h3>
            <p>服务器端解析查询并返回精确数据</p>
          </div>
          <div class="concept">
            <div class="concept-icon">🔍</div>
            <h3>类型系统</h3>
            <p>强类型模式定义API能力</p>
          </div>
        </div>
      </section>

      <div class="columns-container">
        <section class="section use-section column">
          <h2 class="section-title">GraphQL 基本使用</h2>

          <div class="example-container">
            <div class="example-row">
              <div class="example">
                <h3>1. 定义 Schema</h3>
                <pre class="code-block">type User {
  id: ID!
  name: String!
  email: String
  posts: [Post!]!
}
type Query {
  user(id: ID!): User
}</pre>
              </div>

              <div class="example">
                <h3>2. 客户端查询示例</h3>
                <pre class="code-block">query GetUserWithPosts {
  user(id: "123") {
    name
    email
    posts {
      title
      createdAt
    }
  }
}</pre>
              </div>
            </div>

            <div class="example-row">
              <div class="example">
                <h3>3. 返回结果</h3>
                <pre class="code-block">{
  "data": {
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "posts": [
        { "title": "GraphQL 入门", "createdAt": "2023-01-15" },
        { "title": "Vue与GraphQL整合", "createdAt": "2023-02-20" }
      ]
    }
  }
}</pre>
              </div>

              <div class="example">
                <h3>4. Vue中使用GraphQL</h3>
                <pre class="code-block">// 使用Apollo Client
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      name
      email
    }
  }
`

export default {
  setup() {
    const { result } = useQuery(
      GET_USER,
      { id: '123' }
    )

    return { result }
  }
}</pre>
              </div>
            </div>
          </div>
        </section>

        <section class="section scenarios-section column">
          <h2 class="section-title">适用场景</h2>

          <div class="scenario-cards">
            <div class="card">
              <div class="card-icon">📱</div>
              <h3>多平台应用</h3>
              <p>为移动端、Web端和桌面应用提供统一API</p>
            </div>

            <div class="card">
              <div class="card-icon">🚀</div>
              <h3>性能敏感场景</h3>
              <p>减少网络请求数量和传输数据量</p>
            </div>

            <div class="card">
              <div class="card-icon">🔄</div>
              <h3>快速迭代产品</h3>
              <p>前后端独立开发，无需频繁协调API变更</p>
            </div>

            <div class="card">
              <div class="card-icon">🧩</div>
              <h3>复杂数据需求</h3>
              <p>处理嵌套数据和关系型数据查询</p>
            </div>

            <div class="card">
              <div class="card-icon">🌐</div>
              <h3>微服务架构</h3>
              <p>聚合多个服务的API网关</p>
            </div>

            <div class="card">
              <div class="card-icon">📊</div>
              <h3>实时应用</h3>
              <p>通过Subscription实现实时数据更新</p>
            </div>
          </div>
        </section>
      </div>

      <section class="section pros-cons-section">
        <h2 class="section-title">GraphQL优缺点分析</h2>

        <div class="comparison">
          <div class="pros">
            <h3><span class="icon">✅</span> 优势</h3>
            <ul>
              <li><strong>精确获取数据</strong> - 客户端指定所需字段，避免过度获取</li>
              <li><strong>单一请求</strong> - 单个请求获取多个资源</li>
              <li><strong>强类型系统</strong> - 自动生成文档和类型检查</li>
              <li><strong>前后端解耦</strong> - 减少沟通成本，独立开发</li>
              <li><strong>版本控制简化</strong> - 通过字段演进而非版本号管理变更</li>
              <li><strong>开发者体验</strong> - 丰富的工具生态（GraphiQL, Apollo等）</li>
            </ul>
          </div>

          <div class="cons">
            <h3><span class="icon">⚠️</span> 挑战</h3>
            <ul>
              <li><strong>学习曲线</strong> - 需要学习新的查询语言和概念</li>
              <li><strong>查询复杂度</strong> - 可能产生性能问题的复杂查询</li>
              <li><strong>缓存实现</strong> - 相比REST更复杂的缓存机制</li>
              <li><strong>文件上传</strong> - 需要额外处理（通常通过base64）</li>
              <li><strong>监控难度</strong> - 统一端点增加请求分析难度</li>
              <li><strong>过度获取风险</strong> - 可能暴露敏感数据（需精细权限控制）</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section conclusion-section">
        <h2 class="section-title">总结</h2>
        <div class="conclusion-content">
          <p>GraphQL 是现代应用开发的强大工具，特别适合需要灵活数据获取、多平台支持和高性能的场景。</p>
          <div class="adoption">
            <h3>采用 GraphQL 的主要公司：</h3>
            <div class="company-logos">
              <span>Facebook</span>
              <span>GitHub</span>
              <span>Shopify</span>
              <span>Netflix</span>
              <span>PayPal</span>
              <span>Airbnb</span>
            </div>
          </div>
          <div class="decision-guide">
            <h3>技术选型建议：</h3>
            <ul>
              <li>✅ <strong>适合</strong>: 复杂前端应用、多平台产品、快速迭代项目</li>
              <li>⚠️ <strong>谨慎</strong>: 简单CRUD应用、已有稳定REST API系统</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// GraphQL图标组件
// const GraphqlIcon = {
//   template: `
//     <svg width="28" height="28" viewBox="0 0 32 32" class="graphql-icon">
//       <path fill="#E10098" d="M2 13.5h9.5v2.4H4.2v3.7h6.9v2.4H2zM16.7 22h2.4V10h-2.4zM22 10l-5.4 9.6h2.3l5.4-9.6zm7.5 13.5H20v-2.4h7.8v-3.7H21v-2.4h9.5z"/>
//     </svg>
//   `
// };
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.graphql-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  color: #333;
  background-color: #ffffff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 25px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf9 100%);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    color: #2c3e50;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 10px;

    .graphql-icon {
      fill: #e535ab;
      width: 42px;
      height: 42px;
    }
  }

  .subtitle {
    font-size: 1.3rem;
    color: #6c7a89;
    font-weight: 400;
    margin-top: 8px;
  }
}

.content-wrapper {
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  padding: 30px;
}

.section {
  margin-bottom: 50px;

  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  font-size: 1.8rem;
  color: #2c3e50;
  padding-bottom: 12px;
  margin-bottom: 25px;
  border-bottom: 2px solid #e4edf9;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 120px;
    height: 2px;
    background: linear-gradient(90deg, #e535ab, #6a11cb);
  }
}

.intro-section {
  .definition-card {
    background: #f9f7ff;
    border-left: 4px solid #8a4dff;
    padding: 20px;
    border-radius: 0 8px 8px 0;
    margin-bottom: 30px;

    p {
      font-size: 1.1rem;
      line-height: 1.8;
      margin: 0;
    }
  }
}

.core-concepts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
  margin-top: 30px;

  .concept {
    background: white;
    border: 1px solid #e8eaf6;
    border-radius: 10px;
    padding: 25px 20px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(138, 77, 255, 0.1);
    }

    .concept-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: #5d36d6;
    }

    p {
      color: #666;
      font-size: 0.95rem;
    }
  }
}

.columns-container {

  gap: 30px;
  margin-bottom: 40px;

  @media (max-width: 900px) {
    flex-direction: column;
  }

  .column {
    flex: 1;
  }
}

.use-section {
  .example-container {
    background: #f9fafc;
    border-radius: 10px;
    padding: 20px;
    border: 1px solid #eef2f7;
  }

  .example-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .example {
    flex: 1;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);

    h3 {
      font-size: 1.1rem;
      margin-top: 0;
      margin-bottom: 15px;
      color: #5d36d6;
      display: flex;
      align-items: center;
      gap: 8px;

      &::before {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #8a4dff;
      }
    }
  }
}

.code-block {
  background: #2d2d44;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}

.scenarios-section {
  .scenario-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }

  .card {
    background: white;
    border: 1px solid #eef2f7;
    border-radius: 10px;
    padding: 20px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(138, 77, 255, 0.08);
    }

    .card-icon {
      font-size: 2rem;
      margin-bottom: 15px;
      color: #8a4dff;
    }

    h3 {
      font-size: 1.15rem;
      margin: 10px 0;
      color: #2c3e50;
    }

    p {
      color: #666;
      font-size: 0.93rem;
      margin: 0;
      line-height: 1.5;
    }
  }
}

.pros-cons-section {
  .comparison {
    display: flex;
    gap: 30px;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .pros,
    .cons {
      flex: 1;
      background: white;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
    }

    .pros {
      border-top: 4px solid #4caf50;
    }

    .cons {
      border-top: 4px solid #ff9800;
    }

    h3 {
      font-size: 1.3rem;
      margin-top: 0;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    ul {
      padding-left: 20px;
      margin: 0;
    }

    li {
      margin-bottom: 15px;
      line-height: 1.5;
      padding-left: 10px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: -15px;
        top: 8px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
      }
    }
  }
}

.conclusion-section {
  .conclusion-content {
    background: linear-gradient(135deg, #f9f7ff 0%, #f0f5ff 100%);
    border-radius: 10px;
    padding: 30px;
    border: 1px solid #e8eaf6;

    p {
      font-size: 1.1rem;
      line-height: 1.7;
    }
  }

  .adoption {
    margin: 30px 0;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 15px;
      color: #5d36d6;
    }

    .company-logos {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;

      span {
        background: white;
        padding: 8px 16px;
        border-radius: 30px;
        font-weight: 500;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        border: 1px solid #e0e0ff;
      }
    }
  }

  .decision-guide {
    background: white;
    border-radius: 8px;
    padding: 20px;
    border-left: 4px solid #8a4dff;

    h3 {
      font-size: 1.2rem;
      margin-top: 0;
      color: #2c3e50;
    }

    li {
      padding: 8px 0;
      border-bottom: 1px dashed #eee;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
