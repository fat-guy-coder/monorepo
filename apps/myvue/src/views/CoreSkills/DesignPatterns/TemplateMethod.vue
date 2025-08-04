<template>
  <div class="template-container">
    <div class="header">
      <h1>模板方法模式基本介绍</h1>
      <p class="subtitle">定义算法骨架 - 允许子类重写特定步骤</p>
    </div>

    <div class="pattern-card">
      <div class="card-header">
        <div class="pattern-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" />
            <path d="M4 6h16v2H4zm0 4h16v2H4zm0 4h10v2H4z" />
          </svg>
        </div>
        <div class="pattern-info">
          <h2>模板方法模式 (Template Method Pattern)</h2>
          <div class="pattern-tags">
            <span class="tag">行为型模式</span>
            <span class="tag">算法骨架</span>
            <span class="tag">代码复用</span>
          </div>
        </div>
      </div>

      <div class="card-content">
        <div class="section concept">
          <h3>概念定义</h3>
          <p>
            模板方法模式是一种行为设计模式，它在超类中定义了一个算法的骨架，将某些步骤的具体实现延迟到子类中。
            该模式允许子类在不改变算法结构的情况下重新定义算法的某些特定步骤，实现了代码复用和扩展性的平衡。
          </p>
          <div class="concept-diagram">
            <div class="algorithm-flow">
              <div class="step fixed">模板方法()</div>
              <div class="arrow">↓</div>
              <div class="step fixed">步骤1()</div>
              <div class="arrow">↓</div>
              <div class="step hook">钩子方法()</div>
              <div class="arrow">↓</div>
              <div class="step abstract">抽象步骤()</div>
              <div class="arrow">↓</div>
              <div class="step fixed">步骤2()</div>
              <div class="arrow">↓</div>
              <div class="step abstract">抽象步骤()</div>
            </div>
            <div class="legend">
              <div class="legend-item">
                <div class="color fixed"></div>
                <div>固定步骤 (不可重写)</div>
              </div>
              <div class="legend-item">
                <div class="color abstract"></div>
                <div>抽象步骤 (必须重写)</div>
              </div>
              <div class="legend-item">
                <div class="color hook"></div>
                <div>钩子方法 (可选重写)</div>
              </div>
            </div>
          </div>
        </div>

        <div class="section implementation">
          <h3>实现方式</h3>
          <div class="code-example">
            <div class="code-tabs">
              <button :class="{ active: activeCode === 'structure' }" @click="activeCode = 'structure'">
                结构概览
              </button>
              <button :class="{ active: activeCode === 'report' }" @click="activeCode = 'report'">
                报告生成示例
              </button>
              <button :class="{ active: activeCode === 'build' }" @click="activeCode = 'build'">
                构建流程示例
              </button>
            </div>

            <div class="code-block">
              <pre v-if="activeCode === 'structure'"><code>// 抽象类定义算法骨架
abstract class AbstractClass {
  // 模板方法 - 定义算法骨架 (final 防止子类覆盖)
  public templateMethod(): void {
    this.step1();
    this.step2();
    this.step3();
    if (this.hook()) {
      this.optionalStep();
    }
  }

  // 固定步骤 (不可重写)
  protected step1(): void {
    console.log("执行固定步骤1");
  }

  // 抽象步骤 (必须由子类实现)
  protected abstract step2(): void;

  // 默认实现 (子类可选择是否重写)
  protected step3(): void {
    console.log("执行默认步骤3");
  }

  // 钩子方法 (子类可选择是否覆盖)
  protected hook(): boolean {
    return true;
  }

  // 可选步骤 (由钩子控制)
  protected optionalStep(): void {
    console.log("执行可选步骤");
  }
}

// 具体实现类A
class ConcreteClassA extends AbstractClass {
  protected step2(): void {
    console.log("具体类A实现步骤2");
  }

  protected hook(): boolean {
    return false; // 禁用可选步骤
  }
}

