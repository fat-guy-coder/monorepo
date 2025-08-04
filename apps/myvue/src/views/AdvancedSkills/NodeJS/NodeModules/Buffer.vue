<template>
  <div class="buffer-container">
    <!-- 头部区域 -->
    <div class="header-section">
      <div class="logo-container">
        <div class="buffer-logo">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17h18v2H3zm0-7h18v2H3zm0-7h18v2H3z" fill="#68a063" />
            <circle cx="6" cy="5" r="2" fill="#388e3c" />
            <circle cx="12" cy="12" r="2" fill="#388e3c" />
            <circle cx="18" cy="19" r="2" fill="#388e3c" />
          </svg>
        </div>
      </div>
      <div class="header-content">
        <h1 class="main-title">Node.js Buffer 模块基础介绍</h1>
        <p class="subtitle">二进制数据处理的基石</p>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-wrapper">
      <!-- 简介部分 -->
      <section class="intro-section">
        <div class="section-header">
          <div class="icon">📚</div>
          <h2>Buffer 模块概述</h2>
        </div>

        <div class="intro-content">
          <p>
            <strong>Buffer 模块</strong>是 Node.js 中用于处理二进制数据的核心模块。在浏览器 JavaScript 中，通常使用 TypedArray 处理二进制数据，而在 Node.js
            中，Buffer 类就是用于在 TCP 流、文件系统操作以及其他需要二进制数据的场景中操作原始内存的。
          </p>

          <p>在
            Node
            应⽤中，需要处理⽹络协议、操作数据库、处理图⽚、接收上传⽂件等，在⽹络流和⽂件的操
            作中，要处理⼤量⼆进制数据，⽽
            放⼆进制数据
            Buffer
            就是在内存中开辟⼀⽚区域（初次初始化为8KB），⽤来存
            在上述操作中都会存在数据流动，每个数据流动的过程中，都会有⼀个最⼩或最⼤数据量
            如果数据到达的速度⽐进程消耗的速度快，那么少数早到达的数据会处于等待区等候被处理。反之，如
            果数据到达的速度⽐进程消耗的数据慢，那么早先到达的数据需要等待⼀定量的数据到达之后才能被处
            理
            这⾥的等待区就指的缓冲区（Buffer），它是计算机中的⼀个⼩物理单位，通常位于计算机的
            RAM
            中
            简单来讲，
            Nodejs
            不能控制数据传输的速度和到达时间，只能决定何时发送数据，如果还没到发送时
            间，则将数据放在
            Buffer
            中，即在
            RAM
            中，直⾄将它们发送完毕 </p>

          <div class="key-features">
            <h3 class="section-subtitle">核心特性</h3>
            <ul>
              <li><strong>二进制数据处理</strong>：直接操作内存中的二进制数据</li>
              <li><strong>无需引入</strong>：Node.js 全局模块，无需 require 即可使用</li>
              <li><strong>高效性能</strong>：底层 C++ 实现，提供高效的内存操作</li>
              <li><strong>流操作基础</strong>：Node.js Stream 模块的核心组成部分</li>
              <li><strong>编码转换</strong>：支持多种编码（utf8, hex, base64 等）</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 为什么需要 Buffer -->
      <section class="why-section">
        <div class="section-header">
          <div class="icon">❓</div>
          <h2>为什么需要 Buffer？</h2>
        </div>

        <div class="why-grid">
          <div class="why-card">
            <div class="why-icon">1</div>
            <h3>处理二进制数据</h3>
            <p>JavaScript 传统上不擅长处理二进制数据，Buffer 填补了这一空缺</p>
          </div>

          <div class="why-card">
            <div class="why-icon">2</div>
            <h3>网络通信</h3>
            <p>TCP/UDP 流、WebSocket 等网络协议需要处理原始二进制数据</p>
          </div>

          <div class="why-card">
            <div class="why-icon">3</div>
            <h3>文件操作</h3>
            <p>读取图片、视频、压缩包等非文本文件时需要二进制处理</p>
          </div>

          <div class="why-card">
            <div class="why-icon">4</div>
            <h3>性能优化</h3>
            <p>直接操作内存比字符串操作更高效，尤其在大型数据处理中</p>
          </div>
        </div>
      </section>

      <!-- API 基础介绍 -->
      <section class="api-section">
        <div class="section-header">
          <div class="icon">🔧</div>
          <h2>Buffer API 基础介绍</h2>
        </div>

        <div class="api-table">
          <div class="table-header">
            <div class="col-method">方法/属性</div>
            <div class="col-desc">描述</div>
            <div class="col-params">参数</div>
            <div class="col-return">返回值</div>
          </div>

          <div class="table-row" v-for="(api, index) in apiList" :key="index">
            <div class="col-method">
              <code>{{ api.method }}</code>
              <div class="method-type">{{ api.type }}</div>
            </div>
            <div class="col-desc">{{ api.description }}</div>
            <div class="col-params">
              <div v-for="(param, pIndex) in api.params" :key="pIndex" class="param-item">
                <code>{{ param.name }}</code>: {{ param.desc }}
              </div>
              <div v-if="api.params.length === 0">-</div>
            </div>
            <div class="col-return">
              <code>{{ api.return || 'void' }}</code>
            </div>
          </div>
        </div>
      </section>

      <!-- 创建 Buffer 的多种方式 -->
      <section class="creation-section">
        <div class="section-header">
          <div class="icon">🛠️</div>
          <h2>创建 Buffer 的多种方式</h2>
        </div>

        <div class="creation-grid">
          <div class="creation-card">
            <h3>1. 指定大小创建</h3>
            <pre class="code-block">// 创建 10 字节的 Buffer
