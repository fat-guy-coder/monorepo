<template>
  <div class="blockchain-container">
    <div class="hero-section">
      <div class="chain-animation">
        <div
          class="block"
          v-for="(block, index) in chainBlocks"
          :key="index"
          :style="{ backgroundColor: block.color }"
        >
          <div class="block-header">
            <span class="block-index">#{{ block.index }}</span>
            <span class="block-hash">{{ block.hash }}</span>
          </div>
          <div class="block-content">
            <div class="transaction" v-for="(tx, txIndex) in block.data" :key="txIndex">
              <span class="tx-from">{{ tx.from }}</span>
              <span class="tx-arrow">→</span>
              <span class="tx-to">{{ tx.to }}</span>
              <span class="tx-amount">{{ tx.amount }} ETH</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-content">
        <h1>区块链技术介绍</h1>
        <p class="subtitle">分布式账本技术的革命性创新</p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-value">$1.5万亿</span>
            <span class="stat-label">全球区块链市值</span>
          </div>
          <div class="stat">
            <span class="stat-value">200万+</span>
            <span class="stat-label">每日交易量</span>
          </div>
          <div class="stat">
            <span class="stat-value">10,000+</span>
            <span class="stat-label">区块链项目</span>
          </div>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <!-- 概念介绍 -->
      <div class="section concept-section">
        <div class="section-header">
          <div class="section-icon">🔗</div>
          <h2>区块链概念介绍</h2>
        </div>
        <div class="section-content">
          <div class="definition-card">
            <div class="definition">
              <h3>区块链是什么？</h3>
              <p>
                区块链是一种分布式数据库技术，它按照时间顺序将数据区块以顺序相连的方式组合成的一种链式数据结构，并以密码学方式保证的不可篡改和不可伪造的分布式账本。
              </p>
            </div>
            <div class="key-features">
              <div class="feature">
                <div class="feature-icon">🔐</div>
                <div class="feature-text">
                  <h4>去中心化</h4>
                  <p>无单一控制点，数据分布在多个节点</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">🔗</div>
                <div class="feature-text">
                  <h4>不可篡改</h4>
                  <p>一旦记录，无法更改或删除</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">👁️</div>
                <div class="feature-text">
                  <h4>透明性</h4>
                  <p>所有交易公开可查（在公链上）</p>
                </div>
              </div>
            </div>
          </div>

          <div class="comparison-table">
            <h3>传统数据库 vs 区块链</h3>
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>传统数据库</th>
                  <th>区块链</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>控制权</td>
                  <td>集中式</td>
                  <td>去中心化</td>
                </tr>
                <tr>
                  <td>数据修改</td>
                  <td>可随时修改</td>
                  <td>不可篡改</td>
                </tr>
                <tr>
                  <td>透明度</td>
                  <td>私有</td>
                  <td>公开透明</td>
                </tr>
                <tr>
                  <td>信任机制</td>
                  <td>依赖中央机构</td>
                  <td>数学和密码学保障</td>
                </tr>
                <tr>
                  <td>故障点</td>
                  <td>单点故障</td>
                  <td>无单点故障</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 区块链比喻 -->
      <div class="section analogy-section">
        <div class="section-header">
          <div class="section-icon">🧩</div>
          <h2>区块链的通俗比喻</h2>
        </div>
        <div class="section-content">
          <div class="analogy-cards">
            <div class="analogy-card">
              <div class="analogy-icon">📒</div>
              <h3>数字账本</h3>
              <p>
                想象一个公开的记账本，每页记录一组交易，每页都有唯一的编号和上一页的指纹（哈希值）。任何人可以查看但不能修改已有记录。
              </p>
            </div>
            <div class="analogy-card">
              <div class="analogy-icon">🧱</div>
              <h3>乐高积木</h3>
              <p>
                每个区块像一块乐高积木，通过特殊接口（哈希值）连接到前一块。要修改中间一块，必须拆开后面所有积木并重新组装，几乎不可能。
              </p>
            </div>
            <div class="analogy-card">
              <div class="analogy-icon">🤝</div>
              <h3>投票系统</h3>
              <p>
                社区成员对交易有效性投票，多数同意才能将新区块加入链中。参与者（矿工/验证者）因贡献获得奖励（代币）。
              </p>
            </div>
          </div>

          <div class="block-structure">
            <h3>区块链结构解析</h3>
            <div class="structure-visual">
              <div class="block-component header">
                <div class="component-title">区块头 (Header)</div>
                <div class="component-details">
                  <div>版本号</div>
                  <div>前一区块哈希</div>
                  <div>默克尔根哈希</div>
                  <div>时间戳</div>
                  <div>难度目标</div>
                  <div>Nonce</div>
                </div>
              </div>
              <div class="block-component body">
                <div class="component-title">区块体 (Body)</div>
                <div class="component-details">
                  <div>交易计数器</div>
                  <div>交易列表</div>
                </div>
              </div>
              <div class="block-link">🔗</div>
              <div class="block-component header">
                <div class="component-title">前一区块头</div>
              </div>
            </div>
            <div class="structure-explain">
              <p>每个区块包含：</p>
              <ul>
                <li><strong>区块头</strong>：元数据，包含前一区块的加密哈希</li>
                <li><strong>区块体</strong>：实际交易数据列表</li>
                <li><strong>哈希值</strong>：区块的唯一数字指纹</li>
              </ul>
              <p>区块之间通过哈希值链接，形成不可篡改的链条</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 区块链作用 -->
      <div class="section application-section">
        <div class="section-header">
          <div class="section-icon">💼</div>
          <h2>区块链的作用与价值</h2>
        </div>
        <div class="section-content">
          <div class="application-grid">
            <div class="app-card">
              <div class="app-icon">💰</div>
              <h3>加密货币</h3>
              <ul>
                <li>比特币作为价值存储</li>
                <li>跨境支付与汇款</li>
                <li>去中心化金融(DeFi)</li>
              </ul>
            </div>
            <div class="app-card">
              <div class="app-icon">📜</div>
              <h3>智能合约</h3>
              <ul>
                <li>自动执行合约条款</li>
                <li>无需中间方介入</li>
                <li>应用于保险、法律等领域</li>
              </ul>
            </div>
            <div class="app-card">
              <div class="app-icon">🆔</div>
              <h3>数字身份</h3>
              <ul>
                <li>自主主权身份</li>
                <li>防止身份盗用</li>
                <li>可验证证书</li>
              </ul>
            </div>
            <div class="app-card">
              <div class="app-icon">📦</div>
              <h3>供应链管理</h3>
              <ul>
                <li>商品溯源追踪</li>
                <li>防止假冒伪劣</li>
                <li>自动化物流管理</li>
              </ul>
            </div>
            <div class="app-card">
              <div class="app-icon">🗳️</div>
              <h3>投票系统</h3>
              <ul>
                <li>防篡改投票记录</li>
                <li>提高选举透明度</li>
                <li>远程安全投票</li>
              </ul>
            </div>
            <div class="app-card">
              <div class="app-icon">🎮</div>
              <h3>NFT与元宇宙</h3>
              <ul>
                <li>数字资产所有权</li>
                <li>游戏内资产交易</li>
                <li>虚拟土地所有权</li>
              </ul>
            </div>
          </div>

          <div class="benefits">
            <h3>区块链的核心价值主张</h3>
            <div class="benefits-grid">
              <div class="benefit-card">
                <div class="benefit-title">信任最小化</div>
                <p>减少对中介机构的依赖，通过数学和密码学建立信任</p>
              </div>
              <div class="benefit-card">
                <div class="benefit-title">抗审查性</div>
                <p>任何人都可以参与网络，交易无法被单方面阻止</p>
              </div>
              <div class="benefit-card">
                <div class="benefit-title">降低交易成本</div>
                <p>消除中间环节，减少交易摩擦和费用</p>
              </div>
              <div class="benefit-card">
                <div class="benefit-title">数据完整性</div>
                <p>历史记录不可篡改，提供可验证的数据来源</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 区块链代币 -->
      <div class="section token-section">
        <div class="section-header">
          <div class="section-icon">🪙</div>
          <h2>区块链代币介绍</h2>
        </div>
        <div class="section-content">
          <div class="token-types">
            <h3>代币分类体系</h3>
            <div class="type-cards">
              <div class="type-card">
                <div class="type-icon">🔷</div>
                <div class="type-title">原生代币</div>
                <p>区块链网络本身的原生加密货币</p>
                <div class="examples">
                  <div class="example">
                    <span>比特币 (BTC)</span>
                    <span>比特币网络</span>
                  </div>
                  <div class="example">
                    <span>以太币 (ETH)</span>
                    <span>以太坊网络</span>
                  </div>
                </div>
              </div>
              <div class="type-card">
                <div class="type-icon">🟢</div>
                <div class="type-title">实用型代币</div>
                <p>提供对产品或服务的访问权限</p>
                <div class="examples">
                  <div class="example">
                    <span>Filecoin (FIL)</span>
                    <span>去中心化存储</span>
                  </div>
                  <div class="example">
                    <span>Chainlink (LINK)</span>
                    <span>预言机服务</span>
                  </div>
                </div>
              </div>
              <div class="type-card">
                <div class="type-icon">🟣</div>
                <div class="type-title">治理代币</div>
                <p>赋予持有者社区治理投票权</p>
                <div class="examples">
                  <div class="example">
                    <span>Uniswap (UNI)</span>
                    <span>DEX协议治理</span>
                  </div>
                  <div class="example">
                    <span>Maker (MKR)</span>
                    <span>稳定币系统治理</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="token-standards">
            <h3>主要代币标准</h3>
            <div class="standards-grid">
              <div class="standard-card">
                <div class="standard-header">
                  <div class="standard-icon">🔼</div>
                  <h4>ERC-20</h4>
                </div>
                <div class="standard-content">
                  <p>可互换代币标准</p>
                  <ul>
                    <li>用于创建类似货币的代币</li>
                    <li>兼容性广泛，交易所普遍支持</li>
                    <li>功能：转账、余额查询等</li>
                  </ul>
                </div>
              </div>
              <div class="standard-card">
                <div class="standard-header">
                  <div class="standard-icon">🖼️</div>
                  <h4>ERC-721</h4>
                </div>
                <div class="standard-content">
                  <p>非同质化代币标准</p>
                  <ul>
                    <li>每个代币独一无二</li>
                    <li>用于数字收藏品、艺术品</li>
                    <li>代表独特资产的所有权</li>
                  </ul>
                </div>
              </div>
              <div class="standard-card">
                <div class="standard-header">
                  <div class="standard-icon">🎫</div>
                  <h4>ERC-1155</h4>
                </div>
                <div class="standard-content">
                  <p>多代币标准</p>
                  <ul>
                    <li>单合约管理多种代币</li>
                    <li>支持同质化和非同质化代币</li>
                    <li>游戏道具的理想选择</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="token-economics">
            <h3>代币经济学关键要素</h3>
            <div class="economics-grid">
              <div class="eco-card">
                <div class="eco-title">发行机制</div>
                <p>初始分配、挖矿奖励、通胀/通缩模型</p>
              </div>
              <div class="eco-card">
                <div class="eco-title">效用设计</div>
                <p>代币在生态系统中的具体用途</p>
              </div>
              <div class="eco-card">
                <div class="eco-title">治理模型</div>
                <p>代币持有者的决策权力范围</p>
              </div>
              <div class="eco-card">
                <div class="eco-title">价值捕获</div>
                <p>代币如何从生态增长中获取价值</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="conclusion">
      <h2>区块链的未来前景</h2>
      <div class="future-directions">
        <div class="direction">
          <div class="dir-icon">⚡</div>
          <div class="dir-content">
            <h3>可扩展性解决方案</h3>
            <p>Layer 2扩容、分片技术、新共识算法</p>
          </div>
        </div>
        <div class="direction">
          <div class="dir-icon">🤝</div>
          <div class="dir-content">
            <h3>跨链互操作性</h3>
            <p>实现不同区块链网络间的资产与数据互通</p>
          </div>
        </div>
        <div class="direction">
          <div class="dir-icon">🏛️</div>
          <div class="dir-content">
            <h3>监管框架完善</h3>
            <p>建立清晰的监管规则促进合规发展</p>
          </div>
        </div>
        <div class="direction">
          <div class="dir-icon">🌐</div>
          <div class="dir-content">
            <h3>Web3与元宇宙</h3>
            <p>构建去中心化的下一代互联网基础设施</p>
          </div>
        </div>
      </div>
      <div class="final-thought">
        <p>
          区块链不仅是技术创新，更是生产关系的变革。它通过去中心化的信任机制，为解决数字时代的信任问题提供了全新的解决方案，正在重塑金融、供应链、数字身份等多个领域的运作方式。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 区块链动画数据
