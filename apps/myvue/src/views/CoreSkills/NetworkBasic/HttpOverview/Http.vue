<template>
  <div class="http-container">
    <!-- 头部展示区 -->
    <header class="header">
      <div class="header-content">
        <h1>HTTP协议基础介绍</h1>
        <p class="subtitle">互联网通信的基础协议发展与演进</p>
        <div class="intro-box">
          <p class="intro-text">
            HTTP（HyperText Transfer Protocol）是万维网（WWW）的数据通信基础，定义了客户端与服务器之间如何格式化和传输消息。
          </p>
          <div class="release-info">
            <span class="release-item">1989年诞生</span>
            <span class="release-item">应用层协议</span>
            <span class="release-item">客户端-服务器模型</span>
          </div>
        </div>
      </div>
      <div class="protocol-evolution">
        <div class="protocol-timeline">
          <div class="timeline-item" v-for="(item, index) in timeline" :key="index">
            <div class="timeline-dot" :class="{ 'dot-active': item.active }"></div>
            <div class="timeline-content">
              <h3>{{ item.year }}</h3>
              <p>{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- HTTP基础概念 -->
    <section class="concept-section">
      <h2 class="section-title"><span class="icon">📚</span> HTTP基础概念</h2>

      <div class="concept-grid">
        <div class="concept-card">
          <div class="concept-icon">🔗</div>
          <h3>无状态协议</h3>
          <p>每个请求都是独立的，服务器不保留客户端请求历史记录</p>
        </div>
        <div class="concept-card">
          <div class="concept-icon">🌐</div>
          <h3>基于TCP/IP</h3>
          <p>建立在TCP连接之上，确保数据传输的可靠性</p>
        </div>
        <div class="concept-card">
          <div class="concept-icon">🔄</div>
          <h3>请求/响应模型</h3>
          <p>客户端发起请求，服务器返回响应</p>
        </div>
        <div class="concept-card">
          <div class="concept-icon">🔒</div>
          <h3>可扩展性</h3>
          <p>通过请求头、响应头扩展功能</p>
        </div>
      </div>

      <div class="workflow">
        <h3>HTTP工作流程</h3>
        <div class="workflow-steps">
          <div class="step">
            <div class="step-number">1</div>
            <p>建立TCP连接</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-number">2</div>
            <p>发送HTTP请求</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-number">3</div>
            <p>服务器处理请求</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-number">4</div>
            <p>返回HTTP响应</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-number">5</div>
            <p>关闭TCP连接</p>
          </div>
        </div>
      </div>
    </section>

    <!-- HTTP版本对比 -->
    <section class="versions-section">
      <h2 class="section-title"><span class="icon">🔄</span> HTTP协议演进</h2>

      <div class="version-tabs">
        <div class="tabs-header">
          <button v-for="(version, index) in versions" :key="index" :class="{ active: activeVersion === index }"
            @click="activeVersion = index">
            {{ version.name }}
          </button>
        </div>

        <div class="tabs-content">
          <div v-for="(version, index) in versions" :key="index" v-show="activeVersion === index"
            class="version-details">
            <div class="version-header">
              <h3>{{ version.name }} ({{ version.year }})</h3>
              <div class="version-tag" :style="{ backgroundColor: version.color }">
                {{ version.tag }}
              </div>
            </div>

            <div class="version-content">
              <div class="features">
                <h4>核心特性</h4>
                <ul>
                  <li v-for="(feature, fIndex) in version.features" :key="fIndex">{{ feature }}</li>
                </ul>
              </div>

              <div class="tech-details">
                <div class="detail-card">
                  <div class="detail-title">请求方法</div>
                  <div class="detail-content">
                    <span v-for="(method, mIndex) in version.methods" :key="mIndex" class="method-tag">
                      {{ method }}
                    </span>
                  </div>
                </div>

                <div class="detail-card">
                  <div class="detail-title">状态码</div>
                  <div class="detail-content">
                    <span v-for="(code, cIndex) in version.statusCodes" :key="cIndex" class="status-tag">
                      {{ code }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li v-for="(pro, pIndex) in version.pros" :key="pIndex">{{ pro }}</li>
                  </ul>
                </div>

                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li v-for="(con, cIndex) in version.cons" :key="cIndex">{{ con }}</li>
                  </ul>
                </div>
              </div>

              <div class="use-case">
                <h4>使用场景</h4>
                <p>{{ version.useCase }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 版本对比表格 -->
    <section class="comparison-section">
      <h2 class="section-title"><span class="icon">📊</span> HTTP版本特性对比</h2>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th v-for="(version, index) in versions" :key="index">{{ version.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(feature, fIndex) in comparisonFeatures" :key="fIndex">
              <td>{{ feature.name }}</td>
              <td v-for="(version, vIndex) in versions" :key="vIndex">
                <span v-if="feature.values[vIndex] === true" class="supported">✓</span>
                <span v-else-if="feature.values[vIndex] === false" class="not-supported">✗</span>
                <span v-else>{{ feature.values[vIndex] }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- HTTP/3介绍 -->
    <section class="http3-section">
      <h2 class="section-title"><span class="icon">🚀</span> HTTP/3 - 下一代协议</h2>

      <div class="http3-content">
        <div class="http3-info">
          <h3>基于QUIC协议的革命性改进</h3>
          <p>HTTP/3是HTTP协议的第三个主要版本，使用QUIC协议代替TCP作为传输层协议，从根本上解决传输效率问题。</p>

          <div class="http3-features">
            <div class="feature">
              <div class="feature-icon">⚡</div>
              <div class="feature-text">
                <strong>零RTT连接</strong> - 减少连接建立时间
              </div>
            </div>
            <div class="feature">
              <div class="feature-icon">📦</div>
              <div class="feature-text">
                <strong>多路复用</strong> - 无队头阻塞问题
              </div>
            </div>
            <div class="feature">
              <div class="feature-icon">🔒</div>
              <div class="feature-text">
                <strong>内置加密</strong> - TLS 1.3作为基础
              </div>
            </div>
            <div class="feature">
              <div class="feature-icon">🌐</div>
              <div class="feature-text">
                <strong>网络切换支持</strong> - 移动设备友好
              </div>
            </div>
          </div>
        </div>

        <div class="http3-stats">
          <div class="stat">
            <div class="stat-value">85%</div>
            <div class="stat-label">页面加载延迟减少</div>
          </div>
          <div class="stat">
            <div class="stat-value">3.5x</div>
            <div class="stat-label">弱网环境下性能提升</div>
          </div>
          <div class="stat">
            <div class="stat-value">47%</div>
            <div class="stat-label">顶级网站已支持</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <footer class="summary-section">
      <div class="summary-content">
        <h2>HTTP协议总结</h2>

        <div class="evolution-insights">
          <div class="insight">
            <div class="insight-icon">📈</div>
            <p><strong>持续演进</strong> - 从简单文档传输到复杂应用协议</p>
          </div>
          <div class="insight">
            <div class="insight-icon">⚙️</div>
            <p><strong>性能优化</strong> - 每个版本都解决关键性能瓶颈</p>
          </div>
          <div class="insight">
            <div class="insight-icon">🔒</div>
            <p><strong>安全增强</strong> - 从HTTP到HTTPS成为标准</p>
          </div>
        </div>

        <div class="key-takeaways">
          <h3>核心要点</h3>
          <ul>
            <li>HTTP/1.1是当前最广泛使用的版本</li>
            <li>HTTP/2解决了HTTP/1.1的队头阻塞问题</li>
            <li>HTTP/3使用QUIC协议进一步提升性能</li>
            <li>HTTPS (HTTP + TLS) 已成为Web安全标准</li>
          </ul>
        </div>

        <div class="next-steps">
          <h3>下一步行动</h3>
          <div class="actions">
            <div class="action-card">测试网站HTTP协议支持</div>
            <div class="action-card">升级到HTTP/2或HTTP/3</div>
            <div class="action-card">实施HTTPS安全加密</div>
            <div class="action-card">优化网站性能</div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 时间线数据
const timeline = ref([
  { year: '1989', title: 'HTTP概念诞生', active: false },
  { year: '1991', title: 'HTTP/0.9发布', active: false },
  { year: '1996', title: 'HTTP/1.0标准化', active: false },
  { year: '1997', title: 'HTTP/1.1发布', active: true },
  { year: '2015', title: 'HTTP/2标准化', active: false },
  { year: '2022', title: 'HTTP/3标准确立', active: false }
]);

// HTTP版本数据
const versions = ref([
  {
    name: 'HTTP/0.9',
    year: '1991',
    tag: '原始版本',
    color: '#3a86ff',
    features: [
      '极其简单的协议',
      '仅支持GET方法',
      '无HTTP头信息',
      '无状态码',
      '响应后立即关闭连接'
    ],
    methods: ['GET'],
    statusCodes: ['无'],
    pros: [
      '非常简单易实现',
      '适合早期Web文档传输'
    ],
    cons: [
      '功能极其有限',
      '无扩展性',
      '每次请求都需要新建连接'
    ],
    useCase: '仅适用于传输纯文本HTML文档的简单场景，已被后续版本取代。'
  },
  {
    name: 'HTTP/1.0',
    year: '1996',
    tag: '正式规范',
    color: '#8338ec',
    features: [
      '引入HTTP头概念',
      '添加状态码',
      '支持多种HTTP方法',
      '支持内容类型',
      '每次请求需要新建连接'
    ],
    methods: ['GET', 'POST', 'HEAD'],
    statusCodes: ['200', '301', '400', '404', '500'],
    pros: [
      '功能大幅扩展',
      '支持多媒体内容',
      '引入缓存机制',
      '支持内容协商'
    ],
    cons: [
      '每次请求需要新建TCP连接',
      '无持久连接',
      '队头阻塞问题',
      '无主机名支持'
    ],
    useCase: '适用于早期Web应用，支持基本的网页和资源加载，目前已被HTTP/1.1取代。'
  },
  {
    name: 'HTTP/1.1',
    year: '1997',
    tag: '标准协议',
    color: '#ff006e',
    features: [
      '持久连接(Keep-Alive)',
      '管道化(pipelining)',
      '主机头支持',
      '分块传输编码',
      '缓存控制增强'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],
    statusCodes: ['100', '206', '304', '401', '403', '503'],
    pros: [
      '减少连接开销',
      '支持虚拟主机',
      '完善的缓存控制',
      '广泛支持且稳定'
    ],
    cons: [
      '队头阻塞问题依然存在',
      '头部冗余未压缩',
      '并行请求有限制',
      '服务器推送不可用'
    ],
    useCase: '当前最广泛使用的HTTP版本，适用于绝大多数Web应用和API服务。'
  },
  {
    name: 'HTTP/2',
    year: '2015',
    tag: '性能改进',
    color: '#fb5607',
    features: [
      '二进制分帧层',
      '多路复用',
      '头部压缩(HPACK)',
      '服务器推送',
      '请求优先级'
    ],
    methods: ['所有HTTP/1.1方法'],
    statusCodes: ['所有HTTP/1.1状态码'],
    pros: [
      '解决队头阻塞问题',
      '减少延迟提高速度',
      '头部压缩减少开销',
      '支持服务器主动推送'
    ],
    cons: [
      'TCP层队头阻塞仍存在',
      '实现复杂度增加',
      '中间设备支持不足',
      '加密非强制但实际需要'
    ],
    useCase: '高性能网站、现代Web应用、需要快速加载大量资源的场景。'
  },
  {
    name: 'HTTP/3',
    year: '2022',
    tag: '未来标准',
    color: '#3a86ff',
    features: [
      '基于QUIC协议',
      'UDP代替TCP',
      'TLS 1.3内置加密',
      '零RTT连接',
      '改进的拥塞控制'
    ],
    methods: ['所有HTTP/2方法'],
    statusCodes: ['所有HTTP/2状态码'],
    pros: [
      '解决TCP队头阻塞',
      '连接迁移支持',
      '更快的握手连接',
      '更好的弱网性能'
    ],
    cons: [
      '部署复杂',
      '中间设备支持有限',
      '防火墙兼容性问题',
      '服务器支持仍在普及中'
    ],
    useCase: '移动应用、高延迟网络环境、实时应用、追求最佳性能的场景。'
  }
]);

// 版本对比特性
const comparisonFeatures = ref([
  {
    name: '持久连接',
    values: [false, true, true, true, true]
  },
  {
    name: '多路复用',
    values: [false, false, false, true, true]
  },
  {
    name: '头部压缩',
    values: [false, false, false, true, true]
  },
  {
    name: '服务器推送',
    values: [false, false, false, true, true]
  },
  {
    name: '二进制协议',
    values: [false, false, false, true, true]
  },
  {
    name: '基于TCP',
    values: [true, true, true, true, false]
  },
  {
    name: '强制加密',
    values: [false, false, false, false, true]
  },
  {
    name: '连接建立时间',
    values: ['高', '高', '中', '中', '低']
  },
  {
    name: '队头阻塞',
    values: ['无', '严重', '存在', '部分解决', '基本解决']
  },
  {
    name: '当前使用率',
    values: ['<0.1%', '<1%', '~75%', '~20%', '<5%']
  }
]);

// 当前激活的版本
const activeVersion = ref(2); // 默认显示HTTP/1.1
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@text-color: #2b2d42;
@light-bg: #f8f9fa;
@border-color: #e9ecef;

.http-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
}

.header {
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #4cc9f0, #4361ee, #3a0ca3, #7209b7);
  }

  .header-content {
    position: relative;
    z-index: 2;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      margin-bottom: 1.5rem;
    }

    .intro-box {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border-radius: 8px;
      padding: 1.5rem;
      max-width: 700px;

      .intro-text {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 1rem;
      }

      .release-info {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;

        .release-item {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.9rem;
        }
      }
    }
  }
}

.protocol-evolution {
  margin-top: 2rem;

  .protocol-timeline {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 1rem 0;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-50%);
      z-index: 1;
    }

    .timeline-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 2;
      flex: 1;

      .timeline-dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
        border: 3px solid rgba(255, 255, 255, 0.3);
        margin-bottom: 0.8rem;
        position: relative;

        &.dot-active {
          background: @accent-color;
          transform: scale(1.2);
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.3);
        }
      }

      .timeline-content {
        text-align: center;

        h3 {
          font-size: 1.2rem;
          margin-bottom: 0.3rem;
        }

        p {
          font-size: 0.9rem;
          opacity: 0.8;
        }
      }
    }
  }
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid @border-color;

  .icon {
    font-size: 1.5rem;
  }
}

