<template>
  <div class="chain-container">
    <div class="pattern-hero">
      <div class="hero-content">
        <h1>责任链模式 (Chain of Responsibility)</h1>
        <p class="hero-subtitle">将请求沿着处理链传递，直到有对象处理它</p>

        <div class="chain-visualization">
          <div class="chain-link" v-for="(handler, index) in handlers" :key="index">
            <div class="handler-card">
              <div class="handler-icon">{{ handler.icon }}</div>
              <div class="handler-name">{{ handler.name }}</div>
              <div class="handler-limit">处理上限: {{ handler.limit }}</div>
            </div>
            <div class="chain-connector" v-if="index < handlers.length - 1">
              <div class="connector-line"></div>
              <div class="connector-arrow">↓</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pattern-tabs">
      <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id"
        class="tab-button">
        <span class="tab-icon">{{ tab.icon }}</span>
        {{ tab.title }}
      </button>
    </div>

    <div class="pattern-content">
      <!-- 概念介绍 -->
      <section v-if="activeTab === 'concept'" class="content-section">
        <div class="concept-intro">
          <div class="intro-card">
            <div class="intro-icon">🔗</div>
            <div class="intro-text">
              <h2>责任链模式概念</h2>
              <p>
                <strong>责任链模式</strong>是一种行为设计模式，它允许你将请求沿着处理者链进行发送。每个处理者均可对请求进行处理，或将其传递给链上的下一个处理者。
                这种模式解耦了请求的发送者和接收者，使多个对象都有机会处理请求。
              </p>
            </div>
          </div>

          <div class="pattern-principle">
            <h3>核心原则</h3>
            <div class="principles">
              <div class="principle">
                <div class="principle-icon">🔄</div>
                <h4>请求传递</h4>
                <p>请求沿着处理链传递直到被处理</p>
              </div>
              <div class="principle">
                <div class="principle-icon">🧩</div>
                <h4>解耦发送者与接收者</h4>
                <p>发送者无需知道哪个对象会处理请求</p>
              </div>
              <div class="principle">
                <div class="principle-icon">⚙️</div>
                <h4>动态链</h4>
                <p>处理链可以在运行时动态改变</p>
              </div>
            </div>
          </div>
        </div>

        <div class="pattern-structure">
          <h3>模式结构</h3>
          <div class="structure-diagram">
            <div class="structure-item handler">
              <div class="class-header">Handler</div>
              <div class="class-methods">
                <div>+ setNext(handler)</div>
                <div>+ handle(request)</div>
              </div>
            </div>

            <div class="structure-item concrete-handler">
              <div class="class-header">ConcreteHandlerA</div>
              <div class="class-methods">
                <div>+ handle(request)</div>
              </div>
            </div>

            <div class="structure-item concrete-handler">
              <div class="class-header">ConcreteHandlerB</div>
              <div class="class-methods">
                <div>+ handle(request)</div>
              </div>
            </div>

            <div class="relation-arrow handler-to-concrete"></div>
            <div class="relation-arrow concrete-to-concrete"></div>
          </div>

          <div class="structure-explanation">
            <div class="explanation-item">
              <span class="component">Handler</span>
              <span class="desc">- 声明处理请求的接口，并实现设置后继者的方法</span>
            </div>
            <div class="explanation-item">
              <span class="component">ConcreteHandler</span>
              <span class="desc">- 处理它负责的请求，可访问后继者，能处理则处理，不能则转发</span>
            </div>
            <div class="explanation-item">
              <span class="component">Client</span>
              <span class="desc">- 向链上的具体处理者对象提交请求</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 设计思路 -->
      <section v-if="activeTab === 'design'" class="content-section">
        <h2>责任链模式的设计思路</h2>

        <div class="implementation-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>定义处理者接口</h3>
              <p>创建处理者接口，声明处理请求的方法和设置下一个处理者的方法</p>
              <div class="code-block">
                <pre><code>abstract class Handler {
  protected nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public abstract handle(request: any): string;
}</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>实现具体处理者</h3>
              <p>创建具体处理者类，实现处理请求的逻辑</p>
              <div class="code-block">
                <pre><code>class ConcreteHandlerA extends Handler {
  private maxLimit = 100;

  public handle(request: number): string {
    if (request &lt;= this.maxLimit) {
      return `请求 ${request} 被处理者A处理`;
    } else if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return `请求 ${request} 无法被处理`;
  }
}

