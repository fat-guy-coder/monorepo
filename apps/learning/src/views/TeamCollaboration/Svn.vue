<template>
  <div class="svn-container">
    <div class="svn-card">
      <!-- 头部 -->
      <div class="header">
        <h1>
          <span class="header-icon">🗄️</span>
          Apache Subversion (SVN)
        </h1>
        <p class="subtitle">集中式版本控制的经典代表 · 一个“旧时代”的务实选择</p>
      </div>

      <!-- 简介区域 -->
      <section class="section">
        <div class="section-header">
          <span class="section-icon">📖</span>
          <h2>什么是 SVN？</h2>
        </div>
        <p class="intro-text">
          <strong>SVN（Subversion）</strong> 诞生于 2000 年，旨在取代老旧的 CVS。它是一个<strong>集中式版本控制系统</strong>，
          所有代码和版本历史都存储在一台中央服务器上。开发者通过客户端“检出”特定版本，修改后“提交”回服务器。
          其设计哲学是<strong>“单一数据源”</strong>——服务器上的仓库是唯一的真理。
        </p>
      </section>

      <!-- 核心对比：集中式 vs 分布式 -->
      <section class="section">
        <div class="section-header">
          <span class="section-icon">⚖️</span>
          <h2>SVN（集中式） vs Git（分布式）</h2>
        </div>
        <div class="comparison-table">
          <div class="table-header">
            <span>对比维度</span>
            <span>SVN</span>
            <span>Git</span>
          </div>
          <div class="table-row">
            <span class="dimension">仓库模型</span>
            <span>集中式 — 唯一中央仓库</span>
            <span>分布式 — 每个克隆都是完整仓库</span>
          </div>
          <div class="table-row">
            <span class="dimension">历史记录</span>
            <span>仅存于服务器，离线无法查看日志</span>
            <span>完整历史在本地，离线可提交/查看</span>
          </div>
          <div class="table-row">
            <span class="dimension">提交操作</span>
            <span>直接提交到中央服务器（需联网）</span>
            <span>先本地提交，再推送至远程</span>
          </div>
          <div class="table-row">
            <span class="dimension">分支/合并</span>
            <span>分支是目录拷贝，合并较笨重</span>
            <span>轻量级指针，合并灵活</span>
          </div>
          <div class="table-row">
            <span class="dimension">权限控制</span>
            <span>目录级精细权限（原生支持）</span>
            <span>仓库级，精细控制需额外工具</span>
          </div>
          <div class="table-row">
            <span class="dimension">学习曲线</span>
            <span>简单直观，命令少</span>
            <span>概念多，曲线较陡</span>
          </div>
        </div>
        <div class="model-diagram">
          <div class="model centralized">
            <span class="model-icon">🖧</span>
            <strong>集中式 (SVN)</strong>
            <p>所有节点与中央服务器交互</p>
          </div>
          <div class="model distributed">
            <span class="model-icon">🕸️</span>
            <strong>分布式 (Git)</strong>
            <p>每个节点都是完整仓库，可任意点对点同步</p>
          </div>
        </div>
      </section>

      <!-- 优缺点区域 -->
      <section class="section">
        <div class="section-header">
          <span class="section-icon">⚡</span>
          <h2>SVN 的优缺点</h2>
        </div>
        <div class="pros-cons-grid">
          <div class="pros-card">
            <span class="card-label">👍 优点</span>
            <ul>
              <li><strong>学习门槛低</strong> — 仅需理解 commit/update，新手友好。</li>
              <li><strong>目录级权限</strong> — 可精确控制子目录的读写权限，适合企业层级管理。</li>
              <li><strong>大文件/二进制友好</strong> — 支持文件锁，避免美术资源、设计稿冲突。</li>
              <li><strong>线性历史清晰</strong> — 强制集中提交，历史记录简单易读。</li>
              <li><strong>部分检出</strong> — 可只检出仓库子目录，节省空间（Git 需稀疏检出）。</li>
            </ul>
          </div>
          <div class="cons-card">
            <span class="card-label">👎 缺点</span>
            <ul>
              <li><strong>单点故障</strong> — 服务器宕机则无法提交/查看历史。</li>
              <li><strong>离线工作受限</strong> — 断网时无法提交，只能编辑本地副本。</li>
              <li><strong>分支合并笨重</strong> — 分支创建慢，合并易冲突，不适合频繁迭代。</li>
              <li><strong>速度较慢</strong> — 多数操作需网络往返，日志/差异需请求服务器。</li>
              <li><strong>社区萎缩</strong> — 开源生态已全面转向 Git，新工具集成少。</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="section">
        <div class="section-header">
          <span class="section-icon">🎯</span>
          <h2>SVN 仍值得使用的场景</h2>
        </div>
        <div class="scenes-grid">
          <div class="scene-item">
            <span class="scene-icon">🏢</span>
            <div><strong>企业内部项目</strong> — 团队在同一网络，无需分布式协作，追求简单管控。</div>
          </div>
          <div class="scene-item">
            <span class="scene-icon">🎮</span>
            <div><strong>游戏开发（美术/策划）</strong> — 大量二进制资源文件，需要文件锁防止合并冲突。</div>
          </div>
          <div class="scene-item">
            <span class="scene-icon">📄</span>
            <div><strong>文档/设计稿版本管理</strong> — 非代码文件，无需复杂分支，线性历史足够。</div>
          </div>
          <div class="scene-item">
            <span class="scene-icon">🔒</span>
            <div><strong>强权限合规场景</strong> — 需要对代码库子目录进行严格读写分离的企业。</div>
          </div>
          <div class="scene-item">
            <span class="scene-icon">📚</span>
            <div><strong>教学入门</strong> — 概念简单，帮助学生理解版本控制核心思想。</div>
          </div>
        </div>
      </section>

      <!-- 底部说明 -->
      <div class="footer-note">
        <span>📌 SVN 并未消亡，在特定领域（游戏资产、企业内部）它依然是高效的工具。选择 Git 还是 SVN，取决于团队结构与项目性质。</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 纯展示组件，无交互逻辑
