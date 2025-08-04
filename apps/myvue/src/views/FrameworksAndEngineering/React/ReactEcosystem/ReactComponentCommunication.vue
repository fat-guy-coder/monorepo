<template>
  <div class="react-router-container">
    <header class="header">
      <div class="header-content">
        <h1>React Router 路由管理</h1>
        <p class="subtitle">构建单页面应用的导航核心</p>
        <div class="router-visual">
          <div class="route">
            <div class="route-icon">
              <i class="fas fa-home"></i>
            </div>
            <div class="route-name">首页</div>
          </div>
          <div class="route-arrow">→</div>
          <div class="route">
            <div class="route-icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <div class="route-name">购物车</div>
          </div>
          <div class="route-arrow">→</div>
          <div class="route">
            <div class="route-icon">
              <i class="fas fa-user"></i>
            </div>
            <div class="route-name">个人中心</div>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="overview-section">
        <div class="section-header">
          <i class="icon fas fa-map-signs"></i>
          <h2>React Router 概述</h2>
        </div>

        <div class="concepts">
          <div class="concept-card">
            <div class="concept-icon">
              <i class="fas fa-sync-alt"></i>
            </div>
            <h3>单页面应用(SPA)</h3>
            <p>无需重新加载页面即可导航不同视图</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon">
              <i class="fas fa-route"></i>
            </div>
            <h3>声明式路由</h3>
            <p>使用JSX定义应用的路由结构</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon">
              <i class="fas fa-code-branch"></i>
            </div>
            <h3>动态路由匹配</h3>
            <p>根据URL参数渲染不同组件</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h3>路由守卫</h3>
            <p>控制访问权限和导航流程</p>
          </div>
        </div>

        <div class="version-comparison">
          <h3>版本对比：React Router v5 vs v6</h3>
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>v5</th>
                <th>v6</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>路由定义</td>
                <td>Switch组件</td>
                <td>Routes组件</td>
              </tr>
              <tr>
                <td>嵌套路由</td>
                <td>复杂配置</td>
                <td>简化配置</td>
              </tr>
              <tr>
                <td>路由匹配</td>
                <td>顺序敏感</td>
                <td>最佳匹配</td>
              </tr>
              <tr>
                <td>路由钩子</td>
                <td>withRouter HOC</td>
                <td>useNavigate等钩子</td>
              </tr>
              <tr>
                <td>相对路径</td>
                <td>不支持</td>
                <td>支持</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="installation-section">
        <div class="section-header">
          <i class="icon fas fa-download"></i>
          <h2>安装与基本设置</h2>
        </div>

        <div class="setup-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>安装依赖</h3>
              <pre><code>npm install react-router-dom@6</code></pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>包裹应用</h3>
              <pre><code>import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  &lt;BrowserRouter&gt;
    &lt;App /&gt;
  &lt;/BrowserRouter&gt;,
  document.getElementById('root')
);</code></pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>定义路由</h3>
              <pre><code>import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    &lt;Routes&gt;
      &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
      &lt;Route path="/about" element={&lt;About /&gt;} /&gt;
      &lt;Route path="/products" element={&lt;Products /&gt;} /&gt;
    &lt;/Routes&gt;
  );
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="basic-usage-section">
        <div class="section-header">
          <i class="icon fas fa-code"></i>
          <h2>基本使用</h2>
        </div>

        <div class="usage-grid">
          <div class="usage-card">
            <div class="usage-header">
              <div class="usage-icon">
                <i class="fas fa-link"></i>
              </div>
              <h3>导航链接</h3>
            </div>
            <div class="usage-content">
              <pre><code>import { Link } from 'react-router-dom';

