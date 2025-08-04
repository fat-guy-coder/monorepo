<template>
  <div class="v8-gc-container">
    <div class="hero-section">
      <div class="hero-content">
        <h1>V8垃圾回收算法基础介绍</h1>
        <p>深入探索JavaScript引擎的内存管理机制</p>
        <div class="memory-visualization">
          <div class="memory-area" v-for="(area, index) in memoryAreas" :key="index">
            <div class="area-header" :style="{ backgroundColor: area.color }">
              <i :class="area.icon"></i>
              <h3>{{ area.name }}</h3>
              <span class="size">{{ area.size }}</span>
            </div>
            <div class="memory-blocks">
              <div
                v-for="(block, blockIndex) in area.blocks"
                :key="blockIndex"
                class="memory-block"
                :class="{
                  active: block.active,
                  inactive: !block.active,
                }"
                :style="{
                  width: block.size + 'px',
                  height: block.size + 'px',
                  animationDelay: blockIndex * 0.1 + 's',
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- 垃圾回收概述 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-recycle"></i>
          <h2>垃圾回收概述</h2>
        </div>
        <div class="section-content">
          <div class="gc-intro">
            <div class="intro-card">
              <div class="intro-icon">
                <i class="fas fa-brain"></i>
              </div>
              <div>
                <h3>为什么需要垃圾回收？</h3>
                <p>
                  JavaScript是一种高级语言，开发者不需要手动管理内存。V8引擎的垃圾回收器(GC)自动分配和释放内存，防止内存泄漏，确保应用性能。
                </p>
              </div>
            </div>

            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-value">1ms</div>
                <div class="stat-label">新生代GC平均时间</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">10ms+</div>
                <div class="stat-label">老生代GC平均时间</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">1.5MB</div>
                <div class="stat-label">新生代默认大小</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">700MB</div>
                <div class="stat-label">Node.js默认堆大小</div>
              </div>
            </div>
          </div>

          <div class="gc-principle">
            <h3><i class="fas fa-cogs"></i> 垃圾回收基本原理</h3>
            <p>
              V8使用<strong>分代垃圾回收</strong>策略，将内存分为新生代(new space)和老生代(old
              space)。不同代采用不同的回收算法：
            </p>

            <div class="principle-diagram">
              <div class="generation">
                <div class="gen-header">新生代</div>
                <div class="gen-content">
                  <div class="algorithm">
                    <i class="fas fa-exchange-alt"></i>
                    <span>Scavenge算法</span>
                  </div>
                  <div class="arrow">→</div>
                  <div class="promotion">对象晋升</div>
                </div>
              </div>

              <div class="generation">
                <div class="gen-header">老生代</div>
                <div class="gen-content">
                  <div class="algorithm">
                    <i class="fas fa-broom"></i>
                    <span>标记清除</span>
                  </div>
                  <div class="algorithm">
                    <i class="fas fa-compress-arrows-alt"></i>
                    <span>标记整理</span>
                  </div>
                  <div class="algorithm">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>增量标记</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 新生代垃圾回收 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-baby"></i>
          <h2>新生代垃圾回收</h2>
        </div>
        <div class="section-content">
          <div class="space-description">
            <p>
              新生代存放<strong>生命周期短</strong>的对象。大多数对象在这里被创建并很快被回收。V8使用<strong>Scavenge算法</strong>进行新生代垃圾回收。
            </p>
          </div>

          <div class="scavenge-process">
            <h3><i class="fas fa-sync-alt"></i> Scavenge算法过程</h3>
            <div class="process-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>内存分区</h4>
                  <p>新生代分为两个等大的半空间(semi-space): From空间和To空间</p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>对象分配</h4>
                  <p>新对象分配到From空间，当From空间满时触发GC</p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>复制存活对象</h4>
                  <p>将From空间中存活的对象复制到To空间</p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>空间翻转</h4>
                  <p>清空From空间，然后交换From和To空间的角色</p>
                </div>
              </div>
            </div>

            <div class="scavenge-visual">
              <div class="space from-space">
                <div class="space-label">From空间</div>
                <div class="blocks-container">
                  <div class="block active" v-for="i in 8" :key="'from-' + i"></div>
                  <div class="block inactive" v-for="i in 4" :key="'from-inactive-' + i"></div>
                </div>
              </div>

              <div class="arrow">
                <i class="fas fa-arrow-right"></i>
              </div>

              <div class="space to-space">
                <div class="space-label">To空间</div>
                <div class="blocks-container">
                  <div class="block active" v-for="i in 8" :key="'to-' + i"></div>
                  <div class="block empty" v-for="i in 4" :key="'to-empty-' + i"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="object-promotion">
            <h3><i class="fas fa-level-up-alt"></i> 对象晋升</h3>
            <p>满足以下条件之一的对象会从新生代晋升到老生代：</p>
            <ul>
              <li>对象经历过一次Scavenge回收仍然存活</li>
              <li>复制到To空间时，To空间使用率超过25%</li>
              <li>大对象直接分配到老生代</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 老生代垃圾回收 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-tree"></i>
          <h2>老生代垃圾回收</h2>
        </div>
        <div class="section-content">
          <div class="space-description">
            <p>
              老生代存放<strong>生命周期长</strong>或从新生代晋升的对象。V8使用<strong>标记-清除(Mark-Sweep)</strong>和<strong>标记-整理(Mark-Compact)</strong>算法。
            </p>
          </div>

          <div class="gc-algorithms">
            <div class="algorithm-card">
              <div class="algo-header mark-sweep">
                <i class="fas fa-broom"></i>
                <h3>标记-清除 (Mark-Sweep)</h3>
              </div>
              <div class="algo-steps">
                <div class="algo-step">
                  <div class="step-number">1</div>
                  <p>标记阶段：从根对象出发，遍历所有可达对象并标记</p>
                </div>
                <div class="algo-step">
                  <div class="step-number">2</div>
                  <p>清除阶段：清除未被标记的对象（垃圾）</p>
                </div>
              </div>
              <div class="algo-pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>速度较快</li>
                    <li>不需要移动对象</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>内存碎片化</li>
                    <li>可能引起内存不足</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="algorithm-card">
              <div class="algo-header mark-compact">
                <i class="fas fa-compress-arrows-alt"></i>
                <h3>标记-整理 (Mark-Compact)</h3>
              </div>
              <div class="algo-steps">
                <div class="algo-step">
                  <div class="step-number">1</div>
                  <p>标记阶段：标记所有存活对象（同标记-清除）</p>
                </div>
                <div class="algo-step">
                  <div class="step-number">2</div>
                  <p>整理阶段：移动存活对象，消除内存碎片</p>
                </div>
                <div class="algo-step">
                  <div class="step-number">3</div>
                  <p>更新引用：更新对象移动后的引用地址</p>
                </div>
              </div>
              <div class="algo-pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>消除内存碎片</li>
                    <li>提高内存利用率</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>执行时间更长</li>
                    <li>需要暂停主线程</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="optimization">
            <h3><i class="fas fa-tachometer-alt"></i> 优化技术</h3>
            <div class="optimization-cards">
              <div class="opt-card">
                <div class="opt-icon">
                  <i class="fas fa-pause-circle"></i>
                </div>
                <h4>增量标记 (Incremental Marking)</h4>
                <p>将标记过程分解为多个小任务，穿插在JavaScript执行中</p>
              </div>

              <div class="opt-card">
                <div class="opt-icon">
                  <i class="fas fa-parachute-box"></i>
                </div>
                <h4>惰性清理 (Lazy Sweeping)</h4>
                <p>延迟清理过程，在需要内存或空闲时执行</p>
              </div>

              <div class="opt-card">
                <div class="opt-icon">
                  <i class="fas fa-broadcast-tower"></i>
                </div>
                <h4>并发标记 (Concurrent Marking)</h4>
                <p>在后台线程进行标记，不阻塞主线程</p>
              </div>

              <div class="opt-card">
                <div class="opt-icon">
                  <i class="fas fa-memory"></i>
                </div>
                <h4>并行回收 (Parallel GC)</h4>
                <p>使用多个线程同时执行垃圾回收任务</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 触发时机 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-clock"></i>
          <h2>垃圾回收触发时机</h2>
        </div>
        <div class="section-content">
          <div class="trigger-description">
            <p>V8垃圾回收不会在固定时间间隔运行，而是根据内存分配情况和引擎策略触发。</p>
          </div>

          <div class="trigger-timeline">
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h3>分配时触发</h3>
                <p>当新生代空间不足以分配新对象时，触发Scavenge回收</p>
                <div class="code-example">
                  <pre>
