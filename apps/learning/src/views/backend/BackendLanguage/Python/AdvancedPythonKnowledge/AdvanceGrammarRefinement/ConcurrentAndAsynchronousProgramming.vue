<template>
  <div class="concurrency-container">
    <!-- ===== Hero ===== -->
    <header class="hero">
      <h1 class="title">⚡ Python 并发与异步编程</h1>
      <p class="subtitle">线程 · 进程 · 异步IO · 协程 · 同步原语 · 并发模式</p>
      <div class="badge-row">
        <span class="badge">🧵 threading</span>
        <span class="badge">⚙️ multiprocessing</span>
        <span class="badge">🌀 asyncio</span>
        <span class="badge">🔒 锁 & 队列</span>
        <span class="badge">📦 concurrent.futures</span>
        <span class="badge">🌊 异步流</span>
      </div>
    </header>

    <!-- ===== 核心理念速览 ===== -->
    <section class="overview-banner">
      <div class="overview-item" v-for="ov in overviews" :key="ov.label">
        <span class="ov-icon">{{ ov.icon }}</span>
        <strong>{{ ov.label }}</strong>
        <p>{{ ov.text }}</p>
      </div>
    </section>

    <!-- ===== 主题卡片网格 ===== -->
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
          <span class="tag" v-for="t in topic.tags" :key="t">{{ t }}</span>
        </div>
      </article>
    </div>

    <!-- ===== GIL 深入解析 ===== -->
    <section class="insight-panel">
      <div class="gil-card">
        <h3>🧠 GIL（全局解释器锁）深入理解</h3>
        <div class="gil-content">
          <p><strong>GIL 是什么？</strong>CPython 解释器中的一把互斥锁，确保同一时刻<em>只有一个线程执行 Python 字节码</em>。这意味着即使在多核 CPU 上，纯 Python 多线程也无法并行执行计算任务。</p>
          <p><strong>为什么存在？</strong>CPython 的内存管理（引用计数）不是线程安全的。GIL 是最简单高效的解决方案——避免了为每个对象加细粒度锁带来的性能开销和死锁风险。</p>
          <p><strong>什么时候释放 GIL？</strong></p>
          <ul>
            <li>🔓 <strong>IO 操作时</strong>：文件读写、网络请求、sleep——这些操作会释放 GIL，让其他线程有机会运行。</li>
            <li>🔓 <strong>C 扩展中</strong>：像 NumPy 这样的 C 扩展可以主动释放 GIL 来做真正的并行计算。</li>
            <li>🔓 <strong>Python 3.9+ 的 <code>time.sleep(0)</code></strong> 也可以作为显式切换点。</li>
          </ul>
          <p><strong>Python 3.13 的变化：</strong>引入了 <code>--disable-gil</code> 编译选项（PEP 703），允许在无 GIL 模式下运行，但这是可选特性，默认仍开启。</p>
        </div>
      </div>
      <div class="comparison">
        <h3>📊 场景选型速查表</h3>
        <table>
          <thead>
            <tr><th>场景</th><th>推荐方案</th><th>原因</th></tr>
          </thead>
          <tbody>
            <tr><td>CPU 密集型（计算）</td><td><code>multiprocessing</code></td><td>绕过 GIL，利用多核</td></tr>
            <tr><td>IO 密集型（网络/文件）</td><td><code>asyncio</code> / <code>threading</code></td><td>IO 等待时释放 GIL</td></tr>
            <tr><td>高并发 Web 服务</td><td><code>asyncio</code> + aiohttp / FastAPI</td><td>单线程高并发，低开销</td></tr>
            <tr><td>简单并发任务</td><td><code>concurrent.futures</code></td><td>接口简洁，易维护</td></tr>
            <tr><td>混合同步/异步</td><td><code>run_in_executor</code></td><td>桥接两种模型</td></tr>
            <tr><td>数据并行（科学计算）</td><td><code>multiprocessing.Pool</code> / Ray</td><td>真正多核并行</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===== 并发模式速查 ===== -->
    <section class="patterns-section">
      <h2>🔁 常见并发模式速查</h2>
      <div class="patterns-grid">
        <div class="pattern-card" v-for="pat in patterns" :key="pat.name">
          <h4>{{ pat.name }}</h4>
          <p class="pat-desc">{{ pat.desc }}</p>
          <pre class="pat-code"><code>{{ pat.code }}</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 常见陷阱与最佳实践 ===== -->
    <section class="best-practices">
      <h2>⚠️ 常见陷阱 & 最佳实践</h2>
      <div class="bp-grid">
        <div class="bp-card" v-for="bp in bestPractices" :key="bp.title">
          <div class="bp-header">
            <span class="bp-icon">{{ bp.icon }}</span>
            <h4>{{ bp.title }}</h4>
          </div>
          <p>{{ bp.desc }}</p>
          <pre v-if="bp.code" class="bp-code"><code>{{ bp.code }}</code></pre>
        </div>
      </div>
    </section>

    <!-- ===== 调试与性能分析 ===== -->
    <section class="debug-section">
      <h2>🔍 调试与性能分析技巧</h2>
      <div class="debug-content">
        <div class="debug-card" v-for="tip in debugTips" :key="tip.title">
          <h4>{{ tip.title }}</h4>
          <p>{{ tip.desc }}</p>
          <pre v-if="tip.code"><code>{{ tip.code }}</code></pre>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>✨ 并发编程的核心是<strong>理解你的任务类型</strong>——选对模型比优化更重要。IO 密集优先 asyncio，CPU 密集优先 multiprocessing。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// ================================================================
// 类型定义
// ================================================================
interface ConcurrencyTopic {
  id: string;
  icon: string;
  title: string;
  description: string;
  code: string;
  tags: string[];
}

interface Pattern {
  name: string;
  desc: string;
  code: string;
}

interface BestPractice {
  icon: string;
  title: string;
  desc: string;
  code?: string;
}

// ================================================================
// 核心理念速览
// ================================================================
const overviews = [
  { icon: '🧵', label: '线程', text: '共享内存，GIL 限制 CPU 并行，适合 IO 密集。轻量但受限于解释器锁。' },
  { icon: '⚙️', label: '进程', text: '独立内存，绕过 GIL，真正多核并行。启动开销大，适合 CPU 密集。' },
  { icon: '🌀', label: '协程', text: '单线程协作式调度，async/await 语法。超高并发 IO，几乎零切换开销。' },
];

