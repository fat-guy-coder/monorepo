<template>
  <div class="shape-layout-guide">
    <header class="guide-header">
      <h1 class="title">CSS Shape 布局全解析</h1>
      <p class="subtitle">打破矩形束缚，实现自由文本环绕</p>
    </header>

    <section class="intro-section">
      <div class="info-card">
        <h2 class="section-title">🎨 什么是CSS Shape？</h2>
        <p class="section-text">
          CSS Shape允许您定义非矩形布局，使文本可以环绕圆形、多边形或自定义路径等复杂形状，
          突破传统盒模型的限制，创造更具设计感的排版效果。
        </p>
      </div>
    </section>

    <section class="shapes-section">
      <h2 class="section-title">✨ 核心Shape接口</h2>

      <div class="shape-grid">
        <div class="shape-card" v-for="shape in shapes" :key="shape.name">
          <h3 class="shape-name">{{ shape.name }}</h3>
          <div class="shape-demo" :style="shape.demoStyle"></div>
          <pre class="shape-code"><code>{{ shape.code }}</code></pre>
          <div class="shape-desc">
            <p><strong>作用：</strong>{{ shape.purpose }}</p>
            <p><strong>适用场景：</strong>{{ shape.scenario }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="advanced-section">
      <h2 class="section-title">🚀 高级应用技巧</h2>
      <div class="technique-list">
        <div class="technique-item">
          <h3>结合clip-path</h3>
          <pre><code>.advanced-shape {
  shape-outside: circle(50%);
  clip-path: circle(50%);
}</code></pre>
          <p>同时定义可见区域和文本环绕区域</p>
        </div>
        <div class="technique-item">
          <h3>动态形状</h3>
          <pre><code>@keyframes morph {
  0% { shape-outside: circle(50%); }
  50% { shape-outside: ellipse(40% 50%); }
  100% { shape-outside: polygon(...); }
}</code></pre>
          <p>通过动画实现形状变换效果</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Shape接口类型定义
interface CssShape {
  name: string
  purpose: string
  scenario: string
  code: string
  demoStyle: Record<string, string>
}

const shapes: CssShape[] = [
  {
    name: 'circle()',
    purpose: '创建圆形文本环绕区域',
    scenario: '圆形头像、气泡对话框、圆形图标周围文本排版',
    code: `.circle-shape {
  shape-outside: circle(50%);
  width: 200px;
  height: 200px;
  float: left;
}`,
    demoStyle: {
      shapeOutside: 'circle(50%)',
      width: '100px',
      height: '100px',
      float: 'left',
      background: 'linear-gradient(45deg, #ff9a9e, #fad0c4)',
      borderRadius: '50%'
    }
  },
  {
    name: 'ellipse()',
    purpose: '创建椭圆形文本环绕区域',
    scenario: '椭圆形元素、倾斜的视觉元素周围文本排版',
    code: `.ellipse-shape {
  shape-outside: ellipse(40% 50% at 50% 50%);
  width: 200px;
  height: 150px;
  float: right;
}`,
    demoStyle: {
      shapeOutside: 'ellipse(40% 50% at 50% 50%)',
      width: '120px',
      height: '80px',
      float: 'right',
      background: 'linear-gradient(45deg, #a18cd1, #fbc2eb)',
      borderRadius: '50%'
    }
  },
  {
    name: 'polygon()',
    purpose: '创建多边形文本环绕区域',
    scenario: '三角形、星形等不规则形状周围文本排版',
    code: `.polygon-shape {
  shape-outside: polygon(
    0 0, 100% 0, 100% 80%,
    50% 100%, 0 80%
  );
  width: 150px;
  height: 150px;
  float: left;
}`,
    demoStyle: {
      shapeOutside: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
      width: '100px',
      height: '100px',
      float: 'left',
      background: 'linear-gradient(45deg, #ffecd2, #fcb69f)',
      clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)'
    }
  },
  {
    name: 'url()',
    purpose: '根据图像Alpha通道创建形状',
    scenario: '复杂形状图片(如PNG透明图片)周围文本排版',
    code: `.image-shape {
  shape-outside: url('shape.png');
  shape-margin: 10px;
  width: 200px;
  height: 200px;
  float: right;
}`,
    demoStyle: {
      shapeOutside: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><circle cx=\'50\' cy=\'50\' r=\'40\' fill=\'black\'/></svg>")',
      shapeMargin: '8px',
      width: '100px',
      height: '100px',
      float: 'right',
      background: 'linear-gradient(45deg, #84fab0, #8fd3f4)'
    }
  },
  {
    name: 'inset()',
    purpose: '创建矩形内嵌偏移形状',
    scenario: '需要偏移的矩形区域周围文本排版',
    code: `.inset-shape {
  shape-outside: inset(10px 20px 30px 15px round 20px);
  width: 200px;
  height: 200px;
  float: left;
}`,
    demoStyle: {
      shapeOutside: 'inset(10px 20px 30px 15px round 20px)',
      width: '100px',
      height: '100px',
      float: 'left',
      background: 'linear-gradient(45deg, #a6c1ee, #fbc2eb)',
      borderRadius: '20px'
    }
  }
]
</script>

<style lang="less" scoped>
.shape-layout-guide {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #333;
  line-height: 1.6;
}

.guide-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;

  .title {
    color: #2c3e50;
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    color: #7f8c8d;
    font-size: 1.2rem;
    font-weight: 300;
  }
}

.section-title {
  color: #2c3e50;
  font-size: 1.5rem;
  margin: 2rem 0 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f1f1f1;
  display: inline-block;
}

.info-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #6a11cb;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.shape-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.shape-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

.shape-name {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  padding: 0.8rem 1rem;
  margin: 0;
  font-size: 1.2rem;
}

.shape-demo {
  margin: 1rem auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.shape-code {
  background: #f5f7fa;
  padding: 0.8rem;
  margin: 0;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;

  code {
    color: #2c3e50;
    white-space: pre;
  }
}

.shape-desc {
  padding: 1rem;
  font-size: 0.95rem;

  p {
    margin: 0.5rem 0;
  }

  strong {
    color: #2c3e50;
  }
}

.technique-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.technique-item {
  background: white;
  padding: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h3 {
    color: #6a11cb;
    margin-top: 0;
  }

  pre {
    background: #f5f7fa;
    padding: 0.8rem;
    border-radius: 4px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.8rem;
      color: #2c3e50;
    }
  }

  p {
    font-size: 0.9rem;
    color: #7f8c8d;
    margin-bottom: 0;
  }
}
</style>