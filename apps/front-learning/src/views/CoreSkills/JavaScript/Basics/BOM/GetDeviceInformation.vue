<template>
  <div class="device-info-docs">
    <div class="header">
      <h1><i class="icon icon-cpu"></i> JavaScript设备信息API文档</h1>
      <p>探索浏览器提供的设备信息获取能力</p>
    </div>

    <div class="api-grid">
      <!-- CPU信息API -->
      <div class="api-card">
        <div class="card-header">
          <i class="icon icon-cpu"></i>
          <h2>CPU信息</h2>
        </div>
        <div class="card-content">
          <div class="api-description">
            <p>获取处理器核心数和并发能力</p>
          </div>
          <div class="code-block">
            <pre><code>// 获取可用CPU核心数
const cores = navigator.hardwareConcurrency;

console.log(`可用CPU核心数: ${cores}`);
// 输出: 可用CPU核心数: 8 (取决于设备)</code></pre>
          </div>
          <div class="api-notes">
            <p><strong>注意：</strong>此API返回浏览器可用的逻辑处理器核心数，表示最大并行线程数</p>
          </div>
        </div>
      </div>

      <!-- GPU信息API -->
      <div class="api-card">
        <div class="card-header">
          <i class="icon icon-gpu"></i>
          <h2>GPU信息</h2>
        </div>
        <div class="card-content">
          <div class="api-description">
            <p>获取图形处理器详细信息</p>
          </div>
          <div class="code-block">
            <pre><code>// 通过WebGL获取GPU信息
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');

if (gl) {
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (debugInfo) {
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

    console.log(`GPU供应商: ${vendor}`);
    console.log(`GPU型号: ${renderer}`);
  }
}</code></pre>
          </div>
          <div class="api-notes">
            <p><strong>注意：</strong>需要浏览器支持WebGL，某些浏览器可能限制访问精确的GPU信息</p>
          </div>
        </div>
      </div>

      <!-- 内存信息API -->
      <div class="api-card">
        <div class="card-header">
          <i class="icon icon-memory"></i>
          <h2>内存信息</h2>
        </div>
        <div class="card-content">
          <div class="api-description">
            <p>获取内存使用情况（仅Chrome支持）</p>
          </div>
          <div class="code-block">
            <pre><code>// 获取内存使用信息
if (performance && performance.memory) {
  const memory = performance.memory;

  const totalJSHeapSize = memory.totalJSHeapSize;
  const usedJSHeapSize = memory.usedJSHeapSize;
  const jsHeapSizeLimit = memory.jsHeapSizeLimit;

  console.log(`总堆大小: ${formatBytes(totalJSHeapSize)}`);
  console.log(`已使用堆: ${formatBytes(usedJSHeapSize)}`);
  console.log(`堆大小限制: ${formatBytes(jsHeapSizeLimit)}`);
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}</code></pre>
          </div>
          <div class="api-notes">
            <p><strong>注意：</strong>目前只有基于Chromium的浏览器支持此API，返回的是JavaScript堆内存信息</p>
          </div>
        </div>
      </div>

      <!-- 屏幕信息API -->
      <div class="api-card">
        <div class="card-header">
          <i class="icon icon-screen"></i>
          <h2>屏幕信息</h2>
        </div>
        <div class="card-content">
          <div class="api-description">
            <p>获取显示设备详细信息</p>
          </div>
          <div class="code-block">
            <pre><code>// 获取屏幕信息
const screenInfo = {
  width: screen.width,
  height: screen.height,
  colorDepth: screen.colorDepth,
  pixelDepth: screen.pixelDepth,
  orientation: screen.orientation.type,
  availWidth: screen.availWidth,
  availHeight: screen.availHeight
};

console.log('屏幕信息:', screenInfo);
// 输出示例:
// {
//   width: 1920,
//   height: 1080,
//   colorDepth: 24,
//   pixelDepth: 24,
//   orientation: 'landscape-primary',
//   availWidth: 1920,
//   availHeight: 1040
// }</code></pre>
          </div>
          <div class="api-notes">
            <p><strong>注意：</strong>availWidth/availHeight表示减去操作系统界面的可用空间</p>
          </div>
        </div>
      </div>

      <!-- 网络信息API -->
      <div class="api-card">
        <div class="card-header">
          <i class="icon icon-network"></i>
          <h2>网络信息</h2>
        </div>
        <div class="card-content">
          <div class="api-description">
            <p>获取网络连接类型和性能数据</p>
          </div>
          <div class="code-block">
            <pre><code>// 获取网络连接信息
