<template>
  <div class="h5-adaptation-container">
    <header class="page-header">
      <h1 class="title">H5移动端适配问题与解决方案</h1>
      <p class="subtitle">全面解决移动端开发中的适配难题</p>
    </header>

    <main class="content">
      <!-- 适配概述 -->
      <section class="overview-section">
        <div class="card">
          <h2 class="card-title">移动端适配概述</h2>
          <div class="card-content">
            <div class="overview-content">
              <p class="intro-text">
                移动端适配是H5开发中的核心挑战，涉及屏幕尺寸、设备特性、浏览器兼容性等多方面问题。
              </p>
              <div class="adaptation-stats">
                <div class="stat-item">
                  <div class="stat-number">20+</div>
                  <div class="stat-label">常见适配问题</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">50+</div>
                  <div class="stat-label">解决方案</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">100%</div>
                  <div class="stat-label">设备覆盖率</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 视口与布局 -->
      <section class="viewport-section">
        <div class="card">
          <h2 class="card-title">视口与布局适配</h2>
          <div class="card-content">
            <div class="problems-grid">
              <div class="problem-category">
                <h3>视口配置问题</h3>
                <div class="problem-list">
                  <div class="problem-item">
                    <div class="problem-header">
                      <h4>1. 视口缩放问题</h4>
                      <span class="problem-tag critical">严重</span>
                    </div>
                    <div class="problem-content">
                      <div class="problem-desc">
                        <p><strong>问题描述：</strong>页面在移动端被自动缩放，导致布局错乱</p>
                        <p><strong>影响设备：</strong>所有iOS和部分Android设备</p>
                      </div>
                      <div class="solutions">
                        <h5>解决方案：</h5>
                        <div class="solution-item">
                          <span class="solution-type">HTML Meta</span>
                          <div class="code-block">
                            <pre><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"&gt;</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">CSS 修复</span>
                          <div class="code-block">
                            <pre><code>/* 禁止缩放 */
html {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  text-size-adjust: 100%;
}</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="problem-item">
                    <div class="problem-header">
                      <h4>2. 安全区域适配</h4>
                      <span class="problem-tag important">重要</span>
                    </div>
                    <div class="problem-content">
                      <div class="problem-desc">
                        <p><strong>问题描述：</strong>iPhone X+ 系列的刘海屏和底部黑条区域内容被遮挡</p>
                        <p><strong>影响设备：</strong>iPhone X及以上机型</p>
                      </div>
                      <div class="solutions">
                        <h5>解决方案：</h5>
                        <div class="solution-item">
                          <span class="solution-type">Viewport Fit</span>
                          <div class="code-block">
                            <pre><code>&lt;meta name="viewport" content="viewport-fit=cover"&gt;</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">CSS 安全区域</span>
                          <div class="code-block">
                            <pre><code>/* 适配刘海屏 */
.safe-area {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* 底部安全区域 */
.bottom-safe {
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
}</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">JavaScript 检测</span>
                          <div class="code-block">
                            <pre><code>// 检测是否为刘海屏设备
function isNotchDevice() {
  return /iPhone X|iPhone 11|iPhone 12|iPhone 13|iPhone 14/i.test(navigator.userAgent) ||
         (window.screen.height >= 812 && window.devicePixelRatio >= 2);
}</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="problem-category">
                <h3>布局适配问题</h3>
                <div class="problem-list">
                  <div class="problem-item">
                    <div class="problem-header">
                      <h4>3. 1px边框问题</h4>
                      <span class="problem-tag common">常见</span>
                    </div>
                    <div class="problem-content">
                      <div class="problem-desc">
                        <p><strong>问题描述：</strong>在高清屏上1px边框显示过粗</p>
                        <p><strong>影响设备：</strong>所有Retina屏幕设备</p>
                      </div>
                      <div class="solutions">
                        <h5>解决方案：</h5>
                        <div class="solution-item">
                          <span class="solution-type">CSS 缩放方案</span>
                          <div class="code-block">
                            <pre><code>.thin-border {
  position: relative;
}
.thin-border::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  border: 1px solid #e0e0e0;
  transform: scale(0.5);
  transform-origin: 0 0;
  pointer-events: none;
  box-sizing: border-box;
}</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">CSS 媒体查询</span>
                          <div class="code-block">
                            <pre><code>/* 设备像素比适配 */
