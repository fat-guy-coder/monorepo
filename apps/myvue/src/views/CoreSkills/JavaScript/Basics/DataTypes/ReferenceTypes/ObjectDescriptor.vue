<template>
  <div class="descriptor-container">
    <!-- 头部标题区域 -->
    <div class="header-section">
      <div class="title-group">
        <div class="logo-container">
          <div class="descriptor-logo">
            <div class="d">D</div>
          </div>
        </div>
        <div class="text-content">
          <h1>JavaScript 对象描述符</h1>
          <p class="subtitle">深度解析对象属性行为控制机制</p>
        </div>
      </div>

      <div class="stats-cards">
        <div class="stat-card">
          <div class="stat-icon">🔒</div>
          <div class="stat-content">
            <h3>属性控制</h3>
            <p>精确控制对象属性的行为</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔍</div>
          <div class="stat-content">
            <h3>元编程</h3>
            <p>实现高级元编程能力</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚙️</div>
          <div class="stat-content">
            <h3>响应式核心</h3>
            <p>现代响应式框架的基础</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 描述符介绍 -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">📚</div>
        <h2>什么是对象描述符？</h2>
      </div>
      <div class="section-content">
        <div class="info-card">
          <p>
            <strong>对象属性描述符</strong>是 JavaScript
            用于描述对象属性特性的元信息集合，提供了对属性行为的精细控制。
          </p>

          <div class="comparison">
            <div class="comparison-item">
              <h4>为什么需要属性描述符？</h4>
              <ul>
                <li>控制属性是否可写</li>
                <li>控制属性是否可枚举</li>
                <li>控制属性是否可配置</li>
                <li>实现属性访问控制</li>
                <li>创建不可变对象</li>
              </ul>
            </div>
            <div class="comparison-item">
              <h4>基本概念</h4>
              <ul>
                <li><strong>数据描述符</strong> - 描述具有值的属性</li>
                <li><strong>存取描述符</strong> - 描述由 getter/setter 控制的属性</li>
                <li><strong>默认值</strong> - 普通属性默认都是可写、可枚举、可配置</li>
                <li><strong>内部特性</strong> - 这些特性不会被直接访问</li>
              </ul>
            </div>
          </div>

          <div class="evolution-timeline">
            <h3>对象属性控制演进</h3>
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-icon">1</div>
                <div class="timeline-content">
                  <h4>ES3</h4>
                  <p>简单对象属性，无控制机制</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-icon">2</div>
                <div class="timeline-content">
                  <h4>ES5</h4>
                  <p>引入 Object.defineProperty</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-icon">3</div>
                <div class="timeline-content">
                  <h4>ES6</h4>
                  <p>引入 Reflect 和 Proxy</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-icon">4</div>
                <div class="timeline-content">
                  <h4>现代框架</h4>
                  <p>描述符成为响应式核心</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 描述符参数详解 -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">🔧</div>
        <h2>描述符参数详解</h2>
      </div>
      <div class="section-content">
        <div class="properties-grid">
          <div class="property-card">
            <h3>value</h3>
            <div class="property-type">数据描述符</div>
            <p>属性的值，默认为 undefined</p>
            <div class="property-example">
              <pre><code>value: 42</code></pre>
            </div>
          </div>

          <div class="property-card">
            <h3>writable</h3>
            <div class="property-type">数据描述符</div>
            <p>属性值是否可修改，默认为 false</p>
            <div class="property-example">
              <pre><code>writable: true</code></pre>
            </div>
          </div>

          <div class="property-card">
            <h3>enumerable</h3>
            <div class="property-type">通用</div>
            <p>属性是否出现在枚举中，默认为 false</p>
            <div class="property-example">
              <pre><code>enumerable: true</code></pre>
            </div>
          </div>

          <div class="property-card">
            <h3>configurable</h3>
            <div class="property-type">通用</div>
            <p>属性描述符是否可修改和删除，默认为 false</p>
            <div class="property-example">
              <pre><code>configurable: true</code></pre>
            </div>
          </div>

          <div class="property-card">
            <h3>get</h3>
            <div class="property-type">存取描述符</div>
            <p>访问属性时调用的函数</p>
            <div class="property-example">
              <pre><code>get: function() {
  return this._value;
}</code></pre>
            </div>
          </div>

          <div class="property-card">
            <h3>set</h3>
            <div class="property-type">存取描述符</div>
            <p>设置属性时调用的函数</p>
            <div class="property-example">
              <pre><code>set: function(newVal) {
  this._value = newVal;
}</code></pre>
            </div>
          </div>
        </div>

        <div class="descriptor-rules">
          <h3>描述符使用规则</h3>
          <div class="rules-container">
            <div class="rule-item">
              <div class="rule-badge">!</div>
              <p>数据描述符和存取描述符不能同时使用</p>
            </div>
            <div class="rule-item">
              <div class="rule-badge">!</div>
              <p>如果未指定描述符特性，默认为 false</p>
            </div>
            <div class="rule-item">
              <div class="rule-badge">!</div>
              <p>configurable 为 false 时不能再修改描述符</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用方式 -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">🛠️</div>
        <h2>使用方式</h2>
      </div>
      <div class="section-content">
        <div class="usage-grid">
          <div class="usage-card">
            <h3>定义单个属性</h3>
            <pre><code>const user = {};
