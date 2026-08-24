<template>
  <div class="rust-intro">
    <!-- 头部区域 -->
    <header class="page-header">
      <div class="header-content">
        <div class="logo-area">
          <div class="rust-badge">🦀</div>
          <div>
            <h1>Rust 语言</h1>
            <p class="subtitle">内存安全 · 无畏并发 · 零成本抽象</p>
          </div>
        </div>
        <p class="description">
          Rust 是一门专注于<strong>内存安全</strong>与<strong>并发安全</strong>的系统级编程语言，
          在无需垃圾回收（GC）的前提下，让程序员写出既快又稳的底层代码。
        </p>
      </div>
      <div class="header-decoration"></div>
    </header>

    <main class="main-content">
      <!-- 📜 语言来历 -->
      <section class="card origin-card">
        <h2 class="card-title">📜 语言来历</h2>
        <div class="card-body">
          <p>
            Rust 由 <strong>Graydon Hoare</strong> 于 <strong>2006 年</strong>作为个人项目在
            Mozilla 内部发起，最初是他在电梯等电梯时萌生的想法——当时的编程语言总在
            「性能」与「安全」之间二选一：C/C++ 快但容易写出内存错误，Java/GC 语言安全但性能有天花板。
            他想要一门「既有 C 的性能，又不会踩内存坑」的语言。
          </p>
          <p>
            <strong>2009 年</strong> Mozilla 正式资助该项目。Rust 的名字来源于一种叫「锈菌（rust fungus）」的
            植物病害——它能抵抗外界侵蚀、生命力顽强，寓意这门语言<strong>健壮、不易被攻破</strong>。
          </p>
          <p>
            <strong>2015 年 5 月 15 日</strong>，Rust 1.0 正式发布，标志着语言稳定下来。
            之后 Rust 一路成长为 Stack Overflow 调查中<strong>连续多年最受开发者喜爱</strong>的编程语言。
          </p>
          <div class="philosophy-box">
            <p>
              <strong>设计三大目标：</strong>
              ① <em>内存安全（无 GC）</em> —— 用所有权/借用/生命周期在编译期消灭内存错误；
              ② <em>无畏并发（Fearless Concurrency）</em> —— 编译器帮你排查数据竞争；
              ③ <em>零成本抽象（Zero-cost Abstractions）</em> —— 高级写法编译出和手写底层一样的机器码。
            </p>
          </div>
        </div>
      </section>

      <!-- 🕰️ 发展史 -->
      <section class="card history-card">
        <h2 class="card-title">🕰️ 发展史</h2>
        <div class="card-body">
          <div class="timeline">
            <div class="timeline-item">
              <span class="timeline-year">2006</span>
              <div class="timeline-content">
                <strong>起点</strong>
                <p>Graydon Hoare 以个人项目形式开始设计 Rust，探索「内存安全 + 高性能」的可行性。</p>
              </div>
            </div>
            <div class="timeline-item">
              <span class="timeline-year">2009</span>
              <div class="timeline-content">
                <strong>Mozilla 资助并公开</strong>
                <p>Mozilla 正式资助项目并对外宣布，初始编译器用 OCaml 编写。</p>
              </div>
            </div>
            <div class="timeline-item">
              <span class="timeline-year">2010</span>
              <div class="timeline-content">
                <strong>自举（Self-hosting）</strong>
                <p>开始用 Rust 写 Rust 编译器，采用「吃狗粮」的方式驱动语言成熟。同年启动 Servo 浏览器引擎项目。</p>
              </div>
            </div>
            <div class="timeline-item">
              <span class="timeline-year">2015</span>
              <div class="timeline-content">
                <strong>Rust 1.0 发布</strong>
                <p>5 月 15 日稳定版发布。发布一年后火狐浏览器（Firefox）的 CSS 引擎就用 Rust 重写（Servo/Quantum）。</p>
              </div>
            </div>
            <div class="timeline-item">
              <span class="timeline-year">2018</span>
              <div class="timeline-content">
                <strong>2018 Edition + async/await</strong>
                <p>引入 Edition 机制平滑演进；2019 年 async/await 在 1.39 稳定，Rust 正式拥抱异步生态（Tokio）。</p>
              </div>
            </div>
            <div class="timeline-item">
              <span class="timeline-year">2021</span>
              <div class="timeline-content">
                <strong>Rust 基金会成立</strong>
                <p>Mozilla 裁员后，AWS、Google、微软、华为等联合成立 Rust 基金会（2021.02），确保语言治理中立、可持续。</p>
              </div>
            </div>
            <div class="timeline-item">
              <span class="timeline-year">2022</span>
              <div class="timeline-content">
                <strong>进入 Linux 内核</strong>
                <p>Linux 6.1 正式接受 Rust 支持，Rust 成为首个「吃进」主流内核的高级语言，随后 Android、Windows 也逐步采用。</p>
              </div>
            </div>
            <div class="timeline-item">
              <span class="timeline-year">2025</span>
              <div class="timeline-content">
                <strong>2024 Edition</strong>
                <p>Rust 2024 Edition 稳定发布，语言继续以「6 周一个小版本」的节奏演进，社区生态蓬勃壮大。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ⚙️ 语言类型与核心特点 -->
      <div class="info-grid">
        <section class="card type-card">
          <h2 class="card-title">🔧 语言类型</h2>
          <div class="card-body">
            <ul class="feature-list">
              <li><span class="badge">编译型</span> LLVM 编译为原生机器码</li>
              <li><span class="badge">静态类型</span> 类型在编译期完全确定</li>
              <li><span class="badge">强类型</span> 极少隐式转换，类型安全</li>
              <li><span class="badge">无 GC</span> 所有权系统替代垃圾回收</li>
              <li><span class="badge">多范式</span> 命令式 + 函数式 + 面向对象</li>
            </ul>
          </div>
        </section>

        <section class="card advantage-card">
          <h2 class="card-title">✨ 核心优势</h2>
          <div class="card-body">
            <ul class="feature-list">
              <li>🛡️ <strong>内存安全</strong>：编译期消灭悬垂指针、数据竞争、缓冲区溢出</li>
              <li>🧵 <strong>无畏并发</strong>：Send/Sync 让线程安全由编译器保证</li>
              <li>⚡ <strong>性能极致</strong>：与 C/C++ 同级，无运行时开销</li>
              <li>🧩 <strong>零成本抽象</strong>：泛型/Trait 编译后如手写底层代码</li>
              <li>📦 <strong>Cargo</strong>：包管理 + 构建 + 测试一体化工具链</li>
            </ul>
          </div>
        </section>

        <section class="card feature-card">
          <h2 class="card-title">🎯 语言特点</h2>
          <div class="card-body">
            <ul class="feature-list">
              <li>✅ 所有权 + 借用 + 生命周期三件套</li>
              <li>✅ 模式匹配与强大的枚举（Option/Result）</li>
              <li>✅ Trait 系统：组合优于继承</li>
              <li>✅ 错误处理用 Result 显式传递，无异常机制</li>
              <li>✅ 宏系统（声明宏 + 过程宏）</li>
            </ul>
          </div>
        </section>
      </div>

      <!-- 🎯 使用场景 -->
      <section class="card scene-card">
        <h2 class="card-title">🚀 适用场景</h2>
        <div class="card-body scene-grid">
          <div class="scene-item">
            <div class="scene-icon">🖥️</div>
            <span>系统编程</span>
            <small>操作系统、驱动、编译器、数据库引擎</small>
          </div>
          <div class="scene-item">
            <div class="scene-icon">🎮</div>
            <span>游戏引擎</span>
            <small>Bevy、Godot-Rust、渲染中间件</small>
          </div>
          <div class="scene-item">
            <div class="scene-icon">🌐</div>
            <span>Web 后端</span>
            <small>Axum / Actix，高性能 API 服务</small>
          </div>
          <div class="scene-item">
            <div class="scene-icon">🌍</div>
            <span>WebAssembly</span>
            <small>前端高性能计算、跨端插件</small>
          </div>
          <div class="scene-item">
            <div class="scene-icon">⛓️</div>
            <span>区块链 / Web3</span>
            <small>Solana、Polkadot、智能合约工具链</small>
          </div>
          <div class="scene-item">
            <div class="scene-icon">☁️</div>
            <span>云基础设施</span>
            <small>AWS Firecracker、数据库、存储引擎</small>
          </div>
          <div class="scene-item">
            <div class="scene-icon">📟</div>
            <span>嵌入式 / IoT</span>
            <small>no_std 裸机开发、单片机</small>
          </div>
          <div class="scene-item">
            <div class="scene-icon">🛠️</div>
            <span>命令行工具</span>
            <small>ripgrep、fd、bat 等神级 CLI 均用 Rust</small>
          </div>
        </div>
      </section>

      <!-- ⚖️ 优缺点对比 -->
      <section class="card pros-cons-card">
        <h2 class="card-title">⚖️ 优缺点对比</h2>
        <div class="card-body">
          <div class="pros-cons-grid">
            <div class="pc-col pros-col">
              <h3 class="pc-title">✅ 优点</h3>
              <ul class="feature-list">
                <li>🛡️ <strong>内存安全无 GC</strong>：没有运行时代价，也没有悬垂指针/数据竞争</li>
                <li>⚡ <strong>性能顶级</strong>：与 C/C++ 平起平坐，适合做底层与高频场景</li>
                <li>🧵 <strong>并发写起来放心</strong>：编译器阻止数据竞争，上线后线程 Bug 大幅减少</li>
                <li>📦 <strong>工具链一流</strong>：Cargo + rust-analyzer + rustfmt + clippy，开箱即用</li>
                <li>🌱 <strong>生态快速成长</strong>：连续多年最受喜爱，大厂投入持续加大</li>
              </ul>
            </div>
            <div class="pc-col cons-col">
              <h3 class="pc-title">⚠️ 缺点</h3>
              <ul class="feature-list">
                <li>🐌 <strong>学习曲线陡峭</strong>：所有权/借用/生命周期劝退不少新手，上手成本高</li>
                <li>⌨️ <strong>编译期「斗争」</strong>：借用检查器严格，初期频繁和编译器「搏斗」</li>
                <li>⏱️ <strong>编译速度偏慢</strong>：大型项目增量编译不如 Go/Java 快</li>
                <li>🧩 <strong>生态相对年轻</strong>：Web/数据库等方向库数量不如 Go/Java 丰富</li>
                <li>👥 <strong>岗位数量有限</strong>：招聘量比 Java/Go/Python 少，多见于中大型厂</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 💼 就业前景 -->
      <section class="card career-card">
        <h2 class="card-title">💼 就业前景（国内 / 国外）</h2>
        <div class="card-body">
          <p class="section-lead">
            结论：Rust 岗位<strong>「量少而精」</strong>——数量不如 Java/Go，但集中在<strong>系统、基础设施、区块链、安全</strong>
            等高壁垒赛道，门槛高、竞争者少、薪资普遍偏高。
          </p>

          <h3 class="pc-title">🇨🇳 国内</h3>
          <div class="china-grid">
            <div class="china-item">
              <strong>华为 / 鸿蒙生态</strong>
              <span>OpenHarmony、鸿蒙原生系统底层大量采用 Rust，是国产化系统的重要技术栈</span>
            </div>
            <div class="china-item">
              <strong>大厂基础架构</strong>
              <span>字节跳动（飞书/自研组件）、蚂蚁集团（数据库/中间件）在系统级场景用 Rust</span>
            </div>
            <div class="china-item">
              <strong>区块链 / Web3</strong>
              <span>国内公链项目、安全审计公司大量需要 Rust 工程师</span>
            </div>
            <div class="china-item">
              <strong>嵌入式 / IoT</strong>
              <span>车载、物联网、智能硬件团队开始用 Rust 做高安全固件</span>
            </div>
            <div class="china-item">
              <strong>安全 / 工具链</strong>
              <span>安全研究员、性能优化、CLI 工具、数据库内核等方向人才稀缺</span>
            </div>
          </div>

          <h3 class="pc-title">🌍 国外</h3>
          <div class="china-grid">
            <div class="china-item">
              <strong>科技巨头全面采用</strong>
              <span>微软（Windows/VS Code 组件）、Google（Android/ChromeOS）、Amazon（Firecracker）</span>
            </div>
            <div class="china-item">
              <strong>基础设施公司</strong>
              <span>Cloudflare、Dropbox、Discord、GitHub 等用 Rust 重写核心高并发组件</span>
            </div>
            <div class="china-item">
              <strong>区块链巨头</strong>
              <span>Solana、Parity/Polkadot 等核心链代码全部用 Rust</span>
            </div>
            <div class="china-item">
              <strong>游戏 / 图形</strong>
              <span>游戏引擎、渲染管线、Godot/Blender 生态的 Rust 工具链持续增长</span>
            </div>
          </div>

          <h3 class="pc-title">💰 薪资参考（2025-2026 估算）</h3>
          <div class="salary-table-wrap">
            <table class="salary-table">
              <thead>
                <tr>
                  <th>地区</th>
                  <th>经验</th>
                  <th>年薪范围</th>
                  <th>典型岗位</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>国内一二线</td><td>0-2 年</td><td>20W - 35W</td><td>Rust 开发工程师（初级）</td></tr>
                <tr><td>国内一二线</td><td>2-5 年</td><td>35W - 60W</td><td>Rust 工程师 / 系统研发</td></tr>
                <tr><td>国内大厂</td><td>5 年以上</td><td>60W - 100W+</td><td>资深系统专家 / 架构师</td></tr>
                <tr><td>北美（美国）</td><td>中高级</td><td>$150K - $300K</td><td>Systems Engineer / Rust Dev</td></tr>
                <tr><td>欧洲 / 新加坡</td><td>中高级</td><td>€80K - €150K / SG$120K+</td><td>Backend / Blockchain Engineer</td></tr>
              </tbody>
            </table>
          </div>
          <div class="salary-tips">
            <div class="tip-item">🏙️ <strong>国内城市</strong>：北京、深圳、上海、杭州最多；华为系城市（东莞、西安）也较集中</div>
            <div class="tip-item">📈 <strong>趋势</strong>：随国产化系统、区块链、AI 基础设施发展，Rust 岗位逐年增加，供不应求</div>
            <div class="tip-item">⚠️ <strong>提醒</strong>：以上为公开信息估算，随年份/城市/公司浮动，仅供参考，请以实际招聘为准</div>
          </div>

          <h3 class="pc-title">适合什么样的人？</h3>
          <ul class="feature-list">
            <li>🎓 <strong>有 C/C++ 经验</strong>：想摆脱手动内存管理的痛苦，用更安全的方式写底层</li>
            <li>🎮 <strong>独立游戏开发者</strong>：想用高性能语言做游戏引擎、物理/渲染等重计算模块</li>
            <li>⛓️ <strong>区块链 / 安全方向</strong>：这两个赛道 Rust 几乎是「必会语言」</li>
            <li>📈 <strong>想建立稀缺性</strong>：Rust 是差异化竞争力，会的人少，议价能力强</li>
          </ul>
        </div>
      </section>
    </main>

    <footer class="page-footer">
      <p>Rust 语言 — 构建可靠、高效的软件（🦀 需要的话，耐心啃下所有权，你会爱上它）</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Rust 介绍页 —— 纯静态展示，无需运行时数据
