<template>
  <div class="load-balancer-container">
    <!-- 头部区域 -->
    <header class="hero-section">
      <div class="network-lines"></div>
      <div class="hero-content">
        <h1>负载均衡技术 <span class="subtitle">现代网络架构的核心支柱</span></h1>
        <p class="tagline">分发流量，优化资源，保障高可用性的关键技术</p>
        <div class="lb-stats">
          <div class="stat">
            <div class="stat-value">92%</div>
            <div class="stat-label">企业使用负载均衡</div>
          </div>
          <div class="stat">
            <div class="stat-value">300%</div>
            <div class="stat-label">性能提升幅度</div>
          </div>
          <div class="stat">
            <div class="stat-value">99.99%</div>
            <div class="stat-label">系统可用性保障</div>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="traffic-flow">
          <div class="client">📱 用户请求</div>
          <div class="arrow">↓</div>
          <div class="lb-node">⚖️ 负载均衡器</div>
          <div class="arrow">↓</div>
          <div class="server-group">
            <div class="server">🖥️ 服务器1 <span class="load-light" :style="{ backgroundColor: getLoadColor(20) }"></span>
            </div>
            <div class="server">🖥️ 服务器2 <span class="load-light" :style="{ backgroundColor: getLoadColor(65) }"></span>
            </div>
            <div class="server">🖥️ 服务器3 <span class="load-light" :style="{ backgroundColor: getLoadColor(45) }"></span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 基本概念 -->
    <section class="concepts-section">
      <div class="section-header">
        <h2>什么是负载均衡？</h2>
        <p>优化资源利用，最大化吞吐量，最小化响应时间</p>
      </div>

      <div class="concept-cards">
        <div class="concept-card">
          <div class="card-icon">⚖️</div>
          <div class="card-content">
            <h3>核心定义</h3>
            <p>负载均衡是将网络流量分发到多个服务器资源的过程，旨在优化资源使用、最大化吞吐量、最小化响应时间，并避免任何单一资源的过载。</p>
          </div>
        </div>

        <div class="concept-card">
          <div class="card-icon">🎯</div>
          <div class="card-content">
            <h3>关键目标</h3>
            <ul>
              <li>提高应用程序的可用性和可靠性</li>
              <li>提升系统处理能力与扩展性</li>
              <li>避免单点故障导致服务中断</li>
              <li>优化资源利用率降低成本</li>
              <li>提供无缝的用户体验</li>
            </ul>
          </div>
        </div>

        <div class="concept-card">
          <div class="card-icon">🌐</div>
          <div class="card-content">
            <h3>技术演进</h3>
            <div class="evolution-timeline">
              <div class="timeline-item">1990s<br>硬件负载均衡器</div>
              <div class="timeline-item">2000s<br>软件负载均衡器</div>
              <div class="timeline-item">2010s<br>云负载均衡服务</div>
              <div class="timeline-item">2020s<br>AI驱动的智能均衡</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 工作原理 -->
    <section class="workflow-section">
      <div class="section-header">
        <h2>工作原理</h2>
        <p>负载均衡如何分发请求</p>
      </div>

      <div class="workflow-diagram">
        <div class="workflow-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>客户端请求</h3>
            <p>用户向应用程序发送请求（HTTP/HTTPS/TCP等）</p>
          </div>
        </div>

        <div class="workflow-arrow">➔</div>

        <div class="workflow-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>负载均衡器接收</h3>
            <p>请求首先到达负载均衡器（L4/L7层）</p>
          </div>
        </div>

        <div class="workflow-arrow">➔</div>

        <div class="workflow-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>算法决策</h3>
            <p>负载均衡器根据配置的算法选择后端服务器</p>
          </div>
        </div>

        <div class="workflow-arrow">➔</div>

        <div class="workflow-step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>请求转发</h3>
            <p>将请求转发到选定的后端服务器</p>
          </div>
        </div>

        <div class="workflow-arrow">➔</div>

        <div class="workflow-step">
          <div class="step-number">5</div>
          <div class="step-content">
            <h3>响应返回</h3>
            <p>服务器处理请求并通过负载均衡器返回响应</p>
          </div>
        </div>
      </div>

      <div class="health-check">
        <div class="health-icon">🩺</div>
        <div class="health-content">
          <h3>健康检查机制</h3>
          <p>负载均衡器持续监控后端服务器的健康状态，自动将流量从故障服务器重定向到健康服务器，保障服务连续性。</p>
          <ul>
            <li>主动检查：定期发送探测请求</li>
            <li>被动检查：基于请求响应判断</li>
            <li>组合策略：结合主动与被动检查</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 负载均衡算法 -->
    <section class="algorithms-section">
      <div class="section-header">
        <h2>负载均衡算法</h2>
        <p>智能流量分发的核心逻辑</p>
      </div>

      <div class="algorithm-cards">
        <div class="algorithm-card">
          <div class="algorithm-header">
            <div class="algo-icon">🔢</div>
            <h3>轮询算法 (Round Robin)</h3>
          </div>
          <div class="algorithm-body">
            <p>依次将新请求分配给下一个服务器，循环往复</p>
            <div class="algorithm-stats">
              <div class="stat">
                <span>优点</span>
                <div class="pros">简单、公平、易于实现</div>
              </div>
              <div class="stat">
                <span>缺点</span>
                <div class="cons">忽略服务器性能差异</div>
              </div>
              <div class="stat">
                <span>适用场景</span>
                <div class="use-case">服务器性能相近的环境</div>
              </div>
            </div>
          </div>
        </div>

        <div class="algorithm-card">
          <div class="algorithm-header">
            <div class="algo-icon">⚖️</div>
            <h3>加权轮询 (Weighted Round Robin)</h3>
          </div>
          <div class="algorithm-body">
            <p>根据服务器性能分配权重，高性能服务器处理更多请求</p>
            <div class="algorithm-stats">
              <div class="stat">
                <span>优点</span>
                <div class="pros">考虑服务器能力差异</div>
              </div>
              <div class="stat">
                <span>缺点</span>
                <div class="cons">权重配置需人工调整</div>
              </div>
              <div class="stat">
                <span>适用场景</span>
                <div class="use-case">服务器性能不均的环境</div>
              </div>
            </div>
          </div>
        </div>

        <div class="algorithm-card">
          <div class="algorithm-header">
            <div class="algo-icon">📊</div>
            <h3>最少连接 (Least Connections)</h3>
          </div>
          <div class="algorithm-body">
            <p>将新请求分配给当前连接数最少的服务器</p>
            <div class="algorithm-stats">
              <div class="stat">
                <span>优点</span>
                <div class="pros">动态适应服务器负载</div>
              </div>
              <div class="stat">
                <span>缺点</span>
                <div class="cons">需要维护连接状态</div>
              </div>
              <div class="stat">
                <span>适用场景</span>
                <div class="use-case">长连接应用（如数据库）</div>
              </div>
            </div>
          </div>
        </div>

        <div class="algorithm-card">
          <div class="algorithm-header">
            <div class="algo-icon">🌐</div>
            <h3>IP哈希 (IP Hash)</h3>
          </div>
          <div class="algorithm-body">
            <p>根据客户端IP计算哈希值，将同一IP的请求定向到同一服务器</p>
            <div class="algorithm-stats">
              <div class="stat">
                <span>优点</span>
                <div class="pros">保持会话一致性</div>
              </div>
              <div class="stat">
                <span>缺点</span>
                <div class="cons">负载可能不均衡</div>
              </div>
              <div class="stat">
                <span>适用场景</span>
                <div class="use-case">需要会话保持的应用</div>
              </div>
            </div>
          </div>
        </div>

        <div class="algorithm-card">
          <div class="algorithm-header">
            <div class="algo-icon">📈</div>
            <h3>响应时间算法 (Response Time)</h3>
          </div>
          <div class="algorithm-body">
            <p>将请求定向到响应时间最短的服务器</p>
            <div class="algorithm-stats">
              <div class="stat">
                <span>优点</span>
                <div class="pros">提供最佳用户体验</div>
              </div>
              <div class="stat">
                <span>缺点</span>
                <div class="cons">实现复杂度高</div>
              </div>
              <div class="stat">
                <span>适用场景</span>
                <div class="use-case">性能敏感型应用</div>
              </div>
            </div>
          </div>
        </div>

        <div class="algorithm-card">
          <div class="algorithm-header">
            <div class="algo-icon">🤖</div>
            <h3>AI预测算法 (Predictive)</h3>
          </div>
          <div class="algorithm-body">
            <p>基于机器学习预测服务器未来负载并分配请求</p>
            <div class="algorithm-stats">
              <div class="stat">
                <span>优点</span>
                <div class="pros">前瞻性负载分配</div>
              </div>
              <div class="stat">
                <span>缺点</span>
                <div class="cons">需要历史数据训练</div>
              </div>
              <div class="stat">
                <span>适用场景</span>
                <div class="use-case">流量波动大的复杂系统</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="use-cases-section">
      <div class="section-header">
        <h2>使用场景</h2>
        <p>负载均衡的实际应用领域</p>
      </div>

      <div class="use-case-grid">
        <div class="use-case-card">
          <div class="case-icon">🌐</div>
          <h3>Web应用程序</h3>
          <p>分发HTTP/HTTPS请求到多个Web服务器，处理大量并发用户访问</p>
        </div>

        <div class="use-case-card">
          <div class="case-icon">📱</div>
          <h3>移动应用后端</h3>
          <p>处理API请求，根据地理位置分配用户到最近的数据中心</p>
        </div>

        <div class="use-case-card">
          <div class="case-icon">🎮</div>
          <h3>游戏服务器</h3>
          <p>动态分配玩家到不同游戏实例，平衡服务器负载</p>
        </div>

        <div class="use-case-card">
          <div class="case-icon">📊</div>
          <h3>大数据处理</h3>
          <p>分发数据处理任务到多个计算节点，加速分析过程</p>
        </div>

        <div class="use-case-card">
          <div class="case-icon">🔒</div>
          <h3>安全防护</h3>
          <p>作为安全屏障，分散DDoS攻击流量到清洗中心</p>
        </div>

        <div class="use-case-card">
          <div class="case-icon">💾</div>
          <h3>数据库集群</h3>
          <p>分配读写请求到多个数据库节点，实现读写分离</p>
        </div>
      </div>
    </section>

    <!-- 技术实现 -->
    <section class="implementation-section">
      <div class="section-header">
        <h2>技术实现</h2>
        <p>主流负载均衡解决方案</p>
      </div>

      <div class="tech-grid">
        <div class="tech-card">
          <div class="tech-logo">🔄</div>
          <h3>Nginx</h3>
          <p>高性能开源Web服务器和反向代理，支持HTTP、TCP/UDP负载均衡</p>
          <div class="tech-features">
            <span>轮询</span>
            <span>最少连接</span>
            <span>IP哈希</span>
          </div>
        </div>

        <div class="tech-card">
          <div class="tech-logo">🔄</div>
          <h3>HAProxy</h3>
          <p>专注于负载均衡的高性能TCP/HTTP代理，支持高级健康检查</p>
          <div class="tech-features">
            <span>动态权重</span>
            <span>高级算法</span>
            <span>高可用性</span>
          </div>
        </div>

        <div class="tech-card">
          <div class="tech-logo">☁️</div>
          <h3>AWS ALB</h3>
          <p>Amazon应用负载均衡器，支持基于路径和主机的路由</p>
          <div class="tech-features">
            <span>自动扩展</span>
            <span>SSL终止</span>
            <span>WebSockets</span>
          </div>
        </div>

        <div class="tech-card">
          <div class="tech-logo">☁️</div>
          <h3>Azure Load Balancer</h3>
          <p>微软云负载均衡服务，提供低延迟高吞吐量解决方案</p>
          <div class="tech-features">
            <span>区域冗余</span>
            <span>TCP/UDP</span>
            <span>IPv6</span>
          </div>
        </div>
      </div>

      <div class="deployment-models">
        <h3>部署模型</h3>
        <div class="models">
          <div class="model">
            <div class="model-icon">🖥️</div>
            <h4>硬件负载均衡器</h4>
            <p>专用硬件设备，高性能但成本高</p>
          </div>
          <div class="model">
            <div class="model-icon">💿</div>
            <h4>软件负载均衡器</h4>
            <p>部署在通用服务器上，灵活且经济</p>
          </div>
          <div class="model">
            <div class="model-icon">☁️</div>
            <h4>云负载均衡服务</h4>
            <p>托管服务，按需扩展，零维护</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 最佳实践 -->
    <section class="best-practices">
      <div class="section-header">
        <h2>最佳实践</h2>
        <p>高效部署负载均衡的策略</p>
      </div>

      <div class="practices-container">
        <div class="practice-card">
          <div class="practice-number">1</div>
          <div class="practice-content">
            <h3>多层次负载均衡</h3>
            <p>采用多层负载均衡架构（全局→区域→集群），实现细粒度流量控制</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-number">2</div>
          <div class="practice-content">
            <h3>健康检查优化</h3>
            <p>配置适当的健康检查频率和超时设置，平衡及时性和开销</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-number">3</div>
          <div class="practice-content">
            <h3>算法动态调整</h3>
            <p>根据业务特点选择算法，并随流量模式变化调整策略</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-number">4</div>
          <div class="practice-content">
            <h3>自动扩展集成</h3>
            <p>将负载均衡器与自动扩展组集成，动态调整后端容量</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-number">5</div>
          <div class="practice-content">
            <h3>SSL终止优化</h3>
            <p>在负载均衡器上终止SSL连接，减轻后端服务器负担</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-number">6</div>
          <div class="practice-content">
            <h3>监控与分析</h3>
            <p>实施全面的监控，分析流量模式，持续优化配置</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="lb-footer">
      <div class="footer-content">
        <div class="quote">
          <blockquote>
            "优秀的负载均衡是实现高可用系统的基石，它让分布式架构变得无缝而高效。"
          </blockquote>
          <div class="author">—— 网络架构设计原则</div>
        </div>
        <div class="footer-links">
          <h3>深入了解</h3>
          <ul>
            <li>Nginx负载均衡配置指南</li>
            <li>云原生负载均衡模式</li>
            <li>高性能负载均衡算法</li>
            <li>负载均衡安全最佳实践</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="copyright"> 网络架构与技术 | 负载均衡专家指南</div>
        <div class="stats">页面生成于服务器负载最低时段 <span class="load-value">{{ serverLoad }}%</span></div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 动态服务器负载显示
