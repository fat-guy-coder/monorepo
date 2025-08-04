<template>
  <div class="inquirer-docs">
    <header class="docs-header">
      <div class="header-content">
        <h1>Inquirer.js</h1>
        <p class="subtitle">交互式命令行用户界面集合</p>
        <p class="description">创建美观、功能丰富的命令行界面，轻松收集用户输入</p>
      </div>
      <div class="header-badge">
        <span class="version">v9.2.14</span>
        <span class="license">MIT License</span>
      </div>
    </header>

    <div class="tabs">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab }}
      </button>
    </div>

    <div class="content-section">
      <!-- 提示类型 -->
      <div v-show="activeTab === 0" class="prompts-section">
        <h2>提示类型</h2>
        <p class="section-intro">
          Inquirer.js 提供多种交互式提示类型，每种类型都针对特定输入场景设计
        </p>

        <div class="prompt-grid">
          <div v-for="prompt in promptTypes" :key="prompt.name" class="prompt-card">
            <div class="prompt-header">
              <span class="prompt-name">{{ prompt.name }}</span>
              <span class="prompt-type">{{ prompt.type }}</span>
            </div>
            <p class="prompt-description">{{ prompt.description }}</p>

            <div class="prompt-options" v-if="prompt.options">
              <div class="options-header">选项配置</div>
              <ul>
                <li v-for="(option, index) in prompt.options" :key="index">
                  <code>{{ option.name }}</code
                  >: {{ option.description }}
                </li>
              </ul>
            </div>

            <div class="code-example">
              <pre><code>{{ prompt.example }}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 核心API -->
      <div v-show="activeTab === 1" class="api-section">
        <h2>核心API</h2>
        <p class="section-intro">
          Inquirer.js 提供简洁而强大的核心API，用于创建和管理交互式命令行界面
        </p>

        <div class="api-grid">
          <div v-for="api in coreAPI" :key="api.name" class="api-card">
            <div class="api-header">
              <code class="api-name">{{ api.name }}</code>
              <span class="api-type">{{ api.type }}</span>
            </div>
            <p class="api-description">{{ api.description }}</p>

            <div class="api-params" v-if="api.params">
              <div class="params-header">参数</div>
              <ul>
                <li v-for="(param, index) in api.params" :key="index">
                  <code>{{ param.name }}</code
                  >: {{ param.type }} - {{ param.description }}
                </li>
              </ul>
            </div>

            <div class="api-returns" v-if="api.returns">
              <div class="returns-header">返回值</div>
              <p>{{ api.returns }}</p>
            </div>

            <div class="code-example" v-if="api.example">
              <pre><code>{{ api.example }}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用示例 -->
      <div v-show="activeTab === 2" class="usage-section">
        <h2>使用示例</h2>
        <p class="section-intro">以下示例展示了如何使用Inquirer.js创建完整的命令行交互流程</p>

        <div class="example-container">
          <div class="example-card">
            <h3>用户注册流程</h3>
            <pre class="code-block"><code>import inquirer from 'inquirer';

const questions = [
  {
    type: 'input',
    name: 'username',
    message: '请输入用户名:',
    validate: input => input.length >= 3 || '用户名至少需要3个字符'
  },
  {
    type: 'password',
    name: 'password',
    message: '请输入密码:',
    mask: '*',
    validate: input => input.length >= 6 || '密码至少需要6个字符'
  },
  {
    type: 'list',
    name: 'role',
    message: '选择您的角色:',
    choices: ['用户', '管理员', '访客'],
    default: '用户'
  },
  {
    type: 'checkbox',
    name: 'interests',
    message: '选择您的兴趣:',
    choices: [
      '编程', '设计', '音乐',
      '游戏', '阅读', '运动'
    ]
  },
  {
    type: 'confirm',
    name: 'agreement',
    message: '您是否同意服务条款?',
    default: false
  }
];

inquirer.prompt(questions)
  .then(answers => {
    console.log('注册信息:');
    console.log(JSON.stringify(answers, null, 2));
  })
  .catch(error => {
    console.error('注册过程中发生错误:', error);
  });</code></pre>
          </div>

          <div class="example-card">
            <h3>配置管理界面</h3>
            <pre class="code-block"><code>import inquirer from 'inquirer';

async function manageConfig() {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: '配置管理:',
    choices: [
      '查看当前配置',
      '修改配置项',
      '重置为默认配置',
      '退出'
    ]
  });

  switch (action) {
    case '查看当前配置':
      // 显示配置逻辑
      break;
    case '修改配置项':
      await editConfig();
      break;
    case '重置为默认配置':
      // 重置配置逻辑
      break;
    case '退出':
      return;
  }

  await manageConfig();
}

