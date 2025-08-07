<template>
  <div class="link-guide">
    <header>
      <h1>文件系统链接基本介绍</h1>
      <p>探索硬链接、软链接（符号链接）的原理、区别及应用场景</p>
    </header>

    <div class="content-wrapper">
      <div class="intro-section">
        <div class="info-card">
          <h2>链接概述</h2>
          <p>链接是文件系统中的重要概念，它允许文件或目录有多个访问路径。主要有两种类型：硬链接（Hard Link）和软链接（Symbolic Link），后者也称为符号链接。</p>
          <div class="file-system-diagram">
            <div class="inode">Inode 101</div>
            <div class="file-data">文件内容: "Hello World"</div>
            <div class="links">
              <div class="hard-link">硬链接1: file.txt</div>
              <div class="hard-link">硬链接2: backup.txt</div>
              <div class="symbolic-link">符号链接: shortcut.txt → file.txt</div>
            </div>
          </div>
        </div>
      </div>

      <div class="link-types-container">
        <!-- 硬链接 -->
        <div class="link-card">
          <div class="link-header">
            <div class="link-icon">🔗</div>
            <h2>硬链接 (Hard Link)</h2>
            <div class="link-tag">直接引用</div>
          </div>

          <div class="link-content">
            <div class="description">
              <h3>定义与原理</h3>
              <p>硬链接是文件系统中指向同一物理数据块（inode）的多个目录条目。所有硬链接都直接指向相同的文件内容，没有主次之分。</p>

              <h3>关键特性</h3>
              <ul>
                <li><strong>共享inode</strong>：所有硬链接共享相同的inode编号</li>
                <li><strong>平等地位</strong>：所有硬链接地位平等，删除一个不影响其他链接</li>
                <li><strong>文件系统限制</strong>：只能在同一文件系统内创建</li>
                <li><strong>不支持目录</strong>：大多数系统不允许为目录创建硬链接</li>
                <li><strong>空间效率</strong>：不占用额外磁盘空间</li>
              </ul>

              <h3>创建与使用</h3>
              <pre class="code-block"># Linux/MacOS 创建硬链接
ln source_file hard_link

# Windows (需要管理员权限)
fsutil hardlink create new_link existing_file</pre>
            </div>

            <div class="use-cases">
              <h3>使用场景</h3>
              <div class="case-card">
                <div class="case-icon">💾</div>
                <div class="case-content">
                  <h4>文件备份与同步</h4>
                  <p>创建重要文件的多个硬链接作为即时备份，无需复制内容</p>
                </div>
              </div>

              <div class="case-card">
                <div class="case-icon">📁</div>
                <div class="case-content">
                  <h4>节省存储空间</h4>
                  <p>多个路径访问同一文件，避免重复存储相同内容</p>
                </div>
              </div>

              <div class="case-card">
                <div class="case-icon">🔄</div>
                <div class="case-content">
                  <h4>版本文件维护</h4>
                  <p>保持文件名不变，通过硬链接切换不同版本的文件内容</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 软链接（符号链接） -->
        <div class="link-card">
          <div class="link-header">
            <div class="link-icon">🔖</div>
            <h2>软链接 / 符号链接 (Symbolic Link)</h2>
            <div class="link-tag">间接引用</div>
          </div>

          <div class="link-content">
            <div class="description">
              <h3>定义与原理</h3>
              <p>符号链接是一个特殊的文件，包含指向另一个文件或目录的路径引用。它类似于Windows系统中的"快捷方式"。</p>

              <h3>关键特性</h3>
              <ul>
                <li><strong>独立inode</strong>：拥有自己的inode和元数据</li>
                <li><strong>路径引用</strong>：存储目标文件的路径而非实际内容</li>
                <li><strong>跨文件系统</strong>：可以链接不同文件系统的文件</li>
                <li><strong>支持目录</strong>：可以为目录创建符号链接</li>
                <li><strong>悬空链接</strong>：目标删除后成为悬空链接</li>
                <li><strong>小空间占用</strong>：仅存储目标路径，占用少量空间</li>
              </ul>

              <h3>创建与使用</h3>
              <pre class="code-block"># Linux/MacOS 创建符号链接
ln -s target_file symbolic_link

# Windows (命令提示符)
mklink symbolic_link target_file

