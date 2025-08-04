<template>
  <div class="wx-components-container">
    <header class="header">
      <div class="title-wrapper">
        <h1>微信小程序常用组件</h1>
        <div class="logo">
          <div class="logo-circle">微</div>
        </div>
      </div>
      <p class="subtitle">高效构建小程序界面的核心组件</p>
    </header>

    <div class="content">
      <section class="intro">
        <div class="card">
          <div class="intro-grid">
            <div class="intro-text">
              <h2>小程序组件系统概述</h2>
              <p>微信小程序提供了一套丰富的组件库，帮助开发者快速构建高质量的用户界面。这些组件涵盖了从基础布局到复杂功能的各种需求，遵循微信设计规范，确保用户体验的一致性。</p>

              <div class="features">
                <div class="feature">
                  <i class="icon icon-native"></i>
                  <div>
                    <h3>原生组件</h3>
                    <p>直接使用微信客户端能力，性能优越</p>
                  </div>
                </div>
                <div class="feature">
                  <i class="icon icon-ui"></i>
                  <div>
                    <h3>统一UI风格</h3>
                    <p>符合微信设计规范，提供一致用户体验</p>
                  </div>
                </div>
                <div class="feature">
                  <i class="icon icon-custom"></i>
                  <div>
                    <h3>高度可定制</h3>
                    <p>支持样式覆盖和自定义扩展</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="intro-image">
              <div class="phone-mockup">
                <div class="phone-screen">
                  <div class="app-header">小程序示例</div>
                  <div class="app-content">
                    <div class="mock-button">按钮组件</div>
                    <div class="mock-list">
                      <div class="list-item">列表项 1</div>
                      <div class="list-item">列表项 2</div>
                      <div class="list-item">列表项 3</div>
                    </div>
                    <div class="mock-tabs">
                      <div class="tab active">首页</div>
                      <div class="tab">发现</div>
                      <div class="tab">我的</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="components-section">
        <h2 class="section-title">
          <i class="icon icon-view"></i>
          <span>视图容器组件</span>
        </h2>

        <div class="components-grid">
          <div class="component-card">
            <div class="component-header">
              <div class="component-icon bg-blue">
                <i class="icon icon-view"></i>
              </div>
              <h3>view</h3>
            </div>
            <div class="component-body">
              <p>基础视图容器，相当于HTML中的div，用于页面布局</p>
              <div class="code-example">
                <pre><code>&lt;view class="container"&gt;
  &lt;text&gt;内容区域&lt;/text&gt;
&lt;/view&gt;</code></pre>
              </div>
              <div class="usage-scenario">
                <h4>使用场景</h4>
                <ul>
                  <li>页面布局和组织结构</li>
                  <li>内容分组和分隔</li>
                  <li>作为其他组件的容器</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="component-card">
            <div class="component-header">
              <div class="component-icon bg-green">
                <i class="icon icon-scroll"></i>
              </div>
              <h3>scroll-view</h3>
            </div>
            <div class="component-body">
              <p>可滚动视图区域，用于处理长列表和可滚动内容</p>
              <div class="code-example">
                <pre><code>&lt;scroll-view scroll-y&gt;
  &lt;view wx:for="&#123;&#123; list &#125;&#125;"&gt;
  &#123;&#123; item &#125;&#125;
  &lt;/view&gt;
&lt;/scroll-view&gt;</code></pre>
              </div>
              <div class="usage-scenario">
                <h4>使用场景</h4>
                <ul>
                  <li>长列表内容展示</li>
                  <li>可滚动内容区域</li>
                  <li>横向/纵向滚动导航</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="component-card">
            <div class="component-header">
              <div class="component-icon bg-orange">
                <i class="icon icon-swiper"></i>
              </div>
              <h3>swiper</h3>
            </div>
            <div class="component-body">
              <p>滑块视图容器，用于实现轮播图效果</p>
              <div class="code-example">
                <pre><code>&lt;swiper indicator-dots autoplay&gt;
  &lt;swiper-item&gt;
    &lt;image src="/banner1.jpg"&gt;&lt;/image&gt;
  &lt;/swiper-item&gt;
  &lt;swiper-item&gt;
    &lt;image src="/banner2.jpg"&gt;&lt;/image&gt;
  &lt;/swiper-item&gt;