async function editConfig() {
  const { configKey } = await inquirer.prompt({
    type: 'list',
    name: 'configKey',
    message: '选择要修改的配置项:',
    choices: Object.keys(currentConfig)
  });

  const { newValue } = await inquirer.prompt({
    type: 'input',
    name: 'newValue',
    message: `输入 ${configKey} 的新值:`,
    default: currentConfig[configKey]
  });

  // 更新配置逻辑
  currentConfig[configKey] = newValue;
  console.log(`✅ ${configKey} 已更新为: ${newValue}`);
}

manageConfig();</code></pre>
          </div>
        </div>
      </div>
    </div>

    <footer class="docs-footer">
      <p>© 2024 Inquirer.js 文档 | 由社区驱动 | 在 GitHub 上贡献</p>
      <div class="footer-links">
        <a href="#">GitHub</a>
        <a href="#">文档</a>
        <a href="#">示例</a>
        <a href="#">讨论</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref(0)
const tabs = ['提示类型', '核心API', '使用示例']

// 提示类型数据
const promptTypes = ref([
  {
    name: '输入提示',
    type: 'input',
    description: '用于接收用户输入的文本信息，适合需要自由格式输入的场景',
    options: [
      { name: 'message', description: '提示信息，显示给用户的问题' },
      { name: 'default', description: '默认值，当用户未输入时使用' },
      { name: 'validate', description: '验证函数，用于验证用户输入的有效性' },
      { name: 'filter', description: '过滤函数，用于在返回前处理用户输入' },
    ],
    example: `{
  type: 'input',
  name: 'username',
  message: '请输入您的用户名:',
  default: 'user123',
  validate: input => input.length >= 3 || '用户名至少需要3个字符'
}`,
  },
  {
    name: '数字输入',
    type: 'number',
    description: '专门用于接收数字输入，自动验证输入是否为有效数字',
    options: [
      { name: 'message', description: '提示信息' },
      { name: 'default', description: '默认数值' },
      { name: 'min', description: '允许的最小值' },
      { name: 'max', description: '允许的最大值' },
    ],
    example: `{
  type: 'number',
  name: 'age',
  message: '请输入您的年龄:',
  default: 25,
  min: 18,
  max: 99
}`,
  },
  {
    name: '密码输入',
    type: 'password',
    description: '安全接收敏感信息，输入时隐藏字符或显示掩码',
    options: [
      { name: 'message', description: '提示信息' },
      { name: 'mask', description: '用于隐藏输入的字符，如 "*" 或 "•"' },
      { name: 'validate', description: '密码强度验证函数' },
    ],
    example: `{
  type: 'password',
  name: 'password',
  message: '设置您的密码:',
  mask: '•',
  validate: input => input.length >= 8 || '密码至少需要8个字符'
}`,
  },
  {
    name: '列表选择',
    type: 'list',
    description: '提供多个选项的单选界面，使用方向键选择',
    options: [
      { name: 'message', description: '提示信息' },
      { name: 'choices', description: '可选项数组' },
      { name: 'default', description: '默认选中的选项索引或值' },
      { name: 'pageSize', description: '控制一次显示多少选项' },
    ],
    example: `{
  type: 'list',
  name: 'framework',
  message: '选择您的前端框架:',
  choices: ['React', 'Vue', 'Angular', 'Svelte'],
  default: 'Vue'
}`,
  },
  {
    name: '原始列表',
    type: 'rawlist',
    description: '类似列表选择，但使用数字编号选择选项',
    options: [
      { name: 'message', description: '提示信息' },
      { name: 'choices', description: '可选项数组' },
      { name: 'default', description: '默认选中的选项索引' },
    ],
    example: `{
  type: 'rawlist',
  name: 'color',
  message: '选择您喜欢的颜色:',
  choices: ['红色', '蓝色', '绿色', '黄色'],
  default: 1
}`,
  },
  {
    name: '扩展选择',
    type: 'expand',
    description: '类似列表选择，但支持快捷键选择选项',
    options: [
      { name: 'message', description: '提示信息' },
      { name: 'choices', description: '可选项数组，可设置key属性' },
      { name: 'default', description: '默认选中的选项索引' },
    ],
    example: `{
  type: 'expand',
  name: 'action',
  message: '选择操作:',
  choices: [
    { key: 'a', name: '添加用户', value: 'add' },
    { key: 'e', name: '编辑用户', value: 'edit' },
    { key: 'd', name: '删除用户', value: 'delete' }
  ],
  default: 'a'
}`,
  },
  {
    name: '复选框',
    type: 'checkbox',
    description: '提供多选功能，允许用户选择多个选项',
    options: [
      { name: 'message', description: '提示信息' },
      { name: 'choices', description: '可选项数组' },
      { name: 'default', description: '默认选中的选项数组' },
      { name: 'pageSize', description: '控制一次显示多少选项' },
      { name: 'validate', description: '验证函数，检查是否选择了最少选项' },
    ],
    example: `{
  type: 'checkbox',
  name: 'languages',
  message: '选择您熟悉的编程语言:',
  choices: ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust'],
  default: ['JavaScript'],
  validate: selected =>
    selected.length > 0 || '至少选择一种语言'
}`,
  },
  {
    name: '确认提示',
    type: 'confirm',
    description: '简单的"是/否"问题，返回布尔值',
    options: [
      { name: 'message', description: '提示信息' },
      { name: 'default', description: '默认值（true/false）' },
    ],
    example: `{
  type: 'confirm',
  name: 'install',
  message: '是否安装依赖包?',
  default: true
}`,
  },
  {
    name: '编辑器',
    type: 'editor',
    description: '打开系统默认编辑器接收多行输入',
    options: [
      { name: 'message', description: '提示信息' },
      { name: 'default', description: '默认内容' },
      { name: 'waitForUseInput', description: '是否等待用户关闭编辑器' },
    ],
    example: `{
  type: 'editor',
  name: 'description',
  message: '请输入项目描述:',
  default: '这是一个很棒的项目...',
  waitForUseInput: true
}`,
  },
])