const serverLoad = ref(0);
const serverLoadInterval = ref<any>(null);

// 模拟服务器负载变化
const simulateServerLoad = () => {
  serverLoadInterval.value = setInterval(() => {
    serverLoad.value = Math.floor(Math.random() * 30) + 5; // 5-35% 负载
  }, 3000);
};

// 根据负载百分比获取颜色
const getLoadColor = (load: number) => {
  if (load < 30) return '#2ecc71'; // 绿色
  if (load < 70) return '#f39c12'; // 黄色
  return '#e74c3c'; // 红色
};

onMounted(() => {
  simulateServerLoad();
});
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #e74c3c;
@background-color: #f8f9ff;
@text-color: #2c3e50;
@card-bg: #ffffff;
@border-color: #ecf0f1;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.load-balancer-container {
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  color: @text-color;
  background-color: @background-color;
  line-height: 1.6;
}

/* 头部样式 */
.hero-section {
  position: relative;

  border-radius: 0 0 30px 30px;
  padding: 60px 20px 40px;
  margin-bottom: 40px;
  color: white;
  overflow: hidden;

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 800px;
    margin: 0 auto 40px;

    h1 {
      font-size: 2.8rem;
      margin: 0 0 10px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.4rem;
      font-weight: 300;
      opacity: 0.9;
      display: block;
    }

    .tagline {
      font-size: 1.2rem;
      max-width: 600px;
      margin: 20px auto 0;
      font-weight: 300;
      opacity: 0.85;
    }
  }

  .lb-stats {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 30px;

    .stat {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      padding: 15px 20px;
      min-width: 130px;

      .stat-value {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 0.95rem;
        opacity: 0.9;
      }
    }
  }

  .hero-visual {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    padding: 25px;
    max-width: 800px;
    margin: 40px auto 0;

    .traffic-flow {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      >div {
        padding: 15px 25px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        text-align: center;
        width: 100%;
      }

      .lb-node {
        background: linear-gradient(135deg, @primary-color, darken(@primary-color, 15%));
        font-weight: 600;
      }

      .server-group {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;

        .server {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px 10px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 8px;

          .load-light {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-left: 8px;
          }
        }
      }
    }
  }
}

