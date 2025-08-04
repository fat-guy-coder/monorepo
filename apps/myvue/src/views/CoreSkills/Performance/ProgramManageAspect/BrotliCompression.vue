<template>
  <div class="brotli-compression-container">
    <header class="header">
      <div class="header-content">
        <h1>Brotli压缩技术指南</h1>
        <p>下一代Web性能优化解决方案</p>
        <div class="compression-visual">
          <div class="original">
            <div class="file-icon">📄</div>
            <div class="file-size">100KB</div>
            <div class="file-label">原始文件</div>
          </div>
          <div class="compression-process">
            <div class="arrow">➔</div>
            <div class="brotli-icon">🧬</div>
            <div class="process-label">Brotli压缩</div>
          </div>
          <div class="compressed">
            <div class="file-icon">📦</div>
            <div class="file-size">18KB</div>
            <div class="file-label">压缩后</div>
          </div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <nav class="sidebar">
        <ul>
          <li v-for="(section, index) in sections" :key="index" :class="{ active: activeSection === section.id }"
            @click="scrollToSection(section.id)">
            <div class="section-icon">{{ section.icon }}</div>
            <span>{{ section.title }}</span>
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- 介绍部分 -->
        <section id="introduction" class="section-card">
          <h2>什么是Brotli压缩？</h2>
          <p>Brotli是Google开发的一种开源数据压缩算法，专为Web优化设计。与传统的Gzip压缩相比，Brotli通常能提供20-26%更高的压缩率，从而显著减少传输数据量，提高网站加载速度。</p>

          <div class="key-features">
            <div class="feature-card">
              <div class="feature-icon">🏆</div>
              <h3>更高压缩率</h3>
              <p>比Gzip平均提升20-26%压缩效率</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h3>更快加载</h3>
              <p>减少数据传输时间，加速页面加载</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔒</div>
              <h3>HTTPS优化</h3>
              <p>专门为HTTPS传输优化设计</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📱</div>
              <h3>移动端友好</h3>
              <p>显著降低移动网络流量消耗</p>
            </div>
          </div>

          <div class="adoption-stats">
            <h3>全球采用率</h3>
            <div class="stats-grid">
              <div class="stat">
                <div class="stat-value">97.5%</div>
                <div class="stat-label">全球浏览器支持率</div>
              </div>
              <div class="stat">
                <div class="stat-value">35%</div>
                <div class="stat-label">网站启用率</div>
              </div>
              <div class="stat">
                <div class="stat-value">78%</div>
                <div class="stat-label">CDN支持率</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 工作原理部分 -->
        <section id="how-it-works" class="section-card">
          <h2>Brotli工作原理</h2>
          <p>Brotli通过先进的压缩技术实现更高的压缩率：</p>

          <div class="workflow">
            <div class="workflow-step">
              <div class="step-number">1</div>
              <h3>预定义字典</h3>
              <p>包含13,000+常见Web术语，加速压缩</p>
            </div>
            <div class="workflow-arrow">➔</div>
            <div class="workflow-step">
              <div class="step-number">2</div>
              <h3>上下文建模</h3>
              <p>使用更复杂的数据建模技术</p>
            </div>
            <div class="workflow-arrow">➔</div>
            <div class="workflow-step">
              <div class="step-number">3</div>
              <h3>高级熵编码</h3>
              <p>结合LZ77、Huffman和二阶上下文编码</p>
            </div>
          </div>

          <div class="compression-comparison">
            <h3>Brotli vs Gzip 压缩率对比</h3>
            <div class="comparison-chart">
              <div class="file-type" v-for="(file, index) in fileTypes" :key="index">
                <div class="type-name">{{ file.type }}</div>
                <div class="bars">
                  <div class="bar gzip" :style="{ width: file.gzip + '%' }">
                    <span class="bar-label">Gzip: {{ file.gzip }}%</span>
                  </div>
                  <div class="bar brotli" :style="{ width: file.brotli + '%' }">
                    <span class="bar-label">Brotli: {{ file.brotli }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 服务器配置部分 -->
        <section id="configuration" class="section-card">
          <h2>服务器配置指南</h2>
          <p>在您的服务器环境中启用Brotli压缩：</p>

          <div class="server-tabs">
            <div class="tabs-header">
              <button v-for="(server, index) in servers" :key="index" :class="{ active: activeServer === server.id }"
                @click="activeServer = server.id">
                {{ server.name }}
              </button>
            </div>

            <div class="tabs-content">
              <!-- Nginx 配置 -->
              <div v-if="activeServer === 'nginx'" class="server-config">
                <p>确保Nginx版本≥1.11.5，安装Brotli模块：</p>
                <pre><code class="bash"># 下载并编译Brotli模块
git clone https://github.com/google/ngx_brotli.git
cd nginx-{version}
./configure --add-module=../ngx_brotli
make &amp;&amp; make install</code></pre>

                <p>在Nginx配置文件中添加：</p>
                <pre><code class="nginx">brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/javascript
             application/json application/x-javascript
             text/xml application/xml application/xml+rss
             text/javascript image/svg+xml;
brotli_min_length 1024;</code></pre>

                <div class="config-explanation">
                  <h4>配置说明：</h4>
                  <ul>
                    <li><code>brotli on</code>: 启用Brotli压缩</li>
                    <li><code>brotli_comp_level</code>: 压缩级别(1-11)，6是推荐值</li>
                    <li><code>brotli_types</code>: 指定需要压缩的文件类型</li>
                    <li><code>brotli_min_length</code>: 最小压缩文件大小</li>
                  </ul>
                </div>
              </div>

              <!-- Apache 配置 -->
              <div v-if="activeServer === 'apache'" class="server-config">
                <p>安装mod_brotli模块：</p>
                <pre><code class="bash"># Ubuntu/Debian
sudo apt install brotli
sudo a2enmod brotli

# CentOS/RHEL
sudo yum install brotli
sudo dnf install mod_brotli</code></pre>

                <p>在.htaccess文件中添加：</p>
                <pre><code class="apache">&lt;IfModule mod_brotli.c&gt;
  BrotliCompressionQuality 10
  BrotliWindowSize 22
  AddOutputFilterByType BROTLI_COMPRESS text/html text/plain text/xml text/css text/javascript application/javascript
  AddOutputFilterByType BROTLI_COMPRESS application/json application/xml application/xhtml+xml
&lt;/IfModule&gt;</code></pre>
              </div>

              <!-- Node.js 配置 -->
              <div v-if="activeServer === 'nodejs'" class="server-config">
                <p>在Express应用中使用shrink-ray中间件：</p>
                <pre><code class="javascript">const express = require('express');
const shrinkRay = require('shrink-ray-current');

const app = express();

// 启用Brotli和Gzip压缩
app.use(shrinkRay({
  brotli: { quality: 6 },  // Brotli压缩级别
  zlib: { level: 6 }       // Gzip压缩级别(回退方案)
}));

// 其他中间件和路由
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});</code></pre>

                <div class="config-explanation">
                  <h4>注意事项：</h4>
                  <ul>
                    <li>shrink-ray-current同时支持Brotli和Gzip</li>
                    <li>中间件会自动处理客户端支持情况</li>
                    <li>Brotli压缩级别(quality)范围为0-11</li>
                    <li>建议对文本资源使用高级别(6-11)，对二进制资源使用低级别</li>
                  </ul>
                </div>
              </div>

              <!-- Cloudflare 配置 -->
              <div v-if="activeServer === 'cloudflare'" class="server-config">
                <p>在Cloudflare控制面板中启用Brotli压缩：</p>
                <div class="cloudflare-steps">
                  <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <h4>登录Cloudflare控制面板</h4>
                      <p>访问您的Cloudflare账户并选择要配置的网站</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <h4>进入Speed优化选项</h4>
                      <p>导航到Speed > Optimization</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <h4>启用Brotli</h4>
                      <p>在"Content Optimization"部分启用Brotli压缩</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                      <h4>配置优先级</h4>
                      <p>确保Brotli优先级高于Gzip</p>
                    </div>
                  </div>
                </div>

                <div class="cloudflare-tip">
                  <h4>💡 Cloudflare小贴士：</h4>
                  <p>Cloudflare会自动为支持Brotli的客户端提供Brotli压缩，为其他客户端提供Gzip压缩。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 性能影响部分 -->
        <section id="performance" class="section-card">
          <h2>性能影响分析</h2>
          <p>Brotli压缩如何提升您的网站性能？</p>

          <div class="performance-stats">
            <div class="stat-card">
              <div class="stat-icon">🚀</div>
              <div class="stat-value">平均减少21%</div>
              <div class="stat-label">页面加载时间</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📉</div>
              <div class="stat-value">节省24%带宽</div>
              <div class="stat-label">流量消耗</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📱</div>
              <div class="stat-value">移动端提升27%</div>
              <div class="stat-label">性能提升</div>
            </div>
          </div>

          <div class="compression-levels">
            <h3>压缩级别对性能的影响</h3>
            <div class="levels-table">
              <div class="table-header">
                <div>压缩级别</div>
                <div>压缩率</div>
                <div>压缩时间</div>
                <div>解压时间</div>
                <div>CPU消耗</div>
                <div>推荐场景</div>
              </div>
              <div class="table-row">
                <div>1-4</div>
                <div>⭐⭐</div>
                <div>⭐⭐⭐</div>
                <div>⭐⭐⭐⭐⭐</div>
                <div>⭐</div>
                <div>实时压缩</div>
              </div>
              <div class="table-row">
                <div>5-7</div>
                <div>⭐⭐⭐⭐</div>
                <div>⭐⭐⭐</div>
                <div>⭐⭐⭐⭐</div>
                <div>⭐⭐</div>
                <div>动态内容</div>
              </div>
              <div class="table-row">
                <div>8-11</div>
                <div>⭐⭐⭐⭐⭐</div>
                <div>⭐</div>
                <div>⭐⭐⭐</div>
                <div>⭐⭐⭐⭐</div>
                <div>静态资源</div>
              </div>
            </div>
          </div>

          <div class="performance-tips">
            <h3>最佳实践建议</h3>
            <ul>
              <li>对静态资源使用高压缩级别(9-11)</li>
              <li>对动态内容使用中等压缩级别(5-7)</li>
              <li>同时启用Gzip作为回退方案</li>
              <li>优先压缩文本资源(HTML, CSS, JS, SVG)</li>
              <li>避免压缩已压缩的二进制文件(图片, PDF)</li>
            </ul>
          </div>
        </section>

        <!-- 验证与测试部分 -->
        <section id="verification" class="section-card">
          <h2>验证Brotli压缩</h2>
          <p>如何确认您的网站已正确启用Brotli压缩？</p>

          <div class="verification-methods">
            <div class="method">
              <h3>1. 浏览器开发者工具</h3>
              <p>在Network标签中检查响应头：</p>
              <div class="headers-example">
                <div>Content-Encoding: <span class="header-value">br</span></div>
                <div>Vary: <span class="header-value">Accept-Encoding</span></div>
              </div>
              <p>文件大小会显示原始大小和传输大小：<br>
                例如: 150KB → 28KB (Brotli压缩后)
              </p>
            </div>

            <div class="method">
              <h3>2. 在线检测工具</h3>
              <ul>
                <li><a href="https://tools.keycdn.com/brotli-test" target="_blank">KeyCDN Brotli Test</a></li>
                <li><a href="https://www.giftofspeed.com/gzip-test/" target="_blank">Gift of Speed - Brotli Test</a>
                </li>
                <li><a href="https://brotli.pro/" target="_blank">Brotli.pro</a></li>
              </ul>
              <p>这些工具会扫描您的网站并报告压缩状态</p>
            </div>

            <div class="method">
              <h3>3. 命令行工具</h3>
              <p>使用cURL验证压缩：</p>
              <pre><code class="bash">curl -H "Accept-Encoding: br" -I https://yourwebsite.com</code></pre>
              <p>检查响应头中的<code>Content-Encoding: br</code></p>
            </div>
          </div>
        </section>

        <!-- 浏览器支持部分 -->
        <section id="support" class="section-card">
          <h2>浏览器支持情况</h2>
          <p>Brotli在现代浏览器中有广泛支持：</p>

          <div class="browser-support">
            <div class="browser" v-for="(browser, index) in browsers" :key="index">
              <div class="browser-icon">{{ browser.icon }}</div>
              <div class="browser-name">{{ browser.name }}</div>
              <div class="browser-version">{{ browser.version }}</div>
              <div class="support-status" :class="browser.supportClass">
                {{ browser.supportText }}
              </div>
            </div>
          </div>

          <div class="support-tip">
            <h3>兼容性建议：</h3>
            <p>由于Brotli在旧版浏览器中不受支持，最佳实践是同时启用Brotli和Gzip压缩。服务器会自动根据客户端的<code>Accept-Encoding</code>请求头提供最合适的压缩格式。</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 当前激活的部分
