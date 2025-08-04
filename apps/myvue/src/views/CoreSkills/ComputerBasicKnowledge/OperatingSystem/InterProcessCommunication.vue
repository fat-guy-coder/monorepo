<template>
  <div class="ipc-container">
    <div class="header">
      <div class="logo">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24">
            <path
              d="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H20V6H4M8,8H16V10H8V8M8,11H16V13H8V11M8,14H16V16H8V14Z" />
          </svg>
        </div>
        <div class="logo-text">进程间通信详解</div>
      </div>
      <h1>深入理解进程间通信(IPC)机制</h1>
      <p class="subtitle">现代操作系统中进程协作的核心技术</p>
    </div>

    <div class="content">
      <!-- IPC概述 -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">📚</div>
          <h2>IPC概述</h2>
        </div>
        <div class="section-content">
          <div class="overview">
            <div class="overview-card">
              <div class="card-icon">🔒</div>
              <h3>什么是IPC</h3>
              <p>进程间通信(Inter-Process Communication, IPC)是指操作系统提供的，允许不同进程之间进行数据交换和通信的机制。</p>
            </div>
            <div class="overview-card">
              <div class="card-icon">⚙️</div>
              <h3>为什么需要IPC</h3>
              <p>进程拥有独立的内存空间，彼此隔离。IPC打破这种隔离，使进程能够协同工作，共享数据和资源。</p>
            </div>
            <div class="overview-card">
              <div class="card-icon">🌐</div>
              <h3>应用场景</h3>
              <ul>
                <li>微服务架构中的服务通信</li>
                <li>客户端-服务器模型</li>
                <li>进程间数据共享</li>
                <li>操作系统内核与用户进程通信</li>
              </ul>
            </div>
          </div>

          <div class="stats">
            <div class="stat-card">
              <div class="stat-value">6</div>
              <div class="stat-label">主要IPC机制</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">30+</div>
              <div class="stat-label">年IPC发展历程</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">99%</div>
              <div class="stat-label">现代系统使用率</div>
            </div>
          </div>

          <div class="ipc-architecture">
            <h3>IPC在操作系统中的位置</h3>
            <div class="architecture-diagram">
              <div class="os-layer">用户空间</div>
              <div class="ipc-methods">
                <div class="method">管道</div>
                <div class="method">消息队列</div>
                <div class="method">共享内存</div>
                <div class="method">信号量</div>
                <div class="method">信号</div>
                <div class="method">套接字</div>
              </div>
              <div class="os-layer">内核空间</div>
              <div class="arrow"></div>
              <div class="os-layer">硬件层</div>
            </div>
          </div>
        </div>
      </div>

      <!-- IPC核心机制 -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">🔧</div>
          <h2>IPC核心机制</h2>
        </div>
        <div class="section-content">
          <div class="ipc-tabs">
            <div class="tab-buttons">
              <button v-for="(method, index) in ipcMethods" :key="index" :class="{ active: activeTab === index }"
                @click="activeTab = index">
                {{ method.title }}
              </button>
            </div>

            <!-- 管道 -->
            <div class="tab-content" v-if="activeTab === 0">
              <div class="ipc-card">
                <h3>管道 (Pipe)</h3>
                <p class="description">单向通信通道，允许一个进程的输出作为另一个进程的输入。</p>

                <div class="ipc-details">
                  <div class="details-grid">
                    <div class="detail-item">
                      <div class="detail-label">工作方式</div>
                      <div class="detail-value">内核缓冲区实现的先进先出(FIFO)队列</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">通信方向</div>
                      <div class="detail-value">单向（半双工）</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">容量限制</div>
                      <div class="detail-value">通常为几KB到64KB</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">生命周期</div>
                      <div class="detail-value">随进程结束而销毁</div>
                    </div>
                  </div>

                  <div class="visualization">
                    <div class="process">进程A</div>
                    <div class="pipe-direction">--[写入]--></div>
                    <div class="pipe">管道缓冲区</div>
                    <div class="pipe-direction">--[读取]--></div>
                    <div class="process">进程B</div>
                  </div>

                  <h4>使用场景</h4>
                  <ul>
                    <li>命令行中的管道操作：<code>ls | grep "txt"</code></li>
                    <li>父子进程间通信</li>
                    <li>简单的数据流处理</li>
                  </ul>

                  <h4>代码示例（C语言）</h4>
                  <div class="code-block">
                    <pre>#include &lt;unistd.h&gt;