@media (-webkit-min-device-pixel-ratio: 2) {
  .thin-border {
    border-width: 0.5px;
  }
}

@media (-webkit-min-device-pixel-ratio: 3) {
  .thin-border {
    border-width: 0.333px;
  }
}</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="problem-item">
                    <div class="problem-header">
                      <h4>4. 响应式布局问题</h4>
                      <span class="problem-tag critical">严重</span>
                    </div>
                    <div class="problem-content">
                      <div class="problem-desc">
                        <p><strong>问题描述：</strong>在不同尺寸设备上布局错乱</p>
                        <p><strong>影响设备：</strong>所有移动设备</p>
                      </div>
                      <div class="solutions">
                        <h5>解决方案：</h5>
                        <div class="solution-item">
                          <span class="solution-type">Flexible 方案</span>
                          <div class="code-block">
                            <pre><code>// 设置根元素字体大小
function setRem() {
  const docEl = document.documentElement;
  const width = docEl.clientWidth;
  const rem = width / 7.5; // 以750px设计稿为例
  docEl.style.fontSize = rem + 'px';
}

window.addEventListener('resize', setRem);
setRem();</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">Viewport 方案</span>
                          <div class="code-block">
                            <pre><code>/* 使用vw单位 */
.container {
  width: 100vw;
  padding: 4vw;
}

.box {
  width: 50vw;
  height: 25vw;
  font-size: 4vw;
}

/* 兼容方案 */
@supports not (width: 100vw) {
  .container {
    width: 100%;
  }
}</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">媒体查询方案</span>
                          <div class="code-block">
                            <pre><code>/* 移动端优先的响应式设计 */
.container {
  width: 100%;
  padding: 10px;
}

/* 平板 */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }
}

/* 桌面端 */
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 交互与体验 -->
      <section class="interaction-section">
        <div class="card">
          <h2 class="card-title">交互与体验适配</h2>
          <div class="card-content">
            <div class="problems-grid">
              <div class="problem-category">
                <h3>触摸交互问题</h3>
                <div class="problem-list">
                  <div class="problem-item">
                    <div class="problem-header">
                      <h4>5. 点击延迟问题</h4>
                      <span class="problem-tag common">常见</span>
                    </div>
                    <div class="problem-content">
                      <div class="problem-desc">
                        <p><strong>问题描述：</strong>移动端点击有300ms延迟</p>
                        <p><strong>影响设备：</strong>所有移动浏览器</p>
                      </div>
                      <div class="solutions">
                        <h5>解决方案：</h5>
                        <div class="solution-item">
                          <span class="solution-type">Viewport 方案</span>
                          <div class="code-block">
                            <pre><code>&lt;meta name="viewport" content="width=device-width"&gt;</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">FastClick 库</span>
                          <div class="code-block">
                            <pre><code>// 使用FastClick库
import FastClick from 'fastclick';

// 初始化
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">CSS 解决方案</span>
                          <div class="code-block">
                            <pre><code>/* 禁用双击缩放 */
html {
  touch-action: manipulation;
}

/* 或者更精确的控制 */
.clickable {
  touch-action: manipulation;
  cursor: pointer;
}</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="problem-item">
                    <div class="problem-header">
                      <h4>6. 触摸点按问题</h4>
                      <span class="problem-tag important">重要</span>
                    </div>
                    <div class="problem-content">
                      <div class="problem-desc">
                        <p><strong>问题描述：</strong>触摸点太小，难以准确点击</p>
                        <p><strong>影响设备：</strong>所有触摸屏设备</p>
                      </div>
                      <div class="solutions">
                        <h5>解决方案：</h5>
                        <div class="solution-item">
                          <span class="solution-type">CSS 最小触摸区域</span>
                          <div class="code-block">
                            <pre><code>/* 设置最小触摸尺寸 */
.tap-target {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 16px;
}