</script>

<style lang="less" scoped>
// 设计变量
@primary-dark: #1e293b;
@primary-mid: #334155;
@accent-orange: #f97316;
@bg-light: #fafcff;
@card-bg: #ffffff;
@border-light: #e2e8f0;
@text-main: #1e293b;
@text-muted: #64748b;

.svn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(145deg, #f8fafc 0%, #eef2f6 100%);
  padding: 2rem 1.5rem;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  box-sizing: border-box;
}

.svn-card {
  max-width: 1100px;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 36px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 8px 20px -8px rgba(0, 0, 0, 0.05);
  padding: 2.5rem 2.8rem;
  border: 1px solid rgba(249, 115, 22, 0.15);

  @media (max-width: 640px) {
    padding: 1.8rem 1.5rem;
    border-radius: 28px;
  }
}

.header {
  margin-bottom: 2rem;
  border-bottom: 1px solid @border-light;
  padding-bottom: 1.2rem;

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 0.25rem 0;
    color: @primary-dark;
    display: flex;
    align-items: center;
    gap: 12px;

    .header-icon {
      font-size: 2.2rem;
      background: linear-gradient(135deg, #ffedd5, #fed7aa);
      width: 56px;
      height: 56px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      box-shadow: 0 4px 10px rgba(249, 115, 22, 0.15);
    }

    @media (max-width: 480px) {
      font-size: 1.9rem;

      .header-icon {
        width: 48px;
        height: 48px;
        font-size: 1.8rem;
      }
    }
  }

  .subtitle {
    font-size: 1.15rem;
    color: @text-muted;
    margin: 0.4rem 0 0;
    font-weight: 400;
  }
}

.section {
  margin-bottom: 2.2rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.2rem;

  .section-icon {
    font-size: 1.5rem;
    background: @bg-light;
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    color: @accent-orange;
    border: 1px solid @border-light;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 650;
    margin: 0;
    color: @primary-dark;
  }
}

.intro-text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: @text-main;
  margin: 0;
  padding: 0 0.5rem;
}

.comparison-table {
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid @border-light;
  margin-bottom: 1.5rem;

  .table-header {
    display: grid;
    grid-template-columns: 1.2fr 2fr 2fr;
    background: @primary-dark;
    color: white;
    font-weight: 600;
    padding: 0.8rem 1.2rem;
    font-size: 0.95rem;
  }

  .table-row {
    display: grid;
    grid-template-columns: 1.2fr 2fr 2fr;
    padding: 0.8rem 1.2rem;
    font-size: 0.95rem;
    background: white;
    border-bottom: 1px solid @border-light;

    &:last-child {
      border-bottom: none;
    }

    .dimension {
      font-weight: 600;
      color: @primary-mid;
    }

    &:nth-child(even) {
      background: @bg-light;
    }
  }
}

.model-diagram {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 0.5rem;

  .model {
    background: @bg-light;
    padding: 1.2rem 1.5rem;
    border-radius: 20px;
    border: 1px solid @border-light;
    text-align: center;

    .model-icon {
      font-size: 2rem;
      display: block;
      margin-bottom: 6px;
    }

    strong {
      font-size: 1.1rem;
      color: @primary-dark;
    }

    p {
      margin: 0.5rem 0 0;
      color: @text-muted;
      font-size: 0.9rem;
    }
  }
}

.pros-cons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.pros-card,
.cons-card {
  background: @bg-light;
  border-radius: 24px;
  padding: 1.5rem 1.8rem;
  border: 1px solid @border-light;

  .card-label {
    display: inline-block;
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 1rem;
    padding: 0.2rem 1.2rem;
    background: white;
    border-radius: 30px;
    border: 1px solid @border-light;
  }

  ul {
    margin: 0;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.7rem;
      line-height: 1.5;
      color: @text-main;
      font-size: 0.95rem;
    }
  }
}

.pros-card .card-label {
  color: #15803d;
  border-color: #bbf7d0;
  background: #f0fdf4;
}

.cons-card .card-label {
  color: #b91c1c;
  border-color: #fecaca;
  background: #fef2f2;
}

.scenes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.scene-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: @bg-light;
  padding: 1rem 1.2rem;
  border-radius: 18px;
  border: 1px solid @border-light;
  font-size: 0.95rem;
  color: @text-main;
  line-height: 1.5;

  .scene-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  strong {
    color: @primary-dark;
  }
}

.footer-note {
  margin-top: 2rem;
  text-align: center;
  border-top: 1px solid @border-light;
  padding-top: 1.8rem;

  span {
    background: #f1f5f9;
    padding: 0.4rem 1.8rem;
    border-radius: 60px;
    color: @text-muted;
    font-size: 0.95rem;
    border: 1px solid @border-light;
    display: inline-block;
  }
}
</style>
