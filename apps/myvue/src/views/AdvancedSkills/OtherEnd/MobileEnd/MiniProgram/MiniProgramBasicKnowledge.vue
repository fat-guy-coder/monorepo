<template>
  <div class="miniprogram-container">
    <!-- 头部区域 -->
    <header class="miniprogram-header">
      <div class="header-content">
        <h1>微信小程序开发基础介绍</h1>
        <p class="subtitle">基本解析小程序的文件结构、导航系统、核心组件与功能API</p>
        <div class="phone-mockup">
          <div class="phone-screen">
            <div class="app-header">
              <div class="app-title">小程序示例</div>
            </div>
            <div class="tab-bar">
              <div class="tab-item active">
                <i class="icon home"></i>
                <span>首页</span>
              </div>
              <div class="tab-item">
                <i class="icon category"></i>
                <span>分类</span>
              </div>
              <div class="tab-item">
                <i class="icon cart"></i>
                <span>购物车</span>
              </div>
              <div class="tab-item">
                <i class="icon user"></i>
                <span>我的</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="miniprogram-content">
      <!-- 文件结构部分 -->
      <section class="card file-structure">
        <h2><i class="icon folder"></i> 小程序文件结构</h2>
        <div class="structure-diagram">
          <div class="folder root">
            <div class="folder-name">项目根目录</div>
            <div class="folder-contents">
              <div class="file">app.js <span class="file-desc">全局逻辑</span></div>
              <div class="file">app.json <span class="file-desc">全局配置</span></div>
              <div class="file">app.wxss <span class="file-desc">全局样式</span></div>
              <div class="folder">
                <div class="folder-name">pages <span class="folder-desc">页面目录</span></div>
                <div class="folder-contents">
                  <div class="folder">
                    <div class="folder-name">index <span class="folder-desc">首页</span></div>
                    <div class="folder-contents">
                      <div class="file">index.js</div>
                      <div class="file">index.wxml</div>
                      <div class="file">index.wxss</div>
                      <div class="file">index.json</div>
                    </div>
                  </div>
                  <div class="folder">
                    <div class="folder-name">user <span class="folder-desc">用户页</span></div>
                    <div class="folder-contents">
                      <div class="file">user.js</div>
                      <div class="file">user.wxml</div>
                      <div class="file">user.wxss</div>
                      <div class="file">user.json</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="folder">
                <div class="folder-name">components <span class="folder-desc">组件目录</span></div>
                <div class="folder-contents">
                  <div class="folder">
                    <div class="folder-name">custom-button</div>
                    <div class="folder-contents">
                      <div class="file">custom-button.js</div>
                      <div class="file">custom-button.wxml</div>
                      <div class="file">custom-button.wxss</div>
                      <div class="file">custom-button.json</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="folder">
                <div class="folder-name">utils <span class="folder-desc">工具目录</span></div>
                <div class="folder-contents">
                  <div class="file">api.js</div>
                  <div class="file">util.js</div>
                </div>
              </div>
              <div class="folder">
                <div class="folder-name">images <span class="folder-desc">图片资源</span></div>
              </div>
            </div>
          </div>
        </div>

        <div class="file-descriptions">
          <h3>核心文件说明：</h3>
          <div class="file-desc-grid">
            <div class="desc-item">
              <div class="file-icon">.json</div>
              <h4>配置文件</h4>
              <p>用于页面配置、窗口样式、导航栏设置等</p>
            </div>
            <div class="desc-item">
              <div class="file-icon">.wxml</div>
              <h4>模板文件</h4>
              <p>类似HTML的标签语言，用于构建页面结构</p>
            </div>
            <div class="desc-item">
              <div class="file-icon">.wxss</div>
              <h4>样式文件</h4>
              <p>类似CSS的样式语言，用于设置页面样式</p>
            </div>
            <div class="desc-item">
              <div class="file-icon">.js</div>
              <h4>脚本文件</h4>
              <p>JavaScript逻辑文件，处理页面交互和数据处理</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 导航系统部分 -->
      <section class="card navigation-system">
        <h2><i class="icon navigation"></i> 小程序导航系统</h2>
        <div class="navigation-types">
          <div class="nav-type">
            <h3>标签页导航 (Tab Bar)</h3>
            <div class="nav-example">
              <div class="tab-bar-demo">
                <div class="tab-item active">首页</div>
                <div class="tab-item">分类</div>
                <div class="tab-item">购物车</div>
                <div class="tab-item">我的</div>
              </div>
            </div>
            <pre class="code-block"><code>// app.json 配置
