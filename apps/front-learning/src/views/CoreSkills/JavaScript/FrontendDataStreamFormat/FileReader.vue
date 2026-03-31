<template>
  <div class="filereader-container">
    <header class="header">
      <h1 class="title">JavaScript FileReader API</h1>
      <p class="subtitle">浏览器文件读取功能介绍</p>
    </header>

    <div class="content-section">
      <h2 class="section-title">🔍 基本概念</h2>
      <div class="concept-grid">
        <div class="concept-card">
          <h3>FileReader 是什么</h3>
          <p>
            FileReader 是浏览器提供的 API，允许 Web
            应用程序<strong>异步读取</strong>用户计算机上的文件内容。
          </p>
          <div class="feature-list">
            <div class="feature"><span class="icon">🔄</span> 异步读取文件</div>
            <div class="feature"><span class="icon">📁</span> 支持多种文件类型</div>
            <div class="icon"><span class="icon">⚡</span> 事件驱动API</div>
          </div>
        </div>
        <div class="concept-card">
          <h3>核心功能</h3>
          <p>FileReader 可以将文件读取为：</p>
          <ul class="read-as-list">
            <li><strong>ArrayBuffer</strong> - 原始二进制数据</li>
            <li><strong>BinaryString</strong> - 二进制字符串</li>
            <li><strong>DataURL</strong> - base64编码的URL</li>
            <li><strong>Text</strong> - 文本内容(可指定编码)</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">🛠️ 基本用法</h2>
      <div class="usage-example">
        <div class="code-tabs">
          <div v-for="(tab, index) in tabs" :key="index" :class="['tab', { active: activeTab === index }]"
            @click="activeTab = index">
            {{ tab.label }}
          </div>
        </div>
        <div class="code-content">
          <CodeBlock :code="tabs[activeTab].code" language="js" />
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">📊 工作原理</h2>
      <div class="workflow">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">用户通过 input[type="file"] 选择文件</div>
        </div>
        <div class="arrow">→</div>
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">创建 FileReader 实例</div>
        </div>
        <div class="arrow">→</div>
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">调用读取方法(readAsText等)</div>
        </div>
        <div class="arrow">→</div>
        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">监听事件处理结果(onload等)</div>
        </div>
        <div class="arrow">→</div>
        <div class="step">
          <div class="step-number">5</div>
          <div class="step-content">在回调中获取结果(result属性)</div>
        </div>
      </div>
      <div class="event-table">
        <table>
          <thead>
            <tr>
              <th>事件</th>
              <th>触发时机</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event.name">
              <td>
                <code>{{ event.name }}</code>
              </td>
              <td>{{ event.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">🌐 使用场景</h2>
      <div class="scenario-grid">
        <div class="scenario-card">
          <div class="scenario-icon">🖼️</div>
          <h3>图片预览</h3>
          <p>读取图片文件并显示缩略图预览</p>
          <div class="code-example">
            <pre><code>reader.readAsDataURL(file);
// 结果可用于img.src</code></pre>
          </div>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">📄</div>
          <h3>文件解析</h3>
          <p>解析CSV、JSON等文本文件内容</p>
          <div class="code-example">
            <pre><code>reader.readAsText(file);
// 解析文本内容</code></pre>
          </div>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">🔒</div>
          <h3>文件校验</h3>
          <p>验证文件大小、类型或内容</p>
          <div class="code-example">
            <pre><code>if(file.size > 1024*1024) {
  alert('文件太大');
}</code></pre>
          </div>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">📤</div>
          <h3>分块上传</h3>
          <p>读取文件分片实现大文件上传</p>
          <div class="code-example">
            <pre><code>const chunk = file.slice(start, end);
reader.readAsArrayBuffer(chunk);</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">⚖️ 优缺点分析</h2>
      <div class="pros-cons">
        <div class="pros">
          <h3>优点</h3>
          <ul>
            <li><strong>浏览器原生支持</strong> - 无需额外库</li>
            <li><strong>异步处理</strong> - 不阻塞主线程</li>
            <li><strong>多种格式</strong> - 支持多种读取方式</li>
            <li><strong>安全</strong> - 只能读取用户显式选择的文件</li>
          </ul>
        </div>
        <div class="cons">
          <h3>缺点</h3>
          <ul>
            <li><strong>兼容性</strong> - IE10+支持</li>
            <li><strong>大文件处理</strong> - 可能内存不足</li>
            <li><strong>事件驱动</strong> - 代码结构可能复杂</li>
            <li><strong>无进度控制</strong> - 无法暂停/继续</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">⚠️ 注意事项</h2>
      <div class="note-grid">
        <div class="note-card">
          <h3>内存管理</h3>
          <p>大文件可能导致内存问题，考虑使用File.slice()分块读取</p>
        </div>
        <div class="note-card">
          <h3>错误处理</h3>
          <p>务必监听onerror事件处理读取错误</p>
        </div>
        <div class="note-card">
          <h3>安全限制</h3>
          <p>只能读取用户主动选择的文件，不能访问任意文件系统</p>
        </div>
        <div class="note-card">
          <h3>现代替代方案</h3>
          <p>考虑使用更现代的Streams API处理大文件</p>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>FileReader是前端文件处理的基石API，合理使用可以构建丰富的文件交互体验</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from 'components/Code/index.vue'

const activeTab = ref(0)

const tabs = [
  {
    label: '读取文本',
    code: `// 读取文本文件
const reader = new FileReader();
reader.onload = (e) => {
  const content = e.target.result;
  console.log('文件内容:', content);
};
reader.readAsText(file, 'UTF-8');`,
  },
  {
    label: '读取DataURL',
    code: `// 读取图片为DataURL
const reader = new FileReader();
reader.onload = (e) => {
  const dataUrl = e.target.result;
  imgElement.src = dataUrl;
};
reader.readAsDataURL(file);`,
  },
  {
    label: '读取二进制',
    code: `// 读取二进制数据
const reader = new FileReader();
reader.onload = (e) => {
  const arrayBuffer = e.target.result;
  // 处理二进制数据...
};
reader.readAsArrayBuffer(file);`,
  },
  {
    label: '事件监听',
    code: `// 完整事件监听
const reader = new FileReader();

reader.onloadstart = () => console.log('开始读取');
reader.onprogress = (e) => {
  if(e.lengthComputable) {
    const percent = (e.loaded / e.total) * 100;
    console.log(\`进度: \${percent}%\`);
  }
};
reader.onload = (e) => console.log('读取完成');
reader.onerror = () => console.error('读取错误');
reader.onloadend = () => console.log('读取结束');

reader.readAsText(file);`,
  },
]

const events = [
  { name: 'onloadstart', desc: '开始读取时触发' },
  { name: 'onprogress', desc: '读取过程中定期触发' },
  { name: 'onload', desc: '读取成功完成时触发' },
  { name: 'onabort', desc: '读取被中止时触发' },
  { name: 'onerror', desc: '读取发生错误时触发' },
  { name: 'onloadend', desc: '读取结束时触发(无论成功或失败)' },
]
</script>

<style lang="less" scoped>
.filereader-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #2c3e50;
  background-color: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eaecef;

  .title {
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    background: linear-gradient(90deg, #3498db, #9b59b6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #7f8c8d;
    font-weight: 400;
  }
}

.content-section {
  margin-bottom: 2.5rem;

  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
    color: #2c3e50;
    border-left: 4px solid #9b59b6;
    padding-left: 0.8rem;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.concept-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;

  h3 {
    font-size: 1.2rem;
    margin-top: 0;
    color: #3498db;
  }

  p {
    font-size: 0.95rem;
    color: #555;
    margin: 0.8rem 0;
  }
}

.feature-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  margin-top: 1rem;

  .feature {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: #555;

    .icon {
      margin-right: 0.5rem;
      font-size: 1.1rem;
    }
  }
}

.read-as-list {
  padding-left: 1.2rem;
  margin: 0.8rem 0;

  li {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;

    strong {
      color: #e74c3c;
    }
  }
}

.usage-example {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;
  overflow: hidden;
  margin: 1.5rem 0;
}

.code-tabs {
  display: flex;
  border-bottom: 1px solid #eaecef;
  background-color: #f8f9fa;

  .tab {
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;

    &:hover {
      background-color: #f0f0f0;
    }

    &.active {
      border-bottom-color: #3498db;
      color: #3498db;
      font-weight: 500;
    }
  }
}

.code-content {
  pre {
    margin: 0;
    padding: 1rem;
    background-color: #282c34;

    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      color: #abb2bf;
      font-size: 0.9rem;
    }
  }
}