// ================================================================
// 主题卡片数据（大幅扩展）
// ================================================================
const concurrencyTopics: ConcurrencyTopic[] = [
  // ── 1. threading 多线程 ──
  {
    id: 'threading',
    icon: '🧵',
    title: '多线程 (threading)',
    description:
      'Python 多线程适用于 IO 密集型任务（网络请求、文件读写、数据库查询），因为线程在等待 IO 时会释放 GIL，让其他线程有机会执行。共享内存使得线程间数据交换非常方便，但也带来了竞态条件（race condition）的风险，必须用锁（Lock）来保护临界区。注意：纯 Python 计算任务不会因多线程而加速——反而可能因为 GIL 竞争和上下文切换而变慢。',
    code: `import threading
import time
from threading import Thread, Lock, RLock, local

# ========== 1. 基础用法：创建与启动线程 ==========
def worker(thread_id: int, delay: float):
    """每个线程执行的函数——模拟 IO 操作"""
    print(f"[线程 {thread_id}] 🟢 启动，将等待 {delay} 秒")
    time.sleep(delay)                 # sleep 会释放 GIL ✓
    print(f"[线程 {thread_id}] 🔴 完成")

# 方式一：函数式
threads = []
for i in range(3):
    t = Thread(target=worker, args=(i, i * 0.5), name=f"Worker-{i}")
    threads.append(t)
    t.start()                         # 启动线程（非阻塞）

for t in threads:
    t.join()                          # 等待所有线程完成（阻塞）
print("✅ 所有线程已完成\\n")


# ========== 2. 守护线程（daemon）==========
def background_task():
    while True:
        print("💤 后台心跳...")
        time.sleep(2)

daemon = Thread(target=background_task, daemon=True)
daemon.start()
# 主线程退出时守护线程自动终止，无需 join


# ========== 3. 锁（Lock）保护共享资源 ==========
lock = Lock()
counter = 0

def safe_increment():
    """使用 with lock 保护临界区，等价于 lock.acquire()/release()"""
    global counter
    for _ in range(100_000):
        with lock:                    # 获取锁，离开 with 块自动释放
            counter += 1              # 读-改-写 是原子的（因锁保护）

threads = [Thread(target=safe_increment) for _ in range(4)]
for t in threads: t.start()
for t in threads: t.join()
print(f"🔒 加锁后计数 = {counter}")  # 应该是 400000


# ========== 4. 可重入锁（RLock）==========
rlock = RLock()                       # 同一线程可多次 acquire，不会死锁
def recursive(n):
    with rlock:
        if n > 0:
            recursive(n - 1)          # 同一个锁可以被同一线程重复获取

# ========== 5. 线程局部存储 ==========
tls = local()                         # 每个线程有自己独立的属性副本
def set_name(name):
    tls.name = name                   # 仅当前线程可见
    print(f"线程 {threading.current_thread().name}: tls.name = {tls.name}")`,
    tags: ['IO 密集型', '共享内存', 'GIL 受限'],
  },

  // ── 2. multiprocessing 多进程 ──
  {
    id: 'multiprocessing',
    icon: '⚙️',
    title: '多进程 (multiprocessing)',
    description:
      '多进程绕过 GIL，每个进程拥有独立的 Python 解释器和内存空间，是 CPU 密集型任务的首选方案。通过 Queue、Pipe 或 Manager 进行进程间通信（IPC）。缺点是进程创建成本高、内存占用大、数据传递需要序列化（pickle）。对于大规模数据并行，可以考虑 multiprocessing.Pool 或更高级的 Ray/Dask 分布式框架。',
    code: `from multiprocessing import Process, Queue, Pipe, Pool, Manager, Value, Array
import os, time, math

# ========== 1. 基础进程 ==========
def cpu_heavy(n: int) -> list:
    """CPU 密集：计算素数——多线程无法加速，多进程可以"""
    result = []
    for num in range(2, n):
        is_prime = all(num % i != 0 for i in range(2, int(math.sqrt(num)) + 1))
        if is_prime:
            result.append(num)
    print(f"进程 {os.getpid()} 完成，找到 {len(result)} 个素数")
    return result

if __name__ == '__main__':
    # 注意：Windows 必须用 if __name__ == '__main__' 保护
    p = Process(target=cpu_heavy, args=(100_000,))
    p.start()
    p.join()


# ========== 2. Queue 进程间通信 ==========
def producer(q: Queue):
    """向队列发送数据"""
    for i in range(5):
        q.put(f"数据-{i}")
        print(f"📤 生产: 数据-{i}")

def consumer(q: Queue):
    """从队列取数据"""
    while True:
        item = q.get()
        if item is None:              # 哨兵值，表示结束
            break
        print(f"📥 消费: {item}")

if __name__ == '__main__':
    q = Queue()
    p1 = Process(target=producer, args=(q,))
    p2 = Process(target=consumer, args=(q,))
    p1.start(); p2.start()
    p1.join()
    q.put(None)                       # 发送结束信号
    p2.join()


# ========== 3. 进程池 Pool ==========
def square(x):
    return x * x

if __name__ == '__main__':
    numbers = list(range(1, 21))
    with Pool(processes=4) as pool:   # 4 个 worker 进程
        # map：保持顺序，阻塞等待全部完成
        results = pool.map(square, numbers)
        # imap_unordered：不保证顺序，先完成的先返回
        for r in pool.imap_unordered(square, numbers):
            print(f"完成: {r}")
    print(f"全部分结果: {results}")


# ========== 4. 共享内存 Value/Array ==========
# 适合小量数据，无需序列化
if __name__ == '__main__':
    counter = Value('i', 0)           # 'i' = signed int
    arr = Array('d', [0.0] * 10)      # 'd' = double
    # 注意：Value/Array 本身无锁保护，需配合 Lock 使用`,
    tags: ['CPU 密集型', '多核并行', '独立内存'],
  },

  // ── 3. asyncio 异步IO ──
  {
    id: 'asyncio',
    icon: '🌀',
    title: '异步IO (asyncio) 核心',
    description:
      'asyncio 是 Python 官方的异步编程框架，基于事件循环（event loop）和协程（coroutine）实现单线程高并发。核心思想：当一个协程在等待 IO（如网络响应）时，事件循环切换到另一个协程执行，从而在单线程内实现"看起来同时"的并发。关键语法：async def 定义协程，await 挂起当前协程等待另一个协程完成，asyncio.gather() 并发运行多个协程。适合 Web 服务器、爬虫、实时通信等 IO 密集场景。',
    code: `import asyncio
import time

# ========== 1. 协程基础：async/await ==========
async def greet(name: str):
    """async def 定义一个协程函数——调用它返回一个协程对象，不会立即执行"""
    print(f"👋 你好 {name}")
    await asyncio.sleep(0.5)          # await：挂起当前协程，让出控制权
    print(f"👋 再见 {name}")
    return f"{name} 已完成"

# 注意：await 只能用于协程、Task、Future 等 awaitable 对象
# asyncio.sleep() 是异步的 sleep——不阻塞线程！

async def demo_basic():
    """顺序执行——总耗时 = 所有协程时间之和"""
    r1 = await greet("Alice")         # 等待 Alice 完成...
    r2 = await greet("Bob")           # 再开始 Bob...
    print(r1, r2)

# asyncio.run(demo_basic())


# ========== 2. 并发执行：gather ==========
async def demo_concurrent():
    """并发执行——总耗时 ≈ 最慢的那一个"""
    results = await asyncio.gather(
        greet("Alice"),               # 同时启动
        greet("Bob"),                 # 同时启动
        greet("Charlie"),             # 同时启动
        return_exceptions=True,       # 某个失败不影响其他
    )
    for r in results:
        if isinstance(r, Exception):
            print(f"❌ 异常: {r}")
        else:
            print(f"✅ {r}")

# asyncio.run(demo_concurrent())


# ========== 3. 创建 Task（可取消的后台任务）==========
async def demo_tasks():
    """create_task 立即调度协程，返回 Task 对象（Future 的子类）"""
    task1 = asyncio.create_task(greet("Task-A"), name="A")
    task2 = asyncio.create_task(greet("Task-B"), name="B")

    # Task 可以取消
    await asyncio.sleep(0.1)
    task2.cancel()                    # 取消 task2

    try:
        await task2
    except asyncio.CancelledError:
        print("⚠️ Task-B 被取消")

    result = await task1              # task1 继续正常完成
    print(f"Task-A 结果: {result}")

# asyncio.run(demo_tasks())`,
    tags: ['async/await', '事件循环', '高并发 IO'],
  },

  // ── 4. asyncio 进阶：TaskGroup 与超时 ──
  {
    id: 'asyncio-advanced',
    icon: '🎯',
    title: 'asyncio 进阶：TaskGroup & 超时控制',
    description:
      'Python 3.11 引入了 asyncio.TaskGroup（替代 gather 的 better error handling）和 asyncio.timeout。TaskGroup 保证：如果组内任一 task 异常，其他 task 自动取消（结构化并发）。asyncio.wait_for 给单个协程加超时，asyncio.timeout 给代码块加超时。asyncio.as_completed 按完成顺序迭代结果，适合流式处理。',
    code: `import asyncio

# ========== 1. TaskGroup（Python 3.11+）==========
async def fetch(url: str):
    await asyncio.sleep(0.5)
    if "bad" in url:
        raise ValueError(f"错误请求: {url}")
    return f"{url} -> 200 OK"

async def demo_taskgroup():
    """TaskGroup：任一 task 失败 → 自动取消组内所有其他 task"""
    try:
        async with asyncio.TaskGroup() as tg:
            t1 = tg.create_task(fetch("/api/users"))
            t2 = tg.create_task(fetch("/api/bad/endpoint"))  # 这个会失败
            t3 = tg.create_task(fetch("/api/posts"))         # 会被自动取消
    except* Exception as eg:          # except* 处理 ExceptionGroup
        for exc in eg.exceptions:
            print(f"❌ 异常: {exc}")


# ========== 2. 超时控制 ==========
async def slow_operation():
    await asyncio.sleep(5)
    return "太慢了"

async def demo_timeout():
    # 方式一：wait_for —— Python 3.7+
    try:
        result = await asyncio.wait_for(slow_operation(), timeout=1.0)
    except asyncio.TimeoutError:
        print("⏰ 操作超时！")

    # 方式二：timeout 上下文 —— Python 3.11+
    try:
        async with asyncio.timeout(1.0):
            result = await slow_operation()
    except TimeoutError:
        print("⏰ 代码块超时！")


# ========== 3. as_completed：按完成顺序迭代 ==========
async def demo_as_completed():
    tasks = [fetch(f"/api/item/{i}") for i in range(5)]
    for coro in asyncio.as_completed(tasks):
        # 谁先完成就先处理谁，不用等最慢的那个
        result = await coro
        print(f"📨 收到: {result}")

# asyncio.run(demo_as_completed())`,
    tags: ['TaskGroup', '超时', '结构化并发', 'Python 3.11+'],
  },

  // ── 5. concurrent.futures ──
  {
    id: 'futures',
    icon: '📦',
    title: 'concurrent.futures（高层封装）',
    description:
      'concurrent.futures 提供了 ThreadPoolExecutor 和 ProcessPoolExecutor 两个统一接口，将任务提交抽象为 Future 对象。适用场景：当你不想直接操作 Thread/Process 时，用 executor.submit() 提交任务，返回 Future 对象；随后调用 .result() 等待获取返回值。map() 方法更简单——传迭代器，返回结果迭代器。wait() 和 as_completed() 提供了灵活的任务协调方式。',
    code: `from concurrent.futures import (
    ThreadPoolExecutor, ProcessPoolExecutor,
    wait, as_completed, Future
)
import time, urllib.request

# ========== 1. 基础 submit + Future ==========
def download(url: str) -> str:
    """模拟下载——IO 密集→线程池"""
    time.sleep(1)
    return f"<<{url} 的内容>>"

urls = [f"https://api.example.com/item/{i}" for i in range(6)]

# 线程池（IO 密集）
with ThreadPoolExecutor(max_workers=3) as executor:
    # submit 返回 Future，不阻塞
    futures: dict[Future, str] = {
        executor.submit(download, url): url
        for url in urls
    }
    # 按提交顺序取结果
    for future in futures:
        url = futures[future]
        result = future.result()      # 阻塞等待该 future 完成
        print(f"✅ {url} -> {result[:20]}")


# ========== 2. map：更简洁的批量执行 ==========
def cpu_task(n: int) -> int:
    """计算密集→进程池"""
    return sum(i * i for i in range(n))

with ProcessPoolExecutor(max_workers=4) as executor:
    # map 保持输入顺序，返回结果迭代器
    results = executor.map(cpu_task, [100_000, 200_000, 300_000])
    for r in results:
        print(f"计算结果: {r}")


# ========== 3. as_completed：按完成顺序处理 ==========
with ThreadPoolExecutor(max_workers=4) as executor:
    futures = [executor.submit(download, url) for url in urls]
    for future in as_completed(futures):
        # 谁先完成先处理谁——适合流式/实时场景
        print(f"最快完成: {future.result()[:20]}")


# ========== 4. wait：等待部分任务完成 ==========
with ThreadPoolExecutor(max_workers=4) as executor:
    futures = [executor.submit(download, url) for url in urls]
    done, not_done = wait(
        futures,
        timeout=2.0,                  # 最多等 2 秒
        return_when='FIRST_COMPLETED' # 或 ALL_COMPLETED, FIRST_EXCEPTION
    )
    for f in done:
        print(f"完成: {f.result()[:20]}")
    for f in not_done:
        f.cancel()                    # 取消未完成的任务`,
    tags: ['线程池', '进程池', 'Future', '高层封装'],
  },

  // ── 6. 同步原语详解 ──
  {
    id: 'locks-queues',
    icon: '🔒',
    title: '同步原语 · 线程安全队列',
    description:
      'Python 提供丰富的同步原语用于协调多线程/多进程：Lock（互斥锁，最基础）、RLock（可重入锁——同一线程可多次获取）、Semaphore（信号量——限制同时访问资源的线程数）、Condition（条件变量——线程等待特定条件成立）、Event（事件——最简单的线程通知机制）、Barrier（栅栏——N 个线程全部到达后才继续）。线程安全队列(queue.Queue)是实现生产者-消费者模式的首选工具。',
    code: `import threading
import time, random
from queue import Queue

# ========== 1. Lock 互斥锁（复习）==========
lock = threading.Lock()
# with lock:  ...   # 最常用的临界区保护方式


# ========== 2. RLock 可重入锁 ==========
rlock = threading.RLock()
# 同一线程可以多次 acquire，用于递归调用场景


# ========== 3. Semaphore 信号量 ==========
# 控制同时访问资源的线程数（比如限制数据库连接池）
db_semaphore = threading.Semaphore(3) # 最多 3 个线程同时访问

def access_database(thread_id: int):
    with db_semaphore:                # 获取许可，计数 -1
        print(f"线程 {thread_id} 🔗 连接数据库")
        time.sleep(random.uniform(0.5, 1.5))
        print(f"线程 {thread_id} 🔌 断开")
    # with 块结束，计数 +1，其他线程可以获取


# ========== 4. Condition 条件变量 ==========
# 线程等待某个条件成立后才继续
condition = threading.Condition()
items = []

def producer():
    for i in range(5):
        with condition:
            items.append(f"产品-{i}")
            print(f"📦 生产: 产品-{i}")
            condition.notify()        # 通知一个等待的消费者
            # condition.notify_all()  # 通知所有等待者
        time.sleep(0.5)

def consumer():
    for _ in range(5):
        with condition:
            while not items:          # 用 while 防虚假唤醒
                condition.wait()      # 释放锁并等待，被 notify 后重新获取锁
            item = items.pop(0)
            print(f"🛒 消费: {item}")


# ========== 5. Event 事件 ==========
# 最简单的线程间通知：一个线程"发信号"，其他线程等待
ready_event = threading.Event()

def waiter():
    print("⏳ 等待信号...")
    ready_event.wait()                # 阻塞直到 event 被 set
    print("🚀 收到信号，继续执行！")

def signaler():
    time.sleep(2)
    print("📡 发送信号")
    ready_event.set()                 # 解除所有 wait() 的阻塞
    # ready_event.clear()             # 重置为未设置状态


# ========== 6. Barrier 栅栏 ==========
# 所有线程到达后一起出发
barrier = threading.Barrier(3)        # 需要 3 个线程

def racer(name: str):
    print(f"🏎️ {name} 到达栅栏")
    barrier.wait()                    # 等待直到 3 个线程都到达
    print(f"🏁 {name} 出发！")


# ========== 7. Queue 线程安全队列 ==========
# 生产者-消费者模式的最佳工具
job_queue: Queue = Queue(maxsize=5)   # 最大容量 5

def producer_worker():
    for i in range(10):
        job_queue.put(f"任务-{i}")     # 如果队列满了就阻塞等待
        print(f"📤 提交: 任务-{i}")

def consumer_worker(worker_id: int):
    while True:
        try:
            job = job_queue.get(timeout=2)  # 超时防止死等
            print(f"📥 Worker-{worker_id} 处理: {job}")
            job_queue.task_done()       # 标记任务完成
        except:
            break                       # 超时=没有更多任务`,
    tags: ['Lock', 'Semaphore', 'Condition', 'Event', 'Queue'],
  },

  // ── 7. 异步同步原语 ──
  {
    id: 'async-sync',
    icon: '🔐',
    title: '异步同步原语 (asyncio.Lock 等)',
    description:
      'asyncio 也提供了与 threading 同步原语对应的异步版本：asyncio.Lock、asyncio.Semaphore、asyncio.Event、asyncio.Condition、asyncio.Queue。它们的关键区别：await lock.acquire() 挂起的是协程而不是线程——不会阻塞整个线程。asyncio.Semaphore 非常适合做 API 速率限制（rate limiting），asyncio.Queue 是异步生产者-消费者的标准方案。',
    code: `import asyncio
import random

# ========== 1. asyncio.Lock 异步互斥锁 ==========
async_lock = asyncio.Lock()
shared = 0

async def async_increment(name: str):
    global shared
    async with async_lock:            # await lock.acquire()；离开时 release()
        temp = shared
        await asyncio.sleep(0.01)     # 模拟计算延迟
        shared = temp + 1
        print(f"{name}: shared = {shared}")


# ========== 2. asyncio.Semaphore 速率限制 ==========
# 场景：限制对 API 的并发请求数（比如最多 3 个）
api_semaphore = asyncio.Semaphore(3)

async def rate_limited_request(url: str):
    """最多 3 个协程同时执行此函数体"""
    async with api_semaphore:         # 获取许可（可能挂起等待）
        print(f"🌐 请求 {url}（许可已获取）")
        await asyncio.sleep(1)        # 模拟网络请求
        print(f"✅ {url} 完成（释放许可）")


# ========== 3. asyncio.Queue 异步生产者-消费者 ==========
async def async_producer(queue: asyncio.Queue):
    for i in range(5):
        await asyncio.sleep(random.uniform(0.1, 0.5))
        await queue.put(f"数据-{i}")
        print(f"📤 生产: 数据-{i}  [队列大小: {queue.qsize()}]")
    await queue.put(None)             # 哨兵：告诉消费者结束了

async def async_consumer(queue: asyncio.Queue, name: str):
    while True:
        item = await queue.get()
        if item is None:
            await queue.put(None)     # 将哨兵放回，让其他消费者也结束
            break
        print(f"📥 {name} 消费: {item}")
        await asyncio.sleep(0.3)      # 模拟处理时间
        queue.task_done()

async def demo_async_queue():
    q: asyncio.Queue = asyncio.Queue(maxsize=3)
    # 一个生产者 + 两个消费者 并发运行
    await asyncio.gather(
        async_producer(q),
        async_consumer(q, "A"),
        async_consumer(q, "B"),
    )

# asyncio.run(demo_async_queue())`,
    tags: ['asyncio.Lock', 'Semaphore', '异步队列', '速率限制'],
  },

  // ── 8. 混合异步与同步 ──
  {
    id: 'async-streams',
    icon: '🌊',
    title: '混合异步/同步 & 线程池桥接',
    description:
      '现实项目中经常需要混合异步和同步代码。关键原则：不要在异步协程中调用阻塞函数——会卡住整个事件循环！解决方案：用 loop.run_in_executor() 或 asyncio.to_thread() 将阻塞操作扔到线程池执行。反过来，在同步代码中调用异步函数可以用 asyncio.run() 或 loop.run_until_complete()。注意避免在已有事件循环的线程中再调用 asyncio.run()——会抛出 RuntimeError。',
    code: `import asyncio
import time
import concurrent.futures

# ========== 1. 异步中调用阻塞函数 ==========
def blocking_db_query(query: str) -> str:
    """模拟同步数据库查询——会阻塞线程"""
    time.sleep(2)                     # 同步 sleep，阻塞线程
    return f"查询结果: [{query}]"

async def async_handler():
    """异步请求处理器"""
    loop = asyncio.get_running_loop()

    # 方式一：run_in_executor（默认 ThreadPoolExecutor）
    result = await loop.run_in_executor(
        None,                         # None = 使用默认线程池
        blocking_db_query,            # 阻塞函数
        "SELECT * FROM users"         # 传给阻塞函数的参数
    )
    print(f"方式一结果: {result}")

    # 方式二：asyncio.to_thread（Python 3.9+，语法更简洁）
    result2 = await asyncio.to_thread(
        blocking_db_query,
        "SELECT COUNT(*) FROM orders"
    )
    print(f"方式二结果: {result2}")


# ========== 2. 自定义线程池 ==========
# 如果默认线程池不够，可以创建专用线程池
async def with_custom_pool():
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        loop = asyncio.get_running_loop()
        tasks = [
            loop.run_in_executor(pool, blocking_db_query, f"查询-{i}")
            for i in range(10)
        ]
        results = await asyncio.gather(*tasks)
        print(f"全部完成: {len(results)} 个查询")


# ========== 3. 同步代码中运行协程 ==========
async def async_compute(x: int) -> int:
    await asyncio.sleep(0.1)
    return x * x

def sync_caller():
    """同步函数中调用异步函数"""
    # 方式一：asyncio.run()（Python 3.7+，会自动创建/清理事件循环）
    result = asyncio.run(async_compute(42))
    print(f"asyncio.run: {result}")

    # 方式二：手动管理事件循环
    loop = asyncio.new_event_loop()
    try:
        result = loop.run_until_complete(async_compute(42))
        print(f"手动循环: {result}")
    finally:
        loop.close()


# ========== 4. 常见陷阱 ==========
# ❌ 错误示范：在协程中调用 time.sleep()
async def bad_coroutine():
    time.sleep(5)                     # 阻塞整个事件循环！永远不要这样做
    # ✅ 正确做法：await asyncio.sleep(5)`,
    tags: ['混合异步/同步', 'run_in_executor', '非阻塞'],
  },

  // ── 9. 异步上下文管理器与生成器 ──
  {
    id: 'async-context-gen',
    icon: '🔄',
    title: '异步上下文管理器 & 异步生成器',
    description:
      'Python 的异步生态也支持 async with 和 async for。异步上下文管理器（__aenter__ / __aexit__）常用于管理异步资源（数据库连接、HTTP session）；异步生成器（async yield）适合逐步产生异步数据流。asynccontextmanager 装饰器让你用生成器语法轻松创建异步上下文管理器。',
    code: `import asyncio
from contextlib import asynccontextmanager

# ========== 1. 异步上下文管理器（类方式）==========
class AsyncDatabase:
    """模拟异步数据库连接"""
    async def __aenter__(self):
        print("🔗 连接数据库...")
        await asyncio.sleep(0.5)      # 异步建立连接
        return self

    async def __aexit__(self, exc_type, exc, tb):
        print("🔌 关闭数据库连接")
        await asyncio.sleep(0.2)      # 异步关闭

    async def query(self, sql: str):
        print(f"📊 执行: {sql}")
        await asyncio.sleep(0.3)
        return [{"id": 1, "name": "Alice"}]

async def demo_acm():
    async with AsyncDatabase() as db:
        rows = await db.query("SELECT * FROM users")
        print(f"结果: {rows}")
    # 退出 async with 时自动调用 __aexit__


# ========== 2. @asynccontextmanager 装饰器 ==========
@asynccontextmanager
async def async_redis_connection(url: str):
    """用生成器语法创建异步上下文管理器"""
    print(f"🔗 连接 Redis: {url}")
    await asyncio.sleep(0.3)
    conn = f"[Redis-{url}]"           # 模拟连接对象
    try:
        yield conn                     # yield 给 async with 块
    finally:
        print(f"🔌 关闭 Redis: {url}")
        await asyncio.sleep(0.1)

async def demo_acm_decorator():
    async with async_redis_connection("localhost:6379") as redis:
        print(f"使用 {redis} 进行操作")


# ========== 3. 异步生成器（async yield）==========
async def paginated_fetch(api: str, pages: int):
    """异步生成器：逐页获取数据并逐个产出"""
    for page in range(1, pages + 1):
        await asyncio.sleep(0.3)      # 模拟请求延迟
        yield f"{api}?page={page} -> 数据"

async def demo_async_gen():
    """async for 消费异步生成器"""
    async for data in paginated_fetch("/api/users", 3):
        print(f"📄 收到: {data}")
    # 每次迭代都会 await 生成器的 __anext__`,
    tags: ['async with', 'async for', '异步生成器', '资源管理'],
  },

  // ── 10. 协程内部机制 ──
  {
    id: 'coroutine-internals',
    icon: '⚛️',
    title: '协程底层：Task / Future / 事件循环',
    description:
      '理解底层机制有助于调试和性能优化。Future 代表"将来会完成的计算结果"（类似 JS Promise）；Task 是 Future 的子类，专门包装协程并由事件循环调度。事件循环（EventLoop）不断检查哪些 Task 可以推进（IO 就绪、定时器到期等），执行它们直到下一个 await 点。asyncio.ensure_future() 确保一个协程被包装成 Task 并调度，loop.call_soon() 可向事件循环注册回调。',
    code: `import asyncio

# ========== 1. Future：手动控制结果 ==========
async def demo_future():
    """Future 底层是可以手动 set_result/set_exception 的等待对象"""
    loop = asyncio.get_running_loop()
    future: asyncio.Future = loop.create_future()

    # 安排一个回调：1 秒后设置结果
    loop.call_later(1, future.set_result, "✅ 完成！")

    # 或者设置异常：future.set_exception(ValueError("失败"))

    print("⏳ 等待 future...")
    result = await future              # 挂起直到某人 set_result
    print(f"收到: {result}")


# ========== 2. Task vs Future ==========
async def demo_task_vs_future():
    """Task 包装协程并自动调度；Future 是纯手动"""
    # Task = Future + 协程包装 + 自动调度
    task: asyncio.Task = asyncio.create_task(
        asyncio.sleep(0.5, result="task 完成")
    )
    print(f"Task 是否完成: {task.done()}")
    await task
    print(f"Task 结果: {task.result()}")


# ========== 3. 回调与调试 ==========
async def demo_callbacks():
    task = asyncio.create_task(asyncio.sleep(1), name="MyTask")

    def on_done(t: asyncio.Task):
        """Task 完成后的回调"""
        print(f"✅ {t.get_name()} 完成: {t.done()}, 异常: {t.exception()}")

    task.add_done_callback(on_done)    # 注册完成回调
    await task


# ========== 4. 事件循环底层 ==========
async def demo_loop_operations():
    loop = asyncio.get_running_loop()

    # call_soon: 尽快在事件循环中执行回调
    def quick_callback():
        print("⚡ 尽快执行的回调")
    loop.call_soon(quick_callback)

    # call_later: 延迟执行
    loop.call_later(0.5, lambda: print("⏰ 0.5秒后执行"))

    await asyncio.sleep(1)            # 等待回调执行


# asyncio.run(demo_future())`,
    tags: ['Task', 'Future', '事件循环', '底层机制'],
  },
];