"tabBar": {
  "list": [
    {
      "pagePath": "pages/index/index",
      "text": "首页",
      "iconPath": "images/home.png",
      "selectedIconPath": "images/home-active.png"
    },
    {
      "pagePath": "pages/user/user",
      "text": "我的",
      "iconPath": "images/user.png",
      "selectedIconPath": "images/user-active.png"
    }
  ]
}</code></pre>
          </div>

          <div class="nav-type">
            <h3>页面间导航</h3>
            <div class="nav-example">
              <div class="page-nav">
                <div class="page">首页</div>
                <div class="nav-arrow">→</div>
                <div class="page">详情页</div>
                <div class="nav-arrow">→</div>
                <div class="page">支付页</div>
              </div>
            </div>
            <pre class="code-block"><code>// 导航到新页面
wx.navigateTo({
  url: '/pages/detail/detail?id=123'
})

// 返回上一页
wx.navigateBack()

// 重定向页面
wx.redirectTo({
  url: '/pages/login/login'
})

// 切换到标签页
wx.switchTab({
  url: '/pages/index/index'
})</code></pre>
          </div>
        </div>
      </section>

      <!-- 主要组件部分 -->
      <section class="card components">
        <h2><i class="icon component"></i> 小程序核心组件</h2>
        <div class="component-categories">
          <div class="category">
            <h3>视图容器</h3>
            <div class="component-list">
              <div class="component-item">
                <div class="comp-icon view"></div>
                <h4>view</h4>
                <p>视图容器，相当于HTML中的div</p>
              </div>
              <div class="component-item">
                <div class="comp-icon scroll"></div>
                <h4>scroll-view</h4>
                <p>可滚动视图区域</p>
              </div>
              <div class="component-item">
                <div class="comp-icon swiper"></div>
                <h4>swiper</h4>
                <p>滑块视图容器，用于轮播图</p>
              </div>
            </div>
          </div>

          <div class="category">
            <h3>基础内容</h3>
            <div class="component-list">
              <div class="component-item">
                <div class="comp-icon text"></div>
                <h4>text</h4>
                <p>文本组件，支持长按选择</p>
              </div>
              <div class="component-item">
                <div class="comp-icon icon"></div>
                <h4>icon</h4>
                <p>图标组件，内置多种图标</p>
              </div>
              <div class="component-item">
                <div class="comp-icon progress"></div>
                <h4>progress</h4>
                <p>进度条组件</p>
              </div>
            </div>
          </div>

          <div class="category">
            <h3>表单组件</h3>
            <div class="component-list">
              <div class="component-item">
                <div class="comp-icon button"></div>
                <h4>button</h4>
                <p>按钮组件，支持多种样式</p>
              </div>
              <div class="component-item">
                <div class="comp-icon input"></div>
                <h4>input</h4>
                <p>输入框组件</p>
              </div>
              <div class="component-item">
                <div class="comp-icon checkbox"></div>
                <h4>checkbox</h4>
                <p>多选框组件</p>
              </div>
            </div>
          </div>

          <div class="category">
            <h3>媒体组件</h3>
            <div class="component-list">
              <div class="component-item">
                <div class="comp-icon image"></div>
                <h4>image</h4>
                <p>图片组件，支持多种模式</p>
              </div>
              <div class="component-item">
                <div class="comp-icon video"></div>
                <h4>video</h4>
                <p>视频播放组件</p>
              </div>
              <div class="component-item">
                <div class="comp-icon camera"></div>
                <h4>camera</h4>
                <p>相机组件，实时视频流</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 功能API部分 -->
      <section class="card apis">
        <h2><i class="icon api"></i> 小程序核心API</h2>
        <div class="api-grid">
          <div class="api-card">
            <div class="api-icon network"></div>
            <h3>网络请求</h3>
            <p>wx.request() 发起HTTPS请求</p>
            <pre class="api-code">wx.request({
  url: 'https://api.example.com',
  method: 'GET',
  success(res) {
    console.log(res.data)
  }
})</pre>
          </div>

          <div class="api-card">
            <div class="api-icon storage"></div>
            <h3>数据存储</h3>
            <p>wx.setStorageSync() 本地存储</p>
            <pre class="api-code">// 异步存储
