<template>
  <div class="v8-engine-container">
    <!-- 头部区域 -->
    <div class="header">
      <div class="title-container">
        <h1>V8 JavaScript引擎机制详解</h1>
        <p>探索Google Chrome背后的高性能JavaScript执行引擎</p>
      </div>
      <div class="engine-tag">
        <span>开源 · 高性能 · 跨平台</span>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <!-- V8概览 -->
      <div class="section overview-section">
        <div class="overview-card">
          <div class="v8-logo">
            <div class="v8-text">V8</div>
          </div>
          <div class="content">
            <h2>V8引擎是什么？</h2>
            <p>V8是由Google开发的开源高性能JavaScript和WebAssembly引擎，用C++编写。它是Chrome浏览器和Node.js的核心组件，负责将JavaScript代码编译成机器码并执行。</p>
            <div class="key-facts">
              <div class="fact">
                <div class="fact-icon">⚡</div>
                <div class="fact-text">首次发布于2008年</div>
              </div>
              <div class="fact">
                <div class="fact-icon">🌐</div>
                <div class="fact-text">支持x64, ARM, MIPS架构</div>
              </div>
              <div class="fact">
                <div class="fact-icon">📦</div>
                <div class="fact-text">C++代码超过100万行</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 核心架构 -->
      <div class="section">
        <h2 class="section-title">
          <div class="title-icon">🏗️</div>
          <span>V8核心架构</span>
        </h2>
        <div class="architecture">
          <div class="architecture-diagram">
            <div class="component parser">
              <div class="component-icon">📝</div>
              <div class="component-name">解析器</div>
              <div class="component-desc">将JS源码转换为AST</div>
            </div>
            <div class="arrow">➞</div>
            <div class="component ignition">
              <div class="component-icon">🔥</div>
              <div class="component-name">Ignition</div>
              <div class="component-desc">生成字节码</div>
            </div>
            <div class="arrow">➞</div>
            <div class="component turbofan">
              <div class="component-icon">✈️</div>
              <div class="component-name">Turbofan</div>
              <div class="component-desc">优化编译器</div>
            </div>
            <div class="arrow">➞</div>
            <div class="component orinoco">
              <div class="component-icon">🧹</div>
              <div class="component-name">Orinoco</div>
              <div class="component-desc">垃圾回收器</div>
            </div>
          </div>

          <div class="architecture-explanation">
            <div class="phase">
              <h3>1. 解析器 (Parser)</h3>
              <p>将JavaScript源代码转换为抽象语法树(AST)，同时进行语法和词法分析。</p>
            </div>
            <div class="phase">
              <h3>2. Ignition 解释器</h3>
              <p>将AST转换为字节码并执行，同时收集优化信息。</p>
            </div>
            <div class="phase">
              <h3>3. Turbofan 编译器</h3>
              <p>根据Ignition收集的信息生成高度优化的机器码。</p>
            </div>
            <div class="phase">
              <h3>4. Orinoco 垃圾回收</h3>
              <p>并行、增量的垃圾回收机制，减少停顿时间。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 性能优化 -->
      <div class="section">
        <h2 class="section-title">
          <div class="title-icon">⚡</div>
          <span>V8为何如此高效？</span>
        </h2>
        <div class="performance-reasons">
          <div class="reason-card">
            <div class="reason-icon">🏎️</div>
            <h3>即时编译 (JIT)</h3>
            <p>结合解释器与编译器：解释器快速启动，编译器生成高效机器码</p>
          </div>
          <div class="reason-card">
            <div class="reason-icon">📊</div>
            <h3>内联缓存 (IC)</h3>
            <p>缓存对象属性访问结果，避免重复查找</p>
          </div>
          <div class="reason-card">
            <div class="reason-icon">🧠</div>
            <h3>隐藏类机制</h3>
            <p>为动态对象创建类似静态语言的类结构</p>
          </div>
          <div class="reason-card">
            <div class="reason-icon">🔄</div>
            <h3>增量垃圾回收</h3>
            <p>并行回收减少主线程阻塞时间</p>
          </div>
          <div class="reason-card">
            <div class="reason-icon">🔧</div>
            <h3>自适应优化</h3>
            <p>根据运行时数据动态优化热点代码</p>
          </div>
          <div class="reason-card">
            <div class="reason-icon">⚙️</div>
            <h3>并发编译</h3>
            <p>在后台线程编译代码，不阻塞主线程</p>
          </div>
        </div>
      </div>

      <!-- 字节码机制 -->
      <div class="section">
        <h2 class="section-title">
          <div class="title-icon">💾</div>
          <span>字节码的核心作用</span>
        </h2>
        <div class="bytecode-section">
          <div class="bytecode-explanation">
            <p>Ignition生成的字节码是V8架构的关键创新，它取代了早期的全代码生成器，提供了多项优势：</p>

            <div class="benefit">
              <div class="benefit-icon">📉</div>
              <div class="benefit-text">
                <h3>内存占用减少</h3>
                <p>字节码比机器码小25-50%，显著降低内存使用</p>
              </div>
            </div>

            <div class="benefit">
              <div class="benefit-icon">🚀</div>
              <div class="benefit-text">
                <h3>启动时间优化</h3>
                <p>生成字节码比编译机器码快2-5倍，加快启动速度</p>
              </div>
            </div>

            <div class="benefit">
              <div class="benefit-icon">🔍</div>
              <div class="benefit-text">
                <h3>优化信息收集</h3>
                <p>在字节码执行期间收集类型反馈，指导Turbofan优化</p>
              </div>
            </div>

            <div class="benefit">
              <div class="benefit-icon">🧩</div>
              <div class="benefit-text">
                <h3>简化编译器设计</h3>
                <p>Turbofan只需优化热点函数，无需处理全部代码</p>
              </div>
            </div>
          </div>

          <div class="bytecode-example">
            <h3>JavaScript代码与字节码对比</h3>
            <div class="code-comparison">
              <div class="javascript-code">
                <h4>JavaScript 源码</h4>
                <pre><code>function sum(a, b) {
  return a + b;
}

