<template>
  <div class="operator-container">
    <header class="header">
      <h1>JavaScript <span class="highlight">运算符优先级</span>与进阶使用</h1>
      <p class="subtitle">掌握运算符规则，编写更高效、更清晰的代码</p>
    </header>

    <div class="content">
      <div class="priority-section">
        <h2 class="section-title">
          <i class="icon fas fa-sort-amount-down-alt"></i>
          运算符优先级
        </h2>
        <p class="section-description">
          运算符优先级决定了表达式中运算的执行顺序。优先级高的运算符会先于优先级低的运算符执行。
        </p>

        <div class="priority-table">
          <div class="table-header">
            <div class="header-item">优先级</div>
            <div class="header-item">运算符类型</div>
            <div class="header-item">运算符</div>
          </div>
          <div v-for="(item, index) in priorityData" :key="index" class="table-row">
            <div class="row-priority">{{ item.priority }}</div>
            <div class="row-type">{{ item.type }}</div>
            <div class="row-operators">
              <span v-for="(op, opIndex) in item.operators" :key="opIndex" class="operator-tag">
                {{ op }}
              </span>
            </div>
          </div>
        </div>

        <div class="priority-examples">
          <h3 class="examples-title">
            <i class="icon fas fa-lightbulb"></i>
            优先级示例
          </h3>
          <div class="example-group">
            <pre class="code-block">const result = 1 + 2 * 3; <span class="comment">// 7（乘法优先）</span></pre>
            <pre class="code-block">const value = false || true && false; <span class="comment">// false（相当于 false || (true && false)）</span></pre>
            <pre class="code-block">const output = true ? 'A' : 'B' + 'C'; <span class="comment">// 'A'（相当于 true ? 'A' : ('B' + 'C')）</span></pre>
          </div>
        </div>
      </div>

      <div class="advanced-section">
        <h2 class="section-title">
          <i class="icon fas fa-magic"></i>
          运算符进阶用法
        </h2>
        <p class="section-description">
          掌握这些进阶技巧，编写更简洁高效的JavaScript代码：
        </p>

        <div class="advanced-grid">
          <div v-for="(item, index) in advancedData" :key="index" class="advanced-card">
            <h3 class="card-title">
              <i :class="item.icon"></i>
              {{ item.title }}
            </h3>
            <p class="card-description">{{ item.description }}</p>
            <pre class="card-code">{{ item.code }}</pre>
          </div>
        </div>
      </div>

      <div class="interactive-section">
        <h2 class="section-title">
          <i class="icon fas fa-flask"></i>
          运算符实验器
        </h2>

        <div class="expression-input">
          <input
            v-model="expression"
            type="text"
            placeholder="输入 JavaScript 表达式，如: 1 + 2 * 3"
            @keyup.enter="evaluateExpression"
          >
          <Button @click="evaluateExpression">
          计算
          </Button>
          <Button @click="loadExample">
          示例
          </Button>
        </div>

        <div class="result-container">
          <div class="result-item">
            <h3>计算结果:</h3>
            <div class="result-value">{{ evaluationResult }}</div>
          </div>
          <div class="result-item">
            <h3>等价写法:</h3>
            <div class="result-value">{{ parsedExpression }}</div>
          </div>
        </div>
      </div>

      <div class="best-practices">
        <h2 class="section-title">
          <i class="icon fas fa-check-circle"></i>
          最佳实践
        </h2>

        <div class="practices-grid">
          <div v-for="(item, index) in practicesData" :key="index" class="practice-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>掌握运算符优先级和高级技巧，编写更清晰、更高效的 JavaScript 代码</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Button,Input } from 'ant-design-vue';
import { ref } from 'vue';