</script>

<style lang="less" scoped>
// Rust 官方色系
@rust-primary: #B7410E; // 锈红棕
@rust-primary-dark: #8A2E0B;
@rust-orange: #DEA584; // Rust logo 橙
@rust-light: #FBE9E0;
@rust-bg: #FBF4EF;
@text-main: #2C2A28;
@text-secondary: #5C564F;
@card-shadow: 0 4px 20px rgba(183, 65, 14, 0.08);
@card-radius: 16px;
@transition: all 0.3s ease;

.rust-intro {
  font-family: 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', system-ui, sans-serif;
  background-color: @rust-bg;
  color: @text-main;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

// 头部
.page-header {
  background: linear-gradient(135deg, @rust-primary 0%, @rust-primary-dark 100%);
  padding: 3rem 2rem 2.4rem;
  color: white;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);

  .header-content {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .logo-area {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 0.8rem;

    .rust-badge {
      width: 64px;
      height: 64px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.4rem;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      flex-shrink: 0;
    }

    h1 {
      font-size: 2.8rem;
      font-weight: 700;
      letter-spacing: 1px;
      margin: 0;
    }

    .subtitle {
      font-size: 1.15rem;
      opacity: 0.92;
      margin: 0.2rem 0 0;
      letter-spacing: 1px;
      font-weight: 300;
    }
  }

  .description {
    font-size: 1.05rem;
    line-height: 1.7;
    opacity: 0.95;
    max-width: 720px;
    margin: 0;

    strong {
      color: @rust-orange;
      font-weight: 600;
    }
  }

  .header-decoration {
    position: absolute;
    right: -60px;
    top: -60px;
    width: 240px;
    height: 240px;
    background: rgba(222, 165, 132, 0.18);
    border-radius: 50%;
    z-index: 1;
  }
}

// 主要内容区
.main-content {
  max-width: 1100px;
  margin: -16px auto 0;
  padding: 0 1.5rem 2rem;
  position: relative;
  z-index: 3;
}

// 卡片通用
.card {
  background: white;
  border-radius: @card-radius;
  box-shadow: @card-shadow;
  padding: 1.8rem;
  margin-bottom: 1.8rem;
  transition: @transition;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(183, 65, 14, 0.12);
  }

  .card-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: @rust-primary-dark;
    margin: 0 0 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 2px solid @rust-light;
    padding-bottom: 0.6rem;
  }

  .card-body p {
    line-height: 1.75;
    color: @text-secondary;
    margin: 0.6rem 0;
  }
}

