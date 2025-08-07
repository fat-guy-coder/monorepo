<template>
  <div class="gzip-compression-container">
    <header class="header">
      <div class="header-content">
        <h1>Gzip压缩技术指南</h1>
        <p>提升网站性能的关键优化技术</p>
        <div class="compression-visual">
          <div class="original">
            <div class="file-icon">📄</div>
            <div class="file-size">100KB</div>
            <div class="file-label">原始文件</div>
          </div>
          <div class="compression-process">
            <div class="arrow">➔</div>
            <div class="gzip-icon">🧬</div>
            <div class="process-label">Gzip压缩</div>
          </div>
          <div class="compressed">
            <div class="file-icon">📦</div>
            <div class="file-size">25KB</div>
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
          <h2>什么是Gzip压缩？</h2>
          <p>Gzip是一种使用DEFLATE算法进行数据压缩的文件格式和软件应用。在Web开发中，Gzip压缩用于减小通过HTTP传输的文件大小，从而显著提升网站加载速度。</p>

          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon">🚀</div>
              <h3>加载速度提升</h3>
              <p>减少文件传输时间</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">📉</div>
              <h3>带宽节省</h3>
              <p>降低服务器带宽消耗</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">💾</div>
              <h3>资源优化</h3>
              <p>减小静态资源体积</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">🌍</div>
              <h3>全球加速</h3>
              <p>改善全球用户体验</p>
            </div>
          </div>
        </section>

        <!-- 工作原理部分 -->
        <section id="how-it-works" class="section-card">
          <h2>Gzip工作原理</h2>
          <p>Gzip压缩通过以下三个步骤显著减小文件大小：</p>

          <div class="workflow">
            <div class="workflow-step">
              <div class="step-number">1</div>
              <h3>重复字符串检测</h3>
              <p>识别文件中重复出现的字符串序列</p>
            </div>
            <div class="workflow-arrow">➔</div>
            <div class="workflow-step">
              <div class="step-number">2</div>
              <h3>LZ77算法处理</h3>
              <p>使用滑动窗口技术将重复序列替换为指针</p>
            </div>
            <div class="workflow-arrow">➔</div>
            <div class="workflow-step">
              <div class="step-number">3</div>
              <h3>霍夫曼编码</h3>
              <p>使用变长编码表对数据进行进一步压缩</p>
            </div>
          </div>

          <div class="compression-demo">
            <div class="original-text">
              <h4>原始文本</h4>
              <pre>Gzip compression works by finding repeated strings in the data.
Gzip compression is very efficient for text content.
Gzip compression can reduce file size by up to 70-90%.</pre>
            </div>
            <div class="compressed-text">
              <h4>压缩后</h4>
              <pre>Gzip compression [works by finding repeated strings] in the data.
[It is] very efficient for text content.
[It] can reduce file size by up to 70-90%.</pre>
            </div>
          </div>

          <div class="compression-ratio">
            <div class="ratio-item">
              <div class="ratio-label">HTML</div>
              <div class="ratio-bar" style="width: 70%">70-80%</div>
            </div>
            <div class="ratio-item">
              <div class="ratio-label">CSS</div>
              <div class="ratio-bar" style="width: 65%">65-75%</div>
            </div>
            <div class="ratio-item">
              <div class="ratio-label">JavaScript</div>
              <div class="ratio-bar" style="width: 60%">60-70%</div>
            </div>
            <div class="ratio-item">
              <div class="ratio-label">JSON</div>
              <div class="ratio-bar" style="width: 75%">75-85%</div>
            </div>
            <div class="ratio-item">
              <div class="ratio-label">SVG/XML</div>
              <div class="ratio-bar" style="width: 80%">80-90%</div>
            </div>
          </div>
        </section>

        <!-- 服务器配置部分 -->
        <section id="configuration" class="section-card">
          <h2>服务器配置指南</h2>
          <p>下面是在常见服务器环境中启用Gzip压缩的配置方法：</p>

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
                <p>在Nginx配置文件中添加以下内容：</p>
                <pre><code class="nginx">gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css application/json
           application/javascript text/xml application/xml
           application/xml+rss text/javascript;
