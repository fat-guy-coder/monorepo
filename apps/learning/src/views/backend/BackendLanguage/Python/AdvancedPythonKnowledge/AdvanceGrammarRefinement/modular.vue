<template>
  <div class="modular-container">
    <header class="hero">
      <h1 class="title">📦 Python 模块化指南</h1>
      <p class="subtitle">模块 · 包 · 导入系统 · 虚拟环境 · 依赖管理</p>
      <div class="badge-group">
        <span>🧩 import</span><span>📁 __init__.py</span><span>🌍 pip</span><span>📦 venv</span>
      </div>
    </header>

    <!-- 核心概念网格 -->
    <div class="cards-grid">
      <article v-for="item in modularTopics" :key="item.id" class="topic-card">
        <div class="card-head">
          <span class="card-icon">{{ item.icon }}</span>
          <h2 class="card-title">{{ item.title }}</h2>
        </div>
        <p class="card-desc">{{ item.description }}</p>
        <div class="code-block">
          <pre><code>{{ item.code }}</code></pre>
        </div>
        <div class="card-footer">
          <span class="tag">{{ item.tag }}</span>
        </div>
      </article>
    </div>

    <!-- 最佳实践与技巧 -->
    <div class="insight-section">
      <div class="best-card">
        <h3>✅ 模块化最佳实践</h3>
        <ul>
          <li>按功能拆分模块，每个模块专注一件事 (SRP)</li>
          <li>使用 <code>__all__</code> 控制 <code>from module import *</code> 的导出内容</li>
          <li>避免循环导入：重构或延迟导入（函数内导入）</li>
          <li>合理组织包结构，<code>__init__.py</code> 中可以暴露对外接口</li>
          <li>使用 <code>if __name__ == "__main__"</code> 让模块既可导入又可执行</li>
        </ul>
      </div>
      <div class="tools-card">
        <h3>🛠️ 常用工具与命令</h3>
        <ul>
          <li><code>pip install package</code> — 安装依赖</li>
          <li><code>pip freeze > requirements.txt</code> — 导出依赖列表</li>
          <li><code>python -m venv .venv</code> — 创建虚拟环境</li>
          <li><code>source .venv/bin/activate</code> (Linux/macOS) 或 <code>.venv\Scripts\activate</code> (Windows)</li>
          <li><code>python -m mypackage.submodule</code> — 以模块方式运行</li>
        </ul>
      </div>
    </div>

    <footer class="footer">
      <p>✨ 合理模块化，让 Python 项目清晰、可维护、可扩展</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface ModularTopic {
  id: string;
  icon: string;
  title: string;
  description: string;
  code: string;
  tag: string;
}

const modularTopics: ModularTopic[] = [
  {
    id: 'module-def',
    icon: '🧩',
    title: '模块 (Module)',
    description: '一个 .py 文件就是一个模块。通过 import 可以导入并使用其定义的函数、类和变量。',
    code: `# 文件: math_utils.py
PI = 3.14159

def circle_area(radius):
    return PI * radius ** 2

class Calculator:
    @staticmethod
    def add(a, b):
        return a + b

# 在另一个文件中导入
import math_utils
print(math_utils.circle_area(5))
print(math_utils.Calculator.add(3, 4))`,
    tag: '.py 文件 | 命名空间'
  },
  {
    id: 'import-syntax',
    icon: '🔌',
    title: '导入语法',
    description: '支持多种导入方式：import module, from module import name, 别名 as 等。',
    code: `# 导入整个模块
import os
# 导入特定成员
from sys import platform
# 导入并起别名
import numpy as np
# 导入模块中所有（不推荐）
from math import *

# 动态导入
module_name = "json"
json = __import__(module_name)`,
    tag: 'import | from ... import | as'
  },
  {
    id: 'package',
    icon: '📁',
    title: '包 (Package)',
    description: '包含 __init__.py 文件的目录，用于组织多个模块。可以嵌套子包。',
    code: `# 项目结构
# mypackage/
#   __init__.py
#   core.py
#   utils/
#       __init__.py
#       helpers.py

# __init__.py 可以定义包的初始化或导出
# 文件: mypackage/__init__.py
__all__ = ["core", "utils"]

# 导入包中的模块
from mypackage import core
from mypackage.utils import helpers

# 相对导入（包内部使用）
# from . import core
# from ..utils import helpers`,
    tag: '__init__.py | 命名空间包'
  },
  {
    id: 'name-main',
    icon: '🎯',
    title: '__name__ == "__main__"',
    description: '判断脚本是作为主程序执行还是被导入。常用于模块的自我测试或命令行入口。',
    code: `# 文件: demo.py
def main():
    print("执行主逻辑")

if __name__ == "__main__":
    # 仅当直接运行此脚本时执行
    print("作为主程序运行")
    main()
else:
    print(f"被导入为模块: {__name__}")

# 直接运行: python demo.py → 输出 "作为主程序运行"
# 导入: import demo → 输出 "__name__ = demo"`,
    tag: '入口点 | 可执行模块'
  },
  {
    id: 'packaging',
    icon: '📦',
    title: '打包与分发',
    description: '使用 setuptools 构建可安装的包，上传至 PyPI。包含 pyproject.toml 或 setup.py。',
    code: `# 项目结构
# my_project/
#   pyproject.toml
#   src/
#       mypackage/
#           __init__.py
#           module.py

# pyproject.toml (最小示例)
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "mypackage"
version = "0.1.0"
dependencies = ["requests>=2.25"]

# 安装开发版本
# pip install -e .`,
    tag: 'setuptools | PyPI | pip install'
  },
  {
    id: 'virtualenv',
    icon: '🌍',
    title: '虚拟环境与依赖',
    description: '隔离项目依赖，避免版本冲突。结合 requirements.txt 管理依赖清单。',
    code: `# 创建虚拟环境
python -m venv .venv
# 激活 (macOS/Linux)
source .venv/bin/activate
# 激活 (Windows)
.venv\\Scripts\\activate

# 安装依赖包
pip install flask requests

# 导出依赖到文件
pip freeze > requirements.txt

# 根据文件安装依赖
pip install -r requirements.txt

# 退出虚拟环境
deactivate`,
    tag: 'venv | requirements.txt'
  }
];
</script>

