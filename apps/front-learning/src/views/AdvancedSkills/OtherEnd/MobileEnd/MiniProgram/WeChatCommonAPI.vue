<template>
  <div class="wx-api-container">
    <header class="header">
      <div class="title-wrapper">
        <h1>微信小程序常用 API</h1>
        <div class="logo">
          <div class="logo-circle">API</div>
        </div>
      </div>
      <p class="subtitle">构建强大小程序功能的核心接口</p>
    </header>

    <div class="content">
      <div class="api-stats">
        <div class="stat-card">
          <div class="stat-value">150+</div>
          <div class="stat-label">可用API数量</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">90%</div>
          <div class="stat-label">小程序使用率</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">8类</div>
          <div class="stat-label">API分类</div>
        </div>
      </div>

      <div class="category-filter">
        <button v-for="category in categories" :key="category.id" :class="{ active: activeCategory === category.id }"
          @click="activeCategory = category.id">
          <i :class="category.icon"></i>
          {{ category.name }}
        </button>
      </div>

      <div class="api-category" v-if="activeCategory === 'ui' || activeCategory === 'all'">
        <h2 class="category-title">
          <i class="icon icon-interface"></i>
          <span>界面交互 API</span>
          <span class="badge">最常用</span>
        </h2>

        <div class="api-grid">
          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-green">
                <i class="icon icon-toast"></i>
              </div>
              <h3>wx.showToast</h3>
              <span class="usage-rate">99%</span>
            </div>
            <div class="api-body">
              <p>显示消息提示框</p>
              <div class="params">
                <h4>参数</h4>
                <ul>
                  <li><strong>title</strong>: 提示内容 (必填)</li>
                  <li><strong>icon</strong>: 图标 (success/error/loading/none)</li>
                  <li><strong>duration</strong>: 显示时长 (ms，默认1500)</li>
                  <li><strong>mask</strong>: 是否显示透明蒙层</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>wx.showToast({
  title: '操作成功',
  icon: 'success',
  duration: 2000
})</code></pre>
              </div>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-blue">
                <i class="icon icon-modal"></i>
              </div>
              <h3>wx.showModal</h3>
              <span class="usage-rate">95%</span>
            </div>
            <div class="api-body">
              <p>显示模态对话框</p>
              <div class="params">
                <h4>参数</h4>
                <ul>
                  <li><strong>title</strong>: 标题</li>
                  <li><strong>content</strong>: 内容 (必填)</li>
                  <li><strong>showCancel</strong>: 是否显示取消按钮</li>
                  <li><strong>confirmText</strong>: 确认按钮文字</li>
                  <li><strong>cancelText</strong>: 取消按钮文字</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>wx.showModal({
  title: '提示',
  content: '确定要删除吗？',
  success(res) {
    if (res.confirm) {
      console.log('用户点击确定')
    }
  }
})</code></pre>
              </div>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-orange">
                <i class="icon icon-loading"></i>
              </div>
              <h3>wx.showLoading</h3>
              <span class="usage-rate">90%</span>
            </div>
            <div class="api-body">
              <p>显示加载提示框</p>
              <div class="params">
                <h4>参数</h4>
                <ul>
                  <li><strong>title</strong>: 提示内容 (必填)</li>
                  <li><strong>mask</strong>: 是否显示透明蒙层</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>wx.showLoading({
  title: '加载中',
  mask: true
})