const activeSection = ref('introduction');
const activeServer = ref('nginx');

// 导航部分
const sections = ref([
  { id: 'introduction', title: 'Brotli介绍', icon: 'ℹ️' },
  { id: 'how-it-works', title: '工作原理', icon: '⚙️' },
  { id: 'configuration', title: '服务器配置', icon: '🛠️' },
  { id: 'performance', title: '性能影响', icon: '📊' },
  { id: 'verification', title: '验证方法', icon: '✅' },
  { id: 'support', title: '浏览器支持', icon: '🌐' }
]);

// 服务器配置选项
const servers = ref([
  { id: 'nginx', name: 'Nginx' },
  { id: 'apache', name: 'Apache' },
  { id: 'nodejs', name: 'Node.js' },
  { id: 'cloudflare', name: 'Cloudflare' }
]);

// 文件类型压缩率比较
const fileTypes = ref([
  { type: 'HTML', gzip: 75, brotli: 85 },
  { type: 'CSS', gzip: 70, brotli: 82 },
  { type: 'JavaScript', gzip: 65, brotli: 78 },
  { type: 'JSON', gzip: 72, brotli: 86 },
  { type: 'SVG', gzip: 80, brotli: 92 }
]);

// 浏览器支持情况
const browsers = ref([
  { icon: '🌐', name: 'Chrome', version: '49+', supportText: '支持', supportClass: 'supported' },
  { icon: '🦊', name: 'Firefox', version: '44+', supportText: '支持', supportClass: 'supported' },
  { icon: '🔷', name: 'Safari', version: '11+', supportText: '支持', supportClass: 'supported' },
  { icon: '🔶', name: 'Edge', version: '15+', supportText: '支持', supportClass: 'supported' },
  { icon: '🧩', name: 'Opera', version: '36+', supportText: '支持', supportClass: 'supported' },
  { icon: '🅸', name: 'Internet Explorer', version: '所有', supportText: '不支持', supportClass: 'not-supported' },
  { icon: '🤖', name: 'Android Browser', version: '5.0+', supportText: '部分支持', supportClass: 'partial' }
]);