/* 或者使用伪元素扩大点击区域 */
.btn {
  position: relative;
}
.btn::after {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
}</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="problem-category">
                <h3>滚动体验问题</h3>
                <div class="problem-list">
                  <div class="problem-item">
                    <div class="problem-header">
                      <h4>7. 滚动穿透问题</h4>
                      <span class="problem-tag common">常见</span>
                    </div>
                    <div class="problem-content">
                      <div class="problem-desc">
                        <p><strong>问题描述：</strong>弹窗出现时底层页面仍然可以滚动</p>
                        <p><strong>影响设备：</strong>所有移动设备</p>
                      </div>
                      <div class="solutions">
                        <h5>解决方案：</h5>
                        <div class="solution-item">
                          <span class="solution-type">CSS 解决方案</span>
                          <div class="code-block">
                            <pre><code>/* 弹窗显示时禁止body滚动 */
.modal-open {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 或者使用overscroll-behavior */
.body-no-scroll {
  overscroll-behavior: none;
}</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">JavaScript 解决方案</span>
                          <div class="code-block">
                            <pre><code>function preventScroll(enable) {
  const body = document.body;
  if (enable) {
    // 记录当前位置
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    body.style.position = 'fixed';
    body.style.top = `-${scrollTop}px`;
    body.style.width = '100%';
  } else {
    const scrollTop = parseInt(body.style.top || '0');
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    window.scrollTo(0, -scrollTop);
  }
}</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="problem-item">
                    <div class="problem-header">
                      <h4>8. 滚动回弹效果</h4>
                      <span class="problem-tag common">常见</span>
                    </div>
                    <div class="problem-content">
                      <div class="problem-desc">
                        <p><strong>问题描述：</strong>iOS的-webkit-overflow-scrolling在特定情况下失效</p>
                        <p><strong>影响设备：</strong>iOS设备</p>
                      </div>
                      <div class="solutions">
                        <h5>解决方案：</h5>
                        <div class="solution-item">
                          <span class="solution-type">CSS 滚动优化</span>
                          <div class="code-block">
                            <pre><code>.scroll-container {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  overflow: auto;

  /* 修复滚动卡顿 */
  transform: translateZ(0);
  -webkit-transform: translateZ(0);

  /* 隐藏滚动条 */
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scroll-container::-webkit-scrollbar {
  display: none;
}</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">Better-Scroll 库</span>
                          <div class="code-block">
                            <pre><code>import BScroll from 'better-scroll';

const scroll = new BScroll('.scroll-container', {
  scrollY: true,
  click: true,
  tap: true,
  bounce: {
    top: true,
    bottom: true
  },
  // 其他配置...
});</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 图片与媒体 -->
      <section class="media-section">
        <div class="card">
          <h2 class="card-title">图片与媒体适配</h2>
          <div class="card-content">
            <div class="problems-grid">
              <div class="problem-category">
                <h3>图片适配问题</h3>
                <div class="problem-list">
                  <div class="problem-item">
                    <div class="problem-header">
                      <h4>9. 图片模糊问题</h4>
                      <span class="problem-tag common">常见</span>
                    </div>
                    <div class="problem-content">
                      <div class="problem-desc">
                        <p><strong>问题描述：</strong>在高清屏上图片显示模糊</p>
                        <p><strong>影响设备：</strong>所有Retina屏幕设备</p>
                      </div>
                      <div class="solutions">
                        <h5>解决方案：</h5>
                        <div class="solution-item">
                          <span class="solution-type">多倍图方案</span>
                          <div class="code-block">
                            <pre><code>/* 背景图多倍图 */
.icon {
  background-image: url('image@1x.png');
  background-size: 100% 100%;
}

@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 2dppx) {
  .icon {
    background-image: url('image@2x.png');
  }
}

@media (-webkit-min-device-pixel-ratio: 3),
       (min-resolution: 3dppx) {
  .icon {
    background-image: url('image@3x.png');
  }
}</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">IMG srcset方案</span>
                          <div class="code-block">
                            <pre><code>&lt;img
  src="image-1x.jpg"
  srcset="image-1x.jpg 1x, image-2x.jpg 2x, image-3x.jpg 3x"
  alt="示例图片"
&gt;</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">Picture 元素</span>
                          <div class="code-block">
                            <pre><code>&lt;picture&gt;
  &lt;source media="(min-width: 1200px)" srcset="large.jpg"&gt;
  &lt;source media="(min-width: 768px)" srcset="medium.jpg"&gt;
  &lt;img src="small.jpg" alt="响应式图片"&gt;
&lt;/picture&gt;</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="problem-item">
                    <div class="problem-header">
                      <h4>10. 图片加载性能</h4>
                      <span class="problem-tag important">重要</span>
                    </div>
                    <div class="problem-content">
                      <div class="problem-desc">
                        <p><strong>问题描述：</strong>大图加载慢，影响页面性能</p>
                        <p><strong>影响设备：</strong>所有移动设备，特别是网络较慢的情况</p>
                      </div>
                      <div class="solutions">
                        <h5>解决方案：</h5>
                        <div class="solution-item">
                          <span class="solution-type">懒加载方案</span>
                          <div class="code-block">
                            <pre><code>// 使用Intersection Observer实现懒加载
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">WebP格式支持</span>
                          <div class="code-block">
                            <pre><code>&lt;picture&gt;
  &lt;source type="image/webp" srcset="image.webp"&gt;
  &lt;source type="image/jpeg" srcset="image.jpg"&gt;
  &lt;img src="image.jpg" alt="WebP图片示例"&gt;
&lt;/picture&gt;</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 字体与文本 -->
      <section class="typography-section">
        <div class="card">
          <h2 class="card-title">字体与文本适配</h2>
          <div class="card-content">
            <div class="problems-grid">
              <div class="problem-category">
                <h3>字体渲染问题</h3>
                <div class="problem-list">
                  <div class="problem-item">
                    <div class="problem-header">
                      <h4>11. 字体大小适配</h4>
                      <span class="problem-tag common">常见</span>
                    </div>
                    <div class="problem-content">
                      <div class="problem-desc">
                        <p><strong>问题描述：</strong>字体在不同设备上显示大小不一致</p>
                        <p><strong>影响设备：</strong>所有移动设备</p>
                      </div>
                      <div class="solutions">
                        <h5>解决方案：</h5>
                        <div class="solution-item">
                          <span class="solution-type">相对单位方案</span>
                          <div class="code-block">
                            <pre><code>/* 使用rem单位 */
html {
  font-size: 16px;
}

body {
  font-size: 1rem; /* 16px */
}

h1 {
  font-size: 2rem; /* 32px */
}

/* 或者使用vw单位 */
.responsive-text {
  font-size: 4vw;
}

/* 设置最小和最大字体 */
.clamped-text {
  font-size: clamp(14px, 4vw, 18px);
}</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">防止字体放大</span>
                          <div class="code-block">
                            <pre><code>/* 禁止系统字体缩放 */
body {
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  text-size-adjust: 100%;
}</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="problem-item">
                    <div class="problem-header">
                      <h4>12. 字体闪动问题</h4>
                      <span class="problem-tag common">常见</span>
                    </div>
                    <div class="problem-content">
                      <div class="problem-desc">
                        <p><strong>问题描述：</strong>自定义字体加载期间的闪动(FOUT/FOIT)</p>
                        <p><strong>影响设备：</strong>所有使用自定义字体的设备</p>
                      </div>
                      <div class="solutions">
                        <h5>解决方案：</h5>
                        <div class="solution-item">
                          <span class="solution-type">Font Loading API</span>
                          <div class="code-block">
                            <pre><code>// 使用Font Loading API
const font = new FontFace('MyFont', 'url(myfont.woff2)');

font.load().then(function(loadedFont) {
  document.fonts.add(loadedFont);
  document.body.classList.add('fonts-loaded');
}).catch(function(error) {
  console.log('字体加载失败:', error);
});</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">CSS font-display</span>
                          <div class="code-block">
                            <pre><code>@font-face {
  font-family: 'MyFont';
  src: url('myfont.woff2') format('woff2');
  font-display: swap; /* 交换期显示备用字体 */
}</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 表单与输入 -->
      <section class="form-section">
        <div class="card">
          <h2 class="card-title">表单与输入适配</h2>
          <div class="card-content">
            <div class="problems-grid">
              <div class="problem-category">
                <h3>输入体验问题</h3>
                <div class="problem-list">
                  <div class="problem-item">
                    <div class="problem-header">
                      <h4>13. 键盘弹起问题</h4>
                      <span class="problem-tag critical">严重</span>
                    </div>
                    <div class="problem-content">
                      <div class="problem-desc">
                        <p><strong>问题描述：</strong>键盘弹起导致页面布局错乱</p>
                        <p><strong>影响设备：</strong>所有移动设备</p>
                      </div>
                      <div class="solutions">
                        <h5>解决方案：</h5>
                        <div class="solution-item">
                          <span class="solution-type">滚动到可视区域</span>
                          <div class="code-block">
                            <pre><code>// 输入框获取焦点时滚动到可视区域
function scrollToInput(element) {
  const rect = element.getBoundingClientRect();
  const absoluteTop = window.pageYOffset + rect.top;
  const middle = absoluteTop - (window.innerHeight / 2);

  window.scrollTo({
    top: middle,
    behavior: 'smooth'
  });
}

// 监听输入框焦点事件
document.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('focus', () => scrollToInput(input));
});</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">CSS 布局优化</span>
                          <div class="code-block">
                            <pre><code>/* 使用flex布局避免布局错乱 */
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  overflow: auto;
}