// 需要手动调用 wx.hideLoading 关闭</code></pre>
              </div>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-purple">
                <i class="icon icon-navigation"></i>
              </div>
              <h3>wx.navigateTo</h3>
              <span class="usage-rate">98%</span>
            </div>
            <div class="api-body">
              <p>保留当前页面，跳转到应用内页面</p>
              <div class="params">
                <h4>参数</h4>
                <ul>
                  <li><strong>url</strong>: 页面路径 (必填)</li>
                  <li><strong>events</strong>: 页面间通信事件</li>
                  <li><strong>success</strong>: 成功回调</li>
                  <li><strong>fail</strong>: 失败回调</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>wx.navigateTo({
  url: '/pages/detail/detail?id=123'
})</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="api-category" v-if="activeCategory === 'network' || activeCategory === 'all'">
        <h2 class="category-title">
          <i class="icon icon-network"></i>
          <span>网络请求 API</span>
          <span class="badge">最常用</span>
        </h2>

        <div class="api-grid">
          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-red">
                <i class="icon icon-request"></i>
              </div>
              <h3>wx.request</h3>
              <span class="usage-rate">100%</span>
            </div>
            <div class="api-body">
              <p>发起 HTTPS 网络请求</p>
              <div class="params">
                <h4>参数</h4>
                <ul>
                  <li><strong>url</strong>: 接口地址 (必填)</li>
                  <li><strong>method</strong>: 请求方法 (GET/POST等)</li>
                  <li><strong>data</strong>: 请求参数</li>
                  <li><strong>header</strong>: 请求头</li>
                  <li><strong>timeout</strong>: 超时时间 (ms)</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>wx.request({
  url: 'https://api.example.com/data',
  method: 'GET',
  data: { page: 1 },
  success(res) {
    console.log(res.data)
  }
})</code></pre>
              </div>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-cyan">
                <i class="icon icon-upload"></i>
              </div>
              <h3>wx.uploadFile</h3>
              <span class="usage-rate">85%</span>
            </div>
            <div class="api-body">
              <p>上传本地文件到服务器</p>
              <div class="params">
                <h4>参数</h4>
                <ul>
                  <li><strong>url</strong>: 上传地址 (必填)</li>
                  <li><strong>filePath</strong>: 文件路径 (必填)</li>
                  <li><strong>name</strong>: 文件对应的 key</li>
                  <li><strong>formData</strong>: 额外表单数据</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>wx.chooseImage({
  success(res) {
    const tempFilePaths = res.tempFilePaths
    wx.uploadFile({
      url: 'https://example.com/upload',
      filePath: tempFilePaths[0],
      name: 'file',
      success(res) {
        console.log(res.data)
      }
    })
  }
})</code></pre>
              </div>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-teal">
                <i class="icon icon-download"></i>
              </div>
              <h3>wx.downloadFile</h3>
              <span class="usage-rate">75%</span>
            </div>
            <div class="api-body">
              <p>下载文件资源到本地</p>
              <div class="params">
                <h4>参数</h4>
                <ul>
                  <li><strong>url</strong>: 下载地址 (必填)</li>
                  <li><strong>header</strong>: 请求头</li>
                  <li><strong>timeout</strong>: 超时时间 (ms)</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>wx.downloadFile({
  url: 'https://example.com/image.jpg',
  success(res) {
    // 文件临时路径
    const tempFilePath = res.tempFilePath
    wx.saveImageToPhotosAlbum({
      filePath: tempFilePath
    })
  }
})</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="api-category" v-if="activeCategory === 'storage' || activeCategory === 'all'">
        <h2 class="category-title">
          <i class="icon icon-storage"></i>
          <span>数据存储 API</span>
          <span class="badge">高频</span>
        </h2>

        <div class="api-grid">
          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-yellow">
                <i class="icon icon-storage"></i>
              </div>
              <h3>wx.setStorageSync</h3>
              <span class="usage-rate">95%</span>
            </div>
            <div class="api-body">
              <p>同步设置本地缓存</p>
              <div class="params">
                <h4>参数</h4>
                <ul>
                  <li><strong>key</strong>: 缓存键名 (必填)</li>
                  <li><strong>data</strong>: 存储内容 (必填)</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>try {
  wx.setStorageSync('userInfo', {
    name: '张三',
    id: '123456'
  })
} catch (e) {
  console.error(e)
}</code></pre>
              </div>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-pink">
                <i class="icon icon-storage"></i>
              </div>
              <h3>wx.getStorageSync</h3>
              <span class="usage-rate">95%</span>
            </div>
            <div class="api-body">
              <p>同步获取本地缓存</p>
              <div class="params">
                <h4>参数</h4>
                <ul>
                  <li><strong>key</strong>: 缓存键名 (必填)</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>try {
  const userInfo = wx.getStorageSync('userInfo')
  if (userInfo) {
    console.log(userInfo.name)
  }
} catch (e) {
  console.error(e)
}</code></pre>
              </div>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-deep-purple">
                <i class="icon icon-storage"></i>
              </div>
              <h3>wx.removeStorageSync</h3>
              <span class="usage-rate">85%</span>
            </div>
            <div class="api-body">
              <p>同步移除本地缓存</p>
              <div class="params">
                <h4>参数</h4>
                <ul>
                  <li><strong>key</strong>: 缓存键名 (必填)</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>try {
  wx.removeStorageSync('userInfo')
} catch (e) {
  console.error(e)
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="api-category" v-if="activeCategory === 'location' || activeCategory === 'all'">
        <h2 class="category-title">
          <i class="icon icon-location"></i>
          <span>位置与地图 API</span>
          <span class="badge">中频</span>
        </h2>

        <div class="api-grid">
          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-light-green">
                <i class="icon icon-location"></i>
              </div>
              <h3>wx.getLocation</h3>
              <span class="usage-rate">80%</span>
            </div>
            <div class="api-body">
              <p>获取当前地理位置</p>
              <div class="params">
                <h4>参数</h4>
                <ul>
                  <li><strong>type</strong>: 坐标类型 (wgs84/gcj02)</li>
                  <li><strong>altitude</strong>: 是否获取高度信息</li>
                  <li><strong>isHighAccuracy</strong>: 高精度定位</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>wx.getLocation({
  type: 'wgs84',
  success(res) {
    const latitude = res.latitude
    const longitude = res.longitude
    wx.openLocation({
      latitude,
      longitude
    })
  }
})</code></pre>
              </div>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-light-blue">
                <i class="icon icon-map"></i>
              </div>
              <h3>wx.chooseLocation</h3>
              <span class="usage-rate">70%</span>
            </div>
            <div class="api-body">
              <p>打开地图选择位置</p>
              <div class="params">
                <h4>参数</h4>
                <ul>
                  <li><strong>latitude</strong>: 中心纬度</li>
                  <li><strong>longitude</strong>: 中心经度</li>
                  <li><strong>keyword</strong>: 搜索关键词</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>wx.chooseLocation({
  success(res) {
    console.log(res.name, res.address)
  },
  fail(err) {
    console.error(err)
  }
})</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="api-category" v-if="activeCategory === 'device' || activeCategory === 'all'">
        <h2 class="category-title">
          <i class="icon icon-device"></i>
          <span>设备与系统 API</span>
          <span class="badge">中频</span>
        </h2>

        <div class="api-grid">
          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-amber">
                <i class="icon icon-system"></i>
              </div>
              <h3>wx.getSystemInfoSync</h3>
              <span class="usage-rate">90%</span>
            </div>
            <div class="api-body">
              <p>同步获取系统信息</p>
              <div class="params">
                <h4>返回信息</h4>
                <ul>
                  <li><strong>brand</strong>: 手机品牌</li>
                  <li><strong>model</strong>: 手机型号</li>
                  <li><strong>pixelRatio</strong>: 设备像素比</li>
                  <li><strong>screenWidth/Height</strong>: 屏幕尺寸</li>
                  <li><strong>windowWidth/Height</strong>: 可使用窗口尺寸</li>
                  <li><strong>version</strong>: 微信版本号</li>
                  <li><strong>system</strong>: 操作系统版本</li>
                  <li><strong>platform</strong>: 客户端平台</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>const systemInfo = wx.getSystemInfoSync()
console.log('手机型号:', systemInfo.model)
console.log('微信版本:', systemInfo.version)
console.log('屏幕宽度:', systemInfo.screenWidth)</code></pre>
              </div>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-deep-orange">
                <i class="icon icon-scan"></i>
              </div>
              <h3>wx.scanCode</h3>
              <span class="usage-rate">75%</span>
            </div>
            <div class="api-body">
              <p>调起客户端扫码界面</p>
              <div class="params">
                <h4>参数</h4>
                <ul>
                  <li><strong>onlyFromCamera</strong>: 是否只能从相机扫码</li>
                  <li><strong>scanType</strong>: 扫码类型 (qrCode/barCode等)</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>wx.scanCode({
  success(res) {
    console.log('扫码结果:', res.result)
  },
  fail(err) {
    console.error('扫码失败:', err)
  }
})</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="other-apis">
        <h2 class="section-title">
          <i class="icon icon-more"></i>
          <span>其他常用 API</span>
        </h2>
        <div class="api-table">
          <table>
            <thead>
              <tr>
                <th>API名称</th>
                <th>功能描述</th>
                <th>使用频率</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>wx.login</td>
                <td>调用接口获取登录凭证</td>
                <td>98%</td>
              </tr>
              <tr>
                <td>wx.getUserProfile</td>
                <td>获取用户信息</td>
                <td>95%</td>
              </tr>
              <tr>
                <td>wx.setClipboardData</td>
                <td>设置系统剪贴板内容</td>
                <td>85%</td>
              </tr>
              <tr>
                <td>wx.makePhoneCall</td>
                <td>拨打电话</td>
                <td>70%</td>
              </tr>
              <tr>
                <td>wx.setScreenBrightness</td>
                <td>设置屏幕亮度</td>
                <td>50%</td>
              </tr>
              <tr>
                <td>wx.onAccelerometerChange</td>
                <td>监听加速度数据</td>
                <td>40%</td>
              </tr>
              <tr>
                <td>wx.createAnimation</td>
                <td>创建动画实例</td>
                <td>75%</td>
              </tr>
              <tr>
                <td>wx.createInnerAudioContext</td>
                <td>创建内部音频上下文</td>
                <td>65%</td>
              </tr>
              <tr>
                <td>wx.getNetworkType</td>
                <td>获取网络类型</td>
                <td>80%</td>
              </tr>
              <tr>
                <td>wx.onNetworkStatusChange</td>
                <td>监听网络状态变化</td>
                <td>60%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>微信小程序 API 参考 | 持续更新中</p>
      <div class="links">
        <a href="https://developers.weixin.qq.com/miniprogram/dev/api/" target="_blank">
          <i class="icon icon-doc"></i> 官方文档
        </a>
        <a href="https://github.com/wechat-miniprogram" target="_blank">
          <i class="icon icon-github"></i> GitHub 示例
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// API分类数据
const categories = ref([
  { id: 'all', name: '全部', icon: 'icon icon-all' },
  { id: 'ui', name: '界面交互', icon: 'icon icon-interface' },
  { id: 'network', name: '网络', icon: 'icon icon-network' },
  { id: 'storage', name: '数据存储', icon: 'icon icon-storage' },
  { id: 'location', name: '位置', icon: 'icon icon-location' },
  { id: 'device', name: '设备', icon: 'icon icon-device' },
  { id: 'media', name: '媒体', icon: 'icon icon-media' },
  { id: 'open', name: '开放接口', icon: 'icon icon-open' },
]);

const activeCategory = ref('all');
</script>

<style lang="less" scoped>


// 基础变量
@primary-color: #07c160; // 微信绿色
@secondary-color: #576b95;
@background-light: #f8f9fa;
@text-primary: #2c3e50;
@text-secondary: #5a6d82;
@border-color: #e8e8e8;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@success-color: #07c160;
@warning-color: #fa5151;
@info-color: #10aeff;

// 颜色变量
@blue: #10aeff;
@green: #07c160;
@orange: #f0ad4e;
@purple: #8e44ad;
@cyan: #1abc9c;
@pink: #e84393;
@red: #e74c3c;
@yellow: #f1c40f;
@teal: #1abc9c;
@indigo: #3498db;
@deep-orange: #e67e22;
@brown: #795548;
@light-green: #8bc34a;
@light-blue: #03a9f4;
@amber: #ffc107;
@deep-purple: #673ab7;

// 布局和基础样式
.wx-api-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: @text-primary;
  background-color: #fff;
  line-height: 1.6;
  padding-bottom: 40px;
}

