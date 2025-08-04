<template>
  <div class="bom-reference">
    <div class="header">
      <div class="title-container">
        <h1 class="title">BOM 对象参考手册</h1>
        <p class="subtitle">浏览器对象模型核心 API 指南</p>
      </div>
      <div class="search-container">
        <input type="text" placeholder="搜索 API..." v-model="searchTerm" class="search-input">
        <div class="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- 分类导航 -->
      <div class="category-nav">
        <div v-for="category in categories" :key="category.id" :class="{ active: activeCategory === category.id }"
          @click="activeCategory = category.id" class="category-btn">
          {{ category.name }}
          <span class="count">{{ getCategoryCount(category.id) }}</span>
        </div>
      </div>

      <!-- BOM 对象列表 -->
      <div class="objects-container">
        <!-- window 对象 -->
        <div v-if="showObject('window')" class="object-card">
          <div class="object-header">
            <div class="object-name-container">
              <span class="object-name">window</span>
              <span class="object-type">全局对象</span>
            </div>
            <div class="object-description">
              浏览器窗口的全局对象，代表浏览器窗口或标签页
            </div>
          </div>

          <div class="api-section">
            <h3 class="api-section-title">属性</h3>
            <div class="api-table">
              <div class="api-row header">
                <div class="api-name">名称</div>
                <div class="api-type">类型</div>
                <div class="api-description">描述</div>
              </div>
              <div class="api-row">
                <div class="api-name">innerWidth</div>
                <div class="api-type">number</div>
                <div class="api-description">浏览器窗口的视口宽度（包含滚动条）</div>
              </div>
              <div class="api-row">
                <div class="api-name">innerHeight</div>
                <div class="api-type">number</div>
                <div class="api-description">浏览器窗口的视口高度（包含滚动条）</div>
              </div>
              <div class="api-row">
                <div class="api-name">outerWidth</div>
                <div class="api-type">number</div>
                <div class="api-description">整个浏览器窗口的宽度（包含工具栏等）</div>
              </div>
              <div class="api-row">
                <div class="api-name">outerHeight</div>
                <div class="api-type">number</div>
                <div class="api-description">整个浏览器窗口的高度（包含工具栏等）</div>
              </div>
              <div class="api-row">
                <div class="api-name">scrollX</div>
                <div class="api-type">number</div>
                <div class="api-description">文档的水平滚动距离（别名：pageXOffset）</div>
              </div>
              <div class="api-row">
                <div class="api-name">scrollY</div>
                <div class="api-type">number</div>
                <div class="api-description">文档的垂直滚动距离（别名：pageYOffset）</div>
              </div>
              <div class="api-row">
                <div class="api-name">localStorage</div>
                <div class="api-type">Storage</div>
                <div class="api-description">用于持久化存储键值对的本地存储对象</div>
              </div>
              <div class="api-row">
                <div class="api-name">sessionStorage</div>
                <div class="api-type">Storage</div>
                <div class="api-description">用于会话期间存储键值对的本地存储对象</div>
              </div>
            </div>
          </div>

          <div class="api-section">
            <h3 class="api-section-title">方法</h3>
            <div class="api-table">
              <div class="api-row header">
                <div class="api-name">名称</div>
                <div class="api-type">参数</div>
                <div class="api-description">描述</div>
              </div>
              <div class="api-row">
                <div class="api-name">alert()</div>
                <div class="api-type">message: string</div>
                <div class="api-description">显示带有消息和确定按钮的警告对话框</div>
              </div>
              <div class="api-row">
                <div class="api-name">confirm()</div>
                <div class="api-type">message: string</div>
                <div class="api-description">显示带有消息、确定和取消按钮的对话框</div>
              </div>
              <div class="api-row">
                <div class="api-name">prompt()</div>
                <div class="api-type">message, defaultText</div>
                <div class="api-description">显示带有消息、输入框和按钮的对话框</div>
              </div>
              <div class="api-row">
                <div class="api-name">setTimeout()</div>
                <div class="api-type">callback, delay, ...args</div>
                <div class="api-description">设置定时器，在指定延迟后执行函数</div>
              </div>
              <div class="api-row">
                <div class="api-name">clearTimeout()</div>
                <div class="api-type">timeoutID</div>
                <div class="api-description">取消由 setTimeout() 设置的定时器</div>
              </div>
              <div class="api-row">
                <div class="api-name">setInterval()</div>
                <div class="api-type">callback, delay, ...args</div>
                <div class="api-description">设置重复执行的定时器</div>
              </div>
              <div class="api-row">
                <div class="api-name">clearInterval()</div>
                <div class="api-type">intervalID</div>
                <div class="api-description">取消由 setInterval() 设置的定时器</div>
              </div>
              <div class="api-row">
                <div class="api-name">requestAnimationFrame()</div>
                <div class="api-type">callback</div>
                <div class="api-description">请求浏览器在下一次重绘前执行动画函数</div>
              </div>
              <div class="api-row">
                <div class="api-name">open()</div>
                <div class="api-type">url, name, specs</div>
                <div class="api-description">打开新浏览器窗口或查找已命名窗口</div>
              </div>
              <div class="api-row">
                <div class="api-name">close()</div>
                <div class="api-type">-</div>
                <div class="api-description">关闭当前浏览器窗口</div>
              </div>
              <div class="api-row">
                <div class="api-name">scrollTo()</div>
                <div class="api-type">x, y | options</div>
                <div class="api-description">滚动到文档中的特定位置</div>
              </div>
            </div>
          </div>
        </div>

        <!-- location 对象 -->
        <div v-if="showObject('location')" class="object-card">
          <div class="object-header">
            <div class="object-name-container">
              <span class="object-name">location</span>
              <span class="object-type">URL 对象</span>
            </div>
            <div class="object-description">
              提供当前窗口加载文档的信息和导航功能
            </div>
          </div>

          <div class="api-section">
            <h3 class="api-section-title">属性</h3>
            <div class="api-table">
              <div class="api-row header">
                <div class="api-name">名称</div>
                <div class="api-type">类型</div>
                <div class="api-description">描述</div>
              </div>
              <div class="api-row">
                <div class="api-name">href</div>
                <div class="api-type">string</div>
                <div class="api-description">当前页面的完整 URL（可设置以导航）</div>
              </div>
              <div class="api-row">
                <div class="api-name">protocol</div>
                <div class="api-type">string</div>
                <div class="api-description">URL 的协议部分（如 http:、https:）</div>
              </div>
              <div class="api-row">
                <div class="api-name">host</div>
                <div class="api-type">string</div>
                <div class="api-description">主机名和端口号（如 example.com:8080）</div>
              </div>
              <div class="api-row">
                <div class="api-name">hostname</div>
                <div class="api-type">string</div>
                <div class="api-description">域名（如 example.com）</div>
              </div>
              <div class="api-row">
                <div class="api-name">port</div>
                <div class="api-type">string</div>
                <div class="api-description">端口号（如 8080）</div>
              </div>
              <div class="api-row">
                <div class="api-name">pathname</div>
                <div class="api-type">string</div>
                <div class="api-description">URL 的路径部分（如 /path/to/file.html）</div>
              </div>
              <div class="api-row">
                <div class="api-name">search</div>
                <div class="api-type">string</div>
                <div class="api-description">URL 的查询字符串部分（如 ?id=123）</div>
              </div>
              <div class="api-row">
                <div class="api-name">hash</div>
                <div class="api-type">string</div>
                <div class="api-description">URL 的锚点部分（如 #section1）</div>
              </div>
              <div class="api-row">
                <div class="api-name">origin</div>
                <div class="api-type">string</div>
                <div class="api-description">URL 的源（协议+域名+端口，只读）</div>
              </div>
            </div>
          </div>

          <div class="api-section">
            <h3 class="api-section-title">方法</h3>
            <div class="api-table">
              <div class="api-row header">
                <div class="api-name">名称</div>
                <div class="api-type">参数</div>
                <div class="api-description">描述</div>
              </div>
              <div class="api-row">
                <div class="api-name">assign()</div>
                <div class="api-type">url</div>
                <div class="api-description">加载新文档（添加新历史记录）</div>
              </div>
              <div class="api-row">
                <div class="api-name">reload()</div>
                <div class="api-type">forceReload: boolean</div>
                <div class="api-description">重新加载当前文档</div>
              </div>
              <div class="api-row">
                <div class="api-name">replace()</div>
                <div class="api-type">url</div>
                <div class="api-description">替换当前文档（不添加新历史记录）</div>
              </div>
              <div class="api-row">
                <div class="api-name">toString()</div>
                <div class="api-type">-</div>
                <div class="api-description">返回完整的 URL 字符串</div>
              </div>
            </div>
          </div>
        </div>

        <!-- history 对象 -->
        <div v-if="showObject('history')" class="object-card">
          <div class="object-header">
            <div class="object-name-container">
              <span class="object-name">history</span>
              <span class="object-type">历史记录对象</span>
            </div>
            <div class="object-description">
              提供访问浏览器会话历史的接口
            </div>
          </div>

          <div class="api-section">
            <h3 class="api-section-title">属性</h3>
            <div class="api-table">
              <div class="api-row header">
                <div class="api-name">名称</div>
                <div class="api-type">类型</div>
                <div class="api-description">描述</div>
              </div>
              <div class="api-row">
                <div class="api-name">length</div>
                <div class="api-type">number</div>
                <div class="api-description">会话历史记录中的条目数</div>
              </div>
              <div class="api-row">
                <div class="api-name">scrollRestoration</div>
                <div class="api-type">'auto' | 'manual'</div>
                <div class="api-description">控制是否在导航时恢复滚动位置</div>
              </div>
              <div class="api-row">
                <div class="api-name">state</div>
                <div class="api-type">any</div>
                <div class="api-description">当前历史记录项的状态对象</div>
              </div>
            </div>
          </div>

          <div class="api-section">
            <h3 class="api-section-title">方法</h3>
            <div class="api-table">
              <div class="api-row header">
                <div class="api-name">名称</div>
                <div class="api-type">参数</div>
                <div class="api-description">描述</div>
              </div>
              <div class="api-row">
                <div class="api-name">back()</div>
                <div class="api-type">-</div>
                <div class="api-description">返回上一页（等价于 history.go(-1)）</div>
              </div>
              <div class="api-row">
                <div class="api-name">forward()</div>
                <div class="api-type">-</div>
                <div class="api-description">前进到下一页（等价于 history.go(1)）</div>
              </div>
              <div class="api-row">
                <div class="api-name">go()</div>
                <div class="api-type">delta: number</div>
                <div class="api-description">在历史记录中前进或后退指定页数</div>
              </div>
              <div class="api-row">
                <div class="api-name">pushState()</div>
                <div class="api-type">state, title, url</div>
                <div class="api-description">添加新的历史记录项（不重新加载页面）</div>
              </div>
              <div class="api-row">
                <div class="api-name">replaceState()</div>
                <div class="api-type">state, title, url</div>
                <div class="api-description">替换当前历史记录项（不重新加载页面）</div>
              </div>
            </div>
          </div>
        </div>

        <!-- navigator 对象 -->
        <div v-if="showObject('navigator')" class="object-card">
          <div class="object-header">
            <div class="object-name-container">
              <span class="object-name">navigator</span>
              <span class="object-type">浏览器信息对象</span>
            </div>
            <div class="object-description">
              提供有关浏览器和用户环境的信息
            </div>
          </div>

          <div class="api-section">
            <h3 class="api-section-title">属性</h3>
            <div class="api-table">
              <div class="api-row header">
                <div class="api-name">名称</div>
                <div class="api-type">类型</div>
                <div class="api-description">描述</div>
              </div>
              <div class="api-row">
                <div class="api-name">userAgent</div>
                <div class="api-type">string</div>
                <div class="api-description">浏览器的用户代理字符串</div>
              </div>
              <div class="api-row">
                <div class="api-name">language</div>
                <div class="api-type">string</div>
                <div class="api-description">浏览器的首选语言（如 "en-US"）</div>
              </div>
              <div class="api-row">
                <div class="api-name">languages</div>
                <div class="api-type">string[]</div>
                <div class="api-description">用户偏好语言的有序数组</div>
              </div>
              <div class="api-row">
                <div class="api-name">onLine</div>
                <div class="api-type">boolean</div>
                <div class="api-description">浏览器是否联网</div>
              </div>
              <div class="api-row">
                <div class="api-name">cookieEnabled</div>
                <div class="api-type">boolean</div>
                <div class="api-description">浏览器是否启用 cookie</div>
              </div>
              <div class="api-row">
                <div class="api-name">platform</div>
                <div class="api-type">string</div>
                <div class="api-description">浏览器运行的平台（如 "Win32"）</div>
              </div>
              <div class="api-row">
                <div class="api-name">hardwareConcurrency</div>
                <div class="api-type">number</div>
                <div class="api-description">用户计算机的逻辑处理器核心数</div>
              </div>
              <div class="api-row">
                <div class="api-name">deviceMemory</div>
                <div class="api-type">number</div>
                <div class="api-description">设备的内存容量（以 GB 为单位）</div>
              </div>
              <div class="api-row">
                <div class="api-name">maxTouchPoints</div>
                <div class="api-type">number</div>
                <div class="api-description">设备支持的触摸点数</div>
              </div>
            </div>
          </div>

          <div class="api-section">
            <h3 class="api-section-title">方法</h3>
            <div class="api-table">
              <div class="api-row header">
                <div class="api-name">名称</div>
                <div class="api-type">参数</div>
                <div class="api-description">描述</div>
              </div>
              <div class="api-row">
                <div class="api-name">geolocation.getCurrentPosition()</div>
                <div class="api-type">success, error, options</div>
                <div class="api-description">获取设备的当前位置</div>
              </div>
              <div class="api-row">
                <div class="api-name">geolocation.watchPosition()</div>
                <div class="api-type">success, error, options</div>
                <div class="api-description">监视设备位置变化</div>
              </div>
              <div class="api-row">
                <div class="api-name">vibrate()</div>
                <div class="api-type">pattern</div>
                <div class="api-description">使设备振动（支持移动设备）</div>
              </div>
              <div class="api-row">
                <div class="api-name">sendBeacon()</div>
                <div class="api-type">url, data</div>
                <div class="api-description">异步传输少量数据</div>
              </div>
              <div class="api-row">
                <div class="api-name">share()</div>
                <div class="api-type">data</div>
                <div class="api-description">调用设备的本机共享机制</div>
              </div>
              <div class="api-row">
                <div class="api-name">requestMediaKeySystemAccess()</div>
                <div class="api-type">keySystem, supportedConfigurations</div>
                <div class="api-description">请求媒体密钥系统访问（用于 DRM）</div>
              </div>
            </div>
          </div>
        </div>

        <!-- screen 对象 -->
        <div v-if="showObject('screen')" class="object-card">
          <div class="object-header">
            <div class="object-name-container">
              <span class="object-name">screen</span>
              <span class="object-type">屏幕信息对象</span>
            </div>
            <div class="object-description">
              提供用户屏幕的信息，如分辨率、颜色深度等
            </div>
          </div>

          <div class="api-section">
            <h3 class="api-section-title">属性</h3>
            <div class="api-table">
              <div class="api-row header">
                <div class="api-name">名称</div>
                <div class="api-type">类型</div>
                <div class="api-description">描述</div>
              </div>
              <div class="api-row">
                <div class="api-name">width</div>
                <div class="api-type">number</div>
                <div class="api-description">屏幕的总宽度（像素）</div>
              </div>
              <div class="api-row">
                <div class="api-name">height</div>
                <div class="api-type">number</div>
                <div class="api-description">屏幕的总高度（像素）</div>
              </div>
              <div class="api-row">
                <div class="api-name">availWidth</div>
                <div class="api-type">number</div>
                <div class="api-description">屏幕的可用宽度（扣除任务栏等）</div>
              </div>
              <div class="api-row">
                <div class="api-name">availHeight</div>
                <div class="api-type">number</div>
                <div class="api-description">屏幕的可用高度（扣除任务栏等）</div>
              </div>
              <div class="api-row">
                <div class="api-name">colorDepth</div>
                <div class="api-type">number</div>
                <div class="api-description">屏幕的颜色深度（如 24、32）</div>
              </div>
              <div class="api-row">
                <div class="api-name">pixelDepth</div>
                <div class="api-type">number</div>
                <div class="api-description">屏幕的像素深度（通常与 colorDepth 相同）</div>
              </div>
              <div class="api-row">
                <div class="api-name">orientation</div>
                <div class="api-type">ScreenOrientation</div>
                <div class="api-description">屏幕方向信息（角度和类型）</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>BOM 对象参考手册 © 2023 | 包含 5 个核心 BOM 对象，{{ apiCount }} 个 API</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 搜索关键词
