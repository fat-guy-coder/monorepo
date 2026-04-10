<template>
  <div class="lifecycle-container">
    <header class="header">
      <h1>Vue 生命周期基础介绍</h1>
      <p>理解组件从创建到销毁的完整过程</p>
    </header>

    <div class="content">
      <div class="lifecycle-flow">
        <div class="creation-phase">
          <h2>创建阶段</h2>
          <div class="hook-card" v-for="hook in creationHooks" :key="hook.name" :class="hook.name">
            <div class="hook-order">{{ hook.order }}</div>
            <div class="hook-info">
              <h3>{{ hook.name }}</h3>
              <p>{{ hook.description }}</p>
              <div class="hook-usage">
                <strong>适合操作：</strong>
                <ul>
                  <li v-for="(usage, idx) in hook.usages" :key="idx">{{ usage }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="update-phase">
          <h2>更新阶段</h2>
          <div class="hook-card" v-for="hook in updateHooks" :key="hook.name" :class="hook.name">
            <div class="hook-order">{{ hook.order }}</div>
            <div class="hook-info">
              <h3>{{ hook.name }}</h3>
              <p>{{ hook.description }}</p>
              <div class="hook-usage">
                <strong>适合操作：</strong>
                <ul>
                  <li v-for="(usage, idx) in hook.usages" :key="idx">{{ usage }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="destruction-phase">
          <h2>销毁阶段</h2>
          <div class="hook-card" v-for="hook in destructionHooks" :key="hook.name" :class="hook.name">
            <div class="hook-order">{{ hook.order }}</div>
            <div class="hook-info">
              <h3>{{ hook.name }}</h3>
              <p>{{ hook.description }}</p>
              <div class="hook-usage">
                <strong>适合操作：</strong>
                <ul>
                  <li v-for="(usage, idx) in hook.usages" :key="idx">{{ usage }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="code-section">
        <h2>生命周期钩子使用示例</h2>
        <div class="code-block">
          <pre><code>import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured
} from 'vue';

export default {
  setup() {
    // 创建阶段
    onBeforeMount(() => {
      console.log('组件挂载前');
      // 此时DOM尚未创建，不可访问DOM元素
    });

    onMounted(() => {
      console.log('组件已挂载');
      // 可访问DOM元素，适合发起API请求
      fetchData();
    });

    // 更新阶段
    onBeforeUpdate(() => {
      console.log('组件更新前');
      // 数据变化后，DOM更新前
    });

    onUpdated(() => {
      console.log('组件已更新');
      // DOM更新后，可执行依赖DOM的操作
    });

    // 销毁阶段
    onBeforeUnmount(() => {
      console.log('组件卸载前');
      // 清理定时器、取消事件监听等
      clearInterval(timer);
    });

    onUnmounted(() => {
      console.log('组件已卸载');
      // 执行最终清理工作
    });

    // 错误捕获
    onErrorCaptured((err, instance, info) => {
      console.error('捕获到错误:', err);
      // 可在此记录错误或显示错误信息
      return false; // 阻止错误继续向上传播
    });

    return {
      // 响应式数据和方法
    };
  }
};</code></pre>
        </div>
      </div>

      <div class="best-practices">
        <h2>生命周期最佳实践</h2>
        <div class="practices-grid">
          <div class="practice-card">
            <div class="icon">🚫</div>
            <h3>避免在 beforeMount 中操作 DOM</h3>
            <p>此时 DOM 尚未创建，任何 DOM 操作都将无效</p>
          </div>
          <div class="practice-card">
            <div class="icon">⏱️</div>
            <h3>在 mounted 中发起异步请求</h3>
            <p>确保组件已挂载且可以访问 DOM 元素</p>
          </div>
          <div class="practice-card">
            <div class="icon">🧹</div>
            <h3>在 beforeUnmount 中清理资源</h3>
            <p>清除定时器、取消事件监听、断开连接等</p>
          </div>
          <div class="practice-card">
            <div class="icon">🐞</div>
            <h3>使用 errorCaptured 处理错误</h3>
            <p>捕获子组件错误并进行统一处理</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 生命周期钩子数据
const creationHooks = [
  {
    name: "setup()",
    order: "1",
    description: "Composition API 的入口点，组件初始化时最先执行",
    usages: [
      "定义响应式数据 (ref, reactive)",
      "定义计算属性 (computed)",
      "定义方法 (functions)",
      "引入其他组件或插件"
    ]
  },
  {
    name: "onBeforeMount",
    order: "2",
    description: "组件挂载到 DOM 之前调用，此时模板已编译但尚未渲染",
    usages: [
      "初始化非响应式数据",
      "访问服务端渲染上下文 (SSR)",
      "执行不依赖 DOM 的初始化操作"
    ]
  },
  {
    name: "onMounted",
    order: "3",
    description: "组件挂载到 DOM 后调用，此时可以访问 DOM 元素",
    usages: [
      "发起 API 请求获取数据",
      "操作 DOM 元素",
      "初始化第三方库 (如地图、图表)",
      "设置定时器或事件监听器"
    ]
  }
];

const updateHooks = [
  {
    name: "onBeforeUpdate",
    order: "4",
    description: "响应式数据变化后，DOM 重新渲染前调用",
    usages: [
      "获取更新前的 DOM 状态",
      "在更新前执行一些逻辑",
      "访问更新前的组件状态"
    ]
  },
  {
    name: "onUpdated",
    order: "5",
    description: "DOM 重新渲染后调用，此时 DOM 已更新",
    usages: [
      "执行依赖更新后 DOM 的操作",
      "手动更新非 Vue 管理的 DOM 元素",
      "根据新 DOM 状态执行操作"
    ]
  }
];

const destructionHooks = [
  {
    name: "onBeforeUnmount",
    order: "6",
    description: "组件卸载之前调用，此时组件实例仍然可用",
    usages: [
      "清除定时器 (setTimeout, setInterval)",
      "取消事件监听 (removeEventListener)",
      "清理自定义事件",
      "断开 WebSocket 连接"
    ]
  },
  {
    name: "onUnmounted",
    order: "7",
    description: "组件卸载后调用，所有指令和事件监听器都被移除",
    usages: [
      "执行最终清理工作",
      "释放非 Vue 管理的资源",
      "记录组件卸载日志"
    ]
  },
  {
    name: "onErrorCaptured",
    order: "*",
    description: "捕获来自后代组件的错误时调用",
    usages: [
      "记录错误信息到日志系统",
      "显示用户友好的错误提示",
      "向错误监控服务报告"
    ]
  }
];
</script>

<style lang="less" scoped>
.lifecycle-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #2c3e50;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
    color: #34495e;
    font-weight: 700;
  }

  p {
    font-size: 1.1rem;
    color: #7f8c8d;
    margin-top: 0;
  }
}