const buf1 = Buffer.alloc(10);</pre>
          </div>

          <div class="creation-card">
            <h3>2. 从数组创建</h3>
            <pre class="code-block">// 从字节数组创建
const buf2 = Buffer.from([0x62, 0x75, 0x66, 0x66]);</pre>
          </div>

          <div class="creation-card">
            <h3>3. 从字符串创建</h3>
            <pre class="code-block">// 使用 UTF-8 编码创建
const buf3 = Buffer.from('Hello Buffer', 'utf8');</pre>
          </div>

          <div class="creation-card">
            <h3>4. 快速创建（不安全）</h3>
            <pre class="code-block">// 分配未初始化的 Buffer（更快但可能包含旧数据）
const buf4 = Buffer.allocUnsafe(100);</pre>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="scenarios-section">
        <div class="section-header">
          <div class="icon">💡</div>
          <h2>Buffer 使用场景</h2>
        </div>

        <div class="scenarios-grid">
          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">📡</div>
              <h3>网络通信</h3>
            </div>
            <div class="scenario-content">
              <p>处理 TCP/UDP 数据包、WebSocket 消息</p>
              <pre class="code-block">server.on('data', (data) => {
  // data 是一个 Buffer
  const packetSize = data.readUInt32BE(0);
  const payload = data.slice(4);
});</pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">📁</div>
              <h3>文件操作</h3>
            </div>
            <div class="scenario-content">
              <p>读写图像、音频、视频等二进制文件</p>
              <pre class="code-block">// 读取图片文件
fs.readFile('image.png', (err, data) => {
  if (err) throw err;
  // data 是一个包含 PNG 数据的 Buffer
  const signature = data.slice(0, 8).toString('hex');
});</pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">🔐</div>
              <h3>加密与哈希</h3>
            </div>
            <div class="scenario-content">
              <p>密码学操作需要处理二进制数据</p>
              <pre class="code-block">const crypto = require('crypto');
const hash = crypto.createHash('sha256');