wx.setStorage({
  key: 'userInfo',
  data: userData
})

// 同步获取
const user = wx.getStorageSync('userInfo')</pre>
          </div>

          <div class="api-card">
            <div class="api-icon location"></div>
            <h3>位置服务</h3>
            <p>wx.getLocation() 获取当前位置</p>
            <pre class="api-code">wx.getLocation({
  type: 'wgs84',
  success(res) {
    const latitude = res.latitude
    const longitude = res.longitude
  }
})</pre>
          </div>

          <div class="api-card">
            <div class="api-icon device"></div>
            <h3>设备信息</h3>
            <p>wx.getSystemInfo() 获取设备信息</p>
            <pre class="api-code">wx.getSystemInfo({
  success(res) {
    console.log(res.model) // 设备型号
    console.log(res.platform) // 操作系统
    console.log(res.windowWidth) // 屏幕宽度
  }
})</pre>
          </div>

          <div class="api-card">
            <div class="api-icon media"></div>
            <h3>媒体操作</h3>
            <p>wx.chooseImage() 选择图片</p>
            <pre class="api-code">wx.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  sourceType: ['album'],
  success(res) {
    const tempFilePaths = res.tempFilePaths
  }
})</pre>
          </div>

          <div class="api-card">
            <div class="api-icon payment"></div>
            <h3>微信支付</h3>
            <p>wx.requestPayment() 发起支付</p>
            <pre class="api-code">wx.requestPayment({
  timeStamp: '',
  nonceStr: '',
  package: '',
  signType: 'MD5',
  paySign: '',
  success(res) { /* 支付成功 */ },
  fail(res) { /* 支付失败 */ }
})</pre>
          </div>
        </div>
      </section>

      <!-- 开发流程部分 -->
      <section class="card workflow">
        <h2><i class="icon workflow"></i> 小程序开发流程</h2>
        <div class="workflow-steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>注册小程序账号</h3>
            <p>在微信公众平台注册小程序账号</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h3>安装开发工具</h3>
            <p>下载并安装微信开发者工具</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h3>创建小程序项目</h3>
            <p>使用开发者工具创建新项目</p>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <h3>编写代码</h3>
            <p>使用WXML、WXSS、JS开发页面</p>
          </div>
          <div class="step">
            <div class="step-number">5</div>
            <h3>调试测试</h3>
            <p>使用模拟器和真机调试功能</p>
          </div>
          <div class="step">
            <div class="step-number">6</div>
            <h3>提交审核</h3>
            <p>上传代码并提交微信审核</p>
          </div>
          <div class="step">
            <div class="step-number">7</div>
            <h3>发布上线</h3>
            <p>审核通过后发布小程序</p>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚区域 -->
    <footer class="miniprogram-footer">
      <div class="footer-content">
        <div class="summary">
          <h3>小程序开发优势</h3>
          <ul>
            <li>无需下载安装，即用即走</li>
            <li>开发成本低，跨平台兼容</li>
            <li>依托微信生态，用户基数大</li>
            <li>丰富的API和组件支持</li>
            <li>完善的开发工具和文档</li>
          </ul>
        </div>
        <div class="resources">
          <h3>学习资源</h3>
          <ul>
            <li><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/" target="_blank">微信官方文档</a></li>
            <li><a href="https://developers.weixin.qq.com/community/homepage">小程序开发社区</a></li>
            <li><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/">UI组件库</a></li>
            <li><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/">最佳实践案例</a></li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        © 2023 小程序开发指南 | 使用Vue3 + TypeScript实现
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 响应式数据
const activeTab = ref(0);
const fileStructure = ref([
  { name: 'app.js', desc: '全局逻辑文件' },
  { name: 'app.json', desc: '全局配置文件' },
  { name: 'app.wxss', desc: '全局样式文件' },
  {
    name: 'pages/', desc: '页面目录', children: [
      {
        name: 'index/', desc: '首页', children: [
          { name: 'index.js' },
          { name: 'index.wxml' },
          { name: 'index.wxss' },
          { name: 'index.json' }
        ]
      },
      {
        name: 'user/', desc: '用户页', children: [
          { name: 'user.js' },
          { name: 'user.wxml' },
          { name: 'user.wxss' },
          { name: 'user.json' }
        ]
      }
    ]
  },
  { name: 'components/', desc: '组件目录' },
  { name: 'utils/', desc: '工具目录' },
  { name: 'images/', desc: '图片资源' }
]);