// 运算符优先级数据
const priorityData = ref([
  { priority: 1, type: '成员访问', operators: ['.', '[]'] },
  { priority: 2, type: '调用、实例创建', operators: ['()', 'new'] },
  { priority: 3, type: '后置递增/减', operators: ['++', '--'] },
  { priority: 4, type: '逻辑非、一元运算符', operators: ['!', '~', '+', '-', '++', '--', 'typeof', 'void', 'delete'] },
  { priority: 5, type: '指数', operators: ['**'] },
  { priority: 6, type: '乘除取模', operators: ['*', '/', '%'] },
  { priority: 7, type: '加减', operators: ['+', '-'] },
  { priority: 8, type: '位移', operators: ['<<', '>>', '>>>'] },
  { priority: 9, type: '关系', operators: ['<', '<=', '>', '>=', 'in', 'instanceof'] },
  { priority: 10, type: '相等', operators: ['==', '!=', '===', '!=='] },
  { priority: 11, type: '位与', operators: ['&'] },
  { priority: 12, type: '位异或', operators: ['^'] },
  { priority: 13, type: '位或', operators: ['|'] },
  { priority: 14, type: '逻辑与', operators: ['&&'] },
  { priority: 15, type: '逻辑或', operators: ['||', '??'] },
  { priority: 16, type: '条件(三元)', operators: ['? :'] },
  { priority: 17, type: '赋值', operators: ['=', '+=', '-=', '*=', '/=', '%=', '**=', '<<=', '>>=', '>>>=', '&=', '^=', '|='] },
  { priority: 18, type: '逗号', operators: [','] }
]);

// 进阶用法数据
const advancedData = ref([
  {
    icon: 'fas fa-bolt',
    title: '短路求值',
    description: '利用 && 和 || 的短路特性简化条件语句',
    code: `// 代替 if 语句\nisLogged && showDashboard();\n\n// 设置默认值\nconst name = username || 'Guest';\n\n// 条件访问\nuser && user.address && user.address.city;`
  },
  {
    icon: 'fas fa-layer-group',
    title: '解构赋值',
    description: '使用解构进行变量交换和值提取',
    code: `// 变量交换\nlet a = 1, b = 2;\n[a, b] = [b, a]; // a=2, b=1\n\n// 函数参数解构\nfunction draw({x, y, size = 10}) {\n  // ...\n}\n\n// 嵌套解构\nconst {user: {name}} = data;`
  },
  {
    icon: 'fas fa-question-circle',
    title: '空值合并',
    description: '使用 ?? 处理 null/undefined',
    code: `// 与 || 的区别\nconst count = 0;\nconsole.log(count || 10); // 10\nconsole.log(count ?? 10); // 0\n\n// 链式使用\nconst value = a ?? b ?? c ?? 'default';`
  },
  {
    icon: 'fas fa-link',
    title: '可选链操作符',
    description: '使用 ?. 安全访问嵌套属性',
    code: `// 避免 Cannot read property of undefined\nconst city = user?.address?.city;\n\n// 函数安全调用\nconst result = obj.method?.();\n\n// 数组安全访问\nconst item = arr?.[0];`
  },
  {
    icon: 'fas fa-calculator',
    title: '指数运算符',
    description: '使用 ** 进行幂运算',
    code: `// 平方和立方\nconst square = 5 ** 2; // 25\nconst cube = 2 ** 3;   // 8\n\n// 替代 Math.pow\nconst root = 16 ** 0.5; // 4\n\n// 赋值版本\nlet num = 3;\nnum **= 2; // 9`
  },
  {
    icon: 'fas fa-binary',
    title: '位运算符技巧',
    description: '利用位运算进行高效数值操作',
    code: `// 向下取整\nconst floor = ~~3.78; // 3\n\n// 奇偶判断\nconst isEven = num => (num & 1) === 0;\n\n// 值交换（无临时变量）\nlet x = 5, y = 10;\nx ^= y; y ^= x; x ^= y;`
  }
]);

// 最佳实践数据
const practicesData = ref([
  {
    title: '优先使用严格相等',
    description: '总是使用 === 和 !== 避免类型转换问题'
  },
  {
    title: '合理使用括号',
    description: '当优先级不明确时添加括号，提高可读性'
  },
  {
    title: '利用运算符简化代码',
    description: '适当使用三元运算符、空值合并等简化逻辑'
  },
  {
    title: '避免复杂表达式',
    description: '拆分过于复杂的表达式，提高可维护性'
  }
]);