.header {
  text-align: center;
  padding: 50px 0 30px;
  margin-bottom: 30px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, @primary-color, @secondary-color);
  }

  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 15px;
    flex-wrap: wrap;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    color: @text-primary;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;

    .logo-circle {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-secondary;
    font-weight: 400;
    margin-top: 15px;
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.api-stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px 30px;
  text-align: center;
  box-shadow: @card-shadow;
  border: 1px solid @border-color;
  min-width: 150px;

  .stat-value {
    font-size: 2.2rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 8px;
  }

  .stat-label {
    color: @text-secondary;
    font-size: 0.95rem;
  }
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: center;

  button {
    background: white;
    border: 1px solid @border-color;
    border-radius: 30px;
    padding: 10px 20px;
    font-size: 0.95rem;
    color: @text-secondary;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;

    i {
      font-size: 1.1rem;
    }

    &:hover {
      border-color: @primary-color;
      color: @primary-color;
    }

    &.active {
      background: @primary-color;
      color: white;
      border-color: @primary-color;
    }
  }
}

.api-category {
  margin-top: 40px;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 25px;
  color: @text-primary;
  position: relative;
  padding-bottom: 12px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, @primary-color, @secondary-color);
    border-radius: 2px;
  }

  .icon {
    width: 40px;
    height: 40px;
    background: fade(@primary-color, 15%);
    color: @primary-color;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }

  .badge {
    background: @warning-color;
    color: white;
    font-size: 0.8rem;
    padding: 3px 10px;
    border-radius: 30px;
    margin-left: 10px;
  }
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.api-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid @border-color;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}

