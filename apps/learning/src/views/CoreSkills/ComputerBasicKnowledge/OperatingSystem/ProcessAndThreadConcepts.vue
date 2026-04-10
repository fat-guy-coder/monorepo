<template>
  <div class="concurrency-container">
    <header>
      <div class="header-content">
        <h1><i class="fas fa-microchip"></i> 并发与网络编程核心概念</h1>
        <p class="subtitle">深入理解竞态条件、线程锁、屏障、信号量和套接字</p>
      </div>
    </header>

    <div class="content-grid">
      <!-- 竞态条件 -->
      <section class="card race-condition">
        <div class="card-header">
          <div class="icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div>
            <h2>竞态条件 (Race Condition)</h2>
            <div class="tag">并发问题根源</div>
          </div>
        </div>

        <div class="card-body">
          <div class="concept">
            <h3><i class="fas fa-lightbulb"></i> 概念</h3>
            <p>
              当多个线程/进程访问共享资源，且执行结果取决于它们访问的特定顺序时发生的不确定行为。
            </p>
          </div>

          <div class="content-columns">
            <div class="column">
              <h3><i class="fas fa-cogs"></i> 作用</h3>
              <ul>
                <li>解释并发系统中的不确定性行为</li>
                <li>识别并发程序中的潜在问题</li>
                <li>理解同步机制的必要性</li>
              </ul>

              <div class="example">
                <h3><i class="fas fa-code"></i> 典型示例</h3>
                <div class="code-block">
                  <pre><code>// 共享资源
let balance = 100;

// 线程A
function withdraw(amount) {
  if (balance >= amount) {
    balance -= amount;
  }
}

// 线程B同时执行
withdraw(30); // 线程A
withdraw(50); // 线程B

// 可能结果：余额为负数</code></pre>
                </div>
              </div>
            </div>

            <div class="column">
              <h3><i class="fas fa-wrench"></i> 解决方案</h3>
              <ul>
                <li>使用互斥锁保护共享资源</li>
                <li>采用原子操作</li>
                <li>使用不可变数据结构</li>
                <li>设计无锁数据结构</li>
              </ul>

              <h3><i class="fas fa-map-marker-alt"></i> 适用场景</h3>
              <ul>
                <li>多线程共享资源访问</li>
                <li>分布式系统状态更新</li>
                <li>数据库事务并发控制</li>
                <li>文件系统操作</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 线程锁 -->
      <section class="card thread-lock">
        <div class="card-header">
          <div class="icon">
            <i class="fas fa-lock"></i>
          </div>
          <div>
            <h2>线程锁 (Mutex)</h2>
            <div class="tag">互斥访问</div>
          </div>
        </div>

        <div class="card-body">
          <div class="concept">
            <h3><i class="fas fa-lightbulb"></i> 概念</h3>
            <p>
              一种同步机制，用于防止多个线程同时访问共享资源，确保一次只有一个线程可以执行关键代码段。
            </p>
          </div>

          <div class="content-columns">
            <div class="column">
              <h3><i class="fas fa-cogs"></i> 作用</h3>
              <ul>
                <li>保护共享资源免受并发访问</li>
                <li>防止竞态条件</li>
                <li>确保数据一致性</li>
                <li>实现线程同步</li>
              </ul>

              <div class="example">
                <h3><i class="fas fa-code"></i> 使用示例 (Python)</h3>
                <div class="code-block">
                  <pre><code>import threading

lock = threading.Lock()
balance = 100