Object.defineProperty(user, 'name', {
  value: 'Alice',
  writable: false,
  enumerable: true
});

console.log(user.name); // 'Alice'
user.name = 'Bob'; // 静默失败（严格模式报错）</code></pre>
          </div>

          <div class="usage-card">
            <h3>定义多个属性</h3>
            <pre><code>const account = {};
Object.defineProperties(account, {
  balance: {
    value: 1000,
    writable: true
  },
  id: {
    value: 'ACC123',
    configurable: false
  }
});</code></pre>
          </div>
        </div>

        <div class="usage-grid">
          <div class="usage-card">
            <h3>使用 getter/setter</h3>
            <pre><code>const temperature = {};
let _celsius = 0;

Object.defineProperty(temperature, 'celsius', {
  get: function() { return _celsius; },
  set: function(value) {
    _celsius = value;
    console.log(`温度设置为: ${value}°C`);
  },
  enumerable: true
});

temperature.celsius = 25; // 日志: 温度设置为: 25°C</code></pre>
          </div>

          <div class="usage-card">
            <h3>读取属性描述符</h3>
            <pre><code>const desc = Object.getOwnPropertyDescriptor(
  temperature,
  'celsius'
);

console.log(desc);
// {
//   get: [Function: get],
//   set: [Function: set],
//   enumerable: true,
//   configurable: false
// }</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 适用场景 -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">🚀</div>
        <h2>适用场景</h2>
      </div>
      <div class="section-content">
        <div class="scenario-grid">
          <div class="scenario-card">
            <div class="scenario-icon">🔒</div>
            <h3>创建不可变属性</h3>
            <p>防止属性被修改</p>
            <pre><code>Object.defineProperty(obj, 'id', {
  value: 'UNIQUE_ID',
  writable: false,
  configurable: false
});</code></pre>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">👁️</div>
            <h3>隐藏敏感属性</h3>
            <p>避免出现在枚举中</p>
            <pre><code>Object.defineProperty(user, 'password', {
  value: 'secret',
  enumerable: false
});