gzip_min_length 1024;
gzip_disable "MSIE [1-6]\.";</code></pre>

                <div class="config-explanation">
                  <h4>配置说明：</h4>
                  <ul>
                    <li><code>gzip on</code>: 启用Gzip压缩</li>
                    <li><code>gzip_comp_level 6</code>: 压缩级别（1-9），6是推荐值</li>
                    <li><code>gzip_types</code>: 指定需要压缩的文件类型</li>
                    <li><code>gzip_min_length</code>: 最小压缩文件大小（小于此值不压缩）</li>
                    <li><code>gzip_disable</code>: 对特定浏览器禁用压缩</li>
                  </ul>
                </div>
              </div>

              <!-- Apache 配置 -->
              <div v-if="activeServer === 'apache'" class="server-config">
                <p>在.htaccess文件中添加以下内容：</p>
                <pre><code class="apache">&lt;IfModule mod_deflate.c&gt;
  # 启用压缩
  AddOutputFilterByType DEFLATE text/html text/plain text/xml
                               text/css text/javascript
                               application/javascript
                               application/json
                               application/xml

  # 设置压缩级别
  DeflateCompressionLevel 6

  # 排除特定浏览器
  BrowserMatch ^Mozilla/4 gzip-only-text/html
  BrowserMatch ^Mozilla/4\.0[678] no-gzip
  BrowserMatch \bMSIE !no-gzip !gzip-only-text/html

  # 设置日志
  DeflateFilterNote Input instream
  DeflateFilterNote Output outstream
  DeflateFilterNote Ratio ratio
&lt;/IfModule&gt;</code></pre>
              </div>

              <!-- Node.js 配置 -->
              <div v-if="activeServer === 'nodejs'" class="server-config">
                <p>在Express应用中使用compression中间件：</p>
                <pre><code class="javascript">const express = require('express');
const compression = require('compression');

const app = express();

// 启用Gzip压缩
app.use(compression({
  level: 6,               // 压缩级别
  threshold: 1024,        // 最小压缩文件大小（字节）
  filter: (req, res) => {
    // 排除特定请求
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// 其他中间件和路由
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});</code></pre>
              </div>

              <!-- Cloudflare 配置 -->
              <div v-if="activeServer === 'cloudflare'" class="server-config">
                <p>在Cloudflare控制面板中启用Brotli或Gzip压缩：</p>
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
                      <h4>启用压缩</h4>
                      <p>在"Content Optimization"部分启用Brotli和/或Gzip压缩</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                      <h4>配置压缩级别</h4>
                      <p>选择要压缩的文件类型（HTML, CSS, JS等）</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 性能影响部分 -->
        <section id="performance" class="section-card">
          <h2>性能影响分析</h2>
          <p>Gzip压缩如何影响网站性能？以下是关键指标分析：</p>

          <div class="performance-metrics">
            <div class="metric">
              <h3>加载时间减少</h3>
              <div class="metric-visual">
                <div class="bar original" style="height: 180px">3.5s</div>
                <div class="bar compressed" style="height: 80px">1.2s</div>
              </div>
              <p>页面加载时间减少65%</p>
            </div>

            <div class="metric">
              <h3>带宽节省</h3>
              <div class="metric-visual">
                <div class="bandwidth-original">
                  <div class="data">2.4MB</div>
                  <div class="label">原始</div>
                </div>
                <div class="bandwidth-compressed">
                  <div class="data">620KB</div>
                  <div class="label">压缩后</div>
                </div>
              </div>
              <p>节省74%的带宽消耗</p>
            </div>

            <div class="metric">
              <h3>CPU消耗</h3>
              <div class="cpu-usage">
                <div class="usage-label">服务器CPU增加</div>
                <div class="usage-value">5-15%</div>
                <div class="usage-label">客户端CPU增加</div>
                <div class="usage-value">1-3%</div>
              </div>
              <p>合理的CPU开销换取显著性能提升</p>
            </div>
          </div>

          <div class="performance-tips">
            <h3>最佳实践建议</h3>
            <ul>
              <li>对文本资源（HTML, CSS, JS, JSON, XML）启用压缩</li>
              <li>避免压缩已压缩格式（图片、视频、PDF等）</li>
              <li>设置合理的压缩级别（通常5-6是最佳平衡点）</li>
              <li>使用最低文件大小阈值（1KB左右）</li>
              <li>考虑使用更高效的Brotli压缩（现代浏览器支持）</li>
            </ul>
          </div>
        </section>

        <!-- 验证与测试部分 -->
        <section id="verification" class="section-card">
          <h2>验证Gzip压缩</h2>
          <p>如何确认您的网站已正确启用Gzip压缩？</p>

          <div class="verification-methods">
            <div class="method">
              <h3>1. 浏览器开发者工具</h3>
              <p>在Network标签中检查响应头：</p>
              <div class="headers-example">
                <div>Content-Encoding: <span class="header-value">gzip</span></div>
                <div>Vary: <span class="header-value">Accept-Encoding</span></div>
              </div>
              <p>文件大小会显示原始大小和传输大小：<br>
                例如: 150KB → 35KB (压缩后)
              </p>
            </div>

            <div class="method">
              <h3>2. 在线检测工具</h3>
              <ul>
                <li><a href="https://www.giftofspeed.com/gzip-test/" target="_blank">Gift of Speed - Gzip Test</a></li>
                <li><a href="https://varvy.com/tools/gzip/" target="_blank">Varvy Gzip Compression Test</a></li>
                <li><a href="https://tools.pingdom.com/" target="_blank">Pingdom Website Speed Test</a></li>
              </ul>
              <p>这些工具会扫描您的网站并报告压缩状态</p>
            </div>

            <div class="method">
              <h3>3. 命令行工具</h3>
              <p>使用cURL验证压缩：</p>
              <pre><code class="bash">curl -H "Accept-Encoding: gzip" -I http://yourwebsite.com</code></pre>
              <p>检查响应头中的<code>Content-Encoding: gzip</code></p>
            </div>
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
  { id: 'introduction', title: 'Gzip介绍', icon: 'ℹ️' },
  { id: 'how-it-works', title: '工作原理', icon: '⚙️' },
  { id: 'configuration', title: '服务器配置', icon: '🛠️' },
  { id: 'performance', title: '性能影响', icon: '📊' },
  { id: 'verification', title: '验证方法', icon: '✅' }
]);

