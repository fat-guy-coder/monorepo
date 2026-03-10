<template>
  <div class="http-methods-container">
    <!-- 头部区域 -->
    <div class="header">
      <h1>GET 与 POST 请求基本介绍</h1>
      <p>理解HTTP方法的核心区别与应用场景</p>
    </div>

    <!-- 快速对比卡片 -->
    <div class="quick-comparison">
      <div class="method-card get">
        <div class="method-icon">📝</div>
        <h2>GET 请求</h2>
        <div class="method-desc">从服务器获取资源</div>
        <div class="highlight">数据在URL中可见</div>
      </div>

      <div class="vs-divider">
        <div class="vs-text">对比</div>
      </div>

      <div class="method-card post">
        <div class="method-icon">📤</div>
        <h2>POST 请求</h2>
        <div class="method-desc">向服务器提交数据</div>
        <div class="highlight">数据在请求体中发送</div>
      </div>
    </div>

    <!-- 核心区别 -->
    <div class="core-differences">
      <h2>核心区别</h2>
      <div class="differences-grid">
        <div class="difference-header">特性</div>
        <div class="difference-header get-header">GET</div>
        <div class="difference-header post-header">POST</div>

        <div class="difference-title">数据位置</div>
        <div class="difference-data">URL查询参数</div>
        <div class="difference-data">请求体中</div>

        <div class="difference-title">数据长度限制</div>
        <div class="difference-data">最大约2048字符</div>
        <div class="difference-data">理论上无限制</div>

        <div class="difference-title">缓存支持</div>
        <div class="difference-data">可被缓存</div>
        <div class="difference-data">不可被缓存</div>

        <div class="difference-title">安全性</div>
        <div class="difference-data">URL中可见，不安全</div>
        <div class="difference-data">请求体中，相对安全</div>

        <div class="difference-title">幂等性</div>
        <div class="difference-data">是（多次请求结果相同）</div>
        <div class="difference-data">否（可能改变服务器状态）</div>

        <div class="difference-title">浏览器历史</div>
        <div class="difference-data">保留在历史记录</div>
        <div class="difference-data">不保留在历史记录</div>

        <div class="difference-title">书签支持</div>
        <div class="difference-data">可收藏为书签</div>
        <div class="difference-data">不可收藏为书签</div>

        <div class="difference-title">请求类型</div>
        <div class="difference-data">只读操作</div>
        <div class="difference-data">写入操作</div>
      </div>
    </div>

    <div class="idempotency-section">
      <h2>什么是幂等性？</h2>
      <div class="idempotency-content">
        <p>
          <strong>幂等性（Idempotency）</strong>是指一次和多次请求某个资源，对资源本身产生的影响是一样的。也就是说，无论你执行一次还是多次操作，结果都是相同的。
        </p>
        <div class="idempotency-examples">
          <div class="idempotency-example get">
            <span class="example-title">GET 请求</span>
            <p>无论你刷新多少次页面，获取到的数据不会因为请求次数而改变（只读操作）。</p>
          </div>
          <div class="idempotency-example post">
            <span class="example-title">POST 请求</span>
            <p>多次提交表单可能会导致多次创建资源（如多次下单），所以POST通常不是幂等的。</p>
          </div>
        </div>
        <div class="idempotency-tip">
          <strong>小贴士：</strong> 幂等性对于接口设计和防止重复操作（如支付、下单）非常重要。
        </div>
      </div>
    </div>


    <!-- 使用场景 -->
    <div class="use-cases">
      <h2>使用场景</h2>
      <div class="scenarios">
        <div class="scenario get-scenario">
          <h3>何时使用 GET 请求</h3>
          <ul>
            <li>检索数据（如加载文章、产品列表）</li>
            <li>搜索查询（如搜索框输入）</li>
            <li>分页请求（如加载第5页结果）</li>
            <li>过滤数据（如按类别筛选产品）</li>
            <li>获取静态资源（如图片、CSS、JS文件）</li>
          </ul>
        </div>

        <div class="scenario post-scenario">
          <h3>何时使用 POST 请求</h3>
          <ul>
            <li>提交表单数据（如登录、注册）</li>
            <li>上传文件（如图片、文档）</li>
            <li>创建新资源（如添加新用户）</li>
            <li>更新资源（如修改用户信息）</li>
            <li>执行敏感操作（如付款、转账）</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 优缺点对比 -->
    <div class="pros-cons">
      <h2>优缺点对比</h2>
      <div class="comparison-cards">
        <div class="pros-cons-card get">
          <div class="card-header">GET 优缺点</div>
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li>速度快，可被缓存</li>
              <li>可收藏为书签</li>
              <li>数据在URL中可见，便于调试</li>
              <li>安全用于只读操作</li>
            </ul>
          </div>
          <div class="cons">
            <h3>缺点</h3>
            <ul>
              <li>数据在URL中暴露，不安全</li>
              <li>有长度限制</li>
              <li>不适合传输敏感数据</li>
              <li>只能发送文本数据</li>
            </ul>
          </div>
        </div>

        <div class="pros-cons-card post">
          <div class="card-header">POST 优缺点</div>
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li>无数据长度限制</li>
              <li>可发送任意类型数据（文件、二进制）</li>
              <li>数据在请求体中，相对安全</li>
              <li>适用于敏感操作</li>
            </ul>
          </div>
          <div class="cons">
            <h3>缺点</h3>
            <ul>
              <li>不可缓存，影响性能</li>
              <li>不可收藏为书签</li>
              <li>调试较为困难</li>
              <li>可能改变服务器状态</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 总结 -->
    <div class="summary">
      <h2>总结</h2>
      <div class="summary-content">
        <p>GET 和 POST 是 HTTP 协议中最常用的两种请求方法，它们的核心区别在于：</p>

        <div class="key-points">
          <div class="point">
            <div class="icon">🔍</div>
            <div class="text">
              <strong>GET 用于获取数据</strong> - 参数在URL中可见，适合只读操作
            </div>
          </div>
          <div class="point">
            <div class="icon">📮</div>
            <div class="text">
              <strong>POST 用于提交数据</strong> - 数据在请求体中，适合创建/修改资源
            </div>
          </div>
        </div>

        <p class="recommendation">
          <strong>最佳实践：</strong> 对于安全敏感操作和大量数据传输总是使用 POST，
          对于简单数据检索和可缓存资源使用 GET。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据（可根据需要扩展）
