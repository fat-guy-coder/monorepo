<template>
  <div class="server-intro">
    <header class="header">
      <h1>服务器技术基本指南</h1>
      <p>从基础概念到工作原理的基本指南</p>
    </header>

    <div class="content-container">
      <section class="concept-section">
        <div class="section-header">
          <div class="icon">📚</div>
          <h2>服务器基础概念</h2>
        </div>
        <div class="content-card">
          <h3>什么是服务器？</h3>
          <p>服务器是一种专门设计用于处理请求并为其他计算机（称为客户端）提供服务的计算机系统或程序。它可以是物理硬件设备，也可以是运行在硬件上的软件应用程序。</p>

          <div class="characteristics">
            <div class="characteristic">
              <div class="char-icon">⚡</div>
              <h4>高性能</h4>
              <p>强大的CPU、大容量内存和快速存储</p>
            </div>
            <div class="characteristic">
              <div class="char-icon">🔌</div>
              <h4>持续运行</h4>
              <p>24/7不间断运行，保证服务可用性</p>
            </div>
            <div class="characteristic">
              <div class="char-icon">🛡️</div>
              <h4>高可靠性</h4>
              <p>冗余组件设计，减少故障风险</p>
            </div>
          </div>

          <div class="client-server">
            <div class="client">
              <div class="device">💻</div>
              <h4>客户端</h4>
              <ul>
                <li>发起请求</li>
                <li>接收响应</li>
                <li>显示结果</li>
              </ul>
            </div>
            <div class="arrow">⇨</div>
            <div class="server">
              <div class="device">🖥️</div>
              <h4>服务器</h4>
              <ul>
                <li>接收请求</li>
                <li>处理请求</li>
                <li>返回响应</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="classification-section">
        <div class="section-header">
          <div class="icon">📊</div>
          <h2>服务器分类</h2>
        </div>
        <div class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="tab-content">
          <div v-if="activeTab === 'form'" class="form-factors">
            <div class="factor">
              <div class="factor-icon">📦</div>
              <h3>塔式服务器</h3>
              <p>独立的立式机箱，适合小型企业</p>
              <ul>
                <li>优点：成本低，易于部署</li>
                <li>缺点：扩展性有限</li>
              </ul>
            </div>
            <div class="factor">
              <div class="factor-icon">📚</div>
              <h3>机架式服务器</h3>
              <p>标准尺寸设计，可安装在机柜中</p>
              <ul>
                <li>优点：空间效率高，可扩展</li>
                <li>缺点：散热要求高</li>
              </ul>
            </div>
            <div class="factor">
              <div class="factor-icon">🔌</div>
              <h3>刀片式服务器</h3>
              <p>多个服务器模块共享机箱资源</p>
              <ul>
                <li>优点：高密度，管理方便</li>
                <li>缺点：初始成本高</li>
              </ul>
            </div>
          </div>

          <div v-if="activeTab === 'purpose'" class="purpose-types">
            <div class="server-type">
              <div class="server-icon">🌐</div>
              <h3>Web服务器</h3>
              <p>处理HTTP请求，提供网页内容</p>
              <p>示例: Apache, Nginx, IIS</p>
            </div>
            <div class="server-type">
              <div class="server-icon">📧</div>
              <h3>邮件服务器</h3>
              <p>发送、接收和存储电子邮件</p>
              <p>示例: Exchange, Postfix, Sendmail</p>
            </div>
            <div class="server-type">
              <div class="server-icon">💾</div>
              <h3>数据库服务器</h3>
              <p>存储、管理和提供数据库访问</p>
              <p>示例: MySQL, SQL Server, Oracle</p>
            </div>
            <div class="server-type">
              <div class="server-icon">📂</div>
              <h3>文件服务器</h3>
              <p>集中存储和管理文件资源</p>
              <p>示例: Windows File Server, Samba, NAS</p>
            </div>
          </div>
        </div>
      </section>

      <section class="role-section">
        <div class="section-header">
          <div class="icon">💡</div>
          <h2>服务器的作用</h2>
        </div>

        <div class="roles">
          <div class="role">
            <div class="role-icon">🔒</div>
            <h3>数据集中管理</h3>
            <p>提供统一的数据存储和管理平台，确保数据的一致性和安全性</p>
          </div>
          <div class="role">
            <div class="role-icon">🤝</div>
            <h3>资源共享</h3>
            <p>允许多个用户共享硬件、软件和数据资源</p>
          </div>
          <div class="role">
            <div class="role-icon">🚀</div>
            <h3>提高效率</h3>
            <p>通过集中处理减少客户端负载，优化资源使用</p>
          </div>
          <div class="role">
            <div class="role-icon">🛡️</div>
            <h3>增强安全性</h3>
            <p>集中实施安全策略，保护数据和系统安全</p>
          </div>
        </div>
      </section>

      <section class="principle-section">
        <div class="section-header">
          <div class="icon">🔧</div>
          <h2>服务器工作原理</h2>
        </div>

        <div class="workflow">
          <div class="step">
            <div class="step-number">1</div>
            <h3>请求接收</h3>
            <p>客户端通过网络发送请求到服务器</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-number">2</div>
            <h3>请求解析</h3>
            <p>服务器软件解析请求，确定所需资源</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-number">3</div>
            <h3>处理请求</h3>
            <p>CPU执行计算，访问存储设备获取数据</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-number">4</div>
            <h3>生成响应</h3>
            <p>服务器准备响应数据</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-number">5</div>
            <h3>发送响应</h3>
            <p>通过网络将响应发送回客户端</p>
          </div>
        </div>

        <div class="server-architecture">
          <h3>服务器架构组成</h3>
          <div class="architecture-grid">
            <div class="component">
              <div class="comp-icon">🧠</div>
              <h4>处理器(CPU)</h4>
              <p>执行计算和处理指令</p>
            </div>
            <div class="component">
              <div class="comp-icon">💾</div>
              <h4>内存(RAM)</h4>
              <p>临时存储运行中的数据</p>
            </div>
            <div class="component">
              <div class="comp-icon">💽</div>
              <h4>存储设备</h4>
              <p>HDD/SSD，持久化存储数据</p>
            </div>
            <div class="component">
              <div class="comp-icon">📡</div>
              <h4>网络接口</h4>
              <p>连接服务器到网络</p>
            </div>
            <div class="component">
              <div class="comp-icon">🔌</div>
              <h4>电源系统</h4>
              <p>冗余电源确保持续供电</p>
            </div>
            <div class="component">
              <div class="comp-icon">🌬️</div>
              <h4>冷却系统</h4>
              <p>防止硬件过热</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 服务器分类标签