/* 通用分区头部样式 */
.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;

  h2 {
    font-size: 2rem;
    margin-bottom: 15px;
    color: @text-color;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 70px;
      height: 4px;
      background: linear-gradient(to right, @primary-color, @secondary-color);
      border-radius: 2px;
    }
  }

  p {
    font-size: 1.1rem;
    color: #7f8c8d;
    margin-top: 20px;
  }
}

/* 基本概念部分 */
.concepts-section {
  margin-bottom: 70px;

  .concept-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .concept-card {
    background: @card-bg;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    }

    .card-icon {
      font-size: 3rem;
      text-align: center;
      margin-bottom: 20px;
      color: @primary-color;
    }

    h3 {
      font-size: 1.4rem;
      margin-bottom: 15px;
      color: darken(@primary-color, 15%);
    }

    p,
    ul {
      color: #555;
      line-height: 1.7;
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 8px;
        position: relative;

        &::before {
          content: '•';
          color: @primary-color;
          font-weight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }
      }
    }
  }

  .evolution-timeline {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 15px;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(to right, @primary-color, @secondary-color);
      z-index: 1;
    }

    .timeline-item {
      background: @card-bg;
      padding: 10px 15px;
      border-radius: 8px;
      text-align: center;
      font-size: 0.9rem;
      z-index: 2;
      border: 1px solid @border-color;
      width: 23%;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 15px;
        height: 15px;
        background: @secondary-color;
        border-radius: 50%;
        z-index: 3;
      }
    }
  }
}

