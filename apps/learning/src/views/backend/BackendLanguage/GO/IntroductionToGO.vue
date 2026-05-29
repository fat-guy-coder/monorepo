<template>
  <div class="go-intro">
    <header class="page-header">
      <div class="header-content">
        <div class="logo-area">
          <div class="go-mascot"></div>
          <h1>Go 语言</h1>
        </div>
        <p class="subtitle">简洁、高效、并发</p>
      </div>
      <div class="header-decoration"></div>
    </header>

    <main class="main-content">
      <!-- 来历卡片 -->
      <section class="card origin-card">
        <h2 class="card-title">📜 语言来历</h2>
        <div class="card-body">
          <p>
            Go（又称 Golang）诞生于 2007 年，由 Google 的
            <strong>Robert Griesemer</strong>、<strong>Rob Pike</strong> 和
            <strong>Ken Thompson</strong> 三位资深工程师共同设计。
          </p>
          <p>
            他们不满于现有语言在大型系统开发中的复杂性、编译速度和并发处理能力，于
            2009 年正式将 Go 开源。其设计哲学是“<em>少即是多</em>”，追求简单、可靠和高效。
          </p>
        </div>
      </section>

      <!-- 三列网格：类型、优势、特点 -->
      <div class="info-grid">
        <section class="card type-card">
          <h2 class="card-title">🔧 语言类型</h2>
          <div class="card-body">
            <ul class="feature-list">
              <li><span class="badge">编译型</span> 直接生成机器码</li>
              <li><span class="badge">静态类型</span> 变量类型在编译期确定</li>
              <li><span class="badge">强类型</span> 隐式类型转换受限</li>
              <li><span class="badge">并发原生</span> goroutine 轻量线程</li>
            </ul>
          </div>
        </section>

        <section class="card advantage-card">
          <h2 class="card-title">✨ 核心优势</h2>
          <div class="card-body">
            <ul class="feature-list">
              <li>⚡ 极快的编译速度</li>
              <li>🧵 内置并发与 channel 通信</li>
              <li>🗑️ 自动垃圾回收（GC）</li>
              <li>📦 丰富的标准库与工具链</li>
              <li>🐳 跨平台编译，单一二进制部署</li>
            </ul>
          </div>
        </section>

        <section class="card feature-card">
          <h2 class="card-title">🎯 语言特点</h2>
          <div class="card-body">
            <ul class="feature-list">
              <li>✅ 简洁语法，仅 25 个关键字</li>
              <li>✅ 接口与组合，无继承与多态</li>
              <li>✅ 显式错误处理，无异常机制</li>
              <li>✅ 原生支持 HTTP/2、JSON、加密</li>
              <li>✅ 强大的静态分析工具</li>
            </ul>
          </div>
        </section>
      </div>

      <!-- 使用场景 -->
      <section class="card scene-card">
        <h2 class="card-title">🚀 使用场景</h2>
        <div class="card-body scene-grid">
          <div class="scene-item">
            <div class="scene-icon">☁️</div>
            <span>云原生基础设施</span>
            <small>Docker, Kubernetes, Istio</small>
          </div>
          <div class="scene-item">
            <div class="scene-icon">🖥️</div>
            <span>后端微服务</span>
            <small>API 网关、业务服务</small>
          </div>
          <div class="scene-item">
            <div class="scene-icon">🔗</div>
            <span>区块链开发</span>
            <small>Hyperledger Fabric, 公链</small>
          </div>
          <div class="scene-item">
            <div class="scene-icon">🛠️</div>
            <span>DevOps 工具</span>
            <small>Terraform, Prometheus</small>
          </div>
          <div class="scene-item">
            <div class="scene-icon">🌐</div>
            <span>网络编程</span>
            <small>反向代理、即时通讯</small>
          </div>
          <div class="scene-item">
            <div class="scene-icon">📊</div>
            <span>数据处理</span>
            <small>日志采集、ETL 管道</small>
          </div>
        </div>
      </section>

      <!-- 市场使用率 -->
      <section class="card market-card">
        <h2 class="card-title">📈 市场使用率</h2>
        <div class="card-body">
          <p class="market-intro">根据多家知名技术社区的调研，Go 的流行度持续攀升：</p>
          <div class="rate-list">
            <div class="rate-item" v-for="item in marketRates" :key="item.name">
              <div class="rate-header">
                <span class="rate-source">{{ item.name }}</span>
                <span class="rate-percent">{{ item.percent }}%</span>
              </div>
              <div class="rate-bar-bg">
                <div class="rate-bar-fill" :style="{ width: item.percent + '%' }"></div>
              </div>
              <p class="rate-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="page-footer">
      <p>Go 语言 — 构建简单、可靠、高效的软件</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface MarketRate {
  name: string;
  percent: number;
  desc: string;
}