class ConcreteHandlerB extends Handler {
  private maxLimit = 500;

  public handle(request: number): string {
    if (request &lt;= this.maxLimit) {
      return `请求 ${request} 被处理者B处理`;
    } else if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return `请求 ${request} 无法被处理`;
  }
}</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>构建处理链</h3>
              <p>将处理者链接成一条链</p>
              <div class="code-block">
                <pre><code>// 创建处理者实例
const handlerA = new ConcreteHandlerA();
const handlerB = new ConcreteHandlerB();

// 构建责任链
handlerA.setNext(handlerB);</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>客户端提交请求</h3>
              <p>客户端向链上的第一个处理者提交请求</p>
              <div class="code-block">
                <pre><code>// 处理请求
console.log(handlerA.handle(50));   // 被A处理
console.log(handlerA.handle(200));  // 被B处理
console.log(handlerA.handle(600));  // 无法处理</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="pattern-demo">
          <h3>责任链模式演示 - 审批系统</h3>
          <div class="demo-container">
            <div class="demo-controls">
              <div class="request-form">
                <label>审批类型:</label>
                <Select v-model="requestType">
                  <option value="leave">请假申请</option>
                  <option value="expense">报销申请</option>
                  <option value="purchase">采购申请</option>
                </select>

                <label>申请金额/天数:</label>
                <input type="number" v-model="requestValue" min="1" max="10000">

                <button @click="submitRequest">提交申请</button>
              </div>
            </div>

            <div class="demo-results">
              <div class="request-status">
                <div class="status-title">处理结果</div>
                <div class="status-content" :class="{
                  'status-pending': result.status === 'pending',
                  'status-approved': result.status === 'approved',
                  'status-rejected': result.status === 'rejected'
                }">
                  {{ result.message || '等待提交申请...' }}
                </div>
              </div>

              <div class="chain-process">
                <div class="process-title">处理流程</div>
                <div class="process-steps">
                  <div v-for="(step, index) in processSteps" :key="index" class="process-step">
                    <div class="step-icon">{{ handlers[index].icon }}</div>
                    <div class="step-info">
                      <div class="step-handler">{{ handlers[index].name }}</div>
                      <div class="step-action" :class="{
                        'action-approve': step.action === 'approved',
                        'action-reject': step.action === 'rejected',
                        'action-forward': step.action === 'forwarded'
                      }">
                        {{ getActionText(step.action) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section v-if="activeTab === 'usage'" class="content-section">
        <h2>责任链模式的使用场景</h2>

        <div class="usage-scenarios">
          <div class="scenario-card">
            <div class="scenario-icon">📋</div>
            <div class="scenario-content">
              <h3>审批系统</h3>
              <p>多级审批流程（员工 → 经理 → 总监）</p>
              <ul>
                <li>请假审批</li>
                <li>报销审批</li>
                <li>采购审批</li>
              </ul>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🛡️</div>
            <div class="scenario-content">
              <h3>安全系统</h3>
              <p>多层安全验证</p>
              <ul>
                <li>身份验证链</li>
                <li>权限检查链</li>
                <li>安全审计链</li>
              </ul>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🛒</div>
            <div class="scenario-content">
              <h3>电商系统</h3>
              <p>订单处理流程</p>
              <ul>
                <li>库存检查</li>
                <li>支付处理</li>
                <li>物流安排</li>
              </ul>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🚨</div>
            <div class="scenario-content">
              <h3>异常处理</h3>
              <p>多层异常捕获机制</p>
              <ul>
                <li>错误日志记录</li>
                <li>错误恢复尝试</li>
                <li>用户通知</li>
              </ul>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📝</div>
            <div class="scenario-content">
              <h3>日志系统</h3>
              <p>多级日志处理</p>
              <ul>
                <li>控制台输出</li>
                <li>文件记录</li>
                <li>远程日志服务</li>
              </ul>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🎮</div>
            <div class="scenario-content">
              <h3>游戏系统</h3>
              <p>游戏事件处理</p>
              <ul>
                <li>碰撞检测</li>
                <li>伤害计算</li>
                <li>特效触发</li>
              </ul>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🏦</div>
            <div class="scenario-content">
              <h3>金融系统</h3>
              <p>交易验证流程</p>
              <ul>
                <li>余额检查</li>
                <li>风控检查</li>
                <li>合规检查</li>
              </ul>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📧</div>
            <div class="scenario-content">
              <h3>消息处理</h3>
              <p>消息过滤和处理链</p>
              <ul>
                <li>垃圾邮件过滤</li>
                <li>内容分析</li>
                <li>自动回复</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点 -->
      <section v-if="activeTab === 'pros-cons'" class="content-section">
        <h2>责任链模式的优缺点</h2>

        <div class="pros-cons-container">
          <div class="pros-section">
            <div class="section-header">
              <span class="section-icon">✅</span>
              <h3>优点</h3>
            </div>
            <ul class="pros-list">
              <li v-for="(pro, index) in pros" :key="index" class="pro-item">
                <div class="pro-icon">✓</div>
                <div class="pro-content">
                  <h4>{{ pro.title }}</h4>
                  <p>{{ pro.description }}</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="cons-section">
            <div class="section-header">
              <span class="section-icon">⚠️</span>
              <h3>缺点</h3>
            </div>
            <ul class="cons-list">
              <li v-for="(con, index) in cons" :key="index" class="con-item">
                <div class="con-icon">✗</div>
                <div class="con-content">
                  <h4>{{ con.title }}</h4>
                  <p>{{ con.description }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="best-practices">
          <h3>最佳实践建议</h3>
          <div class="practices-grid">
            <div class="practice-card">
              <div class="practice-icon">📏</div>
              <h4>明确处理范围</h4>
              <p>每个处理者应有明确的处理范围和职责</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">🔄</div>
              <h4>设置默认处理</h4>
              <p>在链的末端设置默认处理者处理未处理请求</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">⚡</div>
              <h4>避免长链</h4>
              <p>过长的责任链会影响性能，需合理设计</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">🧪</div>
              <h4>单元测试</h4>
              <p>对每个处理者单独测试，并测试整个链</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Vue应用 -->
      <section v-if="activeTab === 'vue'" class="content-section">
        <h2>在Vue中的应用</h2>

        <div class="vue-applications">
          <div class="application-card">
            <div class="app-header">
              <div class="app-icon">📋</div>
              <h3>审批流程系统</h3>
            </div>
            <div class="app-content">
              <p>实现多级审批责任链</p>
              <div class="code-block">
                <pre><code>// 审批处理者基类
abstract class Approver {
  protected nextApprover: Approver | null = null;

  setNext(approver: Approver): Approver {
    this.nextApprover = approver;
    return approver;
  }

  abstract processRequest(request: LeaveRequest): void;
}

// 具体处理者 - 组长
class TeamLeader extends Approver {
  processRequest(request: LeaveRequest) {
    if (request.days &lt;= 2) {
      console.log(`组长批准了${request.name}的${request.days}天请假`);
    } else if (this.nextApprover) {
      this.nextApprover.processRequest(request);
    }
  }
}

// 具体处理者 - 经理
class Manager extends Approver {
  processRequest(request: LeaveRequest) {
    if (request.days &lt;= 5) {
      console.log(`经理批准了${request.name}的${request.days}天请假`);
    } else if (this.nextApprover) {
      this.nextApprover.processRequest(request);
    }
  }
}

// 在Vue组件中使用
const teamLeader = new TeamLeader();
const manager = new Manager();
teamLeader.setNext(manager);

const leaveRequests = [
  { name: '张三', days: 1 },
  { name: '李四', days: 3 },
  { name: '王五', days: 7 }
];

leaveRequests.forEach(request => {
  teamLeader.processRequest(request);
});</code></pre>
              </div>
            </div>
          </div>

          <div class="application-card">
            <div class="app-header">
              <div class="app-icon">🛒</div>
              <h3>订单处理系统</h3>
            </div>
            <div class="app-content">
              <p>实现订单处理责任链</p>
              <div class="code-block">
                <pre><code>// 订单处理基类
abstract class OrderHandler {
  protected nextHandler: OrderHandler | null = null;

  setNext(handler: OrderHandler): OrderHandler {
    this.nextHandler = handler;
    return handler;
  }

  abstract processOrder(order: Order): void;
}

// 库存检查处理者
class StockChecker extends OrderHandler {
  processOrder(order: Order) {
    if (this.checkStock(order)) {
      console.log('库存检查通过');
      if (this.nextHandler) {
        this.nextHandler.processOrder(order);
      }
    } else {
      console.log('库存不足，订单处理终止');
    }
  }

  private checkStock(order: Order): boolean {
    // 库存检查逻辑
    return true;
  }
}

// 支付处理者
class PaymentProcessor extends OrderHandler {
  processOrder(order: Order) {
    if (this.processPayment(order)) {
      console.log('支付处理成功');
      if (this.nextHandler) {
        this.nextHandler.processOrder(order);
      }
    } else {
      console.log('支付失败，订单处理终止');
    }
  }

  private processPayment(order: Order): boolean {
    // 支付处理逻辑
    return true;
  }
}

// 在Vue组件中构建责任链
const stockChecker = new StockChecker();
const paymentProcessor = new PaymentProcessor();
const shippingHandler = new ShippingHandler();

stockChecker.setNext(paymentProcessor).setNext(shippingHandler);

const processOrder = (order: Order) => {
  stockChecker.processOrder(order);
};</code></pre>
              </div>
            </div>
          </div>

          <div class="application-card">
            <div class="app-header">
              <div class="app-icon">🛡️</div>
              <h3>中间件系统</h3>
            </div>
            <div class="app-content">
              <p>实现中间件责任链</p>
              <div class="code-block">
                <pre><code>// 中间件接口
interface Middleware {
  setNext(middleware: Middleware): Middleware;
  handle(request: Request, response: Response): void;
}

// 身份验证中间件
class AuthMiddleware implements Middleware {
  private next: Middleware | null = null;

  setNext(middleware: Middleware): Middleware {
    this.next = middleware;
    return middleware;
  }

  handle(request: Request, response: Response) {
    if (this.authenticate(request)) {
      console.log('身份验证通过');
      if (this.next) {
        this.next.handle(request, response);
      }
    } else {
      response.status = 401;
      console.log('身份验证失败');
    }
  }

  private authenticate(request: Request): boolean {
    // 身份验证逻辑
    return !!request.headers['Authorization'];
  }
}

// 日志中间件
class LoggingMiddleware implements Middleware {
  private next: Middleware | null = null;

  setNext(middleware: Middleware): Middleware {
    this.next = middleware;
    return middleware;
  }

  handle(request: Request, response: Response) {
    console.log(`请求: ${request.method} ${request.url}`);
    if (this.next) {
      this.next.handle(request, response);
    }
    console.log(`响应: ${response.status}`);
  }
}

// 在Vue应用中构建中间件链
const authMiddleware = new AuthMiddleware();
const loggingMiddleware = new LoggingMiddleware();

authMiddleware.setNext(loggingMiddleware);

// 处理请求
const request = { method: 'GET', url: '/api/data', headers: {} };
const response = { status: 0 };

authMiddleware.handle(request, response);</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const tabs = [
  { id: 'concept', title: '概念介绍', icon: '📚' },
  { id: 'design', title: '设计思路', icon: '🧩' },
  { id: 'usage', title: '使用场景', icon: '🚀' },
  { id: 'pros-cons', title: '优缺点', icon: '⚖️' },
  { id: 'vue', title: 'Vue应用', icon: '💻' }
];

const activeTab = ref('concept');

// 处理者信息
const handlers = [
  { name: '员工', icon: '👤', limit: '1天' },
  { name: '组长', icon: '👔', limit: '2天' },
  { name: '经理', icon: '👓', limit: '5天' },
  { name: '总监', icon: '🎩', limit: '10天' },
  { name: 'CEO', icon: '👑', limit: '无限' }
];

// 审批演示数据
const requestType = ref('leave');
const requestValue = ref(1);
const result = reactive({
  status: 'pending',
  message: ''
});
const processSteps = ref<any[]>(Array(handlers.length).fill({ action: 'pending' }));

function submitRequest() {
  // 重置状态
  result.status = 'pending';
  result.message = '处理中...';
  processSteps.value = Array(handlers.length).fill({ action: 'pending' });

  // 模拟处理延迟
  let currentStep = 0;

  const process = () => {
    if (currentStep >= handlers.length) {
      result.status = 'rejected';
      result.message = '申请被拒绝：无人可处理此请求';
      return;
    }

    // 更新当前步骤状态
    processSteps.value = processSteps.value.map((step, index) => {
      if (index === currentStep) {
        if (index === handlers.length - 1) {
          // 最后一级处理者
          result.status = 'approved';
          result.message = `申请已批准：${handlers[index].name}处理了您的请求`;
          return { action: 'approved' };
        } else {
          // 模拟处理逻辑：根据请求值决定是否处理
          const canHandle = requestValue.value <= (index + 1) * 2;

          if (canHandle) {
            result.status = 'approved';
            result.message = `申请已批准：${handlers[index].name}处理了您的请求`;
            return { action: 'approved' };
          } else {
            // 转发到下一级
            return { action: 'forwarded' };
          }
        }
      }
      return step;
    });

    currentStep++;

    // 如果尚未处理完成，继续下一步
    if (result.status === 'pending' && currentStep < handlers.length) {
      setTimeout(process, 800);
    }
  };

  setTimeout(process, 800);
}

function getActionText(action: string) {
  switch (action) {
    case 'approved': return '✓ 已批准';
    case 'rejected': return '✗ 已拒绝';
    case 'forwarded': return '→ 已转发';
    default: return '等待处理';
  }
}

const pros = [
  {
    title: "降低耦合度",
    description: "发送者无需知道请求由哪个处理者处理"
  },
  {
    title: "动态调整",
    description: "可以在运行时动态改变链中的处理者"
  },
  {
    title: "灵活扩展",
    description: "新增处理者只需添加到链中"
  },
  {
    title: "单一职责",
    description: "每个处理者只需关注自己的处理逻辑"
  }
];

const cons = [
  {
    title: "请求不保证被处理",
    description: "请求可能到达链尾仍未被处理"
  },
  {
    title: "性能影响",
    description: "长链可能导致处理延迟"
  },
  {
    title: "调试困难",
    description: "请求在链中传递使调试复杂"
  },
  {
    title: "循环依赖风险",
    description: "处理链配置不当可能导致循环"
  }
];
</script>

<style lang="less" scoped>
.chain-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  color: #2c3e50;
}

.pattern-hero {
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 25%),
      radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 25%);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: 0 auto;

  h1 {
    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .hero-subtitle {
    font-size: 1.4rem;
    font-weight: 300;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 2rem;
  }
}

.chain-visualization {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.chain-link {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.handler-card {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 1.5rem 1rem;
  min-width: 120px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.handler-icon {
  font-size: 2.5rem;
  margin-bottom: 0.8rem;
}

.handler-name {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

.handler-limit {
  font-size: 0.9rem;
  opacity: 0.8;
}

.chain-connector {
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.connector-line {
  height: 20px;
  width: 2px;
  background: rgba(255, 255, 255, 0.5);
}

.connector-arrow {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
}

.pattern-tabs {
  display: flex;
  justify-content: center;
  background: #2c3e50;
  padding: 0;
  flex-wrap: wrap;
}

.tab-button {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  padding: 18px 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    color: white;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #3498db;
      border-radius: 4px 4px 0 0;
    }
  }
}

.tab-icon {
  font-size: 1.2rem;
}

.pattern-content {
  padding: 2rem;
}

.content-section {
  animation: fadeIn 0.5s ease;
}

.concept-intro {
  margin-bottom: 3rem;
}

.intro-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  border-left: 5px solid #3498db;

  .intro-icon {
    font-size: 4rem;
    color: #3498db;
    flex-shrink: 0;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #495057;
  }
}

.pattern-principle {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    text-align: center;
  }
}

.principles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.principle {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .principle-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #3498db;
  }

  h4 {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
    color: #2c3e50;
  }

  p {
    font-size: 1rem;
    color: #495057;
  }
}

.pattern-structure {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    text-align: center;
  }
}

.structure-diagram {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 3rem;
  position: relative;
  justify-items: center;
  margin-bottom: 2rem;

  .structure-item {
    width: 220px;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    position: relative;
    z-index: 2;

    &.handler {
      grid-column: 1;
      grid-row: 1;
      border-top: 3px solid #3498db;
    }

    &.concrete-handler {
      grid-row: 2;
      border-top: 3px solid #2ecc71;
    }
  }

  .class-header {
    background: #2c3e50;
    color: white;
    padding: 12px;
    font-weight: bold;
    text-align: center;
  }

  .class-methods {
    padding: 15px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;

    div {
      margin-bottom: 8px;
    }
  }
}
</style>
