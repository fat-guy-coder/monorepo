<template>
  <div class="stream-container">
    <header class="header">
      <h1>Node.js Stream 模块基础介绍</h1>
      <p class="subtitle">高效处理流式数据的核心工具</p>
    </header>

    <div class="content-wrapper">
      <div class="intro-section">
        <div class="intro-card">
          <div class="definition">
            <div class="stream-icon">🌊</div>
            <div>
              <h2>什么是 Stream？</h2>
              <p>Stream 是 Node.js 中处理流式数据的抽象接口，用于高效处理大型数据而不消耗大量内存。Stream 不是一次性将数据加载到内存，而是分块处理数据。</p>
              <div class="feature">
                <span class="feature-tag">内存高效</span>
                <span class="feature-tag">实时处理</span>
                <span class="feature-tag">组合管道</span>
                <span class="feature-tag">错误处理</span>
              </div>
            </div>
          </div>

          <div class="installation">
            <h3>核心概念</h3>
            <div class="concepts">
              <div class="concept">
                <div class="concept-icon">🔢</div>
                <div>
                  <h4>分块处理</h4>
                  <p>数据被分割成小块(chunks)依次处理</p>
                </div>
              </div>
              <div class="concept">
                <div class="concept-icon">🔄</div>
                <div>
                  <h4>背压机制</h4>
                  <p>防止读写速度不匹配导致内存溢出</p>
                </div>
              </div>
              <div class="concept">
                <div class="concept-icon">🧩</div>
                <div>
                  <h4>管道连接</h4>
                  <p>多个流通过管道组合成处理链</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="stream-types-section">
        <h2 class="section-title">流类型</h2>

        <div class="types-grid">
          <div class="type-card readable">
            <div class="type-header">
              <h3>可读流 (Readable)</h3>
              <div class="type-icon">📖</div>
            </div>
            <div class="type-content">
              <p>数据来源，可从中读取数据</p>
              <ul>
                <li><strong>模式</strong>：流动模式(flowing) vs 暂停模式(paused)</li>
                <li><strong>事件</strong>：'data', 'end', 'error'</li>
                <li><strong>方法</strong>：pipe(), read(), pause(), resume()</li>
              </ul>
              <div class="example">
                <pre class="code-block">const fs = require('fs');
const readable = fs.createReadStream('file.txt');

readable.on('data', (chunk) => {
  console.log(`接收到 ${chunk.length} 字节数据`);
});

readable.on('end', () => {
  console.log('没有更多数据');
});</pre>
              </div>
            </div>
          </div>

          <div class="type-card writable">
            <div class="type-header">
              <h3>可写流 (Writable)</h3>
              <div class="type-icon">✍️</div>
            </div>
            <div class="type-content">
              <p>数据目标，可向其中写入数据</p>
              <ul>
                <li><strong>方法</strong>：write(), end(), cork(), uncork()</li>
                <li><strong>事件</strong>：'drain', 'finish', 'error'</li>
                <li><strong>背压</strong>：处理写入速度差异</li>
              </ul>
              <div class="example">
                <pre class="code-block">const fs = require('fs');
const writable = fs.createWriteStream('output.txt');

writable.write('写入一些数据\n');
writable.write('再写入一些数据\n');
writable.end('完成写入');</pre>
              </div>
            </div>
          </div>

          <div class="type-card duplex">
            <div class="type-header">
              <h3>双工流 (Duplex)</h3>
              <div class="type-icon">↔️</div>
            </div>
            <div class="type-content">
              <p>同时实现可读和可写接口</p>
              <ul>
                <li><strong>特点</strong>：双向数据流</li>
                <li><strong>示例</strong>：TCP sockets</li>
                <li><strong>使用</strong>：独立读写通道</li>
              </ul>
              <div class="example">
                <pre class="code-block">const { Duplex } = require('stream');