function Navbar() {
  return (
    &lt;nav&gt;
      &lt;Link to="/"&gt;首页&lt;/Link&gt;
      &lt;Link to="/about"&gt;关于&lt;/Link&gt;
      &lt;Link to="/products"&gt;产品&lt;/Link&gt;
    &lt;/nav&gt;
  );
}</code></pre>
              <div class="visual">
                <div class="nav">
                  <a class="nav-link active">首页</a>
                  <a class="nav-link">关于</a>
                  <a class="nav-link">产品</a>
                </div>
              </div>
            </div>
          </div>

          <div class="usage-card">
            <div class="usage-header">
              <div class="usage-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <h3>路由参数</h3>
            </div>
            <div class="usage-content">
              <pre><code>// 路由定义
&lt;Route path="/product/:id" element={&lt;ProductDetail /&gt;} /&gt;

// 组件中使用
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  // 根据id获取产品数据...
}</code></pre>
              <div class="visual">
                <div class="url-example">https://example.com/product/123</div>
                <div class="param-display">id = 123</div>
              </div>
            </div>
          </div>

          <div class="usage-card">
            <div class="usage-header">
              <div class="usage-icon">
                <i class="fas fa-sitemap"></i>
              </div>
              <h3>嵌套路由</h3>
            </div>
            <div class="usage-content">
              <pre><code>// 父路由
&lt;Route path="/dashboard" element={&lt;Dashboard /&gt;}&gt;
  &lt;Route index element={&lt;DashboardHome /&gt;} /&gt;
  &lt;Route path="profile" element={&lt;Profile /&gt;} /&gt;
  &lt;Route path="settings" element={&lt;Settings /&gt;} /&gt;
&lt;/Route&gt;

// Dashboard组件
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    &lt;div&gt;
      &lt;DashboardSidebar /&gt;
      &lt;div className="content"&gt;
        &lt;Outlet /&gt; {/* 子路由在此渲染 */}
      &lt;/div&gt;
    &lt;/div&gt;
  );
}</code></pre>
            </div>
          </div>

          <div class="usage-card">
            <div class="usage-header">
              <div class="usage-icon">
                <i class="fas fa-directions"></i>
              </div>
              <h3>编程式导航</h3>
            </div>
            <div class="usage-content">
              <pre><code>import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 登录逻辑...
    navigate('/dashboard'); // 导航到仪表盘
  };

  return (
    &lt;form onSubmit={handleLogin}&gt;
      {/* 表单内容 */}
      &lt;button type="submit"&gt;登录&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
              <div class="visual">
                <div class="nav-flow">
                  <div class="page">登录页</div>
                  <div class="arrow">→</div>
                  <div class="page">仪表盘</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="advanced-section">
        <div class="section-header">
          <i class="icon fas fa-rocket"></i>
          <h2>高级功能</h2>
        </div>

        <div class="advanced-features">
          <div class="feature">
            <div class="feature-header">
              <div class="feature-icon">
                <i class="fas fa-user-lock"></i>
              </div>
              <h3>路由守卫</h3>
            </div>
            <div class="feature-content">
              <pre><code>// 受保护路由组件
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // 重定向到登录页，并保存当前路径
    return &lt;Navigate to="/login" state=&#123;&#123;from: location &#125;&#125; replace /&gt;;
  }

  return children;
}

// 使用
&lt;Route
  path="/dashboard"
  element={
    &lt;ProtectedRoute&gt;
      &lt;Dashboard /&gt;
    &lt;/ProtectedRoute&gt;
  }
