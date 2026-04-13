<template>
  <div class="fs-container">
    <div class="fs-card">
      <!-- 头部区域 -->
      <div class="header">
        <h1>
          <span class="header-icon">🗂️</span>
          计算机文件系统
        </h1>
        <p class="subtitle">从底层原理到各操作系统实现 · 存储管理的基石</p>
      </div>

      <!-- 底层实现原理区域 -->
      <section class="section">
        <div class="section-header">
          <span class="section-icon">⚙️</span>
          <h2>底层实现原理</h2>
        </div>
        <div class="principle-grid">
          <div class="principle-item">
            <div class="principle-title">
              <span class="bullet">📁</span> 文件与目录抽象
            </div>
            <p>文件系统将物理存储设备（磁盘、SSD）抽象为逻辑上的文件与目录树。用户通过路径访问，无需关心数据实际存储位置。</p>
          </div>
          <div class="principle-item">
            <div class="principle-title">
              <span class="bullet">🧩</span> 索引节点（inode）
            </div>
            <p>每个文件对应一个 inode，存储文件元数据（权限、大小、时间戳）以及指向数据块的指针。目录本质是文件名到 inode 的映射表。</p>
          </div>
          <div class="principle-item">
            <div class="principle-title">
              <span class="bullet">🗺️</span> 数据块与分配策略
            </div>
            <p>存储空间被划分为固定大小的块（block）。文件系统通过位图或 B‑tree 管理空闲块，并决定文件数据如何分布在多个块中（连续、链式、索引分配）。</p>
          </div>
          <div class="principle-item">
            <div class="principle-title">
              <span class="bullet">📋</span> 日志与写时复制
            </div>
            <p>为保障一致性，现代文件系统引入日志（Journaling）记录操作意图，崩溃后可重放恢复。写时复制（COW）则在新位置写入数据，再原子切换指针，保证数据完整。</p>
          </div>
          <div class="principle-item">
            <div class="principle-title">
              <span class="bullet">🔌</span> 虚拟文件系统（VFS）
            </div>
            <p>Linux 等内核通过 VFS 提供统一接口，使得不同底层文件系统（ext4、NTFS、APFS）可以无缝共存，并支持网络文件系统、伪文件系统等。</p>
          </div>
        </div>
      </section>

      <!-- 各操作系统文件系统对比区域 -->
      <section class="section">
        <div class="section-header">
          <span class="section-icon">🆚</span>
          <h2>操作系统实现对比</h2>
        </div>

        <div class="os-grid">
          <!-- Windows 卡片 -->
          <div class="os-card windows">
            <div class="os-card-header">
              <span class="os-icon">🪟</span>
              <h3>Windows</h3>
              <span class="os-badge">NTFS · FAT · exFAT · ReFS</span>
            </div>
            <div class="os-body">
              <div class="feature-block">
                <h4>🔹 主流实现</h4>
                <ul>
                  <li><strong>NTFS</strong>：日志文件系统，支持权限控制、压缩、加密、大文件，Windows 默认格式。</li>
                  <li><strong>FAT32/exFAT</strong>：结构简单，兼容性好，常用于 U 盘和 SD 卡。</li>
                  <li><strong>ReFS</strong>：面向服务器的下一代文件系统，强调数据完整性、自动修复和超大卷支持。</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div class="pros">
                  <span class="label">👍 优点</span>
                  <ul>
                    <li>NTFS 功能丰富，ACL 权限成熟</li>
                    <li>exFAT 跨平台兼容性好</li>
                    <li>ReFS 具备数据自愈能力</li>
                  </ul>
                </div>
                <div class="cons">
                  <span class="label">👎 缺点</span>
                  <ul>
                    <li>NTFS 在 Linux/macOS 写入支持有限</li>
                    <li>FAT 系列无日志，易损坏</li>
                    <li>ReFS 不支持系统启动，生态较窄</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Linux 卡片 -->
          <div class="os-card linux">
            <div class="os-card-header">
              <span class="os-icon">🐧</span>
              <h3>Linux</h3>
              <span class="os-badge">ext4 · XFS · Btrfs · ZFS</span>
            </div>
            <div class="os-body">
              <div class="feature-block">
                <h4>🔹 主流实现</h4>
                <ul>
                  <li><strong>ext4</strong>：成熟稳定的日志文件系统，支持 extents 减少碎片，默认选择。</li>
                  <li><strong>XFS</strong>：高性能 64 位日志系统，擅长处理大文件和并行 I/O。</li>
                  <li><strong>Btrfs</strong>：写时复制文件系统，支持快照、子卷、压缩、数据校验。</li>
                  <li><strong>ZFS</strong>：高级存储池方案（非原生内核），集成卷管理与文件系统。</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div class="pros">
                  <span class="label">👍 优点</span>
                  <ul>
                    <li>选择多样，可针对场景优化</li>
                    <li>Btrfs/ZFS 提供高级数据保护</li>
                    <li>XFS 扩展性极强</li>
                  </ul>
                </div>
                <div class="cons">
                  <span class="label">👎 缺点</span>
                  <ul>
                    <li>跨平台兼容性较弱（Windows 默认不识别）</li>
                    <li>Btrfs 某些 RAID 功能仍待完善</li>
                    <li>ZFS 许可问题导致集成不便</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- macOS 卡片 -->
          <div class="os-card macos">
            <div class="os-card-header">
              <span class="os-icon">🍎</span>
              <h3>macOS</h3>
              <span class="os-badge">APFS · HFS+</span>
            </div>
            <div class="os-body">
              <div class="feature-block">
                <h4>🔹 主流实现</h4>
                <ul>
                  <li><strong>APFS</strong>：专为闪存/SSD 优化，支持写时复制、快照、克隆、强加密、空间共享。</li>
                  <li><strong>HFS+</strong>：传统 Mac 文件系统，日志式，现已被 APFS 取代。</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div class="pros">
                  <span class="label">👍 优点</span>
                  <ul>
                    <li>APFS 对 SSD 友好，克隆和快照高效</li>
                    <li>原生加密与安全性集成紧密</li>
                    <li>时间机器依赖快照功能</li>
                  </ul>
                </div>
                <div class="cons">
                  <span class="label">👎 缺点</span>
                  <ul>
                    <li>APFS 在机械硬盘上性能较差</li>
                    <li>与 Windows/Linux 兼容性不佳</li>
                    <li>HFS+ 陈旧，不支持现代特性</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 底部引用 -->
      <div class="footer-note">
        <span>💾 文件系统是数据持久化的灵魂 —— 理解它，才能更好地驾驭存储。</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 纯展示组件，无交互逻辑
