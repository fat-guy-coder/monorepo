<template>
  <div class="atomic-design-container">
    <header class="header">
      <div class="header-content">
        <h1>React Atomic Design 方法论</h1>
        <p class="subtitle">构建模块化、可扩展的前端架构</p>
        <div class="atomic-visual">
          <div class="level">
            <div class="level-item atom">
              <div class="particle"></div>
              <div class="label">原子</div>
            </div>
            <div class="level-arrow">+</div>
            <div class="level-item molecule">
              <div class="particle"></div>
              <div class="particle"></div>
              <div class="label">分子</div>
            </div>
            <div class="level-arrow">+</div>
            <div class="level-item organism">
              <div class="molecule"></div>
              <div class="molecule"></div>
              <div class="label">生物体</div>
            </div>
            <div class="level-arrow">+</div>
            <div class="level-item template">
              <div class="organism"></div>
              <div class="placeholder"></div>
              <div class="label">模板</div>
            </div>
            <div class="level-arrow">+</div>
            <div class="level-item page">
              <div class="template"></div>
              <div class="content"></div>
              <div class="label">页面</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="overview-section">
        <div class="section-header">
          <i class="icon fas fa-atom"></i>
          <h2>Atomic Design 概述</h2>
        </div>

        <div class="card">
          <div class="intro">
            <p>Atomic Design 是由 Brad Frost 提出的一种 UI 设计方法论，将界面分解为五个层次：</p>

            <div class="levels">
              <div class="level-card atom">
                <div class="level-icon">
                  <i class="fas fa-circle"></i>
                </div>
                <h3>原子 (Atoms)</h3>
                <p>基本的 UI 元素 (按钮、输入框等)</p>
              </div>

              <div class="level-card molecule">
                <div class="level-icon">
                  <i class="fas fa-atom"></i>
                </div>
                <h3>分子 (Molecules)</h3>
                <p>简单组件的组合 (搜索框、卡片头等)</p>
              </div>

              <div class="level-card organism">
                <div class="level-icon">
                  <i class="fas fa-dna"></i>
                </div>
                <h3>生物体 (Organisms)</h3>
                <p>复杂 UI 部分 (导航栏、产品列表等)</p>
              </div>

              <div class="level-card template">
                <div class="level-icon">
                  <i class="fas fa-layer-group"></i>
                </div>
                <h3>模板 (Templates)</h3>
                <p>页面布局结构 (无具体内容)</p>
              </div>

              <div class="level-card page">
                <div class="level-icon">
                  <i class="fas fa-file"></i>
                </div>
                <h3>页面 (Pages)</h3>
                <p>填充具体内容的模板 (最终页面)</p>
              </div>
            </div>
          </div>

          <div class="benefits">
            <h3>Atomic Design 的优势</h3>
            <ul>
              <li><i class="fas fa-check"></i> 提升组件复用性</li>
              <li><i class="fas fa-check"></i> 增强设计一致性</li>
              <li><i class="fas fa-check"></i> 加速开发流程</li>
              <li><i class="fas fa-check"></i> 简化团队协作</li>
              <li><i class="fas fa-check"></i> 支持渐进式开发</li>
              <li><i class="fas fa-check"></i> 易于维护和扩展</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="levels-section">
        <div class="section-header">
          <i class="icon fas fa-sitemap"></i>
          <h2>设计层次基础介绍</h2>
        </div>

        <div class="level-details">
          <div class="level">
            <div class="level-header">
              <div class="level-number">1</div>
              <div class="level-title">
                <h3>原子 (Atoms)</h3>
                <p>UI 构建的基本元素</p>
              </div>
            </div>
            <div class="level-content">
              <div class="description">
                <p>原子是构成界面的最小单位，它们不能进一步分解而保持功能完整。</p>
                <p>这些元素是全局的，在整个应用中保持一致。</p>
              </div>

              <div class="examples">
                <h4>示例组件：</h4>
                <div class="example-grid">
                  <div class="example">
                    <div class="example-visual button">按钮</div>
                    <div class="example-name">Button</div>
                  </div>
                  <div class="example">
                    <div class="example-visual input">输入框</div>
                    <div class="example-name">Input</div>
                  </div>
                  <div class="example">
                    <div class="example-visual label">标签</div>
                    <div class="example-name">Label</div>
                  </div>
                  <div class="example">
                    <div class="example-visual icon"><i class="fas fa-star"></i></div>
                    <div class="example-name">Icon</div>
                  </div>
                </div>
              </div>

              <div class="code-sample">
                <h4>代码实现：</h4>
                <pre><code>// Button.jsx - 原子组件
