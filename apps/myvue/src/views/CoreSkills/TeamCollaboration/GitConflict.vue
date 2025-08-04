<template>
  <div class="git-conflict-container">
    <div class="hero-section">
      <div class="hero-content">
        <h1>Git冲突解决指南</h1>
        <p>掌握Git分支合并冲突的识别、分析与解决</p>
        <div class="conflict-visualization">
          <div class="branch left-branch">
            <div class="branch-name">feature/login</div>
            <div class="commit" v-for="i in 3" :key="'left-' + i"></div>
          </div>

          <div class="conflict-area">
            <div class="conflict-icon">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="conflict-text">冲突区域</div>
          </div>

          <div class="branch right-branch">
            <div class="branch-name">main</div>
            <div class="commit" v-for="i in 3" :key="'right-' + i"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- 冲突概述 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-exclamation-circle"></i>
          <h2>什么是Git冲突？</h2>
        </div>
        <div class="section-content">
          <div class="conflict-overview">
            <p>当Git无法自动合并不同分支上的更改时，就会发生冲突。这通常发生在：</p>

            <div class="conflict-reasons">
              <div class="reason-card">
                <i class="fas fa-code"></i>
                <h3>同一文件的相同位置</h3>
                <p>两个分支修改了同一文件的相同行</p>
              </div>

              <div class="reason-card">
                <i class="fas fa-trash-alt"></i>
                <h3>删除与修改冲突</h3>
                <p>一个分支删除了文件，另一个分支修改了该文件</p>
              </div>

              <div class="reason-card">
                <i class="fas fa-copy"></i>
                <h3>文件重命名冲突</h3>
                <p>一个分支重命名了文件，另一个分支修改了该文件</p>
              </div>
            </div>

            <div class="conflict-example">
              <h3><i class="fas fa-file-code"></i> 冲突文件示例</h3>
              <pre class="code-block"><<<<<<< HEAD