const chainBlocks = ref([
  {
    index: 3,
    hash: '0000a8fc...',
    color: '#e3f2fd',
    data: [
      { from: 'Alice', to: 'Bob', amount: 1.5 },
      { from: 'Charlie', to: 'Dave', amount: 0.75 },
      { from: 'Exchange', to: 'Alice', amount: 3.2 },
    ],
  },
  {
    index: 2,
    hash: '0000c45d...',
    color: '#bbdefb',
    data: [
      { from: 'Bob', to: 'Charlie', amount: 2.1 },
      { from: 'Dave', to: 'Alice', amount: 1.8 },
    ],
  },
  {
    index: 1,
    hash: '0000e9a2...',
    color: '#90caf9',
    data: [
      { from: 'Alice', to: 'Charlie', amount: 0.5 },
      { from: 'Bob', to: 'Dave', amount: 1.2 },
      { from: 'Miner', to: 'Bob', amount: 6.25 },
    ],
  },
])
</script>

<style lang="less" scoped>
@primary-blue: #1976d2;
@secondary-blue: #2196f3;
@light-blue: #bbdefb;
@accent-green: #4caf50;
@accent-orange: #ff9800;
@accent-purple: #9c27b0;
@background-light: #f5f9ff;
@card-bg: #ffffff;
@text-primary: #212121;
@text-secondary: #757575;
@border-color: #e0e0e0;
@shadow-light: 0 4px 12px rgba(0, 0, 0, 0.05);

