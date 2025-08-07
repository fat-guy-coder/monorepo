<template>
  <div class="cdn-container">
    <header>
      <h1>CDN（内容分发网络）基本介绍</h1>
      <p>加速全球内容交付的核心技术</p>
    </header>

    <div class="content-wrapper">
      <div class="overview-section">
        <div class="overview-card">
          <div class="overview-content">
            <h2>什么是 CDN？</h2>
            <p>CDN（Content Delivery Network，内容分发网络）是一个分布式服务器系统，通过在全球多个地理位置部署节点服务器，使用户能够从最近的服务器获取内容，从而减少延迟，提高网站加载速度。</p>

            <div class="cdn-stats">
              <div class="stat-card">
                <div class="stat-value">60%</div>
                <div class="stat-label">互联网流量通过CDN传输</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">50%+</div>
                <div class="stat-label">网站加载速度提升</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">99.9%</div>
                <div class="stat-label">高可用性保障</div>
              </div>
            </div>
          </div>
          <div class="overview-image">
            <div class="cdn-globe">
              <div class="globe"></div>
              <div class="node" style="top: 30%; left: 15%;">🇺🇸</div>
              <div class="node" style="top: 35%; left: 50%;">🇪🇺</div>
              <div class="node" style="top: 65%; left: 75%;">🇦🇺</div>
              <div class="node" style="top: 55%; left: 25%;">🇨🇳</div>
              <div class="connection" v-for="(conn, idx) in connections" :key="idx" :style="conn"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="tabs-section">
        <div class="tabs-header">
          <div v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="{ active: activeTab === index }"
            @click="activeTab = index">
            {{ tab.title }}
          </div>
        </div>

        <div class="tabs-content">
          <!-- 工作原理 -->
          <div v-show="activeTab === 0" class="tab-pane">
            <h2>CDN 工作原理</h2>
            <div class="workflow">
              <div class="step">
                <div class="step-icon">1</div>
                <div class="step-content">
                  <h3>用户请求资源</h3>
                  <p>用户访问网站请求资源（如图片、CSS、JS文件）</p>
                </div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-icon">2</div>
                <div class="step-content">
                  <h3>DNS 解析</h3>
                  <p>CDN的DNS系统根据用户位置返回最近的边缘节点IP</p>
                </div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-icon">3</div>
                <div class="step-content">
                  <h3>边缘节点响应</h3>
                  <p>边缘节点检查是否有缓存内容，有则直接返回</p>
                </div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-icon">4</div>
                <div class="step-content">
                  <h3>回源获取</h3>
                  <p>若无缓存，边缘节点从源服务器获取内容并缓存</p>
                </div>
              </div>
            </div>

            <div class="architecture">
              <div class="user">用户</div>
              <div class="arrow">→</div>
              <div class="dns">DNS</div>
              <div class="arrow">→</div>
              <div class="edge">边缘节点</div>
              <div class="arrow">→</div>
              <div class="source">源服务器</div>

              <div class="cache-flow">
                <div class="cache-arrow">↺</div>
                <div class="cache-label">缓存内容</div>
              </div>
            </div>
          </div>

          <!-- 使用方式 -->
          <div v-show="activeTab === 1" class="tab-pane">
            <h2>CDN 使用方式</h2>
            <div class="usage-methods">
              <div class="method-card">
                <div class="method-icon">🌐</div>
                <div class="method-content">
                  <h3>静态资源加速</h3>
                  <p>将静态资源（CSS、JS、图片）托管到CDN</p>
                  <pre><code>&lt;!-- 传统方式 --&gt;
&lt;script src="/js/app.js"&gt;&lt;/script&gt;

&lt;!-- CDN方式 --&gt;
&lt;script src="https://cdn.example.com/js/app.js"&gt;&lt;/script&gt;</code></pre>
                </div>
              </div>

              <div class="method-card">
                <div class="method-icon">📦</div>
                <div class="method-content">
                  <h3>库文件托管</h3>
                  <p>使用公共CDN加载常用库（jQuery、Vue、React等）</p>
                  <pre><code>&lt;!-- 使用jsDelivr CDN --&gt;
