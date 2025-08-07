<template>
  <div class="path-module-container">
    <header class="header">
      <h1>Node.js Path 模块基本介绍</h1>
      <p>文件路径处理的强大工具</p>
    </header>

    <div class="content-wrapper">
      <aside class="sidebar">
        <div class="sidebar-section">
          <h3>目录导航</h3>
          <ul>
            <li v-for="section in sections" :key="section.id" :class="{ active: activeSection === section.id }"
              @click="activeSection = section.id">
              {{ section.title }}
            </li>
          </ul>
        </div>

        <div class="sidebar-section">
          <h3>核心方法速查</h3>
          <div class="quick-methods">
            <div v-for="method in quickMethods" :key="method.name" class="quick-method"
              @click="scrollToMethod(method.name)">
              <span class="method-icon">📌</span>
              {{ method.name }}
            </div>
          </div>
        </div>
      </aside>

      <main class="content">
        <section v-show="activeSection === 'overview'" class="content-section">
          <h2>Path 模块概述</h2>

          <div class="intro-card">
            <div class="intro-icon">📁</div>
            <div class="intro-content">
              <p>
                Node.js 的 <code>path</code> 模块提供了一系列处理文件和目录路径的实用工具函数。
                它可以帮助开发者以跨平台的方式处理文件路径，解决不同操作系统路径分隔符差异的问题。
              </p>
              <p>
                使用 <code>path</code> 模块可以简化路径操作，避免手动拼接路径字符串，
                确保代码在各种操作系统（Windows、macOS、Linux）上都能正常工作。
              </p>
            </div>
          </div>

          <div class="import-card">
            <h3>导入 Path 模块</h3>
            <div class="code-block">
              <pre><code>// CommonJS 导入方式
const path = require('path');

// ES 模块导入方式
import path from 'path';</code></pre>
            </div>
          </div>

          <div class="why-use">
            <h3>为什么需要 Path 模块？</h3>
            <div class="reasons">
              <div class="reason">
                <div class="icon">🌐</div>
                <h4>跨平台兼容性</h4>
                <p>自动处理不同操作系统的路径分隔符差异</p>
              </div>
              <div class="reason">
                <div class="icon">🧩</div>
                <h4>路径规范化</h4>
                <p>简化路径格式，处理多余的路径片段</p>
              </div>
              <div class="reason">
                <div class="icon">🔍</div>
                <h4>路径解析</h4>
                <p>轻松获取路径的各个组成部分</p>
              </div>
              <div class="reason">
                <div class="icon">⚡</div>
                <h4>性能优化</h4>
                <p>避免手动字符串操作带来的性能开销</p>
              </div>
            </div>
          </div>
        </section>

        <section v-show="activeSection === 'methods'" class="content-section">
          <h2>Path 核心方法基本介绍</h2>

          <div class="method-card" id="basename">
            <div class="method-header">
              <h3>path.basename(path[, ext])</h3>
              <span class="method-type">方法</span>
            </div>
            <p class="method-description">获取路径的最后一部分，通常用于获取文件名</p>

            <div class="method-details">
              <div class="params">
                <h4>参数：</h4>
                <ul>
                  <li><code>path</code> - 文件路径字符串</li>
                  <li><code>ext</code> - 可选的文件扩展名（如果提供，会从结果中移除）</li>
                </ul>
              </div>

              <div class="returns">
                <h4>返回值：</h4>
                <p>路径的最后一部分（文件名）</p>
              </div>

              <div class="example">
                <h4>示例：</h4>
                <div class="code-block">
                  <pre><code>path.basename('/foo/bar/baz.txt');
// 返回: 'baz.txt'

path.basename('/foo/bar/baz.txt', '.txt');
// 返回: 'baz'</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="method-card" id="dirname">
            <div class="method-header">
              <h3>path.dirname(path)</h3>
              <span class="method-type">方法</span>
            </div>
            <p class="method-description">获取路径的目录部分</p>

            <div class="method-details">
              <div class="params">
                <h4>参数：</h4>
                <ul>
                  <li><code>path</code> - 文件路径字符串</li>
                </ul>
              </div>

              <div class="returns">
                <h4>返回值：</h4>
                <p>路径的目录部分</p>
              </div>

              <div class="example">
                <h4>示例：</h4>
                <div class="code-block">
                  <pre><code>path.dirname('/foo/bar/baz.txt');