# Windows (PowerShell)
New-Item -ItemType SymbolicLink -Path "symlink" -Target "target"</pre>
            </div>

            <div class="use-cases">
              <h3>使用场景</h3>
              <div class="case-card">
                <div class="case-icon">📂</div>
                <div class="case-content">
                  <h4>目录快捷方式</h4>
                  <p>为深层嵌套目录创建易于访问的符号链接</p>
                </div>
              </div>

              <div class="case-card">
                <div class="case-icon">🖥️</div>
                <div class="case-content">
                  <h4>跨文件系统访问</h4>
                  <p>访问不同磁盘分区或文件系统中的文件</p>
                </div>
              </div>

              <div class="case-card">
                <div class="case-icon">🚀</div>
                <div class="case-content">
                  <h4>应用兼容性</h4>
                  <p>为旧版应用提供兼容路径，同时保持实际文件位置不变</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="comparison-section">
        <h2>硬链接 vs 软链接 对比</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>硬链接</th>
                <th>软链接（符号链接）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>本质</td>
                <td>直接指向inode</td>
                <td>指向文件路径</td>
              </tr>
              <tr>
                <td>inode</td>
                <td>与原文件相同</td>
                <td>独立的新inode</td>
              </tr>
              <tr>
                <td>跨文件系统</td>
                <td>不支持</td>
                <td>支持</td>
              </tr>
              <tr>
                <td>目录链接</td>
                <td>通常不支持</td>
                <td>支持</td>
              </tr>
              <tr>
                <td>空间占用</td>
                <td>不占用额外空间</td>
                <td>少量空间（存储路径）</td>
              </tr>
              <tr>
                <td>目标删除后</td>
                <td>仍可访问（直到所有链接删除）</td>
                <td>链接失效（悬空链接）</td>
              </tr>
              <tr>
                <td>文件权限</td>
                <td>与原文件相同</td>
                <td>独立权限（但通常跟随目标）</td>
              </tr>
              <tr>
                <td>相对路径</td>
                <td>不支持</td>
                <td>支持</td>
              </tr>
              <tr>
                <td>创建命令</td>
                <td>ln (Unix), fsutil (Windows)</td>
                <td>ln -s (Unix), mklink (Windows)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="technical-details">
        <h2>技术实现细节</h2>
        <div class="details-grid">
          <div class="detail-card">
            <h3>Inode 结构</h3>
            <pre class="code-block">struct inode {
  int number;          // inode编号
  mode_t mode;         // 文件类型和权限
  int link_count;      // 链接计数
  off_t size;          // 文件大小
  time_t atime;        // 访问时间
  time_t mtime;        // 修改时间
  time_t ctime;        // 状态变更时间
  block_ptr[12];       // 数据块指针
  // ...其他元数据
};</pre>
          </div>

          <div class="detail-card">
            <h3>文件系统操作</h3>
            <ul>
              <li><strong>创建硬链接</strong>：增加inode引用计数，添加目录项</li>
              <li><strong>删除文件</strong>：减少引用计数，当计数为0时释放空间</li>
              <li><strong>创建软链接</strong>：创建新inode，类型为symlink，存储目标路径</li>
              <li><strong>访问软链接</strong>：操作系统解析路径并重定向到目标</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="best-practices">
        <h2>最佳实践与注意事项</h2>
        <div class="practices-grid">
          <div class="practice-card">
            <div class="icon">⚠️</div>
            <h3>硬链接限制</h3>
            <p>避免对目录创建硬链接，可能导致文件系统循环</p>
          </div>
          <div class="practice-card">
            <div class="icon">🔄</div>
            <h3>链接更新策略</h3>
            <p>修改硬链接会影响所有链接，软链接则保持独立</p>
          </div>
          <div class="practice-card">
            <div class="icon">📏</div>
            <h3>相对路径 vs 绝对路径</h3>
            <p>软链接使用相对路径可提高可移植性</p>
          </div>
          <div class="practice-card">
            <div class="icon">🔍</div>
            <h3>检测链接类型</h3>
            <p>使用 <code>ls -li</code> 查看inode，<code>file</code> 命令检测链接类型</p>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>文件系统链接指南 © 2023 | 使用Vue3 + TypeScript实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 本组件为纯展示型组件，无需响应式数据
</script>

<style lang="less" scoped>


