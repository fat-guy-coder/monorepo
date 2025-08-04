<template>
  <div class="cli-tools-container">
    <header class="header">
      <div class="logo-container">
        <div class="logo-grid">
          <div class="logo-card enquirer-logo">
            <div class="logo-inner">
              <div class="logo-text">E</div>
            </div>
            <div class="logo-label">Enquirer</div>
          </div>
          <div class="logo-card yargs-logo">
            <div class="logo-inner">
              <div class="logo-text">Y</div>
            </div>
            <div class="logo-label">Yargs</div>
          </div>
        </div>
        <h1>命令行工具开发利器</h1>
      </div>
      <p class="subtitle">强大的命令行界面开发工具集合</p>
    </header>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="content">
      <!-- 概述部分 -->
      <section v-show="activeTab === 'overview'" class="section overview-section">
        <div class="intro-cards">
          <div class="intro-card enquirer-intro">
            <h2><i class="icon-prompt"></i> Enquirer</h2>
            <p>
              Enquirer 是一个直观、用户友好的命令行提示工具，提供了丰富的交互式组件，
              如文本输入、选择列表、多选、密码输入等，让您轻松创建美观的命令行界面。
            </p>
            <div class="features">
              <div class="feature"><i class="feature-icon">✨</i> 30+ 种交互式提示类型</div>
              <div class="feature"><i class="feature-icon">🎨</i> 高度可定制的样式</div>
              <div class="feature"><i class="feature-icon">⚡</i> 异步操作支持</div>
              <div class="feature"><i class="feature-icon">🧩</i> 插件扩展系统</div>
            </div>
          </div>

          <div class="intro-card yargs-intro">
            <h2><i class="icon-command"></i> Yargs</h2>
            <p>
              Yargs 是一个强大的命令行参数解析器，帮助您构建复杂的命令行应用。 它提供直观的 API
              来处理参数、选项、子命令等，并自动生成帮助文档。
            </p>
            <div class="features">
              <div class="feature"><i class="feature-icon">🔧</i> 强大的参数解析能力</div>
              <div class="feature"><i class="feature-icon">📖</i> 自动生成帮助文档</div>
              <div class="feature"><i class="feature-icon">🔄</i> 命令链式调用</div>
              <div class="feature"><i class="feature-icon">🌐</i> 国际化支持</div>
            </div>
          </div>
        </div>

        <div class="comparison-table">
          <h2>功能对比</h2>
          <table>
            <thead>
              <tr>
                <th>功能</th>
                <th>Enquirer</th>
                <th>Yargs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>用户输入处理</td>
                <td><i class="check">✓</i></td>
                <td><i class="check">✓</i></td>
              </tr>
              <tr>
                <td>命令行参数解析</td>
                <td><i class="cross">✗</i></td>
                <td><i class="check">✓</i></td>
              </tr>
              <tr>
                <td>交互式提示</td>
                <td><i class="check">✓</i></td>
                <td><i class="cross">✗</i></td>
              </tr>
              <tr>
                <td>自动帮助生成</td>
                <td><i class="cross">✗</i></td>
                <td><i class="check">✓</i></td>
              </tr>
              <tr>
                <td>命令链式调用</td>
                <td><i class="cross">✗</i></td>
                <td><i class="check">✓</i></td>
              </tr>
              <tr>
                <td>自定义验证</td>
                <td><i class="check">✓</i></td>
                <td><i class="check">✓</i></td>
              </tr>
              <tr>
                <td>插件系统</td>
                <td><i class="check">✓</i></td>
                <td><i class="check">✓</i></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="integration">
          <h2>结合使用示例</h2>
          <div class="code-block">
            <pre>
// 结合使用 Enquirer 和 Yargs
import yargs from 'yargs';
import { AutoComplete } from 'enquirer';

const argv = yargs(process.argv.slice(2))
  .command('init', '初始化项目', (yargs) => {
    return yargs.option('template', {
      describe: '项目模板',
      type: 'string'
    });
  })
  .parse();

