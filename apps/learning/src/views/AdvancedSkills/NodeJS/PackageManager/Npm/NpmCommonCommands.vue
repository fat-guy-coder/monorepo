<template>
  <div class="npm-commands-guide">
    <header class="guide-header">
      <div class="header-content">
        <div class="logo">
          <svg class="npm-icon" viewBox="0 0 780 250">
            <path fill="#CB3837"
              d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z" />
          </svg>
        </div>
        <div class="title-container">
          <h1>npm命令基本介绍</h1>
          <p class="subtitle">Node.js包管理工具核心命令基础介绍</p>
        </div>
        <div class="npm-version">
          <span>npm v{{ npmVersion }}</span>
        </div>
      </div>
      <div class="search-container">
        <input v-model="searchQuery" type="text" placeholder="搜索npm命令..." class="search-input">
        <div class="filter-tags">
          <button v-for="tag in tags" :key="tag" :class="['tag', { active: activeTag === tag }]"
            @click="toggleTag(tag)">
            {{ tag }}
          </button>
        </div>
      </div>
    </header>

    <div class="content-container">
      <aside class="categories-sidebar">
        <h2> 命令分类</h2>
        <ul class="category-list">
          <li v-for="category in categories" :key="category.id" :class="{ active: activeCategory === category.id }"
            @click="activeCategory = category.id">
            <span>{{ category.name }}</span>
            <span class="badge">{{ category.count }}</span>
          </li>
        </ul>
      </aside>

      <main class="commands-container">
        <section class="category-section">
          <div class="category-header">
            <h2 :class="currentCategoryClass">
              {{ activeCategoryData.name }}
              <span class="command-count">{{ activeCategoryData.count }} 个命令</span>
            </h2>
            <p class="category-desc">{{ activeCategoryData.description }}</p>
          </div>

          <div class="commands-grid">
            <div v-for="command in filteredCommands" :key="command.name"
              :class="['command-card', { favorite: command.favorite }]">
              <div class="command-header">
                <h3 class="command-name">
                  <span class="prefix">$</span> {{ command.name }}
                  <span v-if="command.favorite" class="star-icon">★</span>
                </h3>
                <div class="usage-badge">
                  {{ command.usageFrequency }}
                </div>
              </div>

              <div class="command-description">
                {{ command.description }}
              </div>

              <div v-if="command.usage" class="command-usage">
                <pre><code>{{ command.usage }}</code></pre>
              </div>

              <div v-if="command.example" class="command-example">
                <div class="example-title">使用示例:</div>
                <pre><code>{{ command.example }}</code></pre>
              </div>

              <div class="command-tags">
                <span v-for="tag in command.tags" :key="tag" class="tag">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="guide-footer">
      <div class="footer-content">
        <div class="tip-box">
          <div class="tip-icon">💡</div>
          <div class="tip-content">
            <h3>npm使用小贴士</h3>
            <p>使用 <code>npm init -y</code> 快速初始化项目，使用 <code>npx</code> 直接运行本地安装的命令行工具，
              使用 <code>npm cache clean --force</code> 清理缓存解决安装问题</p>
          </div>
        </div>

        <div class="footer-links">
          <a href="https://docs.npmjs.com/" target="_blank">官方文档</a>
          <a href="https://npmtrends.com/" target="_blank">npm包趋势</a>
          <a href="https://www.npmjs.com/" target="_blank">npm仓库</a>
        </div>

        <div class="copyright">
          &copy; 2023 npm命令指南 | 基于 npm v{{ npmVersion }}
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue';





const npmVersion = ref('9.6.7');
const activeCategory = ref('install');
const searchQuery = ref('');
const activeTag = ref('');

// 命令分类数据
const categories = ref([
  {
    id: 'install', name: '安装依赖', icon: 'install', count: 8,
    description: '安装、更新和移除项目依赖包的命令'
  },
  {
    id: 'run', name: '运行脚本', icon: 'run', count: 5,
    description: '执行package.json中定义的脚本命令'
  },
  {
    id: 'config', name: '配置管理', icon: 'config', count: 6,
    description: '管理npm的配置设置和全局环境变量'
  },
  {
    id: 'package', name: '包管理', icon: 'package', count: 7,
    description: '创建、管理和发布npm包的相关命令'
  },
  {
    id: 'publish', name: '发布部署', icon: 'publish', count: 4,
    description: '将包发布到npm仓库或部署项目的命令'
  },
  {
    id: 'info', name: '信息查询', icon: 'info', count: 5,
    description: '查询包信息、版本和依赖关系的命令'
  }
]);