// 创建大量临时对象
for (let i = 0; i < 100000; i++) {
  const temp = { index: i };
}</pre
                  >
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h3>空间限制</h3>
                <p>老生代空间接近或达到限制时，触发标记清除/整理</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h3>空闲时间</h3>
                <p>V8尝试在JavaScript执行空闲时运行部分GC任务</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h3>手动触发</h3>
                <p>开发者可以通过代码手动触发垃圾回收（仅调试用）</p>
                <div class="code-example">
                  <pre>
// Node.js中触发GC（仅用于调试）
if (global.gc) {
  global.gc();
}</pre
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="memory-graph">
            <h3><i class="fas fa-chart-line"></i> 内存使用与GC触发关系</h3>
            <div class="graph-container">
              <div class="graph">
                <div
                  v-for="(point, index) in memoryUsage"
                  :key="index"
                  class="data-point"
                  :style="{
                    left: index * 20 + 'px',
                    bottom: point.usage * 0.8 + 'px',
                  }"
                ></div>
                <div
                  class="gc-event"
                  v-for="gc in gcEvents"
                  :key="gc.id"
                  :style="{ left: gc.position + 'px' }"
                >
                  <div class="gc-marker"></div>
                  <div class="gc-label">GC</div>
                </div>
              </div>
              <div class="graph-labels">
                <div>时间</div>
                <div>内存使用量</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-star"></i>
          <h2>内存管理最佳实践</h2>
        </div>
        <div class="section-content">
          <div class="best-practices">
            <div class="practice-card">
              <div class="practice-icon">
                <i class="fas fa-ban"></i>
              </div>
              <h3>避免内存泄漏</h3>
              <ul>
                <li>及时清除不再需要的定时器和事件监听器</li>
                <li>避免意外的全局变量</li>
                <li>注意闭包引用</li>
              </ul>
            </div>

            <div class="practice-card">
              <div class="practice-icon">
                <i class="fas fa-object-group"></i>
              </div>
              <h3>优化对象结构</h3>
              <ul>
                <li>使用相同结构的对象，利于V8隐藏类优化</li>
                <li>避免动态添加/删除属性</li>
                <li>使用数组代替键值对存储大量数据</li>
              </ul>
            </div>

            <div class="practice-card">
              <div class="practice-icon">
                <i class="fas fa-memory"></i>
              </div>
              <h3>管理大内存</h3>
              <ul>
                <li>使用ArrayBuffer处理二进制数据</li>
                <li>对于大对象，考虑流式处理或分页加载</li>
                <li>使用对象池复用对象</li>
              </ul>
            </div>

            <div class="practice-card">
              <div class="practice-icon">
                <i class="fas fa-tools"></i>
              </div>
              <h3>监控与分析</h3>
              <ul>
                <li>使用Chrome DevTools Memory面板</li>
                <li>Node.js中使用--inspect和heapdump</li>
                <li>监控堆内存使用情况</li>
              </ul>
            </div>
          </div>

          <div class="practice-tip">
            <div class="tip-icon">
              <i class="fas fa-lightbulb"></i>
            </div>
            <p>
              <strong>关键提示：</strong>
              不要尝试过度优化GC，V8的垃圾回收器已经高度优化。专注于编写清晰、无内存泄漏的代码，让GC完成它的工作。
            </p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>V8垃圾回收算法解析 | JavaScript性能优化核心知识</p>
      <div class="footer-links">
        <a href="#"><i class="fab fa-google"></i> V8引擎文档</a>
        <a href="#"><i class="fab fa-chrome"></i> Chrome DevTools</a>
        <a href="#"><i class="fab fa-node-js"></i> Node.js性能优化</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 内存区域可视化数据
