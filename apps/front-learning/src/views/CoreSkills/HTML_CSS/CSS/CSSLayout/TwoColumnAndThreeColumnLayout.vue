<template>
  <div class="layout-demo-container">
    <!-- 两栏布局示例 -->
    <article class="demo-section">
      <h2 class="section-title">两栏布局方案</h2>

      <div class="demo-box">
        <h3>1. Float 实现</h3>
        <div class="two-column float-layout">
          <aside class="left">width: 200px;<br>float:left;</aside>
          <main class="right">主内容区<br>自适应宽度</main>
        </div>
        <pre><code>float-layout {
      .left {
        float: left;
        width: 200px;
      }
      .right {
        margin-left: 210px;
      }
      &::after {
        content: '';
        display: block;
        clear: both;
      }
    }</code></pre>
      </div>

      <div class="demo-box">
        <h3>2. Flex 实现</h3>
        <div class="two-column flex-layout">
          <aside class="left">左侧边栏<br>width: 200px</aside>
          <main class="right">主内容区<br>flex: 1</main>
        </div>
        <pre><code>flex-layout {
      display: flex;
      .left {
        width: 200px;
        flex-shrink: 0;
      }
      .right {
        flex: 1;
      }
    }</code></pre>
      </div>

      <div class="demo-box">
        <h3>3. Grid 实现</h3>
        <div class="two-column grid-layout">
          <aside class="left">左侧边栏<br>width: 200px</aside>
          <main class="right">主内容区<br>auto</main>
        </div>
        <pre><code> &.grid-layout {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 10px;
    }</code></pre>
      </div>
    </article>

    <!-- 三栏布局示例 -->
    <article class="demo-section">
      <h2 class="section-title">三栏布局方案</h2>

      <div class="demo-box">
        <h3>1. Float 实现</h3>
        <div class="three-column float-layout">
          <aside class="left">左侧边栏<br>200px</aside>
          <main class="center">主内容区<br>自适应</main>
          <aside class="right">右侧边栏<br>200px</aside>
        </div>
        <pre><code>float-layout{
      .left {
        float: left;
        width: 200px;
      }
      .right {
        float: right;
        width: 200px;
      }
      .center {
        float: left;
        width: calc(100% - 400px);
      }
      &::after {
        content: '';
        display: block;
        clear: both;
      }
    }</code></pre>
      </div>

      <div class="demo-box">
        <h3>2. Flex 实现</h3>
        <div class="three-column flex-layout">
          <aside class="left">左侧边栏<br>200px</aside>
          <main class="center">主内容区<br>flex: 1</main>
          <aside class="right">右侧边栏<br>200px</aside>
        </div>
        <pre><code>flex-layout {
      display: flex;
      gap: 10px;//间隙
      .left,
      .right {
        width: 200px;
        flex-shrink: 0;
      }
      .center {
        flex: 1;
        margin: 0 10px;
      }
    }</code></pre>
      </div>

      <div class="demo-box">
        <h3>3. Grid 实现</h3>
        <div class="three-column grid-layout">
          <aside class="left">左侧边栏</aside>
          <main class="center">主内容区</main>
          <aside class="right">右侧边栏</aside>
        </div>
        <pre><code> grid-layout {
      display: grid;//间隙
      grid-template-columns: 200px 1fr 200px;
      gap: 10px;
    }</code></pre>
      </div>
    </article>
  </div>
</template>



<style lang="less">
// 变量定义
@primary-color: #409eff;
@secondary-color: #67c23a;
@bg-color: #f5f7fa;
@border-color: #e4e7ed;
@text-color: #606266;

.layout-demo-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .demo-section {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid @border-color;
    border-radius: 6px;

    .section-title {
      color: @primary-color;
      border-bottom: 2px solid @primary-color;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
  }

  .demo-box {
    margin: 20px 0;
    padding: 15px;
    background: @bg-color;
    border-radius: 4px;

    h3 {
      color: @secondary-color;
      margin-bottom: 15px;
    }

    [class*="-layout"] {
      border: 1px solid @border-color;
      margin: 10px 0;
      padding: 10px;
      border-radius: 4px;

      aside,
      main {
        padding: 20px;
        border-radius: 4px;
        color: @text-color;
      }

      .left,
      .right {
        background: lighten(@primary-color, 40%);
        border: 1px solid @primary-color;
      }

      .center {
        background: lighten(@secondary-color, 40%);
        border: 1px solid @secondary-color;
      }
    }
  }

  // 两栏布局实现
  .two-column {
    &.float-layout {
      .left {
        float: left;
        width: 200px;
      }

      .right {
        margin-left: 210px;
      }

      &::after {
        content: '';
        display: block;
        clear: both;
      }
    }

    &.flex-layout {
      display: flex;

      .left {
        width: 200px;
        flex-shrink: 0;
      }

      .right {
        flex: 1;
      }
    }

    &.grid-layout {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 10px;
    }
  }

  // 三栏布局实现
  .three-column {
    &.float-layout {
      .left {
        float: left;
        width: 200px;
      }

      .right {
        float: right;
        width: 200px;

      }

      .center {
        float: left;
        width: calc(100% - 400px);
      }

      &::after {
        content: '';
        display: block;
        clear: both;
      }
    }

    &.flex-layout {
      display: flex;

      .left,
      .right {
        width: 200px;
        flex-shrink: 0;
      }

      .center {
        flex: 1;
        margin: 0 10px;
      }
    }

    &.grid-layout {
      display: grid;
      grid-template-columns: 200px 1fr 200px;
      gap: 10px;
    }
  }
}
</style>