// 标签列表
const tags = ref(['常用', '核心', '配置', '调试', '安全']);

// npm命令数据
const commands = ref([
  // 安装依赖类
  {
    name: 'npm install',
    description: '安装项目所有依赖（根据package.json）',
    usage: 'npm install',
    example: 'npm install',
    category: 'install',
    usageFrequency: '极高',
    favorite: true,
    tags: ['常用', '核心']
  },
  {
    name: 'npm install <package>',
    description: '安装特定包并保存到dependencies',
    usage: 'npm install <package_name>',
    example: 'npm install lodash',
    category: 'install',
    usageFrequency: '极高',
    favorite: true,
    tags: ['常用', '核心']
  },
  {
    name: 'npm install -D <package>',
    description: '安装开发依赖（保存到devDependencies）',
    usage: 'npm install --save-dev <package_name>',
    example: 'npm install -D typescript',
    category: 'install',
    usageFrequency: '高',
    favorite: true,
    tags: ['常用', '核心']
  },
  {
    name: 'npm install -g <package>',
    description: '全局安装包',
    usage: 'npm install --global <package_name>',
    example: 'npm install -g @vue/cli',
    category: 'install',
    usageFrequency: '高',
    tags: ['常用']
  },
  {
    name: 'npm update',
    description: '更新所有项目依赖到最新版本',
    usage: 'npm update',
    example: 'npm update',
    category: 'install',
    usageFrequency: '中',
    tags: []
  },
  {
    name: 'npm uninstall <package>',
    description: '移除项目依赖',
    usage: 'npm uninstall <package_name>',
    example: 'npm uninstall lodash',
    category: 'install',
    usageFrequency: '高',
    tags: ['常用']
  },
  {
    name: 'npm ci',
    description: '使用package-lock.json精确安装依赖（适合CI环境）',
    usage: 'npm ci',
    example: 'npm ci',
    category: 'install',
    usageFrequency: '中',
    tags: ['核心']
  },
  {
    name: 'npm audit',
    description: '扫描项目依赖的安全漏洞',
    usage: 'npm audit',
    example: 'npm audit',
    category: 'install',
    usageFrequency: '中',
    tags: ['安全']
  },

  // 运行脚本类
  {
    name: 'npm run <script>',
    description: '运行package.json中定义的脚本',
    usage: 'npm run <script_name>',
    example: 'npm run build',
    category: 'run',
    usageFrequency: '极高',
    favorite: true,
    tags: ['常用', '核心']
  },
  {
    name: 'npm start',
    description: '运行预设的start脚本（通常是启动应用）',
    usage: 'npm start',
    example: 'npm start',
    category: 'run',
    usageFrequency: '高',
    favorite: true,
    tags: ['常用']
  },
  {
    name: 'npm test',
    description: '运行测试脚本',
    usage: 'npm test',
    example: 'npm test',
    category: 'run',
    usageFrequency: '高',
    tags: ['常用']
  },
  {
    name: 'npm restart',
    description: '依次运行stop、restart、start脚本',
    usage: 'npm restart',
    example: 'npm restart',
    category: 'run',
    usageFrequency: '低',
    tags: []
  },
  {
    name: 'npm exec <command>',
    description: '运行本地安装的命令行工具',
    usage: 'npm exec -- <command>',
    example: 'npm exec -- prettier --write .',
    category: 'run',
    usageFrequency: '中',
    tags: ['核心']
  },

  // 配置管理类
  {
    name: 'npm config list',
    description: '显示所有npm配置设置',
    usage: 'npm config list',
    example: 'npm config list',
    category: 'config',
    usageFrequency: '中',
    tags: ['配置', '调试']
  },
  {
    name: 'npm config set <key> <value>',
    description: '设置npm配置项',
    usage: 'npm config set <key> <value>',
    example: 'npm config set registry https://registry.npmmirror.com',
    category: 'config',
    usageFrequency: '中',
    tags: ['配置']
  },
  {
    name: 'npm config get <key>',
    description: '获取指定配置项的值',
    usage: 'npm config get <key>',
    example: 'npm config get registry',
    category: 'config',
    usageFrequency: '中',
    tags: ['配置', '调试']
  },
  {
    name: 'npm config delete <key>',
    description: '删除指定的配置项',
    usage: 'npm config delete <key>',
    example: 'npm config delete proxy',
    category: 'config',
    usageFrequency: '低',
    tags: ['配置']
  },
  {
    name: 'npm set <key> <value>',
    description: '设置环境变量（等同于npm config set）',
    usage: 'npm set <key>=<value>',
    example: 'npm set init-author-name "Your Name"',
    category: 'config',
    usageFrequency: '低',
    tags: ['配置']
  },
  {
    name: 'npm get <key>',
    description: '获取环境变量值（等同于npm config get）',
    usage: 'npm get <key>',
    example: 'npm get init-author-name',
    category: 'config',
    usageFrequency: '低',
    tags: ['配置', '调试']
  },

  // 包管理类
  {
    name: 'npm init',
    description: '创建新的package.json文件',
    usage: 'npm init',
    example: 'npm init',
    category: 'package',
    usageFrequency: '高',
    favorite: true,
    tags: ['常用', '核心']
  },
  {
    name: 'npm init -y',
    description: '快速创建默认package.json（跳过提问）',
    usage: 'npm init --yes',
    example: 'npm init -y',
    category: 'package',
    usageFrequency: '高',
    favorite: true,
    tags: ['常用']
  },
  {
    name: 'npm link',
    description: '将本地包链接到全局，用于本地包开发调试',
    usage: 'npm link',
    example: 'cd my-package && npm link\ncd ../my-app && npm link my-package',
    category: 'package',
    usageFrequency: '中',
    tags: ['调试']
  },
  {
    name: 'npm list',
    description: '列出已安装的依赖树',
    usage: 'npm list',
    example: 'npm list --depth=0',
    category: 'package',
    usageFrequency: '中',
    tags: []
  },
  {
    name: 'npm outdated',
    description: '检查过时的依赖包',
    usage: 'npm outdated',
    example: 'npm outdated',
    category: 'package',
    usageFrequency: '中',
    tags: []
  },
  {
    name: 'npm repo <package>',
    description: '在浏览器中打开包的代码仓库',
    usage: 'npm repo <package_name>',
    example: 'npm repo vue',
    category: 'package',
    usageFrequency: '低',
    tags: []
  },
  {
    name: 'npm docs <package>',
    description: '在浏览器中打开包的文档',
    usage: 'npm docs <package_name>',
    example: 'npm docs react',
    category: 'package',
    usageFrequency: '低',
    tags: []
  },

  // 发布部署类
  {
    name: 'npm publish',
    description: '发布包到npm仓库',
    usage: 'npm publish',
    example: 'npm publish --access public',
    category: 'publish',
    usageFrequency: '中',
    tags: []
  },
  {
    name: 'npm unpublish',
    description: '从npm仓库移除已发布的包',
    usage: 'npm unpublish <package_name>@<version>',
    example: 'npm unpublish my-package@1.0.0',
    category: 'publish',
    usageFrequency: '低',
    tags: []
  },
  {
    name: 'npm deprecate',
    description: '弃用包的特定版本',
    usage: 'npm deprecate <package>@<version> <message>',
    example: 'npm deprecate my-package@1.0.0 "This version is deprecated"',
    category: 'publish',
    usageFrequency: '低',
    tags: []
  },
  {
    name: 'npm pack',
    description: '创建包的.tgz压缩文件',
    usage: 'npm pack',
    example: 'npm pack',
    category: 'publish',
    usageFrequency: '低',
    tags: []
  },

  // 信息查询类
  {
    name: 'npm view <package>',
    description: '查看包的元数据',
    usage: 'npm view <package_name>',
    example: 'npm view lodash versions',
    category: 'info',
    usageFrequency: '中',
    tags: []
  },
  {
    name: 'npm search <keyword>',
    description: '在npm仓库中搜索包',
    usage: 'npm search <keyword>',
    example: 'npm search vue component',
    category: 'info',
    usageFrequency: '中',
    tags: []
  },
  {
    name: 'npm root',
    description: '显示npm的包安装目录',
    usage: 'npm root',
    example: 'npm root -g',
    category: 'info',
    usageFrequency: '低',
    tags: ['调试']
  },
  {
    name: 'npm bin',
    description: '显示npm的可执行文件目录',
    usage: 'npm bin',
    example: 'npm bin -g',
    category: 'info',
    usageFrequency: '低',
    tags: ['调试']
  },
  {
    name: 'npm version',
    description: '更新包版本并创建版本提交',
    usage: 'npm version <update_type>',
    example: 'npm version patch',
    category: 'info',
    usageFrequency: '中',
    tags: []
  }
]);

