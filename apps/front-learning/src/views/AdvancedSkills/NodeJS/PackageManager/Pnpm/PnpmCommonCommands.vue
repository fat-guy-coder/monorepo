<template>
  <div class="pnpm-reference">
    <header class="header">
      <div class="logo-container">
        <div class="logo">
          <span class="logo-p">p</span>
          <span class="logo-npm">npm</span>
        </div>
        <h1>PNPM 命令参考手册</h1>
      </div>
      <p class="subtitle">高效、快速的 Node.js 包管理工具</p>
    </header>

    <div class="search-section">
      <div class="search-box">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="搜索 PNPM 命令..."
          class="search-input"
        />
        <button class="search-btn">
          <i class="icon-search"></i>
        </button>
      </div>
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-value">{{ categories.length }}</span>
          <span class="stat-label">个分类</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ totalCommands }}</span>
          <span class="stat-label">条命令</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">4.5</span>
          <span class="stat-label">倍速提升</span>
        </div>
      </div>
    </div>

    <div class="categories">
      <div v-for="category in filteredCategories" :key="category.name" class="category-section">
        <h2 class="category-title">
          <i :class="category.icon" class="category-icon"></i>
          {{ category.name }}
          <span class="command-count">({{ category.commands.length }} 条命令)</span>
        </h2>

        <div class="command-list">
          <div
            v-for="(cmd, index) in category.commands"
            :key="cmd.name"
            class="command-card"
            :class="{ featured: index < 3 }"
          >
            <div class="command-header">
              <div class="command-name">{{ cmd.name }}</div>
              <div class="command-desc">{{ cmd.description }}</div>
            </div>

            <div class="command-usage">
              <pre class="usage-code">$ pnpm {{ cmd.usage }}</pre>
            </div>

            <div v-if="cmd.parameters && cmd.parameters.length" class="parameters-section">
              <div class="section-title">参数选项</div>
              <div class="parameter-list">
                <div v-for="param in cmd.parameters" :key="param.name" class="parameter-item">
                  <div class="param-name">
                    <code>{{ param.name }}</code>
                  </div>
                  <div class="param-desc">{{ param.description }}</div>
                </div>
              </div>
            </div>

            <div v-if="cmd.examples && cmd.examples.length" class="examples-section">
              <div class="section-title">使用示例</div>
              <div class="example-list">
                <div v-for="(example, exIndex) in cmd.examples" :key="exIndex" class="example-item">
                  <pre class="example-code">$ {{ example.code }}</pre>
                  <div class="example-desc">{{ example.description }}</div>
                </div>
              </div>
            </div>

            <div class="command-footer">
              <div class="command-category"><i class="icon-category"></i> {{ category.name }}</div>
              <div v-if="cmd.aliases" class="command-aliases">
                <i class="icon-alias"></i> 别名:
                <span v-for="alias in cmd.aliases" :key="alias" class="alias-tag">{{ alias }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>PNPM 命令参考手册  | 前端开发与工程化工具</p>
      <p class="version-info">PNPM 版本: 8.x | 最后更新: {{ currentDate }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 定义类型
interface Parameter {
  name: string
  description: string
}

interface Example {
  code: string
  description: string
}

interface Command {
  name: string
  description: string
  usage: string
  aliases?: string[]
  parameters?: Parameter[]
  examples?: Example[]
}

interface Category {
  name: string
  icon: string
  commands: Command[]
}

const searchTerm = ref('')

// 获取当前日期
const currentDate = new Date().toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

// PNPM 命令数据
const categories = ref<Category[]>([
  {
    name: '安装依赖',
    icon: 'icon-install',
    commands: [
      {
        name: '安装',
        description: '安装项目所有依赖',
        usage: 'install',
        aliases: ['i'],
        parameters: [
          { name: '--prod, -P', description: '仅安装 dependencies 依赖' },
          { name: '--dev, -D', description: '仅安装 devDependencies 依赖' },
          { name: '--no-optional', description: '不安装 optionalDependencies 依赖' },
          {
            name: '--frozen-lockfile',
            description: '不生成 lockfile，如果 lockfile 需要更新则安装失败',
          },
        ],
        examples: [
          { code: 'pnpm install', description: '安装所有依赖' },
          { code: 'pnpm i react react-dom', description: '安装指定包' },
          { code: 'pnpm i -D typescript @types/node', description: '安装开发依赖' },
        ],
      },
      {
        name: '添加依赖',
        description: '添加包到项目依赖',
        usage: 'add <package>',
        aliases: ['install'],
        parameters: [
          { name: '--save-dev, -D', description: '作为开发依赖添加' },
          { name: '--save-optional, -O', description: '作为可选依赖添加' },
          { name: '--global, -g', description: '全局安装包' },
          { name: '--exact, -E', description: '安装精确版本' },
        ],
        examples: [
          { code: 'pnpm add lodash', description: '添加生产依赖' },
          { code: 'pnpm add -D typescript', description: '添加开发依赖' },
          { code: 'pnpm add react@18.2.0', description: '安装指定版本' },
        ],
      },
      {
        name: '更新依赖',
        description: '更新包到最新版本',
        usage: 'update',
        aliases: ['up', 'upgrade'],
        parameters: [
          { name: '--latest, -L', description: '忽略版本范围，更新到最新版本' },
          { name: '--interactive, -i', description: '交互式更新' },
          { name: '--recursive', description: '在子目录中运行更新命令' },
        ],
        examples: [
          { code: 'pnpm update', description: '更新所有依赖' },
          { code: 'pnpm up react react-dom', description: '更新指定包' },
          { code: 'pnpm up --latest', description: '更新到最新版本（忽略 package.json 约束）' },
        ],
      },
      {
        name: '删除依赖',
        description: '从项目中移除依赖包',
        usage: 'remove <package>',
        aliases: ['rm', 'uninstall', 'un'],
        parameters: [
          { name: '--global, -g', description: '移除全局安装的包' },
          { name: '--recursive', description: '在子目录中运行移除命令' },
        ],
        examples: [
          { code: 'pnpm remove lodash', description: '移除依赖包' },
          { code: 'pnpm rm -g typescript', description: '移除全局包' },
        ],
      },
    ],
  },
  {
    name: '运行脚本',
    icon: 'icon-run',
    commands: [
      {
        name: '运行脚本',
        description: '运行在 package.json 中定义的脚本',
        usage: 'run <script>',
        aliases: ['run-script'],
        parameters: [
          { name: '--recursive, -r', description: '在所有子包中运行脚本' },
          { name: '--parallel', description: '完全并行运行脚本' },
          { name: '--stream', description: '并行运行脚本时流式输出' },
        ],
        examples: [
          { code: 'pnpm run dev', description: '运行开发脚本' },
          { code: 'pnpm run build', description: '运行构建脚本' },
          { code: 'pnpm run -r lint', description: '在所有子包中运行 lint 脚本' },
        ],
      },
      {
        name: '执行命令',
        description: '执行 Node.js 模块或安装的二进制文件',
        usage: 'exec <command>',
        aliases: ['x'],
        parameters: [{ name: '--recursive, -r', description: '在所有子包中执行命令' }],
        examples: [
          { code: 'pnpm exec vite', description: '执行 Vite 命令' },
          { code: 'pnpm x eslint --fix', description: '执行 ESLint 修复' },
        ],
      },
      {
        name: '开始项目',
        description: '运行 "start" 脚本（如果存在）',
        usage: 'start',
        examples: [{ code: 'pnpm start', description: '启动项目' }],
      },
      {
        name: '测试项目',
        description: '运行 "test" 脚本（如果存在）',
        usage: 'test',
        aliases: ['run test', 't'],
        examples: [
          { code: 'pnpm test', description: '运行测试' },
          { code: 'pnpm test --watch', description: '在监视模式下运行测试' },
        ],
      },
    ],
  },
  {
    name: '工作空间',
    icon: 'icon-workspace',
    commands: [
      {
        name: '递归执行',
        description: '在所有工作空间包中执行命令',
        usage: '--recursive <command>',
        aliases: ['-r'],
        parameters: [
          { name: '--parallel', description: '完全并行执行命令' },
          { name: '--stream', description: '并行执行时流式输出' },
          { name: '--filter <pattern>', description: '过滤选择特定包' },
        ],
        examples: [
          { code: 'pnpm -r install', description: '在所有工作空间中安装依赖' },
          { code: 'pnpm -r --filter=@project/ui build', description: '在特定包中运行构建' },
        ],
      },
      {
        name: '创建新包',
        description: '在工作空间中创建一个新包',
        usage: 'init',
        parameters: [{ name: '--workspace', description: '在工作空间中创建包' }],
        examples: [
          { code: 'pnpm init', description: '创建一个新包' },
          { code: 'cd packages && pnpm init', description: '在子目录中创建包' },
        ],
      },
      {
        name: '运行工作空间脚本',
        description: '在所有工作空间中运行脚本',
        usage: 'run --recursive <script>',
        aliases: ['-r run'],
        examples: [
          { code: 'pnpm -r run lint', description: '在所有工作空间中运行 lint' },
          { code: 'pnpm -r --parallel run build', description: '并行构建所有工作空间' },
        ],
      },
    ],
  },
  {
    name: '包管理',
    icon: 'icon-package',
    commands: [
      {
        name: '查看依赖树',
        description: '显示已安装的依赖树',
        usage: 'list',
        aliases: ['ls', 'll', 'la'],
        parameters: [
          { name: '--depth <number>', description: '限制依赖树的深度' },
          { name: '--json', description: '以 JSON 格式输出' },
          { name: '--long', description: '显示完整信息' },
        ],
        examples: [
          { code: 'pnpm list', description: '显示所有依赖' },
          { code: 'pnpm list --depth=1', description: '显示一级依赖' },
          { code: 'pnpm list react', description: '查看特定包信息' },
        ],
      },
      {
        name: '查看过时包',
        description: '检查过时的依赖包',
        usage: 'outdated',
        parameters: [
          { name: '--long', description: '显示完整信息' },
          { name: '--global', description: '检查全局包' },
        ],
        examples: [{ code: 'pnpm outdated', description: '检查过时依赖' }],
      },
      {
        name: '查看包信息',
        description: '显示包的详细信息',
        usage: 'info <package>',
        aliases: ['show'],
        parameters: [{ name: '--json', description: '以 JSON 格式输出' }],
        examples: [
          { code: 'pnpm info react', description: '查看 React 包信息' },
          { code: 'pnpm info vue versions', description: '查看 Vue 所有版本' },
        ],
      },
      {
        name: '重建包',
        description: '重新构建包及其依赖',
        usage: 'rebuild',
        aliases: ['rb'],
        parameters: [{ name: '--recursive, -r', description: '在所有工作空间中重建' }],
        examples: [
          { code: 'pnpm rebuild', description: '重建当前包' },
          { code: 'pnpm rebuild sharp', description: '重建特定包' },
        ],
      },
    ],
  },
  {
    name: '缓存管理',
    icon: 'icon-cache',
    commands: [
      {
        name: '清理缓存',
        description: '清理 PNPM 的存储缓存',
        usage: 'store prune',
        parameters: [{ name: '--verify-store', description: '验证存储完整性' }],
        examples: [{ code: 'pnpm store prune', description: '清理未使用的包' }],
      },
      {
        name: '查看缓存路径',
        description: '打印存储目录的路径',
        usage: 'store path',
        examples: [{ code: 'pnpm store path', description: '显示缓存目录路径' }],
      },
      {
        name: '检查缓存状态',
        description: '检查存储中包的状态',
        usage: 'store status',
        examples: [{ code: 'pnpm store status', description: '检查缓存状态' }],
      },
    ],
  },
  {
    name: '实用工具',
    icon: 'icon-util',
    commands: [
      {
        name: '创建项目',
        description: '使用模板创建新项目',
        usage: 'create <template> <project>',
        aliases: ['create-vite', 'create-next-app'],
        parameters: [{ name: '--template', description: '指定模板类型' }],
        examples: [
          { code: 'pnpm create vite my-app', description: '创建 Vite 项目' },
          { code: 'pnpm create next-app', description: '创建 Next.js 项目' },
        ],
      },
      {
        name: '查看帮助',
        description: '显示 PNPM 帮助信息',
        usage: 'help',
        aliases: ['-h', '--help'],
        examples: [
          { code: 'pnpm help', description: '显示帮助概览' },
          { code: 'pnpm help install', description: '显示 install 命令帮助' },
        ],
      },
      {
        name: '查看版本',
        description: '显示 PNPM 版本信息',
        usage: '--version',
        aliases: ['-v', 'version'],
        examples: [{ code: 'pnpm -v', description: '显示当前版本' }],
      },
    ],
  },
])

// 计算属性
const filteredCategories = computed(() => {
  if (!searchTerm.value) return categories.value

  const term = searchTerm.value.toLowerCase()
  const result: Category[] = []

  categories.value.forEach((category) => {
    const filteredCommands = category.commands.filter(
      (cmd) =>
        cmd.name.toLowerCase().includes(term) ||
        cmd.description.toLowerCase().includes(term) ||
        (cmd.aliases && cmd.aliases.some((alias) => alias.toLowerCase().includes(term))) ||
        (cmd.usage && cmd.usage.toLowerCase().includes(term)),
    )

    if (filteredCommands.length > 0) {
      result.push({
        ...category,
        commands: filteredCommands,
      })
    }
  })

  return result
})

const totalCommands = computed(() => {
  return categories.value.reduce((total, category) => total + category.commands.length, 0)
})
</script>

<style lang="less" scoped>
@primary-color: #f28c25;
@secondary-color: #7c4dff;
@accent-color: #00bcd4;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@text-color: #333;
@text-light: #666;
@text-lighter: #999;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;

.pnpm-reference {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7ff;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 15px;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: @primary-color;
    box-shadow: 0 4px 12px rgba(242, 140, 37, 0.3);

    .logo-p {
      font-size: 3rem;
      font-weight: bold;
      color: white;
      line-height: 1;
    }

    .logo-npm {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      margin-top: 10px;
    }
  }

  h1 {
    color: @secondary-color;
    margin: 0;
    font-size: 2.5rem;
  }

  .subtitle {
    color: @text-light;
    font-size: 1.2rem;
    margin-top: 10px;
  }
}

.search-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.search-box {
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;

  .search-input {
    flex: 1;
    padding: 14px 25px;
    border: 2px solid @primary-color;
    border-radius: 30px 0 0 30px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:focus {
      border-color: darken(@primary-color, 10%);
    }
  }

  .search-btn {
    padding: 0 30px;
    background: @primary-color;
    color: white;
    border: none;
    border-radius: 0 30px 30px 0;
    cursor: pointer;
    transition: background 0.3s;
    font-size: 18px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      background: darken(@primary-color, 10%);
    }
  }
}