/&gt;</code></pre>
            </div>
          </div>

          <div class="feature">
            <div class="feature-header">
              <div class="feature-icon">
                <i class="fas fa-spinner"></i>
              </div>
              <h3>懒加载路由</h3>
            </div>
            <div class="feature-content">
              <pre><code>import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    &lt;Suspense fallback={&lt;LoadingSpinner /&gt;}&gt;
      &lt;Routes&gt;
        &lt;Route path="/dashboard" element={&lt;Dashboard /&gt;} /&gt;
        &lt;Route path="/settings" element={&lt;Settings /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/Suspense&gt;
  );
}</code></pre>
            </div>
          </div>

          <div class="feature">
            <div class="feature-header">
              <div class="feature-icon">
                <i class="fas fa-search"></i>
              </div>
              <h3>URL查询参数</h3>
            </div>
            <div class="feature-content">
              <pre><code>import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');

  // 根据参数过滤和排序产品

  const updateCategory = (newCategory) => {
    setSearchParams({ category: newCategory, sort });
  };

  return (
    &lt;div&gt;
      &lt;CategoryFilter onChange={updateCategory} /&gt;
      {/* 产品列表 */}
    &lt;/div&gt;
  );
}</code></pre>
            </div>
          </div>

          <div class="feature">
            <div class="feature-header">
              <div class="feature-icon">
                <i class="fas fa-bread-slice"></i>
              </div>
              <h3>面包屑导航</h3>
            </div>
            <div class="feature-content">
              <pre><code>import { useLocation, Link } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    &lt;div className="breadcrumbs"&gt;
      &lt;Link to="/"&gt;首页&lt;/Link&gt;
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          &lt;span key={name}&gt; / {name}&lt;/span&gt;
        ) : (
          &lt;Link key={name} to={routeTo}&gt; / {name}&lt;/Link&gt;
        );
      })}
    &lt;/div&gt;
  );
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices-section">
        <div class="section-header">
          <i class="icon fas fa-star"></i>
          <h2>最佳实践</h2>
        </div>

        <div class="practices">
          <div class="practice">
            <div class="practice-number">1</div>
            <div class="practice-content">
              <h3>集中式路由配置</h3>
              <p>创建单独的路由配置文件，便于管理</p>
              <pre><code>// routes.js
const routes = [
  {
    path: '/',
    element: &lt;Home /&gt;,
  },
  {
    path: '/about',
    element: &lt;About /&gt;,
  },
  {
    path: '/products',
    element: &lt;Products /&gt;,
    children: [
      { path: ':id', element: &lt;ProductDetail /&gt; }
    ]
  }
];

export default routes;

// App.js
import routes from './routes';
import { useRoutes } from 'react-router-dom';

function App() {
  const element = useRoutes(routes);
  return element;
}</code></pre>
            </div>
          </div>

          <div class="practice">
            <div class="practice-number">2</div>
            <div class="practice-content">
              <h3>404页面处理</h3>
              <p>添加通配符路由处理未匹配的路径</p>
              <pre><code>&lt;Routes&gt;
  &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
  &lt;Route path="/about" element={&lt;About /&gt;} /&gt;
  &lt;Route path="*" element={&lt;NotFound /&gt;} /&gt;
&lt;/Routes&gt;</code></pre>
            </div>
          </div>

          <div class="practice">
            <div class="practice-number">3</div>
            <div class="practice-content">
              <h3>滚动恢复</h3>
              <p>确保导航后页面滚动到顶部</p>
              <pre><code>import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// 在根组件中使用
&lt;BrowserRouter&gt;
  &lt;ScrollToTop /&gt;
  &lt;App /&gt;
