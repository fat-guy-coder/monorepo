<template>
  <div class="window-reference">
    <div class="header">
      <h1>Window 对象 API 参考手册</h1>
      <p>浏览器全局对象的核心属性和方法</p>
    </div>

    <div class="controls">
      <div class="search-container">
        <input type="text" v-model="searchTerm" placeholder="搜索 API..." class="search-input">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24">
          <path
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </div>

      <div class="tabs">
        <button :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">
          全部
        </button>
        <button :class="{ active: activeTab === 'properties' }" @click="activeTab = 'properties'">
          属性
        </button>
        <button :class="{ active: activeTab === 'methods' }" @click="activeTab = 'methods'">
          方法
        </button>
      </div>
    </div>

    <div class="stats">
      <span>共 {{ filteredItems.length }} 个 API</span>
      <span>{{ propertiesCount }} 个属性</span>
      <span>{{ methodsCount }} 个方法</span>
    </div>

    <div class="api-section properties" v-if="showSection('properties')">
      <h2>属性</h2>
      <div class="api-table">
        <div class="api-row header">
          <div class="api-name">名称</div>
          <div class="api-type">类型</div>
          <div class="api-description">描述</div>
        </div>
        <div v-for="(item, index) in filteredProperties" :key="`prop-${index}`" class="api-row">
          <div class="api-name">
            <code>{{ item.name }}</code>
          </div>
          <div class="api-type">
            <code>{{ item.type }}</code>
          </div>
          <div class="api-description">{{ item.description }}</div>
        </div>
      </div>
    </div>

    <div class="api-section methods" v-if="showSection('methods')">
      <h2>方法</h2>
      <div class="api-table">
        <div class="api-row header">
          <div class="api-name">名称</div>
          <div class="api-type">参数</div>
          <div class="api-description">描述</div>
        </div>
        <div v-for="(item, index) in filteredMethods" :key="`method-${index}`" class="api-row">
          <div class="api-name">
            <code>{{ item.name }}</code>
          </div>
          <div class="api-type">
            <code>{{ item.parameters }}</code>
          </div>
          <div class="api-description">{{ item.description }}</div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>Window 对象 API 参考手册 • {{ new Date().getFullYear() }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 搜索词
const searchTerm = ref('');
// 激活选项卡
const activeTab = ref('all');

// Window 属性数据
const properties = [
  {
    name: 'window',
    type: 'Window',
    description: '指向当前窗口自身的引用'
  },
  {
    name: 'document',
    type: 'Document',
    description: '返回当前窗口内加载的文档对象'
  },
  {
    name: 'location',
    type: 'Location',
    description: '获取/设置窗口的 URL，可用于页面导航'
  },
  {
    name: 'history',
    type: 'History',
    description: '提供对浏览器会话历史的访问'
  },
  {
    name: 'navigator',
    type: 'Navigator',
    description: '返回浏览器相关信息（名称、版本、平台等）'
  },
  {
    name: 'screen',
    type: 'Screen',
    description: '返回当前渲染窗口的屏幕信息'
  },
  {
    name: 'innerWidth',
    type: 'number',
    description: '窗口的视口宽度（包含滚动条）'
  },
  {
    name: 'innerHeight',
    type: 'number',
    description: '窗口的视口高度（包含滚动条）'
  },
  {
    name: 'outerWidth',
    type: 'number',
    description: '窗口的外部宽度（包括浏览器界面）'
  },
  {
    name: 'outerHeight',
    type: 'number',
    description: '窗口的外部高度（包括浏览器界面）'
  },
  {
    name: 'scrollX',
    type: 'number',
    description: '返回文档水平滚动距离（别名：pageXOffset）'
  },
  {
    name: 'scrollY',
    type: 'number',
    description: '返回文档垂直滚动距离（别名：pageYOffset）'
  },
  {
    name: 'localStorage',
    type: 'Storage',
    description: '提供持久化键值对存储（跨会话保存）'
  },
  {
    name: 'sessionStorage',
    type: 'Storage',
    description: '提供会话期间键值对存储（标签页关闭丢失）'
  },
  {
    name: 'console',
    type: 'Console',
    description: '提供浏览器控制台的访问接口'
  },
  {
    name: 'devicePixelRatio',
    type: 'number',
    description: '返回物理像素与CSS像素的比率'
  }
];

// Window 方法数据
const methods = [
  {
    name: 'alert()',
    parameters: 'message: string',
    description: '显示带有消息和确定按钮的警告对话框'
  },
  {
    name: 'confirm()',
    parameters: 'message: string',
    description: '显示带有消息、确定和取消按钮的对话框'
  },
  {
    name: 'prompt()',
    parameters: 'message: string, default: string',
    description: '显示带有消息、输入框和按钮的对话框'
  },
  {
    name: 'setTimeout()',
    parameters: 'callback: Function, delay: number, ...args: any[]',
    description: '设置定时器，在指定延迟后执行函数'
  },
  {
    name: 'clearTimeout()',
    parameters: 'timeoutID: number',
    description: '取消由 setTimeout() 设置的定时器'
  },
  {
    name: 'setInterval()',
    parameters: 'callback: Function, delay: number, ...args: any[]',
    description: '设置重复执行的定时器'
  },
  {
    name: 'clearInterval()',
    parameters: 'intervalID: number',
    description: '取消由 setInterval() 设置的定时器'
  },
  {
    name: 'requestAnimationFrame()',
    parameters: 'callback: Function',
    description: '请求在下一次重绘前调用动画函数'
  },
  {
    name: 'cancelAnimationFrame()',
    parameters: 'requestID: number',
    description: '取消 requestAnimationFrame() 的请求'
  },
  {
    name: 'open()',
    parameters: 'url?: string, target?: string, features?: string',
    description: '打开新浏览器窗口或查找已命名窗口'
  },
  {
    name: 'close()',
    parameters: '',
    description: '关闭当前浏览器窗口'
  },
  {
    name: 'focus()',
    parameters: '',
    description: '使窗口获得焦点（置于最前面）'
  },
  {
    name: 'blur()',
    parameters: '',
    description: '使窗口失去焦点（置于后台）'
  },
  {
    name: 'scrollTo()',
    parameters: 'x: number, y: number | options: object',
    description: '滚动到文档中的特定位置'
  },
  {
    name: 'scrollBy()',
    parameters: 'x: number, y: number | options: object',
    description: '按指定像素数滚动文档'
  },
  {
    name: 'matchMedia()',
    parameters: 'mediaQuery: string',
    description: '返回表示媒体查询结果的新 MediaQueryList 对象'
  },
  {
    name: 'getComputedStyle()',
    parameters: 'element: Element, pseudoElt?: string',
    description: '获取元素的所有CSS计算值'
  },
  {
    name: 'btoa()',
    parameters: 'binaryString: string',
    description: '将二进制字符串编码为 base-64 格式'
  },
  {
    name: 'atob()',
    parameters: 'encodedString: string',
    description: '解码 base-64 编码的字符串'
  },
  {
    name: 'fetch()',
    parameters: 'resource: string | Request, init?: RequestInit',
    description: '发起网络请求（现代ajax方法）'
  }
];

// 计算属性：过滤后的属性
const filteredProperties = computed(() => {
  return properties.filter(item =>
    (activeTab.value === 'all' || activeTab.value === 'properties') &&
    (item.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.value.toLowerCase()))
  );
});

