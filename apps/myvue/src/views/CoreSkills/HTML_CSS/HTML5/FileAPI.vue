<template>
  <div class="file-api-container">
    <div class="header">
      <h1>现代文件系统API介绍</h1>
      <p class="subtitle">探索FileSystemAccessAPI、showSaveFilePicker()和FileSystemObserver</p>
      <div class="browser-support">
        <span class="chrome">Chrome 86+</span>
        <span class="edge">Edge 86+</span>
        <span class="firefox experimental">Firefox 实验性支持</span>
        <span class="safari experimental">Safari 实验性支持</span>
      </div>
    </div>

    <div class="api-overview">
      <div class="api-card" v-for="api in apis" :key="api.id" :class="api.status">
        <div class="card-header">
          <div class="api-icon">
            <div :class="api.iconClass"></div>
          </div>
          <div class="api-title">
            <h2>{{ api.name }}</h2>
            <div class="api-status">{{ api.statusLabel }}</div>
          </div>
        </div>

        <div class="card-content">
          <div class="section">
            <h3>介绍</h3>
            <p>{{ api.intro }}</p>
          </div>

          <div class="section">
            <h3>作用</h3>
            <ul>
              <li v-for="purpose in api.purposes" :key="purpose">{{ purpose }}</li>
            </ul>
          </div>

          <div class="section">
            <h3>适用场景</h3>
            <div class="scenarios">
              <div v-for="scenario in api.scenarios" :key="scenario" class="scenario-item">
                {{ scenario }}
              </div>
            </div>
          </div>

          <div class="section">
            <h3>使用示例</h3>
            <pre><code>{{ api.codeExample }}</code></pre>
          </div>

          <div class="section">
            <h3>平台支持</h3>
            <div class="support-details">
              <div class="browser-support">
                <div v-for="(support, browser) in api.support" :key="browser" class="browser">
                  <span :class="['browser-name', browser]">{{ browser }}</span>
                  <span :class="['support-level', support.toLowerCase()]">{{ support }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <div class="limitations" v-if="api.limitations.length">
            <h4>限制与注意事项</h4>
            <ul>
              <li v-for="limitation in api.limitations" :key="limitation">{{ limitation }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <h2>API功能对比</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>功能特性</th>
              <th>FileSystemAccessAPI</th>
              <th>showSaveFilePicker</th>
              <th>FileSystemObserver</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in comparisonData" :key="item.feature">
              <td>{{ item.feature }}</td>
              <td :class="{ 'supported': item.values[0] }">
                {{ item.values[0] ? '✓' : '✕' }}
              </td>
              <td :class="{ 'supported': item.values[1] }">
                {{ item.values[1] ? '✓' : '✕' }}
              </td>
              <td :class="{ 'supported': item.values[2] }">
                {{ item.values[2] ? '✓' : '✕' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="use-cases">
      <h2>实际应用案例</h2>
      <div class="cases">
        <div class="case">
          <div class="case-icon">💾</div>
          <h3>在线文档编辑器</h3>
          <p>使用showSaveFilePicker()实现"保存"功能，FileSystemAccessAPI处理文件读写，FileSystemObserver监控外部文件变更</p>
        </div>
        <div class="case">
          <div class="case-icon">🖼️</div>
          <h3>图片编辑器</h3>
          <p>直接读取用户选择的图片文件进行编辑，保存时保留原始文件权限，实时检测文件变化</p>
        </div>
        <div class="case">
          <div class="case-icon">📊</div>
          <h3>数据分析工具</h3>
          <p>处理大型CSV文件，允许用户保存处理后的结果，监控源文件变化自动更新分析</p>
        </div>
      </div>
    </div>

    <div class="conclusion">
      <h2>总结与最佳实践</h2>
      <div class="summary">
        <p>现代文件系统API为Web应用提供了接近原生应用的文件操作能力，显著提升了用户体验。</p>
        <div class="best-practices">
          <h3>最佳实践：</h3>
          <ul>
            <li>始终在用户交互事件中调用文件选择器（如点击事件）</li>
            <li>处理用户拒绝权限的情况并提供友好提示</li>
            <li>使用try-catch处理文件操作异常</li>
            <li>对于敏感操作提供明确确认步骤</li>
            <li>定期保存用户文件句柄以便后续使用</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const apis = ref([
  {
    id: 'fs-access',
    name: 'FileSystemAccessAPI',
    status: 'stable',
    statusLabel: '稳定版',
    iconClass: 'folder-icon',
    intro: 'FileSystemAccessAPI 提供了一种与用户本地文件系统交互的方式，允许Web应用读取、写入文件和目录，同时保持用户隐私和安全控制。',
    purposes: [
      '读取用户选择的文件内容',
      '写入内容到用户选择的文件',
      '获取并保留文件句柄以供后续使用',
      '创建新文件和目录',
      '管理用户文件系统中的内容'
    ],
    scenarios: [
      '文档编辑器',
      '图片处理工具',
      '代码编辑器',
      '媒体播放器',
      '数据导出工具'
    ],
    codeExample: `// 获取文件句柄
const fileHandle = await window.showOpenFilePicker();

// 获取文件
const file = await fileHandle[0].getFile();

// 读取文件内容
const contents = await file.text();

// 写入文件
const writable = await fileHandle[0].createWritable();
await writable.write('新的内容');
await writable.close();`,
    support: {
      'Chrome': '支持',
      'Edge': '支持',
      'Firefox': '实验性',
      'Safari': '部分支持'
    },
    limitations: [
      '需要HTTPS安全连接（localhost除外）',
      '用户必须通过文件选择器显式授权',
      '不同浏览器支持程度有差异',
      '无法访问整个文件系统，仅限于用户选择的文件/目录'
    ]
  },
  {
    id: 'save-picker',
    name: 'showSaveFilePicker()',
    status: 'stable',
    statusLabel: '稳定版',
    iconClass: 'save-icon',
    intro: 'showSaveFilePicker() 是 FileSystemAccessAPI 的一部分，提供了一个现代的文件保存对话框，允许用户选择保存位置并提供文件保存建议。',
    purposes: [
      '保存新创建的文件',
      '保存现有文件的副本',
      '建议默认文件名和扩展名',
      '获取文件写入权限',
      '提供用户友好的保存界面'
    ],
    scenarios: [
      '导出处理后的数据',
      '保存用户创建的内容',
      '下载生成的报告',
      '保存编辑后的文件',
      '创建新文档'
    ],
    codeExample: `// 显示保存文件选择器
const options = {
  types: [{
    description: '文本文件',
    accept: {'text/plain': ['.txt']}
  }],
  suggestedName: '未命名文档.txt'
};

try {
  const handle = await window.showSaveFilePicker(options);

  // 创建可写流
  const writable = await handle.createWritable();

  // 写入内容
  await writable.write('文件内容');

  // 关闭文件
  await writable.close();

  console.log('文件保存成功');
} catch (err) {
  console.error('用户取消或发生错误', err);
}`,
    support: {
      'Chrome': '支持',
      'Edge': '支持',
      'Firefox': '不支持',
      'Safari': '不支持'
    },
    limitations: [
      '必须由用户交互触发（如点击事件）',
      '用户可能会拒绝保存请求',
      '文件扩展名过滤取决于浏览器实现',
      '不支持自定义保存对话框样式'
    ]
  },
  {
    id: 'fs-observer',
    name: 'FileSystemObserver',
    status: 'experimental',
    statusLabel: '实验性',
    iconClass: 'observer-icon',
    intro: 'FileSystemObserver API 允许Web应用观察用户已授予访问权限的文件或目录的变化，并在文件被修改、重命名或删除时接收通知。',
    purposes: [
      '监控文件内容变化',
      '检测文件重命名或移动',
      '响应文件删除事件',
      '自动同步外部文件更改',
      '实时更新应用状态'
    ],
    scenarios: [
      '协作编辑工具',
      '自动保存实现',
      '实时数据同步',
      '文件版本控制',
      '开发热重载工具'
    ],
    codeExample: `// 获取目录句柄
const dirHandle = await window.showDirectoryPicker();

// 创建文件系统观察者
const observer = new FileSystemObserver(dirHandle);

// 定义变化回调
observer.onchange = (changes) => {
  for (const change of changes) {
    console.log('变化类型:', change.type);
    console.log('文件:', change.entry.name);

    if (change.type === 'modified') {
      // 处理文件修改
    } else if (change.type === 'deleted') {
      // 处理文件删除
    }
  }
};

// 开始观察
await observer.observe();`,
    support: {
      'Chrome': '实验性',
      'Edge': '实验性',
      'Firefox': '不支持',
      'Safari': '不支持'
    },
    limitations: [
      '目前仅Chrome实验性支持',
      '需要单独请求观察权限',
      '可能影响性能（频繁变化时）',
      '无法监控整个文件系统，仅限于已授权目录',
      'API仍在变化中，可能不稳定'
    ]
  }
]);

const comparisonData = ref([
  { feature: '文件读取', values: [true, false, false] },
  { feature: '文件写入', values: [true, true, false] },
  { feature: '文件保存对话框', values: [false, true, false] },
  { feature: '目录访问', values: [true, false, false] },
  { feature: '文件变化监控', values: [false, false, true] },
  { feature: '文件句柄保留', values: [true, true, false] },
  { feature: '创建新文件', values: [true, true, false] },
  { feature: '文件删除检测', values: [false, false, true] },
  { feature: '用户交互要求', values: [true, true, true] },
  { feature: '跨浏览器支持', values: [true, true, false] }
]);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@experimental-color: #f72585;
@stable-color: #2ec4b6;
@warning-color: #ff9f1c;
@light-bg: #f8f9fa;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #dee2e6;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.file-api-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: @text-dark;
  background-color: white;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.15rem;
    color: @text-light;
    max-width: 600px;
    margin: 0 auto 1.5rem;
  }

  .browser-support {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;

    span {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;

      &.chrome {
        background-color: fade(#4285f4, 15%);
        color: #4285f4;
      }

      &.edge {
        background-color: fade(#0078d7, 15%);
        color: #0078d7;
      }

      &.firefox {
        background-color: fade(#ff9500, 15%);
        color: #ff9500;
      }

      &.safari {
        background-color: fade(#00b4f0, 15%);
        color: #00b4f0;
      }

      &.experimental {
        border: 1px dashed currentColor;
      }
    }
  }
}

.api-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.api-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: white;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }

  &.experimental {
    .card-header {
      background: linear-gradient(135deg, @experimental-color, #b5179e);
    }

    .api-status {
      background-color: @experimental-color;
    }
  }

  &.stable {
    .card-header {
      background: linear-gradient(135deg, @stable-color, #0ead69);
    }

    .api-status {
      background-color: @stable-color;
    }
  }
}

.card-header {
  padding: 1.5rem;
  color: white;
  display: flex;
  align-items: center;

  .api-icon {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    .folder-icon, .save-icon, .observer-icon {
      width: 30px;
      height: 30px;
      background-color: white;
      mask-size: contain;
      mask-position: center;
      mask-repeat: no-repeat;
    }

    .folder-icon {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z'/%3E%3C/svg%3E");
    }

    .save-icon {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z'/%3E%3C/svg%3E");
    }

    .observer-icon {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z'/%3E%3C/svg%3E");
    }
  }

  .api-title {
    flex-grow: 1;

    h2 {
      font-size: 1.4rem;
      margin: 0 0 0.3rem;
    }
  }

  .api-status {
    padding: 0.2rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    background-color: @warning-color;
    color: white;
  }
}

.card-content {
  padding: 1.5rem;
  flex-grow: 1;

  .section {
    margin-bottom: 1.5rem;

    h3 {
      font-size: 1.1rem;
      margin: 0 0 0.8rem;
      color: @primary-color;
      display: flex;
      align-items: center;

      &::after {
        content: '';
        flex-grow: 1;
        height: 1px;
        background: @border-color;
        margin-left: 0.75rem;
      }
    }

    p, ul {
      margin: 0;
      font-size: 0.95rem;
    }

    ul {
      padding-left: 1.25rem;

      li {
        margin-bottom: 0.4rem;
      }
    }

    .scenarios {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .scenario-item {
        padding: 0.4rem 0.8rem;
        background-color: @light-bg;
        border-radius: 4px;
        font-size: 0.85rem;
      }
    }

    pre {
      background-color: #2d2d2d;
      border-radius: 6px;
      padding: 1rem;
      overflow-x: auto;
      margin: 0.5rem 0 0;

      code {
        color: #f8f8f2;
        font-family: 'Fira Code', 'Courier New', monospace;
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }

    .support-details {
      .browser-support {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.8rem;

        .browser {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem;
          background-color: @light-bg;
          border-radius: 4px;

          .browser-name {
            font-weight: 500;

            &.Chrome { color: #4285f4; }
            &.Edge { color: #0078d7; }
            &.Firefox { color: #ff9500; }
            &.Safari { color: #00b4f0; }
          }

          .support-level {
            font-weight: 500;

            &.支持 { color: @stable-color; }
            &.实验性 { color: @experimental-color; }
            &.部分支持 { color: @warning-color; }
            &.不支持 { color: #e71d36; }
          }
        }
      }
    }
  }
}

.card-footer {
  padding: 0 1.5rem 1.5rem;

  .limitations {
    padding: 1rem;
    background-color: #fff8f0;
    border-radius: 8px;
    border-left: 3px solid @warning-color;

    h4 {
      margin: 0 0 0.5rem;
      color: @warning-color;
    }

    ul {
      padding-left: 1.25rem;
      margin: 0;

      li {
        font-size: 0.9rem;
        margin-bottom: 0.3rem;
      }
    }
  }
}

.comparison-section {
  margin: 3rem 0;

  h2 {
    text-align: center;
    color: @primary-color;
    margin-bottom: 1.8rem;
  }

  .comparison-table {
    overflow-x: auto;
    border-radius: 10px;
    box-shadow: @card-shadow;

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 600px;

      th, td {
        padding: 1rem;
        text-align: center;
        border-bottom: 1px solid @border-color;
      }

      thead {
        background: linear-gradient(to bottom, #f1f3f9, #e2e7f5);

        th {
          font-weight: 600;
          color: @primary-color;
          &:first-child {
            text-align: left;
          }
        }
      }

      tbody {
        tr {
          &:nth-child(even) {
            background-color: @light-bg;
          }

          &:hover {
            background-color: darken(@light-bg, 2%);
          }

          td {
            &:first-child {
              text-align: left;
              font-weight: 500;
            }

            &.supported {
              color: @stable-color;
              font-weight: bold;
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }
}

.use-cases {
  background: linear-gradient(135deg, #f8f9ff, #eef0ff);
  border-radius: 12px;
  padding: 2.5rem;
  margin: 2rem 0;

  h2 {
    text-align: center;
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 2rem;
  }

  .cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .case {
      background: white;
      border-radius: 10px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: @card-shadow;

      .case-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0 0 1rem;
        color: @text-dark;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: @text-light;
      }
    }
  }
}

.conclusion {
  background-color: #f0f7ff;
  border-radius: 12px;
  padding: 2rem;
  border-left: 4px solid @primary-color;

  h2 {
    color: @primary-color;
    margin-top: 0;
  }

  .summary {
    p {
      font-size: 1.05rem;
      line-height: 1.7;
    }

    .best-practices {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      margin-top: 1.5rem;

      h3 {
        margin-top: 0;
        color: @secondary-color;
      }

      ul {
        padding-left: 1.5rem;

        li {
          margin-bottom: 0.8rem;
          padding-left: 1rem;
          position: relative;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: @primary-color;
            font-weight: bold;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .file-api-container {
    padding: 1.5rem 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .api-overview {
    grid-template-columns: 1fr;
  }

  .comparison-table table {
    font-size: 0.9rem;

    th, td {
      padding: 0.8rem;
    }
  }

  .card-content {
    padding: 1.2rem;
  }
}
</style>