.blockchain-container {
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
}

.hero-section {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 2rem 0;

  .chain-animation {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 300px;

    .block {
      border-radius: 12px;
      border: 1px solid @border-color;
      box-shadow: @shadow-light;
      overflow: hidden;

      .block-header {
        background-color: fade(@primary-blue, 15%);
        padding: 0.8rem 1rem;
        display: flex;
        justify-content: space-between;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        border-bottom: 1px solid @border-color;

        .block-index {
          font-weight: bold;
          color: @primary-blue;
        }

        .block-hash {
          color: @text-secondary;
          font-size: 0.8rem;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 65%;
        }
      }

      .block-content {
        padding: 0.8rem 1rem;
        background: @card-bg;

        .transaction {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px dashed fade(@border-color, 50%);
          font-size: 0.95rem;

          &:last-child {
            border-bottom: none;
          }

          .tx-from,
          .tx-to {
            font-weight: 500;
            flex: 1;
          }

          .tx-arrow {
            color: @accent-green;
          }

          .tx-amount {
            font-weight: 600;
            color: @primary-blue;
            min-width: 80px;
            text-align: right;
          }
        }
      }
    }
  }

  .hero-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: @primary-blue;
    }

    .subtitle {
      font-size: 1.2rem;
      color: @text-secondary;
      margin-bottom: 1.5rem;
    }

    .hero-stats {
      display: flex;
      gap: 1.5rem;
      margin-top: 1rem;

      .stat {
        text-align: center;
        flex: 1;
        background: @card-bg;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: @shadow-light;

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: @primary-blue;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: @text-secondary;
        }
      }
    }
  }
}