int main() {
  int fd[2];
  pipe(fd);  // 创建管道

  if (fork() == 0) {  // 子进程
    close(fd[0]);     // 关闭读端
    write(fd[1], "Hello", 6);
    close(fd[1]);
  } else {            // 父进程
    close(fd[1]);     // 关闭写端
    char buf[6];
    read(fd[0], buf, 6);
    printf("Received: %s\n", buf);
    close(fd[0]);
  }
}</pre>
                  </div>
                </div>

                <div class="pros-cons">
                  <div class="pros">
                    <h4>✅ 优点</h4>
                    <ul>
                      <li>简单易用</li>
                      <li>无需考虑同步问题</li>
                      <li>所有Unix-like系统都支持</li>
                    </ul>
                  </div>
                  <div class="cons">
                    <h4>❌ 缺点</h4>
                    <ul>
                      <li>只能用于有亲缘关系的进程</li>
                      <li>单向通信</li>
                      <li>缓冲区大小有限</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- 消息队列 -->
            <div class="tab-content" v-if="activeTab === 1">
              <div class="ipc-card">
                <h3>消息队列 (Message Queue)</h3>
                <p class="description">消息的链表结构，存储在内核中，进程可以向队列中添加消息或从中读取消息。</p>

                <div class="ipc-details">
                  <div class="details-grid">
                    <div class="detail-item">
                      <div class="detail-label">工作方式</div>
                      <div class="detail-value">内核维护的消息链表</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">消息类型</div>
                      <div class="detail-value">每个消息有类型标识符</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">容量限制</div>
                      <div class="detail-value">系统级限制（通常几MB）</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">生命周期</div>
                      <div class="detail-value">显式删除或系统重启</div>
                    </div>
                  </div>

                  <div class="visualization">
                    <div class="process">进程A</div>
                    <div class="pipe-direction">--[发送]--></div>
                    <div class="msg-queue">
                      <div class="msg">消息1 (类型:10)</div>
                      <div class="msg">消息2 (类型:20)</div>
                      <div class="msg">消息3 (类型:10)</div>
                    </div>
                    <div class="pipe-direction">--[接收]--></div>
                    <div class="process">进程B</div>
                  </div>

                  <h4>使用场景</h4>
                  <ul>
                    <li>异步通信系统</li>
                    <li>多对多进程通信</li>
                    <li>需要按优先级处理消息的场景</li>
                  </ul>

                  <h4>代码示例（C语言）</h4>
                  <div class="code-block">
                    <pre>#include &lt;sys/msg.h&gt;

struct msg_buffer {
  long msg_type;
  char msg_text[100];
};

