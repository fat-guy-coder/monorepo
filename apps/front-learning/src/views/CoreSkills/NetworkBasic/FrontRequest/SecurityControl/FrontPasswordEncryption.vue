<template>
  <div class="password-encryption-container">
    <!-- 头部区域 -->
    <header>
      <div class="header-content">
        <h1><i class="fas fa-lock"></i> 前端密码加密技术介绍</h1>
        <p class="subtitle">保护用户数据安全的关键技术与最佳实践</p>
      </div>
      <div class="security-levels">
        <div class="level" v-for="level in securityLevels" :key="level.level">
          <div class="level-icon" :class="`level-${level.level}`">
            <i :class="level.icon"></i>
          </div>
          <div class="level-info">
            <h3>{{ level.title }}</h3>
            <p>{{ level.description }}</p>
          </div>
        </div>
      </div>
    </header>

    <!-- 加密方案对比 -->
    <div class="encryption-methods">
      <h2><i class="fas fa-shield-alt"></i> 前端加密方案对比</h2>

      <div class="methods-grid">
        <div
          v-for="method in encryptionMethods"
          :key="method.name"
          class="method-card"
          :class="{ active: activeMethod === method.name }"
          @click="activeMethod = method.name"
        >
          <div class="method-header">
            <div class="method-icon">
              <i :class="method.icon"></i>
            </div>
            <h3>{{ method.name }}</h3>
            <div class="method-tag">{{ method.tag }}</div>
          </div>
          <div class="method-stats">
            <div class="stat">
              <div class="stat-label">安全性</div>
              <div class="stat-rating">
                <i
                  v-for="star in 5"
                  :key="star"
                  class="fas fa-star"
                  :class="{ filled: star <= method.security }"
                  >★</i
                >
              </div>
            </div>
            <div class="stat">
              <div class="stat-label">实现难度</div>
              <div class="stat-rating">
                <i
                  v-for="star in 5"
                  :key="star"
                  class="fas fa-star"
                  :class="{ filled: star <= method.difficulty }"
                  >★</i
                >
              </div>
            </div>
            <div class="stat">
              <div class="stat-label">浏览器支持</div>
              <div class="stat-value">{{ method.support }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加密方案详情 -->
    <div class="method-details" v-if="activeMethod">
      <div class="method-info">
        <h2>
          <i :class="activeMethodData.icon"></i>
          {{ activeMethodData.name }} 加密方案
        </h2>
        <div class="method-description">
          {{ activeMethodData.description }}
        </div>
      </div>

      <div class="content-grid">
        <!-- 实现原理 -->
        <div class="card principle">
          <div class="card-header">
            <i class="fas fa-cogs"></i>
            <h3>实现原理</h3>
          </div>
          <div class="card-body">
            <div class="principle-diagram">
              <div class="step">
                <div class="step-icon">
                  <i class="fas fa-keyboard">1</i>
                </div>
                <div class="step-label">用户输入密码</div>
              </div>
              <div class="arrow">
                <i class="fas fa-arrow-right"></i>
              </div>
              <div class="step">
                <div class="step-icon">
                  <i :class="activeMethodData.icon">2</i>
                </div>
                <div class="step-label">{{ activeMethodData.name }}加密</div>
              </div>
              <div class="arrow">
                <i class="fas fa-arrow-right"></i>
              </div>
              <div class="step">
                <div class="step-icon">
                  <i class="fas fa-cloud-upload-alt">3</i>
                </div>
                <div class="step-label">发送到服务器</div>
              </div>
            </div>
            <div class="principle-description">
              <p v-html="activeMethodData.principle"></p>
            </div>
          </div>
        </div>

        <!-- 代码示例 -->
        <div class="card code-sample">
          <div class="card-header">
            <i class="fas fa-code"></i>
            <h3>代码实现</h3>
          </div>
          <div class="card-body">
            <div class="tabs">
              <div class="tab-buttons">
                <button
                  v-for="tab in codeTabs"
                  :key="tab"
                  :class="{ active: activeCodeTab === tab }"
                  @click="activeCodeTab = tab"
                >
                  {{ tab }}
                </button>
              </div>

              <div class="tab-content">
                <pre
                  v-if="activeCodeTab === 'JavaScript'"
                ><code>{{ activeMethodData.code.javascript }}</code></pre>
                <pre
                  v-if="activeCodeTab === 'Vue'"
                ><code>{{ activeMethodData.code.vue }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 优缺点 -->
      <div class="pros-cons">
        <div class="pros">
          <div class="section-header">
            <i class="fas fa-check-circle"></i>
            <h3>优点</h3>
          </div>
          <ul>
            <li v-for="(pro, index) in activeMethodData.pros" :key="`pro-${index}`">
              <i class="fas fa-plus"></i> {{ pro }}
            </li>
          </ul>
        </div>
        <div class="cons">
          <div class="section-header">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>缺点与风险</h3>
          </div>
          <ul>
            <li v-for="(con, index) in activeMethodData.cons" :key="`con-${index}`">
              <i class="fas fa-minus"></i> {{ con }}
            </li>
          </ul>
        </div>
      </div>

      <!-- 适用场景 -->
      <div class="use-cases">
        <div class="section-header">
          <i class="fas fa-lightbulb"></i>
          <h3>适用场景</h3>
        </div>
        <div class="cases-grid">
          <div
            v-for="(usecase, index) in activeMethodData.useCases"
            :key="`case-${index}`"
            class="case-card"
          >
            <div class="case-icon">
              <i :class="usecase.icon"></i>
            </div>
            <div class="case-content">
              <h4>{{ usecase.title }}</h4>
              <p>{{ usecase.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 安全建议 -->
    <div class="security-tips">
      <h2><i class="fas fa-shield-virus"></i> 前端密码安全最佳实践</h2>
      <div class="tips-grid">
        <div class="tip-card" v-for="(tip, index) in securityTips" :key="`tip-${index}`">
          <div class="tip-number">{{ index + 1 }}</div>
          <div class="tip-content">
            <h3>{{ tip.title }}</h3>
            <p>{{ tip.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>前端安全实践指南 &copy; {{ new Date().getFullYear() }} - 密码加密技术</p>
      <div class="disclaimer">
        <i class="fas fa-exclamation-circle"></i>
        重要提示：前端加密不能替代后端安全措施，应作为整体安全策略的一部分
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 安全级别
const securityLevels = ref([
  {
    level: 1,
    title: '基础防护',
    icon: 'fas fa-lock-open',
    description: '仅使用 HTTPS 传输，无前端加密',
  },
  {
    level: 2,
    title: '单向哈希',
    icon: 'fas fa-lock',
    description: '前端哈希处理，后端再次哈希存储',
  },
  {
    level: 3,
    title: '加盐哈希',
    icon: 'fas fa-lock',
    description: '前端生成盐值，结合密码哈希',
  },
  {
    level: 4,
    title: '客户端派生',
    icon: 'fas fa-lock',
    description: '使用 PBKDF2 或 bcrypt 进行密钥派生',
  },
  {
    level: 5,
    title: '端到端加密',
    icon: 'fas fa-shield-alt',
    description: '客户端完全加密，服务器无法解密',
  },
])

// 加密方法
const encryptionMethods = ref([
  {
    name: 'HTTPS',
    tag: '传输安全',
    icon: 'fas fa-shield-alt',
    description: '通过 SSL/TLS 加密传输通道，保护数据在传输过程中的安全',
    security: 3,
    difficulty: 1,
    support: '100%',
  },
  {
    name: 'Base64',
    tag: '编码方案',
    icon: 'fas fa-code',
    description: '简单编码而非加密，防止明文传输但容易被解码',
    security: 1,
    difficulty: 1,
    support: '100%',
  },
  {
    name: 'SHA 系列',
    tag: '单向哈希',
    icon: 'fas fa-fingerprint',
    description: 'SHA-256 等哈希算法，将密码转换为不可逆的哈希值',
    security: 3,
    difficulty: 2,
    support: '100%',
  },
  {
    name: 'bcrypt',
    tag: '抗破解哈希',
    icon: 'fas fa-user-shield',
    description: '专为密码设计的哈希算法，包含盐值和成本因子',
    security: 4,
    difficulty: 3,
    support: '需要 polyfill',
  },
  {
    name: 'PBKDF2',
    tag: '密钥派生',
    icon: 'fas fa-key',
    description: '通过多次哈希迭代生成密钥，增加暴力破解难度',
    security: 4,
    difficulty: 3,
    support: '98%',
  },
  {
    name: 'Web Crypto API',
    tag: '现代加密',
    icon: 'fas fa-laptop-code',
    description: '浏览器原生加密 API，支持 AES、SHA 等标准算法',
    security: 5,
    difficulty: 4,
    support: '95%',
  },
])

const activeMethod = ref('Web Crypto API')

// 当前选中的方法数据
const activeMethodData = computed(() => {
  return methodDetails[activeMethod.value as keyof typeof methodDetails]
})

// 代码标签页
const codeTabs = ref(['JavaScript', 'Vue'])
const activeCodeTab = ref('JavaScript')

// 方法详细信息
const methodDetails = {
  HTTPS: {
    name: 'HTTPS',
    icon: 'fas fa-shield-alt',
    description:
      'HTTPS 是前端安全的基础，它通过 SSL/TLS 协议对客户端和服务器之间的通信进行加密，防止中间人攻击和数据窃取。',
    principle:
      'HTTPS 在传输层对数据进行加密，确保密码在传输过程中不被窃取。但它<strong>不提供存储安全</strong>，服务器接收到的仍是明文密码。',
    pros: [
      '防止传输过程中的窃听和中间人攻击',
      '浏览器原生支持，无需额外实现',
      '已成为现代网站的标配',
    ],
    cons: [
      '不提供存储安全，服务器仍需处理密码',
      '不防止客户端恶意脚本窃取密码',
      '配置不当可能导致安全漏洞',
    ],
    useCases: [
      {
        icon: 'fas fa-shopping-cart',
        title: '电商网站登录',
        description: '保护用户登录凭据在传输过程中的安全',
      },
      {
        icon: 'fas fa-university',
        title: '银行网站',
        description: '金融交易中保护敏感数据传输',
      },
      {
        icon: 'fas fa-user-md',
        title: '医疗健康系统',
        description: '保护患者隐私信息传输',
      },
    ],
    code: {
      javascript: `// HTTPS 由服务器配置，前端无需特殊代码
// 确保网站使用有效的 SSL/TLS 证书

// 前端检查是否使用 HTTPS
if (location.protocol !== 'https:') {
  console.warn('当前连接未使用HTTPS，存在安全风险！');
}`,
      vue: `<!-- Vue 中无需特殊处理 HTTPS -->
<!-- 确保生产环境强制使用 HTTPS -->

<template>
  <div>
    <form @submit.prevent="handleLogin">
      <input type="password" v-model="password" />
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const password = ref('');

const handleLogin = () => {
  if (location.protocol !== 'https:') {
    alert('请通过HTTPS连接以确保安全！');
    return;
  }

  // 发送登录请求
};
<\/script>`,
    },
  },
  Base64: {
    name: 'Base64',
    icon: 'fas fa-code',
    description:
      'Base64 是一种编码方案而非加密算法，它将二进制数据转换为可打印字符，可以防止密码在传输过程中被直接读取，但不提供真正的安全性。',
    principle:
      'Base64 将密码转换为ASCII字符串，使其<strong>不直接显示为明文</strong>。但编码是可逆的，任何获得编码值的人都可以轻松解码得到原始密码。',
    pros: [
      '实现简单，所有浏览器原生支持',
      '防止密码在传输中直接暴露',
      '编码后数据适合在文本环境中传输',
    ],
    cons: ['不是加密，只是编码，容易被解码', '不提供任何实际安全保护', '可能产生虚假的安全感'],
    useCases: [
      {
        icon: 'fas fa-blog',
        title: '个人博客系统',
        description: '简单场景下的基本防护',
      },
      {
        icon: 'fas fa-newspaper',
        title: '新闻网站登录',
        description: '非敏感信息的简单保护',
      },
      {
        icon: 'fas fa-comment',
        title: '评论区身份验证',
        description: '低风险场景的基本防护',
      },
    ],
    code: {
      javascript: `// Base64 编码解码示例
const password = "mySecretPassword123";

// 编码
const encoded = btoa(password);
console.log("编码后:", encoded); // "bXlTZWNyZXRQYXNzd29yZDEyMw=="

// 解码
const decoded = atob(encoded);
console.log("解码后:", decoded); // "mySecretPassword123"`,
      vue: `<!-- Vue 中使用 Base64 编码密码 -->

<template>
  <div>
    <form @submit.prevent="handleLogin">
      <input type="password" v-model="password" />
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const password = ref('');

const handleLogin = () => {
  // Base64 编码密码
  const encodedPassword = btoa(password.value);

  // 发送到服务器
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: encodedPassword })
  });
};
<\/script>`,
    },
  },
  'SHA 系列': {
    name: 'SHA 系列',
    icon: 'fas fa-fingerprint',
    description:
      'SHA (Secure Hash Algorithm) 系列是一组密码学哈希函数，将输入数据转换为固定长度的哈希值。SHA-256 是目前推荐的安全哈希算法。',
    principle:
      'SHA 算法将密码转换为<strong>不可逆的哈希值</strong>。理想情况下，服务器存储哈希值而非明文密码。前端哈希可防止传输过程中的明文暴露，但<strong>不能替代后端哈希</strong>。',
    pros: ['哈希不可逆，无法恢复原始密码', '防止密码在传输中暴露', '标准算法，广泛支持'],
    cons: ['彩虹表攻击风险（需加盐）', '不防止重放攻击', '客户端哈希可能被绕过'],
    useCases: [
      {
        icon: 'fas fa-user',
        title: '用户注册/登录',
        description: '保护密码传输安全',
      },
      {
        icon: 'fas fa-envelope',
        title: '邮箱验证',
        description: '安全验证用户身份',
      },
      {
        icon: 'fas fa-sync-alt',
        title: '密码重置',
        description: '安全处理密码重置流程',
      },
    ],
    code: {
      javascript: `// 使用 crypto-js 进行 SHA-256 哈希
import sha256 from 'crypto-js/sha256';

const password = "mySecretPassword123";
const hashedPassword = sha256(password).toString();

console.log("哈希密码:", hashedPassword);`,
      vue: `<!-- Vue 中使用 SHA-256 哈希密码 -->

<template>
  <div>
    <form @submit.prevent="handleLogin">
      <input type="password" v-model="password" />
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import sha256 from 'crypto-js/sha256';

const password = ref('');

const handleLogin = async () => {
  // 生成密码哈希
  const hashedPassword = sha256(password.value).toString();

  // 发送到服务器
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: hashedPassword })
  });

  // 处理响应
};
<\/script>`,
    },
  },
  bcrypt: {
    name: 'bcrypt',
    icon: 'fas fa-user-shield',
    description:
      'bcrypt 是专门为密码哈希设计的算法，包含盐值和成本因子，能有效抵御暴力破解和彩虹表攻击。',
    principle:
      'bcrypt 为每个密码<strong>生成唯一的盐值</strong>，并通过多轮哈希增加计算成本。即使两个用户使用相同密码，生成的哈希值也不同。',
    pros: ['内置盐值，防止彩虹表攻击', '可调节成本因子，抵御暴力破解', '专门为密码存储设计'],
    cons: ['前端实现需要较大库（约 100KB）', '计算成本高，可能影响性能', '较新浏览器需要 polyfill'],
    useCases: [
      {
        icon: 'fas fa-key',
        title: '高安全性系统',
        description: '需要强密码保护的场景',
      },
      {
        icon: 'fas fa-wallet',
        title: '金融应用',
        description: '保护用户财务信息',
      },
      {
        icon: 'fas fa-file-medical',
        title: '医疗健康应用',
        description: '保护敏感健康数据',
      },
    ],
    code: {
      javascript: `// 使用 bcrypt.js 进行前端哈希
import bcrypt from 'bcryptjs';

const password = "mySecretPassword123";
const saltRounds = 10;

// 生成盐并哈希密码
bcrypt.genSalt(saltRounds, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log("bcrypt 哈希:", hash);
  });
});`,
      vue: `<!-- Vue 中使用 bcrypt 哈希密码 -->

<template>
  <div>
    <form @submit.prevent="handleLogin">
      <input type="password" v-model="password" />
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import bcrypt from 'bcryptjs';

const password = ref('');
const saltRounds = 10;

const handleLogin = () => {
  // 生成盐并哈希密码
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password.value, salt, (err, hash) => {
      // 发送哈希到服务器
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: hash })
      });
    });
  });
};
<\/script>`,
    },
  },
  PBKDF2: {
    name: 'PBKDF2',
    icon: 'fas fa-key',
    description:
      'PBKDF2 (Password-Based Key Derivation Function 2) 是密钥派生函数，通过对密码和盐值进行多次哈希迭代生成密钥。',
    principle:
      'PBKDF2 使用密码和盐值作为输入，通过<strong>多次哈希迭代</strong>生成密钥。迭代次数可配置，增加暴力破解的成本。',
    pros: ['可配置迭代次数，增加破解难度', '标准算法，广泛支持', '适合从密码派生加密密钥'],
    cons: ['纯 JavaScript 实现性能较差', '需要合理配置迭代次数', '不如 bcrypt 或 argon2 先进'],
    useCases: [
      {
        icon: 'fas fa-mobile-alt',
        title: '移动应用',
        description: '客户端数据加密',
      },
      {
        icon: 'fas fa-cloud',
        title: '云存储应用',
        description: '客户端加密后上传',
      },
      {
        icon: 'fas fa-comments',
        title: '安全通讯应用',
        description: '端到端加密的密钥派生',
      },
    ],
    code: {
      javascript: `// 使用 Web Crypto API 实现 PBKDF2
async function deriveKey(password, salt, iterations = 100000) {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  // 导入密码
  const baseKey = await crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  // 派生密钥
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations,
      hash: "SHA-256"
    },
    baseKey,
    256 // 派生密钥长度 (bits)
  );

  // 转换为十六进制字符串
  return Array.from(new Uint8Array(derivedBits))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// 使用示例
deriveKey('password', 'salt').then(key => {
  console.log("派生密钥:", key);
});`,
      vue: `<!-- Vue 中使用 PBKDF2 派生密钥 -->

<template>
  <div>
    <form @submit.prevent="handleLogin">
      <input type="password" v-model="password" />
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const password = ref('');

async function deriveKey(password, salt, iterations = 100000) {
  // ... 同上 ...
}

const handleLogin = async () => {
  const salt = "unique_salt_per_user"; // 通常从服务器获取
  const derivedKey = await deriveKey(password.value, salt);

  // 发送派生密钥到服务器
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: derivedKey })
  });
};
<\/script>`,
    },
  },
  'Web Crypto API': {
    name: 'Web Crypto API',
    icon: 'fas fa-laptop-code',
    description:
      'Web Crypto API 是浏览器原生提供的加密接口，支持各种标准加密算法，包括 AES、SHA、PBKDF2 等。',
    principle:
      'Web Crypto API 提供底层加密原语，可在浏览器中执行<strong>真正的加密操作</strong>。支持对称加密、非对称加密、哈希和密钥派生等操作。',
    pros: [
      '浏览器原生支持，无需额外库',
      '高性能（使用原生代码）',
      '支持多种标准加密算法',
      '提供真正的加密能力',
    ],
    cons: [
      'API 较复杂，学习曲线陡峭',
      '较旧浏览器支持有限',
      '错误处理复杂',
      '需要理解底层加密概念',
    ],
    useCases: [
      {
        icon: 'fas fa-lock',
        title: '端到端加密',
        description: '客户端加密，服务器无法解密',
      },
      {
        icon: 'fas fa-file-contract',
        title: '数字签名',
        description: '在浏览器生成和验证签名',
      },
      {
        icon: 'fas fa-database',
        title: '客户端数据加密',
        description: '本地存储前加密敏感数据',
      },
    ],
    code: {
      javascript: `// 使用 Web Crypto API 进行 AES-GCM 加密
async function encryptData(password, data) {
  const encoder = new TextEncoder();

  // 从密码派生密钥
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: crypto.getRandomValues(new Uint8Array(16)),
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );

  // 加密数据
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(data)
  );

  return {
    iv: Array.from(iv),
    encrypted: Array.from(new Uint8Array(encrypted))
  };
}

// 使用示例
encryptData('password', '敏感数据').then(result => {
  console.log("加密结果:", result);
});`,
      vue: `<!-- Vue 中使用 Web Crypto API 加密数据 -->

<template>
  <div>
    <form @submit.prevent="handleLogin">
      <input type="password" v-model="password" />
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const password = ref('');

async function encryptData(password, data) {
  // ... 同上 ...
}

const handleLogin = async () => {
  const encrypted = await encryptData(password.value, "需要加密的数据");

  // 发送加密数据到服务器
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(encrypted)
  });
};
<\/script>`,
    },
  },
}

// 安全建议
const securityTips = ref([
  {
    title: '始终使用 HTTPS',
    description: '确保所有前端-服务器通信通过 HTTPS 加密传输，防止中间人攻击。',
  },
  {
    title: '实施速率限制',
    description: '在服务器端限制登录尝试频率，防止暴力破解攻击。',
  },
  {
    title: '使用现代哈希算法',
    description: '优先使用 bcrypt、scrypt 或 Argon2 等抗 ASIC/GPU 的哈希算法。',
  },
  {
    title: '添加盐值',
    description: '为每个密码生成唯一的盐值，防止彩虹表攻击。',
  },
  {
    title: '前端验证不等于安全',
    description: '客户端验证仅用于用户体验，所有安全验证必须在服务器端执行。',
  },
  {
    title: '定期安全审计',
    description: '定期审查和更新加密实现，修复已知漏洞。',
  },
  {
    title: '多因素认证',
    description: '对敏感操作实施多因素认证（MFA），增加额外安全层。',
  },
  {
    title: '避免存储敏感数据',
    description: '尽可能避免在前端存储密码等敏感信息，必要时使用安全存储机制。',
  },
])
</script>

<style lang="less" scoped>
.password-encryption-container {
  font-family: 'Roboto', sans-serif;
  background: #f8fafc;
  color: #2d3748;
  line-height: 1.6;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background: linear-gradient(135deg, #2c3e50 0%, #4a6582 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  .header-content {
    max-width: 900px;
    margin: 0 auto;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
      font-weight: 600;
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 800px;
      margin: 0 auto;
      font-weight: 300;
      color: #e0e7ff;
    }
  }
}

.security-levels {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;

  .level {
    display: flex;
    align-items: center;
    gap: 15px;
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 10px;
    min-width: 220px;
    text-align: left;

    .level-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;

      &.level-1 {
        background: #e74c3c;
      }
      &.level-2 {
        background: #f39c12;
      }
      &.level-3 {
        background: #3498db;
      }
      &.level-4 {
        background: #2ecc71;
      }
      &.level-5 {
        background: #9b59b6;
      }
    }

    .level-info {
      h3 {
        font-size: 1.1rem;
        margin-bottom: 5px;
      }

      p {
        font-size: 0.9rem;
        opacity: 0.9;
      }
    }
  }
}

.encryption-methods {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.8rem;
    margin-bottom: 25px;
    color: #2d3748;
    text-align: center;
    justify-content: center;
  }
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.method-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }

  &.active {
    border-color: #4a69bd;
    background: #f0f7ff;
    box-shadow: 0 4px 15px rgba(74, 105, 189, 0.2);
  }
}

.method-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;

  .method-icon {
    width: 50px;
    height: 50px;
    background: #e9f5ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 1.5rem;
      color: #4a69bd;
    }
  }

  h3 {
    font-size: 1.3rem;
    margin-right: 10px;
    color: #2d3748;
  }

  .method-tag {
    background: #e9ecef;
    color: #495057;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }
}

.method-stats {
  .stat {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #4a5568;
      margin-bottom: 5px;
    }

    .stat-rating {
      i {
        color: #e2e8f0;
        margin-right: 3px;

        &.filled {
          color: #f1c40f;
        }
      }
    }

    .stat-value {
      font-weight: 500;
    }
  }
}