.concept-section {
  margin-bottom: 3rem;

  .concept-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .concept-card {
      background: @light-bg;
      border-radius: 10px;
      padding: 1.5rem;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .concept-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
        color: @secondary-color;
      }

      p {
        font-size: 0.95rem;
        color: lighten(@text-color, 15%);
        line-height: 1.5;
      }
    }
  }

  .workflow {
    background: @light-bg;
    border-radius: 10px;
    padding: 1.5rem;

    h3 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: @secondary-color;
    }

    .workflow-steps {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;

      .step {
        display: flex;
        flex-direction: column;
        align-items: center;

        .step-number {
          width: 40px;
          height: 40px;
          background: @primary-color;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 0.95rem;
          text-align: center;
          font-weight: 500;
        }
      }

      .step-arrow {
        color: @primary-color;
        font-weight: bold;
        opacity: 0.7;
      }
    }
  }
}

.versions-section {
  margin-bottom: 3rem;

  .version-tabs {
    background: @light-bg;
    border-radius: 10px;
    overflow: hidden;

    .tabs-header {
      display: flex;
      border-bottom: 1px solid @border-color;
      flex-wrap: wrap;

      button {
        flex: 1;
        min-width: 120px;
        padding: 1rem 0;
        background: none;
        border: none;
        border-bottom: 3px solid transparent;
        font-size: 1rem;
        font-weight: 600;
        color: lighten(@text-color, 25%);
        cursor: pointer;
        transition: all 0.3s ease;

        &.active {
          color: @primary-color;
          border-bottom: 3px solid @primary-color;
          background: rgba(255, 255, 255, 0.5);
        }

        &:hover:not(.active) {
          background: rgba(255, 255, 255, 0.3);
          color: @text-color;
        }
      }
    }

    .tabs-content {
      padding: 1.5rem;

      .version-details {
        .version-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;

          h3 {
            font-size: 1.5rem;
            margin: 0;
          }

          .version-tag {
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            color: white;
            font-size: 0.9rem;
            font-weight: 600;
          }
        }

        .version-content {
          .features {
            margin-bottom: 1.5rem;

            h4 {
              font-size: 1.2rem;
              margin-bottom: 0.8rem;
              color: @secondary-color;
            }

            ul {
              padding-left: 1.5rem;

              li {
                margin-bottom: 0.5rem;
                line-height: 1.5;
              }
            }
          }

          .tech-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 1.5rem;

            .detail-card {
              background: white;
              border-radius: 8px;
              padding: 1rem;
              box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

              .detail-title {
                font-weight: 600;
                margin-bottom: 0.8rem;
                color: @primary-color;
              }

              .detail-content {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;

                .method-tag,
                .status-tag {
                  background: @light-bg;
                  padding: 0.3rem 0.8rem;
                  border-radius: 4px;
                  font-size: 0.85rem;
                }

                .method-tag {
                  background: fadeout(@accent-color, 85%);
                  color: darken(@accent-color, 15%);
                }

                .status-tag {
                  background: fadeout(@primary-color, 85%);
                  color: darken(@primary-color, 15%);
                }
              }
            }
          }

          .pros-cons {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 1.5rem;

            .pros,
            .cons {
              background: white;
              border-radius: 8px;
              padding: 1rem;
              box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

              h4 {
                padding-bottom: 0.5rem;
                margin-bottom: 0.8rem;
                border-bottom: 2px solid;
              }

              ul {
                padding-left: 1.2rem;

                li {
                  margin-bottom: 0.5rem;
                  position: relative;
                  padding-left: 1.2rem;

                  &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0.5rem;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                  }
                }
              }
            }

            .pros {
              h4 {
                color: #2ec4b6;
                border-color: fadeout(#2ec4b6, 70%);
              }

              li:before {
                background: #2ec4b6;
              }
            }

            .cons {
              h4 {
                color: #e71d36;
                border-color: fadeout(#e71d36, 70%);
              }

              li:before {
                background: #e71d36;
              }
            }
          }

          .use-case {
            background: white;
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

            h4 {
              color: @secondary-color;
              margin-bottom: 0.8rem;
            }

            p {
              line-height: 1.6;
            }
          }
        }
      }
    }
  }
}