console.log("当前分支的更改");
=======
console.log("合并分支的更改");
>>>>>>> feature/login</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 解决步骤 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-wrench"></i>
          <h2>解决冲突的步骤</h2>
        </div>
        <div class="section-content">
          <div class="resolution-steps">
            <div class="step" v-for="(step, index) in resolutionSteps" :key="index">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
                <div v-if="step.command" class="step-command">
                  <pre>{{ step.command }}</pre>
                </div>
                <div v-if="step.tip" class="step-tip">
                  <i class="fas fa-lightbulb"></i> {{ step.tip }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 解决工具 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-tools"></i>
          <h2>冲突解决工具</h2>
        </div>
        <div class="section-content">
          <div class="tools-grid">
            <div class="tool-card">
              <div class="tool-icon cli">
                <i class="fas fa-terminal"></i>
              </div>
              <h3>命令行工具</h3>
              <ul>
                <li>内置diff/patch工具</li>
                <li>git mergetool命令</li>
                <li>完全控制权</li>
              </ul>
              <div class="tool-command">
                <pre>git mergetool</pre>
              </div>
            </div>

            <div class="tool-card">
              <div class="tool-icon gui">
                <i class="fas fa-desktop"></i>
              </div>
              <h3>GUI工具</h3>
              <ul>
                <li>VS Code GitLens</li>
                <li>SourceTree</li>
                <li>GitKraken</li>
                <li>IntelliJ IDEA</li>
              </ul>
              <div class="tool-screenshot">
                <div class="screenshot-placeholder">
                  <i class="fas fa-image"></i>
                  <span>GUI合并工具界面</span>
                </div>
              </div>
            </div>

            <div class="tool-card">
              <div class="tool-icon online">
                <i class="fas fa-cloud"></i>
              </div>
              <h3>在线平台</h3>
              <ul>
                <li>GitHub冲突解决器</li>
                <li>GitLab合并请求</li>
                <li>Bitbucket冲突解决</li>
              </ul>
              <div class="tool-benefits">
                <div class="benefit">
                  <i class="fas fa-check-circle"></i>
                  <span>无需本地设置</span>
                </div>
                <div class="benefit">
                  <i class="fas fa-check-circle"></i>
                  <span>团队协作方便</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-star"></i>
          <h2>避免冲突的最佳实践</h2>
        </div>
        <div class="section-content">
          <div class="best-practices">
            <div class="practice-card" v-for="(practice, index) in bestPractices" :key="index">
              <div class="practice-header">
                <div class="practice-icon">
                  <i :class="practice.icon"></i>
                </div>
                <h3>{{ practice.title }}</h3>
              </div>
              <p>{{ practice.description }}</p>
              <div class="practice-tip">
                <i class="fas fa-info-circle"></i> {{ practice.tip }}
              </div>
            </div>
          </div>

          <div class="workflow-comparison">
            <h3><i class="fas fa-project-diagram"></i> 工作流比较</h3>
            <div class="workflow-chart">
              <div class="workflow" v-for="(flow, index) in workflows" :key="index">
                <div class="workflow-name">{{ flow.name }}</div>
                <div class="workflow-bar" :style="{ width: flow.conflictRate + '%' }">
                  <div class="workflow-value">{{ flow.conflictRate }}%</div>
                </div>
                <div class="workflow-desc">{{ flow.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 常见问题 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-question-circle"></i>
          <h2>常见问题解答</h2>
        </div>
        <div class="section-content">
          <div class="faq-list">
            <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
              <div class="faq-question" @click="toggleFaq(index)">
                <i class="fas fa-question"></i>
                <h3>{{ faq.question }}</h3>
                <i :class="['fas', expandedFaqs[index] ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
              </div>
              <div class="faq-answer" v-if="expandedFaqs[index]">
                <p>{{ faq.answer }}</p>
                <div v-if="faq.command" class="faq-command">
                  <pre>{{ faq.command }}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="summary-section">
        <h3><i class="fas fa-check-circle"></i> 冲突解决要点总结</h3>
        <div class="summary-grid">
          <div class="summary-item">
            <i class="fas fa-search"></i>
            <p>识别冲突文件</p>
          </div>
          <div class="summary-item">
            <i class="fas fa-file-edit"></i>
            <p>手动解决冲突</p>
          </div>
          <div class="summary-item">
            <i class="fas fa-check-square"></i>
            <p>标记为已解决</p>
          </div>
          <div class="summary-item">
            <i class="fas fa-share-square"></i>
            <p>完成合并提交</p>
          </div>
          <div class="summary-item">
            <i class="fas fa-sync-alt"></i>
            <p>定期合并主分支</p>
          </div>
          <div class="summary-item">
            <i class="fas fa-users"></i>
            <p>团队沟通协作</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>Git冲突解决指南 | 高效团队协作的关键技能</p>
      <div class="footer-links">
        <a href="#"><i class="fab fa-git-alt"></i> 官方Git文档</a>
        <a href="#"><i class="fab fa-github"></i> GitHub冲突解决教程</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 解决步骤数据
const resolutionSteps = ref([
  {
    title: "识别冲突",
    description: "当合并或拉取操作失败时，Git会显示冲突信息",
    command: "git merge feature/login\nCONFLICT (content): Merge conflict in src/app.js",
    tip: "使用 git status 查看所有冲突文件"
  },
  {
    title: "打开冲突文件",
    description: "在编辑器中打开冲突文件，查找冲突标记",
    command: "code src/app.js",
    tip: "搜索 <<<<<<< 快速定位冲突位置"
  },
  {
    title: "分析冲突",
    description: "比较不同分支的更改，理解冲突原因",
    command: "",
    tip: "使用 git diff 查看具体差异"
  },
  {
    title: "解决冲突",
    description: "手动编辑文件，选择保留的更改或组合两者",
    command: "// 保留当前分支更改\nconsole.log('当前分支的更改');\n\n// 或保留合并分支更改\nconsole.log('合并分支的更改');\n\n// 或组合两者\nconsole.log('组合后的更改');",
    tip: "删除所有冲突标记 (<<<<<<<, =======, >>>>>>>)"
  },
  {
    title: "标记为已解决",
    description: "使用git add将解决后的文件标记为已解决",
    command: "git add src/app.js",
    tip: "对每个冲突文件重复此操作"
  },
  {
    title: "完成合并",
    description: "所有冲突解决后，完成合并提交",
    command: "git commit -m 'Merge feature/login and resolve conflicts'",
    tip: "使用 git merge --continue 继续中断的合并"
  },
  {
    title: "验证更改",
    description: "运行测试确保代码功能正常",
    command: "npm test",
    tip: "在推送前验证冲突解决是否正确"
  }
]);

// 最佳实践数据
const bestPractices = ref([
  {
    icon: "fas fa-sync-alt",
    title: "频繁合并主分支",
    description: "定期将主分支合并到你的特性分支，减少大范围冲突的可能性",
    tip: "每天至少合并一次主分支"
  },
  {
    icon: "fas fa-users",
    title: "团队沟通",
    description: "在修改共享文件前与团队成员协调，避免同时修改相同文件",
    tip: "使用团队聊天工具或站会沟通工作计划"
  },
  {
    icon: "fas fa-code-branch",
    title: "小范围提交",
    description: "保持提交小而专注，减少每个提交的影响范围",
    tip: "每个提交只解决一个问题或实现一个功能"
  },
  {
    icon: "fas fa-file-contract",
    title: "明确接口",
    description: "在团队协作中明确定义模块接口，减少重叠修改",
    tip: "使用TypeScript接口或JSDoc定义清晰接口"
  }
]);

// 工作流数据
const workflows = ref([
  { name: "主干开发", conflictRate: 35, description: "所有开发在main分支，冲突频率高" },
  { name: "Git Flow", conflictRate: 20, description: "功能分支+发布分支，中等冲突" },
  { name: "Trunk Based", conflictRate: 15, description: "短生命分支，冲突较少" },
  { name: "Feature Flags", conflictRate: 10, description: "功能开关，最小化冲突" }
]);

// 常见问题数据
const faqs = ref([
  {
    question: "如何取消合并操作？",
    answer: "如果在解决冲突过程中想放弃合并，可以使用以下命令：",
    command: "git merge --abort"
  },
  {
    question: "解决冲突后为什么还需要提交？",
    answer: "解决冲突后需要提交来完成合并操作。这个提交是特殊的合并提交，记录了分支合并的历史。"
  },
  {
    question: "如何避免二进制文件的冲突？",
    answer: "对于二进制文件（如图片、文档），Git无法自动合并。最佳实践是锁定文件或确保一次只有一个人修改二进制文件。"
  },
  {
    question: "为什么有时解决冲突后代码无法运行？",
    answer: "可能原因是手动解决冲突时引入了语法错误，或组合了不兼容的更改。解决冲突后务必运行测试。"
  }
]);

// 展开的FAQ索引
const expandedFaqs = ref(faqs.value.map(() => false));

// 切换FAQ展开状态
const toggleFaq = (index: number) => {
  expandedFaqs.value[index] = !expandedFaqs.value[index];
};
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.git-conflict-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2d3748;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.hero-section {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
  border-radius: 12px;
  color: white;
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
  padding: 40px 20px;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
    z-index: 0;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 15px;
      letter-spacing: -0.5px;
    }

    p {
      font-size: 1.3rem;
      font-weight: 300;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto 30px;
    }
  }
}

.conflict-visualization {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-top: 40px;
  position: relative;
}

.branch {
  display: flex;
  flex-direction: column;
  align-items: center;

  .branch-name {
    font-weight: 600;
    margin-bottom: 15px;
    padding: 5px 15px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.2);
  }

  .commit {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    margin: 10px 0;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -15px;
      width: 2px;
      height: 15px;
      background: white;
    }

    &:last-child::after {
      display: none;
    }
  }
}