const connection = navigator.connection ||
                  navigator.mozConnection ||
                  navigator.webkitConnection;

if (connection) {
  console.log(`网络类型: ${connection.effectiveType}`);
  console.log(`下行速度: ${connection.downlink} Mbps`);
  console.log(`往返延迟: ${connection.rtt} ms`);
  console.log(`保存数据模式: ${connection.saveData ? '开启' : '关闭'}`);
}

// 监听网络变化
connection.addEventListener('change', () => {
  console.log('网络状态变化:', connection.effectiveType);
});</code></pre>
          </div>
          <div class="api-notes">
            <p><strong>注意：</strong>effectiveType可能的取值: 'slow-2g', '2g', '3g', '4g'</p>
          </div>
        </div>
      </div>

      <!-- 媒体设备API -->
      <div class="api-card">
        <div class="card-header">
          <i class="icon icon-media"></i>
          <h2>媒体设备</h2>
        </div>
        <div class="card-content">
          <div class="api-description">
            <p>枚举摄像头、麦克风等媒体设备</p>
          </div>
          <div class="code-block">
            <pre><code>// 获取媒体设备列表
navigator.mediaDevices.enumerateDevices()
  .then(devices => {
    const cameras = devices.filter(d => d.kind === 'videoinput');
    const mics = devices.filter(d => d.kind === 'audioinput');
    const speakers = devices.filter(d => d.kind === 'audiooutput');

    console.log(`摄像头数量: ${cameras.length}`);
    console.log(`麦克风数量: ${mics.length}`);
    console.log(`扬声器数量: ${speakers.length}`);

    // 输出设备详细信息
    devices.forEach(device => {
      console.log(`${device.kind}: ${device.label} (ID: ${device.deviceId})`);
    });
  })
  .catch(err => {
    console.error('获取媒体设备失败:', err);
  });</code></pre>
          </div>
          <div class="api-notes">
            <p><strong>注意：</strong>需要用户授权访问媒体设备后，才能获取非空白的设备标签</p>
          </div>
        </div>
      </div>

      <!-- 电池信息API -->
      <div class="api-card">
        <div class="card-header">
          <i class="icon icon-battery"></i>
          <h2>电池信息</h2>
        </div>
        <div class="card-content">
          <div class="api-description">
            <p>获取电池状态和充电信息</p>
          </div>
          <div class="code-block">
            <pre><code>// 获取电池信息
if ('getBattery' in navigator) {
  navigator.getBattery().then(battery => {
    console.log(`电量: ${Math.round(battery.level * 100)}%`);
    console.log(`充电状态: ${battery.charging ? '充电中' : '未充电'}`);
    console.log(`充满电预计时间: ${battery.chargingTime}秒`);
    console.log(`耗尽电预计时间: ${battery.dischargingTime}秒`);

    // 监听充电状态变化
    battery.addEventListener('chargingchange', () => {
      console.log('充电状态变化:', battery.charging);
    });

    // 监听电量变化
    battery.addEventListener('levelchange', () => {
      console.log('电量变化:', battery.level);
    });
  });
} else {
  console.log('此浏览器不支持电池状态API');
}</code></pre>
          </div>
          <div class="api-notes">
            <p><strong>注意：</strong>此API已被标记为废弃，但许多浏览器仍支持，未来可能被新API取代</p>
          </div>
        </div>
      </div>

      <!-- 传感器API -->
      <div class="api-card">
        <div class="card-header">
          <i class="icon icon-sensor"></i>
          <h2>传感器</h2>
        </div>
        <div class="card-content">
          <div class="api-description">
            <p>检测设备支持的传感器类型</p>
          </div>
          <div class="code-block">
            <pre><code>// 检测传感器支持情况
const sensors = {
  // 运动传感器（加速度计/陀螺仪）
  motion: 'DeviceMotionEvent' in window,

  // 方向传感器（指南针）
  orientation: 'DeviceOrientationEvent' in window,

  // 接近传感器
  proximity: 'DeviceProximityEvent' in window,

  // 环境光传感器
  ambientLight: 'AmbientLightSensor' in window,

  // 地理位置
  geolocation: 'geolocation' in navigator
};