// ================================================================
// 并发模式速查
// ================================================================
const patterns: Pattern[] = [
  {
    name: '生产者-消费者（线程版）',
    desc: '用 queue.Queue 解耦生产者和消费者，支持多生产者/多消费者。Queue 已内置线程安全。',
    code: `from queue import Queue
from threading import Thread

def producer(q): [q.put(i) for i in range(10)]
def consumer(q):
    while True:
        item = q.get()
        if item is None: break
        print(f"消费: {item}")

q = Queue(maxsize=5)
Thread(target=producer, args=(q,)).start()
Thread(target=consumer, args=(q,)).start()`,
  },
  {
    name: '生产者-消费者（异步版）',
    desc: '用 asyncio.Queue 实现异步生产者消费者，多个协程并发处理。',
    code: `import asyncio

async def producer(q):
    for i in range(10):
        await q.put(i)
        await asyncio.sleep(0.1)

async def consumer(q, name):
    while True:
        item = await q.get()
        if item is None: break
        print(f"{name}: {item}")

q = asyncio.Queue(5)
asyncio.run(asyncio.gather(
    producer(q),
    consumer(q, "A"),
    consumer(q, "B")
))`,
  },
  {
    name: 'Worker Pool 模式',
    desc: '用 ThreadPoolExecutor 或 ProcessPoolExecutor 创建固定大小的 worker 池处理任务。',
    code: `from concurrent.futures import ThreadPoolExecutor, as_completed

def process(item): return item * item

tasks = list(range(20))
with ThreadPoolExecutor(max_workers=4) as pool:
    futures = {pool.submit(process, t): t for t in tasks}
    for f in as_completed(futures):
        print(f"完成: {f.result()}")`,
  },
  {
    name: 'Pipeline 流水线模式',
    desc: '多阶段处理，阶段间用 Queue 连接。每个阶段独立线程/进程，提高吞吐。',
    code: `from queue import Queue
from threading import Thread

# Stage 1 → Queue 1 → Stage 2 → Queue 2 → Stage 3
q1, q2 = Queue(), Queue()

def stage1(): [q1.put(i) for i in range(5)]
def stage2():
    while True:
        x = q1.get()
        if x is None: break
        q2.put(x * x)
def stage3():
    while True:
        x = q2.get()
        if x is None: break
        print(f"结果: {x}")`,
  },
  {
    name: 'Rate Limiter 速率限制',
    desc: '用 asyncio.Semaphore 控制并发请求数，防止打爆 API。',
    code: `import asyncio

sem = asyncio.Semaphore(3)  # 最多 3 并发

async def fetch(url):
    async with sem:
        print(f"请求 {url}")
        await asyncio.sleep(1)

urls = [f"/api/{i}" for i in range(10)]
asyncio.run(asyncio.gather(*[fetch(u) for u in urls]))`,
  },
  {
    name: 'Fan-out / Fan-in 模式',
    desc: '一个任务分解成多个子任务并行执行，最后汇总结果。gather() 就是最简单的 Fan-out/Fan-in。',
    code: `import asyncio

async def sub_task(n):
    await asyncio.sleep(0.5)
    return n * n

async def main():
    # Fan-out: 同时启动所有子任务
    results = await asyncio.gather(
        *[sub_task(i) for i in range(10)]
    )
    # Fan-in: 汇总结果
    total = sum(results)
    print(f"总计: {total}")

asyncio.run(main())`,
  },
];

