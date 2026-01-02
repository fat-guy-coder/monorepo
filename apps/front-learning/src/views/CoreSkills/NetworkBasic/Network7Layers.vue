<template>
  <div class="osi-container">
    <!-- 头部展示区 -->
    <header class="header">
      <div class="header-content">
        <h1>OSI网络七层模型</h1>
        <p class="subtitle">计算机网络通信的标准化框架</p>
        <div class="intro-box">
          <p class="intro-text">
            OSI模型（Open Systems Interconnection）是国际标准化组织（ISO）提出的网络通信参考模型，它将网络通信划分为七个逻辑层。
          </p>
          <div class="release-info">
            <span class="release-item">1984年发布</span>
            <span class="release-item">标准化框架</span>
            <span class="release-item">分层设计理念</span>
          </div>
        </div>
      </div>
      <div class="model-visual">
        <div class="model-layers">
          <div v-for="(layer, index) in layers" :key="index" class="layer-card"
            :style="{ backgroundColor: layer.color }" @click="activeLayer = index">
            <div class="layer-number">{{ 7 - index }}</div>
            <div class="layer-name">{{ layer.name }}</div>
            <div class="layer-arrow">▼</div>
          </div>
        </div>
      </div>
    </header>

    <!-- 当前层详情 -->
    <section class="layer-detail-section">
      <div class="layer-header">
        <div class="layer-indicator" :style="{ backgroundColor: activeLayerData.color }">
          <span class="layer-number">{{ activeLayerData.number }}</span>
          <span class="layer-name">{{ activeLayerData.name }}</span>
        </div>
        <h2 class="section-title">{{ activeLayerData.name }}层基础介绍</h2>
      </div>

      <div class="detail-content">
        <div class="concept">
          <h3>核心概念</h3>
          <p>{{ activeLayerData.concept }}</p>
        </div>

        <div v-if="activeLayerData.functions.length" class="functions">
          <h3>主要功能</h3>
          <ul>
            <li v-for="(func, index) in activeLayerData.functions" :key="index">{{ func }}</li>
          </ul>
        </div>

        <div v-if="activeLayerData.protocols.length" class="protocols">
          <h3>关键协议与技术</h3>
          <div class="protocol-grid">
            <div v-for="(protocol, index) in activeLayerData.protocols" :key="index" class="protocol-card">
              <div class="protocol-icon">{{ protocol.emoji }}</div>
              <div class="protocol-name">{{ protocol.name }}</div>
              <div class="protocol-desc">{{ protocol.description }}</div>
            </div>
          </div>
        </div>

        <div v-if="activeLayerData.devices.length" class="devices">
          <h3>相关网络设备</h3>
          <div class="device-grid">
            <div v-for="(device, index) in activeLayerData.devices" :key="index" class="device-card">
              <div class="device-icon">{{ device.emoji }}</div>
              <div class="device-name">{{ device.name }}</div>
            </div>
          </div>
        </div>

        <div class="data-unit">
          <h3>数据单元</h3>
          <div class="unit-display">
            <div class="unit-name">{{ activeLayerData.dataUnit }}</div>
            <div class="unit-desc">{{ activeLayerData.unitDesc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据传输流程 -->
    <section class="data-flow-section">
      <h2 class="section-title">数据在网络中的传输流程</h2>

      <div class="flow-diagram">
        <div class="flow-header">
          <div class="flow-header-item" v-for="(layer, index) in [...layers].reverse()" :key="index">
            {{ layer.name }}
          </div>
        </div>

        <div class="flow-content">
          <div class="flow-direction">
            <div class="flow-title">发送端（封装）</div>
            <div class="arrows">
              <span>▼</span><span>▼</span><span>▼</span><span>▼</span><span>▼</span><span>▼</span><span>▼</span>
            </div>
          </div>

          <div class="flow-process">
            <div class="process-step" v-for="(step, index) in flowProcess" :key="index">
              <div class="step-header">{{ step.title }}</div>
              <div class="step-desc">{{ step.description }}</div>
            </div>
          </div>

          <div class="flow-direction">
            <div class="flow-title">接收端（解封装）</div>
            <div class="arrows">
              <span>▲</span><span>▲</span><span>▲</span><span>▲</span><span>▲</span><span>▲</span><span>▲</span>
            </div>
          </div>
        </div>
      </div>

      <div class="encapsulation">
        <h3>数据封装与解封装过程</h3>
        <div class="encapsulation-visual">
          <div class="data-segment">
            <div class="segment-header">应用层数据</div>
            <div class="segment-content">实际传输的数据内容</div>
          </div>
          <div class="encapsulation-arrow">封装过程 ▼</div>
          <div class="protocol-stack">
            <div class="protocol-layer" v-for="(layer, index) in [...layers].reverse()" :key="index">
              <div class="layer-header">{{ layer.name }}头部</div>
              <div class="layer-data">上一层数据</div>
            </div>
          </div>
          <div class="encapsulation-arrow">解封装过程 ▲</div>
          <div class="data-segment">
            <div class="segment-header">应用层数据</div>
            <div class="segment-content">接收到的数据内容</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 七层模型对比 -->
    <section class="comparison-section">
      <h2 class="section-title">OSI七层模型对比</h2>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>层级</th>
              <th>名称</th>
              <th>主要功能</th>
              <th>数据单元</th>
              <th>关键协议</th>
              <th>网络设备</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(layer, index) in layers" :key="index">
              <td>{{ 7 - index }}</td>
              <td>{{ layer.name }}</td>
              <td>{{ layer.functions.join(', ') }}</td>
              <td>{{ layer.dataUnit }}</td>
              <td>
                <template v-if="layer.protocols.length">
                  <span v-for="(protocol, pIndex) in layer.protocols" :key="pIndex">
                    {{ protocol.name }}<span v-if="pIndex < layer.protocols.length - 1">, </span>
                  </span>
                </template>
                <span v-else>-</span>
              </td>
              <td>
                <template v-if="layer.devices.length">
                  <span v-for="(device, dIndex) in layer.devices" :key="dIndex">
                    {{ device.name }}<span v-if="dIndex < layer.devices.length - 1">, </span>
                  </span>
                </template>
                <span v-else>-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- OSI vs TCP/IP -->
    <section class="model-comparison">
      <h2 class="section-title">OSI模型 vs TCP/IP模型</h2>

      <div class="models-container">
        <div class="model osi-model">
          <div class="model-header">OSI 七层模型</div>
          <div class="model-layers">
            <div v-for="(layer, index) in layers" :key="index" class="layer" :style="{ backgroundColor: layer.color }">
              <div class="layer-num">{{ 7 - index }}</div>
              <div class="layer-name">{{ layer.name }}</div>
            </div>
          </div>
        </div>

        <div class="comparison-arrow">
          <div class="difference">理论模型</div>
          <div class="arrow">→</div>
          <div class="difference">实际实现</div>
        </div>

        <div class="model tcpip-model">
          <div class="model-header">TCP/IP 四层模型</div>
          <div class="model-layers">
            <div class="layer" style="background-color: #4361ee;">
              <div class="layer-name">应用层</div>
              <div class="layer-equivalent">(应用层, 表示层, 会话层)</div>
            </div>
            <div class="layer" style="background-color: #3a0ca3;">
              <div class="layer-name">传输层</div>
            </div>
            <div class="layer" style="background-color: #7209b7;">
              <div class="layer-name">网络层</div>
            </div>
            <div class="layer" style="background-color: #f72585;">
              <div class="layer-name">网络接口层</div>
              <div class="layer-equivalent">(数据链路层, 物理层)</div>
            </div>
          </div>
        </div>
      </div>

      <div class="model-differences">
        <h3>主要区别</h3>
        <div class="differences-grid">
          <div class="difference-card">
            <div class="diff-icon">📚</div>
            <div class="diff-title">模型结构</div>
            <p>OSI是严格的七层模型，而TCP/IP是将上三层合并的应用层</p>
          </div>
          <div class="difference-card">
            <div class="diff-icon">🌐</div>
            <div class="diff-title">实际应用</div>
            <p>OSI是理论模型，TCP/IP是实际实现的互联网协议栈</p>
          </div>
          <div class="difference-card">
            <div class="diff-icon">🔄</div>
            <div class="diff-title">开发方式</div>
            <p>OSI是先有模型后有协议，TCP/IP是先有协议后有模型</p>
          </div>
          <div class="difference-card">
            <div class="diff-icon">🔒</div>
            <div class="diff-title">安全性</div>
            <p>OSI在表示层处理加密，而TCP/IP在应用层实现安全机制</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <footer class="summary-section">
      <div class="summary-content">
        <h2>OSI模型核心价值</h2>

        <div class="model-benefits">
          <div class="benefit-card">
            <div class="benefit-icon">🧩</div>
            <div class="benefit-title">模块化设计</div>
            <p>分层结构简化了网络设计，便于开发和故障排除</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🔌</div>
            <div class="benefit-title">互操作性</div>
            <p>标准化接口使不同厂商的产品能够协同工作</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">📈</div>
            <div class="benefit-title">技术演进</div>
            <p>各层可独立发展而不影响其他层</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🎓</div>
            <div class="benefit-title">教学价值</div>
            <p>理解网络通信原理的框架性工具</p>
          </div>
        </div>

        <div class="key-takeaways">
          <h3>关键要点总结</h3>
          <ul>
            <li>OSI模型是理解和设计计算机网络的基础框架</li>
            <li>每层都有特定功能，通过接口与相邻层通信</li>
            <li>数据发送时从上到下封装，接收时从下到上解封装</li>
            <li>TCP/IP模型是OSI模型在实际中的实现和简化</li>
            <li>理解各层协议和设备是网络工程的基础</li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 七层模型数据
const layers = ref([
  {
    number: 7,
    name: '应用层',
    color: '#3a86ff',
    concept: '网络服务与最终用户的一个接口，提供为应用软件提供网络服务的接口。',
    functions: [
      '提供用户接口',
      '处理应用程序的网络请求',
      '识别通信伙伴',
      '确定资源可用性'
    ],
    protocols: [
      {
        name: 'HTTP',
        emoji: '🌐',
        description: '超文本传输协议，用于Web浏览'
      },
      {
        name: 'FTP',
        emoji: '📁',
        description: '文件传输协议'
      },
      {
        name: 'SMTP',
        emoji: '✉️',
        description: '简单邮件传输协议'
      },
      {
        name: 'DNS',
        emoji: '🔍',
        description: '域名系统协议'
      },
      {
        name: 'Telnet',
        emoji: '⌨️',
        description: '远程登录协议'
      }
    ],
    devices: [
      { name: '终端设备', emoji: '💻' }
    ],
    dataUnit: '数据(Data)',
    unitDesc: '用户实际生成和接收的信息'
  },
  {
    number: 6,
    name: '表示层',
    color: '#4cc9f0',
    concept: '处理数据的表示、加密、压缩和转换，确保一个系统的应用层发送的数据能被另一个系统的应用层读取。',
    functions: [
      '数据格式转换',
      '数据加密与解密',
      '数据压缩与解压缩'
    ],
    protocols: [
      {
        name: 'SSL/TLS',
        emoji: '🔒',
        description: '安全套接层/传输层安全协议'
      },
      {
        name: 'JPEG',
        emoji: '🖼️',
        description: '图像压缩标准'
      },
      {
        name: 'MPEG',
        emoji: '🎬',
        description: '视频压缩标准'
      },
      {
        name: 'ASCII',
        emoji: '🔤',
        description: '字符编码标准'
      }
    ],
    devices: [],
    dataUnit: '数据(Data)',
    unitDesc: '格式化、加密或压缩后的数据'
  },
  {
    number: 5,
    name: '会话层',
    color: '#4895ef',
    concept: '负责建立、管理和终止表示层实体之间的通信会话，控制对话和同步。',
    functions: [
      '建立、管理和终止会话',
      '对话控制（单工/半双工/全双工）',
      '同步检查点'
    ],
    protocols: [
      {
        name: 'NetBIOS',
        emoji: '💬',
        description: '网络基本输入输出系统'
      },
      {
        name: 'RPC',
        emoji: '🔄',
        description: '远程过程调用协议'
      },
      {
        name: 'PPTP',
        emoji: '🔗',
        description: '点对点隧道协议'
      }
    ],
    devices: [],
    dataUnit: '数据(Data)',
    unitDesc: '会话控制信息与数据'
  },
  {
    number: 4,
    name: '传输层',
    color: '#4361ee',
    concept: '提供端到端的数据传输服务，确保数据完整、无差错、按序地进行传输。',
    functions: [
      '端到端连接',
      '流量控制',
      '错误控制',
      '数据分段与重组'
    ],
    protocols: [
      {
        name: 'TCP',
        emoji: '📦',
        description: '传输控制协议，面向连接'
      },
      {
        name: 'UDP',
        emoji: '⚡',
        description: '用户数据报协议，无连接'
      },
      {
        name: 'SCTP',
        emoji: '🔁',
        description: '流控制传输协议'
      }
    ],
    devices: [
      { name: '防火墙', emoji: '🛡️' }
    ],
    dataUnit: '段(Segment)',
    unitDesc: 'TCP/UDP数据包'
  },
  {
    number: 3,
    name: '网络层',
    color: '#3f37c9',
    concept: '负责将数据从源主机路由到目的主机，处理逻辑地址和路径选择。',
    functions: [
      '逻辑寻址',
      '路由选择',
      '路径确定',
      '拥塞控制'
    ],
    protocols: [
      {
        name: 'IP',
        emoji: '📡',
        description: '互联网协议'
      },
      {
        name: 'ICMP',
        emoji: '📶',
        description: '互联网控制消息协议'
      },
      {
        name: 'BGP',
        emoji: '🗺️',
        description: '边界网关协议'
      },
      {
        name: 'OSPF',
        emoji: '🛣️',
        description: '开放最短路径优先协议'
      }
    ],
    devices: [
      { name: '路由器', emoji: '📶' },
      { name: '三层交换机', emoji: '🔌' }
    ],
    dataUnit: '包(Packet)',
    unitDesc: '带有IP地址信息的数据单元'
  },
  {
    number: 2,
    name: '数据链路层',
    color: '#560bad',
    concept: '在物理层提供的服务基础上，建立可靠的数据传输链路，处理节点间的数据传输。',
    functions: [
      '物理寻址（MAC地址）',
      '成帧',
      '流量控制',
      '错误检测'
    ],
    protocols: [
      {
        name: 'Ethernet',
        emoji: '🔗',
        description: '以太网协议'
      },
      {
        name: 'PPP',
        emoji: '📞',
        description: '点对点协议'
      },
      {
        name: 'HDLC',
        emoji: '🖥️',
        description: '高级数据链路控制协议'
      },
      {
        name: 'VLAN',
        emoji: '🏷️',
        description: '虚拟局域网'
      }
    ],
    devices: [
      { name: '交换机', emoji: '🔁' },
      { name: '网桥', emoji: '🌉' },
      { name: '网卡', emoji: '💾' }
    ],
    dataUnit: '帧(Frame)',
    unitDesc: '包含MAC地址的数据单元'
  },
  {
    number: 1,
    name: '物理层',
    color: '#7209b7',
    concept: '定义物理介质上的电气、机械、功能和程序规范，负责传输原始比特流。',
    functions: [
      '传输比特流',
      '定义电压、线速等物理特性',
      '物理拓扑结构',
      '传输模式'
    ],
    protocols: [
      {
        name: 'Ethernet',
        emoji: '🔌',
        description: '物理层标准（如100BASE-TX）'
      },
      {
        name: 'USB',
        emoji: '📱',
        description: '通用串行总线物理规范'
      },
      {
        name: 'Bluetooth',
        emoji: '📳',
        description: '蓝牙物理层'
      },
      {
        name: 'DSL',
        emoji: '📠',
        description: '数字用户线路物理层'
      }
    ],
    devices: [
      { name: '集线器', emoji: '📡' },
      { name: '中继器', emoji: '🔁' },
      { name: '调制解调器', emoji: '🔊' },
      { name: '网线', emoji: '🧵' }
    ],
    dataUnit: '比特(Bit)',
    unitDesc: '二进制0和1的原始数据流'
  }
]);

// 数据传输流程
const flowProcess = ref([
  {
    title: '应用层',
    description: '用户生成数据（如HTTP请求）'
  },
  {
    title: '表示层',
    description: '格式化、加密或压缩数据'
  },
  {
    title: '会话层',
    description: '建立、管理或终止会话'
  },
  {
    title: '传输层',
    description: '分段数据并添加TCP/UDP头部'
  },
  {
    title: '网络层',
    description: '添加IP头部，执行路由选择'
  },
  {
    title: '数据链路层',
    description: '添加帧头/帧尾，准备物理传输'
  },
  {
    title: '物理层',
    description: '转换为电信号/光信号传输'
  }
]);

// 当前激活的层
const activeLayer = ref(0);

// 当前激活层的数据
const activeLayerData = computed(() => layers.value[activeLayer.value]);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@text-color: #2b2d42;
@light-bg: #f8f9fa;
@border-color: #e9ecef;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.osi-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, #1d3557, #457b9d);
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
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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

.model-visual {
  margin-top: 2rem;

  .model-layers {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .layer-card {
      display: flex;
      align-items: center;
      padding: 1.2rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      box-shadow: @card-shadow;

      &:hover {
        transform: translateX(10px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
      }

      .layer-number {
        font-size: 1.8rem;
        font-weight: 700;
        min-width: 40px;
      }

      .layer-name {
        font-size: 1.4rem;
        font-weight: 600;
        flex-grow: 1;
        margin: 0 1.5rem;
      }

      .layer-arrow {
        font-size: 1.2rem;
        opacity: 0.7;
      }
    }
  }
}

.section-title {
  font-size: 1.8rem;
  margin: 2rem 0 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid @border-color;
  color: @secondary-color;
  display: flex;
  align-items: center;

  &:before {
    content: '■';
    color: @accent-color;
    margin-right: 0.8rem;
    font-size: 1.2rem;
  }
}

.layer-detail-section {
  background: @light-bg;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: @card-shadow;

  .layer-header {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    gap: 1.5rem;
    flex-wrap: wrap;

    .layer-indicator {
      display: flex;
      align-items: center;
      padding: 0.8rem 1.5rem;
      border-radius: 50px;
      color: white;
      font-weight: 600;
      font-size: 1.2rem;

      .layer-number {
        margin-right: 1rem;
        font-size: 1.5rem;
        background: rgba(0, 0, 0, 0.15);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .detail-content {
    >div {
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px dashed @border-color;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }
    }

    h3 {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      color: @primary-color;
      display: flex;
      align-items: center;

      &:before {
        content: '•';
        margin-right: 0.5rem;
        color: @accent-color;
      }
    }

    ul {
      padding-left: 1.8rem;

      li {
        margin-bottom: 0.7rem;
        position: relative;
        padding-left: 1.2rem;

        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.7rem;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: @primary-color;
        }
      }
    }

    .protocol-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;

      .protocol-card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: @card-shadow;
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
        }

        .protocol-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .protocol-name {
          font-weight: 600;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: @secondary-color;
        }

        .protocol-desc {
          font-size: 0.95rem;
          color: lighten(@text-color, 15%);
        }
      }
    }

    .device-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;

      .device-card {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        background: white;
        border-radius: 8px;
        padding: 0.8rem 1.2rem;
        box-shadow: @card-shadow;

        .device-icon {
          font-size: 1.4rem;
        }

        .device-name {
          font-weight: 500;
        }
      }
    }

    .unit-display {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: @card-shadow;
      max-width: 300px;

      .unit-name {
        font-size: 1.8rem;
        font-weight: 700;
        color: @primary-color;
        margin-bottom: 0.5rem;
      }

      .unit-desc {
        font-size: 0.95rem;
        color: lighten(@text-color, 25%);
      }
    }
  }
}

