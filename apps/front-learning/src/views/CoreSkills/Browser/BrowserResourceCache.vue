<template>
  <div class="resource-storage-container">
    <header class="header">
      <h1>浏览器资源存储位置详解</h1>
      <p class="subtitle">探索图片、视频、脚本等资源在浏览器中的存储机制</p>
      <div class="meta-tags">
        <span class="tag"><i class="icon icon-storage"></i> 内存管理</span>
        <span class="tag"><i class="icon icon-cache"></i> 缓存策略</span>
        <span class="tag"><i class="icon icon-perf"></i> 性能优化</span>
      </div>
    </header>

    <div class="content-grid">
      <!-- 资源加载流程 -->
      <div class="loading-process card">
        <h2 class="section-title"><i class="icon icon-process"></i> 资源加载流程</h2>
        <div class="process-content">
          <div class="process-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-info">
                <h3>发起请求</h3>
                <p>浏览器根据URL发起资源请求</p>
              </div>
            </div>
            <div class="step-arrow"></div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-info">
                <h3>缓存检查</h3>
                <p>检查内存缓存、HTTP缓存等</p>
              </div>
            </div>
            <div class="step-arrow"></div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-info">
                <h3>网络获取</h3>
                <p>缓存未命中时从网络下载</p>
              </div>
            </div>
            <div class="step-arrow"></div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-info">
                <h3>解析存储</h3>
                <p>资源解析并存储到不同位置</p>
              </div>
            </div>
          </div>

          <div class="storage-hierarchy">
            <div class="hierarchy-title">浏览器存储层次结构</div>
            <div class="hierarchy-levels">
              <div class="level fastest">
                <div class="level-name">内存缓存</div>
                <div class="level-desc">最快访问，页面生命周期内有效</div>
              </div>
              <div class="level-arrow">↓</div>
              <div class="level fast">
                <div class="level-name">HTTP缓存</div>
                <div class="level-desc">磁盘缓存，会话间持久化</div>
              </div>
              <div class="level-arrow">↓</div>
              <div class="level persistent">
                <div class="level-name">持久化存储</div>
                <div class="level-desc">IndexedDB、Service Worker等</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 资源存储位置 -->
      <div class="resource-storage card">
        <h2 class="section-title"><i class="icon icon-resource"></i> 各类资源存储位置</h2>

        <div class="resource-grid">
          <!-- 图片资源 -->
          <div class="resource-card image">
            <div class="resource-icon">
              <i class="icon icon-image"></i>
            </div>
            <h3 class="resource-title">图片资源</h3>
            <div class="storage-section">
              <h4>短期存储</h4>
              <ul>
                <li><strong>内存缓存</strong>：解码后的位图数据</li>
                <li><strong>HTTP缓存</strong>：原始图片数据</li>
              </ul>
            </div>
            <div class="storage-section">
              <h4>长期存储</h4>
              <ul>
                <li><strong>磁盘缓存</strong>：基于Cache-Control的HTTP缓存</li>
                <li><strong>Service Worker缓存</strong>：可编程缓存策略</li>
              </ul>
            </div>
            <div class="optimization-tip">
              <i class="icon icon-tip"></i> 优化建议：使用WebP格式，设置合适缓存头
            </div>
          </div>

          <!-- 视频资源 -->
          <div class="resource-card video">
            <div class="resource-icon">
              <i class="icon icon-video"></i>
            </div>
            <h3 class="resource-title">视频资源</h3>
            <div class="storage-section">
              <h4>短期存储</h4>
              <ul>
                <li><strong>内存缓冲区</strong>：当前播放片段数据</li>
                <li><strong>预加载缓存</strong>：即将播放的片段</li>
              </ul>
            </div>
            <div class="storage-section">
              <h4>长期存储</h4>
              <ul>
                <li><strong>磁盘缓存</strong>：完整视频文件</li>
                <li><strong>MediaSource API</strong>：分段缓存管理</li>
              </ul>
            </div>
            <div class="optimization-tip">
              <i class="icon icon-tip"></i> 优化建议：使用流式传输，分段加载
            </div>
          </div>

          <!-- 脚本资源 -->
          <div class="resource-card script">
            <div class="resource-icon">
              <i class="icon icon-script"></i>
            </div>
            <h3 class="resource-title">脚本资源</h3>
            <div class="storage-section">
              <h4>短期存储</h4>
              <ul>
                <li><strong>内存缓存</strong>：解析后的AST和字节码</li>
                <li><strong>V8编译缓存</strong>：优化后的机器码</li>
              </ul>
            </div>
            <div class="storage-section">
              <h4>长期存储</h4>
              <ul>
                <li><strong>HTTP缓存</strong>：原始JS文件</li>
                <li><strong>Service Worker缓存</strong>：离线可用脚本</li>
              </ul>
            </div>
            <div class="optimization-tip">
              <i class="icon icon-tip"></i> 优化建议：代码分割，使用模块化加载
            </div>
          </div>

          <!-- 样式表资源 -->
          <div class="resource-card stylesheet">
            <div class="resource-icon">
              <i class="icon icon-css"></i>
            </div>
            <h3 class="resource-title">样式表资源</h3>
            <div class="storage-section">
              <h4>短期存储</h4>
              <ul>
                <li><strong>内存缓存</strong>：解析后的CSSOM</li>
                <li><strong>渲染树缓存</strong>：计算后的样式数据</li>
              </ul>
            </div>
            <div class="storage-section">
              <h4>长期存储</h4>
              <ul>
                <li><strong>HTTP缓存</strong>：原始CSS文件</li>
                <li><strong>浏览器缓存</strong>：基于文件内容哈希</li>
              </ul>
            </div>
            <div class="optimization-tip">
              <i class="icon icon-tip"></i> 优化建议：内联关键CSS，异步加载非关键样式
            </div>
          </div>

          <!-- 字体资源 -->
          <div class="resource-card font">
            <div class="resource-icon">
              <i class="icon icon-font"></i>
            </div>
            <h3 class="resource-title">字体资源</h3>
            <div class="storage-section">
              <h4>短期存储</h4>
              <ul>
                <li><strong>内存缓存</strong>：解析后的字形数据</li>
                <li><strong>GPU纹理</strong>：常用字符的渲染缓存</li>
              </ul>
            </div>
            <div class="storage-section">
              <h4>长期存储</h4>
              <ul>
                <li><strong>HTTP缓存</strong>：原始字体文件</li>
                <li><strong>IndexedDB</strong>：自定义字体持久化</li>
              </ul>
            </div>
            <div class="optimization-tip">
              <i class="icon icon-tip"></i> 优化建议：使用WOFF2格式，font-display策略
            </div>
          </div>

          <!-- 其他资源 -->
          <div class="resource-card other">
            <div class="resource-icon">
              <i class="icon icon-other"></i>
            </div>
            <h3 class="resource-title">其他资源</h3>
            <div class="storage-section">
              <h4>短期存储</h4>
              <ul>
                <li><strong>Session Storage</strong>：会话数据</li>
                <li><strong>内存数据库</strong>：临时数据集</li>
              </ul>
            </div>
            <div class="storage-section">
              <h4>长期存储</h4>
              <ul>
                <li><strong>Local Storage</strong>：持久键值对</li>
                <li><strong>IndexedDB</strong>：结构化数据存储</li>
                <li><strong>Cache API</strong>：可编程资源缓存</li>
              </ul>
            </div>
            <div class="optimization-tip">
              <i class="icon icon-tip"></i> 优化建议：合理选择存储方案，定期清理
            </div>
          </div>
        </div>
      </div>

      <!-- 缓存策略对比 -->
      <div class="cache-comparison card">
        <h2 class="section-title"><i class="icon icon-compare"></i> 浏览器缓存策略对比</h2>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>缓存类型</th>
                <th>存储位置</th>
                <th>生命周期</th>
                <th>容量限制</th>
                <th>适用资源</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>内存缓存</td>
                <td>RAM</td>
                <td>页面会话期间</td>
                <td>动态调整</td>
                <td>当前页面资源</td>
              </tr>
              <tr>
                <td>HTTP缓存</td>
                <td>磁盘</td>
                <td>根据Cache-Control</td>
                <td>50-100MB</td>
                <td>所有网络资源</td>
              </tr>
              <tr>
                <td>Service Worker缓存</td>
                <td>磁盘</td>
                <td>手动控制</td>
                <td>50%磁盘空间</td>
                <td>应用核心资源</td>
              </tr>
              <tr>
                <td>IndexedDB</td>
                <td>磁盘</td>
                <td>持久化</td>
                <td>50%磁盘空间</td>
                <td>结构化数据</td>
              </tr>
              <tr>
                <td>LocalStorage</td>
                <td>磁盘</td>
                <td>持久化</td>
                <td>5-10MB</td>
                <td>键值对数据</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="cache-optimization">
          <h3>缓存优化策略</h3>
          <div class="strategy-grid">
            <div class="strategy">
              <div class="strategy-icon">
                <i class="icon icon-header"></i>
              </div>
              <h4>HTTP缓存头</h4>
              <p>合理设置Cache-Control、ETag等头部</p>
            </div>

            <div class="strategy">
              <div class="strategy-icon">
                <i class="icon icon-sw"></i>
              </div>
              <h4>Service Worker</h4>
              <p>实现自定义缓存策略</p>
            </div>

            <div class="strategy">
              <div class="strategy-icon">
                <i class="icon icon-lazy"></i>
              </div>
              <h4>懒加载</h4>
              <p>按需加载非关键资源</p>
            </div>

            <div class="strategy">
              <div class="strategy-icon">
                <i class="icon icon-size"></i>
              </div>
              <h4>资源优化</h4>
              <p>压缩、格式优化减少大小</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="conclusion card">
      <h2 class="section-title"><i class="icon icon-summary"></i> 关键总结</h2>
      <div class="summary-content">
        <div class="key-points">
          <div class="point">
            <div class="point-number">1</div>
            <div class="point-content">
              <h3>分层存储体系</h3>
              <p>浏览器采用内存->磁盘->持久化的分层存储策略</p>
            </div>
          </div>

          <div class="point">
            <div class="point-number">2</div>
            <div class="point-content">
              <h3>资源类型差异</h3>
              <p>不同资源类型有各自的优化存储方式</p>
            </div>
          </div>

          <div class="point">
            <div class="point-number">3</div>
            <div class="point-content">
              <h3>缓存策略关键</h3>
              <p>合理缓存策略可极大提升加载性能</p>
            </div>
          </div>

          <div class="point">
            <div class="point-number">4</div>
            <div class="point-content">
              <h3>现代API优势</h3>
              <p>Service Worker和Cache API提供精细控制</p>
            </div>
          </div>
        </div>

        <div class="best-practices">
          <h3>最佳实践</h3>
          <ul>
            <li>为静态资源设置长期缓存（Cache-Control: max-age=31536000）</li>
            <li>使用内容哈希实现缓存破坏（filename.[hash].ext）</li>
            <li>关键资源使用内存缓存优化</li>
            <li>大资源使用IndexedDB分块存储</li>
            <li>实现Service Worker离线缓存策略</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加与浏览器存储相关的逻辑
