<template>
  <div class="crypto-container">
    <!-- 页面顶部标题区域 -->
    <header class="crypto-header">
      <div class="header-content">
        <h1>Node.js Crypto加密模块基本介绍</h1>
        <p class="subtitle">基础解析加密算法、实现原理与安全实践</p>
        <div class="stats">
          <div class="stat-item">
            <div class="stat-value">14+</div>
            <div class="stat-label">加密算法支持</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">3种</div>
            <div class="stat-label">加密类型</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">100%</div>
            <div class="stat-label">安全应用</div>
          </div>
        </div>
      </div>
      <div class="header-image">
        <div class="encryption-visual">
          <div class="plain-text">Hello World</div>
          <div class="algorithm-icon">🔒</div>
          <div class="encrypted-text">Xr4i8k2pQ9z</div>
        </div>
      </div>
    </header>

    <!-- 导航菜单 -->
    <nav class="crypto-nav">
      <button v-for="item in navItems" :key="item.id" class="nav-btn" :class="{ active: activeSection === item.id }"
        @click="activeSection = item.id">
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-text">{{ item.text }}</span>
      </button>
    </nav>

    <main class="crypto-main">
      <!-- 介绍部分 -->
      <section v-show="activeSection === 'introduction'" class="section-card">
        <h2 class="section-title">
          <span class="icon">🔐</span> Crypto模块概述
        </h2>

        <div class="intro-content">
          <p>Node.js的<code>crypto</code>模块提供了丰富的加密功能，包括各种加密算法的实现，用于处理数据的机密性、完整性和认证。</p>

          <div class="feature-box">
            <h3>核心功能:</h3>
            <ul>
              <li><strong>加密解密</strong> - 使用对称和非对称算法保护数据</li>
              <li><strong>哈希函数</strong> - 生成数据的唯一指纹</li>
              <li><strong>数字签名</strong> - 验证数据来源和完整性</li>
              <li><strong>密钥管理</strong> - 安全生成和存储密钥</li>
              <li><strong>随机数生成</strong> - 创建安全的随机值</li>
            </ul>
          </div>

          <div class="usage-example">
            <h3>基本使用:</h3>
            <div class="code-block">
              <pre><code>// 导入crypto模块
const crypto = require('crypto');

// 创建SHA-256哈希
const hash = crypto.createHash('sha256');
hash.update('敏感数据');
const digest = hash.digest('hex');
console.log('哈希值:', digest);</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 对称加密部分 -->
      <section v-show="activeSection === 'symmetric'" class="section-card">
        <h2 class="section-title">
          <span class="icon">🔑</span> 对称加密算法
        </h2>

        <div class="algorithm-intro">
          <p>对称加密使用<strong>相同密钥</strong>进行加密和解密，适合大数据量加密，性能高效。</p>
        </div>

        <div class="algorithm-card">
          <div class="algorithm-header">
            <div class="algo-icon">🔄</div>
            <div class="algo-name">AES (高级加密标准)</div>
            <div class="algo-type">对称加密</div>
          </div>

          <div class="algorithm-details">
            <div class="detail">
              <h4>📝 使用场景:</h4>
              <ul>
                <li>数据库字段加密</li>
                <li>配置文件加密</li>
                <li>网络通信加密(TLS/SSL)</li>
                <li>文件系统加密</li>
              </ul>
            </div>

            <div class="detail">
              <h4>✅ 优点:</h4>
              <ul>
                <li>速度快，性能优异</li>
                <li>密钥长度可选(128, 192, 256位)</li>
                <li>安全性高，通过严格验证</li>
                <li>广泛支持，标准化程度高</li>
              </ul>
            </div>

            <div class="detail">
              <h4>⚠️ 缺点:</h4>
              <ul>
                <li>密钥分发困难</li>
                <li>无法防止数据篡改（需配合HMAC）</li>
                <li>需要安全的密钥存储机制</li>
              </ul>
            </div>

            <div class="code-example">
              <h4>💻 代码示例:</h4>
              <div class="code-block">
                <pre><code>// AES-256-CBC加密示例
const crypto = require('crypto');

function encrypt(text, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(key),
    iv
  );

  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

function decrypt(text, key) {
  const [ivHex, encryptedHex] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');

  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(key),
    iv
  );

  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// 使用示例
