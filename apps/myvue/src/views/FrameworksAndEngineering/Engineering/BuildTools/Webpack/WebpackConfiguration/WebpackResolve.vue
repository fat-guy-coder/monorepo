<template>
  <div class="container">
    <header class="header">
      <h1 class="title">webpack resolve 配置详解</h1>
      <p class="subtitle">深入理解模块解析配置选项</p>
    </header>

    <main class="main-content">
      <section class="intro">
        <p>
          webpack 的 <code>resolve</code> 配置用于设置模块如何被解析。通过合理配置 resolve 选项，
          可以简化模块导入路径、指定模块查找规则，从而提高开发效率和构建性能。
        </p>
      </section>

      <div class="config-items">
        <div
          v-for="(item, index) in resolveConfigItems"
          :key="index"
          class="config-item"
          :class="{ 'odd-item': index % 2 === 0 }"
        >
          <div class="config-header">
            <code class="config-name">{{ item.name }}</code>
            <span class="config-type">{{ item.type }}</span>
          </div>

          <div class="config-description">
            <p>{{ item.description }}</p>

            <div v-if="item.example" class="config-example">
              <h4>示例：</h4>
              <pre><code>{{ item.example }}</code></pre>
            </div>

            <div v-if="item.properties && item.properties.length" class="config-properties">
              <h4>属性：</h4>
              <ul>
                <li v-for="(prop, pIndex) in item.properties" :key="pIndex">
                  <code>{{ prop.name }}</code>: {{ prop.description }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>webpack 配置指南 &copy; {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface ConfigProperty {
  name: string;
  description: string;
}

interface ResolveConfigItem {
  name: string;
  type: string;
  description: string;
  example?: string;
  properties?: ConfigProperty[];
}

const resolveConfigItems: ResolveConfigItem[] = [
  {
    name: "resolve.alias",
    type: "object",
    description: "创建 import 或 require 的别名，来简化模块引入路径。",
    example: `{
  alias: {
    '@': path.resolve(__dirname, 'src/'),
    'components': path.resolve(__dirname, 'src/components/')
  }
}`,
    properties: [
      {
        name: "别名键值对",
        description: "键为别名，值为对应的实际路径"
      }
    ]
  },
  {
    name: "resolve.extensions",
    type: "string[]",
    description: "自动解析确定的扩展。默认值为 ['.js', '.json', '.wasm']，添加空字符串可以表示不解析扩展名。",
    example: `{
  extensions: ['.js', '.vue', '.json', '.ts', '']
}`,
    properties: [
      {
        name: "扩展名数组",
        description: "按顺序尝试解析的文件扩展名"
      }
    ]
  },
  {
    name: "resolve.mainFiles",
    type: "string[]",
    description: "解析目录时要使用的文件名。默认值为 ['index']。",
    example: `{
  mainFiles: ['index', 'main']
}`
  },
  {
    name: "resolve.modules",
    type: "string[]",
    description: "告诉 webpack 解析模块时应该搜索的目录。默认值为 ['node_modules']。",
    example: `{
  modules: ['node_modules', path.resolve(__dirname, 'src/components')]
}`
  },
  {
    name: "resolve.descriptionFiles",
    type: "string[]",
    description: "用于描述的 JSON 文件。默认值为 ['package.json']。",
    example: `{
  descriptionFiles: ['package.json', 'bower.json']
}`
  },
  {
    name: "resolve.enforceExtension",
    type: "boolean",
    description: "如果为 true，则不允许无扩展名的文件。默认值为 false。",
    example: `{
  enforceExtension: false
}`
  },
  {
    name: "resolve.enforceModuleExtension",
    type: "boolean",
    description: "对模块是否需要带文件扩展名的要求。只有在 module.rules 中没有为模块设置 test 时才会生效。",
    example: `{
  enforceModuleExtension: false
}`
  },
  {
    name: "resolve.unsafeCache",
    type: "boolean | RegExp | RegExp[]",
    description: "启用不安全缓存。默认值为 true。缓存会导致模块解析结果被缓存，可能会影响热更新。",
    example: `{
  unsafeCache: /src\/util/
}`
  },
  {
    name: "resolve.cacheWithContext",
    type: "boolean",
    description: "如果为 true，则使用请求上下文作为缓存键。默认值为 true。",
    example: `{
  cacheWithContext: true
}`
  },
  {
    name: "resolve.plugins",
    type: "Plugin[]",
    description: "应用于解析过程的插件数组。例如，可使用 DirectoryNamedWebpackPlugin 等插件。",
    example: `{
  plugins: [new DirectoryNamedWebpackPlugin()]
}`
  },
  {
    name: "resolve.symlinks",
    type: "boolean",
    description: "是否将符号链接解析到它们的符号链接位置。默认值为 true。",
    example: `{
  symlinks: true
}`
  },
  {
    name: "resolve.cachePredicate",
    type: "(request: Request) => boolean",
    description: "决定请求是否应该被缓存的函数。返回 true 表示缓存，false 表示不缓存。",
    example: `{
  cachePredicate: (request) => {
    // 不缓存 node_modules 下的模块
    return !request.path.includes('node_modules');
  }
}`
  }
];
</script>

<style scoped lang="less">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9fafb;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e5e7eb;

  .title {
    color: #1e293b;
    margin: 0 0 10px 0;
    font-size: 2rem;
  }

  .subtitle {
    color: #64748b;
    margin: 0;
    font-size: 1.1rem;
    font-weight: normal;
  }
}

.main-content {
  .intro {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;

    p {
      margin: 0;
      color: #475569;
    }
  }

  .config-items {
    display: grid;
    gap: 20px;
  }

  .config-item {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    &.odd-item {
      background-color: #fefefe;
    }

    .config-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #f1f5f9;

      .config-name {
        font-weight: 600;
        color: #1e40af;
        font-size: 1.1rem;
      }

      .config-type {
        font-size: 0.85rem;
        background-color: #e0f2fe;
        color: #0369a1;
        padding: 3px 8px;
        border-radius: 4px;
      }
    }

    .config-description {
      color: #475569;

      p {
        margin-top: 0;
        margin-bottom: 15px;
      }

      .config-example {
        margin: 15px 0;

        h4 {
          margin: 0 0 8px 0;
          color: #334155;
          font-size: 0.95rem;
        }

        pre {
          background-color: #f8fafc;
          border-radius: 6px;
          padding: 12px;
          overflow-x: auto;
          margin: 0;
          font-size: 0.9rem;
          border: 1px solid #e2e8f0;

          code {
            color: #0f172a;
            font-family: 'Fira Code', monospace;
          }
        }
      }

      .config-properties {
        margin: 15px 0;

        h4 {
          margin: 0 0 8px 0;
          color: #334155;
          font-size: 0.95rem;
        }

        ul {
          margin: 0;
          padding-left: 20px;

          li {
            margin-bottom: 5px;

            code {
              color: #b91c1c;
              background-color: #fee2e2;
              padding: 1px 4px;
              border-radius: 3px;
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }
}

.footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  color: #94a3b8;
  font-size: 0.9rem;
}

code {
  font-family: 'Fira Code', monospace;
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .header .title {
    font-size: 1.6rem;
  }

  .config-item {
    padding: 15px;
  }
}
</style>
