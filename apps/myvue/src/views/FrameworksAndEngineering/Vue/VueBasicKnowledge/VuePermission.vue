<template>
  <div class="permission-control-container">
    <!-- 标题和概述部分 -->
    <header>
      <h1>Vue 项目权限控制基础介绍</h1>
      <p class="overview">
        权限控制是现代 Web 应用的核心功能，用于确保用户只能访问其授权的资源。
        在 Vue 项目中，我们需要在接口、按钮、菜单和路由等多个层面实现细粒度的权限控制。
      </p>
    </header>

    <!-- 权限类型导航 -->
    <nav class="permission-nav">
      <button v-for="(type, index) in permissionTypes" :key="index" :class="{ active: activePermission === index }"
        @click="activePermission = index">
        {{ type.title }}
        <span class="badge">{{ type.badge }}</span>
      </button>
    </nav>

    <!-- 权限内容区域 -->
    <div class="permission-content">
      <!-- 接口权限 -->
      <section v-show="activePermission === 0" class="permission-section">
        <div class="section-header">
          <h2>接口权限控制</h2>
          <p>控制用户对后端 API 的访问权限，防止未授权访问</p>
        </div>

        <div class="card">
          <h3>实现方案</h3>
          <div class="implementation">
            <div class="strategy">
              <div class="strategy-card">
                <div class="icon">🔑</div>
                <h4>Token 验证</h4>
                <p>在每个请求中携带 JWT Token，后端验证权限</p>
              </div>
              <div class="strategy-card">
                <div class="icon">🚫</div>
                <h4>拦截未授权请求</h4>
                <p>在响应拦截器中处理 401/403 错误</p>
              </div>
            </div>
          </div>

          <div class="code-samples">
            <div class="code-sample">
              <h4>Axios 请求拦截器</h4>
              <pre><code>// src/utils/request.ts
import axios from 'axios';
import { getToken } from '@/utils/auth';

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加 token 到请求头
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // 处理未授权错误
    if (error.response.status === 401) {
      // 跳转到登录页
      router.push('/login');
    }
    if (error.response.status === 403) {
      // 显示权限不足提示
      ElMessage.error('您没有权限执行此操作');
    }
    return Promise.reject(error);
  }
);

export default service;</code></pre>
            </div>

            <div class="code-sample">
              <h4>API 权限验证示例</h4>
              <pre><code>// 删除用户 API
export function deleteUser(userId: number) {
  return request({
    url: `/users/${userId}`,
    method: 'delete',
    // 添加权限元数据
    meta: {
      permission: 'user:delete'
    }
  });
}

// 在组件中使用
import { deleteUser } from '@/api/user';

const handleDelete = async (userId: number) => {
  try {
    await deleteUser(userId);
    ElMessage.success('删除成功');
  } catch (error) {
    // 错误已在拦截器中处理
  }
};</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 按钮权限 -->
      <section v-show="activePermission === 1" class="permission-section">
        <div class="section-header">
          <h2>按钮权限控制</h2>
          <p>控制用户界面中按钮的显示和操作权限</p>
        </div>

        <div class="card">
          <h3>实现方案</h3>
          <div class="implementation">
            <div class="strategy">
              <div class="strategy-card">
                <div class="icon">🛡️</div>
                <h4>权限指令 v-permission</h4>
                <p>使用自定义指令控制按钮显示</p>
              </div>
              <div class="strategy-card">
                <div class="icon">🧩</div>
                <h4>权限组件 Permission</h4>
                <p>通过组件封装权限逻辑</p>
              </div>
              <div class="strategy-card">
                <div class="icon">🔌</div>
                <h4>权限函数 hasPermission</h4>
                <p>在逻辑中动态控制权限</p>
              </div>
            </div>
          </div>

          <div class="code-samples">
            <div class="code-sample">
              <h4>权限指令实现</h4>
              <pre><code>// src/directives/permission.ts
import { Directive } from 'vue';
import { useUserStore } from '@/stores/user';

export const permissionDirective: Directive = {
  mounted(el, binding) {
    const { value } = binding;
    const userStore = useUserStore();
    const permissions = userStore.permissions;

    if (value && !permissions.includes(value)) {
      el.parentNode?.removeChild(el);
    }
  }
};

// main.ts 中全局注册
import { permissionDirective } from '@/directives/permission';
app.directive('permission', permissionDirective);</code></pre>
            </div>

            <div class="code-sample">
              <h4>权限组件实现</h4>
              <pre><code>// src/components/Permission.vue
&lt;script setup lang="ts"&gt;
import { useUserStore } from '@/stores/user';

const props = defineProps({
  value: {
    type: [String, Array],
    required: true
  }
});

