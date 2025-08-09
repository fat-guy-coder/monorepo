<template>
  <div class="webcrypto-container">
    <header class="header">
      <h1>WebCrypto API 详解</h1>
      <p>现代Web应用的安全加密解决方案</p>
    </header>

    <div class="content-grid">
      <!-- 概念部分 -->
      <section class="card concept">
        <div class="section-header">
          <div class="icon">🔐</div>
          <h2>概念解析</h2>
        </div>
        <div class="content">
          <p class="definition">WebCrypto API 是一套浏览器原生提供的加密接口，用于在Web应用中执行各种加密操作，包括哈希生成、加密解密、数字签名和密钥管理等。</p>

          <div class="key-features">
            <h3>核心特性</h3>
            <div class="features-grid">
              <div class="feature">
                <div class="feature-icon">🔑</div>
                <h4>密钥管理</h4>
                <p>生成、存储和使用加密密钥</p>
              </div>
              <div class="feature">
                <div class="feature-icon">🔒</div>
                <h4>加密解密</h4>
                <p>数据的安全加密和解密</p>
              </div>
              <div class="feature">
                <div class="feature-icon">📝</div>
                <h4>数字签名</h4>
                <p>数据完整性和来源验证</p>
              </div>
              <div class="feature">
                <div class="feature-icon">🔍</div>
                <h4>哈希生成</h4>
                <p>数据指纹和完整性校验</p>
              </div>
            </div>
          </div>

          <div class="security-model">
            <h3>安全模型</h3>
            <ul>
              <li>所有操作在浏览器沙盒内执行</li>
              <li>密钥材料不会暴露给JavaScript</li>
              <li>防止时序攻击等侧信道攻击</li>
              <li>符合FIPS 140-2安全标准</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 核心作用 -->
      <section class="card purpose">
        <div class="section-header">
          <div class="icon">🎯</div>
          <h2>核心作用</h2>
        </div>
        <div class="content">
          <div class="purpose-grid">
            <div class="purpose-item">
              <div class="purpose-icon">🛡️</div>
              <h3>数据保护</h3>
              <p>客户端数据加密，防止未授权访问</p>
            </div>
            <div class="purpose-item">
              <div class="purpose-icon">📜</div>
              <h3>数字签名</h3>
              <p>验证数据来源和完整性</p>
            </div>
            <div class="purpose-item">
              <div class="purpose-icon">🔏</div>
              <h3>安全通信</h3>
              <p>端到端加密消息传递</p>
            </div>
            <div class="purpose-item">
              <div class="purpose-icon">🔑</div>
              <h3>密钥管理</h3>
              <p>安全生成和存储加密密钥</p>
            </div>
            <div class="purpose-item">
              <div class="purpose-icon">🔄</div>
              <h3>安全数据交换</h3>
              <p>安全令牌和JWT处理</p>
            </div>
            <div class="purpose-item">
              <div class="purpose-icon">📦</div>
              <h3>安全存储</h3>
              <p>本地敏感数据加密存储</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 基本用法 -->
      <section class="card basic-usage">
        <div class="section-header">
          <div class="icon">💻</div>
          <h2>基本用法</h2>
        </div>
        <div class="content">
          <div class="usage-tabs">
            <div class="tabs">
              <button
                v-for="(tab, index) in tabs"
                :key="index"
                :class="{ active: activeTab === index }"
                @click="activeTab = index"
              >
                {{ tab.label }}
              </button>
            </div>

            <div class="tab-content">
              <!-- 生成密钥 -->
              <div v-if="activeTab === 0" class="code-example">
                <pre><code>// 生成AES-GCM密钥
async function generateKey() {
  return await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true, // 是否可导出
    ["encrypt", "decrypt"] // 密钥用途
  );
}

// 生成RSA密钥对
async function generateRSAKeyPair() {
  return await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
}</code></pre>
              </div>

              <!-- 加密解密 -->
              <div v-if="activeTab === 1" class="code-example">
                <pre><code>// 加密数据
async function encryptData(key, data) {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    key,
    new TextEncoder().encode(data)
  );

  return {
    iv,
    encryptedData: encrypted
  };
}