// 更新哈希内容
hash.update(Buffer.from('secret data'));
const digest = hash.digest('hex'); // 哈希结果</pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">⚙️</div>
              <h3>协议解析</h3>
            </div>
            <div class="scenario-content">
              <p>解析自定义二进制协议</p>
              <pre class="code-block">function parsePacket(buffer) {
  const version = buffer.readUInt8(0);
  const type = buffer.readUInt8(1);
  const length = buffer.readUInt16BE(2);
  const payload = buffer.slice(4, 4 + length);
  return { version, type, length, payload };
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="practice-section">
        <div class="section-header">
          <div class="icon">🏆</div>
          <h2>Buffer 最佳实践</h2>
        </div>

        <div class="practice-list">
          <div class="practice-item">
            <div class="practice-icon">1</div>
            <div class="practice-content">
              <h3>优先使用 Buffer.alloc</h3>
              <p>除非性能至关重要，否则避免使用 <code>Buffer.allocUnsafe</code>，因为它可能包含敏感数据。使用 <code>Buffer.alloc()</code> 创建初始化的
                Buffer。</p>
            </div>
          </div>

          <div class="practice-item">
            <div class="practice-icon">2</div>
            <div class="practice-content">
              <h3>注意编码一致性</h3>
              <p>在不同操作中使用 Buffer 时，确保编码方式一致。默认编码是 UTF-8，但其他编码（如 'base64', 'hex'）在特定场景很有用。</p>
            </div>
          </div>

          <div class="practice-item">
            <div class="practice-icon">3</div>
            <div class="practice-content">
              <h3>避免拼接大 Buffer</h3>
              <p>大 Buffer 拼接操作（如 <code>Buffer.concat</code>）可能导致内存问题。考虑使用流（Streams）处理大数据。</p>
            </div>
          </div>

          <div class="practice-item">
            <div class="practice-icon">4</div>
            <div class="practice-content">
              <h3>使用 TypedArray 互操作性</h3>
              <p>Buffer 实例也是 Uint8Array 实例，但要注意它们共享内存。可以使用 <code>Buffer.from(arrayBuffer)</code> 从 ArrayBuffer 创建
                Buffer。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 常见问题 -->
      <section class="faq-section">
        <div class="section-header">
          <div class="icon">❔</div>
          <h2>Buffer 常见问题</h2>
        </div>

        <div class="faq-grid">
          <div class="faq-card">
            <h3>Q: Buffer 是否在 V8 堆外分配内存？</h3>
            <p><strong>A:</strong> 是的，Buffer 在 Node.js 的堆外分配内存（C++ 层面），这使其大小不受 V8 内存限制影响。</p>
          </div>

          <div class="faq-card">
            <h3>Q: Buffer 和 ArrayBuffer 有什么区别？</h3>
            <p><strong>A:</strong> Buffer 是 Node.js 特有的，而 ArrayBuffer 是 ECMAScript 标准。Buffer 实现了 Uint8Array
              API，但提供了更多实用方法。</p>
          </div>

          <div class="faq-card">
            <h3>Q: 如何转换 Buffer 为 JSON？</h3>
            <p><strong>A:</strong> Buffer 实例有一个 <code>toJSON()</code>
              方法，返回包含数据的类型化数组：<code>{ type: 'Buffer', data: [...] }</code>。</p>
          </div>

          <div class="faq-card">
            <h3>Q: Buffer 是否线程安全？</h3>
            <p><strong>A:</strong> 单个 Buffer 实例不是线程安全的。如果多个线程访问同一个 Buffer，需要使用同步机制（如 Mutex）。</p>
          </div>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>Node.js Buffer 模块基础介绍 | 二进制数据处理指南 | © 2023</p>
      <div class="footer-links">
        <a href="https://nodejs.org/api/buffer.html" target="_blank">官方文档</a>
        <a href="https://github.com/nodejs/node" target="_blank">Node.js 源码</a>
        <a href="https://nodesource.com/blog/understanding-the-buffer" target="_blank">深入解析</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface ApiItem {
  method: string;
  type: 'static' | 'instance';
  description: string;
  params: { name: string; desc: string }[];
  return: string;
}

const apiList: ApiItem[] = [
  {
    method: 'Buffer.alloc(size)',
    type: 'static',
    description: '创建指定大小的 Buffer，并用 0 填充',
    params: [
      { name: 'size', desc: 'Buffer 的字节长度' },
      { name: 'fill', desc: '可选，填充值 (默认: 0)' },
      { name: 'encoding', desc: '可选，填充编码 (默认: utf8)' }
    ],
    return: 'Buffer'
  },
  {
    method: 'Buffer.from(array)',
    type: 'static',
    description: '从字节数组创建 Buffer',
    params: [
      { name: 'array', desc: '字节值数组 (0-255)' }
    ],
    return: 'Buffer'
  },
  {
    method: 'Buffer.from(string)',
    type: 'static',
    description: '从字符串创建 Buffer',
    params: [
      { name: 'string', desc: '输入字符串' },
      { name: 'encoding', desc: '字符串编码 (默认: utf8)' }
    ],
    return: 'Buffer'
  },
  {
    method: 'buf.length',
    type: 'instance',
    description: 'Buffer 的字节长度',
    params: [],
    return: 'number'
  },
  {
    method: 'buf.write(string)',
    type: 'instance',
    description: '向 Buffer 写入字符串',
    params: [
      { name: 'string', desc: '要写入的字符串' },
      { name: 'offset', desc: '开始写入的位置 (默认: 0)' },
      { name: 'length', desc: '要写入的字节数' },
      { name: 'encoding', desc: '字符串编码 (默认: utf8)' }
    ],
    return: 'number'
  },
  {
    method: 'buf.toString()',
    type: 'instance',
    description: '将 Buffer 解码为字符串',
    params: [
      { name: 'encoding', desc: '解码编码 (默认: utf8)' },
      { name: 'start', desc: '开始位置 (默认: 0)' },
      { name: 'end', desc: '结束位置 (默认: buf.length)' }
    ],
    return: 'string'
  },
  {
    method: 'buf.slice()',
    type: 'instance',
    description: '创建指向相同内存的新 Buffer 切片',
    params: [
      { name: 'start', desc: '切片起始位置 (默认: 0)' },
      { name: 'end', desc: '切片结束位置 (默认: buf.length)' }
    ],
    return: 'Buffer'
  },
  {
    method: 'buf.readUInt8(offset)',
    type: 'instance',
    description: '从指定位置读取无符号 8 位整数',
    params: [
      { name: 'offset', desc: '读取位置 (0 ≤ offset ≤ buf.length-1)' }
    ],
    return: 'number'
  },
  {
    method: 'buf.writeUInt8(value, offset)',
    type: 'instance',
    description: '向指定位置写入无符号 8 位整数',
    params: [
      { name: 'value', desc: '要写入的数值' },
      { name: 'offset', desc: '写入位置' }
    ],
    return: 'void'
  },
  {
    method: 'buf.readUInt16BE(offset)',
    type: 'instance',
    description: '使用大端序读取无符号 16 位整数',
    params: [
      { name: 'offset', desc: '读取位置' }
    ],
    return: 'number'
  },
  {
    method: 'Buffer.concat(list)',
    type: 'static',
    description: '合并 Buffer 数组为一个新 Buffer',
    params: [
      { name: 'list', desc: 'Buffer 数组' },
      { name: 'totalLength', desc: '可选，合并后总长度' }
    ],
    return: 'Buffer'
  },
  {
    method: 'buf.compare(target)',
    type: 'instance',
    description: '比较两个 Buffer 的排序',
    params: [
      { name: 'target', desc: '要比较的 Buffer' }
    ],
    return: 'number'
  },
  {
    method: 'buf.copy(target)',
    type: 'instance',
    description: '复制 Buffer 数据到目标 Buffer',
    params: [
      { name: 'target', desc: '目标 Buffer' },
      { name: 'targetStart', desc: '目标开始位置 (默认: 0)' },
      { name: 'sourceStart', desc: '源开始位置 (默认: 0)' },
      { name: 'sourceEnd', desc: '源结束位置 (默认: buf.length)' }
    ],
    return: 'number'
  },
  {
    method: 'buf.equals(other)',
    type: 'instance',
    description: '检查两个 Buffer 是否包含相同字节',
    params: [
      { name: 'other', desc: '要比较的 Buffer' }
    ],
    return: 'boolean'
  },
  {
    method: 'buf.indexOf(value)',
    type: 'instance',
    description: '在 Buffer 中搜索值',
    params: [
      { name: 'value', desc: '查找的值 (string/Buffer/integer)' },
      { name: 'byteOffset', desc: '开始搜索位置 (默认: 0)' },
      { name: 'encoding', desc: '字符串编码 (默认: utf8)' }
    ],
    return: 'number'
  },
  {
    method: 'buf.fill(value)',
    type: 'instance',
    description: '用指定值填充 Buffer',
    params: [
      { name: 'value', desc: '填充值 (string/Buffer/integer)' },
      { name: 'offset', desc: '开始位置 (默认: 0)' },
      { name: 'end', desc: '结束位置 (默认: buf.length)' },
      { name: 'encoding', desc: '字符串编码 (默认: utf8)' }
    ],
    return: 'Buffer'
  }
];
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

.buffer-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: @font-main;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
  padding-bottom: 2rem;
}

