<template>
  <div class="loading-events">
    <div class="header">
      <h1>前端加载事件基本指南</h1>
      <p>掌握关键资源加载时机，优化用户体验</p>
    </div>

    <div class="event-timeline">
      <div class="timeline-header">
        <h2>页面加载生命周期</h2>
        <div class="timeline-controls">
          <button @click="prevEvent">←</button>
          <span>{{ currentEventIndex + 1 }}/{{ timelineEvents.length }}</span>
          <button @click="nextEvent">→</button>
        </div>
      </div>
      <div class="timeline-bar">
        <div v-for="(event, index) in timelineEvents" :key="event.id" class="timeline-event" :class="{
          active: index === currentEventIndex,
          passed: index < currentEventIndex
        }" @click="currentEventIndex = index">
          <div class="event-marker"></div>
          <div class="event-label">{{ event.name }}</div>
        </div>
      </div>
      <div class="timeline-detail">
        <div class="event-card">
          <div class="event-icon">{{ currentEvent.icon }}</div>
          <div class="event-content">
            <h3>{{ currentEvent.name }}</h3>
            <div class="event-meta">
              <span class="event-timing">触发时机: {{ currentEvent.timing }}</span>
              <span class="event-target">作用对象: {{ currentEvent.target }}</span>
            </div>
            <p class="event-description">{{ currentEvent.description }}</p>

            <div class="event-scenarios">
              <h4>使用场景</h4>
              <ul>
                <li v-for="(scenario, idx) in currentEvent.scenarios" :key="idx">{{ scenario }}</li>
              </ul>
            </div>

            <div class="event-example">
              <h4>代码示例</h4>
              <pre>{{ currentEvent.example }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="events-grid">
      <div class="grid-header">
        <h2>资源加载事件基础介绍</h2>
        <div class="filter-controls">
          <div v-for="category in categories" :key="category" class="filter-tag"
            :class="{ active: activeCategory === category }" @click="activeCategory = category">
            {{ category }}
          </div>
        </div>
      </div>

      <div class="events-container">
        <div v-for="event in filteredEvents" :key="event.id" class="event-item" :class="event.category">
          <div class="item-header">
            <div class="item-icon">{{ event.icon }}</div>
            <h3>{{ event.name }}</h3>
            <div class="item-category">{{ event.category }}</div>
          </div>

          <div class="item-details">
            <div class="detail-row">
              <span class="detail-label">触发时机:</span>
              <span>{{ event.timing }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">作用对象:</span>
              <span>{{ event.target }}</span>
            </div>
          </div>

          <div class="item-scenarios">
            <h4>使用场景</h4>
            <ul>
              <li v-for="(scenario, idx) in event.scenarios" :key="idx">{{ scenario }}</li>
            </ul>
          </div>

          <div class="item-example">
            <pre>{{ event.example }}</pre>
          </div>
        </div>
      </div>
    </div>

    <div class="best-practices">
      <h2>加载事件最佳实践</h2>
      <div class="practices-grid">
        <div class="practice-card">
          <div class="practice-icon">🚀</div>
          <h3>性能优化</h3>
          <ul>
            <li>使用DOMContentLoaded启动非关键操作</li>
            <li>利用load事件触发分析统计</li>
            <li>延迟加载非首屏资源</li>
          </ul>
        </div>

        <div class="practice-card">
          <div class="practice-icon">🛠️</div>
          <h3>错误处理</h3>
          <ul>
            <li>为所有资源添加onerror处理</li>
            <li>实现资源加载超时检测</li>
            <li>提供备用内容或降级方案</li>
          </ul>
        </div>

        <div class="practice-card">
          <div class="practice-icon">📱</div>
          <h3>用户体验</h3>
          <ul>
            <li>使用加载动画提升感知</li>
            <li>实现渐进式内容加载</li>
            <li>提供加载状态反馈</li>
          </ul>
        </div>

        <div class="practice-card">
          <div class="practice-icon">⚙️</div>
          <h3>高级技巧</h3>
          <ul>
            <li>使用Promise包装事件</li>
            <li>组合多个资源加载事件</li>
            <li>实现资源优先级队列</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>掌握加载事件是前端性能优化和用户体验提升的关键技术</p>
      <p>根据业务需求选择合适的加载事件，可以显著提升应用质量</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const currentEventIndex = ref(0);
const activeCategory = ref('全部');

const categories = ['全部', '文档事件', '资源事件', 'API事件', '媒体事件'];

const timelineEvents = [
  {
    id: 'domInteractive',
    name: 'DOMContentLoaded',
    icon: '📄',
    timing: '初始HTML文档加载和解析完成后',
    target: 'document',
    description: '当浏览器完成HTML文档的解析,且所有延迟脚本（<script defer src="…"> 和 <script type="module">）下载和执行完毕后,并且DOM树构建完成时触发，此时样式表、图片和子框架可能仍在加载。DOMContentLoaded 不会等待样式表加载，但延迟脚本会等待样式表，而且 DOMContentLoaded 事件排在延迟脚本之后。此外，非延迟或异步的脚本（如 <script>）将等待已解析的样式表加载',
    scenarios: [
      '初始化DOM操作',
      '绑定事件监听器',
      '执行不依赖外部资源的脚本'
    ],
    example: `document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM已完全解析');
  // 初始化应用
});`
  },
  {
    id: 'load',
    name: 'window.onload',
    icon: '🖼️',
    timing: '所有资源加载完成后',
    target: 'window',
    description: '当整个页面及所有依赖资源（样式、图片、iframe等）完成加载后触发。',
    scenarios: [
      '执行依赖完整页面的脚本',
      '触发页面分析统计',
      '初始化需要完整尺寸的组件'
    ],
    example: `window.onload = function() {
  console.log('所有资源加载完成');
  // 执行页面初始化
};`
  },
  {
    id: 'beforeunload',
    name: 'beforeunload',
    icon: '🚪',
    timing: '页面即将卸载前',
    target: 'window',
    description: '在窗口、文档或资源即将卸载时触发，允许开发者询问用户是否确认离开当前页面。',
    scenarios: [
      '防止用户意外离开页面',
      '保存草稿或临时数据',
      '清理资源'
    ],
    example: `window.addEventListener('beforeunload', (event) => {
  // 显示确认对话框
  event.preventDefault();
  event.returnValue = '';
  return '您确定要离开吗？未保存的数据将会丢失。';
});`
  },
  {
    id: 'unload',
    name: 'unload',
    icon: '👋',
    timing: '页面完全卸载后',
    target: 'window',
    description: '当文档或子资源正在被卸载时触发，此时页面正在被移除。',
    scenarios: [
      '发送分析数据',
      '清理定时器和事件监听',
      '释放内存'
    ],
    example: `window.addEventListener('unload', function() {
  // 清理操作
  navigator.sendBeacon('/analytics', analyticsData);
});`
  }
];

const resourceEvents = [
  {
    id: 'imgOnload',
    name: 'img.onload',
    icon: '🖼️',
    category: '资源事件',
    timing: '图片加载完成后',
    target: 'HTMLImageElement',
    description: '当单个图片资源加载完成时触发，用于处理图片加载完成后的操作。',
    scenarios: [
      '图片加载后调整布局',
      '实现图片懒加载',
      '构建图片画廊'
    ],
    example: `const img = new Image();
img.src = 'image.jpg';
img.onload = function() {
  console.log('图片加载完成');
  document.body.appendChild(img);
};
img.onerror = function() {
  console.error('图片加载失败');
};`
  },
  {
    id: 'scriptOnload',
    name: 'script.onload',
    icon: '📜',
    category: '资源事件',
    timing: '脚本加载并执行完成后',
    target: 'HTMLScriptElement',
    description: '当外部脚本加载并执行完成后触发，用于处理脚本依赖关系。',
    scenarios: [
      '动态加载第三方库',
      '按需加载模块',
      '管理脚本依赖'
    ],
    example: `const script = document.createElement('script');
script.src = 'https://example.com/library.js';
script.onload = function() {
  console.log('脚本加载完成');
  // 使用库功能
  Library.init();
};
document.head.appendChild(script);`
  },
  {
    id: 'linkOnload',
    name: 'link.onload',
    icon: '🎨',
    category: '资源事件',
    timing: 'CSS样式表加载完成后',
    target: 'HTMLLinkElement',
    description: '当外部CSS样式表加载完成时触发，用于处理样式依赖。',
    scenarios: [
      '动态加载主题样式',
      '实现CSS按需加载',
      '加载完成后应用样式切换'
    ],
    example: `const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'styles.css';
link.onload = function() {
  console.log('样式表加载完成');
  document.body.classList.add('styles-loaded');
};
document.head.appendChild(link);`
  },
  {
    id: 'fileReaderOnload',
    name: 'FileReader.onload',
    icon: '📁',
    category: 'API事件',
    timing: '文件读取操作完成后',
    target: 'FileReader',
    description: '当文件读取操作成功完成时触发，用于处理文件内容。',
    scenarios: [
      '预览上传的图片',
      '解析文本文件内容',
      '客户端文件处理'
    ],
    example: `const reader = new FileReader();
reader.onload = function(e) {
  const content = e.target.result;
  console.log('文件读取完成', content);
  // 显示文件内容
};
reader.readAsText(file);`
  },
  {
    id: 'xhrOnload',
    name: 'XMLHttpRequest.onload',
    icon: '🌐',
    category: 'API事件',
    timing: '请求成功完成时',
    target: 'XMLHttpRequest',
    description: '当请求成功完成时触发（无论HTTP状态码如何），用于处理响应数据。',
    scenarios: [
      'AJAX数据请求',
      'API接口调用',
      '数据提交'
    ],
    example: `const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data');
xhr.onload = function() {
  if (xhr.status === 200) {
    console.log('数据加载成功', xhr.response);
  }
};
xhr.send();`
  },
  {
    id: 'fetchOnload',
    name: 'fetch().then()',
    icon: '🔁',
    category: 'API事件',
    timing: '请求完成并解析响应后',
    target: 'Promise',
    description: 'fetch API返回的Promise在请求完成并解析响应后解决，用于处理现代网络请求。',
    scenarios: [
      '现代AJAX请求',
      'REST API调用',
      '流式数据处理'
    ],
    example: `fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    console.log('数据加载成功', data);
  })
  .catch(error => {
    console.error('请求失败', error);
  });`
  },
  {
    id: 'iframeOnload',
    name: 'iframe.onload',
    icon: '📦',
    category: '资源事件',
    timing: 'iframe内容加载完成后',
    target: 'HTMLIFrameElement',
    description: '当iframe内的文档完全加载完成后触发，用于处理嵌入内容。',
    scenarios: [
      '嵌入第三方内容',
      '实现无刷新导航',
      '跨域通信准备'
    ],
    example: `const iframe = document.createElement('iframe');
iframe.src = 'https://example.com';
iframe.onload = function() {
  console.log('iframe加载完成');
  // 访问iframe内容
};
document.body.appendChild(iframe);`
  },
  {
    id: 'videoLoadedData',
    name: 'video.onloadeddata',
    icon: '🎥',
    category: '媒体事件',
    timing: '媒体第一帧加载完成后',
    target: 'HTMLVideoElement',
    description: '当媒体第一帧加载完成，可以开始播放时触发，用于处理媒体内容。',
    scenarios: [
      '视频播放器初始化',
      '自定义视频加载动画',
      '媒体内容处理'
    ],
    example: `const video = document.createElement('video');
video.src = 'video.mp4';
video.onloadeddata = function() {
  console.log('视频第一帧已加载');
  video.play();
};`
  },
  {
    id: 'windowPageshow',
    name: 'window.onpageshow',
    icon: '↪️',
    category: '文档事件',
    timing: '页面显示时（包括前进/后退缓存恢复）',
    target: 'window',
    description: '当页面显示时触发，包括从浏览器缓存中恢复的情况（如后退/前进导航）。',
    scenarios: [
      '处理页面缓存恢复',
      '更新动态内容',
      '重新初始化组件'
    ],
    example: `window.addEventListener('pageshow', (event) => {
  // 检查页面是否从缓存中恢复
  if (event.persisted) {
    console.log('页面从缓存中恢复');
    // 重新初始化
  }
});`
  },
  {
    id: 'documentReadystate',
    name: 'document.readystatechange',
    icon: '🔄',
    category: '文档事件',
    timing: '文档的readyState属性变化时',
    target: 'document',
    description: '当文档的readyState属性发生变化时触发，用于监听文档加载状态变化。',
    scenarios: [
      '监听文档加载状态',
      '在DOMContentLoaded之前执行操作',
      '兼容性处理'
    ],
    example: `document.onreadystatechange = function() {
  if (document.readyState === 'interactive') {
    console.log('DOMContentLoaded即将触发');
  }
  if (document.readyState === 'complete') {
    console.log('所有资源加载完成');
  }
};`
  },
  {
    id: 'windowBeforeprint',
    name: 'window.onbeforeprint',
    icon: '🖨️',
    category: '文档事件',
    timing: '打印对话框打开前',
    target: 'window',
    description: '在打印对话框打开前触发，用于优化打印样式。',
    scenarios: [
      '准备打印视图',
      '切换打印专用样式',
      '隐藏非打印元素'
    ],
    example: `window.addEventListener('beforeprint', () => {
  console.log('准备打印');
  document.body.classList.add('print-mode');
});`
  }
];

const filteredEvents = computed(() => {
  if (activeCategory.value === '全部') {
    return resourceEvents;
  }
  return resourceEvents.filter(event => event.category === activeCategory.value);
});

const currentEvent = computed(() => timelineEvents[currentEventIndex.value]);

const nextEvent = () => {
  currentEventIndex.value = (currentEventIndex.value + 1) % timelineEvents.length;
};

const prevEvent = () => {
  currentEventIndex.value = (currentEventIndex.value - 1 + timelineEvents.length) % timelineEvents.length;
};
</script>

<style lang="less" scoped>
.loading-events {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2d3748;
  background-color: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e2e8f0;

    h1 {
      font-size: 2.4rem;
      color: #2b6cb0;
      margin-bottom: 0.8rem;
      font-weight: 700;
    }

    p {
      font-size: 1.1rem;
      color: #718096;
      margin-bottom: 0;
    }
  }

  .event-timeline {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;

      h2 {
        font-size: 1.6rem;
        color: #2b6cb0;
        margin: 0;
      }

      .timeline-controls {
        display: flex;
        align-items: center;
        gap: 0.8rem;

        button {
          background: #ebf8ff;
          border: 1px solid #bee3f8;
          border-radius: 4px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            background: #bee3f8;
          }
        }

        span {
          font-size: 0.9rem;
          color: #718096;
        }
      }
    }

    .timeline-bar {
      display: flex;
      justify-content: space-between;
      position: relative;
      margin: 2rem 0;

      &::before {
        content: '';
        position: absolute;
        top: 16px;
        left: 0;
        right: 0;
        height: 3px;
        background: #e2e8f0;
        z-index: 1;
      }
    }

    .timeline-event {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      flex: 1;

      .event-marker {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: #cbd5e0;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.5rem;
        transition: all 0.3s ease;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .event-label {
        font-size: 0.9rem;
        font-weight: 600;
        text-align: center;
        color: #718096;
        transition: all 0.3s ease;
      }

      &.passed {
        .event-marker {
          background: #63b3ed;
        }

        .event-label {
          color: #4299e1;
        }
      }

      &.active {
        .event-marker {
          background: #3182ce;
          transform: scale(1.15);
          box-shadow: 0 0 0 4px rgba(49, 130, 206, 0.2);
        }

        .event-label {
          color: #2b6cb0;
          font-weight: 700;
        }
      }
    }

    .timeline-detail {
      background: #f7fafc;
      border-radius: 10px;
      padding: 1.5rem;
      border: 1px solid #e2e8f0;

      .event-card {
        display: flex;
        gap: 1.5rem;

        .event-icon {
          font-size: 3rem;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ebf8ff;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .event-content {
          flex-grow: 1;

          h3 {
            font-size: 1.5rem;
            color: #2b6cb0;
            margin-top: 0;
            margin-bottom: 0.8rem;
          }

          .event-meta {
            display: flex;
            gap: 1.5rem;
            margin-bottom: 1rem;
            font-size: 0.95rem;

            span {
              display: flex;
              align-items: center;

              &::before {
                content: '•';
                margin-right: 0.5rem;
                color: #a0aec0;
              }
            }
          }

          .event-description {
            line-height: 1.7;
            color: #4a5568;
            margin-bottom: 1.5rem;
          }

          .event-scenarios {
            margin-bottom: 1.5rem;

            h4 {
              font-size: 1.1rem;
              color: #2b6cb0;
              margin-bottom: 0.8rem;
            }

            ul {
              padding-left: 1.5rem;
              margin: 0;

              li {
                margin-bottom: 0.5rem;
                line-height: 1.6;
                color: #4a5568;
              }
            }
          }

          .event-example {
            pre {
              background: #2d3748;
              color: #e2e8f0;
              border-radius: 8px;
              padding: 1.2rem;
              font-family: 'Fira Code', monospace;
              font-size: 0.9rem;
              line-height: 1.6;
              overflow-x: auto;
            }
          }
        }
      }
    }
  }

  .events-grid {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

    .grid-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e2e8f0;

      h2 {
        font-size: 1.6rem;
        color: #2b6cb0;
        margin: 0;
      }

      .filter-controls {
        display: flex;
        gap: 0.8rem;

        .filter-tag {
          padding: 0.5rem 1rem;
          background: #e2e8f0;
          border-radius: 20px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            background: #cbd5e0;
          }

          &.active {
            background: #4299e1;
            color: white;
            font-weight: 600;
          }
        }
      }
    }

    .events-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;

      .event-item {
        background: #f7fafc;
        border-radius: 10px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
        }

        &.文档事件 {
          border-top: 4px solid #4299e1;
        }

        &.资源事件 {
          border-top: 4px solid #48bb78;
        }

        &.API事件 {
          border-top: 4px solid #ed8936;
        }

        &.媒体事件 {
          border-top: 4px solid #9f7aea;
        }

        .item-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.2rem;

          .item-icon {
            font-size: 1.8rem;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ebf8ff;
            border-radius: 50%;
          }

          h3 {
            font-size: 1.3rem;
            color: #2b6cb0;
            margin: 0;
            flex-grow: 1;
          }

          .item-category {
            font-size: 0.8rem;
            font-weight: 600;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            background: #e2e8f0;
          }
        }

        .item-details {
          margin-bottom: 1.2rem;

          .detail-row {
            display: flex;
            margin-bottom: 0.5rem;
            font-size: 0.95rem;

            .detail-label {
              font-weight: 600;
              min-width: 80px;
              color: #4a5568;
            }
          }
        }

        .item-scenarios {
          margin-bottom: 1.2rem;

          h4 {
            font-size: 1.1rem;
            color: #2b6cb0;
            margin-bottom: 0.8rem;
          }

          ul {
            padding-left: 1.2rem;
            margin: 0;

            li {
              margin-bottom: 0.5rem;
              line-height: 1.6;
              color: #4a5568;
              font-size: 0.95rem;
            }
          }
        }

        .item-example {
          pre {
            background: #2d3748;
            color: #e2e8f0;
            border-radius: 8px;
            padding: 1rem;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
            line-height: 1.5;
            overflow-x: auto;
            max-height: 200px;
            overflow-y: auto;
          }
        }
      }
    }
  }

  .best-practices {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

    h2 {
      font-size: 1.6rem;
      color: #2b6cb0;
      text-align: center;
      margin-top: 0;
      margin-bottom: 1.5rem;
    }

    .practices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .practice-card {
        background: #f7fafc;
        border-radius: 10px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
        }

        .practice-icon {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        h3 {
          font-size: 1.3rem;
          color: #2b6cb0;
          text-align: center;
          margin-top: 0;
          margin-bottom: 1rem;
        }

        ul {
          padding-left: 1.2rem;
          margin: 0;

          li {
            margin-bottom: 0.8rem;
            line-height: 1.6;
            color: #4a5568;
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
    color: #718096;
    font-size: 0.95rem;
    line-height: 1.6;

    p {
      margin-bottom: 0.5rem;
    }
  }
}

@media (max-width: 768px) {
  .loading-events {
    padding: 1rem;

    .header h1 {
      font-size: 1.8rem;
    }

    .event-timeline {
      .timeline-bar {
        flex-direction: column;
        align-items: flex-start;
        gap: 2rem;
        margin: 1rem 0;

        &::before {
          width: 3px;
          height: 100%;
          top: 0;
          left: 16px;
          right: auto;
        }
      }

      .timeline-event {
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        width: 100%;

        .event-marker {
          margin-bottom: 0;
        }
      }

      .timeline-detail .event-card {
        flex-direction: column;

        .event-icon {
          align-self: center;
        }
      }
    }

    .events-grid {
      .grid-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;

        .filter-controls {
          flex-wrap: wrap;
        }
      }
    }
  }
}
</style>
