<template>
  <div class="dns-module-container">
    <header>
      <div class="header-content">
        <h1><i class="fas fa-network-wired"></i> Node.js DNS 模块介绍</h1>
        <p class="subtitle">网络通信的核心域名解析工具</p>
      </div>
    </header>

    <div class="content-grid">
      <!-- DNS 概述 -->
      <section class="card overview">
        <div class="card-header">
          <div class="icon">
            <i class="fas fa-info-circle"></i>
          </div>
          <h2>DNS 模块概述</h2>
        </div>

        <div class="card-body">
          <div class="dns-explanation">
            <div class="dns-flow">
              <div class="step">
                <div class="step-icon">
                  <i class="fas fa-laptop-code"></i>
                </div>
                <div class="step-label">应用程序</div>
              </div>
              <div class="arrow">
                <i class="fas fa-arrow-right"></i>
              </div>
              <div class="step">
                <div class="step-icon">
                  <i class="fas fa-server"></i>
                </div>
                <div class="step-label">DNS 模块</div>
              </div>
              <div class="arrow">
                <i class="fas fa-arrow-right"></i>
              </div>
              <div class="step">
                <div class="step-icon">
                  <i class="fas fa-globe"></i>
                </div>
                <div class="step-label">DNS 服务器</div>
              </div>
            </div>

            <div class="dns-description">
              <p>
                DNS（Domain Name System）模块是 Node.js
                的核心模块之一，用于域名解析服务。它将人类可读的域名（如
                google.com）转换为机器可读的 IP 地址（如 142.250.185.206）。
              </p>

              <div class="key-points">
                <div class="point">
                  <i class="fas fa-check-circle"></i>
                  <h3>核心作用</h3>
                  <p>实现域名与 IP 地址的双向解析</p>
                </div>
                <div class="point">
                  <i class="fas fa-check-circle"></i>
                  <h3>重要性</h3>
                  <p>网络通信的基础设施，影响应用性能和可靠性</p>
                </div>
                <div class="point">
                  <i class="fas fa-check-circle"></i>
                  <h3>特点</h3>
                  <p>支持同步/异步操作，提供多种解析方法</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- DNS 核心 API -->
      <section class="card api-reference">
        <div class="card-header">
          <div class="icon">
            <i class="fas fa-code"></i>
          </div>
          <h2>核心 API 介绍</h2>
        </div>

        <div class="card-body">
          <div class="api-tabs">
            <div class="tab-buttons">
              <button
                v-for="tab in apiTabs"
                :key="tab.id"
                :class="{ active: activeApiTab === tab.id }"
                @click="activeApiTab = tab.id"
              >
                {{ tab.label }}
              </button>
            </div>

            <div class="tab-content">
              <!-- 异步解析方法 -->
              <div v-if="activeApiTab === 'async'" class="async-methods">
                <div class="api-method" v-for="method in asyncMethods" :key="method.name">
                  <div class="method-header">
                    <div class="method-name">{{ method.name }}</div>
                    <div class="method-type">{{ method.type }}</div>
                  </div>
                  <div class="method-description">
                    {{ method.description }}
                  </div>
                  <div class="method-signature">
                    <pre><code>{{ method.signature }}</code></pre>
                  </div>
                  <div class="method-params">
                    <h4>参数说明</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>参数</th>
                          <th>类型</th>
                          <th>说明</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="param in method.params" :key="param.name">
                          <td>{{ param.name }}</td>
                          <td>{{ param.type }}</td>
                          <td>{{ param.description }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="method-example">
                    <h4>使用示例</h4>
                    <pre><code>{{ method.example }}</code></pre>
                  </div>
                </div>
              </div>

              <!-- 同步解析方法 -->
              <div v-if="activeApiTab === 'sync'" class="sync-methods">
                <div class="api-method" v-for="method in syncMethods" :key="method.name">
                  <div class="method-header">
                    <div class="method-name">{{ method.name }}</div>
                    <div class="method-type">{{ method.type }}</div>
                  </div>
                  <div class="method-description">
                    {{ method.description }}
                  </div>
                  <div class="method-signature">
                    <pre><code>{{ method.signature }}</code></pre>
                  </div>
                  <div class="method-params">
                    <h4>参数说明</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>参数</th>
                          <th>类型</th>
                          <th>说明</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="param in method.params" :key="param.name">
                          <td>{{ param.name }}</td>
                          <td>{{ param.type }}</td>
                          <td>{{ param.description }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="method-example">
                    <h4>使用示例</h4>
                    <pre><code>{{ method.example }}</code></pre>
                  </div>
                </div>
              </div>

              <!-- DNS 服务器设置 -->
              <div v-if="activeApiTab === 'servers'" class="server-methods">
                <div class="api-method">
                  <div class="method-header">
                    <div class="method-name">dns.getServers()</div>
                    <div class="method-type">同步方法</div>
                  </div>
                  <div class="method-description">获取当前用于 DNS 解析的服务器地址列表</div>
                  <div class="method-signature">
                    <pre><code>dns.getServers(): string[]</code></pre>
                  </div>
                  <div class="method-example">
                    <h4>使用示例</h4>
                    <pre><code>const dns = require('dns');
console.log(dns.getServers());
// 输出: ['8.8.8.8', '8.8.4.4']</code></pre>
                  </div>
                </div>

                <div class="api-method">
                  <div class="method-header">
                    <div class="method-name">dns.setServers()</div>
                    <div class="method-type">同步方法</div>
                  </div>
                  <div class="method-description">设置用于 DNS 解析的服务器地址</div>
                  <div class="method-signature">
                    <pre><code>dns.setServers(servers: string[]): void</code></pre>
                  </div>
                  <div class="method-params">
                    <h4>参数说明</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>参数</th>
                          <th>类型</th>
                          <th>说明</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>servers</td>
                          <td>string[]</td>
                          <td>DNS 服务器地址数组，如 ['8.8.8.8', '1.1.1.1']</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="method-example">
                    <h4>使用示例</h4>
                    <pre><code>const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 适用场景 -->
      <section class="card use-cases">
        <div class="card-header">
          <div class="icon">
            <i class="fas fa-lightbulb"></i>
          </div>
          <h2>适用场景</h2>
        </div>

        <div class="card-body">
          <div class="scenarios">
            <div class="scenario" v-for="(scenario, index) in useCases" :key="index">
              <div class="scenario-icon">
                <i :class="scenario.icon"></i>
              </div>
              <div class="scenario-content">
                <h3>{{ scenario.title }}</h3>
                <p>{{ scenario.description }}</p>
                <div class="scenario-example" v-if="scenario.example">
                  <pre><code>{{ scenario.example }}</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="best-practices">
            <h3><i class="fas fa-star"></i> 最佳实践</h3>
            <ul>
              <li>在关键服务中使用异步 DNS 解析，避免阻塞事件循环</li>
              <li>设置合理的超时时间，处理 DNS 解析失败的情况</li>
              <li>缓存解析结果，减少重复 DNS 查询</li>
              <li>使用可靠的 DNS 服务器（如 Google DNS 8.8.8.8 或 Cloudflare 1.1.1.1）</li>
              <li>监控 DNS 解析性能，及时发现解析问题</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 错误处理 -->
      <section class="card error-handling">
        <div class="card-header">
          <div class="icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <h2>错误处理</h2>
        </div>

        <div class="card-body">
          <div class="errors">
            <div class="error" v-for="error in commonErrors" :key="error.code">
              <div class="error-code">{{ error.code }}</div>
              <div class="error-info">
                <div class="error-name">{{ error.name }}</div>
                <div class="error-description">{{ error.description }}</div>
              </div>
            </div>
          </div>

          <div class="error-example">
            <h3><i class="fas fa-code"></i> 错误处理示例</h3>
            <pre><code>const dns = require('dns');

dns.lookup('example.com', (err, address, family) => {
  if (err) {
    // 处理不同错误类型
    switch (err.code) {
      case 'ENOTFOUND':
        console.error('域名未找到:', err.hostname);
        break;
      case 'ETIMEOUT':
        console.error('DNS查询超时');
        break;
      case 'ESERVFAIL':
        console.error('DNS服务器返回失败');
        break;
      default:
        console.error('DNS解析错误:', err);
    }
    return;
  }

  console.log(`地址: ${address} 地址族: IPv${family}`);
});</code></pre>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <p>Node.js 网络编程 &copy; {{ new Date().getFullYear() }} - DNS 模块介绍</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// API 标签页
const apiTabs = ref([
  { id: 'async', label: '异步解析方法' },
  { id: 'sync', label: '同步解析方法' },
  { id: 'servers', label: 'DNS 服务器设置' },
])
const activeApiTab = ref('async')

// 异步方法
const asyncMethods = ref([
  {
    name: 'dns.lookup()',
    type: '异步',
    description: '解析主机名（如 "google.com"）为第一个找到的 A（IPv4）或 AAAA（IPv6）记录',
    signature: 'dns.lookup(hostname[, options], callback)',
    params: [
      { name: 'hostname', type: 'string', description: '要解析的主机名' },
      {
        name: 'options',
        type: 'Object | integer',
        description: '可选项，可以是对象或整数（地址族）',
      },
      { name: 'callback', type: 'Function', description: '解析完成后的回调函数' },
    ],
    example: `const dns = require('dns');
dns.lookup('example.com', (err, address, family) => {
  console.log('地址: %j 地址族: IPv%s', address, family);
});`,
  },
  {
    name: 'dns.resolve()',
    type: '异步',
    description: '使用指定的记录类型解析主机名',
    signature: 'dns.resolve(hostname, rrtype, callback)',
    params: [
      { name: 'hostname', type: 'string', description: '要解析的主机名' },
      { name: 'rrtype', type: 'string', description: '资源记录类型（如 "A", "MX", "TXT" 等）' },
      { name: 'callback', type: 'Function', description: '解析完成后的回调函数' },
    ],
    example: `const dns = require('dns');
dns.resolve('google.com', 'MX', (err, records) => {
  if (err) throw err;
  console.log('MX 记录:', records);
});`,
  },
  {
    name: 'dns.reverse()',
    type: '异步',
    description: '执行反向 DNS 查询，将 IP 地址解析为主机名数组',
    signature: 'dns.reverse(ip, callback)',
    params: [
      { name: 'ip', type: 'string', description: '要反向解析的 IP 地址' },
      { name: 'callback', type: 'Function', description: '解析完成后的回调函数' },
    ],
    example: `const dns = require('dns');
dns.reverse('142.250.185.206', (err, hostnames) => {
  console.log('反向解析结果:', hostnames);
});`,
  },
])

// 同步方法
const syncMethods = ref([
  {
    name: 'dns.lookupSync()',
    type: '同步',
    description: 'dns.lookup() 的同步版本',
    signature: 'dns.lookupSync(hostname[, options])',
    params: [
      { name: 'hostname', type: 'string', description: '要解析的主机名' },
      {
        name: 'options',
        type: 'Object | integer',
        description: '可选项，可以是对象或整数（地址族）',
      },
    ],
    example: `const dns = require('dns');
try {
  const address = dns.lookupSync('example.com');
  console.log('地址:', address);
} catch (err) {
  console.error('解析失败:', err);
}`,
  },
  {
    name: 'dns.resolveSync()',
    type: '同步',
    description: 'dns.resolve() 的同步版本',
    signature: 'dns.resolveSync(hostname, rrtype)',
    params: [
      { name: 'hostname', type: 'string', description: '要解析的主机名' },
      { name: 'rrtype', type: 'string', description: '资源记录类型' },
    ],
    example: `const dns = require('dns');
try {
  const records = dns.resolveSync('google.com', 'A');
  console.log('A 记录:', records);
} catch (err) {
  console.error('解析失败:', err);
}`,
  },
])

// 适用场景
const useCases = ref([
  {
    icon: 'fas fa-sync-alt',
    title: '域名解析',
    description: '将域名转换为 IP 地址以建立网络连接',
    example: `// 在 HTTP 请求前解析域名
const dns = require('dns');
const http = require('http');

dns.lookup('api.example.com', (err, address) => {
  if (err) throw err;

  const options = {
    hostname: address,
    port: 80,
    path: '/data'
  };

  http.get(options, (res) => {
    // 处理响应
  });
});`,
  },
  {
    icon: 'fas fa-envelope',
    title: '邮件服务器配置',
    description: '解析域名的 MX 记录以确定邮件服务器',
    example: `// 获取域名的邮件服务器
dns.resolve('example.com', 'MX', (err, addresses) => {
  if (err) throw err;

  // 按优先级排序
  addresses.sort((a, b) => a.priority - b.priority);
  console.log('邮件服务器:', addresses);
});`,
  },
  {
    icon: 'fas fa-shield-alt',
    title: '安全验证',
    description: '检查域名的 TXT 记录（如 SPF、DKIM）',
    example: `// 验证域名的 SPF 记录
dns.resolve('example.com', 'TXT', (err, records) => {
  if (err) throw err;

  const spfRecord = records.flat().find(record =>
    record.includes('v=spf1')
  );

  if (spfRecord) {
    console.log('SPF 记录:', spfRecord);
  } else {
    console.log('未找到 SPF 记录');
  }
});`,
  },
  {
    icon: 'fas fa-server',
    title: '服务发现',
    description: '使用 SRV 记录发现网络服务',
    example: `// 发现 _http._tcp 服务
dns.resolve('_http._tcp.example.com', 'SRV', (err, addresses) => {
  if (err) throw err;

  console.log('HTTP 服务:', addresses);
});`,
  },
  {
    icon: 'fas fa-globe-americas',
    title: '反向 IP 查询',
    description: '根据 IP 地址查找关联的域名',
    example: `// 反向解析 IP 地址
dns.reverse('8.8.8.8', (err, hostnames) => {
  console.log('主机名:', hostnames); // dns.google
});`,
  },
])

// 常见错误
const commonErrors = ref([
  { code: 'ENOTFOUND', name: 'Domain Not Found', description: '找不到域名' },
  { code: 'ESERVFAIL', name: 'Server Failure', description: 'DNS 服务器返回失败' },
  { code: 'ENODATA', name: 'No Data', description: '存在域名但无请求类型的记录' },
  { code: 'ETIMEOUT', name: 'Timeout', description: 'DNS 查询超时' },
  { code: 'EBADRESP', name: 'Bad Response', description: 'DNS 响应格式错误' },
  { code: 'ECONNREFUSED', name: 'Connection Refused', description: '无法连接 DNS 服务器' },
])
</script>

<style lang="less" scoped>
.dns-module-container {
  font-family: 'Roboto', sans-serif;
  background: #f8fafc;
  color: #2d3748;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  .header-content {
    max-width: 900px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    font-weight: 600;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 800px;
    margin: 0 auto;
    font-weight: 300;
    color: #e0e7ff;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  &.overview {
    border-top: 4px solid #3498db;
  }
  &.api-reference {
    border-top: 4px solid #2ecc71;
  }
  &.use-cases {
    border-top: 4px solid #f39c12;
  }
  &.error-handling {
    border-top: 4px solid #e74c3c;
  }
}

.card-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;

  .icon {
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    i {
      font-size: 1.2rem;
      color: #3498db;
    }
  }

  h2 {
    font-size: 1.6rem;
    color: #2d3748;
  }
}

