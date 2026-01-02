<template>
  <div class="tcp-congestion">
    <!-- 标题和概述部分 -->
    <header>
      <h1>TCP拥塞与拥塞控制</h1>
      <div class="network-visualization">
        <div class="sender">发送方</div>
        <div class="network-path">
          <div class="router" v-for="i in 3" :key="i">路由器{{ i }}</div>
          <div class="congestion-indicator" :style="{ width: congestionLevel + '%' }">
            网络拥塞程度: {{ congestionLevel }}%
          </div>
        </div>
        <div class="receiver">接收方</div>
      </div>
      <p class="overview">
        TCP拥塞控制是互联网的核心技术之一，用于防止网络因过载而崩溃。它通过动态调整发送速率来适应网络状况，
        在最大化吞吐量的同时避免网络拥塞。拥塞控制算法是TCP协议中最复杂的部分之一。
      </p>
    </header>

    <!-- 主要内容 -->
    <div class="content-container">
      <!-- 左侧导航 -->
      <nav class="content-nav">
        <button v-for="(item, index) in navItems" :key="index" :class="{ active: activeNav === index }"
          @click="activeNav = index">
          {{ item }}
        </button>
      </nav>

      <!-- 右侧内容 -->
      <div class="content-main">
        <!-- 拥塞基础 -->
        <section v-show="activeNav === 0">
          <h2>TCP拥塞基础</h2>
          <div class="card">
            <h3>什么是网络拥塞？</h3>
            <p>网络拥塞发生在网络资源（如路由器缓冲区、链路带宽）不足以处理当前流量时，导致：</p>
            <ul>
              <li>数据包丢失率增加</li>
              <li>端到端延迟增大</li>
              <li>网络吞吐量下降</li>
              <li>可能导致"拥塞崩溃"（Congestion Collapse）</li>
            </ul>

            <div class="illustration">
              <div class="normal-traffic">
                <h4>正常流量</h4>
                <div class="packets">
                  <div v-for="i in 8" :key="i" class="packet"></div>
                </div>
              </div>
              <div class="congested-traffic">
                <h4>拥塞情况</h4>
                <div class="packets">
                  <div v-for="i in 15" :key="i" class="packet" :class="{ dropped: i > 10 }"></div>
                  <div class="queue">路由器队列溢出</div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>拥塞控制的目标</h3>
            <ul>
              <li><strong>高效性</strong>：最大化网络吞吐量</li>
              <li><strong>公平性</strong>：确保各TCP连接公平共享带宽</li>
              <li><strong>收敛性</strong>：快速适应网络变化</li>
              <li><strong>稳定性</strong>：避免流量剧烈波动</li>
              <li><strong>友好性</strong>：与旧版本TCP兼容</li>
            </ul>
          </div>
        </section>

        <!-- 经典算法 -->
        <section v-show="activeNav === 1">
          <h2>TCP经典拥塞控制算法</h2>
          <div class="card">
            <h3>Tahoe/Reno算法核心组件</h3>

            <div class="algorithm-component">
              <h4>1. 慢启动（Slow Start）</h4>
              <p>连接开始时或从拥塞中恢复时，指数增长拥塞窗口（cwnd）</p>
              <div class="visualization">
                <div class="cwnd-graph">
                  <div class="graph-line" :style="{ height: slowStartCwnd + 'px' }"></div>
                  <div class="label">cwnd: {{ slowStartCwnd }} MSS</div>
                </div>
                <div class="algorithm-steps">
                  <p>📈 每收到一个ACK，cwnd增加1个MSS</p>
                  <p>🚀 每RTT时间，cwnd翻倍</p>
                  <p>🛑 当cwnd达到慢启动阈值(ssthresh)时进入拥塞避免阶段</p>
                </div>
              </div>
            </div>

            <div class="algorithm-component">
              <h4>2. 拥塞避免（Congestion Avoidance）</h4>
              <p>当cwnd达到ssthresh后，转为线性增长</p>
              <div class="visualization">
                <div class="cwnd-graph">
                  <div class="graph-line" :style="{ height: congestionAvoidanceCwnd + 'px' }"></div>
                  <div class="label">cwnd: {{ congestionAvoidanceCwnd }} MSS</div>
                </div>
                <div class="algorithm-steps">
                  <p>📈 每RTT时间，cwnd增加1个MSS</p>
                  <p>📏 每收到一个ACK，cwnd增加 1/cwnd 个MSS</p>
                  <p>⚖️ 目标：在接近拥塞点时谨慎探测可用带宽</p>
                </div>
              </div>
            </div>

            <div class="algorithm-component">
              <h4>3. 快速重传（Fast Retransmit）</h4>
              <p>当收到3个重复ACK时，立即重传丢失的数据包</p>
              <div class="visualization">
                <div class="packet-sequence">
                  <div class="packet" v-for="i in 10" :key="i" :class="{
                    sent: i <= 10,
                    lost: i === 4,
                    acked: i !== 4,
                    dup: i < 4 && dupAcks > 0
                  }">
                    {{ i }}
                  </div>
                </div>
                <div class="algorithm-steps">
                  <p>🔔 接收方每收到乱序包就发送重复ACK</p>
                  <p>🚨 发送方收到3个重复ACK后立即重传</p>
                  <p>⏱️ 避免等待超时重传计时器到期</p>
                </div>
              </div>
            </div>

            <div class="algorithm-component">
              <h4>4. 快速恢复（Fast Recovery）</h4>
              <p>快速重传后进入快速恢复阶段，避免完全回退到慢启动</p>
              <div class="visualization">
                <div class="cwnd-graph">
                  <div class="graph-line" :style="{ height: fastRecoveryCwnd + 'px' }"></div>
                  <div class="label">cwnd: {{ fastRecoveryCwnd }} MSS</div>
                </div>
                <div class="algorithm-steps">
                  <p>📉 设置ssthresh = cwnd / 2</p>
                  <p>🔄 cwnd = ssthresh + 3（为3个重复ACK预留空间）</p>
                  <p>📈 每收到一个重复ACK，cwnd增加1个MSS</p>
                  <p>🔄 收到新数据ACK后，cwnd = ssthresh，进入拥塞避免</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 现代算法 -->
        <section v-show="activeNav === 2">
          <h2>现代TCP拥塞控制算法</h2>

          <div class="card">
            <h3>CUBIC TCP (Linux默认算法)</h3>
            <div class="algorithm-details">
              <div class="description">
                <p>CUBIC使用三次函数替代线性增长，更好地利用高速网络：</p>
                <ul>
                  <li>使用窗口增长函数：W = C*(t-K)³ + W_max</li>
                  <li>在拥塞后快速恢复，然后缓慢接近W_max</li>
                  <li>在接近W_max时减慢增长速度</li>
                  <li>对RTT公平性更好，适合高速长距离网络</li>
                </ul>
              </div>
              <div class="visualization">
                <div class="cubic-graph">
                  <div class="graph-line" :style="{ height: cubicValue(t) + 'px' }" v-for="t in 20" :key="t"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>BBR (Bottleneck Bandwidth and Round-trip propagation time)</h3>
            <div class="algorithm-details">
              <div class="description">
                <p>Google开发的基于模型的算法，不再依赖丢包作为拥塞信号：</p>
                <ul>
                  <li>测量瓶颈带宽(BtlBw)和传播时延(RTprop)</li>
                  <li>目标：维持在 BDP = BtlBw * RTprop 的发送速率</li>
                  <li>周期性地探测带宽和时延变化</li>
                  <li>在丢包率高、缓冲区大的网络中表现优异</li>
                </ul>
              </div>
              <div class="visualization">
                <div class="bbr-graph">
                  <div class="bandwidth">带宽: {{ bbrBandwidth }} Mbps</div>
                  <div class="rtt">RTT: {{ bbrRtt }} ms</div>
                  <div class="bdp">BDP: {{ bbrBandwidth * bbrRtt / 8 }} KB</div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>其他现代算法</h3>
            <div class="algorithm-grid">
              <div class="algorithm-card">
                <h4>Vegas</h4>
                <p>基于RTT预测拥塞，在丢包前调整速率</p>
                <ul>
                  <li>测量基准RTT和当前RTT</li>
                  <li>当Diff = (Expected - Actual) > 阈值时减小窗口</li>
                </ul>
              </div>
              <div class="algorithm-card">
                <h4>Compound TCP</h4>
                <p>结合丢包和延迟信号</p>
                <ul>
                  <li>包含基于丢包的窗口和基于延迟的窗口</li>
                  <li>取两者中较小值作为实际窗口</li>
                </ul>
              </div>
              <div class="algorithm-card">
                <h4>BBR v2</h4>
                <p>BBR的改进版本</p>
                <ul>
                  <li>更好处理流量竞争</li>
                  <li>减少缓冲区占用</li>
                  <li>改进公平性</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 实际影响 -->
        <section v-show="activeNav === 3">
          <h2>拥塞控制的实际影响</h2>

          <div class="card">
            <h3>拥塞控制的重要性</h3>
            <div class="importance-grid">
              <div class="importance-item">
                <div class="icon">🌐</div>
                <h4>互联网稳定性</h4>
                <p>防止拥塞崩溃，确保网络在重载下继续运行</p>
              </div>
              <div class="importance-item">
                <div class="icon">⚖️</div>
                <h4>公平性</h4>
                <p>确保不同连接公平共享带宽资源</p>
              </div>
              <div class="importance-item">
                <div class="icon">🚀</div>
                <h4>性能优化</h4>
                <p>最大化吞吐量，最小化延迟</p>
              </div>
              <div class="importance-item">
                <div class="icon">🔧</div>
                <h4>自适应</h4>
                <p>适应不同网络条件（有线、无线、卫星等）</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>不同场景下的表现</h3>
            <div class="scenario-table">
              <table>
                <thead>
                  <tr>
                    <th>网络类型</th>
                    <th>丢包率</th>
                    <th>缓冲区</th>
                    <th>推荐算法</th>
                    <th>性能特点</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>高速有线网络</td>
                    <td>低(＜0.1%)</td>
                    <td>大</td>
                    <td>CUBIC, BBR</td>
                    <td>高吞吐量，低延迟</td>
                  </tr>
                  <tr>
                    <td>无线网络(WiFi/4G/5G)</td>
                    <td>中高(1-5%)</td>
                    <td>小</td>
                    <td>BBR, Vegas</td>
                    <td>抗随机丢包，稳定</td>
                  </tr>
                  <tr>
                    <td>卫星网络</td>
                    <td>中(0.5-2%)</td>
                    <td>大</td>
                    <td>BBR, Hybla</td>
                    <td>处理长延迟，避免缓冲区膨胀</td>
                  </tr>
                  <tr>
                    <td>高拥塞网络</td>
                    <td>高(＞5%)</td>
                    <td>小</td>
                    <td>Reno, Cubic</td>
                    <td>保守策略避免进一步拥塞</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card">
            <h3>拥塞控制的发展趋势</h3>
            <ul>
              <li><strong>基于模型的方法</strong>：BBR开创了不依赖丢包的拥塞控制新方向</li>
              <li><strong>机器学习应用</strong>：使用强化学习等算法优化拥塞控制参数</li>
              <li><strong>QUIC协议集成</strong>：在传输层协议QUIC中实现更灵活的拥塞控制</li>
              <li><strong>数据中心优化</strong>：针对低延迟、高吞吐的数据中心网络特殊优化</li>
              <li><strong>跨层优化</strong>：与网络层和应用层协同工作</li>
            </ul>
          </div>
        </section>
      </div>
    </div>

    <footer>
      <p>TCP拥塞控制是互联网基础设施的核心组件，持续的研究和改进确保网络能够在不断增长的流量下保持高效和稳定。</p>
      <div class="footer-links">
        <a href="#">RFC 5681 - TCP拥塞控制</a>
        <a href="#">BBR论文</a>
        <a href="#">Linux TCP文档</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 导航状态