&lt;/swiper&gt;</code></pre>
              </div>
              <div class="usage-scenario">
                <h4>使用场景</h4>
                <ul>
                  <li>首页轮播广告</li>
                  <li>图片画廊</li>
                  <li>多步骤引导页面</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="components-section">
        <h2 class="section-title">
          <i class="icon icon-form"></i>
          <span>表单组件</span>
        </h2>

        <div class="components-grid">
          <div class="component-card">
            <div class="component-header">
              <div class="component-icon bg-purple">
                <i class="icon icon-button"></i>
              </div>
              <h3>button</h3>
            </div>
            <div class="component-body">
              <p>按钮组件，用于触发操作和提交表单</p>
              <div class="code-example">
                <pre><code>&lt;button
  type="primary"
  bindtap="handleClick"
&gt;
  提交
&lt;/button&gt;</code></pre>
              </div>
              <div class="usage-scenario">
                <h4>使用场景</h4>
                <ul>
                  <li>表单提交按钮</li>
                  <li>操作触发按钮</li>
                  <li>登录/注册按钮</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="component-card">
            <div class="component-header">
              <div class="component-icon bg-cyan">
                <i class="icon icon-input"></i>
              </div>
              <h3>input</h3>
            </div>
            <div class="component-body">
              <p>输入框组件，用于用户输入文本内容</p>
              <div class="code-example">
                <pre><code>&lt;input
  placeholder="请输入用户名"
  bindinput="onInput"
/&gt;</code></pre>
              </div>
              <div class="usage-scenario">
                <h4>使用场景</h4>
                <ul>
                  <li>表单文本输入</li>
                  <li>搜索框</li>
                  <li>用户信息填写</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="component-card">
            <div class="component-header">
              <div class="component-icon bg-pink">
                <i class="icon icon-picker"></i>
              </div>
              <h3>picker</h3>
            </div>
            <div class="component-body">
              <p>选择器组件，用于从列表中选择选项</p>
              <div class="code-example">
                <pre><code>&lt;picker
  range="&#123;&#123; cities &#125;&#125;"
  bindchange="onCityChange"
&gt;
  &lt;view&gt;当前选择：&#123;&#123; selectedCity &#125;&#125;&lt;/view&gt;
&lt;/picker&gt;</code></pre>
              </div>
              <div class="usage-scenario">
                <h4>使用场景</h4>
                <ul>
                  <li>日期选择</li>
                  <li>地区选择</li>
                  <li>下拉菜单选项</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="components-section">
        <h2 class="section-title">
          <i class="icon icon-media"></i>
          <span>媒体组件</span>
        </h2>

        <div class="components-grid">
          <div class="component-card">
            <div class="component-header">
              <div class="component-icon bg-red">
                <i class="icon icon-image"></i>
              </div>
              <h3>image</h3>
            </div>
            <div class="component-body">
              <p>图片组件，支持多种图片显示模式和懒加载</p>
              <div class="code-example">
                <pre><code>&lt;image
  src="/product.jpg"
  mode="aspectFit"
  lazy-load
&gt;&lt;/image&gt;</code></pre>
              </div>
              <div class="usage-scenario">
                <h4>使用场景</h4>
                <ul>
                  <li>商品展示图片</li>
                  <li>用户头像</li>
                  <li>内容配图</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="component-card">
            <div class="component-header">
              <div class="component-icon bg-yellow">
                <i class="icon icon-video"></i>
              </div>
              <h3>video</h3>
            </div>
            <div class="component-body">
              <p>视频播放器组件，支持多种视频格式和控制功能</p>
              <div class="code-example">
                <pre><code>&lt;video
  src="&#123;&#123; videoUrl &#125;&#125;"
  controls
  autoplay