const key = crypto.randomBytes(32); // 256位密钥
const encrypted = encrypt('敏感数据', key);
const decrypted = decrypt(encrypted, key);</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="algorithm-info">
          <h3>其他对称算法:</h3>
          <div class="other-algorithms">
            <div class="algo-item">
              <div class="algo-title">DES (数据加密标准)</div>
              <div class="algo-desc">56位密钥，已不推荐使用</div>
            </div>
            <div class="algo-item">
              <div class="algo-title">3DES (三重DES)</div>
              <div class="algo-desc">三倍DES密钥长度，速度较慢</div>
            </div>
            <div class="algo-item">
              <div class="algo-title">Blowfish & Twofish</div>
              <div class="algo-desc">可变密钥长度加密算法</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 非对称加密部分 -->
      <section v-show="activeSection === 'asymmetric'" class="section-card">
        <h2 class="section-title">
          <span class="icon">🔓</span> 非对称加密算法
        </h2>

        <div class="algorithm-intro">
          <p>非对称加密使用<strong>公钥/私钥对</strong>，公钥加密数据，私钥解密数据，解决密钥分发问题。</p>
        </div>

        <div class="algorithm-card">
          <div class="algorithm-header">
            <div class="algo-icon">🔗</div>
            <div class="algo-name">RSA (Rivest–Shamir–Adleman)</div>
            <div class="algo-type">非对称加密</div>
          </div>

          <div class="algorithm-details">
            <div class="detail">
              <h4>📝 使用场景:</h4>
              <ul>
                <li>安全密钥交换</li>
                <li>数字签名</li>
                <li>SSL/TLS握手</li>
                <li>数字证书</li>
                <li>加密小量数据</li>
              </ul>
            </div>

            <div class="detail">
              <h4>✅ 优点:</h4>
              <ul>
                <li>解决密钥分发问题</li>
                <li>支持数字签名和验证</li>
                <li>公钥可以公开分发</li>
              </ul>
            </div>

            <div class="detail">
              <h4>⚠️ 缺点:</h4>
              <ul>
                <li>计算量大，速度慢</li>
                <li>密钥长度长（推荐2048位以上）</li>
                <li>不适合加密大量数据</li>
              </ul>
            </div>

            <div class="code-example">
              <h4>💻 代码示例:</h4>
              <div class="code-block">
                <pre><code>// RSA加密示例
const crypto = require('crypto');
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// 使用公钥加密
function encryptWithPublicKey(data) {
  const buffer = Buffer.from(data);
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString('base64');
}

// 使用私钥解密
function decryptWithPrivateKey(encrypted) {
  const buffer = Buffer.from(encrypted, 'base64');
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      passphrase: '',
    },
    buffer
  );
  return decrypted.toString();
}

// 使用示例
const encryptedData = encryptWithPublicKey('敏感数据');
const decryptedData = decryptWithPrivateKey(encryptedData);</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="algorithm-info">
          <h3>其他非对称算法:</h3>
          <div class="other-algorithms">
            <div class="algo-item">
              <div class="algo-title">ECC (椭圆曲线加密)</div>
              <div class="algo-desc">相同安全性下密钥更短，效率更高</div>
            </div>
            <div class="algo-item">
              <div class="algo-title">Diffie-Hellman</div>
              <div class="algo-desc">安全密钥交换协议</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 哈希函数部分 -->
      <section v-show="activeSection === 'hash'" class="section-card">
        <h2 class="section-title">
          <span class="icon">🔄</span> 哈希算法
        </h2>

        <div class="algorithm-intro">
          <p>哈希函数将任意长度数据转换为固定长度的唯一值（哈希值），常用于校验数据完整性和存储密码。</p>
        </div>

        <div class="algorithm-card">
          <div class="algorithm-header">
            <div class="algo-icon">🔍</div>
            <div class="algo-name">SHA-256 (安全哈希算法)</div>
            <div class="algo-type">哈希函数</div>
          </div>

          <div class="algorithm-details">
            <div class="detail">
              <h4>📝 使用场景:</h4>
              <ul>
                <li>密码存储（加盐）</li>
                <li>数据完整性验证</li>
                <li>区块链技术</li>
                <li>数字签名</li>
                <li>唯一标识生成</li>
              </ul>
            </div>

            <div class="detail">
              <h4>✅ 优点:</h4>
              <ul>
                <li>固定长度输出（256位）</li>
                <li>抗碰撞性高</li>
                <li>雪崩效应（微小变化导致巨大差异）</li>
                <li>不可逆（无法从哈希值恢复原始数据）</li>
              </ul>
            </div>

            <div class="detail">
              <h4>⚠️ 缺点:</h4>
              <ul>
                <li>不适用于加密（因为不可逆）</li>
                <li>对于简单密码容易受到彩虹表攻击</li>
              </ul>
            </div>

            <div class="code-example">
              <h4>💻 代码示例:</h4>
              <div class="code-block">
                <pre><code>// 安全的密码存储方案
