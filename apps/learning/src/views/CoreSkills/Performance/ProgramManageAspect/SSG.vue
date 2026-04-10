<template>
  <div class="ssg-container">
    <header class="ssg-header">
      <h1>静态站点生成 (SSG)</h1>
      <p class="subtitle">现代Web开发的高效解决方案</p>
    </header>

    <div class="content-wrapper">
      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📖</span>
          什么是静态站点生成？
        </h2>
        <div class="definition">
          <p>静态站点生成（Static Site Generation）是一种在构建时生成完整HTML页面的技术，这些页面在请求时可以直接提供给用户。</p>
          <div class="comparison">
            <div class="method">
              <h3>客户端渲染 (CSR)</h3>
              <p>浏览器下载JS → 请求数据 → 渲染页面</p>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>丰富的交互体验</li>
                    <li>应用式界面</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>SEO不友好</li>
                    <li>首屏加载慢</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="method">
              <h3>服务端渲染 (SSR)</h3>
              <p>服务器请求数据 → 渲染HTML → 发送给浏览器</p>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>更好的SEO</li>
                    <li>更快的首屏</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>服务器负载高</li>
                    <li>配置复杂</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="method highlight">
              <h3>静态站点生成 (SSG)</h3>
              <p>构建时生成HTML → 直接提供给用户</p>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>极快的加载速度</li>
                    <li>卓越的安全性</li>
                    <li>优秀的SEO</li>
                    <li>简单部署</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>不适合实时数据</li>
                    <li>构建时间随内容增长</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🚀</span>
          SSG 核心优势
        </h2>
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">⚡</div>
            <h3>性能卓越</h3>
            <p>预渲染的HTML文件可以直接从CDN提供，加载速度极快</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🔒</div>
            <h3>安全性高</h3>
            <p>没有服务器端执行环境，减少了攻击面</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🔍</div>
            <h3>SEO友好</h3>
            <p>完整的HTML内容对搜索引擎爬虫非常友好</p>
          </div>
          <div class="feature">
            <div class="feature-icon">💰</div>
            <h3>成本低廉</h3>
            <p>可以部署在静态托管服务上，减少服务器成本</p>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🎯</span>
          SSG 使用场景
        </h2>
        <div class="use-cases">
          <div class="use-case">
            <h3>文档网站</h3>
            <p>技术文档、API参考和产品手册</p>
            <div class="example">
              <span class="tech">VuePress</span>
              <span class="tech">Docusaurus</span>
            </div>
          </div>
          <div class="use-case">
            <h3>博客平台</h3>
            <p>个人博客、技术文章和新闻网站</p>
            <div class="example">
              <span class="tech">Hexo</span>
              <span class="tech">Jekyll</span>
            </div>
          </div>
          <div class="use-case">
            <h3>营销网站</h3>
            <p>产品展示页、企业官网和落地页</p>
            <div class="example">
              <span class="tech">Gatsby</span>
              <span class="tech">Next.js</span>
            </div>
          </div>
          <div class="use-case">
            <h3>电子商务</h3>
            <p>产品目录、静态商品展示页</p>
            <div class="example">
              <span class="tech">Nuxt.js</span>
              <span class="tech">Eleventy</span>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🔧</span>
          流行的SSG框架
        </h2>
        <div class="frameworks">
          <div class="framework">
            <div class="logo vue">Vue</div>
            <h3>VuePress</h3>
            <p>Vue驱动的静态站点生成器，专注于技术文档</p>
          </div>
          <div class="framework">
            <div class="logo react">React</div>
            <h3>Next.js</h3>
            <p>支持SSG和SSR的React框架</p>
          </div>
          <div class="framework">
            <div class="logo vue">Vue</div>
            <h3>Nuxt.js</h3>
            <p>支持SSG的Vue框架</p>
          </div>
          <div class="framework">
            <div class="logo react">React</div>
            <h3>Gatsby</h3>
            <p>基于React和GraphQL的SSG框架</p>
          </div>
        </div>
      </div>

      <div class="info-card workflow">
        <h2 class="section-title">
          <span class="icon">🔄</span>
          SSG工作流程
        </h2>
        <div class="workflow-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>内容创作</h3>
              <p>编写Markdown、创建组件</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>构建过程</h3>
              <p>运行构建命令生成静态文件</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>部署</h3>
              <p>上传到静态托管服务</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>用户访问</h3>
              <p>直接从CDN获取预渲染的HTML</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="ssg-footer">
      <p>静态站点生成 (SSG) 是构建高性能、低成本网站的理想选择，特别适合内容主导型应用</p>
      <div class="conclusion">在适当场景下使用SSG可以大幅提升网站性能和用户体验</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑可以在这里添加
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #3498db;
@secondary-color: #2ecc71;
@background-color: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2c3e50;
@light-text: #7f8c8d;
@border-color: #e0e0e0;
@highlight-color: #e3f2fd;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.ssg-container {
  font-family: 'Inter', sans-serif;
  background-color: @background-color;
  color: @text-color;
  min-height: 100vh;
  padding: 20px;
  line-height: 1.6;
}