// ================================================================
// 常见陷阱与最佳实践
// ================================================================
const bestPractices: BestPractice[] = [
  {
    icon: '⚠️',
    title: '不要在协程中调用阻塞函数',
    desc: 'time.sleep()、requests.get()、同步文件 IO 等会阻塞整个事件循环。必须用 await asyncio.sleep()、aiohttp、aiofiles 替代，或者用 run_in_executor() 扔到线程池执行。',
    code: `# ❌ 错误：time.sleep() 阻塞事件循环
async def bad():
    time.sleep(5)  # 这5秒内所有协程都卡住！

# ✅ 正确：用 await asyncio.sleep()
async def good():
    await asyncio.sleep(5)  # 其他协程可以运行

# ✅ 正确：用 run_in_executor
async def also_good():
    await asyncio.to_thread(time.sleep, 5)`,
  },
  {
    icon: '⚠️',
    title: '注意线程安全：共享数据要加锁',
    desc: '多线程中修改可变对象（list、dict、set 等）必须加锁。即使简单的 counter += 1 也不是原子操作——它涉及 read-modify-write 三步，可能被其他线程打断。用 threading.Lock 保护临界区或用 queue.Queue 代理数据传递。',
  },
  {
    icon: '⚠️',
    title: 'Windows 上多进程必须用 __main__ 保护',
    desc: '由于 Windows 没有 fork()，multiprocessing 会重新导入主模块。如果没有 if __name__ == "__main__": 保护，子进程会递归创建新进程导致无限循环或 RuntimeError。',
  },
  {
    icon: '⚠️',
    title: '避免死锁：统一加锁顺序',
    desc: '多个锁时，始终以相同顺序获取。如果线程 A 持有 Lock1 等待 Lock2，线程 B 持有 Lock2 等待 Lock1，就产生了死锁。解决方案：① 统一锁获取顺序 ② 使用超时机制（lock.acquire(timeout=1)）③ 尽可能减少同时持有的锁数量。',
  },
  {
    icon: '✅',
    title: '优先使用 concurrent.futures 而非直接操作 Thread/Process',
    desc: 'ThreadPoolExecutor 和 ProcessPoolExecutor 提供了更安全的资源管理（自动回收 worker）、更简洁的 API（submit/map）和内置的异常传播。直接操作 Thread/Process 更容易写出资源泄露或僵尸进程的 bug。',
  },
  {
    icon: '✅',
    title: '用 asyncio.gather 并发，用 asyncio.wait_for 防超时',
    desc: '任何网络 IO 都应该设置超时。asyncio.wait_for() + asyncio.gather() 的组合是写健壮异步代码的基础。别忘记 return_exceptions=True——某个协程失败不应该导致整个 gather 失败。',
    code: `async def safe_gather(*coros, timeout=30):
    """安全的并发执行，内置超时"""
    try:
        return await asyncio.wait_for(
            asyncio.gather(*coros, return_exceptions=True),
            timeout=timeout
        )
    except asyncio.TimeoutError:
        print(f"⏰ {timeout}秒超时")
        return None`,
  },
];