const searchTerm = ref('');
// 当前活跃的分类
const activeCategory = ref('all');

// 分类数据
const categories = [
  { id: 'all', name: '全部对象' },
  { id: 'window', name: 'window' },
  { id: 'location', name: 'location' },
  { id: 'history', name: 'history' },
  { id: 'navigator', name: 'navigator' },
  { id: 'screen', name: 'screen' }
];

// 计算 API 总数
const apiCount = computed(() => {
  // 属性统计
  const props = [
    ...windowProps, ...locationProps,
    ...historyProps,
    ...navigatorProps,
    ...screenProps
  ];

  //方法统计
  const methods = [
    ...windowMethods,
    ...locationMethods,
    ...historyMethods,
    ...navigatorMethods
  ];

  return props.length + methods.length;
});

// 计算过滤后的事件列表
const showObject = (objectId: string) => {
  // 检查是否在活动分类中
  const matchesCategory = activeCategory.value === 'all' || activeCategory.value === objectId;

  // 检查是否符索条件
  const matchesSearch = !searchTerm.value ||
    objectId.toLowerCase().includes(searchTerm.value.toLowerCase());

  return matchesCategory && matchesSearch;
};

// 获取分类的事件数量
const getCategoryCount = (categoryId: string) => {
  if (categoryId === 'all') return 5;
  return 1;
};