// 不会出现在 Object.keys 或 for-in 循环中</code></pre>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🔄</div>
            <h3>响应式数据绑定</h3>
            <p>实现数据变化监听</p>
            <pre><code>function reactive(obj, key) {
  let value = obj[key];

  Object.defineProperty(obj, key, {
    get() { return value; },
    set(newVal) {
      value = newVal;
      notifyChange(key, newVal);
    }
  });
}</code></pre>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📊</div>
            <h3>计算属性</h3>
            <p>基于其他属性动态计算</p>
            <pre><code>Object.defineProperty(rectangle, 'area', {
  get: function() {
    return this.width * this.height;
  },
  enumerable: true
});</code></pre>
          </div>
        </div>

        <div class="framework-usage">
          <h3>框架中的对象描述符</h3>
          <div class="framework-grid">
            <div class="framework-card">
              <h4>Vue 2.x</h4>
              <p>使用 Object.defineProperty 实现响应式</p>
            </div>
            <div class="framework-card">
              <h4>MobX</h4>
              <p>使用描述符实现可观察属性</p>
            </div>
            <div class="framework-card">
              <h4>Ember.js</h4>
              <p>使用描述符实现计算属性</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最佳实践 -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">✅</div>
        <h2>最佳实践</h2>
      </div>
      <div class="section-content">
        <div class="best-practices">
          <div class="practice-card">
            <div class="practice-icon">👍</div>
            <div class="practice-content">
              <h3>尽量使用存取描述符</h3>
              <p>提供更好的控制和扩展性，尤其当需要添加额外逻辑时</p>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-icon">👍</div>
            <div class="practice-content">
              <h3>谨慎使用 configurable: false</h3>
              <p>一旦设置无法撤销，确保不再需要修改描述符</p>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-icon">👍</div>
            <div class="practice-content">
              <h3>使用严格模式</h3>
              <p>严格模式会抛出错误而不是静默失败</p>
            </div>
          </div>
        </div>

        <div class="alternatives">
          <h3>替代方案</h3>
          <div class="alt-grid">
            <div class="alt-card">
              <h4>Proxy</h4>
              <p>ES6 引入的更强大的对象拦截机制</p>
              <pre><code>const proxy = new Proxy(target, {
  get(target, prop) { ... },
  set(target, prop, value) { ... }
});</code></pre>
            </div>
            <div class="alt-card">
              <h4>Reflect API</h4>
              <p>提供更优雅的属性操作方法</p>
              <pre><code>Reflect.defineProperty(target, prop, desc);
Reflect.get(target, prop);
Reflect.set(target, prop, value);</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 总结 -->
    <div class="summary-section">
      <div class="summary-content">
        <h3>对象描述符要点总结</h3>
        <div class="summary-points">
          <div class="point">
            <div class="point-icon">📌</div>
            <div class="point-text">描述符控制对象属性的行为，包括可写性、可枚举性和可配置性</div>
          </div>
          <div class="point">
            <div class="point-icon">📌</div>
            <div class="point-text">数据描述符用于普通属性，存取描述符用于计算属性和响应式数据</div>
          </div>
          <div class="point">
            <div class="point-icon">📌</div>
            <div class="point-text">configurable: false 是不可逆的操作，使用时要格外谨慎</div>
          </div>
          <div class="point">
            <div class="point-icon">📌</div>
            <div class="point-text">描述符是现代响应式框架的基础，但在复杂场景下可考虑 Proxy</div>
          </div>
        </div>

        <div class="final-tip">
          <div class="tip-icon">💡</div>
          <p>对象描述符是 JavaScript 元编程的基石，掌握它能帮助你创建更健壮、更可控的对象模型。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 示例数据
const descriptorProperties = ref([
  { name: 'value', type: '数据描述符', description: '属性值' },
  { name: 'writable', type: '数据描述符', description: '是否可写' },
  { name: 'enumerable', type: '通用', description: '是否可枚举' },
  { name: 'configurable', type: '通用', description: '是否可配置' },
  { name: 'get', type: '存取描述符', description: 'getter函数' },
  { name: 'set', type: '存取描述符', description: 'setter函数' },
])
</script>