// 滚动到指定部分
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = id;
  }
};

// 监听滚动事件
onMounted(() => {
  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        activeSection.value = section.id;
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  // 初始触发一次
  handleScroll();
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #4285f4;
  --primary-light: #8ab4f8;
  --secondary: #34a853;
  --accent: #ea4335;
  --warning: #f9ab00;
  --dark: #202124;
  --light: #f8f9fa;
  --gray: #dadce0;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --border-radius: 12px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.brotli-compression-container {
  font-family: 'Inter', sans-serif;
  color: var(--dark);
  background: linear-gradient(135deg, #f5f9ff 0%, #e8f0fe 100%);
  min-height: 100vh;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, #1a73e8, #4285f4);
  color: white;
  padding: 4rem 2rem 6rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.15) 0%, transparent 30%);
  }
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;

  h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  p {
    font-size: 1.4rem;
    opacity: 0.92;
    max-width: 700px;
    margin: 0 auto 3rem;
    font-weight: 300;
  }
}

.compression-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(12px);
  max-width: 900px;
  margin: 3rem auto 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.original,
.compressed {
  text-align: center;
  padding: 2rem;
  border-radius: 16px;
  min-width: 200px;
  transition: transform 0.3s ease;

  .file-icon {
    font-size: 4rem;
    margin-bottom: 1.2rem;
    transition: transform 0.3s ease;
  }

  .file-size {
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 0.8rem;
    transition: all 0.5s ease;
  }

  .file-label {
    font-size: 1.2rem;
    opacity: 0.92;
    font-weight: 500;
  }
}