if (argv._.includes('init')) {
  // 使用 Enquirer 获取用户输入
  const prompt = new AutoComplete({
    name: 'template',
    message: '选择项目模板',
    choices: ['react', 'vue', 'angular', 'svelte']
  });

  const template = await prompt.run();
  console.log(`正在创建 ${template} 项目...`);
}</pre
            >
          </div>
        </div>
      </section>

      <!-- Enquirer API 文档 -->
      <section v-show="activeTab === 'enquirer'" class="section api-section">
        <h2 class="section-title"><i class="icon-prompt"></i> Enquirer API 参考</h2>

        <div class="prompt-types">
          <h3>常用提示类型</h3>
          <div class="prompt-grid">
            <div v-for="prompt in enquirerPrompts" :key="prompt.name" class="prompt-card">
              <div class="prompt-header">
                <div class="prompt-name">{{ prompt.name }}</div>
                <div class="prompt-class">{{ prompt.class }}</div>
              </div>
              <div class="prompt-desc">{{ prompt.description }}</div>
              <div class="prompt-example">
                <pre>{{ prompt.example }}</pre>
              </div>
            </div>
          </div>
        </div>

        <div class="api-methods">
          <h3>核心 API 方法</h3>
          <div class="methods-grid">
            <div v-for="method in enquirerMethods" :key="method.name" class="method-card">
              <div class="method-header">
                <div class="method-name">{{ method.name }}</div>
                <div class="method-params">{{ method.params }}</div>
              </div>
              <div class="method-desc">{{ method.description }}</div>
              <div class="method-returns">返回: {{ method.returns }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Yargs API 文档 -->
      <section v-show="activeTab === 'yargs'" class="section api-section">
        <h2 class="section-title"><i class="icon-command"></i> Yargs API 参考</h2>

        <div class="yargs-config">
          <h3>核心配置方法</h3>
          <div class="config-grid">
            <div v-for="method in yargsConfigMethods" :key="method.name" class="config-card">
              <div class="config-header">
                <div class="config-name">{{ method.name }}</div>
                <div class="config-params">{{ method.params }}</div>
              </div>
              <div class="config-desc">{{ method.description }}</div>
              <div class="config-example">
                <pre>{{ method.example }}</pre>
              </div>
            </div>
          </div>
        </div>

        <div class="yargs-commands">
          <h3>命令与选项</h3>
          <div class="commands-grid">
            <div v-for="method in yargsCommandMethods" :key="method.name" class="command-card">
              <div class="command-header">
                <div class="command-name">{{ method.name }}</div>
                <div class="command-params">{{ method.params }}</div>
              </div>
              <div class="command-desc">{{ method.description }}</div>
              <div class="command-example">
                <pre>{{ method.example }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 示例部分 -->
      <section v-show="activeTab === 'examples'" class="section examples-section">
        <h2 class="section-title"><i class="icon-code"></i> 使用示例</h2>

        <div class="example-tabs">
          <button
            v-for="exampleTab in exampleTabs"
            :key="exampleTab.id"
            :class="['example-tab-btn', { active: activeExampleTab === exampleTab.id }]"
            @click="activeExampleTab = exampleTab.id"
          >
            {{ exampleTab.label }}
          </button>
        </div>

        <!-- Enquirer 示例 -->
        <div v-show="activeExampleTab === 'enquirer'" class="example-content">
          <div class="example-card">
            <h3>表单式输入</h3>
            <div class="code-block">
              <pre>
import { Form } from 'enquirer';

const prompt = new Form({
  name: 'user',
  message: '请输入用户信息:',
  choices: [
    { name: 'name', message: '用户名' },
    { name: 'email', message: '邮箱' },
    { name: 'password', message: '密码', type: 'password' }
  ]
});

const user = await prompt.run();
console.log('注册用户:', user);</pre
              >
            </div>
          </div>

          <div class="example-card">
            <h3>多选列表</h3>
            <div class="code-block">
              <pre>
import { MultiSelect } from 'enquirer';

const prompt = new MultiSelect({
  name: 'tools',
  message: '选择要安装的开发工具:',
  choices: [
    { name: 'eslint', value: 'eslint' },
    { name: 'prettier', value: 'prettier' },
    { name: 'typescript', value: 'typescript' },
    { name: 'jest', value: 'jest' }
  ]
});

const tools = await prompt.run();
console.log('安装工具:', tools);</pre
              >
            </div>
          </div>

          <div class="example-card">
            <h3>自定义验证</h3>
            <div class="code-block">
              <pre>
import { Input } from 'enquirer';

const prompt = new Input({
  name: 'age',
  message: '请输入您的年龄:',
  validate(value) {
    if (isNaN(value)) return '请输入数字';
    if (value < 18) return '年龄必须大于18岁';
    return true;
  }
});

const age = await prompt.run();
console.log('年龄:', age);</pre
              >
            </div>
          </div>
        </div>

        <!-- Yargs 示例 -->
        <div v-show="activeExampleTab === 'yargs'" class="example-content">
          <div class="example-card">
            <h3>基本命令解析</h3>
            <div class="code-block">
              <pre>
import yargs from 'yargs';

const argv = yargs(process.argv.slice(2))
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: '详细输出模式'
  })
  .option('port', {
    alias: 'p',
    type: 'number',
    default: 3000,
    description: '服务器端口'
  })
  .command('start', '启动服务器')
  .command('stop', '停止服务器')
  .parse();

