<template>
  <div class="protocol-container">
    <header class="header">
      <h1>TCP/UDP/IP 协议基本介绍</h1>
      <p class="subtitle">深入理解网络通信的核心协议</p>
    </header>

    <div class="content-wrapper">
      <main class="main-content">
        <section class="section">
          <h2>协议基础概念</h2>
          <div class="protocol-intro">
            <div class="protocol-card">
              <div class="protocol-icon">🌐</div>
              <h3>IP 协议 (Internet Protocol)</h3>
              <p>网络层核心协议，负责将数据包从源主机路由到目标主机</p>
              <div class="protocol-details">
                <div class="detail-item">
                  <span class="detail-label">功能:</span>
                  <span>主机寻址、路由选择、数据包分割与重组</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">版本:</span>
                  <span>IPv4 (32位地址) / IPv6 (128位地址)</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">特点:</span>
                  <span>无连接、不可靠、尽力而为的传输</span>
                </div>
              </div>
            </div>

            <div class="protocol-compare">
              <div class="osi-model">
                <h4>TCP/IP 模型分层</h4>
                <div class="layer application">应用层</div>
                <div class="layer transport">传输层 (TCP/UDP)</div>
                <div class="layer internet">网络层 (IP)</div>
                <div class="layer link">链路层</div>
              </div>
              <div class="ip-packet">
                <h4>IP 数据包结构</h4>
                <div class="packet-header">
                  <div class="field version">版本</div>
                  <div class="field ihl">IHL</div>
                  <div class="field tos">服务类型</div>
                  <div class="field length">总长度</div>
                  <div class="field identification">标识</div>
                  <div class="field flags">标志</div>
                  <div class="field offset">分片偏移</div>
                  <div class="field ttl">TTL</div>
                  <div class="field protocol">协议</div>
                  <div class="field checksum">首部校验和</div>
                  <div class="field source">源IP地址</div>
                  <div class="field dest">目标IP地址</div>
                  <div class="field options">选项</div>
                </div>
                <div class="packet-data">数据</div>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>传输层协议对比</h2>
          <div class="protocol-comparison">
            <div class="comparison-header">
              <div class="header-item feature">特性</div>
              <div class="header-item tcp">TCP</div>
              <div class="header-item udp">UDP</div>
            </div>

            <div class="comparison-row">
              <div class="feature">全称</div>
              <div class="tcp">传输控制协议</div>
              <div class="udp">用户数据报协议</div>
            </div>

            <div class="comparison-row">
              <div class="feature">连接类型</div>
              <div class="tcp">面向连接</div>
              <div class="udp">无连接</div>
            </div>

            <div class="comparison-row">
              <div class="feature">可靠性</div>
              <div class="tcp">高可靠性 (确认重传)</div>
              <div class="udp">尽力而为交付</div>
            </div>

            <div class="comparison-row">
              <div class="feature">数据顺序</div>
              <div class="tcp">保证数据顺序</div>
              <div class="udp">不保证顺序</div>
            </div>

            <div class="comparison-row">
              <div class="feature">传输速度</div>
              <div class="tcp">较慢 (建立连接/确认)</div>
              <div class="udp">非常快</div>
            </div>

            <div class="comparison-row">
              <div class="feature">流量控制</div>
              <div class="tcp">滑动窗口机制</div>
              <div class="udp">无流量控制</div>
            </div>

            <div class="comparison-row">
              <div class="feature">拥塞控制</div>
              <div class="tcp">多种算法 (Reno, Cubic)</div>
              <div class="udp">无拥塞控制</div>
            </div>

            <div class="comparison-row">
              <div class="feature">头部大小</div>
              <div class="tcp">20-60 字节</div>
              <div class="udp">8 字节</div>
            </div>

            <div class="comparison-row">
              <div class="feature">适用场景</div>
              <div class="tcp">Web、Email、文件传输</div>
              <div class="udp">视频流、游戏、DNS</div>
            </div>
          </div>

          <div class="protocol-visual">
            <div class="tcp-flow">
              <h3>TCP 三次握手</h3>
              <div class="flow-diagram">
                <div class="client">客户端</div>
                <div class="server">服务器</div>

                <div class="step">
                  <div class="step-label">SYN</div>
                  <div class="arrow">→</div>
                </div>

                <div class="step">
                  <div class="step-label">SYN-ACK</div>
                  <div class="arrow">←</div>
                </div>

                <div class="step">
                  <div class="step-label">ACK</div>
                  <div class="arrow">→</div>
                </div>
              </div>
            </div>

            <div class="udp-flow">
              <h3>UDP 数据传输</h3>
              <div class="flow-diagram">
                <div class="client">客户端</div>
                <div class="server">服务器</div>

                <div class="step">
                  <div class="step-label">数据报</div>
                  <div class="arrow">→</div>
                </div>

                <div class="step">
                  <div class="step-label">数据报</div>
                  <div class="arrow">→</div>
                </div>

                <div class="step">
                  <div class="step-label">数据报</div>
                  <div class="arrow">→</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>什么是 TCP 三次握手？</h2>
          <div class="handshake-intro">
            <p>
              <strong>TCP 三次握手</strong>是指在建立一个可靠的 TCP
              连接时，客户端与服务器之间需要经过三次消息的交换。这样做的目的是为了保证双方都具备发送和接收数据的能力，并且网络是畅通的。
            </p>
            <ol>
              <li>
                <strong>第一次握手：</strong>客户端向服务器发送
                <code>SYN</code>（同步序列编号）包，表示请求建立连接。
              </li>
              <li>
                <strong>第二次握手：</strong>服务器收到 <code>SYN</code> 后，回复
                <code>SYN-ACK</code> 包，表示同意连接并确认收到客户端的请求。
              </li>
              <li>
                <strong>第三次握手：</strong>客户端收到 <code>SYN-ACK</code> 后，再发送一个
                <code>ACK</code> 包，表示连接建立成功。
              </li>
            </ol>
            <p>完成三次握手后，客户端和服务器就可以开始安全、可靠的数据传输了。</p>
            <div class="tips">
              <strong>小贴士：</strong>三次握手可以防止重复的连接请求，确保双方都准备好通信。
            </div>
          </div>
        </section>

        <section class="section">
          <h2>协议使用场景</h2>
          <div class="use-cases">
            <div class="use-case tcp">
              <div class="case-header">
                <div class="case-icon">🔒</div>
                <h3>TCP 适用场景</h3>
              </div>
              <ul>
                <li>网页浏览 (HTTP/HTTPS)</li>
                <li>文件传输 (FTP, SFTP)</li>
                <li>电子邮件 (SMTP, IMAP, POP3)</li>
                <li>远程登录 (SSH, Telnet)</li>
                <li>数据库连接</li>
                <li>安全通信 (SSL/TLS)</li>
              </ul>
            </div>

            <div class="use-case udp">
              <div class="case-header">
                <div class="case-icon">⚡</div>
                <h3>UDP 适用场景</h3>
              </div>
              <ul>
                <li>实时视频/音频流 (VoIP, 直播)</li>
                <li>在线多人游戏</li>
                <li>DNS 域名解析</li>
                <li>DHCP 动态主机配置</li>
                <li>SNMP 网络管理</li>
                <li>广播/多播应用</li>
              </ul>
            </div>

            <div class="use-case hybrid">
              <div class="case-header">
                <div class="case-icon">🔄</div>
                <h3>混合使用场景</h3>
              </div>
              <div class="hybrid-apps">
                <div class="app">
                  <div class="app-icon">📹</div>
                  <div class="app-details">
                    <h4>视频会议</h4>
                    <p>控制信号: TCP / 音视频流: UDP</p>
                  </div>
                </div>
                <div class="app">
                  <div class="app-icon">🎮</div>
                  <div class="app-details">
                    <h4>在线游戏</h4>
                    <p>登录/支付: TCP / 游戏数据: UDP</p>
                  </div>
                </div>
                <div class="app">
                  <div class="app-icon">📡</div>
                  <div class="app-details">
                    <h4>流媒体</h4>
                    <p>内容目录: TCP / 媒体传输: UDP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside class="sidebar">
        <div class="tcp-details">
          <h3>TCP 关键特性</h3>
          <ul>
            <li>
              <strong>序列号与确认号</strong>
              <p>确保数据按顺序传输</p>
            </li>
            <li>
              <strong>滑动窗口</strong>
              <p>动态调整传输速率</p>
            </li>
            <li>
              <strong>拥塞控制</strong>
              <p>慢启动、拥塞避免、快速重传</p>
            </li>
            <li>
              <strong>连接管理</strong>
              <p>三次握手建立连接，四次挥手终止连接</p>
            </li>
            <li>
              <strong>错误检测</strong>
              <p>使用校验和验证数据完整性</p>
            </li>
          </ul>
        </div>

        <div class="udp-details">
          <h3>UDP 关键特性</h3>
          <ul>
            <li>
              <strong>简单高效</strong>
              <p>8字节头部，无连接开销</p>
            </li>
            <li>
              <strong>无状态</strong>
              <p>服务器无需维护连接状态</p>
            </li>
            <li>
              <strong>支持广播/多播</strong>
              <p>可同时向多个主机发送数据</p>
            </li>
            <li>
              <strong>应用层控制</strong>
              <p>可靠性由应用层实现</p>
            </li>
            <li>
              <strong>实时性优先</strong>
              <p>适合延迟敏感型应用</p>
            </li>
          </ul>
        </div>

        <div class="ip-details">
          <h3>IP 协议关键点</h3>
          <ul>
            <li>
              <strong>IP 地址</strong>
              <p>IPv4: 32位, IPv6: 128位</p>
            </li>
            <li>
              <strong>路由</strong>
              <p>路由器根据路由表转发数据包</p>
            </li>
            <li>
              <strong>分片与重组</strong>
              <p>MTU 超过时分割数据包</p>
            </li>
            <li>
              <strong>TTL (生存时间)</strong>
              <p>防止数据包无限循环</p>
            </li>
            <li>
              <strong>无连接服务</strong>
              <p>每个数据包独立路由</p>
            </li>
          </ul>
        </div>

        <div class="performance-card">
          <h3>性能对比指标</h3>
          <div class="metric">
            <div class="metric-label">延迟</div>
            <div class="metric-bar">
              <div class="tcp-bar" :style="{ width: '30%' }">TCP: 高</div>
              <div class="udp-bar" :style="{ width: '70%' }">UDP: 低</div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-label">吞吐量</div>
            <div class="metric-bar">
              <div class="tcp-bar" :style="{ width: '65%' }">TCP: 高</div>
              <div class="udp-bar" :style="{ width: '35%' }">UDP: 中</div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-label">可靠性</div>
            <div class="metric-bar">
              <div class="tcp-bar" :style="{ width: '95%' }">TCP: 高</div>
              <div class="udp-bar" :style="{ width: '5%' }">UDP: 低</div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-label">资源消耗</div>
            <div class="metric-bar">
              <div class="tcp-bar" :style="{ width: '80%' }">TCP: 高</div>
              <div class="udp-bar" :style="{ width: '20%' }">UDP: 低</div>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <section class="section">
      <h2>协议报文结构</h2>
      <div class="packet-structures">
        <div class="packet">
          <h3>TCP 报文结构</h3>
          <div class="packet-diagram">
            <div class="field source-port">源端口 (16位)</div>
            <div class="field dest-port">目标端口 (16位)</div>
            <div class="field seq">序列号 (32位)</div>
            <div class="field ack">确认号 (32位)</div>
            <div class="field header-length">数据偏移 (4位)</div>
            <div class="field reserved">保留 (6位)</div>
            <div class="field flags">标志位 (6位)</div>
            <div class="field window">窗口大小 (16位)</div>
            <div class="field checksum">校验和 (16位)</div>
            <div class="field urgent">紧急指针 (16位)</div>
            <div class="field options">选项 (可变)</div>
            <div class="field data">数据 (可变)</div>
          </div>
          <div class="flags-details">
            <h4>TCP 标志位:</h4>
            <div class="flag-grid">
              <div class="flag" v-for="flag in tcpFlags" :key="flag.name">
                <span class="flag-name">{{ flag.name }}:</span>
                <span class="flag-desc">{{ flag.desc }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="packet">
          <h3>UDP 报文结构</h3>
          <div class="packet-diagram udp-diagram">
            <div class="field source-port">源端口 (16位)</div>
            <div class="field dest-port">目标端口 (16位)</div>
            <div class="field length">长度 (16位)</div>
            <div class="field checksum">校验和 (16位)</div>
            <div class="field data">数据 (可变)</div>
          </div>
          <div class="udp-details">
            <h4>UDP 特点:</h4>
            <ul>
              <li>无连接协议 - 无需建立连接</li>
              <li>最小头部开销 - 仅8字节</li>
              <li>无流量控制 - 发送方可以任意速率发送</li>
              <li>无错误恢复机制 - 错误数据包被丢弃</li>
              <li>支持广播和多播</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>理解 TCP、UDP 和 IP 协议是网络编程的基础，合理选择传输协议对应用性能有决定性影响</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// TCP 标志位数据
const tcpFlags = ref([
  { name: 'URG', desc: '紧急指针有效' },
  { name: 'ACK', desc: '确认号有效' },
  { name: 'PSH', desc: '接收方应尽快交付数据' },
  { name: 'RST', desc: '重置连接' },
  { name: 'SYN', desc: '同步序列号，建立连接' },
  { name: 'FIN', desc: '发送方结束发送' },
])
</script>

<style lang="less" scoped>
@primary-color: #4285f4;
@secondary-color: #34a853;
@accent-color: #ea4335;
@tcp-color: #4285f4;
@udp-color: #34a853;
@ip-color: #ea4335;
@light-bg: #f8f9fa;
@text-color: #202124;
@border-color: #dadce0;
@card-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.protocol-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid @border-color;

  h1 {
    color: @primary-color;
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #5f6368;
  }
}