// 解密数据
async function decryptData(key, encryptedData, iv) {
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    key,
    encryptedData
  );

  return new TextDecoder().decode(decrypted);
}</code></pre>
              </div>

              <!-- 哈希生成 -->
              <div v-if="activeTab === 2" class="code-example">
                <pre><code>// 生成SHA-256哈希
async function generateHash(data) {
  const hash = await window.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(data)
  );

  // 转换为十六进制字符串
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// 使用示例
generateHash('Hello, World!')
  .then(hash => console.log(hash));
// 输出: dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f</code></pre>
              </div>

              <!-- 数字签名 -->
              <div v-if="activeTab === 3" class="code-example">
                <pre><code>// 生成签名
async function signData(privateKey, data) {
  const signature = await window.crypto.subtle.sign(
    {
      name: "ECDSA",
      hash: { name: "SHA-384" }
    },
    privateKey,
    new TextEncoder().encode(data)
  );

  return signature;
}

// 验证签名
async function verifySignature(publicKey, signature, data) {
  const isValid = await window.crypto.subtle.verify(
    {
      name: "ECDSA",
      hash: { name: "SHA-384" }
    },
    publicKey,
    signature,
    new TextEncoder().encode(data)
  );

  return isValid;
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 底层原理 -->
      <section class="card mechanism">
        <div class="section-header">
          <div class="icon">⚙️</div>
          <h2>底层原理</h2>
        </div>
        <div class="content">
          <div class="architecture">
            <h3>架构概述</h3>
            <div class="architecture-diagram">
              <div class="layer">JavaScript API</div>
              <div class="arrow">↓</div>
              <div class="layer">浏览器加密引擎</div>
              <div class="arrow">↓</div>
              <div class="layer">原生加密模块</div>
              <div class="arrow">↓</div>
              <div class="layer">硬件加速 (如可用)</div>
            </div>
          </div>

          <div class="crypto-operations">
            <h3>加密操作流程</h3>
            <div class="steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>密钥生成</h4>
                  <p>使用安全随机数生成器创建密钥</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>数据处理</h4>
                  <p>数据转换为ArrayBuffer或TypedArray</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>算法执行</h4>
                  <p>在浏览器安全环境中执行加密操作</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>结果返回</h4>
                  <p>返回加密结果给JavaScript环境</p>
                </div>
              </div>
            </div>
          </div>

          <div class="security-measures">
            <h3>安全措施</h3>
            <ul>
              <li>密钥材料永远不会暴露给JavaScript</li>
              <li>所有操作在浏览器安全沙箱内完成</li>
              <li>使用恒定时间算法防止时序攻击</li>
              <li>支持硬件安全模块(HSM)集成</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="card scenarios">
        <div class="section-header">
          <div class="icon">📋</div>
          <h2>使用场景</h2>
        </div>
        <div class="content">
          <div class="scenario-grid">
            <div class="scenario">
              <div class="scenario-icon">1</div>
              <h3>密码管理器</h3>
              <p>客户端加密用户密码</p>
              <pre><code>// 加密密码存储
async function encryptPassword(password) {
  const key = await getEncryptionKey();
  const encrypted = await encryptData(key, password);
  localStorage.setItem('encryptedPassword', encrypted);
}</code></pre>
            </div>

            <div class="scenario">
              <div class="scenario-icon">2</div>
              <h3>端到端加密聊天</h3>
              <p>消息在客户端加密</p>
              <pre><code>// 加密聊天消息
async function encryptMessage(message, recipientPublicKey) {
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    recipientPublicKey,
    new TextEncoder().encode(message)
  );
  return encrypted;
}</code></pre>
            </div>

            <div class="scenario">
              <div class="scenario-icon">3</div>
              <h3>数字签名文档</h3>
              <p>验证文档来源和完整性</p>
              <pre><code>// 签署PDF文档
async function signDocument(document, privateKey) {
  const hash = await generateSHA256(document);
  return await signData(privateKey, hash);
}</code></pre>
            </div>

            <div class="scenario">
              <div class="scenario-icon">4</div>
              <h3>安全令牌生成</h3>
              <p>创建安全的JWT令牌</p>
              <pre><code>// 生成JWT签名