.content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.lifecycle-flow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.creation-phase,
.update-phase,
.destruction-phase {
  h2 {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f4f8;
    color: #3498db;
    text-align: center;
  }
}

.hook-card {
  display: flex;
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.2rem;
  margin-bottom: 1.2rem;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
  }

  // 不同生命周期阶段的边框颜色
  &.setup {
    border-left: 4px solid #4f46e5;
  }

  &.onBeforeMount {
    border-left: 4px solid #3b82f6;
  }

  &.onMounted {
    border-left: 4px solid #10b981;
  }

  &.onBeforeUpdate {
    border-left: 4px solid #f59e0b;
  }

  &.onUpdated {
    border-left: 4px solid #f97316;
  }

  &.onBeforeUnmount {
    border-left: 4px solid #ef4444;
  }

  &.onUnmounted {
    border-left: 4px solid #8b5cf6;
  }

  &.onErrorCaptured {
    border-left: 4px solid #6b7280;
  }
}

.hook-order {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0e7ff;
  border-radius: 50%;
  font-weight: bold;
  font-size: 1.2rem;
  color: #4f46e5;
  margin-right: 1rem;
  flex-shrink: 0;
}

.hook-info {
  flex: 1;

  h3 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #1e293b;
    font-size: 1.25rem;
  }

  p {
    margin-bottom: 0.8rem;
    color: #475569;
  }
}

.hook-usage {
  background: #f1f5f9;
  border-radius: 8px;
  padding: 0.8rem;

  strong {
    color: #334155;
  }

  ul {
    padding-left: 1.2rem;
    margin: 0.5rem 0 0;
  }

  li {
    margin-bottom: 0.3rem;
    font-size: 0.92rem;
    color: #475569;
  }
}

.code-section {
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f4f8;
    color: #3498db;
  }
}

.code-block {
  background: #2d2d2d;
  color: #f8f8f2;
  border-radius: 10px;
  padding: 1.5rem;
  overflow-x: auto;

  pre {
    margin: 0;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.best-practices {
  h2 {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f4f8;
    color: #3498db;
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    margin: 0 0 0.8rem;
    color: #1e40af;
  }

  p {
    margin: 0;
    color: #4b5563;
    line-height: 1.5;
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .content {
    padding: 1.5rem;
  }
}
</style>
