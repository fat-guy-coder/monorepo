<template>
  <div class="error-handling-intro">
    <header class="page-header">
      <div class="header-content">
        <h1 class="title">JavaScript 错误处理</h1>
        <p class="subtitle">构建健壮应用的关键技术</p>
        <div class="error-visualization">
          <div class="error-flow">
            <div class="flow-step" v-for="step in errorFlow" :key="step.id" :class="step.status">
              <div class="step-icon">{{ step.icon }}</div>
              <div class="step-content">
                <h4>{{ step.title }}</h4>
                <p>{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <nav class="nav-sidebar">
        <ul class="nav-list">
          <li
            v-for="section in sections"
            :key="section.id"
            :class="{ active: activeSection === section.id }"
            @click="scrollToSection(section.id)"
          >
            <span class="nav-icon">{{ section.icon }}</span>
            {{ section.title }}
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- 错误类型 -->
        <section id="error-types" class="content-section">
          <h2>JavaScript 错误类型</h2>
          <p class="section-description">了解不同类型的错误有助于更精确地诊断和解决问题。</p>

          <div class="error-types-grid">
            <div class="error-type-card" v-for="errorType in errorTypes" :key="errorType.name">
              <div class="error-header" :class="errorType.severity">
                <h3>{{ errorType.name }}</h3>
                <span class="error-icon">{{ errorType.icon }}</span>
              </div>
              <div class="error-content">
                <p>{{ errorType.description }}</p>
                <div class="error-example">
                  <strong>触发场景：</strong>
                  <pre><code>{{ errorType.example }}</code></pre>
                </div>
                <div class="error-solution" v-if="errorType.solution">
                  <strong>解决方案：</strong>
                  <p>{{ errorType.solution }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 错误捕获 -->
        <section id="error-catching" class="content-section">
          <h2>错误捕获机制</h2>
          <p class="section-description">多种方式捕获和处理JavaScript运行时错误。</p>

          <div class="catching-methods">
            <div class="method-card" v-for="method in catchingMethods" :key="method.name">
              <div class="method-header">
                <h3>{{ method.name }}</h3>
                <span class="method-scope">{{ method.scope }}</span>
              </div>
              <div class="method-content">
                <p>{{ method.description }}</p>
                <div class="method-example">
                  <pre><code>{{ method.example }}</code></pre>
                </div>
                <div class="method-pros-cons">
                  <div class="pros">
                    <strong>优点：</strong>
                    <ul>
                      <li v-for="pro in method.pros" :key="pro">{{ pro }}</li>
                    </ul>
                  </div>
                  <div class="cons">
                    <strong>缺点：</strong>
                    <ul>
                      <li v-for="con in method.cons" :key="con">{{ con }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="error-propagation">
            <h3>错误传播机制</h3>
            <div class="propagation-chart">
              <div class="propagation-step" v-for="step in propagationSteps" :key="step.step">
                <div class="step-number">{{ step.step }}</div>
                <div class="step-description">{{ step.description }}</div>
                <div class="step-code" v-if="step.code">
                  <pre><code>{{ step.code }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 自定义错误 -->
        <section id="custom-errors" class="content-section">
          <h2>自定义错误</h2>
          <p class="section-description">创建特定于应用程序的错误类型，提供更清晰的错误信息。</p>

          <div class="custom-error-demo">
            <div class="demo-explanation">
              <h3>自定义错误类实现</h3>
              <p>通过继承Error类创建自定义错误类型，可以添加额外的属性和方法。</p>

              <div class="code-implementation">
                <pre><code>{{ customErrorCode }}</code></pre>
              </div>
            </div>

            <div class="demo-usage">
              <h3>使用示例</h3>
              <div class="usage-examples">
                <div class="usage-example" v-for="example in usageExamples" :key="example.title">
                  <h4>{{ example.title }}</h4>
                  <pre><code>{{ example.code }}</code></pre>
                  <div class="example-output" v-if="example.output">
                    <strong>输出：</strong>
                    <pre><code>{{ example.output }}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="best-practices">
            <h3>错误处理最佳实践</h3>
            <div class="practice-cards">
              <div class="practice-card" v-for="practice in bestPractices" :key="practice.title">
                <div class="practice-icon">{{ practice.icon }}</div>
                <h4>{{ practice.title }}</h4>
                <p>{{ practice.description }}</p>
                <div class="practice-example" v-if="practice.example">
                  <pre><code>{{ practice.example }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 实战案例 -->
        <section id="practical-cases" class="content-section">
          <h2>实战案例</h2>
          <p class="section-description">在实际应用场景中应用错误处理技术。</p>

          <div class="case-studies">
            <div class="case-study" v-for="caseStudy in caseStudies" :key="caseStudy.title">
              <div class="case-header">
                <h3>{{ caseStudy.title }}</h3>
                <span class="case-difficulty" :class="caseStudy.difficulty">{{ caseStudy.difficulty }}</span>
              </div>
              <div class="case-content">
                <p><strong>场景描述：</strong>{{ caseStudy.scenario }}</p>
                <div class="case-problem">
                  <h4>问题分析</h4>
                  <ul>
                    <li v-for="problem in caseStudy.problems" :key="problem">{{ problem }}</li>
                  </ul>
                </div>
                <div class="case-solution">
                  <h4>解决方案</h4>
                  <pre><code>{{ caseStudy.solution }}</code></pre>
                </div>
                <div class="case-benefits">
                  <h4>改进效果</h4>
                  <ul>
                    <li v-for="benefit in caseStudy.benefits" :key="benefit">{{ benefit }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 调试工具 -->
        <section id="debugging-tools" class="content-section">
          <h2>调试与监控工具</h2>
          <p class="section-description">利用工具提高错误诊断和修复效率。</p>

          <div class="tools-overview">
            <div class="tool-category" v-for="category in toolCategories" :key="category.name">
              <h3>{{ category.name }}</h3>
              <div class="tool-list">
                <div class="tool-item" v-for="tool in category.tools" :key="tool.name">
                  <div class="tool-info">
                    <h4>{{ tool.name }}</h4>
                    <p>{{ tool.description }}</p>
                  </div>
                  <div class="tool-usage">
                    <pre><code>{{ tool.usage }}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="page-footer">
      <p>JavaScript 错误处理 - 构建稳定可靠的应用程序</p>
      <p class="footer-note">合理的错误处理是专业开发的标志</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 响应式数据
const activeSection = ref('error-types');

// 错误处理流程
const errorFlow = [
  {
    id: 1,
    icon: '🚨',
    title: '错误发生',
    description: '代码执行过程中出现异常',
    status: 'error'
  },
  {
    id: 2,
    icon: '🕵️',
    title: '错误捕获',
    description: '通过try-catch或错误事件监听捕获错误',
    status: 'catching'
  },
  {
    id: 3,
    icon: '🔍',
    title: '错误分析',
    description: '分析错误类型、堆栈信息和上下文',
    status: 'analyzing'
  },
  {
    id: 4,
    icon: '🛠️',
    title: '错误处理',
    description: '根据错误类型采取适当的恢复措施',
    status: 'handling'
  },
  {
    id: 5,
    icon: '📊',
    title: '错误报告',
    description: '记录错误信息用于监控和调试',
    status: 'reporting'
  },
  {
    id: 6,
    icon: '✅',
    title: '恢复执行',
    description: '程序继续正常运行或优雅降级',
    status: 'recovered'
  }
];

// 导航章节
const sections = [
  { id: 'error-types', title: '错误类型', icon: '📝' },
  { id: 'error-catching', title: '错误捕获', icon: '🕸️' },
  { id: 'custom-errors', title: '自定义错误', icon: '⚙️' },
  { id: 'practical-cases', title: '实战案例', icon: '💼' },
  { id: 'debugging-tools', title: '调试工具', icon: '🔧' }
];

// 错误类型数据
const errorTypes = [
  {
    name: 'SyntaxError',
    icon: '📖',
    severity: 'high',
    description: '语法错误，代码不符合JavaScript语法规则',
    example: `// 缺少括号
if (x > 5 {
  console.log('x is greater than 5');
}

// 无效的变量名
let 123variable = 'test';`,
    solution: '检查代码语法，使用代码编辑器或lint工具检测语法问题'
  },
  {
    name: 'ReferenceError',
    icon: '🔍',
    severity: 'medium',
    description: '引用错误，访问未定义的变量或函数',
    example: `// 引用未声明的变量
console.log(undefinedVariable);

// 在声明前访问变量
console.log(x);
let x = 5;`,
    solution: '确保变量在使用前已声明，检查变量作用域'
  },
  {
    name: 'TypeError',
    icon: '🔄',
    severity: 'medium',
    description: '类型错误，对值进行了不适当的操作',
    example: `// 对null调用方法
let obj = null;
obj.someMethod();

// 对非函数值进行调用
let notFunction = 42;
notFunction();`,
    solution: '进行类型检查，使用可选链操作符(?.)和空值合并操作符(??)'
  },
  {
    name: 'RangeError',
    icon: '📏',
    severity: 'medium',
    description: '范围错误，数值超出有效范围',
    example: `// 数组长度为负数
let arr = new Array(-1);

// 递归调用栈溢出
function infiniteRecursion() {
  infiniteRecursion();
}`,
    solution: '验证输入参数的范围，避免无限递归'
  },
  {
    name: 'URIError',
    icon: '🌐',
    severity: 'low',
    description: 'URI处理错误，URI编码或解码操作失败',
    example: `// 错误的URI编码
decodeURIComponent('%');

// 无效的URI
encodeURI('\\uD800');`,
    solution: '确保URI格式正确，使用try-catch处理URI操作'
  },
  {
    name: 'EvalError',
    icon: '⚡',
    severity: 'low',
    description: 'eval()函数使用错误，在现代JavaScript中较少见',
    example: `// 严格模式下使用eval
"use strict";
eval = 10;`,
    solution: '避免使用eval()，使用更安全的替代方案'
  },
  {
    name: 'AggregateError',
    icon: '📦',
    severity: 'medium',
    description: '聚合错误，多个错误被组合在一起',
    example: `// Promise.any()所有promise都被拒绝时
Promise.any([
  Promise.reject(new Error('Error 1')),
  Promise.reject(new Error('Error 2'))
]).catch(error => {
  console.log(error instanceof AggregateError); // true
});`,
    solution: '处理多个并行操作的错误情况'
  }
];

// 错误捕获方法
const catchingMethods = [
  {
    name: 'try-catch-finally',
    scope: '同步代码',
    description: '最基本的错误捕获机制，用于同步代码块的错误处理',
    example: `try {
  // 可能抛出错误的代码
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  // 错误处理
  console.error('操作失败:', error.message);
  // 可选的恢复逻辑
  fallbackOperation();
} finally {
  // 无论是否发生错误都会执行
  cleanup();
}`,
    pros: [
      '精确控制错误处理范围',
      '支持finally块进行清理操作',
      '可访问完整的错误对象'
    ],
    cons: [
      '无法捕获异步错误',
      '嵌套过多会影响代码可读性',
      '需要预知可能出错的位置'
    ]
  },
  {
    name: 'Promise.catch()',
    scope: 'Promise异步',
    description: '用于捕获Promise链中的拒绝状态',
    example: `fetch('/api/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('网络响应不正常');
    }
    return response.json();
  })
  .then(data => processData(data))
  .catch(error => {
    console.error('请求失败:', error);
    showErrorMessage('数据加载失败');
  });`,
    pros: [
      '专门处理Promise错误',
      '链式调用，代码清晰',
      '可以捕获整个Promise链的错误'
    ],
    cons: [
      '只能用于Promise',
      '需要返回Promise或使用async/await',
      '错误类型信息可能有限'
    ]
  },
  {
    name: 'async/await + try-catch',
    scope: '异步函数',
    description: '在async函数中使用try-catch捕获异步操作错误',
    example: `async function loadUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) {
      throw new Error('用户数据获取失败');
    }
    const userData = await response.json();
    return processUserData(userData);
  } catch (error) {
    console.error('加载用户数据失败:', error);
    // 返回默认值或重新抛出错误
    return getDefaultUserData();
  }
}`,
    pros: [
      '同步风格的错误处理',
      '代码可读性好',
      '可以精确控制错误处理逻辑'
    ],
    cons: [
      '只能在async函数中使用',
      '需要额外的函数包装',
      '可能隐藏真正的错误原因'
    ]
  },
  {
    name: 'window.onerror',
    scope: '全局错误',
    description: '全局错误事件处理程序，捕获未被处理的运行时错误',
    example: `window.onerror = function(message, source, lineno, colno, error) {
  console.error('全局错误:', {
    message,    // 错误信息
    source,     // 发生错误的脚本URL
    lineno,     // 行号
    colno,      // 列号
    error       // Error对象
  });

  // 发送错误报告到监控系统
  sendErrorReport({
    message, source, lineno, colno, error
  });

  // 返回true阻止浏览器默认错误处理
  return true;
};`,
    pros: [
      '捕获全局未处理错误',
      '提供详细的错误上下文',
      '可以集成错误监控系统'
    ],
    cons: [
      '无法捕获Promise拒绝',
      '不同浏览器实现有差异',
      '可能影响页面性能'
    ]
  },
  {
    name: 'unhandledrejection',
    scope: 'Promise拒绝',
    description: '捕获未被处理的Promise拒绝事件',
    example: `window.addEventListener('unhandledrejection', function(event) {
  console.error('未处理的Promise拒绝:', event.reason);

  // 阻止默认行为（浏览器控制台错误）
  event.preventDefault();

  // 记录错误信息
  logUnhandledRejection(event.reason);
});`,
    pros: [
      '专门处理未捕获的Promise错误',
      '提供Promise拒绝的原因',
      '可以防止Promise错误被静默忽略'
    ],
    cons: [
      '只处理Promise相关错误',
      '需要手动添加事件监听',
      '错误堆栈信息可能不完整'
    ]
  }
];

// 错误传播步骤
const propagationSteps = [
  {
    step: 1,
    description: '错误在函数内部抛出',
    code: `function processData(data) {
  if (!data) {
    throw new Error('数据不能为空');
  }
  // 处理数据...
}`
  },
  {
    step: 2,
    description: '错误沿着调用栈向上传播',
    code: `function main() {
  try {
    processData(null); // 这里会抛出错误
  } catch (error) {
    // 错误传播到这里被捕获
    console.error('处理数据时出错:', error);
  }
}`
  },
  {
    step: 3,
    description: '如果没有被捕获，继续向上传播',
    code: `// 如果没有try-catch，错误会继续传播
function init() {
  main(); // 错误从这里继续传播
}

// 最终到达全局作用域
init(); // 错误在全局作用域被window.onerror捕获`
  },
  {
    step: 4,
    description: '在全局作用域被处理或显示',
    code: `// 全局错误处理
window.onerror = function(msg, source, line, col, error) {
  console.log('全局错误处理:', error);
  return true; // 阻止浏览器默认错误显示
};`
  }
];

// 自定义错误代码
const customErrorCode = `// 基础自定义错误类
class AppError extends Error {
  constructor(message, code, context) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.context = context;
    this.timestamp = new Date().toISOString();

    // 保持正确的堆栈跟踪
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      context: this.context,
      timestamp: this.timestamp,
      stack: this.stack
    };
  }
}

// 特定错误类型
class ValidationError extends AppError {
  constructor(field, value, rules) {
    super(\`字段 "\${field}" 验证失败\`, 'VALIDATION_ERROR', {
      field,
      value,
      rules
    });
  }
}

class NetworkError extends AppError {
  constructor(url, status, response) {
    super(\`网络请求失败: \${url}\`, 'NETWORK_ERROR', {
      url,
      status,
      response
    });
  }
}

class BusinessError extends AppError {
  constructor(operation, reason, details) {
    super(\`业务操作失败: \${operation}\`, 'BUSINESS_ERROR', {
      operation,
      reason,
      details
    });
  }
}`;

// 使用示例
const usageExamples = [
  {
    title: '抛出验证错误',
    code: `function validateUser(user) {
  if (!user.email) {
    throw new ValidationError('email', user.email, {
      required: true,
      type: 'email'
    });
  }

  if (user.age < 18) {
    throw new ValidationError('age', user.age, {
      min: 18,
      max: 100
    });
  }
}`,
    output: `ValidationError: 字段 "email" 验证失败
    at validateUser (user.js:15:11)
    at createUser (user.js:25:5)`
  },
  {
    title: '捕获和处理自定义错误',
    code: `async function createUser(userData) {
  try {
    validateUser(userData);
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new NetworkError('/api/users', response.status, await response.text());
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ValidationError) {
      // 处理验证错误
      showValidationErrors(error.context);
      return null;
    } else if (error instanceof NetworkError) {
      // 处理网络错误
      showNetworkError(error.context.status);
      return null;
    } else {
      // 处理其他未知错误
      console.error('未知错误:', error);
      throw error;
    }
  }
}`,
    output: `根据错误类型执行不同的处理逻辑`
  }
];

// 最佳实践
const bestPractices = [
  {
    icon: '🎯',
    title: '具体错误信息',
    description: '提供足够详细的错误信息，包括上下文和可能的原因',
    example: `// 不好的做法
throw new Error('操作失败');

// 好的做法
throw new AppError(
  '用户创建失败: 邮箱已被注册',
  'USER_CREATE_FAILED',
  { email: 'user@example.com', reason: 'duplicate_email' }
);`
  },
  {
    icon: '📋',
    title: '错误分类',
    description: '根据错误类型进行分类，便于不同的处理策略',
    example: `// 定义错误类型枚举
const ErrorType = {
  VALIDATION: 'VALIDATION_ERROR',
  NETWORK: 'NETWORK_ERROR',
  BUSINESS: 'BUSINESS_ERROR',
  SYSTEM: 'SYSTEM_ERROR'
};

// 根据类型处理错误
switch (error.code) {
  case ErrorType.VALIDATION:
    handleValidationError(error);
    break;
  case ErrorType.NETWORK:
    handleNetworkError(error);
    break;
  default:
    handleUnknownError(error);
}`
  },
  {
    icon: '🔄',
    title: '优雅降级',
    description: '在错误发生时提供备用方案，确保用户体验',
    example: `async function loadUserProfile(userId) {
  try {
    const profile = await fetchUserProfile(userId);
    return profile;
  } catch (error) {
    console.warn('加载用户资料失败，使用默认资料:', error);
    // 返回默认资料而不是抛出错误
    return getDefaultProfile();
  }
}`
  },
  {
    icon: '📊',
    title: '错误监控',
    description: '记录和上报错误信息，用于问题诊断和系统改进',
    example: `// 错误监控集成
window.addEventListener('error', (event) => {
  const errorInfo = {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error?.stack,
    userAgent: navigator.userAgent,
    url: window.location.href
  };

  // 发送到错误监控服务
  fetch('/api/error-report', {
    method: 'POST',
    body: JSON.stringify(errorInfo)
  });
});`
  }
];

// 实战案例
const caseStudies = [
  {
    title: '表单验证错误处理',
    difficulty: '初级',
    scenario: '用户注册表单需要验证多个字段，并提供清晰的错误提示',
    problems: [
      '用户输入不合法时缺乏明确提示',
      '多个验证错误难以同时展示',
      '错误信息格式不统一'
    ],
    solution: `class FormValidator {
  constructor(formElement) {
    this.form = formElement;
    this.errors = new Map();
  }

  validateField(fieldName, value, rules) {
    const fieldErrors = [];

    if (rules.required && !value) {
      fieldErrors.push(new ValidationError(fieldName, value, {
        rule: 'required',
        message: '此字段为必填项'
      }));
    }

    if (rules.minLength && value.length < rules.minLength) {
      fieldErrors.push(new ValidationError(fieldName, value, {
        rule: 'minLength',
        message: \`最少需要 \${rules.minLength} 个字符\`
      }));
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      fieldErrors.push(new ValidationError(fieldName, value, {
        rule: 'pattern',
        message: rules.customMessage || '格式不正确'
      }));
    }

    if (fieldErrors.length > 0) {
      this.errors.set(fieldName, fieldErrors);
    } else {
      this.errors.delete(fieldName);
    }

    return fieldErrors;
  }

  displayErrors() {
    // 清除之前的错误显示
    this.clearErrors();

    // 显示新的错误
    for (const [fieldName, errors] of this.errors) {
      const fieldElement = this.form.querySelector(\`[name="\${fieldName}"]\`);
      const errorContainer = document.createElement('div');
      errorContainer.className = 'error-message';

      errors.forEach(error => {
        const errorElement = document.createElement('p');
        errorElement.textContent = error.context.message;
        errorContainer.appendChild(errorElement);
      });

      fieldElement.parentNode.appendChild(errorContainer);
      fieldElement.classList.add('error');
    }
  }

  clearErrors() {
    const errorElements = this.form.querySelectorAll('.error-message');
    errorElements.forEach(el => el.remove());

    const fieldElements = this.form.querySelectorAll('.error');
    fieldElements.forEach(el => el.classList.remove('error'));
  }
}`,
    benefits: [
      '统一的错误处理逻辑',
      '清晰的用户错误提示',
      '可重用的验证组件',
      '易于扩展新的验证规则'
    ]
  },
  {
    title: 'API请求错误处理',
    difficulty: '中级',
    scenario: '前端应用需要处理各种HTTP请求错误，包括网络问题和服务端错误',
    problems: [
      '网络超时没有重试机制',
      '服务端错误缺乏统一处理',
      '用户看不到请求状态反馈'
    ],
    solution: `class ApiClient {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.defaultOptions = {
      timeout: 10000,
      retries: 3,
      ...options
    };
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const requestOptions = {
      ...this.defaultOptions,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    let lastError;

    for (let attempt = 0; attempt <= requestOptions.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), requestOptions.timeout);

        const response = await fetch(url, {
          ...requestOptions,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new NetworkError(
            url,
            response.status,
            await response.text().catch(() => '无法读取响应内容')
          );
        }

        return await response.json();

      } catch (error) {
        lastError = error;

        // 如果是中止错误或非网络错误，不再重试
        if (error.name === 'AbortError' ||
            !(error instanceof NetworkError)) {
          break;
        }

        // 如果是服务器错误且不是最后一次尝试，等待后重试
        if (attempt < requestOptions.retries &&
            error.context.status >= 500) {
          await this.delay(1000 * Math.pow(2, attempt)); // 指数退避
          continue;
        }

        break;
      }
    }

    throw lastError;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}`,
    benefits: [
      '自动重试机制提高请求成功率',
      '统一的网络错误处理',
      '超时控制防止长时间等待',
      '清晰的错误分类和反馈'
    ]
  }
];

// 调试工具分类
const toolCategories = [
  {
    name: '浏览器开发者工具',
    tools: [
      {
        name: 'Console',
        description: '查看错误日志和堆栈跟踪',
        usage: `// 在控制台中查看错误
console.error('错误信息:', error);
console.trace(); // 打印堆栈跟踪

// 使用断点调试
debugger;`
      },
      {
        name: 'Sources面板',
        description: '设置断点和单步调试',
        usage: `// 在Sources面板中可以：
// 1. 设置断点
// 2. 单步执行代码
// 3. 查看变量值
// 4. 查看调用堆栈`
      },
      {
        name: 'Network面板',
        description: '监控网络请求和响应',
        usage: `// 查看请求状态和响应内容
// 过滤失败的请求 (status >= 400)
// 查看请求头和响应头`
      }
    ]
  },
  {
    name: '错误监控服务',
    tools: [
      {
        name: 'Sentry',
        description: '实时错误跟踪和监控',
        usage: `// 初始化Sentry
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "YOUR_DSN_HERE",
  environment: "production"
});

// 手动捕获错误
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error);
}

// 设置用户上下文
Sentry.setUser({ email: "user@example.com" });`
      },
      {
        name: 'Bugsnag',
        description: '错误监控和稳定性指标',
        usage: `// 初始化Bugsnag
import Bugsnag from '@bugsnag/js';

Bugsnag.start({
  apiKey: 'YOUR_API_KEY',
  onError: (event) => {
    // 自定义错误处理逻辑
    event.severity = 'warning';
  }
});

// 手动通知
Bugsnag.notify(new Error('Something went wrong'));`
      }
    ]
  },
  {
    name: '自定义工具',
    tools: [
      {
        name: '错误边界 (React)',
        description: 'React组件树的错误捕获',
        usage: `class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 记录错误信息
    console.error('组件错误:', error, errorInfo);
    // 发送错误报告
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>出错了！</div>;
    }

    return this.props.children;
  }
}

// 使用
<ErrorBoundary fallback={<ErrorComponent />}>
  <MyComponent />
</ErrorBoundary>`
      },
      {
        name: '性能监控',
        description: '监控应用性能和错误率',
        usage: `// 性能指标监控
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'navigation') {
      console.log('页面加载时间:', entry.loadEventEnd - entry.navigationStart);
    }
  }
});

observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });

// 错误率统计
let errorCount = 0;
let totalRequests = 0;

window.addEventListener('error', () => errorCount++);

function calculateErrorRate() {
  return totalRequests > 0 ? (errorCount / totalRequests) * 100 : 0;
}`
      }
    ]
  }
];

// 滚动到指定章节
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = sectionId;
  }
};

// 监听滚动以更新活动章节
const handleScroll = () => {
  const scrollPosition = window.scrollY + 100;

  for (const section of sections) {
    const element = document.getElementById(section.id);
    if (element) {
      const offsetTop = element.offsetTop;
      const offsetHeight = element.offsetHeight;

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section.id;
        break;
      }
    }
  }
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less" scoped>
// 变量定义
@primary-color: #4a6fa5;
@primary-light: #6b8cbc;
@primary-dark: #3a5680;
@error-color: #e74c3c;
@warning-color: #f39c12;
@success-color: #27ae60;
@info-color: #3498db;
@text-color: #2c3e50;
@text-light: #7f8c8d;
@border-color: #e1e8ed;
@bg-color: #ffffff;
@sidebar-bg: #f8fafc;
@card-bg: #fdfdfd;
@shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
@shadow-hover: 0 8px 24px 0 rgba(0, 0, 0, 0.15);

// 基础样式
.error-handling-intro {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: @text-color;
  background-color: @bg-color;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

// 页面头部
.page-header {
  background: linear-gradient(135deg, @primary-color 0%, @primary-dark 100%);
  color: white;
  padding: 3rem 2rem 4rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
  }

  .header-content {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .title {
    font-size: 3rem;
    font-weight: 800;
    margin: 0 0 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .subtitle {
    font-size: 1.5rem;
    opacity: 0.9;
    margin: 0 0 3rem;
    font-weight: 400;
  }
}

// 错误流程可视化
.error-visualization {
  margin-top: 2rem;

  .error-flow {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 30px;
      left: 0;
      right: 0;
      height: 2px;
      background: rgba(255, 255, 255, 0.3);
      z-index: 1;
    }

    .flow-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
      z-index: 2;
      flex: 1;

      .step-icon {
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        border: 2px solid rgba(255, 255, 255, 0.5);
      }

      .step-content {
        h4 {
          margin: 0 0 0.5rem;
          font-size: 1.1rem;
        }

        p {
          margin: 0;
          font-size: 0.9rem;
          opacity: 0.9;
        }
      }

      // 状态颜色
      &.error .step-icon {
        background: rgba(231, 76, 60, 0.3);
        border-color: rgba(231, 76, 60, 0.7);
      }

      &.catching .step-icon {
        background: rgba(52, 152, 219, 0.3);
        border-color: rgba(52, 152, 219, 0.7);
      }

      &.analyzing .step-icon {
        background: rgba(243, 156, 18, 0.3);
        border-color: rgba(243, 156, 18, 0.7);
      }

      &.handling .step-icon {
        background: rgba(155, 89, 182, 0.3);
        border-color: rgba(155, 89, 182, 0.7);
      }

      &.reporting .step-icon {
        background: rgba(46, 204, 113, 0.3);
        border-color: rgba(46, 204, 113, 0.7);
      }

      &.recovered .step-icon {
        background: rgba(39, 174, 96, 0.3);
        border-color: rgba(39, 174, 96, 0.7);
      }
    }
  }
}

// 内容布局
.content-wrapper {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  gap: 2rem;
}

// 导航侧边栏
.nav-sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: 2rem;
  align-self: flex-start;

  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    background: @sidebar-bg;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @shadow;

    li {
      padding: 1rem 1.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border-left: 4px solid transparent;
      display: flex;
      align-items: center;
      gap: 0.75rem;

      &:hover {
        background-color: darken(@sidebar-bg, 2%);
        color: @primary-color;
      }

      &.active {
        background-color: white;
        color: @primary-color;
        border-left-color: @primary-color;
        font-weight: 600;
      }

      .nav-icon {
        font-size: 1.2rem;
      }
    }
  }
}

// 主内容区域
.main-content {
  flex: 1;
  max-width: 880px;
}

// 内容区块
.content-section {
  margin-bottom: 3rem;
  padding: 2.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: @shadow;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: @shadow-hover;
  }

  h2 {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid @border-color;
    color: @primary-dark;
  }

  .section-description {
    color: @text-light;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
}

// 错误类型网格
.error-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.error-type-card {
  background: @card-bg;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  .error-header {
    padding: 1.25rem;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.high {
      background: @error-color;
    }

    &.medium {
      background: @warning-color;
    }

    &.low {
      background: @info-color;
    }

    h3 {
      margin: 0;
      font-size: 1.3rem;
    }

    .error-icon {
      font-size: 1.5rem;
    }
  }

  .error-content {
    padding: 1.25rem;

    p {
      margin-bottom: 1rem;
      color: @text-color;
    }

    .error-example,
    .error-solution {
      margin-top: 1rem;

      strong {
        display: block;
        margin-bottom: 0.5rem;
        color: @text-light;
      }

      pre {
        background: @sidebar-bg;
        border-radius: 4px;
        padding: 1rem;
        overflow-x: auto;
        margin: 0;

        code {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.85rem;
          color: @text-color;
          line-height: 1.4;
        }
      }
    }
  }
}

// 捕获方法
.catching-methods {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0;
}

.method-card {
  background: @card-bg;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid @primary-color;

  .method-header {
    padding: 1.25rem;
    background: @sidebar-bg;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      color: @primary-color;
    }

    .method-scope {
      background: @primary-color;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
  }

  .method-content {
    padding: 1.25rem;

    p {
      margin-bottom: 1rem;
      color: @text-color;
    }

    .method-example {
      margin: 1.5rem 0;

      pre {
        background: @sidebar-bg;
        border-radius: 4px;
        padding: 1rem;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.85rem;
          color: @text-color;
          line-height: 1.4;
        }
      }
    }

    .method-pros-cons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-top: 1.5rem;

      .pros, .cons {
        strong {
          display: block;
          margin-bottom: 0.5rem;
          color: @text-color;
        }

        ul {
          margin: 0;
          padding-left: 1.5rem;

          li {
            margin-bottom: 0.25rem;
            color: @text-light;
          }
        }
      }

      .pros {
        strong {
          color: @success-color;
        }
      }

      .cons {
        strong {
          color: @error-color;
        }
      }
    }
  }
}