const activeNav = ref(0);
const navItems = ref([
  '拥塞基础',
  '经典算法',
  '现代算法',
  '实际影响'
]);

// 拥塞可视化
const congestionLevel = ref(30);
let congestionInterval: number;

// 慢启动可视化
const slowStartCwnd = ref(1);
let slowStartInterval: number;

// 拥塞避免可视化
const congestionAvoidanceCwnd = ref(10);
let congestionAvoidInterval: number;

// 快速恢复可视化
const fastRecoveryCwnd = ref(8);
const dupAcks = ref(0);

// BBR可视化
const bbrBandwidth = ref(100);
const bbrRtt = ref(50);
let bbrInterval: number;

// CUBIC可视化
const cubicValue = (t: number) => {
  return 50 + 30 * Math.sin(t * 0.5);
};

// 动画效果
onMounted(() => {
  // 网络拥塞水平动画
  congestionInterval = setInterval(() => {
    congestionLevel.value = 30 + Math.sin(Date.now() / 5000) * 30;
  }, 500) as unknown as number;

  // 慢启动动画
  slowStartInterval = setInterval(() => {
    if (slowStartCwnd.value < 15) {
      slowStartCwnd.value += 1;
    }
  }, 800) as unknown as number;

  // 拥塞避免动画
  congestionAvoidInterval = setInterval(() => {
    if (congestionAvoidanceCwnd.value < 20) {
      congestionAvoidanceCwnd.value += 0.2;
    }
  }, 500) as unknown as number;

  // 快速恢复动画
  setInterval(() => {
    if (dupAcks.value < 3) {
      dupAcks.value += 1;
    } else {
      dupAcks.value = 0;
    }
  }, 1000);

  // BBR动画
  bbrInterval = setInterval(() => {
    bbrBandwidth.value = 80 + Math.sin(Date.now() / 4000) * 40;
    bbrRtt.value = 40 + Math.sin(Date.now() / 3000) * 20;
  }, 500) as unknown as number;
});