const myDuplex = new Duplex({
  write(chunk, encoding, callback) {
    console.log('写入:', chunk.toString());
    callback();
  },

  read(size) {
    // 推送数据到可读端
    this.push('从双工流读取的数据');
    this.push(null); // 结束流
  }
});</pre>
              </div>
            </div>
          </div>

          <div class="type-card transform">
            <div class="type-header">
              <h3>转换流 (Transform)</h3>
              <div class="type-icon">🔄</div>
            </div>
            <div class="type-content">
              <p>在读写过程中修改或转换数据</p>
              <ul>
                <li><strong>特点</strong>：输出是输入的转换结果</li>
                <li><strong>核心方法</strong>：_transform()</li>
                <li><strong>常见用途</strong>：压缩、加密、数据转换</li>
              </ul>
              <div class="example">
                <pre class="code-block">const { Transform } = require('stream');

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    // 转换为大写并推送结果
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin.pipe(upperCaseTransform).pipe(process.stdout);</pre>
              </div>
            </div>
          </div>
        </div>
      </div>


      <section class="write-stream-section">
        <h2 class="section-title">fs.createWriteStream 用法基础介绍</h2>
        <div class="write-stream-content">
          <div class="write-stream-intro">
            <div class="write-stream-icon">📝</div>
            <div>
              <h3>作用</h3>
              <p>
                <code>fs.createWriteStream()</code> 是 Node.js <code>fs</code>
                模块中用于创建可写流的核心方法。它允许你以流的方式高效写入大型文件，适合处理大量数据或需要分块写入的场景。
              </p>
            </div>
          </div>
          <div class="write-stream-details">
            <h3>常用参数</h3>
            <ul>
              <li><strong>path</strong>：要写入的文件路径（必填）</li>
              <li><strong>options</strong>：可选配置对象，如
                <code>flags</code>（写入方式）、<code>encoding</code>（编码）、<code>highWaterMark</code>（缓冲区大小）、<code>mode</code>（权限）等
              </li>
            </ul>
          </div>
          <div class="write-stream-example">
            <h3>示例代码</h3>
            <pre class="code-block">const fs = require('fs');

// 创建一个写入流，写入到 output.txt
const ws = fs.createWriteStream('output.txt', {
  flags: 'w',           // 写入方式，'w'为写入（覆盖），'a'为追加
  encoding: 'utf8',     // 写入编码
  highWaterMark: 16 * 1024, // 缓冲区大小（可选）
  autoClose: true, // 写入完成后自动关闭文件
  emitClose: true, // 写入完成后触发'close'事件
  start: 0, // 写入开始位置
  end: 100, // 写入结束位置
  autoDestroy: true, // 写入完成后自动销毁流
  error: null, // 写入错误
});

ws.write('第一行内容\n');
ws.write('第二行内容\n');
ws.end('写入结束！'); // 结束写入流

ws.on('finish', () => {
  console.log('文件写入完成');
});</pre>
          </div>
          <div class="write-stream-tips">
            <strong>性能提示：</strong>
            <ul>
              <li>使用流写入大文件时，内存占用低，写入过程不会阻塞主线程。</li>
              <li>合理设置 <code>highWaterMark</code> 可以优化写入性能。</li>
              <li>监听 <code>finish</code> 事件确保写入完成后再进行后续操作。</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="write-stream-section">
        <div class="write-stream-content">
          <div class="write-stream-intro">
            <div class="write-stream-icon">📖</div>
            <div>
              <h3>作用</h3>
              <p>
                <code>fs.createReadStream()</code> 是 Node.js <code>fs</code>
                模块中用于创建可读流的核心方法。它允许你以流的方式高效读取大型文件，适合处理大文件或需要分块读取的场景，避免一次性加载全部内容到内存。
              </p>
            </div>
          </div>
          <div class="write-stream-details">
            <h3>常用参数</h3>
            <ul>
              <li><strong>path</strong>：要读取的文件路径（必填）</li>
              <li><strong>options</strong>：可选配置对象，如
                <code>flags</code>（读取方式）、<code>encoding</code>（编码）、<code>highWaterMark</code>（每次读取的字节数）、<code>start</code>/<code>end</code>（读取区间）等
              </li>
            </ul>
          </div>
          <div class="write-stream-example">
            <h3>示例代码</h3>
            <pre class="code-block">const fs = require('fs');

