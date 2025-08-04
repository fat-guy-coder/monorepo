<template>
  <div class="code-style-container">
    <header class="header">
      <h1>JavaScript 代码规范指南</h1>
      <p class="subtitle">编写可维护、一致且高效的 JavaScript 代码</p>
    </header>

    <div class="navigation">
      <div class="nav-cards">
        <div class="nav-card" @click="scrollToSection('naming')">
          <div class="nav-icon">🔤</div>
          <div class="nav-title">命名规范</div>
        </div>
        <div class="nav-card" @click="scrollToSection('formatting')">
          <div class="nav-icon">📐</div>
          <div class="nav-title">格式化</div>
        </div>
        <div class="nav-card" @click="scrollToSection('functions')">
          <div class="nav-icon">🧩</div>
          <div class="nav-title">函数规范</div>
        </div>
        <div class="nav-card" @click="scrollToSection('es6')">
          <div class="nav-icon">🚀</div>
          <div class="nav-title">ES6+ 特性</div>
        </div>
        <div class="nav-card" @click="scrollToSection('error')">
          <div class="nav-icon">⚠️</div>
          <div class="nav-title">错误处理</div>
        </div>
        <div class="nav-card" @click="scrollToSection('comments')">
          <div class="nav-icon">💬</div>
          <div class="nav-title">注释规范</div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div id="naming" class="section">
        <h2 class="section-title">
          <span class="icon-badge">🔤</span>
          命名规范
        </h2>

        <div class="rule-cards">
          <div class="rule-card">
            <h3>变量和函数命名</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>let a = 5; // 无意义
const temp = getData(); // 不明确
function proc() { ... } // 缩写不清晰</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>let itemCount = 5; // 明确用途
const userData = fetchUser(); // 清晰表达内容
function processOrder() { ... } // 完整表达功能</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 有意义的命名提高代码可读性，减少注释需求，使代码自文档化。</p>
            </div>
          </div>

          <div class="rule-card">
            <h3>布尔值命名</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>let open = false;
let check = true;</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>let isModalOpen = false;
let shouldValidate = true;</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 使用 <code>is</code>、<code>has</code>、<code>can</code>、<code>should</code>
                等前缀明确表示布尔值，提高代码可读性。</p>
            </div>
          </div>

          <div class="rule-card">
            <h3>常量的命名</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>const maxcount = 100;
const apikey = 'ABC123';</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>const MAX_ITEMS = 100;
const API_KEY = 'ABC123';</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 全大写和下划线命名法明确标识常量，便于与变量区分，增强代码可维护性。</p>
            </div>
          </div>
        </div>
      </div>

      <div id="formatting" class="section">
        <h2 class="section-title">
          <span class="icon-badge">📐</span>
          格式化规范
        </h2>

        <div class="rule-cards">
          <div class="rule-card">
            <h3>缩进与空格</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>function calculate(a,b){
return a+b;
}

if(condition){
doSomething();
}</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>function calculate(a, b) {
  return a + b;
}

if (condition) {
  doSomething();
}</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 一致的缩进（通常2或4空格）和空格使用提高代码可读性，减少语法错误，使代码结构清晰。</p>
            </div>
          </div>

          <div class="rule-card">
            <h3>大括号使用</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>if (condition) doSomething();

for (let i = 0; i < 10; i++)
  console.log(i);</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>if (condition) {
  doSomething();
}

for (let i = 0; i < 10; i++) {
  console.log(i);
}</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 始终使用大括号可以避免因添加新行导致的错误，提高代码一致性，使代码修改更安全。</p>
            </div>
          </div>

          <div class="rule-card">
            <h3>行长度与换行</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>const result = someVeryLongFunctionName(withManyParameters, thatMakeTheLineTooLong, andHardToRead, forOtherDevelopers);</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>const result = someVeryLongFunctionName(
  withManyParameters,
  thatMakeTheLineTooLong,
  andHardToRead,
  forOtherDevelopers
);</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 保持行长度在80-120字符内提高代码可读性，便于并排查看文件，改善代码审查体验。</p>
            </div>
          </div>
        </div>
      </div>

      <div id="functions" class="section">
        <h2 class="section-title">
          <span class="icon-badge">🧩</span>
          函数规范
        </h2>

        <div class="rule-cards">
          <div class="rule-card">
            <h3>函数长度与职责</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>function processUserData(user) {
  // 验证用户数据
  if (!user.name || !user.email) {
    throw new Error('Invalid user data');
  }

  // 保存到数据库
  db.save(user);

  // 发送欢迎邮件
  const emailContent = `Welcome ${user.name}!`;
  sendEmail(user.email, emailContent);

  // 记录日志
  logger.log(`New user: ${user.name}`);
}</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>function processUserData(user) {
  validateUserData(user);
  saveUserToDB(user);
  sendWelcomeEmail(user);
  logNewUser(user);
}