.card-body {
  padding: 20px;
}

.dns-explanation {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.dns-flow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f0f7ff;
  border-radius: 8px;

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;

    .step-icon {
      width: 60px;
      height: 60px;
      background: #3498db;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;

      i {
        font-size: 1.8rem;
      }
    }

    .step-label {
      font-weight: 500;
    }
  }

  .arrow {
    color: #3498db;
    font-size: 1.5rem;
  }
}

.key-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;

  .point {
    background: #f0f7ff;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #3498db;

    i {
      color: #3498db;
      font-size: 1.5rem;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 8px;
    }
  }
}

.api-tabs {
  .tab-buttons {
    display: flex;
    background: #f1f3f5;
    border-radius: 8px;
    padding: 5px;
    margin-bottom: 20px;

    button {
      flex: 1;
      padding: 12px;
      border: none;
      background: none;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        background: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }
}

.api-method {
  background: #f8fafc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  border: 1px solid #e2e8f0;

  &:last-child {
    margin-bottom: 0;
  }
}

.method-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;

  .method-name {
    font-size: 1.3rem;
    font-weight: 600;
    color: #2d3748;
  }

  .method-type {
    background: #e9f5ff;
    color: #3498db;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
  }
}

.method-description {
  margin-bottom: 15px;
  line-height: 1.7;
}

