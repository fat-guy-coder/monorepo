<template>
  <div class="sandbox-container">
    <div class="header">
      <h1><i class="icon icon-sandbox"></i> JavaScript 沙箱实现技术</h1>
      <p>安全执行不受信任代码的隔离环境解决方案</p>
    </div>

    <div class="content-grid">
      <!-- 沙箱介绍 -->
      <div class="section-card intro-card">
        <div class="card-header">
          <i class="icon icon-info"></i>
          <h2>沙箱技术概述</h2>
        </div>
        <div class="card-content">
          <div class="intro-content">
            <div class="definition">
              <h3>什么是沙箱？</h3>
              <p>沙箱是一种安全机制，用于隔离运行环境，允许执行不受信任的代码而不会影响主应用程序或系统。</p>
            </div>

            <div class="sandbox-types">
              <h3>沙箱实现方式</h3>
              <div class="type-cards">
                <div class="type-card">
                  <div class="type-icon">
                    <i class="icon icon-proxy"></i>
                  </div>
                  <h4>Proxy 沙箱</h4>
                  <p>使用ES6 Proxy拦截对象访问</p>
                  <div class="type-tag">轻量级</div>
                </div>
                <div class="type-card">
                  <div class="type-icon">
                    <i class="icon icon-snapshot"></i>
                  </div>
                  <h4>快照沙箱</h4>
                  <p>记录并恢复全局状态</p>
                  <div class="type-tag">兼容性好</div>
                </div>
              </div>
            </div>
          </div>

          <div class="sandbox-diagram">
            <div class="diagram-container">
              <div class="diagram-title">沙箱工作原理</div>
              <div class="global-env">全局环境</div>
              <div class="sandbox-box">
                <div class="sandbox-title">沙箱环境</div>
                <div class="proxy-part">
                  <div class="proxy-label">Proxy 拦截</div>
                  <div class="proxy-arrow">⇅</div>
                </div>
                <div class="execution-part">
                  <div class="code-box">用户代码执行</div>
                </div>
              </div>
              <div class="snapshot-part">
                <div class="snapshot-label">快照存储</div>
                <div class="snapshot-icon">📸</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="choose-box">
        <div class="choose-item" :style="{ background: chooseType === 'proxy' ? '#5e35b1' : 'transparent' }"
          @click="choose('proxy')">
          Proxy 沙箱实现
        </div>
        <div class="choose-item" :style="{ background: chooseType === 'snapshot' ? '#5e35b1' : 'transparent' }"
          @click="choose('snapshot')">
          快照 沙箱实现
        </div>
        <div class="choose-item" :style="{ background: chooseType === 'compare' ? '#5e35b1' : 'transparent' }"
          @click="choose('compare')">
          对比
        </div>
      </div>

      <!-- 快照沙箱实现 -->
      <div class="section-card" v-show="chooseType === 'snapshot'">
        <div class="card-header">
          <i class="icon icon-snapshot"></i>
          <h2>快照沙箱实现</h2>
        </div>
        <div class="card-content">
          <div class="implementation-details">
            <h3>实现思路</h3>
            <ol class="steps">
              <li>激活沙箱时记录全局状态快照</li>
              <li>执行用户代码，允许修改全局状态</li>
              <li>卸载沙箱时恢复原始全局状态</li>
              <li>记录修改的属性以便下次恢复</li>
              <li>使用diff算法高效恢复状态</li>
            </ol>

            <div class="pros-cons">
              <div class="pros">
                <h4><i class="icon icon-check"></i> 优点</h4>
                <ul>
                  <li>兼容性好（支持IE11）</li>
                  <li>实现简单，无需Proxy</li>
                  <li>能处理所有全局变量修改</li>
                  <li>支持多实例（顺序执行）</li>
                </ul>
              </div>
              <div class="cons">
                <h4><i class="icon icon-warning"></i> 缺点</h4>
                <ul>
                  <li>全局状态切换有性能开销</li>
                  <li>无法同时激活多个沙箱</li>
                  <li>无法拦截DOM操作</li>
                  <li>无法防止原型链污染</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Proxy 沙箱实现 -->
      <div class="section-card" v-show="chooseType === 'proxy'">
        <div class="card-header">
          <i class="icon icon-proxy"></i>
          <h2>Proxy 沙箱实现</h2>
        </div>
        <div class="card-content">
          <div class="implementation-details">
            <h3>实现思路</h3>
            <ol class="steps">
              <li>创建沙箱环境对象（fakeWindow）</li>
              <li>使用Proxy包装fakeWindow</li>
              <li>拦截所有属性访问操作</li>
              <li>限制危险API访问（如window, document）</li>
              <li>提供白名单机制允许安全访问</li>
              <li>在闭包中执行用户代码</li>
            </ol>

            <div class="pros-cons">
              <div class="pros">
                <h4><i class="icon icon-check"></i> 优点</h4>
                <ul>
                  <li>轻量级，性能开销小</li>
                  <li>无需额外DOM元素</li>
                  <li>细粒度控制属性访问</li>
                  <li>支持多实例并行</li>
                </ul>
              </div>
              <div class="cons">
                <h4><i class="icon icon-warning"></i> 缺点</h4>
                <ul>
                  <li>无法完全隔离DOM操作</li>
                  <li>不支持CSS样式隔离</li>
                  <li>ES6 Proxy兼容性问题</li>
                  <li>无法拦截未代理的API</li>
                </ul>
              </div>
            </div>
          </div>


        </div>
      </div>

      <div class="code-section" v-show="chooseType === 'proxy' || chooseType === 'snapshot'">
        <h3>示例代码</h3>
        <CodeBlock :code="code1" language="ts" />
      </div>

      <!-- 高级技术与对比 -->
      <div class="section-card" v-show="chooseType === 'compare'">
        <div class="card-header">
          <i class="icon icon-compare"></i>
          <h2>技术对比与高级实现</h2>
        </div>
        <div class="card-content">
          <div class="comparison">
            <h3>Proxy沙箱 vs 快照沙箱</h3>
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>Proxy沙箱</th>
                    <th>快照沙箱</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>实现原理</td>
                    <td>对象访问拦截</td>
                    <td>状态记录/恢复</td>
                  </tr>
                  <tr>
                    <td>兼容性</td>
                    <td>IE不支持</td>
                    <td>全浏览器支持</td>
                  </tr>
                  <tr>
                    <td>性能开销</td>
                    <td>低（访问时）</td>
                    <td>高（切换时）</td>
                  </tr>
                  <tr>
                    <td>多实例支持</td>
                    <td>并行支持</td>
                    <td>顺序支持</td>
                  </tr>
                  <tr>
                    <td>DOM隔离</td>
                    <td>部分</td>
                    <td>无</td>
                  </tr>
                  <tr>
                    <td>适用场景</td>
                    <td>现代浏览器微前端</td>
                    <td>兼容性要求高的系统</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="advanced-techniques">
            <h3>增强沙箱安全性</h3>
            <div class="technique-cards">
              <div class="technique">
                <div class="tech-icon">
                  <i class="icon icon-csp"></i>
                </div>
                <h4>内容安全策略 (CSP)</h4>
                <p>通过HTTP头限制资源加载和执行</p>
              </div>
              <div class="technique">
                <div class="tech-icon">
                  <i class="icon icon-timeout"></i>
                </div>
                <h4>执行超时控制</h4>
                <p>防止无限循环和长时间阻塞</p>
              </div>
              <div class="technique">
                <div class="tech-icon">
                  <i class="icon icon-memory"></i>
                </div>
                <h4>内存限制</h4>
                <p>监控内存使用，防止内存泄漏攻击</p>
              </div>
            </div>
          </div>

          <div class="best-practices">
            <h3>最佳实践</h3>
            <ul>
              <li>
                <i class="icon icon-check-circle"></i>
                <div>
                  <strong>严格的白名单机制</strong>
                  <p>仅允许访问必要的安全API</p>
                </div>
              </li>
              <li>
                <i class="icon icon-check-circle"></i>
                <div>
                  <strong>输入验证</strong>
                  <p>严格验证所有输入和执行参数</p>
                </div>
              </li>
              <li>
                <i class="icon icon-check-circle"></i>
                <div>
                  <strong>错误隔离</strong>
                  <p>确保沙箱内错误不会影响主应用</p>
                </div>
              </li>
              <li>
                <i class="icon icon-check-circle"></i>
                <div>
                  <strong>资源限制</strong>
                  <p>限制CPU和内存使用，防止资源耗尽</p>
                </div>
              </li>
              <li>
                <i class="icon icon-check-circle"></i>
                <div>
                  <strong>沙箱回收</strong>
                  <p>使用后及时销毁沙箱实例释放资源</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>沙箱实现技术总结 | 安全执行不受信任代码的关键技术</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CodeBlock from '@/components/CodeBlock.vue';