// 核心API数据
const coreAPI = ref([
  {
    name: 'inquirer.prompt(questions)',
    type: 'Function',
    description: '核心方法，用于启动提示过程并收集用户输入',
    params: [
      { name: 'questions', type: 'Array | QuestionCollection', description: '问题数组或问题集合' },
    ],
    returns: 'Promise<Answers> - 包含用户回答的对象',
    example: `const answers = await inquirer.prompt([
  {
    type: 'input',
    name: 'projectName',
    message: '项目名称:'
  },
  {
    type: 'confirm',
    name: 'useTypeScript',
    message: '是否使用TypeScript?'
  }
]);`,
  },
  {
    name: 'inquirer.createPromptModule()',
    type: 'Function',
    description: '创建独立的提示模块，可自定义配置',
    returns: 'PromptModule - 独立的提示函数',
    example: `const prompt = inquirer.createPromptModule();
const answers = await prompt([
  {
    type: 'input',
    name: 'username',
    message: '用户名:'
  }
]);`,
  },
  {
    name: 'inquirer.registerPrompt(name, prompt)',
    type: 'Function',
    description: '注册自定义提示类型，扩展Inquirer的功能',
    params: [
      { name: 'name', type: 'string', description: '提示类型的名称' },
      { name: 'prompt', type: 'PromptConstructor', description: '提示构造函数' },
    ],
    example: `const MyCustomPrompt = require('./custom-prompt');
inquirer.registerPrompt('custom', MyCustomPrompt);

await inquirer.prompt({
  type: 'custom',
  name: 'customInput',
  message: '使用自定义提示:'
});`,
  },
  {
    name: 'inquirer.createPrompt(question)',
    type: 'Function',
    description: '底层方法，创建单个提示实例',
    params: [{ name: 'question', type: 'Question', description: '问题对象' }],
    returns: 'Prompt - 提示实例',
    example: `const prompt = inquirer.createPrompt({
  type: 'input',
  name: 'example',
  message: '示例输入:'
});

prompt.run().then(answer => {
  console.log('用户输入:', answer);
});`,
  },
  {
    name: 'inquirer.ui',
    type: 'Object',
    description: '包含UI管理方法和属性，用于控制界面行为',
    example: `// 例如，使用BottomBar显示状态信息
const bottomBar = new inquirer.ui.BottomBar();
bottomBar.updateBottomBar('正在处理...');`,
  },
  {
    name: 'inquirer.Separator',
    type: 'Class',
    description: '创建选项分隔符，用于在列表中分组选项',
    example: `{
  type: 'list',
  name: 'category',
  message: '选择类别:',
  choices: [
    '前端框架',
    new inquirer.Separator(),
    'React',
    'Vue',
    'Angular',
    new inquirer.Separator(),
    '后端框架',
    'Express',
    'Koa',
    'NestJS'
  ]
}`,
  },
])
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&display=swap');