// 计算属性：过滤后的方法
const filteredMethods = computed(() => {
  return methods.filter(item =>
    (activeTab.value === 'all' || activeTab.value === 'methods') &&
    (item.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.value.toLowerCase()))
  );
});

// 计算属性：过滤后的所有项目
const filteredItems = computed(() => {
  return [...filteredProperties.value, ...filteredMethods.value];
});

// 计算属性：属性数量
const propertiesCount = computed(() => filteredProperties.value.length);

// 计算属性：方法数量
const methodsCount = computed(() => filteredMethods.value.length);

// 是否显示该部分
const showSection = (section: string) => {
  if (activeTab.value === 'all') return true;
  return activeTab.value === section;
};
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e2e8f0;
@text-color: #2d3748;
@code-bg: #f6f8fa;
@code-text: #2f363d;
@highlight-color: #e6f7ff;
@success-color: #10b981;
@warning-color: #f59e0b;
@error-color: #ef4444;

// 布局变量
@header-height: 140px;
@card-radius: 10px;
@transition-speed: 0.2s;

.window-reference {
  font-family: 'Inter', sans-serif;
  background-color: @light-bg;
  color: @text-color;
  min-height: 100vh;
  padding-bottom: 40px;
  line-height: 1.5;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  padding: 30px 0 20px;
  text-align: center;
  border-bottom: 1px solid @border-color;
  margin-bottom: 20px;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: @primary-color;
    margin: 0 0 8px 0;
  }

  p {
    font-size: 1.1rem;
    color: lighten(@text-color, 15%);
    margin: 0;
  }
}