int main() {
  key_t key = ftok("progfile", 65);
  int msgid = msgget(key, 0666 | IPC_CREAT);

  // 发送消息
  struct msg_buffer message = {1, "Hello Message Queue"};
  msgsnd(msgid, &message, sizeof(message), 0);

  // 接收消息
  msgrcv(msgid, &message, sizeof(message), 1, 0);
  printf("Received: %s\n", message.msg_text);

  msgctl(msgid, IPC_RMID, NULL); // 删除队列
}</pre>
                  </div>
                </div>

                <div class="pros-cons">
                  <div class="pros">
                    <h4>✅ 优点</h4>
                    <ul>
                      <li>支持消息类型和优先级</li>
                      <li>异步通信</li>
                      <li>独立于进程存在</li>
                    </ul>
                  </div>
                  <div class="cons">
                    <h4>❌ 缺点</h4>
                    <ul>
                      <li>系统资源有限制</li>
                      <li>需要序列化/反序列化</li>
                      <li>内核空间到用户空间的数据复制开销</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- 共享内存 -->
            <div class="tab-content" v-if="activeTab === 2">
              <div class="ipc-card">
                <h3>共享内存 (Shared Memory)</h3>
                <p class="description">多个进程共享同一块物理内存区域，是最快的IPC方式。</p>

                <div class="ipc-details">
                  <div class="details-grid">
                    <div class="detail-item">
                      <div class="detail-label">工作方式</div>
                      <div class="detail-value">将同一物理内存映射到不同进程的虚拟地址空间</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">同步机制</div>
                      <div class="detail-value">需要信号量等同步机制</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">速度</div>
                      <div class="detail-value">最快（无数据复制）</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">生命周期</div>
                      <div class="detail-value">显式删除或系统重启</div>
                    </div>
                  </div>

                  <div class="visualization">
                    <div class="process-box">
                      <div class="process">进程A</div>
                      <div class="memory">虚拟内存空间</div>
                    </div>
                    <div class="shared-area">
                      <div class="shared-mem">共享内存区域</div>
                      <div class="arrow-up">↑</div>
                      <div class="arrow-down">↓</div>
                    </div>
                    <div class="process-box">
                      <div class="process">进程B</div>
                      <div class="memory">虚拟内存空间</div>
                    </div>
                  </div>

                  <h4>使用场景</h4>
                  <ul>
                    <li>高性能计算</li>
                    <li>大型数据处理</li>
                    <li>数据库缓存共享</li>
                    <li>实时系统</li>
                  </ul>

                  <h4>代码示例（C语言）</h4>
                  <div class="code-block">
                    <pre>#include &lt;sys/shm.h&gt;