.content-grid {
  display: grid;
  gap: 1.5rem;
}

.section {
  background: @card-bg;
  border-radius: 16px;
  box-shadow: @shadow-light;
  overflow: hidden;

  .section-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1.2rem 1.5rem;
    background: fade(@primary-blue, 8%);
    border-bottom: 1px solid @border-color;

    .section-icon {
      font-size: 1.5rem;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      color: @text-primary;
    }
  }

  .section-content {
    padding: 1.5rem;
  }
}

/* 概念介绍部分 */
.concept-section {
  .definition-card {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    .definition {
      flex: 2;

      h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        color: @primary-blue;
      }
    }

    .key-features {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .feature {
        display: flex;
        gap: 1rem;
        align-items: flex-start;

        .feature-icon {
          font-size: 1.5rem;
          margin-top: 0.2rem;
          color: @primary-blue;
        }

        .feature-text {
          h4 {
            margin: 0 0 0.25rem;
            color: @text-primary;
          }

          p {
            margin: 0;
            font-size: 0.95rem;
            color: @text-secondary;
          }
        }
      }
    }
  }

  .comparison-table {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      font-size: 0.95rem;

      th,
      td {
        padding: 0.8rem 1rem;
        text-align: left;
        border: 1px solid @border-color;
      }

      th {
        background-color: fade(@primary-blue, 10%);
        font-weight: 600;
      }

      tr:nth-child(even) {
        background-color: fade(@primary-blue, 3%);
      }

      tr:hover {
        background-color: fade(@primary-blue, 5%);
      }
    }
  }
}

