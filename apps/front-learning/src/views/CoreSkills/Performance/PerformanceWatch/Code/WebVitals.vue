<template>
  <div class="web-vitals-container">
    <div class="header">
      <h1>Web Vitals 核心指标基础介绍</h1>
      <p class="subtitle">提升网站用户体验的关键性能指标</p>
    </div>

    <div class="content">
      <section class="intro-section">
        <h2><span class="icon">📊</span> 什么是 Web Vitals</h2>
        <div class="intro-content">
          <div class="definition-card">
            <p>Web Vitals 是 Google 推出的一套关键用户体验指标，用于衡量网站的用户体验质量。这些指标提供了统一的指南，帮助开发者理解和优化网站的核心用户体验。</p>
            <div class="key-points">
              <div class="point">
                <div class="point-icon">🎯</div>
                <div class="point-content">
                  <h3>核心目标</h3>
                  <p>量化用户体验，提供优化方向</p>
                </div>
              </div>
              <div class="point">
                <div class="point-icon">📈</div>
                <div class="point-content">
                  <h3>主要特点</h3>
                  <p>可衡量、可操作、真实反映用户体验</p>
                </div>
              </div>
              <div class="point">
                <div class="point-icon">🌐</div>
                <div class="point-content">
                  <h3>应用范围</h3>
                  <p>适用于所有网站和Web应用</p>
                </div>
              </div>
            </div>
          </div>

          <div class="evolution">
            <h3>Web Vitals 发展历程</h3>
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-date">2019</div>
                <div class="timeline-content">
                  <h4>核心 Web Vitals 概念提出</h4>
                  <p>Google 首次定义关键用户体验指标</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-date">2020</div>
                <div class="timeline-content">
                  <h4>LCP、FID、CLS 成为核心指标</h4>
                  <p>纳入 Google 搜索排名因素</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-date">2021</div>
                <div class="timeline-content">
                  <h4>FID 被 INP 取代</h4>
                  <p>更全面地衡量交互响应性</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-date">2024</div>
                <div class="timeline-content">
                  <h4>INP 成为正式核心指标</h4>
                  <p>全面取代 FID</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="metrics-section">
        <h2><span class="icon">📏</span> 核心 Web Vitals 指标</h2>
        <div class="metrics-grid">
          <div class="metric-card lcp">
            <div class="metric-header">
              <div class="metric-icon">⏱️</div>
              <h3>LCP (Largest Contentful Paint)</h3>
            </div>
            <div class="metric-content">
              <p><strong>最大内容绘制时间</strong> - 测量页面主要内容加载完成的时间</p>
              <div class="metric-details">
                <div class="metric-threshold">
                  <div class="threshold good">良好: ≤2.5秒</div>
                  <div class="threshold needs-improvement">需改进: 2.5-4秒</div>
                  <div class="threshold poor">较差: >4秒</div>
                </div>
                <div class="metric-improvement">
                  <h4>优化策略：</h4>
                  <ul>
                    <li>优化服务器响应时间</li>
                    <li>移除渲染阻塞资源</li>
                    <li>预加载关键资源</li>
                    <li>优化图片和字体加载</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="metric-card inp">
            <div class="metric-header">
              <div class="metric-icon">🖱️</div>
              <h3>INP (Interaction to Next Paint)</h3>
            </div>
            <div class="metric-content">
              <p><strong>交互到下次绘制</strong> - 测量用户交互的响应性</p>
              <div class="metric-details">
                <div class="metric-threshold">
                  <div class="threshold good">良好: ≤200ms</div>
                  <div class="threshold needs-improvement">需改进: 200-500ms</div>
                  <div class="threshold poor">较差: >500ms</div>
                </div>
                <div class="metric-improvement">
                  <h4>优化策略：</h4>
                  <ul>
                    <li>减少长任务执行时间</li>
                    <li>优化JavaScript执行</li>
                    <li>使用Web Workers</li>
                    <li>避免大型布局变化</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="metric-card cls">
            <div class="metric-header">
              <div class="metric-icon">📐</div>
              <h3>CLS (Cumulative Layout Shift)</h3>
            </div>
            <div class="metric-content">
              <p><strong>累积布局偏移</strong> - 测量页面视觉稳定性</p>
              <div class="metric-details">
                <div class="metric-threshold">
                  <div class="threshold good">良好: ≤0.1</div>
                  <div class="threshold needs-improvement">需改进: 0.1-0.25</div>
                  <div class="threshold poor">较差: >0.25</div>
                </div>
                <div class="metric-improvement">
                  <h4>优化策略：</h4>
                  <ul>
                    <li>为图片和视频预留空间</li>
                    <li>避免动态注入内容</li>
                    <li>使用CSS transform动画</li>
                    <li>预加载字体</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="implementation-section">
        <h2><span class="icon">🔧</span> Web Vitals 实现方法</h2>

        <div class="implementation-tabs">
          <div v-for="(tab, index) in tabs" :key="index" :class="['tab', { active: activeTab === index }]"
            @click="activeTab = index">
            {{ tab.label }}
          </div>
        </div>

        <div class="implementation-content">
          <div v-if="activeTab === 0" class="tab-content">
            <h3>使用 web-vitals 库</h3>
            <div class="code-container">
              <div class="code-header">
                <div class="code-title">安装与基本使用</div>
              </div>
              <pre class="code-block">// 安装 web-vitals 库