onUnmounted(() => {
  clearInterval(congestionInterval);
  clearInterval(slowStartInterval);
  clearInterval(congestionAvoidInterval);
  clearInterval(bbrInterval);
});
</script>

<style scoped lang="less">
@primary-color: #2c6e49;
@secondary-color: #4c956c;
@accent-color: #fefee3;
@background-color: #f9f9f9;
@card-color: #ffffff;
@text-color: #333333;
@border-color: #e0e0e0;
@congestion-color: #e76f51;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.tcp-congestion {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: @background-color;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      color: @primary-color;
      margin-bottom: 20px;
      font-size: 2.5rem;
      position: relative;
      padding-bottom: 15px;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 200px;
        height: 4px;
        background: linear-gradient(90deg, @primary-color, @secondary-color);
        border-radius: 2px;
      }
    }

    .overview {
      max-width: 800px;
      margin: 25px auto;
      padding: 20px;
      background-color: lighten(@accent-color, 5%);
      border-radius: 12px;
      font-size: 1.1rem;
      text-align: center;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    }
  }

  .network-visualization {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    .sender,
    .receiver {
      width: 120px;
      height: 80px;
      background: @primary-color;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .network-path {
      flex: 1;
      margin: 0 20px;
      position: relative;
      height: 100px;

      .router {
        position: absolute;
        width: 60px;
        height: 60px;
        background: #e9c46a;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #333;

        &:nth-child(1) {
          left: 15%;
          top: 20px;
        }

        &:nth-child(2) {
          left: 50%;
          top: 40px;
          transform: translateX(-50%);
        }

        &:nth-child(3) {
          left: 85%;
          top: 20px;
        }
      }

      .congestion-indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 20px;
        background: linear-gradient(90deg, #2a9d8f, @congestion-color);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.9rem;
        font-weight: bold;
        transition: width 1s ease;
      }
    }
  }

  .content-container {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .content-nav {
    flex: 0 0 200px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 768px) {
      flex-direction: row;
      flex-wrap: wrap;
      flex: none;
    }

    button {
      padding: 15px;
      border: none;
      background: #e9f5eb;
      border-radius: 8px;
      text-align: left;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #d4eeda;
        transform: translateX(5px);

        @media (max-width: 768px) {
          transform: translateY(-3px);
        }
      }

      &.active {
        background: @primary-color;
        color: white;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .content-main {
    flex: 1;

    section {
      margin-bottom: 30px;

      h2 {
        color: @primary-color;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid @border-color;
      }
    }

    .card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 25px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

      h3 {
        color: darken(@primary-color, 10%);
        margin-bottom: 20px;
        font-size: 1.4rem;
      }

      h4 {
        color: @primary-color;
        margin: 15px 0 10px;
      }

      p {
        margin-bottom: 15px;
        line-height: 1.7;
      }

      ul {
        padding-left: 25px;
        margin-bottom: 20px;

        li {
          margin-bottom: 10px;
          line-height: 1.6;
        }
      }
    }

    .illustration {
      display: flex;
      gap: 30px;
      margin: 20px 0;

      @media (max-width: 600px) {
        flex-direction: column;
      }

      .normal-traffic,
      .congested-traffic {
        flex: 1;
        border: 1px solid @border-color;
        border-radius: 8px;
        padding: 15px;

        h4 {
          text-align: center;
          margin-bottom: 15px;
        }
      }

      .congested-traffic {
        border-color: @congestion-color;
      }

      .packets {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        .packet {
          width: 30px;
          height: 20px;
          background: @secondary-color;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.8rem;

          &.dropped {
            background: @congestion-color;
            opacity: 0.6;
          }
        }

        .queue {
          width: 100%;
          text-align: center;
          margin-top: 10px;
          color: @congestion-color;
          font-weight: bold;
        }
      }
    }

    .algorithm-component {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid @border-color;

      &:last-child {
        border-bottom: none;
      }
    }

    .visualization {
      display: flex;
      gap: 20px;
      margin: 15px 0;

      @media (max-width: 600px) {
        flex-direction: column;
      }

      .cwnd-graph {
        flex: 0 0 100px;
        height: 150px;
        background: #f0f7f4;
        border-radius: 8px;
        display: flex;
        align-items: flex-end;
        padding: 10px;
        position: relative;

        .graph-line {
          width: 30px;
          background: @secondary-color;
          border-radius: 4px 4px 0 0;
          transition: height 0.5s ease;
        }

        .label {
          position: absolute;
          bottom: -30px;
          width: 100%;
          text-align: center;
          font-weight: bold;
        }
      }

      .algorithm-steps {
        flex: 1;
        background: #e9f5f1;
        border-radius: 8px;
        padding: 15px;
        font-size: 0.95rem;

        p {
          margin-bottom: 10px;
          padding-left: 25px;
          position: relative;

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 18px;
            height: 18px;
            background: @primary-color;
            border-radius: 50%;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
          }
        }
      }
    }

    .packet-sequence {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 15px 0;

      .packet {
        width: 40px;
        height: 25px;
        background: @secondary-color;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;

        &.sent {
          background: #a7c957;
        }

        &.lost {
          background: @congestion-color;
          animation: blink 1s infinite;
        }

        &.acked {
          opacity: 0.5;
        }

        &.dup {
          border: 2px dashed @congestion-color;
        }
      }
    }

    .algorithm-details {
      display: flex;
      gap: 30px;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      .description {
        flex: 1;
      }

      .visualization {
        flex: 1;
      }
    }

    .cubic-graph {
      display: flex;
      align-items: flex-end;
      gap: 2px;
      height: 150px;
      background: #f0f7f4;
      border-radius: 8px;
      padding: 10px;

      .graph-line {
        flex: 1;
        background: @secondary-color;
        border-radius: 4px 4px 0 0;
      }
    }

    .bbr-graph {
      background: #e9f5f1;
      border-radius: 8px;
      padding: 20px;
      text-align: center;

      .bandwidth,
      .rtt,
      .bdp {
        margin: 15px 0;
        padding: 15px;
        background: white;
        border-radius: 8px;
        font-weight: bold;
        font-size: 1.2rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
      }
    }

    .algorithm-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;

      .algorithm-card {
        background: #e9f5f1;
        border-radius: 8px;
        padding: 20px;

        h4 {
          color: @primary-color;
          margin-bottom: 10px;
        }

        p {
          margin-bottom: 10px;
          font-size: 0.95rem;
        }

        ul {
          padding-left: 20px;
          font-size: 0.9rem;
        }
      }
    }

    .importance-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;

      .importance-item {
        background: #f0f7f4;
        border-radius: 8px;
        padding: 20px;
        text-align: center;

        .icon {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        h4 {
          color: @primary-color;
          margin-bottom: 10px;
        }
      }
    }

    .scenario-table {
      overflow-x: auto;

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;

        th,
        td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid @border-color;
        }

        th {
          background-color: @primary-color;
          color: white;
          font-weight: bold;
        }

        tr:nth-child(even) {
          background-color: #f0f7f4;
        }

        tr:hover {
          background-color: #e0f0e9;
        }
      }
    }
  }

  footer {
    margin-top: 40px;
    padding: 25px;
    background-color: lighten(@accent-color, 3%);
    border-radius: 12px;
    text-align: center;
    font-size: 1.1rem;
    border-top: 2px solid @border-color;

    p {
      margin-bottom: 15px;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;

      a {
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .tcp-congestion {
    padding: 15px;

    header h1 {
      font-size: 2rem;
    }

    .network-visualization {
      padding: 10px;

      .sender,
      .receiver {
        width: 80px;
        height: 60px;
        font-size: 1rem;
      }
    }
  }
}
</style>