const userStore = useUserStore();
const hasPermission = () => {
  const permissions = userStore.permissions;
  if (Array.isArray(props.value)) {
    return props.value.some(permission =>
      permissions.includes(permission)
    );
  }
  return permissions.includes(props.value);
};
&lt;/script&gt;

&lt;template&gt;
  &lt;slot v-if="hasPermission()" /&gt;
&lt;/template&gt;</code></pre>
            </div>

            <div class="demo">
              <h4>按钮权限演示</h4>
              <div class="button-group">
                <el-button v-permission="'user:create'">创建用户</el-button>
                <el-button v-permission="'user:edit'">编辑用户</el-button>
                <el-button v-permission="'user:delete'">删除用户</el-button>
                <el-button v-permission="['admin', 'super-admin']">管理员操作</el-button>
              </div>
              <div class="current-permissions">
                当前用户权限: {{ currentPermissions.join(', ') }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 菜单权限 -->
      <section v-show="activePermission === 2" class="permission-section">
        <div class="section-header">
          <h2>菜单权限控制</h2>
          <p>根据用户权限动态生成可访问的菜单</p>
        </div>

        <div class="card">
          <h3>实现方案</h3>
          <div class="implementation">
            <div class="strategy">
              <div class="strategy-card">
                <div class="icon">📋</div>
                <h4>动态路由表</h4>
                <p>根据权限过滤路由配置</p>
              </div>
              <div class="strategy-card">
                <div class="icon">🔄</div>
                <h4>后端返回菜单</h4>
                <p>由后端提供用户可访问的菜单结构</p>
              </div>
            </div>
          </div>

          <div class="code-samples">
            <div class="code-sample">
              <h4>过滤动态路由</h4>
              <pre><code>// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

// 所有可能的路由
const allRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { permission: 'dashboard:view' }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/User.vue'),
    meta: { permission: 'user:view' }
  },
  // ...其他路由
];

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 公共路由
    { path: '/login', component: () => import('@/views/Login.vue') },
    // 动态路由将在登录后添加
  ]
});

// 根据权限过滤路由
export function generateDynamicRoutes() {
  const userStore = useUserStore();
  const permissions = userStore.permissions;

  const accessibleRoutes = allRoutes.filter(route => {
    // 没有设置权限要求的直接放行
    if (!route.meta?.permission) return true;
    // 检查用户是否有权限
    return permissions.includes(route.meta.permission);
  });

  // 添加动态路由
  accessibleRoutes.forEach(route => {
    router.addRoute(route);
  });

  return accessibleRoutes;
}</code></pre>
            </div>

            <div class="code-sample">
              <h4>菜单组件实现</h4>
              <pre><code>&lt;script setup lang="ts"&gt;
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const menuItems = ref([]);

// 从后端获取菜单或根据权限过滤菜单
const loadMenu = async () => {
  // 实际项目中可能从API获取
  const allMenuItems = [
    { title: '仪表盘', icon: 'dashboard', path: '/dashboard', permission: 'dashboard:view' },
    {
      title: '用户管理',
      icon: 'user',
      children: [
        { title: '用户列表', path: '/user/list', permission: 'user:view' },
        { title: '添加用户', path: '/user/add', permission: 'user:create' }
      ]
    },
    // ...其他菜单
  ];

  // 过滤菜单项
  const filterMenu = (items) => {
    return items.filter(item => {
      if (item.permission && !userStore.hasPermission(item.permission)) {
        return false;
      }
      if (item.children) {
        item.children = filterMenu(item.children);
        return item.children.length > 0;
      }
      return true;
    });
  };

  menuItems.value = filterMenu(allMenuItems);
};

onMounted(loadMenu);
&lt;/script&gt;

&lt;template&gt;
  &lt;el-menu&gt;
    &lt;template v-for="item in menuItems" :key="item.path"&gt;
      &lt;el-sub-menu v-if="item.children" :index="item.path"&gt;
        &lt;template #title&gt;
          &lt;el-icon&gt;&lt;component :is="item.icon" /&gt;&lt;/el-icon&gt;
          &lt;span&gt;&#123;&#123; item.title &#125;&#125;&lt;/span&gt;
        &lt;/template&gt;
        &lt;el-menu-item
          v-for="child in item.children"
          :key="child.path"
          :index="child.path"
        &gt;
        &#123;&#123; child.title&#125;&#125;
        &lt;/el-menu-item&gt;
      &lt;/el-sub-menu&gt;
      &lt;el-menu-item v-else :index="item.path"&gt;
        &lt;el-icon&gt;&lt;component :is="item.icon" /&gt;&lt;/el-icon&gt;
        &lt;span&gt;&#123;&#123; item.title &#125;&#125;&lt;/span&gt;
      &lt;/el-menu-item&gt;
    &lt;/template&gt;
  &lt;/el-menu&gt;