int main() {
  key_t key = ftok("shmfile", 65);
  int shmid = shmget(key, 1024, 0666 | IPC_CREAT);

  // 附加到共享内存
  char *str = (char*)shmat(shmid, (void*)0, 0);

  // 进程A写入数据
  strcpy(str, "Hello Shared Memory");

  // 进程B读取数据
  printf("Data read: %s\n", str);

  // 分离共享内存
  shmdt(str);
  shmctl(shmid, IPC_RMID, NULL); // 删除共享内存
}</pre>
                  </div>
                </div>

                <div class="pros-cons">
                  <div class="pros">
                    <h4>✅ 优点</h4>
                    <ul>
                      <li>速度最快（无数据复制）</li>
                      <li>适合大数据量传输</li>
                      <li>自然的数据共享方式</li>
                    </ul>
                  </div>
                  <div class="cons">
                    <h4>❌ 缺点</h4>
                    <ul>
                      <li>需要额外的同步机制</li>
                      <li>复杂的内存管理</li>
                      <li>安全性问题（数据暴露）</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 其他IPC方式 -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">📌</div>
          <h2>其他IPC方式</h2>
        </div>
        <div class="section-content">
          <div class="other-ipc-grid">
            <div class="ipc-card">
              <h3><i class="icon">🔔</i> 信号 (Signal)</h3>
              <p>异步通知机制，用于通知进程发生了某种事件。</p>
              <div class="detail-item">
                <div class="detail-label">使用场景</div>
                <div class="detail-value">中断处理、进程终止通知</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">常见信号</div>
                <div class="detail-value">SIGINT(2), SIGKILL(9), SIGSEGV(11)</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">缺点</div>
                <div class="detail-value">信息量小，不能传递数据</div>
              </div>
            </div>

            <div class="ipc-card">
              <h3><i class="icon">🚦</i> 信号量 (Semaphore)</h3>
              <p>计数器，用于控制多个进程对共享资源的访问。</p>
              <div class="detail-item">
                <div class="detail-label">使用场景</div>
                <div class="detail-value">进程同步、临界区保护</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">操作</div>
                <div class="detail-value">P(等待) / V(发送)操作</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">缺点</div>
                <div class="detail-value">只能传递信号，不能传递数据</div>
              </div>
            </div>

            <div class="ipc-card">
              <h3><i class="icon">🌐</i> 套接字 (Socket)</h3>
              <p>网络通信接口，可用于不同主机的进程间通信。</p>
              <div class="detail-item">
                <div class="detail-label">使用场景</div>
                <div class="detail-value">网络通信、分布式系统</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">类型</div>
                <div class="detail-value">TCP/IP, UDP, Unix域套接字</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">缺点</div>
                <div class="detail-value">通信开销较大</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- IPC比较 -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">📊</div>
          <h2>IPC机制比较</h2>
        </div>
        <div class="section-content">
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>机制</th>
                  <th>速度</th>
                  <th>复杂性</th>
                  <th>适用范围</th>
                  <th>数据量</th>
                  <th>同步/异步</th>
                  <th>亲缘关系</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>管道</td>
                  <td>中</td>
                  <td>低</td>
                  <td>父子进程</td>
                  <td>小</td>
                  <td>同步</td>
                  <td>需要</td>
                </tr>
                <tr>
                  <td>消息队列</td>
                  <td>中</td>
                  <td>中</td>
                  <td>任意进程</td>
                  <td>中</td>
                  <td>异步</td>
                  <td>不需要</td>
                </tr>
                <tr>
                  <td>共享内存</td>
                  <td>高</td>
                  <td>高</td>
                  <td>任意进程</td>
                  <td>大</td>
                  <td>同步</td>
                  <td>不需要</td>
                </tr>
                <tr>
                  <td>信号</td>
                  <td>高</td>
                  <td>低</td>
                  <td>任意进程</td>
                  <td>无</td>
                  <td>异步</td>
                  <td>不需要</td>
                </tr>
                <tr>
                  <td>信号量</td>
                  <td>高</td>
                  <td>中</td>
                  <td>任意进程</td>
                  <td>无</td>
                  <td>同步</td>
                  <td>不需要</td>
                </tr>
                <tr>
                  <td>套接字</td>
                  <td>低</td>
                  <td>高</td>
                  <td>跨主机</td>
                  <td>大</td>
                  <td>异步</td>
                  <td>不需要</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="selection-guide">
            <h3>IPC选择指南</h3>
            <ul>
              <li><strong>性能优先</strong> → 共享内存</li>
              <li><strong>简单通信</strong> → 管道或信号</li>
              <li><strong>进程同步</strong> → 信号量</li>
              <li><strong>网络通信</strong> → 套接字</li>
              <li><strong>异步处理</strong> → 消息队列</li>
              <li><strong>大数据传输</strong> → 共享内存或套接字</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>进程间通信(IPC)是现代操作系统核心概念 | 理解IPC对开发高性能、可靠系统至关重要</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(0);

const ipcMethods = [
  { title: '管道' },
  { title: '消息队列' },
  { title: '共享内存' },
  { title: '信号量' },
  { title: '信号' },
  { title: '套接字' }
];
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #e74c3c;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@text-color: #34495e;
@light-text: #7f8c8d;
@code-bg: #2d3748;
@success-color: #2ecc71;
@warning-color: #f39c12;

.ipc-container {
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: @light-bg;
  color: @text-color;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
  line-height: 1.6;
}