.ssg-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 10px;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @light-text;
    max-width: 600px;
    margin: 0 auto;
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.info-card {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  margin-bottom: 25px;
  color: @text-color;
  font-weight: 600;

  .icon {
    margin-right: 12px;
    font-size: 1.5rem;
  }
}

// 渲染方法比较
.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;

  .method {
    background: white;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 20px;
    position: relative;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: #e0e0e0;
    }

    &.highlight {
      border: 2px solid @primary-color;
      transform: scale(1.02);

      &:before {
        background: @primary-color;
      }

      h3 {
        color: @primary-color;
      }
    }

    h3 {
      font-size: 1.4rem;
      margin-bottom: 15px;
      font-weight: 600;
    }

    p {
      background: #f9f9f9;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 15px;
      font-family: monospace;
      font-size: 0.95rem;
    }

    .pros-cons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;

      h4 {
        font-size: 1rem;
        margin-bottom: 10px;
        color: @light-text;
        font-weight: 500;
      }

      ul {
        list-style-type: none;

        li {
          padding: 6px 0;
          position: relative;
          padding-left: 20px;

          &:before {
            content: '•';
            position: absolute;
            left: 0;
            color: @primary-color;
          }
        }
      }

      .pros li:before {
        color: @secondary-color;
      }
    }
  }
}

// 核心优势网格
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;

  .feature {
    text-align: center;
    padding: 25px 15px;
    background: @highlight-color;
    border-radius: 8px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: @primary-color;
    }

    p {
      color: @light-text;
      font-size: 0.95rem;
    }
  }
}

// 使用场景
.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;

  .use-case {
    padding: 20px;
    background: white;
    border-radius: 8px;
    border-left: 4px solid @primary-color;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);

    h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: @primary-color;
    }

    p {
      color: @light-text;
      margin-bottom: 15px;
      font-size: 0.95rem;
    }

    .example {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;

      .tech {
        background: #e3f2fd;
        color: @primary-color;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 500;
      }
    }
  }
}

// 框架展示
.frameworks {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;

  .framework {
    text-align: center;
    padding: 25px 20px;
    background: white;
    border-radius: 8px;
    border-top: 4px solid @primary-color;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    .logo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 15px;
      font-weight: 700;
      color: white;
      font-size: 1.2rem;

      &.vue {
        background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
      }

      &.react {
        background: linear-gradient(135deg, #61dafb 0%, #282c34 100%);
      }
    }

    h3 {
      font-size: 1.4rem;
      margin-bottom: 10px;
      color: @text-color;
    }

    p {
      color: @light-text;
      font-size: 0.95rem;
    }
  }
}

// 工作流程
.workflow {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);

  .workflow-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      .step-number {
        width: 50px;
        height: 50px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 15px;
      }

      .step-content {
        h3 {
          font-size: 1.2rem;
          margin-bottom: 8px;
          color: @primary-color;
        }

        p {
          color: @light-text;
          font-size: 0.95rem;
        }
      }
    }
  }
}

.ssg-footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 30px;
  border-top: 1px solid @border-color;
  color: @light-text;
  font-size: 1rem;

  .conclusion {
    margin-top: 15px;
    font-size: 1.2rem;
    font-weight: 600;
    color: @primary-color;
    max-width: 800px;
    margin: 20px auto 0;
    padding: 15px;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 8px;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .ssg-header h1 {
    font-size: 2.2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .comparison {
    grid-template-columns: 1fr;
  }
}
</style>
