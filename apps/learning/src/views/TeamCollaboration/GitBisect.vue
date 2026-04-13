<template>
  <div class="bisect-container">
    <div class="intro-card">
      <div class="header">
        <h1>
          <span class="icon">🔀</span>
          Git Bisect
        </h1>
        <p class="subtitle">二分查找定位 bug 引入提交</p>
      </div>

      <!-- 作用区域 -->
      <section class="section">
        <div class="section-header">
          <span class="section-icon">🎯</span>
          <h2>作用</h2>
        </div>
        <p class="section-content">
          <strong>git bisect</strong> 使用二分搜索算法，帮助你在提交历史中快速定位引入 bug 的那一次提交。
          你只需告诉 Git 一个“好”的提交（无 bug）和一个“坏”的提交（有 bug），
          Git 会自动检出中间的提交供你测试，根据测试结果反复缩小范围，直至精准找到罪魁祸首。
        </p>
      </section>

      <!-- 使用方法区域 -->
      <section class="section">
        <div class="section-header">
          <span class="section-icon">📋</span>
          <h2>使用方法</h2>
        </div>
        <div class="usage-block">
          <h3>🔹 基本流程</h3>
          <div class="steps">
            <div class="step-item">
              <span class="step-num">1</span>
              <div class="step-content">
                <div class="step-title">启动 bisect</div>
                <code class="command">git bisect start</code>
              </div>
            </div>
            <div class="step-item">
              <span class="step-num">2</span>
              <div class="step-content">
                <div class="step-title">标记当前坏提交</div>
                <code class="command">git bisect bad</code>
                <span class="muted">（或指定 commit）</span>
              </div>
            </div>
            <div class="step-item">
              <span class="step-num">3</span>
              <div class="step-content">
                <div class="step-title">标记一个好提交</div>
                <code class="command">git bisect good &lt;commit&gt;</code>
              </div>
            </div>
            <div class="step-item">
              <span class="step-num">4</span>
              <div class="step-content">
                <div class="step-title">测试当前版本</div>
                <div class="desc">Git 会自动切换到一个中间提交，运行你的测试。</div>
              </div>
            </div>
            <div class="step-item">
              <span class="step-num">5</span>
              <div class="step-content">
                <div class="step-title">标记结果</div>
                <div class="command-group">
                  <code class="command">git bisect good</code> (如果测试通过) <br />
                  <code class="command">git bisect bad</code> (如果测试失败)
                </div>
              </div>
            </div>
            <div class="step-item">
              <span class="step-num">6</span>
              <div class="step-content">
                <div class="step-title">重复直至完成</div>
                <div class="desc">Git 会持续缩小范围，最后输出第一个引入 bug 的提交。</div>
              </div>
            </div>
            <div class="step-item">
              <span class="step-num">7</span>
              <div class="step-content">
                <div class="step-title">结束 bisect</div>
                <code class="command">git bisect reset</code>
                <span class="muted">（回到原始分支状态）</span>
              </div>
            </div>
          </div>

          <h3>🤖 自动化 bisect</h3>
          <div class="auto-block">
            <p>如果你的测试可以通过脚本判断结果，使用 <code>git bisect run</code> 实现全自动定位：</p>
            <div class="code-block">
              <code>git bisect start</code>
              <code>git bisect bad HEAD</code>
              <code>git bisect good &lt;good-commit&gt;</code>
              <code>git bisect run npm test</code>
            </div>
            <p class="tip">💡 脚本返回 0 代表 good，非 0 代表 bad。</p>
          </div>
          <div class="extra-commands">
            <p><code>git bisect visualize</code> — 用图形工具查看当前二分过程</p>
            <p><code>git bisect log</code> — 查看 bisect 操作日志</p>
          </div>
        </div>
      </section>

      <!-- 适用场景区域 -->
      <section class="section">
        <div class="section-header">
          <span class="section-icon">💡</span>
          <h2>适用场景</h2>
        </div>
        <ul class="scene-list">
          <li><strong>回归问题排查</strong> — 最新版出现 bug，但之前版本正常，不知道哪次改动引入。</li>
          <li><strong>大型项目 / 高频提交</strong> — 提交历史庞大，无法逐个检查。</li>
          <li><strong>性能退化或偶现 bug</strong> — 难以通过常规调试定位，利用 bisect 高效缩小范围。</li>
          <li><strong>自动化测试集成</strong> — 配合 CI 脚本，自动找出导致测试失败的提交。</li>
        </ul>
      </section>

      <div class="footer-note">
        <span>⚡ 让 Git 帮你做二分查找，告别大海捞针式的调试。</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 纯展示组件，无需额外逻辑
</script>

<style lang="less" scoped>
.bisect-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(145deg, #f6f9fc 0%, #edf2f7 100%);
  padding: 2rem;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  box-sizing: border-box;
}

.intro-card {
  max-width: 880px;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: #ffffffec;
  border-radius: 32px;
  box-shadow: 0 20px 40px -8px rgba(0, 20, 40, 0.12), 0 8px 20px -6px rgba(0, 0, 0, 0.05);
  padding: 2.5rem 2.8rem;
  border: 1px solid rgba(255, 255, 255, 0.6);
  transition: box-shadow 0.2s ease;

  @media (max-width: 640px) {
    padding: 1.8rem 1.5rem;
  }

  &:hover {
    box-shadow: 0 24px 48px -10px rgba(0, 35, 70, 0.16);
  }
}

