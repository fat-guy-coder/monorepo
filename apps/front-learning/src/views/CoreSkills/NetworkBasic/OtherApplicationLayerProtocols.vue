<template>
  <div class="protocol-container">
    <!-- 头部区域 -->
    <header class="header">
      <h1 class="title">超越HTTP：其他应用层协议基本介绍</h1>
      <p class="subtitle">探索互联网通信的多样化世界</p>
      <div class="network-icon">🌐</div>
    </header>

    <!-- 协议概览 -->
    <div class="overview">
      <div class="overview-card">
        <div class="overview-content">
          <h2>应用层协议的作用</h2>
          <p>应用层协议定义了运行在不同端系统上的应用程序进程如何相互传递报文，包括：</p>
          <ul>
            <li>交换报文的类型（请求、响应等）</li>
            <li>各种报文类型的语法（报文中的字段及描述）</li>
            <li>字段的语义（字段中信息的含义）</li>
            <li>进程何时、如何发送报文及对报文进行响应</li>
          </ul>
          <div class="protocol-stats">
            <div class="stat-item">
              <div class="stat-value">50+</div>
              <div class="stat-label">已注册的应用层协议</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">7</div>
              <div class="stat-label">OSI模型层</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">1980s</div>
              <div class="stat-label">多数基础协议诞生时间</div>
            </div>
          </div>
        </div>
        <div class="overview-image">
          <div class="protocol-layers">
            <div class="layer">应用层</div>
            <div class="layer">表示层</div>
            <div class="layer">会话层</div>
            <div class="layer">传输层</div>
            <div class="layer">网络层</div>
            <div class="layer">数据链路层</div>
            <div class="layer">物理层</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 协议分类 -->
    <div class="categories">
      <h2 class="section-title">协议分类</h2>
      <div class="category-tabs">
        <button v-for="category in categories" :key="category.id" :class="{ active: activeCategory === category.id }"
          @click="activeCategory = category.id">
          <span class="icon">{{ category.icon }}</span>
          {{ category.label }}
        </button>
      </div>
    </div>

    <!-- 协议列表 -->
    <div class="protocol-list">
      <div v-for="protocol in filteredProtocols" :key="protocol.id" class="protocol-card"
        :class="{ expanded: expandedProtocol === protocol.id }" @click="toggleProtocol(protocol.id)">
        <div class="card-header">
          <div class="protocol-icon">{{ protocol.icon }}</div>
          <div class="protocol-info">
            <h3 class="protocol-name">{{ protocol.name }}</h3>
            <div class="protocol-meta">
              <span class="port">端口: {{ protocol.port }}</span>
              <span class="year">创建: {{ protocol.year }}</span>
              <span class="type">{{ protocol.type }}</span>
            </div>
          </div>
          <div class="expand-icon">{{ expandedProtocol === protocol.id ? '−' : '+' }}</div>
        </div>

        <div class="card-content" v-if="expandedProtocol === protocol.id">
          <div class="description">
            <p>{{ protocol.description }}</p>
          </div>

          <div class="details-grid">
            <div class="detail-item">
              <h4>主要功能</h4>
              <ul>
                <li v-for="(feature, index) in protocol.features" :key="index">{{ feature }}</li>
              </ul>
            </div>

            <div class="detail-item">
              <h4>使用场景</h4>
              <ul>
                <li v-for="(scenario, index) in protocol.useCases" :key="index">{{ scenario }}</li>
              </ul>
            </div>

            <div class="detail-item">
              <h4>工作原理</h4>
              <p>{{ protocol.workflow }}</p>
            </div>

            <div class="detail-item">
              <h4>示例命令</h4>
              <pre>{{ protocol.example }}</pre>
            </div>
          </div>

          <div class="security">
            <h4>安全考虑</h4>
            <p>{{ protocol.security }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 协议比较 -->
    <div class="comparison">
      <h2 class="section-title">关键协议比较</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>协议</th>
              <th>端口</th>
              <th>传输层协议</th>
              <th>加密支持</th>
              <th>主要用途</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="protocol in protocols" :key="protocol.id">
              <td>
                <div class="protocol-row">
                  <span class="icon">{{ protocol.icon }}</span>
                  {{ protocol.name }}
                </div>
              </td>
              <td>{{ protocol.port }}</td>
              <td>{{ protocol.transport }}</td>
              <td>
                <span :class="protocol.encryption ? 'enc-yes' : 'enc-no'">
                  {{ protocol.encryption ? '是' : '否' }}
                </span>
              </td>
              <td>{{ protocol.primaryUse }}</td>
              <td>
                <span :class="protocol.active ? 'status-active' : 'status-deprecated'">
                  {{ protocol.active ? '活跃' : '弃用' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
      <p> 网络协议指南 | 应用层协议是互联网通信的基石</p>
      <p>HTTP只是互联网协议生态中的一部分，了解其他协议有助于构建更全面的网络知识体系</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 协议分类
const categories = [
  { id: 'all', label: '全部协议', icon: '📋' },
  { id: 'file', label: '文件传输', icon: '📁' },
  { id: 'email', label: '电子邮件', icon: '✉️' },
  { id: 'remote', label: '远程访问', icon: '💻' },
  { id: 'network', label: '网络服务', icon: '🔌' },
  { id: 'messaging', label: '实时通信', icon: '💬' }
];

const activeCategory = ref('all');

// 当前展开的协议
const expandedProtocol = ref('');

// 协议数据
const protocols = ref([
  {
    id: 'ftp',
    name: 'FTP (文件传输协议)',
    icon: '📁',
    port: '20/21',
    year: '1971',
    type: '文件传输',
    description: 'FTP是用于在计算机网络上在客户端和服务器之间传输计算机文件的标准网络协议。',
    features: [
      '支持文件上传和下载',
      '目录操作（创建、删除、列出）',
      '支持文件重命名和删除',
      '支持匿名访问'
    ],
    useCases: [
      '网站维护和文件上传',
      '企业内部文件共享',
      '软件分发',
      '大型文件传输'
    ],
    workflow: 'FTP使用两个并行TCP连接：一个是控制连接（端口21），用于发送控制信息；另一个是数据连接（端口20），用于实际文件传输。',
    example: `$ ftp example.com\nftp> get file.zip\nftp> put backup.tar.gz`,
    security: '传统FTP以明文传输数据，包括用户名和密码。应使用FTPS(FTP over SSL)或SFTP(SSH File Transfer Protocol)代替以提高安全性。',
    transport: 'TCP',
    encryption: false,
    primaryUse: '文件传输',
    active: true
  },
  {
    id: 'smtp',
    name: 'SMTP (简单邮件传输协议)',
    icon: '📤',
    port: '25/587/465',
    year: '1982',
    type: '电子邮件',
    description: 'SMTP是用于通过Internet协议(IP)网络传输电子邮件的通信协议。',
    features: [
      '发送和转发电子邮件',
      '支持纯文本和HTML邮件',
      '支持附件传输',
      '邮件队列处理'
    ],
    useCases: [
      '电子邮件客户端发送邮件',
      '邮件服务器之间的通信',
      '营销邮件发送',
      '系统通知发送'
    ],
    workflow: 'SMTP客户端连接到SMTP服务器，通过一系列命令(HELO, MAIL FROM, RCPT TO, DATA)发送邮件内容。',
    example: `HELO example.com\nMAIL FROM: <sender@example.com>\nRCPT TO: <receiver@domain.com>\nDATA\nSubject: Test\n\nHello, this is a test email.\n.\nQUIT`,
    security: '传统SMTP不加密通信内容。现代系统使用SMTPS(端口465)或STARTTLS扩展(端口587)提供加密。',
    transport: 'TCP',
    encryption: false,
    primaryUse: '邮件发送',
    active: true
  },
  {
    id: 'pop3',
    name: 'POP3 (邮局协议第3版)',
    icon: '📥',
    port: '110/995',
    year: '1988',
    type: '电子邮件',
    description: 'POP3是用于从邮件服务器检索电子邮件到本地计算机的应用层协议。',
    features: [
      '下载邮件到本地设备',
      '支持保留或删除服务器邮件',
      '基本身份验证',
      '简单轻量级协议'
    ],
    useCases: [
      '桌面电子邮件客户端',
      '离线邮件访问',
      '邮件备份',
      '低带宽环境邮件访问'
    ],
    workflow: '客户端连接到POP3服务器，使用USER和PASS命令认证，然后使用LIST、RETR和DELE等命令管理邮件。',
    example: `$ telnet mail.example.com 110\n+OK POP3 server ready\nUSER username\nPASS password\nLIST\nRETR 1\nDELE 1\nQUIT`,
    security: '标准POP3不加密。POP3S(端口995)提供SSL/TLS加密连接。',
    transport: 'TCP',
    encryption: false,
    primaryUse: '邮件接收',
    active: true
  },
  {
    id: 'imap',
    name: 'IMAP (互联网消息访问协议)',
    icon: '📨',
    port: '143/993',
    year: '1986',
    type: '电子邮件',
    description: 'IMAP允许电子邮件客户端访问和管理存储在邮件服务器上的邮件，支持多设备同步。',
    features: [
      '在服务器上管理邮件',
      '支持多客户端同步',
      '邮件文件夹管理',
      '服务器端邮件搜索'
    ],
    useCases: [
      '多设备邮件访问',
      '企业邮件系统',
      '大型邮件管理',
      '需要服务器搜索的场景'
    ],
    workflow: '客户端连接到IMAP服务器，通过命令选择邮箱文件夹，获取邮件列表和内容，所有操作在服务器上完成。',
    example: `$ openssl s_client -connect mail.example.com:993\nA1 LOGIN username password\nA2 SELECT INBOX\nA3 FETCH 1 BODY[]\nA4 LOGOUT`,
    security: '标准IMAP不加密。IMAPS(端口993)提供SSL/TLS加密连接。',
    transport: 'TCP',
    encryption: false,
    primaryUse: '邮件同步',
    active: true
  },
  {
    id: 'dns',
    name: 'DNS (域名系统)',
    icon: '🔍',
    port: '53',
    year: '1983',
    type: '网络服务',
    description: 'DNS是用于将人类可读的域名转换为机器可读的IP地址的分布式命名系统。',
    features: [
      '域名到IP地址解析',
      'IP地址到域名反向解析',
      '邮件服务器记录(MX)',
      '域名别名(CNAME)'
    ],
    useCases: [
      '网站访问',
      '电子邮件路由',
      '网络服务发现',
      'CDN和负载均衡'
    ],
    workflow: '客户端向DNS解析器发送查询，解析器通过递归查询或迭代查询从根域名服务器开始查找，直到获得最终答案。',
    example: `$ dig example.com\n\n; <<>> DiG 9.16.1 <<>> example.com\n;; ANSWER SECTION:\nexample.com.    3600    IN    A    93.184.216.34`,
    security: '传统DNS没有内置安全机制。DNSSEC提供数据来源认证和数据完整性保护，但不加密通信内容。',
    transport: 'UDP/TCP',
    encryption: false,
    primaryUse: '域名解析',
    active: true
  },
  {
    id: 'dhcp',
    name: 'DHCP (动态主机配置协议)',
    icon: '🌐',
    port: '67/68',
    year: '1993',
    type: '网络服务',
    description: 'DHCP用于在IP网络中自动分配IP地址和其他网络配置参数。',
    features: [
      '自动IP地址分配',
      '子网掩码、网关和DNS服务器分配',
      'IP地址租期管理',
      '支持静态IP保留'
    ],
    useCases: [
      '家庭和企业网络',
      '公共Wi-Fi热点',
      '大型网络管理',
      '移动设备网络接入'
    ],
    workflow: '客户端广播DHCPDISCOVER消息，服务器响应DHCPOFFER，客户端发送DHCPREQUEST请求地址，服务器确认DHCPACK。',
    example: `1. Client: DHCPDISCOVER (Broadcast)\n2. Server: DHCPOFFER\n3. Client: DHCPREQUEST\n4. Server: DHCPACK`,
    security: 'DHCP没有内置安全机制，易受欺骗攻击。DHCP Snooping和802.1X认证可增强安全性。',
    transport: 'UDP',
    encryption: false,
    primaryUse: 'IP地址分配',
    active: true
  },
  {
    id: 'ssh',
    name: 'SSH (安全外壳协议)',
    icon: '🔒',
    port: '22',
    year: '1995',
    type: '远程访问',
    description: 'SSH提供加密的网络服务，用于在不安全的网络上安全地运行网络服务。',
    features: [
      '安全远程登录',
      '文件安全传输',
      '端口转发和隧道',
      '公钥认证'
    ],
    useCases: [
      '服务器远程管理',
      '安全文件传输',
      '安全数据库访问',
      '远程命令执行'
    ],
    workflow: '客户端和服务器协商加密算法，交换密钥建立安全通道，然后进行用户认证和会话通信。',
    example: `$ ssh username@example.com\nusername@example.com's password: \nLast login: Mon Oct 30 10:00:00 2023 from 192.168.1.100\n$ `,
    security: 'SSH提供强大的加密和认证机制，是Telnet的安全替代品。',
    transport: 'TCP',
    encryption: true,
    primaryUse: '安全远程访问',
    active: true
  },
  {
    id: 'telnet',
    name: 'Telnet',
    icon: '🖥️',
    port: '23',
    year: '1969',
    type: '远程访问',
    description: 'Telnet是一种用于双向交互式文本导向通信的应用层协议。',
    features: [
      '远程终端访问',
      '简单文本界面',
      '支持多种终端类型',
      '基础网络连接测试'
    ],
    useCases: [
      '旧系统维护',
      '网络设备管理',
      '协议调试',
      '教学演示'
    ],
    workflow: '客户端连接到Telnet服务器，通过TCP连接发送和接收文本命令，所有通信以明文进行。',
    example: `$ telnet example.com 23\nTrying 93.184.216.34...\nConnected to example.com.\nEscape character is '^]'.\nlogin: `,
    security: 'Telnet以明文传输所有数据，包括密码。不应在公共网络上使用，已被SSH取代。',
    transport: 'TCP',
    encryption: false,
    primaryUse: '远程终端',
    active: false
  },
  {
    id: 'sip',
    name: 'SIP (会话发起协议)',
    icon: '📞',
    port: '5060/5061',
    year: '1996',
    type: '实时通信',
    description: 'SIP是用于创建、修改和终止多媒体会话（如VoIP电话和视频会议）的应用层协议。',
    features: [
      '建立和终止会话',
      '邀请参与者加入会话',
      '修改现有会话参数',
      '支持即时消息'
    ],
    useCases: [
      'VoIP电话系统',
      '视频会议',
      '在线游戏通信',
      '即时消息系统'
    ],
    workflow: '客户端发送INVITE请求，服务器响应100 Trying，180 Ringing，最终200 OK建立会话。',
    example: `INVITE sip:bob@example.com SIP/2.0\nVia: SIP/2.0/UDP alice.example.com:5060\nFrom: Alice <sip:alice@example.com>\nTo: Bob <sip:bob@example.com>`,
    security: '标准SIP不加密。SIPS(基于TLS)和SRTP(安全实时传输协议)提供安全通信。',
    transport: 'UDP/TCP',
    encryption: false,
    primaryUse: '多媒体会话',
    active: true
  }
]);

// 切换协议展开状态
const toggleProtocol = (id: string) => {
  expandedProtocol.value = expandedProtocol.value === id ? '' : id;
};

// 过滤协议
const filteredProtocols = computed(() => {
  if (activeCategory.value === 'all') return protocols.value;
  return protocols.value.filter(protocol => protocol.type.includes(
    activeCategory.value === 'file' ? '文件' :
      activeCategory.value === 'email' ? '电子邮' :
        activeCategory.value === 'remote' ? '访问' :
          activeCategory.value === 'network' ? '服务' :
            '通信'
  ));
});
</script>

<style lang="less" scoped>


:root {
  --primary: #2c3e50;
  --secondary: #3498db;
  --accent: #2ecc71;
  --light: #ecf0f1;
  --dark: #34495e;
  --gray: #95a5a6;
  --light-gray: #bdc3c7;
  --terminal-bg: #1e1e1e;
  --terminal-green: #4ec9b0;
  --border-radius: 10px;
  --box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.protocol-container {
  font-family: 'Roboto', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  color: var(--primary);
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;

  .title {
    font-size: 2.8rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
    background: linear-gradient(45deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.4rem;
    color: var(--gray);
    font-weight: 400;
    margin-bottom: 1rem;
  }

  .network-icon {
    font-size: 5rem;
    opacity: 0.1;
    position: absolute;
    top: -30px;
    right: 0;
    z-index: -1;
    transform: rotate(15deg);
  }
}

.overview {
  margin-bottom: 3rem;

  .overview-card {
    display: flex;
    background: white;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--box-shadow);

    .overview-content {
      flex: 1;
      padding: 2rem;

      h2 {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        color: var(--primary);
        position: relative;
        padding-bottom: 0.8rem;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: var(--secondary);
        }
      }

      p {
        margin-bottom: 1.5rem;
        font-size: 1.1rem;
        line-height: 1.8;
      }

      ul {
        list-style: none;
        margin-bottom: 2rem;

        li {
          padding: 0.5rem 0;
          position: relative;
          padding-left: 1.8rem;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--secondary);
            font-size: 1.5rem;
          }
        }
      }
    }

    .overview-image {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f0f4f8;
      padding: 1rem;
    }
  }

  .protocol-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;

    .stat-item {
      text-align: center;
      padding: 1rem;
      background: #f8fafc;
      border-radius: var(--border-radius);
      transition: var(--transition);

      &:hover {
        transform: translateY(-5px);
        box-shadow: var(--box-shadow);
      }

      .stat-value {
        font-size: 2rem;
        font-weight: 700;
        color: var(--secondary);
        margin-bottom: 0.5rem;
      }

      .stat-label {
        font-size: 0.9rem;
        color: var(--gray);
      }
    }
  }
}

