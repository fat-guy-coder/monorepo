<template>
  <div class="sql-injection-container">
    <div class="security-header">
      <div class="hacker-icon">👤</div>
      <div class="shield-icon">🛡️</div>
      <h1>SQL注入攻击与防护</h1>
      <p class="subtitle">理解攻击原理并掌握防御策略</p>
    </div>

    <div class="content-section">
      <div class="card danger-card">
        <h2><span class="icon">⚠️</span> 什么是SQL注入？</h2>
        <div class="definition">
          <p><strong>SQL注入(SQL Injection)</strong>是一种常见的Web安全漏洞，攻击者通过在应用程序的输入字段中注入恶意的SQL代码，从而操纵数据库查询，获取敏感数据或执行未授权的数据库操作。
          </p>
          <div class="risk-level">
            风险等级:
            <div class="level high">高危</div>
          </div>
        </div>

        <div class="impact-section">
          <h3>潜在危害</h3>
          <div class="impacts">
            <div class="impact">
              <div class="impact-icon">👁️</div>
              <h4>数据窃取</h4>
              <p>获取敏感用户信息</p>
            </div>
            <div class="impact">
              <div class="impact-icon">✏️</div>
              <h4>数据篡改</h4>
              <p>修改或删除数据库记录</p>
            </div>
            <div class="impact">
              <div class="impact-icon">🛑</div>
              <h4>拒绝服务</h4>
              <p>使数据库服务不可用</p>
            </div>
            <div class="impact">
              <div class="impact-icon">🚪</div>
              <h4>权限提升</h4>
              <p>获取管理员权限</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2><span class="icon">🔍</span> SQL注入原理</h2>
        <div class="injection-process">
          <div class="step">
            <div class="step-number">1</div>
            <h3>恶意输入</h3>
            <p>攻击者在输入字段插入SQL代码</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-number">2</div>
            <h3>动态拼接</h3>
            <p>应用程序拼接SQL语句</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-number">3</div>
            <h3>执行攻击</h3>
            <p>数据库执行恶意SQL</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-number">4</div>
            <h3>获取数据</h3>
            <p>攻击者获取非法访问权限</p>
          </div>
        </div>

        <div class="code-demo">
          <div class="attack-example">
            <h3>攻击示例</h3>
            <div class="code-block">
              <div class="code-line">用户名: <span class="user-input">admin' --</span></div>
              <div class="code-line">密码: <span class="user-input">任意值</span></div>
              <div class="code-line">生成的SQL:</div>
              <div class="code-line sql">SELECT * FROM users WHERE username = 'admin' <span class="comment">--' AND
                  password = '...'</span></div>
              <div class="explanation">注释掉密码验证，直接以管理员身份登录</div>
            </div>
          </div>

          <div class="attack-example">
            <h3>更危险的攻击</h3>
            <div class="code-block">
              <div class="code-line">搜索: <span class="user-input">'; DROP TABLE users; --</span></div>
              <div class="code-line">生成的SQL:</div>
              <div class="code-line sql">SELECT * FROM products WHERE name LIKE '%'; </div>
              <div class="code-line sql dangerous">DROP TABLE users; <span class="comment">-- %'</span></div>
              <div class="explanation">删除整个用户表造成灾难性后果</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2><span class="icon">🛡️</span> 防护措施</h2>
        <div class="defense-methods">
          <div class="method">
            <div class="method-icon">📝</div>
            <h3>参数化查询</h3>
            <p>使用预处理语句(Prepared Statements)</p>
            <div class="effectiveness">最有效</div>
          </div>
          <div class="method">
            <div class="method-icon">🔒</div>
            <h3>输入验证</h3>
            <p>过滤特殊字符和SQL关键字</p>
            <div class="effectiveness">中等</div>
          </div>
          <div class="method">
            <div class="method-icon">👮</div>
            <h3>最小权限</h3>
            <p>限制数据库账户权限</p>
            <div class="effectiveness">中等</div>
          </div>
          <div class="method">
            <div class="method-icon">📋</div>
            <h3>ORM框架</h3>
            <p>使用对象关系映射工具</p>
            <div class="effectiveness">高</div>
          </div>
        </div>

        <div class="code-comparison">
          <div class="vulnerable">
            <h4>不安全代码</h4>
            <pre>// 动态拼接SQL - 高危！
const query = `SELECT * FROM users
               WHERE username = '${username}'
               AND password = '${password}'`;
db.query(query, (err, result) => {
  // 处理结果
});</pre>
            <div class="risk">❌ 存在SQL注入风险</div>
          </div>

          <div class="secure">
            <h4>安全代码（参数化查询）</h4>
            <pre>// 使用参数化查询 - 安全