.header {
  text-align: center;
  padding: 2rem 1rem;
  margin-bottom: 1.5rem;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    .logo-icon {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, @primary-color, darken(@primary-color, 10%));
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 32px;
        height: 32px;
        fill: white;
      }
    }

    .logo-text {
      font-size: 1.8rem;
      font-weight: 700;
      color: @secondary-color;
    }
  }

  h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    color: @secondary-color;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @light-text;
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  margin-bottom: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.04);
  overflow: hidden;

  .section-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1.2rem 1.5rem;
    background: rgba(@primary-color, 0.05);
    border-bottom: 1px solid @border-color;

    .section-icon {
      font-size: 1.5rem;
      color: @primary-color;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      color: @text-color;
    }
  }

  .section-content {
    padding: 1.5rem;
  }
}

// 概述部分
.overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .overview-card {
    background: rgba(@primary-color, 0.03);
    border: 1px solid fade(@primary-color, 15%);
    border-radius: 12px;
    padding: 1.5rem;

    .card-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: @primary-color;
      text-align: center;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @secondary-color;
      text-align: center;
    }

    p,
    ul {
      margin: 0;
      color: @light-text;
      line-height: 1.6;
      font-size: 0.95rem;
    }

    ul {
      padding-left: 1.2rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;

  .stat-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 1.2rem;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 0.3rem;
    }

    .stat-label {
      font-size: 0.95rem;
      color: @light-text;
    }
  }
}

.ipc-architecture {
  background: rgba(@accent-color, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1.2rem;
    text-align: center;
    color: @accent-color;
  }

  .architecture-diagram {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .os-layer {
      background: @primary-color;
      color: white;
      padding: 0.8rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      width: 100%;
      text-align: center;
    }

    .ipc-methods {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.8rem;
      width: 100%;
      margin: 0.5rem 0;

      .method {
        background: lighten(@primary-color, 40%);
        border: 1px solid @primary-color;
        border-radius: 20px;
        padding: 0.4rem 1.2rem;
        font-size: 0.9rem;
      }
    }

    .arrow {
      width: 80%;
      height: 20px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        background: @light-text;
        top: 50%;
        transform: translateY(-50%);
      }

      &::after {
        content: "▼";
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        color: @light-text;
      }
    }
  }
}

