<template>
  <div class="comparison-container">
    <header class="header">
      <h1>前端网络请求技术对比</h1>
      <p class="subtitle">基础解析 Fetch、AJAX(XHR) 与 Axios 的差异</p>
    </header>

    <div class="content-wrapper">
      <div class="tech-intro">
        <div class="tech-card fetch">
          <div class="tech-icon">🌐</div>
          <h2>Fetch API</h2>
          <p>现代浏览器原生支持的基于 Promise 的网络请求 API，提供了更简洁的语法和更强大的功能。</p>
        </div>

        <div class="tech-card ajax">
          <div class="tech-icon">🔄</div>
          <h2>AJAX (XHR)</h2>
          <p>传统的异步 JavaScript 和 XML 技术，使用 XMLHttpRequest 对象实现，是 Web 2.0 的核心技术。</p>
        </div>

        <div class="tech-card axios">
          <div class="tech-icon">🚀</div>
          <h2>Axios</h2>
          <p>基于 Promise和XMLHttpRequest 的 HTTP 客户端库，可在浏览器和 Node.js 中使用，提供丰富的功能和简化的 API。</p>
        </div>
      </div>

      <div class="comparison-section">
        <h2 class="section-title">核心特性对比</h2>

        <div class="comparison-table">
          <div class="table-header">
            <div class="header-cell feature">特性</div>
            <div class="header-cell">Fetch</div>
            <div class="header-cell">AJAX (XHR)</div>
            <div class="header-cell">Axios</div>
          </div>

          <div class="table-row">
            <div class="cell feature">语法简洁性</div>
            <div class="cell">
              <div class="rating good">良好</div>
              <p>基于 Promise，语法相对简洁</p>
            </div>
            <div class="cell">
              <div class="rating poor">较差</div>
              <p>基于事件回调，语法较为复杂</p>
            </div>
            <div class="cell">
              <div class="rating excellent">优秀</div>
              <p>简洁直观的 API 设计</p>
            </div>
          </div>

          <div class="table-row">
            <div class="cell feature">浏览器支持</div>
            <div class="cell">
              <div class="rating fair">现代浏览器</div>
              <p>IE11+ 和现代浏览器</p>
            </div>
            <div class="cell">
              <div class="rating excellent">全面支持</div>
              <p>所有浏览器（包括旧版 IE）</p>
            </div>
            <div class="cell">
              <div class="rating excellent">全面支持</div>
              <p>所有现代浏览器（通过 polyfill）</p>
            </div>
          </div>

          <div class="table-row">
            <div class="cell feature">环境支持</div>
            <div class="cell">
              <div class="rating fair">支持良好</div>
              <p>可以在Service Worker内使用</p>
            </div>
            <div class="cell">
              <div class="rating fair">支持较差</div>
              <p>仅支持浏览器渲染进程</p>
            </div>
            <div class="cell">
              <div class="rating fair">支持优秀</div>
              <p>可以在Service Worker,Node.js内使用</p>
            </div>
          </div>

          <div class="table-row">
            <div class="cell feature">请求取消</div>
            <div class="cell">
              <div class="rating fair">AbortController</div>
              <p>使用 AbortController 实现</p>
            </div>
            <div class="cell">
              <div class="rating good">xhr.abort()</div>
              <p>原生支持 abort() 方法</p>
            </div>
            <div class="cell">
              <div class="rating excellent">多种方式</div>
              <p>CancelToken 和 AbortController</p>
            </div>
          </div>

          <div class="table-row">
            <div class="cell feature">拦截器</div>
            <div class="cell">
              <div class="rating poor">不支持</div>
              <p>需要手动实现</p>
            </div>
            <div class="cell">
              <div class="rating poor">不支持</div>
              <p>需要手动实现</p>
            </div>
            <div class="cell">
              <div class="rating excellent">内置支持</div>
              <p>请求/响应拦截器</p>
            </div>
          </div>

          <div class="table-row">
            <div class="cell feature">进度监控</div>
            <div class="cell">
              <div class="rating fair">有限支持</div>
              <p>使用 ReadableStream 实现</p>
            </div>
            <div class="cell">
              <div class="rating good">原生支持</div>
              <p>progress 事件</p>
            </div>
            <div class="cell">
              <div class="rating excellent">内置支持</div>
              <p>onUploadProgress/onDownloadProgress</p>
            </div>
          </div>

          <div class="table-row">
            <div class="cell feature">自动JSON转换</div>
            <div class="cell">
              <div class="rating poor">手动处理</div>
              <p>需要 response.json()</p>
            </div>
            <div class="cell">
              <div class="rating poor">手动处理</div>
              <p>需要手动 JSON.parse</p>
            </div>
            <div class="cell">
              <div class="rating excellent">自动处理</div>
              <p>自动转换 JSON 数据</p>
            </div>
          </div>

          <div class="table-row">
            <div class="cell feature">CSRF 防护</div>
            <div class="cell">
              <div class="rating poor">手动实现</div>
              <p>需要手动设置头部</p>
            </div>
            <div class="cell">
              <div class="rating poor">手动实现</div>
              <p>需要手动设置头部</p>
            </div>
            <div class="cell">
              <div class="rating excellent">内置支持</div>
              <p>自动处理 XSRF 令牌</p>
            </div>
          </div>

          <div class="table-row">
            <div class="cell feature">HTTP 错误处理</div>
            <div class="cell">
              <div class="rating fair">手动检查</div>
              <p>不会自动拒绝 HTTP 错误</p>
            </div>
            <div class="cell">
              <div class="rating fair">手动检查</div>
              <p>需要检查 status 属性</p>
            </div>
            <div class="cell">
              <div class="rating excellent">自动处理</div>
              <p>HTTP 错误会触发 catch</p>
            </div>
          </div>
        </div>
      </div>

      <div class="pros-cons-section">
        <h2 class="section-title">优势与缺点对比</h2>

        <div class="tech-details">
          <div class="detail-card">
            <div class="tech-header fetch">
              <h3>Fetch API</h3>
            </div>
            <div class="pros-cons">
              <div class="pros">
                <h4>✅ 优势</h4>
                <ul>
                  <li><strong>原生支持</strong> - 现代浏览器内置，无需额外库</li>
                  <li><strong>基于 Promise</strong> - 避免回调地狱，支持 async/await</li>
                  <li><strong>流式处理</strong> - 支持 ReadableStream 处理大型数据</li>
                  <li><strong>更现代的 API</strong> - 设计更符合现代 JavaScript 标准</li>
                </ul>
              </div>
              <div class="cons">
                <h4>❌ 缺点</h4>
                <ul>
                  <li><strong>错误处理复杂</strong> - 不会自动拒绝 HTTP 错误状态</li>
                  <li><strong>功能有限</strong> - 缺少拦截器、进度监控等高级功能</li>
                  <li><strong>JSON 处理</strong> - 需要额外的步骤处理 JSON 响应</li>
                  <li><strong>兼容性问题</strong> - 旧版浏览器支持有限</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="detail-card">
            <div class="tech-header ajax">
              <h3>AJAX (XHR)</h3>
            </div>
            <div class="pros-cons">
              <div class="pros">
                <h4>✅ 优势</h4>
                <ul>
                  <li><strong>广泛兼容</strong> - 支持所有浏览器，包括旧版 IE</li>
                  <li><strong>成熟稳定</strong> - 经过长期实践验证的技术</li>
                  <li><strong>进度支持</strong> - 原生支持上传/下载进度监控</li>
                  <li><strong>同步请求</strong> - 支持同步操作（不推荐）</li>
                </ul>
              </div>
              <div class="cons">
                <h4>❌ 缺点</h4>
                <ul>
                  <li><strong>复杂语法</strong> - 基于事件的回调模式，代码冗长</li>
                  <li><strong>回调地狱</strong> - 多层嵌套时难以维护</li>
                  <li><strong>功能有限</strong> - 缺少现代功能如拦截器</li>
                  <li><strong>配置复杂</strong> - 需要更多代码完成基本操作</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="detail-card">
            <div class="tech-header axios">
              <h3>Axios</h3>
            </div>
            <div class="pros-cons">
              <div class="pros">
                <h4>✅ 优势</h4>
                <ul>
                  <li><strong>功能丰富</strong> - 拦截器、取消请求、进度监控等</li>
                  <li><strong>简洁 API</strong> - 设计直观，易于使用</li>
                  <li><strong>自动转换</strong> - 自动 JSON 数据转换</li>
                  <li><strong>客户端防护</strong> - 内置 XSRF 防护</li>
                  <li><strong>跨平台</strong> - 支持浏览器和 Node.js</li>
                </ul>
              </div>
              <div class="cons">
                <h4>❌ 缺点</h4>
                <ul>
                  <li><strong>额外依赖</strong> - 需要安装并引入库</li>
                  <li><strong>包体积增加</strong> - 增加项目体积约 13KB</li>
                  <li><strong>过度封装</strong> - 对于简单需求可能过于复杂</li>
                  <li><strong>学习曲线</strong> - 需要学习额外 API</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="use-cases-section">
        <h2 class="section-title">使用场景建议</h2>

        <div class="case-cards">
          <div class="case-card">
            <div class="case-icon">🛠️</div>
            <h3>何时使用 Fetch</h3>
            <ul>
              <li>现代浏览器项目</li>
              <li>不需要高级功能的小型应用</li>
              <li>希望避免额外依赖的项目</li>
              <li>需要流式处理大型数据的场景</li>
            </ul>
          </div>

          <div class="case-card">
            <div class="case-icon">🕰️</div>
            <h3>何时使用 AJAX (XHR)</h3>
            <ul>
              <li>需要支持旧版浏览器的项目</li>
              <li>维护传统代码库</li>
              <li>需要同步请求的特殊场景</li>
              <li>不需要 Promise 的简单需求</li>
            </ul>
          </div>

          <div class="case-card">
            <div class="case-icon">🚀</div>
            <h3>何时使用 Axios</h3>
            <ul>
              <li>企业级复杂应用</li>
              <li>需要丰富功能如拦截器、取消请求</li>
              <li>需要统一客户端和服务器端请求</li>
              <li>需要自动 JSON 转换和错误处理</li>
              <li>需要上传/下载进度显示</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="conclusion-section">
        <h2 class="section-title">总结建议</h2>

        <div class="summary">
          <div class="summary-points">
            <div class="point">
              <div class="point-icon">1</div>
              <p>对于<strong>现代浏览器项目</strong>且<strong>不需要高级功能</strong>，使用 <strong>Fetch</strong></p>
            </div>
            <div class="point">
              <div class="point-icon">2</div>
              <p>对于需要<strong>支持旧版浏览器</strong>或<strong>维护传统代码</strong>，使用 <strong>AJAX (XHR)</strong></p>
            </div>
            <div class="point">
              <div class="point-icon">3</div>
              <p>对于<strong>企业级应用</strong>和需要<strong>丰富功能</strong>，使用 <strong>Axios</strong></p>
            </div>
          </div>

          <div class="tech-trend">
            <h3>技术趋势</h3>
            <div class="trend-chart">
              <div class="tech-trend-item">
                <div class="tech-name">AJAX (XHR)</div>
                <div class="trend-bar">
                  <div class="trend-value legacy" :style="{ width: '20%' }">传统技术</div>
                </div>
              </div>
              <div class="tech-trend-item">
                <div class="tech-name">Fetch</div>
                <div class="trend-bar">
                  <div class="trend-value modern" :style="{ width: '40%' }">现代标准</div>
                </div>
              </div>
              <div class="tech-trend-item">
                <div class="tech-name">Axios</div>
                <div class="trend-bar">
                  <div class="trend-value popular" :style="{ width: '70%' }">主流选择</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>选择网络请求技术时，应综合考虑项目需求、浏览器支持、功能需求和团队熟悉度。对于大多数现代项目，Axios 提供了最佳的功能和开发体验。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const techData = ref({
  fetch: {
    browserSupport: "现代浏览器 (IE11+)",
    packageSize: "0KB (原生支持)"
  },
  ajax: {
    browserSupport: "所有浏览器",
    packageSize: "0KB (原生支持)"
  },
  axios: {
    browserSupport: "所有现代浏览器",
    packageSize: "13KB (gzip)"
  }
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

.comparison-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Noto Sans SC', sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #eaeaea;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, #3498db, #2c3e50);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin-top: 0;
    }
  }

  .tech-intro {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;

    .tech-card {
      background: white;
      border-radius: 10px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-8px);
      }

      .tech-icon {
        font-size: 3rem;
        margin-bottom: 1.5rem;
      }

      h2 {
        margin-top: 0;
        margin-bottom: 1rem;
        color: #2c3e50;
      }

      p {
        font-size: 1.1rem;
        line-height: 1.7;
        color: #555;
        margin-bottom: 0;
      }
    }

    .fetch {
      border-top: 4px solid #3498db;

      .tech-icon {
        color: #3498db;
      }
    }

    .ajax {
      border-top: 4px solid #e67e22;

      .tech-icon {
        color: #e67e22;
      }
    }

    .axios {
      border-top: 4px solid #2ecc71;

      .tech-icon {
        color: #2ecc71;
      }
    }
  }

  .comparison-section {
    margin-bottom: 3rem;

    .section-title {
      font-size: 1.8rem;
      color: #3498db;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f0f0f0;
      text-align: center;
    }

    .comparison-table {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

      .table-header {
        display: flex;
        background: #2c3e50;
        color: white;
        font-weight: 500;

        .header-cell {
          flex: 1;
          padding: 1.2rem;
          text-align: center;

          &.feature {
            flex: 1.5;
            text-align: left;
          }
        }
      }

      .table-row {
        display: flex;
        border-bottom: 1px solid #eaeaea;
        background: white;

        &:nth-child(odd) {
          background: #f8f9fa;
        }

        &:last-child {
          border-bottom: none;
        }

        .cell {
          flex: 1;
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;

          &.feature {
            flex: 1.5;
            font-weight: 500;
            background: #f1f8ff;
          }

          .rating {
            display: inline-block;
            padding: 0.3rem 0.8rem;
            border-radius: 4px;
            font-weight: 500;
            margin-bottom: 0.5rem;

            &.excellent {
              background: #d5f5e3;
              color: #27ae60;
            }

            &.good {
              background: #d6eaf8;
              color: #3498db;
            }

            &.fair {
              background: #fcf3cf;
              color: #d35400;
            }

            &.poor {
              background: #fadbd8;
              color: #c0392b;
            }
          }

          p {
            margin: 0;
            font-size: 0.95rem;
            color: #7f8c8d;
          }
        }
      }
    }
  }

  .pros-cons-section {
    margin-bottom: 3rem;

    .section-title {
      font-size: 1.8rem;
      color: #3498db;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f0f0f0;
      text-align: center;
    }

    .tech-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;

      .detail-card {
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

        .tech-header {
          padding: 1.5rem;
          color: white;
          font-weight: 600;

          &.fetch {
            background: #3498db;
          }

          &.ajax {
            background: #e67e22;
          }

          &.axios {
            background: #2ecc71;
          }

          h3 {
            margin: 0;
            font-size: 1.5rem;
          }
        }

        .pros-cons {
          padding: 1.5rem;

          .pros,
          .cons {
            margin-bottom: 1.5rem;

            &:last-child {
              margin-bottom: 0;
            }

            h4 {
              margin-top: 0;
              margin-bottom: 0.8rem;
              display: flex;
              align-items: center;

              &::before {
                content: '';
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-right: 0.5rem;
                background-size: contain;
                background-repeat: no-repeat;
              }
            }
          }

          .pros {
            h4 {
              color: #27ae60;

              &::before {
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2327ae60'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E");
              }
            }
          }

          .cons {
            h4 {
              color: #e74c3c;

              &::before {
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e74c3c'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3C/svg%3E");
              }
            }
          }

          ul {
            padding-left: 1.5rem;
            margin: 0;

            li {
              margin-bottom: 0.8rem;
              line-height: 1.6;

              &:last-child {
                margin-bottom: 0;
              }

              strong {
                color: #2c3e50;
              }
            }
          }
        }
      }
    }
  }

  .use-cases-section {
    margin-bottom: 3rem;

    .section-title {
      font-size: 1.8rem;
      color: #3498db;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f0f0f0;
      text-align: center;
    }

    .case-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .case-card {
        background: white;
        border-radius: 10px;
        padding: 2rem;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s ease;
        text-align: center;

        &:hover {
          transform: translateY(-5px);
        }

        .case-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        h3 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }

        ul {
          padding-left: 1.5rem;
          text-align: left;
          margin: 0;

          li {
            margin-bottom: 0.8rem;
            line-height: 1.6;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }

  .conclusion-section {
    margin-bottom: 3rem;

    .section-title {
      font-size: 1.8rem;
      color: #3498db;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f0f0f0;
      text-align: center;
    }

    .summary {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }

      .summary-points {
        background: white;
        border-radius: 10px;
        padding: 1.5rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        .point {
          display: flex;
          gap: 1.2rem;
          padding: 1.2rem 0;
          border-bottom: 1px solid #f0f0f0;

          &:last-child {
            border-bottom: none;
          }

          .point-icon {
            width: 36px;
            height: 36px;
            background: #3498db;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.2rem;
            flex-shrink: 0;
          }

          p {
            margin: 0;
            font-size: 1.1rem;
            line-height: 1.6;

            strong {
              color: #e74c3c;
            }
          }
        }
      }

      .tech-trend {
        background: white;
        border-radius: 10px;
        padding: 1.5rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        h3 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: #2c3e50;
          text-align: center;
        }

        .trend-chart {
          .tech-trend-item {
            margin-bottom: 1.2rem;

            &:last-child {
              margin-bottom: 0;
            }

            .tech-name {
              font-weight: 500;
              margin-bottom: 0.5rem;
            }

            .trend-bar {
              height: 24px;
              background: #f0f0f0;
              border-radius: 12px;
              overflow: hidden;

              .trend-value {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 1rem;
                font-weight: 500;
                color: white;
                font-size: 0.9rem;

                &.legacy {
                  background: #e67e22;
                }

                &.modern {
                  background: #3498db;
                }

                &.popular {
                  background: #2ecc71;
                }
              }
            }
          }
        }
      }
    }
  }

  .footer {
    margin-top: 2.5rem;
    text-align: center;
    padding: 1.5rem;
    font-size: 1.05rem;
    color: #7f8c8d;
    border-top: 1px solid #eaeaea;
    line-height: 1.7;
    background: white;
    border-radius: 8px;
  }
}

@media (max-width: 768px) {
  .comparison-container {
    padding: 1rem;

    .header h1 {
      font-size: 2rem;
    }
  }
}
</style>