</script>

<style lang="less" scoped>
// 颜色变量
@bg-gradient-start: #f4f7fb;
@bg-gradient-end: #e9eef4;
@card-bg: rgba(255, 255, 255, 0.95);
@primary-dark: #1a2e40;
@primary-mid: #2c4c6b;
@accent-blue: #3a7ca5;
@border-light: #d9e2ec;
@text-main: #1f3a4e;
@text-soft: #48637c;

.fs-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, @bg-gradient-start 0%, @bg-gradient-end 100%);
  padding: 2.5rem 1.5rem;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  box-sizing: border-box;
}

.fs-card {
  max-width: 1280px;
  width: 100%;
  background: @card-bg;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 36px;
  box-shadow: 0 25px 50px -12px rgba(0, 20, 40, 0.15), 0 4px 18px -6px rgba(0, 0, 0, 0.05);
  padding: 2.5rem 2.8rem;
  border: 1px solid rgba(255, 255, 255, 0.7);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 30px 60px -14px rgba(15, 45, 70, 0.18);
  }

  @media (max-width: 700px) {
    padding: 1.8rem 1.5rem;
    border-radius: 28px;
  }
}

.header {
  margin-bottom: 2.2rem;
  border-bottom: 1px solid @border-light;
  padding-bottom: 1.5rem;

  h1 {
    font-size: 2.6rem;
    font-weight: 650;
    letter-spacing: -0.02em;
    margin: 0 0 0.25rem 0;
    color: @primary-dark;
    display: flex;
    align-items: center;
    gap: 12px;

    .header-icon {
      font-size: 2.4rem;
      background: #e3eaf2;
      width: 60px;
      height: 60px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      box-shadow: inset 0 1px 2px white, 0 6px 10px -2px rgba(0, 35, 70, 0.06);
    }

    @media (max-width: 480px) {
      font-size: 2rem;

      .header-icon {
        width: 48px;
        height: 48px;
        font-size: 2rem;
      }
    }
  }

  .subtitle {
    font-size: 1.15rem;
    color: @text-soft;
    margin: 0.6rem 0 0 0;
    font-weight: 400;
  }
}

