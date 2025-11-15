<template>
  <div class="flyweight-container">
    <div class="header">
      <h1>享元模式基础介绍</h1>
      <p class="subtitle">高效内存管理 - 通过共享减少对象数量</p>
    </div>

    <div class="pattern-card">
      <div class="card-header">
        <div class="pattern-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z" />
            <path
              d="M10 9h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1z" />
          </svg>
        </div>
        <div class="pattern-info">
          <h2>享元模式 (Flyweight Pattern)</h2>
          <div class="pattern-tags">
            <span class="tag">结构型模式</span>
            <span class="tag">内存优化</span>
            <span class="tag">对象共享</span>
          </div>
        </div>
      </div>

      <div class="card-content">
        <div class="section concept">
          <h3>概念定义</h3>
          <p>
            享元模式是一种结构型设计模式，它通过共享对象来最小化内存使用和提高性能。
            该模式的核心思想是将对象的状态分为<strong>内部状态</strong>(intrinsic)和<strong>外部状态</strong>(extrinsic)，
            内部状态可以共享，而外部状态由客户端在使用时传入。
          </p>
          <div class="concept-diagram">
            <div class="flyweight-factory">
              <div class="factory-header">享元工厂</div>
              <div class="flyweights">
                <div class="flyweight">享元A</div>
                <div class="flyweight">享元B</div>
                <div class="flyweight">享元C</div>
              </div>
            </div>

            <div class="clients">
              <div class="client">
                <div class="client-header">客户端1</div>
                <div class="extrinsic-state">外部状态X</div>
                <div class="connection">→ 使用 →</div>
              </div>
              <div class="client">
                <div class="client-header">客户端2</div>
                <div class="extrinsic-state">外部状态Y</div>
                <div class="connection">→ 使用 →</div>
              </div>
              <div class="client">
                <div class="client-header">客户端3</div>
                <div class="extrinsic-state">外部状态Z</div>
                <div class="connection">→ 使用 →</div>
              </div>
            </div>
          </div>
        </div>

        <div class="section implementation">
          <h3>实现方式</h3>
          <div class="code-example">
            <div class="code-tabs">
              <button :class="{ active: activeCode === 'structure' }" @click="activeCode = 'structure'">
                结构概览
              </button>
              <button :class="{ active: activeCode === 'example' }" @click="activeCode = 'example'">
                示例代码
              </button>
              <button :class="{ active: activeCode === 'game' }" @click="activeCode = 'game'">
                游戏场景
              </button>
            </div>

            <div class="code-block">
              <pre v-if="activeCode === 'structure'"><code>// 享元接口
interface Flyweight {
  operation(extrinsicState: any): void;
}

// 具体享元
class ConcreteFlyweight implements Flyweight {
  private intrinsicState: string;

  constructor(intrinsicState: string) {
    this.intrinsicState = intrinsicState;
  }

  operation(extrinsicState: any): void {
    console.log(`内部状态: ${this.intrinsicState}, 外部状态: ${extrinsicState}`);
  }
}

// 享元工厂
class FlyweightFactory {
  private flyweights: {[key: string]: Flyweight} = {};

  getFlyweight(key: string): Flyweight {
    if (!this.flyweights[key]) {
      this.flyweights[key] = new ConcreteFlyweight(key);
    }
    return this.flyweights[key];
  }

  getFlyweightCount(): number {
    return Object.keys(this.flyweights).length;
  }
}

// 客户端使用
const factory = new FlyweightFactory();
const flyweight1 = factory.getFlyweight("shared-state");
flyweight1.operation("client-state-1");

const flyweight2 = factory.getFlyweight("shared-state");
flyweight2.operation("client-state-2");

console.log(`享元对象数量: ${factory.getFlyweightCount()}`); // 输出: 1</code></pre>

              <pre v-if="activeCode === 'example'"><code>// 文字编辑器中的字符对象
interface Character {
  display(fontSize: number, color: string): void;
}

