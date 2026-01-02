<template>
  <div class="restful-container">
    <header class="header">
      <h1>RESTful API设计指南</h1>
      <p class="subtitle">构建统一、可扩展的Web服务接口</p>
    </header>

    <div class="content">
      <div class="columns">
        <div class="column">
          <section class="concept-section">
            <div class="section-header">
              <div class="rest-icon">
                <svg width="40" height="40" viewBox="0 0 24 24">
                  <path fill="#4f5bd5"
                    d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                </svg>
              </div>
              <h2>RESTful核心概念</h2>
            </div>

            <div class="definition">
              <p><strong>REST (Representational State Transfer)</strong> 是一种软件架构风格，用于设计网络应用的接口。它利用HTTP协议的特性，实现资源的统一访问接口。
              </p>

              <div class="principles">
                <div class="principle">
                  <div class="prop-icon">1</div>
                  <div>
                    <h3>资源导向</h3>
                    <p>所有事物抽象为资源</p>
                  </div>
                </div>
                <div class="principle">
                  <div class="prop-icon">2</div>
                  <div>
                    <h3>统一接口</h3>
                    <p>HTTP方法统一操作</p>
                  </div>
                </div>
                <div class="principle">
                  <div class="prop-icon">3</div>
                  <div>
                    <h3>无状态</h3>
                    <p>请求包含完整状态</p>
                  </div>
                </div>
                <div class="principle">
                  <div class="prop-icon">4</div>
                  <div>
                    <h3>可缓存</h3>
                    <p>支持缓存提高性能</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="http-methods">
              <h3>HTTP方法语义</h3>
              <div class="methods-grid">
                <div class="method get">
                  <div class="method-name">GET</div>
                  <div class="method-desc">获取资源</div>
                </div>
                <div class="method post">
                  <div class="method-name">POST</div>
                  <div class="method-desc">创建资源</div>
                </div>
                <div class="method put">
                  <div class="method-name">PUT</div>
                  <div class="method-desc">更新资源</div>
                </div>
                <div class="method patch">
                  <div class="method-name">PATCH</div>
                  <div class="method-desc">部分更新</div>
                </div>
                <div class="method delete">
                  <div class="method-name">DELETE</div>
                  <div class="method-desc">删除资源</div>
                </div>
              </div>
            </div>
          </section>

          <section class="design-section">
            <div class="section-header">
              <h2>RESTful设计规范</h2>
            </div>

            <div class="design-rules">
              <div class="rule">
                <div class="rule-icon">🔗</div>
                <div>
                  <h3>URI命名规则</h3>
                  <ul>
                    <li>使用名词复数形式表示资源</li>
                    <li>层级关系用斜杠分隔</li>
                    <li>单词间用连字符(-)连接</li>
                    <li>避免使用文件扩展名</li>
                  </ul>
                </div>
              </div>
              <div class="rule">
                <div class="rule-icon">📘</div>
                <div>
                  <h3>版本控制</h3>
                  <ul>
                    <li>在URI中包含版本号: <code>/api/v1/users</code></li>
                    <li>使用Accept头: <code>Accept: application/vnd.example.v1+json</code></li>
                  </ul>
                </div>
              </div>
              <div class="rule">
                <div class="rule-icon">🔍</div>
                <div>
                  <h3>过滤、排序与分页</h3>
                  <ul>
                    <li>过滤: <code>GET /users?role=admin</code></li>
                    <li>排序: <code>GET /users?sort=name,desc</code></li>
                    <li>分页: <code>GET /users?page=2&size=20</code></li>
                  </ul>
                </div>
              </div>
              <div class="rule">
                <div class="rule-icon">🔄</div>
                <div>
                  <h3>状态码规范</h3>
                  <ul>
                    <li>200: 成功GET/PUT/PATCH</li>
                    <li>201: POST创建成功</li>
                    <li>204: DELETE成功</li>
                    <li>400: 客户端请求错误</li>
                    <li>404: 资源不存在</li>
                    <li>500: 服务器错误</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="column">
          <section class="example-section">
            <div class="section-header">
              <h2>RESTful API示例</h2>
            </div>

            <div class="resource-example">
              <div class="example-header">
                <h3>用户资源接口设计</h3>
                <div class="example-base-url">https://api.example.com/v1/users</div>
              </div>

              <div class="api-examples">
                <div class="api-example">
                  <div class="api-method get">GET</div>
                  <div class="api-path">/users</div>
                  <div class="api-desc">获取用户列表</div>
                </div>
                <div class="api-example">
                  <div class="api-method post">POST</div>
                  <div class="api-path">/users</div>
                  <div class="api-desc">创建新用户</div>
                </div>
                <div class="api-example">
                  <div class="api-method get">GET</div>
                  <div class="api-path">/users/{id}</div>
                  <div class="api-desc">获取单个用户</div>
                </div>
                <div class="api-example">
                  <div class="api-method put">PUT</div>
                  <div class="api-path">/users/{id}</div>
                  <div class="api-desc">更新用户信息</div>
                </div>
                <div class="api-example">
                  <div class="api-method delete">DELETE</div>
                  <div class="api-path">/users/{id}</div>
                  <div class="api-desc">删除用户</div>
                </div>
                <div class="api-example">
                  <div class="api-method get">GET</div>
                  <div class="api-path">/users/{id}/orders</div>
                  <div class="api-desc">获取用户订单</div>
                </div>
              </div>
            </div>

            <div class="code-examples">
              <div class="code-column">
                <div class="code-block">
                  <div class="code-header">请求示例：创建用户 (POST)</div>
                  <pre>POST /v1/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer token123

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePass123"
}</pre>
                </div>

                <div class="code-block">
                  <div class="code-header">响应示例：201 Created</div>
                  <pre>HTTP/1.1 201 Created