&lt;/template&gt;</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 路由权限 -->
      <section v-show="activePermission === 3" class="permission-section">
        <div class="section-header">
          <h2>路由权限控制</h2>
          <p>控制用户访问的路由页面，防止未授权访问</p>
        </div>

        <div class="card">
          <h3>实现方案</h3>
          <div class="implementation">
            <div class="strategy">
              <div class="strategy-card">
                <div class="icon">🚧</div>
                <h4>路由守卫</h4>
                <p>在导航前检查权限</p>
              </div>
              <div class="strategy-card">
                <div class="icon">🔐</div>
                <h4>动态路由</h4>
                <p>只添加用户有权访问的路由</p>
              </div>
            </div>
          </div>

          <div class="code-samples">
            <div class="code-sample">
              <h4>全局路由守卫</h4>
              <pre><code>// src/router/index.ts
import { createRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = createRouter({ /* ... */ });

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  // 检查是否前往登录页
  if (to.path === '/login') {
    next();
    return;
  }

  // 检查用户是否已登录
  if (!userStore.token) {
    next(`/login?redirect=${to.path}`);
    return;
  }

  // 如果用户信息尚未加载，先加载用户信息
  if (!userStore.userInfo) {
    try {
      await userStore.getUserInfo();
    } catch (error) {
      // 获取用户信息失败，跳转到登录页
      next(`/login?redirect=${to.path}`);
      return;
    }
  }

  // 检查是否有权限访问该路由
  if (to.meta.permission && !userStore.hasPermission(to.meta.permission)) {
    // 没有权限，跳转到403页面
    next('/403');
  } else {
    next();
  }
});</code></pre>
            </div>

            <div class="code-sample">
              <h4>动态路由添加</h4>
              <pre><code>// 在用户登录后添加动态路由
import { generateDynamicRoutes } from '@/router';

const handleLogin = async () => {
  try {
    await userStore.login(loginForm);

    // 生成并添加动态路由
    const routes = generateDynamicRoutes();

    // 保存菜单数据（用于侧边栏）
    menuStore.setMenu(routes);

    // 跳转到首页或重定向页面
    const redirect = route.query.redirect || '/';
    router.push(redirect as string);
  } catch (error) {
    // 处理登录错误
  }
};</code></pre>
            </div>

            <div class="code-sample">
              <h4>404 和 403 页面</h4>
              <pre><code>// 路由配置中添加错误页面
const routes = [
  // ...其他路由
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/views/error/403.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue')
  }
];</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 最佳实践 -->
    <section class="best-practices">
      <h2>权限控制最佳实践</h2>
      <div class="practices-grid">
        <div class="practice-card">
          <div class="icon">🔁</div>
          <h3>前后端双重验证</h3>
          <p>前端实现用户体验优化，后端确保数据安全</p>
        </div>
        <div class="practice-card">
          <div class="icon">🗂️</div>
          <h3>权限集中管理</h3>
          <p>使用权限中心统一管理所有权限点</p>
        </div>
        <div class="practice-card">
          <div class="icon">🔄</div>
          <h3>动态更新权限</h3>
          <p>支持用户权限变更后实时更新</p>
        </div>
        <div class="practice-card">
          <div class="icon">📝</div>
          <h3>详细日志记录</h3>
          <p>记录关键操作和权限变更日志</p>
        </div>
      </div>
    </section>

    <footer>
      <p>完善的权限控制是保障系统安全的关键，在 Vue 项目中需要从多个层面综合考虑实现方案。</p>
      <div class="footer-links">
        <a href="https://vuejs.org/" target="_blank">Vue 官方文档</a>
        <a href="https://next.router.vuejs.org/" target="_blank">Vue Router 文档</a>
        <a href="https://juejin.cn/post/6844903648057622536" target="_blank">权限控制实践</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 权限类型
const activePermission = ref(0);
const permissionTypes = ref([
  { title: '接口权限', badge: 'API' },
  { title: '按钮权限', badge: 'UI' },
  { title: '菜单权限', badge: 'Menu' },
  { title: '路由权限', badge: 'Router' }
]);

// 用户权限

const currentPermissions = ref([
  'dashboard:view',
  'user:view',
  'user:edit'
]);
</script>