// 返回: '/foo/bar'</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="method-card" id="extname">
            <div class="method-header">
              <h3>path.extname(path)</h3>
              <span class="method-type">方法</span>
            </div>
            <p class="method-description">获取路径的文件扩展名</p>

            <div class="method-details">
              <div class="params">
                <h4>参数：</h4>
                <ul>
                  <li><code>path</code> - 文件路径字符串</li>
                </ul>
              </div>

              <div class="returns">
                <h4>返回值：</h4>
                <p>文件扩展名（包括点号），如果没有扩展名则返回空字符串</p>
              </div>

              <div class="example">
                <h4>示例：</h4>
                <div class="code-block">
                  <pre><code>path.extname('index.html');
// 返回: '.html'

path.extname('file.with.multiple.dots.txt');
// 返回: '.txt'</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="method-card" id="join">
            <div class="method-header">
              <h3>path.join([...paths])</h3>
              <span class="method-type">方法</span>
            </div>
            <p class="method-description">拼接多个路径片段，自动处理路径分隔符</p>

            <div class="method-details">
              <div class="params">
                <h4>参数：</h4>
                <ul>
                  <li><code>...paths</code> - 多个路径片段</li>
                </ul>
              </div>

              <div class="returns">
                <h4>返回值：</h4>
                <p>拼接后的路径字符串</p>
              </div>

              <div class="example">
                <h4>示例：</h4>
                <div class="code-block">
                  <pre><code>path.join('/foo', 'bar', 'baz');
// 返回: '/foo/bar/baz' (POSIX)
// 返回: '\\foo\\bar\\baz' (Windows)

path.join('dir', 'subdir', 'file.txt');
// 返回: 'dir/subdir/file.txt'</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="method-card" id="resolve">
            <div class="method-header">
              <h3>path.resolve([...paths])</h3>
              <span class="method-type">方法</span>
            </div>
            <p class="method-description">将路径片段解析为绝对路径</p>

            <div class="method-details">
              <div class="params">
                <h4>参数：</h4>
                <ul>
                  <li><code>...paths</code> - 多个路径片段</li>
                </ul>
              </div>

              <div class="returns">
                <h4>返回值：</h4>
                <p>解析后的绝对路径</p>
              </div>

              <div class="example">
                <h4>示例：</h4>
                <div class="code-block">
                  <pre><code>// 假设当前工作目录是 /home/user
path.resolve('docs', 'file.txt');
// 返回: '/home/user/docs/file.txt'

path.resolve('/var/www', 'public', 'index.html');
// 返回: '/var/www/public/index.html'</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="method-card" id="parse">
            <div class="method-header">
              <h3>path.parse(path)</h3>
              <span class="method-type">方法</span>
            </div>
            <p class="method-description">将路径解析为对象形式</p>

            <div class="method-details">
              <div class="params">
                <h4>参数：</h4>
                <ul>
                  <li><code>path</code> - 文件路径字符串</li>
                </ul>
              </div>

              <div class="returns">
                <h4>返回值：</h4>
                <p>包含路径各部分的对象</p>
              </div>

              <div class="example">
                <h4>示例：</h4>
                <div class="code-block">
                  <pre><code>path.parse('/home/user/dir/file.txt');
// 返回:
// {
//   root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="method-card" id="format">
            <div class="method-header">
              <h3>path.format(pathObject)</h3>
              <span class="method-type">方法</span>
            </div>
            <p class="method-description">从路径对象创建路径字符串</p>

            <div class="method-details">
              <div class="params">
                <h4>参数：</h4>
                <ul>
                  <li><code>pathObject</code> - 包含路径信息的对象</li>
                </ul>
              </div>

              <div class="returns">
                <h4>返回值：</h4>
                <p>生成的路径字符串</p>
              </div>

              <div class="example">
                <h4>示例：</h4>
                <div class="code-block">
                  <pre><code>path.format({
  root: '/',
  dir: '/home/user/dir',
  base: 'file.txt'
});
// 返回: '/home/user/dir/file.txt'</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="method-card" id="normalize">
            <div class="method-header">
              <h3>path.normalize(path)</h3>
              <span class="method-type">方法</span>
            </div>
            <p class="method-description">规范化路径，处理多余的路径片段</p>

            <div class="method-details">
              <div class="params">
                <h4>参数：</h4>
                <ul>
                  <li><code>path</code> - 文件路径字符串</li>
                </ul>
              </div>

              <div class="returns">
                <h4>返回值：</h4>
                <p>规范化后的路径</p>
              </div>

              <div class="example">
                <h4>示例：</h4>
                <div class="code-block">
                  <pre><code>path.normalize('/foo/bar//baz/asdf/quux/..');