&lt;script src="https://cdn.jsdelivr.net/npm/vue@3.2.31/dist/vue.global.js"&gt;&lt;/script&gt;</code></pre>
                </div>
              </div>

              <div class="method-card">
                <div class="method-icon">🔧</div>
                <div class="method-content">
                  <h3>配置域名解析</h3>
                  <p>在DNS服务商处配置CNAME记录指向CDN提供商</p>
                  <div class="dns-config">
                    <div class="dns-row">
                      <span>类型</span>
                      <span>名称</span>
                      <span>值</span>
                    </div>
                    <div class="dns-row">
                      <span>CNAME</span>
                      <span>www</span>
                      <span>your-site.cdn-provider.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 使用场景 -->
          <div v-show="activeTab === 2" class="tab-pane">
            <h2>CDN 使用场景</h2>
            <div class="scenarios">
              <div class="scenario-card">
                <div class="scenario-icon">🚀</div>
                <div class="scenario-content">
                  <h3>网站加速</h3>
                  <p>全球用户快速访问静态资源，提升用户体验</p>
                  <ul>
                    <li>图片、CSS、JS文件分发</li>
                    <li>减少首屏加载时间</li>
                    <li>降低服务器带宽压力</li>
                  </ul>
                </div>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">📹</div>
                <div class="scenario-content">
                  <h3>视频流媒体</h3>
                  <p>高效分发视频内容，支持大规模并发</p>
                  <ul>
                    <li>直播流分发</li>
                    <li>点播视频加速</li>
                    <li>自适应码率切换</li>
                  </ul>
                </div>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">🔐</div>
                <div class="scenario-content">
                  <h3>安全防护</h3>
                  <p>抵御DDoS攻击，提供Web应用防火墙</p>
                  <ul>
                    <li>分布式防御DDoS</li>
                    <li>WAF防护</li>
                    <li>HTTPS加速</li>
                  </ul>
                </div>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">📱</div>
                <div class="scenario-content">
                  <h3>移动应用加速</h3>
                  <p>优化APP资源加载，提升移动端体验</p>
                  <ul>
                    <li>API加速</li>
                    <li>应用更新包分发</li>
                    <li>减少移动网络延迟</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 跨域问题 -->
          <div v-show="activeTab === 3" class="tab-pane">
            <h2>CDN 与跨域资源共享 (CORS)</h2>
            <div class="cors-section">
              <div class="cors-explanation">
                <h3>为什么 CDN 可以解决跨域问题？</h3>
                <p>浏览器出于安全考虑，默认阻止跨域请求。CDN 可以通过以下方式解决跨域问题：</p>

                <div class="cors-method">
                  <div class="method-header">1. 设置 CORS 响应头</div>
                  <div class="method-content">
                    <p>在 CDN 配置中设置 <code>Access-Control-Allow-Origin</code> 响应头</p>
                    <pre><code>Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type</code></pre>
                  </div>
                </div>

                <div class="cors-method">
                  <div class="method-header">2. 同域策略</div>
                  <div class="method-content">
                    <p>将资源托管到与主站相同的域名下，避免跨域：</p>
                    <pre><code>// 主站
https://www.example.com

// CDN资源（使用相同域名）
https://www.example.com/cdn/image.jpg</code></pre>
                  </div>
                </div>

                <div class="cors-method">
                  <div class="method-header">3. JSONP 技术</div>
                  <div class="method-content">
                    <p>对于不支持 CORS 的旧浏览器，使用 JSONP 请求：</p>
                    <pre><code>// 前端请求
&lt;script src="https://cdn.example.com/data.json?callback=handleData"&gt;&lt;/script&gt;

// CDN响应
handleData({ "name": "John", "age": 30 });</code></pre>
                  </div>
                </div>
              </div>

              <div class="cors-comparison">
                <h3>CDN 跨域 vs 传统跨域</h3>
                <div class="comparison-grid">
                  <div class="comparison-header">
                    <div></div>
                    <div>传统方式</div>
                    <div>CDN方式</div>
                  </div>
                  <div class="comparison-row">
                    <div>配置复杂度</div>
                    <div>高（需服务器配置）</div>
                    <div>低（CDN控制台配置）</div>
                  </div>
                  <div class="comparison-row">
                    <div>生效速度</div>
                    <div>慢（需部署）</div>
                    <div>快（即时生效）</div>
                  </div>
                  <div class="comparison-row">
                    <div>适用范围</div>
                    <div>单个服务器</div>
                    <div>所有边缘节点</div>
                  </div>
                  <div class="comparison-row">
                    <div>安全性</div>
                    <div>中等</div>
                    <div>高（带WAF防护）</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="benefits-section">
        <h2>CDN 核心优势</h2>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">⚡</div>
            <div class="benefit-title">加速内容传输</div>
            <div class="benefit-desc">减少延迟，提升页面加载速度</div>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🌍</div>
            <div class="benefit-title">全球覆盖</div>
            <div class="benefit-desc">为全球用户提供一致体验</div>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🛡️</div>
            <div class="benefit-title">增强安全性</div>
            <div class="benefit-desc">抵御DDoS攻击，提供WAF防护</div>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">📉</div>
            <div class="benefit-title">降低带宽成本</div>
            <div class="benefit-desc">减少源服务器带宽使用</div>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">📈</div>
            <div class="benefit-title">高可用性</div>
            <div class="benefit-desc">自动故障转移，保障服务稳定</div>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">⚖️</div>
            <div class="benefit-title">负载均衡</div>
            <div class="benefit-desc">智能分配请求到最佳节点</div>
          </div>
        </div>
      </div>

      <div class="providers-section">
        <h2>主流 CDN 提供商</h2>
        <div class="providers-grid">
          <div class="provider-card">
            <div class="provider-logo cloudflare">Cloudflare</div>
            <div class="provider-desc">全球最大CDN，提供免费套餐</div>
          </div>
          <div class="provider-card">
            <div class="provider-logo akamai">Akamai</div>
            <div class="provider-desc">CDN行业开创者，企业级方案</div>
          </div>
          <div class="provider-card">
            <div class="provider-logo aws">AWS CloudFront</div>
            <div class="provider-desc">亚马逊云服务，深度集成AWS生态</div>
          </div>
          <div class="provider-card">
            <div class="provider-logo google">Google Cloud CDN</div>
            <div class="provider-desc">谷歌云服务，全球骨干网络</div>
          </div>
          <div class="provider-card">
            <div class="provider-logo azure">Azure CDN</div>
            <div class="provider-desc">微软云服务，企业级解决方案</div>
          </div>
          <div class="provider-card">
            <div class="provider-logo aliyun">阿里云 CDN</div>
            <div class="provider-desc">中国市场领先，亚太区优化</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(0);