import React from 'react';

const Button = ({ children, variant = 'primary', ...props }) => {
  return (
    &lt;button
      className={`button ${variant}`}
      {...props}
    &gt;
      {children}
    &lt;/button&gt;
  );
};

export default Button;</code></pre>
              </div>
            </div>
          </div>

          <div class="level">
            <div class="level-header">
              <div class="level-number">2</div>
              <div class="level-title">
                <h3>分子 (Molecules)</h3>
                <p>简单组件的组合</p>
              </div>
            </div>
            <div class="level-content">
              <div class="description">
                <p>分子由原子组合而成，形成简单的 UI 组件，执行特定的功能。</p>
                <p>这些组件具有明确的单一职责。</p>
              </div>

              <div class="examples">
                <h4>示例组件：</h4>
                <div class="example-grid">
                  <div class="example">
                    <div class="example-visual search">
                      <div class="input">搜索...</div>
                      <div class="button">搜索</div>
                    </div>
                    <div class="example-name">搜索框</div>
                  </div>
                  <div class="example">
                    <div class="example-visual card-header">
                      <div class="avatar"></div>
                      <div class="text">
                        <div class="title">标题</div>
                        <div class="subtitle">副标题</div>
                      </div>
                    </div>
                    <div class="example-name">卡片头部</div>
                  </div>
                  <div class="example">
                    <div class="example-visual form-field">
                      <div class="label">用户名</div>
                      <div class="input"></div>
                      <div class="error">错误信息</div>
                    </div>
                    <div class="example-name">表单字段</div>
                  </div>
                </div>
              </div>

              <div class="code-sample">
                <h4>代码实现：</h4>
                <pre><code>// SearchForm.jsx - 分子组件
import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="输入搜索内容..."
      /&gt;
      &lt;Button type="submit"&gt;搜索&lt;/Button&gt;
    &lt;/form&gt;
  );
};

export default SearchForm;</code></pre>
              </div>
            </div>
          </div>

          <div class="level">
            <div class="level-header">
              <div class="level-number">3</div>
              <div class="level-title">
                <h3>生物体 (Organisms)</h3>
                <p>复杂 UI 部分</p>
              </div>
            </div>
            <div class="level-content">
              <div class="description">
                <p>生物体由分子和原子组合而成，形成复杂的、独立的 UI 部分。</p>
                <p>这些组件通常是页面中可重复使用的较大区块。</p>
              </div>

              <div class="examples">
                <h4>示例组件：</h4>
                <div class="example-grid">
                  <div class="example">
                    <div class="example-visual header">
                      <div class="logo">LOGO</div>
                      <div class="nav">导航1 导航2 导航3</div>
                      <div class="search">搜索框</div>
                      <div class="user">用户</div>
                    </div>
                    <div class="example-name">网站头部</div>
                  </div>
                  <div class="example">
                    <div class="example-visual product-list">
                      <div class="product">产品1</div>
                      <div class="product">产品2</div>
                      <div class="product">产品3</div>
                    </div>
                    <div class="example-name">产品列表</div>
                  </div>
                  <div class="example">
                    <div class="example-visual footer">
                      <div class="links">链接1 | 链接2 | 链接3</div>
                      <div class="copyright">版权信息</div>
                    </div>
                    <div class="example-name">页脚</div>
                  </div>
                </div>
              </div>

              <div class="code-sample">
                <h4>代码实现：</h4>
                <pre><code>// ProductCard.jsx - 生物体组件