// 创建一个读取流，读取 input.txt
const rs = fs.createReadStream('input.txt', {
  flags: 'r',           // 读取方式，'r'为读取
  encoding: 'utf8',     // 读取编码
  highWaterMark: 8 * 1024, // 每次读取8KB（可选）
  start: 0, // 读取开始位置
  end: 100, // 读取结束位置
  autoClose: true, // 读取完成后自动关闭文件
  emitClose: true, // 读取完成后触发'close'事件
  autoDestroy: true, // 读取完成后自动销毁流
  error: null, // 读取错误
});

rs.on('data', (chunk) => {
  console.log('读取到数据块:', chunk);
});

rs.on('end', () => {
  console.log('文件读取完成');
});

rs.on('error', (err) => {
  console.error('读取出错:', err);
});</pre>
          </div>
          <div class="write-stream-tips">
            <strong>性能提示：</strong>
            <ul>
              <li>使用流读取大文件时，内存占用低，读取过程不会阻塞主线程。</li>
              <li>合理设置 <code>highWaterMark</code> 可以优化读取性能。</li>
              <li>监听 <code>data</code> 事件分块处理数据，监听 <code>end</code> 事件确保读取完成。</li>
              <li>处理 <code>error</code> 事件，避免读取过程中出现未捕获异常。</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- INSERT_YOUR_CODE -->
      <section class="write-stream-section">
        <h2 class="section-title">Duplex 流</h2>
        <div class="duplex-stream-card">
          <div class="write-stream-intro">
            <div class="duplex-icon">🔀</div>
            <div>
              <h2>什么是 Duplex 流？</h2>
              <p>
                Duplex（双工）流是 Node.js Stream 模块中既可读又可写的流。它结合了 Readable 和 Writable 的特性，常用于网络通信、加密/解密等场景。
              </p>
              <div class="feature">
                <span class="feature-tag">可读可写</span>
                <span class="feature-tag">数据双向流动</span>
                <span class="feature-tag">自定义实现</span>
                <span class="feature-tag">高效通信</span>
              </div>
            </div>
          </div>

          <div class="duplex-usage">
            <h3>常用参数</h3>
            <ul>
              <li><strong>readableHighWaterMark</strong>：可读缓冲区大小（字节）</li>
              <li><strong>writableHighWaterMark</strong>：可写缓冲区大小（字节）</li>
              <li><strong>allowHalfOpen</strong>：是否允许一端关闭后另一端继续操作（默认 <code>true</code>）</li>
              <li><strong>read</strong>：自定义读取逻辑的方法</li>
              <li><strong>write</strong>：自定义写入逻辑的方法</li>
            </ul>
          </div>

          <div class="write-stream-example">
            <h3>示例代码</h3>
            <pre class="code-block">const { Duplex } = require('stream');

class MyDuplex extends Duplex {
  constructor(options) {
    super(options);
    this.data = ['a', 'b', 'c'];
  }

  // 实现可读端
  _read(size) {
    const chunk = this.data.shift() || null;
    this.push(chunk);
  }

  // 实现可写端
  _write(chunk, encoding, callback) {
    console.log('写入数据:', chunk.toString());
    callback();
  }
}

const duplex = new MyDuplex();

duplex.on('data', (chunk) => {
  console.log('读取到:', chunk.toString());
});

duplex.write('hello');
duplex.write('world');
duplex.end();</pre>
          </div>

          <div class="write-stream-tips">
            <strong>性能提示：</strong>
            <ul>
              <li>Duplex 流适合需要双向数据传输的场景，如 socket 通信。</li>
              <li>合理设置 <code>readableHighWaterMark</code> 和 <code>writableHighWaterMark</code>，可优化内存和吞吐。</li>
              <li>实现 <code>_read</code> 和 <code>_write</code> 方法时，避免阻塞操作，确保异步回调。</li>
              <li>监听 <code>error</code> 事件，及时处理异常，保证流的健壮性。</li>
            </ul>
          </div>
        </div>
      </section>
      <div class="core-apis-section">
        <h2 class="section-title">核心 API</h2>

        <div class="api-grid">
          <div class="api-card">
            <div class="api-header">
              <code>stream.pipeline()</code>
            </div>
            <div class="api-content">
              <p>连接多个流并处理错误和清理</p>
              <div class="return-type">推荐替代 <code>pipe()</code></div>
              <pre class="code-block">const { pipeline } = require('stream');
