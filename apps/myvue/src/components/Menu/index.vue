<template>
  <div class="demo-container">
    <div class="demo-header">
      <div>
        <h1>动态折叠菜单组件</h1>
        <p>支持异步加载子菜单、折叠模式和动画效果</p>
      </div>
      <div class="controls">
        <button class="control-btn">
          <span class="material-symbols-outlined">download</span>
          导出代码
        </button>
        <button class="control-btn">
          <span class="material-symbols-outlined">code</span>
          查看文档
        </button>
      </div>
    </div>

    <div class="content">
      <div class="menu-container" :class="{ collapsed: isCollapsed }">
        <div class="menu-header">
          <div class="menu-title" v-if="!isCollapsed">系统菜单</div>
          <button class="collapse-btn" @click="isCollapsed = !isCollapsed">
            <span class="material-symbols-outlined" v-if="!isCollapsed">chevron_left</span>
            <span class="material-symbols-outlined" v-else>chevron_right</span>
          </button>
        </div>

        <div class="menu-list">
          <div
            v-for="item in menuData"
            :key="item.id"
            class="menu-item"
            :class="{ expanded: item.expanded }"
          >
            <div
              class="item-content"
              @click="handleItemClick(item)"
              @mouseenter="handleMouseEnter(item)"
              @mouseleave="handleMouseLeave(item)"
            >
              <div class="item-icon">
                <span class="material-symbols-outlined">{{ item.icon }}</span>
              </div>
              <div class="item-title">{{ item.title }}</div>
              <div class="item-arrow" v-if="item.hasChildren">
                <span class="material-symbols-outlined loading-icon" v-if="item.loading"
                  >progress_activity</span
                >
                <span class="material-symbols-outlined" v-else-if="item.expanded">expand_less</span>
                <span class="material-symbols-outlined" v-else>expand_more</span>
              </div>
            </div>

            <transition name="sub-menu">
              <div
                class="sub-menu"
                v-if="item.expanded && item.children && item.children.length > 0"
              >
                <div v-for="child in item.children" :key="child.id" class="menu-item">
                  <div class="item-content" @click="handleItemClick(child)">
                    <div class="item-icon">
                      <span class="material-symbols-outlined">{{
                        child.icon || 'chevron_right'
                      }}</span>
                    </div>
                    <div class="item-title">{{ child.title }}</div>
                  </div>
                </div>
              </div>
            </transition>

            <div
              class="popup-submenu"
              v-if="isCollapsed && item.showPopup && item.children && item.children.length > 0"
              @mouseenter="handlePopupEnter(item)"
              @mouseleave="handlePopupLeave(item)"
            >
              <div class="popup-arrow"></div>
              <div class="sub-menu">
                <div v-for="child in item.children" :key="child.id" class="menu-item">
                  <div class="item-content" @click="handleItemClick(child)">
                    <div class="item-icon">
                      <span class="material-symbols-outlined">{{
                        child.icon || 'chevron_right'
                      }}</span>
                    </div>
                    <div class="item-title">{{ child.title }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="main-content">
        <h2>动态菜单功能说明</h2>
        <p>此组件实现了完整的动态折叠菜单功能，包含以下特性：</p>

        <div class="info-cards">
          <div class="info-card">
            <div class="card-header">
              <div class="card-icon">
                <span class="material-symbols-outlined">sync</span>
              </div>
              <div class="card-title">异步加载子菜单</div>
            </div>
            <div class="card-content">
              <p>点击菜单项时模拟异步请求数据，动态添加子菜单项。</p>
              <ul>
                <li>点击后显示加载动画</li>
                <li>数据返回后自动展开子菜单</li>
                <li>箭头图标随状态变化</li>
              </ul>
            </div>
          </div>

          <div class="info-card">
            <div class="card-header">
              <div class="card-icon">
                <span class="material-symbols-outlined">animation</span>
              </div>
              <div class="card-title">流畅动画效果</div>
            </div>
            <div class="card-content">
              <p>菜单展开/折叠带有平滑动画效果。</p>
              <ul>
                <li>子菜单展开/折叠动画</li>
                <li>箭头旋转动画</li>
                <li>加载状态旋转动画</li>
                <li>hover时的灵动动画效果</li>
              </ul>
            </div>
          </div>

          <div class="info-card">
            <div class="card-header">
              <div class="card-icon">
                <span class="material-symbols-outlined">keyboard_double_arrow_left</span>
              </div>
              <div class="card-title">折叠模式</div>
            </div>
            <div class="card-content">
              <p>支持整个菜单的折叠功能。</p>
              <ul>
                <li>折叠后只显示图标</li>
                <li>鼠标悬浮显示完整菜单</li>
                <li>弹出子菜单带箭头指示</li>
                <li>平滑的折叠/展开动画</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="instructions">
          <h3>使用说明</h3>
          <ol>
            <li><strong>点击菜单项</strong> - 点击有子菜单的项将模拟异步加载数据并显示子菜单</li>
            <li><strong>折叠菜单</strong> - 点击左上角折叠按钮切换菜单的展开/折叠状态</li>
            <li><strong>悬浮显示</strong> - 在折叠模式下，悬浮在菜单项上可查看子菜单</li>
            <li><strong>动画效果</strong> - 注意观察菜单展开/折叠时的动画和图标变化</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, reactive } from 'vue'

const isCollapsed = ref(false)

