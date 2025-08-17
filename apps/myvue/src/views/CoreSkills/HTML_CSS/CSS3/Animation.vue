<template>
  <div class="animation-guide">
    <h1 class="main-title">🎬 CSS Animation 基本指南</h1>

    <!-- 核心概览 -->
    <section class="overview-section">
      <div class="overview-card">
        <div class="animation-visual">
          <div class="animated-box" :style="animationStyle"></div>
        </div>
        <div class="overview-text">
          <h2>🌈 动画属性组成</h2>
          <div class="property-tags">
            <span v-for="prop in animationProps" :key="prop.name" :class="['tag', prop.class]">
              {{ prop.name }}({{ prop.chineseName }})
            </span>
          </div>
          <div>
            <span>animation(</span>
            <span v-for="prop in animationProps" :key="prop.name">
              {{ prop.name }}({{ prop.chineseName }}),
            </span>
            <span>)</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 属性基础介绍 -->
    <section class="property-section">
      <h2 class="section-title">🔧 动画属性基础介绍</h2>

      <div class="property-grid">
        <!-- animation-name -->
        <div class="property-card">
          <div class="card-header name">
            <h3>animation-name</h3>
            <h3>动画名称</h3>
            <span class="value-preview">move, rotate...</span>
          </div>
          <div class="card-content">
            <pre><code>@keyframes move {
  0% { transform: translateX(0); }
  100% { transform: translateX(100px); }
}</code></pre>
            <div class="demo-box">
              <div class="demo-block name-demo"></div>
            </div>
          </div>
        </div>

        <!-- animation-duration -->
        <div class="property-card">
          <div class="card-header duration">
            <h3>animation-duration</h3>
            <h3>动画持续时间</h3>
            <span class="value-preview">1s, 200ms...</span>
          </div>
          <div class="card-content">
            <pre><code>animation-duration: 2s;</code></pre>
            <div class="duration-bar">
              <div class="duration-fill"></div>
            </div>
          </div>
        </div>

        <!-- animation-timing-function -->
        <div class="property-card">
          <div class="card-header timing">
            <h3>animation-timing-function</h3>
            <h3>动画速度曲线</h3>
            <div class="value-preview">
              linear(线性),ease, ,ease-in,ease-out,ease-in-out, cubic-bezier(...)
            </div>
          </div>
          <div class="card-content">
            <pre><code>animation-timing-function: ease-in-out;</code></pre>
            <div class="timing-curve">
              <div class="curve-line"></div>
            </div>
          </div>
        </div>

        <!-- animation-delay -->
        <div class="property-card">
          <div class="card-header delay">
            <h3>animation-delay</h3>
            <h3>动画延时</h3>
            <span class="value-preview">0.5s, 200ms...</span>
          </div>
          <div class="card-content">
            <pre><code>animation-delay: 0.3s;</code></pre>
            <div class="delay-indicator">
              <div class="delay-progress"></div>
            </div>
          </div>
        </div>

        <!-- animation-iteration-count -->
        <div class="property-card">
          <div class="card-header count">
            <h3>iteration-count</h3>
            <h3>动画的播放次数</h3>
            <span class="value-preview">1, 3, infinite...</span>
          </div>
          <div class="card-content">
            <pre><code>animation-iteration-count: infinite;</code></pre>
            <div class="count-demo">
              <div class="bouncing-ball"></div>
            </div>
          </div>
        </div>

        <!-- animation-direction -->
        <div class="property-card">
          <div class="card-header direction">
            <h3>animation-direction</h3>
            <h3>是否循环交替反向播放动画</h3>
            <span class="value-preview">normal, alternate...</span>
          </div>
          <div class="card-content">
            <pre><code>animation-direction: alternate;</code></pre>
            <div class="direction-demo">
              <div class="direction-box normal"></div>
              <div class="direction-box reverse"></div>
              <div class="direction-box alternate"></div>
            </div>
          </div>
        </div>
        <!-- animation-direction -->
        <div class="property-card">
          <div class="card-header keyframes">
            <h3>@keyframes</h3>
            <h3>动画定义</h3>
            <span class="value-preview">@keyframes animationname {keyframes-selector {css-styles;}}</span>
          </div>
          <div class="card-content keyframes-code">
            <pre><code>@keyframes mymove
{
0%   {top:0px;}
25%  {top:200px;}
50%  {top:100px;}
75%  {top:200px;}
100% {top:0px;}
}</code></pre>
            <pre><code>@keyframes mymove
{
from   {top:0px;}
to  {top:200px;}
}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- animation-play-state -->
    <section class="property-section">
      <h2 class="section-title">⏯️ animation-play-state</h2>
      <div class="property-card">
        <div class="card-header play-state">
          <h3>animation-play-state</h3>
          <h3>动画播放状态</h3>
          <span class="value-preview">running, paused</span>
        </div>
        <div class="card-content">
          <div class="description">
            <p>控制动画的播放和暂停状态:</p>
            <ul>
              <li><code>running</code>: 动画正常播放(默认值)</li>
              <li><code>paused</code>: 动画暂停播放</li>
            </ul>
          </div>
          <pre><code>.element {
  animation: slide 3s infinite;
}
.element:hover {
  animation-play-state: paused; /* 悬停时暂停动画 */
}</code></pre>
          <div class="demo-box">
            <div class="play-state-demo">
              <div class="moving-box">
                <span>悬停暂停动画</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 综合示例 -->
    <section class="example-section">
      <h2 class="section-title">🚀 综合示例</h2>
      <div class="example-card">
        <pre><code>@keyframes complexAnim {
  0% { transform: rotate(0); background: #667eea; }
  50% { transform: rotate(180deg); background: #764ba2; }
  100% { transform: rotate(360deg); background: #667eea; }
}
.box {
  animation:
    complexAnim 2s ease-in-out infinite alternate;
}</code></pre>
        <div class="complex-demo">
          <div class="demo-spinner"></div>
        </div>
      </div>
    </section>

    <!-- 练习 -->
    <section class="example-practice">
      <h2 class="section-title">📊 练习</h2>
      <div class="example-card">
        <div class="demo1"></div>
        <div class="demo2"></div>
        <div class="demo3"></div>
      </div>
      <div class="example-card">
        <pre>@keyframes demo1 {
  from {
    transform: rotate3d(0, 0, 0, 0deg);
  }

  to {
    transform: rotate3d(1, 1, 1, 360deg);
  }
}</pre>
        <pre>@keyframes demo2 {
  0% {
    transform: rotateZ(0deg) scale(1);
  }

  50% {
    transform: rotateZ(360deg) scale(0.5);
    border-radius: 50%;
  }

  100% {
    transform: rotateZ(0deg) scale(1);
  }
}</pre>
        <pre>@keyframes demo3 {
  0% {
    transform: scale(0);
    background: rgba(255, 255, 255, 0);
  }

  100% {
    transform: scale(1);
    background: rgba(255, 0, 0, 1);
  }
}</pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const animationProps = [
  { name: 'name', class: 'name', chineseName: '名称' },
  { name: 'duration', class: 'duration', chineseName: '持续时间' },
  { name: 'timing', class: 'timing', chineseName: '时间函数' },
  { name: 'delay', class: 'delay', chineseName: '延迟' },
  { name: 'iteration', class: 'count', chineseName: '迭代次数' },
  { name: 'direction', class: 'direction', chineseName: '方向' },
]

const animationStyle = ref({
  animation: 'move 2s ease-in-out infinite alternate',
})
</script>

<style scoped>
h2,
h3,
li,
p,
div,
span {
  color: #000;
}

.section-title {
  color: #000;
}

.animation-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui;
}

.main-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.overview-section {
  margin: 3rem 0;
}

.overview-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  gap: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.animation-visual {
  flex: 1;
  min-height: 200px;
  background: #f8f9fa;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.animated-box {
  width: 100px;
  height: 100px;
  background: #667eea;
  border-radius: 8px;
  animation: move 2s ease-in-out infinite alternate;
}

@keyframes move {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(200px);
  }
}

.property-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tag {
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.name {
  background: #e3f2fd;
  color: #fff;
}

.duration {
  background: #f0f4ff;
  color: #fff;
}

.timing {
  background: #f3e5f5;
  color: #fff;
}

.delay {
  background: #fff3e0;
  color: #fff;
}

.count {
  background: #e8f5e9;
  color: #fff;
}

.direction {
  background: #fce4ec;
  color: #fff;
}

.keyframes {
  background-color: #d559eb;
}

.property-section {
  margin: 3rem 0;
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.property-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.property-card:hover {
  transform: translateY(-5px);
}

.card-header {
  padding: 1.5rem;
  color: white;
}

.name {
  background: #2196f3;
}

.duration {
  background: #667eea;
}

.timing {
  background: #9c27b0;
}

.delay {
  background: #ff9800;
}

.count {
  background: #4caf50;
}

.direction {
  background: #e91e63;
}

.keyframes-code {
  display: flex;
  justify-content: space-between;
}

pre {
  background: #1e1e1e;
  color: #dcdcdc;
  padding: 1rem;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
}

.duration-bar {
  height: 4px;
  background: #f0f0f0;
  margin: 1rem 0;
  border-radius: 2px;
}

.duration-fill {
  width: 100%;
  height: 100%;
  background: #667eea;
  animation: durationDemo 2s linear infinite;
}

@keyframes durationDemo {
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
}

.timing-curve {
  height: 100px;
  background: #f8f9fa;
  margin: 1rem 0;
  position: relative;
}

.curve-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #9c27b0;
  animation: timingDemo 2s ease-in-out infinite;
}

@keyframes timingDemo {
  0% {
    transform: scaleX(0);
  }

  100% {
    transform: scaleX(1);
  }
}

.delay-indicator {
  height: 4px;
  background: #f0f0f0;
  margin: 1rem 0;
  position: relative;
  overflow: hidden;
}

.delay-progress {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #ff9800;
  animation: delayDemo 2s infinite;
}

@keyframes delayDemo {
  0% {
    transform: translateX(-100%);
  }

  50%,
  100% {
    transform: translateX(100%);
  }
}

.count-demo {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bouncing-ball {
  width: 30px;
  height: 30px;
  background: #4caf50;
  border-radius: 50%;
  animation: bounce 1s infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-30px);
  }
}

.direction-demo {
  display: flex;
  gap: 1rem;
  padding: 1rem;
}

.direction-box {
  width: 50px;
  height: 50px;
  background: #e91e63;
  animation: slide 2s infinite;
}

.normal {
  animation-direction: normal;
}

.reverse {
  animation-direction: reverse;
}

.alternate {
  animation-direction: alternate;
}

@keyframes slide {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100%);
  }
}