.method-signature {
  background: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  font-family: 'Source Code Pro', monospace;
  font-size: 14px;
  overflow-x: auto;
  margin-bottom: 20px;

  pre {
    margin: 0;
  }

  code {
    font-family: 'Source Code Pro', monospace;
  }
}

.method-params {
  margin-bottom: 20px;

  h4 {
    margin-bottom: 15px;
    color: #2d3748;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }

    th {
      background: #f7fafc;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: #f8fafc;
    }
  }
}

.method-example {
  h4 {
    margin-bottom: 10px;
    color: #2d3748;
  }

  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 15px;
    border-radius: 6px;
    font-family: 'Source Code Pro', monospace;
    font-size: 14px;
    overflow-x: auto;

    code {
      font-family: 'Source Code Pro', monospace;
    }
  }
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
}

.scenario {
  display: flex;
  gap: 15px;
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;

  .scenario-icon {
    width: 50px;
    height: 50px;
    background: #3498db;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    i {
      font-size: 1.5rem;
    }
  }

  .scenario-content {
    flex: 1;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 10px;
      color: #2d3748;
    }

    .scenario-example {
      margin-top: 15px;

      pre {
        background: #2d3748;
        color: #e2e8f0;
        padding: 15px;
        border-radius: 6px;
        font-family: 'Source Code Pro', monospace;
        font-size: 14px;
        overflow-x: auto;
      }
    }
  }
}

.best-practices {
  background: #e9f5ff;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #3498db;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    color: #2d3748;
  }

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 10px;
    }
  }
}

.errors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.error {
  display: flex;
  gap: 15px;
  background: #fff5f5;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #e74c3c;

  .error-code {
    width: 80px;
    font-weight: 700;
    color: #e74c3c;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
  }

  .error-info {
    flex: 1;

    .error-name {
      font-weight: 600;
      margin-bottom: 5px;
    }
  }
}

.error-example {
  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 20px;
    border-radius: 8px;
    font-family: 'Source Code Pro', monospace;
    font-size: 14px;
    overflow-x: auto;
  }
}

footer {
  text-align: center;
  padding: 25px;
  background: white;
  color: #4a5568;
  font-size: 0.9rem;
  border-radius: 12px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
}

@media (max-width: 768px) {
  header h1 {
    font-size: 2rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .dns-flow {
    flex-direction: column;
    gap: 20px;

    .arrow {
      transform: rotate(90deg);
    }
  }
}

@media (max-width: 480px) {
  header h1 {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .api-tabs .tab-buttons {
    flex-direction: column;
  }
}
</style>