<style lang="less" scoped>
@primary-color: #5c6bc0;
@secondary-color: #7986cb;
@accent-color: #9fa8da;
@background-light: #f5f7fe;
@card-bg: #ffffff;
@text-primary: #1a237e;
@text-secondary: #283593;
@border-color: #e8eaf6;
@success-color: #4caf50;
@info-color: #2196f3;
@shadow-light:
  0 4px 6px rgba(92, 107, 192, 0.1),
  0 2px 4px rgba(92, 107, 192, 0.06);
@code-bg: #f5f7ff;
@timeline-color: #c5cae9;

.descriptor-container {
  font-family:
    'Segoe UI',
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
}

.header-section {
  margin: 2rem 0 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid @border-color;

  .title-group {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;

    .logo-container {
      .descriptor-logo {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 12px rgba(92, 107, 192, 0.2);

        .d {
          color: white;
          font-size: 3.5rem;
          font-weight: 800;
          font-family: 'Arial Rounded MT Bold', 'Arial', sans-serif;
          transform: translateY(-2px);
        }
      }
    }

    .text-content {
      h1 {
        font-size: 2.4rem;
        margin: 0 0 0.5rem;
        color: @text-primary;
        font-weight: 700;
      }

      .subtitle {
        font-size: 1.3rem;
        color: @text-secondary;
        margin: 0;
      }
    }
  }

  .stats-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    .stat-card {
      background: @card-bg;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: @shadow-light;
      display: flex;
      gap: 1rem;
      transition: transform 0.3s ease;
      border-left: 4px solid @accent-color;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 15px -3px rgba(92, 107, 192, 0.15);
      }

      .stat-icon {
        font-size: 2rem;
        min-width: 50px;
        height: 50px;
        border-radius: 50%;
        background: fade(@accent-color, 15%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: @primary-color;
      }

      .stat-content {
        h3 {
          margin: 0 0 0.5rem;
          font-size: 1.3rem;
        }

        p {
          margin: 0;
          color: @text-secondary;
          font-size: 0.95rem;
        }
      }
    }
  }
}

@media (max-width: 900px) {
  .header-section .stats-cards {
    grid-template-columns: 1fr;
  }
}

.section {
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid @border-color;

  .section-icon {
    font-size: 1.8rem;
    color: @primary-color;
  }

  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
  }
}

.section-content {
  .info-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: @shadow-light;

    p {
      margin-top: 0;
      font-size: 1.1rem;

      strong {
        color: @primary-color;
      }
    }

    .comparison {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin: 1.5rem 0;

      .comparison-item {
        background: lighten(@border-color, 5%);
        border-radius: 10px;
        padding: 1.5rem;

        h4 {
          margin-top: 0;
          color: @primary-color;
          border-bottom: 1px solid @border-color;
          padding-bottom: 0.5rem;
        }

        ul {
          padding-left: 1.5rem;
          margin-bottom: 0;

          li {
            margin-bottom: 0.8rem;
          }
        }
      }
    }

    .evolution-timeline {
      margin-top: 2rem;

      h3 {
        color: @primary-color;
        margin-top: 0;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid @border-color;
      }

      .timeline {
        position: relative;
        padding-left: 30px;
        margin-top: 1.5rem;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: @timeline-color;
          border-radius: 2px;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 2rem;
          display: flex;
          align-items: flex-start;

          .timeline-icon {
            position: absolute;
            left: -40px;
            top: 0;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: @primary-color;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            z-index: 1;
          }

          .timeline-content {
            background: @card-bg;
            border-radius: 10px;
            padding: 1.2rem;
            box-shadow: @shadow-light;
            width: 100%;

            h4 {
              margin-top: 0;
              color: @text-primary;
            }

            p {
              margin-bottom: 0;
              color: @text-secondary;
            }
          }
        }
      }
    }
  }
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  .property-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: @shadow-light;
    border-top: 3px solid @accent-color;

    h3 {
      margin-top: 0;
      color: @primary-color;
      font-size: 1.4rem;
    }

    .property-type {
      display: inline-block;
      background: fade(@accent-color, 20%);
      color: @primary-color;
      padding: 0.2rem 0.7rem;
      border-radius: 20px;
      font-size: 0.85rem;
      margin-bottom: 0.8rem;
    }

    p {
      margin-bottom: 1rem;
    }

    .property-example {
      background: @code-bg;
      border-radius: 8px;
      padding: 1rem;
      font-size: 0.9rem;
    }
  }
}