const fs = require('fs');
const zlib = require('zlib');

pipeline(
  fs.createReadStream('input.txt'),
  zlib.createGzip(),
  fs.createWriteStream('input.txt.gz'),
  (err) => {
    if (err) {
      console.error('管道处理失败:', err);
    } else {
      console.log('管道处理成功完成');
    }
  }
);</pre>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <code>stream.finished()</code>
            </div>
            <div class="api-content">
              <p>当流不再可读、可写或发生错误时触发</p>
              <div class="return-type">清理资源的可靠方式</div>
              <pre class="code-block">const { finished } = require('stream');

const rs = fs.createReadStream('file.txt');

finished(rs, (err) => {
  if (err) {
    console.error('流发生错误:', err);
  } else {
    console.log('流已结束');
  }
});</pre>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <code>stream.Readable.from()</code>
            </div>
            <div class="api-content">
              <p>从迭代器创建可读流</p>
              <div class="return-type">简化可读流创建</div>
              <pre class="code-block">const { Readable } = require('stream');

// 从数组创建可读流
const data = ['一', '二', '三'];
const readable = Readable.from(data);

readable.on('data', (chunk) => {
  console.log(chunk); // 输出: 一, 二, 三
});</pre>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <code>背压处理</code>
            </div>
            <div class="api-content">
              <p>管理读写速度差异的机制</p>
              <div class="return-type">防止内存溢出</div>
              <pre class="code-block">function write(data, encoding, callback) {
  // 如果写入队列已满，返回false
  if (!this.write(data, encoding)) {
    // 等待'drain'事件再继续写入
    this.once('drain', callback);
  } else {
    process.nextTick(callback);
  }
}

writable.on('drain', () => {
  console.log('缓存已清空，可以继续写入');
});</pre>
            </div>
          </div>
        </div>
      </div>

      <div class="use-cases-section">
        <h2 class="section-title">应用场景</h2>

        <div class="case-cards">
          <div class="case-card">
            <div class="case-icon">📁</div>
            <h3>大文件处理</h3>
            <p>使用流读取、处理并写入大文件，避免内存溢出</p>
            <pre class="code-block">fs.createReadStream('input.csv')
  .pipe(csvParser())
  .pipe(dataFilter)
  .pipe(fs.createWriteStream('output.csv'));</pre>
          </div>

          <div class="case-card">
            <div class="case-icon">🌐</div>
            <h3>HTTP请求/响应</h3>
            <p>高效处理HTTP请求体和响应数据</p>
            <pre class="code-block">// 服务器端
http.createServer((req, res) => {
  req.pipe(transformStream).pipe(res);
});

// 客户端
fetch(url)
  .then(response => response.body.pipe(fs.createWriteStream('file')));</pre>
          </div>

          <div class="case-card">
            <div class="case-icon">🔒</div>
            <h3>数据加密/压缩</h3>
            <p>流式加密/压缩数据，降低内存消耗</p>
            <pre class="code-block">// 压缩
readStream.pipe(zlib.createGzip()).pipe(writeStream);