// 返回: '/foo/bar/baz/asdf'</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="method-card" id="isAbsolute">
            <div class="method-header">
              <h3>path.isAbsolute(path)</h3>
              <span class="method-type">方法</span>
            </div>
            <p class="method-description">判断路径是否为绝对路径</p>

            <div class="method-details">
              <div class="params">
                <h4>参数：</h4>
                <ul>
                  <li><code>path</code> - 文件路径字符串</li>
                </ul>
              </div>

              <div class="returns">
                <h4>返回值：</h4>
                <p>布尔值，表示路径是否为绝对路径</p>
              </div>

              <div class="example">
                <h4>示例：</h4>
                <div class="code-block">
                  <pre><code>path.isAbsolute('/foo/bar'); // true
path.isAbsolute('C:\\foo\\bar'); // true (Windows)
path.isAbsolute('bar/baz'); // false</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="method-card" id="relative">
            <div class="method-header">
              <h3>path.relative(from, to)</h3>
              <span class="method-type">方法</span>
            </div>
            <p class="method-description">获取从 from 路径到 to 路径的相对路径</p>

            <div class="method-details">
              <div class="params">
                <h4>参数：</h4>
                <ul>
                  <li><code>from</code> - 起始路径</li>
                  <li><code>to</code> - 目标路径</li>
                </ul>
              </div>

              <div class="returns">
                <h4>返回值：</h4>
                <p>相对路径字符串</p>
              </div>

              <div class="example">
                <h4>示例：</h4>
                <div class="code-block">
                  <pre><code>path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
// 返回: '../../impl/bbb'</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section v-show="activeSection === 'properties'" class="content-section">
          <h2>Path 模块属性</h2>

          <div class="property-card">
            <h3>path.sep</h3>
            <p>提供平台特定的路径片段分隔符</p>
            <div class="property-details">
              <div class="example">
                <h4>示例：</h4>
                <div class="code-block">
                  <pre><code>// 在 POSIX 系统上
console.log(path.sep); // 输出: '/'

// 在 Windows 系统上
console.log(path.sep); // 输出: '\\'</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="property-card">
            <h3>path.delimiter</h3>
            <p>提供平台特定的路径分隔符（用于 PATH 环境变量）</p>
            <div class="property-details">
              <div class="example">
                <h4>示例：</h4>
                <div class="code-block">
                  <pre><code>// 在 POSIX 系统上
console.log(path.delimiter); // 输出: ':'

// 在 Windows 系统上
console.log(path.delimiter); // 输出: ';'</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="property-card">
            <h3>path.posix</h3>
            <p>提供 POSIX 特定实现的 path 方法</p>
            <div class="property-details">
              <div class="example">
                <h4>示例：</h4>
                <div class="code-block">
                  <pre><code>// 在 Windows 上使用 POSIX 风格
console.log(path.posix.join('/foo', 'bar', 'baz'));
// 输出: '/foo/bar/baz'</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="property-card">
            <h3>path.win32</h3>
            <p>提供 Windows 特定实现的 path 方法</p>
            <div class="property-details">
              <div class="example">
                <h4>示例：</h4>
                <div class="code-block">
                  <pre><code>// 在 POSIX 系统上使用 Windows 风格
console.log(path.win32.join('C:\\', 'Users', 'John'));
// 输出: 'C:\\Users\\John'</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section v-show="activeSection === 'usage'" class="content-section">
          <h2>Path 模块使用场景</h2>

          <div class="scenario-cards">
            <div class="scenario-card">
              <div class="scenario-icon">📂</div>
              <h3>文件路径操作</h3>
              <p>获取文件扩展名、文件名、目录名等路径信息</p>
              <div class="code-block">
                <pre><code>// 获取文件扩展名
const ext = path.extname(filePath);

// 获取文件名（不含扩展名）
const fileName = path.basename(filePath, ext);</code></pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🔗</div>
              <h3>路径拼接</h3>
              <p>安全地拼接多个路径片段，避免手动拼接错误</p>
              <div class="code-block">
                <pre><code>const configPath = path.join(__dirname, 'config', 'app.json');