.protocol-layers {
  display: flex;
  flex-direction: column;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);

  .layer {
    padding: 1.2rem;
    background: white;
    border-bottom: 1px solid #eee;
    text-align: center;
    font-weight: 500;

    &:first-child {
      background: #3498db;
      color: white;
      font-weight: 700;
    }

    &:nth-child(2) {
      background: #e3f2fd;
    }

    &:nth-child(3) {
      background: #f0f4f8;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

.section-title {
  font-size: 2rem;
  color: var(--primary);
  margin: 3rem 0 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 3px solid var(--secondary);
  display: inline-block;
}

.categories {
  margin-bottom: 2rem;

  .category-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    button {
      display: flex;
      align-items: center;
      padding: 0.8rem 1.5rem;
      background: white;
      border: 2px solid #ddd;
      border-radius: var(--border-radius);
      font-size: 1rem;
      font-weight: 500;
      color: var(--dark);
      cursor: pointer;
      transition: var(--transition);

      .icon {
        margin-right: 0.8rem;
        font-size: 1.2rem;
      }

      &.active {
        border-color: var(--secondary);
        background: #e3f2fd;
        color: var(--secondary);
        font-weight: 600;
      }

      &:hover {
        border-color: var(--secondary);
      }
    }
  }
}

.protocol-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.protocol-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  &.expanded {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }

  .card-header {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    background: #f8fafc;

    .protocol-icon {
      font-size: 2.5rem;
      margin-right: 1.5rem;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e3f2fd;
      border-radius: 50%;
    }

    .protocol-info {
      flex: 1;

      .protocol-name {
        font-size: 1.4rem;
        margin-bottom: 0.5rem;
        color: var(--dark);
      }

      .protocol-meta {
        display: flex;
        gap: 1rem;
        font-size: 0.9rem;
        color: var(--gray);

        .port,
        .year {
          background: #f0f4f8;
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
        }

        .type {
          font-weight: 500;
          color: var(--secondary);
        }
      }
    }

    .expand-icon {
      font-size: 1.8rem;
      font-weight: 300;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--gray);
    }
  }

  .card-content {
    padding: 0 1.5rem;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease;

    .description {
      padding: 1.5rem 0;
      border-bottom: 1px solid #eee;
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }

  &.expanded .card-content {
    max-height: 1500px;
    padding-bottom: 1.5rem;
  }

  .details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;

    .detail-item {
      h4 {
        font-size: 1.1rem;
        margin-bottom: 0.8rem;
        color: var(--dark);
        position: relative;
        padding-bottom: 0.5rem;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: var(--secondary);
        }
      }

      ul {
        list-style: none;

        li {
          padding: 0.5rem 0;
          position: relative;
          padding-left: 1.5rem;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--secondary);
            font-size: 1.2rem;
          }
        }
      }

      p {
        line-height: 1.8;
      }

      pre {
        background: var(--terminal-bg);
        color: var(--terminal-green);
        padding: 1rem;
        border-radius: 6px;
        font-family: 'Roboto Mono', monospace;
        font-size: 0.9rem;
        overflow-x: auto;
      }
    }
  }

  .security {
    background: #fff8e1;
    border-radius: var(--border-radius);
    padding: 1.5rem;
    margin-top: 1rem;

    h4 {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
      color: var(--dark);
    }

    p {
      line-height: 1.8;
    }
  }
}

