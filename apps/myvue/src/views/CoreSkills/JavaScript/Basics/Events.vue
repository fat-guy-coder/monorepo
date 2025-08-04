<template>
  <div class="event-doc">
    <!-- 头部 -->
    <header class="doc-header">
      <h1 class="title">🎮 JavaScript 事件系统基本指南</h1>
      <p class="subtitle">交互编程的核心机制</p>
      <div class="header-wave"></div>
    </header>

    <h3>
      JavaScript 事件系统是网页开发中至关重要的一部分。它使得网页能够响应用户的操作，如点击、键盘输入、鼠标移动等。这些操作触发事件，而事件系统则负责管理这些操作的捕获、传播以及响应过程。
      JavaScript 事件可以分为以下几类：
      <ul>
        <li><strong>鼠标事件：</strong>如 click、dblclick、mouseenter、mouseleave 等，常用于处理用户的点击、悬停等动作。</li>
        <li><strong>键盘事件：</strong>如 keydown、keyup、keypress 等，用于处理键盘输入的事件。</li>
        <li><strong>表单事件：</strong>如 submit、change、input、focus/blur 等，常见于表单操作。</li>
      </ul>
      JavaScript 提供了三种主要的事件绑定方式：HTML事件属性、DOM0级事件和DOM2级事件。事件也有三种传播方式：捕获、目标和冒泡，每种方式的事件处理时机有所不同。
      通过理解事件的工作原理和流动机制，开发者可以编写更高效、更灵活的代码。
    </h3>

    <!-- 内容主体 -->
    <main class="doc-content">
      <!-- 事件绑定 -->
      <section class="section binding">
        <h2 class="section-title">🔗 事件绑定方式</h2>
        <div class="binding-grid">
          <div class="method-card">
            <div class="method-header">
              <span class="icon">🖥️</span>
              <h3>HTML事件属性</h3>
            </div>
            <pre class="code-block"><code>&lt;button onclick="handleClick()"&gt;
    Click me
  &lt;/button&gt;</code></pre>
            <h4>优点:</h4>
            <ul>
              <li>简单易用，适合小型项目。</li>
            </ul>
            <h4>缺点:</h4>
            <ul>
              <li>不易维护，代码混杂在HTML中。</li>
              <li>无法使用事件对象。</li>
            </ul>
          </div>

          <div class="method-card">
            <div class="method-header">
              <span class="icon">🎚️</span>
              <h3>DOM0级事件</h3>
            </div>
            <pre class="code-block"><code>btn.onclick = function() {
    console.log('Clicked!');
  };</code></pre>
            <h4>优点:</h4>
            <ul>
              <li>简单直接，易于理解。</li>
            </ul>
            <h4>缺点:</h4>
            <ul>
              <li>只能绑定一个事件处理函数，后绑定的会覆盖前一个。</li>
            </ul>
          </div>

          <div class="method-card">
            <div class="method-header">
              <span class="icon">📡</span>
              <h3>DOM2级事件</h3>
            </div>
            <pre class="code-block"><code>btn.addEventListener(
    'click',
    handler,
    { capture: true, once: true ,passive: true,preventDefault: true,stopPropagation: true}
    // capture: true 表示事件在捕获阶段触发
    // preventDefault: true 表示事件处理函数会调用 preventDefault() 方法
    // stopPropagation: true 表示事件处理函数会调用 stopPropagation() 方法
    // passive: true 表示事件处理函数不会调用 preventDefault() 方法
    // once: true 表示事件处理函数只会执行一次
  );</code></pre>
            <h4>优点:</h4>
            <ul>
              <li>可以绑定多个事件处理函数。</li>
              <li>支持事件捕获和冒泡。</li>
            </ul>
            <h4>缺点:</h4>
            <ul>
              <li>没啥缺点</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 事件对象 -->
      <section class="section event-object">
        <h2 class="section-title">🧑‍💻 事件对象</h2>
        <p>
          JavaScript 中的事件对象是一个包含事件相关信息的对象，事件对象提供了详细的事件数据，包括事件的类型、目标元素、鼠标位置、按键状态等信息。可以通过事件处理函数的参数访问该对象。
        </p>
        <h4>常见属性:</h4>
        <ul>
          <li><strong>target</strong>: 事件的目标元素，通常是触发事件的元素。</li>
          <li><strong>type</strong>: 事件的类型，如 "click", "keydown" 等。</li>
          <li><strong>clientX</strong> 和 <strong>clientY</strong>: 鼠标点击的横纵坐标（相对于浏览器窗口）。</li>
          <li><strong>key</strong>: 按下的键值（对于键盘事件）。</li>
        </ul>
        <h4>示例:</h4>
        <pre class="code-block"><code>document.querySelector('button').addEventListener('click', (event) => {
          console.log('事件类型:', event.type);
          console.log('事件目标:', event.target);
          console.log('鼠标坐标:', event.clientX, event.clientY);
        });</code></pre>
      </section>

      <!-- 鼠标事件坐标 -->
      <section class="section mouse-coordinates">
        <h2 class="section-title">🖱️ 鼠标事件坐标系统</h2>
        <p>在处理鼠标事件时,JavaScript提供了多种不同的坐标属性,每种坐标都有其特定的参考点:</p>

        <div class="coordinates-grid">
          <div class="coordinate-card">
            <h3>clientX/clientY</h3>
            <p>相对于浏览器窗口可视区域的坐标</p>
            <ul>
              <li>参考点: 浏览器窗口左上角</li>
              <li>不受页面滚动影响</li>
            </ul>
          </div>

          <div class="coordinate-card">
            <h3>pageX/pageY</h3>
            <p>相对于整个文档的坐标</p>
            <ul>
              <li>参考点: 文档左上角</li>
              <li>会计算页面滚动距离</li>
            </ul>
          </div>

          <div class="coordinate-card">
            <h3>screenX/screenY</h3>
            <p>相对于用户屏幕的坐标</p>
            <ul>
              <li>参考点: 屏幕左上角</li>
              <li>包含浏览器界面和操作系统界面</li>
            </ul>
          </div>

          <div class="coordinate-card">
            <h3>offsetX/offsetY</h3>
            <p>相对于目标元素的坐标</p>
            <ul>
              <li>参考点: 元素的内边距边界</li>
              <li>仅计算元素内部的偏移量</li>
            </ul>
          </div>
        </div>

        <div class="code-example">
          <pre class="code-block"><code>element.addEventListener('mousemove', (event) => {
  console.log('Client:', event.clientX, event.clientY);
  console.log('Page:', event.pageX, event.pageY);
  console.log('Screen:', event.screenX, event.screenY);
  console.log('Offset:', event.offsetX, event.offsetY);
});</code></pre>
        </div>
      </section>

      <h3>
        在浏览器中，事件传播有三个阶段：
        <ol>
          <li>捕获阶段：事件从根元素开始，向目标元素传播。</li>
          <li>目标阶段：事件到达目标元素。</li>
          <li>冒泡阶段：事件从目标元素向根元素传播。</li>
        </ol>
      </h3>

      <!-- 事件流 -->
      <section class="section flow">
        <h2 class="section-title">🌊 事件传播流程</h2>
        <div class="flow-container">
          <div class="flow-visual">
            <div class="phase capture">
              <div class="label">捕获阶段</div>
              <div class="arrow">↓</div>
            </div>
            <div class="target-phase">
              <div class="circle">🎯</div>
              <div class="label">目标阶段</div>
            </div>
            <div class="phase bubble">
              <div class="arrow">↑</div>
              <div class="label">冒泡阶段</div>
            </div>
          </div>
          <div class="flow-code">
            <pre class="code-block"><code>document.addEventListener('click', () => {
    console.log('Document捕获');
  }, true);

  document.addEventListener('click', () => {
    console.log('Document冒泡');
  });</code></pre>
          </div>
        </div>
      </section>

      <!-- 事件代理 -->
      <section class="section delegation">
        <h2 class="section-title">👥 事件代理（委派）</h2>
        <div class="delegation-example">
          <div class="code-column">
            <pre class="code-block"><code>// 传统方式
  document.querySelectorAll('li')
    .forEach(li => {
    li.addEventListener('click', handleClick);
    });

  // 事件代理
  document.querySelector('ul')
    .addEventListener('click', (e) => {
    if(e.target.tagName === 'LI') {
      handleClick(e);
    }
    });</code></pre>
          </div>
          <div class="benefits">
            <div class="benefit-card">
              <div class="icon">⚡</div>
              <h4>性能优化</h4>
              <p>减少事件监听器数量</p>
            </div>
            <div class="benefit-card">
              <div class="icon">🔄</div>
              <h4>动态元素支持</h4>
              <p>自动处理新增元素事件</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 常见事件 -->
      <section class="section common-events">
        <h2 class="section-title">📌 常见事件类型</h2>
        <div class="event-grid">
          <div class="event-card">
            <h3>鼠标事件</h3>
            <ul>
              <li>click(点击)</li>
              <li>dblclick(双击)</li>
              <li>mouseenter(鼠标进入)</li>
              <li>mouseleave(鼠标离开)</li>
              <li>mousemove(鼠标移动)</li>
              <li>mouseover(鼠标悬停)</li>
              <li>mouseout(鼠标离开)</li>
              <li>mousedown(鼠标按下)</li>
              <li>mouseup(鼠标释放)</li>
            </ul>
          </div>
          <div class="event-card">
            <h3>键盘事件</h3>
            <ul>
              <li>keydown(键盘按下)</li>
              <li>keyup(键盘释放)</li>
              <li>keypress(键盘按下)</li>

            </ul>
          </div>
          <div class="event-card">
            <h3>表单事件</h3>
            <ul>
              <li>submit(提交)</li>
              <li>change(改变)</li>
              <li>input(输入)</li>
              <li>focus/blur(聚焦/失去焦点)</li>
              <li>reset(重置)</li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <!-- 注意事项 -->
    <footer class="doc-footer">
      <div class="notice-board">
        <h3>⚠️ 重要注意事项</h3>
        <div class="notice-list">
          <div class="notice-item">
            <div class="warning-icon">❗</div>
            <p>及时移除不需要的事件监听</p>
          </div>
          <div class="notice-item">
            <div class="warning-icon">❗</div>
            <p>注意事件对象的兼容性问题</p>
          </div>
          <div class="notice-item">
            <div class="warning-icon">❗</div>
            <p>合理使用stopPropagation</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Fira+Code&display=swap');

