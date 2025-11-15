<template>
  <div class="adapter-pattern-page">
    <header class="header">
      <div class="header-content">
        <h1>适配器设计模式</h1>
        <p class="subtitle">在不改变现有代码的情况下实现接口兼容性</p>
        <div class="pattern-visualization">
          <div class="client">客户端</div>
          <div class="adapter-container">
            <div class="target-interface">目标接口</div>
            <div class="adapter">适配器</div>
          </div>
          <div class="adaptee">被适配者</div>
          <div class="connectors">
            <div class="connector expected">预期接口</div>
            <div class="connector actual">实际接口</div>
            <div class="connector adapted">适配接口</div>
          </div>
        </div>
      </div>
    </header>

    <div class="content-container">
      <!-- 概念解释 -->
      <section class="card concept-section">
        <div class="section-header">
          <div class="icon">📚</div>
          <h2>适配器模式概念</h2>
        </div>

        <div class="definition">
          <p><strong>适配器模式</strong>是一种结构型设计模式，它允许接口不兼容的对象能够相互合作。</p>
          <p>适配器模式就像是一个转接头：当你想把欧洲插头插入美式插座时，你需要一个转接适配器。</p>
        </div>

        <div class="analogy">
          <h3>现实世界类比</h3>
          <div class="analogy-content">
            <div class="analogy-card">
              <div class="analogy-icon">🔌</div>
              <h4>电源适配器</h4>
              <p>让不同形状的插头适配到特定类型的插座</p>
            </div>
            <div class="analogy-card">
              <div class="analogy-icon">📞</div>
              <h4>翻译人员</h4>
              <p>在不同语言的人之间架起沟通桥梁</p>
            </div>
            <div class="analogy-card">
              <div class="analogy-icon">💼</div>
              <h4>USB转换器</h4>
              <p>让旧设备能够使用新标准的接口</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心组件 -->
      <section class="card components-section">
        <div class="section-header">
          <div class="icon">🧩</div>
          <h2>模式核心组件</h2>
        </div>

        <div class="components-diagram">
          <div class="component client">
            <h3>Client（客户端）</h3>
            <p>使用目标接口的类或组件</p>
          </div>

          <div class="connector">→ 调用 →</div>

          <div class="component target">
            <h3>Target（目标接口）</h3>
            <p>客户端期望使用的接口</p>
          </div>

          <div class="connector">← 适配 ←</div>

          <div class="component adapter">
            <h3>Adapter（适配器）</h3>
            <p>将Adaptee接口转换为Target接口</p>
          </div>

          <div class="connector">→ 委托 →</div>

          <div class="component adaptee">
            <h3>Adaptee（被适配者）</h3>
            <p>需要适配的现有组件或类</p>
          </div>
        </div>

        <div class="components-list">
          <div class="component-card" v-for="(comp, index) in components" :key="index">
            <div class="comp-icon">{{ comp.icon }}</div>
            <div>
              <h3>{{ comp.name }}</h3>
              <p>{{ comp.description }}</p>
              <ul>
                <li v-for="(role, i) in comp.roles" :key="i">{{ role }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="card use-cases-section">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>适配器模式使用场景</h2>
        </div>

        <div class="use-cases">
          <div class="use-case-card" v-for="(useCase, index) in useCases" :key="index">
            <div class="case-icon">{{ useCase.icon }}</div>
            <div class="case-content">
              <h3>{{ useCase.title }}</h3>
              <p>{{ useCase.description }}</p>
              <div class="example">
                <strong>示例:</strong> {{ useCase.example }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 实现方式 -->
      <section class="card implementation-section">
        <div class="section-header">
          <div class="icon">🔧</div>
          <h2>适配器实现方式</h2>
        </div>

        <div class="implementation-types">
          <div class="type-card">
            <h3>类适配器</h3>
            <p>通过多重继承实现适配器</p>
            <div class="pros-cons">
              <div class="pros">
                <h4>✅ 优点</h4>
                <ul>
                  <li>适配器可以重写被适配者的行为</li>
                  <li>不需要创建新的对象</li>
                </ul>
              </div>
              <div class="cons">
                <h4>❌ 缺点</h4>
                <ul>
                  <li>需要支持多重继承的语言</li>
                  <li>耦合度较高</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="type-card">
            <h3>对象适配器</h3>
            <p>通过组合实现适配器</p>
            <div class="pros-cons">
              <div class="pros">
                <h4>✅ 优点</h4>
                <ul>
                  <li>更灵活，可以适配多个不同的类</li>
                  <li>符合组合优于继承原则</li>
                </ul>
              </div>
              <div class="cons">
                <h4>❌ 缺点</h4>
                <ul>
                  <li>需要额外的对象创建</li>
                  <li>可能增加系统复杂性</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="code-example">
          <h3>对象适配器代码示例</h3>
          <pre><code>// 目标接口
interface MediaPlayer {
  play(fileType: string, fileName: string): void;
}

// 被适配者类
class LegacyPlayer {
  playLegacyFormat(fileName: string): void {
    console.log(`Playing legacy file: ${fileName}`);
  }
}

// 适配器类
class PlayerAdapter implements MediaPlayer {
  private legacyPlayer: LegacyPlayer;

  constructor(legacyPlayer: LegacyPlayer) {
    this.legacyPlayer = legacyPlayer;
  }

  play(fileType: string, fileName: string): void {
    if (fileType === 'legacy') {
      this.legacyPlayer.playLegacyFormat(fileName);
    } else {
      console.log(`Playing modern file: ${fileName}`);
    }
  }
}

// 客户端使用
const adapter: MediaPlayer = new PlayerAdapter(new LegacyPlayer());
adapter.play('legacy', 'old_movie.mov');
adapter.play('mp4', 'new_video.mp4');</code></pre>
        </div>
      </section>

      <!-- 优缺点 -->
      <section class="card pros-cons-section">
        <div class="section-header">
          <div class="icon">⚖️</div>
          <h2>适配器模式优缺点</h2>
        </div>

        <div class="pros-cons-container">
          <div class="pros">
            <h3>✅ 优点</h3>
            <ul>
              <li v-for="(pro, index) in pros" :key="index">
                <div class="advantage">
                  <div class="check-icon">✓</div>
                  <div>{{ pro }}</div>
                </div>
              </li>
            </ul>
          </div>

          <div class="cons">
            <h3>❌ 缺点</h3>
            <ul>
              <li v-for="(con, index) in cons" :key="index">
                <div class="disadvantage">
                  <div class="cross-icon">✗</div>
                  <div>{{ con }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 相关模式 -->
      <section class="card related-patterns-section">
        <div class="section-header">
          <div class="icon">🧠</div>
          <h2>相关设计模式</h2>
        </div>

        <div class="related-patterns">
          <div class="pattern-card">
            <h3>桥接模式</h3>
            <p>关注分离抽象与实现，而适配器关注接口转换</p>
          </div>
          <div class="pattern-card">
            <h3>装饰器模式</h3>
            <p>增强对象功能但不改变接口</p>
          </div>
          <div class="pattern-card">
            <h3>外观模式</h3>
            <p>为复杂系统提供简化接口</p>
          </div>
          <div class="pattern-card">
            <h3>代理模式</h3>
            <p>控制访问对象而不是接口转换</p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>适配器模式是解决接口不兼容问题的优雅方案，能够在不修改现有代码的情况下实现组件协作</p>
      <p> 设计模式基础介绍 | 适配器模式</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 核心组件数据
const components = ref([
  {
    icon: '👤',
    name: '客户端 (Client)',
    description: '使用目标接口的类或组件',
    roles: [
      '调用目标接口定义的方法',
      '不直接与被适配者交互',
      '无需了解适配器内部实现'
    ]
  },
  {
    icon: '🎯',
    name: '目标接口 (Target)',
    description: '客户端期望使用的接口',
    roles: [
      '定义客户端使用的协议',
      '通常是抽象类或接口',
      '代表理想的操作集合'
    ]
  },
  {
    icon: '🔌',
    name: '适配器 (Adapter)',
    description: '连接客户端和被适配者的桥梁',
    roles: [
      '实现目标接口',
      '包含被适配者的实例',
      '转换接口并进行请求委派'
    ]
  },
  {
    icon: '🛠️',
    name: '被适配者 (Adaptee)',
    description: '需要适配的现有组件',
    roles: [
      '包含有用的功能但接口不兼容',
      '不需要修改原有代码',
      '可能来自第三方库或旧系统'
    ]
  }
]);

// 使用场景数据
const useCases = ref([
  {
    icon: '🔄',
    title: '集成遗留系统',
    description: '将旧系统集成到新架构中而不重写代码',
    example: '将旧的XML API适配到新的RESTful接口'
  },
  {
    icon: '📚',
    title: '第三方库适配',
    description: '使用不兼容接口的库或框架',
    example: '将不同的日志库适配到统一日志接口'
  },
  {
    icon: '💾',
    title: '数据格式转换',
    description: '在不同数据格式之间进行转换',
    example: '将CSV数据转换为JSON格式供新系统使用'
  },
  {
    icon: '⚠️',
    title: '错误处理适配',
    description: '统一不同组件的错误处理机制',
    example: '将不同库的错误对象适配为标准错误格式'
  },
  {
    icon: '🔄',
    title: 'API版本兼容',
    description: '支持不同版本的API接口共存',
    example: '将API v1请求适配到v2接口处理'
  },
  {
    icon: '🌐',
    title: '跨平台开发',
    description: '统一不同平台的特有API调用',
    example: '将浏览器API适配到Node.js环境使用'
  },
  {
    icon: '🧪',
    title: '测试替代',
    description: '创建测试替身代替真实依赖',
    example: '在单元测试中适配数据库访问接口'
  },
  {
    icon: '🔌',
    title: '插件系统',
    description: '支持不同实现的插件扩展',
    example: '将不同插件的自定义接口适配到核心系统'
  }
]);

// 优缺点数据
const pros = ref([
  '实现接口兼容而不修改现有代码',
  '提高代码复用性，重用现有类库',
  '符合开闭原则，系统易于扩展',
  '解耦客户端与被适配者之间的依赖',
  '可以适配多个不同的被适配者'
]);

const cons = ref([
  '增加系统复杂度，引入额外类',
  '在某些情况下可能影响性能',
  '过度使用可能导致系统混乱',
  '调试过程可能变得更加复杂',
  '可能隐藏设计问题，只是临时解决方案'
]);
</script>

<style lang="less" scoped>
@primary-color: #8e44ad;
@secondary-color: #3498db;
@accent-color: #e74c3c;
@background-color: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2c3e50;
@border-color: #ecedee;
@success-color: #27ae60;
@warning-color: #f39c12;

.adapter-pattern-page {
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @background-color;
  min-height: 100vh;
}

.header {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  border-radius: 16px;
  padding: 40px 30px;
  margin-bottom: 40px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
  }

  .header-content {
    position: relative;
    z-index: 1;
    text-align: center;
  }

  h1 {
    font-size: 2.8rem;
    margin: 0 0 10px;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .subtitle {
    font-size: 1.3rem;
    opacity: 0.9;
    margin-bottom: 40px;
    font-weight: 300;
  }
}

.pattern-visualization {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 30px;

  .client,
  .adaptee,
  .adapter-container {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    padding: 20px;
    min-width: 150px;
    text-align: center;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    font-weight: 600;
    color: @primary-color;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      background: white;
      transform: rotate(45deg);
      z-index: -1;
    }
  }

  .client::after {
    right: -15px;
    top: calc(50% - 15px);
  }

  .adaptee::after {
    left: -15px;
    top: calc(50% - 15px);
  }

  .adapter-container {
    background: linear-gradient(135deg, #ffffff, #f5f7fa);
    padding: 0;
    overflow: hidden;

    .target-interface {
      background: lighten(@primary-color, 40%);
      padding: 15px;
    }

    .adapter {
      padding: 15px;
      background: lighten(@secondary-color, 40%);
      font-weight: bold;
      position: relative;

      &::before {
        content: '⇄';
        position: absolute;
        font-size: 1.5rem;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: @primary-color;
      }
    }
  }

  .connectors {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin: 0 10px;

    .connector {
      padding: 8px 15px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;

      &.expected {
        background: rgba(142, 68, 173, 0.2);
        border: 1px solid @primary-color;
        color: darken(@primary-color, 10%);
      }

      &.actual {
        background: rgba(231, 76, 60, 0.2);
        border: 1px solid @accent-color;
        color: darken(@accent-color, 10%);
      }

      &.adapted {
        background: rgba(52, 152, 219, 0.2);
        border: 1px solid @secondary-color;
        color: darken(@secondary-color, 10%);
      }
    }
  }
}

.content-container {
  display: grid;
  gap: 30px;
  margin-bottom: 50px;
}

.card {
  background: @card-bg;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 5px solid @primary-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  }
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid lighten(@primary-color, 40%);

  .icon {
    font-size: 2rem;
    margin-right: 15px;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    color: white;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  h2 {
    font-size: 1.8rem;
    margin: 0;
    color: @primary-color;
  }
}

// 概念部分样式
.concept-section {
  .definition {
    background: lighten(@primary-color, 48%);
    padding: 25px;
    border-radius: 12px;
    margin-bottom: 30px;
    position: relative;

    p {
      font-size: 1.1rem;
      line-height: 1.7;
      margin: 0 0 15px;

      &:last-child {
        margin-bottom: 0;
      }

      strong {
        color: @primary-color;
        font-weight: 600;
      }
    }
  }

  .analogy {
    h3 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 20px;
    }

    .analogy-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
    }

    .analogy-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.3s;
      text-align: center;

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }

      .analogy-icon {
        font-size: 3rem;
        margin-bottom: 15px;
        color: @primary-color;
      }

      h4 {
        margin: 0 0 10px;
        color: @text-color;
      }

      p {
        margin: 0;
        color: lighten(@text-color, 20%);
        font-size: 0.95rem;
      }
    }
  }
}