// 计算当前激活的分类数据
const activeCategoryData = computed(() => {
  return categories.value.find(cat => cat.id === activeCategory.value) || categories.value[0];
});

// 计算当前分类的命令
const categoryCommands = computed(() => {
  return commands.value.filter(cmd => cmd.category === activeCategory.value);
});

// 计算当前分类的样式类
const currentCategoryClass = computed(() => {
  return `category-title ${activeCategory.value}`;
});

// 切换标签
const toggleTag = (tag: string) => {
  activeTag.value = activeTag.value === tag ? '' : tag;
};

// 过滤命令（根据搜索和标签）
const filteredCommands = computed(() => {
  let result = categoryCommands.value;

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(cmd =>
      cmd.name.toLowerCase().includes(query) ||
      cmd.description.toLowerCase().includes(query) ||
      (cmd.tags && cmd.tags.some(t => t.toLowerCase().includes(query)))
    );
  }

  // 标签过滤
  if (activeTag.value) {
    result = result.filter(cmd =>
      cmd.tags && cmd.tags.includes(activeTag.value)
    );
  }

  return result;
});

// 模拟获取npm版本
onMounted(() => {
  setTimeout(() => {
    npmVersion.value = '9.8.1';
  }, 500);
});
</script>

<style lang="less" scoped>
@base-color: #cb3837;
/* npm主色调 */
@dark-color: #9e2d2c;
@light-color: #f4f0f0;
@text-color: #333;
@light-text: #666;
@border-color: #e1e4e8;
@success-color: #28a745;
@warning-color: #ffc107;
@danger-color: #dc3545;
@info-color: #17a2b8;