<style lang="less" scoped>
@bg-page: #faf9fe;
@card-white: #ffffff;
@primary-dark: #1e293b;
@accent: #7c3aed; // 紫色调，模块化主题
@text-secondary: #4b5563;
@border-light: #ede9fe;
@code-bg: #0f172a;
@code-fg: #e2e8f0;

.modular-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: @bg-page;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: @primary-dark;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, @primary-dark, @accent);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.1rem;
    color: @text-secondary;
    margin-bottom: 1rem;
  }

  .badge-group {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    flex-wrap: wrap;

    span {
      background: #ede9fe;
      color: @accent;
      padding: 0.25rem 1rem;
      border-radius: 2rem;
      font-size: 0.75rem;
      font-weight: 600;
    }
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.8rem;
  margin-bottom: 2.5rem;
}

.topic-card {
  background: @card-white;
  border-radius: 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid @border-light;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 30px -12px rgba(124, 58, 237, 0.15);
    border-color: rgba(124, 58, 237, 0.3);
  }
}

.card-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.2rem 1.5rem 0rem 1.5rem;
  border-bottom: 2px solid #f5f3ff;

  .card-icon {
    font-size: 1.8rem;
  }

  .card-title {
    font-size: 1.35rem;
    font-weight: 600;
    color: @primary-dark;
    margin: 0;
  }
}

.card-desc {
  padding: 0.8rem 1.5rem 0.2rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: @text-secondary;
}

.code-block {
  background: @code-bg;
  margin: 0.8rem 1rem 1rem 1rem;
  border-radius: 1rem;
  overflow-x: auto;
  font-size: 0.75rem;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;

  pre {
    margin: 0;
    padding: 1rem;
    white-space: pre-wrap;
    word-break: break-word;
  }

  code {
    color: @code-fg;
  }
}

.card-footer {
  padding: 0.5rem 1.5rem 1.2rem;
  margin-top: auto;

  .tag {
    background: #f3e8ff;
    color: #6b21a5;
    padding: 0.2rem 0.8rem;
    border-radius: 2rem;
    font-size: 0.7rem;
    font-weight: 500;
  }
}

.insight-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.8rem;
  margin-bottom: 2rem;

  .best-card,
  .tools-card {
    background: @card-white;
    border-radius: 1.25rem;
    padding: 1.2rem 1.8rem;
    border: 1px solid @border-light;

    h3 {
      margin-top: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: @primary-dark;
      border-left: 4px solid @accent;
      padding-left: 0.75rem;
    }

    ul {
      padding-left: 1.2rem;

      li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
        color: @text-secondary;
        font-size: 0.9rem;

        code {
          background: #f5f3ff;
          padding: 0.1rem 0.3rem;
          border-radius: 6px;
          color: @accent;
        }
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 1rem;
  padding-top: 1.2rem;
  border-top: 1px solid #e2e8f0;
  color: #5b6e8c;
  font-size: 0.85rem;
}

@media (max-width: 720px) {
  .modular-container {
    padding: 1rem;
  }

  .hero .title {
    font-size: 1.8rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .insight-section {
    grid-template-columns: 1fr;
  }
}
</style>