let result = sum(1, 2);</code></pre>
              </div>
              <div class="bytecode-code">
                <h4>Ignition 字节码</h4>
                <pre><code>// 函数sum的字节码
[generated bytecode for function: sum]
Parameter count 3
Register count 0
Frame size 0
   0 E> 0x2efc4c2d3d56 @    0 : 25 02             Ldar a1
   2 E> 0x2efc4c2d3d58 @    2 : 34 03 00          Add a0, [0]
   5 S> 0x2efc4c2d3d5b @    5 : aa                Return

// 调用sum函数
   8 S> 0x2efc4c2d3d8a @    8 : 0d 01             LdaSmi [1]
  10 E> 0x2efc4c2d3d8c @   10 : 26 fb             Star r0
  12 E> 0x2efc4c2d3d8e @   12 : 0d 02             LdaSmi [2]
  14 E> 0x2efc4c2d3d90 @   14 : 26 fa             Star r1
  16 E> 0x2efc4c2d3d92 @   16 : 13 01 00          LdaGlobal [1], [0]
  19 E> 0x2efc4c2d3d95 @   19 : 26 f9             Star r2
  21 E> 0x2efc4c2d3d97 @   21 : 5a f9 fb fa 02    Call r2, r0-r1, [2]</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 与其他引擎对比 -->
      <div class="section">
        <h2 class="section-title">
          <div class="title-icon">📊</div>
          <span>V8与其他JS引擎对比</span>
        </h2>
        <div class="comparison">
          <div class="comparison-table">
            <div class="table-row header">
              <div class="table-cell">特性</div>
              <div class="table-cell">V8 (Chrome/Node)</div>
              <div class="table-cell">SpiderMonkey (Firefox)</div>
              <div class="table-cell">JavaScriptCore (Safari)</div>
              <div class="table-cell">Chakra (Edge Legacy)</div>
            </div>

            <div class="table-row">
              <div class="table-cell">字节码使用</div>
              <div class="table-cell">Ignition 字节码</div>
              <div class="table-cell">IonMonkey 字节码</div>
              <div class="table-cell">LLInt 字节码</div>
              <div class="table-cell">无字节码</div>
            </div>

            <div class="table-row">
              <div class="table-cell">优化编译器</div>
              <div class="table-cell">Turbofan</div>
              <div class="table-cell">IonMonkey</div>
              <div class="table-cell">FTL (基于LLVM)</div>
              <div class="table-cell">SimpleJIT/FullJIT</div>
            </div>

            <div class="table-row">
              <div class="table-cell">垃圾回收</div>
              <div class="table-cell">并行标记清除</div>
              <div class="table-cell">增量标记清除</div>
              <div class="table-cell">分代回收</div>
              <div class="table-cell">并发标记清除</div>
            </div>

            <div class="table-row">
              <div class="table-cell">内存占用</div>
              <div class="table-cell">中等</div>
              <div class="table-cell">较低</div>
              <div class="table-cell">较低</div>
              <div class="table-cell">较高</div>
            </div>

            <div class="table-row">
              <div class="table-cell">启动速度</div>
              <div class="table-cell">快</div>
              <div class="table-cell">中等</div>
              <div class="table-cell">快</div>
              <div class="table-cell">慢</div>
            </div>

            <div class="table-row">
              <div class="table-cell">峰值性能</div>
              <div class="table-cell">高</div>
              <div class="table-cell">高</div>
              <div class="table-cell">高</div>
              <div class="table-cell">中等</div>
            </div>
          </div>

          <div class="comparison-key-points">
            <h3>V8的核心优势</h3>
            <ul>
              <li>
                <div class="point-icon">🚀</div>
                <div class="point-text">更快的启动时间（得益于Ignition字节码）</div>
              </li>
              <li>
                <div class="point-icon">🧠</div>
                <div class="point-text">更激进的多层优化（Turbofan）</div>
              </li>
              <li>
                <div class="point-icon">⚙️</div>
                <div class="point-text">并行垃圾回收（减少停顿时间）</div>
              </li>
              <li>
                <div class="point-icon">🌐</div>
                <div class="point-text">更广泛的平台支持（x64, ARM, MIPS）</div>
              </li>
              <li>
                <div class="point-icon">📦</div>
                <div class="point-text">与Node.js深度集成（服务器端JavaScript）</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 优化建议 -->
      <div class="section">
        <h2 class="section-title">
          <div class="title-icon">💡</div>
          <span>针对V8的优化建议</span>
        </h2>
        <div class="optimization-tips">
          <div class="tip-card">
            <div class="tip-icon">🔄</div>
            <h3>保持函数单一职责</h3>
            <p>V8优化单态函数比多态函数更高效</p>
          </div>
          <div class="tip-card">
            <div class="tip-icon">📏</div>
            <h3>避免属性删除</h3>
            <p>删除属性会破坏隐藏类，导致性能下降</p>
          </div>
          <div class="tip-card">
            <div class="tip-icon">🧱</div>
            <h3>使用固定类型</h3>
            <p>避免频繁改变变量类型</p>
          </div>
          <div class="tip-card">
            <div class="tip-icon">📝</div>
            <h3>遵循原型模式</h3>
            <p>在构造函数中声明所有属性</p>
          </div>
          <div class="tip-card">
            <div class="tip-icon">⏱️</div>
            <h3>避免大型对象</h3>
            <p>大对象会增加垃圾回收压力</p>
          </div>
          <div class="tip-card">
            <div class="tip-icon">🔢</div>
            <h3>使用数组而非对象</h3>
            <p>对连续整数索引使用数组更高效</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 用于控制活动标签页的状态