// 初始化
onMounted(() => {
  // 如果搜索参数存在，设置搜索词
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search');
  if (searchParam) {
    searchTerm.value = searchParam;
  }
});

// 对象数据定义 (实际使用中这些是动态生成的)
const windowProps = [
  { name: 'innerWidth', type: 'number' },
  { name: 'innerHeight', type: 'number' },
  { name: 'outerWidth', type: 'number' },
  { name: 'outerHeight', type: 'number' },
  { name: 'scrollX', type: 'number' },
  { name: 'scrollY', type: 'number' },
  { name: 'localStorage', type: 'Storage' },
  { name: 'sessionStorage', type: 'Storage' }
];

const windowMethods = [
  { name: 'alert()', params: 'message: string' },
  { name: 'confirm()', params: 'message: string' },
  { name: 'setTimeout()', params: 'callback, delay, ...args' },
  { name: 'clearTimeout()', params: 'timeoutID' },
  { name: 'setInterval()', params: 'callback, delay, ...args' },
  { name: 'clearInterval()', params: 'intervalID' },
  { name: 'requestAnimationFrame()', params: 'callback' },
  { name: 'open()', params: 'url, name, specs' },
  { name: 'close()', params: '-' },
  { name: 'scrollTo()', params: 'x, y | options' }
];