.content-wrapper {
  display: flex;
  gap: 25px;
}

.main-content {
  flex: 3;
}

.sidebar {
  flex: 1;
  min-width: 300px;
}

.section {
  background: @light-bg;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: @card-shadow;

  h2 {
    color: @primary-color;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid fade(@primary-color, 20%);
  }
}

.protocol-intro {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.protocol-card {
  flex: 1;
  min-width: 300px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;
  border-top: 4px solid @ip-color;

  .protocol-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: @ip-color;
  }

  h3 {
    color: @ip-color;
    margin-bottom: 15px;
  }

  .protocol-details {
    .detail-item {
      display: flex;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid fade(@border-color, 50%);

      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
      }

      .detail-label {
        font-weight: bold;
        min-width: 60px;
        color: @ip-color;
      }
    }
  }
}

.protocol-compare {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.osi-model {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: @card-shadow;

  h4 {
    color: @primary-color;
    margin-bottom: 15px;
    text-align: center;
  }

  .layer {
    padding: 12px;
    margin-bottom: 8px;
    border-radius: 4px;
    font-weight: bold;
    text-align: center;

    &.application {
      background: fade(@primary-color, 10%);
    }

    &.transport {
      background: fade(@tcp-color, 15%);
    }

    &.internet {
      background: fade(@ip-color, 15%);
    }

    &.link {
      background: fade(#fbbc05, 15%);
    }
  }
}

.ip-packet {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: @card-shadow;

  h4 {
    color: @primary-color;
    margin-bottom: 15px;
    text-align: center;
  }

  .packet-header {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
    margin-bottom: 5px;

    .field {
      padding: 8px;
      background: fade(@ip-color, 10%);
      border: 1px solid fade(@ip-color, 30%);
      border-radius: 4px;
      font-size: 0.8rem;
      text-align: center;
    }
  }

  .packet-data {
    padding: 20px;
    background: fade(@ip-color, 5%);
    border: 1px dashed fade(@ip-color, 30%);
    border-radius: 4px;
    text-align: center;
  }
}

.protocol-comparison {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: @card-shadow;
  margin-bottom: 25px;
}

.comparison-header {
  display: flex;
  background: #f1f3f4;
  font-weight: bold;

  .header-item {
    padding: 15px;
    text-align: center;

    &.feature {
      flex: 2;
      background: #f1f3f4;
    }

    &.tcp {
      flex: 3;
      background: fade(@tcp-color, 10%);
      color: darken(@tcp-color, 20%);
    }

    &.udp {
      flex: 3;
      background: fade(@udp-color, 10%);
      color: darken(@udp-color, 20%);
    }
  }
}

.comparison-row {
  display: flex;
  border-bottom: 1px solid @border-color;

  &:last-child {
    border-bottom: none;
  }

  .feature,
  .tcp,
  .udp {
    padding: 15px;
  }

  .feature {
    flex: 2;
    font-weight: 500;
    background: #f8f9fa;
    display: flex;
    align-items: center;
  }

  .tcp {
    flex: 3;
    background: fade(@tcp-color, 5%);
    border-left: 1px solid @border-color;
  }

  .udp {
    flex: 3;
    background: fade(@udp-color, 5%);
    border-left: 1px solid @border-color;
  }
}

.protocol-visual {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  .tcp-flow,
  .udp-flow {
    flex: 1;
    min-width: 300px;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: @card-shadow;

    h3 {
      text-align: center;
      margin-bottom: 20px;
      color: @primary-color;
    }
  }

  .tcp-flow {
    border-top: 4px solid @tcp-color;
  }

  .udp-flow {
    border-top: 4px solid @udp-color;
  }
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
  padding: 0 50px;

  .client,
  .server {
    font-weight: bold;
    padding: 10px;
    text-align: center;
    background: #f1f3f4;
    border-radius: 6px;
  }

  .client {
    align-self: flex-start;
  }

  .server {
    align-self: flex-end;
  }

  .step {
    display: flex;
    align-items: center;
    position: relative;

    .step-label {
      padding: 8px 15px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .arrow {
      font-size: 1.5rem;
      margin: 0 15px;
    }
  }

  .tcp-flow & .step {
    .step-label {
      background: fade(@tcp-color, 15%);
      border: 1px solid fade(@tcp-color, 30%);
    }
  }

  .udp-flow & .step {
    .step-label {
      background: fade(@udp-color, 15%);
      border: 1px solid fade(@udp-color, 30%);
    }
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.use-case {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;

  .case-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;

    .case-icon {
      font-size: 1.8rem;
    }

    h3 {
      color: @primary-color;
    }
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 12px;
      padding-left: 10px;
      position: relative;

      &:before {
        content: '•';
        position: absolute;
        left: 0;
        color: @primary-color;
        font-size: 1.2rem;
      }
    }
  }

  &.tcp {
    border-top: 4px solid @tcp-color;

    .case-icon {
      color: @tcp-color;
    }
  }

  &.udp {
    border-top: 4px solid @udp-color;

    .case-icon {
      color: @udp-color;
    }
  }

  &.hybrid {
    border-top: 4px solid #fbbc05;

    .case-icon {
      color: #fbbc05;
    }
  }
}

.hybrid-apps {
  display: flex;
  flex-direction: column;
  gap: 15px;

  .app {
    display: flex;
    gap: 15px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;

    .app-icon {
      font-size: 1.8rem;
      min-width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h4 {
      color: @primary-color;
      margin-bottom: 5px;
    }

    p {
      color: #5f6368;
      font-size: 0.9rem;
    }
  }
}

.tcp-details,
.udp-details,
.ip-details,
.performance-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: @card-shadow;

  h3 {
    color: @primary-color;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid @border-color;
  }
}

ul {
  list-style: none;

  li {
    padding: 10px 0;
    border-bottom: 1px solid fade(@border-color, 30%);

    &:last-child {
      border-bottom: none;
    }

    strong {
      display: block;
      margin-bottom: 5px;
      color: @primary-color;
    }

    p {
      color: #5f6368;
      font-size: 0.9rem;
    }
  }
}

.performance-card {
  .metric {
    margin-bottom: 15px;

    .metric-label {
      font-size: 0.9rem;
      margin-bottom: 5px;
      color: #5f6368;
    }

    .metric-bar {
      height: 20px;
      background: #e0e0e0;
      border-radius: 10px;
      overflow: hidden;
      display: flex;

      .tcp-bar {
        background: @tcp-color;
        color: white;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }

      .udp-bar {
        background: @udp-color;
        color: white;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }
    }
  }
}

.packet-structures {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.packet {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;

  h3 {
    color: @primary-color;
    margin-bottom: 15px;
    text-align: center;
  }
}

.packet-diagram {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;

  .field {
    padding: 12px;
    background: #f1f3f4;
    border: 1px solid @border-color;
    border-radius: 4px;
    font-size: 0.9rem;
    text-align: center;
  }

  &.udp-diagram .field {
    background: fade(@udp-color, 10%);
    border-color: fade(@udp-color, 30%);
  }
}

.flags-details {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;

  h4 {
    color: @primary-color;
    margin-bottom: 10px;
    text-align: center;
  }
}

.flag-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;

  .flag {
    background: white;
    border-radius: 4px;
    padding: 10px;
    border: 1px solid @border-color;
    display: flex;
    flex-direction: column;
    align-items: center;

    .flag-name {
      font-weight: bold;
      margin-bottom: 5px;
      color: @primary-color;
    }

    .flag-desc {
      font-size: 0.8rem;
      text-align: center;
      color: #5f6368;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid @border-color;
  color: #5f6368;
  font-style: italic;
}

@media (max-width: 1100px) {
  .content-wrapper {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .protocol-intro,
  .use-cases,
  .packet-structures,
  .protocol-visual {
    grid-template-columns: 1fr;
  }

  .comparison-row {
    flex-direction: column;

    .feature,
    .tcp,
    .udp {
      width: 100%;
    }

    .tcp,
    .udp {
      border-left: none;
      border-top: 1px solid @border-color;
    }
  }
}
</style>