console.log('传感器支持情况:', sensors);

// 使用地理位置API
if (sensors.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    console.log('当前位置:', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    });
  }, error => {
    console.error('获取位置失败:', error.message);
  });
}</code></pre>
          </div>
          <div class="api-notes">
            <p><strong>注意：</strong>访问某些传感器（如地理位置）需要用户明确授权</p>
          </div>
        </div>
      </div>

      <!-- Navigator信息API -->
      <div class="api-card">
        <div class="card-header">
          <i class="icon icon-navigator"></i>
          <h2>Navigator信息</h2>
        </div>
        <div class="card-content">
          <div class="api-description">
            <p>获取浏览器和操作系统信息</p>
          </div>
          <div class="code-block">
            <pre><code>// 获取浏览器信息
const browserInfo = {
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  languages: navigator.languages,
  cookieEnabled: navigator.cookieEnabled,
  maxTouchPoints: navigator.maxTouchPoints,
  pdfViewerEnabled: navigator.pdfViewerEnabled,
  // 其他有用属性
  deviceMemory: navigator.deviceMemory || '未知',
  hardwareConcurrency: navigator.hardwareConcurrency,
  onLine: navigator.onLine,
  serviceWorker: 'serviceWorker' in navigator,
  storage: navigator.storage ? '支持' : '不支持'
};

console.log('浏览器信息:', browserInfo);

// 检测设备类型
const isMobile = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  .test(navigator.userAgent);
console.log(`移动设备: ${isMobile ? '是' : '否'}`);</code></pre>
          </div>
          <div class="api-notes">
            <p><strong>注意：</strong>userAgent信息可被用户修改，不应用作功能检测的唯一依据</p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>JavaScript设备信息API文档 | 实际使用需考虑浏览器兼容性和用户隐私</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 此组件仅用于展示API文档，不需要实际逻辑
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@text-color: #2b2d42;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e9ecef;
@code-bg: #f5f7ff;
@success-color: #4cc9f0;
@warning-color: #f72585;
@muted-color: #8d99ae;

.device-info-docs {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
  min-height: 100vh;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    h1 {
      font-size: 2.4rem;
      color: @secondary-color;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    p {
      font-size: 1.1rem;
      color: @muted-color;
      max-width: 600px;
      margin: 0 auto;
    }
  }

  .api-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    gap: 1.8rem;
    margin-bottom: 2rem;
  }

  .api-card {
    background: @card-bg;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    border: 1px solid @border-color;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
  }

  .card-header {
    background: linear-gradient(135deg, lighten(@primary-color, 42%) 0%, lighten(@secondary-color, 50%) 100%);
    padding: 1.2rem 1.8rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid @border-color;

    h2 {
      font-size: 1.4rem;
      font-weight: 700;
      color: darken(@secondary-color, 10%);
      margin: 0;
    }
  }

  .card-content {
    padding: 1.8rem;
  }

  .api-description {
    margin-bottom: 1.2rem;

    p {
      color: lighten(@text-color, 15%);
      line-height: 1.6;
    }
  }

  .code-block {
    background: @code-bg;
    border-radius: 8px;
    padding: 1.2rem;
    margin-bottom: 1.2rem;
    border-left: 4px solid @primary-color;
    overflow-x: auto;

    pre {
      margin: 0;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      color: darken(@primary-color, 15%);
    }

    code {
      display: block;
      white-space: pre-wrap;
    }
  }

  .api-notes {
    background: lighten(@light-bg, 1%);
    border-radius: 8px;
    padding: 1rem;
    font-size: 0.9rem;

    p {
      margin: 0.3rem 0;
      color: @muted-color;

      strong {
        color: @text-color;
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
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.7);

    &-cpu:before {
      content: "🧠";
    }

    &-gpu:before {
      content: "🎮";
    }

    &-memory:before {
      content: "💾";
    }

    &-screen:before {
      content: "📺";
    }

    &-network:before {
      content: "📡";
    }

    &-media:before {
      content: "🎥";
    }

    &-battery:before {
      content: "🔋";
    }

    &-sensor:before {
      content: "📡";
    }

    &-navigator:before {
      content: "🧭";
    }
  }

  @media (max-width: 768px) {
    padding: 1.2rem;

    .header h1 {
      font-size: 1.8rem;
    }

    .api-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