const locationProps = [
  { name: 'href', type: 'string' },
  { name: 'protocol', type: 'string' },
  { name: 'host', type: 'string' },
  { name: 'hostname', type: 'string' },
  { name: 'port', type: 'string' },
  { name: 'pathname', type: 'string' },
  { name: 'search', type: 'string' },
  { name: 'hash', type: 'string' },
  { name: 'origin', type: 'string' }
];

const locationMethods = [
  { name: 'assign()', params: 'url' },
  { name: 'reload()', params: 'forceReload: boolean' },
  { name: 'replace()', params: 'url' },
  { name: 'toString()', params: '-' }
];

const historyProps = [
  { name: 'length', type: 'number' },
  { name: 'scrollRestoration', type: "'auto' | 'manual'" },
  { name: 'state', type: 'any' }
];

const historyMethods = [
  { name: 'back()', params: '-' },
  { name: 'forward()', params: '-' },
  { name: 'go()', params: 'delta: number' },
  { name: 'pushState()', params: 'state, title, url' },
  { name: 'replaceState()', params: 'state, title, url' }
];

const navigatorProps = [
  { name: 'userAgent', type: 'string' },
  { name: 'language', type: 'string' },
  { name: 'languages', type: 'string[]' },
  { name: 'onLine', type: 'boolean' },
  { name: 'cookieEnabled', type: 'boolean' },
  { name: 'platform', type: 'string' },
  { name: 'hardwareConcurrency', type: 'number' },
  { name: 'deviceMemory', type: 'number' },
  { name: 'maxTouchPoints', type: 'number' }
];