&lt;/BrowserRouter&gt;</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="section-header">
          <i class="icon fas fa-laptop-code"></i>
          <h2>路由演示</h2>
        </div>

        <div class="router-demo">
          <div class="demo-navbar">
            <button v-for="(route, index) in demoRoutes" :key="index" :class="{ active: activeRoute === index }"
              @click="activeRoute = index">
              <i :class="route.icon"></i>
              {{ route.name }}
            </button>
          </div>

          <div class="demo-content">
            <div v-if="activeRoute === 0" class="page home">
              <h3>首页</h3>
              <p>欢迎来到我们的网站！这是应用的主页。</p>
              <div class="products-preview">
                <div class="product" v-for="i in 3" :key="i">
                  <div class="product-image"></div>
                  <div class="product-name">产品 {{ i }}</div>
                  <button @click="activeRoute = 1">查看详情</button>
                </div>
              </div>
            </div>

            <div v-if="activeRoute === 1" class="page products">
              <h3>产品列表</h3>
              <div class="product-list">
                <div class="product" v-for="product in products" :key="product.id" @click="selectProduct(product)">
                  <div class="product-image"></div>
                  <div class="product-name">{{ product.name }}</div>
                </div>
              </div>

              <div v-if="selectedProduct" class="product-detail">
                <h4>{{ selectedProduct.name }}</h4>
                <p>{{ selectedProduct.description }}</p>
                <p>价格: ${{ selectedProduct.price }}</p>
                <button @click="activeRoute = 2">添加到购物车</button>
              </div>
            </div>

            <div v-if="activeRoute === 2" class="page cart">
              <h3>购物车</h3>
              <div v-if="cartItems.length === 0" class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>您的购物车是空的</p>
                <button @click="activeRoute = 1">继续购物</button>
              </div>

              <div v-else>
                <div class="cart-items">
                  <div class="cart-item" v-for="item in cartItems" :key="item.id">
                    <div class="item-info">
                      <div class="item-name">{{ item.name }}</div>
                      <div class="item-price">${{ item.price }}</div>
                    </div>
                    <div class="item-quantity">数量: {{ item.quantity }}</div>
                  </div>
                </div>
                <div class="cart-total">
                  总计: ${{ cartTotal }}
                </div>
                <button @click="activeRoute = 3">结算</button>
              </div>
            </div>

            <div v-if="activeRoute === 3" class="page profile">
              <h3>个人中心</h3>
              <div class="user-info">
                <div class="avatar"></div>
                <div class="details">
                  <div>用户名: user123</div>
                  <div>邮箱: user@example.com</div>
                  <div>会员等级: 高级会员</div>
                </div>
              </div>
              <div class="order-history">
                <h4>最近订单</h4>
                <div class="order" v-for="i in 2" :key="i">
                  <div class="order-id">订单号: ORD{{ 1000 + i }}</div>
                  <div class="order-date">日期: 2023-06-{{ 10 + i }}</div>
                  <div class="order-total">总计: ${{ 99.99 * i }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>© 2023 React Router 指南 | 构建现代化单页面应用</p>
      <div class="links">
        <a href="#"><i class="fab fa-react"></i> React Router 文档</a>
        <a href="#"><i class="fab fa-github"></i> 示例代码</a>
        <a href="#"><i class="fas fa-book"></i> 高级路由模式</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const demoRoutes = [
  { name: '首页', icon: 'fas fa-home' },
  { name: '产品', icon: 'fas fa-shopping-bag' },
  { name: '购物车', icon: 'fas fa-shopping-cart' },
  { name: '个人中心', icon: 'fas fa-user' }
];

const activeRoute = ref(0);

const products = ref([
  { id: 1, name: '无线耳机', description: '高音质无线蓝牙耳机', price: 99.99 },
  { id: 2, name: '智能手表', description: '多功能健康监测手表', price: 199.99 },
  { id: 3, name: '便携充电宝', description: '10000mAh 快充充电宝', price: 49.99 }
]);

const selectedProduct = ref<any>(null);
const cartItems = ref<any[]>([]);

function selectProduct(product: any) {
  selectedProduct.value = product;
}

function addToCart() {
  if (selectedProduct.value) {
    const existingItem = cartItems.value.find(item => item.id === selectedProduct.value.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.value.push({
        ...selectedProduct.value,
        quantity: 1
      });
    }

    activeRoute.value = 2;
  }
}

const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0).toFixed(2);
});

// 初始化演示数据
setTimeout(() => {
  cartItems.value = [
    {
      id: 1,
      name: '无线耳机',
      price: 99.99,
      quantity: 1
    }
  ];
}, 500);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

// 配色方案
@primary: #4361ee;
@secondary: #3f37c9;
@accent: #4cc9f0;
@background: #f8f9fa;
@card-bg: #ffffff;
@text: #2c3e50;
@text-light: #7f8c8d;
@border: #eaecef;
@success: #4ade80;
@warning: #facc15;