// 核心组件样式
.components-section {
  .components-diagram {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 40px;
    padding: 20px;
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid @border-color;

    .component {
      background: white;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      min-width: 180px;

      h3 {
        font-size: 1.1rem;
        margin: 0 0 10px;
        color: @primary-color;
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        color: lighten(@text-color, 20%);
      }

      &.client {
        border-top: 4px solid lighten(#8e44ad, 20%);
      }

      &.target {
        border-top: 4px solid lighten(#3498db, 20%);
      }

      &.adapter {
        border-top: 4px solid lighten(#e74c3c, 20%);
      }

      &.adaptee {
        border-top: 4px solid lighten(#27ae60, 20%);
      }
    }

    .connector {
      font-size: 1.1rem;
      color: lighten(@text-color, 30%);
      font-weight: 600;
      min-width: 80px;
      text-align: center;
    }
  }

  .components-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;

    .component-card {
      display: flex;
      gap: 20px;
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.3s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
      }

      .comp-icon {
        font-size: 2rem;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: 5px;
      }

      h3 {
        margin: 0 0 10px;
        color: @primary-color;
        font-size: 1.2rem;
      }

      p {
        margin: 0 0 10px;
        color: lighten(@text-color, 10%);
      }

      ul {
        margin: 10px 0 0;
        padding-left: 20px;

        li {
          font-size: 0.9rem;
          margin-bottom: 8px;
          color: lighten(@text-color, 20%);
          position: relative;

          &::before {
            content: '•';
            color: @primary-color;
            font-size: 1.2rem;
            position: absolute;
            left: -15px;
            top: -2px;
          }
        }
      }
    }
  }
}

// 使用场景样式
.use-cases-section {
  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
  }

  .use-case-card {
    display: flex;
    gap: 20px;
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
    border-left: 4px solid @primary-color;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .case-icon {
      font-size: 2rem;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .case-content {
      h3 {
        margin: 0 0 10px;
        color: @text-color;
        font-size: 1.2rem;
      }

      p {
        margin: 0 0 10px;
        color: lighten(@text-color, 10%);
        font-size: 0.95rem;
      }

      .example {
        margin-top: 15px;
        padding: 10px 15px;
        background: lighten(@primary-color, 48%);
        border-radius: 8px;
        font-size: 0.9rem;
        border-left: 3px solid @primary-color;
      }
    }
  }
}

// 实现方式样式
.implementation-section {
  .implementation-types {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 40px;

    .type-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      border-top: 4px solid @primary-color;

      h3 {
        margin-top: 0;
        color: @primary-color;
        font-size: 1.4rem;
      }

      p {
        margin-top: 0;
        color: lighten(@text-color, 20%);
        font-style: italic;
      }
    }

    .pros-cons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;

      h4 {
        margin: 20px 0 10px;
        font-size: 1.1rem;
        padding-bottom: 5px;
        border-bottom: 2px solid #ecedee;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          font-size: 0.9rem;
          margin-bottom: 8px;
        }
      }

      .pros {
        h4 {
          color: @success-color;
        }

        li {
          color: darken(@success-color, 10%);
        }
      }

      .cons {
        h4 {
          color: @accent-color;
        }

        li {
          color: darken(@accent-color, 10%);
        }
      }
    }
  }

  .code-example {
    background: #2d2d2d;
    border-radius: 12px;
    overflow: hidden;

    h3 {
      margin: 0;
      padding: 15px 25px;
      background: #252526;
      color: #e5e5e5;
      font-size: 1.1rem;
    }

    pre {
      margin: 0;
      padding: 25px;
      overflow-x: auto;

      code {
        font-family: 'Fira Code', monospace;
        font-size: 0.95rem;
        line-height: 1.5;
        color: #f8f8f2;
      }
    }
  }
}