/* 工作流程部分 */
.workflow-section {
  margin-bottom: 70px;

  .workflow-diagram {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    max-width: 1000px;
    margin: 0 auto 40px;

    .workflow-step {
      background: @card-bg;
      border-radius: 12px;
      padding: 20px;
      width: 160px;
      text-align: center;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
      position: relative;

      .step-number {
        position: absolute;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 30px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.1rem;
      }

      h3 {
        font-size: 1.1rem;
        margin-bottom: 10px;
        color: darken(@primary-color, 15%);
      }

      p {
        font-size: 0.9rem;
        color: #7f8c8d;
      }
    }

    .workflow-arrow {
      display: flex;
      align-items: center;
      font-size: 2rem;
      color: @primary-color;
    }
  }

  .health-check {
    background: @card-bg;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    display: flex;
    gap: 25px;
    max-width: 1000px;
    margin: 0 auto;

    .health-icon {
      font-size: 3.5rem;
      color: @accent-color;
    }

    .health-content {
      h3 {
        font-size: 1.5rem;
        margin-bottom: 15px;
        color: darken(@accent-color, 10%);
      }

      p {
        margin-bottom: 20px;
        line-height: 1.7;
      }

      ul {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;

        li {
          padding: 12px 15px;
          background: rgba(@primary-color, 0.08);
          border-radius: 8px;
          font-weight: 500;
        }
      }
    }
  }
}