.original {
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    transform: translateY(-5px);

    .file-icon {
      transform: scale(1.1);
    }
  }
}

.compressed {
  background: rgba(52, 168, 83, 0.3);
  border: 1px solid rgba(52, 168, 83, 0.4);

  &:hover {
    transform: translateY(-5px);

    .file-icon {
      transform: scale(1.1);
    }

    .file-size {
      color: #d1ffd6;
    }
  }
}

.compression-process {
  text-align: center;

  .arrow {
    font-size: 3rem;
    margin: 0.5rem 0;
    color: var(--primary-light);
    animation: pulse 2s infinite;
  }

  .brotli-icon {
    font-size: 3.5rem;
    margin: 1rem 0;
    animation: float 3s ease-in-out infinite;
  }

  .process-label {
    font-weight: 600;
    font-size: 1.3rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

@keyframes pulse {
  0% {
    opacity: 0.7;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.7;
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0px);
  }
}

.content-wrapper {
  display: flex;
  max-width: 1400px;
  margin: -4rem auto 4rem;
  padding: 0 2rem;
  gap: 2.5rem;
}

.sidebar {
  width: 300px;
  flex-shrink: 0;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 2rem 1.2rem;
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.sidebar ul {
  list-style: none;

  li {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    margin-bottom: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;

    &:hover {
      background: rgba(66, 133, 244, 0.08);
      color: var(--primary);
    }

    &.active {
      background: var(--primary);
      color: white;
      box-shadow: 0 6px 18px rgba(66, 133, 244, 0.3);
    }

    .section-icon {
      margin-right: 1.2rem;
      font-size: 1.3rem;
      width: 32px;
      text-align: center;
    }
  }
}

.main-content {
  flex-grow: 1;
}

.section-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 3rem;
  margin-bottom: 2.5rem;

  h2 {
    font-size: 2rem;
    color: var(--primary);
    margin-bottom: 2rem;
    position: relative;
    padding-bottom: 1rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 70px;
      height: 5px;
      background: var(--secondary);
      border-radius: 3px;
    }
  }

  p {
    margin-bottom: 1.8rem;
    color: #5f6368;
    font-size: 1.1rem;
    line-height: 1.8;
  }
}

