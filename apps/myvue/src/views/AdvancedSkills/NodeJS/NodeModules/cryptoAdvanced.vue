<template>
  <div class="crypto-container">
    <header class="header">
      <div class="logo-container">
        <div class="crypto-logo">
          <div class="lock-icon">🔒</div>
        </div>
        <h1>Crypto 模块进阶指南</h1>
      </div>
      <p class="subtitle">Node.js 高级加密技术与安全实践</p>
    </header>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="content">
      <!-- 对称加密部分 -->
      <section v-show="activeTab === 'symmetric'" class="section">
        <h2><i class="icon-key"></i> 对称加密</h2>
        <p class="section-intro">
          对称加密使用相同的密钥进行加密和解密，适合大数据量加密，效率高但密钥分发困难。
        </p>

        <div class="crypto-card">
          <h3>AES-256-GCM 加密示例</h3>
          <p>高级加密标准 (AES) 256位 Galois/Counter 模式，提供认证加密</p>
          <div class="code-block">
            <pre>
import crypto from 'crypto';

// 生成随机初始化向量 (IV)
const iv = crypto.randomBytes(12);

// 加密函数
function encrypt(text, key) {
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return { encrypted, iv: iv.toString('hex'), authTag };
}

// 解密函数
function decrypt(encryptedData, key) {
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    key,
    Buffer.from(encryptedData.iv, 'hex')
  );
  decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
  let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// 使用示例
const key = crypto.randomBytes(32); // 256位密钥
const original = '敏感数据';
const encrypted = encrypt(original, key);
const decrypted = decrypt(encrypted, key);

console.log('原始数据:', original);
console.log('解密数据:', decrypted);</pre
            >
          </div>

          <div class="use-cases">
            <h4>使用场景：</h4>
            <ul>
              <li>数据库字段加密（如用户个人信息）</li>
              <li>配置文件敏感信息保护</li>
              <li>安全通信中的消息加密</li>
            </ul>
          </div>
        </div>

        <div class="best-practices">
          <h3>最佳实践</h3>
          <div class="practices-grid">
            <div class="practice">
              <div class="practice-icon">🔑</div>
              <h4>密钥管理</h4>
              <p>使用专用密钥管理系统 (KMS) 存储密钥，避免硬编码</p>
            </div>
            <div class="practice">
              <div class="practice-icon">🔄</div>
              <h4>定期轮换密钥</h4>
              <p>每90天或根据合规要求轮换加密密钥</p>
            </div>
            <div class="practice">
              <div class="practice-icon">🔐</div>
              <h4>使用认证加密</h4>
              <p>优先选择 GCM、CCM 或 OCB 等提供认证的加密模式</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 非对称加密部分 -->
      <section v-show="activeTab === 'asymmetric'" class="section">
        <h2><i class="icon-keys"></i> 非对称加密</h2>
        <p class="section-intro">
          非对称加密使用公钥/私钥对，解决密钥分发问题，适合安全通信和数字签名。
        </p>

        <div class="crypto-card">
          <h3>RSA-OAEP 加密示例</h3>
          <p>RSA 加密结合最优非对称加密填充 (OAEP)，提供高安全性</p>
          <div class="code-block">
            <pre>
import crypto from 'crypto';

// 生成 RSA 密钥对
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

// 使用公钥加密
function rsaEncrypt(data, publicKey) {
  return crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256'
  }, Buffer.from(data)).toString('base64');
}

// 使用私钥解密
function rsaDecrypt(encrypted, privateKey) {
  return crypto.privateDecrypt({
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256'
  }, Buffer.from(encrypted, 'base64')).toString('utf8');
}

// 使用示例
const message = '机密信息';
const encrypted = rsaEncrypt(message, publicKey);
const decrypted = rsaDecrypt(encrypted, privateKey);

console.log('加密数据:', encrypted);
console.log('解密数据:', decrypted);</pre
            >
          </div>

          <div class="use-cases">
            <h4>使用场景：</h4>
            <ul>
              <li>HTTPS/TLS 协议中的密钥交换</li>
              <li>数字签名和证书</li>
              <li>安全消息传输（如电子邮件加密）</li>
              <li>API 安全通信</li>
            </ul>
          </div>
        </div>

        <div class="crypto-card">
          <h3>ECDH 密钥交换</h3>
          <p>椭圆曲线 Diffie-Hellman 密钥交换算法，提供前向安全性</p>
          <div class="code-block">
            <pre>
import crypto from 'crypto';

// Alice 生成密钥对
const alice = crypto.createECDH('secp521r1');
const alicePublicKey = alice.generateKeys('base64');

// Bob 生成密钥对
const bob = crypto.createECDH('secp521r1');
const bobPublicKey = bob.generateKeys('base64');