// 具体实现类B
class ConcreteClassB extends AbstractClass {
  protected step2(): void {
    console.log("具体类B实现步骤2");
  }

  protected step3(): void {
    console.log("具体类B重写步骤3");
  }

  protected optionalStep(): void {
    console.log("具体类B实现的可选步骤");
  }
}

// 客户端使用
const instanceA = new ConcreteClassA();
instanceA.templateMethod();
// 输出:
// 执行固定步骤1
// 具体类A实现步骤2
// 执行默认步骤3

const instanceB = new ConcreteClassB();
instanceB.templateMethod();
// 输出:
// 执行固定步骤1
// 具体类B实现步骤2
// 具体类B重写步骤3
// 具体类B实现的可选步骤</code></pre>

              <pre v-if="activeCode === 'report'"><code>// 报告生成器抽象类
abstract class ReportGenerator {
  // 模板方法 - 定义报告生成流程
  public generateReport(): void {
    this.collectData();
    this.formatData();
    this.generateHeader();
    this.generateBody();
    this.generateFooter();
    if (this.includeSummary()) {
      this.generateSummary();
    }
    this.saveReport();
  }

  // 抽象方法 - 必须由子类实现
  protected abstract collectData(): void;
  protected abstract formatData(): void;

  // 固定方法 - 所有报告通用
  protected generateHeader(): void {
    console.log("生成报告头部信息...");
  }

  // 默认实现 - 子类可选择重写
  protected generateBody(): void {
    console.log("生成报告主体内容...");
  }

  // 固定方法
  protected generateFooter(): void {
    console.log("生成报告页脚信息...");
  }

  // 钩子方法 - 控制是否包含总结
  protected includeSummary(): boolean {
    return false;
  }

  // 可选步骤 - 由钩子控制
  protected generateSummary(): void {
    console.log("生成报告总结...");
  }

  // 抽象方法 - 保存报告
  protected abstract saveReport(): void;
}

// PDF报告生成器
class PDFReportGenerator extends ReportGenerator {
  protected collectData(): void {
    console.log("收集PDF报告所需数据...");
  }

  protected formatData(): void {
    console.log("格式化数据为PDF格式...");
  }

  protected saveReport(): void {
    console.log("保存为PDF文件...");
  }
}

// HTML报告生成器
class HTMLReportGenerator extends ReportGenerator {
  protected collectData(): void {
    console.log("收集HTML报告所需数据...");
  }

  protected formatData(): void {
    console.log("格式化数据为HTML格式...");
  }

  protected generateBody(): void {
    console.log("生成带样式的HTML主体内容...");
  }

  protected includeSummary(): boolean {
    return true; // 启用总结部分
  }

  protected generateSummary(): void {
    console.log("生成HTML格式的总结...");
  }

  protected saveReport(): void {
    console.log("保存为HTML文件...");
  }
}

// 客户端使用
console.log("生成PDF报告:");
const pdfGenerator = new PDFReportGenerator();
pdfGenerator.generateReport();

console.log("\n生成HTML报告:");
const htmlGenerator = new HTMLReportGenerator();
htmlGenerator.generateReport();</code></pre>

              <pre v-if="activeCode === 'build'"><code>// 构建流程抽象类
abstract class BuildProcess {
  // 模板方法 - 定义构建流程
  public runBuild(): void {
    this.fetchSourceCode();
    this.installDependencies();
    this.runTests();
    if (this.runLinter()) {
      this.runCodeLinting();
    }
    this.buildArtifact();
    this.deploy();
    this.sendNotification();
  }

  // 固定步骤
  protected fetchSourceCode(): void {
    console.log("从版本控制系统获取源代码...");
  }

  // 抽象方法 - 必须由子类实现
  protected abstract installDependencies(): void;

  // 默认实现
  protected runTests(): void {
    console.log("运行单元测试...");
  }