const navigatorMethods = [
  { name: 'geolocation.getCurrentPosition()', params: 'success, error, options' },
  { name: 'geolocation.watchPosition()', params: 'success, error, options' },
  { name: 'vibrate()', params: 'pattern' },
  { name: 'sendBeacon()', params: 'url, data' },
  { name: 'share()', params: 'data' },
  { name: 'requestMediaKeySystemAccess()', params: 'keySystem, supportedConfigurations' }
];

const screenProps = [
  { name: 'width', type: 'number' },
  { name: 'height', type: 'number' },
  { name: 'availWidth', type: 'number' },
  { name: 'availHeight', type: 'number' },
  { name: 'colorDepth', type: 'number' },
  { name: 'pixelDepth', type: 'number' },
  { name: 'orientation', type: 'ScreenOrientation' }
];
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

// 类型颜色
@window-color: #4361ee;
@location-color: #10b981;
@history-color: #f59e0b;
@navigator-color: #ef476f;
@screen-color: #9d4edd;

// 布局变量
@header-height: 150px;
@card-radius: 12px;
@transition-speed: 0.15s;

.bom-reference {
  font-family: 'Inter', sans-serif;
  background-color: @light-bg;
  color: @text-color;
  min-height: 100vh;
  padding-bottom: 40px;
  line-height: 1.5;
}