// 错误传播
.error-propagation {
  margin-top: 3rem;

  h3 {
    margin-bottom: 1.5rem;
    color: @primary-color;
  }

  .propagation-chart {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .propagation-step {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 1.5rem;
    background: @card-bg;
    border-radius: 8px;
    border-left: 4px solid @info-color;

    .step-number {
      width: 40px;
      height: 40px;
      background: @info-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
    }

    .step-description {
      flex: 1;
      color: @text-color;
      font-weight: 500;
    }

    .step-code {
      flex: 2;

      pre {
        background: @sidebar-bg;
        border-radius: 4px;
        padding: 1rem;
        overflow-x: auto;
        margin: 0;

        code {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.85rem;
          color: @text-color;
          line-height: 1.4;
        }
      }
    }
  }
}

// 自定义错误演示
.custom-error-demo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem 0;

  .demo-explanation,
  .demo-usage {
    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @primary-color;
    }
  }

  .code-implementation {
    margin-top: 1.5rem;

    pre {
      background: @sidebar-bg;
      border-radius: 4px;
      padding: 1.25rem;
      overflow-x: auto;

      code {
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 0.85rem;
        color: @text-color;
        line-height: 1.4;
      }
    }
  }

  .usage-examples {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .usage-example {
    h4 {
      margin: 0 0 1rem;
      color: @primary-color;
    }

    pre {
      background: @sidebar-bg;
      border-radius: 4px;
      padding: 1rem;
      overflow-x: auto;
      margin-bottom: 1rem;

      code {
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 0.85rem;
        color: @text-color;
        line-height: 1.4;
      }
    }

    .example-output {
      strong {
        display: block;
        margin-bottom: 0.5rem;
        color: @text-light;
      }

      pre {
        background: lighten(@warning-color, 45%);
        border: 1px solid lighten(@warning-color, 20%);
      }
    }
  }
}