console.log('命令行参数:', argv);</pre
              >
            </div>
          </div>

          <div class="example-card">
            <h3>子命令处理</h3>
            <div class="code-block">
              <pre>
import yargs from 'yargs';

yargs(process.argv.slice(2))
  .command({
    command: 'add &lt;name&gt;',
    describe: '添加新项目',
    builder: (yargs) => {
      return yargs.option('force', {
        alias: 'f',
        type: 'boolean',
        description: '强制覆盖已存在项目'
      });
    },
    handler: (argv) => {
      console.log(`添加项目: ${argv.name}`);
      if (argv.force) {
        console.log('强制模式已启用');
      }
    }
  })
  .command({
    command: 'remove  &lt;name&gt;',
    describe: '移除项目',
    handler: (argv) => {
      console.log(`移除项目: ${argv.name}`);
    }
  })
  .parse();</pre
              >
            </div>
          </div>

          <div class="example-card">
            <h3>自定义帮助信息</h3>
            <div class="code-block">
              <pre>
import yargs from 'yargs';

yargs(process.argv.slice(2))
  .scriptName('my-cli')
  .usage('$0 &lt;command&gt; [options]')
  .command('build', '构建项目', (yargs) => {
    return yargs.option('env', {
      alias: 'e',
      choices: ['dev', 'prod', 'test'],
      default: 'dev',
      description: '环境配置'
    });
  })
  .example('$0 build --env prod', '构建生产环境')
  .epilogue('更多信息请访问 https://example.com')
  .help()
  .alias('h', 'help')
  .parse();</pre
              >
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>命令行工具开发文档 © 2023 | 提升 CLI 开发体验</p>
      <div class="footer-links">
        <a href="https://github.com/enquirer/enquirer" target="_blank">Enquirer GitHub</a>
        <a href="https://github.com/yargs/yargs" target="_blank">Yargs GitHub</a>
        <a href="https://cli.vuejs.org/" target="_blank">Vue CLI</a>
      </div>
      <p class="version">Enquirer v2.3.6 | Yargs v17.7.2</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 标签页
const tabs = ref([
  { id: 'overview', label: '概述' },
  { id: 'enquirer', label: 'Enquirer API' },
  { id: 'yargs', label: 'Yargs API' },
  { id: 'examples', label: '使用示例' },
])
const activeTab = ref('overview')

const exampleTabs = ref([
  { id: 'enquirer', label: 'Enquirer 示例' },
  { id: 'yargs', label: 'Yargs 示例' },
])
const activeExampleTab = ref('enquirer')

// Enquirer 提示类型
const enquirerPrompts = ref([
  {
    name: '文本输入',
    class: 'Input',
    description: '基本的文本输入提示，用于获取用户输入的文本信息',
    example: `new Input({
  name: 'username',
  message: '请输入用户名:'
})`,
  },
  {
    name: '密码输入',
    class: 'Password',
    description: '隐藏用户输入的密码字段，保护敏感信息',
    example: `new Password({
  name: 'password',
  message: '请输入密码:'
})`,
  },
  {
    name: '单选列表',
    class: 'Select',
    description: '从选项列表中选择一个值，支持键盘导航',
    example: `new Select({
  name: 'framework',
  message: '选择框架:',
  choices: ['React', 'Vue', 'Angular', 'Svelte']
})`,
  },
  {
    name: '多选列表',
    class: 'MultiSelect',
    description: '从选项列表中选择多个值，支持全选/取消全选',
    example: `new MultiSelect({
  name: 'tools',
  message: '选择工具:',
  choices: ['ESLint', 'Prettier', 'TypeScript', 'Jest']
})`,
  },
  {
    name: '表单输入',
    class: 'Form',
    description: '多个字段的表单输入，一次获取多个相关信息',
    example: `new Form({
  name: 'user',
  message: '用户信息:',
  choices: [
    { name: 'name', message: '姓名' },
    { name: 'email', message: '邮箱' }
  ]
})`,
  },
  {
    name: '自动完成',
    class: 'AutoComplete',
    description: '带自动完成功能的输入框，支持搜索过滤',
    example: `new AutoComplete({
  name: 'language',
  message: '选择编程语言:',
  choices: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go']
})`,
  },
])

