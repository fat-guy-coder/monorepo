<template>
  <div class="git-guide-container">
    <!-- 页面标题区域 -->
    <header class="page-header">
      <h1>Git 效率工具指南</h1>
      <p class="header-subtitle">深入了解 git tag 与 git alias 的使用技巧</p>
    </header>

    <!-- 主要内容区域 -->
    <main class="content-wrapper">
      <!-- Git Tag 部分 -->
      <section class="content-section tag-section">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-tag"></i>
          </div>
          <h2 class="section-title">Git Tag</h2>
          <div class="section-divider"></div>
        </div>

        <div class="section-content">
          <!-- 什么是Git Tag -->
          <div class="info-block">
            <h3 class="block-title">什么是 Git Tag？</h3>
            <p class="block-text">
              Git Tag 是用于标记仓库中特定历史版本的引用，通常用于标记重要的发布版本（如 v1.0.0）。
              与分支不同，标签是固定的快照，不会随着新提交而移动，为项目历史提供稳定的参考点。
            </p>
          </div>

          <!-- Git Tag的作用 -->
          <div class="info-block">
            <h3 class="block-title">主要作用</h3>
            <ul class="feature-list">
              <li class="feature-item">
                <i class="fas fa-check-circle feature-icon"></i>
                <span>标记重要的版本点，如软件发布版本</span>
              </li>
              <li class="feature-item">
                <i class="fas fa-check-circle feature-icon"></i>
                <span>便于回溯到特定版本进行查看或修改</span>
              </li>
              <li class="feature-item">
                <i class="fas fa-check-circle feature-icon"></i>
                <span>提供项目里程碑的清晰标识</span>
              </li>
              <li class="feature-item">
                <i class="fas fa-check-circle feature-icon"></i>
                <span>简化版本之间的切换与对比操作</span>
              </li>
            </ul>
          </div>

          <!-- Git Tag常用命令 -->
          <div class="info-block">
            <h3 class="block-title">常用命令示例</h3>
            <div class="code-container">
              <pre class="code-block"><code># 创建轻量标签（无注释）
git tag v1.0.0

# 创建带注释的标签（推荐）
git tag -a v1.0.0 -m "版本 1.0.0 正式发布"

# 查看所有标签
git tag

# 查看特定标签信息
git show v1.0.0

# 推送标签到远程仓库
git push origin v1.0.0

# 推送所有标签到远程仓库
git push origin --tags

# 检出标签对应的代码
git checkout v1.0.0

# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin --delete v1.0.0</code></pre>
            </div>
          </div>

          <!-- Git Tag适用场景 -->
          <div class="info-block">
            <h3 class="block-title">适用场景</h3>
            <div class="scenarios-grid">
              <div class="scenario-card">
                <div class="scenario-icon">
                  <i class="fas fa-rocket"></i>
                </div>
                <h4 class="scenario-title">软件发布</h4>
                <p class="scenario-desc">为每个正式发布版本创建标签，如 v1.0、v2.0 等</p>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">
                  <i class="fas fa-flag-checkered"></i>
                </div>
                <h4 class="scenario-title">重要里程碑</h4>
                <p class="scenario-desc">标记项目开发过程中的重要阶段或完成的功能模块</p>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">
                  <i class="fas fa-server"></i>
                </div>
                <h4 class="scenario-title">生产环境部署</h4>
                <p class="scenario-desc">记录部署到生产环境的代码版本，便于问题排查和回滚</p>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">
                  <i class="fas fa-flask"></i>
                </div>
                <h4 class="scenario-title">版本测试</h4>
                <p class="scenario-desc">为需要测试的特定版本创建标签，方便测试人员检出对应版本</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Git Alias 部分 -->
      <section class="content-section alias-section">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-code-branch"></i>
          </div>
          <h2 class="section-title">Git Alias</h2>
          <div class="section-divider"></div>
        </div>

        <div class="section-content">
          <!-- 什么是Git Alias -->
          <div class="info-block">
            <h3 class="block-title">什么是 Git Alias？</h3>
            <p class="block-text">
              Git Alias 是 Git 命令的快捷方式或缩写，允许你为常用命令创建自定义的简短别名，
              显著提高命令行操作效率，减少重复输入，让你的 Git 工作流更加流畅。
            </p>
          </div>

          <!-- Git Alias的作用 -->
          <div class="info-block">
            <h3 class="block-title">主要作用</h3>
            <ul class="feature-list">
              <li class="feature-item">
                <i class="fas fa-check-circle feature-icon"></i>
                <span>减少重复输入，提高日常操作效率</span>
              </li>
              <li class="feature-item">
                <i class="fas fa-check-circle feature-icon"></i>
                <span>简化复杂命令，降低记忆负担</span>
              </li>
              <li class="feature-item">
                <i class="fas fa-check-circle feature-icon"></i>
                <span>可以将常用的命令组合封装为一个别名</span>
              </li>
              <li class="feature-item">
                <i class="fas fa-check-circle feature-icon"></i>
                <span>个性化 Git 工作流，适应个人操作习惯</span>
              </li>
            </ul>
          </div>

          <!-- Git Alias常用配置 -->
          <div class="info-block">
            <h3 class="block-title">常用配置方法</h3>
            <div class="code-container">
              <pre class="code-block"><code># 配置临时别名（当前仓库有效）