  // 钩子方法 - 控制是否运行代码检查
  protected runLinter(): boolean {
    return true;
  }

  // 可选步骤
  protected runCodeLinting(): void {
    console.log("运行代码检查工具...");
  }

  // 抽象方法
  protected abstract buildArtifact(): void;

  // 抽象方法
  protected abstract deploy(): void;

  // 钩子方法 - 控制是否发送通知
  protected sendNotification(): void {
    console.log("发送构建完成通知...");
  }
}

// Web应用构建流程
class WebAppBuild extends BuildProcess {
  protected installDependencies(): void {
    console.log("使用npm安装依赖...");
  }

  protected runTests(): void {
    super.runTests();
    console.log("运行端到端测试...");
  }

  protected buildArtifact(): void {
    console.log("构建Web应用包...");
  }

  protected deploy(): void {
    console.log("部署到Web服务器...");
  }
}

// 移动应用构建流程
class MobileAppBuild extends BuildProcess {
  protected installDependencies(): void {
    console.log("使用CocoaPods和Gradle安装依赖...");
  }

  protected runLinter(): boolean {
    return false; // 禁用代码检查
  }

  protected buildArtifact(): void {
    console.log("编译iOS和Android应用...");
  }

  protected deploy(): void {
    console.log("上传到应用商店...");
  }

  protected sendNotification(): void {
    console.log("发送构建完成通知到Slack...");
  }
}

// 客户端使用
console.log("Web应用构建流程:");
const webBuild = new WebAppBuild();
webBuild.runBuild();

console.log("\n移动应用构建流程:");
const mobileBuild = new MobileAppBuild();
mobileBuild.runBuild();</code></pre>
            </div>
          </div>
        </div>

        <div class="section use-cases">
          <h3>使用场景</h3>
          <div class="case-grid">
            <div class="case-card">
              <div class="case-icon" style="background-color: #FF6B6B;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H7v-2h4v2zm0-4H7v-2h4v2zm0-4H7V7h4v2zm6 8h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V7h4v2z" />
                </svg>
              </div>
              <h4>框架设计</h4>
              <p>框架中定义算法骨架，允许用户实现具体步骤</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #4ECDC4;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                </svg>
              </div>
              <h4>报告生成</h4>
              <p>定义报告生成流程，不同格式实现具体步骤</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #118AB2;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                </svg>
              </div>
              <h4>构建流程</h4>
              <p>统一构建流程，不同项目实现具体构建步骤</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #FFD166;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <h4>数据解析</h4>
              <p>定义解析流程，不同格式实现解析细节</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #9B5DE5;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9v-2h2v2zm0-4H9V7h2v4zm4 4h-2v-2h2v2zm0-4h-2V7h2v4z" />
                </svg>
              </div>
              <h4>支付流程</h4>
              <p>统一支付流程，不同支付方式实现具体逻辑</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #06D6A0;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h2v5zm0 4h-2v-2h2v2z" />
                </svg>
              </div>
              <h4>工作流引擎</h4>
              <p>定义工作流程，不同业务实现具体活动</p>
            </div>
          </div>
        </div>

        <div class="section pros-cons">
          <h3>优缺点分析</h3>
          <div class="comparison">
            <div class="pros">
              <h4>优点</h4>
              <ul>
                <li><strong>代码复用</strong>：将通用算法放在超类中，避免重复代码</li>
                <li><strong>扩展性好</strong>：通过子类扩展算法特定步骤，符合开闭原则</li>
                <li><strong>控制反转</strong>：框架控制流程，子类实现细节</li>
                <li><strong>结构清晰</strong>：算法结构清晰可见，便于维护</li>
                <li><strong>钩子方法</strong>：提供灵活扩展点控制算法流程</li>
              </ul>
            </div>

            <div class="cons">
              <h4>缺点</h4>
              <ul>
                <li><strong>继承限制</strong>：只能通过继承实现，限制了灵活性</li>
                <li><strong>算法步骤固定</strong>：可能限制子类的灵活性</li>
                <li><strong>违反里氏替换原则</strong>：子类可能改变父类行为</li>
                <li><strong>过度泛化</strong>：算法步骤过多可能使设计复杂</li>
                <li><strong>调试困难</strong>：通过继承层级跳转可能增加调试难度</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="section best-practices">
          <h3>最佳实践</h3>
          <div class="practices-grid">
            <div class="practice-card">
              <div class="practice-number">1</div>
              <h4>最小化抽象方法</h4>
              <p>只将真正需要变化的步骤设为抽象方法</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">2</div>
              <h4>合理使用钩子</h4>
              <p>使用钩子方法提供扩展点而不是添加更多抽象方法</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">3</div>
              <h4>保护模板方法</h4>
              <p>使用final关键字防止子类覆盖模板方法</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">4</div>
              <h4>提供默认实现</h4>
              <p>为可能不需要改变的方法提供默认实现</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">5</div>
              <h4>命名约定</h4>
              <p>使用"Template"后缀明确表示模板类</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">6</div>
              <h4>避免过长流程</h4>
              <p>将过长算法分解为多个模板方法</p>
            </div>
          </div>
        </div>

        <div class="section pattern-variations">
          <h3>模式变体与相关模式</h3>
          <div class="variations">
            <div class="variation">
              <h4>工厂方法模式</h4>
              <p>模板方法常与工厂方法结合使用，让子类决定实例化哪个类</p>
            </div>
            <div class="variation">
              <h4>策略模式</h4>
              <p>策略模式通过组合改变整个算法，而模板方法通过继承改变部分步骤</p>
            </div>
            <div class="variation">
              <h4>钩子操作</h4>
              <p>提供默认行为的钩子方法，子类可选择是否覆盖</p>
            </div>
            <div class="variation">
              <h4>模板回调</h4>
              <p>使用回调函数代替子类继承，提供更大灵活性</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>设计模式 | 行为型模式 | 模板方法模式 © 2023</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeCode = ref<'structure' | 'report' | 'build'>('report');