import React from 'react';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import Rating from '../molecules/Rating';

const ProductCard = ({ product }) => {
  return (
    &lt;div className="product-card"&gt;
      &lt;Image src={product.image} alt={product.name} /&gt;
      &lt;h3&gt;{product.name}&lt;/h3&gt;
      &lt;Rating value={product.rating} /&gt;
      &lt;p&gt;{product.description}&lt;/p&gt;
      &lt;div className="price"&gt;${product.price}&lt;/div&gt;
      &lt;Button variant="primary"&gt;加入购物车&lt;/Button&gt;
    &lt;/div&gt;
  );
};

export default ProductCard;</code></pre>
              </div>
            </div>
          </div>

          <div class="level">
            <div class="level-header">
              <div class="level-number">4</div>
              <div class="level-title">
                <h3>模板 (Templates)</h3>
                <p>页面布局结构</p>
              </div>
            </div>
            <div class="level-content">
              <div class="description">
                <p>模板定义页面的结构布局，包含占位符而不是实际内容。</p>
                <p>关注内容区域的布局和位置，而不关注具体内容。</p>
              </div>

              <div class="examples">
                <h4>示例模板：</h4>
                <div class="example-template">
                  <div class="template-header">头部</div>
                  <div class="template-main">
                    <div class="template-sidebar">侧边栏</div>
                    <div class="template-content">
                      <div class="placeholder">内容区域</div>
                      <div class="placeholder">内容区域</div>
                    </div>
                  </div>
                  <div class="template-footer">页脚</div>
                </div>
              </div>

              <div class="code-sample">
                <h4>代码实现：</h4>
                <pre><code>// DashboardTemplate.jsx - 模板组件
import React from 'react';
import Header from '../organisms/Header';
import Sidebar from '../organisms/Sidebar';
import Footer from '../organisms/Footer';

const DashboardTemplate = ({ children }) => {
  return (
    &lt;div className="dashboard-template"&gt;
      &lt;Header /&gt;
      &lt;div className="main-content"&gt;
        &lt;Sidebar /&gt;
        &lt;main className="content-area"&gt;
          {children}
        &lt;/main&gt;
      &lt;/div&gt;
      &lt;Footer /&gt;
    &lt;/div&gt;
  );
};

export default DashboardTemplate;</code></pre>
              </div>
            </div>
          </div>

          <div class="level">
            <div class="level-header">
              <div class="level-number">5</div>
              <div class="level-title">
                <h3>页面 (Pages)</h3>
                <p>最终呈现的界面</p>
              </div>
            </div>
            <div class="level-content">
              <div class="description">
                <p>页面是模板的具体实例，包含真实内容和数据。</p>
                <p>关注最终用户看到的完整界面，可能包含特定状态（加载、错误等）。</p>
              </div>

              <div class="examples">
                <h4>示例页面：</h4>
                <div class="example-page">
                  <div class="page-header">网站标题</div>
                  <div class="page-main">
                    <div class="page-sidebar">导航菜单</div>
                    <div class="page-content">
                      <div class="product-list">
                        <div class="product">产品卡片</div>
                        <div class="product">产品卡片</div>
                        <div class="product">产品卡片</div>
                      </div>
                    </div>
                  </div>
                  <div class="page-footer">版权信息</div>
                </div>
              </div>

              <div class="code-sample">
                <h4>代码实现：</h4>
                <pre><code>// ProductListPage.jsx - 页面组件
import React, { useEffect, useState } from 'react';
import DashboardTemplate from '../templates/DashboardTemplate';
import ProductList from '../organisms/ProductList';
import Loader from '../atoms/Loader';
import ErrorMessage from '../molecules/ErrorMessage';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('无法加载产品列表');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    &lt;DashboardTemplate&gt;
      {loading ? (
        &lt;Loader /&gt;
      ) : error ? (
        &lt;ErrorMessage message={error} /&gt;
      ) : (
        &lt;ProductList products={products} /&gt;
      )}
    &lt;/DashboardTemplate&gt;
  );
};