.data-flow-section {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;

  .flow-diagram {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: @card-shadow;

    .flow-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      background: @secondary-color;
      color: white;

      .flow-header-item {
        padding: 1rem;
        text-align: center;
        font-weight: 500;
        border-right: 1px solid rgba(255, 255, 255, 0.2);

        &:last-child {
          border-right: none;
        }
      }
    }

    .flow-content {
      display: grid;
      grid-template-columns: 1fr 3fr 1fr;
      padding: 1.5rem;

      .flow-direction {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .flow-title {
          font-weight: 600;
          margin-bottom: 1rem;
          color: @secondary-color;
        }

        .arrows {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          font-size: 1.2rem;
          color: @primary-color;
        }
      }

      .flow-process {
        display: flex;
        flex-direction: column;

        .process-step {
          padding: 1.2rem;
          border-bottom: 1px solid @border-color;

          &:last-child {
            border-bottom: none;
          }

          .step-header {
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: @primary-color;
          }
        }
      }
    }
  }

  .encapsulation {
    margin-top: 2rem;

    .encapsulation-visual {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      .data-segment {
        background: #e3f2fd;
        border-radius: 8px;
        padding: 1.5rem;
        width: 100%;
        max-width: 500px;
        text-align: center;
        box-shadow: @card-shadow;

        .segment-header {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: @primary-color;
        }
      }

      .encapsulation-arrow {
        font-weight: 700;
        color: @secondary-color;
        padding: 0.5rem 0;
      }

      .protocol-stack {
        width: 100%;
        max-width: 600px;

        .protocol-layer {
          padding: 1rem;
          border: 1px solid @border-color;
          border-top: none;
          background: white;

          &:first-child {
            border-top: 1px solid @border-color;
            border-radius: 8px 8px 0 0;
          }

          &:last-child {
            border-radius: 0 0 8px 8px;
          }

          .layer-header {
            font-weight: 600;
            margin-bottom: 0.3rem;
            color: @secondary-color;
          }
        }
      }
    }
  }
}