// 例如检查缓存状态、存储使用情况等
import { onMounted } from 'vue'

onMounted(() => {
  // 组件挂载后的逻辑
  console.log('资源存储分析组件已加载')
})

// 示例：检查LocalStorage使用情况
function checkLocalStorageUsage() {
  let total = 0
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length * 2 // 每个字符2字节
    }
  }
  return (total / 1024).toFixed(2) // 返回KB
}
</script>

<style lang="less" scoped>
.resource-storage-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #333;
  background-color: #f9fafb;
  min-height: 100vh;
  line-height: 1.6;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 2rem;
    background: linear-gradient(135deg, #4a6cf7 0%, #6a11cb 100%);
    color: white;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(106, 17, 203, 0.15);

    h1 {
      font-weight: 700;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      margin-top: 0;
    }

    .meta-tags {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 1.5rem;
      flex-wrap: wrap;

      .tag {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(255, 255, 255, 0.15);
        padding: 0.5rem 1.2rem;
        border-radius: 20px;
        font-size: 0.95rem;

        .icon {
          font-size: 1.1rem;
        }
      }
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.8rem;
    margin-bottom: 2rem;
  }

  .card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
  }

  .section-title {
    background: #f8f9fa;
    margin: 0;
    padding: 1.2rem 1.5rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    .icon {
      font-size: 1.2rem;
      color: #4a6cf7;
    }
  }

  .loading-process {
    .process-content {
      padding: 1.5rem;

      .process-steps {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          top: 40px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(to right, #4a6cf7, #6a11cb);
          z-index: 1;
        }

        .step {
          position: relative;
          z-index: 2;
          text-align: center;
          flex: 1;

          .step-number {
            width: 50px;
            height: 50px;
            background: #4a6cf7;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0 auto 1rem;
            border: 3px solid white;
            box-shadow: 0 4px 8px rgba(74, 108, 247, 0.2);
          }

          .step-info {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

            h3 {
              margin-top: 0;
              margin-bottom: 0.5rem;
              color: #2c3e50;
            }

            p {
              margin: 0;
              color: #666;
              font-size: 0.9rem;
            }
          }
        }

        .step-arrow {
          flex: 0 0 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4a6cf7;
          font-weight: bold;
          font-size: 1.5rem;
        }
      }

      .storage-hierarchy {
        background: #f0f7ff;
        border-radius: 8px;
        padding: 1.5rem;
        border-left: 4px solid #4a6cf7;

        .hierarchy-title {
          font-weight: 600;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .hierarchy-levels {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;

          .level {
            padding: 1.2rem;
            border-radius: 8px;
            display: flex;
            flex-direction: column;

            .level-name {
              font-weight: 600;
              font-size: 1.1rem;
            }

            .level-desc {
              color: #555;
              font-size: 0.95rem;
            }

            &.fastest {
              background: rgba(74, 108, 247, 0.1);
              border: 1px solid rgba(74, 108, 247, 0.3);
            }

            &.fast {
              background: rgba(106, 17, 203, 0.08);
              border: 1px solid rgba(106, 17, 203, 0.2);
            }

            &.persistent {
              background: rgba(42, 187, 155, 0.1);
              border: 1px solid rgba(42, 187, 155, 0.3);
            }
          }

          .level-arrow {
            text-align: center;
            color: #666;
            font-weight: bold;
            font-size: 1.2rem;
            padding: 0.3rem 0;
          }
        }
      }
    }
  }

  .resource-storage {
    .resource-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      padding: 1.5rem;

      .resource-card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s ease;
        border-top: 3px solid;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
        }

        .resource-icon {
          width: 60px;
          height: 60px;
          background: #f0f7ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;

          .icon {
            font-size: 1.8rem;
          }
        }

        .resource-title {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .storage-section {
          margin-bottom: 1.2rem;

          h4 {
            margin-top: 0;
            margin-bottom: 0.5rem;
            font-size: 0.95rem;
            color: #4a6cf7;
            display: flex;
            align-items: center;

            &::before {
              content: '';
              display: inline-block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #4a6cf7;
              margin-right: 8px;
            }
          }

          ul {
            padding-left: 1.5rem;
            margin: 0;

            li {
              margin-bottom: 0.5rem;
              font-size: 0.9rem;
              line-height: 1.5;

              strong {
                color: #2c3e50;
              }
            }
          }
        }

        .optimization-tip {
          background: #f9f5ff;
          border-radius: 6px;
          padding: 0.8rem;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6a11cb;
          margin-top: 1rem;
          border-left: 3px solid #6a11cb;

          .icon {
            font-size: 1.2rem;
          }
        }

        &.image {
          border-top-color: #4a6cf7;
          .resource-icon {
            background: rgba(74, 108, 247, 0.1);
            .icon {
              color: #4a6cf7;
            }
          }
        }

        &.video {
          border-top-color: #e91e63;
          .resource-icon {
            background: rgba(233, 30, 99, 0.1);
            .icon {
              color: #e91e63;
            }
          }
        }

        &.script {
          border-top-color: #ff9800;
          .resource-icon {
            background: rgba(255, 152, 0, 0.1);
            .icon {
              color: #ff9800;
            }
          }
        }

        &.stylesheet {
          border-top-color: #4caf50;
          .resource-icon {
            background: rgba(76, 175, 80, 0.1);
            .icon {
              color: #4caf50;
            }
          }
        }

        &.font {
          border-top-color: #9c27b0;
          .resource-icon {
            background: rgba(156, 39, 176, 0.1);
            .icon {
              color: #9c27b0;
            }
          }
        }

        &.other {
          border-top-color: #607d8b;
          .resource-icon {
            background: rgba(96, 125, 139, 0.1);
            .icon {
              color: #607d8b;
            }
          }
        }
      }
    }
  }

  .cache-comparison {
    .comparison-table {
      padding: 1.5rem;
      overflow-x: auto;

      table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #eaeaea;
        }

        th {
          background: #f8f9fa;
          font-weight: 600;
          color: #2c3e50;
        }

        tr:hover {
          background: #f9f5ff;
        }

        tr:nth-child(even) {
          background: #fafafa;
        }
      }
    }

    .cache-optimization {
      padding: 0 1.5rem 1.5rem;

      h3 {
        margin-top: 0;
        color: #2c3e50;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid #eaeaea;
      }

      .strategy-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;

        .strategy {
          text-align: center;
          padding: 1.5rem 1rem;
          background: #f0f7ff;
          border-radius: 10px;

          .strategy-icon {
            width: 60px;
            height: 60px;
            background: #4a6cf7;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;

            .icon {
              color: white;
              font-size: 1.8rem;
            }
          }

          h4 {
            margin: 0 0 0.5rem;
            color: #2c3e50;
          }

          p {
            margin: 0;
            color: #666;
            font-size: 0.9rem;
          }
        }
      }
    }
  }

  .conclusion {
    .summary-content {
      padding: 1.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .key-points {
        .point {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px dashed #eaeaea;

          &:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }

          .point-number {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 36px;
            height: 36px;
            background: #4a6cf7;
            color: white;
            border-radius: 50%;
            font-weight: 600;
            font-size: 1.1rem;
          }

          .point-content {
            h3 {
              margin-top: 0;
              margin-bottom: 0.5rem;
              font-size: 1.1rem;
              color: #2c3e50;
            }

            p {
              margin: 0;
              color: #555;
              font-size: 0.95rem;
            }
          }
        }
      }

      .best-practices {
        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
          font-size: 1.1rem;
        }

        ul {
          padding-left: 1.5rem;
          margin: 0;

          li {
            margin-bottom: 0.7rem;
            line-height: 1.5;
            position: relative;
            padding-left: 1.5rem;

            &::before {
              content: '•';
              position: absolute;
              left: 0;
              color: #4a6cf7;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}

// 图标样式
.icon {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  &-storage::before {
    content: 'storage';
  }
  &-cache::before {
    content: 'cached';
  }
  &-perf::before {
    content: 'speed';
  }
  &-process::before {
    content: 'device_hub';
  }
  &-resource::before {
    content: 'folder';
  }
  &-compare::before {
    content: 'compare_arrows';
  }
  &-summary::before {
    content: 'summarize';
  }
  &-image::before {
    content: 'image';
  }
  &-video::before {
    content: 'videocam';
  }
  &-script::before {
    content: 'code';
  }
  &-css::before {
    content: 'css';
  }
  &-font::before {
    content: 'font_download';
  }
  &-other::before {
    content: 'more_horiz';
  }
  &-tip::before {
    content: 'lightbulb';
  }
  &-header::before {
    content: 'http';
  }
  &-sw::before {
    content: 'switches';
  }
  &-lazy::before {
    content: 'timer';
  }
  &-size::before {
    content: 'compress';
  }
}

@media (max-width: 768px) {
  .loading-process {
    .process-steps {
      flex-direction: column;
      align-items: center;
      gap: 2rem;

      &::before {
        display: none;
      }

      .step-arrow {
        transform: rotate(90deg);
        padding: 1rem 0;
      }
    }
  }
}
</style>
