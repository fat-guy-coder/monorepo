<template>
  <div class="process-thread-container">
    <div class="header">
      <h1>进程与线程基础介绍</h1>
      <p class="subtitle">深入理解计算机并发执行的核心概念</p>
    </div>

    <div class="content">
      <section class="intro-section">
        <h2><span class="icon">🔍</span> 基本概念</h2>
        <div class="concept-grid">
          <div class="concept-card process-card">
            <div class="concept-icon">📦</div>
            <h3>进程 (Process)</h3>
            <p>操作系统进行资源分配和调度的基本单位</p>
            <div class="concept-detail">
              <p>进程是程序在操作系统中的一次执行过程，拥有独立的内存空间和系统资源。每个进程都包含程序代码、数据、内存空间、打开的文件和系统状态等信息。</p>
            </div>
          </div>

          <div class="concept-card thread-card">
            <div class="concept-icon">🧵</div>
            <h3>线程 (Thread)</h3>
            <p>CPU调度和执行的最小单位</p>
            <div class="concept-detail">
              <p>线程是进程内的一个执行单元，是比进程更小的独立运行单位。同一进程内的多个线程共享进程的内存空间和系统资源，但拥有独立的执行栈和程序计数器。</p>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <h2><span class="icon">🆚</span> 进程 vs 线程</h2>
        <div class="comparison-table">
          <div class="table-header">
            <div class="header-cell"></div>
            <div class="header-cell">进程</div>
            <div class="header-cell">线程</div>
          </div>

          <div class="table-row">
            <div class="row-header">资源分配</div>
            <div class="row-cell">拥有独立的内存空间和系统资源</div>
            <div class="row-cell">共享所属进程的内存和资源</div>
          </div>

          <div class="table-row">
            <div class="row-header">创建开销</div>
            <div class="row-cell">较大，需要分配独立资源</div>
            <div class="row-cell">较小，共享进程资源</div>
          </div>

          <div class="table-row">
            <div class="row-header">通信方式</div>
            <div class="row-cell">管道、消息队列、共享内存、信号量等</div>
            <div class="row-cell">共享变量、互斥锁、信号量等</div>
          </div>

          <div class="table-row">
            <div class="row-header">独立性</div>
            <div class="row-cell">独立运行，一个进程崩溃不会影响其他进程</div>
            <div class="row-cell">一个线程崩溃可能导致整个进程终止</div>
          </div>

          <div class="table-row">
            <div class="row-header">切换开销</div>
            <div class="row-cell">较大，需要保存/恢复整个上下文</div>
            <div class="row-cell">较小，只需保存/恢复少量寄存器</div>
          </div>

          <div class="table-row">
            <div class="row-header">多核利用</div>
            <div class="row-cell">多个进程可并行运行在不同核心</div>
            <div class="row-cell">同一进程的多个线程可并行运行在不同核心</div>
          </div>
        </div>
      </section>

      <section class="process-section">
        <h2><span class="icon">📦</span> 进程基础介绍</h2>
        <div class="process-content">
          <div class="process-model">
            <h3>进程内存模型</h3>
            <div class="memory-diagram">
              <div class="memory-section stack">
                <div class="section-label">栈 (Stack)</div>
                <div class="section-detail">存储局部变量、函数参数、返回地址</div>
              </div>
              <div class="memory-section heap">
                <div class="section-label">堆 (Heap)</div>
                <div class="section-detail">动态分配的内存空间</div>
              </div>
              <div class="memory-section data">
                <div class="section-label">数据段 (Data)</div>
                <div class="section-detail">存储全局变量和静态变量</div>
              </div>
              <div class="memory-section code">
                <div class="section-label">代码段 (Code)</div>
                <div class="section-detail">存储程序执行代码</div>
              </div>
            </div>
          </div>

          <div class="process-states">
            <h3>进程状态转换</h3>
            <div class="state-diagram">
              <div class="state new">
                <div class="state-label">新建</div>
                <div class="state-arrow">→</div>
              </div>
              <div class="state ready">
                <div class="state-label">就绪</div>
                <div class="state-arrow">→</div>
              </div>
              <div class="state running">
                <div class="state-label">运行</div>
                <div class="state-arrow">→</div>
              </div>
              <div class="state waiting">
                <div class="state-label">阻塞</div>
                <div class="state-arrow">→</div>
              </div>
              <div class="state terminated">
                <div class="state-label">终止</div>
              </div>
            </div>
            <div class="state-explanation">
              <ul>
                <li><strong>新建 → 就绪</strong>：操作系统完成进程创建</li>
                <li><strong>就绪 → 运行</strong>：调度器分配CPU时间</li>
                <li><strong>运行 → 就绪</strong>：时间片用完或被更高优先级抢占</li>
                <li><strong>运行 → 阻塞</strong>：等待I/O操作或事件</li>
                <li><strong>阻塞 → 就绪</strong>：等待的事件发生</li>
                <li><strong>运行 → 终止</strong>：进程执行完成或被终止</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="thread-section">
        <h2><span class="icon">🧵</span> 线程基础介绍</h2>
        <div class="thread-content">
          <div class="thread-model">
            <h3>线程模型</h3>
            <div class="thread-diagram">
              <div class="process-box">
                <div class="process-label">进程</div>
                <div class="process-resources">
                  <div class="resource">内存空间</div>
                  <div class="resource">打开文件</div>
                  <div class="resource">全局变量</div>
                  <div class="resource">信号处理</div>
                </div>
                <div class="threads-container">
                  <div class="thread">
                    <div class="thread-label">线程 1</div>
                    <div class="thread-resources">
                      <div class="thread-resource">栈</div>
                      <div class="thread-resource">寄存器</div>
                      <div class="thread-resource">程序计数器</div>
                      <div class="thread-resource">状态</div>
                    </div>
                  </div>
                  <div class="thread">
                    <div class="thread-label">线程 2</div>
                    <div class="thread-resources">
                      <div class="thread-resource">栈</div>
                      <div class="thread-resource">寄存器</div>
                      <div class="thread-resource">程序计数器</div>
                      <div class="thread-resource">状态</div>
                    </div>
                  </div>
                  <div class="thread">
                    <div class="thread-label">线程 3</div>
                    <div class="thread-resources">
                      <div class="thread-resource">栈</div>
                      <div class="thread-resource">寄存器</div>
                      <div class="thread-resource">程序计数器</div>
                      <div class="thread-resource">状态</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="thread-types">
            <h3>线程类型</h3>
            <div class="types-grid">
              <div class="type-card">
                <h4>用户级线程 (ULT)</h4>
                <ul>
                  <li>在用户空间实现</li>
                  <li>操作系统感知不到</li>
                  <li>切换速度快</li>
                  <li>阻塞问题：一个线程阻塞会导致整个进程阻塞</li>
                </ul>
              </div>

              <div class="type-card">
                <h4>内核级线程 (KLT)</h4>
                <ul>
                  <li>由操作系统内核管理</li>
                  <li>操作系统直接调度</li>
                  <li>切换速度较慢</li>
                  <li>一个线程阻塞不影响其他线程</li>
                </ul>
              </div>

              <div class="type-card">
                <h4>混合模型</h4>
                <ul>
                  <li>结合ULT和KLT优点</li>
                  <li>用户线程映射到内核线程</li>
                  <li>现代操作系统常用模型</li>
                  <li>提供灵活性和高性能</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="interaction-section">
        <h2><span class="icon">🤝</span> 进程间通信与线程同步</h2>
        <div class="interaction-content">
          <div class="ipc-section">
            <h3>进程间通信 (IPC)</h3>
            <div class="ipc-methods">
              <div class="method-card">
                <h4>管道 (Pipe)</h4>
                <p>单向数据流，用于有亲缘关系的进程</p>
              </div>

              <div class="method-card">
                <h4>消息队列 (Message Queue)</h4>
                <p>通过消息链表实现进程间通信</p>
              </div>

              <div class="method-card">
                <h4>共享内存 (Shared Memory)</h4>
                <p>多个进程访问同一内存区域</p>
              </div>

              <div class="method-card">
                <h4>信号量 (Semaphore)</h4>
                <p>用于进程间同步，避免竞争条件</p>
              </div>

              <div class="method-card">
                <h4>套接字 (Socket)</h4>
                <p>支持不同主机间的进程通信</p>
              </div>
            </div>
          </div>

          <div class="sync-section">
            <h3>线程同步机制</h3>
            <div class="sync-methods">
              <div class="method-card">
                <h4>互斥锁 (Mutex)</h4>
                <p>确保同一时间只有一个线程访问共享资源</p>
              </div>

              <div class="method-card">
                <h4>信号量 (Semaphore)</h4>
                <p>控制多个线程对共享资源的访问</p>
              </div>

              <div class="method-card">
                <h4>条件变量 (Condition Variable)</h4>
                <p>用于线程等待特定条件发生</p>
              </div>

              <div class="method-card">
                <h4>读写锁 (Read-Write Lock)</h4>
                <p>允许多个读操作或单个写操作</p>
              </div>

              <div class="method-card">
                <h4>屏障 (Barrier)</h4>
                <p>使多个线程在某个点同步</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="conclusion-section">
        <h2><span class="icon">💡</span> 总结与应用场景</h2>
        <div class="conclusion-content">
          <div class="use-cases">
            <h3>进程适用场景</h3>
            <ul>
              <li>需要高度隔离和安全性的应用</li>
              <li>长时间运行的服务（如数据库、Web服务器）</li>
              <li>需要独立内存空间的应用</li>
              <li>分布式系统中的不同节点</li>
            </ul>
          </div>

          <div class="use-cases">
            <h3>线程适用场景</h3>
            <ul>
              <li>需要高并发性能的应用</li>
              <li>需要共享大量数据的任务</li>
              <li>用户界面应用程序（保持UI响应）</li>
              <li>计算密集型任务的并行处理</li>
            </ul>
          </div>

          <div class="key-point">
            <h3>核心要点</h3>
            <p>现代应用程序通常结合使用进程和线程：</p>
            <ul>
              <li>使用<strong>进程</strong>实现系统隔离和容错</li>
              <li>使用<strong>线程</strong>提高并发性能和资源利用率</li>
              <li>通过<strong>IPC</strong>实现进程间通信</li>
              <li>通过<strong>同步机制</strong>保证线程安全</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div class="footer">
      <p>操作系统核心概念 | 进程与线程基础介绍</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 此组件仅用于展示，无逻辑代码
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.process-thread-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%);
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.07);
  line-height: 1.6;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e9ecef;

    h1 {
      font-size: 2.4rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, #3498db, #2c3e50);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      font-size: 1.15rem;
      color: #7f8c8d;
      font-weight: 400;
      max-width: 700px;
      margin: 0 auto;
    }
  }

  .content {
    background: white;
    border-radius: 12px;
    padding: 2.5rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
  }

  section {
    margin-bottom: 3.5rem;

    h2 {
      font-size: 1.7rem;
      color: #3498db;
      margin-bottom: 1.8rem;
      padding-bottom: 0.8rem;
      border-bottom: 2px solid #e0f7fa;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 12px;
        font-size: 1.4rem;
      }
    }
  }

  .intro-section {
    .concept-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;

      .concept-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.8rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
        }

        &.process-card {
          border-top: 4px solid #3498db;
        }

        &.thread-card {
          border-top: 4px solid #9b59b6;
        }

        .concept-icon {
          font-size: 3rem;
          margin-bottom: 1.2rem;
          text-align: center;
        }

        h3 {
          font-size: 1.5rem;
          text-align: center;
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        >p {
          text-align: center;
          font-weight: 500;
          color: #4a5568;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }

        .concept-detail {
          p {
            color: #4a5568;
            font-size: 1rem;
            line-height: 1.7;
            margin: 0;
          }
        }
      }
    }
  }

  .comparison-section {
    .comparison-table {
      background: #f8fafc;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e2e8f0;

      .table-header {
        display: flex;
        background: #3498db;
        color: white;
        font-weight: 600;

        .header-cell {
          padding: 1.2rem;
          text-align: center;
          flex: 1;

          &:first-child {
            flex: 0.5;
            background: #2c3e50;
          }
        }
      }

      .table-row {
        display: flex;
        border-bottom: 1px solid #e2e8f0;
        transition: background 0.2s;

        &:nth-child(even) {
          background: #f0f4f8;
        }

        &:hover {
          background: #e3f2fd;
        }

        .row-header {
          flex: 0.5;
          padding: 1.2rem;
          font-weight: 600;
          background: #edf2f7;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .row-cell {
          flex: 1;
          padding: 1.2rem;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .process-section,
  .thread-section {

    .process-content,
    .thread-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 2rem;

      .process-model,
      .thread-model {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1.5rem;
          text-align: center;
        }
      }

      .memory-diagram {
        display: flex;
        flex-direction: column;
        height: 300px;
        border: 1px solid #cbd5e0;
        border-radius: 8px;
        overflow: hidden;

        .memory-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 1rem;
          border-bottom: 1px solid #cbd5e0;

          &:last-child {
            border-bottom: none;
          }

          .section-label {
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .section-detail {
            font-size: 0.9rem;
            color: #4a5568;
          }

          &.stack {
            background: #e3f2fd;
          }

          &.heap {
            background: #e8f5e9;
          }

          &.data {
            background: #fff3e0;
          }

          &.code {
            background: #f3e5f5;
          }
        }
      }

      .process-states {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .state-diagram {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;

          .state {
            background: #e3f2fd;
            border: 1px solid #bbdefb;
            border-radius: 8px;
            padding: 1rem;
            text-align: center;
            flex: 1;
            margin: 0 0.5rem;
            position: relative;

            .state-label {
              font-weight: 600;
            }

            .state-arrow {
              position: absolute;
              right: -30px;
              top: 50%;
              transform: translateY(-50%);
              font-size: 1.5rem;
              color: #90a4ae;
            }

            &.new {
              background: #e0f7fa;
            }

            &.ready {
              background: #fff8e1;
            }

            &.running {
              background: #c8e6c9;
            }

            &.waiting {
              background: #ffecb3;
            }

            &.terminated {
              background: #ffcdd2;
            }
          }
        }

        .state-explanation {
          ul {
            padding-left: 1.2rem;

            li {
              margin-bottom: 0.8rem;
              line-height: 1.5;

              strong {
                color: #3498db;
              }
            }
          }
        }
      }

      .thread-diagram {
        .process-box {
          border: 2px solid #3498db;
          border-radius: 8px;
          padding: 1.5rem;
          background: #e3f2fd;

          .process-label {
            font-weight: 600;
            text-align: center;
            margin-bottom: 1rem;
            font-size: 1.2rem;
          }

          .process-resources {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
            justify-content: center;

            .resource {
              background: #bbdefb;
              padding: 0.5rem 1rem;
              border-radius: 4px;
              font-size: 0.9rem;
            }
          }

          .threads-container {
            display: flex;
            gap: 1rem;
            justify-content: center;

            .thread {
              flex: 1;
              border: 1px solid #9b59b6;
              border-radius: 6px;
              padding: 1rem;
              background: #f3e5f5;

              .thread-label {
                font-weight: 600;
                text-align: center;
                margin-bottom: 0.8rem;
                color: #8e44ad;
              }

              .thread-resources {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.5rem;

                .thread-resource {
                  background: #e1bee7;
                  padding: 0.4rem;
                  border-radius: 4px;
                  font-size: 0.8rem;
                  text-align: center;
                }
              }
            }
          }
        }
      }

      .thread-types {
        .types-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;

          .type-card {
            background: #f8fafc;
            border-radius: 8px;
            padding: 1.2rem;
            border: 1px solid #e2e8f0;

            h4 {
              font-size: 1.1rem;
              color: #2c3e50;
              margin-top: 0;
              margin-bottom: 0.8rem;
              padding-bottom: 0.5rem;
              border-bottom: 1px solid #e2e8f0;
            }

            ul {
              padding-left: 1.2rem;
              margin: 0;

              li {
                margin-bottom: 0.6rem;
                font-size: 0.95rem;
                line-height: 1.5;
                color: #4a5568;
              }
            }
          }
        }
      }
    }
  }

  .interaction-section {
    .interaction-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }

      .ipc-section,
      .sync-section {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .ipc-methods,
        .sync-methods {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.2rem;

          .method-card {
            background: white;
            border-radius: 8px;
            padding: 1rem;
            border: 1px solid #e2e8f0;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

            h4 {
              font-size: 1.1rem;
              color: #2c3e50;
              margin-top: 0;
              margin-bottom: 0.5rem;
            }

            p {
              font-size: 0.9rem;
              color: #4a5568;
              margin: 0;
            }
          }
        }
      }
    }
  }

  .conclusion-section {
    .conclusion-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;

      .use-cases,
      .key-point {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1rem;
          text-align: center;
        }

        ul {
          padding-left: 1.2rem;

          li {
            margin-bottom: 0.8rem;
            line-height: 1.5;
            color: #4a5568;
          }
        }

        p {
          color: #4a5568;
        }
      }

      .key-point {
        grid-column: span 2;

        @media (max-width: 900px) {
          grid-column: span 1;
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e9ecef;
    color: #718096;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;

    .header {
      h1 {
        font-size: 1.9rem;
      }
    }

    .content {
      padding: 1.8rem;
    }

    section {
      margin-bottom: 2.5rem;
    }

    .concept-grid,
    .process-content,
    .thread-content,
    .conclusion-content,
    .interaction-content {
      grid-template-columns: 1fr;
      gap: 1.2rem;
    }

    .state-diagram {
      flex-direction: column;
      align-items: center;

      .state {
        margin: 0.5rem 0 !important;
        width: 80%;

        .state-arrow {
          right: auto !important;
          bottom: -30px !important;
          top: auto !important;
          left: 50%;
          transform: translateX(-50%) rotate(90deg) !important;
        }
      }
    }
  }
}
</style>
