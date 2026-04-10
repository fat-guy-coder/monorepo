<template>
  <div class="events-reference">
    <div class="header">
      <div class="title-container">
        <h1 class="title">DOM 事件参考手册</h1>
        <p class="subtitle">Web 开发必备的 DOM 事件指南</p>
      </div>
      <div class="search-container">
        <input type="text" placeholder="搜索事件..." v-model="searchTerm" class="search-input">
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

      <!-- 事件列表 -->
      <div class="events-container">
        <div v-for="event in filteredEvents" :key="event.name" class="event-card">
          <div class="event-header">
            <div class="event-name-container">
              <span class="event-name">{{ event.name }}</span>
              <span class="event-type" :class="event.typeClass">
                {{ event.type }}
              </span>
            </div>
            <div class="event-tags">
              <span v-for="tag in event.tags" :key="tag" class="event-tag">{{ tag }}</span>
            </div>
          </div>

          <div class="event-body">
            <div class="event-description">
              {{ event.description }}
            </div>

            <div class="event-details">
              <div class="detail-item">
                <div class="detail-title">目标元素:</div>
                <div class="detail-content">
                  <span class="target-elements">{{ event.targets.join(', ') }}</span>
                </div>
              </div>

              <div class="detail-item">
                <div class="detail-title">事件对象属性:</div>
                <div class="detail-content">
                  <div v-for="(prop, index) in event.properties" :key="index" class="property">
                    <span class="prop-name">{{ prop.name }}</span>
                    <span class="prop-type">{{ prop.type }}</span>
                    <span class="prop-desc">- {{ prop.description }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="code-sample">
              <div class="code-header">
                <span>使用示例</span>
                <button class="copy-button" @click="copyCode(event.example)">复制代码</button>
              </div>
              <pre><code>{{ event.example }}</code></pre>
            </div>

            <div class="use-cases">
              <div class="use-case-title">常见用途:</div>
              <ul class="use-case-list">
                <li v-for="(useCase, index) in event.useCases" :key="index">{{ useCase }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>DOM 事件参考手册  | 包含 {{ events.length }} 个常用 DOM 事件</p>
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
  { id: 'all', name: '全部事件' },
  { id: 'mouse', name: '鼠标事件' },
  { id: 'keyboard', name: '键盘事件' },
  { id: 'form', name: '表单事件' },
  { id: 'window', name: '窗口事件' },
  { id: 'touch', name: '触摸事件' },
  { id: 'drag', name: '拖拽事件' },
];

// 事件数据
const events = [
  {
    name: 'click',
    type: '鼠标事件',
    typeClass: 'mouse-event',
    category: 'mouse',
    description: '当用户点击元素时触发（按下并释放鼠标按钮）',
    targets: ['所有元素'],
    properties: [
      { name: 'clientX', type: 'number', description: '事件发生时鼠标指针相对于视口的水平坐标' },
      { name: 'clientY', type: 'number', description: '事件发生时鼠标指针相对于视口的垂直坐标' },
      { name: 'target', type: 'Element', description: '事件发生的目标元素' },
      { name: 'currentTarget', type: 'Element', description: '当前事件处理程序附加到的元素' }
    ],
    example: `// 添加点击事件监听器
const button = document.getElementById('myButton');
button.addEventListener('click', function(event) {
  console.log('按钮被点击了!');
  console.log('点击位置:', event.clientX, event.clientY);
});

// 内联事件处理
<button onclick="handleClick()">点击我</button>`,
    useCases: [
      '按钮和链接的交互',
      '切换UI元素状态（如开关）',
      '打开/关闭模态框',
      '列表项选择'
    ],
    tags: ['交互', '用户输入']
  },
  {
    name: 'dblclick',
    type: '鼠标事件',
    typeClass: 'mouse-event',
    category: 'mouse',
    description: '当用户双击元素时触发（在短时间内点击两次）',
    targets: ['所有元素'],
    properties: [
      { name: 'detail', type: 'number', description: '表示点击次数的数字（双击时为2）' },
      { name: 'clientX', type: 'number', description: '事件发生时鼠标指针相对于视口的水平坐标' },
      { name: 'clientY', type: 'number', description: '事件发生时鼠标指针相对于视口的垂直坐标' }
    ],
    example: `// 添加双击事件监听器
const element = document.querySelector('.editable');
element.addEventListener('dblclick', function() {
  this.contentEditable = true;
  this.focus();
});`,
    useCases: [
      '文本编辑（如双击编辑）',
      '打开详细视图',
      '高级交互（如地图上的双击缩放）',
      '执行特殊操作'
    ],
    tags: ['交互', '编辑']
  },
  {
    name: 'mousedown',
    type: '鼠标事件',
    typeClass: 'mouse-event',
    category: 'mouse',
    description: '当用户按下鼠标按钮时触发（在元素上按下按钮）',
    targets: ['所有元素'],
    properties: [
      { name: 'button', type: 'number', description: '按下的鼠标按钮（0=左键, 1=中键, 2=右键）' },
      { name: 'buttons', type: 'number', description: '按下的所有鼠标按钮的位掩码' },
      { name: 'clientX', type: 'number', description: '事件发生时鼠标指针相对于视口的水平坐标' }
    ],
    example: `// 添加鼠标按下事件监听器
const slider = document.getElementById('slider');
slider.addEventListener('mousedown', function(event) {
  console.log('鼠标按下在滑块上');
  // 开始拖动滑块
});`,
    useCases: [
      '拖拽操作的开始',
      '自定义上下文菜单',
      '高级绘图应用',
      '游戏控制'
    ],
    tags: ['交互', '拖拽']
  },
  {
    name: 'mouseup',
    type: '鼠标事件',
    typeClass: 'mouse-event',
    category: 'mouse',
    description: '当用户释放鼠标按钮时触发（在元素上释放按钮）',
    targets: ['所有元素'],
    properties: [
      { name: 'button', type: 'number', description: '释放的鼠标按钮（0=左键, 1=中键, 2=右键）' },
      { name: 'clientX', type: 'number', description: '事件发生时鼠标指针相对于视口的水平坐标' }
    ],
    example: `// 添加鼠标释放事件监听器
document.addEventListener('mouseup', function() {
  console.log('鼠标按钮释放');
  // 结束拖动操作
});`,
    useCases: [
      '拖拽操作的结束',
      '完成绘图操作',
      '释放按钮时的状态变化',
      '游戏控制'
    ],
    tags: ['交互', '释放']
  },
  {
    name: 'mousemove',
    type: '鼠标事件',
    typeClass: 'mouse-event',
    category: 'mouse',
    description: '当用户在元素上移动鼠标时触发',
    targets: ['所有元素'],
    properties: [
      { name: 'clientX', type: 'number', description: '鼠标指针相对于视口的水平坐标' },
      { name: 'clientY', type: 'number', description: '鼠标指针相对于视口的垂直坐标' },
      { name: 'movementX', type: 'number', description: '自上次事件以来的水平移动距离' },
      { name: 'movementY', type: 'number', description: '自上次事件以来的垂直移动距离' }
    ],
    example: `// 添加鼠标移动事件监听器
const element = document.getElementById('trackable');
element.addEventListener('mousemove', function(event) {
  console.log('鼠标位置:', event.clientX, event.clientY);
  // 更新自定义光标或工具提示位置
});`,
    useCases: [
      '跟踪鼠标位置',
      '创建绘图应用',
      '实现拖拽操作',
      '自定义光标效果',
      '工具提示跟随'
    ],
    tags: ['跟踪', '位置']
  },
  {
    name: 'mouseover',
    type: '鼠标事件',
    typeClass: 'mouse-event',
    category: 'mouse',
    description: '当鼠标指针进入元素或其子元素时触发',
    targets: ['所有元素'],
    properties: [
      { name: 'relatedTarget', type: 'Element', description: '鼠标来自的元素' },
      { name: 'clientX', type: 'number', description: '鼠标指针相对于视口的水平坐标' }
    ],
    example: `// 添加鼠标悬停事件监听器
const item = document.querySelector('.menu-item');
item.addEventListener('mouseover', function() {
  this.classList.add('hovered');
  // 显示子菜单或工具提示
});`,
    useCases: [
      '悬停效果（如改变背景色）',
      '显示工具提示',
      '下拉菜单的显示',
      '交互式元素的视觉反馈'
    ],
    tags: ['悬停', '交互']
  },
  {
    name: 'mouseout',
    type: '鼠标事件',
    typeClass: 'mouse-event',
    category: 'mouse',
    description: '当鼠标指针离开元素或其子元素时触发',
    targets: ['所有元素'],
    properties: [
      { name: 'relatedTarget', type: 'Element', description: '鼠标前往的元素' },
      { name: 'clientX', type: 'number', description: '鼠标指针相对于视口的水平坐标' }
    ],
    example: `// 添加鼠标离开事件监听器
const item = document.querySelector('.menu-item');
item.addEventListener('mouseout', function() {
  this.classList.remove('hovered');
  // 隐藏子菜单或工具提示
});`,
    useCases: [
      '移除悬停效果',
      '隐藏工具提示',
      '关闭下拉菜单',
      '重置交互元素的视觉状态'
    ],
    tags: ['离开', '隐藏']
  },
  {
    name: 'scroll',
    type: '窗口事件',
    typeClass: 'window-event',
    category: 'window',
    description: '当元素滚动时触发',
    targets: ['Window', 'Element'],
    properties: [
      { name: 'target', type: 'Element', description: '发生滚动的元素' },
      { name: 'scrollX', type: 'number', description: '窗口水平滚动量（仅Window）' },
      { name: 'scrollY', type: 'number', description: '窗口垂直滚动量（仅Window）' }
    ],
    example: `// 添加滚动事件监听器
window.addEventListener('scroll', function() {
  // 检测滚动位置
  const scrollY = window.scrollY;

  // 实现滚动效果
  if (scrollY > 500) {
    document.querySelector('.back-to-top').classList.add('visible');
  } else {
    document.querySelector('.back-to-top').classList.remove('visible');
  }
});

// 监听元素滚动
const container = document.getElementById('scroll-container');
container.addEventListener('scroll', function() {
  console.log('容器滚动位置:', this.scrollTop);
});`,
    useCases: [
      '实现无限滚动',
      '创建视差滚动效果',
      '滚动时固定导航栏',
      '懒加载内容',
      '显示回到顶部按钮'
    ],
    tags: ['滚动', '导航']
  },
  {
    name: 'resize',
    type: '窗口事件',
    typeClass: 'window-event',
    category: 'window',
    description: '当浏览器窗口大小改变时触发',
    targets: ['Window'],
    properties: [
      { name: 'target', type: 'Window', description: '发生大小变化的窗口' }
    ],
    example: `// 添加窗口大小改变事件监听器
window.addEventListener('resize', function() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // 响应式布局调整
  if (width < 768) {
    document.body.classList.add('mobile-layout');
  } else {
    document.body.classList.remove('mobile-layout');
  }

  console.log('新窗口尺寸:', width, 'x', height);
});`,
    useCases: [
      '响应式布局调整',
      '图表重绘',
      '游戏画布大小调整',
      '重新计算元素位置',
      '适应不同屏幕尺寸'
    ],
    tags: ['响应式', '布局']
  },
  {
    name: 'keydown',
    type: '键盘事件',
    typeClass: 'keyboard-event',
    category: 'keyboard',
    description: '当用户按下键盘上的键时触发',
    targets: ['Element', 'Document'],
    properties: [
      { name: 'key', type: 'string', description: '按下的物理键的值' },
      { name: 'code', type: 'string', description: '按键的物理代码' },
      { name: 'ctrlKey', type: 'boolean', description: 'Ctrl键是否按下' },
      { name: 'shiftKey', type: 'boolean', description: 'Shift键是否按下' },
      { name: 'altKey', type: 'boolean', description: 'Alt键是否按下' },
      { name: 'metaKey', type: 'boolean', description: 'Meta键（Command键）是否按下' }
    ],
    example: `// 添加键盘按下事件监听器
document.addEventListener('keydown', function(event) {
  // 检测特定按键
  if (event.key === 'Escape') {
    closeModal();
  }

  // 快捷键组合
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault(); // 阻止默认保存行为
    saveDocument();
  }
});`,
    useCases: [
      '键盘快捷键',
      '游戏控制',
      '表单导航',
      '特殊操作（如Esc关闭）',
      '阻止默认键盘行为'
    ],
    tags: ['键盘', '快捷键']
  },
  {
    name: 'keyup',
    type: '键盘事件',
    typeClass: 'keyboard-event',
    category: 'keyboard',
    description: '当用户释放键盘上的键时触发',
    targets: ['Element', 'Document'],
    properties: [
      { name: 'key', type: 'string', description: '释放的键的值' },
      { name: 'code', type: 'string', description: '按键的物理代码' }
    ],
    example: `// 添加键盘释放事件监听器
const input = document.getElementById('search');
input.addEventListener('keyup', function(event) {
  // 搜索输入处理
  if (event.key === 'Enter') {
    performSearch(this.value);
  }

  // 实时搜索
  if (this.value.length > 2) {
    showSuggestions(this.value);
  }
});`,
    useCases: [
      '实时搜索建议',
      '输入验证',
      '游戏控制释放',
      '组合键状态跟踪',
      '表单提交'
    ],
    tags: ['键盘', '输入']
  },
  {
    name: 'focus',
    type: '表单事件',
    typeClass: 'form-event',
    category: 'form',
    description: '当元素获得焦点时触发（如点击输入框）',
    targets: ['可聚焦元素'],
    properties: [
      { name: 'relatedTarget', type: 'Element', description: '失去焦点的元素（如果有）' }
    ],
    example: `// 添加获得焦点事件监听器
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
    // 显示帮助文本或提示
  });
});`,
    useCases: [
      '高亮当前活动字段',
      '显示输入提示',
      '表单字段验证',
      '自动选择文本内容',
      '改善表单用户体验'
    ],
    tags: ['表单', '焦点']
  },
  {
    name: 'blur',
    type: '表单事件',
    typeClass: 'form-event',
    category: 'form',
    description: '当元素失去焦点时触发',
    targets: ['可聚焦元素'],
    properties: [
      { name: 'relatedTarget', type: 'Element', description: '获得焦点的元素（如果有）' }
    ],
    example: `// 添加失去焦点事件监听器
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', function() {
  // 验证电子邮件格式
  if (!isValidEmail(this.value)) {
    showError('请输入有效的电子邮件地址');
  }

  // 移除高亮
  this.parentElement.classList.remove('focused');
});`,
    useCases: [
      '表单字段验证',
      '保存输入内容',
      '隐藏提示信息',
      '自动完成功能',
      '清理输入格式'
    ],
    tags: ['表单', '验证']
  },
  {
    name: 'input',
    type: '表单事件',
    typeClass: 'form-event',
    category: 'form',
    description: '当元素的值改变时触发（实时触发）',
    targets: ['可输入元素'],
    properties: [
      { name: 'data', type: 'string', description: '插入的字符（仅某些情况）' },
      { name: 'inputType', type: 'string', description: '输入类型（如insertText, deleteContentBackward）' }
    ],
    example: `// 添加输入事件监听器
const textarea = document.getElementById('message');
textarea.addEventListener('input', function() {
  const length = this.value.length;
  const remaining = 500 - length;

  // 更新字符计数器
  document.getElementById('char-count').textContent = remaining;

  // 实时预览
  document.getElementById('preview').innerText = this.value;
});`,
    useCases: [
      '实时字符计数',
      '即时搜索',
      '富文本预览',
      '自动保存',
      '实时验证'
    ],
    tags: ['表单', '实时']
  },
  {
    name: 'change',
    type: '表单事件',
    typeClass: 'form-event',
    category: 'form',
    description: '当元素的值改变且失去焦点后触发',
    targets: ['输入元素', '选择框', '文本区域'],
    properties: [
      { name: 'target', type: 'Element', description: '值发生改变的元素' }
    ],
    example: `// 添加改变事件监听器
const selectBox = document.getElementById('country');
selectBox.addEventListener('change', function() {
  // 根据选择的国家更新表单
  updateFormForCountry(this.value);

  console.log('选择的国家:', this.value);
});

// 复选框改变
const newsletter = document.getElementById('newsletter');
newsletter.addEventListener('change', function() {
  console.log('订阅状态:', this.checked);
});`,
    useCases: [
      '表单选项改变处理',
      '文件选择处理',
      '更新依赖字段',
      '提交前数据收集',
      '选项改变后重新加载内容'
    ],
    tags: ['表单', '选项']
  },
  {
    name: 'submit',
    type: '表单事件',
    typeClass: 'form-event',
    category: 'form',
    description: '当表单提交时触发',
    targets: ['表单元素'],
    properties: [
      { name: 'submitter', type: 'Element', description: '触发提交的按钮' }
    ],
    example: `// 添加表单提交事件监听器
const form = document.getElementById('signup-form');
form.addEventListener('submit', function(event) {
  // 阻止默认提交行为
  event.preventDefault();

  // 表单验证
  if (!validateForm()) {
    showError('请填写所有必填字段');
    return;
  }

  // 提交表单数据
  submitForm(this);
});`,
    useCases: [
      '表单验证',
      'AJAX表单提交',
      '表单数据处理',
      '防止重复提交',
      '提交前确认'
    ],
    tags: ['表单', '提交']
  },
  {
    name: 'touchstart',
    type: '触摸事件',
    typeClass: 'touch-event',
    category: 'touch',
    description: '当用户在触摸表面上放置触摸点时触发',
    targets: ['所有元素'],
    properties: [
      { name: 'touches', type: 'TouchList', description: '当前所有触摸点的列表' },
      { name: 'targetTouches', type: 'TouchList', description: '在目标元素上的触摸点列表' },
      { name: 'changedTouches', type: 'TouchList', description: '自上次事件以来改变的触摸点列表' }
    ],
    example: `// 添加触摸开始事件监听器
const element = document.getElementById('touchable');
element.addEventListener('touchstart', function(event) {
  // 阻止默认行为（如滚动）
  event.preventDefault();

  // 获取第一个触摸点
  const touch = event.touches[0];
  console.log('触摸开始位置:', touch.clientX, touch.clientY);

  // 开始触摸交互
  startInteraction(touch);
});`,
    useCases: [
      '移动端交互开始',
      '触摸绘图应用',
      '自定义手势识别',
      '阻止默认滚动行为',
      '触摸位置跟踪'
    ],
    tags: ['触摸', '移动端']
  },
  {
    name: 'dragstart',
    type: '拖拽事件',
    typeClass: 'drag-event',
    category: 'drag',
    description: '当用户开始拖动元素时触发',
    targets: ['可拖拽元素'],
    properties: [
      { name: 'dataTransfer', type: 'DataTransfer', description: '包含拖拽数据的对象' }
    ],
    example: `// 添加拖拽开始事件监听器
const draggable = document.getElementById('draggable-item');
draggable.addEventListener('dragstart', function(event) {
  // 设置拖拽数据
  event.dataTransfer.setData('text/plain', this.id);
  event.dataTransfer.effectAllowed = 'move';

  // 视觉反馈
  this.classList.add('dragging');
});`,
    useCases: [
      '初始化拖拽操作',
      '设置拖拽数据',
      '提供视觉反馈',
      '准备拖拽目标',
      '自定义拖拽行为'
    ],
    tags: ['拖拽', '交互']
  },
  {
    name: 'dragend',
    type: '拖拽事件',
    typeClass: 'drag-event',
    category: 'drag',
    description: '当用户结束拖动元素时触发',
    targets: ['可拖拽元素'],
    properties: [
      { name: 'dataTransfer', type: 'DataTransfer', description: '包含拖拽数据的对象' }
    ],
    example: `// 添加拖拽结束事件监听器
const draggable = document.getElementById('draggable-item');
draggable.addEventListener('dragend', function(event) {
  // 清理拖拽状态
  this.classList.remove('dragging');

  // 检查拖拽成功状态
  if (event.dataTransfer.dropEffect === 'move') {
    console.log('拖拽成功完成');
  } else {
    console.log('拖拽被取消');
  }
});`,
    useCases: [
      '清理拖拽状态',
      '恢复视觉外观',
      '完成拖拽操作',
      '处理拖拽结果',
      '取消操作'
    ],
    tags: ['拖拽', '结束']
  }
];

// 计算过滤后的事件列表
const filteredEvents = computed(() => {
  return events.filter(event => {
    const matchesCategory = activeCategory.value === 'all' || event.category === activeCategory.value;
    const matchesSearch = !searchTerm.value ||
      event.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

// 获取分类的事件数量
const getCategoryCount = (categoryId: string) => {
  if (categoryId === 'all') return events.length;
  return events.filter(event => event.category === categoryId).length;
};

// 复制代码功能
const copyCode = (code: string) => {
  navigator.clipboard.writeText(code)
    .then(() => {
      // 这里可以添加复制成功的反馈
      console.log('代码已复制到剪贴板');
    })
    .catch(err => {
      console.error('复制失败:', err);
    });
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
</script>

<style lang="less" scoped>


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
@mouse-event: #4361ee;
@keyboard-event: #10b981;
@form-event: #f59e0b;
@window-event: #ef476f;
@touch-event: #9d4edd;
@drag-event: #ff9e00;

// 布局变量
@header-height: 180px;
@card-radius: 12px;
@transition-speed: 0.3s;

.events-reference {
  font-family: 'Inter', sans-serif;
  background-color: @light-bg;
  color: @text-color;
  min-height: 100vh;
  padding-bottom: 40px;
}

.header {
  height: @header-height;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  padding: 0 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .title-container {
    margin-bottom: 20px;

    .title {
      font-size: 2.4rem;
      font-weight: 700;
      color: white;
      margin: 0 0 8px 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }

    .subtitle {
      font-size: 1.2rem;
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
      padding: 14px 48px 14px 20px;
      border: none;
      border-radius: 30px;
      font-size: 1rem;
      outline: none;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      transition: all @transition-speed;

      &:focus {
        box-shadow: 0 6px 20px rgba(67, 97, 238, 0.25);
      }
    }

    .search-icon {
      position: absolute;
      right: 20px;
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
  margin: 40px auto 0;
  padding: 0 20px;
}

.category-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;

  .category-btn {
    background: white;
    border: 1px solid @border-color;
    border-radius: 30px;
    padding: 10px 22px;
    font-size: 0.95rem;
    font-weight: 500;
    color: lighten(@text-color, 15%);
    cursor: pointer;
    transition: all @transition-speed;
    display: flex;
    align-items: center;

    &:hover {
      border-color: @primary-color;
      color: @primary-color;
      transform: translateY(-2px);
    }

    &.active {
      background: @primary-color;
      border-color: @primary-color;
      color: white;
      box-shadow: 0 4px 14px rgba(@primary-color, 0.2);
    }

    .count {
      margin-left: 8px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      padding: 2px 8px;
      font-size: 0.85rem;
    }
  }
}

.events-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.event-card {
  background: @card-bg;
  border-radius: @card-radius;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all @transition-speed;
  border-left: 3px solid @primary-color;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}

.event-header {
  padding: 20px 25px;
  background: rgba(@primary-color, 0.03);
  border-bottom: 1px solid @border-color;

  .event-name-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .event-name {
      font-size: 1.4rem;
      font-weight: 600;
      color: @primary-color;
      margin-right: 15px;
    }

    .event-type {
      font-size: 0.85rem;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 4px;

      &.mouse-event {
        background: rgba(@mouse-event, 0.15);
        color: darken(@mouse-event, 10%);
      }

      &.keyboard-event {
        background: rgba(@keyboard-event, 0.15);
        color: darken(@keyboard-event, 10%);
      }

      &.form-event {
        background: rgba(@form-event, 0.15);
        color: darken(@form-event, 10%);
      }

      &.window-event {
        background: rgba(@window-event, 0.15);
        color: darken(@window-event, 10%);
      }

      &.touch-event {
        background: rgba(@touch-event, 0.15);
        color: darken(@touch-event, 10%);
      }

      &.drag-event {
        background: rgba(@drag-event, 0.15);
        color: darken(@drag-event, 10%);
      }
    }
  }

  .event-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .event-tag {
      font-size: 0.8rem;
      background: rgba(@primary-color, 0.1);
      color: @primary-color;
      padding: 4px 10px;
      border-radius: 12px;
    }
  }
}

.event-body {
  padding: 20px 25px;

  .event-description {
    font-size: 1rem;
    line-height: 1.6;
    color: darken(@text-color, 10%);
    margin-bottom: 20px;
  }

  .event-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    margin-bottom: 20px;

    .detail-item {
      .detail-title {
        font-weight: 600;
        margin-bottom: 6px;
        color: @secondary-color;
        font-size: 0.95rem;
      }

      .detail-content {
        font-size: 0.95rem;

        .target-elements {
          font-family: monospace;
          background: rgba(@success-color, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .property {
          margin-bottom: 8px;
          padding-left: 15px;
          position: relative;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: @primary-color;
          }

          .prop-name {
            font-weight: 500;
            color: @primary-color;
            margin-right: 8px;
          }

          .prop-type {
            font-family: monospace;
            background: rgba(@primary-color, 0.1);
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.9rem;
            margin-right: 8px;
          }
        }
      }
    }
  }

  .code-sample {
    background: @code-bg;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
    border: 1px solid darken(@code-bg, 5%);

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px;
      background: darken(@code-bg, 3%);
      border-bottom: 1px solid darken(@code-bg, 8%);
      font-size: 0.9rem;
      font-weight: 500;
      color: darken(@text-color, 20%);
    }

    .copy-button {
      background: rgba(@primary-color, 0.1);
      color: @primary-color;
      border: none;
      padding: 5px 12px;
      border-radius: 4px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all @transition-speed;

      &:hover {
        background: rgba(@primary-color, 0.2);
      }
    }

    pre {
      margin: 0;
      padding: 15px;
      overflow-x: auto;

      code {
        color: @code-text;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }
  }

  .use-cases {
    .use-case-title {
      font-weight: 600;
      font-size: 0.95rem;
      color: @secondary-color;
      margin-bottom: 12px;
    }

    .use-case-list {
      padding-left: 20px;
      margin: 0;

      li {
        margin-bottom: 8px;
        line-height: 1.5;
        color: lighten(@text-color, 10%);
        position: relative;

        &::before {
          content: '';
          position: absolute;
          left: -15px;
          top: 9px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: @primary-color;
        }
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 40px 0 20px;
  margin-top: 50px;
  color: lighten(@text-color, 25%);
  font-size: 0.95rem;
}

// 响应式设计
@media (max-width: 768px) {
  .header {
    height: auto;
    padding: 30px 5%;

    .title-container {
      .title {
        font-size: 1.8rem;
      }

      .subtitle {
        font-size: 1.1rem;
      }
    }
  }

  .event-details {
    grid-template-columns: 1fr !important;
  }

  .event-header {
    .event-name-container {
      flex-direction: column;
      align-items: flex-start;

      .event-name {
        margin-bottom: 8px;
      }
    }
  }
}

@media (max-width: 480px) {
  .category-nav {
    .category-btn {
      padding: 8px 16px;
      font-size: 0.9rem;
    }
  }

  .event-header {
    padding: 15px;
  }

  .event-body {
    padding: 15px;
  }
}
</style>