.comparison {
  margin-bottom: 3rem;

  .comparison-table {
    background: white;
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--box-shadow);
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #eee;
      }

      th {
        background: #f8fafc;
        font-weight: 600;
        color: var(--dark);
        position: sticky;
        top: 0;
      }

      tr:last-child td {
        border-bottom: none;
      }

      tr:hover td {
        background: #f8fafc;
      }
    }
  }

  .protocol-row {
    display: flex;
    align-items: center;

    .icon {
      margin-right: 0.8rem;
      font-size: 1.2rem;
    }
  }

  .enc-yes {
    color: var(--accent);
    font-weight: 500;
  }

  .enc-no {
    color: var(--danger);
    font-weight: 500;
  }

  .status-active {
    color: var(--accent);
    font-weight: 500;
  }

  .status-deprecated {
    color: var(--danger);
    font-weight: 500;
  }
}

.footer {
  text-align: center;
  padding: 2rem 0;
  margin-top: 3rem;
  color: var(--gray);
  font-size: 0.9rem;
  border-top: 1px solid #eee;

  p {
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 1100px) {
  .protocol-list {
    grid-template-columns: 1fr;
  }

  .overview-card {
    flex-direction: column;
  }
}

@media (max-width: 600px) {
  .header {
    .title {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }

    .network-icon {
      font-size: 3rem;
      top: -10px;
    }
  }

  .section-title {
    font-size: 1.6rem;
  }

  .details-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