function validateUserData(user) { ... }
function saveUserToDB(user) { ... }
function sendWelcomeEmail(user) { ... }
function logNewUser(user) { ... }</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 短函数（通常不超过20行）更易理解、测试和维护，遵循单一职责原则提高代码质量。</p>
            </div>
          </div>

          <div class="rule-card">
            <h3>函数参数数量</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>function createUser(name, email, age, country, phone, newsletter, preferences) {
  // ...
}</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>function createUser(userData) {
  const { name, email, age, country, phone, newsletter, preferences } = userData;
  // ...
}

// 或使用配置对象
function createUser({ name, email, age, country, phone, newsletter, preferences }) {
  // ...
}</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 参数过多（超过3个）使函数难以调用和理解，使用对象参数提高灵活性并支持可选参数。</p>
            </div>
          </div>

          <div class="rule-card">
            <h3>避免函数副作用</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>let total = 0;

function addToTotal(amount) {
  total += amount; // 修改外部状态
  return total;
}</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>function calculateTotal(currentTotal, amount) {
  return currentTotal + amount; // 纯函数
}</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 纯函数（不修改外部状态，相同输入总是相同输出）更易测试、调试和推理，减少意外行为。</p>
            </div>
          </div>
        </div>
      </div>

      <div id="es6" class="section">
        <h2 class="section-title">
          <span class="icon-badge">🚀</span>
          ES6+ 特性规范
        </h2>

        <div class="rule-cards">
          <div class="rule-card">
            <h3>变量声明</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>var count = 0;
var name = "John";
var isActive = true;</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>const MAX_USERS = 100; // 常量
let count = 0; // 会改变的变量
const name = "John"; // 不会改变的变量
const isActive = true;</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 使用 <code>const</code> 和 <code>let</code> 替代 <code>var</code>
                提供块级作用域，避免变量提升问题，使变量作用域更清晰。</p>
            </div>
          </div>

          <div class="rule-card">
            <h3>箭头函数</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>const self = this;
[1, 2, 3].map(function (num) {
  return num * self.multiplier;
});</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>[1, 2, 3].map(num => num * this.multiplier);</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 箭头函数提供更简洁的语法，自动绑定 <code>this</code> 上下文，特别适合回调函数和函数式编程。</p>
            </div>
          </div>

          <div class="rule-card">
            <h3>模板字符串</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>const message = 'Hello ' + name + ', your order #' + orderId + ' is ready.';</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>const message = `Hello ${name}, your order #${orderId} is ready.`;</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 模板字符串简化字符串拼接，支持多行字符串，提高代码可读性和可维护性。</p>
            </div>
          </div>

          <div class="rule-card">
            <h3>解构赋值</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>const firstName = user.firstName;
const lastName = user.lastName;
const email = user.email;

function printUser(user) {
  console.log(user.firstName, user.lastName);
}</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>const { firstName, lastName, email } = user;

function printUser({ firstName, lastName }) {
  console.log(firstName, lastName);
}</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 解构赋值简化从对象或数组中提取数据的过程，减少重复代码，提高代码清晰度。</p>
            </div>
          </div>
        </div>
      </div>

      <div id="error" class="section">
        <h2 class="section-title">
          <span class="icon-badge">⚠️</span>
          错误处理规范
        </h2>

        <div class="rule-cards">
          <div class="rule-card">
            <h3>错误处理</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>try {
  const data = JSON.parse(jsonString);
} catch (e) {
  // 空的catch块
}</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>try {
  const data = JSON.parse(jsonString);
} catch (error) {
  console.error('Failed to parse JSON:', error);
  // 或使用自定义错误
  throw new AppError('INVALID_JSON', 'Invalid JSON string');
}</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 正确处理错误可防止应用崩溃，提供有意义的反馈，有助于调试和监控系统健康状态。</p>
            </div>
          </div>

          <div class="rule-card">
            <h3>自定义错误</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>throw 'File not found';</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>class FileNotFoundError extends Error {
  constructor(filePath) {
    super(`File not found: ${filePath}`);
    this.name = 'FileNotFoundError';
    this.filePath = filePath;
  }
}