// 具体字符享元
class CharacterFlyweight implements Character {
  private char: string;

  constructor(char: string) {
    this.char = char;
  }

  display(fontSize: number, color: string): void {
    console.log(`字符: ${this.char}, 大小: ${fontSize}px, 颜色: ${color}`);
  }
}

// 字符工厂
class CharacterFactory {
  private characters: {[key: string]: Character} = {};

  getCharacter(char: string): Character {
    if (!this.characters[char]) {
      this.characters[char] = new CharacterFlyweight(char);
    }
    return this.characters[char];
  }
}

// 客户端使用
const factory = new CharacterFactory();
const text = "享元模式示例";

for (let i = 0; i < text.length; i++) {
  const char = text[i];
  const character = factory.getCharacter(char);

  // 外部状态：位置、字体大小、颜色等
  character.display(12 + i, i % 2 === 0 ? "black" : "blue");
}

console.log(`创建的字符对象数量: ${Object.keys(factory).length}`);
// 实际对象数量远小于文本长度</code></pre>

              <pre v-if="activeCode === 'game'"><code>// 游戏中的树木对象
interface Tree {
  render(x: number, y: number): void;
}

// 具体树木享元
class TreeType implements Tree {
  constructor(
    private name: string,
    private color: string,
    private texture: string
  ) {}

  render(x: number, y: number): void {
    console.log(`渲染 ${this.name} 树在位置 (${x}, ${y})`);
    console.log(`  颜色: ${this.color}, 纹理: ${this.texture}`);
  }
}

// 树木工厂
class TreeFactory {
  private treeTypes: {[key: string]: TreeType} = {};

  getTreeType(name: string, color: string, texture: string): TreeType {
    const key = `${name}_${color}_${texture}`;
    if (!this.treeTypes[key]) {
      this.treeTypes[key] = new TreeType(name, color, texture);
    }
    return this.treeTypes[key];
  }
}

// 树木对象（包含外部状态）
class TreeObject {
  constructor(
    private x: number,
    private y: number,
    private treeType: TreeType
  ) {}

  render(): void {
    this.treeType.render(this.x, this.y);
  }
}

// 森林（管理所有树木）
class Forest {
  private trees: TreeObject[] = [];
  private treeFactory = new TreeFactory();

  plantTree(x: number, y: number, name: string, color: string, texture: string) {
    const type = this.treeFactory.getTreeType(name, color, texture);
    const tree = new TreeObject(x, y, type);
    this.trees.push(tree);
  }

  render(): void {
    this.trees.forEach(tree => tree.render());
  }
}

// 使用示例
const forest = new Forest();
forest.plantTree(10, 20, "松树", "绿色", "松树纹理");
forest.plantTree(30, 40, "橡树", "深绿色", "橡树纹理");
forest.plantTree(50, 60, "松树", "绿色", "松树纹理"); // 重用松树类型
forest.plantTree(70, 80, "桦树", "白色", "桦树纹理");