.npm-commands-guide {
  max-width: 1400px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  color: @text-color;
  background-color: #fff;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  overflow: hidden;
}

.guide-header {
  background: linear-gradient(135deg, @base-color, @dark-color);
  color: white;
  padding: 2rem 2rem 1.5rem;
  position: relative;

  .header-content {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    .logo {
      margin-right: 1.5rem;
    }

    .npm-icon {
      width: 80px;
      height: 80px;
      fill: white;
    }

    .title-container {
      flex: 1;

      h1 {
        margin: 0;
        font-size: 2.5rem;
        font-weight: 700;
        letter-spacing: -0.5px;
      }

      .subtitle {
        margin: 0.5rem 0 0;
        font-size: 1.2rem;
        opacity: 0.9;
        font-weight: 300;
      }
    }

    .npm-version {
      background: rgba(0, 0, 0, 0.2);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
    }
  }

  .search-container {
    max-width: 800px;
    margin: 0 auto;

    .search-input {
      width: 100%;
      padding: 0.8rem 1.5rem;
      font-size: 1.1rem;
      border: none;
      border-radius: 50px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
      }
    }

    .filter-tags {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1rem;

      .tag {
        background: rgba(255, 255, 255, 0.15);
        color: white;
        border: none;
        padding: 0.35rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        &.active {
          background: white;
          color: @base-color;
          font-weight: 600;
        }
      }
    }
  }
}

.content-container {
  display: flex;
  min-height: 70vh;
}

.categories-sidebar {
  width: 260px;
  background: @light-color;
  padding: 1.5rem 0;
  border-right: 1px solid @border-color;

  h2 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    padding: 0 1.5rem 0.5rem;
    margin: 0 0 1rem;
    color: @light-text;
    border-bottom: 1px solid @border-color;
  }
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;

    .category-icon {
      font-size: 1.2rem;
      margin-right: 0.8rem;
      min-width: 24px;
      text-align: center;
    }

    .badge {
      margin-left: auto;
      background: rgba(@base-color, 0.1);
      color: @base-color;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.15rem 0.6rem;
      border-radius: 10px;
    }

    &:hover {
      background: rgba(@base-color, 0.05);
    }

    &.active {
      background: rgba(@base-color, 0.08);
      color: @base-color;
      font-weight: 500;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 4px;
        background: @base-color;
      }

      .badge {
        background: rgba(@base-color, 0.2);
      }
    }
  }
}