const imagePath = path.join(process.cwd(), 'public', 'images');</code></pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">📍</div>
              <h3>路径解析</h3>
              <p>将相对路径解析为绝对路径</p>
              <div class="code-block">
                <pre><code>const absolutePath = path.resolve('src', 'components', 'Button.jsx');</code></pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🔄</div>
              <h3>路径规范化</h3>
              <p>处理多余的路径分隔符和相对路径标记</p>
              <div class="code-block">
                <pre><code>const cleanPath = path.normalize('/foo/bar//baz/../qux');
// 返回: '/foo/bar/qux'</code></pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🌐</div>
              <h3>跨平台开发</h3>
              <p>确保代码在不同操作系统上正确处理路径</p>
              <div class="code-block">
                <pre><code>// 使用 path.join 代替手动拼接
const filePath = path.join('dir', 'subdir', 'file.txt');

// 在 Windows 上返回: 'dir\\subdir\\file.txt'
// 在 POSIX 上返回: 'dir/subdir/file.txt'</code></pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">📊</div>
              <h3>路径解析与格式化</h3>
              <p>将路径分解为对象或从对象创建路径</p>
              <div class="code-block">
                <pre><code>// 解析路径
const parsed = path.parse('/home/user/file.txt');

// 格式化路径
const formatted = path.format({
  root: '/',
  dir: '/home/user',
  base: 'newfile.txt'
});</code></pre>
              </div>
            </div>
          </div>
        </section>

        <section v-show="activeSection === 'best-practices'" class="content-section">
          <h2>Path 模块最佳实践</h2>

          <div class="practices">
            <div class="practice">
              <h3>1. 始终使用 path.join 拼接路径</h3>
              <p>避免使用字符串拼接（如 'dir' + '/' + 'file'），使用 path.join 确保跨平台兼容性。</p>
              <div class="code-block">
                <pre><code>// 推荐 ✅
const filePath = path.join(__dirname, 'data', 'file.json');

// 不推荐 ❌
const filePath = __dirname + '/data/file.json';</code></pre>
              </div>
            </div>

            <div class="practice">
              <h3>2. 使用 path.resolve 获取绝对路径</h3>
              <p>在处理文件系统操作时，使用绝对路径可以避免相对路径的歧义。</p>
              <div class="code-block">
                <pre><code>// 获取当前目录下的配置文件绝对路径
const configPath = path.resolve(process.cwd(), 'config.json');</code></pre>
              </div>
            </div>

            <div class="practice">
              <h3>3. 避免手动处理路径分隔符</h3>
              <p>使用 path.sep 代替硬编码的分隔符（'/' 或 '\'）。</p>
              <div class="code-block">
                <pre><code>// 推荐 ✅
const parts = filePath.split(path.sep);

// 不推荐 ❌
const parts = filePath.split('/'); // 在Windows上可能出错</code></pre>
              </div>
            </div>

            <div class="practice">
              <h3>4. 使用 path.parse 分解路径</h3>
              <p>当需要获取路径的各个部分时，使用 path.parse 比手动拆分更可靠。</p>
              <div class="code-block">
                <pre><code>const { dir, name, ext } = path.parse(filePath);
console.log(`目录: ${dir}, 文件名: ${name}, 扩展名: ${ext}`);</code></pre>
              </div>
            </div>

            <div class="practice">
              <h3>5. 在模块中使用 __dirname 和 __filename</h3>
              <p>在 CommonJS 模块中，使用 __dirname 获取当前文件目录，__filename 获取当前文件路径。</p>
              <div class="code-block">
                <pre><code>// 获取当前目录下的文件路径
const dataFile = path.join(__dirname, 'data.json');</code></pre>
              </div>
            </div>

            <div class="practice">
              <h3>6. 处理用户输入路径时进行规范化</h3>
              <p>用户提供的路径可能包含多余的分隔符或相对路径标记，使用 path.normalize 进行清理。</p>
              <div class="code-block">
                <pre><code>const userInput = '/foo//bar/../baz';
const safePath = path.normalize(userInput);
// 返回: '/foo/baz'</code></pre>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>Node.js Path 模块 | 文件路径处理的可靠解决方案</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const sections = [
  { id: 'overview', title: '模块概述' },
  { id: 'methods', title: '核心方法' },
  { id: 'properties', title: '属性常量' },
  { id: 'usage', title: '使用场景' },
  { id: 'best-practices', title: '最佳实践' }
];

