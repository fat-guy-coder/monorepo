// ProxyDocument.vue

<template>
  <div class="proxy-doc-container">
    <!-- 头部 -->
    <header class="doc-header">
      <h1 class="title">🎯 ES6 Proxy 基本指南</h1>
      <p class="subtitle">元编程的魔法工具</p>
      <div class="decorative-line"></div>
    </header>

    <!-- 主要内容 -->
    <main class="doc-content">
      <!-- 核心概念 -->
      <section class="section concept">
        <h2 class="section-title"><span class="icon">🔮</span> 核心概念</h2>
        <h4>
          Proxy
          是一个用于创建代理对象的构造函数，它可以拦截并定义基本操作（如属性查找、赋值、枚举、函数调用等）的自定义行为。通过使用
          Proxy，我们可以在不改变原始对象的情况下，添加额外的功能，例如数据验证、日志记录等。
        </h4>
        <div class="concept-grid">
          <div class="concept-card">
            <div class="card-header">代理目标</div>
            <div class="card-content">被包装的原始对象</div>
          </div>
          <div class="concept-card">
            <div class="card-header">处理器对象</div>
            <div class="card-content">包含陷阱方法的配置对象</div>
          </div>
          <div class="concept-card">
            <div class="card-header">陷阱方法</div>
            <div class="card-content">拦截操作的函数</div>
          </div>
        </div>
      </section>

      <!-- 基础用法 -->
      <section class="section basic-usage">
        <h2 class="section-title"><span class="icon">🛠️</span> 基础用法</h2>
        <div class="code-example">
          <pre class="code-block"><code>interface User {
  name: string;
  age: number;
}