const crypto = require('crypto');

function hashPassword(password) {
  // 生成随机盐
  const salt = crypto.randomBytes(16).toString('hex');

  // 创建带盐的哈希
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha256')
    .toString('hex');

  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  const [salt, originalHash] = storedHash.split(':');

  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha256')
    .toString('hex');

  return hash === originalHash;
}

// 使用示例
const password = 'user_password_123';
const storedHash = hashPassword(password);
const isMatch = verifyPassword(password, storedHash);</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="algorithm-info">
          <h3>哈希算法比较:</h3>
          <table class="algorithm-table">
            <thead>
              <tr>
                <th>算法</th>
                <th>输出长度</th>
                <th>安全性</th>
                <th>推荐用途</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>MD5</td>
                <td>128位</td>
                <td>不安全</td>
                <td>文件校验（非安全场景）</td>
              </tr>
              <tr>
                <td>SHA-1</td>
                <td>160位</td>
                <td>不安全</td>
                <td>不推荐新系统使用</td>
              </tr>
              <tr>
                <td>SHA-256</td>
                <td>256位</td>
                <td>安全</td>
                <td>通用安全用途</td>
              </tr>
              <tr>
                <td>SHA-512</td>
                <td>512位</td>
                <td>更安全</td>
                <td>高安全要求场景</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- HMAC部分 -->
      <section v-show="activeSection === 'hmac'" class="section-card">
        <h2 class="section-title">
          <span class="icon">🛡️</span> HMAC (基于哈希的消息认证码)
        </h2>

        <div class="algorithm-intro">
          <p>HMAC结合加密哈希函数和密钥，用于验证数据完整性和真实性。</p>
        </div>

        <div class="algorithm-card">
          <div class="algorithm-header">
            <div class="algo-icon">📨</div>
            <div class="algo-name">HMAC-SHA256</div>
            <div class="algo-type">消息认证码</div>
          </div>

          <div class="algorithm-details">
            <div class="detail">
              <h4>📝 使用场景:</h4>
              <ul>
                <li>API请求认证</li>
                <li>消息完整性验证</li>
                <li>JWT (JSON Web Tokens)</li>
                <li>防止篡改的Cookie</li>
                <li>安全通信协议</li>
              </ul>
            </div>

            <div class="detail">
              <h4>✅ 优点:</h4>
              <ul>
                <li>同时验证完整性和真实性</li>
                <li>使用共享密钥</li>
                <li>防止中间人篡改</li>
                <li>高效计算</li>
              </ul>
            </div>

            <div class="detail">
              <h4>⚠️ 缺点:</h4>
              <ul>
                <li>需要安全交换密钥</li>
                <li>不提供加密（数据仍是明文）</li>
              </ul>
            </div>

            <div class="code-example">
              <h4>💻 代码示例:</h4>
              <div class="code-block">
                <pre><code>// HMAC示例
const crypto = require('crypto');

function createHmac(message, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(message);
  return hmac.digest('hex');
}

// API签名验证示例
const apiSecret = 'your_api_secret_here';

function signRequest(requestData) {
  const dataString = JSON.stringify(requestData);
  const signature = createHmac(dataString, apiSecret);
  return { data: requestData, signature };
}