.footer {
  flex-shrink: 0;
}</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="problem-item">
                    <div class="problem-header">
                      <h4>14. 输入类型优化</h4>
                      <span class="problem-tag important">重要</span>
                    </div>
                    <div class="problem-content">
                      <div class="problem-desc">
                        <p><strong>问题描述：</strong>不同输入类型在移动端的键盘体验不佳</p>
                        <p><strong>影响设备：</strong>所有移动设备</p>
                      </div>
                      <div class="solutions">
                        <h5>解决方案：</h5>
                        <div class="solution-item">
                          <span class="solution-type">HTML5 输入类型</span>
                          <div class="code-block">
                            <pre><code>&lt;!-- 电话号码 --&gt;
&lt;input type="tel" pattern="[0-9]*" inputmode="numeric"&gt;

&lt;!-- 邮箱 --&gt;
&lt;input type="email" inputmode="email"&gt;

&lt;!-- 数字 --&gt;
&lt;input type="number" pattern="[0-9]*" inputmode="decimal"&gt;

&lt;!-- 搜索 --&gt;
&lt;input type="search"&gt;

&lt;!-- URL --&gt;
&lt;input type="url" inputmode="url"&gt;</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">CSS 输入优化</span>
                          <div class="code-block">
                            <pre><code>/* 移除输入框默认样式 */
input, textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
}

/* 移除type="number"的上下箭头 */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 性能与兼容性 -->
      <section class="performance-section">
        <div class="card">
          <h2 class="card-title">性能与兼容性适配</h2>
          <div class="card-content">
            <div class="problems-grid">
              <div class="problem-category">
                <h3>性能优化问题</h3>
                <div class="problem-list">
                  <div class="problem-item">
                    <div class="problem-header">
                      <h4>15. 动画性能问题</h4>
                      <span class="problem-tag important">重要</span>
                    </div>
                    <div class="problem-content">
                      <div class="problem-desc">
                        <p><strong>问题描述：</strong>动画卡顿，性能不佳</p>
                        <p><strong>影响设备：</strong>低端安卓设备</p>
                      </div>
                      <div class="solutions">
                        <h5>解决方案：</h5>
                        <div class="solution-item">
                          <span class="solution-type">CSS 硬件加速</span>
                          <div class="code-block">
                            <pre><code>/* 启用GPU加速 */
.animate-element {
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
}

/* 使用transform和opacity进行动画 */
.good-animation {
  transform: translateX(100px);
  opacity: 0.5;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* 避免动画属性 */
.bad-animation {
  /* 避免使用这些属性做动画 */
  /* width, height, margin, padding, left, top */
}</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">JavaScript 优化</span>
                          <div class="code-block">
                            <pre><code>// 使用requestAnimationFrame
function animate() {
  // 动画逻辑
  element.style.transform = `translateX(${progress}px)`;

  if (progress < 100) {
    requestAnimationFrame(animate);
  }
}

// 使用Web Animations API
element.animate([
  { transform: 'translateX(0)' },
  { transform: 'translateX(100px)' }
], {
  duration: 1000,
  easing: 'ease-in-out'
});</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="problem-category">
                <h3>浏览器兼容问题</h3>
                <div class="problem-list">
                  <div class="problem-item">
                    <div class="problem-header">
                      <h4>16. 浏览器兼容性</h4>
                      <span class="problem-tag critical">严重</span>
                    </div>
                    <div class="problem-content">
                      <div class="problem-desc">
                        <p><strong>问题描述：</strong>不同浏览器和版本之间的兼容性问题</p>
                        <p><strong>影响设备：</strong>所有移动浏览器</p>
                      </div>
                      <div class="solutions">
                        <h5>解决方案：</h5>
                        <div class="solution-item">
                          <span class="solution-type">特性检测</span>
                          <div class="code-block">
                            <pre><code>// 检测特性支持
function supportsFeature(feature) {
  switch(feature) {
    case 'flexbox':
      return 'flexBasis' in document.documentElement.style;
    case 'grid':
      return 'grid' in document.documentElement.style;
    case 'touch':
      return 'ontouchstart' in window;
    case 'passive':
      let supportsPassive = false;
      try {
        const opts = Object.defineProperty({}, 'passive', {
          get: function() { supportsPassive = true; }
        });
        window.addEventListener('test', null, opts);
      } catch (e) {}
      return supportsPassive;
  }
}</code></pre>
                          </div>
                        </div>
                        <div class="solution-item">
                          <span class="solution-type">Polyfill 方案</span>
                          <div class="code-block">
                            <pre><code>// 使用polyfill.io动态加载polyfill
&lt;script src="https://polyfill.io/v3/polyfill.min.js?features=es6,IntersectionObserver,fetch"&gt;&lt;/script&gt;

// 或者使用特定的polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 工具与最佳实践 -->
      <section class="tools-section">
        <div class="card">
          <h2 class="card-title">工具与最佳实践</h2>
          <div class="card-content">
            <div class="tools-content">
              <div class="tools-grid">
                <div class="tool-category">
                  <h3>开发工具</h3>
                  <div class="tool-list">
                    <div class="tool-item">
                      <h4>PostCSS 插件</h4>
                      <p>用于自动添加浏览器前缀和px到rem转换</p>
                      <div class="code-block">
                        <pre><code>// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-pxtorem')({
      rootValue: 16,
      propList: ['*'],
      exclude: /node_modules/i
    })
  ]
}</code></pre>
                      </div>
                    </div>
                    <div class="tool-item">
                      <h4>VW 适配方案</h4>
                      <p>使用postcss-px-to-viewport进行vw单位转换</p>
                      <div class="code-block">
                        <pre><code>// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-px-to-viewport')({
      viewportWidth: 750, // 设计稿宽度
      viewportHeight: 1334,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false
    })
  ]
}</code></pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="tool-category">
                  <h3>测试工具</h3>
                  <div class="tool-list">
                    <div class="tool-item">
                      <h4>浏览器开发工具</h4>
                      <ul>
                        <li>Chrome DevTools 设备模拟</li>
                        <li>Safari Responsive Design Mode</li>
                        <li>Firefox Responsive Design Mode</li>
                      </ul>
                    </div>
                    <div class="tool-item">
                      <h4>在线测试工具</h4>
                      <ul>
                        <li>BrowserStack - 多设备测试</li>
                        <li>LambdaTest - 跨浏览器测试</li>
                        <li>Google Mobile-Friendly Test</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="best-practices">
                <h3>最佳实践总结</h3>
                <div class="practices-grid">
                  <div class="practice-item">
                    <div class="practice-icon">📱</div>
                    <div class="practice-content">
                      <h4>移动优先设计</h4>
                      <p>从移动端开始设计，逐步增强到桌面端</p>
                    </div>
                  </div>
                  <div class="practice-item">
                    <div class="practice-icon">⚡</div>
                    <div class="practice-content">
                      <h4>性能优化</h4>
                      <p>关注首屏加载时间和运行时性能</p>
                    </div>
                  </div>
                  <div class="practice-item">
                    <div class="practice-icon">🎯</div>
                    <div class="practice-content">
                      <h4>渐进增强</h4>
                      <p>确保基础功能在所有设备上都能正常工作</p>
                    </div>
                  </div>
                  <div class="practice-item">
                    <div class="practice-icon">🔍</div>
                    <div class="practice-content">
                      <h4>全面测试</h4>
                      <p>在真实设备上进行充分测试</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加响应式数据或方法
