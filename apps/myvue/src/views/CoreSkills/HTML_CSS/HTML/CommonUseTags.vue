<template>
  <div class="tag-guide-container">
    <h1 class="main-title">HTML常用标签基本指南</h1>

    <NavBar :list="htmlTags" show-child />

    <div v-for="(item, index) in htmlTags" :key="index" :id="item.id">
      <h2>{{ item.name }}</h2>
      <h3>{{ item.description }}</h3>
      <div class="tag-section" v-for="tag in item.children" :key="tag.name" :id="tag.id">
        <div class="tag-card">
          <h2 class="tag-title">
            <span class="tag-symbol">&lt;</span>{{ tag.name }}<span class="tag-symbol">&gt;</span>
          </h2>

          <div class="tag-content">
            <p class="tag-description">{{ tag.description }}</p>

            <div v-if="tag.attributes" class="attributes-section">
              <h3 class="section-subtitle">主要特性：</h3>
              <ul class="attributes-list">
                <li v-for="(attr, index) in tag.attributes" :key="index">
                  <code class="attribute-code">{{ attr }}</code>
                </li>
              </ul>
            </div>

            <div class="example-section">
              <h3 class="section-subtitle">使用示例：</h3>
              <pre class="code-block"><code>{{ tag.example }}</code></pre>
            </div>

            <div v-if="tag.notes" class="notes-section">
              <h3 class="section-subtitle notes-title">注意事项：</h3>
              <p class="notes-text">{{ tag.notes }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components//ScrollNav.vue'
interface Type {
  name: string
  id: string
  description: string
  children?: HtmlTag[]
}

interface HtmlTag {
  name: string
  type: string
  id: string
  description: string
  attributes?: string[]
  example: string
  notes?: string
  properties?: string[]
}

const htmlTags: Type[] = [
  {
    name: '块级元素',
    id: 'block-element',
    description: '块级元素是HTML中最基础的结构性元素,它们会独占一行并自动换行。块级元素可以包含其他块级元素和行内元素,是构建页面布局的基础。常见的块级元素包括div、p、h1-h6等。',
    children: [
      {
        name: 'h1-h6',
        type: '块级元素',
        id: 'block-element-h1-h6',
        description: '标题标签，用于定义文档标题，h1为最高级标题',
        attributes: ['全局属性'],
        example: `<h1>主标题</h1>
<h2>次级标题</h2>
<h3>三级标题</h3>`,
        notes: '应保持标题层级结构的合理性'
      },
      {
        name: 'p',
        type: '块级元素',
        id: 'block-element-p',
        description: '段落标签，用于定义文本段落',
        example: `<p>这是一个文本段落。包含多个句子...</p>`
      },
      {
        name: 'div',
        type: '块级元素',
        id: 'block-element-div',
        description: '区块容器，用于布局和样式分组',
        example: `<div class="container">
  <p>内容区块</p>
</div>`
      },
      {
        name: 'ul/ol/li',
        type: '块级元素',
        id: 'block-element-ul-ol-li',
        description: '列表标签，ul为无序列表，ol为有序列表',
        example: `<ul>
  <li>列表项1</li>
  <li>列表项2</li>
</ul>

<ol>
  <li>第一项</li>
  <li>第二项</li>
</ol>`
      }
    ]
  },
  {
    name: '布局元素',
    id: 'layout-element',
    description: '布局元素是HTML5新增的语义化标签,用于明确划分页面的不同功能区域。它们能让页面结构更加清晰,提高代码可读性和可维护性。主要包括header、footer、nav、article、section等标签。',
    children: [
      {
        name: 'header',
        type: '布局元素',
        id: 'layout-element-header',
        description: '页头区域标签',
        example: `<header>
  <h1>网站标题</h1>
  <nav>导航菜单</nav>
</header>`
      },
      {
        name: 'footer',
        type: '布局元素',
        id: 'layout-element-footer',
        description: '页脚区域标签',
        example: `<footer>
  <p>版权信息 © 2024</p>
</footer>`
      },
      {
        name: 'nav',
        type: '布局元素',
        id: 'layout-element-nav',
        description: '导航区域标签',
        example: `<nav>
  <a href="#home">首页</a>
  <a href="#about">关于</a>
</nav>`
      },
      {
        name: 'article',
        type: '布局元素',
        id: 'layout-element-article',
        description: '文章内容标签',
        example: `<article>
  <h2>文章标题</h2>
  <p>文章内容...</p>
</article>`
      },
      {
        name: 'section',
        type: '布局元素',
        id: 'layout-element-section',
        description: '区域分组标签',
        example: `<section>
  <h2>区域标题</h2>
  <p>区域内容...</p>
</section>`
      },
      {
        name: 'aside',
        type: '布局元素',
        id: 'layout-element-aside',
        description: '侧边栏标签',
        example: `<aside>
  <h3>相关链接</h3>
  <ul>
    <li><a href="#">链接1</a></li>
  </ul>
</aside>`
      }
    ]
  },
  {
    name: '行内元素',
    id: 'inline-element',
    description: '行内元素是HTML中用于在文本流中嵌入内容的元素,它们不会导致换行。行内元素通常用于对文本内容进行修饰或添加功能,如链接、强调、图片等。常见的行内元素包括span、a、img等。',
    children: [
      {
        name: 'a',
        type: '行内元素',
        id: 'inline-element-a',
        description: '超链接标签，用于创建页面跳转',
        attributes: ['href="URL"', 'target="_blank(新窗口)|_self(当前窗口)|_parent(父窗口)|_top(顶级窗口)"'],
        example: `<a href="https://example.com" target="_blank">访问示例网站</a>`
      },
      {
        name: 'img',
        type: '行内块元素',
        id: 'inline-element-img',
        description: '图像标签，用于嵌入图像',
        attributes: ['src="URL"', 'alt="替代文本"', 'width="像素"', 'height="像素"'],
        example: `<img src="logo.png" alt="网站Logo" width="200" height="100">`,
        notes: '必须提供alt属性以提高可访问性'
      },
      {
        name: 'span',
        type: '行内元素',
        id: 'inline-element-span',
        description: '行内容器，用于内联样式分组',
        example: `<p>这是一段<span class="highlight">特殊文本</span></p>`
      }
    ]
  },
  {
    name: '表单元素',
    id: 'form-element',
    description: '表单元素是用于收集用户输入数据的交互性组件。它们是实现用户与网站交互的重要工具,包括文本输入框、按钮、复选框等多种类型。通过表单元素可以创建各种用户交互界面。',
    children: [
      {
        name: 'form',
        type: '表单元素',
        id: 'form-element-form',
        description: '表单容器，用于收集用户输入',
        attributes: ['action="URL"', 'method="GET|POST"'],
        example: `<form action="/submit" method="POST">
  <input type="text" name="username">
  <button type="submit">提交</button>
</form>`
      },
      {
        name: 'input',
        type: '表单元素',
        id: 'form-element-input',
        description: '表单输入元素',
        attributes: [
          'type="text|password|email|number..."',
          'placeholder="提示文本"',
          'required'
        ],
        example: `<input type="text" placeholder="请输入姓名" required>`
      },
      {
        name: 'button',
        type: '表单元素',
        id: 'form-element-button',
        description: '按钮元素',
        example: `<button type="button" @click="handleClick">提交</button>`
      },
      {
        name: 'textarea',
        type: '表单元素',
        id: 'form-element-textarea',
        description: '多行文本输入框',
        attributes: ['rows="行数"', 'cols="列数"', 'placeholder="提示文本"'],
        example: `<textarea rows="4" cols="50" placeholder="请输入详细描述..."></textarea>`
      },
      {
        name: 'select',
        type: '表单元素',
        id: 'form-element-select',
        description: '下拉选择框',
        example: `<select>
  <option value="1">选项1</option>
  <option value="2">选项2</option>
</select>`
      },
      {
        name: 'label',
        type: '行内元素',
        id: 'form-element-label',
        description: '表单标签，提高表单可访问性',
        attributes: ['for="输入框ID"'],
        example: `<label for="username">用户名：</label>
<input id="username" type="text">`
      }
    ]
  },
  {
    name: '其他元素',
    id: 'other-element',
    description: '除了常见的块级元素、行内元素和表单元素外,HTML还提供了一些特殊用途的元素。这些元素用于展示特定类型的内容,如表格、音频、视频等,能够丰富网页的展现形式。',
    children: [
      {
        name: 'table',
        type: '块级元素',
        id: 'other-element-table',
        description: '表格容器',
        example: `<table>
  <tr>
    <th>姓名</th>
    <th>年龄</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>25</td>
  </tr>
</table>`
      },
      {
        name: 'video',
        type: '音视频元素',
        id: 'other-element-video',
        description: '视频播放标签',
        attributes: ['src="URL"', 'controls', 'autoplay', 'loop'],
        example: `<video src="video.mp4" controls></video>`
      }
    ]
  }
]
</script>

<style scoped>
.tag-guide-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #111827;
  background-color: #f9fafb;
}

.main-title {
  color: #111827;
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.25rem;
  font-weight: 700;
}

h2 {
  font-size: 1.75rem;
  font-weight: 600;
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 0.5rem;
}

h3 {
  font-size: 1.1rem;
  font-weight: 400;
  color: #6b7280;
  text-align: center;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.tag-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
}

.tag-title {
  color: #3b82f6;
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1rem;
}

.tag-symbol {
  color: #9ca3af;
}

.tag-content {
  line-height: 1.6;
  color: #374151;
}

.section-subtitle {
  color: #111827;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 1.5rem 0 0.5rem;
}

.attributes-list {
  padding-left: 1.5rem;
  margin: 1rem 0;
  list-style-type: disc;
}

.attribute-code {
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: #1f2937;
  font-family: 'Fira Code', monospace;
}

.code-block {
  background: #f3f4f6;
  color: #1f2937;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.notes-section {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1e40af;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
}

.notes-title {
  color: #1e3a8a;
  margin-top: 0;
}

.notes-text {
  color: #1e40af;
  margin: 0;
}

@media (max-width: 768px) {
  .tag-guide-container {
    padding: 1rem;
  }

  .main-title {
    font-size: 2rem;
  }
}
</style>