// 组件列表
const components = ref([
  {
    category: '视图容器',
    items: [
      { name: 'view', desc: '视图容器，相当于HTML中的div' },
      { name: 'scroll-view', desc: '可滚动视图区域' },
      { name: 'swiper', desc: '滑块视图容器，用于轮播图' }
    ]
  },
  {
    category: '基础内容',
    items: [
      { name: 'text', desc: '文本组件，支持长按选择' },
      { name: 'icon', desc: '图标组件，内置多种图标' },
      { name: 'progress', desc: '进度条组件' }
    ]
  },
  {
    category: '表单组件',
    items: [
      { name: 'button', desc: '按钮组件，支持多种样式' },
      { name: 'input', desc: '输入框组件' },
      { name: 'checkbox', desc: '多选框组件' }
    ]
  },
  {
    category: '媒体组件',
    items: [
      { name: 'image', desc: '图片组件，支持多种模式' },
      { name: 'video', desc: '视频播放组件' },
      { name: 'camera', desc: '相机组件，实时视频流' }
    ]
  }
]);

// API示例
const apis = ref([
  {
    name: '网络请求',
    code: `wx.request({
  url: 'https://api.example.com',
  method: 'GET',
  success(res) {
    console.log(res.data)
  }
})`
  },
  {
    name: '数据存储',
    code: `// 异步存储
wx.setStorage({
  key: 'userInfo',
  data: userData
})

// 同步获取
const user = wx.getStorageSync('userInfo')`
  },
  {
    name: '位置服务',
    code: `wx.getLocation({
  type: 'wgs84',
  success(res) {
    const latitude = res.latitude
    const longitude = res.longitude
  }
})`
  }
]);
</script>

<style lang="less" scoped>


.miniprogram-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  color: #333;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
  min-height: 100vh;
}

.miniprogram-header {
  text-align: center;
  padding: 40px 20px;
  margin-bottom: 30px;
  background: linear-gradient(120deg, #07c160, #1aad19);
  color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(7, 193, 96, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2300a651' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
  }

  h1 {
    font-size: 2.8rem;
    margin-bottom: 15px;
    font-weight: 700;
    position: relative;
    z-index: 2;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .subtitle {
    font-size: 1.3rem;
    opacity: 0.9;
    margin-bottom: 30px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    z-index: 2;
  }
}

.phone-mockup {
  max-width: 300px;
  margin: 30px auto 0;
  background: #000;
  border-radius: 30px;
  padding: 15px;
  position: relative;
  z-index: 2;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);

  .phone-screen {
    background: white;
    border-radius: 5px;
    height: 500px;
    display: flex;
    flex-direction: column;
  }

  .app-header {
    background: #07c160;
    color: white;
    padding: 15px;
    text-align: center;
    border-radius: 5px 5px 0 0;

    .app-title {
      font-weight: 500;
      font-size: 1.2rem;
    }
  }

  .tab-bar {
    display: flex;
    justify-content: space-around;
    background: #f8f8f8;
    border-top: 1px solid #eee;
    margin-top: auto;
    padding: 10px 0;

    .tab-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #999;
      font-size: 0.8rem;

      &.active {
        color: #07c160;
      }

      .icon {
        width: 24px;
        height: 24px;
        margin-bottom: 4px;
        background: #ccc;
        border-radius: 50%;

        &.home {
          background: #07c160;
        }

        &.category {
          background: #576b95;
        }

        &.cart {
          background: #f1a73e;
        }

        &.user {
          background: #e64340;
        }
      }
    }
  }
}