</script>

<style lang="less" scoped>
.h5-adaptation-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf7 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
  padding: 32px 0;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 8px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #7f8c8d;
    margin: 0;
    font-weight: 300;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  border: 1px solid #e1e8ed;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 16px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid #e9ecef;
  }
}

.overview-content {
  .intro-text {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 24px;
    text-align: center;
  }
}

.adaptation-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 32px;
}

.stat-item {
  text-align: center;

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #666;
  }
}

.problems-grid {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.problem-category {
  h3 {
    margin: 0 0 20px 0;
    color: #2c3e50;
    font-size: 1.3rem;
    padding-bottom: 8px;
    border-bottom: 2px solid #e9ecef;
  }
}

.problem-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.problem-item {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.problem-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #e9ecef;

  h4 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .problem-tag {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;

    &.critical {
      background: #f8d7da;
      color: #721c24;
    }

    &.important {
      background: #fff3cd;
      color: #856404;
    }

    &.common {
      background: #d1ecf1;
      color: #0c5460;
    }
  }
}

.problem-content {
  padding: 20px;
}

.problem-desc {
  margin-bottom: 20px;

  p {
    margin: 0 0 8px 0;
    color: #555;

    strong {
      color: #2c3e50;
    }
  }
}

.solutions {
  h5 {
    margin: 0 0 16px 0;
    color: #2c3e50;
    font-size: 1rem;
  }
}

.solution-item {
  margin-bottom: 20px;

  .solution-type {
    display: inline-block;
    background: #667eea;
    color: white;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 8px;
  }
}

.code-block {
  background: #2d3748;
  border-radius: 6px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;

    code {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      line-height: 1.4;
    }
  }
}