<style scoped lang="less">
@primary-color: #42b983;
@secondary-color: #35495e;
@accent-color: #e7f4ee;
@background-color: #f9f9f9;
@card-color: #ffffff;
@text-color: #2c3e50;
@border-color: #e0e0e0;
@error-color: #f56c6c;
@warning-color: #e6a23c;
@success-color: #67c23a;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.permission-control-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: @background-color;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid @border-color;

    h1 {
      color: @secondary-color;
      margin-bottom: 15px;
      font-size: 2.5rem;
      position: relative;
      display: inline-block;

      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 4px;
        background: @primary-color;
        border-radius: 2px;
      }
    }

    .overview {
      max-width: 800px;
      margin: 20px auto 0;
      font-size: 1.1rem;
      color: lighten(@text-color, 20%);
    }
  }

  .permission-nav {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
    flex-wrap: wrap;

    button {
      padding: 12px 25px;
      background: #f0f7f3;
      border: none;
      border-radius: 30px;
      color: @secondary-color;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

      &:hover {
        background: darken(#f0f7f3, 5%);
        transform: translateY(-3px);
      }

      &.active {
        background: @primary-color;
        color: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .badge {
        background: rgba(255, 255, 255, 0.3);
        padding: 2px 10px;
        border-radius: 20px;
        font-size: 0.9rem;
      }
    }
  }

  .permission-content {
    margin-bottom: 40px;
  }

  .permission-section {
    animation: fadeIn 0.5s ease;

    .section-header {
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid @border-color;

      h2 {
        color: @secondary-color;
        font-size: 1.8rem;
        margin-bottom: 8px;
      }

      p {
        color: lighten(@text-color, 20%);
        font-size: 1.1rem;
      }
    }
  }

  .card {
    background: white;
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid @border-color;

    h3 {
      color: @secondary-color;
      margin-bottom: 20px;
      font-size: 1.5rem;
      padding-bottom: 10px;
      border-bottom: 1px solid @border-color;
    }
  }

  .implementation {
    margin-bottom: 25px;

    .strategy {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;

      .strategy-card {
        background: #f8fcf9;
        border-radius: 10px;
        padding: 20px;
        text-align: center;
        border: 1px solid @border-color;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
        }

        .icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        h4 {
          margin-bottom: 10px;
          color: @primary-color;
        }
      }
    }
  }

  .code-samples {
    display: flex;
    flex-direction: column;
    gap: 25px;

    .code-sample {
      background: #2d2d2d;
      border-radius: 8px;
      padding: 20px;
      overflow-x: auto;

      h4 {
        color: #f0f0f0;
        margin-bottom: 15px;
        font-size: 1.1rem;
      }

      pre {
        margin: 0;

        code {
          color: #f8f8f2;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.95rem;
          line-height: 1.5;

          .comment {
            color: #75715e;
          }

          .keyword {
            color: #f92672;
          }

          .function {
            color: #66d9ef;
          }

          .string {
            color: #a6e22e;
          }

          .number {
            color: #ae81ff;
          }
        }
      }
    }

    .demo {
      background: #f8fcf9;
      border-radius: 8px;
      padding: 25px;
      margin-top: 15px;
      border: 1px solid @border-color;

      h4 {
        color: @secondary-color;
        margin-bottom: 15px;
      }

      .button-group {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin-bottom: 20px;

        button {
          padding: 10px 20px;
          background: @primary-color;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.3s;

          &:hover {
            background: darken(@primary-color, 10%);
          }
        }
      }

      .current-permissions {
        padding: 12px;
        background: #e7f4ee;
        border-radius: 6px;
        font-size: 0.95rem;
        color: darken(@primary-color, 20%);
      }
    }
  }

  .best-practices {
    margin: 40px 0;

    h2 {
      color: @secondary-color;
      text-align: center;
      margin-bottom: 30px;
      font-size: 1.8rem;
    }

    .practices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
    }

    .practice-card {
      background: white;
      border-radius: 12px;
      padding: 30px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border: 1px solid @border-color;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      }

      .icon {
        font-size: 2.5rem;
        margin-bottom: 20px;
        color: @primary-color;
      }

      h3 {
        color: @secondary-color;
        margin-bottom: 15px;
        font-size: 1.4rem;
      }
    }
  }

  footer {
    margin-top: 40px;
    padding: 30px;
    background: #f0f7f3;
    border-radius: 12px;
    text-align: center;
    border-top: 2px solid @border-color;

    p {
      margin-bottom: 20px;
      font-size: 1.1rem;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;

      a {
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s;

        &:hover {
          text-decoration: underline;
          color: darken(@primary-color, 10%);
        }
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .permission-control-container {
    padding: 15px;

    header h1 {
      font-size: 2rem;
    }

    .permission-nav button {
      padding: 10px 20px;
      font-size: 1rem;
    }
  }
}
</style>