.comparison-section {
  margin-bottom: 3rem;

  .comparison-table {
    overflow-x: auto;
    background: @light-bg;
    border-radius: 10px;
    padding: 1.5rem;

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 800px;

      th,
      td {
        padding: 1rem;
        text-align: center;
      }

      thead {
        tr {
          background: @primary-color;
          color: white;

          th {
            font-weight: 600;

            &:first-child {
              border-radius: 8px 0 0 0;
            }

            &:last-child {
              border-radius: 0 8px 0 0;
            }
          }
        }
      }

      tbody {
        tr {
          border-bottom: 1px solid @border-color;

          &:nth-child(even) {
            background: rgba(255, 255, 255, 0.5);
          }

          &:last-child {
            border-bottom: none;
          }

          td {
            &:first-child {
              text-align: left;
              font-weight: 500;
            }

            .supported {
              color: #2ec4b6;
              font-weight: bold;
              font-size: 1.2rem;
            }

            .not-supported {
              color: #e71d36;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}

.http3-section {
  background: linear-gradient(135deg, #1d3557, #457b9d);
  color: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;

  .http3-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;

    .http3-info {
      h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #a8dadc;
      }

      p {
        line-height: 1.7;
        margin-bottom: 1.5rem;
      }

      .http3-features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;

        .feature {
          display: flex;
          gap: 0.8rem;
          align-items: center;

          .feature-icon {
            font-size: 1.5rem;
          }

          .feature-text {
            font-size: 0.95rem;
          }
        }
      }
    }

    .http3-stats {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1.5rem;

      .stat {
        text-align: center;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 8px;
        padding: 1.5rem;

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: #a8dadc;
        }

        .stat-label {
          font-size: 0.95rem;
          opacity: 0.9;
        }
      }
    }
  }
}

// 继续之前的样式代码
.summary-section {
  background: @light-bg;
  border-radius: 12px;
  padding: 2rem;

  .summary-content {
    h2 {
      text-align: center;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
      color: @secondary-color;
    }

    .evolution-insights {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;

      .insight {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        background: white;
        border-radius: 8px;
        padding: 1.2rem;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

        .insight-icon {
          font-size: 1.8rem;
          margin-top: 0.3rem;
        }

        p {
          margin: 0;
          line-height: 1.5;
          font-size: 1.05rem;
          color: lighten(@text-color, 15%);
        }
      }
    }

    .key-takeaways {
      margin-bottom: 2rem;

      h3 {
        font-size: 1.3rem;
        margin-bottom: 1rem;
        color: @secondary-color;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid @border-color;
      }

      ul {
        padding-left: 1.5rem;

        li {
          margin-bottom: 0.8rem;
          line-height: 1.6;
          position: relative;
          padding-left: 1.5rem;
          font-size: 1.05rem;

          &:before {
            content: '•';
            position: absolute;
            left: 0;
            top: 0;
            color: @primary-color;
            font-size: 1.2rem;
          }
        }
      }
    }

    .next-steps {
      h3 {
        font-size: 1.3rem;
        margin-bottom: 1rem;
        color: @secondary-color;
        text-align: center;
      }

      .actions {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;

        .action-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          text-align: center;
          font-weight: 600;
          color: @primary-color;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
            background: linear-gradient(to right, @primary-color, lighten(@primary-color, 15%));
            color: white;
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .header {
    padding: 1.5rem;

    .header-content {
      h1 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1rem;
      }

      .intro-box {
        padding: 1rem;

        .intro-text {
          font-size: 0.95rem;
        }
      }
    }
  }

  .protocol-evolution {
    .protocol-timeline {
      flex-wrap: wrap;
      justify-content: flex-start;

      &:before {
        display: none;
      }

      .timeline-item {
        flex: 0 0 50%;
        margin-bottom: 1.5rem;
        align-items: flex-start;
        flex-direction: row;
        gap: 1rem;

        .timeline-dot {
          margin-top: 0.3rem;
        }
      }
    }
  }

  .concept-section {
    .workflow {
      .workflow-steps {
        flex-direction: column;
        gap: 1rem;

        .step-arrow {
          transform: rotate(90deg);
          padding: 0.5rem 0;
        }
      }
    }
  }

  .versions-section {
    .version-tabs {
      .tabs-header {
        flex-direction: column;

        button {
          text-align: left;
          padding: 0.8rem 1rem;
          border-bottom: 1px solid @border-color;
          border-radius: 0;

          &.active {
            border-left: 3px solid @primary-color;
            border-bottom: 1px solid @border-color;
          }
        }
      }
    }
  }

  .http3-section {
    .http3-content {
      grid-template-columns: 1fr;

      .http3-stats {
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;

        .stat {
          flex: 0 0 45%;
          margin-bottom: 1rem;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .http-container {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .concept-grid {
    grid-template-columns: 1fr !important;
  }

  .tech-details {
    grid-template-columns: 1fr !important;
  }

  .pros-cons {
    grid-template-columns: 1fr !important;
  }

  .comparison-table {
    table {
      min-width: 100%;

      th,
      td {
        padding: 0.5rem;
        font-size: 0.85rem;
      }
    }
  }

  .next-steps {
    .actions {
      grid-template-columns: 1fr !important;
    }
  }
}
</style>