.left-branch .commit {
  background: #4ecdc4;
}

.right-branch .commit {
  background: #1a73e8;
}

.conflict-area {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
  color: #ff6b6b;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  .conflict-icon {
    font-size: 3rem;
    margin-bottom: 10px;
  }

  .conflict-text {
    font-weight: 700;
    font-size: 1.2rem;
  }
}

.content-wrapper {
  padding: 0 20px;
}

.section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  margin-bottom: 30px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
}

.section-header {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  background: linear-gradient(90deg, #ff6b6b, #ff8e8e);
  color: white;

  .icon {
    font-size: 1.8rem;
    margin-right: 15px;
  }

  h2 {
    margin: 0;
    font-size: 1.7rem;
    font-weight: 600;
  }
}

.section-content {
  padding: 25px;

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4a5568;
    margin-bottom: 20px;
  }
}

.conflict-reasons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.reason-card {
  background: #fff5f5;
  border-radius: 10px;
  padding: 25px;
  text-align: center;
  border: 1px solid #ffd6d6;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(255, 107, 107, 0.1);
  }

  i {
    font-size: 2.5rem;
    color: #ff6b6b;
    margin-bottom: 15px;
  }

  h3 {
    margin: 0 0 15px;
    color: #c53030;
  }

  p {
    margin: 0;
    font-size: 1rem;
  }
}

.conflict-example {
  background: #2d3748;
  border-radius: 10px;
  padding: 20px;
  margin-top: 30px;

  h3 {
    display: flex;
    align-items: center;
    color: #e2e8f0;
    margin-top: 0;

    i {
      margin-right: 10px;
    }
  }
}

.code-block {
  background: #1a202c;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  overflow-x: auto;
  line-height: 1.6;
  margin: 0;

  .conflict-marker {
    color: #ff6b6b;
    font-weight: bold;
  }
}

