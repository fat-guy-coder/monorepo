<template>
  <div class="concurrency-container">
    <header class="hero">
      <h1 class="title">⚡ Python 并发与异步编程</h1>
      <p class="subtitle">线程 · 进程 · 异步IO · 同步原语 · 协程</p>
      <div class="badge-row">
        <span class="badge">🧵 threading</span>
        <span class="badge">⚙️ multiprocessing</span>
        <span class="badge">🌀 asyncio</span>
        <span class="badge">🔒 锁 & 队列</span>
      </div>
    </header>

    <!-- 关键概念卡片网格 -->
    <div class="cards-grid">
      <article v-for="topic in concurrencyTopics" :key="topic.id" class="topic-card">
        <div class="card-header">
          <span class="card-icon">{{ topic.icon }}</span>
          <h2 class="card-title">{{ topic.title }}</h2>
        </div>
        <p class="card-description">{{ topic.description }}</p>
        <div class="code-block">
          <pre><code>{{ topic.code }}</code></pre>
        </div>
        <div class="card-footer">
          <span class="tag">{{ topic.tag }}</span>
        </div>
      </article>
    </div>

    <!-- GIL 说明与对比表格 -->
    <div class="insight-panel">
      <div class="gil-card">
        <h3>🧠 GIL（全局解释器锁）</h3>
        <p>CPython 的 GIL 使得同一时刻只有一个线程执行 Python 字节码，因此 <strong>CPU密集型</strong> 任务多线程无法加速，但 <strong>IO密集型</strong>
          任务仍可提升效率。解决方案：<code>multiprocessing</code> 或异步编程。</p>
      </div>
      <div class="comparison">
        <h3>📊 如何选择？</h3>
        <table>
          <thead>
            <tr>
              <th>场景</th>
              <th>推荐方案</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CPU 密集型（计算）</td>
              <td>multiprocessing / ProcessPoolExecutor</td>
            </tr>
            <tr>
              <td>IO 密集型（网络、文件）</td>
              <td>asyncio / threading / ThreadPoolExecutor</td>
            </tr>
            <tr>
              <td>高并发 Web 服务</td>
              <td>asyncio + aiohttp / FastAPI</td>
            </tr>
            <tr>
              <td>简单并发任务</td>
              <td>concurrent.futures</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <footer class="footer">
      <p>✨ 合理利用并发与异步，写出高性能 Python 程序</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface ConcurrencyTopic {
  id: string;
  icon: string;
  title: string;
  description: string;
  code: string;
  tag: string;
}

const concurrencyTopics: ConcurrencyTopic[] = [
  {
    id: 'threading',
    icon: '🧵',
    title: '多线程 (threading)',
    description: '适用于 IO 密集型任务，共享内存但受 GIL 限制。通过 Thread 和锁来避免竞态条件。',
    code: `import threading
import time

def worker(name):
    print(f"线程 {name} 启动")
    time.sleep(1)
    print(f"线程 {name} 结束")

threads = []
for i in range(3):
    t = threading.Thread(target=worker, args=(i,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

# 使用锁保护共享资源
lock = threading.Lock()
counter = 0
def safe_increment():
    global counter
    for _ in range(1000):
        with lock:
            counter += 1`,
    tag: 'IO 密集型 | 共享内存'
  },
  {
    id: 'multiprocessing',
    icon: '⚙️',
    title: '多进程 (multiprocessing)',
    description: '绕过 GIL，利用多核 CPU，每个进程独立内存空间，通过 Queue/Pipe 通信。',
    code: `from multiprocessing import Process, Queue
import os

def square_worker(numbers, queue):
    result = [n * n for n in numbers]
    queue.put(result)

if __name__ == '__main__':
    data = [1, 2, 3, 4, 5]
    q = Queue()
    p = Process(target=square_worker, args=(data, q))
    p.start()
    result = q.get()
    p.join()
    print(f"结果: {result} 进程ID: {os.getpid()}")`,
    tag: 'CPU 密集型 | 多核并行'
  },
  {
    id: 'asyncio',
    icon: '🌀',
    title: '异步IO (asyncio)',
    description: '单线程并发，基于事件循环和协程，适合高 IO 并发任务（如网络爬虫、Web 服务器）。',
    code: `import asyncio

async def fetch_data(delay, name):
    print(f"开始获取 {name}")
    await asyncio.sleep(delay)
    print(f"完成 {name}")
    return f"{name} 数据"

async def main():
    tasks = [
        fetch_data(2, "API-1"),
        fetch_data(1, "API-2"),
    ]
    results = await asyncio.gather(*tasks)
    print(results)

# 运行事件循环
asyncio.run(main())`,
    tag: 'async/await | 高并发 IO'
  },
  {
    id: 'futures',
    icon: '📦',
    title: 'concurrent.futures',
    description: '高级线程池/进程池接口，简化并发任务提交和结果获取。',
    code: `from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
import time

def task(n):
    time.sleep(1)
    return n * n

# 线程池 (IO密集)
with ThreadPoolExecutor(max_workers=4) as executor:
    futures = [executor.submit(task, i) for i in range(5)]
    results = [f.result() for f in futures]
    print(results)  # [0,1,4,9,16]

# 进程池 (CPU密集)
with ProcessPoolExecutor(max_workers=2) as proc_exec:
    results = list(proc_exec.map(task, range(5)))`,
    tag: '线程池/进程池 | 高层封装'
  },
  {
    id: 'locks-queues',
    icon: '🔒',
    title: '同步原语 · 队列',
    description: '锁（Lock）、RLock、信号量（Semaphore）、事件（Event）、线程安全队列（Queue）用于协调并发。',
    code: `import threading
from queue import Queue

def producer(q, lock):
    for i in range(5):
        with lock:
            q.put(i)
            print(f"生产 {i}")

def consumer(q, lock):
    while True:
        with lock:
            try:
                item = q.get_nowait()
                print(f"消费 {item}")
            except:
                break

q = Queue()
lock = threading.Lock()
t1 = threading.Thread(target=producer, args=(q, lock))
t2 = threading.Thread(target=consumer, args=(q, lock))
t1.start(); t2.start()
t1.join(); t2.join()`,
    tag: '线程安全 | 协调机制'
  },
  {
    id: 'async-streams',
    icon: '🌊',
    title: '异步流与同步代码整合',
    description: '使用 run_in_executor 在异步中调用阻塞函数，或利用 asyncio.to_thread 避免阻塞事件循环。',
    code: `import asyncio
import time

def blocking_io():
    time.sleep(2)
    return "阻塞结果"

async def main():
    loop = asyncio.get_running_loop()
    # 在默认线程池中运行阻塞函数
    result = await loop.run_in_executor(None, blocking_io)
    # 或使用 asyncio.to_thread (Python 3.9+)
    # result = await asyncio.to_thread(blocking_io)
    print(result)

asyncio.run(main())`,
    tag: '混合异步/同步 | 非阻塞'
  }
];
</script>