const target: User = { name: 'Alice', age: 25 };
const handler: ProxyHandler= {
  get(target, prop) {
    return prop in target ? target[prop] : 'N/A';
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // Alice
console.log(proxy.gender); // N/A</code></pre>
        </div>
      </section>

      <!-- 常用陷阱 -->
      <section class="section traps">
        <h2 class="section-title"><span class="icon">⛓️</span> 常用陷阱方法</h2>
        <div class="trap-grid">
          <div v-for="trap in traps" :key="trap.name" class="trap-card">
            <h3>{{ trap.name }}</h3>
            <p>{{ trap.desc }}</p>
            <div class="syntax">{{ trap.syntax }}</div>
          </div>
        </div>
      </section>

      <!-- Proxy vs defineProperty -->
      <section class="section comparison">
        <h2 class="section-title"><span class="icon">🔍</span> Proxy vs Object.defineProperty</h2>

        <div class="comparison-grid">
          <div class="comparison-card">
            <h3>拦截操作范围</h3>
            <div class="compare-content">
              <div class="proxy-side">
                <h4>Proxy</h4>
                <p>可以拦截多达13种对象操作,包括属性访问、赋值、删除、函数调用等</p>
              </div>
              <div class="define-side">
                <h4>defineProperty</h4>
                <p>仅能拦截对象属性的getter和setter操作</p>
              </div>
            </div>
          </div>

          <div class="comparison-card">
            <h3>使用场景</h3>
            <div class="compare-content">
              <div class="proxy-side">
                <h4>Proxy</h4>
                <ul>
                  <li>数据验证和过滤</li>
                  <li>日志记录</li>
                  <li>格式化</li>
                  <li>只读视图</li>
                  <li>属性隐藏</li>
                </ul>
              </div>
              <div class="define-side">
                <h4>defineProperty</h4>
                <ul>
                  <li>简单的数据劫持</li>
                  <li>计算属性</li>
                  <li>属性保护</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="comparison-card">
            <h3>使用限制</h3>
            <div class="compare-content">
              <div class="proxy-side">
                <h4>Proxy</h4>
                <ul>
                  <li>无法监听到对象引用的变化</li>
                  <li>需要额外的polyfill支持</li>
                  <li>性能开销相对较大</li>
                </ul>
              </div>
              <div class="define-side">
                <h4>defineProperty</h4>
                <ul>
                  <li>必须预先知道要监听的属性</li>
                  <li>不能监听数组长度变化</li>
                  <li>不能监听对象属性的添加和删除</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="code-example">
          <h3>对比示例:</h3>
          <pre class="code-block"><code>// Proxy方式
const target = { name: 'Alice' };
const proxy = new Proxy(target, {
  get(target, prop) {
    console.log(`访问了${String(prop)}属性`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`设置${String(prop)}=${value}`);
    target[prop] = value;
    return true;
  }
});

// defineProperty方式
const obj = {};
Object.defineProperty(obj, 'name', {
  get() {
    console.log('访问了name属性');
    return this._name;
  },
  set(value) {
    console.log(`设置name=${value}`);
    this._name = value;
  }
});</code></pre>
        </div>
      </section>

      <!-- 应用场景 -->
      <section class="section use-cases">
        <h2 class="section-title"><span class="icon">💡</span> 应用场景</h2>
        <div class="case-container">
          <div v-for="(scene, index) in scenes" :key="index" class="case-card">
            <h3>{{ scene.name }}</h3>
            <p>{{ scene.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- 注意事项 -->
    <footer class="doc-footer">
      <div class="notice-box">
        <h3>⚠️ 注意事项</h3>
        <ul>
          <li>Proxy无法检测到对象引用变化</li>
          <li>深度代理需要递归实现</li>
          <li>部分低版本浏览器需要polyfill</li>
        </ul>
      </div>
    </footer>
  </div>
</template>
<script lang="ts" setup>
interface TrapConfig {
  name: string
  desc: string
  syntax: string
}

const traps: TrapConfig[] = [
  {
    name: 'get',
    desc: '拦截属性读取操作',
    syntax: 'get(target, prop, receiver)',
  },
  {
    name: 'set',
    desc: '拦截属性设置操作',
    syntax: 'set(target, prop, value, receiver)',
  },
  {
    name: 'apply',
    desc: '拦截函数调用操作',
    syntax: 'apply(target, thisArg, args)',
  },
  {
    name: 'construct',
    desc: '拦截new操作符',
    syntax: 'construct(target, args, newTarget)',
  },
  {
    name: 'deleteProperty',
    desc: '拦截属性删除操作',
    syntax: 'deleteProperty(target, prop)',
  },
  {
    name: 'has',
    desc: '拦截属性存在性检查',
    syntax: 'has(target, prop)',
  },
  {
    name: 'ownKeys',
    desc: '拦截对象属性的枚举',
    syntax: 'ownKeys(target)',
  },
  {
    name: 'getOwnPropertyDescriptor',
    desc: '拦截获取属性描述符操作',
    syntax: 'getOwnPropertyDescriptor(target, prop)',
  },
  {
    name: 'setPrototypeOf',
    desc: '拦截设置对象原型操作',
    syntax: 'setPrototypeOf(target, proto)',
  },
  {
    name: 'isExtensible',
    desc: '拦截对象扩展性检查',
    syntax: 'isExtensible(target)',
  },
  {
    name: 'preventExtensions',
    desc: '拦截对象防止扩展操作',
    syntax: 'preventExtensions(target)',
  },
]
const scenes = [
  { name: '数据验证', desc: '属性赋值时自动验证数据类型' },
  { name: '日志追踪', desc: '自动记录对象操作日志' },
  { name: '惰性加载', desc: '按需加载大型对象属性' },
  { name: '性能优化', desc: '通过代理实现懒加载和缓存' },
  { name: '数据绑定', desc: '实现响应式数据绑定' },
  { name: '权限控制', desc: '动态控制对象属性的访问权限' },
]
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Inter:wght@400;600;800&display=swap');

div,
code {
  color: #000;
}

.proxy-doc-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem 3rem;
  background: linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', sans-serif;

  .doc-header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;

    .title {
      color: #6c5ce7;
      font-size: 2.8rem;
      margin: 1rem 0;
      text-shadow: 2px 2px 4px rgba(108, 92, 231, 0.1);
    }

    .subtitle {
      color: #a8a8a8;
      font-size: 1.4rem;
      letter-spacing: 0.05em;
    }

    .decorative-line {
      width: 80px;
      height: 4px;
      background: #6c5ce7;
      margin: 1.5rem auto;
      border-radius: 2px;
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
        transform: translateY(-5px);
      }

      .section-title {
        color: #2d3436;
        font-size: 2rem;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;

        .icon {
          font-size: 1.8rem;
        }
      }

      .concept-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;

        .concept-card {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid #6c5ce7;

          .card-header {
            color: #6c5ce7;
            font-weight: 600;
            margin-bottom: 0.8rem;
          }

          .card-content {
            color: #636e72;
          }
        }
      }

      .code-example {
        background: #2d3436;
        border-radius: 8px;
        overflow: hidden;

        .code-block {
          color: #dfe6e9;
          font-family: 'Fira Code', monospace;
          padding: 1.5rem;
          font-size: 0.95rem;
          line-height: 1.6;
          counter-reset: line;
          background-color: #000;

          code {
            color: #fff;
          }

          code::before {
            content: counter(line);
            counter-increment: line;
            margin-right: 1.5rem;
            color: #fff;
          }
        }
      }

      .trap-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;

        .trap-card {
          background: #fff;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #eee;
          transition: all 0.3s ease;

          &:hover {
            border-color: #6c5ce7;
            box-shadow: 0 4px 12px rgba(108, 92, 231, 0.1);
          }

          h3 {
            color: #6c5ce7;
            margin-bottom: 0.5rem;
          }

          .syntax {
            background: #f8f9fa;
            padding: 0.5rem;
            border-radius: 4px;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            margin-top: 1rem;
          }
        }
      }

      .case-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;

        .case-card {
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 8px;
          text-align: center;
          transition: transform 0.3s ease;

          &:hover {
            transform: scale(1.05);
          }

          h3 {
            color: #2d3436;
            margin-bottom: 0.5rem;
          }

          p {
            color: #636e72;
          }
        }
      }
    }
  }

  .doc-footer {
    .notice-box {
      background: #fff3e6;
      padding: 2rem;
      border-radius: 8px;
      border-left: 4px solid #ff9f43;

      h3 {
        color: #ff9f43;
        margin-bottom: 1rem;
      }

      ul {
        list-style: none;
        padding-left: 0;

        li {
          padding: 0.5rem 0;
          position: relative;
          padding-left: 2rem;

          &::before {
            content: '⚠️';
            position: absolute;
            left: 0;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .proxy-doc-container {
    padding: 1rem;
    margin: 1rem;

    .doc-header .title {
      font-size: 2rem;
    }

    .concept-grid,
    .case-container {
      grid-template-columns: 1fr !important;
      gap: 1rem;
    }

    .trap-grid {
      grid-template-columns: 1fr !important;
    }
  }
}

.comparison {
  background: linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%) !important;

  .section-title {
    position: relative;
    padding-bottom: 0.8rem;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background: #6c5ce7;
      border-radius: 3px;
    }
  }

  .comparison-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .comparison-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }

    h3 {
      background: #6c5ce7;
      color: white;
      margin: 0;
      padding: 1rem;
      font-size: 1.2rem;
      text-align: center;
    }

    .compare-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      height: 100%;

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }

      .proxy-side,
      .define-side {
        padding: 1.5rem;

        h4 {
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          position: relative;
          display: inline-block;
        }
      }

      .proxy-side {
        background: #f0f4ff;
        border-right: 1px solid #e0e0e0;

        @media (max-width: 640px) {
          border-right: none;
          border-bottom: 1px solid #e0e0e0;
        }

        h4 {
          color: #4834d4;

          &:after {
            content: "";
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 100%;
            height: 2px;
            background: #4834d4;
          }
        }

        ul li {
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.5rem;

          &:before {
            content: "✓";
            color: #4834d4;
            position: absolute;
            left: 0;
            font-weight: bold;
          }
        }
      }

      .define-side {
        background: #fff5f5;

        h4 {
          color: #ff6b6b;

          &:after {
            content: "";
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 100%;
            height: 2px;
            background: #ff6b6b;
          }
        }

        ul li {
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.5rem;

          &:before {
            content: "•";
            color: #ff6b6b;
            position: absolute;
            left: 0;
            font-size: 1.5rem;
            line-height: 0.8;
          }
        }
      }

      p {
        margin: 0 0 1rem 0;
        line-height: 1.6;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
    }
  }

  .code-example {
    margin-top: 2.5rem;

    h3 {
      color: #2d3436;
      margin-bottom: 1rem;
      font-size: 1.3rem;
      border-left: 4px solid #6c5ce7;
      padding-left: 1rem;
    }
  }

  @media (max-width: 768px) {
    .comparison-grid {
      grid-template-columns: 1fr;
    }

    .comparison-card {
      .compare-content {
        grid-template-columns: 1fr;

        .proxy-side {
          border-right: none;
          border-bottom: 1px solid #e0e0e0;
        }
      }
    }
  }
}
</style>