.header {
  height: @header-height;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  padding: 0 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);

  .title-container {
    margin-bottom: 16px;

    .title {
      font-size: 2.2rem;
      font-weight: 700;
      color: white;
      margin: 0 0 6px 0;
    }

    .subtitle {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.85);
      margin: 0;
      font-weight: 400;
    }
  }

  .search-container {
    position: relative;
    max-width: 500px;

    .search-input {
      width: 100%;
      padding: 12px 42px 12px 18px;
      border: none;
      border-radius: 30px;
      font-size: 0.95rem;
      outline: none;
      transition: all @transition-speed;

      &:focus {
        box-shadow: 0 4px 15px rgba(67, 97, 238, 0.25);
      }
    }

    .search-icon {
      position: absolute;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      color: lighten(@text-color, 40%);

      svg {
        fill: currentColor;
      }
    }
  }
}

.container {
  max-width: 1200px;
  margin: 30px auto 0;
  padding: 0 20px;
}

.category-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 25px;

  .category-btn {
    background: white;
    border: 1px solid @border-color;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 0.9rem;
    font-weight: 500;
    color: lighten(@text-color, 15%);
    cursor: pointer;
    transition: all @transition-speed;
    display: flex;
    align-items: center;

    &:hover {
      border-color: @primary-color;
      color: @primary-color;
    }

    &.active {
      background: @primary-color;
      border-color: @primary-color;
      color: white;
    }

    .count {
      margin-left: 6px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      padding: 1px 6px;
      font-size: 0.8rem;
    }
  }
}