<style lang="less" scoped>
@bg-page: #f9fafb;
@card-white: #ffffff;
@primary-dark: #0f172a;
@accent: #6366f1; // 靛蓝调
@text-secondary: #475569;
@border-light: #eef2f6;
@code-bg: #1e1e2f;
@code-fg: #f8f8f2;

.concurrency-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: @bg-page;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: @primary-dark;
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, @primary-dark, @accent);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.1rem;
    color: @text-secondary;
    margin-bottom: 1rem;
  }

  .badge-row {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    flex-wrap: wrap;

    .badge {
      background: #eef2ff;
      color: @accent;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 1rem;
      border-radius: 2rem;
    }
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.8rem;
  margin-bottom: 2.5rem;
}

.topic-card {
  background: @card-white;
  border-radius: 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  border: 1px solid @border-light;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.2rem 1.5rem 0rem 1.5rem;
  border-bottom: 2px solid #f1f5f9;

  .card-icon {
    font-size: 2rem;
  }

  .card-title {
    font-size: 1.35rem;
    font-weight: 600;
    color: @primary-dark;
    margin: 0;
  }
}

.card-description {
  padding: 0.8rem 1.5rem 0.2rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: @text-secondary;
}

.code-block {
  background: @code-bg;
  margin: 0.8rem 1rem 1rem 1rem;
  border-radius: 1rem;
  overflow-x: auto;
  font-size: 0.75rem;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;

  pre {
    margin: 0;
    padding: 1rem;
    white-space: pre-wrap;
    word-break: break-word;
  }

  code {
    color: @code-fg;
  }
}

.card-footer {
  padding: 0.5rem 1.5rem 1.2rem;
  margin-top: auto;

  .tag {
    background: #f1f5f9;
    padding: 0.2rem 0.8rem;
    border-radius: 2rem;
    font-size: 0.7rem;
    font-weight: 500;
    color: #334155;
  }
}

.insight-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.8rem;
  margin-bottom: 2rem;

  .gil-card,
  .comparison {
    background: @card-white;
    border-radius: 1.25rem;
    padding: 1.2rem 1.5rem;
    border: 1px solid @border-light;

    h3 {
      margin-top: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: @primary-dark;
      border-left: 4px solid @accent;
      padding-left: 0.75rem;
    }

    p {
      color: @text-secondary;
      line-height: 1.5;
      font-size: 0.9rem;

      code {
        background: #eef2ff;
        padding: 0.1rem 0.3rem;
        border-radius: 6px;
        color: @accent;
      }
    }
  }

  .comparison table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;

    th,
    td {
      text-align: left;
      padding: 0.5rem 0.25rem;
      border-bottom: 1px solid @border-light;
    }

    th {
      font-weight: 600;
      color: @primary-dark;
    }

    td {
      color: @text-secondary;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 1rem;
  padding-top: 1.2rem;
  border-top: 1px solid #e2e8f0;
  color: #5b6e8c;
  font-size: 0.85rem;
}

@media (max-width: 720px) {
  .concurrency-container {
    padding: 1rem;
  }

  .hero .title {
    font-size: 1.8rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .insight-panel {
    grid-template-columns: 1fr;
  }
}
</style>