git config alias.st status

# 配置全局别名（所有仓库有效）
git config --global alias.st status

# 配置分支相关别名
git config --global alias.br branch
git config --global alias.co checkout
git config --global alias.cm "commit -m"

# 配置撤销相关别名
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'

# 配置美化日志输出的别名
git config --global alias.lg "log --color --graph \
  --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s \
  %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# 查看已配置的所有别名
git config --get-regexp alias

# 删除别名
git config --global --unset alias.st</code></pre>
            </div>
          </div>

          <!-- Git Alias适用场景 -->
          <div class="info-block">
            <h3 class="block-title">适用场景</h3>
            <div class="scenarios-grid">
              <div class="scenario-card">
                <div class="scenario-icon">
                  <i class="fas fa-bolt"></i>
                </div>
                <h4 class="scenario-title">日常频繁操作</h4>
                <p class="scenario-desc">为 status、commit、branch 等常用命令创建简写</p>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">
                  <i class="fas fa-code"></i>
                </div>
                <h4 class="scenario-title">复杂命令简化</h4>
                <p class="scenario-desc">将常用的复杂命令组合（如特定格式的 log）简化为一个别名</p>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">
                  <i class="fas fa-users"></i>
                </div>
                <h4 class="scenario-title">团队标准化</h4>
                <p class="scenario-desc">团队共享一套别名规范，统一工作流，提高协作效率</p>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <h4 class="scenario-title">减少输入错误</h4>
                <p class="scenario-desc">通过简短别名减少长命令输入时的错误几率</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="page-footer">
      <p>Git 工具指南 &copy; {{ currentYear }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 获取当前年份用于页脚版权信息
const currentYear = ref(new Date().getFullYear());
</script>

<style lang="less" scoped>
.git-guide-container {
  max-width: 1050px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fafafa;
  color: #333;
  min-height: 100vh;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

// 页面标题样式
.page-header {
  text-align: center;
  margin: 0 0 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eaeaea;

  h1 {
    font-size: 2.2rem;
    margin: 0 0 10px;
    color: #2d3748;
    letter-spacing: -0.5px;
  }

  .header-subtitle {
    font-size: 1.1rem;
    color: #718096;
    margin: 0;
    font-weight: 500;
  }
}

// 内容区域样式
.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

// 章节样式
.content-section {
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.07);
  }
}

// 章节头部样式
.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 25px;

  .section-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ebf8ff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    flex-shrink: 0;

    i {
      color: #3182ce;
      font-size: 1.2rem;
    }
  }

  .section-title {
    font-size: 1.7rem;
    color: #2d3748;
    margin: 0;
    font-weight: 600;
  }

  .section-divider {
    height: 2px;
    background-color: #e2e8f0;
    flex-grow: 1;
    margin-left: 20px;
    border-radius: 1px;
  }
}

// 章节内容样式
.section-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

// 信息块样式
.info-block {
  &:last-child {
    margin-bottom: 0;
  }

  .block-title {
    font-size: 1.3rem;
    color: #2d3748;
    margin: 0 0 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid #f0f0f0;
    font-weight: 600;
  }

  .block-text {
    margin: 0;
    line-height: 1.7;
    color: #4a5568;
    font-size: 1rem;
  }
}

// 特性列表样式
.feature-list {
  margin: 0;
  padding: 0 0 0 25px;

  .feature-item {
    margin-bottom: 10px;
    line-height: 1.6;
    color: #4a5568;
    position: relative;
    padding-left: 8px;

    &:last-child {
      margin-bottom: 0;
    }

    .feature-icon {
      color: #38a169;
      margin-right: 8px;
      font-size: 0.9rem;
    }
  }
}

// 代码块样式
.code-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .code-block {
    margin: 0;
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    padding: 18px;
    overflow-x: auto;

    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.9rem;
      color: #2d3748;
      line-height: 1.6;
    }
  }
}

// 场景卡片网格
.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 18px;
  margin-top: 10px;
}

// 场景卡片样式
.scenario-card {
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #edf2f7;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }

  .scenario-icon {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    background-color: #f0f7ff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;

    i {
      color: #3182ce;
      font-size: 1rem;
    }
  }

  .scenario-title {
    font-size: 1.05rem;
    color: #2d3748;
    margin: 0 0 8px;
    font-weight: 600;
  }

  .scenario-desc {
    font-size: 0.9rem;
    color: #4a5568;
    margin: 0;
    line-height: 1.5;
  }
}

// 页脚样式
.page-footer {
  text-align: center;
  margin-top: 60px;
  padding-top: 20px;
  border-top: 1px solid #eaeaea;
  color: #718096;
  font-size: 0.9rem;

  p {
    margin: 0;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .git-guide-container {
    padding: 15px;
  }

  .page-header h1 {
    font-size: 1.8rem;
  }

  .content-section {
    padding: 20px;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .scenarios-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .scenarios-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-wrap: wrap;

    .section-divider {
      width: 100%;
      margin: 10px 0 0;
    }
  }

  .content-section {
    padding: 15px;
  }
}
</style>
