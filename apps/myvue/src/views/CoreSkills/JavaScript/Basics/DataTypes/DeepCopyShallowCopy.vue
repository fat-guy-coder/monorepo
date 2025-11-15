<template>
  <div class="copy-container">
    <header class="header">
      <h1>JavaScript <span class="highlight">浅拷贝与深拷贝</span> 基础介绍</h1>
      <p class="subtitle">理解数据复制机制，避免JavaScript中的常见陷阱</p>
    </header>

    <div class="content">
      <div class="intro">
        <div class="intro-card">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>为什么需要拷贝？</h3>
          <p>JavaScript中对象和数组是引用类型，直接赋值只是复制引用而非实际值，修改新变量会影响原始数据。</p>
        </div>
        <div class="intro-card">
          <i class="fas fa-clone"></i>
          <h3>拷贝的核心概念</h3>
          <p>拷贝就是创建数据的副本，使新数据与原始数据分离，互不影响。根据复制深度的不同分为浅拷贝和深拷贝。</p>
        </div>
      </div>

      <section class="comparison">
        <h2 class="section-title">
          <i class="fas fa-balance-scale"></i> 浅拷贝 vs 深拷贝
        </h2>

        <div class="comparison-table">
          <div class="table-header">
            <div></div>
            <div>浅拷贝 (Shallow Copy)</div>
            <div>深拷贝 (Deep Copy)</div>
          </div>

          <div class="table-row">
            <div class="row-title">复制深度</div>
            <div>只复制第一层属性</div>
            <div>递归复制所有层级</div>
          </div>

          <div class="table-row">
            <div class="row-title">嵌套对象</div>
            <div class="warning">共享引用</div>
            <div class="success">创建新对象</div>
          </div>

          <div class="table-row">
            <div class="row-title">修改影响</div>
            <div class="warning">修改嵌套属性会影响原始数据</div>
            <div class="success">完全独立，互不影响</div>
          </div>

          <div class="table-row">
            <div class="row-title">性能</div>
            <div class="success">较快，内存占用少</div>
            <div class="warning">较慢，内存占用多</div>
          </div>

          <div class="table-row">
            <div class="row-title">使用场景</div>
            <div>简单对象、不需要嵌套修改时</div>
            <div>复杂对象、需要完全隔离时</div>
          </div>
        </div>
      </section>

      <div class="columns">
        <section class="shallow-copy">
          <h2 class="section-title">
            <i class="fas fa-layer-group"></i> 浅拷贝实现方法
          </h2>

          <div class="method-card" v-for="(method, index) in shallowMethods" :key="index">
            <div class="method-header">
              <h3>{{ method.title }}</h3>
              <div class="method-type">浅拷贝</div>
            </div>
            <div class="method-content">
              <p>{{ method.description }}</p>
              <pre><code>{{ method.code }}</code></pre>
              <div class="limitations" v-if="method.limitations">
                <strong>局限性：</strong> {{ method.limitations }}
              </div>
            </div>
          </div>
        </section>

        <section class="deep-copy">
          <h2 class="section-title">
            <i class="fas fa-sitemap"></i> 深拷贝实现方法
          </h2>

          <div class="method-card" v-for="(method, index) in deepMethods" :key="index">
            <div class="method-header">
              <h3>{{ method.title }}</h3>
              <div class="method-type deep">深拷贝</div>
            </div>
            <div class="method-content">
              <p>{{ method.description }}</p>
              <pre><code>{{ method.code }}</code></pre>
              <div class="limitations" v-if="method.limitations">
                <strong>局限性：</strong> {{ method.limitations }}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="visual-demo">
        <h2 class="section-title">
          <i class="fas fa-eye"></i> 拷贝效果可视化演示
        </h2>

        <div class="demo-container">
          <div class="original">
            <h3>原始对象</h3>
            <div class="object-display">
              <pre>{{ originalObject }}</pre>
            </div>
          </div>

          <div class="copy-result">
            <div class="shallow-result">
              <h3>浅拷贝结果</h3>
              <div class="object-display">
                <pre>{{ shallowCopyObject }}</pre>
              </div>
              <div class="modification">
                <button @click="modifyShallowCopy">修改浅拷贝对象</button>
                <p>原始对象是否改变: <span :class="shallowModified ? 'changed' : 'unchanged'">{{ shallowModified ? '是' : '否'
                }}</span></p>
              </div>
            </div>

            <div class="deep-result">
              <h3>深拷贝结果</h3>
              <div class="object-display">
                <pre>{{ deepCopyObject }}</pre>
              </div>
              <div class="modification">
                <button @click="modifyDeepCopy">修改深拷贝对象</button>
                <p>原始对象是否改变: <span :class="deepModified ? 'changed' : 'unchanged'">{{ deepModified ? '是' : '否' }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2 class="section-title">
          <i class="fas fa-check-circle"></i> 最佳实践与注意事项
        </h2>

        <div class="practices-grid">
          <div class="practice-card">
            <i class="fas fa-sync-alt"></i>
            <h3>循环引用处理</h3>
            <p>深拷贝时遇到循环引用会导致栈溢出，使用WeakMap存储已拷贝对象可解决此问题。</p>
          </div>

          <div class="practice-card">
            <i class="fas fa-cogs"></i>
            <h3>特殊对象处理</h3>
            <p>Date、RegExp、Set、Map等特殊对象需要特殊处理，JSON方法无法正确复制。</p>
          </div>

          <div class="practice-card">
            <i class="fas fa-microchip"></i>
            <h3>性能考量</h3>
            <p>对于大型对象，深拷贝可能消耗较多资源，考虑使用不可变数据或浅拷贝加冻结。</p>
          </div>

          <div class="practice-card">
            <i class="fas fa-code"></i>
            <h3>函数复制</h3>
            <p>函数通常不需要复制，大多数深拷贝方法会忽略函数或仅复制函数引用。</p>
          </div>
        </div>

        <div class="practice-summary">
          <h3><i class="fas fa-lightbulb"></i> 选择建议</h3>
          <ul>
            <li>简单数据结构 → 浅拷贝（扩展运算符/Object.assign）</li>
            <li>复杂对象且无特殊类型 → JSON方法</li>
            <li>包含特殊对象或有循环引用 → Lodash的_.cloneDeep或自定义深拷贝函数</li>
            <li>需要最高性能 → 考虑不可变数据结构</li>
          </ul>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p> JavaScript拷贝机制基础介绍 | 在Vue中实现可视化演示</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';

// 原始对象
const originalObject = reactive({
  name: "原始对象",
  value: 100,
  nested: {
    id: 1,
    content: "嵌套数据"
  },
  array: [1, 2, 3],
  date: new Date(),
  sayHello() {
    console.log("Hello!");
  }
});

// 浅拷贝对象
const shallowCopyObject = ref({ ...originalObject });
// 深拷贝对象
const deepCopyObject = ref(JSON.parse(JSON.stringify(originalObject)) as any);

// 修改状态
const shallowModified = ref(false);
const deepModified = ref(false);

// 浅拷贝方法列表
const shallowMethods = [
  {
    title: "扩展运算符 (...)",
    description: "使用ES6的扩展运算符复制对象或数组",
    code: `// 对象浅拷贝
const original = { a: 1, b: { c: 2 } };
const copy = { ...original };

// 数组浅拷贝
const arr = [1, 2, { d: 3 }];
const arrCopy = [...arr];`,
    limitations: "只能复制对象自身的可枚举属性"
  },
  {
    title: "Object.assign()",
    description: "将源对象的所有可枚举属性复制到目标对象",
    code: `const original = { a: 1, b: { c: 2 } };
const copy = Object.assign({}, original);`,
    limitations: "只能复制对象自身的可枚举属性，无法复制原型链上的属性"
  },
  {
    title: "Array.prototype.slice()",
    description: "用于数组的浅拷贝",
    code: `const arr = [1, 2, { d: 3 }];
const arrCopy = arr.slice();`,
    limitations: "仅适用于数组"
  },
  {
    title: "Array.from()",
    description: "从类似数组或可迭代对象创建新数组",
    code: `const arr = [1, 2, { d: 3 }];
const arrCopy = Array.from(arr);`,
    limitations: "仅适用于数组或类数组对象"
  }
];

// 深拷贝方法列表
const deepMethods = [
  {
    title: "JSON方法",
    description: "使用JSON.stringify和JSON.parse实现深拷贝",
    code: `const original = {
  a: 1,
  b: { c: 2 },
  arr: [3, 4, 5]
};
const copy = JSON.parse(JSON.stringify(original));`,
    limitations: "无法复制函数、undefined、Symbol、循环引用对象等特殊类型"
  },
  {
    title: "Lodash的_.cloneDeep",
    description: "使用Lodash库提供的深拷贝方法",
    code: `import _ from 'lodash';

const original = {
  a: 1,
  b: { c: 2 },
  date: new Date(),
  func: () => console.log('test')
};
const copy = _.cloneDeep(original);`,
    limitations: "需要引入外部库，但能处理大多数特殊情况"
  },
  {
    title: "递归深拷贝",
    description: "自定义递归函数实现深拷贝",
    code: `function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object')
    return obj;

  // 处理循环引用
  if (hash.has(obj))
    return hash.get(obj);

  // 处理特殊对象
  if (obj instanceof Date)
    return new Date(obj);
  if (obj instanceof RegExp)
    return new RegExp(obj);

  // 处理数组和对象
  const clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash);
    }
  }

  return clone;
}`,
    limitations: "需要手动处理各种边界情况"
  },
  {
    title: "structuredClone()",
    description: "HTML规范新增的深拷贝API",
    code: `const original = {
  a: 1,
  b: { c: 2 },
  date: new Date()
};
const copy = structuredClone(original);`,
    limitations: "较新的API，浏览器兼容性有限，不支持函数克隆"
  }
];

// 修改浅拷贝对象
const modifyShallowCopy = () => {
  shallowCopyObject.value.nested.content = "浅拷贝修改了嵌套数据";
  shallowModified.value = originalObject.nested.content === "浅拷贝修改了嵌套数据";
};

// 修改深拷贝对象
const modifyDeepCopy = () => {
  deepCopyObject.value.nested.content = "深拷贝修改了嵌套数据";
  deepModified.value = originalObject.nested.content === "深拷贝修改了嵌套数据";
};
</script>

<style lang="less" scoped>



.copy-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: #333;
  background-color: #f8fafc;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-weight: 700;

      .highlight {
        color: #3498db;
        background: linear-gradient(120deg, #a1c4fd, #c2e9fb);
        padding: 0.2rem 0.8rem;
        border-radius: 8px;
      }
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
    }
  }

  .intro {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;

    .intro-card {
      background: white;
      border-radius: 12px;
      padding: 1.8rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;

      i {
        font-size: 2.5rem;
        color: #3498db;
        margin-bottom: 1.2rem;
      }

      h3 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        color: #2c3e50;
      }

      p {
        color: #4a5568;
        line-height: 1.7;
      }
    }
  }

  .section-title {
    font-size: 1.6rem;
    margin: 2.5rem 0 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #eef2f7;
    color: #2c3e50;
    display: flex;
    align-items: center;

    i {
      margin-right: 0.8rem;
      color: #3498db;
    }
  }

  .comparison {
    margin-bottom: 3rem;

    .comparison-table {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

      .table-header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        background: linear-gradient(135deg, #3498db, #2c3e50);
        color: white;
        font-weight: 600;

        >div {
          padding: 1.2rem 1.5rem;
          text-align: center;

          &:first-child {
            text-align: left;
          }
        }
      }

      .table-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        border-bottom: 1px solid #eee;

        &:last-child {
          border-bottom: none;
        }

        >div {
          padding: 1rem 1.5rem;

          &:first-child {
            font-weight: 600;
            background: #f8fafc;
          }
        }

        .row-title {
          color: #2c3e50;
        }

        .warning {
          color: #e74c3c;
          font-weight: 500;
        }

        .success {
          color: #27ae60;
          font-weight: 500;
        }
      }
    }
  }

  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .method-card {
    background: white;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    overflow: hidden;

    .method-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.2rem 1.5rem;
      background: #f8fafc;
      border-bottom: 1px solid #eef2f7;

      h3 {
        font-size: 1.3rem;
        margin: 0;
        color: #2c3e50;
      }

      .method-type {
        background: #3498db;
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;

        &.deep {
          background: #27ae60;
        }
      }
    }

    .method-content {
      padding: 1.5rem;

      p {
        color: #4a5568;
        line-height: 1.7;
        margin-bottom: 1.2rem;
      }

      pre {
        background: #2c3e50;
        border-radius: 8px;
        padding: 1.2rem;
        overflow-x: auto;
        margin-bottom: 1rem;

        code {
          font-family: 'Fira Code', monospace;
          color: #e0e0e0;
          font-size: 0.9rem;
          line-height: 1.5;

          .hljs-keyword {
            color: #ff9a76;
          }

          .hljs-built_in {
            color: #82aaff;
          }

          .hljs-string {
            color: #c3e88d;
          }

          .hljs-function {
            color: #82aaff;
          }
        }
      }

      .limitations {
        background: #fff8e1;
        padding: 0.8rem;
        border-radius: 8px;
        border-left: 4px solid #ffc107;
        color: #4a5568;
        font-size: 0.9rem;
      }
    }
  }

  .visual-demo {
    margin-bottom: 3rem;

    .demo-container {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

      .original {
        margin-bottom: 2rem;

        h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #2c3e50;
        }
      }

      .copy-result {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }

        .shallow-result,
        .deep-result {
          border-radius: 8px;
          padding: 1.2rem;

          h3 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            color: #2c3e50;
          }
        }

        .shallow-result {
          background: rgba(52, 152, 219, 0.05);
          border: 1px solid rgba(52, 152, 219, 0.2);
        }

        .deep-result {
          background: rgba(39, 174, 96, 0.05);
          border: 1px solid rgba(39, 174, 96, 0.2);
        }

        .object-display {
          background: #f8fafc;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.2rem;
          min-height: 120px;

          pre {
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            white-space: pre-wrap;
            margin: 0;
          }
        }

        .modification {
          button {
            background: #3498db;
            color: white;
            border: none;
            padding: 0.6rem 1.2rem;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: background 0.3s;

            &:hover {
              background: #2980b9;
            }
          }

          p {
            margin-top: 0.8rem;
            font-weight: 500;

            .changed {
              color: #e74c3c;
            }

            .unchanged {
              color: #27ae60;
            }
          }
        }
      }
    }
  }

  .best-practices {
    .practices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;

      .practice-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        text-align: center;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

        i {
          font-size: 2rem;
          color: #3498db;
          margin-bottom: 1rem;
        }

        h3 {
          font-size: 1.2rem;
          margin-bottom: 0.8rem;
          color: #2c3e50;
        }

        p {
          color: #4a5568;
          font-size: 0.95rem;
          line-height: 1.6;
        }
      }
    }

    .practice-summary {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

      h3 {
        font-size: 1.3rem;
        margin-bottom: 1rem;
        color: #2c3e50;
        display: flex;
        align-items: center;

        i {
          margin-right: 0.7rem;
          color: #3498db;
        }
      }

      ul {
        padding-left: 1.5rem;

        li {
          margin-bottom: 0.8rem;
          padding-left: 0.5rem;
          color: #4a5568;
          line-height: 1.6;

          &::marker {
            color: #3498db;
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    color: #7f8c8d;
    font-size: 0.9rem;
    border-top: 1px solid #eaeaea;
  }
}

@media (max-width: 768px) {
  .copy-container {
    padding: 1rem;

    .header h1 {
      font-size: 2rem;
    }
  }
}
</style>