.link-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
  background-color: #fafafa;
  min-height: 100vh;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 40px;
    padding: 30px 20px;
    background: linear-gradient(135deg, #0f4c75 0%, #3282b8 100%);
    border-radius: 12px;
    color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto;
    }
  }

  .content-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    padding: 30px;
  }

  .intro-section {
    margin-bottom: 40px;

    .info-card {
      background: linear-gradient(120deg, #e8f4fc, #f0f9ff);
      border-radius: 12px;
      padding: 25px;
      border-left: 4px solid #3282b8;

      h2 {
        font-size: 1.8rem;
        color: #0f4c75;
        margin-bottom: 15px;
      }

      p {
        font-size: 1.1rem;
        line-height: 1.6;
        color: #444;
        margin-bottom: 20px;
      }

      .file-system-diagram {
        background: #2c3e50;
        color: white;
        border-radius: 8px;
        padding: 20px;
        font-family: 'Fira Code', monospace;
        font-size: 0.95rem;
        margin-top: 20px;

        .inode {
          background: #3498db;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .file-data {
          background: #2ecc71;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
        }

        .links {
          .hard-link {
            background: #e74c3c;
            padding: 8px;
            border-radius: 4px;
            margin-bottom: 5px;
          }

          .symbolic-link {
            background: #f39c12;
            padding: 8px;
            border-radius: 4px;
          }
        }
      }
    }
  }

  .link-types-container {
    display: grid;
    gap: 30px;
    margin-bottom: 50px;
  }

  .link-card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: white;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
    }

    &:first-child {
      border-top: 3px solid #e74c3c;
    }

    &:last-child {
      border-top: 3px solid #f39c12;
    }
  }

  .link-header {
    display: flex;
    align-items: center;
    padding: 20px 25px;
    background: linear-gradient(to right, #f5f7fa, #e4e7f0);

    .link-icon {
      font-size: 2rem;
      margin-right: 15px;
      min-width: 50px;
      text-align: center;
    }

    h2 {
      font-size: 1.6rem;
      margin: 0;
      flex-grow: 1;
      color: #2c3e50;
    }

    .link-tag {
      background: #0f4c75;
      color: white;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
    }
  }

  .link-content {
    display: flex;
    padding: 25px;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .description {
      flex: 2;
      padding-right: 25px;

      h3 {
        font-size: 1.3rem;
        color: #0f4c75;
        margin-top: 0;
        margin-bottom: 15px;
        padding-bottom: 8px;
        border-bottom: 1px dashed #e0e0e0;
      }

      p,
      ul {
        font-size: 1rem;
        color: #444;
      }

      ul {
        padding-left: 20px;
        margin: 15px 0;

        li {
          margin-bottom: 10px;
          position: relative;

          &::before {
            content: '•';
            color: #3282b8;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
        }
      }
    }

    .use-cases {
      flex: 1;
      min-width: 300px;

      h3 {
        font-size: 1.3rem;
        color: #0f4c75;
        margin-top: 0;
        margin-bottom: 20px;
      }

      .case-card {
        display: flex;
        align-items: flex-start;
        padding: 15px;
        background: #f8fafc;
        border-radius: 8px;
        margin-bottom: 15px;
        border-left: 3px solid #3282b8;

        .case-icon {
          font-size: 1.8rem;
          margin-right: 15px;
        }

        .case-content {
          h4 {
            margin: 0 0 8px 0;
            color: #2c3e50;
            font-size: 1.1rem;
          }

          p {
            margin: 0;
            color: #666;
            font-size: 0.95rem;
          }
        }
      }
    }
  }

  .code-block {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 8px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    overflow-x: auto;
    line-height: 1.5;
    margin: 15px 0;
  }

  .comparison-section {
    margin: 50px 0;

    h2 {
      text-align: center;
      font-size: 1.8rem;
      color: #2c3e50;
      margin-bottom: 30px;
      position: relative;

      &::after {
        content: '';
        display: block;
        width: 80px;
        height: 4px;
        background: linear-gradient(to right, #0f4c75, #3282b8);
        margin: 10px auto 0;
        border-radius: 2px;
      }
    }

    .comparison-table {
      overflow-x: auto;

      table {
        width: 100%;
        border-collapse: collapse;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        overflow: hidden;

        th,
        td {
          padding: 16px 20px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        thead {
          background: linear-gradient(to right, #0f4c75, #3282b8);
          color: white;

          th {
            font-weight: 600;
            font-size: 1.05rem;
          }
        }

        tbody {
          tr {
            &:nth-child(even) {
              background-color: #f9f9f9;
            }

            &:hover {
              background-color: #f0f4ff;
            }
          }
        }
      }
    }
  }

  .technical-details {
    margin: 50px 0;

    h2 {
      text-align: center;
      font-size: 1.8rem;
      color: #2c3e50;
      margin-bottom: 30px;
      position: relative;

      &::after {
        content: '';
        display: block;
        width: 80px;
        height: 4px;
        background: linear-gradient(to right, #0f4c75, #3282b8);
        margin: 10px auto 0;
        border-radius: 2px;
      }
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 25px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .detail-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      border-top: 3px solid #3282b8;

      h3 {
        font-size: 1.3rem;
        color: #0f4c75;
        margin-top: 0;
        margin-bottom: 15px;
      }

      ul {
        padding-left: 20px;

        li {
          margin-bottom: 10px;
          position: relative;

          &::before {
            content: '•';
            color: #3282b8;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
        }
      }
    }
  }

  .best-practices {
    margin: 50px 0 30px;

    h2 {
      text-align: center;
      font-size: 1.8rem;
      color: #2c3e50;
      margin-bottom: 30px;
      position: relative;

      &::after {
        content: '';
        display: block;
        width: 80px;
        height: 4px;
        background: linear-gradient(to right, #0f4c75, #3282b8);
        margin: 10px auto 0;
        border-radius: 2px;
      }
    }

    .practices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
    }

    .practice-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
      border-top: 3px solid #3282b8;

      &:hover {
        transform: translateY(-8px);
      }

      .icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }

      h3 {
        font-size: 1.2rem;
        margin: 10px 0;
        color: #2c3e50;
      }

      p {
        color: #666;
        font-size: 0.95rem;
        line-height: 1.5;
        margin: 0;
      }

      code {
        background: #f0f7ff;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
      }
    }
  }

  footer {
    text-align: center;
    margin-top: 50px;
    padding: 20px;
    color: #666;
    font-size: 0.9rem;
    border-top: 1px solid #eee;
  }
}
</style>