def safe_withdraw(amount):
    with lock:  # 自动获取和释放锁
        if balance >= amount:
            balance -= amount</code></pre>
                </div>
              </div>
            </div>

            <div class="column">
              <h3><i class="fas fa-sync-alt"></i> 工作流程</h3>
              <div class="workflow">
                <div class="step">
                  <div class="step-number">1</div>
                  <p>线程尝试获取锁</p>
                </div>
                <div class="arrow"><i class="fas fa-arrow-right"></i></div>
                <div class="step">
                  <div class="step-number">2</div>
                  <p>获取成功则执行关键区</p>
                </div>
                <div class="arrow"><i class="fas fa-arrow-right"></i></div>
                <div class="step">
                  <div class="step-number">3</div>
                  <p>执行完成后释放锁</p>
                </div>
                <div class="arrow"><i class="fas fa-arrow-right"></i></div>
                <div class="step">
                  <div class="step-number">4</div>
                  <p>其他线程可获取锁</p>
                </div>
              </div>

              <h3><i class="fas fa-map-marker-alt"></i> 适用场景</h3>
              <ul>
                <li>共享数据结构访问</li>
                <li>银行账户交易处理</li>
                <li>库存管理系统</li>
                <li>任何需要互斥访问的场景</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 屏障 -->
      <section class="card barrier">
        <div class="card-header">
          <div class="icon">
            <i class="fas fa-barrier"></i>
          </div>
          <div>
            <h2>屏障 (Barrier)</h2>
            <div class="tag">同步点</div>
          </div>
        </div>

        <div class="card-body">
          <div class="concept">
            <h3><i class="fas fa-lightbulb"></i> 概念</h3>
            <p>
              一种同步机制，要求多个线程在某个点等待，直到所有参与的线程都到达该点后才允许继续执行。
            </p>
          </div>

          <div class="content-columns">
            <div class="column">
              <h3><i class="fas fa-cogs"></i> 作用</h3>
              <ul>
                <li>协调多个线程的执行阶段</li>
                <li>确保所有线程完成特定阶段后再继续</li>
                <li>实现并行计算中的同步点</li>
                <li>简化分阶段算法的实现</li>
              </ul>

              <div class="example">
                <h3><i class="fas fa-code"></i> 使用示例 (Java)</h3>
                <div class="code-block">
                  <pre><code>CyclicBarrier barrier = new CyclicBarrier(3);

Runnable task = () -> {
    // 阶段1工作
    barrier.await(); // 等待所有线程

    // 阶段2工作
};