</script>

<style scoped lang="less">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Source+Code+Pro:wght@400;500&display=swap');

.template-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    .subtitle {
      font-size: 1.2rem;
      color: #4b5563;
      margin-top: 0;
      font-weight: 500;
    }
  }

  .pattern-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;

    .card-header {
      background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
      color: #2c3e50;
      padding: 1.5rem 2rem;
      display: flex;
      align-items: center;

      .pattern-icon {
        width: 70px;
        height: 70px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1.5rem;

        svg {
          width: 40px;
          height: 40px;
          color: #d35400;
        }
      }

      .pattern-info {
        flex-grow: 1;

        h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.8rem;
          color: #2c3e50;
        }
      }

      .pattern-tags {
        display: flex;
        gap: 0.8rem;

        .tag {
          background: rgba(255, 255, 255, 0.6);
          color: #2c3e50;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
      }
    }

    .card-content {
      padding: 2rem;

      .section {
        margin-bottom: 2.5rem;

        h3 {
          color: #d35400;
          border-bottom: 2px solid #ff9a9e;
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          display: flex;
          align-items: center;

          &::before {
            content: "";
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #ff9a9e;
            border-radius: 50%;
            margin-right: 10px;
          }
        }

        p,
        li {
          line-height: 1.7;
          color: #4b5563;
          font-size: 1.05rem;
        }

        li {
          margin-bottom: 0.8rem;
          position: relative;
          padding-left: 1.5rem;

          &::before {
            content: "•";
            color: #ff9a9e;
            position: absolute;
            left: 0;
            font-weight: bold;
          }
        }
      }

      .concept-diagram {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2rem 0;
        padding: 2rem;
        background: #fff5f7;
        border-radius: 8px;
        position: relative;

        .algorithm-flow {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 500px;

          .step {
            padding: 1rem 2rem;
            border-radius: 8px;
            margin: 0.8rem 0;
            text-align: center;
            font-weight: 500;
            width: 80%;

            &.fixed {
              background: #e9f5e9;
              border: 2px solid #4CAF50;
              color: #2e7d32;
            }

            &.abstract {
              background: #e3f2fd;
              border: 2px solid #2196F3;
              color: #0d47a1;
            }

            &.hook {
              background: #fff8e1;
              border: 2px solid #FFC107;
              color: #ff8f00;
            }
          }

          .arrow {
            color: #9e9e9e;
            font-size: 1.5rem;
            font-weight: bold;
          }
        }

        .legend {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-top: 1.5rem;

          .legend-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            .color {
              width: 20px;
              height: 20px;
              border-radius: 4px;

              &.fixed {
                background: #4CAF50;
              }

              &.abstract {
                background: #2196F3;
              }

              &.hook {
                background: #FFC107;
              }
            }
          }
        }
      }

      .code-example {
        .code-tabs {
          display: flex;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #e5e7eb;

          button {
            padding: 0.8rem 1.5rem;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
            color: #6b7280;
            position: relative;
            transition: all 0.3s;

            &:hover {
              color: #ff9a9e;
            }

            &.active {
              color: #ff9a9e;
              font-weight: 600;

              &::after {
                content: "";
                position: absolute;
                bottom: -1px;
                left: 0;
                right: 0;
                height: 3px;
                background: #ff9a9e;
                border-radius: 3px 3px 0 0;
              }
            }
          }
        }

        .code-block {
          background: #1e293b;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

          pre {
            margin: 0;
            padding: 1.5rem;
            overflow-x: auto;

            code {
              font-family: 'Source Code Pro', monospace;
              font-size: 0.95rem;
              color: #e2e8f0;
              line-height: 1.6;
            }
          }
        }
      }

      .case-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;

        .case-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
          border: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
            border-color: #ff9a9e;
          }

          .case-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;

            svg {
              width: 24px;
              height: 24px;
            }
          }

          h4 {
            margin: 0 0 0.8rem 0;
            font-size: 1.2rem;
            color: #1e293b;
          }

          p {
            margin: 0;
            font-size: 0.95rem;
            color: #4b5563;
            line-height: 1.6;
          }
        }
      }

      .pros-cons {
        .comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }

          .pros,
          .cons {
            padding: 1.5rem;
            border-radius: 8px;

            h4 {
              margin-top: 0;
              padding-bottom: 0.5rem;
              border-bottom: 2px solid;
            }
          }

          .pros {
            background: rgba(76, 175, 80, 0.05);
            border: 1px solid rgba(76, 175, 80, 0.2);

            h4 {
              color: #2e7d32;
              border-color: #2e7d32;
            }
          }

          .cons {
            background: rgba(244, 67, 54, 0.05);
            border: 1px solid rgba(244, 67, 54, 0.2);

            h4 {
              color: #c62828;
              border-color: #c62828;
            }
          }
        }
      }

      .practices-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;

        .practice-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          position: relative;
          overflow: hidden;

          .practice-number {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            width: 30px;
            height: 30px;
            background: #ffd1dc;
            color: #d35400;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.1rem;
          }

          h4 {
            margin: 0.5rem 0 0.8rem 0;
            color: #d35400;
            font-size: 1.15rem;
          }

          p {
            margin: 0;
            font-size: 0.95rem;
            color: #4b5563;
            line-height: 1.6;
          }
        }
      }

      .pattern-variations {
        .variations {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;

          .variation {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
            border-left: 4px solid #ff9a9e;

            h4 {
              margin: 0 0 0.8rem 0;
              color: #d35400;
              font-size: 1.2rem;
            }

            p {
              margin: 0;
              color: #4b5563;
              line-height: 1.6;
            }
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    color: #6b7280;
    font-size: 0.9rem;
    padding: 1.5rem;
  }
}
</style>