const activeTab = ref('overview');
</script>

<style lang="less" scoped>

.v8-engine-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
  background: #f8fafc;
  color: #334155;
  line-height: 1.6;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #4285f4, #34a853);
  padding: 2rem;
  border-radius: 16px;
  color: white;
  box-shadow: 0 10px 25px rgba(66, 133, 244, 0.2);

  .title-container {
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 600px;
    }
  }

  .engine-tag {
    background: rgba(255, 255, 255, 0.15);
    padding: 0.5rem 1.2rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    backdrop-filter: blur(5px);
  }
}

.section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03);

  .section-title {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e2e8f0;

    .title-icon {
      font-size: 1.8rem;
      margin-right: 0.8rem;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.overview-section {
  .overview-card {
    display: flex;
    gap: 2rem;
    align-items: center;

    .v8-logo {
      flex-shrink: 0;
      width: 150px;
      height: 150px;
      background: linear-gradient(135deg, #4285f4, #34a853);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 20px rgba(66, 133, 244, 0.3);

      .v8-text {
        font-size: 3.5rem;
        font-weight: 900;
        color: white;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      }
    }

    .content {
      flex: 1;

      h2 {
        font-size: 1.8rem;
        color: #1e293b;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.1rem;
        color: #475569;
        margin-bottom: 1.5rem;
      }
    }
  }

  .key-facts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;

    .fact {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      background: #f1f5f9;
      padding: 0.8rem 1.2rem;
      border-radius: 10px;
      font-weight: 500;

      .fact-icon {
        width: 32px;
        height: 32px;
        background: #4285f4;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
      }
    }
  }
}

.architecture {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  .architecture-diagram {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f1f5f9;
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid #e2e8f0;

    .component {
      text-align: center;
      min-width: 120px;

      .component-icon {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
      }

      .component-name {
        font-weight: 700;
        margin-bottom: 0.3rem;
        color: #1e293b;
      }

      .component-desc {
        font-size: 0.9rem;
        color: #64748b;
      }
    }

    .arrow {
      font-size: 1.8rem;
      color: #94a3b8;
      margin: 0 0.5rem;
    }
  }

  .architecture-explanation {
    .phase {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      border-left: 4px solid #4285f4;

      h3 {
        font-size: 1.2rem;
        color: #1e293b;
        margin-bottom: 0.8rem;
      }

      p {
        color: #475569;
        line-height: 1.6;
      }
    }
  }
}

.performance-reasons, .optimization-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  .reason-card, .tip-card {
    background: #f1f5f9;
    border-radius: 12px;
    padding: 1.8rem 1.5rem;
    text-align: center;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    }

    .reason-icon, .tip-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.2rem;
      color: #1e293b;
      margin-bottom: 0.8rem;
    }

    p {
      color: #475569;
      font-size: 0.95rem;
    }
  }
}

