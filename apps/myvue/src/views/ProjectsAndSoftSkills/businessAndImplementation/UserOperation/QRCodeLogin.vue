<template>
  <div class="qr-login-guide">
    <header>
      <h1>前端二维码登录实现指南</h1>
      <p>探索安全、便捷的二维码登录技术实现方案</p>
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">3</div>
          <div class="stat-label">核心步骤</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">5</div>
          <div class="stat-label">安全机制</div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <!-- 概述部分 -->
      <div class="section">
        <h2>📌 二维码登录概述</h2>
        <div class="overview-grid">
          <div class="overview-card">
            <h3>什么是二维码登录？</h3>
            <p>二维码登录是一种通过扫描二维码实现身份认证的方式，用户无需输入用户名密码即可快速登录系统。</p>
          </div>
          <div class="overview-card">
            <h3>为什么使用二维码登录？</h3>
            <ul>
              <li>提升用户体验：免去记忆和输入密码的麻烦</li>
              <li>增强安全性：避免键盘记录和钓鱼攻击</li>
              <li>跨设备登录：方便PC与移动设备之间的登录</li>
              <li>减少密码泄露风险：无密码传输过程</li>
            </ul>
          </div>
          <div class="overview-card">
            <h3>适用场景</h3>
            <div class="scenarios">
              <div class="scenario">Web应用登录</div>
              <div class="scenario">桌面应用授权</div>
              <div class="scenario">多设备同步</div>
              <div class="scenario">第三方授权登录</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 实现流程 -->
      <div class="section">
        <h2>🔄 二维码登录实现流程</h2>
        <div class="process-flow">
          <div class="process-step">
            <div class="step-header">
              <div class="step-number">1</div>
              <h3>生成登录二维码</h3>
            </div>
            <div class="step-content">
              <div class="step-desc">
                <p>前端请求后端生成唯一的二维码ID和临时token：</p>
                <pre class="code-block">POST /api/qrcode/generate
Response:
{
  qrId: "qwe123jkl",
  token: "temp_9a8b7c6d5e",
  expires: 180 // 秒
}</pre>
                <p>使用二维码生成库（如qrcode.js）生成二维码，内容为包含qrId的URL：</p>
                <pre class="code-block">https://example.com/login?qrId=qwe123jkl</pre>
              </div>
              <div class="step-visual">
                <div class="qr-code-demo">
                  <div class="qr-pattern"></div>
                  <div class="qr-content">qrId: qwe123jkl</div>
                </div>
              </div>
            </div>
          </div>

          <div class="process-step">
            <div class="step-header">
              <div class="step-number">2</div>
              <h3>移动端扫描与认证</h3>
            </div>
            <div class="step-content">
              <div class="step-desc">
                <p>用户使用已登录的移动APP扫描二维码：</p>
                <ul>
                  <li>解析二维码获取qrId</li>
                  <li>APP向后端发送确认请求</li>
                </ul>
                <pre class="code-block">POST /api/qrcode/confirm
{
  qrId: "qwe123jkl",
  userId: "user123",
  token: "app_auth_token"
}</pre>
                <p>后端验证APP token有效性，关联qrId与用户身份</p>
              </div>
              <div class="step-visual">
                <div class="phone-scan">
                  <div class="phone-screen">
                    <div class="scan-animation"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="process-step">
            <div class="step-header">
              <div class="step-number">3</div>
              <h3>Web端登录状态轮询</h3>
            </div>
            <div class="step-content">
              <div class="step-desc">
                <p>Web端使用WebSocket或轮询检查登录状态：</p>
                <pre class="code-block">// WebSocket实现
const socket = new WebSocket(`wss://example.com/qrcode?qrId=qwe123jkl`);

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.status === 'confirmed') {
    // 获取用户token
    loginWithToken(data.accessToken);
  }
};

// 轮询实现
setInterval(async () => {
  const res = await fetch(`/api/qrcode/status?qrId=qwe123jkl`);
  const data = await res.json();
  if (data.status === 'confirmed') {
    clearInterval(intervalId);
    loginWithToken(data.accessToken);
  }
}, 2000);</pre>
              </div>
              <div class="step-visual">
                <div class="polling-animation">
                  <div class="polling-circle"></div>
                  <div class="polling-text">状态轮询中...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 前端关键实现 -->
      <div class="section">
        <h2>💻 前端关键实现</h2>
        <div class="implementation-grid">
          <div class="impl-card">
            <h3>二维码生成</h3>
            <pre class="code-block">import QRCode from 'qrcode';

async function generateQRCode(qrId) {
  const url = `${location.origin}/login?qrId=${qrId}`;
  const canvas = document.getElementById('qrcode-canvas');
  await QRCode.toCanvas(canvas, url, {
    width: 200,
    margin: 2,
    color: {
      dark: '#000',
      light: '#fff'
    }
  });
}</pre>
          </div>
          <div class="impl-card">
            <h3>状态管理</h3>
            <pre class="code-block">// Vue组件状态管理
const qrState = reactive({
  qrId: '',
  token: '',
  status: 'pending', // pending, scanning, confirmed, expired
  timer: null
});

