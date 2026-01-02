<template>
  <div class="geolocation-container">
    <!-- 知识讲解区 -->
    <section class="documentation-card">
      <h1>📌 HTML5 Geolocation API 指南</h1>
      <div class="api-section">
        <h2>API 核心方法</h2>
        <pre class="code-block">
// 检查浏览器支持
if (navigator.geolocation) {
  // 获取当前位置
  navigator.geolocation.getCurrentPosition(
    successCallback,
    errorCallback,
    options
  );
} else {
  alert("该浏览器不支持地理定位");
}</pre
        >
      </div>

      <div class="parameter-section">
        <h3>🔧 参数配置选项</h3>
        <div class="option-grid">
          <div class="option-item">
            <div class="option-name">enableHighAccuracy</div>
            <div class="option-type">Boolean</div>
            <div class="option-default">默认: false</div>
            <div class="option-desc">是否使用高精度模式（更耗电）</div>
          </div>
          <div class="option-item">
            <div class="option-name">timeout</div>
            <div class="option-type">Number</div>
            <div class="option-default">默认: Infinity</div>
            <div class="option-desc">获取位置超时时间（毫秒）</div>
          </div>
          <div class="option-item">
            <div class="option-name">maximumAge</div>
            <div class="option-type">Number</div>
            <div class="option-default">默认: 0</div>
            <div class="option-desc">接受缓存位置的最大年龄（毫秒）</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 实时演示区 -->
    <section class="demo-card">
      <h2>🖥️ 实时演示</h2>
      <div class="demo-controls">
        <button @click="getGeolocation" :disabled="isLoading" class="demo-button">
          {{ isLoading ? '获取中...' : '获取当前位置' }}
        </button>
        <label class="high-accuracy-toggle">
          <input type="checkbox" v-model="highAccuracy" /> 高精度模式
        </label>
      </div>

      <!-- 结果展示 -->
      <div v-if="position" class="result-box">
        <div class="coordinates">
          <div class="coordinate-item">
            <span class="label">纬度</span>
            <span class="value">{{ position.coords.latitude.toFixed(6) }}</span>
          </div>
          <div class="coordinate-item">
            <span class="label">经度</span>
            <span class="value">{{ position.coords.longitude.toFixed(6) }}</span>
          </div>
        </div>

        <div class="additional-info">
          <div class="info-item">
            <span class="info-label">精度范围</span>
            <progress
              :value="position.coords.accuracy"
              max="100"
              class="accuracy-progress"
            ></progress>
            <span class="info-value">{{ position.coords.accuracy }} 米</span>
          </div>
          <div class="info-item">
            <span class="info-label">海拔</span>
            <span class="info-value">
              {{ position.coords.altitude || '不可用' }}
            </span>
          </div>
        </div>
      </div>

      <!-- 错误信息 -->
      <div v-if="error" class="error-box">
        <div class="error-icon">⚠️</div>
        <div class="error-message">
          <h3>错误代码 {{ error.code }}</h3>
          <p>{{ error.message }}</p>
        </div>
      </div>
    </section>

    <!-- 最佳实践提示 -->
    <section class="tips-card">
      <h2>💡 最佳实践建议</h2>
      <ul class="best-practices">
        <li>始终检查浏览器支持情况</li>
        <li>处理用户拒绝权限的情况</li>
        <li>在移动设备上慎用高精度模式</li>
        <li>使用合理的超时设置（建议10-30秒）</li>
        <li>对敏感位置信息进行模糊处理</li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 响应式状态
interface GeolocationPosition {
  coords: {
    latitude: number
    longitude: number
    accuracy: number
    altitude: number | null
  }
}

const position = ref<GeolocationPosition | null>(null)
interface GeolocationError {
  code: number
  message: string
}

const error = ref<GeolocationError | null>(null)
const isLoading = ref(false)
const highAccuracy = ref(false)

// 错误代码映射
const errorMessages = {
  1: '用户拒绝了位置请求',
  2: '无法获取位置信息',
  3: '请求位置超时',
}

const getGeolocation = () => {
  isLoading.value = true
  error.value = null
  position.value = null

  // API 配置选项
  const options = {
    enableHighAccuracy: highAccuracy.value,
    timeout: 10000,
    maximumAge: 30000,
  }

  // 成功回调
  const successCallback = (pos: GeolocationPosition) => {
    position.value = pos
    isLoading.value = false
  }

  // 失败回调
  const errorCallback = (err: GeolocationPositionError) => {
    error.value = {
      code: err.code,
      message: errorMessages[err.code as keyof typeof errorMessages] || '未知错误',
    }
    isLoading.value = false
  }

  // 执行定位请求
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)
  } else {
    error.value = { code: 0, message: '该浏览器不支持地理定位' }
    isLoading.value = false
  }
}
</script>

<style scoped>
.geolocation-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #2c3e50;
}

.documentation-card,
.demo-card,
.tips-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

h1,
h2,
h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.code-block {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  overflow-x: auto;
}

.option-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.option-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #eee;
}

.option-name {
  font-weight: 600;
  color: #42b983;
}

.option-type {
  font-size: 0.9em;
  color: #666;
  margin: 0.3rem 0;
}

.demo-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
}

.demo-button {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.demo-button:disabled {
  background: #a0d9bb;
  cursor: not-allowed;
}

.high-accuracy-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.result-box {
  border: 2px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
}

.coordinates {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.coordinate-item {
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.label {
  display: block;
  color: #666;
  font-size: 0.9em;
}

.value {
  font-size: 1.2em;
  font-weight: 600;
}

.accuracy-progress {
  width: 200px;
  height: 8px;
  margin: 0 1rem;
}

progress::-webkit-progress-value {
  background: #42b983;
}

.error-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #fee;
  border-radius: 8px;
  margin-top: 1rem;
  border: 1px solid #ffcccc;
}

.error-icon {
  font-size: 2em;
}

.best-practices {
  list-style: none;
  padding-left: 1.5rem;
}

.best-practices li {
  padding: 0.8rem 0;
  position: relative;
}

.best-practices li::before {
  content: '✓';
  color: #42b983;
  position: absolute;
  left: -1.5rem;
}

@media (max-width: 768px) {
  .geolocation-container {
    padding: 1rem;
  }

  .coordinates {
    grid-template-columns: 1fr;
  }

  .demo-controls {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