npm install web-vitals

// 在项目中引入
import { getLCP, getFID, getCLS, getINP } from 'web-vitals';

// 报告单个指标
getCLS(console.log);
getFID(console.log);
getLCP(console.log);
getINP(console.log);

// 发送指标到分析服务
function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  navigator.sendBeacon('/analytics', body);
}

getCLS(sendToAnalytics);
getINP(sendToAnalytics);
getLCP(sendToAnalytics);</pre>
            </div>
          </div>

          <div v-if="activeTab === 1" class="tab-content">
            <h3>在 Vue 中集成</h3>
            <div class="code-container">
              <div class="code-header">
                <div class="code-title">Vue3 实现示例</div>
              </div>
              <pre class="code-block">import { onMounted } from 'vue';
import { getCLS, getINP, getLCP } from 'web-vitals';

export function useWebVitals() {
  onMounted(() => {
    // 跟踪核心 Web Vitals
    getCLS(console.log);
    getINP(console.log);
    getLCP(console.log);

    // 跟踪辅助指标
    getFID(console.log);  // 即将被 INP 取代
    getFCP(console.log);  // 首次内容绘制
    getTTFB(console.log); // 首字节时间
  });
}

// 在组件中使用
import { useWebVitals } from '@/composables/useWebVitals';

export default {
  setup() {
    useWebVitals();
    // 组件逻辑...
  }
}</pre>
            </div>
          </div>

          <div v-if="activeTab === 2" class="tab-content">
            <h3>高级配置与优化</h3>
            <div class="code-container">
              <div class="code-header">
                <div class="code-title">高级配置示例</div>
              </div>
              <pre class="code-block">import { getLCP, getINP, getCLS } from 'web-vitals';

// 配置报告选项
const reportOptions = {
  // 报告所有更改（不仅仅是最终值）
  reportAllChanges: true,

  // 自定义持续时间阈值
  durationThreshold: 1000,

  // 自定义报告函数
  report: (metric) => {
    // 发送到 Google Analytics
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    });

    // 发送到自定义分析服务
    sendToCustomAnalytics(metric);
  }
};

// 初始化跟踪
getLCP(reportOptions);
getINP(reportOptions);
getCLS(reportOptions);