const query = `SELECT * FROM users
               WHERE username = ?
               AND password = ?`;
db.query(query, [username, password],
  (err, result) => {
    // 处理结果
});</pre>
            <div class="safety">✅ 防止SQL注入</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2><span class="icon">🔧</span> 测试与防护工具</h2>
        <div class="tools-section">
          <div class="testing-tools">
            <h3>测试工具</h3>
            <ul>
              <li>SQLMap - 自动SQL注入测试工具</li>
              <li>Burp Suite - 渗透测试工具套件</li>
              <li>OWASP ZAP - 开源Web应用扫描器</li>
              <li>Acunetix - 自动化Web漏洞扫描工具</li>
            </ul>
          </div>

          <div class="protection-tools">
            <h3>防护工具</h3>
            <ul>
              <li>WAF (Web应用防火墙)</li>
              <li>数据库防火墙</li>
              <li>OWASP ESAPI</li>
              <li>安全编码框架</li>
            </ul>
          </div>
        </div>

        <div class="best-practices">
          <h3>最佳实践</h3>
          <div class="practices">
            <div class="practice">对输入数据进行严格验证</div>
            <div class="practice">使用参数化查询或存储过程</div>
            <div class="practice">数据库账户使用最小权限原则</div>
            <div class="practice">定期进行安全审计和渗透测试</div>
            <div class="practice">错误信息不泄露数据库结构</div>
            <div class="practice">框架内置的安全功能</div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="security-quote">
        "永远不要信任用户输入的数据"
      </div>
      <div class="reference">
        参考: OWASP Top 10 - A01:2021 Injection
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 模拟SQL注入攻击演示
const attackInput = ref("admin' --");
const attackResult = ref("登录成功：管理员账户");
</script>

<style lang="less" scoped>
@danger-color: #e74c3c;
@security-color: #2ecc71;
@warning-color: #f39c12;
@dark-color: #2c3e50;
@light-bg: #f8f9fa;
@card-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

.sql-injection-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @dark-color;
  background: #f0f2f5;
}

.security-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #2c3e50, #1a2530);
  color: white;
  border-radius: 16px;
  position: relative;
  overflow: hidden;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 15px;
    font-weight: 800;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.4rem;
    opacity: 0.85;
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
  }

  .hacker-icon {
    position: absolute;
    top: 20px;
    left: 40px;
    font-size: 4rem;
    opacity: 0.2;
    transform: scaleX(-1);
  }

  .shield-icon {
    position: absolute;
    top: 20px;
    right: 40px;
    font-size: 4rem;
    opacity: 0.2;
  }
}

.content-section {
  display: grid;
  gap: 30px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: @card-shadow;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  h2 {
    color: @dark-color;
    padding-bottom: 15px;
    margin-bottom: 25px;
    font-weight: 700;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 2px solid #f0f0f0;

    .icon {
      font-size: 1.5em;
    }
  }
}

.danger-card {
  border-top: 6px solid @danger-color;
}

.definition {
  background: #fef2f2;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 30px;
  position: relative;
  border-left: 5px solid @danger-color;

  p {
    font-size: 1.15rem;
    line-height: 1.6;
  }

  .risk-level {
    position: absolute;
    top: -15px;
    right: 20px;
    background: white;
    padding: 8px 20px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    font-weight: 600;

    .level {
      padding: 4px 12px;
      border-radius: 20px;
      font-weight: 700;

      &.high {
        background: @danger-color;
        color: white;
      }
    }
  }
}

.impact-section {
  h3 {
    font-size: 1.3rem;
    margin-bottom: 20px;
    color: @dark-color;
    font-weight: 600;
  }

  .impacts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;

    .impact {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      transition: all 0.3s ease;
      border-top: 3px solid @danger-color;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(231, 76, 60, 0.15);
      }

      .impact-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }

      h4 {
        color: @danger-color;
        margin-bottom: 10px;
        font-weight: 700;
      }

      p {
        font-size: 0.95rem;
        color: #6b7280;
      }
    }
  }
}

.injection-process {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 30px 0;

  .step {
    text-align: center;
    flex: 1;
    min-width: 180px;
    margin-bottom: 30px;

    .step-number {
      width: 50px;
      height: 50px;
      background: @danger-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 15px;
      font-weight: 700;
      font-size: 1.5rem;
      box-shadow: 0 4px 8px rgba(231, 76, 60, 0.3);
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: @dark-color;
      font-weight: 700;
    }

    p {
      color: #4b5563;
      font-size: 0.95rem;
      max-width: 180px;
      margin: 0 auto;
    }
  }

  .arrow {
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: @danger-color;
    font-size: 2rem;
    font-weight: bold;
  }
}