.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #4caf50, #388e3c);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 30px 30px;
  margin-bottom: 2rem;

  .logo-container {
    margin-bottom: 1.5rem;
  }

  .buffer-logo {
    width: 80px;
    height: 80px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    svg {
      width: 50px;
      height: 50px;
    }
  }
}

.main-title {
  font-size: 2.5rem;
  margin: 0 0 0.8rem;
  font-weight: 800;
}

.subtitle {
  font-size: 1.4rem;
  opacity: 0.9;
  margin: 0 0 1.5rem;
  font-weight: 400;
}

.content-wrapper {
  padding: 0 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0 1.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;

  .icon {
    font-size: 1.8rem;
    background: #e8f5e9;
    color: #388e3c;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  h2 {
    font-size: 1.8rem;
    margin: 0;
    color: #1e293b;
  }
}

.intro-content {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
}

.key-features {
  margin-top: 2.5rem;

  .section-subtitle {
    font-size: 1.4rem;
    color: #388e3c;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #c8e6c9;
  }

  ul {
    list-style-type: none;
    padding-left: 1.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;

    li {
      position: relative;
      padding-left: 1.8rem;
      margin-bottom: 0.8rem;
      font-size: 1.05rem;

      &:before {
        content: "•";
        position: absolute;
        left: 0;
        color: #4caf50;
        font-size: 1.5rem;
        line-height: 1;
      }

      strong {
        color: #388e3c;
      }
    }
  }
}