// ================================================================
// 调试与性能分析
// ================================================================
const debugTips = [
  {
    title: '🔍 asyncio 调试模式',
    desc: '设置环境变量 PYTHONASYNCIODEBUG=1 或 asyncio.run(debug=True) 开启调试。会检测：① 未 await 的协程（RuntimeWarning）② 执行时间过长的回调 ③ 未正确关闭的资源。',
    code: `import asyncio
# 方式一：环境变量（推荐开发时全局开启）
# export PYTHONASYNCIODEBUG=1

# 方式二：代码中开启
asyncio.run(main(), debug=True)

# 方式三：全局设置
asyncio.get_event_loop().set_debug(True)`,
  },
  {
    title: '📊 性能分析：timeit + cProfile',
    desc: '对比不同并发方案的性能时用 timeit 模块；分析 CPU 瓶颈用 cProfile。注意：asyncio 代码的 profile 需要特殊处理——用 asyncio 专用的 profiler 或 yappi。',
    code: `import timeit

# 对比同步 vs 异步的性能
sync_time = timeit.timeit(
    'sync_fetch_all()',
    setup='from __main__ import sync_fetch_all',
    number=10
)

async_time = timeit.timeit(
    'asyncio.run(async_fetch_all())',
    setup='from __main__ import async_fetch_all; import asyncio',
    number=10
)
print(f"同步耗时: {sync_time:.2f}s, 异步耗时: {async_time:.2f}s")`,
  },
  {
    title: '🐛 常见并发 Bug 排查',
    desc: '① Race condition：共享变量在没有锁保护时被并发修改 → 加 Lock 或改用 Queue。② 死锁：cycle waiting → 检查锁获取顺序、加超时。③ 僵尸进程：忘记 join() 或 terminate() → 用 ProcessPoolExecutor 自动管理。④ 协程泄露：创建了协程但没有 await/gather → 开启 asyncio debug mode 会告警。',
  },
];
</script>