.example-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 2rem;
}

.demo-spinner {
  width: 100px;
  height: 100px;
  background: #667eea;
  animation: complexAnim 2s ease-in-out infinite alternate;
}

@keyframes complexAnim {
  0% {
    transform: rotate(0);
    background: #667eea;
  }

  50% {
    transform: rotate(180deg);
    background: #764ba2;
  }

  100% {
    transform: rotate(360deg);
    background: #667eea;
  }
}

.example-practice {
  margin-top: 1.5rem;
}

.example-practice .example-card {
  display: flex;
  justify-content: space-around;
}

.example-practice .demo1,
.demo2,
.demo3 {
  width: 100px;
  height: 100px;
}

.demo1 {
  background: #e91e63;
  animation: demo1 2s ease-in-out infinite;
}

.demo2 {
  background: #15c45e;
  animation: demo2 2s ease-in infinite;
}

.demo3 {
  background: #131ebb;
  animation: demo3 2s ease-out infinite;
}

@keyframes demo1 {
  from {
    transform: rotate3d(0, 0, 0, 0deg);
  }

  to {
    transform: rotate3d(1, 1, 1, 360deg);
  }
}

@keyframes demo2 {
  0% {
    transform: rotateZ(0deg) scale(1);
  }

  50% {
    transform: rotateZ(360deg) scale(0.5);
    border-radius: 50%;
  }

  100% {
    transform: rotateZ(0deg) scale(1);
  }
}

@keyframes demo3 {
  0% {
    transform: scale(0);
    background: rgba(255, 255, 255, 0);
  }

  100% {
    transform: scale(1);
    background: rgba(255, 0, 0, 1);
  }
}
</style>
style
