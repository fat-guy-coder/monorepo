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

      <!-- 优缺点对比 -->
      <section class="card pros-cons-card">
        <h2 class="card-title">⚖️ 优缺点对比</h2>
        <div class="card-body">
          <div class="pros-cons-grid">
            <div class="pc-col pros-col">
              <h3 class="pc-title">✅ 优点</h3>
              <ul class="feature-list">
                <li>🚀 <strong>语法极简</strong>：仅 25 个关键字，上手快、代码可读性高</li>
                <li>🧵 <strong>并发一等公民</strong>：goroutine + channel，写高并发比多数语言简单得多</li>
                <li>⚡ <strong>编译快 + 部署简单</strong>：静态编译成单个二进制，跨平台直接跑</li>
                <li>🗑️ <strong>自带 GC</strong>：不用手动管内存，也不用担心 C 的野指针</li>
                <li>📦 <strong>标准库强大</strong>：HTTP、JSON、加密、模板开箱即用，go fmt/test/vet 内置</li>
                <li>☁️ <strong>云原生母语</strong>：Docker、K8s、etcd 全是 Go 写的，基础设施生态近乎垄断</li>
              </ul>
            </div>
            <div class="pc-col cons-col">
              <h3 class="pc-title">⚠️ 缺点</h3>
              <ul class="feature-list">
                <li>🐌 <strong>泛型姗姗来迟</strong>：Go 1.18（2022）才引入，部分老库还没用上</li>
                <li>😤 <strong>错误处理繁琐</strong>：处处 <code>if err != nil</code>，没有异常机制，代码显啰嗦</li>
                <li>🚫 <strong>OOP 表达受限</strong>：无继承、无重载，习惯传统面向对象的人初期不适</li>
                <li>⏱️ <strong>GC 有停顿</strong>：极端低延迟（高频交易等）不如 C/C++/Rust</li>
                <li>🧩 <strong>生态偏科</strong>：桌面、移动端、Web 前端几乎没有 Go 身影，只能做服务端/工具</li>
                <li>🐢 <strong>演进保守</strong>：新特性引入极慢，很多诉求要等好几年</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 国内使用情况 -->
      <section class="card china-card">
        <h2 class="card-title">🇨🇳 国内使用情况</h2>
        <div class="card-body">
          <p class="section-lead">Go 在国内的定位非常明确：<strong>云原生 + 高并发后端 + 中间件</strong>。凡是"性能敏感、并发量大、要扛流量"的服务，越来越多团队优先选 Go。</p>
          <div class="china-grid">
            <div class="china-item"><strong>大厂自研中台</strong><span>字节跳动、美团、滴滴、B站 等大量高并发服务用 Go 重写</span></div>
            <div class="china-item"><strong>云厂商基础设施</strong><span>阿里云、腾讯云、华为云的 K8s、容器、网关等核心组件大量用 Go</span></div>
            <div class="china-item"><strong>开源明星项目</strong><span>Kubernetes、Docker、etcd、Prometheus、TiDB 都是 Go 写的</span></div>
            <div class="china-item"><strong>区块链</strong><span>以太坊 Go 客户端、Hyperledger Fabric 的主力语言</span></div>
            <div class="china-item"><strong>游戏/直播工具链</strong><span>实时信令、网关、运营后台常用 Go；但游戏核心服务端仍是 C++ 为主</span></div>
            <div class="china-item"><strong>创业公司</strong><span>中小团队爱用 Go：部署简单 + 写起来快，一个人能顶，省服务器成本</span></div>
          </div>
          <p class="section-note">📌 一句话总结：<strong>在国内，Go 岗位集中在"云原生、基础设施、高并发业务后端"三个赛道</strong>，且大多出现在有一定体量的公司。</p>
        </div>
      </section>

      <!-- 薪资情况 -->
      <section class="card salary-card">
        <h2 class="card-title">💰 薪资情况（国内，2025-2026 估算）</h2>
        <div class="card-body">
          <p class="section-lead">Go 岗普遍对应"后端 / 基础架构 / 云原生"方向，薪资水平整体高于传统业务 CRUD 岗位，但门槛也更高。</p>
          <div class="salary-table-wrap">
            <table class="salary-table">
              <thead>
                <tr><th>经验</th><th>月薪范围（一二线大厂）</th><th>典型岗位</th></tr>
              </thead>
              <tbody>
                <tr><td>应届 / 0-2 年</td><td>15K - 25K</td><td>Go 开发工程师（初级）</td></tr>
                <tr><td>2-5 年</td><td>25K - 40K</td><td>Go 开发工程师（中高级）</td></tr>
                <tr><td>5-8 年</td><td>40K - 60K</td><td>资深工程师 / 基础架构</td></tr>
                <tr><td>8 年以上</td><td>60K+ / 或含股票</td><td>技术专家 / 架构师</td></tr>
              </tbody>
            </table>
          </div>
          <div class="salary-tips">
            <div class="tip-item">🏙️ <strong>城市差异</strong>：北京、上海、深圳、杭州最高；成都、武汉、西安等新一线约为一线 7-8 折</div>
            <div class="tip-item">🏢 <strong>公司差异</strong>：大厂和独角兽给得起；中小厂 Go 岗较少，薪资随行就市</div>
            <div class="tip-item">📉 <strong>行业整体</strong>：近年互联网大盘降温，Go 也受影响，但基础架构岗抗跌能力更强</div>
          </div>
          <p class="section-note">⚠️ 以上为公开信息估算，随年份 / 城市 / 公司浮动较大，仅供学习与择业参考，请以实际招聘为准。</p>
        </div>
      </section>

      <!-- 就业前景 -->
      <section class="card career-card">
        <h2 class="card-title">🚀 就业前景</h2>
        <div class="card-body">
          <p class="section-lead"><strong>结论：Go 不是最热门的语言，但它是"云原生时代最稳的第二语言"</strong>——需求稳定、竞争比 Java 小、岗位质量高。</p>
          <h3 class="pc-title">哪些方向 Go 岗最多？</h3>
          <ul class="feature-list">
            <li>☁️ <strong>云原生 / 容器 / Kubernetes</strong> —— 未来 5 年最确定的方向，K8s 生态持续扩张</li>
            <li>⚙️ <strong>中间件 / 基础设施</strong> —— 网关、消息队列、分布式存储（etcd、TiDB）团队</li>
            <li>🚄 <strong>高并发业务后端</strong> —— 大厂核心服务，用 goroutine 扛千万级流量</li>
            <li>⛓️ <strong>区块链 / Web3</strong> —— 公链客户端、智能合约工具链</li>
            <li>🤖 <strong>AI 基础设施（新兴）</strong> —— 推理服务、向量数据库、AI 网关开始用 Go</li>
          </ul>
          <h3 class="pc-title">适合什么样的人？</h3>
          <ul class="feature-list">
            <li>🎓 <strong>有 C/C++/Java 经验想转后端</strong> —— Go 语法简单，迁移成本低、回报快</li>
            <li>🧠 <strong>对并发 / 系统原理感兴趣</strong> —— Go 让你用最少的代码体会并发</li>
            <li>🏗️ <strong>想走"云原生 / 基础架构"路线</strong> —— Go 几乎是这个方向的入场券</li>
          </ul>
          <h3 class="pc-title">给你的建议</h3>
          <ul class="feature-list">
            <li>📚 光会 Go 语法不够，<strong>搭配 K8s / Docker / 微服务</strong> 才算完整技能树</li>
            <li>🔁 后端竞争激烈，<strong>用 Go 做"杀手锏"</strong>（并发、中间件、云原生）比单纯 CRUD 值钱</li>
            <li>🧭 想清楚方向再投入：<strong>前端、桌面、移动端别选 Go</strong>，那不是它的主场</li>
          </ul>
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