async function signJWT(payload, privateKey) {
  const header = { alg: 'ES384', typ: 'JWT' };
  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const signature = await signData(
    privateKey,
    signingInput
  );

  return `${signingInput}.${base64url(signature)}`;
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点 -->
      <section class="card pros-cons">
        <div class="section-header">
          <div class="icon">⚖️</div>
          <h2>优缺点对比</h2>
        </div>
        <div class="content">
          <div class="comparison">
            <div class="pros">
              <h3>优点</h3>
              <ul>
                <li><span class="highlight">原生支持</span> - 浏览器内置，无需外部库</li>
                <li><span class="highlight">高性能</span> - 硬件加速加密操作</li>
                <li><span class="highlight">高安全性</span> - 密钥材料不暴露给JS</li>
                <li><span class="highlight">标准化</span> - W3C规范，跨浏览器实现</li>
                <li><span class="highlight">功能丰富</span> - 支持多种加密算法</li>
              </ul>
            </div>

            <div class="cons">
              <h3>缺点</h3>
              <ul>
                <li><span class="highlight">学习曲线</span> - API复杂，概念抽象</li>
                <li><span class="highlight">错误处理</span> - 异常处理机制复杂</li>
                <li><span class="highlight">兼容性</span> - 旧浏览器支持有限</li>
                <li><span class="highlight">密钥管理</span> - 长期存储密钥有挑战</li>
                <li><span class="highlight">异步操作</span> - 所有方法都是异步的</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="algorithm-table">
        <h3>支持的加密算法</h3>
        <table>
          <thead>
            <tr>
              <th>算法类型</th>
              <th>算法名称</th>
              <th>用途</th>
              <th>推荐强度</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>对称加密</td>
              <td>AES-CTR, AES-CBC, AES-GCM</td>
              <td>加密/解密</td>
              <td>AES-GCM 256位</td>
            </tr>
            <tr>
              <td>非对称加密</td>
              <td>RSA-OAEP, ECDH</td>
              <td>加密/密钥交换</td>
              <td>RSA 2048位/ECC 384位</td>
            </tr>
            <tr>
              <td>数字签名</td>
              <td>RSASSA-PKCS1-v1_5, ECDSA</td>
              <td>签名/验证</td>
              <td>ECDSA with SHA-384</td>
            </tr>
            <tr>
              <td>哈希算法</td>
              <td>SHA-1, SHA-256, SHA-384, SHA-512</td>
              <td>数据完整性</td>
              <td>SHA-256或更高</td>
            </tr>
            <tr>
              <td>密钥派生</td>
              <td>HKDF, PBKDF2</td>
              <td>密钥派生</td>
              <td>PBKDF2 with >100,000次迭代</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="copyright">WebCrypto API | 构建更安全的Web应用</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(0);

const tabs = [
  { label: '密钥生成' },
  { label: '加密解密' },
  { label: '哈希生成' },
  { label: '数字签名' }
];
</script>

<style lang="less" scoped>
.webcrypto-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: #f8fafc;
  color: #2d3748;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 32px;
  padding: 28px;
  background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 2.4rem;
    margin: 0 0 12px;
    color: #1e40af;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    color: #4b5563;
    margin: 0;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 28px;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e2e8f0;

  .icon {
    font-size: 1.8rem;
    margin-right: 16px;
    color: #3b82f6;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #dbeafe;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 1.6rem;
    margin: 0;
    color: #1e40af;
  }
}

/* 概念部分样式 */
.concept {
  .definition {
    font-size: 1.1rem;
    margin-bottom: 20px;
    line-height: 1.7;
  }

  .key-features {
    margin-bottom: 24px;

    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .feature {
      text-align: center;
      background: #f0f9ff;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #dbeafe;

      .feature-icon {
        font-size: 2rem;
        margin-bottom: 12px;
        color: #3b82f6;
      }

      h4 {
        margin: 0 0 8px;
        font-size: 1.1rem;
        color: #1e40af;
      }
    }
  }

  .security-model {
    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    ul {
      padding-left: 24px;
      margin: 0;

      li {
        margin-bottom: 12px;
        position: relative;
        padding-left: 12px;

        &::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #3b82f6;
          font-weight: bold;
        }
      }
    }
  }
}