.stats-bar {
  display: flex;
  justify-content: center;
  gap: 40px;

  .stat-item {
    text-align: center;
    padding: 12px 25px;
    background: @card-bg;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    min-width: 140px;
    border-top: 3px solid @accent-color;

    .stat-value {
      display: block;
      font-size: 1.8rem;
      font-weight: bold;
      color: @primary-color;
      margin-bottom: 5px;
    }

    .stat-label {
      color: @text-light;
      font-size: 1rem;
    }
  }
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.category-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.category-title {
  background: linear-gradient(135deg, @secondary-color, @accent-color);
  color: white;
  margin: 0;
  padding: 20px 30px;
  font-size: 1.8rem;
  display: flex;
  align-items: center;

  .category-icon {
    margin-right: 15px;
    font-size: 1.5rem;
  }

  .command-count {
    margin-left: 15px;
    font-size: 1.2rem;
    opacity: 0.8;
    font-weight: normal;
  }
}

.command-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 25px;
  padding: 30px;
}

.command-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 25px;
  border-left: 4px solid @primary-color;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }

  &.featured::before {
    content: '常用';
    position: absolute;
    top: 15px;
    right: -30px;
    background: @accent-color;
    color: white;
    padding: 3px 35px;
    font-size: 0.9rem;
    transform: rotate(45deg);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
}