.api-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f9fbfd;
  border-bottom: 1px solid @border-color;
  position: relative;
}

.api-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: white;
  font-size: 1.5rem;

  // 背景颜色类
  &.bg-blue {
    background: @blue;
  }

  &.bg-green {
    background: @green;
  }

  &.bg-orange {
    background: @orange;
  }

  &.bg-purple {
    background: @purple;
  }

  &.bg-cyan {
    background: @cyan;
  }

  &.bg-pink {
    background: @pink;
  }

  &.bg-red {
    background: @red;
  }

  &.bg-yellow {
    background: @yellow;
  }

  &.bg-teal {
    background: @teal;
  }

  &.bg-indigo {
    background: @indigo;
  }

  &.bg-deep-orange {
    background: @deep-orange;
  }

  &.bg-brown {
    background: @brown;
  }

  &.bg-light-green {
    background: @light-green;
  }

  &.bg-light-blue {
    background: @light-blue;
  }

  &.bg-amber {
    background: @amber;
  }

  &.bg-deep-purple {
    background: @deep-purple;
  }
}

.usage-rate {
  position: absolute;
  top: 15px;
  right: 20px;
  background: fade(@primary-color, 10%);
  color: @primary-color;
  padding: 3px 10px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
}

.api-body {
  padding: 20px;

  p {
    color: @text-secondary;
    margin-bottom: 20px;
    line-height: 1.6;
    font-size: 1.05rem;
    font-weight: 500;
  }
}

