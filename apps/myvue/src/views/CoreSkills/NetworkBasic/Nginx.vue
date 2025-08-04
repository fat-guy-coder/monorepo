<template>
  <div class="nginx-reference">
    <div class="header">
      <h1>Nginx Web 服务器参考手册</h1>
      <p>高性能 HTTP 服务器和反向代理解决方案</p>
    </div>

    <div class="tabs">
      <button :class="{ active: activeTab === 'overview' }" @click="activeTab = 'overview'">
        概述
      </button>
      <button :class="{ active: activeTab === 'features' }" @click="activeTab = 'features'">
        功能特性
      </button>
      <button :class="{ active: activeTab === 'config' }" @click="activeTab = 'config'">
        配置参考
      </button>
      <button :class="{ active: activeTab === 'scenarios' }" @click="activeTab = 'scenarios'">
        使用场景
      </button>
    </div>

    <div class="content">
      <!-- 概述部分 -->
      <section v-show="activeTab === 'overview'">
        <h2>Nginx 概述</h2>
        <div class="card">
          <p>Nginx（发音为"engine x"）是一个高性能的HTTP和反向代理服务器，由Igor Sysoev于2004年创建。</p>

          <div class="card-row">
            <div class="card-col">
              <h3>核心特点</h3>
              <ul>
                <li>异步非阻塞事件驱动架构</li>
                <li>高并发处理能力</li>
                <li>低内存消耗</li>
                <li>模块化设计</li>
              </ul>
            </div>
            <div class="card-col">
              <h3>主要功能</h3>
              <ul>
                <li>HTTP 和 HTTPS 服务器</li>
                <li>反向代理和负载均衡</li>
                <li>邮件代理服务器</li>
                <li>TCP/UDP 代理</li>
              </ul>
            </div>
          </div>

          <h3>Nginx vs Apache</h3>
          <div class="comparison">
            <div>
              <h4>Nginx 优势</h4>
              <ul>
                <li>处理高并发请求更高效</li>
                <li>内存占用更低</li>
                <li>配置更简洁</li>
                <li>更适合静态内容服务</li>
              </ul>
            </div>
            <div>
              <h4>Apache 优势</h4>
              <ul>
                <li>.htaccess 动态配置</li>
                <li>模块生态更丰富</li>
                <li>对动态内容处理更灵活</li>
                <li>兼容性更好</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 功能特性部分 -->
      <section v-show="activeTab === 'features'">
        <h2>Nginx 功能特性</h2>
        <div class="card">
          <div class="pros-cons">
            <div class="pros">
              <h3>优点</h3>
              <ul>
                <li><strong>高性能</strong>：处理静态内容速度极快</li>
                <li><strong>高并发</strong>：单机可处理数万并发连接</li>
                <li><strong>低资源消耗</strong>：内存和CPU占用少</li>
                <li><strong>稳定性</strong>：长时间运行无内存泄漏</li>
                <li><strong>热部署</strong>：无需重启更新配置</li>
                <li><strong>模块化</strong>：通过模块扩展功能</li>
              </ul>
            </div>
            <div class="cons">
              <h3>缺点</h3>
              <ul>
                <li><strong>动态内容处理</strong>：不如Apache灵活</li>
                <li><strong>模块开发</strong>：不如Apache成熟</li>
                <li><strong>Windows支持</strong>：性能不如Linux版</li>
                <li><strong>配置语法</strong>：学习曲线较陡峭</li>
              </ul>
            </div>
          </div>

          <h3>核心模块</h3>
          <div class="modules">
            <div class="module-card">
              <div class="module-icon">🌐</div>
              <h4>HTTP核心模块</h4>
              <p>提供HTTP服务器功能，处理客户端请求</p>
            </div>
            <div class="module-card">
              <div class="module-icon">🔄</div>
              <h4>反向代理模块</h4>
              <p>将客户端请求转发到后端服务器</p>
            </div>
            <div class="module-card">
              <div class="module-icon">⚖️</div>
              <h4>负载均衡模块</h4>
              <p>在多台服务器间分配流量</p>
            </div>
            <div class="module-card">
              <div class="module-icon">🔒</div>
              <h4>SSL/TLS模块</h4>
              <p>提供HTTPS加密连接支持</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 配置参考部分 -->
      <section v-show="activeTab === 'config'">
        <h2>Nginx 配置参考</h2>
        <div class="card">
          <h3>配置结构</h3>
          <pre class="config-block"># 主配置文件 nginx.conf
user  nginx;                     # 运行用户
worker_processes  auto;          # 工作进程数（通常设为CPU核心数）