.method-details {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

.method-info {
  text-align: center;
  margin-bottom: 30px;

  h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    font-size: 1.8rem;
    margin-bottom: 15px;
    color: #2d3748;
  }

  .method-description {
    max-width: 800px;
    margin: 0 auto;
    font-size: 1.1rem;
    line-height: 1.7;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.card {
  background: #f8fafc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background: #f1f3f5;
  border-bottom: 1px solid #e2e8f0;

  i {
    color: #4a69bd;
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.3rem;
    color: #2d3748;
  }
}

.card-body {
  padding: 20px;
}

.principle-diagram {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;

    .step-icon {
      width: 60px;
      height: 60px;
      background: #e9f5ff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;

      i {
        font-size: 1.8rem;
        color: #4a69bd;
      }
    }

    .step-label {
      text-align: center;
      font-weight: 500;
    }
  }

  .arrow {
    color: #4a69bd;
    font-size: 1.5rem;
  }
}

.principle-description {
  background: #edf2f7;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.05rem;
  line-height: 1.7;
}

.tabs {
  .tab-buttons {
    display: flex;
    background: #f1f3f5;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 15px;

    button {
      flex: 1;
      padding: 12px;
      border: none;
      background: none;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        background: #4a69bd;
        color: white;
      }
    }
  }
}

pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 6px;
  font-family: 'Source Code Pro', monospace;
  font-size: 14px;
  overflow-x: auto;

  code {
    font-family: 'Source Code Pro', monospace;
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.pros,
.cons {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.pros {
  border-top: 4px solid #2ecc71;
}

.cons {
  border-top: 4px solid #e74c3c;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  i {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.4rem;
    color: #2d3748;
  }

  .pros & i {
    color: #2ecc71;
  }
  .cons & i {
    color: #e74c3c;
  }
}

ul {
  padding-left: 25px;

  li {
    margin-bottom: 15px;
    display: flex;
    align-items: flex-start;
    gap: 10px;

    i {
      margin-top: 5px;
    }

    .pros & i {
      color: #2ecc71;
    }
    .cons & i {
      color: #e74c3c;
    }
  }
}

.use-cases {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.case-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }
}

.case-icon {
  width: 50px;
  height: 50px;
  background: #e9f5ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;

  i {
    font-size: 1.5rem;
    color: #4a69bd;
  }
}

.case-content {
  h4 {
    font-size: 1.1rem;
    margin-bottom: 10px;
    color: #2d3748;
  }

  p {
    color: #4a5568;
    font-size: 0.95rem;
    line-height: 1.6;
  }
}

.security-tips {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: #2d3748;
    text-align: center;
    justify-content: center;
  }
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.tip-card {
  display: flex;
  gap: 15px;
  background: #f8fafc;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid #4a69bd;

  .tip-number {
    width: 36px;
    height: 36px;
    background: #4a69bd;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
    font-size: 1.1rem;
  }

  .tip-content {
    h3 {
      font-size: 1.2rem;
      margin-bottom: 8px;
      color: #2d3748;
    }

    p {
      color: #4a5568;
      line-height: 1.6;
    }
  }
}

footer {
  text-align: center;
  padding: 25px;
  background: white;
  color: #4a5568;
  font-size: 0.9rem;
  border-radius: 12px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);

  .disclaimer {
    margin-top: 15px;
    padding: 10px;
    background: #fff8e6;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    color: #e67e22;

    i {
      font-size: 1.2rem;
    }
  }
}

@media (max-width: 768px) {
  header h1 {
    font-size: 2rem;
  }

  .security-levels {
    flex-direction: column;
    align-items: center;
  }

  .principle-diagram {
    flex-direction: column;
    gap: 20px;

    .arrow {
      transform: rotate(90deg);
    }
  }
}

@media (max-width: 480px) {
  header h1 {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .methods-grid {
    grid-template-columns: 1fr;
  }

  .method-header {
    flex-direction: column;
    text-align: center;

    .method-icon {
      margin-bottom: 15px;
    }
  }
}
</style>