.why-grid,
.creation-grid,
.scenarios-grid,
.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.why-card,
.faq-card {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border-top: 3px solid #4caf50;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #388e3c;
  }

  p {
    margin: 0;
    color: #4b5563;
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.why-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .why-icon {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #e8f5e9;
    color: #388e3c;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.api-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;
  margin-top: 1.5rem;

  .table-header {
    display: flex;
    background: #e8f5e9;
    padding: 1rem 1.5rem;
    font-weight: 600;
    color: #388e3c;
    border-bottom: 1px solid #c8e6c9;

    .col-method {
      width: 22%;
    }

    .col-desc {
      width: 38%;
    }

    .col-params {
      width: 25%;
    }

    .col-return {
      width: 15%;
    }
  }

  .table-row {
    display: flex;
    padding: 1.2rem 1.5rem;
    border-bottom: 1px solid #f1f5f9;

    &:last-child {
      border-bottom: none;
    }

    &:nth-child(even) {
      background-color: #f8fafc;
    }

    >div {
      padding-right: 1rem;
    }

    .col-method {
      width: 22%;
      font-family: @font-code;

      code {
        font-size: 0.95rem;
        color: #2e7d32;
        font-weight: 600;
      }

      .method-type {
        font-size: 0.8rem;
        color: #666;
        margin-top: 0.3rem;
        font-family: @font-main;
      }
    }

    .col-desc {
      width: 38%;
      font-size: 0.95rem;
      line-height: 1.5;
      color: #4b5563;
    }

    .col-params {
      width: 25%;

      .param-item {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        line-height: 1.4;

        code {
          font-family: @font-code;
          color: #d84315;
          font-weight: 500;
        }
      }
    }

    .col-return {
      width: 15%;
      font-family: @font-code;
      color: #0288d1;
      font-weight: 500;
    }
  }
}

.creation-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border-top: 3px solid #4caf50;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #388e3c;
  }
}

