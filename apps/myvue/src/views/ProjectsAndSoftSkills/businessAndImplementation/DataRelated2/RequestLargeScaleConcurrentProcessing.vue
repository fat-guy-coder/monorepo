<template>
  <div class="concurrent-requests-container">
    <!-- 头部标题区域 -->
    <header class="header">
      <h1><i class="fas fa-bolt"></i> 前端大规模并发请求优化方案</h1>
      <p class="subtitle">高效处理海量并发请求，提升应用性能和用户体验</p>
    </header>

    <!-- 主内容区域 -->
    <main class="content">
      <!-- 问题背景卡片 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-exclamation-triangle"></i>
          <h2>大规模并发请求的挑战</h2>
        </div>
        <div class="card-content">
          <div class="problem-statement">
            <p>当应用需要同时处理大量请求时，会面临以下挑战：</p>
            <div class="challenges">
              <div class="challenge">
                <div class="icon">
                  <i class="fas fa-plug"></i>
                </div>
                <div class="content">
                  <h3>浏览器连接限制</h3>
                  <p>Chrome/Firefox 最多允许6个并发HTTP/1.1连接</p>
                </div>
              </div>
              <div class="challenge">
                <div class="icon">
                  <i class="fas fa-memory"></i>
                </div>
                <div class="content">
                  <h3>内存占用过高</h3>
                  <p>大量未完成的请求导致内存溢出</p>
                </div>
              </div>
              <div class="challenge">
                <div class="icon">
                  <i class="fas fa-tachometer-alt"></i>
                </div>
                <div class="content">
                  <h3>性能下降</h3>
                  <p>请求排队导致UI卡顿，用户体验差</p>
                </div>
              </div>
              <div class="challenge">
                <div class="icon">
                  <i class="fas fa-server"></i>
                </div>
                <div class="content">
                  <h3>服务器压力</h3>
                  <p>大量并发请求可能导致服务器崩溃</p>
                </div>
              </div>
            </div>
          </div>

          <div class="problem-visualization">
            <div class="browser">
              <div class="browser-header">浏览器</div>
              <div class="connections">
                <div v-for="i in 6" :key="i" class="connection active">
                  <div class="connection-label">请求 {{ i }}</div>
                </div>
                <div v-for="i in pendingRequests" :key="'pending' + i" class="connection pending">
                  <div class="connection-label">排队中</div>
                </div>
              </div>
              <div class="stats">已使用连接: 6/6 | 排队请求: {{ pendingRequests }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 优化方案 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-lightbulb"></i>
          <h2>并发请求优化方案</h2>
        </div>
        <div class="card-content">
          <div class="optimization-grid">
            <div class="strategy">
              <div class="strategy-header">
                <div class="icon">
                  <i class="fas fa-list-ol"></i>
                </div>
                <h3>请求队列</h3>
              </div>
              <div class="strategy-content">
                <p>使用队列控制并发数量，避免超过浏览器限制</p>
                <div class="implementation">
                  <h4>实现方式：</h4>
                  <ul>
                    <li>创建请求队列和等待队列</li>
                    <li>设置最大并发数（如4-6）</li>
                    <li>请求完成后从队列中移除，添加新请求</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="strategy">
              <div class="strategy-header">
                <div class="icon">
                  <i class="fas fa-puzzle-piece"></i>
                </div>
                <h3>请求分片</h3>
              </div>
              <div class="strategy-content">
                <p>将大数据请求拆分为多个小请求分批次处理</p>
                <div class="implementation">
                  <h4>实现方式：</h4>
                  <ul>
                    <li>将大数据集拆分为多个小批次</li>
                    <li>每个批次单独请求</li>
                    <li>合并处理结果</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="strategy">
              <div class="strategy-header">
                <div class="icon">
                  <i class="fas fa-database"></i>
                </div>
                <h3>请求缓存</h3>
              </div>
              <div class="strategy-content">
                <p>缓存已获取数据，避免重复请求</p>
                <div class="implementation">
                  <h4>实现方式：</h4>
                  <ul>
                    <li>使用内存缓存（Map/WeakMap）</li>
                    <li>设置缓存过期时间</li>
                    <li>根据请求参数生成缓存键</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="strategy">
              <div class="strategy-header">
                <div class="icon">
                  <i class="fas fa-ban"></i>
                </div>
                <h3>请求取消</h3>
              </div>
              <div class="strategy-content">
                <p>取消不必要的请求，释放资源</p>
                <div class="implementation">
                  <h4>实现方式：</h4>
                  <ul>
                    <li>使用AbortController取消请求</li>
                    <li>组件卸载时自动取消</li>
                    <li>新请求覆盖旧请求时取消</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 代码实现 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-code"></i>
          <h2>请求队列实现代码</h2>
        </div>
        <div class="card-content">
          <div class="code-section">
            <pre class="code-block"><code>import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';

// 请求任务接口
interface RequestTask {
  config: AxiosRequestConfig;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  cancelTokenSource: CancelTokenSource;
}

// 并发请求队列类
class RequestQueue {
  private maxConcurrent: number; // 最大并发数
  private activeCount: number = 0; // 当前活动请求数
  private queue: RequestTask[] = []; // 等待队列

  constructor(maxConcurrent: number = 4) {
    this.maxConcurrent = maxConcurrent;
  }

  /**
   * 添加请求到队列
   * @param config Axios请求配置
   * @returns Promise响应
   */
  async add(config: AxiosRequestConfig): Promise&lt;any&gt; {
    // 创建取消令牌
    const cancelTokenSource = axios.CancelToken.source();

    // 创建任务Promise
    const taskPromise = new Promise((resolve, reject) => {
      this.queue.push({
        config: { ...config, cancelToken: cancelTokenSource.token },
        resolve,
        reject,
        cancelTokenSource
      });
    });

    // 尝试执行下一个任务
    this.next();

    return taskPromise;
  }

  /**
   * 执行下一个请求
   */
  private next() {
    // 达到最大并发数或队列为空时停止
    if (this.activeCount >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    // 从队列中取出任务
    const task = this.queue.shift()!;
    this.activeCount++;

    // 执行请求
    axios(task.config)
      .then(response => {
        task.resolve(response.data);
      })
      .catch(error => {
        // 如果不是取消错误，则拒绝
        if (!axios.isCancel(error)) {
          task.reject(error);
        }
      })
      .finally(() => {
        this.activeCount--;
        this.next(); // 继续下一个任务
      });
  }

  /**
   * 取消所有等待中的请求
   */
  cancelAllPending() {
    this.queue.forEach(task => {
      task.cancelTokenSource.cancel('Request canceled by queue');
    });
    this.queue = [];
  }

  /**
   * 获取队列状态
   */
  getStatus() {
    return {
      active: this.activeCount,
      pending: this.queue.length,
      maxConcurrent: this.maxConcurrent
    };
  }
}

// 创建请求队列实例（最大并发数4）
const requestQueue = new RequestQueue(4);

// 示例使用
export async function fetchWithQueue(url: string, params?: any) {
  return requestQueue.add({
    method: 'get',
    url,
    params
  });
}</code></pre>
          </div>

          <div class="code-explanation">
            <h3>代码关键点解析</h3>
            <div class="explanation-points">
              <div class="point">
                <div class="point-number">1</div>
                <div class="point-content">
                  <h4>请求任务接口</h4>
                  <p>定义请求任务结构，包含配置、Promise解决/拒绝函数和取消令牌</p>
                </div>
              </div>
              <div class="point">
                <div class="point-number">2</div>
                <div class="point-content">
                  <h4>队列管理</h4>
                  <p>使用数组存储等待任务，控制活动请求数量</p>
                </div>
              </div>
              <div class="point">
                <div class="point-number">3</div>
                <div class="point-content">
                  <h4>添加请求</h4>
                  <p>将请求添加到队列并返回Promise，触发下一个任务处理</p>
                </div>
              </div>
              <div class="point">
                <div class="point-number">4</div>
                <div class="point-content">
                  <h4>任务执行</h4>
                  <p>从队列取出任务执行，完成后减少活动计数并触发下一个任务</p>
                </div>
              </div>
              <div class="point">
                <div class="point-number">5</div>
                <div class="point-content">
                  <h4>取消机制</h4>
                  <p>提供取消所有等待中请求的方法</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 代码实现 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-code"></i>
          <h2>利用并发数进行控制</h2>
        </div>
        <div class="card-content">
          <div class="code-section">
            <pre class="code-block"><code>
+async sendRequest(forms, max=4,errcontinue=true,errcb?) {
+  return new Promise((resolve) => {
+    const len = forms.length;
+    let idx = 0;// 当前请求索引
+    let counter = 0;// 当前并发数
+    const start = async (errindex)=> {
+      // 未完成, 有通道
+      while (idx < len  && counter< max  ) {
+        counter += 1; // 占用通道
+        console.log(idx, "start");
+        const form = forms[errindex||idx].form;
         if(!errindex){
          idx++
         }
+        request({
+          url: '/upload',
+          data: form,
+        }).then(() => {
+          counter -= 1;// 释放通道
+          if ((idx+1 )=== len) {// 所有请求完成
+            resolve();
+          } else {
+            start();// 递归
+          }
+        }).catch(err => {
+         errcb&&errcb(idx,err)//第几条请求失败并处理
          errcontinue&&start(idx)//失败后是否继续
+        });
+      }
+    }
+    start();
+  });
+}

sendRequest(list,4,(idx,err)=>{
  console.log(err);
},errcontinue)
</code></pre>
          </div>

          <div class="code-explanation">
            <h3>代码关键点解析</h3>
            <div class="explanation-points">
              <div class="point">
                <div class="point-number">1</div>
                <div class="point-content">
                  <h4>定义并发数max</h4>
                  <p>新增请求并发数max++，请求完成max--</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-header">
          <i class="fas fa-code"></i>
          <h2>利用Promise.race进行控制并发数</h2>
        </div>
        <div class="card-content">
          <div class="code-section">
            <pre class="code-block"><code>async function asyncPool({
  limit,
  items,
  fn
}) {
  const promises= []
  const pool = new Set()
  for (const item of items) {
    const promise = fn(item)
    promises.push(promise)
    pool.add(promise)
    const clean = () => pool.delete(promise)
    promise.then(clean, clean)
    if (pool.size >= limit) await Promise.race(pool)
  }
  return Promise.all(promises)
}
</code>
            </pre>
          </div>

          <div class="code-explanation">
            <h3>代码关键点解析</h3>
            <div class="explanation-points">
              <div class="point">
                <div class="point-number">1</div>
                <div class="point-content">
                  <h4>Promise.race将最先完成的请求从pool中删除，pool.size-1</h4>
                  <p>然后继续添加新的请求到pool中，直到pool.size>=limit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 请求分片实现 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-puzzle-piece"></i>
          <h2>请求分片实现</h2>
        </div>
        <div class="card-content">
          <div class="code-section">
            <pre class="code-block"><code>/**
 * 分片请求函数
 * @param data 完整数据集
 * @param chunkSize 分片大小
 * @param fetchFunc 处理每个分片的函数
 * @param progressCallback 进度回调
 * @returns Promise包含所有结果
 */
export async function chunkedRequest&lt;T, R&gt;(
  data: T[],
  chunkSize: number,
  fetchFunc: (chunk: T[]) => Promise&lt;R&gt;,
  progressCallback?: (progress: number) => void
): Promise&lt;R[]&gt; {
  const results: R[] = [];
  const totalChunks = Math.ceil(data.length / chunkSize);

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = start + chunkSize;
    const chunk = data.slice(start, end);

    try {
      const result = await fetchFunc(chunk);
      results.push(result);

      // 更新进度
      if (progressCallback) {
        const progress = Math.round(((i + 1) / totalChunks) * 100);
        progressCallback(progress);
      }
    } catch (error) {
      console.error(`分片请求失败 (${i+1}/${totalChunks}):`, error);
      // 可选：是否继续处理后续分片
      // throw error; // 如果希望失败时中断
    }
  }

  return results;
}

// 示例使用：分片获取用户详情
async function fetchUserDetails(userIds: string[]) {
  const chunkSize = 20; // 每批20个用户
  const results = await chunkedRequest(
    userIds,
    chunkSize,
    async (chunk) => {
      // 实际API调用
      const response = await axios.post('/api/users/batch', { userIds: chunk });
      return response.data;
    },
    (progress) => {
      console.log(`进度: ${progress}%`);
      // 更新UI进度
    }
  );

  // 合并所有结果
  return results.flat();
}</code></pre>
          </div>

          <div class="visualization">
            <div class="chunk-process">
              <div class="chunks">
                <div v-for="(chunk, index) in chunks" :key="index" class="chunk"
                  :class="{ active: currentChunk === index }">
                  <div class="chunk-label">分片 {{ index + 1 }}</div>
                  <div class="chunk-data">
                    <div v-for="item in chunk" :key="item" class="data-item">
                      {{ item }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="progress-container">
                <div class="progress-bar" :style="{ width: progress + '%' }">
                  <div class="progress-text">{{ progress }}%</div>
                </div>
              </div>

              <div class="controls">
                <button @click="startChunkedRequests">
                  <i class="fas fa-play"></i> 开始分片请求
                </button>
                <button @click="resetChunks" class="secondary">
                  <i class="fas fa-redo"></i> 重置
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 完整示例 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-cogs"></i>
          <h2>完整优化方案实现</h2>
        </div>
        <div class="card-content">
          <div class="implementation-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>初始化请求队列</h3>
                <p>设置合理的最大并发数（通常4-6）</p>
                <pre class="inline-code">const requestQueue = new RequestQueue(4);</pre>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>分片大数据集</h3>
                <p>根据后端支持情况设置分片大小</p>
                <pre class="inline-code">const chunkSize = 20; // 每批20个请求</pre>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>添加缓存层</h3>
                <p>缓存已获取数据，避免重复请求</p>
                <pre class="inline-code">const cache = new Map&lt;string, any&gt;();</pre>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>实现请求函数</h3>
                <p>整合队列、分片和缓存</p>
              </div>
            </div>
          </div>

          <div class="full-code">
            <pre class="code-block"><code>// 带队列和缓存的分片请求
export async function optimizedRequest(
  requestItems: string[],
  chunkSize: number = 20,
  cache: Map&lt;string, any&gt;
) {
  // 1. 过滤已缓存的项
  const uncachedItems = requestItems.filter(id => !cache.has(id));

  // 2. 分片处理未缓存的项
  const results = await chunkedRequest(
    uncachedItems,
    chunkSize,
    async (chunk) => {
      // 使用队列发送请求
      return requestQueue.add({
        method: 'post',
        url: '/api/batch-data',
        data: { items: chunk }
      });
    }
  );

  // 3. 缓存新获取的数据
  results.forEach(data => {
    cache.set(data.id, data);
  });

  // 4. 合并缓存数据和新增数据
  return requestItems.map(id => cache.get(id));
}

// 示例使用
const dataCache = new Map&lt;string, any&gt;();

async function loadData() {
  const itemIds = [/* 大量ID数组 */];
  const data = await optimizedRequest(itemIds, 20, dataCache);
  // 使用数据...
}</code></pre>
          </div>

          <div class="performance-comparison">
            <h3>性能对比</h3>
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>指标</th>
                    <th>未优化</th>
                    <th>优化后</th>
                    <th>提升</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1000个请求总时间</td>
                    <td>25-40秒</td>
                    <td>8-12秒</td>
                    <td>60-70%</td>
                  </tr>
                  <tr>
                    <td>内存峰值</td>
                    <td>500-800MB</td>
                    <td>100-150MB</td>
                    <td>80%</td>
                  </tr>
                  <tr>
                    <td>UI卡顿时间</td>
                    <td>15-25秒</td>
                    <td>0-1秒</td>
                    <td>95%+</td>
                  </tr>
                  <tr>
                    <td>失败率</td>
                    <td>10-20%</td>
                    <td>&lt;1%</td>
                    <td>90%+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-check-circle"></i>
          <h2>最佳实践与注意事项</h2>
        </div>
        <div class="card-content">
          <div class="best-practices">
            <div class="practice">
              <div class="icon">
                <i class="fas fa-sliders-h"></i>
              </div>
              <div class="content">
                <h3>合理设置并发数</h3>
                <p>根据浏览器限制（6个连接）和服务器能力设置并发数，通常4-6是最佳选择</p>
              </div>
            </div>
            <div class="practice">
              <div class="icon">
                <i class="fas fa-exchange-alt"></i>
              </div>
              <div class="content">
                <h3>后端配合优化</h3>
                <p>与后端协调实现批量API，减少请求次数</p>
              </div>
            </div>
            <div class="practice">
              <div class="icon">
                <i class="fas fa-hourglass-half"></i>
              </div>
              <div class="content">
                <h3>添加进度反馈</h3>
                <p>显示分片请求进度，提升用户体验</p>
              </div>
            </div>
            <div class="practice">
              <div class="icon">
                <i class="fas fa-exclamation-triangle"></i>
              </div>
              <div class="content">
                <h3>错误处理机制</h3>
                <p>实现重试机制和部分失败处理</p>
              </div>
            </div>
          </div>

          <div class="advanced-tips">
            <h3>高级优化技巧</h3>
            <ul>
              <li>使用Web Workers处理复杂数据转换，避免阻塞UI线程</li>
              <li>实现请求优先级系统，确保关键请求优先处理</li>
              <li>添加请求节流，避免短时间内大量请求冲击</li>
              <li>使用IndexedDB缓存大型数据集，减少重复请求</li>
              <li>监控请求队列状态，动态调整并发数</li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>前端大规模并发请求优化方案 | Vue3实现 | 提升应用性能和用户体验</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { main } from './req';


// main()


// 问题背景数据
const pendingRequests = ref(8);

// 请求分片演示数据
const chunks = ref<number[][]>([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30]
]);
const currentChunk = ref(-1);
const progress = ref(0);


// 模拟分片请求
const startChunkedRequests = async () => {
  progress.value = 0;
  currentChunk.value = -1;

  for (let i = 0; i < chunks.value.length; i++) {
    currentChunk.value = i;

    // 模拟请求延迟
    await new Promise(resolve => setTimeout(resolve, 800));

    // 更新进度
    progress.value = Math.round(((i + 1) / chunks.value.length) * 100);
  }
};

// 重置分片
const resetChunks = () => {
  currentChunk.value = -1;
  progress.value = 0;
};

// 初始动画
onMounted(() => {
  setInterval(() => {
    pendingRequests.value = Math.floor(Math.random() * 10) + 3;
  }, 2000);
});
</script>

<style lang="less" scoped>
@primary: #4361ee;
@primary-light: #4895ef;
@secondary: #3f37c9;
@success: #4cc9f0;
@warning: #ff9e00;
@text: #2b2d42;
@text-light: #8d99ae;
@background: #f8f9fa;
@card-bg: #ffffff;
@border: #e9ecef;
@shadow: rgba(149, 157, 165, 0.1);

.concurrent-requests-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: @background;
  color: @text;
  line-height: 1.6;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary, @secondary);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 12px @shadow;

  h1 {
    font-size: 2.2rem;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .subtitle {
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0.9;
  }
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;
}