throw new FileNotFoundError('/path/to/file.txt');</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 自定义错误提供更多上下文信息，便于区分错误类型，支持结构化错误处理。</p>
            </div>
          </div>

          <div class="rule-card">
            <h3>Promise错误处理</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>fetchData()
  .then(data => {
    process(data);
  }); // 缺少catch</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>fetchData()
  .then(data => process(data))
  .catch(error => handleError(error));

// 或使用async/await
async function loadData() {
  try {
    const data = await fetchData();
    process(data);
  } catch (error) {
    handleError(error);
  }
}</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 正确处理Promise拒绝防止未捕获的Promise错误，确保异步操作的健壮性。</p>
            </div>
          </div>
        </div>
      </div>

      <div id="comments" class="section">
        <h2 class="section-title">
          <span class="icon-badge">💬</span>
          注释规范
        </h2>

        <div class="rule-cards">
          <div class="rule-card">
            <h3>注释使用</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>// 增加计数
count = count + 1; // 明显代码注释

/*
 * 这个函数用来处理数据
 */
function processData() { ... } // 无信息量注释</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>/**
 * 计算订单折扣后的价格
 * @param {number} basePrice - 订单基础价格
 * @param {number} discountRate - 折扣率 (0-1)
 * @returns {number} 折扣后的价格
 */
function calculateDiscountedPrice(basePrice, discountRate) {
  return basePrice * (1 - discountRate);
}

// 特殊处理历史遗留数据（2020年前）
if (user.joinYear < 2020) {
  applyLegacyDiscount();
}</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 有意义的注释解释"为什么"而不是"什么"，提供上下文、意图和复杂逻辑的解释，帮助团队理解代码。</p>
            </div>
          </div>

          <div class="rule-card">
            <h3>文档注释</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>// 获取用户
function getUser(id) { ... }</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>/**
 * 通过ID获取用户信息
 * @param {string} id - 用户唯一ID
 * @returns {Promise&lt;User&gt;} 用户对象
 * @throws {NotFoundError} 当用户不存在时
 */
async function getUser(id) { ... }</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> JSDoc格式注释提供API文档，支持IDE自动补全和类型检查，便于生成正式文档。</p>
            </div>
          </div>

          <div class="rule-card">
            <h3>TODO注释</h3>
            <div class="comparison">
              <div class="bad-example">
                <h4>❌ 避免</h4>
                <pre><code>// 这里需要优化（无详细信息）</code></pre>
              </div>
              <div class="good-example">
                <h4>✅ 推荐</h4>
                <pre><code>// TODO: 2023-06-30 - 添加缓存机制提升性能（@john）</code></pre>
              </div>
            </div>
            <div class="explanation">
              <p><strong>为什么重要：</strong> 规范的TODO注释包含日期、责任人和具体任务，便于跟踪技术债务，避免模糊的待办事项。</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="best-practices">
      <h2 class="section-title">
        <span class="icon-badge">🏆</span>
        最佳实践总结
      </h2>

      <div class="practices-grid">
        <div class="practice-card">
          <h3>一致性优先</h3>
          <p>在整个项目中保持一致的代码风格，即使与个人偏好不同</p>
        </div>

        <div class="practice-card">
          <h3>可读性至上</h3>
          <p>编写代码时优先考虑他人阅读体验，而非仅考虑执行效率</p>
        </div>

        <div class="practice-card">
          <h3>DRY原则</h3>
          <p>避免重复代码（Don't Repeat Yourself）</p>
        </div>

        <div class="practice-card">
          <h3>渐进增强</h3>
          <p>从简单实现开始，逐步添加优化和复杂性</p>
        </div>

        <div class="practice-card">
          <h3>工具辅助</h3>
          <p>使用ESLint、Prettier等工具自动执行代码规范</p>
        </div>

        <div class="practice-card">
          <h3>持续重构</h3>
          <p>定期重构代码，保持代码整洁和可维护性</p>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>良好的代码规范是团队协作的基石，遵循规范可以显著提高代码质量和开发效率</p>
      <div class="tools">
        <h3>推荐工具：</h3>
        <ul>
          <li>ESLint - JavaScript 代码检查工具</li>
          <li>Prettier - 代码格式化工具</li>
          <li>JSDoc - JavaScript 文档生成工具</li>
          <li>Husky - Git 钩子工具</li>
          <li>lint-staged - 只检查暂存区文件</li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 滚动到指定区域
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped lang="less">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 颜色变量
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #2ecc71;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e1e4e8;
@text-color: #333333;
@light-text: #6c757d;
@code-bg: #f5f7fa;
@bad-bg: #ffebee;
@good-bg: #e8f5e9;
@bad-color: #c62828;
@good-color: #2e7d32;