const code1 = ref('');
const chooseType = ref<'proxy' | 'snapshot' | 'compare'>('proxy');
onMounted(async () => {
  code1.value = await import('./sanbox').then(res => res.proxySandbox);
})




const choose = async (type: 'proxy' | 'snapshot' | 'compare') => {
  chooseType.value = type;
  if (type === 'proxy') {
    code1.value = await import('./sanbox').then(res => res.proxySandbox);
  } else if (type === 'snapshot') {
    code1.value = await import('./sanbox').then(res => res.snapshotSandbox);
  } else {
    code1.value = ''
  }

}

// 本组件仅用于展示沙箱实现技术，无复杂逻辑
</script>

<style lang="less" scoped>
@primary-color: #5e35b1;
@secondary-color: #3949ab;
@text-color: #2d3748;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e2e8f0;
@success-color: #4caf50;
@warning-color: #ff9800;
@error-color: #f44336;
@muted-color: #718096;

.sandbox-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%);
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  color: @text-color;
  min-height: 100vh;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, @primary-color 0%, @secondary-color 100%);
    border-radius: 16px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);

    h1 {
      font-size: 2.4rem;
      color: white;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    p {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.85);
      max-width: 600px;
      margin: 0 auto;
    }
  }

  .choose-box {
    display: flex;
    gap: 1.8rem;
    margin: 2rem 0;
    justify-content: center;


    .choose-item {
      background: @light-bg;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
    }

  }

  .content-grid {

    gap: 1.8rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .section-card {
    background: @card-bg;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    &.intro-card {
      grid-column: 1 / -1;
    }
  }

  .card-header {
    background: linear-gradient(135deg, @primary-color 0%, lighten(@primary-color, 5%) 100%);
    padding: 1.2rem 1.8rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: white;
      margin: 0;
    }
  }

  .card-content {
    padding: 1.8rem;

    h3 {
      font-size: 1.3rem;
      color: darken(@primary-color, 10%);
      margin-top: 0;
      margin-bottom: 1.2rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid @border-color;
    }
  }

  .intro-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .definition {
    background: lighten(@primary-color, 55%);
    border-radius: 12px;
    padding: 1.5rem;
    border-left: 4px solid @primary-color;

    h3 {
      color: @primary-color;
      border: none;
      padding: 0;
      margin-top: 0;
    }

    p {
      line-height: 1.6;
    }
  }

  .sandbox-types {
    h3 {
      color: @primary-color;
      border: none;
      padding: 0;
      margin-top: 0;
    }
  }

  .type-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .type-card {
    background: @light-bg;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .type-icon {
      width: 70px;
      height: 70px;
      background: lighten(@primary-color, 45%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-size: 2rem;
      color: @primary-color;
    }

    h4 {
      margin: 0 0 0.5rem;
      color: darken(@primary-color, 10%);
    }

    p {
      margin: 0 0 1rem;
      color: @muted-color;
      font-size: 0.95rem;
    }
  }

  .type-tag {
    display: inline-block;
    background: @primary-color;
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .sandbox-diagram {
    background: lighten(@primary-color, 55%);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    margin-top: 1.5rem;
  }

  .diagram-container {
    max-width: 600px;
    margin: 0 auto;
    position: relative;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  }

  .diagram-title {
    font-weight: bold;
    color: @primary-color;
    margin-bottom: 1.5rem;
  }

  .global-env {
    background: lighten(@success-color, 50%);
    border: 2px dashed @success-color;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }

  .sandbox-box {
    border: 2px solid @primary-color;
    border-radius: 8px;
    padding: 1.5rem;
    position: relative;
  }

  .sandbox-title {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 0 1rem;
    color: @primary-color;
    font-weight: bold;
  }

  .proxy-part {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .proxy-label {
    background: lighten(@primary-color, 40%);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 500;
  }

  .proxy-arrow {
    font-size: 1.5rem;
    margin: 0 1rem;
    color: @primary-color;
  }

  .execution-part {
    background: lighten(@primary-color, 50%);
    border-radius: 8px;
    padding: 1rem;
  }

  .code-box {
    background: @primary-color;
    color: white;
    padding: 0.8rem;
    border-radius: 6px;
    font-weight: 500;
  }

  .snapshot-part {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .snapshot-label {
    background: lighten(@warning-color, 40%);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 500;
    margin-right: 1rem;
  }

  .snapshot-icon {
    font-size: 1.8rem;
  }

  .implementation-details {
    margin-bottom: 2rem;
  }

  .steps {
    background: lighten(@primary-color, 55%);
    border-radius: 12px;
    padding: 1.5rem 1.5rem 1.5rem 2.5rem;
    margin-bottom: 1.5rem;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.5;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .pros,
  .cons {
    background: @card-bg;
    border-radius: 12px;
    padding: 1.2rem;
    border: 1px solid @border-color;

    h4 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0;
      margin-bottom: 0.8rem;
    }
  }

  .pros {
    border-top: 4px solid @success-color;
  }

  .cons {
    border-top: 4px solid @warning-color;
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }
  }

  .code-section {
    background: #2d2d2d;
    border-radius: 12px;
    overflow: hidden;

    h3 {
      background: #1e1e1e;
      color: #dcdcdc;
      margin: 0;
      padding: 0.8rem 1.5rem;
      border-bottom: 1px solid #3c3c3c;
    }

    pre {
      margin: 0;
      padding: 1.5rem;
      overflow-x: auto;
    }

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      color: #dcdcdc;
    }
  }

  .comparison {
    margin-bottom: 2rem;
  }

  .comparison-table {
    overflow-x: auto;
    margin-bottom: 2rem;

    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 12px;
      overflow: hidden;
    }

    th,
    td {
      padding: 1rem;
      text-align: center;
      border: 1px solid @border-color;
    }

    th {
      background: lighten(@primary-color, 40%);
      color: darken(@primary-color, 15%);
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: lighten(@primary-color, 53%);
    }
  }

  .advanced-techniques {
    margin-bottom: 2rem;

    h3 {
      color: darken(@primary-color, 10%);
    }
  }

  .technique-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .technique {
    background: @light-bg;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;

    .tech-icon {
      width: 60px;
      height: 60px;
      background: lighten(@primary-color, 45%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-size: 1.8rem;
      color: @primary-color;
    }

    h4 {
      margin: 0 0 0.5rem;
      color: darken(@primary-color, 10%);
    }

    p {
      margin: 0;
      color: @muted-color;
      font-size: 0.95rem;
    }
  }

  .best-practices {
    margin-bottom: 1rem;

    h3 {
      color: darken(@primary-color, 10%);
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.2rem;
        align-items: flex-start;

        i {
          color: @success-color;
          font-size: 1.4rem;
          margin-top: 0.2rem;
        }

        strong {
          display: block;
          margin-bottom: 0.3rem;
        }

        p {
          margin: 0;
          color: @muted-color;
        }
      }
    }
  }

  .footer {
    text-align: center;
    color: @muted-color;
    font-size: 0.9rem;
    padding-top: 2rem;
    margin-top: 1rem;
    border-top: 1px solid @border-color;
  }

  // 图标样式
  .icon {
    font-size: 1.6rem;

    &-sandbox:before {
      content: "📦";
    }

    &-info:before {
      content: "ℹ️";
    }

    &-proxy:before {
      content: "🔒";
    }

    &-snapshot:before {
      content: "📸";
    }

    &-compare:before {
      content: "⚖️";
    }

    &-check:before {
      content: "✅";
    }

    &-warning:before {
      content: "⚠️";
    }

    &-csp:before {
      content: "🛡️";
    }

    &-timeout:before {
      content: "⏱️";
    }

    &-memory:before {
      content: "💾";
    }

    &-check-circle:before {
      content: "✔️";
    }
  }
}
</style>