// 清理资源
onUnmounted(() => {
  if (qrState.timer) clearInterval(qrState.timer);
  if (qrState.socket) qrState.socket.close();
});</pre>
          </div>
          <div class="impl-card">
            <h3>登录处理</h3>
            <pre class="code-block">function loginWithToken(token) {
  // 存储token
  localStorage.setItem('auth_token', token);

  // 更新用户状态
  userStore.login(token);

  // 跳转主页面
  router.push('/dashboard');
}

// 处理登录状态变化
watch(() => qrState.status, (newVal) => {
  if (newVal === 'confirmed') {
    showNotification('登录成功！');
  } else if (newVal === 'expired') {
    showNotification('二维码已过期，请刷新');
  }
});</pre>
          </div>
          <div class="impl-card">
            <h3>用户体验优化</h3>
            <pre class="code-block">// 状态提示
const statusMessages = {
  pending: '等待扫码',
  scanning: '扫码成功，等待确认',
  confirmed: '登录成功！',
  expired: '二维码已过期'
};

// 自动刷新过期二维码
function checkExpiration() {
  if (qrState.status === 'expired') {
    generateNewQRCode();
  }
}

// 扫码成功动画
function showScanSuccess() {
  const qrElement = document.getElementById('qrcode');
  qrElement.classList.add('scan-success');
}</pre>
          </div>
        </div>
      </div>

      <!-- 安全机制 -->
      <div class="section">
        <h2>🔒 安全机制实现</h2>
        <div class="security-grid">
          <div class="security-card">
            <div class="security-icon">⏱️</div>
            <h3>时效性控制</h3>
            <p>二维码设置短有效期（通常2-5分钟），过期后自动失效</p>
          </div>
          <div class="security-card">
            <div class="security-icon">🔄</div>
            <h3>一次性使用</h3>
            <p>每个二维码仅限使用一次，成功登录后立即失效</p>
          </div>
          <div class="security-card">
            <div class="security-icon">🔑</div>
            <h3>Token验证</h3>
            <p>移动端确认时需携带有效身份Token，防止未授权确认</p>
          </div>
          <div class="security-card">
            <div class="security-icon">👤</div>
            <h3>用户确认</h3>
            <p>移动端扫码后需用户手动确认，防止恶意扫描</p>
          </div>
          <div class="security-card">
            <div class="security-icon">🚫</div>
            <h3>频率限制</h3>
            <p>限制二维码生成频率，防止暴力攻击</p>
          </div>
        </div>
      </div>

      <!-- 状态处理 -->
      <div class="section">
        <h2>🔄 二维码状态处理</h2>
        <div class="states-grid">
          <div class="state-card" :class="state.status" v-for="state in qrStates" :key="state.status">
            <div class="state-icon">{{ state.icon }}</div>
            <h3>{{ state.title }}</h3>
            <p>{{ state.description }}</p>
            <div class="state-action">{{ state.action }}</div>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>二维码登录实现指南 © 2023 | 使用Vue3 + TypeScript实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// 二维码状态示例数据
const qrStates = ref([
  {
    status: 'pending',
    icon: '⏳',
    title: '等待扫码',
    description: '二维码已生成，等待用户扫描',
    action: '显示倒计时'
  },
  {
    status: 'scanning',
    icon: '📱',
    title: '已扫码',
    description: '用户已扫描二维码，等待确认',
    action: '显示确认提示'
  },
  {
    status: 'confirmed',
    icon: '✅',
    title: '已确认',
    description: '用户已确认登录，完成认证',
    action: '获取Token并登录'
  },
  {
    status: 'expired',
    icon: '❌',
    title: '已过期',
    description: '二维码已过期，未完成登录',
    action: '提供刷新按钮'
  }
]);