// 服务器配置选项
const servers = ref([
  { id: 'nginx', name: 'Nginx' },
  { id: 'apache', name: 'Apache' },
  { id: 'nodejs', name: 'Node.js' },
  { id: 'cloudflare', name: 'Cloudflare' }
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


:root {
  --primary: #4361ee;
  --primary-light: #4895ef;
  --secondary: #3f37c9;
  --accent: #4cc9f0;
  --success: #2ecc71;
  --warning: #f39c12;
  --dark: #2b2d42;
  --light: #f8f9fa;
  --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  --border-radius: 16px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.gzip-compression-container {
  font-family: 'Inter', sans-serif;
  color: var(--dark);
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7f4 100%);
  min-height: 100vh;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, #1a2980, #26d0ce);
  color: white;
  padding: 3rem 2rem 5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.1) 0%, transparent 30%);
  }
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;

  h1 {
    font-size: 3.2rem;
    font-weight: 800;
    margin-bottom: 1rem;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  p {
    font-size: 1.3rem;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto 2.5rem;
    font-weight: 300;
  }
}

.compression-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  max-width: 800px;
  margin: 2rem auto 0;
}

.original,
.compressed {
  text-align: center;
  padding: 1.5rem;
  border-radius: 16px;
  min-width: 180px;

  .file-icon {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }

  .file-size {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .file-label {
    font-size: 1.1rem;
    opacity: 0.9;
  }
}

.original {
  background: rgba(255, 255, 255, 0.2);
}

.compressed {
  background: rgba(74, 189, 172, 0.3);
}

.compression-process {
  text-align: center;

  .arrow {
    font-size: 2.5rem;
    margin: 0.5rem 0;
  }

  .gzip-icon {
    font-size: 3rem;
    margin: 1rem 0;
  }

  .process-label {
    font-weight: 600;
    font-size: 1.1rem;
  }
}

.content-wrapper {
  display: flex;
  max-width: 1400px;
  margin: -3rem auto 3rem;
  padding: 0 2rem;
  gap: 2rem;
}

.sidebar {
  width: 280px;
  flex-shrink: 0;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 1.8rem 1rem;
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.sidebar ul {
  list-style: none;

  li {
    display: flex;
    align-items: center;
    padding: 0.9rem 1.2rem;
    border-radius: 10px;
    margin-bottom: 0.6rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;

    &:hover {
      background: rgba(67, 97, 238, 0.08);
      color: var(--primary);
    }

    &.active {
      background: var(--primary);
      color: white;
      box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
    }

    .section-icon {
      margin-right: 1rem;
      font-size: 1.2rem;
      width: 30px;
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
  padding: 2.5rem;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.8rem;
    color: var(--secondary);
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.8rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 4px;
      background: var(--primary);
      border-radius: 2px;
    }
  }

  p {
    margin-bottom: 1.5rem;
    color: #555;
    font-size: 1.05rem;
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.benefit-card {
  background: linear-gradient(135deg, #f0f4ff 0%, #e6eeff 100%);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid rgba(67, 97, 238, 0.15);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(67, 97, 238, 0.15);
  }

  .benefit-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--dark);
  }

  p {
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 0;
  }
}

.workflow {
  display: flex;
  justify-content: space-between;
  margin: 2.5rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
}

.workflow-step {
  flex: 1;
  min-width: 250px;
  text-align: center;
  padding: 1.5rem;
  background: #f8f9ff;
  border-radius: 16px;
  position: relative;

  .step-number {
    width: 40px;
    height: 40px;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    margin: 0 auto 1rem;
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
    color: var(--dark);
  }

  p {
    font-size: 0.95rem;
    color: #666;
  }
}

.workflow-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  font-size: 2rem;
  color: var(--primary);

  @media (max-width: 768px) {
    transform: rotate(90deg);
    padding: 1rem 0;
  }
}

.compression-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2.5rem 0;


  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  pre {
    background: #f8f9ff;
    border: 1px solid #eef0ff;
    border-radius: 8px;
    color: #000;
    padding: 1.5rem;
    white-space: pre-wrap;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
  }
}

