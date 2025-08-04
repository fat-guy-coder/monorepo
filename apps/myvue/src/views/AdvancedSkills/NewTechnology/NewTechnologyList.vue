<template>
  <div class="tech-guide">
    <header>
      <h1>2020-2025年前端新技术概览</h1>
      <p>探索未来五年影响前端开发的关键技术与概念</p>
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">45+</div>
          <div class="stat-label">新技术概念</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">7</div>
          <div class="stat-label">主要技术领域</div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <!-- 框架与工具 -->
      <div class="category-section">
        <h2 class="category-title">🚀 框架与工具</h2>
        <div class="tech-grid">
          <TechCard title="Vite" :tags="['构建工具']" hot="⭐⭐⭐⭐⭐" needLearn="⭐⭐⭐" desc="基于ESM的极速开发工具，提供闪电般快速的冷启动和热更新。"
            scene="现代Web应用开发，替代Webpack的轻量方案" />
          <TechCard title="Turbopack" :tags="['构建工具']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="Rust编写的增量式打包工具，比Webpack快700倍。"
            scene="大型项目构建，需要极致性能的场景" />
          <TechCard title="Next.js 13+" :tags="['框架']" hot="⭐⭐⭐⭐⭐" needLearn="⭐⭐⭐⭐"
            desc="引入了App Router、Server Components等革命性功能。" scene="全栈应用，SEO优化，混合渲染应用" />
          <TechCard title="Nuxt 3" :tags="['框架']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="基于Vue3的全栈框架，支持Vite、Nitro服务器等。"
            scene="Vue生态全栈应用，SSR/SSG项目" />
          <TechCard title="Astro" :tags="['框架']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="岛屿架构(Islands Architecture)的静态站点生成器。"
            scene="内容密集型网站，高性能静态站点" />
          <TechCard title="Qwik" :tags="['框架']" hot="⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="可恢复性框架，实现O(1)复杂性的即时交互。"
            scene="需要极致性能的Web应用" />
          <TechCard title="Bun" :tags="['运行时']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="一体化的JavaScript运行时，替代Node.js和Webpack。"
            scene="全栈开发，高性能服务器" />
          <TechCard title="Rome" :tags="['工具链']" hot="⭐⭐" needLearn="⭐⭐⭐" desc="一体化的前端工具链，包括linter、formatter等。"
            scene="统一项目工具链，简化配置" />
        </div>
      </div>

      <!-- 语言与标准 -->
      <div class="category-section">
        <h2 class="category-title">📜 语言与标准</h2>
        <div class="tech-grid">
          <TechCard title="TypeScript 5+" :tags="['语言']" hot="⭐⭐⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="支持装饰器、const类型参数、模块解析标志等新特性。"
            scene="大型项目开发，提高代码健壮性" />
          <TechCard title="ECMAScript 2022+" :tags="['标准']" hot="⭐⭐⭐⭐⭐" needLearn="⭐⭐⭐"
            desc="包括顶层await、类静态块、.at()方法、错误原因等。" scene="现代JavaScript开发" />
          <TechCard title="WASM组件模型" :tags="['标准']" hot="⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="允许WebAssembly模块以组件形式组合和复用。"
            scene="高性能计算，复杂应用模块化" />
          <TechCard title="CSS Nesting" :tags="['标准']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐" desc="原生CSS支持嵌套规则，减少预处理器依赖。"
            scene="简化CSS结构，提高可读性" />
          <TechCard title="CSS Container Queries" :tags="['标准']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="基于容器而非视口的响应式设计。"
            scene="组件级响应式设计" />
          <TechCard title="CSS :has() 选择器" :tags="['标准']" hot="⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="基于子元素状态选择父元素。"
            scene="复杂UI状态管理" />
          <TechCard title="View Transitions API" :tags="['标准']" hot="⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="原生实现页面和元素间的平滑过渡效果。"
            scene="SPA页面切换，DOM更新动画" />
          <TechCard title="Web Locks API" :tags="['标准']" hot="⭐⭐" needLearn="⭐⭐" desc="协调共享资源访问的API。"
            scene="多标签页应用协调" />
        </div>
      </div>

      <!-- 架构与模式 -->
      <div class="category-section">
        <h2 class="category-title">🏗️ 架构与模式</h2>
        <div class="tech-grid">
          <TechCard title="微前端" :tags="['架构']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="将前端应用拆分为独立开发、部署的子应用。"
            scene="大型企业应用，多团队协作" />
          <TechCard title="岛屿架构" :tags="['架构']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="静态HTML中嵌入交互式'岛屿'组件。"
            scene="内容网站，提高LCP指标" />
          <TechCard title="服务器组件" :tags="['模式']" hot="⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="在服务端渲染的不可交互组件。"
            scene="减少客户端包大小，提高性能" />
          <TechCard title="边缘渲染" :tags="['架构']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="在CDN边缘节点执行服务器端渲染。"
            scene="全球用户应用，降低延迟" />
          <TechCard title="JAMstack 2.0" :tags="['架构']" hot="⭐⭐⭐" needLearn="⭐⭐⭐" desc="结合动态功能的现代Jamstack架构。"
            scene="高性能网站，简化部署" />
          <TechCard title="Monorepo" :tags="['模式']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐" desc="多个项目共享单一仓库的管理方式。"
            scene="多包管理，共享代码库" />
          <TechCard title="Resumability" :tags="['模式']" hot="⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="序列化应用状态实现即时交互。"
            scene="极快TTI指标应用" />
          <TechCard title="Partial Hydration" :tags="['模式']" hot="⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="仅对必要组件进行水合处理。"
            scene="优化大型应用性能" />
        </div>
      </div>

      <!-- 状态管理 -->
      <div class="category-section">
        <h2 class="category-title">🔄 状态管理</h2>
        <div class="tech-grid">
          <TechCard title="Zustand" :tags="['库']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐" desc="基于hooks的轻量状态管理方案。"
            scene="简单到中等复杂度应用" />
          <TechCard title="Jotai" :tags="['库']" hot="⭐⭐⭐" needLearn="⭐⭐⭐" desc="原子化状态管理，类似Recoil但更简洁。"
            scene="细粒度状态管理需求" />
          <TechCard title="Valtio" :tags="['库']" hot="⭐⭐⭐" needLearn="⭐⭐" desc="基于Proxy的响应式状态管理。"
            scene="需要简单响应式状态的应用" />
          <TechCard title="Signals" :tags="['模式']" hot="⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="细粒度响应式原语，用于高性能更新。"
            scene="需要极致性能的应用" />
          <TechCard title="React Server Components" :tags="['模式']" hot="⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="在服务端管理状态和逻辑。"
            scene="减少客户端状态管理复杂度" />
          <TechCard title="Tauri" :tags="['工具']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="替代Electron的轻量桌面应用框架。"
            scene="构建跨平台桌面应用" />
          <TechCard title="Redux Toolkit 2.0" :tags="['库']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="简化Redux开发的官方工具集。"
            scene="大型复杂应用状态管理" />
          <TechCard title="Pinia" :tags="['库']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐" desc="Vue的现代化状态管理库。" scene="Vue3应用状态管理" />
        </div>
      </div>

      <!-- API与数据 -->
      <div class="category-section">
        <h2 class="category-title">📡 API与数据</h2>
        <div class="tech-grid">
          <TechCard title="tRPC" :tags="['库']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="类型安全的API通信方案，无需生成代码。"
            scene="全栈TypeScript项目" />
          <TechCard title="GraphQL" :tags="['协议']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="查询语言，允许客户端精确获取所需数据。"
            scene="复杂数据需求，多平台API" />
          <TechCard title="WebSockets 2.0" :tags="['协议']" hot="⭐⭐⭐" needLearn="⭐⭐⭐" desc="改进的双向通信协议，支持更好压缩和扩展。"
            scene="实时应用，聊天，协作编辑" />
          <TechCard title="WebTransport" :tags="['协议']" hot="⭐⭐" needLearn="⭐⭐⭐" desc="基于QUIC的现代传输协议。"
            scene="低延迟实时通信" />
          <TechCard title="Serverless Functions" :tags="['架构']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐" desc="按需执行的后端代码，无服务器管理。"
            scene="API端点，轻量后端逻辑" />
          <TechCard title="Edge Functions" :tags="['架构']" hot="⭐⭐⭐" needLearn="⭐⭐⭐" desc="在CDN边缘运行的函数。"
            scene="低延迟API，个性化内容" />
          <TechCard title="BFF (Backend For Frontend)" :tags="['模式']" hot="⭐⭐⭐" needLearn="⭐⭐⭐" desc="为前端定制优化的API层。"
            scene="微前端架构，多客户端支持" />
          <TechCard title="WebHID" :tags="['API']" hot="⭐" needLearn="⭐⭐" desc="访问人机接口设备(HID)的API。"
            scene="游戏控制器，特殊输入设备" />
        </div>
      </div>

      <!-- 性能与体验 -->
      <div class="category-section">
        <h2 class="category-title">⚡ 性能与体验</h2>
        <div class="tech-grid">
          <TechCard title="Core Web Vitals" :tags="['指标']" hot="⭐⭐⭐⭐⭐" needLearn="⭐⭐⭐" desc="Google的网页用户体验关键指标集合。"
            scene="网站性能优化，SEO" />
          <TechCard title="Web Vitals 库" :tags="['工具']" hot="⭐⭐⭐" needLearn="⭐⭐" desc="测量和报告Core Web Vitals的库。"
            scene="性能监控，优化评估" />
          <TechCard title="Partytown" :tags="['库']" hot="⭐⭐" needLearn="⭐⭐⭐" desc="将第三方脚本移至Web Worker执行。"
            scene="优化主线程性能" />
          <TechCard title="ESBuild" :tags="['工具']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐" desc="Go编写的极速JavaScript打包器。"
            scene="快速构建，开发工具链" />
          <TechCard title="Lightning CSS" :tags="['工具']" hot="⭐⭐⭐" needLearn="⭐⭐⭐" desc="Rust编写的极速CSS处理工具。"
            scene="CSS处理，替代PostCSS" />
          <TechCard title="React Forget" :tags="['编译器']" hot="⭐⭐" needLearn="⭐⭐⭐⭐" desc="React的自动记忆化编译器。"
            scene="优化React渲染性能" />
          <TechCard title="Progressive Hydration" :tags="['模式']" hot="⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="渐进式水合策略优化性能。"
            scene="大型应用性能优化" />
          <TechCard title="Speculation Rules" :tags="['API']" hot="⭐" needLearn="⭐⭐" desc="声明式预取和预渲染规则。"
            scene="优化导航性能" />
        </div>
      </div>

      <!-- 新兴领域 -->
      <div class="category-section">
        <h2 class="category-title">🔮 新兴领域</h2>
        <div class="tech-grid">
          <TechCard title="WebGPU" :tags="['API']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="下一代Web图形API，取代WebGL。"
            scene="高性能图形，计算应用" />
          <TechCard title="WebNN" :tags="['API']" hot="⭐⭐" needLearn="⭐⭐⭐⭐" desc="浏览器原生神经网络API。" scene="客户端机器学习" />
          <TechCard title="WebAssembly" :tags="['技术']" hot="⭐⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="浏览器中运行高性能代码的二进制格式。"
            scene="游戏，CAD，图像处理" />
          <TechCard title="WebXR" :tags="['API']" hot="⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="构建虚拟和增强现实体验的API。" scene="VR/AR应用" />
          <TechCard title="Low-Code/No-Code" :tags="['平台']" hot="⭐⭐⭐⭐" needLearn="⭐⭐" desc="可视化开发平台，减少手写代码。"
            scene="快速原型，业务应用" />
          <TechCard title="AI辅助开发" :tags="['工具']" hot="⭐⭐⭐⭐⭐" needLearn="⭐⭐" desc="Copilot等AI编程助手。"
            scene="提高开发效率，代码生成" />
          <TechCard title="Web3 & DApps" :tags="['生态']" hot="⭐⭐⭐" needLearn="⭐⭐⭐⭐" desc="基于区块链的去中心化应用。"
            scene="加密货币，NFT，去中心化服务" />
          <TechCard title="PWAs 2.0" :tags="['技术']" hot="⭐⭐⭐" needLearn="⭐⭐⭐" desc="增强的渐进式Web应用功能。" scene="类原生应用体验" />
        </div>
      </div>

      <div class="trends-section">
        <h2>未来趋势总结</h2>
        <div class="trends-container">
          <div class="trend-card">
            <h3>性能优先</h3>
            <p>核心性能指标成为开发重点，工具链向Rust/Go迁移</p>
          </div>
          <div class="trend-card">
            <h3>全栈融合</h3>
            <p>前后端边界模糊，元框架提供一体化解决方案</p>
          </div>
          <div class="trend-card">
            <h3>边缘计算</h3>
            <p>计算向边缘转移，降低延迟，提高个性化</p>
          </div>
          <div class="trend-card">
            <h3>类型安全</h3>
            <p>TypeScript成为标准，类型安全扩展到API层</p>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>前端技术趋势指南 © 2023 | 数据更新至2023年7月</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, } from 'vue';