.bytecode-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  .bytecode-explanation {
    p {
      font-size: 1.1rem;
      color: #475569;
      margin-bottom: 1.5rem;
    }
  }

  .benefit {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-items: flex-start;

    .benefit-icon {
      font-size: 1.8rem;
      min-width: 40px;
    }

    .benefit-text {
      h3 {
        font-size: 1.2rem;
        color: #1e293b;
        margin-bottom: 0.5rem;
      }

      p {
        color: #475569;
        line-height: 1.6;
      }
    }
  }

  .bytecode-example {
    background: #f1f5f9;
    border-radius: 12px;
    padding: 1.5rem;

    h3 {
      font-size: 1.3rem;
      color: #1e293b;
      margin-bottom: 1rem;
      text-align: center;
    }
  }
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  .javascript-code, .bytecode-code {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    overflow: hidden;

    h4 {
      font-size: 1rem;
      color: #1e293b;
      margin-bottom: 0.5rem;
      text-align: center;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #e2e8f0;
    }
  }

  pre {
    background: #0f172a;
    border-radius: 6px;
    padding: 1rem;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Source Code Pro', monospace;
      font-size: 0.85rem;
      line-height: 1.5;
      color: #cbd5e1;
    }
  }
}

.comparison {
  .comparison-table {
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 2rem;

    .table-row {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;

      &.header {
        background: #1e293b;
        color: white;
        font-weight: 600;
      }

      &:not(.header):nth-child(even) {
        background: #f8fafc;
      }

      .table-cell {
        padding: 1rem;
        border-right: 1px solid #e2e8f0;
        display: flex;
        align-items: center;

        &:last-child {
          border-right: none;
        }
      }
    }
  }

  .comparison-key-points {
    background: #f1f5f9;
    border-radius: 12px;
    padding: 1.5rem;

    h3 {
      font-size: 1.3rem;
      color: #1e293b;
      margin-bottom: 1rem;
      text-align: center;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px dashed #cbd5e1;

        &:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .point-icon {
          font-size: 1.5rem;
          min-width: 40px;
          color: #4285f4;
        }

        .point-text {
          font-weight: 500;
          color: #475569;
        }
      }
    }
  }
}

@media (max-width: 992px) {
  .architecture, .bytecode-section {
    grid-template-columns: 1fr;
  }

  .architecture-diagram {
    flex-wrap: wrap;
    justify-content: center !important;

    .arrow {
      transform: rotate(90deg);
      margin: 1rem 0;
    }
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-start;
  }

  .overview-card {
    flex-direction: column;
    text-align: center;

    .key-facts {
      grid-template-columns: 1fr;
    }
  }

  .code-comparison {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    overflow-x: auto;

    .table-row {
      min-width: 800px;
    }
  }
}
</style>