.objects-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.object-card {
  background: @card-bg;
  border-radius: @card-radius;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  border-left: 3px solid @primary-color;

  &:nth-child(1) {
    border-left-color: @window-color;
  }

  &:nth-child(2) {
    border-left-color: @location-color;
  }

  &:nth-child(3) {
    border-left-color: @history-color;
  }

  &:nth-child(4) {
    border-left-color: @navigator-color;
  }

  &:nth-child(5) {
    border-left-color: @screen-color;
  }
}

.object-header {
  padding: 15px 20px;
  background: rgba(@primary-color, 0.03);
  border-bottom: 1px solid @border-color;

  .object-name-container {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .object-name {
      font-size: 1.3rem;
      font-weight: 600;
      color: @primary-color;
      margin-right: 12px;
    }

    .object-type {
      font-size: 0.85rem;
      font-weight: 500;
      background: rgba(@primary-color, 0.15);
      padding: 3px 8px;
      border-radius: 4px;
      color: darken(@primary-color, 10%);
    }
  }

  .object-description {
    font-size: 0.95rem;
    color: lighten(@text-color, 15%);
  }
}

.api-section {
  padding: 0 20px;
  margin-bottom: 20px;

  .api-section-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: @secondary-color;
    margin: 18px 0 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid @border-color;
  }
}

.api-table {
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid @border-color;
  border-radius: 8px;
  overflow: hidden;

  .api-row {
    display: grid;
    grid-template-columns: 1.5fr 1fr 3fr;
    padding: 10px 15px;
    border-bottom: 1px solid @border-color;

    &:last-child {
      border-bottom: none;
    }

    &.header {
      background: rgba(@primary-color, 0.06);
      font-weight: 600;
      font-size: 0.9rem;
      color: darken(@primary-color, 10%);
    }

    .api-name {
      font-weight: 500;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      color: @primary-color;
    }

    .api-type {
      font-size: 0.9rem;
      color: lighten(@text-color, 15%);
      font-family: 'Fira Code', monospace;
    }

    .api-description {
      font-size: 0.9rem;
      color: lighten(@text-color, 10%);
      padding-left: 10px;
    }
  }
}

.footer {
  text-align: center;
  padding: 40px 0 20px;
  margin-top: 30px;
  color: lighten(@text-color, 25%);
  font-size: 0.9rem;
}

// 响应式设计
@media (max-width: 768px) {
  .header {
    height: auto;
    padding: 25px 5%;

    .title-container {
      .title {
        font-size: 1.7rem;
      }

      .subtitle {
        font-size: 1rem;
      }
    }
  }

  .api-table {
    .api-row {
      grid-template-columns: 1fr;
      gap: 5px;

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

  .category-nav {
    gap: 6px;

    .category-btn {
      padding: 6px 12px;
      font-size: 0.85rem;
    }
  }
}

@media (max-width: 480px) {
  .header {
    padding: 20px 5%;
  }

  .object-header {
    padding: 12px 15px;
  }

  .api-section {
    padding: 0 15px;
  }
}
</style>