// Enquirer API 方法
const enquirerMethods = ref([
  {
    name: 'prompt.run()',
    params: '',
    description: '执行提示并返回用户的响应',
    returns: 'Promise<any>',
  },
  {
    name: 'prompt.cancel()',
    params: '',
    description: '取消提示并抛出错误',
    returns: 'void',
  },
  {
    name: 'prompt.on(event, callback)',
    params: 'event: string, callback: Function',
    description: '注册事件监听器（submit, cancel, keypress 等）',
    returns: 'Prompt',
  },
  {
    name: 'prompt.keypress(key, event)',
    params: 'key: string, event: Object',
    description: '处理按键事件，可用于自定义键盘交互',
    returns: 'Promise<boolean>',
  },
  {
    name: 'prompt.render()',
    params: '',
    description: '渲染提示界面，返回渲染后的字符串',
    returns: 'string',
  },
  {
    name: 'prompt.validate(value)',
    params: 'value: any',
    description: '验证用户输入，返回 true 或错误消息',
    returns: 'boolean | string | Promise<boolean | string>',
  },
])

// Yargs 配置方法
const yargsConfigMethods = ref([
  {
    name: 'option(key, config)',
    params: 'key: string, config: Object',
    description: '定义命令行选项及其配置',
    example: `.option('port', {
  alias: 'p',
  type: 'number',
  default: 3000,
  description: '服务器端口'
})`,
  },
  {
    name: 'options(options)',
    params: 'options: Object',
    description: '批量定义多个命令行选项',
    example: `.options({
  port: { alias: 'p', type: 'number' },
  verbose: { alias: 'v', type: 'boolean' }
})`,
  },
  {
    name: 'command(cmd, desc, builder, handler)',
    params: 'cmd: string, desc: string, builder: Function, handler: Function',
    description: '定义命令及其处理逻辑',
    example: `.command('add <name>', '添加项目', (yargs) => {
  return yargs.option('force', { type: 'boolean' });
}, (argv) => {
  console.log('添加项目:', argv.name);
})`,
  },
  {
    name: 'demandCommand(min, [max], [msg])',
    params: 'min: number, max?: number, msg?: string',
    description: '要求提供指定数量的命令',
    example: `.demandCommand(1, '至少需要一个命令')`,
  },
  {
    name: 'usage(message)',
    params: 'message: string',
    description: '设置使用说明信息',
    example: `.usage('$0 <command> [options]')`,
  },
  {
    name: 'help([key], [description])',
    params: 'key?: string, description?: string',
    description: '启用帮助信息并设置别名',
    example: `.help('h', '显示帮助信息')`,
  },
])

// Yargs 命令方法
const yargsCommandMethods = ref([
  {
    name: 'alias(key, alias)',
    params: 'key: string, alias: string | string[]',
    description: '为选项设置别名',
    example: `.alias('verbose', 'v')`,
  },
  {
    name: 'default(key, value)',
    params: 'key: string, value: any',
    description: '设置选项的默认值',
    example: `.default('port', 3000)`,
  },
  {
    name: 'describe(key, description)',
    params: 'key: string, description: string',
    description: '设置选项的描述信息',
    example: `.describe('port', '服务器端口号')`,
  },
  {
    name: 'choices(key, values)',
    params: 'key: string, values: any[]',
    description: '限制选项的可选值',
    example: `.choices('env', ['dev', 'test', 'prod'])`,
  },
  {
    name: 'coerce(key, fn)',
    params: 'key: string, fn: Function',
    description: '对选项值进行转换处理',
    example: `.coerce('file', (arg) => {
  return fs.readFileSync(arg, 'utf8');
})`,
  },
  {
    name: 'check(fn)',
    params: 'fn: Function',
    description: '验证解析后的参数对象',
    example: `.check((argv) => {
  if (argv.age < 18) throw new Error('年龄必须大于18岁');
  return true;
})`,
  },
])
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@enquirer-color: #f72585;
@yargs-color: #7209b7;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@text-color: #333;
@text-light: #666;
@text-lighter: #999;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;

