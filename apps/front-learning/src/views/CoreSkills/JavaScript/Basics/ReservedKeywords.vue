<template>
  <div class="keywords-reference">
    <!-- 标题区域 -->
    <header class="header">
      <h1>JavaScript 关键字参考</h1>
      <p class="subtitle">基本指南 JavaScript 核心关键字的作用、用法及注意事项</p>
    </header>

    <!-- 控制区域 -->
    <div class="controls">
      <div class="search-box">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="搜索关键字..."
          class="search-input"
        >
        <span class="search-icon">🔍</span>
      </div>

      <div class="category-filter">
        <button
          v-for="category in categories"
          :key="category"
          @click="toggleCategory(category)"
          :class="{ active: selectedCategories.includes(category) }"
          class="category-btn"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- 关键字展示区域 -->
    <div class="keywords-container">
      <div
        v-for="(keyword, index) in filteredKeywords"
        :key="index"
        class="keyword-card"
      >
        <div class="keyword-header">
          <span class="keyword-name">{{ keyword.name }}</span>
          <span class="keyword-category">{{ keyword.category }}</span>
        </div>

        <div class="keyword-content">
          <div class="section">
            <h3>作用</h3>
            <p>{{ keyword.description }}</p>
          </div>

          <div class="section">
            <h3>使用方式</h3>
            <pre class="code-block">{{ keyword.usage }}</pre>
          </div>

          <div class="section">
            <h3>适用场景</h3>
            <p>{{ keyword.scenarios }}</p>
          </div>

          <div class="section">
            <h3>注意事项</h3>
            <p>{{ keyword.precautions }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部信息 -->
    <footer class="footer">
      <p>共 {{ filteredKeywords.length }} 个关键字 | Vue 3 + TypeScript + Less</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 关键字类型定义
interface Keyword {
  name: string;
  category: string;
  description: string;
  usage: string;
  scenarios: string;
  precautions: string;
}

// 关键字数据
const keywords = ref<Keyword[]>([
  // 变量声明
  {
    name: "let",
    category: "变量声明",
    description: "声明一个块级作用域的局部变量，可选择初始化其值",
    usage: `let x = 10;\nif (true) {\n  let x = 20; // 不同的变量\n}`,
    scenarios: "在需要块级作用域变量时使用，避免变量提升问题",
    precautions: "同一作用域内不能重复声明；存在暂时性死区"
  },
  {
    name: "const",
    category: "变量声明",
    description: "声明一个块级作用域的常量，其值不能被重新赋值",
    usage: "const PI = 3.14;\nconst person = { name: 'John' };\nperson.name = 'Jane'; // 允许",
    scenarios: "声明不会被重新赋值的变量，如配置常量、对象引用",
    precautions: "必须初始化；不能重新赋值；但对象属性可修改"
  },
  {
    name: "var",
    category: "变量声明",
    description: "声明一个函数作用域的变量，可以重复声明且存在变量提升",
    usage: "var a = 1;\nfunction test() {\n  var b = 2;\n}",
    scenarios: "兼容老代码或需要变量提升时",
    precautions: "存在变量提升和作用域混乱问题，建议优先使用let/const"
  },

  // 函数
  {
    name: "function",
    category: "函数",
    description: "声明一个函数",
    usage: "function greet(name) {\n  return `Hello, ${name}!`;\n}",
    scenarios: "定义可重用代码块，适用于需要多次调用的逻辑",
    precautions: "函数声明会提升；避免在块内声明函数"
  },
  {
    name: "return",
    category: "函数",
    description: "从函数返回一个值，并终止函数执行",
    usage: "function sum(a, b) {\n  return a + b;\n}",
    scenarios: "需要从函数中返回结果时",
    precautions: "return后面的代码不会被执行"
  },

  // 面向对象
  {
    name: "class",
    category: "面向对象",
    description: "声明一个类",
    usage: "class Person {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    console.log(`Hello, ${this.name}!`);\n  }\n}",
    scenarios: "创建面向对象程序，封装相关属性和方法",
    precautions: "类声明不会提升；使用前需先定义"
  },
  {
    name: "extends",
    category: "面向对象",
    description: "用于类的继承，创建子类",
    usage: "class Animal {}\nclass Dog extends Animal {}",
    scenarios: "需要继承父类属性和方法时",
    precautions: "子类构造函数中需调用super()"
  },
  {
    name: "super",
    category: "面向对象",
    description: "调用父类的构造函数或方法",
    usage: "class Dog extends Animal {\n  constructor() {\n    super();\n  }\n}",
    scenarios: "在子类中访问父类方法或构造函数",
    precautions: "只能在子类中使用"
  },
  {
    name: "new",
    category: "面向对象",
    description: "创建一个用户定义的对象类型的实例",
    usage: "function Person(name) {\n  this.name = name;\n}\nconst alice = new Person('Alice');",
    scenarios: "创建构造函数实例",
    precautions: "忘记使用new会导致全局变量创建和意外行为"
  },
  {
    name: "this",
    category: "上下文",
    description: "指向函数执行上下文对象",
    usage: "const obj = {\n  name: 'Alice',\n  greet() {\n    console.log(`Hello, ${this.name}!`);\n  }\n};",
    scenarios: "在对象方法中访问对象属性；构造函数中",
    precautions: "箭头函数没有自己的this；函数调用方式影响this值"
  },

  // 控制流
  {
    name: "if",
    category: "控制流",
    description: "根据条件执行语句",
    usage: "if (score >= 60) {\n  console.log('及格');\n} else if (score >= 80) {\n  console.log('优秀');\n} else {\n  console.log('不及格');\n}",
    scenarios: "条件分支逻辑处理",
    precautions: "避免深层嵌套；考虑使用switch或策略模式替代"
  },
  {
    name: "else",
    category: "控制流",
    description: "与if语句配合，条件不成立时执行",
    usage: "if (flag) {\n  // ...\n} else {\n  // ...\n}",
    scenarios: "需要处理if条件不成立的情况",
    precautions: "只能与if配合使用"
  },
  {
    name: "switch",
    category: "控制流",
    description: "根据表达式的值进行多分支选择",
    usage: "switch(day) {\n  case 1: console.log('Mon'); break;\n  default: console.log('Other');\n}",
    scenarios: "需要根据不同值执行不同代码块时",
    precautions: "记得使用break防止贯穿"
  },
  {
    name: "case",
    category: "控制流",
    description: "switch语句的分支条件",
    usage: "switch(x) {\n  case 1: ...\n  case 2: ...\n}",
    scenarios: "与switch配合使用",
    precautions: "case后面跟要判断的值"
  },
  {
    name: "default",
    category: "控制流",
    description: "switch语句中所有case都不匹配时执行",
    usage: "switch(x) {\n  default: ...\n}",
    scenarios: "处理所有case都不匹配的情况",
    precautions: "只能在switch语句中使用"
  },
  {
    name: "break",
    category: "控制流",
    description: "跳出当前循环或switch语句",
    usage: "for (let i=0;i<10;i++) {\n  if (i===5) break;\n}",
    scenarios: "需要提前终止循环或switch时",
    precautions: "只能用于循环或switch"
  },
  {
    name: "continue",
    category: "控制流",
    description: "跳过本次循环，继续下一次循环",
    usage: "for (let i=0;i<10;i++) {\n  if (i%2===0) continue;\n  console.log(i);\n}",
    scenarios: "需要跳过某些循环条件时",
    precautions: "只能用于循环"
  },

  // 循环
  {
    name: "for",
    category: "循环",
    description: "创建一个循环，包含初始化、条件和迭代表达式",
    usage: "for (let i = 0; i < 5; i++) {\n  console.log(i);\n}",
    scenarios: "需要精确控制迭代次数时",
    precautions: "注意循环变量的作用域；避免无限循环"
  },
  {
    name: "while",
    category: "循环",
    description: "只要条件为真就重复执行代码块",
    usage: "let i = 0;\nwhile (i < 5) {\n  i++;\n}",
    scenarios: "循环次数不确定时",
    precautions: "注意条件变化，避免死循环"
  },
  {
    name: "do...while",
    category: "循环",
    description: "先执行一次代码块，再判断条件是否继续循环",
    usage: "let i = 0;\ndo {\n  i++;\n} while (i < 5);",
    scenarios: "至少需要执行一次循环体时",
    precautions: "循环体至少执行一次"
  },
  {
    name: "for...in",
    category: "循环",
    description: "遍历对象的可枚举属性",
    usage: "for (let key in obj) {\n  console.log(key, obj[key]);\n}",
    scenarios: "遍历对象属性时",
    precautions: "不建议用于遍历数组"
  },
  {
    name: "for...of",
    category: "循环",
    description: "遍历可迭代对象（如数组、字符串、Set等）",
    usage: "for (let value of arr) {\n  console.log(value);\n}",
    scenarios: "遍历数组、字符串、Set、Map等",
    precautions: "不能遍历普通对象"
  },

  // 错误处理
  {
    name: "try...catch",
    category: "错误处理",
    description: "标记要尝试的语句块，并指定一个在异常抛出时的响应",
    usage: "try {\n  // 可能出错的代码\n} catch (error) {\n  console.error(error);\n} finally {\n  // 清理代码\n}",
    scenarios: "处理可能抛出错误的操作，如API调用、JSON解析",
    precautions: "不要过度使用；仅处理可预测的异常"
  },
  {
    name: "throw",
    category: "错误处理",
    description: "主动抛出一个异常",
    usage: "throw new Error('出错了');",
    scenarios: "需要主动中断流程并抛出错误时",
    precautions: "抛出后需用try...catch捕获"
  },
  {
    name: "finally",
    category: "错误处理",
    description: "无论是否发生异常，finally块都会执行",
    usage: "try { ... } catch(e) { ... } finally { ... }",
    scenarios: "需要做收尾清理操作时",
    precautions: "finally总会执行"

  },

  // 异步处理
  {
    name: "async/await",
    category: "异步处理",
    description: "以同步方式编写异步代码",
    usage: "async function fetchData() {\n  try {\n    const response = await fetch(url);\n    return response.json();\n  } catch (error) {\n    console.error(error);\n  }\n}",
    scenarios: "处理Promise链，简化异步操作",
    precautions: "只能在async函数中使用；避免阻塞主线程"
  },
  {
    name: "await",
    category: "异步处理",
    description: "等待Promise对象完成并返回结果",
    usage: "const data = await fetchData();",
    scenarios: "在async函数中等待异步结果",
    precautions: "只能在async函数中使用"
  },

  // 模块化
  {
    name: "export/import",
    category: "模块化",
    description: "用于模块的导出和导入",
    usage: "// module.js\nexport const PI = 3.14;\nexport function square(x) { return x * x; }\n\n// main.js\nimport { PI, square } from './module.js';",
    scenarios: "模块化开发，代码组织和复用",
    precautions: "注意命名导出和默认导出的区别；处理循环依赖"
  },
  {
    name: "import",
    category: "模块化",
    description: "从其他模块导入变量、函数、类等",
    usage: "import { PI } from './math.js';",
    scenarios: "需要使用其他模块的内容时",
    precautions: "只能在模块顶层使用"
  },
  {
    name: "export",
    category: "模块化",
    description: "将变量、函数、类等导出供其他模块使用",
    usage: "export const PI = 3.14;",
    scenarios: "需要暴露模块内容时",
    precautions: "只能在模块顶层使用"
  },

  // 上下文
  {
    name: "delete",
    category: "上下文",
    description: "删除对象的属性",
    usage: "const obj = {a:1};\ndelete obj.a;",
    scenarios: "需要移除对象属性时",
    precautions: "不能删除变量，只能删除对象属性"
  },
  {
    name: "typeof",
    category: "上下文",
    description: "返回一个变量的数据类型字符串",
    usage: "typeof 123; // 'number'",
    scenarios: "判断变量类型时",
    precautions: "对null返回'object'，注意特殊情况"
  },
  {
    name: "instanceof",
    category: "上下文",
    description: "判断对象是否为某个构造函数的实例",
    usage: "arr instanceof Array; // true",
    scenarios: "判断对象类型时",
    precautions: "只能判断引用类型"
  },
  {
    name: "in",
    category: "上下文",
    description: "判断属性是否在对象中",
    usage: "'a' in {a:1}; // true",
    scenarios: "判断对象是否有某属性时",
    precautions: "会检查原型链"
  },
  {
    name: "void",
    category: "上下文",
    description: "对表达式求值但不返回结果，常用于立即执行函数",
    usage: "void function() { ... }();",
    scenarios: "需要表达式不返回值时",
    precautions: "常用于书签脚本等特殊场景"
  },
  {
    name: "with",
    category: "上下文",
    description: "扩展作用域链（已废弃，不推荐使用）",
    usage: "with(obj) {\n  console.log(a);\n}",
    scenarios: "早期用于简化对象属性访问",
    precautions: "已废弃，严格模式下不可用"
  },
  {
    name: "this",
    category: "上下文",
    description: "指向当前执行上下文对象",
    usage: "function f() { console.log(this); }",
    scenarios: "访问当前对象属性或方法时",
    precautions: "不同调用方式this指向不同"
  },

  // 生成器
  {
    name: "yield",
    category: "生成器",
    description: "暂停和恢复生成器函数",
    usage: "function* generator() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\nconst gen = generator();",
    scenarios: "创建可迭代序列；惰性求值",
    precautions: "只能在生成器函数中使用；不支持箭头函数"
  },
  {
    name: "generator",
    category: "生成器",
    description: "生成器函数的声明方式（function*）",
    usage: "function* gen() { yield 1; }",
    scenarios: "需要惰性生成数据时",
    precautions: "function*是声明生成器的语法"
  },

  // 其它常用关键字
  {
    name: "null",
    category: "其它",
    description: "表示空值或无对象",
    usage: "let a = null;",
    scenarios: "需要表示变量为空时",
    precautions: "typeof null 返回 'object'"
  },
  {
    name: "undefined",
    category: "其它",
    description: "表示未定义的值",
    usage: "let a;\nconsole.log(a); // undefined",
    scenarios: "变量未赋值时的默认值",
    precautions: "与null的区别：undefined是未赋值，null是人为赋空"
  },
  {
    name: "true/false",
    category: "其它",
    description: "布尔值，表示真或假",
    usage: "let flag = true;\nif (flag) { ... }",
    scenarios: "条件判断、逻辑运算",
    precautions: "注意与字符串'true'的区别"
  },
  {
    name: "NaN",
    category: "其它",
    description: "表示不是一个数字（Not a Number）",
    usage: "let n = 0/0; // NaN",
    scenarios: "数值计算出错时",
    precautions: "NaN !== NaN，需用isNaN判断"
  },
  {
    name: "Infinity",
    category: "其它",
    description: "表示无穷大",
    usage: "let inf = 1/0; // Infinity",
    scenarios: "数值溢出时",
    precautions: "Infinity > 任何有限数"
  },
  {
    name: "debugger",
    category: "其它",
    description: "代码执行到此处会自动断点（调试用）",
    usage: "debugger;",
    scenarios: "调试代码时手动设置断点",
    precautions: "生产环境应移除"
  },
  {
    name: "await",
    category: "异步处理",
    description: "等待Promise对象完成并返回结果",
    usage: "const data = await fetchData();",
    scenarios: "在async函数中等待异步结果",
    precautions: "只能在async函数中使用"
  },
  {
    name: "package",
    category: "保留字",
    description: "保留关键字，暂未在JS中使用",
    usage: "// 不能作为变量名",
    scenarios: "无",
    precautions: "不能用作变量、函数名"
  },
  {
    name: "enum",
    category: "保留字",
    description: "保留关键字，ES6中未实现",
    usage: "// 不能作为变量名",
    scenarios: "无",
    precautions: "不能用作变量、函数名"
  },
  {
    name: "implements",
    category: "保留字",
    description: "保留关键字，暂未在JS中使用",
    usage: "// 不能作为变量名",
    scenarios: "无",
    precautions: "不能用作变量、函数名"
  },
  {
    name: "interface",
    category: "保留字",
    description: "保留关键字，暂未在JS中使用",
    usage: "// 不能作为变量名",
    scenarios: "无",
    precautions: "不能用作变量、函数名"
  },
  {
    name: "private",
    category: "保留字",
    description: "保留关键字，ES2022类中可用作私有字段",
    usage: "class A { #x = 1; }",
    scenarios: "类的私有属性",
    precautions: "只能在类中用#声明"
  },
  {
    name: "protected",
    category: "保留字",
    description: "保留关键字，暂未在JS中使用",
    usage: "// 不能作为变量名",
    scenarios: "无",
    precautions: "不能用作变量、函数名"
  },
  {
    name: "public",
    category: "保留字",
    description: "保留关键字，暂未在JS中使用",
    usage: "// 不能作为变量名",
    scenarios: "无",
    precautions: "不能用作变量、函数名"
  },
  {
    name: "static",
    category: "面向对象",
    description: "声明类的静态方法或属性",
    usage: "class A { static x = 1; }",
    scenarios: "定义不依赖实例的属性或方法",
    precautions: "只能通过类名访问"
  },
  {
    name: "await",
    category: "异步处理",
    description: "等待Promise对象完成并返回结果",
    usage: "const data = await fetchData();",
    scenarios: "在async函数中等待异步结果",
    precautions: "只能在async函数中使用"
  },
  {
    name: "arguments",
    category: "函数",
    description: "函数内部的类数组对象，包含所有传入参数",
    usage: "function sum() { return arguments[0] + arguments[1]; }",
    scenarios: "需要访问不定数量参数时",
    precautions: "箭头函数没有arguments"
  },
  {
    name: "eval",
    category: "其它",
    description: "执行字符串中的JavaScript代码",
    usage: "eval('var a = 1;');",
    scenarios: "需要动态执行代码时",
    precautions: "eval安全性问题；不推荐使用"
  },
  {
    name: "arguments",
    category: "函数",
    description: "函数内部的类数组对象，包含所有传入参数",
    usage: "function sum() { return arguments[0] + arguments[1]; }",
    scenarios: "需要访问不定数量参数时",
    precautions: "箭头函数没有arguments"
  },
  {
    name: "in",
    category: "其它",
    description: "判断属性是否在对象中",
    usage: "'a' in {a:1}; // true",
    scenarios: "判断对象是否有某属性时",
    precautions: "会检查原型链"
  }
]);

// 可用分类
const categories = ref<string[]>([
  "全部",
  "变量声明",
  "函数",
  "控制流",
  "循环",
  "错误处理",
  "异步处理",
  "面向对象",
  "模块化",
  "上下文",
  "生成器"
]);

// 选中的分类
const selectedCategories = ref<string[]>(["全部"]);

// 搜索词
const searchTerm = ref<string>("");

// 切换分类
const toggleCategory = (category: string) => {
  if (category === "全部") {
    selectedCategories.value = ["全部"];
    return;
  }

  const index = selectedCategories.value.indexOf(category);

  if (index > -1) {
    selectedCategories.value.splice(index, 1);
    // 如果移除了所有分类，自动选择"全部"
    if (selectedCategories.value.length === 0) {
      selectedCategories.value.push("全部");
    }
  } else {
    // 移除"全部"如果选择了具体分类
    const allIndex = selectedCategories.value.indexOf("全部");
    if (allIndex > -1) {
      selectedCategories.value.splice(allIndex, 1);
    }
    selectedCategories.value.push(category);
  }
};

// 过滤关键字
const filteredKeywords = computed(() => {
  return keywords.value.filter(keyword => {
    // 分类过滤
    const categoryMatch = selectedCategories.value.includes("全部") ||
                          selectedCategories.value.includes(keyword.category);

    // 搜索过滤
    const searchMatch = !searchTerm.value ||
                        keyword.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                        keyword.description.toLowerCase().includes(searchTerm.value.toLowerCase());

    return categoryMatch && searchMatch;
  });
});
</script>

<style scoped lang="less">
// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2b2d42;
@border-color: #e9ecef;
@success-color: #06d6a0;
@warning-color: #ffd166;
@error-color: #ef476f;
@info-color: #118ab2;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.keywords-reference {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: @light-bg;
  min-height: 100vh;
  color: @text-color;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-top: 20px;

  h1 {
    font-size: 2.5rem;
    color: @secondary-color;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
  }
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center;

  .search-box {
    position: relative;
    flex: 1;
    max-width: 400px;

    .search-input {
      width: 100%;
      padding: 12px 15px 12px 40px;
      border: 1px solid @border-color;
      border-radius: 30px;
      font-size: 1rem;
      transition: all 0.3s;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);

      &:focus {
        outline: none;
        border-color: @primary-color;
        box-shadow: 0 2px 8px rgba(67, 97, 238, 0.2);
      }
    }

    .search-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #777;
    }
  }

  .category-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;

    .category-btn {
      padding: 8px 16px;
      background: white;
      border: 1px solid @border-color;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s;

      &:hover {
        background-color: #f0f0f0;
      }

      &.active {
        background-color: @primary-color;
        color: white;
        border-color: @primary-color;
      }
    }
  }
}

.keywords-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.keyword-card {
  background: @card-bg;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }
}

.keyword-header {
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .keyword-name {
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .keyword-category {
    background: rgba(255,255,255,0.2);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
  }
}

.keyword-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;

  .section {
    h3 {
      font-size: 1.1rem;
      color: @secondary-color;
      margin-bottom: 8px;
      padding-bottom: 5px;
      border-bottom: 1px solid @border-color;
    }

    p {
      line-height: 1.6;
      color: lighten(@text-color, 15%);
      font-size: 0.95rem;
    }
  }

  .code-block {
    background: #f8f9fa;
    border-left: 3px solid @primary-color;
    padding: 12px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    border-radius: 0 4px 4px 0;
    white-space: pre-wrap;
    color: #333;
  }
}

.footer {
  text-align: center;
  padding: 20px;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
  margin-top: auto;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;

    .search-box {
      max-width: 100%;
    }
  }

  .keywords-container {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 2rem;
  }
}
</style>