const quickMethods = [
  { name: 'basename' },
  { name: 'dirname' },
  { name: 'extname' },
  { name: 'join' },
  { name: 'resolve' },
  { name: 'parse' },
  { name: 'normalize' },
  { name: 'isAbsolute' },
  { name: 'relative' }
];

const activeSection = ref('overview');

const scrollToMethod = (methodName: string) => {
  activeSection.value = 'methods';
  setTimeout(() => {
    const element = document.getElementById(methodName);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
};
</script>

<style lang="less" scoped>


.path-module-container {
  font-family: 'Noto Sans SC', sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  color: #2c3e50;
}

.header {
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  color: white;
  text-align: center;
  padding: 2.5rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.content-wrapper {
  display: flex;
  min-height: 800px;
}

.sidebar {
  width: 260px;
  background: #2c3e50;
  color: white;
  padding: 2rem 0;

  .sidebar-section {
    margin-bottom: 2rem;
    padding: 0 1.5rem;

    h3 {
      font-size: 1.3rem;
      margin-top: 0;
      margin-bottom: 1.2rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.8rem 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
      font-weight: 500;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-left-color: #3498db;
      }

      &.active {
        background: rgba(52, 152, 219, 0.2);
        border-left-color: #3498db;
        font-weight: 600;
      }
    }
  }
}

.quick-methods {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;

  .quick-method {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 0.8rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      background: rgba(52, 152, 219, 0.3);
      transform: translateX(5px);
    }

    .method-icon {
      font-size: 0.9rem;
    }
  }
}

.content {
  flex: 1;
  padding: 2rem;
  background: white;
  overflow-y: auto;
}

.content-section {
  max-width: 900px;
  margin: 0 auto;

  h2 {
    color: #2c3e50;
    font-size: 1.8rem;
    margin-bottom: 1.8rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #3498db;
  }
}

.intro-card {
  display: flex;
  gap: 1.5rem;
  background: #e3f2fd;
  border-radius: 10px;
  padding: 1.8rem;
  margin-bottom: 2rem;
  align-items: center;

  .intro-icon {
    font-size: 3.5rem;
    flex-shrink: 0;
  }

  .intro-content {
    p {
      line-height: 1.8;
      margin: 0.8rem 0;
    }

    code {
      background: rgba(52, 152, 219, 0.1);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'Roboto Mono', monospace;
    }
  }
}

.import-card {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #3498db;

  h3 {
    margin-top: 0;
    color: #2c3e50;
  }
}

.code-block {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 1.2rem;
  border-radius: 6px;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.95rem;
  overflow-x: auto;
  margin: 1rem 0;
  line-height: 1.5;

  pre {
    margin: 0;
  }

  code {
    font-family: inherit;
  }
}

.reasons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  .reason {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h4 {
      margin: 0.8rem 0;
      color: #2c3e50;
    }

    p {
      margin: 0;
      color: #7f8c8d;
      font-size: 0.95rem;
    }
  }
}

.method-card {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.8rem;
  margin-bottom: 1.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }

  .method-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    h3 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.4rem;
    }

    .method-type {
      background: #3498db;
      color: white;
      padding: 0.3rem 0.8rem;
      border-radius: 4px;
      font-size: 0.85rem;
      font-weight: 500;
    }
  }

  .method-description {
    font-size: 1.1rem;
    color: #34495e;
    margin-bottom: 1.5rem;
  }
}

.method-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .params,
  .returns,
  .example {
    h4 {
      font-size: 1.1rem;
      margin-top: 0;
      margin-bottom: 0.8rem;
      color: #2c3e50;
    }

    ul {
      padding-left: 1.2rem;
      margin: 0;

      li {
        margin-bottom: 0.6rem;
        line-height: 1.6;
      }
    }
  }
}

.property-card {
  background: #e8f5e9;
  border-radius: 10px;
  padding: 1.8rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid #4caf50;

  h3 {
    margin-top: 0;
    color: #2c3e50;
    font-size: 1.3rem;
  }

  p {
    color: #34495e;
    margin-bottom: 1.2rem;
  }
}

.scenario-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.8rem;

  .scenario-card {
    background: white;
    border-radius: 10px;
    padding: 1.8rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border-top: 4px solid #3498db;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    .scenario-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: #2c3e50;
    }

    p {
      color: #7f8c8d;
      margin-bottom: 1.2rem;
    }
  }
}

.practices {
  .practice {
    background: white;
  }
}
</style>