export default ProductListPage;</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="implementation-section">
        <div class="section-header">
          <i class="icon fas fa-code"></i>
          <h2>项目实现指南</h2>
        </div>

        <div class="implementation-guide">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>项目结构组织</h3>
              <p>按照 Atomic Design 层次组织组件目录</p>

              <div class="folder-structure">
                <pre>src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.stories.js
│   │   │   └── Button.test.js
│   │   ├── Input/
│   │   └── ...
│   ├── molecules/
│   │   ├── SearchForm/
│   │   └── ...
│   ├── organisms/
│   │   ├── Header/
│   │   └── ...
│   ├── templates/
│   │   ├── DashboardTemplate/
│   │   └── ...
│   └── pages/
│       ├── HomePage/
│       └── ...
├── App.js
└── index.js</pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>设计系统集成</h3>
              <p>创建全局设计系统以确保一致性</p>

              <div class="design-system">
                <div class="design-token">
                  <h4>设计令牌 (Design Tokens)</h4>
                  <pre>// tokens.js
export const colors = {
  primary: '#4361ee',
  secondary: '#3f37c9',
  success: '#4cc9f0',
  danger: '#f72585',
  warning: '#f8961e',
  light: '#f8f9fa',
  dark: '#212529',
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
};

export const typography = {
  fontFamily: "'Inter', sans-serif",
  fontSize: {
    sm: '0.875rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
  },
};</pre>
                </div>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>文档与测试</h3>
              <p>使用 Storybook 和测试工具确保组件质量</p>

              <div class="tools">
                <div class="tool">
                  <div class="tool-icon">
                    <i class="fab fa-react"></i>
                  </div>
                  <h4>Storybook</h4>
                  <p>可视化组件库，独立开发组件</p>
                </div>

                <div class="tool">
                  <div class="tool-icon">
                    <i class="fas fa-vial"></i>
                  </div>
                  <h4>Jest/Testing Library</h4>
                  <p>组件单元测试和集成测试</p>
                </div>

                <div class="tool">
                  <div class="tool-icon">
                    <i class="fas fa-sync-alt"></i>
                  </div>
                  <h4>Visual Regression</h4>
                  <p>视觉回归测试确保UI一致性</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="usecases-section">
        <div class="section-header">
          <i class="icon fas fa-check-circle"></i>
          <h2>适用场景</h2>
        </div>

        <div class="usecases">
          <div class="usecase">
            <div class="usecase-icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <h3>电子商务平台</h3>
            <p>高度可复用的产品组件和布局</p>
          </div>

          <div class="usecase">
            <div class="usecase-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3>数据分析仪表盘</h3>
            <p>标准化的数据可视化组件</p>
          </div>

          <div class="usecase">
            <div class="usecase-icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <h3>跨平台应用</h3>
            <p>一致的设计语言适配多平台</p>
          </div>

          <div class="usecase">
            <div class="usecase-icon">
              <i class="fas fa-users"></i>
            </div>
            <h3>大型团队项目</h3>
            <p>清晰的组件边界和职责划分</p>
          </div>
        </div>

        <div class="adoption-tips">
          <h3>成功实施的关键</h3>
          <ul>
            <li><i class="fas fa-lightbulb"></i> 从设计阶段就采用原子设计思想</li>
            <li><i class="fas fa-users"></i> 设计师与开发者紧密协作</li>
            <li><i class="fas fa-book"></i> 建立完善的设计系统文档</li>
            <li><i class="fas fa-sync-alt"></i> 定期重构和优化组件库</li>
            <li><i class="fas fa-clipboard-check"></i> 严格执行组件质量标准</li>
          </ul>
        </div>
      </section>

      <section class="resources-section">
        <div class="section-header">
          <i class="icon fas fa-book-open"></i>
          <h2>学习资源</h2>
        </div>

        <div class="resources">
          <div class="resource">
            <div class="resource-icon">
              <i class="fas fa-globe"></i>
            </div>
            <h3>官方资源</h3>
            <ul>
              <li><a href="#">Atomic Design by Brad Frost</a></li>
              <li><a href="#">React官方文档</a></li>
              <li><a href="#">Storybook官方文档</a></li>
            </ul>
          </div>

          <div class="resource">
            <div class="resource-icon">
              <i class="fab fa-github"></i>
            </div>
            <h3>开源项目</h3>
            <ul>
              <li><a href="#">Material-UI</a> - 基于Atomic Design的UI库</li>
              <li><a href="#">Chakra UI</a> - 模块化组件库</li>
              <li><a href="#">Atomic Design React Boilerplate</a></li>
            </ul>
          </div>

          <div class="resource">
            <div class="resource-icon">
              <i class="fas fa-tools"></i>
            </div>
            <h3>工具推荐</h3>
            <ul>
              <li><a href="#">Storybook</a> - 组件开发环境</li>
              <li><a href="#">Figma</a> - 设计原子组件</li>
              <li><a href="#">Zeroheight</a> - 设计系统文档</li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>© 2023 React Atomic Design指南 | 构建可扩展的设计系统</p>
      <div class="links">
        <a href="#"><i class="fab fa-react"></i> React文档</a>
        <a href="#"><i class="fas fa-book"></i> Atomic Design书籍</a>
        <a href="#"><i class="fab fa-github"></i> 示例项目</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例响应式数据