// 加密
readStream
  .pipe(crypto.createCipheriv('aes-256-cbc', key, iv))
  .pipe(writeStream);</pre>
          </div>

          <div class="case-card">
            <div class="case-icon">📊</div>
            <h3>实时数据处理</h3>
            <p>处理实时日志、传感器数据或消息流</p>
            <pre class="code-block">sensorStream
  .pipe(parseData)
  .pipe(filterInvalid)
  .pipe(aggregate)
  .on('data', (data) => {
    updateDashboard(data);
  });</pre>
          </div>
        </div>
      </div>

      <div class="best-practices">
        <h2 class="section-title">最佳实践</h2>
        <div class="practices-grid">
          <div class="practice">
            <div class="number">1</div>
            <p>总是处理错误事件，避免未捕获异常</p>
          </div>
          <div class="practice">
            <div class="number">2</div>
            <p>使用 <code>pipeline()</code> 替代 <code>pipe()</code> 处理错误和清理</p>
          </div>
          <div class="practice">
            <div class="number">3</div>
            <p>实现背压处理，防止内存溢出</p>
          </div>
          <div class="practice">
            <div class="number">4</div>
            <p>使用转换流封装数据处理逻辑</p>
          </div>
          <div class="practice">
            <div class="number">5</div>
            <p>完成后销毁流释放资源</p>
          </div>
          <div class="practice">
            <div class="number">6</div>
            <p>避免在流动模式下丢失数据</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>Node.js 流是处理大型数据集的强大工具，掌握流的使用可以显著提高应用性能和资源利用率。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const streamData = ref({
  types: [
    { name: '可读流', usage: '数据源', examples: '文件读取、HTTP请求' },
    { name: '可写流', usage: '数据目标', examples: '文件写入、HTTP响应' },
    { name: '双工流', usage: '双向通信', examples: 'TCP套接字' },
    { name: '转换流', usage: '数据转换', examples: '压缩、加密' }
  ]
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');

.stream-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Noto Sans SC', sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #eaeaea;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, #3498db, #2c3e50);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin-top: 0;
    }
  }

  .intro-section {
    margin-bottom: 3rem;

    .intro-card {
      background: white;
      border-radius: 10px;
      padding: 1.8rem;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

      .definition {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 2rem;

        .stream-icon {
          font-size: 3rem;
          width: 80px;
          height: 80px;
          background: #e3f2fd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #3498db;
        }

        h2 {
          margin-top: 0;
          color: #2c3e50;
        }

        p {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .feature {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          .feature-tag {
            background: #e3f2fd;
            color: #3498db;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
          }
        }
      }

      .installation {
        h3 {
          margin-top: 0;
          color: #3498db;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #f0f0f0;
          margin-bottom: 1.2rem;
        }

        .concepts {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.2rem;

          .concept {
            display: flex;
            gap: 1rem;
            align-items: center;
            background: #f8f9fa;
            border-radius: 8px;
            padding: 1rem;

            .concept-icon {
              font-size: 1.8rem;
              width: 50px;
              height: 50px;
              background: #e3f2fd;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }

            h4 {
              margin: 0 0 0.3rem 0;
              color: #2c3e50;
            }

            p {
              margin: 0;
              font-size: 0.95rem;
              color: #7f8c8d;
            }
          }
        }
      }
    }
  }

  .stream-types-section {
    margin-bottom: 3rem;

    .section-title {
      font-size: 1.8rem;
      color: #3498db;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f0f0f0;
      text-align: center;
    }

    .types-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;

      .type-card {
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
        }

        .type-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 1.5rem;
          color: white;

          h3 {
            margin: 0;
            font-size: 1.5rem;
          }

          .type-icon {
            font-size: 2rem;
          }
        }

        .type-content {
          padding: 1.5rem;

          p {
            font-size: 1.05rem;
            line-height: 1.6;
            color: #555;
            margin-top: 0;
            margin-bottom: 1rem;
          }

          ul {
            padding-left: 1.5rem;
            margin: 0 0 1.5rem 0;

            li {
              margin-bottom: 0.5rem;
              line-height: 1.6;

              strong {
                color: #2c3e50;
              }
            }
          }

          .example {
            .code-block {
              background: #2c3e50;
              color: #f8f9fa;
              border-radius: 6px;
              padding: 1rem;
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.85rem;
              overflow-x: auto;
            }
          }
        }
      }

      .readable {
        .type-header {
          background: #3498db;
        }

        border-top: 4px solid #3498db;
      }

      .writable {
        .type-header {
          background: #e67e22;
        }

        border-top: 4px solid #e67e22;
      }

      .duplex {
        .type-header {
          background: #9b59b6;
        }

        border-top: 4px solid #9b59b6;
      }

      .transform {
        .type-header {
          background: #2ecc71;
        }

        border-top: 4px solid #2ecc71;
      }
    }
  }

  .core-apis-section {
    margin-bottom: 3rem;

    .section-title {
      font-size: 1.8rem;
      color: #3498db;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f0f0f0;
      text-align: center;
    }

    .api-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .api-card {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease;
      border-top: 4px solid #3498db;

      &:hover {
        transform: translateY(-5px);
      }

      .api-header {
        background: #f8f9fa;
        padding: 1.2rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 1.1rem;
        font-weight: 500;
        color: #2c3e50;
        border-bottom: 1px solid #eaeaea;
      }

      .api-content {
        padding: 1.5rem;

        p {
          font-size: 1.05rem;
          line-height: 1.6;
          color: #555;
          margin-top: 0;
          margin-bottom: 0.8rem;
        }

        .return-type {
          font-size: 0.95rem;
          color: #7f8c8d;
          margin-bottom: 1rem;
          font-style: italic;
        }

        .code-block {
          background: #2c3e50;
          color: #f8f9fa;
          border-radius: 6px;
          padding: 1rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          overflow-x: auto;
        }
      }
    }
  }

  .use-cases-section {
    margin-bottom: 3rem;

    .section-title {
      font-size: 1.8rem;
      color: #3498db;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f0f0f0;
      text-align: center;
    }

    .case-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .case-card {
        background: white;
        border-radius: 10px;
        padding: 1.8rem;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s ease;
        border-top: 4px solid #3498db;

        &:hover {
          transform: translateY(-5px);
        }

        .case-icon {
          font-size: 2.5rem;
          margin-bottom: 1.2rem;
          color: #3498db;
        }

        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        p {
          font-size: 1.05rem;
          line-height: 1.6;
          color: #555;
          margin-bottom: 1rem;
        }

        .code-block {
          background: #f8f9fa;
          border: 1px solid #eaeaea;
          border-radius: 6px;
          padding: 0.8rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          overflow-x: auto;
        }
      }
    }
  }

  .best-practices {
    .section-title {
      font-size: 1.8rem;
      color: #3498db;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f0f0f0;
      text-align: center;
    }

    .practices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .practice {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        .number {
          width: 36px;
          height: 36px;
          background: #3498db;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.1rem;
          margin-right: 1.2rem;
          flex-shrink: 0;
        }

        p {
          margin: 0;
          font-size: 1.05rem;
          line-height: 1.5;

          code {
            background: #e3f2fd;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
          }
        }
      }
    }
  }

  .footer {
    margin-top: 3rem;
    text-align: center;
    padding: 1.5rem;
    font-size: 1.05rem;
    color: #7f8c8d;
    border-top: 1px solid #eaeaea;
    line-height: 1.7;
    background: white;
    border-radius: 8px;
  }
}