Content-Type: application/json
Location: /v1/users/123

{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2023-07-15T10:30:00Z"
}</pre>
                </div>
              </div>

              <div class="code-column">
                <div class="code-block">
                  <div class="code-header">请求示例：获取用户 (GET)</div>
                  <pre>GET /v1/users/123 HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer token123</pre>
                </div>

                <div class="code-block">
                  <div class="code-header">响应示例：200 OK</div>
                  <pre>HTTP/1.1 200 OK
Content-Type: application/json
ETag: "a1b2c3d4"

{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2023-07-15T10:30:00Z",
  "updatedAt": "2023-07-18T14:45:00Z",
  "_links": {
    "self": { "href": "/v1/users/123" },
    "orders": { "href": "/v1/users/123/orders" }
  }
}</pre>
                </div>
              </div>
            </div>
          </section>

          <section class="hateoas-section">
            <div class="section-header">
              <h2>HATEOAS：超媒体驱动API</h2>
            </div>

            <div class="design-rules">
              <div class="rule">
                <div class="rule-icon">🔗</div>
                <div>
                  <h3>超媒体即应用状态引擎</h3>
                  <p>在响应中包含操作链接，指导客户端如何导航API</p>
                </div>
              </div>
              <div class="rule">
                <div class="rule-icon">🔄</div>
                <div>
                  <h3>HAL格式示例</h3>
                  <pre class="inline-pre">{
  "_links": {
    "self": { "href": "/v1/users/123" },
    "update": {
      "href": "/v1/users/123",
      "method": "PUT"
    },
    "delete": {
      "href": "/v1/users/123",
      "method": "DELETE"
    }
  },
  "id": 123,
  "name": "John Doe"
}</pre>
                </div>
              </div>
            </div>
          </section>

          <section class="best-practices">
            <div class="section-header">
              <h2>最佳实践与常见错误</h2>
            </div>

            <div class="practices-grid">
              <div class="practice good">
                <h3>✅ 正确做法</h3>
                <ul>
                  <li>使用复数名词命名资源: <code>/users</code></li>
                  <li>返回合适的HTTP状态码</li>
                  <li>使用JSON格式请求/响应</li>
                  <li>提供版本控制机制</li>
                  <li>使用HTTPS保证安全</li>
                </ul>
              </div>
              <div class="practice bad">
                <h3>❌ 常见错误</h3>
                <ul>
                  <li>在URI中使用动词: <code>/getUsers</code></li>
                  <li>滥用GET传递敏感数据</li>
                  <li>忽略错误处理规范</li>
                  <li>缺乏版本控制</li>
                  <li>返回纯文本或HTML</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section class="comparison-section">
        <div class="section-header">
          <h2>RESTful vs RPC vs GraphQL</h2>
        </div>

        <div class="comparison-table">
          <div class="table-header">
            <div class="col">特性</div>
            <div class="col">RESTful</div>
            <div class="col">RPC</div>
            <div class="col">GraphQL</div>
          </div>
          <div class="table-row">
            <div class="col">设计理念</div>
            <div class="col">资源为中心</div>
            <div class="col">动作/方法为中心</div>
            <div class="col">查询语言为中心</div>
          </div>
          <div class="table-row">
            <div class="col">数据获取</div>
            <div class="col">固定端点</div>
            <div class="col">固定端点</div>
            <div class="col">灵活查询</div>
          </div>
          <div class="table-row">
            <div class="col">HTTP方法</div>
            <div class="col">充分利用</div>
            <div class="col">通常只用POST</div>
            <div class="col">通常只用POST</div>
          </div>
          <div class="table-row">
            <div class="col">学习曲线</div>
            <div class="col">平缓</div>
            <div class="col">简单</div>
            <div class="col">陡峭</div>
          </div>
          <div class="table-row">
            <div class="col">适用场景</div>
            <div class="col">通用CRUD操作</div>
            <div class="col">内部微服务</div>
            <div class="col">复杂数据查询</div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>RESTful API设计总结：资源导向 → 统一接口 → 无状态通信 → 充分利用HTTP → 超媒体驱动</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑
</script>

<style lang="less" scoped>



.restful-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
  background: linear-gradient(135deg, #fafbff 0%, #f0f4ff 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 128, 0.08);
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2e3a8c;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, #2e3a8c 0%, #4f5bd5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #6b7280;
    font-weight: 400;
  }
}

.content {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.columns {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.column {
  flex: 1;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e0e7ff;

  h2 {
    font-size: 1.6rem;
    color: #2e3a8c;
    margin: 0;
  }
}

.rest-icon {
  width: 44px;
  height: 44px;
  background: #e0e7ff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;

  svg {
    width: 28px;
    height: 28px;
  }
}

.definition {
  p {
    font-size: 1.05rem;
    line-height: 1.7;
    color: #4b5563;
    margin-bottom: 1.5rem;
  }
}

.principles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
}

.principle {
  display: flex;
  background: #f3f7ff;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid #e0e7ff;

  .prop-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #4f5bd5 0%, #2e3a8c 100%);
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    margin-right: 1rem;
    flex-shrink: 0;
  }

  h3 {
    font-size: 1.1rem;
    color: #2e3a8c;
    margin: 0 0 0.3rem;
  }

  p {
    font-size: 0.95rem;
    color: #6b7280;
    margin: 0;
  }
}

.http-methods {
  margin-top: 2rem;

  h3 {
    font-size: 1.3rem;
    color: #2e3a8c;
    margin-bottom: 1rem;
  }
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.8rem;

  .method {
    padding: 1rem;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    .method-name {
      font-size: 1.3rem;
      margin-bottom: 0.3rem;
    }

    .method-desc {
      font-size: 0.95rem;
      opacity: 0.9;
    }

    &.get {
      background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    }

    &.post {
      background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
    }

    &.put {
      background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    }

    &.patch {
      background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
    }

    &.delete {
      background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
    }
  }
}

.design-section {
  margin-top: 2.5rem;
}