const activeLevel = ref(0);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

// 配色方案
@primary: #4361ee;
@secondary: #3f37c9;
@accent: #4cc9f0;
@success: #4ade80;
@warning: #facc15;
@background: #f8f9fa;
@card-bg: #ffffff;
@text: #2c3e50;
@text-light: #7f8c8d;
@border: #eaecef;
@atom: #4cc9f0;
@molecule: #4361ee;
@organism: #3a0ca3;
@template: #7209b7;
@page: #f72585;

.atomic-design-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: @text;
  background-color: @background;
  min-height: 100vh;

  .header {
    text-align: center;
    padding: 60px 20px 40px;
    margin-bottom: 30px;
    background: linear-gradient(135deg, @primary 0%, darken(@primary, 15%) 100%);
    color: white;
    border-radius: 0 0 20px 20px;
    position: relative;
    overflow: hidden;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.3rem;
      opacity: 0.9;
      font-weight: 300;
      max-width: 700px;
      margin: 0 auto 25px;
    }

    .atomic-visual {
      margin-top: 40px;

      .level {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        flex-wrap: wrap;

        .level-item {
          width: 120px;
          height: 120px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

          &.atom {
            border-top: 4px solid @atom;
          }

          &.molecule {
            border-top: 4px solid @molecule;
          }

          &.organism {
            border-top: 4px solid @organism;
          }

          &.template {
            border-top: 4px solid @template;
          }

          &.page {
            border-top: 4px solid @page;
          }

          .particle {
            width: 20px;
            height: 20px;
            background: @atom;
            border-radius: 50%;
            margin: 5px;
          }

          .molecule {
            display: flex;
            margin: 5px;

            .particle {
              background: @molecule;
            }
          }

          .organism {
            display: flex;
            flex-wrap: wrap;
            width: 70px;
            justify-content: center;

            .molecule {
              margin: 2px;
            }
          }

          .template {
            width: 80px;
            height: 60px;
            border: 2px dashed @template;
            position: relative;

            .organism {
              position: absolute;
              top: 5px;
              left: 5px;
              width: 30px;
              height: 20px;
              border: 1px solid @organism;
            }

            .placeholder {
              position: absolute;
              bottom: 5px;
              right: 5px;
              width: 40px;
              height: 20px;
              background: #f0f0f0;
            }
          }

          .page {
            width: 80px;
            height: 60px;
            border: 2px solid @page;
            position: relative;

            .template {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border: none;
            }

            .content {
              position: absolute;
              top: 30px;
              left: 10px;
              width: 30px;
              height: 20px;
              background: @success;
            }
          }

          .label {
            position: absolute;
            bottom: 10px;
            font-size: 0.9rem;
            font-weight: 500;
          }
        }

        .level-arrow {
          font-size: 1.5rem;
          color: fade(white, 70%);
          font-weight: bold;
        }
      }
    }
  }

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 10px;
    border-bottom: 2px solid @border;

    h2 {
      font-size: 1.8rem;
      color: @text;
      margin: 0;
    }

    .icon {
      margin-right: 12px;
      color: @primary;
      font-size: 1.5rem;
    }
  }

  .overview-section {
    .card {
      background: @card-bg;
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
      margin-bottom: 40px;
    }

    .intro {
      p {
        font-size: 1.1rem;
        line-height: 1.7;
        margin-bottom: 30px;
      }

      .levels {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
      }

      .level-card {
        text-align: center;
        padding: 25px 20px;
        border-radius: 12px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        &.atom {
          border-top: 4px solid @atom;
        }

        &.molecule {
          border-top: 4px solid @molecule;
        }

        &.organism {
          border-top: 4px solid @organism;
        }

        &.template {
          border-top: 4px solid @template;
        }

        &.page {
          border-top: 4px solid @page;
        }

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .level-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 15px;
          background: fade(@primary, 10%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;

          &.atom {
            color: @atom;
          }

          &.molecule {
            color: @molecule;
          }

          &.organism {
            color: @organism;
          }

          &.template {
            color: @template;
          }

          &.page {
            color: @page;
          }
        }

        h3 {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: @text;
        }

        p {
          margin: 0;
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }

    .benefits {
      background: fade(@success, 8%);
      border-radius: 12px;
      padding: 25px;
      border-left: 4px solid @success;

      h3 {
        font-size: 1.3rem;
        margin-top: 0;
        margin-bottom: 15px;
        color: darken(@success, 20%);
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 12px;
          display: flex;
          align-items: center;

          i {
            margin-right: 10px;
            font-size: 1.2rem;
            color: @success;
          }
        }
      }
    }
  }

  .levels-section {
    .level-details {
      .level {
        background: @card-bg;
        border-radius: 16px;
        padding: 25px;
        margin-bottom: 30px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        position: relative;

        &:last-child {
          margin-bottom: 0;
        }

        .level-header {
          display: flex;
          align-items: center;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid @border;

          .level-number {
            width: 40px;
            height: 40px;
            background: @primary;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.2rem;
            margin-right: 15px;
          }

          .level-title {
            h3 {
              font-size: 1.5rem;
              margin: 0 0 5px;
              color: @text;
            }

            p {
              margin: 0;
              color: @text-light;
            }
          }
        }

        .level-content {
          .description {
            p {
              color: @text-light;
              line-height: 1.7;
              margin-bottom: 20px;
            }
          }

          .examples {
            margin-bottom: 25px;

            h4 {
              font-size: 1.1rem;
              margin-bottom: 15px;
              color: @text;
            }

            .example-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 20px;
            }

            .example {
              text-align: center;

              .example-visual {
                height: 100px;
                border: 1px solid @border;
                border-radius: 8px;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f8f9fa;
                overflow: hidden;

                &.button {
                  width: 80px;
                  height: 35px;
                  background: @primary;
                  color: white;
                  margin: 0 auto;
                }

                &.input {
                  width: 150px;
                  height: 35px;
                  border: 1px solid @border;
                  background: white;
                  color: @text-light;
                  margin: 0 auto;
                }

                &.label {
                  width: 60px;
                  height: 25px;
                  background: #f0f0f0;
                  margin: 0 auto;
                }

                &.icon {
                  width: 40px;
                  height: 40px;
                  font-size: 1.5rem;
                  color: @primary;
                }

                &.search {
                  display: flex;
                  padding: 10px;

                  .input {
                    flex: 1;
                    height: 30px;
                    margin-right: 5px;
                  }

                  .button {
                    width: 60px;
                    height: 30px;
                  }
                }

                &.card-header {
                  display: flex;
                  padding: 10px;

                  .avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: @accent;
                    margin-right: 10px;
                  }

                  .text {
                    text-align: left;

                    .title {
                      font-weight: bold;
                    }

                    .subtitle {
                      font-size: 0.8rem;
                      color: @text-light;
                    }
                  }
                }

                &.form-field {
                  display: flex;
                  flex-direction: column;
                  padding: 10px;

                  .label {
                    text-align: left;
                    margin-bottom: 5px;
                  }

                  .input {
                    width: 100%;
                    height: 30px;
                  }

                  .error {
                    color: #e53e3e;
                    font-size: 0.8rem;
                    text-align: left;
                    margin-top: 5px;
                  }
                }

                &.header {
                  height: 60px;
                  display: flex;
                  align-items: center;
                  padding: 0 10px;

                  .logo {
                    width: 60px;
                    font-weight: bold;
                  }

                  .nav {
                    flex: 1;
                    text-align: center;
                    font-size: 0.8rem;
                  }

                  .search {
                    width: 150px;
                    height: 30px;
                    border: 1px solid @border;
                    border-radius: 4px;
                    margin: 0 10px;
                  }

                  .user {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: @accent;
                  }
                }

                &.product-list {
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 10px;
                  padding: 10px;

                  .product {
                    height: 80px;
                    border: 1px solid @border;
                    border-radius: 4px;
                    background: #f8f9fa;
                  }
                }

                &.footer {
                  height: 60px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  padding: 5px;

                  .links {
                    margin-bottom: 5px;
                  }

                  .copyright {
                    font-size: 0.8rem;
                    color: @text-light;
                  }
                }

                &.template {
                  height: 200px;
                  display: flex;
                  flex-direction: column;

                  .template-header {
                    height: 50px;
                    background: fade(@primary, 10%);
                    border-bottom: 1px solid @border;
                  }

                  .template-main {
                    flex: 1;
                    display: flex;

                    .template-sidebar {
                      width: 100px;
                      background: #f8f9fa;
                      border-right: 1px solid @border;
                    }

                    .template-content {
                      flex: 1;
                      padding: 10px;

                      .placeholder {
                        height: 40px;
                        background: #f8f9fa;
                        margin-bottom: 10px;
                        border: 1px dashed @border;
                      }
                    }
                  }

                  .template-footer {
                    height: 40px;
                    background: fade(@primary, 10%);
                    border-top: 1px solid @border;
                  }
                }

                &.page {
                  height: 250px;
                  display: flex;
                  flex-direction: column;

                  .page-header {
                    height: 50px;
                    background: fade(@primary, 15%);
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    padding-left: 20px;
                  }

                  .page-main {
                    flex: 1;
                    display: flex;

                    .page-sidebar {
                      width: 100px;
                      background: #f8f9fa;
                      border-right: 1px solid @border;
                    }

                    .page-content {
                      flex: 1;
                      padding: 10px;

                      .product-list {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 10px;

                        .product {
                          height: 80px;
                          background: #f8f9fa;
                          border: 1px solid @border;
                          border-radius: 4px;
                        }
                      }
                    }
                  }

                  .page-footer {
                    height: 40px;
                    background: fade(@primary, 10%);
                    border-top: 1px solid @border;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    color: @text-light;
                  }
                }
              }

              .example-name {
                font-weight: 500;
                font-size: 0.95rem;
              }
            }
          }

          .code-sample {
            h4 {
              font-size: 1.1rem;
              margin-bottom: 15px;
              color: @text;
            }

            pre {
              background: #f6f8fa;
              border-radius: 8px;
              padding: 20px;
              overflow-x: auto;
              font-family: 'Fira Code', monospace;
              border: 1px solid @border;
              font-size: 0.9rem;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }

  .implementation-section {
    .implementation-guide {
      background: @card-bg;
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
      margin-bottom: 40px;
    }

    .step {
      display: flex;
      margin-bottom: 30px;
      padding-bottom: 30px;
      border-bottom: 1px solid @border;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      .step-number {
        width: 40px;
        height: 40px;
        background: @primary;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        flex-shrink: 0;
        margin-right: 20px;
      }

      .step-content {
        h3 {
          font-size: 1.4rem;
          margin-top: 0;
          margin-bottom: 15px;
          color: @text;
        }

        p {
          color: @text-light;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .folder-structure {
          background: #f6f8fa;
          border-radius: 8px;
          padding: 20px;
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          border: 1px solid @border;
          overflow-x: auto;
        }

        .design-system {
          .design-token {
            pre {
              background: #f6f8fa;
              border-radius: 8px;
              padding: 20px;
              font-family: 'Fira Code', monospace;
              font-size: 0.85rem;
              border: 1px solid @border;
              overflow-x: auto;
            }
          }
        }

        .tools {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;

          .tool {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 12px;
            transition: all 0.3s ease;

            &:hover {
              transform: translateY(-5px);
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            }

            .tool-icon {
              width: 60px;
              height: 60px;
              margin: 0 auto 15px;
              background: fade(@primary, 10%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.8rem;
              color: @primary;
            }

            h4 {
              margin: 0 0 10px;
              color: @text;
            }

            p {
              margin: 0;
              color: @text-light;
              font-size: 0.95rem;
            }
          }
        }
      }
    }
  }

  .usecases-section {
    .usecases {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;

      .usecase {
        text-align: center;
        padding: 25px 20px;
        background: @card-bg;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
        border-top: 3px solid @primary;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .usecase-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 15px;
          background: fade(@primary, 10%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: @primary;
        }

        h3 {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: @text;
        }

        p {
          margin: 0;
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }

    .adoption-tips {
      background: fade(@warning, 8%);
      border-radius: 12px;
      padding: 25px;
      border-left: 4px solid @warning;

      h3 {
        font-size: 1.3rem;
        margin-top: 0;
        margin-bottom: 15px;
        color: darken(@warning, 20%);
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 12px;
          display: flex;
          align-items: flex-start;

          i {
            margin-right: 10px;
            font-size: 1.2rem;
            color: @warning;
            min-width: 24px;
          }
        }
      }
    }
  }

  .resources-section {
    .resources {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
      margin-bottom: 40px;
    }

    .resource {
      background: @card-bg;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      border-top: 4px solid @primary;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }

      .resource-icon {
        width: 60px;
        height: 60px;
        margin: 0 auto 15px;
        background: fade(@primary, 10%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        color: @primary;
      }

      h3 {
        text-align: center;
        margin-top: 0;
        margin-bottom: 20px;
        color: @text;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 10px;

          a {
            color: @primary;
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 60px;
    padding-top: 30px;
    color: @text-light;
    font-size: 0.9rem;
    border-top: 1px solid @border;

    .links {
      margin-top: 15px;

      a {
        color: @primary;
        text-decoration: none;
        margin: 0 15px;
        display: inline-block;
        font-weight: 500;

        i {
          margin-right: 5px;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 40px 20px 30px !important;

    h1 {
      font-size: 2rem !important;
    }

    .subtitle {
      font-size: 1.1rem !important;
    }

    .atomic-visual {
      .level {
        gap: 10px !important;

        .level-item {
          width: 100px !important;
          height: 100px !important;
        }
      }
    }
  }

  .section-header {
    h2 {
      font-size: 1.5rem !important;
    }
  }

  .level-details {
    .level {
      padding: 20px !important;
    }
  }
}
</style>