const memoryAreas = ref([
  {
    name: '新生代',
    size: '1-8MB',
    color: '#4ecdc4',
    icon: 'fas fa-seedling',
    blocks: Array(30)
      .fill(null)
      .map((_, i) => ({
        size: Math.random() * 20 + 10,
        active: Math.random() > 0.3,
      })),
  },
  {
    name: '老生代',
    size: '最大1.4GB',
    color: '#1a73e8',
    icon: 'fas fa-tree',
    blocks: Array(40)
      .fill(null)
      .map((_, i) => ({
        size: Math.random() * 30 + 15,
        active: Math.random() > 0.7,
      })),
  },
  {
    name: '大对象空间',
    size: '动态',
    color: '#8b5cf6',
    icon: 'fas fa-weight-hanging',
    blocks: Array(5)
      .fill(null)
      .map((_, i) => ({
        size: Math.random() * 40 + 30,
        active: Math.random() > 0.8,
      })),
  },
])

// 内存使用图表数据
const memoryUsage = ref(
  Array(20)
    .fill(null)
    .map((_, i) => ({
      usage: Math.floor(Math.random() * 60 + 20),
    })),
)

const gcEvents = ref([
  { id: 1, position: 50 },
  { id: 2, position: 150 },
  { id: 3, position: 280 },
  { id: 4, position: 350 },
])
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.v8-gc-container {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2d3748;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.hero-section {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  border-radius: 12px;
  color: white;
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
  padding: 40px 20px;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
    z-index: 0;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 15px;
      letter-spacing: -0.5px;
    }

    p {
      font-size: 1.3rem;
      font-weight: 300;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto 30px;
    }
  }
}