.descriptor-rules {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: @shadow-light;
  border-left: 4px solid @info-color;

  h3 {
    color: @primary-color;
    margin-top: 0;
  }

  .rules-container {
    .rule-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid @border-color;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      .rule-badge {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: @primary-color;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
      }
    }
  }
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  .usage-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: @shadow-light;

    h3 {
      margin-top: 0;
      color: @primary-color;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid @border-color;
    }
  }
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  .scenario-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: @shadow-light;
    border-top: 3px solid @accent-color;

    .scenario-icon {
      font-size: 2rem;
      color: @primary-color;
      margin-bottom: 0.8rem;
    }

    h3 {
      margin: 0 0 0.5rem;
      color: @text-primary;
    }

    p {
      margin: 0 0 1rem;
      color: @text-secondary;
    }
  }
}

.framework-usage {
  margin-top: 2rem;

  h3 {
    color: @primary-color;
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  .framework-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    .framework-card {
      background: lighten(@border-color, 5%);
      border-radius: 10px;
      padding: 1.2rem;
      text-align: center;

      h4 {
        margin-top: 0;
        color: @text-primary;
      }
    }
  }
}

.best-practices {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: @shadow-light;
  margin-bottom: 2rem;

  .practice-card {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid @border-color;

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    .practice-icon {
      font-size: 1.8rem;
      min-width: 50px;
      height: 50px;
      border-radius: 50%;
      background: fade(@accent-color, 15%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: @primary-color;
      flex-shrink: 0;
    }

    .practice-content {
      h3 {
        margin: 0 0 0.5rem;
        color: @text-primary;
      }
    }
  }
}

.alternatives {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: @shadow-light;

  h3 {
    color: @primary-color;
    margin-top: 0;
  }

  .alt-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;

    .alt-card {
      background: lighten(@border-color, 5%);
      border-radius: 10px;
      padding: 1.2rem;

      h4 {
        margin-top: 0;
        color: @primary-color;
      }
    }
  }
}

pre {
  background: @code-bg;
  border-radius: 8px;
  padding: 1.2rem;
  overflow-x: auto;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 1rem 0;

  code {
    color: #1a3c1e;
  }
}

.summary-section {
  margin-top: 3rem;
  background: linear-gradient(to bottom, fade(@accent-color, 5%), transparent);
  border-radius: 16px;
  padding: 2.5rem;
  border: 1px solid @border-color;

  .summary-content {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: @shadow-light;

    h3 {
      text-align: center;
      margin-top: 0;
      font-size: 1.8rem;
      color: @primary-color;
    }

    .summary-points {
      margin: 1.5rem 0;

      .point {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        align-items: center;

        .point-icon {
          font-size: 1.5rem;
          min-width: 40px;
          height: 40px;
          border-radius: 50%;
          background: fade(@primary-color, 15%);
          color: @primary-color;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .point-text {
          flex: 1;
        }
      }
    }

    .final-tip {
      display: flex;
      gap: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid @border-color;
      margin-top: 1.5rem;

      .tip-icon {
        font-size: 1.5rem;
        color: @primary-color;
      }

      p {
        margin-bottom: 0;
        font-style: italic;
        font-size: 1.1rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .properties-grid,
  .usage-grid,
  .scenario-grid,
  .framework-grid,
  .alt-grid {
    grid-template-columns: 1fr;
  }

  .comparison {
    grid-template-columns: 1fr !important;
  }
}
</style>
