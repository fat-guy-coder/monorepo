<template>
  <div class="scope-container">
    <h1 class="main-title">JavaScript 作用域机制解析</h1>

    <!-- 核心概念 -->
    <section class="concept-section">
      <div class="card static-scope">
        <div class="card-header">
          <span class="icon">📜</span>
          <h2>静态作用域（词法作用域）</h2>
        </div>
        <div class="card-body">
          <p class="definition">
            作用域在<strong>代码编写阶段</strong>确定，函数的作用域链基于其<strong>定义位置</strong>的环境
          </p>
          <div class="code-example">
            <pre>const x = 10;

function outer() {
  const y = 20;
  function inner() {
    console.log(x, y); // 访问定义时的外层作用域
  }
  return inner;
}

const innerFn = outer();
innerFn(); // 输出 10 20</pre>
          </div>
          <div class="feature-grid">
            <div class="feature">
              <div class="feature-icon">✅</div>
              <h3>确定性</h3>
              <p>作用域链在定义时固定</p>
            </div>
            <div class="feature">
              <div class="feature-icon">🔍</div>
              <h3>可预测性</h3>
              <p>代码可静态分析作用域</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card dynamic-scope">
        <div class="card-header">
          <span class="icon">🌀</span>
          <h2>动态作用域</h2>
        </div>
        <div class="card-body">
          <p class="definition">
            作用域在<strong>运行时</strong>确定，函数的作用域链基于其<strong>调用位置</strong>的环境
          </p>
          <div class="code-example">
            <pre># Bash动态作用域示例
x=10

function showX() {
  echo $x
}

function dynamicScope() {
  local x=20
  showX  # 输出20
}

showX   # 输出10
dynamicScope</pre>
          </div>
          <div class="feature-grid">
            <div class="feature">
              <div class="feature-icon">⚠️</div>
              <h3>灵活性</h3>
              <p>运行时动态确定作用域</p>
            </div>
            <div class="feature">
              <div class="feature-icon">🔀</div>
              <h3>上下文依赖</h3>
              <p>行为取决于调用环境</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 对比表格 -->
    <section class="comparison-section">
      <h2 class="section-title">📊 核心差异对比</h2>
      <div class="comparison-table">
        <div class="table-row header">
          <div>特性</div>
          <div>静态作用域</div>
          <div>动态作用域</div>
        </div>
        <div class="table-row">
          <div>确定时机</div>
          <div>代码定义时</div>
          <div>函数调用时</div>
        </div>
        <div class="table-row">
          <div>作用域链</div>
          <div>定义位置的环境</div>
          <div>调用位置的环境</div>
        </div>
        <div class="table-row">
          <div>主要语言</div>
          <div>JavaScript、C++</div>
          <div>Bash、Lisp</div>
        </div>
      </div>
    </section>

    <!-- 工作原理图示 -->
    <section class="diagram-section">
      <h2 class="section-title">📐 作用域链示意图</h2>
      <div class="scope-diagram">
        <div class="lexical-scope">
          <div class="level global">
            <h3>全局作用域</h3>
            <div class="var">x = 10</div>
          </div>
          <div class="level outer">
            <h3>outer函数作用域</h3>
            <div class="var">y = 20</div>
          </div>
          <div class="level inner">
            <h3>inner函数作用域</h3>
            <div class="arrow">↑</div>
          </div>
        </div>
        <div class="dynamic-scope">
          <div class="level caller1">
            <h3>调用环境1</h3>
            <div class="var">x = 20</div>
          </div>
          <div class="level func">
            <h3>showX函数</h3>
            <div class="arrow">↑</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 可添加交互逻辑（如果需要）
</script>

<style lang="less" scoped>
.scope-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui;

  .main-title {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 2.5rem;
    font-size: 2.4rem;
  }

  .card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;

    &.static-scope {
      border-top: 4px solid #42b983;
    }

    &.dynamic-scope {
      border-top: 4px solid #e74c3c;
    }

    .card-header {
      padding: 1.5rem;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      gap: 1rem;

      .icon {
        font-size: 2rem;
      }

      h2 {
        margin: 0;
        color: #34495e;
      }
    }

    .card-body {
      padding: 2rem;

      .definition {
        font-size: 1.1rem;
        color: #7f8c8d;
        line-height: 1.6;
        margin-bottom: 1.5rem;

        strong {
          color: #2c3e50;
        }
      }

      .code-example {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1.5rem;
        margin: 1.5rem 0;

        pre {
          margin: 0;
          font-family: 'Fira Code', monospace;
          white-space: pre-wrap;
        }
      }

      .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;

        .feature {
          text-align: center;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;

          .feature-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }

          h3 {
            margin: 0.5rem 0;
            color: #2c3e50;
          }

          p {
            color: #7f8c8d;
            margin: 0;
          }
        }
      }
    }
  }

  .comparison-section {
    margin: 3rem 0;

    .comparison-table {
      background: white;
      border-radius: 12px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;

      .table-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 1rem;
        border-bottom: 1px solid #eee;

        &.header {
          background: #42b983;
          color: white;
          font-weight: bold;
        }

        div {
          padding: 0.5rem;
        }
      }
    }
  }

  .scope-diagram {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

    .lexical-scope,
    .dynamic-scope {
      .level {
        padding: 1.5rem;
        border: 2px solid #eee;
        border-radius: 8px;
        margin-bottom: 1rem;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          width: 2px;
          height: 20px;
          background: #42b983;
          bottom: -21px;
          left: 50%;
        }

        &:last-child::after {
          display: none;
        }

        h3 {
          margin: 0 0 1rem;
          color: #2c3e50;
          font-size: 0.9rem;
        }

        .var {
          background: #f8f9fa;
          padding: 0.5rem;
          border-radius: 4px;
          font-family: monospace;
        }

        .arrow {
          color: #42b983;
          font-size: 1.5rem;
          text-align: center;
        }
      }
    }

    .dynamic-scope {
      .level {
        &::after {
          background: #e74c3c;
        }
      }
    }
  }

  .section-title {
    color: #34495e;
    border-left: 4px solid #42b983;
    padding-left: 1rem;
    margin: 3rem 0 2rem;
    font-size: 1.6rem;
  }
}
</style>