const tabs = [
  { id: 'form', label: '按外形分类' },
  { id: 'purpose', label: '按用途分类' }
];

const activeTab = ref('form');
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@accent-color: #4895ef;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2b2d42;
@border-color: #e9ecef;
@success-color: #4cc9f0;
@info-color: #4895ef;
@warning-color: #f72585;

.server-intro {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: @text-color;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  min-height: 100vh;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: linear-gradient(120deg, @primary-color, @secondary-color);
  border-radius: 12px;
  color: white;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.8rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid @primary-color;

  .icon {
    font-size: 2rem;
    background: @primary-color;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
  }
}

.content-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  h3 {
    color: @primary-color;
    margin-bottom: 1.2rem;
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.8;
  }
}

.characteristics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;

  .characteristic {
    background: @light-bg;
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;

    .char-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h4 {
      color: @secondary-color;
      margin-bottom: 0.5rem;
    }
  }
}

.client-server {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  .client, .server {
    background: @light-bg;
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;
    flex: 1;
    min-width: 250px;
    max-width: 300px;

    .device {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    h4 {
      color: @secondary-color;
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;
      text-align: left;
      padding: 0 1rem;

      li {
        padding: 0.5rem 0;
        border-bottom: 1px dashed @border-color;

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  .arrow {
    font-size: 2rem;
    color: @primary-color;
    font-weight: bold;
  }
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  button {
    flex: 1;
    padding: 1rem;
    background: @light-bg;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: lighten(@primary-color, 40%);
    }

    &.active {
      background: @primary-color;
      color: white;
      box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
    }
  }
}

.tab-content {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.form-factors, .purpose-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  .factor, .server-type {
    background: @light-bg;
    border-radius: 10px;
    padding: 1.8rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .factor-icon, .server-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      color: @secondary-color;
      margin-bottom: 1rem;
    }

    ul {
      padding-left: 1.2rem;
      margin-top: 1rem;

      li {
        padding: 0.3rem 0;
      }
    }
  }
}

.roles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.8rem;

  .role {
    background: @card-bg;
    border-radius: 10px;
    padding: 1.8rem;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    .role-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      color: @primary-color;
      margin-bottom: 1rem;
    }
  }
}

.workflow {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;

  .step {
    background: linear-gradient(135deg, @primary-color, @accent-color);
    color: white;
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;
    min-width: 150px;
    flex: 1;

    .step-number {
      font-size: 1.8rem;
      font-weight: bold;
      background: rgba(255, 255, 255, 0.2);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }

    h3 {
      margin-bottom: 0.5rem;
      font-size: 1.3rem;
    }
  }

  .arrow {
    font-size: 1.8rem;
    color: @primary-color;
    font-weight: bold;
  }
}

.server-architecture {
  margin-top: 3rem;

  h3 {
    text-align: center;
    color: @secondary-color;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
}

.architecture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;

  .component {
    background: @light-bg;
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    }

    .comp-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h4 {
      color: @primary-color;
      margin-bottom: 0.5rem;
    }
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2.2rem;
  }

  .workflow {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      margin: 0.5rem 0;
    }
  }

  .client-server {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      margin: 1rem 0;
    }
  }
}
</style>