.miniprogram-content {
  display: grid;
  gap: 30px;
  margin-bottom: 40px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(7, 193, 96, 0.1);
  }

  h2 {
    color: #07c160;
    font-size: 1.8rem;
    margin-bottom: 25px;
    display: flex;
    align-items: center;

    .icon {
      width: 36px;
      height: 36px;
      background: #e5f7ed;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      color: #07c160;
      font-size: 1.2rem;
    }
  }
}

.file-structure {
  .structure-diagram {
    background: #f8f9ff;
    padding: 25px;
    border-radius: 12px;
    font-family: 'Source Code Pro', monospace;
    margin-bottom: 25px;

    .folder {
      margin-left: 20px;
      margin-bottom: 15px;

      &.root {
        margin-left: 0;
      }
    }

    .folder-name {
      font-weight: 600;
      color: #1a2980;
      margin-bottom: 8px;
      display: flex;
      align-items: center;

      &::before {
        content: '📁';
        margin-right: 8px;
      }

      .folder-desc {
        font-weight: normal;
        color: #666;
        font-size: 0.9rem;
        margin-left: 10px;
      }
    }

    .folder-contents {
      margin-left: 25px;
      border-left: 2px solid #e0e7ff;
      padding-left: 15px;
    }

    .file {
      color: #333;
      margin-bottom: 8px;
      display: flex;
      align-items: center;

      &::before {
        content: '📄';
        margin-right: 8px;
      }

      .file-desc {
        color: #666;
        font-size: 0.9rem;
        margin-left: 10px;
      }
    }
  }

  .file-descriptions {
    h3 {
      color: #1a2980;
      font-size: 1.3rem;
      margin-bottom: 20px;
    }
  }

  .file-desc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;

    .desc-item {
      background: #f0f7ff;
      padding: 20px;
      border-radius: 12px;
      text-align: center;

      .file-icon {
        width: 60px;
        height: 60px;
        background: #1a2980;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin: 0 auto 15px;
        font-weight: bold;
      }

      h4 {
        color: #1a2980;
        margin-bottom: 10px;
      }

      p {
        color: #555;
        font-size: 0.95rem;
      }
    }
  }
}

.navigation-system {
  .navigation-types {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 30px;
  }

  .nav-type {
    background: #f0f7ff;
    padding: 20px;
    border-radius: 12px;

    h3 {
      color: #1a2980;
      margin-bottom: 20px;
    }
  }

  .nav-example {
    margin: 20px 0;

    .tab-bar-demo {
      display: flex;
      background: #f8f8f8;
      border-radius: 30px;
      overflow: hidden;
      max-width: 400px;
      margin: 0 auto;

      .tab-item {
        flex: 1;
        text-align: center;
        padding: 12px;
        font-size: 0.9rem;
        color: #666;
        cursor: pointer;
        transition: all 0.3s ease;

        &.active {
          background: #07c160;
          color: white;
          font-weight: 500;
        }
      }
    }

    .page-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;

      .page {
        background: #1a2980;
        color: white;
        padding: 12px 25px;
        border-radius: 8px;
        font-weight: 500;
      }

      .nav-arrow {
        color: #07c160;
        font-size: 1.5rem;
      }
    }
  }
}