const tabs = [
  { title: '工作原理' },
  { title: '使用方式' },
  { title: '使用场景' },
  { title: '跨域问题' }
];

// 生成随机的连接线
const connections = Array.from({ length: 8 }, () => {
  const startX = Math.floor(Math.random() * 100);
  const startY = Math.floor(Math.random() * 100);
  const endX = Math.floor(Math.random() * 100);
  const endY = Math.floor(Math.random() * 100);

  return {
    top: `${Math.min(startY, endY)}%`,
    left: `${Math.min(startX, endX)}%`,
    width: `${Math.abs(startX - endX)}%`,
    height: `${Math.abs(startY - endY)}%`,
    transform: `rotate(${Math.atan2(endY - startY, endX - startX)}rad)`
  };
});
</script>

<style lang="less" scoped>


.cdn-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f0f7ff 100%);
  color: #1e293b;
  line-height: 1.6;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 100, 0.05);

  header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(99, 102, 241, 0.2);

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 1.1rem;
      color: #64748b;
      max-width: 700px;
      margin: 0 auto;
    }
  }
}

.overview-section {
  margin-bottom: 2.5rem;

  .overview-card {
    display: flex;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .overview-content {
      flex: 1.5;
      padding: 2rem;

      h2 {
        font-size: 1.8rem;
        color: #1e293b;
        margin-top: 0;
        margin-bottom: 1.2rem;
      }

      p {
        color: #475569;
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
      }
    }

    .overview-image {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: #f8fafc;
    }
  }
}

.cdn-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.2rem;
  margin-top: 1.5rem;

  .stat-card {
    background: #f1f5f9;
    border-radius: 8px;
    padding: 1.2rem;
    text-align: center;
    border: 1px solid #e2e8f0;

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: #6366f1;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #64748b;
    }
  }
}

.cdn-globe {
  position: relative;
  width: 300px;
  height: 300px;

  .globe {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%);
    box-shadow: inset 0 0 50px rgba(99, 102, 241, 0.2),
      0 0 30px rgba(99, 102, 241, 0.1);
    position: relative;
    overflow: hidden;
  }

  .node {
    position: absolute;
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border: 2px solid #6366f1;
    transform: translate(-50%, -50%);
  }

  .connection {
    position: absolute;
    background: #6366f1;
    height: 2px;
    transform-origin: 0 0;
    opacity: 0.3;
  }
}

.tabs-section {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;

  .tabs-header {
    display: flex;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;

    .tab-item {
      flex: 1;
      padding: 1.2rem;
      text-align: center;
      font-weight: 600;
      color: #64748b;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;

      &:hover {
        background: #f1f5f9;
      }

      &.active {
        color: #6366f1;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #6366f1;
        }
      }
    }
  }

  .tabs-content {
    padding: 2rem;

    h2 {
      font-size: 1.5rem;
      color: #1e293b;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f1f5f9;
    }
  }
}

.workflow {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }

  .step {
    text-align: center;
    flex: 1;
    min-width: 200px;

    .step-icon {
      width: 50px;
      height: 50px;
      background: #e0e7ff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: #6366f1;
      font-size: 1.5rem;
      margin: 0 auto 1rem;
    }

    .step-content {
      h3 {
        margin: 0 0 0.5rem;
        color: #1e293b;
      }

      p {
        margin: 0;
        color: #64748b;
        font-size: 0.95rem;
      }
    }
  }

  .arrow {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    font-size: 1.5rem;
    color: #94a3b8;

    @media (max-width: 900px) {
      padding: 1rem 0;
      transform: rotate(90deg);
    }
  }
}