.key-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.8rem;
  margin: 3rem 0;
}

.feature-card {
  background: linear-gradient(135deg, #f0f7ff 0%, #e3eeff 100%);
  border-radius: var(--border-radius);
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid rgba(66, 133, 244, 0.15);

  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 12px 30px rgba(66, 133, 244, 0.15);
  }

  .feature-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
    color: var(--dark);
  }

  p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 0;
  }
}

.adoption-stats {
  margin-top: 3rem;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    color: var(--dark);
    text-align: center;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat {
  background: #f8f9ff;
  border-radius: 12px;
  padding: 1.8rem;
  text-align: center;
  border: 1px solid #e8f0ff;

  .stat-value {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 1.1rem;
    color: #666;
  }
}

.workflow {
  display: flex;
  justify-content: space-between;
  margin: 3rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
}

.workflow-step {
  flex: 1;
  min-width: 260px;
  text-align: center;
  padding: 2rem;
  background: #f8f9ff;
  border-radius: 16px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e8f0ff;

  .step-number {
    width: 50px;
    height: 50px;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    margin: 0 auto 1.5rem;
    font-size: 1.5rem;
    box-shadow: 0 4px 8px rgba(66, 133, 244, 0.3);
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: var(--dark);
  }

  p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 0;
  }
}

.workflow-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  font-size: 2.5rem;
  color: var(--primary);
  opacity: 0.7;

  @media (max-width: 768px) {
    transform: rotate(90deg);
    padding: 1.5rem 0;
    opacity: 0.5;
  }
}

.compression-comparison {
  margin-top: 4rem;

  h3 {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 2.5rem;
    color: var(--dark);
  }
}

.comparison-chart {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--gray);
}

.file-type {
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }

  .type-name {
    font-weight: 600;
    margin-bottom: 0.8rem;
    color: var(--dark);
  }
}

.bars {
  height: 40px;
  position: relative;
  margin-bottom: 1rem;
}

.bar {
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
  font-weight: 600;
  color: white;
  transition: width 1.5s ease;
}

.gzip {
  background: var(--primary);
  z-index: 1;
  border-radius: 6px 0 0 6px;
}

.brotli {
  background: var(--secondary);
  z-index: 2;
  border-radius: 6px;
}

.server-tabs {
  background: #f8fafc;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-top: 2rem;
  border: 1px solid #e2e8f0;
}

.tabs-header {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  background: #f1f5f9;
  overflow-x: auto;

  button {
    padding: 1.2rem 2rem;
    background: none;
    border: none;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #64748b;
    white-space: nowrap;

    &:hover {
      background: rgba(66, 133, 244, 0.08);
      color: var(--primary);
    }

    &.active {
      background: white;
      color: var(--primary);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 4px;
        background: var(--primary);
      }
    }
  }
}

.tabs-content {
  padding: 2.5rem;
}

.server-config {
  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 1.8rem;
    border-radius: 10px;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 1rem;
    line-height: 1.6;
    margin: 1.8rem 0;

    code {
      display: block;
    }
  }
}

.config-explanation {
  background: #f0f7ff;
  border-radius: 12px;
  padding: 1.8rem;
  margin-top: 1.8rem;
  border-left: 4px solid var(--primary);

  h4 {
    font-size: 1.3rem;
    margin-bottom: 1.2rem;
    color: var(--dark);
  }

  ul {
    list-style: none;

    li {
      padding: 0.6rem 0;
      position: relative;
      padding-left: 2rem;

      &::before {
        content: '•';
        color: var(--primary);
        position: absolute;
        left: 0;
        top: 0.6rem;
        font-size: 1.5rem;
      }

      code {
        background: rgba(66, 133, 244, 0.1);
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
        color: var(--primary);
      }
    }
  }
}