.code-block {
  background: #1e1e1e;
  color: #dcdcdc;
  padding: 20px;
  border-radius: 10px;
  overflow-x: auto;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.9rem;
  margin-top: 20px;
  line-height: 1.6;
}

.components {
  .component-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;

    .category {
      background: #f0f7ff;
      padding: 20px;
      border-radius: 12px;

      h3 {
        color: #1a2980;
        border-bottom: 1px solid #c5d8ff;
        padding-bottom: 12px;
        margin-bottom: 20px;
      }
    }
  }

  .component-list {
    .component-item {
      display: flex;
      align-items: center;
      padding: 15px;
      margin-bottom: 15px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

      .comp-icon {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        color: white;
        font-size: 1.4rem;

        &.view {
          background: #1a2980;
        }

        &.scroll {
          background: #576b95;
        }

        &.swiper {
          background: #07c160;
        }

        &.text {
          background: #f1a73e;
        }

        &.icon {
          background: #e64340;
        }

        &.progress {
          background: #9c26b0;
        }

        &.button {
          background: #07c160;
        }

        &.input {
          background: #1a2980;
        }

        &.checkbox {
          background: #576b95;
        }

        &.image {
          background: #f1a73e;
        }

        &.video {
          background: #e64340;
        }

        &.camera {
          background: #9c26b0;
        }
      }

      h4 {
        color: #1a2980;
        margin-bottom: 5px;
      }

      p {
        color: #666;
        font-size: 0.9rem;
      }
    }
  }
}

.apis {
  .api-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
  }

  .api-card {
    background: #f0f7ff;
    padding: 25px;
    border-radius: 12px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .api-icon {
      width: 60px;
      height: 60px;
      background: #07c160;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      color: white;
      font-size: 1.8rem;

      &.network::after {
        content: "🌐";
      }

      &.storage::after {
        content: "💾";
      }

      &.location::after {
        content: "📍";
      }

      &.device::after {
        content: "📱";
      }

      &.media::after {
        content: "🎬";
      }

      &.payment::after {
        content: "💳";
      }
    }

    h3 {
      color: #1a2980;
      margin-bottom: 12px;
    }

    p {
      color: #555;
      margin-bottom: 15px;
      font-size: 0.95rem;
    }
  }

  .api-code {
    background: #1e1e1e;
    color: #dcdcdc;
    padding: 15px;
    border-radius: 8px;
    font-family: 'Source Code Pro', monospace;
    font-size: 0.85rem;
    overflow-x: auto;
    margin-top: 15px;
  }
}

.workflow {
  .workflow-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 20px;
    text-align: center;

    .step {
      position: relative;
      padding: 25px 15px;
      background: #f0f7ff;
      border-radius: 12px;

      &::after {
        content: '→';
        position: absolute;
        right: -15px;
        top: 50%;
        transform: translateY(-50%);
        color: #07c160;
        font-size: 1.5rem;
      }

      &:last-child::after {
        display: none;
      }
    }

    .step-number {
      width: 40px;
      height: 40px;
      background: #07c160;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin: 0 auto 15px;
      font-size: 1.2rem;
    }

    h3 {
      color: #1a2980;
      font-size: 1.1rem;
      margin-bottom: 10px;
    }

    p {
      color: #666;
      font-size: 0.9rem;
    }
  }
}

.miniprogram-footer {
  background: #1a2980;
  color: white;
  border-radius: 16px;
  padding: 40px 30px 20px;
  margin-top: 30px;

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    margin-bottom: 30px;
  }

  .summary,
  .resources {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #07c160;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        padding: 10px 0;
        border-bottom: 1px dashed rgba(255, 255, 255, 0.1);

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  .resources a {
    color: #4cd964;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .copyright {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .miniprogram-header h1 {
    font-size: 2rem;
  }

  .workflow-steps {
    grid-template-columns: 1fr !important;

    .step::after {
      content: '↓' !important;
      right: 50% !important;
      top: auto !important;
      bottom: -15px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
    }
  }

  .navigation-types {
    grid-template-columns: 1fr !important;
  }
}
</style>