// 跟踪页面隐藏时的指标
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    // 报告所有挂起的指标
    getLCP(reportOptions);
    getINP(reportOptions);
    getCLS(reportOptions);
  }
});</pre>
            </div>
          </div>
        </div>
      </section>

      <section class="use-cases-section">
        <h2><span class="icon">🚀</span> Web Vitals 应用场景</h2>
        <div class="use-case-grid">
          <div class="use-case-card">
            <div class="case-header">
              <div class="case-icon">🔍</div>
              <h3>性能监控</h3>
            </div>
            <div class="case-content">
              <p>持续监控网站性能指标，识别性能瓶颈：</p>
              <ul>
                <li>实时用户监控 (RUM)</li>
                <li>性能异常检测</li>
                <li>版本发布前后性能对比</li>
                <li>第三方资源性能影响分析</li>
              </ul>
            </div>
          </div>

          <div class="use-case-card">
            <div class="case-header">
              <div class="case-icon">📈</div>
              <h3>SEO 优化</h3>
            </div>
            <div class="case-content">
              <p>提升网站在搜索引擎中的排名：</p>
              <ul>
                <li>满足 Google 搜索排名要求</li>
                <li>优化核心 Web Vitals 指标</li>
                <li>提升用户体验信号</li>
                <li>获得搜索排名优势</li>
              </ul>
            </div>
          </div>

          <div class="use-case-card">
            <div class="case-header">
              <div class="case-icon">💼</div>
              <h3>业务指标关联</h3>
            </div>
            <div class="case-content">
              <p>将性能指标与业务成果关联：</p>
              <ul>
                <li>转化率与LCP的相关性分析</li>
                <li>用户留存率与INP的关联</li>
                <li>跳出率与CLS的关系研究</li>
                <li>性能优化对收入的影响评估</li>
              </ul>
            </div>
          </div>

          <div class="use-case-card">
            <div class="case-header">
              <div class="case-icon">🛠️</div>
              <h3>开发流程集成</h3>
            </div>
            <div class="case-content">
              <p>将 Web Vitals 纳入开发工作流：</p>
              <ul>
                <li>CI/CD 流水线中的性能测试</li>
                <li>PR 合并前的性能检查</li>
                <li>开发环境性能监控</li>
                <li>自动化性能预算执行</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="tools-section">
        <h2><span class="icon">🛠️</span> Web Vitals 工具集</h2>
        <div class="tools-grid">
          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-icon">🧪</div>
              <h3>实验室工具</h3>
            </div>
            <ul>
              <li>Lighthouse (Chrome DevTools)</li>
              <li>PageSpeed Insights</li>
              <li>WebPageTest</li>
              <li>Chrome UX Report (CrUX)</li>
            </ul>
          </div>

          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-icon">👥</div>
              <h3>真实用户监控</h3>
            </div>
            <ul>
              <li>Google Analytics</li>
              <li>Sentry Performance</li>
              <li>New Relic Browser</li>
              <li>Datadog RUM</li>
            </ul>
          </div>

          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-icon">📊</div>
              <h3>可视化工具</h3>
            </div>
            <ul>
              <li>Google Search Console</li>
              <li>Vercel Analytics</li>
              <li>Cloudflare Web Analytics</li>
              <li>SpeedCurve</li>
            </ul>
          </div>

          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-icon">⚙️</div>
              <h3>框架集成</h3>
            </div>
            <ul>
              <li>Next.js Analytics</li>
              <li>Nuxt Speedkit</li>
              <li>Vite Plugin PWA</li>
              <li>Create React App (CRA) PWA</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2><span class="icon">💡</span> Web Vitals 最佳实践</h2>
        <div class="practices-grid">
          <div class="practice-card">
            <h3>监控策略</h3>
            <ul>
              <li>结合实验室数据和真实用户数据</li>
              <li>设置性能预算并监控</li>
              <li>跟踪关键用户路径的指标</li>
              <li>按设备类型和网络条件细分数据</li>
            </ul>
          </div>

          <div class="practice-card">
            <h3>优化方法</h3>
            <ul>
              <li>优先优化影响最大的页面</li>
              <li>实施渐进式加载策略</li>
              <li>优化关键渲染路径</li>
              <li>使用最新Web平台功能</li>
            </ul>
          </div>

          <div class="practice-card">
            <h3>团队协作</h3>
            <ul>
              <li>将核心指标纳入团队OKR</li>
              <li>建立跨职能性能团队</li>
              <li>定期审查性能数据</li>
              <li>将性能纳入设计流程</li>
            </ul>
          </div>

          <div class="practice-card">
            <h3>持续改进</h3>
            <ul>
              <li>建立性能基准</li>
              <li>实施A/B测试验证优化效果</li>
              <li>监控第三方脚本的影响</li>
              <li>定期审计和迭代优化</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div class="footer">
      <p>Web Vitals 官方文档: <a href="https://web.dev/vitals/" target="_blank">https://web.dev/vitals/</a></p>
      <p>最后更新: {{ currentDate }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(0);
const tabs = [
  { label: '基础使用' },
  { label: 'Vue集成' },
  { label: '高级配置' }
];

const currentDate = new Date().toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
</script>

<style lang="less" scoped>



.web-vitals-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%);
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.07);
  line-height: 1.6;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e9ecef;

    h1 {
      font-size: 2.4rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, #4285f4, #34a853);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      font-size: 1.15rem;
      color: #7f8c8d;
      font-weight: 400;
      max-width: 700px;
      margin: 0 auto;
    }
  }

  .content {
    background: white;
    border-radius: 12px;
    padding: 2.5rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
  }

  section {
    margin-bottom: 3.5rem;

    h2 {
      font-size: 1.7rem;
      color: #4285f4;
      margin-bottom: 1.8rem;
      padding-bottom: 0.8rem;
      border-bottom: 2px solid #e8f0fe;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 12px;
        font-size: 1.4rem;
      }
    }
  }

  .intro-section {
    .intro-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 2rem;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }

      .definition-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.8rem;
        border: 1px solid #e2e8f0;

        p {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #4a5568;
          margin-bottom: 1.5rem;
        }

        .key-points {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.2rem;

          .point {
            display: flex;
            background: white;
            border-radius: 8px;
            padding: 1rem;
            border: 1px solid #e2e8f0;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

            .point-icon {
              font-size: 1.8rem;
              margin-right: 1rem;
              color: #4285f4;
            }

            .point-content {
              h3 {
                font-size: 1.1rem;
                margin: 0 0 0.3rem 0;
                color: #2c3e50;
              }

              p {
                font-size: 0.9rem;
                margin: 0;
                color: #718096;
              }
            }
          }
        }
      }

      .evolution {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.8rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.25rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1.5rem;
        }

        .timeline {
          position: relative;

          &:before {
            content: '';
            position: absolute;
            left: 20px;
            top: 0;
            bottom: 0;
            width: 4px;
            background: #e2e8f0;
            border-radius: 2px;
          }

          .timeline-item {
            position: relative;
            margin-bottom: 2rem;
            padding-left: 50px;

            &:last-child {
              margin-bottom: 0;
            }

            .timeline-date {
              position: absolute;
              left: 0;
              top: 0;
              width: 40px;
              height: 40px;
              background: #4285f4;
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
              font-size: 1.1rem;
              z-index: 1;
            }

            .timeline-content {
              background: white;
              border-radius: 8px;
              padding: 1rem;
              border: 1px solid #e2e8f0;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

              h4 {
                font-size: 1.1rem;
                color: #2c3e50;
                margin-top: 0;
                margin-bottom: 0.5rem;
              }

              p {
                font-size: 0.9rem;
                color: #718096;
                margin: 0;
              }
            }
          }
        }
      }
    }
  }

  .metrics-section {
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.8rem;

      .metric-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
        }

        &.lcp {
          border-top: 4px solid #4285f4;
        }

        &.inp {
          border-top: 4px solid #fbbc05;
        }

        &.cls {
          border-top: 4px solid #34a853;
        }

        .metric-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;

          .metric-icon {
            font-size: 1.8rem;
            margin-right: 0.8rem;
          }

          h3 {
            font-size: 1.2rem;
            color: #2c3e50;
            margin: 0;
          }
        }

        .metric-content {
          p {
            font-size: 0.95rem;
            color: #4a5568;
            margin-bottom: 1rem;

            strong {
              color: #2c3e50;
            }
          }

          .metric-details {
            .metric-threshold {
              display: flex;
              margin-bottom: 1rem;
              border-radius: 6px;
              overflow: hidden;
              border: 1px solid #e2e8f0;

              .threshold {
                flex: 1;
                text-align: center;
                padding: 0.5rem;
                font-size: 0.85rem;
                font-weight: 500;

                &.good {
                  background: #e6f4ea;
                  color: #137333;
                }

                &.needs-improvement {
                  background: #fef7e0;
                  color: #f9ab00;
                }

                &.poor {
                  background: #fce8e6;
                  color: #a50e0e;
                }
              }
            }

            .metric-improvement {
              h4 {
                font-size: 1rem;
                color: #2c3e50;
                margin-top: 0;
                margin-bottom: 0.5rem;
              }

              ul {
                padding-left: 1.2rem;
                margin: 0;

                li {
                  margin-bottom: 0.5rem;
                  color: #4a5568;
                  font-size: 0.9rem;
                  line-height: 1.5;
                }
              }
            }
          }
        }
      }
    }
  }

  .implementation-section {
    .implementation-tabs {
      display: flex;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 1.5rem;

      .tab {
        padding: 0.8rem 1.5rem;
        cursor: pointer;
        font-weight: 500;
        color: #718096;
        border-bottom: 3px solid transparent;
        transition: all 0.3s;

        &:hover {
          color: #4285f4;
        }

        &.active {
          color: #4285f4;
          border-bottom: 3px solid #4285f4;
        }
      }
    }

    .implementation-content {
      .tab-content {
        h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1.5rem;
        }

        .code-container {
          background: #2d3748;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

          .code-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.9rem 1.5rem;
            background: #1a202c;
            border-bottom: 1px solid #2d3748;

            .code-title {
              color: #cbd5e0;
              font-size: 0.95rem;
              font-weight: 500;
            }
          }

          .code-block {
            margin: 0;
            padding: 1.8rem;
            color: #e2e8f0;
            font-family: 'Fira Code', monospace;
            font-size: 0.95rem;
            line-height: 1.7;
            overflow-x: auto;
            background: #2d3748;
          }
        }
      }
    }
  }

  .use-cases-section {
    .use-case-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.8rem;

      .use-case-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
        }

        .case-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;

          .case-icon {
            font-size: 1.8rem;
            margin-right: 0.8rem;
            color: #4285f4;
          }

          h3 {
            font-size: 1.2rem;
            color: #2c3e50;
            margin: 0;
          }
        }

        .case-content {
          p {
            color: #4a5568;
            font-size: 0.95rem;
            margin-bottom: 0.8rem;
          }

          ul {
            padding-left: 1.2rem;
            margin: 0;

            li {
              margin-bottom: 0.6rem;
              color: #4a5568;
              font-size: 0.95rem;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }

  .tools-section {
    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.8rem;

      .tool-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        .tool-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;

          .tool-icon {
            font-size: 1.8rem;
            margin-right: 0.8rem;
          }

          h3 {
            font-size: 1.2rem;
            color: #2c3e50;
            margin: 0;
          }
        }

        ul {
          padding-left: 1.2rem;
          margin: 0;

          li {
            margin-bottom: 0.7rem;
            color: #4a5568;
            font-size: 0.95rem;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .best-practices {
    .practices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.8rem;

      .practice-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.2rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        ul {
          padding-left: 1.2rem;
          margin: 0;

          li {
            margin-bottom: 0.7rem;
            color: #4a5568;
            font-size: 0.95rem;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e9ecef;
    color: #718096;
    font-size: 0.95rem;

    a {
      color: #4285f4;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1.2rem;

    .header {
      h1 {
        font-size: 1.9rem;
      }
    }

    .content {
      padding: 1.8rem;
    }

    section {
      margin-bottom: 2.5rem;
    }

    .intro-content,
    .metrics-grid,
    .use-case-grid,
    .tools-grid,
    .practices-grid {
      grid-template-columns: 1fr;
      gap: 1.2rem;
    }
  }
}
</style>