.tools-content {
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
    margin-bottom: 32px;
  }
}

.tool-category {
  h3 {
    margin: 0 0 16px 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }
}

.tool-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tool-item {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;

  h4 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  p {
    margin: 0 0 12px 0;
    color: #666;
    font-size: 0.9rem;
  }

  ul {
    margin: 0;
    padding-left: 20px;

    li {
      margin-bottom: 4px;
      color: #555;
      font-size: 0.9rem;
    }
  }
}

.best-practices {
  h3 {
    margin: 0 0 20px 0;
    color: #2c3e50;
    font-size: 1.3rem;
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.practice-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }

  .practice-icon {
    font-size: 2rem;
    margin-right: 16px;
  }

  .practice-content {
    h4 {
      margin: 0 0 8px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .h5-adaptation-container {
    padding: 16px;
  }

  .page-header .title {
    font-size: 2rem;
  }

  .card {
    padding: 20px;
  }

  .adaptation-stats {
    flex-direction: column;
    gap: 20px;
  }

  .tools-grid {
    grid-template-columns: 1fr;
  }

  .practices-grid {
    grid-template-columns: 1fr;
  }

  .problem-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .problem-content {
    padding: 16px;
  }

  .tool-item {
    padding: 16px;
  }

  .practice-item {
    flex-direction: column;
    text-align: center;

    .practice-icon {
      margin-right: 0;
      margin-bottom: 12px;
    }
  }
}
</style>