const getExample = ref({
  url: "https://api.example.com/products?category=books&page=2",
  description: "获取书籍类别下第2页的产品列表"
});

const postExample = ref({
  url: "https://api.example.com/users",
  body: {
    name: "张三",
    email: "zhangsan@example.com",
    password: "securePassword123!"
  },
  description: "创建新用户"
});
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@get-color: #2ecc71;
@post-color: #e74c3c;
@text-dark: #2c3e50;
@text-light: #7f8c8d;
@background-light: #f8f9fa;
@border-radius: 8px;
@box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.http-methods-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-dark;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    color: @primary-color;
  }

  p {
    font-size: 1.1rem;
    color: @text-light;
  }
}

.quick-comparison {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  gap: 2rem;

  .method-card {
    flex: 1;
    padding: 2rem;
    border-radius: @border-radius;
    text-align: center;
    box-shadow: @box-shadow;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .method-icon {
      font-size: 3.5rem;
      margin-bottom: 1.2rem;
    }

    h2 {
      margin: 0.5rem 0;
    }

    .method-desc {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
      color: @text-light;
    }

    .highlight {
      font-weight: 600;
      padding: 0.7rem;
      border-radius: 4px;
      margin-top: 1rem;
      display: inline-block;
    }

    &.get {
      background: fadeout(@get-color, 95%);
      border: 1px solid fadeout(@get-color, 70%);

      .highlight {
        background: fadeout(@get-color, 90%);
        color: darken(@get-color, 15%);
      }
    }

    &.post {
      background: fadeout(@post-color, 95%);
      border: 1px solid fadeout(@post-color, 70%);

      .highlight {
        background: fadeout(@post-color, 90%);
        color: darken(@post-color, 15%);
      }
    }
  }

  .vs-divider {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, transparent, #bdc3c7, transparent);
    }

    .vs-text {
      position: relative;
      background: white;
      padding: 0.5rem;
      font-weight: bold;
      color: @text-light;
      z-index: 1;
    }
  }
}

.core-differences {
  background: @background-light;
  border-radius: @border-radius;
  padding: 2rem;
  margin-bottom: 3rem;

  h2 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: @primary-color;
  }

  .differences-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 0.8rem;
    max-width: 800px;
    margin: 0 auto;

    .difference-header {
      font-weight: 700;
      padding: 1rem;
      text-align: center;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }

    .get-header {
      background: fadeout(@get-color, 90%);
      border-left: 4px solid @get-color;
    }

    .post-header {
      background: fadeout(@post-color, 90%);
      border-left: 4px solid @post-color;
    }

    .difference-title {
      font-weight: 600;
      padding: 0.8rem;
      display: flex;
      align-items: center;
      background: fadeout(@primary-color, 95%);
    }

    .difference-data {
      padding: 0.8rem;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }
  }
}

