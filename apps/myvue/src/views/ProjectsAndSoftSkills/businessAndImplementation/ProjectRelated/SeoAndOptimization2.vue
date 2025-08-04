<template>
  <div class="seo-guide-container">
    <div class="header">
      <h1>SEO 原理及优化指南</h1>
      <p class="subtitle">提升网站在搜索引擎中的可见性与排名</p>
    </div>

    <div class="content">
      <section class="intro-section">
        <h2><span class="icon">🔍</span> 什么是 SEO</h2>
        <div class="intro-content">
          <p>SEO（Search Engine Optimization）即搜索引擎优化，是通过优化网站结构、内容和外部因素，提高网站在搜索引擎自然搜索结果中的排名和可见度的过程。</p>

          <div class="seo-benefits">
            <div class="benefit-card">
              <div class="benefit-icon">📈</div>
              <h3>核心目标</h3>
              <p>增加目标网站在搜索引擎中的有机（非付费）流量</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon">🎯</div>
              <h3>主要优势</h3>
              <p>获取高价值目标用户，建立品牌权威，长期可持续增长</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon">💰</div>
              <h3>商业价值</h3>
              <p>降低获客成本，提高转化率，增强在线竞争力</p>
            </div>
          </div>
        </div>
      </section>

      <section class="principle-section">
        <h2><span class="icon">⚙️</span> 搜索引擎工作原理</h2>
        <div class="search-engine-process">
          <div class="process-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>爬行 (Crawling)</h3>
              <p>搜索引擎蜘蛛（如Googlebot）通过链接发现和访问网页</p>
            </div>
          </div>

          <div class="process-arrow">→</div>

          <div class="process-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>索引 (Indexing)</h3>
              <p>分析页面内容并存储到搜索引擎的庞大数据库中</p>
            </div>
          </div>

          <div class="process-arrow">→</div>

          <div class="process-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>处理 (Processing)</h3>
              <p>解析页面内容，理解主题、关键词和语义关系</p>
            </div>
          </div>

          <div class="process-arrow">→</div>

          <div class="process-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>排名 (Ranking)</h3>
              <p>根据200+因素评估页面与查询的相关性并排序</p>
            </div>
          </div>
        </div>
      </section>

      <section class="factors-section">
        <h2><span class="icon">📊</span> 核心排名因素</h2>
        <div class="factors-grid">
          <div class="factor-card">
            <div class="factor-header">
              <div class="factor-icon">🔗</div>
              <h3>页面因素</h3>
            </div>
            <ul>
              <li>关键词优化（标题、内容、URL）</li>
              <li>内容质量与深度</li>
              <li>页面加载速度</li>
              <li>移动设备友好性</li>
              <li>结构化数据标记</li>
              <li>内部链接结构</li>
            </ul>
          </div>

          <div class="factor-card">
            <div class="factor-header">
              <div class="factor-icon">🌐</div>
              <h3>站外因素</h3>
            </div>
            <ul>
              <li>高质量反向链接数量</li>
              <li>反向链接来源权威性</li>
              <li>品牌提及和引用</li>
              <li>社交媒体影响力</li>
              <li>本地SEO信号（对于本地业务）</li>
            </ul>
          </div>

          <div class="factor-card">
            <div class="factor-header">
              <div class="factor-icon">👥</div>
              <h3>用户体验</h3>
            </div>
            <ul>
              <li>跳出率与停留时间</li>
              <li>点击率（CTR）</li>
              <li>页面浏览深度</li>
              <li>移动端体验</li>
              <li>核心网页指标（LCP, FID, CLS）</li>
            </ul>
          </div>

          <div class="factor-card">
            <div class="factor-header">
              <div class="factor-icon">🔐</div>
              <h3>技术因素</h3>
            </div>
            <ul>
              <li>网站安全性（HTTPS）</li>
              <li>XML站点地图</li>
              <li>robots.txt配置</li>
              <li>规范化URL</li>
              <li>结构化数据实现</li>
              <li>无重复内容</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="optimization-section">
        <h2><span class="icon">🚀</span> SEO 优化方案</h2>

        <div class="optimization-tabs">
          <div v-for="(tab, index) in tabs" :key="index" :class="['tab', { active: activeTab === index }]"
            @click="activeTab = index">
            {{ tab.label }}
          </div>
        </div>

        <div class="optimization-content">
          <div v-if="activeTab === 0" class="tab-content">
            <h3>技术 SEO 优化</h3>
            <div class="optimization-grid">
              <div class="optimization-card">
                <h4>网站速度优化</h4>
                <ul>
                  <li>启用Gzip压缩</li>
                  <li>优化图片大小与格式</li>
                  <li>使用CDN加速</li>
                  <li>减少重定向链</li>
                  <li>最小化CSS/JavaScript</li>
                </ul>
              </div>

              <div class="optimization-card">
                <h4>移动优先优化</h4>
                <ul>
                  <li>响应式设计实现</li>
                  <li>移动端友好测试</li>
                  <li>触控元素大小优化</li>
                  <li>加速移动页面（AMP）</li>
                </ul>
              </div>

              <div class="optimization-card">
                <h4>结构化数据</h4>
                <ul>
                  <li>Schema.org标记实现</li>
                  <li>面包屑导航结构化</li>
                  <li>富媒体片段优化</li>
                  <li>JSON-LD格式实现</li>
                </ul>
              </div>

              <div class="optimization-card">
                <h4>网站架构优化</h4>
                <ul>
                  <li>逻辑化的URL结构</li>
                  <li>XML站点地图提交</li>
                  <li>robots.txt配置</li>
                  <li>内部链接优化</li>
                  <li>404页面处理</li>
                </ul>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 1" class="tab-content">
            <h3>内容优化策略</h3>
            <div class="optimization-grid">
              <div class="optimization-card">
                <h4>关键词研究</h4>
                <ul>
                  <li>长尾关键词挖掘</li>
                  <li>搜索意图分析</li>
                  <li>竞争对手关键词分析</li>
                  <li>关键词难度评估</li>
                </ul>
              </div>

              <div class="optimization-card">
                <h4>内容创建</h4>
                <ul>
                  <li>解决用户问题的全面内容</li>
                  <li>主题集群内容架构</li>
                  <li>多媒体内容整合（视频、图表）</li>
                  <li>原创性与深度</li>
                </ul>
              </div>

              <div class="optimization-card">
                <h4>页面元素优化</h4>
                <ul>
                  <li>标题标签（H1）优化</li>
                  <li>元描述优化</li>
                  <li>URL结构语义化</li>
                  <li>图片ALT文本优化</li>
                </ul>
              </div>

              <div class="optimization-card">
                <h4>内容更新策略</h4>
                <ul>
                  <li>常青内容维护</li>
                  <li>内容刷新计划</li>
                  <li>用户生成内容整合</li>
                  <li>内容深度扩展</li>
                </ul>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 2" class="tab-content">
            <h3>站外优化策略</h3>
            <div class="optimization-grid">
              <div class="optimization-card">
                <h4>链接建设</h4>
                <ul>
                  <li>高质量内容吸引自然链接</li>
                  <li>客座博客策略</li>
                  <li>资源页面链接获取</li>
                  <li>断链修复与重建</li>
                </ul>
              </div>

              <div class="optimization-card">
                <h4>品牌建设</h4>
                <ul>
                  <li>品牌提及监控</li>
                  <li>社交媒体品牌传播</li>
                  <li>行业影响力建设</li>
                  <li>在线声誉管理</li>
                </ul>
              </div>

              <div class="optimization-card">
                <h4>本地SEO</h4>
                <ul>
                  <li>Google My Business优化</li>
                  <li>本地目录提交</li>
                  <li>本地关键词优化</li>
                  <li>客户评价管理</li>
                </ul>
              </div>

              <div class="optimization-card">
                <h4>影响力拓展</h4>
                <ul>
                  <li>行业专家合作</li>
                  <li>社区参与和贡献</li>
                  <li>论坛和问答平台参与</li>
                  <li>播客和采访机会</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="tools-section">
        <h2><span class="icon">🛠️</span> SEO 工具推荐</h2>
        <div class="tools-grid">
          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-icon">🔍</div>
              <h3>关键词研究</h3>
            </div>
            <ul>
              <li>Google Keyword Planner</li>
              <li>SEMrush</li>
              <li>Ahrefs Keywords Explorer</li>
              <li>Moz Keyword Explorer</li>
            </ul>
          </div>

          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-icon">📊</div>
              <h3>网站分析</h3>
            </div>
            <ul>
              <li>Google Analytics</li>
              <li>Google Search Console</li>
              <li>SEMrush Site Audit</li>
              <li>Screaming Frog</li>
            </ul>
          </div>

          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-icon">🔗</div>
              <h3>链接分析</h3>
            </div>
            <ul>
              <li>Ahrefs Backlink Checker</li>
              <li>Majestic</li>
              <li>LinkResearchTools</li>
              <li>Monitor Backlinks</li>
            </ul>
          </div>

          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-icon">📝</div>
              <h3>内容优化</h3>
            </div>
            <ul>
              <li>SurferSEO</li>
              <li>Clearscope</li>
              <li>MarketMuse</li>
              <li>Frase.io</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2><span class="icon">💡</span> SEO 最佳实践</h2>
        <div class="practices-grid">
          <div class="practice-card">
            <h3>技术优化</h3>
            <ul>
              <li>确保网站完全响应式</li>
              <li>实现HTTPS安全协议</li>
              <li>优化网站速度（LCP < 2.5s）</li>
              <li>使用规范的URL结构</li>
              <li>提交XML站点地图</li>
            </ul>
          </div>

          <div class="practice-card">
            <h3>内容策略</h3>
            <ul>
              <li>创建10倍内容（比竞品好10倍）</li>
              <li>关注搜索意图而非关键词密度</li>
              <li>建立内容主题集群</li>
              <li>定期更新过时内容</li>
              <li>优化内容可读性</li>
            </ul>
          </div>

          <div class="practice-card">
            <h3>链接建设</h3>
            <ul>
              <li>质量重于数量（DR > 50）</li>
              <li>多样化锚文本</li>
              <li>优先获取行业权威链接</li>
              <li>修复损坏的链接</li>
              <li>监控竞争对手链接</li>
            </ul>
          </div>

          <div class="practice-card">
            <h3>持续优化</h3>
            <ul>
              <li>定期进行SEO审计</li>
              <li>监控核心排名关键词</li>
              <li>分析用户行为数据</li>
              <li>跟踪算法更新</li>
              <li>测试与迭代优化策略</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div class="footer">
      <p>SEO 是一个持续优化的过程，需要技术、内容和推广的完美结合</p>
      <p>最后更新: {{ currentDate }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(0);
const tabs = [
  { label: '技术优化' },
  { label: '内容优化' },
  { label: '站外优化' }
];

const currentDate = new Date().toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.seo-guide-container {
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
      p {
        font-size: 1.05rem;
        line-height: 1.7;
        color: #4a5568;
        margin-bottom: 1.5rem;
      }

      .seo-benefits {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;

        .benefit-card {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(66, 133, 244, 0.1);
          }

          .benefit-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            text-align: center;
          }

          h3 {
            font-size: 1.25rem;
            color: #2c3e50;
            margin-top: 0;
            margin-bottom: 0.8rem;
            text-align: center;
          }

          p {
            font-size: 0.95rem;
            color: #4a5568;
            text-align: center;
            margin: 0;
          }
        }
      }
    }
  }

  .principle-section {
    .search-engine-process {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      @media (max-width: 900px) {
        flex-direction: column;
      }

      .process-step {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        min-width: 200px;
        text-align: center;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
        }

        .step-number {
          width: 40px;
          height: 40px;
          background: #4285f4;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
          margin: 0 auto 1rem;
        }

        .step-content {
          h3 {
            font-size: 1.2rem;
            color: #2c3e50;
            margin-top: 0;
            margin-bottom: 0.5rem;
          }

          p {
            font-size: 0.9rem;
            color: #4a5568;
            margin: 0;
          }
        }
      }

      .process-arrow {
        font-size: 1.8rem;
        color: #a0aec0;
        font-weight: 100;

        @media (max-width: 900px) {
          transform: rotate(90deg);
        }
      }
    }
  }

  .factors-section {
    .factors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .factor-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
        }

        .factor-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;

          .factor-icon {
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

  .optimization-section {
    .optimization-tabs {
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

    .optimization-content {
      .tab-content {
        h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1.5rem;
        }

        .optimization-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;

          .optimization-card {
            background: #f8fafc;
            border-radius: 8px;
            padding: 1.2rem;
            border: 1px solid #e2e8f0;

            h4 {
              font-size: 1.1rem;
              color: #2c3e50;
              margin-top: 0;
              margin-bottom: 0.8rem;
              padding-bottom: 0.5rem;
              border-bottom: 1px solid #e2e8f0;
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
  }

  .tools-section {
    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

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
      gap: 1.5rem;

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

    p:first-child {
      font-weight: 500;
      margin-bottom: 0.5rem;
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

    .search-engine-process {
      .process-arrow {
        margin: 1rem 0;
      }
    }
  }
}
</style>