const menuData = reactive([
  {
    id: 'dashboard',
    title: '仪表盘',
    icon: 'dashboard',
    hasChildren: true,
    expanded: false,
    loading: false,
    showPopup: false,
  },
  {
    id: 'users',
    title: '用户管理',
    icon: 'group',
    hasChildren: true,
    expanded: false,
    loading: false,
    showPopup: false,
  },
  {
    id: 'orders',
    title: '订单管理',
    icon: 'shopping_cart',
    hasChildren: true,
    expanded: false,
    loading: false,
    showPopup: false,
  },
  {
    id: 'analytics',
    title: '数据分析',
    icon: 'analytics',
    hasChildren: true,
    expanded: false,
    loading: false,
    showPopup: false,
  },
  {
    id: 'settings',
    title: '系统设置',
    icon: 'settings',
    hasChildren: true,
    expanded: false,
    loading: false,
    showPopup: false,
  },
])

let popupTimeout = null

const handleItemClick = (item) => {
  if (!item.hasChildren) return
  // 如果已经有子菜单，则直接切换展开状态
  if (item.children && item.children.length > 0) {
    item.expanded = !item.expanded
    return
  }

  // 模拟异步加载子菜单
  item.loading = true

  setTimeout(() => {
    item.loading = false
    item.expanded = true

    // 添加模拟的子菜单
    item.children = [
      { id: `${item.id}-1`, title: `${item.title} 子项 1`, hasChildren: false },
      { id: `${item.id}-2`, title: `${item.title} 子项 2`, hasChildren: Math.random() > 0.5 },
      { id: `${item.id}-3`, title: `${item.title} 子项 3`, hasChildren: Math.random() > 0.5 },
    ]
  }, 800)
}

const handleMouseEnter = (item) => {
  if (!isCollapsed.value || !item.hasChildren) return

  if (popupTimeout) clearTimeout(popupTimeout)
  popupTimeout = setTimeout(() => {
    item.showPopup = true
  }, 200)
}

const handleMouseLeave = (item) => {
  if (popupTimeout) clearTimeout(popupTimeout)
  popupTimeout = setTimeout(() => {
    item.showPopup = false
  }, 300)
}

const handlePopupEnter = (item) => {
  if (popupTimeout) clearTimeout(popupTimeout)
}

const handlePopupLeave = (item) => {
  handleMouseLeave(item)
}
</script>

<style scoped lang="less">
@primary-color: #4361ee;
@hover-color: #f0f4ff;
@active-color: #e0e8ff;
@text-color: #333;
@border-color: #eaeaea;
@transition-duration: 0.3s;

.demo-container {
  flex: 1;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  overflow: hidden;
}

.demo-header {
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
  color: white;
  padding: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-header h1 {
  font-size: 1.8rem;
  font-weight: 600;
}

.demo-header p {
  opacity: 0.9;
  margin-top: 8px;
}

.controls {
  display: flex;
  gap: 15px;
  background: rgba(255, 255, 255, 0.15);
  padding: 10px 20px;
  border-radius: 30px;
}

.control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.content {
  display: flex;
  height: 500px;
}

.menu-container {
  width: 300px;
  background: white;
  border-right: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
}

.menu-container.collapsed {
  width: 70px;
}

.menu-header {
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.collapse-btn {
  background: #f0f4ff;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.collapse-btn:hover {
  background: #e0e8ff;
  transform: rotate(15deg);
}

.menu-list {
  flex: 1;
  overflow-y: auto;
  padding: 15px 10px;
}

.menu-item {
  position: relative;
  border-radius: 10px;
  margin-bottom: 5px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.menu-item:hover {
  background: #f8f9ff;
}

.item-content {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  cursor: pointer;
  position: relative;
}

.item-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f4ff;
  border-radius: 8px;
  font-size: 1.1rem;
  color: #4361ee;
  transition: all 0.3s ease;
}

.item-title {
  margin-left: 15px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
  flex: 1;
  transition: all 0.3s ease;
}

.item-arrow {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #999;
}

.loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.sub-menu {
  background: #f9f9ff;
  overflow: hidden;
}

.sub-menu-enter-active,
.sub-menu-leave-active {
  transition:
    height 0.4s ease,
    opacity 0.4s ease;
}

.sub-menu-enter-from,
.sub-menu-leave-to {
  height: 0 !important;
  opacity: 0;
}

.popup-submenu {
  position: absolute;
  left: calc(100% - 10px);
  top: 0;
  z-index: 100;
  min-width: 200px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 10px 0;
  opacity: 0;
  transform: translateY(10px);
  animation: popupFadeIn 0.3s ease forwards;
}

@keyframes popupFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.popup-arrow {
  position: absolute;
  left: -8px;
  top: 20px;
  width: 16px;
  height: 16px;
  background: white;
  transform: rotate(45deg);
  z-index: -1;
}

.main-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

.main-content h2 {
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.info-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: #e0e8ff;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.card-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f4ff;
  border-radius: 12px;
  font-size: 1.5rem;
  color: #4361ee;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.card-content {
  color: #555;
  line-height: 1.7;
}

.card-content ul {
  padding-left: 20px;
  margin-top: 15px;
}

.card-content li {
  margin-bottom: 10px;
}

.code-block {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 20px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-top: 15px;
  overflow-x: auto;
}

.instructions {
  margin-top: 40px;
  background: #f9f9ff;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e0e8ff;
}

.instructions h3 {
  color: #4361ee;
  margin-bottom: 15px;
}

.instructions ol {
  padding-left: 25px;
}

.instructions li {
  margin-bottom: 15px;
  line-height: 1.6;
}

.collapsed .item-title,
.collapsed .item-arrow {
  display: none;
}

.collapsed .item-content {
  justify-content: center;
  padding: 15px 0;
}

.collapsed .item-icon {
  margin: 0;
}
</style>