.cli-tools-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7ff;
  min-height: 100vh;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .logo-grid {
    display: flex;
    gap: 40px;
    justify-content: center;
  }

  .logo-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .logo-inner {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: bold;
    }

    .logo-label {
      font-weight: bold;
      font-size: 1.2rem;
    }
  }

  .enquirer-logo {
    .logo-inner {
      background: @enquirer-color;
      color: white;
      box-shadow: 0 4px 15px fade(@enquirer-color, 40%);
    }
  }

  .yargs-logo {
    .logo-inner {
      background: @yargs-color;
      color: white;
      box-shadow: 0 4px 15px fade(@yargs-color, 40%);
    }
  }

  h1 {
    margin: 10px 0 0;
    font-size: 2.5rem;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.2rem;
    margin-top: 15px;
    opacity: 0.9;
    font-weight: 300;
  }
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;

  .tab-btn {
    padding: 12px 25px;
    background: @card-bg;
    border: none;
    border-radius: 30px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      background: darken(@card-bg, 3%);
    }

    &.active {
      background: @primary-color;
      color: white;
      box-shadow: 0 4px 12px fade(@primary-color, 40%);
    }
  }
}

.section {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
}

.overview-section {
  .intro-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .intro-card {
    border-radius: 10px;
    padding: 25px;

    h2 {
      margin-top: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }

  .enquirer-intro {
    background: fade(@enquirer-color, 5%);
    border-left: 4px solid @enquirer-color;
  }

  .yargs-intro {
    background: fade(@yargs-color, 5%);
    border-left: 4px solid @yargs-color;
  }

  .features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-top: 20px;

    .feature {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 8px;
      font-size: 0.95rem;
    }
  }
}

.comparison-table {
  margin: 40px 0;

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: @secondary-color;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 15px;
      text-align: center;
      border-bottom: 1px solid #f0f0f0;
    }

    th {
      background: fade(@primary-color, 10%);
      color: @primary-color;
      font-weight: 600;
    }

    tr:last-child td {
      border-bottom: none;
    }

    .check {
      color: @success-color;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .cross {
      color: @danger-color;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
}

.integration {
  margin-top: 40px;

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: @secondary-color;
  }
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 20px 0;

  pre {
    margin: 0;
    white-space: pre-wrap;
  }
}

.api-section {
  .section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    color: @secondary-color;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
    margin-top: 0;
  }
}

.prompt-grid,
.methods-grid,
.config-grid,
.commands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-top: 25px;
}

.prompt-card,
.method-card,
.config-card,
.command-card {
  background: #f9f9ff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-3px);
  }
}

.prompt-card {
  border-left: 4px solid @enquirer-color;
}

.method-card {
  border-left: 4px solid @accent-color;
}

.config-card,
.command-card {
  border-left: 4px solid @yargs-color;
}

.prompt-header,
.method-header,
.config-header,
.command-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.prompt-name,
.method-name,
.config-name,
.command-name {
  font-weight: bold;
  font-size: 1.1rem;
  color: @primary-color;
}

.prompt-class {
  background: fade(@enquirer-color, 15%);
  color: darken(@enquirer-color, 15%);
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.method-params,
.config-params,
.command-params {
  color: @text-light;
  font-size: 0.9rem;
  font-family: 'Fira Code', monospace;
}

.prompt-desc,
.method-desc,
.config-desc,
.command-desc {
  margin-bottom: 15px;
  color: @text-light;
}

.method-returns {
  font-size: 0.9rem;
  color: @text-light;
  font-style: italic;
}

.prompt-example,
.config-example,
.command-example {
  background: #2d3748;
  color: #e2e8f0;
  border-radius: 6px;
  padding: 12px;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  margin-top: 10px;

  pre {
    margin: 0;
    white-space: pre-wrap;
  }
}

.examples-section {
  .example-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;

    .example-tab-btn {
      padding: 10px 20px;
      background: @card-bg;
      border: none;
      border-radius: 20px;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: darken(@card-bg, 3%);
      }

      &.active {
        background: @primary-color;
        color: white;
      }
    }
  }

  .example-content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    gap: 25px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .example-card {
    background: #f9f9ff;
    border-radius: 10px;
    padding: 20px;
    border: 1px solid #f0f0f0;

    h3 {
      margin-top: 0;
      color: @primary-color;
      padding-bottom: 15px;
      border-bottom: 1px solid #f0f0f0;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 60px;
  padding: 30px 0;
  color: @text-lighter;
  font-size: 0.95rem;
  border-top: 1px solid @border-color;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin: 15px 0;

    a {
      color: @primary-color;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .version {
    margin-top: 8px;
    font-size: 0.85rem;
  }
}

// 图标类
.icon-prompt::before {
  content: '❯';
}
.icon-command::before {
  content: '$';
}
.icon-code::before {
  content: '</>';
}
</style>