.react-router-container {
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

    .router-visual {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 30px;
      margin-top: 40px;

      .route {
        width: 120px;
        padding: 20px;
        background: fade(white, 15%);
        border-radius: 12px;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          background: fade(white, 25%);
        }

        .route-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        .route-name {
          font-weight: 500;
          font-size: 1.1rem;
        }
      }

      .route-arrow {
        font-size: 1.8rem;
        color: fade(white, 70%);
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
    .concepts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .concept-card {
      text-align: center;
      padding: 25px 20px;
      background: @card-bg;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      border-top: 4px solid @primary;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      }

      .concept-icon {
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

    .version-comparison {
      background: @card-bg;
      border-radius: 16px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

      h3 {
        font-size: 1.3rem;
        margin-top: 0;
        margin-bottom: 20px;
        color: @text;
      }

      table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid @border;
        }

        th {
          background: fade(@primary, 10%);
          font-weight: 600;
        }

        tr:hover {
          background: fade(@primary, 5%);
        }
      }
    }
  }

  .installation-section {
    .setup-steps {
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

        pre {
          background: #f6f8fa;
          border-radius: 8px;
          padding: 15px;
          overflow-x: auto;
          font-family: 'Fira Code', monospace;
          border: 1px solid @border;
          font-size: 0.95rem;
          line-height: 1.5;
        }
      }
    }
  }

  .basic-usage-section {
    .usage-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 25px;
      margin-bottom: 40px;
    }

    .usage-card {
      background: @card-bg;
      border-radius: 16px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }

      .usage-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .usage-icon {
          width: 50px;
          height: 50px;
          margin-right: 15px;
          background: fade(@primary, 15%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: @primary;
        }

        h3 {
          margin: 0;
          font-size: 1.4rem;
          color: @text;
        }
      }

      .usage-content {
        pre {
          background: #f6f8fa;
          border-radius: 8px;
          padding: 15px;
          overflow-x: auto;
          font-family: 'Fira Code', monospace;
          border: 1px solid @border;
          font-size: 0.9rem;
          margin-bottom: 15px;
        }

        .visual {
          margin-top: 15px;

          .nav {
            display: flex;
            gap: 15px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 8px;

            .nav-link {
              padding: 8px 15px;
              border-radius: 4px;
              cursor: pointer;

              &.active {
                background: @primary;
                color: white;
              }
            }
          }

          .url-example {
            font-family: 'Fira Code', monospace;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 4px;
            margin-bottom: 10px;
          }

          .param-display {
            padding: 8px;
            background: fade(@success, 15%);
            border-radius: 4px;
            font-family: 'Fira Code', monospace;
          }

          .nav-flow {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;

            .page {
              padding: 15px 25px;
              background: fade(@primary, 10%);
              border-radius: 8px;
            }

            .arrow {
              font-size: 1.5rem;
              color: @text-light;
            }
          }
        }
      }
    }
  }

  .advanced-section {
    .advanced-features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 25px;
      margin-bottom: 40px;
    }

    .feature {
      background: @card-bg;
      border-radius: 16px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }

      .feature-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .feature-icon {
          width: 50px;
          height: 50px;
          margin-right: 15px;
          background: fade(@primary, 15%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: @primary;
        }

        h3 {
          margin: 0;
          font-size: 1.4rem;
          color: @text;
        }
      }

      .feature-content {
        pre {
          background: #f6f8fa;
          border-radius: 8px;
          padding: 15px;
          overflow-x: auto;
          font-family: 'Fira Code', monospace;
          border: 1px solid @border;
          font-size: 0.9rem;
        }
      }
    }
  }

  .best-practices-section {
    .practices {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 25px;
      margin-bottom: 40px;
    }

    .practice {
      background: @card-bg;
      border-radius: 16px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }

      .practice-number {
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
        margin-bottom: 15px;
      }

      .practice-content {
        h3 {
          font-size: 1.3rem;
          margin-top: 0;
          margin-bottom: 15px;
          color: @text;
        }

        p {
          color: @text-light;
          line-height: 1.7;
          margin-bottom: 15px;
        }

        pre {
          background: #f6f8fa;
          border-radius: 8px;
          padding: 15px;
          overflow-x: auto;
          font-family: 'Fira Code', monospace;
          border: 1px solid @border;
          font-size: 0.9rem;
        }
      }
    }
  }

  .demo-section {
    .router-demo {
      background: @card-bg;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    }

    .demo-navbar {
      display: flex;
      background: #f8f9fa;
      border-bottom: 1px solid @border;

      button {
        flex: 1;
        padding: 15px;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        transition: all 0.2s ease;

        &.active {
          background: @primary;
          color: white;
        }

        &:hover:not(.active) {
          background: fade(@primary, 10%);
        }

        i {
          font-size: 1.2rem;
        }
      }
    }

    .demo-content {
      padding: 30px;
      min-height: 400px;

      .page {
        h3 {
          font-size: 1.8rem;
          margin-top: 0;
          margin-bottom: 20px;
          color: @text;
        }

        p {
          color: @text-light;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .products-preview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 30px;

          .product {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            transition: all 0.3s ease;

            &:hover {
              transform: translateY(-5px);
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            }

            .product-image {
              width: 100px;
              height: 100px;
              background: fade(@primary, 10%);
              border-radius: 8px;
              margin: 0 auto 15px;
            }

            .product-name {
              font-weight: 500;
              margin-bottom: 15px;
            }

            button {
              padding: 8px 15px;
              background: @primary;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              transition: background 0.2s ease;

              &:hover {
                background: darken(@primary, 10%);
              }
            }
          }
        }

        .product-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 30px;

          .product {
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
              background: fade(@primary, 10%);
              transform: translateY(-3px);
            }

            .product-image {
              width: 80px;
              height: 80px;
              background: fade(@primary, 15%);
              border-radius: 8px;
              margin: 0 auto 10px;
            }

            .product-name {
              text-align: center;
              font-weight: 500;
            }
          }
        }

        .product-detail {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin-top: 20px;

          h4 {
            margin-top: 0;
            margin-bottom: 15px;
          }

          button {
            padding: 10px 20px;
            background: @primary;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: background 0.2s ease;

            &:hover {
              background: darken(@primary, 10%);
            }
          }
        }

        .empty-cart {
          text-align: center;
          padding: 40px 20px;

          i {
            font-size: 3rem;
            color: fade(@text-light, 30%);
            margin-bottom: 20px;
          }

          p {
            margin-bottom: 20px;
          }

          button {
            padding: 10px 20px;
            background: @primary;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
          }
        }

        .cart-items {
          margin-bottom: 20px;

          .cart-item {
            display: flex;
            justify-content: space-between;
            padding: 15px;
            border-bottom: 1px solid @border;

            .item-info {
              .item-name {
                font-weight: 500;
              }

              .item-price {
                color: @text-light;
                font-size: 0.9rem;
              }
            }
          }
        }

        .cart-total {
          text-align: right;
          font-size: 1.2rem;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;

          .avatar {
            width: 80px;
            height: 80px;
            background: fade(@primary, 15%);
            border-radius: 50%;
          }

          .details {
            div {
              margin-bottom: 8px;
            }
          }
        }

        .order-history {
          .order {
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            margin-bottom: 15px;

            .order-id {
              font-weight: 500;
              margin-bottom: 5px;
            }

            .order-date,
            .order-total {
              color: @text-light;
              font-size: 0.9rem;
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

    .router-visual {
      flex-wrap: wrap;
      gap: 15px !important;

      .route {
        width: 100px !important;
        padding: 15px !important;
      }
    }
  }

  .section-header {
    h2 {
      font-size: 1.5rem !important;
    }
  }

  .demo-navbar {
    flex-wrap: wrap;

    button {
      flex: 1 0 50% !important;
      padding: 12px !important;
      font-size: 0.9rem !important;
    }
  }
}
</style>