.commands-container {
  flex: 1;
  padding: 2rem;
  background: white;
}

.category-section {
  .category-header {
    margin-bottom: 2rem;

    .category-title {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin: 0 0 0.5rem;
      font-size: 1.8rem;
      font-weight: 600;

      .category-icon {
        font-size: 1.5rem;
      }

      .command-count {
        font-size: 1rem;
        background: rgba(@base-color, 0.1);
        color: @base-color;
        padding: 0.25rem 0.8rem;
        border-radius: 20px;
        margin-left: 0.8rem;
        font-weight: 500;
      }
    }

    .category-desc {
      color: @light-text;
      margin: 0;
      font-size: 1.1rem;
      max-width: 800px;
    }
  }
}

.commands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.command-card {
  border: 1px solid @border-color;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    border-color: rgba(@base-color, 0.3);
  }

  &.favorite {
    border-left: 4px solid @warning-color;
    position: relative;

    &::before {
      content: "★ 推荐";
      position: absolute;
      top: -10px;
      right: 15px;
      background: @warning-color;
      color: #fff;
      font-size: 0.75rem;
      padding: 0.2rem 0.8rem;
      border-radius: 20px;
      font-weight: 600;
    }
  }
}

.command-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  .command-name {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

    .prefix {
      color: @light-text;
    }

    .star-icon {
      color: @warning-color;
      margin-left: 0.5rem;
    }
  }

  .usage-badge {
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.25rem 0.7rem;
    border-radius: 20px;

    background:
      linear-gradient(135deg, #f5f7fa, #e4e7eb);
    color: @light-text;
  }
}

.command-description {
  color: @light-text;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  min-height: 3.5rem;
}

.command-usage,
.command-example {
  background: #f8f9fa;
  border-left: 3px solid #e1e4e8;
  padding: 0.8rem 1rem;
  border-radius: 0 5px 5px 0;
  margin-bottom: 1rem;
  overflow-x: auto;

  pre {
    margin: 0;
    font-size: 0.9rem;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  }

  code {
    color: #24292e;
    white-space: pre;
  }
}

.command-example {
  background: #f0f8ff;
  border-left-color: #4dabf7;

  .example-title {
    font-size: 0.85rem;
    font-weight: 600;
    color: #1c7ed6;
    margin-bottom: 0.5rem;
  }
}

.command-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed @border-color;

  .tag {
    background: rgba(@base-color, 0.08);
    color: @base-color;
    font-size: 0.75rem;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-weight: 500;
  }
}

.guide-footer {
  background: #f8f9fa;
  border-top: 1px solid @border-color;
  padding: 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.tip-box {
  display: flex;
  gap: 1.5rem;
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
  margin-bottom: 2rem;

  .tip-icon {
    font-size: 2.5rem;
  }

  .tip-content {
    h3 {
      margin: 0 0 0.5rem;
      color: @base-color;
    }

    p {
      margin: 0;
      color: @light-text;
      line-height: 1.7;

      code {
        background: rgba(@base-color, 0.05);
        color: @base-color;
        padding: 0.15rem 0.4rem;
        border-radius: 4px;
        font-family: monospace;
      }
    }
  }
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;

  a {
    color: @base-color;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
}

.copyright {
  text-align: center;
  color: @light-text;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .content-container {
    flex-direction: column;
  }

  .categories-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid @border-color;
  }

  .category-list {
    display: flex;
    overflow-x: auto;
    padding: 0 1rem 0.5rem;

    li {
      flex-shrink: 0;
      border-radius: 8px;
      margin-right: 0.5rem;

      &.active::before {
        width: 100%;
        height: 4px;
        top: auto;
        bottom: 0;
      }
    }
  }
}

@media (max-width: 768px) {
  .commands-grid {
    grid-template-columns: 1fr;
  }

  .guide-header {
    padding: 1.5rem 1rem;

    .header-content {
      flex-direction: column;
      text-align: center;

      .logo {
        margin: 0 0 1rem;
      }

      .npm-version {
        margin-top: 1rem;
      }
    }
  }

  .commands-container {
    padding: 1.5rem;
  }
}

/* 打印优化 */
@media print {
  .npm-commands-guide {
    box-shadow: none;
  }

  .guide-header,
  .categories-sidebar {
    display: none;
  }

  .commands-container {
    padding: 0;
  }
}
</style>