.command-header {
  margin-bottom: 20px;

  .command-name {
    font-size: 1.6rem;
    font-weight: bold;
    color: @secondary-color;
    margin-bottom: 8px;
  }

  .command-desc {
    color: @text-light;
    line-height: 1.5;
  }
}

.command-usage {
  background: #2d3748;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;

  .usage-code {
    margin: 0;
  }
}

.section-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: @secondary-color;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0f0f0;
}

.parameter-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.parameter-item {
  background: #f9f9ff;
  border-radius: 8px;
  padding: 12px;
  border-left: 3px solid @accent-color;

  .param-name {
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    margin-bottom: 5px;

    code {
      background: rgba(122, 77, 255, 0.1);
      color: @secondary-color;
      padding: 2px 6px;
      border-radius: 4px;
    }
  }

  .param-desc {
    color: @text-light;
    font-size: 0.95rem;
    line-height: 1.4;
  }
}

.example-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.example-item {
  background: #f9f9ff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e8e8ff;

  .example-code {
    background: #2d3748;
    color: #e2e8f0;
    margin: 0;
    padding: 12px 15px;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    overflow-x: auto;
  }

  .example-desc {
    padding: 12px 15px;
    color: @text-light;
    font-size: 0.95rem;
  }
}

.command-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
  color: @text-light;
  font-size: 0.9rem;

  .command-category,
  .command-aliases {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .alias-tag {
    background: rgba(122, 77, 255, 0.1);
    color: @secondary-color;
    padding: 2px 8px;
    border-radius: 4px;
    margin-left: 5px;
    font-family: 'Fira Code', monospace;
  }
}