// 基础样式
.code-style-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: @text-color;
  background-color: @light-bg;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: @secondary-color;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @light-text;
    font-weight: 400;
  }
}

.navigation {
  margin-bottom: 2.5rem;
}

.nav-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.nav-card {
  background: @card-bg;
  border-radius: 10px;
  padding: 1.5rem 1rem;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background: lighten(@primary-color, 45%);
  }
}

.nav-icon {
  font-size: 2rem;
  margin-bottom: 0.8rem;
}

.nav-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: @secondary-color;
}

.content-section {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.section {
  padding: 2.5rem;
  border-bottom: 1px solid @border-color;

  &:last-child {
    border-bottom: none;
  }
}

.section-title {
  font-size: 1.8rem;
  color: @secondary-color;
  margin-top: 0;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid @border-color;
  display: flex;
  align-items: center;

  .icon-badge {
    background: lighten(@primary-color, 40%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    font-size: 1.3rem;
  }
}

.rule-cards {
  display: grid;
  gap: 2rem;
}

.rule-card {
  h3 {
    font-size: 1.4rem;
    color: darken(@primary-color, 10%);
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.7rem;
      width: 0.8rem;
      height: 0.8rem;
      background: @primary-color;
      border-radius: 50%;
    }
  }
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.bad-example,
.good-example {
  border-radius: 8px;
  overflow: hidden;

  h4 {
    margin: 0;
    padding: 0.8rem 1rem;
    font-size: 1.1rem;
  }
}

.bad-example {
  border: 1px solid lighten(@bad-color, 30%);

  h4 {
    background: lighten(@bad-color, 45%);
    color: darken(@bad-color, 10%);
  }

  pre {
    background: lighten(@bad-color, 48%);
  }
}

.good-example {
  border: 1px solid lighten(@good-color, 30%);

  h4 {
    background: lighten(@good-color, 45%);
    color: darken(@good-color, 10%);
  }

  pre {
    background: lighten(@good-color, 48%);
  }
}

pre {
  margin: 0;
  padding: 1.2rem;
  font-size: 0.95rem;
  line-height: 1.5;
  overflow-x: auto;

  code {
    font-family: 'Fira Code', 'Consolas', monospace;
  }
}

.explanation {
  background: lighten(@primary-color, 45%);
  border-radius: 8px;
  padding: 1.2rem;
  font-size: 1.1rem;
  line-height: 1.7;

  p {
    margin: 0;
  }
}

.best-practices {
  background: @card-bg;
  border-radius: 12px;
  padding: 2.5rem;
  margin-top: 2.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  background: lighten(@accent-color, 50%);
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid @accent-color;

  h3 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: darken(@accent-color, 15%);
  }

  p {
    margin: 0;
    font-size: 1.1rem;
  }
}

.footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid @border-color;
  color: @light-text;

  .tools {
    max-width: 600px;
    margin: 2rem auto 0;
    text-align: left;
    background: @light-bg;
    border-radius: 8px;
    padding: 1.5rem;

    h3 {
      margin-top: 0;
      color: @secondary-color;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .code-style-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .section {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