forest.render();</code></pre>
            </div>
          </div>
        </div>

        <div class="section use-cases">
          <h3>使用场景</h3>
          <div class="case-grid">
            <div class="case-card">
              <div class="case-icon" style="background-color: #FF6B6B;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1h2v1h10V1h2v3h-2v2h3v2H5V6z" />
                </svg>
              </div>
              <h4>图形编辑器</h4>
              <p>共享相同特征的图形对象（如字符、图标等）</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #4ECDC4;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1h2v1h10V1h2v3h-2v2h3v2H5V6z" />
                </svg>
              </div>
              <h4>游戏开发</h4>
              <p>管理大量相似对象（树木、子弹、粒子等）</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #118AB2;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9v-2h2v2zm0-4H9V7h2v4zm4 4h-2v-2h2v2zm0-4h-2V7h2v4z" />
                </svg>
              </div>
              <h4>文本处理</h4>
              <p>共享相同字符、字体样式的文本对象</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #FFD166;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
              <h4>UI组件库</h4>
              <p>共享相同样式和配置的UI组件实例</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #9B5DE5;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15c0-1.66 1.34-3 3-3 .35 0 .69.07 1 .18V10c0-.55.45-1 1-1s1 .45 1 1v1h2V10c0-1.79-1.46-3.27-3.25-3L11 8.25v1.51c1.25.54 2 1.76 2 3.24 0 1.66-1.34 3-3 3s-3-1.34-3-3H8z" />
                </svg>
              </div>
              <h4>数据库连接</h4>
              <p>共享相同配置的数据库连接对象</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #06D6A0;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
              </div>
              <h4>缓存系统</h4>
              <p>共享相同数据源的缓存对象</p>
            </div>
          </div>
        </div>

        <div class="section pros-cons">
          <h3>优缺点分析</h3>
          <div class="comparison">
            <div class="pros">
              <h4>优点</h4>
              <ul>
                <li><strong>减少内存占用</strong>：共享对象大幅减少内存使用</li>
                <li><strong>提高性能</strong>：对象创建和垃圾回收开销降低</li>
                <li><strong>简化系统</strong>：通过共享减少对象数量，简化系统</li>
                <li><strong>支持大量对象</strong>：可以高效管理大量细粒度对象</li>
                <li><strong>分离状态</strong>：明确区分内部状态和外部状态</li>
              </ul>
            </div>

            <div class="cons">
              <h4>缺点</h4>
              <ul>
                <li><strong>增加复杂性</strong>：需要区分内部状态和外部状态</li>
                <li><strong>线程安全问题</strong>：共享对象在多线程环境下需要额外处理</li>
                <li><strong>不适用所有场景</strong>：仅当对象具有可共享状态时才有效</li>
                <li><strong>可能引入性能开销</strong>：外部状态计算可能增加CPU负担</li>
                <li><strong>设计难度</strong>：正确识别可共享状态需要经验</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="section comparison">
          <h3>适用性分析</h3>
          <div class="applicability">
            <div class="applicability-item">
              <div class="icon" style="background-color: #4CAF50;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <div class="content">
                <h4>适用场景</h4>
                <ul>
                  <li>应用程序使用大量相似对象</li>
                  <li>对象的大部分状态可以外部化</li>
                  <li>内存占用是需要优化的关键点</li>
                  <li>对象标识不重要，可以共享</li>
                  <li>需要缓存和重用对象</li>
                </ul>
              </div>
            </div>

            <div class="applicability-item">
              <div class="icon" style="background-color: #F44336;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </div>
              <div class="content">
                <h4>不适用场景</h4>
                <ul>
                  <li>对象状态高度个性化</li>
                  <li>外部状态计算复杂且耗时</li>
                  <li>多线程环境且共享对象有状态变更</li>
                  <li>对象数量不多，优化收益不明显</li>
                  <li>需要保持对象独立标识</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="section best-practices">
          <h3>最佳实践</h3>
          <div class="practices-grid">
            <div class="practice-card">
              <div class="practice-number">1</div>
              <h4>识别共享状态</h4>
              <p>仔细分析对象状态，分离内部和外部状态</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">2</div>
              <h4>使用工厂管理</h4>
              <p>通过工厂类统一管理享元对象的创建和访问</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">3</div>
              <h4>确保不可变性</h4>
              <p>共享的内部状态应为不可变对象</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">4</div>
              <h4>考虑线程安全</h4>
              <p>在多线程环境中使用同步机制</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">5</div>
              <h4>性能权衡</h4>
              <p>评估内存节省与CPU开销的平衡</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">6</div>
              <h4>结合其他模式</h4>
              <p>与工厂模式、组合模式等结合使用</p>
            </div>
          </div>
        </div>

        <div class="section visualization">
          <h3>内存优化效果可视化</h3>
          <div class="memory-comparison">
            <div class="memory-usage">
              <div class="memory-title">传统方式</div>
              <div class="memory-chart">
                <div v-for="i in 20" :key="'traditional-' + i" class="memory-block" :style="{ backgroundColor: '#FF6B6B' }">
                </div>
              </div>
              <div class="memory-label">20个独立对象</div>
            </div>

            <div class="memory-usage">
              <div class="memory-title">享元模式</div>
              <div class="memory-chart">
                <div v-for="i in 5" :key="'flyweight-' + i" class="memory-block" :style="{ backgroundColor: '#4ECDC4' }">
                </div>
                <div v-for="i in 15" :key="'shared-' + i" class="memory-block" :style="{ backgroundColor: '#9B5DE5' }">
                </div>
              </div>
              <div class="memory-label">5个共享对象 + 15个外部状态</div>
            </div>
          </div>
          <div class="memory-stats">
            <div class="stat">
              <div class="stat-value">60-80%</div>
              <div class="stat-label">内存使用减少</div>
            </div>
            <div class="stat">
              <div class="stat-value">40-60%</div>
              <div class="stat-label">对象创建时间减少</div>
            </div>
            <div class="stat">
              <div class="stat-value">50-70%</div>
              <div class="stat-label">垃圾回收压力降低</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>设计模式 | 结构型模式 | 享元模式 </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeCode = ref<'structure' | 'example' | 'game'>('example');