// 交互式表达式计算
const expression = ref('1 + 2 * 3 === 7 && !false');
const evaluationResult = ref('');
const parsedExpression = ref('');

// 安全评估表达式
const evaluateExpression = () => {
  try {
    // 使用 Function 构造函数避免直接使用 eval
    const safeEval = new Function(`return (${expression.value})`);
    const result = safeEval();

    // 处理不同结果类型的显示
    if (typeof result === 'function') {
      evaluationResult.value = `[函数] ${result.toString()}`;
    } else if (result === null) {
      evaluationResult.value = 'null';
    } else if (result === undefined) {
      evaluationResult.value = 'undefined';
    } else if (typeof result === 'object') {
      evaluationResult.value = JSON.stringify(result, null, 2);
    } else {
      evaluationResult.value = result.toString();
    }

    // 解析表达式添加括号
    parseExpression();
  } catch (error) {
    evaluationResult.value = `错误: ${error.message}`;
    parsedExpression.value = '无法解析表达式';
  }
};

// 解析表达式并添加括号
const parseExpression = () => {
  try {
    // 这里简化处理 - 实际应用中应使用解析器
    let parsed = expression.value;

    // 为常见运算符添加括号
    const operatorPrecedence = [
      { op: '**', priority: 4 },
      { op: '* / %', priority: 3 },
      { op: '+ -', priority: 2 },
      { op: '<< >> >>>', priority: 2 },
      { op: '< <= > >= instanceof in', priority: 2 },
      { op: '== != === !==', priority: 2 },
      { op: '&&', priority: 1 },
      { op: '|| ??', priority: 1 },
      { op: '? :', priority: 0 }
    ];

    // 根据优先级添加括号
    operatorPrecedence.forEach(({ op, priority }) => {
      const operators = op.split(' ');
      operators.forEach(operator => {
        if (operator && parsed.includes(operator)) {
          const regex = new RegExp(`\\b(\\d+|\\([^)]+\\))\\s*\\${operator.replace(/(.)/g, '\\$1')}\\s*\\b(\\d+|\\([^)]+\\))`, 'g');
          parsed = parsed.replace(regex, '($1 ' + operator + ' $2)');
        }
      });
    });

    parsedExpression.value = parsed;
  } catch (error) {
    parsedExpression.value = '解析失败: ' + error.message;
  }
};

// 加载示例表达式
const loadExample = () => {
  const examples = [
    '2 ** 3 * 4',
    '5 > 3 && 2 < 4',
    'user?.name || "Anonymous"',
    '10 + 5 * 2',
    'true ? "Yes" : "No" + "?"',
    'a = b = c = 5',
    '1 + "1" - 1',
    '!!"truthy"'
  ];

  const randomExample = examples[Math.floor(Math.random() * examples.length)];
  expression.value = randomExample;
  evaluateExpression();
};

// 初始化
evaluateExpression();
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

:root {
  --primary: #4361ee;
  --primary-light: #eef2ff;
  --secondary: #3a0ca3;
  --success: #2ec4b6;
  --warning: #ff9f1c;
  --danger: #e71d36;
  --dark: #1e1e2c;
  --light: #f8f9fa;
  --gray: #6c757d;
  --border: #dee2e6;
  --card-bg: #ffffff;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.operator-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: linear-gradient(135deg, #f8f9fa 0%, #eef2ff 100%);
  color: var(--dark);
  line-height: 1.6;
  padding: 20px;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f0f4ff 0%, #e6f7ff 100%);
  border-radius: 16px;
  box-shadow: var(--shadow);

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 15px;
    color: var(--dark);

    .highlight {
      color: var(--primary);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 6px;
        background: rgba(67, 97, 238, 0.2);
        border-radius: 3px;
      }
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: var(--gray);
    max-width: 700px;
    margin: 0 auto;
    font-weight: 500;
  }
}