/* 作用部分样式 */
.purpose {
  .purpose-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }

  .purpose-item {
    background: #f0fdf4;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    border: 1px solid #bbf7d0;

    .purpose-icon {
      font-size: 2rem;
      margin-bottom: 12px;
      color: #10b981;
    }

    h3 {
      font-size: 1.2rem;
      margin: 0 0 8px;
      color: #065f46;
    }

    p {
      margin: 0;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }
}

/* 基本用法样式 */
.basic-usage {
  .usage-tabs {
    .tabs {
      display: flex;
      border-bottom: 2px solid #e2e8f0;
      margin-bottom: 20px;

      button {
        padding: 12px 24px;
        background: none;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        position: relative;
        color: #64748b;
        font-weight: 500;

        &.active {
          color: #1e40af;
          font-weight: 600;

          &::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 3px;
            background: #3b82f6;
            border-radius: 3px;
          }
        }

        &:hover {
          color: #1e40af;
          background: #f0f9ff;
        }
      }
    }
  }

  .code-example {
    pre {
      margin: 0;
    }
  }
}

/* 底层原理样式 */
.mechanism {
  .architecture {
    margin-bottom: 24px;

    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    .architecture-diagram {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;

      .layer {
        width: 80%;
        padding: 20px;
        background: #f0f9ff;
        border: 2px solid #dbeafe;
        border-radius: 12px;
        text-align: center;
        font-weight: 500;
      }

      .arrow {
        color: #93c5fd;
        font-size: 1.5rem;
        font-weight: bold;
      }
    }
  }

  .crypto-operations {
    margin-bottom: 24px;

    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    .steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }

    .step {
      display: flex;
      background: #f8fafc;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #e2e8f0;

      .step-number {
        width: 36px;
        height: 36px;
        background: #3b82f6;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 16px;
        flex-shrink: 0;
      }

      h4 {
        margin: 0 0 8px;
        font-size: 1.1rem;
        color: #1e40af;
      }

      p {
        margin: 0;
        color: #4b5563;
        font-size: 0.95rem;
      }
    }
  }

  .security-measures {
    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    ul {
      padding-left: 24px;
      margin: 0;

      li {
        margin-bottom: 12px;
        position: relative;
        padding-left: 12px;

        &::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #3b82f6;
          font-weight: bold;
        }
      }
    }
  }
}

/* 使用场景样式 */
.scenarios {
  .scenario-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .scenario {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e2e8f0;
    position: relative;

    .scenario-icon {
      position: absolute;
      top: -12px;
      left: -12px;
      width: 30px;
      height: 30px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h3 {
      font-size: 1.2rem;
      margin: 0 0 12px;
      color: #1e40af;
    }

    p {
      margin: 0 0 16px;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }
}

/* 优缺点样式 */
.pros-cons {
  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .pros, .cons {
    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e2e8f0;
    }

    ul {
      padding-left: 20px;
      margin: 0;
    }

    li {
      margin-bottom: 12px;
      position: relative;
      padding-left: 10px;
    }

    .highlight {
      font-weight: 600;
      color: #1e40af;
      display: inline-block;
      margin-right: 4px;
    }
  }

  .pros {
    h3 {
      color: #065f46;
      border-color: #bbf7d0;
    }

    .highlight {
      color: #065f46;
    }
  }

  .cons {
    h3 {
      color: #b91c1c;
      border-color: #fecaca;
    }

    .highlight {
      color: #b91c1c;
    }
  }
}

/* 代码块通用样式 */
pre {
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 16px;

  code {
    color: #cbd5e1;
  }
}

/* 页脚样式 */
.footer {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 24px;

  .algorithm-table {
    overflow-x: auto;
    margin-bottom: 24px;

    h3 {
      font-size: 1.4rem;
      margin: 0 0 24px;
      color: #2563eb;
      text-align: center;
    }

    table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 16px;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }

      th {
        background: #f1f5f9;
        font-weight: 600;
        color: #1e40af;
      }

      tr:nth-child(even) {
        background: #f8fafc;
      }

      tr:hover {
        background: #f0f9ff;
      }
    }
  }

  .copyright {
    font-size: 0.95rem;
    color: #64748b;
    padding-top: 16px;
    border-top: 1px solid #e2e8f0;
    text-align: center;
  }
}
</style>