.comparison-section {
  .comparison-table {
    overflow-x: auto;
    background: white;
    border-radius: 10px;
    box-shadow: @card-shadow;

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 800px;

      th,
      td {
        padding: 1rem;
        text-align: left;
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

          &:nth-child(odd) {
            background: @light-bg;
          }

          &:last-child {
            border-bottom: none;
          }

          td:first-child {
            font-weight: 700;
            color: @secondary-color;
          }
        }
      }
    }
  }
}

// 添加在之前的样式代码后面

.model-comparison {
  background: @light-bg;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;

  .models-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 2rem;

    .model {
      flex: 1;
      min-width: 300px;

      .model-header {
        background: @secondary-color;
        color: white;
        padding: 1rem;
        font-weight: 600;
        font-size: 1.2rem;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }

      .model-layers {
        border: 1px solid @border-color;
        border-top: none;
        border-radius: 0 0 8px 8px;
        overflow: hidden;

        .layer {
          padding: 1.2rem;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 80px;

          .layer-name {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.3rem;
          }

          .layer-equivalent {
            font-size: 0.9rem;
            opacity: 0.9;
            text-align: center;
          }
        }
      }
    }

    .comparison-arrow {
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      .difference {
        background: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .arrow {
        font-size: 2rem;
        color: @primary-color;
      }
    }
  }

  .model-differences {
    h3 {
      text-align: center;
      margin-bottom: 1.5rem;
      font-size: 1.4rem;
      color: @secondary-color;
    }

    .differences-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .difference-card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        text-align: center;
        box-shadow: @card-shadow;
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
        }

        .diff-icon {
          font-size: 2rem;
          margin-bottom: 0.8rem;
        }

        .diff-title {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: @primary-color;
          font-size: 1.1rem;
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: lighten(@text-color, 15%);
        }
      }
    }
  }
}