.code-demo {
  margin-top: 40px;

  .attack-example {
    margin-bottom: 30px;
    background: #fef2f2;
    padding: 20px;
    border-radius: 12px;

    h3 {
      color: @danger-color;
      margin-bottom: 15px;
      font-weight: 700;
    }

    .code-block {
      background: #2c3e50;
      color: #ecf0f1;
      padding: 20px;
      border-radius: 10px;
      font-family: 'Courier New', monospace;
      line-height: 1.8;

      .code-line {
        margin-bottom: 10px;

        &.sql {
          color: #3498db;
          margin-left: 20px;

          &.dangerous {
            color: @danger-color;
            font-weight: bold;
          }
        }

        .user-input {
          color: @danger-color;
          font-weight: bold;
        }

        .comment {
          color: #95a5a6;
          font-style: italic;
        }
      }

      .explanation {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px dashed #95a5a6;
        color: #e74c3c;
        font-weight: 600;
      }
    }
  }
}

.defense-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
  margin-bottom: 30px;

  .method {
    background: white;
    padding: 25px;
    border-radius: 12px;
    text-align: center;
    border: 2px solid #e5e7eb;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-5px);
      border-color: @security-color;
      box-shadow: 0 8px 20px rgba(46, 204, 113, 0.15);
    }

    .method-icon {
      font-size: 2.5rem;
      margin-bottom: 18px;
      color: @security-color;
    }

    h3 {
      color: @dark-color;
      margin-bottom: 12px;
      font-weight: 700;
    }

    p {
      font-size: 0.95rem;
      color: #6b7280;
      margin-bottom: 15px;
    }

    .effectiveness {
      font-size: 0.9rem;
      font-weight: 700;
      color: @security-color;
      padding: 4px 10px;
      background: rgba(46, 204, 113, 0.1);
      border-radius: 20px;
      display: inline-block;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: @security-color;
    }
  }
}

.code-comparison {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;

  >div {
    flex: 1;
    min-width: 400px;
    padding: 25px;
    border-radius: 12px;
  }

  .vulnerable {
    background: #fef2f2;
    border: 2px solid #fecaca;

    h4 {
      color: @danger-color;
      text-align: center;
      margin-bottom: 15px;
    }

    pre {
      background: #2c3e50;
      color: #ecf0f1;
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      line-height: 1.5;
      font-size: 0.9rem;
    }

    .risk {
      text-align: center;
      font-weight: 700;
      margin-top: 15px;
      padding: 10px;
      border-radius: 5px;
      background: lighten(@danger-color, 40%);
      color: darken(@danger-color, 20%);
    }
  }

  .secure {
    background: #f0fdf4;
    border: 2px solid #bbf7d0;

    h4 {
      color: @security-color;
      text-align: center;
      margin-bottom: 15px;
    }

    pre {
      background: #2c3e50;
      color: #ecf0f1;
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      line-height: 1.5;
      font-size: 0.9rem;
    }

    .safety {
      text-align: center;
      font-weight: 700;
      margin-top: 15px;
      padding: 10px;
      border-radius: 5px;
      background: lighten(@security-color, 50%);
      color: darken(@security-color, 20%);
    }
  }
}

.tools-section {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  flex-wrap: wrap;

  .testing-tools,
  .protection-tools {
    flex: 1;
    min-width: 300px;
    background: #f8f9fa;
    padding: 25px;
    border-radius: 12px;

    h3 {
      color: @dark-color;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e5e7eb;
      font-weight: 700;
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 12px;
        padding-left: 10px;
        position: relative;
        font-weight: 500;

        &::before {
          content: "•";
          position: absolute;
          left: -15px;
          color: @security-color;
          font-weight: 800;
        }
      }
    }
  }

  .testing-tools {
    border-top: 4px solid @warning-color;
  }

  .protection-tools {
    border-top: 4px solid @security-color;
  }
}

.best-practices {
  h3 {
    font-size: 1.3rem;
    margin-bottom: 20px;
    color: @dark-color;
    font-weight: 600;
  }

  .practices {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 15px;

    .practice {
      background: #e8f4fc;
      padding: 15px 20px;
      border-radius: 8px;
      font-weight: 500;
      position: relative;
      padding-left: 45px;

      &::before {
        content: "✓";
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 28px;
        height: 28px;
        background: @security-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
      }
    }
  }
}

.footer {
  margin-top: 50px;
  padding: 30px;
  background: linear-gradient(to right, #2c3e50, #1a2530);
  color: white;
  text-align: center;
  border-radius: 16px;

  .security-quote {
    font-size: 1.5rem;
    font-weight: 600;
    font-style: italic;
    margin-bottom: 15px;
    color: @security-color;
  }

  .reference {
    font-size: 0.95rem;
    opacity: 0.8;
  }
}
</style>