// 启动3个线程
new Thread(task).start();
new Thread(task).start();
new Thread(task).start();</code></pre>
                </div>
              </div>
            </div>

            <div class="column">
              <h3><i class="fas fa-project-diagram"></i> 工作流程</h3>
              <div class="diagram">
                <div class="thread">线程1 → 工作 → 到达屏障 → 等待</div>
                <div class="thread">线程2 → 工作 → 到达屏障 → 等待</div>
                <div class="thread">线程3 → 工作 → 到达屏障 → 等待</div>
                <div class="barrier-line">所有线程到达屏障</div>
                <div class="thread">线程1 → 继续执行</div>
                <div class="thread">线程2 → 继续执行</div>
                <div class="thread">线程3 → 继续执行</div>
              </div>

              <h3><i class="fas fa-map-marker-alt"></i> 适用场景</h3>
              <ul>
                <li>并行算法中的阶段同步</li>
                <li>多线程测试</li>
                <li>分布式计算</li>
                <li>模拟系统中的时间步进</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 信号量 -->
      <section class="card semaphore">
        <div class="card-header">
          <div class="icon">
            <i class="fas fa-traffic-light"></i>
          </div>
          <div>
            <h2>信号量 (Semaphore)</h2>
            <div class="tag">资源计数器</div>
          </div>
        </div>

        <div class="card-body">
          <div class="concept">
            <h3><i class="fas fa-lightbulb"></i> 概念</h3>
            <p>
              一种同步机制，使用计数器控制对共享资源的访问，允许多个线程同时访问资源池，但限制最大并发数量。
            </p>
          </div>

          <div class="content-columns">
            <div class="column">
              <h3><i class="fas fa-cogs"></i> 作用</h3>
              <ul>
                <li>限制对有限资源的并发访问</li>
                <li>实现生产者-消费者模式</li>
                <li>控制同时执行的线程数量</li>
                <li>解决多资源分配问题</li>
              </ul>

              <div class="operations">
                <h3><i class="fas fa-exchange-alt"></i> 核心操作</h3>
                <div class="op">
                  <div class="op-name">P操作 (wait)</div>
                  <p>减少信号量值，如果值小于0则阻塞</p>
                </div>
                <div class="op">
                  <div class="op-name">V操作 (signal)</div>
                  <p>增加信号量值，如果有线程阻塞则唤醒</p>
                </div>
              </div>
            </div>

            <div class="column">
              <h3><i class="fas fa-code"></i> 使用示例 (C#)</h3>
              <div class="code-block">
                <pre><code>SemaphoreSlim semaphore = new SemaphoreSlim(3); // 允许3个并发

async Task AccessResource()
{
    await semaphore.WaitAsync();
    try {
        // 访问受限资源
    } finally {
        semaphore.Release();
    }
}

// 多个任务同时调用AccessResource</code></pre>
              </div>

              <h3><i class="fas fa-map-marker-alt"></i> 适用场景</h3>
              <ul>
                <li>数据库连接池管理</li>
                <li>线程池任务调度</li>
                <li>限流和速率控制</li>
                <li>IO密集型操作并发控制</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 套接字 -->
      <section class="card socket">
        <div class="card-header">
          <div class="icon">
            <i class="fas fa-plug"></i>
          </div>
          <div>
            <h2>套接字 (Socket)</h2>
            <div class="tag">网络通信</div>
          </div>
        </div>

        <div class="card-body">
          <div class="concept">
            <h3><i class="fas fa-lightbulb"></i> 概念</h3>
            <p>
              网络通信的端点，提供不同主机间进程通信的接口，支持TCP、UDP等协议，是网络编程的基础。
            </p>
          </div>

          <div class="content-columns">
            <div class="column">
              <h3><i class="fas fa-cogs"></i> 作用</h3>
              <ul>
                <li>实现网络进程间通信</li>
                <li>构建客户端-服务器架构</li>
                <li>支持可靠(TCP)和不可靠(UDP)传输</li>
                <li>实现分布式系统通信</li>
              </ul>

              <h3><i class="fas fa-network-wired"></i> 通信模型</h3>
              <div class="com-model">
                <div class="server">
                  <h4>服务器端</h4>
                  <ol>
                    <li>创建套接字</li>
                    <li>绑定地址和端口</li>
                    <li>监听连接</li>
                    <li>接受连接</li>
                    <li>发送/接收数据</li>
                  </ol>
                </div>
                <div class="client">
                  <h4>客户端</h4>
                  <ol>
                    <li>创建套接字</li>
                    <li>连接服务器</li>
                    <li>发送/接收数据</li>
                  </ol>
                </div>
              </div>
            </div>

            <div class="column">
              <h3><i class="fas fa-code"></i> 使用示例 (Python)</h3>
              <div class="code-block">
                <pre><code># 服务器端
import socket
server = socket.socket()
server.bind(('localhost', 8080))
server.listen()
conn, addr = server.accept()
data = conn.recv(1024)
conn.send(b'Response')

# 客户端
client = socket.socket()
client.connect(('localhost', 8080))
client.send(b'Request')
response = client.recv(1024)</code></pre>
              </div>

              <h3><i class="fas fa-map-marker-alt"></i> 适用场景</h3>
              <ul>
                <li>Web服务器</li>
                <li>实时通信应用</li>
                <li>文件传输</li>
                <li>远程过程调用(RPC)</li>
                <li>物联网设备通信</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 对比总结 -->
      <section class="card comparison">
        <div class="card-header">
          <div class="icon">
            <i class="fas fa-balance-scale"></i>
          </div>
          <h2>并发机制对比</h2>
        </div>

        <div class="card-body">
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>机制</th>
                  <th>主要用途</th>
                  <th>关键特性</th>
                  <th>适用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>线程锁 (Mutex)</td>
                  <td>互斥访问</td>
                  <td>一次只允许一个线程访问</td>
                  <td>共享资源保护</td>
                </tr>
                <tr>
                  <td>信号量 (Semaphore)</td>
                  <td>资源计数</td>
                  <td>控制N个线程同时访问</td>
                  <td>连接池、限流</td>
                </tr>
                <tr>
                  <td>屏障 (Barrier)</td>
                  <td>同步点</td>
                  <td>所有线程到达后继续</td>
                  <td>并行计算阶段同步</td>
                </tr>
                <tr>
                  <td>套接字 (Socket)</td>
                  <td>网络通信</td>
                  <td>进程间网络通信</td>
                  <td>客户端-服务器架构</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="best-practices">
            <h3><i class="fas fa-star"></i> 最佳实践</h3>
            <ul>
              <li>优先使用高级并发工具（线程池、async/await）</li>
              <li>锁的粒度尽可能小，持有时间尽可能短</li>
              <li>避免嵌套锁，防止死锁</li>
              <li>使用超时机制防止永久阻塞</li>
              <li>网络通信中处理所有可能的异常</li>
            </ul>
          </div>

          <div class="conclusion">
            <h3><i class="fas fa-clipboard-check"></i> 总结</h3>
            <p>理解并发和网络编程的核心概念对于构建高效、可靠的软件系统至关重要：</p>
            <ul>
              <li>竞态条件是并发问题的根源，需要同步机制来解决</li>
              <li>线程锁提供互斥访问，保护共享资源</li>
              <li>屏障协调多个线程的执行阶段</li>
              <li>信号量控制对有限资源的并发访问</li>
              <li>套接字是实现网络通信的基础</li>
            </ul>
            <p>合理选择和组合这些机制，可以构建出高性能、高并发的分布式系统。</p>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <p>并发与网络编程核心概念 &copy; 2023 - 深入理解现代计算基础</p>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.concurrency-container {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #343a40;
  line-height: 1.6;
  padding: 20px;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
}

header {
  background: linear-gradient(135deg, #2c3e50 0%, #4a6582 100%);
  color: white;
  padding: 2rem 1rem;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  .header-content {
    max-width: 900px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    font-weight: 600;

    i {
      font-size: 2.2rem;
      color: #4db8ff;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 800px;
    margin: 0 auto;
    font-weight: 300;
    color: #e0e7ff;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  // 为不同卡片设置不同边框颜色
  &.race-condition {
    border-top: 4px solid #ff6b6b;
  }
  &.thread-lock {
    border-top: 4px solid #4db8ff;
  }
  &.barrier {
    border-top: 4px solid #51cf66;
  }
  &.semaphore {
    border-top: 4px solid #fcc419;
  }
  &.socket {
    border-top: 4px solid #cc5de8;
  }
  &.comparison {
    border-top: 4px solid #868e96;
  }
}

.card-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;

  .icon {
    width: 50px;
    height: 50px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    i {
      font-size: 1.5rem;
    }
  }

  h2 {
    font-size: 1.6rem;
    margin-bottom: 5px;
    color: #2d3748;
  }

  .tag {
    display: inline-block;
    background: #e9ecef;
    color: #495057;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }
}

.card-body {
  padding: 20px;
}

.concept {
  background: #f1f3f5;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 4px solid #4db8ff;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    color: #2d3748;
  }

  p {
    font-size: 1.05rem;
    line-height: 1.7;
  }
}

.content-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .column {
    h3 {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
      color: #2d3748;
      font-size: 1.2rem;

      i {
        color: #4db8ff;
      }
    }

    ul {
      padding-left: 25px;
      margin-bottom: 20px;

      li {
        margin-bottom: 8px;
        color: #495057;
      }
    }
  }
}

.example,
.operations {
  margin: 20px 0;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
}

.code-block {
  background: #e2e8f0;
  color: #2d3748;
  padding: 20px;
  border-radius: 8px;
  font-family: 'Source Code Pro', monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
  margin-top: 10px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);

  pre {
    margin: 0;
    white-space: pre-wrap;
  }

  code {
    font-family: 'Source Code Pro', monospace;
  }
}

.workflow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }

  .step {
    background: #f0f7ff;
    border: 1px solid #d0e0f0;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    flex: 1;
    max-width: 150px;

    @media (max-width: 768px) {
      max-width: 100%;
      width: 100%;
    }

    .step-number {
      width: 30px;
      height: 30px;
      background: #4db8ff;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin: 0 auto 10px;
    }

    p {
      font-size: 0.9rem;
      color: #4a5568;
    }
  }

  .arrow {
    color: #4db8ff;
    font-size: 1.5rem;
    padding: 0 5px;

    @media (max-width: 768px) {
      transform: rotate(90deg);
    }
  }
}