const marketRates = ref<MarketRate[]>([
  {
    name: 'Stack Overflow 2023',
    percent: 14,
    desc: '专业开发者中使用 Go 的比例',
  },
  {
    name: 'TIOBE 指数',
    percent: 1.9,
    desc: '常年位列前 10 名，占比约 1.5% ~ 2%',
  },
  {
    name: 'GitHub 年度报告',
    percent: 11,
    desc: 'Pull Request 数量增长最快的语言之一',
  },
  {
    name: 'JetBrains 调查',
    percent: 17,
    desc: '开发者计划采用/迁移到 Go 的比例',
  },
]);
</script>

<style lang="less" scoped>
// 颜色和尺寸变量
@go-primary: #00ADD8; // Go 官方蓝
@go-primary-dark: #007d9c;
@go-light: #E6F7FA;
@go-bg: #F5FCFD;
@text-main: #2C3E50;
@text-secondary: #5A6C7D;
@card-shadow: 0 4px 20px rgba(0, 173, 216, 0.08);
@card-radius: 16px;
@transition: all 0.3s ease;

.go-intro {
  font-family: 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', system-ui, sans-serif;
  background-color: @go-bg;
  color: @text-main;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

// 头部
.page-header {
  background: linear-gradient(135deg, @go-primary 0%, @go-primary-dark 100%);
  padding: 3rem 2rem 2rem;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);

  .header-content {
    position: relative;
    z-index: 2;
  }

  .logo-area {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 0.5rem;

    .go-mascot {
      width: 48px;
      height: 48px;
      background: white;
      border-radius: 50%;
      position: relative;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

      // 简易地鼠形象
      &::before {
        content: '';
        position: absolute;
        width: 24px;
        height: 16px;
        background: @go-primary;
        border-radius: 50% 50% 40% 40%;
        bottom: 6px;
        left: 50%;
        transform: translateX(-50%);
      }

      &::after {
        content: '';
        position: absolute;
        width: 28px;
        height: 20px;
        background: @go-primary;
        border-radius: 8px 8px 0 0;
        top: 8px;
        left: 10px;
      }
    }

    h1 {
      font-size: 2.8rem;
      font-weight: 700;
      letter-spacing: 1px;
      margin: 0;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin: 0;
    letter-spacing: 2px;
    font-weight: 300;
  }

  .header-decoration {
    position: absolute;
    right: -50px;
    top: -50px;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    z-index: 1;
  }
}

// 主要内容区
.main-content {
  max-width: 1100px;
  margin: -20px auto 0;
  padding: 0 1.5rem 2rem;
  position: relative;
  z-index: 3;
}

// 卡片通用样式
.card {
  background: white;
  border-radius: @card-radius;
  box-shadow: @card-shadow;
  padding: 1.8rem;
  margin-bottom: 1.8rem;
  transition: @transition;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 173, 216, 0.12);
  }

  .card-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: @go-primary-dark;
    margin: 0 0 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 2px solid @go-light;
    padding-bottom: 0.6rem;
  }

  .card-body p {
    line-height: 1.7;
    color: @text-secondary;
    margin: 0.5rem 0;
  }
}

// 来历卡片特殊样式
.origin-card {
  background: linear-gradient(to right, white, @go-light);
  border-left: 4px solid @go-primary;
}

// 三列网格
.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 0.5rem 0;
    color: @text-secondary;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 1px dashed #E0ECF0;

    &:last-child {
      border-bottom: none;
    }
  }
}

.badge {
  background: @go-light;
  color: @go-primary-dark;
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0.15rem 0.6rem;
  border-radius: 20px;
  white-space: nowrap;
}

// 使用场景网格
.scene-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.2rem;
  margin-top: 0.8rem;
}

.scene-item {
  background: @go-bg;
  border-radius: 12px;
  padding: 1.2rem 1rem;
  text-align: center;
  transition: @transition;

  &:hover {
    background: @go-light;
    transform: scale(1.02);
  }

  .scene-icon {
    font-size: 2rem;
    margin-bottom: 0.3rem;
  }

  span {
    display: block;
    font-weight: 600;
    color: @text-main;
    margin-bottom: 0.3rem;
  }

  small {
    color: @text-secondary;
    font-size: 0.8rem;
  }
}

// 市场使用率
.market-intro {
  color: @text-secondary;
  margin-bottom: 1.8rem;
}

.rate-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.rate-item {
  background: @go-bg;
  border-radius: 12px;
  padding: 1.2rem;
}

.rate-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: 600;

  .rate-source {
    color: @text-main;
    font-size: 1rem;
  }

  .rate-percent {
    color: @go-primary-dark;
    font-size: 1.1rem;
    background: white;
    padding: 0.1rem 0.7rem;
    border-radius: 20px;
  }
}

.rate-bar-bg {
  background: #E0ECF0;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin: 0.6rem 0;
}

.rate-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, @go-primary, @go-primary-dark);
  border-radius: 4px;
  width: 0%;
  transition: width 1s ease-in-out;
}

.rate-desc {
  color: @text-secondary;
  font-size: 0.85rem;
  margin: 0.3rem 0 0;
}

// 页脚
.page-footer {
  margin-top: auto;
  text-align: center;
  padding: 1.5rem;
  background: white;
  color: @text-secondary;
  font-size: 0.9rem;
  border-top: 1px solid #E0ECF0;
}
</style>