.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 20px;

  .search-container {
    position: relative;
    flex-grow: 1;
    max-width: 400px;

    .search-input {
      width: 100%;
      padding: 10px 15px 10px 40px;
      border: 1px solid @border-color;
      border-radius: 30px;
      font-size: 0.95rem;
      outline: none;
      transition: all @transition-speed;
      background: @card-bg;

      &:focus {
        border-color: @primary-color;
        box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
      }
    }

    .search-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: lighten(@text-color, 30%);
    }
  }

  .tabs {
    display: flex;
    gap: 8px;

    button {
      background: @card-bg;
      border: 1px solid @border-color;
      border-radius: 20px;
      padding: 8px 16px;
      font-size: 0.9rem;
      font-weight: 500;
      color: lighten(@text-color, 15%);
      cursor: pointer;
      transition: all @transition-speed;

      &:hover {
        border-color: @primary-color;
        color: @primary-color;
      }

      &.active {
        background: @primary-color;
        border-color: @primary-color;
        color: white;
      }
    }
  }
}

.stats {
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
  color: lighten(@text-color, 25%);
  margin-bottom: 15px;
  padding: 0 5px;
}

.api-section {
  margin-bottom: 30px;

  h2 {
    font-size: 1.4rem;
    font-weight: 600;
    color: @secondary-color;
    margin: 0 0 15px 5px;
    padding-bottom: 8px;
    border-bottom: 1px solid @border-color;
  }
}

.api-table {
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid @border-color;
  border-radius: @card-radius;
  overflow: hidden;
  background: @card-bg;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);

  .api-row {
    display: grid;
    grid-template-columns: 1.5fr 1.3fr 3fr;
    padding: 12px 15px;
    border-bottom: 1px solid @border-color;

    &:last-child {
      border-bottom: none;
    }

    &.header {
      background: rgba(@primary-color, 0.05);
      font-weight: 600;
      font-size: 0.95rem;
      color: darken(@primary-color, 10%);
    }

    .api-name {
      font-weight: 500;

      code {
        font-family: 'Fira Code', monospace;
        background: @code-bg;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.9rem;
        color: @code-text;
      }
    }

    .api-type {
      code {
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        color: @warning-color;
      }
    }

    .api-description {
      font-size: 0.95rem;
      color: lighten(@text-color, 10%);
      padding-left: 5px;
    }
  }
}

.footer {
  text-align: center;
  padding: 30px 0 10px;
  margin-top: 20px;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
}

// 响应式设计
@media (max-width: 768px) {
  .controls {
    flex-direction: column;

    .search-container {
      max-width: 100%;
    }
  }

  .stats {
    flex-wrap: wrap;
    gap: 8px;
  }

  .api-table {
    .api-row {
      grid-template-columns: 1fr;
      gap: 7px;
      padding: 15px;

      &.header {
        display: none;
      }

      .api-name,
      .api-type,
      .api-description {
        padding: 3px 0;
      }

      .api-name::before {
        content: "名称: ";
        font-weight: 600;
        color: @text-color;
      }

      .api-type::before {
        content: "类型: ";
        font-weight: 600;
        color: @text-color;
      }

      .api-description::before {
        content: "描述: ";
        font-weight: 600;
        color: @text-color;
      }
    }
  }
}

@media (max-width: 480px) {
  .header {
    padding: 20px 0 15px;

    h1 {
      font-size: 1.7rem;
    }

    p {
      font-size: 1rem;
    }
  }

  .api-section h2 {
    font-size: 1.3rem;
  }

  .tabs button {
    padding: 6px 12px;
    font-size: 0.85rem;
  }
}
</style>