// 来历卡片
.origin-card {
  background: linear-gradient(to right, white, @rust-light);
  border-left: 4px solid @rust-primary;

  .philosophy-box {
    background: white;
    border-radius: 10px;
    padding: 1rem 1.2rem;
    margin-top: 1rem;
    border-left: 4px solid @rust-orange;

    p {
      margin: 0;
      line-height: 1.8;
    }
  }
}

// 发展史时间线
.history-card {
  .timeline {
    position: relative;
    padding-left: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.4rem;
      bottom: 0.4rem;
      width: 3px;
      background: linear-gradient(180deg, @rust-orange, @rust-primary);
      border-radius: 2px;
    }
  }

  .timeline-item {
    position: relative;
    padding: 0.7rem 0 0.7rem 1.2rem;
    display: flex;
    gap: 1rem;
    align-items: baseline;

    &::before {
      content: '';
      position: absolute;
      left: -1.65rem;
      top: 1.15rem;
      width: 11px;
      height: 11px;
      background: @rust-primary;
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 2px @rust-primary;
    }

    .timeline-year {
      flex-shrink: 0;
      width: 74px;
      background: @rust-light;
      color: @rust-primary-dark;
      font-weight: 700;
      font-size: 0.95rem;
      text-align: center;
      padding: 0.25rem 0;
      border-radius: 20px;
    }

    .timeline-content {
      strong {
        display: block;
        color: @text-main;
        margin-bottom: 0.2rem;
        font-size: 1.02rem;
      }

      p {
        color: @text-secondary;
        font-size: 0.93rem;
        margin: 0;
        line-height: 1.6;
      }
    }
  }
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
    align-items: flex-start;
    gap: 0.5rem;
    border-bottom: 1px dashed #F0E3DC;
    line-height: 1.6;

    &:last-child {
      border-bottom: none;
    }
  }
}