/* 区块链比喻部分 */
.analogy-section {
  .analogy-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .analogy-card {
      background: fade(@accent-purple, 5%);
      border-radius: 12px;
      padding: 1.5rem;
      border-top: 3px solid @accent-purple;

      .analogy-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0 0 0.8rem;
        color: @accent-purple;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: @text-secondary;
      }
    }
  }

  .block-structure {
    display: flex;
    gap: 1.5rem;

    .structure-visual {
      flex: 1;
      background: fade(@accent-orange, 5%);
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      .block-component {
        width: 100%;
        border: 1px solid @border-color;
        border-radius: 8px;
        overflow: hidden;

        .component-title {
          background: fade(@accent-orange, 15%);
          padding: 0.5rem 1rem;
          font-weight: 600;
          color: darken(@accent-orange, 10%);
        }

        .component-details {
          background: @card-bg;
          padding: 1rem;
          font-size: 0.9rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;

          div {
            padding: 0.3rem;
            background: fade(@accent-orange, 5%);
            border-radius: 4px;
            text-align: center;
          }
        }

        &.header {
          border-left: 3px solid @accent-orange;
        }

        &.body {
          border-left: 3px solid @primary-blue;

          .component-title {
            background: fade(@primary-blue, 15%);
            color: darken(@primary-blue, 10%);
          }

          .component-details div {
            background: fade(@primary-blue, 5%);
          }
        }
      }

      .block-link {
        font-size: 1.5rem;
        margin: 0.2rem 0;
      }
    }

    .structure-explain {
      flex: 1;
      padding: 0.5rem;

      p {
        margin: 0 0 1rem;

        strong {
          color: @primary-blue;
        }
      }

      ul {
        padding-left: 1.2rem;
        margin-bottom: 1rem;

        li {
          margin-bottom: 0.5rem;
        }
      }
    }
  }
}