</script>

<style scoped lang="less">


.flyweight-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    .subtitle {
      font-size: 1.2rem;
      color: #4b5563;
      margin-top: 0;
      font-weight: 500;
    }
  }

  .pattern-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;

    .card-header {
      background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
      color: white;
      padding: 1.5rem 2rem;
      display: flex;
      align-items: center;

      .pattern-icon {
        width: 70px;
        height: 70px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1.5rem;

        svg {
          width: 40px;
          height: 40px;
        }
      }

      .pattern-info {
        flex-grow: 1;

        h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.8rem;
        }
      }

      .pattern-tags {
        display: flex;
        gap: 0.8rem;

        .tag {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }
      }
    }

    .card-content {
      padding: 2rem;

      .section {
        margin-bottom: 2.5rem;

        h3 {
          color: #0083b0;
          border-bottom: 2px solid #00b4db;
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          display: flex;
          align-items: center;

          &::before {
            content: "";
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #00b4db;
            border-radius: 50%;
            margin-right: 10px;
          }
        }

        p,
        li {
          line-height: 1.7;
          color: #4b5563;
          font-size: 1.05rem;
        }

        li {
          margin-bottom: 0.8rem;
          position: relative;
          padding-left: 1.5rem;

          &::before {
            content: "•";
            color: #00b4db;
            position: absolute;
            left: 0;
            font-weight: bold;
          }
        }
      }

      .concept-diagram {
        display: flex;
        justify-content: space-between;
        margin: 2rem 0;
        padding: 1.5rem;
        background: #f3f4f6;
        border-radius: 8px;
        font-weight: 500;
        position: relative;

        .flyweight-factory {
          width: 45%;
          border: 2px solid #00b4db;
          border-radius: 8px;
          padding: 1rem;

          .factory-header {
            text-align: center;
            font-weight: bold;
            margin-bottom: 1rem;
            color: #0083b0;
          }

          .flyweights {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;

            .flyweight {
              padding: 0.8rem;
              background: #e6f7ff;
              border-radius: 6px;
              text-align: center;
              border: 1px solid #00b4db;
            }
          }
        }

        .clients {
          width: 45%;
          display: flex;
          flex-direction: column;
          gap: 1rem;

          .client {
            border: 2px solid #ff6b6b;
            border-radius: 8px;
            padding: 1rem;

            .client-header {
              font-weight: bold;
              margin-bottom: 0.5rem;
              color: #ff6b6b;
            }

            .extrinsic-state {
              background: #ffebee;
              padding: 0.5rem;
              border-radius: 4px;
              text-align: center;
            }

            .connection {
              color: #0083b0;
              text-align: center;
              font-weight: bold;
              margin-top: 0.5rem;
            }
          }
        }
      }

      .code-example {
        .code-tabs {
          display: flex;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #e5e7eb;

          button {
            padding: 0.8rem 1.5rem;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
            color: #6b7280;
            position: relative;
            transition: all 0.3s;

            &:hover {
              color: #0083b0;
            }

            &.active {
              color: #0083b0;
              font-weight: 600;

              &::after {
                content: "";
                position: absolute;
                bottom: -1px;
                left: 0;
                right: 0;
                height: 3px;
                background: #0083b0;
                border-radius: 3px 3px 0 0;
              }
            }
          }
        }

        .code-block {
          background: #1e293b;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

          pre {
            margin: 0;
            padding: 1.5rem;
            overflow-x: auto;

            code {
              font-family: 'Source Code Pro', monospace;
              font-size: 0.95rem;
              color: #e2e8f0;
              line-height: 1.6;
            }
          }
        }
      }

      .case-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;

        .case-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
          border: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
            border-color: #00b4db;
          }

          .case-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;

            svg {
              width: 24px;
              height: 24px;
            }
          }

          h4 {
            margin: 0 0 0.8rem 0;
            font-size: 1.2rem;
            color: #1e293b;
          }

          p {
            margin: 0;
            font-size: 0.95rem;
            color: #4b5563;
            line-height: 1.6;
          }
        }
      }

      .pros-cons {
        .comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }

          .pros,
          .cons {
            padding: 1.5rem;
            border-radius: 8px;

            h4 {
              margin-top: 0;
              padding-bottom: 0.5rem;
              border-bottom: 2px solid;
            }
          }

          .pros {
            background: rgba(0, 180, 219, 0.05);
            border: 1px solid rgba(0, 180, 219, 0.2);

            h4 {
              color: #0083b0;
              border-color: #0083b0;
            }
          }

          .cons {
            background: rgba(255, 107, 107, 0.05);
            border: 1px solid rgba(255, 107, 107, 0.2);

            h4 {
              color: #ff6b6b;
              border-color: #ff6b6b;
            }
          }
        }
      }

      .comparison {
        .applicability {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }

          .applicability-item {
            display: flex;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

            .icon {
              width: 60px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;

              svg {
                width: 30px;
                height: 30px;
              }
            }

            .content {
              padding: 1.2rem;
              flex-grow: 1;

              h4 {
                margin: 0 0 0.8rem 0;
                font-size: 1.2rem;
              }

              ul {
                padding-left: 1.5rem;
                margin: 0;

                li {
                  margin-bottom: 0.5rem;
                }
              }
            }
          }
        }
      }

      .practices-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;

        .practice-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          position: relative;
          overflow: hidden;

          .practice-number {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            width: 30px;
            height: 30px;
            background: #b3e5fc;
            color: #0083b0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.1rem;
          }

          h4 {
            margin: 0.5rem 0 0.8rem 0;
            color: #0083b0;
            font-size: 1.15rem;
          }

          p {
            margin: 0;
            font-size: 0.95rem;
            color: #4b5563;
            line-height: 1.6;
          }
        }
      }

      .visualization {
        .memory-comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }

          .memory-usage {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

            .memory-title {
              text-align: center;
              font-weight: bold;
              margin-bottom: 1rem;
              color: #0083b0;
            }

            .memory-chart {
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              gap: 0.5rem;
              margin-bottom: 1rem;

              .memory-block {
                height: 40px;
                border-radius: 4px;
              }
            }

            .memory-label {
              text-align: center;
              font-size: 0.9rem;
              color: #4b5563;
            }
          }
        }

        .memory-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;

          .stat {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

            .stat-value {
              font-size: 2rem;
              font-weight: bold;
              color: #0083b0;
              margin-bottom: 0.5rem;
            }

            .stat-label {
              font-size: 1rem;
              color: #4b5563;
            }
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    color: #6b7280;
    font-size: 0.9rem;
    padding: 1.5rem;
  }
}
</style>