.architecture {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f1f5f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  position: relative;

  >div {
    padding: 1rem 1.5rem;
    background: white;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    margin: 0 0.5rem;
    font-weight: 500;
    min-width: 100px;
    text-align: center;
  }

  .arrow {
    font-size: 1.5rem;
    color: #94a3b8;
  }

  .cache-flow {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;

    .cache-arrow {
      font-size: 1.5rem;
      color: #94a3b8;
    }

    .cache-label {
      font-size: 0.9rem;
      color: #64748b;
      margin-left: 0.5rem;
    }
  }
}

.usage-methods,
.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .method-card,
  .scenario-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;

    .method-icon,
    .scenario-icon {
      font-size: 2rem;
      text-align: center;
      padding: 1.2rem;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }

    .method-content,
    .scenario-content {
      padding: 1.5rem;

      h3 {
        margin: 0 0 0.8rem;
        color: #1e293b;
      }

      p {
        margin: 0 0 1rem;
        color: #64748b;
      }

      pre {
        background: #f1f5f9;
        border-radius: 6px;
        padding: 0.8rem;
        overflow-x: auto;
        font-size: 0.85rem;

        code {
          font-family: 'JetBrains Mono', monospace;
          color: #4338ca;
        }
      }
    }
  }
}

.dns-config {
  background: #f1f5f9;
  border-radius: 6px;
  padding: 0.8rem;
  font-size: 0.9rem;

  .dns-row {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e2e8f0;

    &:last-child {
      border-bottom: none;
    }

    span {
      font-weight: 500;
    }
  }
}

.cors-section {
  display: flex;
  gap: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }

  .cors-explanation {
    flex: 1;

    h3 {
      color: #1e293b;
      margin-top: 0;
    }

    p {
      color: #475569;
    }
  }

  .cors-comparison {
    flex: 1;
  }
}

.cors-method {
  background: #f1f5f9;
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 1.5rem;

  .method-header {
    font-weight: 600;
    color: #4338ca;
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
  }

  .method-content {
    p {
      margin: 0 0 0.8rem;
      color: #475569;
    }

    pre {
      background: #e0e7ff;
      border-radius: 6px;
      padding: 0.8rem;
      overflow-x: auto;
      font-size: 0.85rem;

      code {
        font-family: 'JetBrains Mono', monospace;
        color: #4338ca;
      }
    }
  }
}

.comparison-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;

  .comparison-header,
  .comparison-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;

    >div {
      padding: 0.8rem;
      border-bottom: 1px solid #e2e8f0;
    }
  }

  .comparison-header {
    background: #f1f5f9;
    font-weight: 600;

    >div {
      text-align: center;
    }
  }

  .comparison-row {
    &:nth-child(even) {
      background: #f8fafc;
    }

    >div {
      &:nth-child(2) {
        color: #dc2626;
      }

      &:nth-child(3) {
        color: #16a34a;
      }
    }
  }
}

.benefits-section {
  margin-bottom: 2rem;

  h2 {
    text-align: center;
    font-size: 1.5rem;
    color: #1e293b;
    margin-bottom: 1.5rem;
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.2rem;

  .benefit-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }

    .benefit-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .benefit-title {
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    .benefit-desc {
      font-size: 0.9rem;
      color: #64748b;
    }
  }
}

.providers-section {
  h2 {
    text-align: center;
    font-size: 1.5rem;
    color: #1e293b;
    margin-bottom: 1.5rem;
  }
}

.providers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.2rem;

  .provider-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;

    .provider-logo {
      font-weight: 700;
      font-size: 1.2rem;
      margin-bottom: 0.8rem;
      padding: 0.5rem;
      border-radius: 6px;

      &.cloudflare {
        background: #f38020;
        color: white;
      }

      &.akamai {
        background: #0096d6;
        color: white;
      }

      &.aws {
        background: #ff9900;
        color: white;
      }

      &.google {
        background: #4285f4;
        color: white;
      }

      &.azure {
        background: #0078d7;
        color: white;
      }

      &.aliyun {
        background: #ff6a00;
        color: white;
      }
    }

    .provider-desc {
      font-size: 0.9rem;
      color: #64748b;
    }
  }
}

@media (max-width: 768px) {
  .cdn-container {
    padding: 1.5rem;
  }

  .overview-card {
    flex-direction: column;
  }

  .tabs-header {
    flex-wrap: wrap;

    .tab-item {
      flex: 1 0 50%;
    }
  }
}
</style>