events {
  worker_connections  1024;      # 每个工作进程的最大连接数
}

http {
  include       mime.types;      # MIME类型配置文件
  default_type  application/octet-stream;

  # 日志格式
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

  access_log  /var/log/nginx/access.log  main;

  sendfile        on;            # 高效文件传输模式
  keepalive_timeout  65;         # 保持连接超时时间

  # 包含其他配置文件
  include /etc/nginx/conf.d/*.conf;
}</pre>

          <h3>常用配置指令</h3>
          <div class="directives">
            <div class="directive">
              <h4>server 块</h4>
              <p>定义虚拟主机配置</p>
              <pre class="config-block">server {
  listen 80;                   # 监听端口
  server_name example.com;      # 域名

  location / {
    root /var/www/html;         # 网站根目录
    index index.html;           # 默认文档
  }
}</pre>
            </div>

            <div class="directive">
              <h4>location 块</h4>
              <p>配置请求处理规则</p>
              <pre class="config-block">location /static/ {
  alias /data/static/;          # 静态文件目录
  expires 30d;                  # 缓存时间
}

location ~ \.php$ {
  proxy_pass http://php_backend; # PHP请求转发
}</pre>
            </div>

            <div class="directive">
              <h4>反向代理配置</h4>
              <pre class="config-block">location / {
  proxy_pass http://backend_server;  # 后端服务器地址
  proxy_set_header Host $host;        # 传递原始域名
  proxy_set_header X-Real-IP $remote_addr;
}</pre>
            </div>

            <div class="directive">
              <h4>负载均衡配置</h4>
              <pre class="config-block">upstream backend {
  server backend1.example.com weight=5; # 权重设置
  server backend2.example.com;
  server backend3.example.com backup;   # 备用服务器
}

server {
  location / {
    proxy_pass http://backend;         # 使用上游服务器组
  }
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景部分 -->
      <section v-show="activeTab === 'scenarios'">
        <h2>Nginx 使用场景</h2>
        <div class="card">
          <div class="scenarios">
            <div class="scenario">
              <div class="scenario-icon">📶</div>
              <h3>静态内容服务</h3>
              <p>高效提供HTML、CSS、JavaScript和图片等静态资源</p>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🔄</div>
              <h3>反向代理</h3>
              <p>作为前端服务器接收请求并转发到后端应用服务器</p>
            </div>
            <div class="scenario">
              <div class="scenario-icon">⚖️</div>
              <h3>负载均衡</h3>
              <p>在多个服务器实例间分配流量，提高系统可用性</p>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🔒</div>
              <h3>SSL终端</h3>
              <p>处理HTTPS加密/解密，减轻后端服务器负担</p>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🚀</div>
              <h3>缓存加速</h3>
              <p>缓存动态内容，减少后端请求次数</p>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🛡️</div>
              <h3>安全防护</h3>
              <p>通过速率限制、IP黑名单等保护后端服务</p>
            </div>
          </div>

          <h3>典型架构示例</h3>
          <div class="architecture">
            <div class="arch-layer">
              <div class="arch-title">客户端</div>
              <div class="arch-box">Web 浏览器</div>
              <div class="arch-arrow">↓</div>
            </div>
            <div class="arch-layer">
              <div class="arch-title">Nginx 层</div>
              <div class="arch-box">负载均衡器</div>
              <div class="arch-box">SSL 终端</div>
              <div class="arch-box">静态内容服务</div>
              <div class="arch-arrow">↓</div>
            </div>
            <div class="arch-layer">
              <div class="arch-title">应用层</div>
              <div class="arch-box">Node.js 服务器</div>
              <div class="arch-box">Python Django</div>
              <div class="arch-box">Java Spring</div>
              <div class="arch-arrow">↓</div>
            </div>
            <div class="arch-layer">
              <div class="arch-title">数据层</div>
              <div class="arch-box">MySQL 数据库</div>
              <div class="arch-box">Redis 缓存</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="footer">
      <p>Nginx 参考手册 • 版本 1.23 • {{ new Date().getFullYear() }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('overview');
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e2e8f0;
@text-color: #2d3748;
@code-bg: #f6f8fa;
@code-text: #2f363d;
@success-color: #10b981;
@warning-color: #f59e0b;
@error-color: #ef4444;

// 布局变量
@card-radius: 8px;
@transition-speed: 0.2s;

.nginx-reference {
  font-family: 'Inter', sans-serif;
  background-color: @light-bg;
  color: @text-color;
  min-height: 100vh;
  padding-bottom: 40px;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  padding: 30px 0 20px;
  text-align: center;
  border-bottom: 1px solid @border-color;
  margin-bottom: 20px;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: @primary-color;
    margin: 0 0 8px 0;
  }

  p {
    font-size: 1.1rem;
    color: lighten(@text-color, 15%);
    margin: 0;
  }
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  justify-content: center;

  button {
    background: @card-bg;
    border: 1px solid @border-color;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 0.95rem;
    font-weight: 500;
    color: lighten(@text-color, 15%);
    cursor: pointer;
    transition: all @transition-speed;

    &:hover {
      border-color: @primary-color;
      color: @primary-color;
    }

    &.active {
      background: @primary-color;
      border-color: @primary-color;
      color: white;
    }
  }
}

.content {
  section {
    margin-bottom: 30px;

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: @secondary-color;
      margin: 0 0 15px 0;
      padding-bottom: 8px;
      border-bottom: 1px solid @border-color;
    }
  }
}

.card {
  background: @card-bg;
  border-radius: @card-radius;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;

  h3 {
    font-size: 1.2rem;
    color: darken(@primary-color, 10%);
    margin: 20px 0 15px 0;
  }

  .card-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    .card-col {
      flex: 1;
      padding: 15px;
      background: lighten(@light-bg, 1%);
      border-radius: @card-radius;

      ul {
        padding-left: 20px;
        margin: 10px 0;

        li {
          margin-bottom: 8px;
        }
      }
    }
  }
}

.comparison {
  display: flex;
  gap: 20px;
  margin-top: 15px;

  >div {
    flex: 1;
    padding: 15px;
    border-radius: @card-radius;
    background: lighten(@light-bg, 1%);

    h4 {
      margin-top: 0;
      color: @primary-color;
    }

    ul {
      padding-left: 20px;
    }
  }
}

.pros-cons {
  display: flex;
  gap: 20px;
  margin: 20px 0;

  .pros,
  .cons {
    flex: 1;
    padding: 15px;
    border-radius: @card-radius;
  }

  .pros {
    background: fade(@success-color, 8%);
    border-left: 4px solid @success-color;

    h3 {
      color: darken(@success-color, 10%);
    }
  }

  .cons {
    background: fade(@warning-color, 8%);
    border-left: 4px solid @warning-color;

    h3 {
      color: darken(@warning-color, 10%);
    }
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 10px;
      line-height: 1.5;
    }
  }
}

.modules {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin: 20px 0;

  .module-card {
    padding: 15px;
    background: lighten(@light-bg, 1%);
    border-radius: @card-radius;
    border: 1px solid @border-color;
    transition: all @transition-speed;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    }

    .module-icon {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    h4 {
      margin: 10px 0;
      color: @primary-color;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      color: lighten(@text-color, 15%);
    }
  }
}

.config-block {
  background: @code-bg;
  border-radius: @card-radius;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 15px 0;
  color: @code-text;
  border: 1px solid darken(@code-bg, 5%);
}

.directives {
  .directive {
    margin: 25px 0;

    h4 {
      margin: 15px 0 10px;
      color: darken(@primary-color, 10%);
      font-size: 1.1rem;
    }

    p {
      margin: 0 0 10px 0;
      color: lighten(@text-color, 10%);
    }
  }
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 25px 0;

  .scenario {
    padding: 20px;
    background: lighten(@light-bg, 1%);
    border-radius: @card-radius;
    border: 1px solid @border-color;

    .scenario-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    h3 {
      margin: 10px 0;
      color: @primary-color;
      font-size: 1.2rem;
    }

    p {
      margin: 0;
      color: lighten(@text-color, 15%);
    }
  }
}

.architecture {
  margin: 30px 0;
  padding: 20px;
  background: fade(@primary-color, 5%);
  border-radius: @card-radius;

  .arch-layer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;

    .arch-title {
      font-weight: 600;
      margin-bottom: 5px;
      color: @primary-color;
    }

    .arch-box {
      background: @card-bg;
      padding: 12px 20px;
      border-radius: @card-radius;
      border: 1px solid @border-color;
      margin: 5px 0;
      text-align: center;
      min-width: 200px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .arch-arrow {
      font-size: 1.5rem;
      color: @primary-color;
      margin: 5px 0;
    }
  }
}

.footer {
  text-align: center;
  padding: 30px 0 10px;
  margin-top: 20px;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
}

// 响应式设计
@media (max-width: 768px) {
  .tabs {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .card-row,
  .comparison,
  .pros-cons {
    flex-direction: column;
  }

  .modules,
  .scenarios {
    grid-template-columns: 1fr;
  }

  .architecture {
    .arch-box {
      min-width: 150px;
    }
  }
}
</style>