function verifyRequest(data, signature) {
  const expectedSignature = createHmac(
    JSON.stringify(data),
    apiSecret
  );
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// 使用示例
const request = { userId: 123, action: 'getProfile' };
const signed = signRequest(request);
const isValid = verifyRequest(signed.data, signed.signature);</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 安全实践部分 -->
      <section v-show="activeSection === 'security'" class="section-card">
        <h2 class="section-title">
          <span class="icon">🚨</span> 安全实践与注意事项
        </h2>

        <div class="security-content">
          <div class="warning-card">
            <h3>⚠️ 关键安全警告</h3>
            <ul>
              <li>永远不要使用已废弃的算法（MD5, SHA-1, DES）</li>
              <li>确保使用足够长度的密钥（AES至少128位，RSA至少2048位）</li>
              <li>始终使用正确的初始化向量（IV）和盐值</li>
              <li>使用安全的随机数生成器（crypto.randomBytes）</li>
              <li>避免在不安全的环境中存储密钥</li>
            </ul>
          </div>

          <div class="best-practices">
            <h3>✅ 最佳实践:</h3>

            <div class="practice-item">
              <div class="practice-icon">🔑</div>
              <div class="practice-content">
                <h4>密钥管理</h4>
                <p>使用环境变量或密钥管理服务存储密钥，避免硬编码</p>
              </div>
            </div>

            <div class="practice-item">
              <div class="practice-icon">🔒</div>
              <div class="practice-content">
                <h4>密码存储</h4>
                <p>使用带盐的慢哈希函数（如PBKDF2, bcrypt, scrypt）</p>
              </div>
            </div>

            <div class="practice-item">
              <div class="practice-icon">📡</div>
              <div class="practice-content">
                <h4>数据传输安全</h4>
                <p>优先使用TLS/SSL协议保护传输中的数据</p>
              </div>
            </div>
          </div>

          <div class="algorithm-selection">
            <h3>📊 算法选择指南</h3>
            <table class="selection-table">
              <thead>
                <tr>
                  <th>需求</th>
                  <th>推荐算法</th>
                  <th>注意事项</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>加密数据存储</td>
                  <td>AES-256-GCM</td>
                  <td>使用随机IV，安全存储密钥</td>
                </tr>
                <tr>
                  <td>密码存储</td>
                  <td>PBKDF2 / bcrypt / scrypt</td>
                  <td>高迭代次数/工作因子，加盐</td>
                </tr>
                <tr>
                  <td>API认证</td>
                  <td>HMAC-SHA256</td>
                  <td>安全传输密钥，使用时间戳防重放</td>
                </tr>
                <tr>
                  <td>安全密钥交换</td>
                  <td>ECDH / RSA</td>
                  <td>使用足够的密钥长度</td>
                </tr>
                <tr>
                  <td>数字签名</td>
                  <td>RSA-PSS / ECDSA</td>
                  <td>使用SHA2/SHA3系列哈希</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>

    <footer class="crypto-footer">
      <p> Node.js加密安全指南 | 使用crypto模块构建安全应用</p>
      <p>安全提示：定期更新依赖库，使用最新版本的Node.js，遵循最小权限原则</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 导航项
const activeSection = ref('introduction');
const navItems = [
  { id: 'introduction', text: '模块介绍', icon: '🔍' },
  { id: 'symmetric', text: '对称加密', icon: '🔑' },
  { id: 'asymmetric', text: '非对称加密', icon: '🔓' },
  { id: 'hash', text: '哈希算法', icon: '🔄' },
  { id: 'hmac', text: 'HMAC', icon: '📨' },
  { id: 'security', text: '安全实践', icon: '🛡️' },
];
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@warning-color: #f72585;
@success-color: #4ade80;
@dark-color: #2b2d42;
@light-bg: #f8f9fa;
@card-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
@border-color: #e9ecef;
@text-color: #343a40;

.crypto-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  color: @text-color;
  background: #fff;
  line-height: 1.6;
}

.crypto-header {
  display: flex;
  background: linear-gradient(135deg, #1d3557, #2a6f97);
  color: white;
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: @card-shadow;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #4cc9f0, #4361ee, #7209b7);
  }

  .header-content {
    flex: 1;

    h1 {
      font-size: 2.8rem;
      margin-bottom: 0.8rem;
      font-weight: 800;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .subtitle {
      font-size: 1.4rem;
      opacity: 0.9;
      margin-bottom: 1.5rem;
      font-weight: 400;
    }

    .stats {
      display: flex;
      gap: 1.5rem;
      margin-top: 2rem;

      .stat-item {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(6px);
        border-radius: 12px;
        padding: 1.2rem;
        min-width: 100px;
        text-align: center;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

        &:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        .stat-value {
          font-size: 2.1rem;
          font-weight: 800;
          margin-bottom: 0.3rem;
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.85;
          font-weight: 500;
        }
      }
    }
  }

  .header-image {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 300px;

    .encryption-visual {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      width: 100%;
      backdrop-filter: blur(4px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);

      .plain-text {
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      .algorithm-icon {
        font-size: 2.5rem;
        margin: 1rem 0;
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
        }

        50% {
          transform: scale(1.1);
        }

        100% {
          transform: scale(1);
        }
      }

      .encrypted-text {
        font-family: monospace;
        font-size: 1.3rem;
        color: #4cc9f0;
        letter-spacing: 1px;
      }
    }
  }
}

.crypto-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.8rem;
  justify-content: center;

  .nav-btn {
    background: white;
    border: none;
    border-radius: 12px;
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1rem;
    font-weight: 600;
    color: darken(@text-color, 10%);
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    &:hover {
      background: lighten(@primary-color, 45%);
      transform: translateY(-3px);
    }

    &.active {
      background: @primary-color;
      color: white;
      box-shadow: 0 4px 12px rgba(67, 97, 238, 0.35);

      .nav-icon {
        transform: scale(1.1);
      }
    }
  }
}

