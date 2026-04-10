<template>
  <div class="prototype-pattern-container">
    <header class="header">
      <h1>原型模式 (Prototype Pattern)</h1>
      <p class="subtitle">一种创建型设计模式，通过克隆现有对象来创建新对象</p>
    </header>

    <div class="content-wrapper">
      <section class="concept-section">
        <h2>概念解析</h2>
        <div class="concept-card">
          <p>原型模式（Prototype Pattern）是一种创建型设计模式，它允许通过复制现有对象（称为原型）来创建新对象，而不是通过常规的类实例化方式。</p>

          <div class="definition-box">
            <h3>核心思想：</h3>
            <p>将对象创建过程委托给原型对象自身，通过克隆（clone）操作生成新对象</p>
          </div>

          <div class="principle-grid">
            <div class="principle-card">
              <div class="icon">1</div>
              <h3>原型接口</h3>
              <p>定义克隆方法的接口</p>
            </div>
            <div class="principle-card">
              <div class="icon">2</div>
              <h3>具体原型</h3>
              <p>实现克隆方法的类</p>
            </div>
            <div class="principle-card">
              <div class="icon">3</div>
              <h3>客户端</h3>
              <p>通过克隆原型创建新对象</p>
            </div>
          </div>
        </div>
      </section>

      <section class="example-section">
        <h2>代码示例</h2>
        <div class="code-example">
          <div class="code-block">
            <pre><code>// 原型接口
interface Prototype {
  clone(): Prototype;
  toString(): string;
}

// 具体原型类
class ConcretePrototype implements Prototype {
  private property: string;

  constructor(property: string) {
    this.property = property;
  }

  // 实现克隆方法
  public clone(): Prototype {
    return new ConcretePrototype(this.property);
  }

  // 自定义操作
  public setProperty(property: string): void {
    this.property = property;
  }

  public toString(): string {
    return `Property: ${this.property}`;
  }
}

// 客户端使用
const original: Prototype = new ConcretePrototype("Original Value");
console.log(original.toString()); // 输出: Property: Original Value

// 克隆对象
const clone: Prototype = original.clone();
console.log(clone.toString()); // 输出: Property: Original Value

// 修改克隆对象
if (clone instanceof ConcretePrototype) {
  clone.setProperty("Modified Value");
}
console.log(clone.toString()); // 输出: Property: Modified Value
console.log(original.toString()); // 输出: Property: Original Value (原对象不受影响)</code></pre>
          </div>
          <div class="visualization">
            <div class="prototype-diagram">
              <div class="prototype">
                <div class="prototype-header">原型对象</div>
                <div class="prototype-body">
                  <div>property: "Original Value"</div>
                  <div class="clone-btn" @click="cloneObject">clone()</div>
                </div>
              </div>

              <div class="arrow">→</div>

              <div class="clones-container">
                <div v-for="(clone, index) in clones" :key="index" class="clone" :class="{ modified: clone.modified }">
                  <div class="clone-header">克隆对象 {{ index + 1 }}</div>
                  <div class="clone-body">
                    <div>property: {{ clone.value }}</div>
                    <button class="modify-btn" @click="modifyClone(index)" v-if="!clone.modified">
                      修改属性
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="scenarios-section">
        <h2>使用场景</h2>
        <div class="scenarios-list">
          <div class="scenario-card">
            <div class="scenario-icon">🔄</div>
            <div>
              <h3>避免重复初始化</h3>
              <p>当对象创建成本较高（如涉及复杂计算、数据库操作或网络请求）时，通过克隆现有对象可以避免重复的初始化过程</p>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🧬</div>
            <div>
              <h3>动态运行时对象创建</h3>
              <p>在需要动态创建对象但类在编译时不可知的场景，原型模式提供灵活性</p>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📊</div>
            <div>
              <h3>复杂对象配置</h3>
              <p>当系统需要独立于创建和使用的对象类型时，原型模式特别有用，客户端无需关心具体类</p>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">⚙️</div>
            <div>
              <h3>状态保存与恢复</h3>
              <p>通过克隆操作可以方便地保存对象状态，并在需要时恢复</p>
            </div>
          </div>
        </div>
      </section>

      <section class="pros-cons-section">
        <h2>优点与缺点</h2>
        <div class="comparison">
          <div class="pros">
            <h3>✅ 优点</h3>
            <ul>
              <li>避免重复初始化操作，提高性能</li>
              <li>简化对象创建过程，客户端无需知道具体类</li>
              <li>可以动态添加和删除原型对象</li>
              <li>提供简化的对象层次结构</li>
            </ul>
          </div>
          <div class="cons">
            <h3>❌ 缺点</h3>
            <ul>
              <li>克隆复杂对象可能较困难（特别是循环引用）</li>
              <li>深拷贝和浅拷贝需要谨慎处理</li>
              <li>每个类都需要实现克隆方法</li>
              <li>可能违反"开闭原则"（如果原型类需要修改）</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>原型模式提供了一种高效的对象创建机制，特别适用于创建成本高昂的对象或需要动态创建对象的场景</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface CloneObject {
  value: string;
  modified: boolean;
}