.params {
  margin-bottom: 20px;

  h4 {
    font-size: 1.1rem;
    margin-bottom: 10px;
    color: @text-primary;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      display: inline-block;
      width: 5px;
      height: 16px;
      background: @primary-color;
      border-radius: 3px;
      margin-right: 10px;
    }
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 8px;
      color: @text-secondary;
      line-height: 1.6;

      strong {
        color: @text-primary;
        font-weight: 600;
      }
    }
  }
}

.code-example {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 15px;
  overflow-x: auto;
  border: 1px solid #e8e8e8;

  pre {
    margin: 0;
    font-size: 0.9rem;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      color: #2c3e50;
      line-height: 1.5;
    }
  }
}

.other-apis {
  margin-top: 60px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: @text-primary;
  position: relative;
  padding-bottom: 10px;
  margin-top: 40px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, @primary-color, @secondary-color);
    border-radius: 2px;
  }

  .icon {
    width: 40px;
    height: 40px;
    background: fade(@primary-color, 15%);
    color: @primary-color;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
}

.api-table {
  background: white;
  border-radius: 12px;
  box-shadow: @card-shadow;
  padding: 25px;
  border: 1px solid @border-color;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: fade(@primary-color, 8%);
      color: @primary-color;
      font-weight: 600;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: fade(@primary-color, 4%);
    }

    td:first-child {
      font-weight: 500;
      color: @text-primary;
    }

    td:last-child {
      font-weight: 600;
      color: @primary-color;
    }
  }
}

// 页脚
.footer {
  text-align: center;
  padding: 40px 0 20px;
  margin-top: 50px;
  border-top: 1px solid @border-color;
  color: @text-secondary;

  p {
    font-size: 1.1rem;
    margin-bottom: 25px;
  }

  .links {
    display: flex;
    justify-content: center;
    gap: 30px;

    a {
      color: @primary-color;
      text-decoration: none;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;

      &:hover {
        color: darken(@primary-color, 10%);
        transform: translateY(-2px);
      }

      .icon {
        font-size: 1.2rem;
      }
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .header {
    padding: 30px 0 20px;

    h1 {
      font-size: 2rem;
    }
  }

  .category-title {
    font-size: 1.4rem;
  }

  .api-grid {
    grid-template-columns: 1fr;
  }

  .api-stats {
    gap: 10px;

    .stat-card {
      min-width: 120px;
      padding: 15px 20px;

      .stat-value {
        font-size: 1.8rem;
      }
    }
  }

  .category-filter {
    justify-content: flex-start;
  }
}
</style>
