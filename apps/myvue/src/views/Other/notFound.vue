<template>
  <div class="not-found-container">
    <!-- 背景装饰元素 -->
    <div class="background-elements">
      <div class="bubble bubble-1"></div>
      <div class="bubble bubble-2"></div>
      <div class="bubble bubble-3"></div>
      <div class="bubble bubble-4"></div>
      <div class="floating-element floating-element-1"></div>
      <div class="floating-element floating-element-2"></div>
      <div class="floating-element floating-element-3"></div>
    </div>

    <!-- 主要内容 -->
    <div class="content-wrapper">
      <div class="error-code">
        <span class="digit">4</span>
        <div class="planet-container">
          <div class="planet">
            <div class="crater crater-1"></div>
            <div class="crater crater-2"></div>
            <div class="crater crater-3"></div>
            <div class="ring"></div>
          </div>
        </div>
        <span class="digit">4</span>
      </div>

      <h1 class="title">页面迷失在太空中</h1>

      <p class="description">
        我们似乎找不到您要查找的页面。<br>
        它可能已被移动、删除或从未存在过。
      </p>

      <div class="actions">
        <button class="home-button" @click="goHome">
          <span>返回首页</span>
          <svg class="arrow-icon" viewBox="0 0 24 24" width="20" height="20">
            <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path>
          </svg>
        </button>
        <button class="contact-button" @click="contactSupport">返回上一页</button>
      </div>
    </div>

    <!-- 底部装饰 -->
    <div class="bottom-decoration">
      <div class="wave"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
router.push('/')
}

const contactSupport = () => {
  router.back()
}
</script>

<style lang="less" scoped>


@primary-color: #4a6cf7;
@secondary-color: #6c63ff;
@text-color: #2d3748;
@light-gray: #f8f9fa;
@border-color: #e2e8f0;
@shadow-color: rgba(74, 108, 247, 0.15);

// 动画定义
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.05); }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes orbit {
  0% { transform: translateX(0) rotate(0deg); }
  100% { transform: translateX(100px) rotate(360deg); }
}

@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

.not-found-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7ff 0%, #e6e9ff 100%);
  overflow: hidden;
  padding: 2rem;
  box-sizing: border-box;
  font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
}

.background-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  background: rgba(@primary-color, 0.1);
  opacity: 0.7;
  z-index: 0;

  &.bubble-1 {
    width: 120px;
    height: 120px;
    top: 10%;
    left: 5%;
    animation: float 15s ease-in-out infinite;
  }

  &.bubble-2 {
    width: 80px;
    height: 80px;
    top: 70%;
    left: 15%;
    animation: float 12s ease-in-out infinite reverse;
  }

  &.bubble-3 {
    width: 60px;
    height: 60px;
    top: 40%;
    right: 10%;
    animation: float 10s ease-in-out infinite;
  }

  &.bubble-4 {
    width: 100px;
    height: 100px;
    bottom: 10%;
    right: 15%;
    animation: float 14s ease-in-out infinite reverse;
  }
}

.floating-element {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(@primary-color, 0.15) 0%, rgba(@secondary-color, 0.15) 100%);
  opacity: 0.6;
  filter: blur(2px);
  z-index: 0;

  &.floating-element-1 {
    width: 200px;
    height: 200px;
    top: 20%;
    right: 10%;
    animation: pulse 8s ease-in-out infinite;
  }

  &.floating-element-2 {
    width: 150px;
    height: 150px;
    bottom: 20%;
    left: 10%;
    animation: pulse 10s ease-in-out infinite;
  }

  &.floating-element-3 {
    width: 100px;
    height: 100px;
    top: 60%;
    left: 20%;
    animation: pulse 7s ease-in-out infinite reverse;
  }
}

.content-wrapper {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(74, 108, 247, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.error-code {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;

  .digit {
    font-size: 10rem;
    font-weight: 800;
    color: @primary-color;
    text-shadow: 0 5px 15px @shadow-color;
    line-height: 1;
  }
}

.planet-container {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 1rem;

  .planet {
    position: absolute;
    width: 120px;
    height: 120px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #6c63ff 0%, #4a6cf7 100%);
    border-radius: 50%;
    box-shadow: 0 10px 30px rgba(108, 99, 255, 0.3);
    animation: rotate 20s linear infinite;

    .crater {
      position: absolute;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;

      &.crater-1 {
        width: 25px;
        height: 25px;
        top: 20px;
        left: 15px;
      }

      &.crater-2 {
        width: 15px;
        height: 15px;
        bottom: 30px;
        right: 25px;
      }

      &.crater-3 {
        width: 20px;
        height: 20px;
        top: 50px;
        right: 15px;
      }
    }

    .ring {
      position: absolute;
      top: -30px;
      left: -30px;
      width: 180px;
      height: 180px;
      border: 8px solid rgba(108, 99, 255, 0.15);
      border-radius: 50%;
      animation: orbit 25s linear infinite;
    }
  }
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: @text-color;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  letter-spacing: -0.5px;
}

.description {
  font-size: 1.2rem;
  color: lighten(@text-color, 20%);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.home-button, .contact-button {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
}

.home-button {
  background: @primary-color;
  color: white;
  box-shadow: 0 5px 15px @shadow-color;

  &:hover {
    background: darken(@primary-color, 8%);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(74, 108, 247, 0.3);

    .arrow-icon {
      transform: translateX(5px);
    }
  }

  .arrow-icon {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
    fill: white;
  }
}

.contact-button {
  background: transparent;
  color: @primary-color;
  border: 2px solid @primary-color;

  &:hover {
    background: rgba(@primary-color, 0.1);
    transform: translateY(-3px);
  }
}

.bottom-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  overflow: hidden;

  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    height: 100px;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z" fill="%234a6cf7" opacity="0.1"/></svg>');
    background-size: 1200px 100px;
    animation: wave 15s linear infinite;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .content-wrapper {
    padding: 1.5rem;
    max-width: 90%;
  }

  .error-code {
    .digit {
      font-size: 7rem;
    }
  }

  .planet-container {
    width: 140px;
    height: 140px;

    .planet {
      width: 100px;
      height: 100px;

      .ring {
        width: 140px;
        height: 140px;
        top: -20px;
        left: -20px;
      }
    }
  }

  .title {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .error-code {
    .digit {
      font-size: 5rem;
    }
  }

  .planet-container {
    width: 100px;
    height: 100px;

    .planet {
      width: 70px;
      height: 70px;

      .ring {
        width: 100px;
        height: 100px;
        top: -15px;
        left: -15px;
        border-width: 6px;
      }
    }
  }

  .actions {
    flex-direction: column;
    gap: 1rem;

    button {
      width: 100%;
    }
  }
}
</style>