// 优缺点样式
.pros-cons-section {
  .pros-cons-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .pros,
    .cons {
      h3 {
        padding: 15px;
        text-align: center;
        border-radius: 8px;
        margin: 0 0 20px;
      }
    }

    .pros {
      h3 {
        background: linear-gradient(135deg, @success-color, darken(@success-color, 10%));
        color: white;
      }
    }

    .cons {
      h3 {
        background: linear-gradient(135deg, @accent-color, darken(@accent-color, 10%));
        color: white;
      }
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      margin-bottom: 15px;
      padding: 15px;
      border-radius: 8px;
      transition: all 0.3s;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .pros li {
      background: lighten(@success-color, 48%);
      border-left: 4px solid @success-color;

      .advantage {
        display: flex;
        gap: 15px;
        align-items: center;

        .check-icon {
          width: 30px;
          height: 30px;
          background: @success-color;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-weight: bold;
        }
      }
    }

    .cons li {
      background: lighten(@accent-color, 45%);
      border-left: 4px solid @accent-color;

      .disadvantage {
        display: flex;
        gap: 15px;
        align-items: center;

        .cross-icon {
          width: 30px;
          height: 30px;
          background: @accent-color;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-weight: bold;
        }
      }
    }
  }
}

// 相关模式样式
.related-patterns-section {
  .related-patterns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 25px;

    .pattern-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.3s;
      text-align: center;
      border-top: 4px solid lighten(@secondary-color, 20%);

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }

      h3 {
        margin: 0 0 15px;
        color: @primary-color;
        font-size: 1.2rem;
      }

      p {
        margin: 0;
        color: lighten(@text-color, 20%);
        font-size: 0.95rem;
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 60px;
  padding: 30px 20px;
  color: lighten(@text-color, 30%);
  font-size: 0.95rem;
  border-top: 1px solid @border-color;

  p:first-child {
    font-style: italic;
    margin-bottom: 10px;
    color: lighten(@text-color, 20%);
  }
}

// 响应式样式
@media (max-width: 768px) {
  .header {
    padding: 25px 20px;

    h1 {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .pattern-visualization {
    flex-direction: column;
    gap: 40px;

    .connectors {
      flex-direction: row;
      gap: 30px;
      margin: 10px 0;
      width: 100%;
      justify-content: center;
    }
  }

  .section-header {
    flex-direction: column;
    text-align: center;
    gap: 15px;

    .icon {
      margin-right: 0;
    }
  }

  .components-diagram {
    flex-direction: column;
    align-items: stretch;
    gap: 40px !important;

    .connector {
      transform: rotate(90deg);
      min-width: auto !important;
      min-height: 80px;
    }
  }
}
</style>
