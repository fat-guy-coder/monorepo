<template>
  <div class="singleton-container">
    <div class="header">
      <h1>单例模式基本介绍</h1>
      <p class="subtitle">确保一个类只有一个实例，并提供全局访问点</p>
    </div>

    <div class="pattern-card">
      <div class="card-header">
        <div class="pattern-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V9l-6-6zM5 19V5h9v5h5v9H5z" />
          </svg>
        </div>
        <h2>单例模式 (Singleton Pattern)</h2>
      </div>

      <div class="card-content">
        <div class="section concept">
          <h3>概念定义</h3>
          <p>
            单例模式是一种创建型设计模式，它确保一个类只有一个实例，并提供一个全局访问点来访问这个实例。
            这种模式解决了对象唯一性和全局访问的问题，避免了对同一资源的重复创建和竞争。
          </p>
        </div>

        <div class="section idea">
          <h3>基本思想</h3>
          <ul>
            <li>私有化类的构造函数，防止外部直接创建实例</li>
            <li>在类内部创建并保存唯一的实例</li>
            <li>提供一个静态方法（如 <code>getInstance()</code>）作为全局访问点</li>
            <li>通过访问点获取实例，如果实例不存在则创建，否则返回已有实例</li>
          </ul>
          <div class="visual-diagram">
            <div class="client">客户端</div>
            <div class="arrow">→</div>
            <div class="get-instance">getInstance()</div>
            <div class="arrow">→</div>
            <div class="instance">
              Singleton<br>实例
              <div class="unique">唯一实例</div>
            </div>
          </div>
        </div>

        <div class="section implementation">
          <h3>实现方式</h3>
          <div class="tabs">
            <button :class="{ active: activeTab === 'lazy' }" @click="activeTab = 'lazy'">
              懒汉式
            </button>
            <button :class="{ active: activeTab === 'eager' }" @click="activeTab = 'eager'">
              饿汉式
            </button>
            <button :class="{ active: activeTab === 'ts' }" @click="activeTab = 'ts'">
              TypeScript实现
            </button>
          </div>

          <div class="code-block">
            <pre v-if="activeTab === 'lazy'"><code>class Singleton {
  private static instance: Singleton | null = null;

  // 私有构造函数防止外部实例化
  private constructor() {}

  // 全局访问点
  public static getInstance(): Singleton {
    if (Singleton.instance === null) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public someMethod(): void {
    console.log("单例方法被调用");
  }
}

// 使用示例
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true</code></pre>

            <pre v-if="activeTab === 'eager'"><code>class Singleton {
  // 在类加载时立即创建实例
  private static instance: Singleton = new Singleton();

  // 私有构造函数防止外部实例化
  private constructor() {}

  // 全局访问点
  public static getInstance(): Singleton {
    return Singleton.instance;
  }

  public someMethod(): void {
    console.log("单例方法被调用");
  }
}

// 使用示例
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true</code></pre>

            <pre v-if="activeTab === 'ts'"><code>class Singleton {
  private static _instance: Singleton;

  // 私有构造函数防止外部实例化
  private constructor() {}

  // 全局访问点（线程安全版本）
  public static get instance(): Singleton {
    if (!Singleton._instance) {
      Singleton._instance = new Singleton();
    }
    return Singleton._instance;
  }

  // 示例方法
  public logMessage(message: string): void {
    console.log(`[Singleton] ${message}`);
  }
}

// 使用示例
const logger1 = Singleton.instance;
const logger2 = Singleton.instance;

logger1.logMessage("第一条日志");
logger2.logMessage("第二条日志");

console.log(logger1 === logger2); // true</code></pre>
          </div>
        </div>

        <div class="section use-cases">
          <h3>使用场景</h3>
          <div class="case-grid">
            <div class="case-card">
              <div class="case-icon" style="background-color: #FF6B6B;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z" />
                </svg>
              </div>
              <h4>全局配置管理</h4>
              <p>应用程序的全局配置对象，确保所有模块访问的是同一份配置</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #4ECDC4;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" />
                </svg>
              </div>
              <h4>日志记录器</h4>
              <p>整个应用程序使用同一个日志记录器实例，确保日志格式一致</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #118AB2;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9v-2h2v2zm0-4H9V7h2v4zm4 4h-2v-2h2v2zm0-4h-2V7h2v4z" />
                </svg>
              </div>
              <h4>数据库连接池</h4>
              <p>管理数据库连接，避免频繁创建和销毁连接</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #FFD166;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
              <h4>状态管理</h4>
              <p>全局状态管理器（如Redux/Vuex中的store）</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #9B5DE5;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15c0-1.66 1.34-3 3-3 .35 0 .69.07 1 .18V10c0-.55.45-1 1-1s1 .45 1 1v1h2V10c0-1.79-1.46-3.27-3.25-3L11 8.25v1.51c1.25.54 2 1.76 2 3.24 0 1.66-1.34 3-3 3s-3-1.34-3-3H8z" />
                </svg>
              </div>
              <h4>缓存系统</h4>
              <p>应用程序级缓存，统一管理缓存策略和失效机制</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #06D6A0;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
              </div>
              <h4>安全上下文</h4>
              <p>用户认证信息管理，确保全局唯一的安全上下文</p>
            </div>
          </div>
        </div>

        <div class="section pros-cons">
          <h3>优缺点分析</h3>
          <div class="comparison">
            <div class="pros">
              <h4>优点</h4>
              <ul>
                <li>严格控制实例数量，避免资源浪费</li>
                <li>提供全局访问点，方便共享资源</li>
                <li>避免频繁创建和销毁对象，提高性能</li>
                <li>保证数据一致性（所有客户端使用同一实例）</li>
                <li>实现延迟初始化（懒汉式）</li>
              </ul>
            </div>

            <div class="cons">
              <h4>缺点</h4>
              <ul>
                <li>违反单一职责原则（同时管理创建和业务逻辑）</li>
                <li>多线程环境下需要特殊处理（如双重检查锁定）</li>
                <li>单元测试困难（全局状态难以隔离）</li>
                <li>可能引入不必要的全局耦合</li>
                <li>长期存在的实例可能导致内存泄漏</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="section best-practices">
          <h3>最佳实践</h3>
          <ul>
            <li>考虑线程安全：在多线程环境中使用双重检查锁定或静态初始化</li>
            <li>谨慎使用：仅在真正需要全局唯一实例时使用</li>
            <li>避免全局状态污染：通过依赖注入传递实例</li>
            <li>考虑序列化：如果单例需要序列化，实现 <code>readResolve()</code> 方法</li>
            <li>懒加载 vs 急切加载：根据性能需求选择合适的方式</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>设计模式 | 创建型模式 | 单例模式</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref<'lazy' | 'eager' | 'ts'>('ts');
</script>

<style scoped lang="less">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Source+Code+Pro:wght@400;500&display=swap');

.singleton-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  min-height: 100vh;

  .header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin-top: 0;
    }
  }

  .pattern-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;

    .card-header {
      background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
      color: white;
      padding: 1.5rem 2rem;
      display: flex;
      align-items: center;

      .pattern-icon {
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1.5rem;

        svg {
          width: 36px;
          height: 36px;
        }
      }

      h2 {
        margin: 0;
        font-size: 1.8rem;
      }
    }

    .card-content {
      padding: 2rem;

      .section {
        margin-bottom: 2.5rem;

        h3 {
          color: #3498db;
          border-bottom: 2px solid #3498db;
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
            background: #3498db;
            border-radius: 50%;
            margin-right: 10px;
          }
        }

        p,
        li {
          line-height: 1.7;
          color: #444;
        }

        li {
          margin-bottom: 0.8rem;
          position: relative;
          padding-left: 1.5rem;

          &::before {
            content: "•";
            color: #3498db;
            position: absolute;
            left: 0;
            font-weight: bold;
          }
        }
      }

      .visual-diagram {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 2rem 0;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 8px;
        font-weight: 500;

        .client,
        .get-instance,
        .instance {
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          text-align: center;
        }

        .arrow {
          margin: 0 1rem;
          font-size: 1.5rem;
          color: #3498db;
        }

        .instance {
          position: relative;
          border: 2px solid #3498db;

          .unique {
            position: absolute;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            background: #3498db;
            color: white;
            padding: 2px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
          }
        }
      }

      .tabs {
        display: flex;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid #eee;

        button {
          padding: 0.8rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          color: #7f8c8d;
          position: relative;
          transition: all 0.3s;

          &:hover {
            color: #3498db;
          }

          &.active {
            color: #3498db;

            &::after {
              content: "";
              position: absolute;
              bottom: -1px;
              left: 0;
              right: 0;
              height: 3px;
              background: #3498db;
              border-radius: 3px 3px 0 0;
            }
          }
        }
      }

      .code-block {
        background: #2d3748;
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
          border: 1px solid #eee;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
            border-color: #3498db;
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
            color: #2c3e50;
          }

          p {
            margin: 0;
            font-size: 0.95rem;
            color: #666;
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
            background: rgba(52, 152, 219, 0.05);
            border: 1px solid rgba(52, 152, 219, 0.2);

            h4 {
              color: #27ae60;
              border-color: #27ae60;
            }
          }

          .cons {
            background: rgba(231, 76, 60, 0.05);
            border: 1px solid rgba(231, 76, 60, 0.2);

            h4 {
              color: #e74c3c;
              border-color: #e74c3c;
            }
          }
        }
      }

      .best-practices {
        background: #fff8e1;
        border-left: 4px solid #ffc107;
        padding: 1.5rem;
        border-radius: 0 8px 8px 0;

        li {
          color: #5d4037;
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 2rem;
    color: #7f8c8d;
    font-size: 0.9rem;
    padding: 1rem;
  }
}
</style>