.footer {
  text-align: center;
  margin-top: 60px;
  padding: 25px 0;
  color: @text-lighter;
  font-size: 0.95rem;
  border-top: 1px solid @border-color;

  .version-info {
    margin-top: 8px;
    font-size: 0.85rem;
  }
}

// 图标字体类
.icon-install::before {
  content: '📦';
}
.icon-run::before {
  content: '🚀';
}
.icon-workspace::before {
  content: '🧩';
}
.icon-package::before {
  content: '📦';
}
.icon-cache::before {
  content: '🗃️';
}
.icon-util::before {
  content: '🛠️';
}
.icon-category::before {
  content: '🏷️';
}
.icon-alias::before {
  content: '🔤';
}
.icon-search::before {
  content: '🔍';
}

@media (max-width: 1100px) {
  .command-list {
    grid-template-columns: 1fr;
  }

  .stats-bar {
    flex-wrap: wrap;
    gap: 15px;

    .stat-item {
      min-width: 120px;
      flex: 1;
    }
  }
}

@media (max-width: 768px) {
  .header {
    .logo-container {
      flex-direction: column;
      gap: 10px;
    }

    h1 {
      font-size: 2rem;
    }
  }

  .parameter-list {
    grid-template-columns: 1fr;
  }

  .command-footer {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