.header {
  margin-bottom: 2rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1.5rem;

  h1 {
    font-size: 2.8rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin: 0 0 0.25rem 0;
    color: #0b1e32;
    display: flex;
    align-items: center;
    gap: 12px;

    .icon {
      font-size: 2.4rem;
      background: #eef2ff;
      width: 54px;
      height: 54px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      box-shadow: inset 0 1px 2px white, 0 4px 8px -2px rgba(0, 35, 70, 0.08);
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: #48637c;
    margin: 0.5rem 0 0 0;
    font-weight: 400;
    letter-spacing: -0.01em;
  }
}

.section {
  margin-bottom: 2.5rem;

  &:last-of-type {
    margin-bottom: 1.2rem;
  }
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.2rem;

  .section-icon {
    font-size: 1.8rem;
    background: #f1f5f9;
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    color: #1e3a5f;
  }

  h2 {
    font-size: 1.7rem;
    font-weight: 550;
    margin: 0;
    color: #1e3a5f;
    letter-spacing: -0.01em;
  }
}

.section-content {
  font-size: 1.05rem;
  line-height: 1.6;
  color: #1f3a4e;
  margin: 0;
  padding-left: 0.5rem;

  strong {
    color: #0b2b4a;
    font-weight: 600;
  }
}

.usage-block {
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1.5rem 0 1rem 0;
    color: #1e3a5f;
    letter-spacing: -0.01em;
  }
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;

  .step-num {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    background: #e6edf6;
    color: #1e4a7a;
    font-weight: 600;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    border: 1px solid #cdddec;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  }

  .step-content {
    flex: 1;

    .step-title {
      font-weight: 600;
      color: #0b2b4a;
      margin-bottom: 4px;
      font-size: 1.05rem;
    }

    .desc {
      color: #3b5e7e;
      margin-top: 4px;
      font-size: 0.95rem;
    }
  }
}

.command {
  display: inline-block;
  background: #0f1e2c;
  color: #e2e8f0;
  padding: 4px 12px;
  border-radius: 24px;
  font-family: 'SF Mono', 'Menlo', 'Monaco', 'Cascadia Code', 'Consolas', monospace;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.2px;
  box-shadow: inset 0 0 0 1px #2d4259, 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 4px 0;
  border: none;
}

.muted {
  color: #62778b;
  font-size: 0.9rem;
  margin-left: 6px;
  font-weight: normal;
}

.command-group {
  margin-top: 6px;

  .command {
    margin-right: 4px;
  }
}

.auto-block {
  background: #f8fafd;
  border-radius: 20px;
  padding: 1.2rem 1.5rem;
  margin: 1rem 0 1.2rem 0;
  border: 1px solid #dee9f2;

  p {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #1f3a4e;
  }
}

.code-block {
  background: #0b1a26;
  padding: 1rem 1.2rem;
  border-radius: 16px;
  overflow-x: auto;
  font-family: 'SF Mono', 'Menlo', monospace;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: inset 0 1px 3px #0000001a, 0 4px 8px #00000008;

  code {
    color: #d6e6f5;
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.tip {
  margin-top: 0.8rem;
  font-size: 0.95rem;
  color: #3a6b92;
  font-style: italic;
}

.extra-commands {
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 20px 32px;
  background: #fafcff;
  padding: 0.8rem 1.2rem;
  border-radius: 18px;
  border: 1px dashed #b9cfE6;

  p {
    margin: 0;
    color: #1e405e;
    font-size: 0.95rem;

    code {
      background: #e2ebf3;
      padding: 2px 8px;
      border-radius: 24px;
      color: #103450;
      font-weight: 500;
      font-size: 0.9rem;
      margin-right: 4px;
    }
  }
}

.scene-list {
  margin: 0.5rem 0 0 0;
  padding-left: 0.2rem;
  list-style: none;

  li {
    padding: 0.6rem 0 0.6rem 2rem;
    position: relative;
    font-size: 1.05rem;
    color: #1f3a4e;
    line-height: 1.5;

    &::before {
      content: "▹";
      position: absolute;
      left: 0.2rem;
      color: #3b7eb0;
      font-size: 1.3rem;
    }

    strong {
      color: #0b2b4a;
      font-weight: 600;
    }
  }
}

.footer-note {
  margin-top: 2.5rem;
  text-align: center;
  font-size: 1rem;
  color: #48637c;
  border-top: 1px solid #dce5ec;
  padding-top: 1.5rem;
  font-weight: 450;
  letter-spacing: -0.2px;

  span {
    background: #eef4fa;
    padding: 0.3rem 1.2rem;
    border-radius: 60px;
    display: inline-block;
  }
}

code:not(.command):not(.code-block code) {
  background: #eef3f8;
  padding: 2px 8px;
  border-radius: 20px;
  font-family: 'SF Mono', 'Menlo', monospace;
  font-size: 0.9rem;
  color: #1e3a5f;
  border: 1px solid #cbdae6;
}
</style>