const clones = ref<CloneObject[]>([]);

// 克隆原型对象
const cloneObject = () => {
  clones.value.push({
    value: 'Original Value',
    modified: false
  });
};

// 修改克隆对象
const modifyClone = (index: number) => {
  clones.value[index] = {
    value: 'Modified Value',
    modified: true
  };
};
</script>

<style lang="less" scoped>
.prototype-pattern-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(120deg, #6a11cb 0%, #2575fc 100%);
  border-radius: 15px;
  color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.8rem;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.4rem;
    opacity: 0.9;
  }
}

.content-wrapper {
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

section {
  margin-bottom: 50px;

  h2 {
    font-size: 2rem;
    color: #2c3e50;
    border-bottom: 3px solid #3498db;
    padding-bottom: 10px;
    margin-bottom: 25px;
  }
}

.concept-section {
  .concept-card {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 25px;
    border-left: 5px solid #3498db;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

    p {
      font-size: 1.1rem;
      line-height: 1.7;
    }
  }

  .definition-box {
    background: #e3f2fd;
    border-radius: 10px;
    padding: 20px;
    margin: 25px 0;
    border: 1px dashed #3498db;

    h3 {
      color: #2c3e50;
      margin-top: 0;
    }
  }

  .principle-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 30px;

    .principle-card {
      background: white;
      border-radius: 12px;
      padding: 25px 20px;
      text-align: center;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .icon {
        width: 50px;
        height: 50px;
        background: #3498db;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0 auto 15px;
      }

      h3 {
        color: #2c3e50;
        margin: 10px 0;
      }

      p {
        color: #7f8c8d;
        font-size: 1rem;
      }
    }
  }
}

.example-section {
  .code-example {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;

    .code-block {
      flex: 1;
      min-width: 500px;
      background: #2d2d2d;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);

      pre {
        margin: 0;
        padding: 25px;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.95rem;
          line-height: 1.6;
          color: #f8f8f2;
        }
      }
    }

    .visualization {
      flex: 1;
      min-width: 300px;

      .prototype-diagram {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
        margin-top: 20px;

        .prototype,
        .clone {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          width: 220px;
        }

        .prototype {
          border: 3px solid #3498db;

          &-header {
            background: #3498db;
            color: white;
            padding: 15px;
            text-align: center;
            font-weight: bold;
          }

          &-body {
            padding: 20px;
            text-align: center;

            .clone-btn {
              background: #3498db;
              color: white;
              padding: 10px 15px;
              border-radius: 6px;
              margin-top: 15px;
              cursor: pointer;
              display: inline-block;
              transition: background 0.3s;

              &:hover {
                background: #2980b9;
              }
            }
          }
        }

        .arrow {
          font-size: 2rem;
          color: #7f8c8d;
        }

        .clones-container {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
        }

        .clone {
          border: 2px solid #2ecc71;

          &.modified {
            border-color: #e74c3c;
          }

          &-header {
            background: #2ecc71;
            color: white;
            padding: 12px;
            text-align: center;
            font-weight: bold;
          }

          .modified &-header {
            background: #e74c3c;
          }

          &-body {
            padding: 15px;
            text-align: center;

            .modify-btn {
              background: #f39c12;
              color: white;
              border: none;
              padding: 8px 15px;
              border-radius: 5px;
              margin-top: 10px;
              cursor: pointer;
              transition: background 0.3s;

              &:hover {
                background: #e67e22;
              }
            }
          }
        }
      }
    }
  }
}

.scenarios-section {
  .scenarios-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;

    .scenario-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      display: flex;
      gap: 20px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      border-top: 4px solid #9b59b6;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .scenario-icon {
        font-size: 2rem;
      }

      h3 {
        margin-top: 0;
        color: #2c3e50;
      }

      p {
        color: #7f8c8d;
        line-height: 1.6;
      }
    }
  }
}

.pros-cons-section {
  .comparison {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;

    .pros,
    .cons {
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }

    .pros {
      background: rgba(46, 204, 113, 0.1);
      border-top: 4px solid #2ecc71;

      h3 {
        color: #27ae60;
      }
    }

    .cons {
      background: rgba(231, 76, 60, 0.1);
      border-top: 4px solid #e74c3c;

      h3 {
        color: #c0392b;
      }
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 12px;
        line-height: 1.6;
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 25px;
  background: #2c3e50;
  color: white;
  border-radius: 15px;
  font-size: 1.1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .code-example {
    flex-direction: column;

    .code-block {
      min-width: 100% !important;
    }
  }

  .prototype-diagram {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      margin: 15px 0;
    }
  }
}
</style>