.card {
  background: @card-bg;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px @shadow;
  border: 1px solid @border;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(149, 157, 165, 0.2);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    color: @primary;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid @border;

    h2 {
      font-size: 1.6rem;
      margin: 0;
    }

    i {
      font-size: 1.5rem;
    }
  }
}

.problem-statement {
  margin-bottom: 25px;

  .challenges {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;

    .challenge {
      display: flex;
      gap: 15px;
      padding: 15px;
      background: rgba(@primary, 0.05);
      border-radius: 8px;

      .icon {
        width: 50px;
        height: 50px;
        background: rgba(@primary, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          font-size: 1.5rem;
          color: @primary;
        }
      }

      .content {
        flex: 1;

        h3 {
          margin: 0 0 5px 0;
          color: @text;
        }

        p {
          margin: 0;
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }
  }
}

.problem-visualization {
  border: 1px solid @border;
  border-radius: 8px;
  padding: 20px;
  background: rgba(@primary, 0.03);
  margin-top: 25px;

  .browser {
    border: 2px solid @primary;
    border-radius: 8px;
    overflow: hidden;

    .browser-header {
      background: @primary;
      color: white;
      padding: 10px;
      text-align: center;
      font-weight: 600;
    }

    .connections {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      padding: 20px;

      .connection {
        width: 100px;
        height: 60px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        color: white;
        transition: all 0.3s;

        &.active {
          background: linear-gradient(to right, @success, #3aafa9);
        }

        &.pending {
          background: linear-gradient(to right, @warning, #ff9e00);
          opacity: 0.7;
        }
      }
    }

    .stats {
      padding: 10px;
      text-align: center;
      background: rgba(@primary, 0.1);
      font-weight: 500;
      color: @primary;
    }
  }
}

.optimization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  .strategy {
    border: 1px solid @border;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .strategy-header {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 15px;
      background: rgba(@primary, 0.1);

      .icon {
        width: 40px;
        height: 40px;
        background: @primary;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
      }

      h3 {
        margin: 0;
        color: @text;
      }
    }

    .strategy-content {
      padding: 15px;

      p {
        margin-top: 0;
      }

      .implementation {
        background: rgba(@primary, 0.05);
        border-radius: 6px;
        padding: 15px;
        margin-top: 10px;

        h4 {
          margin-top: 0;
          color: @primary;
        }

        ul {
          padding-left: 20px;
          margin: 10px 0;

          li {
            margin-bottom: 8px;
          }
        }
      }
    }
  }
}

.code-block {
  background: #f8f9fa;
  color: #2b2d42;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 20px 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.code-explanation {
  margin-top: 30px;

  .explanation-points {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 15px;

    .point {
      display: flex;
      gap: 15px;
      padding: 15px;
      background: rgba(@primary, 0.05);
      border-radius: 8px;

      .point-number {
        width: 35px;
        height: 35px;
        background: @primary;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
        font-size: 1.1rem;
      }

      .point-content {
        flex: 1;

        h4 {
          margin: 0 0 8px 0;
          color: @text;
        }

        p {
          margin: 0;
          color: @text-light;
        }
      }
    }
  }
}

.visualization {
  margin-top: 25px;

  .chunk-process {
    border: 1px solid @border;
    border-radius: 8px;
    padding: 20px;
    background: rgba(@primary, 0.03);

    .chunks {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin-bottom: 25px;

      .chunk {
        border: 1px solid @border;
        border-radius: 8px;
        overflow: hidden;
        opacity: 0.6;
        transition: all 0.3s;

        &.active {
          opacity: 1;
          border-color: @success;
          box-shadow: 0 0 0 2px rgba(@success, 0.3);
          transform: scale(1.05);
        }

        .chunk-label {
          background: rgba(@primary, 0.1);
          padding: 8px;
          text-align: center;
          font-weight: 500;
          color: @primary;
        }

        .chunk-data {
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 5px;

          .data-item {
            padding: 5px;
            background: rgba(@primary, 0.05);
            border-radius: 4px;
            text-align: center;
            font-size: 0.85rem;
          }
        }
      }
    }

    .progress-container {
      height: 30px;
      background: @background;
      border-radius: 15px;
      overflow: hidden;
      border: 1px solid @border;
      position: relative;
      margin: 20px 0;

      .progress-bar {
        height: 100%;
        background: linear-gradient(to right, @primary, @primary-light);
        border-radius: 15px;
        transition: width 0.5s ease;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        min-width: 30px;

        .progress-text {
          color: white;
          padding: 0 15px;
          font-weight: bold;
          font-size: 0.9rem;
        }
      }
    }

    .controls {
      display: flex;
      gap: 10px;
      justify-content: center;

      button {
        background: @primary;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;

        &:hover {
          background: @secondary;
          transform: translateY(-2px);
        }

        &.secondary {
          background: @card-bg;
          color: @primary;
          border: 1px solid @border;

          &:hover {
            background: @background;
          }
        }
      }
    }
  }
}

.implementation-steps {
  margin: 25px 0;

  .step {
    display: flex;
    gap: 15px;
    margin-bottom: 25px;

    .step-number {
      width: 35px;
      height: 35px;
      background: @primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
      font-size: 1.1rem;
    }

    .step-content {
      flex: 1;

      h3 {
        margin: 0 0 10px 0;
        color: @text;
      }

      .inline-code {
        display: inline-block;
        background: rgba(@primary, 0.1);
        padding: 3px 8px;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        margin-top: 8px;
      }
    }
  }
}

.full-code {
  margin: 30px 0;
}

.performance-comparison {
  margin-top: 30px;

  .comparison-table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px 15px;
      border: 1px solid @border;
      text-align: left;
    }

    th {
      background: rgba(@primary, 0.1);
      color: @primary;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: rgba(@primary, 0.03);
    }
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  .practice {
    display: flex;
    gap: 15px;
    padding: 15px;
    background: rgba(@primary, 0.05);
    border-radius: 8px;

    .icon {
      width: 50px;
      height: 50px;
      background: rgba(@primary, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      i {
        font-size: 1.5rem;
        color: @primary;
      }
    }

    .content {
      flex: 1;

      h3 {
        margin: 0 0 5px 0;
        color: @text;
      }

      p {
        margin: 0;
        color: @text-light;
      }
    }
  }
}

.advanced-tips {
  border-top: 1px solid @border;
  padding-top: 20px;
  margin-top: 30px;

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 12px;
      position: relative;
      padding-left: 25px;

      &::before {
        content: "•";
        color: @primary;
        font-weight: bold;
        position: absolute;
        left: 10px;
        font-size: 1.2rem;
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: @text-light;
  font-size: 0.9rem;
  border-top: 1px solid @border;
}
</style>