.summary-section {
  background: linear-gradient(135deg, #1d3557, #457b9d);
  color: white;
  border-radius: 12px;
  padding: 2.5rem;

  .summary-content {
    h2 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 2rem;
      position: relative;

      &:after {
        content: '';
        display: block;
        width: 80px;
        height: 4px;
        background: @accent-color;
        margin: 0.8rem auto 0;
        border-radius: 2px;
      }
    }

    .model-benefits {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.8rem;
      margin-bottom: 2.5rem;

      .benefit-card {
        background: rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(10px);
        border-radius: 10px;
        padding: 1.5rem;
        text-align: center;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.03);
          background: rgba(67, 97, 238, 0.2);
        }

        .benefit-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .benefit-title {
          font-weight: 600;
          font-size: 1.3rem;
          margin-bottom: 0.8rem;
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          opacity: 0.9;
        }
      }
    }

    .key-takeaways {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 1.8rem;
      margin-bottom: 2rem;

      h3 {
        text-align: center;
        font-size: 1.4rem;
        margin-bottom: 1.5rem;
        color: @accent-color;
        position: relative;

        &:after {
          content: '';
          display: block;
          width: 50px;
          height: 2px;
          background: @accent-color;
          margin: 0.5rem auto 0;
        }
      }

      ul {
        list-style: none;
        padding: 0;
        max-width: 800px;
        margin: 0 auto;

        li {
          position: relative;
          padding-left: 2rem;
          margin-bottom: 1rem;
          font-size: 1.1rem;

          &:before {
            content: '✓';
            position: absolute;
            left: 0;
            top: 0;
            color: @accent-color;
            font-weight: bold;
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}

// 响应式设计调整
@media (max-width: 992px) {
  .model-comparison {
    .models-container {
      flex-direction: column;
      align-items: stretch;

      .comparison-arrow {
        flex-direction: row;
        justify-content: center;
        margin: 1.5rem 0;

        .difference {
          margin: 0 1rem;
        }

        .arrow {
          transform: rotate(90deg);
          margin: 1rem 0;
        }
      }
    }
  }
}

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

    .model-visual {
      .model-layers {
        .layer-card {
          padding: 1rem;

          .layer-number {
            font-size: 1.5rem;
          }

          .layer-name {
            font-size: 1.1rem;
          }
        }
      }
    }
  }

  .flow-diagram {
    .flow-content {
      grid-template-columns: 1fr;
      gap: 1.5rem;

      .flow-direction {
        flex-direction: row;
        justify-content: space-between;

        .arrows {
          flex-direction: row;
          gap: 3rem;
        }
      }
    }
  }

  .model-comparison {
    .models-container {
      .model {
        min-width: 100%;
      }
    }

    .model-differences {
      .differences-grid {
        grid-template-columns: 1fr;
      }
    }
  }

  .summary-section {
    padding: 1.5rem;

    .summary-content {
      .model-benefits {
        grid-template-columns: 1fr;
      }
    }
  }
}

@media (max-width: 576px) {
  .osi-container {
    padding: 1rem;
  }

  .layer-detail-section {
    padding: 1.5rem;

    .detail-content {
      .protocol-grid {
        grid-template-columns: 1fr;
      }
    }
  }

  .comparison-table {
    table {

      th,
      td {
        padding: 0.6rem;
        font-size: 0.85rem;
      }
    }
  }

  .data-flow-section {
    padding: 1.5rem;

    .flow-diagram {
      .flow-header {
        grid-template-columns: 1fr;
        display: none;

        .flow-header-item {
          display: none;
        }
      }

      .flow-content {
        .flow-direction {
          .flow-title {
            font-size: 0.9rem;
          }

          .arrows {
            gap: 2rem;
          }
        }

        .flow-process {
          .process-step {
            padding: 0.8rem;

            .step-header {
              font-size: 1rem;
            }

            .step-desc {
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }
}
</style>