// IPC核心机制
.ipc-tabs {
  .tab-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;

    button {
      padding: 0.8rem 1.5rem;
      border: none;
      background: @card-bg;
      border: 1px solid @border-color;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      font-size: 0.95rem;

      &:hover {
        background: rgba(@primary-color, 0.05);
      }

      &.active {
        background: @primary-color;
        color: white;
        border-color: @primary-color;
      }
    }
  }

  .ipc-card {
    border: 1px solid @border-color;
    border-radius: 12px;
    padding: 1.5rem;
    background: @card-bg;

    h3 {
      margin-top: 0;
      margin-bottom: 0.8rem;
      color: @secondary-color;
    }

    .description {
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: @light-text;
      font-size: 1.1rem;
    }
  }

  .ipc-details {
    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.2rem;
      margin-bottom: 1.5rem;

      .detail-item {
        background: rgba(@primary-color, 0.05);
        border-radius: 8px;
        padding: 1rem;

        .detail-label {
          font-weight: 600;
          color: @primary-color;
          margin-bottom: 0.3rem;
        }

        .detail-value {
          color: @text-color;
          font-size: 0.95rem;
        }
      }
    }

    .visualization {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin: 2rem 0;
      flex-wrap: wrap;

      .process,
      .process-box {
        background: rgba(@primary-color, 0.1);
        border: 1px solid @primary-color;
        border-radius: 8px;
        padding: 1rem;
        min-width: 120px;
        text-align: center;
        font-weight: 600;
      }

      .memory {
        margin-top: 0.5rem;
        font-size: 0.85rem;
        color: @light-text;
      }

      .shared-area {
        display: flex;
        flex-direction: column;
        align-items: center;

        .shared-mem {
          background: rgba(@accent-color, 0.1);
          border: 1px solid @accent-color;
          border-radius: 8px;
          padding: 1.5rem;
          min-width: 180px;
          text-align: center;
          font-weight: 600;
        }

        .arrow-up,
        .arrow-down {
          margin: 0.5rem 0;
          color: @light-text;
          font-size: 1.2rem;
        }
      }

      .pipe {
        background: rgba(@success-color, 0.1);
        border: 1px solid @success-color;
        border-radius: 8px;
        padding: 1rem 1.5rem;
        min-width: 150px;
        text-align: center;
      }

      .msg-queue {
        background: rgba(@warning-color, 0.1);
        border: 1px solid @warning-color;
        border-radius: 8px;
        padding: 0.8rem;
        min-width: 180px;

        .msg {
          background: white;
          border: 1px solid @border-color;
          border-radius: 4px;
          padding: 0.5rem;
          margin: 0.3rem 0;
          font-size: 0.9rem;
        }
      }

      .pipe-direction {
        color: @light-text;
        font-size: 0.9rem;
      }
    }

    h4 {
      margin-top: 0;
      margin-bottom: 0.8rem;
      color: @secondary-color;
      font-size: 1.1rem;
    }

    ul {
      padding-left: 1.5rem;
      margin-bottom: 1.5rem;

      li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
      }
    }
  }

  .code-block {
    background: @code-bg;
    border-radius: 8px;
    padding: 1.2rem;
    margin: 1.2rem 0;
    overflow-x: auto;

    pre {
      color: #e2e8f0;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
      margin: 0;
    }
  }

  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-top: 1.5rem;

    .pros,
    .cons {
      border-radius: 8px;
      padding: 1.2rem;
    }

    .pros {
      background: rgba(@success-color, 0.05);
      border: 1px solid fade(@success-color, 30%);

      h4 {
        color: darken(@success-color, 10%);
      }
    }

    .cons {
      background: rgba(@accent-color, 0.05);
      border: 1px solid fade(@accent-color, 30%);

      h4 {
        color: darken(@accent-color, 10%);
      }
    }

    ul {
      padding-left: 1.2rem;
      margin-bottom: 0;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
}

// 其他IPC方式
.other-ipc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .ipc-card {
    border: 1px solid @border-color;
    border-radius: 12px;
    padding: 1.5rem;
    background: @card-bg;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: @secondary-color;

      .icon {
        font-size: 1.4rem;
      }
    }

    p {
      margin-top: 0;
      margin-bottom: 1.2rem;
      color: @light-text;
    }

    .detail-item {
      margin-bottom: 0.8rem;

      .detail-label {
        font-weight: 600;
        color: @primary-color;
        margin-bottom: 0.2rem;
      }

      .detail-value {
        color: @text-color;
        font-size: 0.95rem;
      }
    }
  }
}

// 比较表格
.comparison-table {
  overflow-x: auto;
  margin-bottom: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    th,
    td {
      padding: 1rem;
      text-align: center;
      border: 1px solid @border-color;
    }

    th {
      background: @primary-color;
      color: white;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background-color: rgba(@primary-color, 0.05);
    }

    tr:hover {
      background-color: rgba(@primary-color, 0.1);
    }
  }
}

.selection-guide {
  background: rgba(@warning-color, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid @warning-color;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: darken(@warning-color, 10%);
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.5;

      strong {
        color: @primary-color;
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid @border-color;
  color: @light-text;
  font-size: 0.95rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .header {
    padding: 1.5rem 0.5rem;

    .logo {
      .logo-text {
        font-size: 1.4rem;
      }
    }

    h1 {
      font-size: 1.8rem;
    }
  }

  .pros-cons {
    grid-template-columns: 1fr !important;
  }

  .architecture-diagram {
    .ipc-methods {
      .method {
        font-size: 0.8rem !important;
        padding: 0.3rem 0.8rem !important;
      }
    }
  }
}

@media (max-width: 480px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .overview {
    grid-template-columns: 1fr;
  }

  .visualization {
    flex-direction: column !important;
  }
}
</style>