.scenario-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;

  .scenario-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem 1.5rem;
    background: #e8f5e9;
    border-bottom: 1px solid #c8e6c9;

    .scenario-icon {
      font-size: 1.5rem;
    }

    h3 {
      margin: 0;
      font-size: 1.2rem;
      color: #2e7d32;
    }
  }

  .scenario-content {
    padding: 1.5rem;

    p {
      margin: 0 0 1rem;
      font-size: 0.95rem;
      line-height: 1.5;
      color: #4b5563;
    }
  }
}

.practice-list {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  margin-top: 1.5rem;
}

.practice-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0.5rem;
  }

  .practice-icon {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    background: #e8f5e9;
    color: #388e3c;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1rem;
  }

  .practice-content {
    flex: 1;

    h3 {
      margin-top: 0;
      margin-bottom: 0.8rem;
      font-size: 1.2rem;
      color: #2e7d32;
    }

    p {
      margin: 0;
      color: #4b5563;
      font-size: 0.95rem;
      line-height: 1.6;

      code {
        font-family: @font-code;
        background: #f1f8e9;
        padding: 2px 6px;
        border-radius: 4px;
        color: #2e7d32;
      }
    }
  }
}

.faq-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border-left: 4px solid #4caf50;

  h3 {
    margin-top: 0;
    font-size: 1.1rem;
    color: #2e7d32;
  }

  p {
    margin: 0.5rem 0 0;
    color: #4b5563;
    font-size: 0.95rem;
    line-height: 1.5;

    strong {
      color: #388e3c;
    }
  }
}

.footer {
  text-align: center;
  padding: 2.5rem 2rem 1rem;
  color: #94a3b8;
  font-size: 0.95rem;
  margin-top: 2rem;

  .footer-links {
    margin-top: 1rem;

    a {
      color: #4caf50;
      text-decoration: none;
      margin: 0 1rem;
      font-weight: 500;
      transition: all 0.2s ease;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.code-block {
  background-color: #2e3e2e;
  color: #e8f5e9;
  border-radius: 8px;
  padding: 1rem;
  font-family: @font-code;
  font-size: 0.92rem;
  line-height: 1.5;
  overflow-x: auto;
  tab-size: 2;
  margin: 0.8rem 0;
}

@media (max-width: 768px) {
  .header-section {
    padding: 2rem 1rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .content-wrapper {
    padding: 0 1rem;
  }

  .section-header {
    h2 {
      font-size: 1.5rem;
    }
  }

  .table-header {
    display: none !important;
  }

  .table-row {
    flex-direction: column !important;
    gap: 1rem;

    >div {
      width: 100% !important;
      padding-right: 0 !important;
    }
  }

  .api-table .table-row {
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.7rem;
  }

  .buffer-logo {
    width: 60px;
    height: 60px;

    svg {
      width: 40px;
      height: 40px;
    }
  }

  .why-grid,
  .creation-grid,
  .scenarios-grid,
  .faq-grid {
    grid-template-columns: 1fr;
  }
}
</style>