&gt;&lt;/video&gt;</code></pre>
              </div>
              <div class="usage-scenario">
                <h4>使用场景</h4>
                <ul>
                  <li>短视频播放</li>
                  <li>教学视频</li>
                  <li>产品介绍视频</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="component-card">
            <div class="component-header">
              <div class="component-icon bg-teal">
                <i class="icon icon-camera"></i>
              </div>
              <h3>camera</h3>
            </div>
            <div class="component-body">
              <p>相机组件，用于实现拍照和扫码功能</p>
              <div class="code-example">
                <pre><code>&lt;camera
  device-position="back"
  flash="auto"
&gt;&lt;/camera&gt;
&lt;button bindtap="takePhoto"&gt;拍照&lt;/button&gt;</code></pre>
              </div>
              <div class="usage-scenario">
                <h4>使用场景</h4>
                <ul>
                  <li>二维码/条形码扫描</li>
                  <li>拍照上传功能</li>
                  <li>人脸识别</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="components-section">
        <h2 class="section-title">
          <i class="icon icon-nav"></i>
          <span>导航与交互组件</span>
        </h2>

        <div class="components-grid">
          <div class="component-card">
            <div class="component-header">
              <div class="component-icon bg-indigo">
                <i class="icon icon-navigator"></i>
              </div>
              <h3>navigator</h3>
            </div>
            <div class="component-body">
              <p>页面链接组件，用于实现页面跳转功能</p>
              <div class="code-example">
                <pre><code>&lt;navigator
  url="/pages/detail/detail?id=123"
  open-type="navigate"
&gt;
  查看详情
&lt;/navigator&gt;</code></pre>
              </div>
              <div class="usage-scenario">
                <h4>使用场景</h4>
                <ul>
                  <li>页面间导航跳转</li>
                  <li>商品详情页入口</li>
                  <li>返回上一页</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="component-card">
            <div class="component-header">
              <div class="component-icon bg-deep-orange">
                <i class="icon icon-tabbar"></i>
              </div>
              <h3>自定义 tabBar</h3>
            </div>
            <div class="component-body">
              <p>自定义底部导航栏，实现个性化设计</p>
              <div class="code-example">
                <pre><code>// app.json
"tabBar": {
  "custom": true,
  "list": [...]
}

// 自定义组件
&lt;custom-tab-bar&gt;&lt;/custom-tab-bar&gt;</code></pre>
              </div>
              <div class="usage-scenario">
                <h4>使用场景</h4>
                <ul>
                  <li>个性化底部导航设计</li>
                  <li>带特殊效果的导航栏</li>
                  <li>需要中间凸起按钮的导航</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="component-card">
            <div class="component-header">
              <div class="component-icon bg-brown">
                <i class="icon icon-modal"></i>
              </div>
              <h3>模态弹窗</h3>
            </div>
            <div class="component-body">
              <p>模态对话框组件，用于重要操作确认</p>
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
              <div class="usage-scenario">
                <h4>使用场景</h4>
                <ul>
                  <li>操作确认对话框</li>
                  <li>重要信息提示</li>
                  <li>用户选择确认</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2 class="section-title">
          <i class="icon icon-practice"></i>
          <span>最佳实践与技巧</span>
        </h2>
        <div class="card">
          <div class="practices-grid">
            <div class="practice">
              <h3><i class="icon icon-performance"></i> 性能优化</h3>
              <ul>
                <li>使用虚拟列表处理长列表数据</li>
                <li>图片使用懒加载和合适尺寸</li>
                <li>避免频繁setData，合并更新</li>
              </ul>
            </div>
            <div class="practice">
              <h3><i class="icon icon-design"></i> UI设计原则</h3>
              <ul>
                <li>遵循微信官方设计规范</li>
                <li>保持界面简洁，避免过度设计</li>
                <li>使用一致的间距和颜色方案</li>
              </ul>
            </div>
            <div class="practice">
              <h3><i class="icon icon-code"></i> 代码组织</h3>
              <ul>
                <li>使用自定义组件封装复用UI</li>
                <li>合理拆分页面和组件</li>
                <li>使用WXS处理复杂逻辑</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>微信小程序组件库 | 构建卓越用户体验的核心工具</p>
      <div class="links">
        <a href="https://developers.weixin.qq.com/miniprogram/dev/component/" target="_blank">官方文档</a>
        <a href="https://github.com/wechat-miniprogram" target="_blank">GitHub</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  // 初始化动画效果
  const cards = document.querySelectorAll('.component-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate-in');
    }, 100 * index);
  });
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

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