<style lang="less" scoped>
// ================================================================
// 变量
// ================================================================
@bg-page: #f8fafc;
@card-white: #ffffff;
@primary-dark: #0f172a;
@accent: #7c3aed;
@text-secondary: #475569;
@border-light: #eef2f6;
@code-bg: #1e1e2f;
@code-fg: #e2e8f0;

// ================================================================
// 容器
// ================================================================
.concurrency-container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: @bg-page;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

// ================================================================
// Hero
// ================================================================
.hero {
  text-align: center;
  margin-bottom: 2.5rem;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
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
      background: #ede9fe;
      color: @accent;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 1rem;
      border-radius: 2rem;
    }
  }
}

// ================================================================
// 核心理念速览
// ================================================================
.overview-banner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  margin-bottom: 2.5rem;

  .overview-item {
    background: @card-white;
    border-radius: 1rem;
    padding: 1.2rem 1.4rem;
    border: 1px solid @border-light;
    text-align: center;

    .ov-icon { font-size: 1.8rem; display: block; margin-bottom: 0.4rem; }
    strong { color: @primary-dark; font-size: 0.95rem; }
    p { margin: 0.4rem 0 0; font-size: 0.8rem; color: @text-secondary; line-height: 1.5; }
  }
}

// ================================================================
// 卡片网格
// ================================================================
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
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

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 30px -12px rgba(124, 58, 237, 0.15);
    border-color: rgba(124, 58, 237, 0.25);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.3rem 1.5rem 0;
  border-bottom: 2px solid #f1f5f9;

  .card-icon { font-size: 2rem; }
  .card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: @primary-dark;
    margin: 0;
  }
}