.event-doc {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem 3rem;
  background: linear-gradient(145deg, #f8fafb 0%, #ffffff 100%);
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  font-family: 'Inter', sans-serif;

  .doc-header {
    text-align: center;
    margin-bottom: 3rem;

    .title {
      color: #6c5ce7;
      font-size: 2.8rem;
      margin: 1rem 0;
      text-shadow: 2px 2px 4px rgba(108, 92, 231, 0.1);
    }

    .subtitle {
      color: #636e72;
      font-size: 1.4rem;
      letter-spacing: 0.05em;
    }

    .header-wave {
      width: 120px;
      height: 8px;
      background: repeating-linear-gradient(90deg,
          #6c5ce7 0px,
          #6c5ce7 10px,
          transparent 10px,
          transparent 20px);
      margin: 1.5rem auto;
    }
  }

  .doc-content {
    .section {
      margin-bottom: 3rem;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-3px);
      }

      .section-title {
        color: #2d3436;
        font-size: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #eee;
      }

      .binding-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;

        .method-card {
          border: 1px solid #eee;
          border-radius: 8px;
          overflow: hidden;

          .method-header {
            padding: 1.5rem;
            background: #f8f9fa;
            display: flex;
            align-items: center;
            gap: 1rem;

            .icon {
              font-size: 2rem;
            }
          }
        }
      }

      .flow-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: center;

        .flow-visual {
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 8px;

          .phase {
            padding: 1rem;
            text-align: center;

            &.capture {
              color: #6c5ce7;
            }

            &.bubble {
              color: #00b894;
            }

            .arrow {
              font-size: 2rem;
              margin: 1rem 0;
            }
          }

          .target-phase {
            text-align: center;
            margin: 2rem 0;

            .circle {
              font-size: 2.5rem;
            }
          }
        }
      }

      .delegation-example {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;

        .benefits {
          display: grid;
          gap: 1.5rem;

          .benefit-card {
            padding: 1.5rem;
            background: #f8f9fa;
            border-radius: 8px;
            text-align: center;

            .icon {
              font-size: 2rem;
              margin-bottom: 1rem;
            }
          }
        }
      }

      .event-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;

        .event-card {
          padding: 1.5rem;
          border: 1px solid #eee;
          border-radius: 8px;

          h3 {
            color: #6c5ce7;
            margin-bottom: 1rem;
          }

          ul {
            list-style: none;
            padding-left: 1.5rem;

            li {
              position: relative;
              padding: 0.3rem 0;

              &::before {
                content: '▹';
                position: absolute;
                left: -1.5rem;
                color: #6c5ce7;
              }
            }
          }
        }
      }
    }

    .code-block {
      background: #2d3436;
      color: #dfe6e9;
      padding: 1rem;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      overflow-x: auto;
      margin: 1rem 0;
    }
  }

  .doc-footer {
    .notice-board {
      background: #ffeaa7;
      padding: 2rem;
      border-radius: 8px;
      border-left: 4px solid #fdcb6e;

      h3 {
        color: #d63031;
        margin-bottom: 1rem;
      }

      .notice-list {
        .notice-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1rem 0;

          .warning-icon {
            font-size: 1.5rem;
            color: #d63031;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .event-doc {
    padding: 1rem;
    margin: 1rem;

    .doc-header .title {
      font-size: 2rem;
    }

    .binding-grid,
    .flow-container,
    .delegation-example,
    .event-grid {
      grid-template-columns: 1fr !important;
    }
  }
}
</style>