.cloudflare-steps {
  .step {
    display: flex;
    gap: 2rem;
    margin-bottom: 1.8rem;
    padding-bottom: 1.8rem;
    border-bottom: 1px dashed #e2e8f0;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .step-number {
      width: 50px;
      height: 50px;
      background: var(--primary);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      flex-shrink: 0;
      font-size: 1.5rem;
      box-shadow: 0 4px 8px rgba(66, 133, 244, 0.3);
    }

    h4 {
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
      color: var(--dark);
    }

    p {
      font-size: 1rem;
      color: #666;
      margin-bottom: 0;
    }
  }
}

.cloudflare-tip {
  background: #e8f5e9;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  border-left: 4px solid var(--secondary);

  h4 {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  p {
    margin-bottom: 0;
  }
}

.performance-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.stat-card {
  background: linear-gradient(135deg, #f0f7ff 0%, #e3eeff 100%);
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  border: 1px solid rgba(66, 133, 244, 0.15);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 12px 30px rgba(66, 133, 244, 0.15);
  }

  .stat-icon {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
  }

  .stat-value {
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    color: var(--primary);
  }

  .stat-label {
    font-size: 1.2rem;
    color: #666;
  }
}

.compression-levels {
  margin-top: 4rem;

  h3 {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: var(--dark);
  }
}

.levels-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--gray);
  margin-bottom: 2rem;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1px;

  &>div {
    padding: 1.2rem;
    text-align: center;
  }
}

.table-header {
  background: var(--primary);
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}

.table-row {
  background: #f8f9ff;
  border-bottom: 1px solid var(--gray);

  &:nth-child(odd) {
    background: #f0f7ff;
  }

  &:last-child {
    border-bottom: none;
  }
}

.performance-tips {
  background: #e8f5e9;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
  border-left: 4px solid var(--secondary);

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
    color: var(--dark);
  }

  ul {
    list-style: none;

    li {
      padding: 0.6rem 0;
      position: relative;
      padding-left: 2rem;
      font-size: 1.1rem;

      &::before {
        content: '✓';
        color: var(--secondary);
        position: absolute;
        left: 0;
        top: 0.6rem;
        font-weight: 700;
        font-size: 1.2rem;
      }
    }
  }
}

.verification-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;
}

.method {
  background: #f8f9ff;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #e8f0ff;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(66, 133, 244, 0.1);
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
    color: var(--dark);
  }

  p {
    margin-bottom: 1.2rem;
    font-size: 1.1rem;
  }
}

.headers-example {
  background: #2d3748;
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  margin: 1.5rem 0;

  .header-value {
    color: var(--secondary);
    font-weight: 600;
  }
}

pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  margin: 1.5rem 0;

  code {
    display: block;
  }
}

.browser-support {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.browser {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid var(--gray);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }

  .browser-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .browser-name {
    font-weight: 600;
    margin-bottom: 0.3rem;
    color: var(--dark);
  }

  .browser-version {
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 0.5rem;
  }
}

.support-status {
  padding: 0.5rem;
  border-radius: 20px;
  font-weight: 600;

  &.supported {
    background: #e8f5e9;
    color: var(--secondary);
  }

  &.not-supported {
    background: #ffebee;
    color: var(--accent);
  }

  &.partial {
    background: #fff8e1;
    color: var(--warning);
  }
}

.support-tip {
  background: #f0f7ff;
  border-radius: 12px;
  padding: 1.8rem;
  margin-top: 3rem;
  border-left: 4px solid var(--primary);

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
    color: var(--dark);
  }

  p {
    margin-bottom: 0;
    font-size: 1.1rem;
  }
}

@media (max-width: 992px) {
  .content-wrapper {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: static;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 3rem 1rem 5rem;
  }

  .header-content h1 {
    font-size: 2.8rem;
  }

  .compression-visual {
    flex-direction: column;
    gap: 1.5rem;

    .arrow {
      transform: rotate(90deg);
      margin: 0.5rem 0;
    }
  }

  .section-card {
    padding: 2rem;
  }

  .workflow-arrow {
    transform: rotate(90deg);
    padding: 1.5rem 0;
  }

  .levels-table {
    overflow-x: auto;

    .table-header,
    .table-row {
      min-width: 700px;
    }
  }
}
</style>