.card-description {
  padding: 0.9rem 1.5rem 0.3rem;
  font-size: 0.85rem;
  line-height: 1.7;
  color: @text-secondary;
}

.code-block {
  background: @code-bg;
  margin: 0.8rem 1rem 1rem;
  border-radius: 1rem;
  overflow-x: auto;
  flex: 1; // 让代码区占满剩余空间

  pre {
    margin: 0;
    padding: 1rem 1.1rem;
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 0.7rem;
    line-height: 1.55;
  }

  code { color: @code-fg; font-family: 'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace; }
}

.card-footer {
  padding: 0.4rem 1.5rem 1.2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;

  .tag {
    background: #f1f5f9;
    padding: 0.15rem 0.7rem;
    border-radius: 2rem;
    font-size: 0.68rem;
    font-weight: 500;
    color: #334155;
  }
}

// ================================================================
// GIL + 对比表格
// ================================================================
.insight-panel {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.8rem;
  margin-bottom: 2.5rem;

  .gil-card, .comparison {
    background: @card-white;
    border-radius: 1.25rem;
    padding: 1.5rem;
    border: 1px solid @border-light;

    h3 {
      margin: 0 0 1rem;
      font-size: 1.15rem;
      font-weight: 700;
      color: @primary-dark;
      border-left: 4px solid @accent;
      padding-left: 0.75rem;
    }
  }

  .gil-content {
    p { color: @text-secondary; line-height: 1.7; font-size: 0.87rem; margin: 0.6rem 0; }
    p:first-child { margin-top: 0; }
    ul {
      margin: 0.5rem 0 0.5rem 1.2rem;
      padding: 0;
      li {
        font-size: 0.83rem;
        color: @text-secondary;
        line-height: 1.7;
        margin-bottom: 0.3rem;
        code { background: #ede9fe; padding: 0.1rem 0.35rem; border-radius: 4px; color: @accent; font-size: 0.78rem; }
      }
    }
    strong { color: @primary-dark; }
    em { color: @accent; font-style: normal; }
  }

  .comparison table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.82rem;

    th {
      text-align: left;
      padding: 0.5rem 0.5rem;
      border-bottom: 2px solid #e2e8f0;
      font-weight: 700;
      color: @primary-dark;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    td {
      padding: 0.5rem;
      border-bottom: 1px solid @border-light;
      color: @text-secondary;
      line-height: 1.5;
      code { background: #f1f5f9; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.78rem; }
    }
    tr:hover td { background: #f8fafc; }
  }
}

// ================================================================
// 并发模式
// ================================================================
.patterns-section {
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.4rem;
    font-weight: 700;
    color: @primary-dark;
    margin: 0 0 1.2rem;
    padding-left: 1rem;
    border-left: 4px solid @accent;
  }
}

.patterns-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.2rem;
}

.pattern-card {
  background: @card-white;
  border-radius: 1rem;
  padding: 1.2rem 1.4rem;
  border: 1px solid @border-light;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);

  h4 { margin: 0 0 0.4rem; font-size: 0.95rem; color: @primary-dark; font-weight: 700; }
  .pat-desc { font-size: 0.78rem; color: @text-secondary; line-height: 1.5; margin: 0 0 0.6rem; }
  .pat-code {
    background: @code-bg;
    border-radius: 0.7rem;
    padding: 0.7rem;
    font-size: 0.68rem;
    line-height: 1.45;
    overflow-x: auto;
    code { color: @code-fg; font-family: 'Fira Code', monospace; }
  }
}

// ================================================================
// 最佳实践
// ================================================================
.best-practices {
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.4rem;
    font-weight: 700;
    color: @primary-dark;
    margin: 0 0 1.2rem;
    padding-left: 1rem;
    border-left: 4px solid #f59e0b;
  }
}