.workflow {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1.5rem 0;

  .step {
    background-color: #fff;
    border-radius: 8px;
    padding: 0.8rem 1.2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid #eaecef;
    text-align: center;
    min-width: 120px;

    .step-number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.8rem;
      height: 1.8rem;
      background-color: #9b59b6;
      color: white;
      border-radius: 50%;
      font-weight: 600;
      margin: 0 auto 0.5rem;
    }

    .step-content {
      font-size: 0.9rem;
    }
  }

  .arrow {
    margin: 0 0.5rem;
    color: #7f8c8d;
    font-weight: bold;

    @media (max-width: 768px) {
      transform: rotate(90deg);
      margin: 0.5rem 0;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.event-table {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;
  margin: 1.5rem 0;
  overflow: hidden;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 0.8rem 1.2rem;
      text-align: left;
      border-bottom: 1px solid #eaecef;
    }

    th {
      background-color: #f8f9fa;
      font-weight: 500;
    }

    td {
      font-size: 0.9rem;
      color: #555;

      code {
        background-color: #f8f9fa;
        padding: 0.2rem 0.4rem;
        border-radius: 3px;
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      }
    }

    tr:last-child td {
      border-bottom: none;
    }
  }
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
}

.scenario-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;
  text-align: center;

  .scenario-icon {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }

  h3 {
    font-size: 1.1rem;
    margin: 0.5rem 0;
    color: #2c3e50;
  }

  p {
    font-size: 0.9rem;
    color: #7f8c8d;
    margin: 0.5rem 0;
  }

  .code-example {
    background-color: #f8f9fa;
    padding: 0.8rem;
    border-radius: 4px;
    margin-top: 0.8rem;

    pre {
      margin: 0;

      code {
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
        font-size: 0.8rem;
        color: #333;
      }
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;

  .pros,
  .cons {
    background-color: #fff;
    border-radius: 8px;
    padding: 1.2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid #eaecef;

    h3 {
      font-size: 1.2rem;
      margin-top: 0;
      margin-bottom: 0.8rem;
      color: #2c3e50;
      border-bottom: 2px solid;
      padding-bottom: 0.5rem;
    }

    ul {
      padding-left: 1.2rem;
      margin: 0;

      li {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;

        strong {
          color: #e74c3c;
        }
      }
    }
  }

  .pros h3 {
    border-color: #42b983;
  }

  .cons h3 {
    border-color: #e74c3c;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.note-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
}

.note-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;

  h3 {
    font-size: 1.1rem;
    margin-top: 0;
    color: #3498db;
  }

  p {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 0;
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eaecef;
  color: #7f8c8d;
  font-size: 0.9rem;
}
</style>