// 双方计算共享密钥
const aliceSharedKey = alice.computeSecret(bobPublicKey, 'base64', 'hex');
const bobSharedKey = bob.computeSecret(alicePublicKey, 'base64', 'hex');

console.log('Alice 的共享密钥:', aliceSharedKey);
console.log('Bob 的共享密钥:', bobSharedKey);
console.log('密钥是否相同:', aliceSharedKey === bobSharedKey);</pre
            >
          </div>

          <div class="use-cases">
            <h4>使用场景：</h4>
            <ul>
              <li>安全即时通讯应用</li>
              <li>VPN 连接建立</li>
              <li>安全文件传输协议</li>
              <li>区块链技术中的安全通信</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 哈希与签名部分 -->
      <section v-show="activeTab === 'hash'" class="section">
        <h2><i class="icon-hash"></i> 哈希与数字签名</h2>
        <p class="section-intro">哈希函数提供数据完整性验证，数字签名提供身份认证和不可否认性。</p>

        <div class="crypto-card">
          <h3>密码哈希 (Argon2)</h3>
          <p>使用 Argon2 算法进行密码哈希，抵抗 GPU 和 ASIC 攻击</p>
          <div class="code-block">
            <pre>
import crypto from 'crypto';

async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, { N: 16384, r: 8, p: 1 }, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt.toString('hex')}:${derivedKey.toString('hex')}`);
    });
  });
}

async function verifyPassword(password, hash) {
  const [salt, key] = hash.split(':');
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, Buffer.from(salt, 'hex'), 64, { N: 16384, r: 8, p: 1 }, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString('hex'));
    });
  });
}

// 使用示例
(async () => {
  const password = '用户密码123!';
  const hash = await hashPassword(password);
  const isValid = await verifyPassword(password, hash);

  console.log('存储的哈希:', hash);
  console.log('密码验证结果:', isValid);
})();</pre
            >
          </div>

          <div class="use-cases">
            <h4>使用场景：</h4>
            <ul>
              <li>用户密码安全存储</li>
              <li>API 密钥哈希存储</li>
              <li>敏感数据完整性验证</li>
            </ul>
          </div>
        </div>

        <div class="crypto-card">
          <h3>ECDSA 数字签名</h3>
          <p>椭圆曲线数字签名算法，提供高效安全的签名方案</p>
          <div class="code-block">
            <pre>
import crypto from 'crypto';

// 生成 ECDSA 密钥对
const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
  namedCurve: 'secp521r1',
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

// 创建签名
function sign(data, privateKey) {
  const signer = crypto.createSign('SHA512');
  signer.update(data);
  return signer.sign(privateKey, 'base64');
}

// 验证签名
function verify(data, signature, publicKey) {
  const verifier = crypto.createVerify('SHA512');
  verifier.update(data);
  return verifier.verify(publicKey, signature, 'base64');
}

// 使用示例
const document = '重要合同内容';
const signature = sign(document, privateKey);
const isValid = verify(document, signature, publicKey);

console.log('文档签名:', signature);
console.log('签名验证结果:', isValid);</pre
            >
          </div>

          <div class="use-cases">
            <h4>使用场景：</h4>
            <ul>
              <li>电子合同签名</li>
              <li>软件更新包验证</li>
              <li>区块链交易签名</li>
              <li>API 请求认证</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 密钥派生部分 -->
      <section v-show="activeTab === 'kdf'" class="section">
        <h2><i class="icon-key-derive"></i> 密钥派生与安全存储</h2>
        <p class="section-intro">密钥派生函数 (KDF) 从密码生成强密钥，安全存储确保密钥不被泄露。</p>

        <div class="crypto-card">
          <h3>PBKDF2 密钥派生</h3>
          <p>基于密码的密钥派生函数，抵抗暴力破解</p>
          <div class="code-block">
            <pre>
import crypto from 'crypto';

function deriveKey(password, salt, iterations = 100000, keyLength = 64) {
  return crypto.pbkdf2Sync(
    password,
    salt,
    iterations,
    keyLength,
    'sha512'
  ).toString('hex');
}

// 使用示例
const password = '用户密码';
const salt = crypto.randomBytes(16).toString('hex');
const derivedKey = deriveKey(password, salt);

console.log('派生密钥:', derivedKey);</pre
            >
          </div>

          <div class="use-cases">
            <h4>使用场景：</h4>
            <ul>
              <li>从用户密码派生加密密钥</li>
              <li>安全存储凭证</li>
              <li>加密密钥生成</li>
            </ul>
          </div>
        </div>

        <div class="crypto-card">
          <h3>安全密钥存储方案</h3>
          <p>使用硬件安全模块 (HSM) 或密钥管理服务 (KMS) 存储密钥</p>
          <div class="code-block">
            <pre>
// 使用 AWS KMS 的示例
import { KMS } from 'aws-sdk';

const kms = new KMS();

async function encryptWithKMS(plaintext, keyId) {
  const params = {
    KeyId: keyId,
    Plaintext: Buffer.from(plaintext)
  };
  const { CiphertextBlob } = await kms.encrypt(params).promise();
  return CiphertextBlob.toString('base64');
}

async function decryptWithKMS(ciphertext, keyId) {
  const params = {
    CiphertextBlob: Buffer.from(ciphertext, 'base64'),
    KeyId: keyId
  };
  const { Plaintext } = await kms.decrypt(params).promise();
  return Plaintext.toString('utf8');
}

// 使用示例
(async () => {
  const keyId = 'alias/my-key';
  const data = '敏感数据';

  const encrypted = await encryptWithKMS(data, keyId);
  const decrypted = await decryptWithKMS(encrypted, keyId);

  console.log('加密数据:', encrypted);
  console.log('解密数据:', decrypted);
})();</pre
            >
          </div>

          <div class="use-cases">
            <h4>使用场景：</h4>
            <ul>
              <li>云环境中的密钥管理</li>
              <li>合规性要求高的应用（如金融、医疗）</li>
              <li>大规模分布式系统的密钥管理</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Crypto 模块进阶指南 © 2023 | 安全加密最佳实践</p>
      <div class="footer-links">
        <a href="https://nodejs.org/api/crypto.html" target="_blank">Node.js Crypto 文档</a>
        <a
          href="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html"
          target="_blank"
          >OWASP 密码存储指南</a
        >
        <a
          href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-131Ar2.pdf"
          target="_blank"
          >NIST 加密标准</a
        >
      </div>
      <p class="version">Node.js 版本: 18.x | 最后更新: {{ currentDate }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentDate = new Date().toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

// 标签页
const tabs = ref([
  { id: 'symmetric', label: '对称加密' },
  { id: 'asymmetric', label: '非对称加密' },
  { id: 'hash', label: '哈希与签名' },
  { id: 'kdf', label: '密钥派生' },
])
const activeTab = ref('symmetric')
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@symmetric-color: #f72585;
@asymmetric-color: #7209b7;
@hash-color: #43aa8b;
@kdf-color: #f8961e;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@text-color: #333;
@text-light: #666;
@text-lighter: #999;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;

.crypto-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7ff;
  min-height: 100vh;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .crypto-logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    .lock-icon {
      font-size: 3rem;
    }
  }

  h1 {
    margin: 0;
    font-size: 2.5rem;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.2rem;
    margin-top: 15px;
    opacity: 0.9;
    font-weight: 300;
  }
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;

  .tab-btn {
    padding: 12px 25px;
    background: @card-bg;
    border: none;
    border-radius: 30px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      background: darken(@card-bg, 3%);
    }

    &.active {
      background: @primary-color;
      color: white;
      box-shadow: 0 4px 12px fade(@primary-color, 40%);
    }
  }
}

.section {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }

  h2 {
    color: @secondary-color;
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f0f0f0;
  }
}

.section-intro {
  font-size: 1.1rem;
  margin-bottom: 25px;
  color: @text-light;
}

.crypto-card {
  background: #f9f9ff;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-3px);
  }

  h3 {
    margin-top: 0;
    color: @primary-color;
  }
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 20px 0;

  pre {
    margin: 0;
    white-space: pre-wrap;
  }
}

.use-cases {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px dashed #f0f0f0;

  h4 {
    margin: 0 0 10px;
    color: @text-light;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 8px;
      position: relative;
      padding-left: 20px;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: @accent-color;
      }
    }
  }
}

.best-practices {
  margin-top: 30px;

  h3 {
    color: @secondary-color;
    margin-top: 0;
    padding-bottom: 15px;
    border-bottom: 2px solid #f0f0f0;
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.practice {
  background: #f9f9ff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  border: 1px solid #f0f0f0;

  .practice-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h4 {
    margin: 0 0 10px;
    color: @primary-color;
  }

  p {
    margin: 0;
    color: @text-light;
    font-size: 0.95rem;
  }
}

.footer {
  text-align: center;
  margin-top: 60px;
  padding: 30px 0;
  color: @text-lighter;
  font-size: 0.95rem;
  border-top: 1px solid @border-color;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin: 15px 0;

    a {
      color: @primary-color;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .version {
    margin-top: 8px;
    font-size: 0.85rem;
  }
}

// 图标类
.icon-key::before {
  content: '🔑';
}
.icon-keys::before {
  content: '🔐';
}
.icon-hash::before {
  content: '#';
}
.icon-key-derive::before {
  content: '🔏';
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .tabs {
    flex-direction: column;
    align-items: center;
  }

  .tab-btn {
    width: 100%;
    margin-bottom: 10px;
  }

  .practices-grid {
    grid-template-columns: 1fr;
  }
}
</style>