.compression-ratio {
  margin-top: 2.5rem;
}

.ratio-item {
  margin-bottom: 1.2rem;

  .ratio-label {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .ratio-bar {
    height: 30px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1rem;
    color: #000;
    font-weight: 600;
    min-width: 80px;
    transition: width 1.5s ease;
  }
}

.server-tabs {
  background: #f8fafc;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-top: 1.5rem;
  border: 1px solid #e2e8f0;
}

.tabs-header {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  background: #f1f5f9;
  overflow-x: auto;

  button {
    padding: 1rem 1.5rem;
    background: none;
    border: none;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #64748b;
    white-space: nowrap;

    &:hover {
      background: rgba(67, 97, 238, 0.05);
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
        height: 3px;
        background: var(--primary);
      }
    }
  }
}

.tabs-content {
  padding: 2rem;
}

.server-config {
  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 1.5rem 0;

    code {
      display: block;
    }
  }
}

.config-explanation {
  background: #f9faff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border-left: 4px solid var(--primary);

  h4 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--dark);
  }

  ul {
    list-style: none;

    li {
      padding: 0.5rem 0;
      position: relative;
      padding-left: 1.8rem;

      &::before {
        content: '•';
        color: var(--primary);
        position: absolute;
        left: 0;
        top: 0.5rem;
        font-size: 1.2rem;
      }
    }
  }
}

.cloudflare-steps {
  .step {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px dashed #e2e8f0;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .step-number {
      width: 40px;
      height: 40px;
      background: var(--primary);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
      font-size: 1.2rem;
    }

    h4 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      color: var(--dark);
    }

    p {
      font-size: 0.95rem;
      color: #666;
      margin-bottom: 0;
    }
  }
}

.performance-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2.5rem 0;
}

.metric {
  background: #f8f9ff;
  border-radius: 16px;
  padding: 1.8rem;
  text-align: center;
  border: 1px solid #eef0ff;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    color: var(--dark);
  }
}

.metric-visual {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  .bar {
    width: 60px;
    border-radius: 8px 8px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
  }

  .original {
    background: var(--primary);
  }

  .compressed {
    background: var(--success);
  }
}

.bandwidth-original,
.bandwidth-compressed {
  display: flex;
  flex-direction: column;
  align-items: center;

  .data {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .label {
    font-weight: 600;
  }
}

.bandwidth-original .data {
  color: var(--primary);
}

.bandwidth-compressed .data {
  color: var(--success);
}

.cpu-usage {
  margin: 2rem 0;

  .usage-value {
    font-size: 2rem;
    font-weight: 700;
    margin: 0.5rem 0 1.5rem;
    color: var(--warning);
  }

  .usage-label {
    font-weight: 600;
    color: #555;
  }
}

.performance-tips {
  background: #f9faff;
  border-radius: 12px;
  padding: 1.8rem;
  margin-top: 2rem;
  border-left: 4px solid var(--accent);

  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: var(--dark);
  }

  ul {
    list-style: none;

    li {
      padding: 0.5rem 0;
      position: relative;
      padding-left: 1.8rem;

      &::before {
        content: '✓';
        color: var(--success);
        position: absolute;
        left: 0;
        top: 0.5rem;
        font-weight: 700;
      }
    }
  }
}

.verification-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.method {
  background: #f8f9ff;
  border-radius: 16px;
  padding: 1.8rem;
  border: 1px solid #eef0ff;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: var(--dark);
  }

  p {
    margin-bottom: 1rem;
  }
}

.headers-example {
  background: #2d3748;
  color: white;
  padding: 1.2rem;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  margin: 1rem 0;

  .header-value {
    color: var(--success);
    font-weight: 600;
  }
}

pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1.2rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  margin: 1rem 0;

  code {
    display: block;
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
  .header-content h1 {
    font-size: 2.5rem;
  }

  .compression-visual {
    flex-direction: column;
    gap: 1.5rem;

    .arrow {
      transform: rotate(90deg);
      margin: 0.5rem 0;
    }
  }
}
</style>
