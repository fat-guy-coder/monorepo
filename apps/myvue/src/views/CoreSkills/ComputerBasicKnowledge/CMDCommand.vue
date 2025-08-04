<template>
  <div class="cmd-commands-container">
    <header class="commands-header">
      <div class="header-content">
        <h1>Windows CMD命令手册</h1>
        <p class="subtitle">系统管理员和开发者的必备参考</p>
      </div>
      <div class="cmd-icon">C:\></div>
    </header>

    <div class="search-section">
      <div class="search-box">
        <input type="text" v-model="searchQuery" placeholder="搜索命令 (如 dir, ipconfig, ping...)" class="search-input">
        <div class="search-icon">🔍</div>
      </div>
      <div class="search-tips">
        提示: 按命令名、功能或参数搜索，例如 "查看文件" 或 "/s"
      </div>
    </div>

    <div class="content-container">
      <!-- 分类导航 -->
      <div class="category-nav">
        <div v-for="category in categories" :key="category.id" class="category-item"
          :class="{ active: activeCategory === category.id }" @click="activeCategory = category.id">
          <div class="category-icon">{{ category.icon }}</div>
          <div class="category-name">{{ category.name }}</div>
          <div class="command-count">{{ getCommandCount(category.id) }}</div>
        </div>
      </div>

      <!-- 命令列表 -->
      <div class="commands-section">
        <div class="category-header">
          <div class="category-title">
            <div class="title-icon">{{ getActiveCategoryIcon() }}</div>
            <h2>{{ getActiveCategoryName() }}</h2>
          </div>
          <div class="commands-count">
            共 {{ filteredCommands.length }} 个命令
          </div>
        </div>

        <div class="command-list">
          <div v-for="(command, index) in filteredCommands" :key="index" class="command-card">
            <div class="command-header">
              <div class="command-name">{{ command.name }}</div>
              <div class="command-description">{{ command.description }}</div>
            </div>

            <div class="command-usage">
              <pre class="usage-example">{{ command.usage }}</pre>
            </div>

            <div class="command-options">
              <h3>常用参数:</h3>
              <div class="options-grid">
                <div v-for="(option, optIndex) in command.options" :key="optIndex" class="option-item">
                  <div class="option-flag">{{ option.flag }}</div>
                  <div class="option-description">{{ option.description }}</div>
                </div>
              </div>
            </div>

            <div class="command-examples">
              <h3>使用示例:</h3>
              <div class="examples">
                <div v-for="(example, exIndex) in command.examples" :key="exIndex" class="example">
                  <pre class="example-command">{{ example.command }}</pre>
                  <div class="example-description">{{ example.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="commands-footer">
      <p>Windows CMD命令手册 - 提供最常用的Windows命令参考 | 基于Windows 10/11</p>
      <div class="footer-links">
        <a href="#">命令速查PDF</a>
        <a href="#">批处理脚本教程</a>
        <a href="#">高级命令指南</a>
        <a href="#">命令练习场</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 命令分类
const categories = ref([
  { id: 'file', name: '文件操作', icon: '📁' },
  { id: 'system', name: '系统管理', icon: '💻' },
  { id: 'network', name: '网络操作', icon: '🌐' },
  { id: 'disk', name: '磁盘管理', icon: '💾' },
  { id: 'process', name: '进程管理', icon: '⚙️' },
  { id: 'info', name: '系统信息', icon: 'ℹ️' },
  { id: 'batch', name: '批处理', icon: '📜' },
  { id: 'other', name: '其他命令', icon: '🔍' },
]);

// 当前激活的分类
const activeCategory = ref('file');

// 搜索关键词
const searchQuery = ref('');

// CMD命令数据
const commands = ref<any[]>([]);

onMounted(async () => {
  const { default: commandsData } = await import('./JSON/CMDCommands.json');
  commands.value = commandsData;
});


// 计算过滤后的命令列表
const filteredCommands = computed(() => {
  let result = commands.value;

  // 按分类过滤
  if (activeCategory.value) {
    result = result.filter(cmd => cmd.category === activeCategory.value);
  }

  // 按搜索关键词过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(cmd => {
      // 检查命令名
      if (cmd.name.toLowerCase().includes(query)) return true;

      // 检查描述
      if (cmd.description.toLowerCase().includes(query)) return true;

      // 检查参数
      if (cmd.options.some((opt: any) =>
        opt.flag.toLowerCase().includes(query) ||
        opt.description.toLowerCase().includes(query)
      )) return true;

      // 检查示例
      if (cmd.examples.some((ex: any) =>
        ex.command.toLowerCase().includes(query) ||
        ex.description.toLowerCase().includes(query)
      )) return true;

      return false;
    });
  }

  return result;
});