.resolution-steps {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.step {
  display: flex;
  gap: 20px;
  align-items: flex-start;

  .step-number {
    background: #ff6b6b;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .step-content {
    flex: 1;

    h3 {
      margin-top: 0;
      margin-bottom: 10px;
      color: #1a202c;
    }

    p {
      margin-bottom: 15px;
    }
  }

  .step-command {
    background: #f8fafc;
    border-left: 3px solid #ff6b6b;
    border-radius: 0 6px 6px 0;
    padding: 15px;
    margin: 15px 0;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;

    pre {
      margin: 0;
      white-space: pre-wrap;
    }
  }

  .step-tip {
    background: #e0f2fe;
    border-radius: 6px;
    padding: 10px 15px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
    color: #0c4a6e;

    i {
      color: #0ea5e9;
    }
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.tool-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .tool-icon {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: white;

    &.cli {
      background: linear-gradient(90deg, #4ecdc4, #88d3ce);
    }

    &.gui {
      background: linear-gradient(90deg, #1a73e8, #4d8eea);
    }

    &.online {
      background: linear-gradient(90deg, #8b5cf6, #a78bfa);
    }
  }

  h3 {
    text-align: center;
    margin: 20px 0 15px;
    color: #1a202c;
  }

  ul {
    padding-left: 20px;
    margin: 0 20px 20px;

    li {
      margin-bottom: 10px;
      line-height: 1.5;
    }
  }

  .tool-command {
    background: #f8fafc;
    padding: 12px;
    text-align: center;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    margin: 0 15px 15px;
    border-radius: 6px;
  }

  .tool-screenshot {
    padding: 0 15px 20px;

    .screenshot-placeholder {
      height: 150px;
      background: #f1f5f9;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #94a3b8;
      font-weight: 500;

      i {
        font-size: 2rem;
        margin-bottom: 10px;
      }
    }
  }

  .tool-benefits {
    padding: 0 20px 20px;

    .benefit {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
      color: #334155;

      i {
        color: #10b981;
      }
    }
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.practice-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.06);
  }

  .practice-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;

    .practice-icon {
      width: 45px;
      height: 45px;
      background: #e0f2fe;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      color: #0ea5e9;
    }

    h3 {
      margin: 0;
      color: #1e293b;
    }
  }

  p {
    margin-bottom: 15px;
    font-size: 1rem;
  }

  .practice-tip {
    background: #f0f9ff;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 0.9rem;
    color: #0369a1;

    i {
      margin-right: 5px;
    }
  }
}

.workflow-comparison {
  background: #f8fafc;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #e2e8f0;

  h3 {
    display: flex;
    align-items: center;
    margin-top: 0;
    color: #1e293b;

    i {
      margin-right: 10px;
      color: #8b5cf6;
    }
  }
}

.workflow-chart {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.workflow {
  .workflow-name {
    font-weight: 600;
    margin-bottom: 5px;
    color: #334155;
  }

  .workflow-bar {
    height: 30px;
    background: linear-gradient(90deg, #4ecdc4, #1a73e8);
    border-radius: 15px;
    position: relative;
    transition: width 1s ease;

    .workflow-value {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: white;
      font-weight: 600;
    }
  }

  .workflow-desc {
    font-size: 0.9rem;
    color: #64748b;
    margin-top: 5px;
  }
}

.faq-list {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.faq-item {
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
}

.faq-question {
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  background: white;
  transition: background 0.3s ease;

  &:hover {
    background: #f8fafc;
  }

  i:first-child {
    color: #ff6b6b;
    margin-right: 15px;
    font-size: 1.2rem;
  }

  h3 {
    margin: 0;
    flex: 1;
    font-size: 1.1rem;
    color: #1e293b;
  }

  i:last-child {
    color: #94a3b8;
    transition: transform 0.3s ease;
  }
}

.faq-answer {
  padding: 0 20px 20px 60px;
  background: #f8fafc;
  animation: fadeIn 0.3s ease;

  p {
    margin-bottom: 15px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.faq-command {
  background: #e2e8f0;
  border-radius: 6px;
  padding: 12px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;

  pre {
    margin: 0;
    white-space: pre-wrap;
  }
}

.summary-section {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 40px;

  h3 {
    display: flex;
    align-items: center;
    margin-top: 0;
    font-size: 1.5rem;

    i {
      margin-right: 15px;
    }
  }
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  padding: 20px 15px;
  border-radius: 8px;
  text-align: center;

  i {
    font-size: 2rem;
    margin-bottom: 15px;
    color: #ffd6d6;
  }

  p {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 500;
  }
}

.footer {
  text-align: center;
  padding: 25px;
  color: #64748b;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 15px;

    a {
      color: #ff6b6b;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .hero-section .hero-content h1 {
    font-size: 2rem;
  }

  .hero-section .hero-content p {
    font-size: 1.1rem;
  }

  .conflict-visualization {
    flex-direction: column;
    gap: 30px;
  }

  .section-header h2 {
    font-size: 1.4rem !important;
  }

  .step {
    flex-direction: column;
    align-items: flex-start;

    .step-number {
      margin-bottom: 15px;
    }
  }

  .faq-question {
    padding: 15px;

    h3 {
      font-size: 1rem;
    }
  }

  .faq-answer {
    padding: 0 15px 15px 15px;
  }
}
</style>