/* 算法部分 */
.algorithms-section {
  margin-bottom: 70px;

  .algorithm-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .algorithm-card {
    background: @card-bg;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    }

    .algorithm-header {
      padding: 20px 25px;
      display: flex;
      align-items: center;
      gap: 15px;
      background: linear-gradient(135deg, @primary-color, darken(@primary-color, 10%));
      color: white;

      .algo-icon {
        font-size: 1.8rem;
      }

      h3 {
        margin: 0;
        font-size: 1.3rem;
      }
    }

    .algorithm-body {
      padding: 25px;

      p {
        margin-bottom: 20px;
        line-height: 1.7;
        color: #555;
      }
    }

    .algorithm-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 15px;

      .stat {
        span {
          display: block;
          font-weight: 600;
          margin-bottom: 5px;
          color: darken(@primary-color, 15%);
          font-size: 0.9rem;
        }

        .pros {
          color: #27ae60;
          font-size: 0.9rem;
        }

        .cons {
          color: #e74c3c;
          font-size: 0.9rem;
        }

        .use-case {
          color: #9b59b6;
          font-size: 0.9rem;
        }
      }
    }
  }
}

/* 使用场景部分 */
.use-cases-section {
  margin-bottom: 70px;

  .use-case-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .use-case-card {
    background: @card-bg;
    border-radius: 16px;
    padding: 30px 25px;
    text-align: center;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    }

    .case-icon {
      font-size: 3rem;
      margin-bottom: 20px;
      color: @primary-color;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
    }

    p {
      color: #7f8c8d;
      line-height: 1.7;
    }
  }
}

/* 技术实现部分 */
.implementation-section {
  margin-bottom: 70px;

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
    max-width: 1200px;
    margin: 0 auto 40px;
  }

  .tech-card {
    background: @card-bg;
    border-radius: 16px;
    padding: 30px 25px;
    text-align: center;
    box-shadow: 0
  }
}
</style>