.diagram {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin: 20px 0;

  .thread {
    padding: 8px 0;
    border-bottom: 1px dashed #dee2e6;

    &:last-child {
      border-bottom: none;
    }
  }

  .barrier-line {
    text-align: center;
    padding: 10px;
    background: #e9f5ff;
    margin: 10px 0;
    font-weight: 500;
    border-radius: 4px;
  }
}

.com-model {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 20px 0;

  .server,
  .client {
    background: #f1f3f5;
    padding: 15px;
    border-radius: 8px;

    h4 {
      text-align: center;
      margin-bottom: 10px;
      color: #2d3748;
    }

    ol {
      padding-left: 20px;

      li {
        margin-bottom: 8px;
      }
    }
  }
}

.op {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 10px;
  border-left: 3px solid #4db8ff;

  .op-name {
    font-weight: 500;
    margin-bottom: 5px;
  }
}

.comparison-table {
  overflow-x: auto;
  margin: 25px 0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    min-width: 600px;

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #e9ecef;
    }

    th {
      background: #f1f3f5;
      color: #495057;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: #f8f9fa;
    }

    tr:hover {
      background: #e9f5ff;
    }
  }
}

.best-practices {
  background: #f0f7ff;
  padding: 20px;
  border-radius: 8px;
  margin: 25px 0;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    color: #2d3748;
  }

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 8px;
      color: #495057;
    }
  }
}

.conclusion {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    color: #2d3748;
  }

  p {
    margin-bottom: 15px;
    line-height: 1.7;
  }

  ul {
    padding-left: 25px;
    margin-bottom: 15px;

    li {
      margin-bottom: 10px;
    }
  }
}

footer {
  text-align: center;
  padding: 25px;
  background: white;
  color: #495057;
  font-size: 0.9rem;
  border-radius: 12px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
}

@media (max-width: 600px) {
  header h1 {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .card-header {
    flex-direction: column;
    text-align: center;

    .icon {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
}
</style>