// ⚖️ 优缺点对比
.pros-cons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}

.pc-col {
  background: @go-bg;
  border-radius: 12px;
  padding: 1.2rem 1.4rem;
}

.pros-col {
  border-left: 4px solid #4CAF50;
}

.cons-col {
  border-left: 4px solid #f44336;
}

.pc-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: @text-main;
  margin: 1rem 0 0.6rem;
}

.pros-cons-grid .pc-title:first-child {
  margin-top: 0;
}

.section-lead {
  font-size: 1rem;
  line-height: 1.7;
}

.section-note {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: @text-secondary;
  background: @go-light;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  line-height: 1.6;
}

// 🇨🇳 国内使用情况
.china-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  margin-top: 0.8rem;
}

.china-item {
  background: @go-bg;
  border-radius: 12px;
  padding: 1rem 1.2rem;

  strong {
    display: block;
    color: @text-main;
    margin-bottom: 0.3rem;
  }

  span {
    color: @text-secondary;
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

// 💰 薪资表
.salary-table-wrap {
  overflow-x: auto;
  margin-top: 0.8rem;
}

.salary-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  th, td {
    border: 1px solid #E0ECF0;
    padding: 0.7rem 1rem;
    text-align: left;
    white-space: nowrap;
  }

  thead th {
    background: @go-light;
    color: @go-primary-dark;
  }

  tbody tr:nth-child(even) {
    background: @go-bg;
  }
}

.salary-tips {
  margin-top: 1rem;
  display: grid;
  gap: 0.5rem;
}

.tip-item {
  background: @go-bg;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  color: @text-secondary;
  font-size: 0.9rem;
}

// 列表里的行内代码样式
.feature-list code {
  background: @go-light;
  color: @go-primary-dark;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85em;
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