import TechCard from './C/TechCard.vue';

// 示例数据
const technologies = ref([
  // 数据将在组件中使用
]);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.tech-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  color: #2c3e50;
  background-color: #f8fafc;
  min-height: 100vh;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 30px;
    padding: 30px 20px;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    border-radius: 12px;
    color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 2.4rem;
      font-weight: 700;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto 25px;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 20px;

      .stat-card {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 10px;
        padding: 15px 25px;
        min-width: 120px;

        .stat-value {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.95rem;
          opacity: 0.85;
        }
      }
    }
  }

  .content-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    padding: 30px;
  }

  .category-section {
    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0;
    }

    .category-title {
      font-size: 1.8rem;
      color: #4f46e5;
      margin-bottom: 25px;
      padding-bottom: 12px;
      border-bottom: 2px solid #eef2ff;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 80px;
        height: 3px;
        background: #4f46e5;
        border-radius: 3px;
      }
    }
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 10px;
  }


  footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px;
    color: #64748b;
    font-size: 0.9rem;
    border-top: 1px solid #e2e8f0;
  }

  @media (max-width: 768px) {
    .tech-grid {
      grid-template-columns: 1fr;
    }

    header {
      h1 {
        font-size: 1.8rem;
      }

      p {
        font-size: 1rem;
      }

      .stats {
        flex-direction: column;
        align-items: center;
        gap: 15px;
      }
    }
  }
}
</style>
