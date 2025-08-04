<template>
  <div class="proxy-pattern-container">
    <header class="header">
      <h1>设计模式深入解析：代理模式</h1>
      <div class="pattern-type">结构型设计模式</div>
    </header>

    <div class="content-wrapper">
      <section class="pattern-intro">
        <h2 class="section-title"><i class="icon icon-info"></i>代理模式概念</h2>
        <div class="concept-box">
          <p>代理模式(Proxy Pattern)为其他对象提供一种<span class="highlight">代理以控制对这个对象的访问</span>。</p>
          <p>主要作用是在客户端和目标对象之间起到<span class="highlight">中介作用</span>，从而控制对目标对象的访问。</p>
          <div class="analogy">
            <h3>现实世界类比</h3>
            <div class="analogy-content">
              <div class="analogy-item">
                <div class="analogy-icon">🏦</div>
                <p>银行经理作为客户和银行金库之间的代理</p>
              </div>
              <div class="analogy-item">
                <div class="analogy-icon">🔑</div>
                <p>门禁卡作为进入大楼的访问代理</p>
              </div>
              <div class="analogy-item">
                <div class="analogy-icon">🖼️</div>
                <p>画廊工作人员作为艺术品的展示代理</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="columns-container">
        <section class="pattern-example">
          <h2 class="section-title"><i class="icon icon-code"></i>示例代码</h2>

          <div class="code-block">
            <h3>接口定义</h3>
            <pre><code>interface Image {
  display(): void;
}</code></pre>
          </div>

          <div class="code-block">
            <h3>真实图像类</h3>
            <pre><code>class RealImage implements Image {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    console.log(`加载图片: ${this.filename}`);
  }

  display(): void {
    console.log(`显示图片: ${this.filename}`);
  }
}</code></pre>
          </div>

          <div class="code-block">
            <h3>代理图像类</h3>
            <pre><code>class ProxyImage implements Image {
  private realImage: RealImage | null = null;
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  display(): void {
    if (this.realImage === null) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}</code></pre>
          </div>

          <div class="demonstration">
            <h3>演示：图片加载代理</h3>
            <div class="image-loader">
              <div class="controls">
                <button @click="loadImage('mountains.jpg')">加载山脉图片</button>
                <button @click="loadImage('ocean.jpg')">加载海洋图片</button>
                <button @click="loadImage('forest.jpg')">加载森林图片</button>
              </div>

              <div class="image-container">
                <div v-if="loading" class="loading-animation">
                  <div class="spinner"></div>
                  <p>图片加载中...</p>
                </div>
                <div v-if="currentImage" class="loaded-image">
                  <img :src="imageUrl" alt="Loaded image" />
                  <p>{{ currentImage }} - 加载成功!</p>
                </div>
              </div>

              <div class="logs">
                <h4>操作日志：</h4>
                <ul>
                  <li v-for="(log, index) in logs" :key="index">{{ log }}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div class="vertical-divider"></div>

        <div class="right-column">
          <section class="usage-scenarios">
            <h2 class="section-title"><i class="icon icon-scenario"></i>使用场景</h2>
            <ul class="scenario-list">
              <li>
                <div class="scenario-icon">🛡️</div>
                <div>
                  <h3>访问控制</h3>
                  <p>控制对目标对象的访问权限</p>
                </div>
              </li>
              <li>
                <div class="scenario-icon">🚀</div>
                <div>
                  <h3>延迟加载</h3>
                  <p>仅在需要时创建开销大的对象</p>
                </div>
              </li>
              <li>
                <div class="scenario-icon">📡</div>
                <div>
                  <h3>远程代理</h3>
                  <p>为远程对象提供本地代表</p>
                </div>
              </li>
              <li>
                <div class="scenario-icon">📃</div>
                <div>
                  <h3>日志记录</h3>
                  <p>追踪对象的方法调用</p>
                </div>
              </li>
              <li>
                <div class="scenario-icon">🔄</div>
                <div>
                  <h3>缓存代理</h3>
                  <p>为开销大的结果提供临时存储</p>
                </div>
              </li>
              <li>
                <div class="scenario-icon">🛡️</div>
                <div>
                  <h3>防火墙代理</h3>
                  <p>保护目标免受恶意访问</p>
                </div>
              </li>
            </ul>
          </section>

          <section class="pros-cons">
            <h2 class="section-title"><i class="icon icon-balance"></i>优缺点分析</h2>
            <div class="comparison">
              <div class="pros">
                <h3><i class="icon icon-check"></i> 优点</h3>
                <ul>
                  <li>保护目标对象免受不必要的访问</li>
                  <li>实现高扩展性和灵活性</li>
                  <li>降低系统耦合度</li>
                  <li>职责清晰，符合单一职责原则</li>
                  <li>作为中间层便于扩展功能</li>
                </ul>
              </div>
              <div class="cons">
                <h3><i class="icon icon-warning"></i> 缺点</h3>
                <ul>
                  <li>增加系统复杂度</li>
                  <li>请求转发可能造成性能损失</li>
                  <li>需要额外工作维护代理类</li>
                  <li>可能增加响应延迟</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section class="conclusion">
        <h2 class="section-title"><i class="icon icon-summary"></i>总结</h2>
        <div class="summary-box">
          <p>代理模式是<span class="highlight">控制对象访问</span>的强大工具，特别适用于需要<span class="highlight">间接访问复杂对象</span>的场景。</p>
          <p>在Vue/React等前端框架中常用于：API请求拦截、权限控制、图片懒加载、复杂组件延迟加载等功能实现。</p>
          <div class="pattern-diagram">
            <img
              src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect x='50' y='80' width='100' height='40' fill='%234285f4' stroke='%233066c3' stroke-width='2' rx='5'/%3E%3Ctext x='100' y='105' text-anchor='middle' fill='white' font-size='14'%3EClient%3C/text%3E%3Cpath d='M150,100 L190,100' stroke='%23333' stroke-width='2' marker-end='url(%23arrowhead)'/%3E%3Crect x='190' y='80' width='100' height='40' fill='%23fbbc05' stroke='%23c98f00' stroke-width='2' rx='5'/%3E%3Ctext x='240' y='105' text-anchor='middle' fill='white' font-size='14'%3EProxy%3C/text%3E%3Cpath d='M290,100 L330,100' stroke='%23333' stroke-width='2' marker-end='url(%23arrowhead)'/%3E%3Crect x='330' y='80' width='100' height='40' fill='%2334a853' stroke='%23287e48' stroke-width='2' rx='5'/%3E%3Ctext x='380' y='105' text-anchor='middle' fill='white' font-size='14'%3EReal Subject%3C/text%3E%3Cdefs%3E%3Cmarker id='arrowhead' markerWidth='10' markerHeight='7' refX='9' refY='3.5' orient='auto'%3E%3Cpolygon points='0 0, 10 3.5, 0 7' fill='%23333'/%3E%3C/marker%3E%3C/defs%3E%3C/svg%3E"
              alt="代理模式结构图" />
            <p class="diagram-caption">代理模式结构图：客户端 -> 代理 -> 真实主题</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 在实际应用中，这里可能是从API获取的图片URL
const imageMap: Record<string, string> = {
  'mountains.jpg': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
  'ocean.jpg': 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=500',
  'forest.jpg': 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=500'
};

const currentImage = ref<string | null>(null);
const logs = ref<string[]>([]);
const loading = ref(false);
const imageUrl = ref('');

// 模拟图片加载代理
const loadImage = (filename: string) => {
  loading.value = true;
  currentImage.value = null;
  logs.value.unshift(`请求加载图片: ${filename}`);

  // 模拟网络请求延迟
  setTimeout(() => {
    logs.value.unshift(`创建 ${filename} 的真实对象...`);

    // 模拟代理创建真实对象
    setTimeout(() => {
      imageUrl.value = imageMap[filename];
      currentImage.value = filename;
      loading.value = false;
      logs.value.unshift(`显示图片: ${filename}`);
    }, 800);
  }, 500);
};
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #e74c3c;
@success-color: #2ecc71;
@warning-color: #f39c12;
@border-color: #e0e0e0;
@light-bg: #f8f9fa;
@dark-text: #2c3e50;

.proxy-pattern-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @dark-text;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  .header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid @border-color;

    h1 {
      color: @secondary-color;
      margin-bottom: 8px;
      font-size: 2.2rem;
    }

    .pattern-type {
      display: inline-block;
      background-color: @primary-color;
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-weight: 600;
    }
  }

  .content-wrapper {
    background: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }

  .section-title {
    display: flex;
    align-items: center;
    color: @primary-color;
    border-bottom: 2px solid @primary-color;
    padding-bottom: 10px;
    margin-top: 0;
    font-size: 1.5rem;

    .icon {
      margin-right: 10px;
      font-size: 1.3em;
    }
  }

  .pattern-intro {
    margin-bottom: 30px;

    .concept-box {
      background: @light-bg;
      padding: 20px;
      border-radius: 8px;
      margin-top: 15px;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.02);

      p {
        line-height: 1.7;
        margin-bottom: 15px;
      }

      .highlight {
        background: linear-gradient(120deg, rgba(52, 152, 219, 0.2) 0%, rgba(52, 152, 219, 0) 100%);
        padding: 0 5px;
        font-weight: 600;
        border-radius: 3px;
      }
    }

    .analogy {
      margin-top: 25px;

      h3 {
        color: @secondary-color;
        margin-bottom: 15px;
        font-size: 1.2rem;
      }

      .analogy-content {
        display: flex;
        justify-content: space-between;
        gap: 15px;

        @media (max-width: 768px) {
          flex-direction: column;
        }

        .analogy-item {
          flex: 1;
          background: white;
          border-radius: 8px;
          padding: 15px;
          text-align: center;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;

          &:hover {
            transform: translateY(-5px);
          }

          .analogy-icon {
            font-size: 2.5rem;
            margin-bottom: 10px;
          }

          p {
            margin: 0;
            font-weight: 500;
          }
        }
      }
    }
  }

  .columns-container {
    display: flex;
    gap: 25px;
    margin-bottom: 30px;

    @media (max-width: 992px) {
      flex-direction: column;
    }

    .pattern-example {
      flex: 2;
    }

    .right-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 25px;
    }

    .vertical-divider {
      width: 1px;
      background: @border-color;

      @media (max-width: 992px) {
        display: none;
      }
    }
  }

  .code-block {
    background: #f5f8fb;
    border-left: 4px solid @primary-color;
    padding: 15px;
    border-radius: 0 8px 8px 0;
    margin-bottom: 20px;
    overflow-x: auto;

    h3 {
      margin-top: 0;
      color: @secondary-color;
      font-size: 1.1rem;
    }

    pre {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
      font-size: 0.95rem;
      line-height: 1.5;
      margin: 10px 0;
    }
  }

  .demonstration {
    background: @light-bg;
    border-radius: 8px;
    padding: 20px;
    margin-top: 25px;

    h3 {
      margin-top: 0;
      color: @secondary-color;
    }

    .image-loader {
      .controls {
        display: flex;
        gap: 12px;
        margin-bottom: 20px;
        flex-wrap: wrap;

        button {
          background: @primary-color;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.3s;

          &:hover {
            background: darken(@primary-color, 10%);
          }
        }
      }

      .image-container {
        height: 260px;
        background: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        overflow: hidden;
        border: 2px solid @border-color;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

        .loading-animation {
          text-align: center;

          .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(52, 152, 219, 0.2);
            border-top: 5px solid @primary-color;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 15px;
          }

          p {
            margin: 0;
            color: @secondary-color;
            font-weight: 500;
          }
        }

        .loaded-image {
          text-align: center;

          img {
            max-width: 100%;
            max-height: 200px;
            border-radius: 5px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          p {
            margin-top: 10px;
            font-weight: 600;
            color: @success-color;
          }
        }
      }

      .logs {
        background: #2d2d2d;
        color: #f8f8f2;
        padding: 15px;
        border-radius: 8px;
        max-height: 200px;
        overflow-y: auto;

        h4 {
          margin-top: 0;
          color: #66d9ef;
        }

        ul {
          padding-left: 20px;
          margin: 10px 0 0;

          li {
            padding: 5px 0;
            font-size: 0.9rem;
            border-bottom: 1px solid #444;

            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }
  }

  .usage-scenarios {
    background: linear-gradient(135deg, #f8f9fa 0%, #eef5fd 100%);
    border-radius: 8px;
    padding: 20px;

    .scenario-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px dashed @border-color;

        &:last-child {
          border-bottom: none;
        }

        .scenario-icon {
          font-size: 1.8rem;
          margin-right: 15px;
          width: 40px;
          text-align: center;
        }

        h3 {
          margin: 0 0 5px;
          font-size: 1.1rem;
          color: @secondary-color;
        }

        p {
          margin: 0;
          color: #666;
          font-size: 0.95rem;
        }
      }
    }
  }

  .pros-cons {
    .comparison {
      display: flex;
      gap: 20px;

      @media (max-width: 576px) {
        flex-direction: column;
      }

      .pros,
      .cons {
        flex: 1;
        background: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

        h3 {
          display: flex;
          align-items: center;
          margin-top: 0;
          padding-bottom: 10px;
          border-bottom: 2px solid;

          .icon {
            margin-right: 8px;
          }
        }

        ul {
          padding-left: 20px;
          margin: 15px 0 0;

          li {
            padding: 8px 0;
            line-height: 1.5;
          }
        }
      }

      .pros {
        h3 {
          color: @success-color;
          border-color: @success-color;
        }
      }

      .cons {
        h3 {
          color: @accent-color;
          border-color: @accent-color;
        }
      }
    }
  }

  .conclusion {
    .summary-box {
      background: linear-gradient(120deg, rgba(52, 152, 219, 0.05) 0%, rgba(46, 204, 113, 0.05) 100%);
      padding: 25px;
      border-radius: 8px;
      border-left: 4px solid @primary-color;
      margin-top: 15px;

      p {
        line-height: 1.7;
        margin-bottom: 20px;
      }

      .highlight {
        background: linear-gradient(120deg, rgba(52, 152, 219, 0.2) 0%, rgba(52, 152, 219, 0) 100%);
        padding: 0 5px;
        font-weight: 600;
        border-radius: 3px;
      }

      .pattern-diagram {
        margin-top: 20px;
        text-align: center;

        img {
          max-width: 100%;
          height: auto;
          border: 1px solid @border-color;
          border-radius: 8px;
          padding: 15px;
          background: white;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .diagram-caption {
          margin-top: 10px;
          font-style: italic;
          color: #666;
          font-size: 0.95rem;
        }
      }
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>