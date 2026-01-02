<template>
  <div class="dns-container">
    <!-- 封面标题 -->
    <header class="header">
      <h1 class="title">域名系统（DNS）基础介绍</h1>
      <div class="subtitle">互联网的地址簿与导航系统</div>
    </header>

    <!-- DNS架构图示 -->
    <section class="architecture-section">
      <div class="dns-architecture">
        <div v-for="layer in dnsLayers" :key="layer.name" class="dns-layer" :style="{ backgroundColor: layer.color }">
          <div class="layer-icon">{{ layer.icon }}</div>
          <h3>{{ layer.name }}</h3>
          <p>{{ layer.description }}</p>
        </div>
      </div>
    </section>

    <!-- 查询流程 -->
    <section class="query-section">
      <div class="query-process">
        <h2 class="section-title">DNS查询流程</h2>
        <div class="query-diagram">
          <div v-for="step in querySteps" :key="step.name" class="query-step" :style="{ borderColor: step.color }">
            <div class="step-order">{{ step.order }}</div>
            <div class="step-content">
              <h3>{{ step.name }}</h3>
              <p>{{ step.description }}</p>
              <div class="step-details" v-if="step.details">
                <span v-for="detail in step.details" :key="detail" class="detail-tag">
                  {{ detail }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 记录类型 -->
    <section class="record-section">
      <div class="record-types">
        <h2 class="section-title">DNS记录类型</h2>
        <div class="record-grid">
          <div v-for="record in dnsRecords" :key="record.type" class="record-card"
            :style="{ borderColor: record.color }">
            <div class="record-header">
              <span class="record-type">{{ record.type }}</span>
              <span class="record-code">{{ record.code }}</span>
            </div>
            <div class="record-content">
              <pre class="record-example">{{ record.example }}</pre>
              <p class="record-desc">{{ record.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DNS安全 -->
    <section class="security-section">
      <div class="security-features">
        <h2 class="section-title">DNS安全扩展</h2>
        <div class="security-cards">
          <div v-for="feature in securityFeatures" :key="feature.title" class="security-card"
            :style="{ backgroundColor: feature.color }">
            <div class="security-icon">🔒</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            <pre class="security-example" v-if="feature.example">{{ feature.example }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 相关协议对比 -->
    <section class="compare-section">
      <div class="protocol-comparison">
        <h2 class="section-title">相关协议对比</h2>
        <table>
          <thead>
            <tr>
              <th>协议</th>
              <th>端口</th>
              <th>加密</th>
              <th>主要用途</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="proto in relatedProtocols" :key="proto.name">
              <td>{{ proto.name }}</td>
              <td>{{ proto.port }}</td>
              <td :class="{ yes: proto.encrypted }">{{ proto.encrypted ? '✔' : '×' }}</td>
              <td>{{ proto.purpose }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// DNS层次结构
const dnsLayers = [
  {
    name: '根域名服务器',
    icon: '🌍',
    description: '全球13组根服务器，存储顶级域名信息',
    color: '#FF6B6B'
  },
  {
    name: '顶级域名服务器',
    icon: '🏛️',
    description: '管理.com/.org等顶级域名',
    color: '#4ECDC4'
  },
  {
    name: '权威域名服务器',
    icon: '🏢',
    description: '存储具体域名的解析记录',
    color: '#45B7D1'
  },
  {
    name: '本地DNS服务器',
    icon: '🏠',
    description: '运营商提供的递归解析服务器',
    color: '#96CEB4'
  }
]

// 查询步骤
const querySteps = [
  {
    order: '1',
    name: '递归查询',
    description: '客户端向本地DNS服务器发起请求',
    color: '#FFD700',
    details: ['客户端缓存', 'hosts文件', '系统配置']
  },
  {
    order: '2',
    name: '迭代查询',
    description: '本地DNS服务器向根域名服务器查询',
    color: '#87CEEB',
    details: ['根提示文件', 'UDP 53端口']
  },
  {
    order: '3',
    name: 'TLD查询',
    description: '获取顶级域名服务器地址',
    color: '#98FB98',
    details: ['顶级域名', '域名授权']
  },
  {
    order: '4',
    name: '权威解析',
    description: '最终获取目标域名的IP地址',
    color: '#FFA07A',
    details: ['A记录', '缓存TTL']
  }
]

// DNS记录类型
const dnsRecords = [
  {
    type: 'A记录',
    code: 1,
    description: '将域名指向IPv4地址',
    example: 'example.com. 3600 IN A 192.0.2.1',
    color: '#FF6B6B'
  },
  {
    type: 'AAAA',
    code: 28,
    description: '域名到IPv6地址的映射',
    example: 'example.com. 3600 IN AAAA 2001:db8::1',
    color: '#4ECDC4'
  },
  {
    type: 'CNAME',
    code: 5,
    description: '设置域名别名',
    example: 'www.example.com. IN CNAME example.com.',
    color: '#45B7D1'
  },
  {
    type: 'MX',
    code: 15,
    description: '邮件服务器记录',
    example: 'example.com. 3600 IN MX 10 mail.example.com.',
    color: '#96CEB4'
  },
  {
    type: 'TXT',
    code: 16,
    description: '文本记录（用于验证等）',
    example: 'example.com. IN TXT "v=spf1 include:_spf.example.com ~all"',
    color: '#FFD700'
  },
  {
    type: 'NS',
    code: 2,
    description: '指定域名服务器',
    example: 'example.com. 3600 IN NS ns1.example.com.',
    color: '#FFA07A'
  }
]

// 安全特性
const securityFeatures = [
  {
    title: 'DNSSEC',
    description: '通过数字签名验证DNS响应真实性',
    color: '#FFEBEE',
    example: 'example.com. 3600 IN DNSKEY 256 3 13 (...base64...)'
  },
  {
    title: 'DoH',
    description: 'DNS over HTTPS（加密DNS查询）',
    color: '#E3F2FD',
    example: 'GET /dns-query?dns=AAABAAAB... HTTP/1.1'
  },
  {
    title: 'DoT',
    description: 'DNS over TLS（安全传输层加密）',
    color: '#E8F5E9',
    example: 'SSL握手 -> 通过TLS隧道传输DNS'
  }
]

// 相关协议
const relatedProtocols = [
  { name: 'DNS', port: 53, encrypted: false, purpose: '基础域名解析' },
  { name: 'DoH', port: 443, encrypted: true, purpose: 'HTTPS加密DNS' },
  { name: 'DoT', port: 853, encrypted: true, purpose: 'TLS加密DNS' },
  { name: 'mDNS', port: 5353, encrypted: false, purpose: '本地网络发现' }
]
</script>

<style lang="less">
// 设计变量
@primary-color: #2c3e50;
@secondary-color: #42b983;
@bg-color: #f8f9fa;
@text-color: #34495e;

.dns-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .header {
    text-align: center;
    margin-bottom: 3rem;

    .title {
      color: @primary-color;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: lighten(@text-color, 20%);
      font-size: 1.2rem;
    }
  }

  .architecture-section {
    .dns-architecture {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;

      .dns-layer {
        padding: 2rem;
        border-radius: 12px;
        color: white;
        transition: transform 0.3s;

        &:hover {
          transform: translateY(-5px);
        }

        .layer-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        h3 {
          margin: 0.5rem 0;
        }
      }
    }
  }

  .query-section {
    .query-diagram {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;

      .query-step {
        padding: 1.5rem;
        border-left: 4px solid;
        border-radius: 8px;
        background: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        position: relative;

        .step-order {
          position: absolute;
          top: -15px;
          left: -15px;
          width: 30px;
          height: 30px;
          background: white;
          border: 2px solid;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .step-details {
          margin-top: 1rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          .detail-tag {
            background: rgba(0, 0, 0, 0.05);
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
          }
        }
      }
    }
  }

  .record-section {
    .record-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .record-card {
        background: white;
        border-top: 4px solid;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        .record-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;

          .record-type {
            font-weight: bold;
            font-size: 1.2rem;
          }

          .record-code {
            background: rgba(0, 0, 0, 0.1);
            padding: 0.2rem 0.8rem;
            border-radius: 15px;
          }
        }

        .record-example {
          background: darken(@bg-color, 3%);
          padding: 1rem;
          border-radius: 6px;
          font-family: 'Fira Code', monospace;
          overflow-x: auto;
        }
      }
    }
  }

  .security-section {
    .security-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .security-card {
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        .security-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .security-example {
          background: rgba(0, 0, 0, 0.05);
          padding: 1rem;
          border-radius: 6px;
          margin-top: 1rem;
        }
      }
    }
  }

  .compare-section {
    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      th,
      td {
        padding: 1rem;
        text-align: left;
      }

      th {
        background: @primary-color;
        color: white;
      }

      td.yes {
        color: #27ae60;
        font-weight: bold;
      }

      tr:nth-child(even) {
        background: @bg-color;
      }
    }
  }

  .section-title {
    color: @primary-color;
    border-left: 4px solid @secondary-color;
    padding-left: 1rem;
    margin: 2rem 0;
  }
}
</style>