.memory-visualization {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.memory-area {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  width: 350px;
}

.area-header {
  display: flex;
  align-items: center;
  padding: 20px;
  color: white;

  i {
    font-size: 1.8rem;
    margin-right: 15px;
  }

  h3 {
    margin: 0;
    flex: 1;
    font-size: 1.5rem;
  }

  .size {
    background: rgba(255, 255, 255, 0.3);
    padding: 5px 15px;
    border-radius: 20px;
    font-weight: 600;
  }
}

.memory-blocks {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 8px;
  min-height: 150px;
  align-content: flex-start;
}

.memory-block {
  border-radius: 4px;
  animation: pulse 1.5s infinite;

  &.active {
    background: #10b981;
    opacity: 0.8;
  }

  &.inactive {
    background: #ef4444;
    opacity: 0.6;
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

.content-wrapper {
  padding: 0 20px;
}

.section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  margin-bottom: 30px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
}

.section-header {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  color: white;

  .icon {
    font-size: 1.8rem;
    margin-right: 15px;
  }

  h2 {
    margin: 0;
    font-size: 1.7rem;
    font-weight: 600;
  }
}

.section-content {
  padding: 25px;

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4a5568;
    margin-bottom: 20px;
  }
}

.gc-intro {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.intro-card {
  display: flex;
  gap: 20px;
  align-items: center;
  background: #f0f9ff;
  border-radius: 12px;
  padding: 25px;

  .intro-icon {
    width: 70px;
    height: 70px;
    background: #0ea5e9;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }

  h3 {
    margin-top: 0;
    color: #0369a1;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: #e0f2fe;
  border-radius: 10px;
  padding: 20px;
  text-align: center;

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #0ea5e9;
    margin-bottom: 10px;
  }

  .stat-label {
    color: #0c4a6e;
    font-size: 0.95rem;
  }
}

.gc-principle {
  margin-top: 30px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1e293b;
  }
}

.principle-diagram {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.generation {
  width: 300px;
  border: 2px solid #c7d2fe;
  border-radius: 12px;
  overflow: hidden;
}

.gen-header {
  background: #4f46e5;
  color: white;
  text-align: center;
  padding: 15px;
  font-weight: 600;
  font-size: 1.2rem;
}

.gen-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-height: 180px;
}

.algorithm {
  display: flex;
  align-items: center;
  gap: 15px;
  background: #eef2ff;
  padding: 15px;
  border-radius: 8px;

  i {
    font-size: 1.5rem;
    color: #4f46e5;
  }
}

.scavenge-process {
  margin-top: 30px;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.step {
  background: #f8fafc;
  border-radius: 10px;
  padding: 20px;
  border-left: 4px solid #4ecdc4;

  .step-number {
    width: 35px;
    height: 35px;
    background: #4ecdc4;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    margin-bottom: 15px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #0f766e;
  }
}

.scavenge-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 30px 0;
}

.space {
  width: 250px;
  background: #f8fafc;
  border-radius: 10px;
  padding: 15px;
  border: 2px dashed #c7d2fe;

  .space-label {
    text-align: center;
    font-weight: 600;
    margin-bottom: 15px;
    color: #4f46e5;
  }
}

.blocks-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.block {
  width: 30px;
  height: 30px;
  border-radius: 4px;

  &.active {
    background: #4ecdc4;
  }

  &.inactive {
    background: #ef4444;
    opacity: 0.6;
  }

  &.empty {
    background: #e2e8f0;
    border: 1px dashed #cbd5e1;
  }
}

.arrow {
  font-size: 2rem;
  color: #94a3b8;
}

.gc-algorithms {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  margin-top: 30px;
}

.algorithm-card {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.algo-header {
  display: flex;
  align-items: center;
  padding: 20px;
  color: white;
  gap: 15px;

  i {
    font-size: 1.8rem;
  }

  h3 {
    margin: 0;
    font-size: 1.4rem;
  }
}

.mark-sweep {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
}

.mark-compact {
  background: linear-gradient(90deg, #8b5cf6, #a78bfa);
}

.algo-steps {
  padding: 20px;
}

.algo-step {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  align-items: flex-start;

  .step-number {
    width: 30px;
    height: 30px;
    background: #eef2ff;
    color: #4f46e5;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
  }
}

.algo-pros-cons {
  display: flex;
  border-top: 1px solid #e2e8f0;

  .pros,
  .cons {
    flex: 1;
    padding: 20px;
  }

  .pros {
    background: #f0fdf4;

    h4 {
      color: #15803d;
    }
  }

  .cons {
    background: #fef2f2;

    h4 {
      color: #b91c1c;
    }
  }

  ul {
    padding-left: 20px;
    margin: 10px 0 0;

    li {
      margin-bottom: 8px;
    }
  }
}

.optimization-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.opt-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.06);
  }

  .opt-icon {
    width: 50px;
    height: 50px;
    background: #e0f2fe;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #0ea5e9;
    margin-bottom: 15px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #1e293b;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
  }
}

.trigger-timeline {
  position: relative;
  padding-left: 30px;
  margin: 30px 0;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #c7d2fe;
    border-radius: 2px;
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }

  .timeline-marker {
    position: absolute;
    left: -38px;
    top: 5px;
    width: 20px;
    height: 20px;
    background: #4f46e5;
    border-radius: 50%;
    border: 4px solid #eef2ff;
  }

  .timeline-content {
    background: #f8fafc;
    border-radius: 8px;
    padding: 20px;
    border-left: 3px solid #4f46e5;

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      color: #1e293b;
    }
  }
}