.badge {
  background: @rust-light;
  color: @rust-primary-dark;
  font-weight: 600;
  font-size: 0.78rem;
  padding: 0.15rem 0.6rem;
  border-radius: 20px;
  white-space: nowrap;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

// 使用场景网格
.scene-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.2rem;
  margin-top: 0.8rem;
}

.scene-item {
  background: @rust-bg;
  border-radius: 12px;
  padding: 1.2rem 1rem;
  text-align: center;
  transition: @transition;

  &:hover {
    background: @rust-light;
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
    font-size: 0.78rem;
    line-height: 1.4;
  }
}

// 优缺点对比
.pros-cons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}

.pc-col {
  background: @rust-bg;
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
  line-height: 1.8;
  color: @text-secondary;
}

// 国内使用情况网格
.china-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  margin-top: 0.8rem;
}

.china-item {
  background: @rust-bg;
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

// 薪资表
.salary-table-wrap {
  overflow-x: auto;
  margin-top: 0.8rem;
}

.salary-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  th, td {
    border: 1px solid #F0E3DC;
    padding: 0.7rem 1rem;
    text-align: left;
    white-space: nowrap;
  }

  thead th {
    background: @rust-light;
    color: @rust-primary-dark;
  }

  tbody tr:nth-child(even) {
    background: @rust-bg;
  }
}

.salary-tips {
  margin-top: 1rem;
  display: grid;
  gap: 0.5rem;
}

.tip-item {
  background: @rust-bg;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  color: @text-secondary;
  font-size: 0.9rem;
}

.feature-list code {
  background: @rust-light;
  color: @rust-primary-dark;
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
  border-top: 1px solid #F0E3DC;
}
</style>
