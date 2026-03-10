<template>
  <div class="hash-algorithms">
    <h1>哈希算法原理与应用</h1>

    <!-- 概览 -->
    <div class="overview">
      <div class="overview-card">
        <div class="overview-icon">🔐</div>
        <div>
          <h2>什么是哈希算法？</h2>
          <p>将任意长度数据映射为固定长度摘要的单向函数</p>
        </div>
      </div>
      <div class="overview-card">
        <div class="overview-icon">🔄</div>
        <div>
          <h2>核心特性</h2>
          <p>确定性、高效性、单向性、抗碰撞性</p>
        </div>
      </div>
      <div class="overview-card">
        <div class="overview-icon">⚖️</div>
        <div>
          <h2>主要应用</h2>
          <p>数据完整性验证、密码存储、数字签名</p>
        </div>
      </div>
    </div>

    <!-- 算法比较 -->
    <div class="section">
      <h2>常见哈希算法比较</h2>
      <div class="algorithm-table">
        <div class="row header">
          <div>算法</div>
          <div>摘要长度</div>
          <div>安全性</div>
          <div>碰撞风险</div>
          <div>主要应用</div>
        </div>
        <div class="row" v-for="algo in algorithms" :key="algo.name">
          <div class="algo-name">{{ algo.name }}</div>
          <div>{{ algo.length }} 位</div>
          <div class="security">
            <div class="security-bar" :style="{ width: algo.security + '%' }"></div>
            <span>{{ algo.securityText }}</span>
          </div>
          <div
            :class="{ 'risk-high': algo.risk > 70, 'risk-medium': algo.risk > 40 && algo.risk <= 70, 'risk-low': algo.risk <= 40 }">
            {{ algo.risk }}%
          </div>
          <div>{{ algo.applications }}</div>
        </div>
      </div>
    </div>

    <!-- 算法基本介绍 -->
    <div class="section">
      <h2>哈希算法基本介绍</h2>
      <div class="algorithm-cards">
        <div class="algo-card" v-for="(algo, index) in algorithmDetails" :key="index">
          <h3>{{ algo.name }}</h3>
          <div class="algo-meta">
            <span>输出长度: {{ algo.length }}位</span>
            <span>开发时间: {{ algo.year }}</span>
          </div>
          <div class="algo-description">
            {{ algo.description }}
          </div>
          <div class="algo-example">
            <div class="input">输入: "hello"</div>
            <div class="output">输出: {{ algo.example }}</div>
          </div>
          <div class="algo-security" v-if="algo.vulnerability">
            <div class="warning">⚠️ {{ algo.vulnerability }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加盐概念 -->
    <div class="section">
      <h2>加盐(Salting)技术</h2>
      <div class="salt-explanation">
        <div class="salt-concept">
          <h3>为什么需要加盐？</h3>
          <p>防止彩虹表攻击和相同密码产生相同哈希值的问题</p>
          <div class="salt-visual">
            <div class="without-salt">
              <h4>不加盐</h4>
              <div class="process">
                <div>密码 → 哈希函数 → 哈希值</div>
                <div class="problem">相同密码 → 相同哈希值</div>
              </div>
            </div>
            <div class="with-salt">
              <h4>加盐</h4>
              <div class="process">
                <div>密码 + 唯一盐值 → 哈希函数 → 唯一哈希值</div>
                <div class="benefit">相同密码 → 不同哈希值</div>
              </div>
            </div>
          </div>
        </div>

        <div class="salt-implementation">
          <h3>加盐实现方法</h3>
          <div class="implementation-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>生成盐值</h4>
                <p>使用加密安全随机数生成器创建唯一盐值（每个用户不同）</p>
                <pre class="code-block">const salt = crypto.randomBytes(16).toString('hex');</pre>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>组合密码与盐值</h4>
                <p>将盐值与密码组合后进行哈希</p>
                <pre class="code-block">const saltedPassword = salt + password;</pre>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>存储盐值和哈希</h4>
                <p>将盐值和哈希结果一起存储在数据库中</p>
                <pre class="code-block">// 数据库记录
{
  username: "user1",
  salt: "a1b2c3d4e5f6...",
  hash: "5f4dcc3b5aa765d61d8327deb882cf99..."
}</pre>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>验证过程</h4>
                <p>验证时使用存储的盐值与输入密码组合后哈希</p>
                <pre class="code-block">const inputHash = sha256(salt + inputPassword);
if (inputHash === storedHash) {
  // 密码正确
}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 安全实践 -->
    <div class="section">
      <h2>密码存储安全实践</h2>
      <div class="security-practices">
        <div class="practice-card" v-for="(practice, index) in securityPractices" :key="index">
          <div class="practice-icon">{{ practice.icon }}</div>
          <h3>{{ practice.title }}</h3>
          <p>{{ practice.description }}</p>
        </div>
      </div>

      <div class="password-hashing">
        <h3>密码哈希演进</h3>
        <div class="hashing-evolution">
          <div class="method" v-for="(method, index) in hashingMethods" :key="index">
            <div class="method-name">{{ method.name }}</div>
            <div class="method-security" :style="{ width: method.security + '%' }">
              <span>{{ method.securityLabel }}</span>
            </div>
            <div class="method-description">{{ method.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 示例代码 -->
    <div class="section">
      <h2>哈希与加盐示例代码</h2>
      <div class="code-examples">
        <div class="code-example">
          <h3>Node.js 中使用 SHA-256 加盐</h3>
          <pre class="code-block">const crypto = require('crypto');

// 生成盐值
function generateSalt(length = 16) {
  return crypto.randomBytes(length).toString('hex');
}

// 创建加盐哈希
function createHash(password, salt) {
  const hash = crypto.createHash('sha256');
  hash.update(salt + password);
  return hash.digest('hex');
}

// 使用示例
const password = 'userPassword123';
const salt = generateSalt();
const hashedPassword = createHash(password, salt);

console.log('盐值:', salt);
console.log('哈希值:', hashedPassword);</pre>
        </div>

        <div class="code-example">
          <h3>前端使用 bcrypt.js 进行密码哈希</h3>
          <pre class="code-block">import bcrypt from 'bcryptjs';

// 生成盐并哈希密码
async function hashPassword(password) {
  const saltRounds = 10; // 成本因子
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

// 验证密码
async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// 使用示例
const userPassword = 'securePass!';
const storedHash = '$2a$10$N9qo8uLOickgx2ZMRZoMye3...';

hashPassword(userPassword).then(hash => {
  console.log('Hashed password:', hash);
});

verifyPassword(userPassword, storedHash).then(isValid => {
  console.log('Password valid:', isValid);
});</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 哈希算法比较数据
const algorithms = ref([
  {
    name: "MD5",
    length: 128,
    security: 20,
    securityText: "不安全",
    risk: 95,
    applications: "文件校验, 非安全场景"
  },
  {
    name: "SHA-1",
    length: 160,
    security: 30,
    securityText: "不安全",
    risk: 85,
    applications: "旧版TLS/SSL, Git"
  },
  {
    name: "SHA-224",
    length: 224,
    security: 70,
    securityText: "基本安全",
    risk: 35,
    applications: "特定安全协议"
  },
  {
    name: "SHA-256",
    length: 256,
    security: 90,
    securityText: "安全",
    risk: 15,
    applications: "区块链, TLS/SSL, 密码存储"
  },
  {
    name: "SHA-384",
    length: 384,
    security: 95,
    securityText: "高安全",
    risk: 5,
    applications: "高安全系统, 数字证书"
  },
  {
    name: "SHA-512",
    length: 512,
    security: 98,
    securityText: "极高安全",
    risk: 2,
    applications: "军事级加密, 敏感数据"
  }
]);

// 算法详细信息
const algorithmDetails = ref([
  {
    name: "MD5 (Message Digest 5)",
    length: 128,
    year: 1991,
    description: "曾广泛使用的哈希算法，已发现大量碰撞漏洞。处理512位分组，产生128位摘要。不再适用于安全场景。",
    example: "5d41402abc4b2a76b9719d911017c592",
    vulnerability: "已证实可生成碰撞，Google在2017年展示了SHA-1碰撞攻击"
  },
  {
    name: "SHA-1 (Secure Hash Algorithm 1)",
    length: 160,
    year: 1995,
    description: "设计用于替代MD5，但已被证明存在弱点。处理512位分组，产生160位摘要。已不再推荐用于安全目的。",
    example: "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d",
    vulnerability: "2017年Google成功实施碰撞攻击（SHAttered）"
  },
  {
    name: "SHA-256",
    length: 256,
    year: 2001,
    description: "SHA-2系列成员，使用Merkle-Damgård结构。处理512位分组，产生256位摘要。目前广泛用于安全应用。",
    example: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    vulnerability: "目前未发现有效碰撞攻击"
  },
  {
    name: "SHA-512",
    length: 512,
    year: 2001,
    description: "SHA-2系列最长摘要版本，处理1024位分组，产生512位摘要。提供极高安全性，但计算资源消耗更大。",
    example: "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043",
    vulnerability: "目前未发现有效攻击方法"
  }
]);

// 安全实践
const securityPractices = ref([
  {
    icon: "🔑",
    title: "使用强哈希算法",
    description: "选择SHA-256或更高版本，避免MD5和SHA-1"
  },
  {
    icon: "🧂",
    title: "始终加盐",
    description: "每个用户使用唯一盐值，长度至少16字节"
  },
  {
    icon: "⏱️",
    title: "增加计算成本",
    description: "使用bcrypt、PBKDF2或Argon2增加哈希计算时间"
  },
  {
    icon: "🛡️",
    title: "定期更新算法",
    description: "随着计算能力提升，及时迁移到更安全的算法"
  }
]);

// 密码哈希方法演进
const hashingMethods = ref([
  {
    name: "纯哈希",
    security: 30,
    securityLabel: "不安全",
    description: "直接存储哈希值（如MD5、SHA-1），易受彩虹表攻击"
  },
  {
    name: "加盐哈希",
    security: 60,
    securityLabel: "基本安全",
    description: "为每个密码添加唯一盐值后再哈希，防御彩虹表攻击"
  },
  {
    name: "自适应哈希",
    security: 90,
    securityLabel: "安全",
    description: "bcrypt/PBKDF2/Scrypt，可调节计算成本，增加暴力破解难度"
  },
  {
    name: "内存硬函数",
    security: 95,
    securityLabel: "高安全",
    description: "Argon2/Scrypt，同时消耗大量内存和CPU，防御ASIC攻击"
  }
]);
</script>

<style lang="less" scoped>
.hash-algorithms {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);

  h1 {
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #3498db;
    color: #2c3e50;
  }

  h2 {
    font-size: 1.7rem;
    padding-left: 10px;
    border-left: 4px solid #3498db;
    color: #2c3e50;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.3rem;
    color: #2980b9;
    margin-top: 0;
    margin-bottom: 15px;
  }

  .overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;

    .overview-card {
      display: flex;
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
      align-items: center;

      .overview-icon {
        font-size: 2.5rem;
        margin-right: 20px;
      }

      p {
        margin: 10px 0 0;
        color: #555;
        line-height: 1.5;
      }
    }
  }

  .section {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  }

  // 算法比较表
  .algorithm-table {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1px;
    background: #ddd;
    border-radius: 6px;
    overflow: hidden;

    .row {
      display: contents;

      >div {
        padding: 12px 15px;
        background: white;
        display: flex;
        align-items: center;
      }

      &.header>div {
        background: #2c3e50;
        color: white;
        font-weight: bold;
        justify-content: center;
      }
    }

    .algo-name {
      font-weight: bold;
      color: #2980b9;
    }

    .security {
      display: flex;
      align-items: center;

      .security-bar {
        height: 10px;
        background: linear-gradient(to right, #2ecc71, #f1c40f);
        border-radius: 5px;
        margin-right: 10px;
      }
    }

    .risk-high {
      color: #e74c3c;
      font-weight: bold;
    }

    .risk-medium {
      color: #f39c12;
      font-weight: bold;
    }

    .risk-low {
      color: #2ecc71;
      font-weight: bold;
    }
  }

  // 算法卡片
  .algorithm-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 20px;

    .algo-card {
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #f8f9fa;

      h3 {
        margin-top: 0;
        color: #2c3e50;
      }

      .algo-meta {
        display: flex;
        gap: 15px;
        margin-bottom: 10px;
        font-size: 0.9rem;
        color: #7f8c8d;
      }

      .algo-description {
        line-height: 1.6;
        margin-bottom: 15px;
      }

      .algo-example {
        background: white;
        padding: 12px;
        border-radius: 6px;
        border: 1px solid #e0e0e0;
        font-family: monospace;
        font-size: 0.9rem;
        margin-bottom: 15px;

        .input {
          color: #3498db;
        }

        .output {
          color: #e74c3c;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .algo-security {
        .warning {
          background: #ffebee;
          color: #c62828;
          padding: 10px;
          border-radius: 6px;
          border-left: 4px solid #e74c3c;
          font-weight: bold;
        }
      }
    }
  }

  // 加盐技术
  .salt-explanation {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 30px;

    .salt-concept,
    .salt-implementation {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      border: 1px solid #e0e0e0;
    }

    .salt-visual {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 15px;

      .without-salt,
      .with-salt {
        padding: 15px;
        border-radius: 8px;

        h4 {
          margin-top: 0;
          margin-bottom: 10px;
          color: #2c3e50;
        }
      }

      .without-salt {
        background: #ffebee;
        border: 1px solid #ffcdd2;

        .problem {
          color: #e74c3c;
          font-weight: bold;
          margin-top: 10px;
        }
      }

      .with-salt {
        background: #e8f5e9;
        border: 1px solid #c8e6c9;

        .benefit {
          color: #2ecc71;
          font-weight: bold;
          margin-top: 10px;
        }
      }

      .process {
        font-family: monospace;
        background: white;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid #e0e0e0;
      }
    }

    .implementation-steps {
      .step {
        display: flex;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px dashed #ddd;

        &:last-child {
          border-bottom: none;
        }

        .step-number {
          min-width: 40px;
          height: 40px;
          background: #3498db;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
          margin-right: 15px;
        }
      }
    }
  }

  // 安全实践
  .security-practices {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;

    .practice-card {
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #f8f9fa;
      text-align: center;

      .practice-icon {
        font-size: 2rem;
        margin-bottom: 15px;
      }

      p {
        color: #555;
        line-height: 1.5;
        margin: 10px 0 0;
      }
    }
  }

  .hashing-evolution {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;

    .method {
      padding: 15px;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      .method-name {
        font-weight: bold;
        margin-bottom: 5px;
        color: #2c3e50;
      }

      .method-security {
        height: 20px;
        background: linear-gradient(to right, #e74c3c, #f39c12, #2ecc71);
        border-radius: 10px;
        margin-bottom: 10px;
        position: relative;

        span {
          position: absolute;
          right: 10px;
          top: 0;
          color: white;
          font-weight: bold;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }
      }
    }
  }

  // 代码块样式
  .code-block {
    background: #2c3e50;
    color: #f1f2f6;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 15px 0;
    tab-size: 2;
  }

  // 示例代码区
  .code-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 20px;

    .code-example {
      margin-bottom: 20px;
    }
  }

  @media (max-width: 768px) {
    padding: 10px;

    h1 {
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    .overview,
    .security-practices {
      grid-template-columns: 1fr;
    }

    .algorithm-table {
      grid-template-columns: 1fr;
      overflow: auto;

      .row {
        display: grid;
        grid-template-columns: repeat(5, 1fr);

        &.header {
          position: sticky;
          top: 0;
        }

        >div {
          padding: 8px 10px;
        }
      }
    }

    .algorithm-cards,
    .salt-explanation,
    .code-examples {
      grid-template-columns: 1fr;
    }

    .code-block {
      font-size: 0.8rem;
    }
  }
}
</style>