/* 应用部分 */
.application-section {
  .application-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .app-card {
      background: @card-bg;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: @shadow-light;
      border-top: 3px solid @accent-green;

      .app-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0 0 1rem;
        color: @accent-green;
      }

      ul {
        padding-left: 1rem;
        margin: 0;

        li {
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          color: @text-secondary;
        }
      }
    }
  }

  .benefits {
    h3 {
      text-align: center;
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: @primary-blue;
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;

      .benefit-card {
        background: @card-bg;
        border-left: 3px solid @primary-blue;
        border-radius: 8px;
        padding: 1.2rem;
        box-shadow: @shadow-light;

        .benefit-title {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: @primary-blue;
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: @text-secondary;
        }
      }
    }
  }
}

/* 代币部分 */
.token-section {
  .token-types {
    margin-bottom: 2rem;

    h3 {
      color: @accent-purple;
      margin-top: 0;
    }

    .type-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .type-card {
        background: @card-bg;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: @shadow-light;
        border-top: 3px solid @accent-purple;

        .type-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .type-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: @accent-purple;
        }

        p {
          font-size: 0.95rem;
          color: @text-secondary;
          margin-bottom: 1rem;
        }

        .examples {
          background: fade(@accent-purple, 5%);
          border-radius: 8px;
          overflow: hidden;

          .example {
            display: flex;
            justify-content: space-between;
            padding: 0.8rem 1rem;
            border-bottom: 1px solid @border-color;
            font-size: 0.9rem;

            &:last-child {
              border-bottom: none;
            }

            span:first-child {
              font-weight: 500;
            }

            span:last-child {
              color: @text-secondary;
            }
          }
        }
      }
    }
  }

  .token-standards {
    margin-bottom: 1.5rem;

    h3 {
      color: @primary-blue;
      margin-top: 0;
    }

    .standards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .standard-card {
        background: @card-bg;
        border-radius: 12px;
        box-shadow: @shadow-light;
        border-left: 3px solid @primary-blue;

        .standard-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.2rem;
          background: fade(@primary-blue, 5%);
          border-bottom: 1px solid @border-color;

          .standard-icon {
            font-size: 1.5rem;
          }

          h4 {
            margin: 0;
            color: @primary-blue;
          }
        }

        .standard-content {
          padding: 1.2rem;

          p {
            font-weight: 500;
            margin-top: 0;
            margin-bottom: 1rem;
          }

          ul {
            padding-left: 1.2rem;
            margin: 0;

            li {
              margin-bottom: 0.5rem;
              font-size: 0.95rem;
              color: @text-secondary;
            }
          }
        }
      }
    }
  }

  .token-economics {
    h3 {
      color: @accent-orange;
      margin-top: 0;
    }

    .economics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;

      .eco-card {
        background: fade(@accent-orange, 5%);
        border-radius: 8px;
        padding: 1.2rem;
        border-left: 3px solid @accent-orange;

        .eco-title {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: @accent-orange;
        }

        p {
          margin: 0;
          font-size: 0.9rem;
          color: @text-secondary;
        }
      }
    }
  }
}

.conclusion {
  background: @card-bg;
  border-radius: 16px;
  box-shadow: @shadow-light;
  padding: 2rem;
  margin-top: 2rem;

  h2 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 2rem;
    color: @primary-blue;
  }

  .future-directions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .direction {
      display: flex;
      gap: 1rem;
      align-items: center;

      .dir-icon {
        font-size: 2rem;
        color: @primary-blue;
      }

      .dir-content {
        h3 {
          margin: 0 0 0.5rem;
          color: @text-primary;
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: @text-secondary;
        }
      }
    }
  }

  .final-thought {
    padding: 1.5rem;
    background: fade(@primary-blue, 5%);
    border-radius: 12px;
    border-left: 3px solid @primary-blue;
    font-style: italic;

    p {
      margin: 0;
      font-size: 1.05rem;
      color: @text-primary;
      line-height: 1.7;
    }
  }
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
  }

  .definition-card,
  .block-structure {
    flex-direction: column;
  }
}
</style>