// 获取当前分类的命令数量
const getCommandCount = (categoryId: string) => {
  return commands.value.filter(cmd => cmd.category === categoryId).length;
};

// 获取当前激活分类的名称
const getActiveCategoryName = () => {
  const category = categories.value.find(c => c.id === activeCategory.value);
  return category ? category.name : '所有命令';
};

// 获取当前激活分类的图标
const getActiveCategoryIcon = () => {
  const category = categories.value.find(c => c.id === activeCategory.value);
  return category ? category.icon : '📋';
};
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Source+Code+Pro:wght@400;500;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

// 颜色变量
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #9b59b6;
@windows-blue: #0078d7;
@windows-gray: #f2f2f2;
@windows-dark: #1a1a1a;
@card-bg: #ffffff;
@text-color: #2c3e50;
@border-color: #e0e0e0;
@cmd-bg: #012456;
@cmd-green: #10a810;
@cmd-yellow: #c19c00;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.cmd-commands-container {
  font-family: 'Roboto', 'Noto Sans SC', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: #f8fafc;
  min-height: 100vh;
  line-height: 1.6;

  .commands-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, @windows-dark, lighten(@windows-dark, 10%));
    color: white;
    padding: 30px 40px;
    border-radius: 15px;
    margin-bottom: 30px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);

    .header-content {
      h1 {
        font-size: 2.8rem;
        margin-bottom: 10px;
        letter-spacing: 0.5px;
      }

      .subtitle {
        font-size: 1.4rem;
        opacity: 0.9;
        max-width: 700px;
      }
    }

    .cmd-icon {
      font-family: 'Source Code Pro', monospace;
      font-size: 1.8rem;
      font-weight: bold;
      background: @cmd-bg;
      padding: 15px 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      color: @cmd-green;
    }
  }

  .search-section {
    margin-bottom: 30px;

    .search-box {
      position: relative;
      margin-bottom: 10px;

      .search-input {
        width: 100%;
        padding: 15px 20px 15px 50px;
        border: 2px solid @windows-blue;
        border-radius: 50px;
        font-size: 1.1rem;
        box-shadow: 0 4px 10px rgba(0, 120, 215, 0.2);
        transition: all 0.3s ease;

        &:focus {
          outline: none;
          box-shadow: 0 4px 15px rgba(0, 120, 215, 0.3);
        }
      }

      .search-icon {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.5rem;
        color: @windows-blue;
      }
    }

    .search-tips {
      text-align: center;
      color: lighten(@text-color, 30%);
      font-size: 0.95rem;
    }
  }

  .content-container {
    display: flex;
    gap: 20px;

    @media (max-width: 900px) {
      flex-direction: column;
    }

    .category-nav {
      flex: 0 0 250px;
      background: @card-bg;
      border-radius: 15px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      padding: 15px;
      height: fit-content;

      @media (max-width: 900px) {
        flex: 1;
        width: 100%;
      }

      .category-item {
        display: flex;
        align-items: center;
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: fade(@windows-blue, 10%);
        }

        &.active {
          background: fade(@windows-blue, 15%);
          box-shadow: 0 4px 8px fade(@windows-blue, 20%);

          .category-icon,
          .category-name {
            color: @windows-blue;
            font-weight: 500;
          }
        }

        .category-icon {
          font-size: 1.8rem;
          margin-right: 15px;
          width: 40px;
          text-align: center;
        }

        .category-name {
          flex: 1;
          font-size: 1.1rem;
        }

        .command-count {
          background: @windows-gray;
          border-radius: 15px;
          padding: 3px 10px;
          font-size: 0.9rem;
          font-weight: 500;
        }
      }
    }

    .commands-section {
      flex: 1;
      background: @card-bg;
      border-radius: 15px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;

      .category-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 30px;
        background: fade(@windows-blue, 10%);
        border-bottom: 1px solid @border-color;

        .category-title {
          display: flex;
          align-items: center;
          gap: 15px;

          .title-icon {
            font-size: 2rem;
          }

          h2 {
            margin: 0;
            font-size: 1.8rem;
            color: @text-color;
          }
        }

        .commands-count {
          font-weight: 500;
          color: @windows-blue;
          font-size: 1.1rem;
        }
      }

      .command-list {
        padding: 20px;
        max-height: calc(100vh - 300px);
        overflow-y: auto;

        @media (max-width: 768px) {
          max-height: none;
        }

        .command-card {
          border: 1px solid @border-color;
          border-radius: 10px;
          margin-bottom: 25px;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;

          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }

          .command-header {
            padding: 20px;
            background: fade(@windows-blue, 5%);
            border-bottom: 1px solid @border-color;

            .command-name {
              font-family: 'Source Code Pro', monospace;
              font-size: 1.5rem;
              font-weight: 700;
              color: @windows-blue;
              margin-bottom: 10px;
            }

            .command-description {
              font-size: 1.1rem;
              color: lighten(@text-color, 15%);
            }
          }

          .command-usage {
            padding: 15px 20px;
            background: @cmd-bg;
            color: white;
            font-family: 'Source Code Pro', monospace;

            .usage-example {
              margin: 0;
              color: @cmd-green;
              font-size: 1.1rem;
            }
          }

          .command-options {
            padding: 20px;
            border-bottom: 1px solid @border-color;

            h3 {
              font-size: 1.3rem;
              margin-bottom: 15px;
              color: @text-color;
              padding-bottom: 10px;
              border-bottom: 1px solid @border-color;
            }

            .options-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
              gap: 15px;

              .option-item {
                display: flex;
                gap: 15px;
                padding: 10px;
                border-radius: 8px;
                background: @windows-gray;

                .option-flag {
                  font-family: 'Source Code Pro', monospace;
                  font-weight: 700;
                  color: @windows-blue;
                  min-width: 60px;
                }

                .option-description {
                  flex: 1;
                }
              }
            }
          }

          .command-examples {
            padding: 20px;

            h3 {
              font-size: 1.3rem;
              margin-bottom: 15px;
              color: @text-color;
              padding-bottom: 10px;
              border-bottom: 1px solid @border-color;
            }

            .examples {
              .example {
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px dashed @border-color;

                &:last-child {
                  margin-bottom: 0;
                  padding-bottom: 0;
                  border-bottom: none;
                }

                .example-command {
                  font-family: 'Source Code Pro', monospace;
                  background: @cmd-bg;
                  color: @cmd-green;
                  padding: 15px;
                  border-radius: 8px;
                  margin-bottom: 10px;
                  overflow-x: auto;
                }

                .example-description {
                  font-size: 0.95rem;
                  color: lighten(@text-color, 20%);
                  padding: 0 10px;
                }
              }
            }
          }
        }
      }
    }
  }

  .commands-footer {
    text-align: center;
    padding: 30px;
    background: @windows-gray;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    margin-top: 30px;

    p {
      font-size: 1.1rem;
      margin-bottom: 20px;
      color: @text-color;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 25px;
      flex-wrap: wrap;

      a {
        color: @windows-blue;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;

        &:hover {
          color: darken(@windows-blue, 15%);
          text-decoration: underline;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .commands-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 20px !important;

    .cmd-icon {
      margin-top: 10px;
    }
  }

  .category-nav {
    width: 100% !important;
  }
}
</style>