.code-example {
  background: #1e293b;
  color: #f1f5f9;
  border-radius: 6px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  overflow-x: auto;
  margin-top: 15px;

  pre {
    margin: 0;
  }
}

.memory-graph {
  margin-top: 40px;
}

.graph-container {
  position: relative;
  height: 250px;
  border-left: 2px solid #94a3b8;
  border-bottom: 2px solid #94a3b8;
  margin: 30px 0 20px 50px;
}

.graph {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.data-point {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
  transform: translate(-4px, 4px);
}

.gc-event {
  position: absolute;
  bottom: 0;

  .gc-marker {
    width: 20px;
    height: 20px;
    background: #ef4444;
    border-radius: 50%;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: -150px;
      left: 9px;
      width: 2px;
      height: 150px;
      background: #ef4444;
      opacity: 0.3;
    }
  }

  .gc-label {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: #ef4444;
    color: white;
    padding: 3px 10px;
    border-radius: 4px;
    font-size: 0.85rem;
    font-weight: 600;
    white-space: nowrap;
  }
}

.graph-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  color: #64748b;
  font-size: 0.9rem;
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.practice-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.06);
  }

  .practice-icon {
    width: 50px;
    height: 50px;
    background: #e0f2fe;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #0ea5e9;
    margin-bottom: 15px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #1e293b;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 10px;
      line-height: 1.5;
    }
  }
}

.practice-tip {
  display: flex;
  gap: 20px;
  align-items: center;
  background: #f0fdf4;
  border-radius: 12px;
  padding: 20px;
  margin-top: 30px;
  border-left: 4px solid #10b981;

  .tip-icon {
    width: 50px;
    height: 50px;
    background: #10b981;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  p {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.6;
  }
}

.footer {
  text-align: center;
  padding: 25px;
  color: #64748b;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 15px;

    a {
      color: #4f46e5;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 900px) {
  .hero-content h1 {
    font-size: 2.2rem !important;
  }

  .memory-area {
    width: 100%;
    max-width: 400px;
  }

  .principle-diagram {
    flex-direction: column;
    align-items: center;
  }

  .scavenge-visual {
    flex-direction: column;
    gap: 30px;
  }

  .gc-algorithms {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 600px) {
  .hero-content h1 {
    font-size: 1.8rem !important;
  }

  .hero-content p {
    font-size: 1.1rem !important;
  }

  .section-header h2 {
    font-size: 1.4rem !important;
  }
}
</style>