.section {
  margin-bottom: 2.8rem;

  &:last-of-type {
    margin-bottom: 1.5rem;
  }
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.8rem;

  .section-icon {
    font-size: 1.8rem;
    background: #eef3f8;
    width: 44px;
    height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    color: @primary-mid;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 580;
    margin: 0;
    color: @primary-mid;
    letter-spacing: -0.01em;
  }
}

// 原理网格
.principle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.principle-item {
  background: #f9fcff;
  padding: 1.2rem 1.5rem;
  border-radius: 20px;
  border: 1px solid @border-light;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.15s;

  &:hover {
    background: white;
    border-color: #c1d4e6;
    box-shadow: 0 8px 16px -6px rgba(20, 60, 100, 0.08);
  }

  .principle-title {
    font-weight: 650;
    font-size: 1.15rem;
    margin-bottom: 0.5rem;
    color: @primary-dark;
    display: flex;
    align-items: center;
    gap: 8px;

    .bullet {
      font-size: 1.3rem;
    }
  }

  p {
    margin: 0;
    color: @text-main;
    line-height: 1.6;
    font-size: 0.95rem;
  }
}

// 操作系统卡片网格
.os-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.os-card {
  background: white;
  border-radius: 24px;
  padding: 1.6rem 1.6rem 1.8rem;
  border: 1px solid @border-light;
  box-shadow: 0 8px 18px -8px rgba(0, 0, 0, 0.04);
  transition: transform 0.15s, box-shadow 0.2s;

  &:hover {
    box-shadow: 0 16px 28px -12px rgba(0, 40, 80, 0.12);
    transform: translateY(-2px);
  }

  &.windows .os-icon {
    background: #e6f0fa;
    color: #0078d7;
  }

  &.linux .os-icon {
    background: #f2e8d5;
    color: #e68a2e;
  }

  &.macos .os-icon {
    background: #e6e6e6;
    color: #555;
  }
}

.os-card-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px 8px;
  margin-bottom: 1.4rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px dashed #d0dee9;

  .os-icon {
    font-size: 2rem;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    background: #f1f5f9;
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 620;
    margin: 0;
    color: @primary-dark;
    letter-spacing: -0.3px;
  }

  .os-badge {
    background: #e9f0f8;
    padding: 0.2rem 0.9rem;
    border-radius: 40px;
    font-size: 0.8rem;
    font-weight: 500;
    color: @primary-mid;
    margin-left: auto;
    border: 1px solid #cbdbea;
    white-space: nowrap;
  }
}

.os-body {
  .feature-block {
    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0 0 0.8rem 0;
      color: #1e3a5f;
    }

    ul {
      margin: 0 0 1.2rem 0;
      padding-left: 1.4rem;

      li {
        margin-bottom: 0.5rem;
        color: @text-main;
        font-size: 0.93rem;
        line-height: 1.5;

        strong {
          color: @primary-dark;
        }
      }
    }
  }

  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 0.5rem;

    .pros,
    .cons {
      .label {
        display: block;
        font-weight: 650;
        font-size: 0.9rem;
        margin-bottom: 8px;
        color: @primary-mid;
      }

      ul {
        margin: 0;
        padding-left: 1.2rem;

        li {
          font-size: 0.85rem;
          margin-bottom: 0.4rem;
          color: #2e4e6c;
        }
      }
    }

    .cons .label {
      color: #a0522d;
    }
  }
}

.footer-note {
  margin-top: 2rem;
  text-align: center;
  font-size: 1rem;
  color: @text-soft;
  border-top: 1px solid @border-light;
  padding-top: 1.8rem;
  font-weight: 450;

  span {
    background: #ecf3fa;
    padding: 0.35rem 1.8rem;
    border-radius: 60px;
    display: inline-block;
    backdrop-filter: blur(4px);
    border: 1px solid #d1e0ee;
  }
}
</style>