.inquirer-docs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #ffffff;
  color: #334155;
  line-height: 1.6;
}

.docs-header {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  border-radius: 12px;
  padding: 2.5rem 2rem;
  margin-bottom: 2.5rem;
  position: relative;
  overflow: hidden;
  color: white;
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.25);

  .header-content {
    position: relative;
    z-index: 2;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.4rem;
      font-weight: 500;
      opacity: 0.9;
      margin-bottom: 1rem;
    }

    .description {
      font-size: 1.05rem;
      max-width: 600px;
      opacity: 0.85;
      margin-bottom: 0;
    }
  }

  .header-badge {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    display: flex;
    gap: 0.75rem;

    span {
      background: rgba(255, 255, 255, 0.15);
      padding: 0.35rem 0.8rem;
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 500;
      backdrop-filter: blur(4px);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
    border-radius: 50%;
  }
}

.tabs {
  display: flex;
  margin-bottom: 1.75rem;
  border-bottom: 1px solid #e2e8f0;

  button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    position: relative;
    transition: all 0.25s ease;

    &:hover {
      color: #4f46e5;
    }

    &.active {
      color: #4f46e5;
      font-weight: 600;

      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 3px;
        background: #4f46e5;
        border-radius: 3px 3px 0 0;
      }
    }
  }
}

.content-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 2rem;

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid #f1f5f9;
  }

  .section-intro {
    color: #64748b;
    margin-bottom: 1.75rem;
    font-size: 1.05rem;
    max-width: 800px;
  }
}

.prompt-grid,
.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.75rem;
}

.prompt-card,
.api-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(79, 70, 229, 0.12);
    border-color: #e0e7ff;
  }
}

.prompt-header {
  padding: 1.25rem 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .prompt-name {
    font-weight: 600;
    font-size: 1.15rem;
    color: #1e293b;
  }

  .prompt-type {
    background: #e0e7ff;
    color: #4f46e5;
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 500;
  }
}

.api-header {
  padding: 1.25rem 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #f1f5f9;

  .api-name {
    font-family: 'Source Code Pro', monospace;
    font-size: 1.05rem;
    font-weight: 600;
    color: #4f46e5;
    display: block;
    margin-bottom: 0.5rem;
  }

  .api-type {
    background: #ede9fe;
    color: #8b5cf6;
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 500;
  }
}

.prompt-description,
.api-description {
  padding: 1.25rem 1.5rem;
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
}

.prompt-options,
.api-params,
.api-returns {
  padding: 0 1.5rem 1.25rem;

  .options-header,
  .params-header,
  .returns-header {
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px dashed #e2e8f0;
  }

  ul {
    padding-left: 1.25rem;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
      font-size: 0.92rem;
      color: #475569;

      code {
        font-family: 'Source Code Pro', monospace;
        background: #f1f5f9;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        color: #4f46e5;
      }
    }
  }
}

.code-example {
  background: #0f172a;
  border-radius: 0 0 10px 10px;
  padding: 1.25rem 1.5rem;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #e2e8f0;
  overflow-x: auto;

  pre {
    margin: 0;
  }
}

.usage-section {
  .example-container {
    display: grid;
    gap: 1.75rem;
  }

  .example-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid #f1f5f9;

    h3 {
      padding: 1.25rem 1.5rem;
      margin: 0;
      background: #f8fafc;
      border-bottom: 1px solid #f1f5f9;
      font-size: 1.1rem;
      font-weight: 600;
      color: #1e293b;
    }
  }

  .code-block {
    background: #0f172a;
    padding: 1.5rem;
    margin: 0;
    overflow-x: auto;

    code {
      font-family: 'Source Code Pro', monospace;
      font-size: 0.92rem;
      line-height: 1.5;
      color: #e2e8f0;
    }
  }
}

.docs-footer {
  margin-top: 3rem;
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;

  .footer-links {
    margin-top: 0.75rem;

    a {
      color: #4f46e5;
      text-decoration: none;
      margin: 0 0.75rem;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .prompt-grid,
  .api-grid {
    grid-template-columns: 1fr;
  }

  .tabs {
    overflow-x: auto;
    padding-bottom: 1px;

    button {
      flex-shrink: 0;
    }
  }

  .docs-header {
    padding: 1.75rem 1.5rem;

    h1 {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.2rem;
    }
  }
}
</style>