// 最佳实践
.best-practices {
  margin-top: 3rem;

  h3 {
    margin-bottom: 1.5rem;
    color: @primary-color;
  }

  .practice-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .practice-card {
    padding: 1.5rem;
    background: @card-bg;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-top: 3px solid @primary-color;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    .practice-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    h4 {
      margin: 0 0 0.75rem;
      color: @primary-color;
    }

    p {
      margin-bottom: 1rem;
      color: @text-color;
    }

    .practice-example {
      pre {
        background: @sidebar-bg;
        border-radius: 4px;
        padding: 1rem;
        overflow-x: auto;
        margin: 0;

        code {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.85rem;
          color: @text-color;
          line-height: 1.4;
        }
      }
    }
  }
}

// 实战案例
.case-studies {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0;
}

.case-study {
  background: @card-bg;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .case-header {
    padding: 1.25rem;
    background: @sidebar-bg;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      color: @primary-color;
    }

    .case-difficulty {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      color: white;

      &.初级 {
        background: @success-color;
      }

      &.中级 {
        background: @warning-color;
      }

      &.高级 {
        background: @error-color;
      }
    }
  }

  .case-content {
    padding: 1.25rem;

    p {
      margin-bottom: 1.5rem;
      color: @text-color;
    }

    .case-problem,
    .case-benefits {
      margin: 1.5rem 0;

      h4 {
        margin: 0 0 1rem;
        color: @primary-color;
      }

      ul {
        margin: 0;
        padding-left: 1.5rem;

        li {
          margin-bottom: 0.5rem;
          color: @text-color;
        }
      }
    }

    .case-solution {
      margin: 1.5rem 0;

      h4 {
        margin: 0 0 1rem;
        color: @primary-color;
      }

      pre {
        background: @sidebar-bg;
        border-radius: 4px;
        padding: 1.25rem;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.85rem;
          color: @text-color;
          line-height: 1.4;
        }
      }
    }
  }
}