@media (max-width: 768px) {
  .stream-container {
    padding: 1rem;

    .header h1 {
      font-size: 2rem;
    }
  }
}

.write-stream-section {
  background: #f8fafc;
  border-radius: 12px;
  padding: 32px 24px 24px 24px;
  margin: 32px 0 24px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.write-stream-section .section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 18px;
  color: #1a3a5e;
  letter-spacing: 1px;
}

.write-stream-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.write-stream-intro {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #e6f7ff;
  border-radius: 8px;
  padding: 16px;
}

.write-stream-icon {
  font-size: 2.2rem;
  margin-right: 8px;
  color: #409eff;
}

.write-stream-details ul {
  margin: 0 0 0 18px;
  padding: 0;
  color: #444;
}

.write-stream-details li {
  margin-bottom: 4px;
  font-size: 1rem;
}

.write-stream-example {
  background: #f4f4f4;
  border-radius: 8px;
  padding: 14px 16px;
  margin-top: 6px;
}

.write-stream-example h3 {
  margin-top: 0;
  font-size: 1.1rem;
  color: #2d6a4f;
}

.write-stream-tips {
  background: #fffbe6;
  border-left: 4px solid #ffd666;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 0.98rem;
  color: #8d6d1a;
}

.write-stream-tips ul {
  margin: 6px 0 0 18px;
  padding: 0;
}
</style>