.content {
  background-color: var(--card-bg);
  border-radius: 16px;
  box-shadow: var(--shadow);
  overflow: hidden;
  padding: 40px;
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--secondary);
  display: flex;
  align-items: center;
  gap: 10px;

  .icon {
    color: var(--primary);
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-light);
    border-radius: 50%;
  }
}

.section-description {
  color: var(--gray);
  margin-bottom: 25px;
  font-size: 1.1rem;
}

.priority-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);

  .table-header {
    display: flex;
    background: var(--primary);
    color: white;
    font-weight: 600;

    .header-item {
      padding: 15px;
      flex: 1;
      text-align: center;
    }
  }

  .table-row {
    display: flex;
    border-bottom: 1px solid var(--border);
    background: white;

    &:nth-child(even) {
      background: #f9fafb;
    }

    &:last-child {
      border-bottom: none;
    }

    .row-priority {
      flex: 0.5;
      padding: 15px;
      text-align: center;
      font-weight: 600;
      background: var(--primary-light);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .row-type {
      flex: 1.5;
      padding: 15px;
      display: flex;
      align-items: center;
      font-weight: 500;
    }

    .row-operators {
      flex: 2;
      padding: 15px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;

      .operator-tag {
        background: #f1f5ff;
        color: var(--primary);
        padding: 5px 10px;
        border-radius: 6px;
        font-family: 'Courier New', monospace;
        font-weight: 600;
        font-size: 0.95rem;
        border: 1px solid rgba(67, 97, 238, 0.2);
      }
    }
  }
}

.priority-examples {
  margin-top: 40px;

  .examples-title {
    font-size: 1.4rem;
    margin-bottom: 20px;
    color: var(--success);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .example-group {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid var(--border);
  }
}

.code-block {
  background: #1e1e2c;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  overflow-x: auto;
  color: #f8f8f2;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  line-height: 1.5;

  .comment {
    color: #6272a4;
  }
}

.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.advanced-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 25px;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-top: 4px solid var(--primary);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-hover);
  }

  .card-title {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--primary);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .card-description {
    color: var(--gray);
    margin-bottom: 15px;
    font-size: 1rem;
  }

  .card-code {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    margin-top: 10px;
    font-family: 'Courier New', monospace;
    font-size: 0.95rem;
    color: var(--dark);
    white-space: pre-wrap;
    border: 1px solid var(--border);
  }
}

.interactive-section {
  margin: 50px 0;

  .expression-input {
    display: flex;
    gap: 15px;
    margin: 25px 0;

    input {
      flex: 1;
      padding: 14px 20px;
      border: 2px solid var(--border);
      border-radius: 10px;
      font-size: 1rem;
      font-family: 'Inter', sans-serif;

      &:focus {
        border-color: var(--primary);
        outline: none;
        box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
      }
    }

    button {

      color: white;
      border: none;
      padding: 0 25px;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 8px;

      &:hover {
        background: var(--secondary);
        transform: translateY(-2px);
      }
    }
  }

  .result-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .result-item {
    background: var(--primary-light);
    border-radius: 12px;
    padding: 20px;

    h3 {
      margin-bottom: 15px;
      color: var(--primary);
    }

    .result-value {
      font-family: 'Courier New', monospace;
      font-size: 1.1rem;
      background: white;
      padding: 15px;
      border-radius: 8px;
      min-height: 60px;
      border: 1px solid var(--border);
    }
  }
}

.best-practices {
  margin-top: 50px;

  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .practice-card {
    background: var(--primary-light);
    border-radius: 10px;
    padding: 20px;
    border-left: 4px solid var(--success);

    h3 {
      margin-bottom: 10px;
      color: var(--secondary);
    }

    p {
      color: var(--gray);
      font-size: 0.95rem;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  color: var(--gray);
  font-size: 0.95rem;
  padding: 20px;
}

@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 2rem;
    }
  }

  .content {
    padding: 20px;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .table-row {
    flex-direction: column;

    .row-priority, .row-type, .row-operators {
      width: 100%;
      padding: 10px 15px;
    }
  }

  .advanced-grid {
    grid-template-columns: 1fr;
  }
}
</style>