// 调试工具
.tools-overview {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0;
}

.tool-category {
  h3 {
    margin: 0 0 1.5rem;
    color: @primary-color;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  .tool-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .tool-item {
    display: flex;
    gap: 1.5rem;
    padding: 1.5rem;
    background: @card-bg;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .tool-info {
      flex: 1;

      h4 {
        margin: 0 0 0.5rem;
        color: @primary-color;
      }

      p {
        margin: 0;
        color: @text-color;
      }
    }

    .tool-usage {
      flex: 1;

      pre {
        background: @sidebar-bg;
        border-radius: 4px;
        padding: 1rem;
        overflow-x: auto;
        margin: 0;

        code {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.85rem;
          color: @text-color;
          line-height: 1.4;
        }
      }
    }
  }
}

// 页脚
.page-footer {
  text-align: center;
  padding: 2.5rem;
  margin-top: 3rem;
  background: @sidebar-bg;
  color: @text-light;

  p {
    margin: 0.5rem 0;
  }

  .footer-note {
    font-size: 0.9rem;
    opacity: 0.7;
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
  }

  .nav-sidebar {
    width: 100%;
    margin-bottom: 1.5rem;
    position: static;

    .nav-list {
      display: flex;
      overflow-x: auto;

      li {
        flex-shrink: 0;
        border-left: none;
        border-bottom: 3px solid transparent;

        &.active {
          border-left: none;
          border-bottom-color: @primary-color;
        }
      }
    }
  }

  .error-flow {
    flex-direction: column;
    gap: 2rem;

    &::before {
      display: none;
    }
  }

  .custom-error-demo {
    grid-template-columns: 1fr;
  }

  .tool-item {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 2rem 1rem 3rem;

    .title {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.2rem;
    }
  }

  .content-section {
    padding: 1.5rem;
  }

  .error-types-grid {
    grid-template-columns: 1fr;
  }

  .method-pros-cons {
    grid-template-columns: 1fr;
  }

  .propagation-step {
    flex-direction: column;
    gap: 1rem;
  }

  .practice-cards {
    grid-template-columns: 1fr;
  }
}
</style>