// 模拟二维码状态
const qrState = reactive({
  status: 'pending',
  expires: 180
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.qr-login-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2c3e50;
  background-color: #f8fafc;
  min-height: 100vh;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 30px;
    padding: 30px 20px;
    background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
    border-radius: 12px;
    color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 2.4rem;
      font-weight: 700;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto 25px;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 20px;

      .stat-card {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 10px;
        padding: 15px 25px;
        min-width: 120px;

        .stat-value {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.95rem;
          opacity: 0.85;
        }
      }
    }
  }

  .content-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    padding: 30px;
  }

  .section {
    margin-bottom: 40px;

    h2 {
      font-size: 1.8rem;
      color: #4361ee;
      margin-bottom: 25px;
      padding-bottom: 12px;
      border-bottom: 2px solid #eef2ff;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 80px;
        height: 3px;
        background: #4361ee;
        border-radius: 3px;
      }
    }
  }

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 20px;

    .overview-card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;

      h3 {
        font-size: 1.3rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
      }

      p,
      ul {
        font-size: 0.95rem;
        color: #475569;
        margin: 0;
        line-height: 1.6;
      }

      ul {
        padding-left: 20px;

        li {
          margin-bottom: 8px;
          position: relative;

          &::before {
            content: '•';
            color: #4361ee;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
        }
      }

      .scenarios {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 15px;

        .scenario {
          background: #eef2ff;
          color: #4361ee;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
      }
    }
  }

  .process-flow {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .process-step {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07);
    border-left: 4px solid #4361ee;

    .step-header {
      display: flex;
      align-items: center;
      padding: 18px 25px;
      background: #f8f9fe;
      border-bottom: 1px solid #eef0f9;

      .step-number {
        background: #4361ee;
        color: white;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: bold;
        margin-right: 15px;
      }

      h3 {
        margin: 0;
        font-size: 1.4rem;
        color: #3a0ca3;
      }
    }

    .step-content {
      display: flex;
      padding: 25px;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      .step-desc {
        flex: 3;
        padding-right: 25px;

        p,
        ul {
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.6;
        }

        ul {
          padding-left: 20px;
          margin: 15px 0;

          li {
            margin-bottom: 8px;
            position: relative;

            &::before {
              content: '•';
              color: #4361ee;
              font-weight: bold;
              display: inline-block;
              width: 1em;
              margin-left: -1em;
            }
          }
        }
      }

      .step-visual {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 250px;
      }
    }
  }

  .qr-code-demo {
    width: 180px;
    height: 180px;
    background: white;
    border: 15px solid white;
    position: relative;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

    .qr-pattern {
      width: 100%;
      height: 100%;
      background:
        linear-gradient(90deg, #000 25%, transparent 25%, transparent 75%, #000 75%),
        linear-gradient(0deg, #000 25%, transparent 25%, transparent 75%, #000 75%);
      background-size: 10px 10px;
      opacity: 0.8;
    }

    .qr-content {
      position: absolute;
      bottom: -40px;
      width: 100%;
      text-align: center;
      font-size: 0.8rem;
      color: #666;
    }
  }

  .phone-scan {
    width: 180px;
    height: 350px;
    background: #333;
    border-radius: 30px;
    padding: 15px;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

    .phone-screen {
      width: 100%;
      height: 100%;
      background: #222;
      border-radius: 15px;
      overflow: hidden;
      position: relative;

      .scan-animation {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 10px;
        background: linear-gradient(to bottom, rgba(67, 97, 238, 0.8), transparent);
        animation: scan 3s infinite;
      }
    }
  }

  .polling-animation {
    display: flex;
    flex-direction: column;
    align-items: center;

    .polling-circle {
      width: 80px;
      height: 80px;
      border: 5px solid #e0e0e0;
      border-top: 5px solid #4361ee;
      border-radius: 50%;
      animation: spin 1.5s linear infinite;
    }

    .polling-text {
      margin-top: 15px;
      font-weight: 500;
      color: #4361ee;
    }
  }

  .implementation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .impl-card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
      }

      h3 {
        font-size: 1.2rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
      }
    }
  }

  .security-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;

    .security-card {
      background: white;
      border-radius: 10px;
      padding: 25px 20px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border-top: 3px solid #4361ee;

      .security-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }

      h3 {
        font-size: 1.2rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
      }

      p {
        font-size: 0.95rem;
        color: #475569;
        margin: 0;
        line-height: 1.5;
      }
    }
  }

  .states-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;

    .state-card {
      background: white;
      border-radius: 10px;
      padding: 25px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
      border: 2px solid #e2e8f0;

      &:hover {
        transform: translateY(-5px);
      }

      &.pending {
        border-color: #ffb74d;

        .state-icon {
          color: #ffb74d;
        }
      }

      &.scanning {
        border-color: #4fc3f7;

        .state-icon {
          color: #4fc3f7;
        }
      }

      &.confirmed {
        border-color: #81c784;

        .state-icon {
          color: #81c784;
        }
      }

      &.expired {
        border-color: #e57373;

        .state-icon {
          color: #e57373;
        }
      }

      .state-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }

      h3 {
        font-size: 1.2rem;
        color: #2c3e50;
        margin-top: 0;
        margin-bottom: 12px;
      }

      p {
        font-size: 0.95rem;
        color: #64748b;
        margin-bottom: 15px;
        line-height: 1.5;
      }

      .state-action {
        background: #f1f5f9;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 0.9rem;
        color: #475569;
        display: inline-block;
      }
    }
  }

  .code-block {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 8px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    overflow-x: auto;
    line-height: 1.5;
    margin: 15px 0;
  }

  footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px;
    color: #64748b;
    font-size: 0.9rem;
    border-top: 1px solid #e2e8f0;
  }

  @keyframes scan {
    0% {
      top: 0;
      opacity: 1;
    }

    50% {
      top: 100%;
      opacity: 0.5;
    }

    100% {
      top: 0;
      opacity: 1;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    header {
      h1 {
        font-size: 1.8rem;
      }

      p {
        font-size: 1rem;
      }

      .stats {
        flex-direction: column;
        align-items: center;
        gap: 15px;
      }
    }

    .process-step .step-content {
      flex-direction: column;
      gap: 20px;

      .step-desc {
        padding-right: 0;
      }
    }
  }
}
</style>
