<template>
  <div class="triangle-container">
    <h1 class="main-title">CSS 三角形生成指南</h1>

    <!-- 基础方法 -->
    <section class="demo-card">
      <h2 class="demo-title">基础边框法</h2>
      <div class="demo-content">
        <div class="triangle-base">
          <div class="triangle up"></div>
          <div class="triangle down"></div>
          <div class="triangle left"></div>
          <div class="triangle right"></div>
        </div>
        <pre class="code-block">// 基本三角形
.triangle {
  width: 0;
  height: 0;
  border-style: solid;

  &amp;.up {
    border-width: 0 50px 80px 50px;
    border-color: transparent transparent #{@primary-color} transparent;
  }
}</pre>
      </div>
    </section>

    <!-- 进阶方法 -->
    <section class="demo-card">
      <h2 class="demo-title">进阶方案</h2>
      <div class="demo-grid">
        <!-- 渐变实现 -->
        <div class="method-box">
          <h3>线性渐变</h3>
          <div class="triangle gradient"></div>
        </div>

        <!-- Clip-path -->
        <div class="method-box">
          <h3>Clip-path</h3>
          <div class="triangle clip"></div>
        </div>

        <!-- 旋转方块 -->
        <div class="method-box">
          <h3>旋转正方形</h3>
          <div class="triangle rotate"></div>
        </div>

        <!-- 伪元素实现 -->
        <div class="method-box">
          <h3>伪元素方案</h3>
          <div class="pseudo-box">
            <div class="pseudo-triangle"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 组合案例 -->
    <section class="demo-card">
      <h2 class="demo-title">组合应用</h2>
      <div class="demo-group">
        <div class="diamond"></div>
        <div class="arrow-box">
          <div class="arrow"></div>
          <span class="arrow-text">提示箭头</span>
        </div>
        <div class="bubble">对话气泡</div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TriangleDemo',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
// 设计变量
@primary-color: #409EFF;
@secondary-color: #67C23A;
@warning-color: #E6A23C;
@danger-color: #F56C6C;
@bg-color: #f0f2f5;
@text-color: #606266;

.triangle-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .main-title {
    color: @primary-color;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.2rem;
  }

  .demo-card {
    padding: 1.5rem;
    margin: 1.5rem 0;
    background: @bg-color;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

    .demo-title {
      color: @secondary-color;
      border-left: 4px solid @secondary-color;
      padding-left: 1rem;
      margin-bottom: 1.5rem;
    }
  }

  // 基础三角形样式
  .triangle-base {
    display: flex;
    gap: 2rem;
    justify-content: center;
    padding: 2rem;
    background: white;
    border-radius: 6px;

    .triangle {
      width: 0;
      height: 0;
      border-style: solid;
      transition: all 0.3s;



      .up {
        border-width: 0 50px 80px 50px;
        border-color: transparent transparent @primary-color transparent;
      }



      .down {
        border-width: 80px 50px 0 50px;
        border-color: @secondary-color transparent transparent transparent;
      }



      .left {
        border-width: 50px 80px 50px 0;
        border-color: transparent @warning-color transparent transparent;
      }



      .right {
        border-width: 50px 0 50px 80px;
        border-color: transparent transparent transparent @danger-color;
      }
    }
  }

  // 进阶方案样式
  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    padding: 1rem;

    .method-box {
      background: white;
      padding: 1.5rem;
      border-radius: 6px;
      text-align: center;

      h3 {
        color: @text-color;
        margin-bottom: 1rem;
      }

      .gradient {
        width: 100px;
        height: 100px;
        background: linear-gradient(45deg, transparent 50%, @primary-color 50%);
        margin: 0 auto;
      }

      .clip {
        width: 100px;
        height: 100px;
        background: @warning-color;
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      }

      .rotate {
        width: 50px;
        height: 50px;
        background: @danger-color;
        transform: rotate(45deg);
      }

      .pseudo-box {
        position: relative;
        height: 100px;

        .pseudo-triangle::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          border-width: 0 40px 60px;
          border-style: solid;
          border-color: transparent transparent @secondary-color;
        }
      }
    }
  }

  // 组合案例样式
  .demo-group {
    display: flex;
    justify-content: center;
    gap: 3rem;
    padding: 2rem;

    .diamond {
      width: 60px;
      height: 60px;
      background: @primary-color;
      transform: rotate(45deg);
      position: relative;

      &::before {
        content: '钻石';
        position: absolute;
        transform: rotate(-45deg);
        color: white;
        top: 22px;
        left: 10px;
      }
    }

    .arrow-box {
      position: relative;
      padding: 30px;
      background: @bg-color;
      border-radius: 6px;

      .arrow {
        position: absolute;
        top: -20px;
        left: 50%;
        border-width: 0 15px 20px;
        border-style: solid;
        border-color: transparent transparent @warning-color;
      }

      .arrow-text {
        color: @text-color;
      }
    }

    .bubble {
      position: relative;
      padding: 1rem;
      background: @secondary-color;
      color: white;
      border-radius: 8px;

      &::after {
        content: '';
        position: absolute;
        left: -10px;
        top: 50%;
        border-width: 8px 10px 8px 0;
        border-style: solid;
        border-color: transparent @secondary-color transparent;
      }
    }
  }

  // 代码块样式
  .code-block {
    background: darken(@bg-color, 3%);
    padding: 1rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    color: @text-color;
    margin: 1rem 0;
  }
}
</style>