// 布局和基础样式
.wx-components-container {
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
      font-size: 24px;
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

.section-title {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: @text-primary;
  padding-bottom: 10px;
  position: relative;
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
    width: 36px;
    height: 36px;
    background: @primary-color;
    color: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
}

.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: @card-shadow;
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid @border-color;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-3px);
  }
}

// 简介部分
.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.intro-text {
  h2 {
    font-size: 1.8rem;
    color: @text-primary;
    margin-top: 0;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 25px;
    line-height: 1.7;
    color: @text-secondary;
  }
}

.features {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 30px;
}

.feature {
  display: flex;
  gap: 15px;
  align-items: flex-start;

  .icon {
    width: 50px;
    height: 50px;
    background: fade(@primary-color, 10%);
    color: @primary-color;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  h3 {
    font-size: 1.2rem;
    margin: 0 0 5px;
    color: @text-primary;
  }

  p {
    margin: 0;
    color: @text-secondary;
    font-size: 0.95rem;
  }
}

.intro-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-mockup {
  width: 280px;
  height: 500px;
  background: #f1f2f6;
  border-radius: 40px;
  padding: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 5px;
    background: #e0e0e0;
    border-radius: 5px;
  }
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 30px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: @primary-color;
  color: white;
  padding: 20px;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
}

.app-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mock-button {
  background: @primary-color;
  color: white;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  box-shadow: 0 4px 10px fade(@primary-color, 30%);
}

.mock-list {
  background: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eee;
}

.list-item {
  padding: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
}

.mock-tabs {
  display: flex;
  background: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  margin-top: auto;
  border: 1px solid #eee;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 12px;
  font-size: 0.9rem;

  &.active {
    background: @primary-color;
    color: white;
    font-weight: 500;
  }
}

// 组件部分
.components-section {
  margin-top: 50px;
}

.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.component-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid @border-color;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}

.component-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f9fbfd;
  border-bottom: 1px solid @border-color;
}

.component-icon {
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
}

.component-body {
  padding: 20px;

  p {
    color: @text-secondary;
    margin-bottom: 20px;
    line-height: 1.6;
  }
}

.code-example {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
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

.usage-scenario {
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
    }
  }
}

// 最佳实践部分
.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.practice {
  background: #f9fbfd;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid @primary-color;

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: @text-primary;

    .icon {
      width: 30px;
      height: 30px;
      background: fade(@primary-color, 15%);
      color: @primary-color;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 10px;
      color: @text-secondary;
      line-height: 1.6;
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
    margin-bottom: 15px;
  }

  .links {
    display: flex;
    justify-content: center;
    gap: 30px;

    a {
      color: @primary-color;
      text-decoration: none;
      font-weight: 500;
      position: relative;
      padding: 0 5px;

      &::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 0;
        height: 2px;
        background: @primary-color;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
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

  .section-title {
    font-size: 1.4rem;
  }

  .card {
    padding: 20px;
  }

  .components-grid {
    grid-template-columns: 1fr;
  }

  .intro-grid {
    grid-template-columns: 1fr;
  }

  .phone-mockup {
    width: 250px;
    height: 450px;
  }
}
</style>