.design-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.rule {
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(79, 91, 213, 0.08);
  border: 1px solid #eef2ff;

  .rule-icon {
    font-size: 1.8rem;
    margin-right: 1.2rem;
    flex-shrink: 0;
  }

  h3 {
    font-size: 1.2rem;
    color: #2e3a8c;
    margin: 0 0 0.8rem;
  }

  ul {
    margin: 0;
    padding-left: 1.2rem;
    color: #4b5563;

    li {
      margin-bottom: 0.5rem;
      line-height: 1.5;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  code {
    font-family: 'JetBrains Mono', monospace;
    background: #f1f5f9;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #4f5bd5;
  }

  .inline-pre {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
    overflow-x: auto;
    color: #1e293b;
    line-height: 1.5;
    border: 1px solid #e2e8f0;
    margin-top: 0.8rem;
  }
}

.example-section {
  margin-bottom: 2rem;
}

.resource-example {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.8rem;
  box-shadow: 0 4px 15px rgba(79, 91, 213, 0.1);
  border: 1px solid #e0e7ff;

  .example-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;

    h3 {
      font-size: 1.3rem;
      color: #2e3a8c;
      margin: 0;
    }

    .example-base-url {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      background: #f1f5f9;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      color: #4f5bd5;
    }
  }
}

.api-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0.8rem;

  .api-example {
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    border-radius: 8px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;

    .api-method {
      flex-shrink: 0;
      width: 70px;
      padding: 0.3rem 0.5rem;
      border-radius: 4px;
      color: white;
      font-weight: 600;
      text-align: center;
      font-size: 0.9rem;

      &.get {
        background: #10B981;
      }

      &.post {
        background: #3B82F6;
      }

      &.put {
        background: #F59E0B;
      }

      &.delete {
        background: #EF4444;
      }
    }

    .api-path {
      flex: 1;
      margin: 0 1rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.95rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .api-desc {
      color: #4b5563;
      font-size: 0.9rem;
    }
  }
}

.code-examples {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;

  .code-column {
    flex: 1;
  }
}

.code-block {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  .code-header {
    background: #e0e7ff;
    color: #2e3a8c;
    padding: 0.8rem 1.2rem;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 500;
    font-size: 0.95rem;
    border-bottom: 1px solid #c7d2fe;
  }

  pre {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    padding: 1.2rem;
    margin: 0;
    overflow-x: auto;
    background: #f8fafc;
    color: #1e293b;
    line-height: 1.6;
  }
}

.hateoas-section {
  margin-bottom: 2rem;
}

.best-practices {
  margin-bottom: 2rem;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .practice {
    padding: 1.5rem;
    border-radius: 12px;

    h3 {
      font-size: 1.2rem;
      margin-top: 0;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid;
    }

    ul {
      margin: 0;
      padding-left: 1.2rem;
      color: #4b5563;

      li {
        margin-bottom: 0.6rem;
        line-height: 1.5;
      }
    }

    &.good {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;

      h3 {
        color: #047857;
        border-color: #34d399;
      }
    }

    &.bad {
      background: #fef2f2;
      border: 1px solid #fecaca;

      h3 {
        color: #b91c1c;
        border-color: #f87171;
      }
    }
  }
}

.comparison-section {
  margin-top: 2rem;
}

.comparison-table {
  border: 1px solid #e0e7ff;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 1rem;

  .table-header,
  .table-row {
    display: flex;
    border-bottom: 1px solid #eef2ff;

    .col {
      flex: 1;
      padding: 1rem;
      font-weight: 500;
      display: flex;
      align-items: center;

      &:first-child {
        flex: 0 0 200px;
        font-weight: 600;
      }
    }
  }

  .table-header {
    background: linear-gradient(135deg, #4f5bd5 0%, #2e3a8c 100%);
    color: white;
    font-weight: 600;
  }

  .table-row {
    background: white;

    &:nth-child(even) {
      background: #f8faff;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

.footer {
  margin-top: 2.5rem;
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
  border-radius: 12px;
  font-weight: 600;
  color: #2e3a8c;
  font-size: 1.1rem;
}

@media (max-width: 900px) {
  .columns {
    flex-direction: column;
  }

  .code-examples {
    flex-direction: column;
  }
}

@media (max-width: 600px) {
  .restful-container {
    padding: 1.2rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .content {
    padding: 1.2rem;
  }

  .design-rules,
  .practices-grid {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    overflow-x: auto;

    .table-header,
    .table-row {
      min-width: 600px;
    }
  }
}
</style>