.use-cases {
  margin-bottom: 3rem;

  h2 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 1.8rem;
    color: @primary-color;
  }

  .scenarios {
    display: flex;
    gap: 2rem;

    .scenario {
      flex: 1;
      padding: 1.5rem;
      border-radius: @border-radius;
      box-shadow: @box-shadow;

      h3 {
        margin-top: 0;
        padding-bottom: 0.8rem;
        border-bottom: 2px solid;
      }

      ul {
        padding-left: 1.5rem;

        li {
          margin-bottom: 0.8rem;
          padding-left: 0.5rem;
        }
      }

      &.get-scenario {
        background: fadeout(@get-color, 95%);
        border: 1px solid fadeout(@get-color, 80%);

        h3 {
          border-color: @get-color;
          color: darken(@get-color, 10%);
        }

        li::marker {
          color: @get-color;
        }
      }

      &.post-scenario {
        background: fadeout(@post-color, 95%);
        border: 1px solid fadeout(@post-color, 80%);

        h3 {
          border-color: @post-color;
          color: darken(@post-color, 10%);
        }

        li::marker {
          color: @post-color;
        }
      }
    }
  }
}

.pros-cons {
  margin-bottom: 3rem;

  h2 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 1.8rem;
    color: @primary-color;
  }

  .comparison-cards {
    display: flex;
    gap: 2rem;

    .pros-cons-card {
      flex: 1;
      border-radius: @border-radius;
      overflow: hidden;
      box-shadow: @box-shadow;

      .card-header {
        padding: 1.2rem;
        text-align: center;
        font-weight: 700;
        font-size: 1.1rem;
        color: white;
      }

      .pros,
      .cons {
        padding: 1.2rem;

        h3 {
          margin-top: 0;
          margin-bottom: 0.8rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        ul {
          padding-left: 1.2rem;

          li {
            margin-bottom: 0.5rem;
          }
        }
      }

      .pros {
        background: rgba(255, 255, 255, 0.8);
      }

      .cons {
        background: #f9f9f9;
      }

      &.get {
        .card-header {
          background: @get-color;
        }

        .pros {
          border-left: 4px solid @get-color;
        }
      }

      &.post {
        .card-header {
          background: @post-color;
        }

        .pros {
          border-left: 4px solid @post-color;
        }
      }
    }
  }
}

.summary {
  background: @background-light;
  border-radius: @border-radius;
  padding: 2rem;

  h2 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: @primary-color;
  }

  .summary-content {
    max-width: 800px;
    margin: 0 auto;

    p {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .key-points {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin: 2rem 0;

      .point {
        flex: 1;
        min-width: 300px;
        display: flex;
        align-items: flex-start;
        background: white;
        padding: 1.2rem;
        border-radius: @border-radius;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

        .icon {
          font-size: 2rem;
          margin-right: 1rem;
          flex: 0 0 auto;
        }

        .text {
          strong {
            display: block;
            margin-bottom: 0.3rem;
            font-size: 1.1rem;
          }
        }
      }
    }

    .recommendation {
      background: white;
      padding: 1.5rem;
      border-radius: @border-radius;
      border-left: 4px solid @primary-color;
      font-style: italic;
      margin-top: 2rem;
    }
  }
}

@media (max-width: 768px) {
  .quick-comparison {
    flex-direction: column;
    align-items: center;

    .method-card {
      width: 100%;
    }

    .vs-divider {
      width: 100%;
      height: 60px;

      &::before {
        left: 0;
        right: 0;
        height: 2px;
        width: 100%;
        background: linear-gradient(to right, transparent, #bdc3c7, transparent);
      }
    }
  }

  .scenarios,
  .comparison-cards {
    flex-direction: column;
  }
}

.idempotency-section {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem 1.5rem 1.2rem 1.5rem;
  margin: 2rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.idempotency-section h2 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #2563eb;
  font-weight: bold;
}

.idempotency-content p {
  font-size: 1rem;
  margin-bottom: 1.2rem;
  color: #333;
}

.idempotency-examples {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.idempotency-example {
  flex: 1 1 220px;
  background: #fff;
  border-radius: 6px;
  border-left: 4px solid #60a5fa;
  padding: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.idempotency-example.get {
  border-color: #22c55e;
}

.idempotency-example.post {
  border-color: #f59e42;
}

.example-title {
  font-weight: bold;
  color: #2563eb;
  display: block;
  margin-bottom: 0.4rem;
}

.idempotency-tip {
  background: #e0f2fe;
  border-left: 4px solid #38bdf8;
  padding: 0.7rem 1rem;
  border-radius: 5px;
  font-size: 0.98rem;
  color: #0c4a6e;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .idempotency-examples {
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>