.bp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.2rem;
}

.bp-card {
  background: @card-white;
  border-radius: 1rem;
  padding: 1.2rem 1.4rem;
  border: 1px solid @border-light;
  border-left: 3px solid #f59e0b;

  .bp-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    .bp-icon { font-size: 1.2rem; }
    h4 { margin: 0; font-size: 0.92rem; color: @primary-dark; font-weight: 700; }
  }

  p { font-size: 0.82rem; color: @text-secondary; line-height: 1.65; margin: 0 0 0.6rem; }

  .bp-code {
    background: @code-bg;
    border-radius: 0.7rem;
    padding: 0.7rem;
    font-size: 0.68rem;
    line-height: 1.45;
    overflow-x: auto;
    code { color: @code-fg; font-family: 'Fira Code', monospace; }
  }
}

// ================================================================
// 调试
// ================================================================
.debug-section {
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.4rem;
    font-weight: 700;
    color: @primary-dark;
    margin: 0 0 1.2rem;
    padding-left: 1rem;
    border-left: 4px solid #06b6d4;
  }
}

.debug-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.2rem;
}

.debug-card {
  background: @card-white;
  border-radius: 1rem;
  padding: 1.2rem 1.4rem;
  border: 1px solid @border-light;

  h4 { margin: 0 0 0.5rem; font-size: 0.95rem; color: @primary-dark; font-weight: 700; }
  p { font-size: 0.82rem; color: @text-secondary; line-height: 1.65; margin: 0 0 0.6rem; }
  pre {
    background: @code-bg;
    border-radius: 0.7rem;
    padding: 0.7rem;
    font-size: 0.68rem;
    line-height: 1.45;
    overflow-x: auto;
    code { color: @code-fg; font-family: 'Fira Code', monospace; }
  }
}

// ================================================================
// Footer
// ================================================================
.footer {
  text-align: center;
  margin-top: 1rem;
  padding-top: 1.4rem;
  border-top: 1px solid #e2e8f0;
  color: #5b6e8c;
  font-size: 0.85rem;
  line-height: 1.6;
}

// ================================================================
// 响应式
// ================================================================
@media (max-width: 900px) {
  .concurrency-container { padding: 1rem; }
  .hero .title { font-size: 1.6rem; }
  .cards-grid { grid-template-columns: 1fr; }
  .insight-panel { grid-template-columns: 1fr; }
  .overview-banner { grid-template-columns: 1fr; }
  .patterns-grid { grid-template-columns: 1fr; }
  .bp-grid { grid-template-columns: 1fr; }
  .debug-content { grid-template-columns: 1fr; }
}
</style>