.section-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: @card-shadow;

  .section-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.8rem;
    color: @dark-color;
    margin-bottom: 2rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid @primary-color;

    .icon {
      background: @primary-color;
      color: white;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
  }
}

.algorithm-intro {
  background: rgba(@accent-color, 0.08);
  border-left: 4px solid @accent-color;
  padding: 1.2rem;
  border-radius: 0 8px 8px 0;
  margin-bottom: 2rem;

  p {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.7;
  }
}

.algorithm-card {
  background: @light-bg;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 2rem;
  border: 1px solid @border-color;

  .algorithm-header {
    display: flex;
    align-items: center;
    padding: 1.2rem 1.8rem;
    background: linear-gradient(to right, @primary-color, @secondary-color);
    color: white;

    .algo-icon {
      font-size: 2rem;
      margin-right: 1rem;
    }

    .algo-name {
      flex: 1;
      font-size: 1.4rem;
      font-weight: 600;
    }

    .algo-type {
      background: rgba(255, 255, 255, 0.2);
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.9rem;
    }
  }

  .algorithm-details {
    padding: 1.8rem;

    .detail {
      margin-bottom: 1.5rem;

      h4 {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 0;
        margin-bottom: 0.8rem;
        font-size: 1.2rem;
        color: @dark-color;
      }

      ul {
        padding-left: 1.5rem;
        margin: 0;

        li {
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.2rem;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: @primary-color;
            font-weight: bold;
          }
        }
      }
    }
  }
}

.code-block {
  background: #2d3748;
  border-radius: 8px;
  padding: 1.2rem;
  overflow-x: auto;
  margin-top: 1rem;
  font-family: 'Fira Code', 'Courier New', monospace;

  pre {
    margin: 0;

    code {
      color: #e2e8f0;
      font-family: inherit;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.other-algorithms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;

  .algo-item {
    background: rgba(@accent-color, 0.05);
    border-left: 3px solid @accent-color;
    padding: 1rem;
    border-radius: 0 8px 8px 0;

    .algo-title {
      font-weight: 600;
      margin-bottom: 0.3rem;
      color: @dark-color;
    }

    .algo-desc {
      font-size: 0.95rem;
      color: lighten(@text-color, 15%);
    }
  }
}

.algorithm-table,
.selection-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;

  th,
  td {
    padding: 0.8rem;
    text-align: left;
    border-bottom: 1px solid @border-color;
  }

  th {
    background-color: rgba(@primary-color, 0.08);
    color: @dark-color;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: rgba(@primary-color, 0.03);
  }
}

.security-content {
  .warning-card {
    background: rgba(@warning-color, 0.08);
    border-left: 4px solid @warning-color;
    padding: 1.5rem;
    border-radius: 0 12px 12px 0;
    margin-bottom: 2rem;

    h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 0;
      color: darken(@warning-color, 10%);
    }

    ul {
      padding-left: 1.5rem;
      margin: 0;

      li {
        margin-bottom: 0.7rem;
        position: relative;
        padding-left: 1.2rem;

        &::before {
          content: '⚠️';
          position: absolute;
          left: 0;
        }
      }
    }
  }

  .best-practices {
    margin: 2rem 0;

    .practice-item {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      padding: 1.2rem;
      border-radius: 12px;
      margin-bottom: 1.2rem;
      background: rgba(@success-color, 0.06);
      border: 1px dashed rgba(@success-color, 0.3);

      .practice-icon {
        font-size: 1.8rem;
        flex: 0 0 50px;
        height: 50px;
        background: rgba(@success-color, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .practice-content {
        flex: 1;

        h4 {
          margin: 0 0 0.4rem;
          color: @dark-color;
        }

        p {
          margin: 0;
          color: lighten(@text-color, 15%);
        }
      }
    }
  }
}

.crypto-footer {
  text-align: center;
  padding: 1.5rem;
  margin-top: 1rem;
  color: lighten(@text-color, 25%);
  font-size: 0.95rem;
  border-top: 1px solid @border-color;

  p {
    margin: 0.4rem 0;
  }
}

@media (max-width: 900px) {
  .crypto-header {
    flex-direction: column;

    .header-image {
      margin-top: 2rem;
      flex: none;
    }
  }

  .section-card {
    padding: 1.5rem;
  }
}
</style>
