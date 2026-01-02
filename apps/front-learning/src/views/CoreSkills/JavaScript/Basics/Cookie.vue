<template>
  <div class="cookie-container">
    <h1 class="main-title">JavaScript Cookie 基本指南</h1>

    <h2>
      <p>Cookie 是由 Web 服务器发送到用户浏览器并保存在本地的小型数据文件。它们通常用于存储用户的偏好、会话信息以及其他需要持久化的数据，以便在用户访问同一网站时提供更好的体验。</p>
      <p>Cookie 的常见用途包括用户身份验证、跟踪用户行为、保存设置等。</p>
    </h2>

    <section class="cookie-section">
      <h2 class="section-title">🍪 操作</h2>
      <div class="operation-grid">
        <pre><code>
          读取: document.cookie
          写入：document.cookie = newCookie
          删除：document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
          设置：document.cookie = 'name=value; expires=expiration_date; path=path; domain=domain; secure'
          禁止js读取：document.cookie = 'name=value; HttpOnly'
          禁止js写入：document.cookie = 'name=value; Secure'
        </code></pre>
      </div>
    </section>

    <section class="cookie-section">
      <h2 class="section-title">📄 Cookie 格式</h2>
      <div class="format-description">
        <p>Cookie 的格式：键值对形式的字符串</p>
        <pre><code>
        name=value; expires=expiration_date; path=path; domain=domain; secure
      </code></pre>
        <p>其中：</p>
        <ul>
          <li><strong>name</strong>: Cookie 的名称</li>
          <li><strong>value</strong>: Cookie 的值</li>
          <li><strong>expires</strong>: Cookie 的过期时间</li>
          <li><strong>path</strong>: Cookie 的有效路径</li>
          <li><strong>domain</strong>: Cookie 的有效域名</li>
          <li><strong>secure</strong>: 仅在 HTTPS 连接中传输</li>
        </ul>
      </div>
    </section>

    <section class="cookie-section">
      <h2 class="section-title">📋 使用场景</h2>
      <div class="scenario-grid">
        <div v-for="scene in scenarios" :key="scene.title" class="scenario-card">
          <h3>{{ scene.title }}</h3>
          <p>{{ scene.desc }}</p>
          <div class="case-tags">
            <span v-for="tag in scene.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="cookie-section">
      <h2 class="section-title">✅ Cookie 的优缺点</h2>
      <div class="pros-cons-grid">
        <h3>优点:</h3>
        <ul>
          <li>可以存储用户偏好，提升用户体验</li>
          <li>支持跨会话持久化数据</li>
          <li>简单易用，广泛支持</li>
        </ul>
        <h3>缺点:</h3>
        <ul>
          <li>存储空间有限（每个Cookie约4KB）</li>
          <li>可能被用户禁用或删除</li>
          <li>安全性问题，可能被用于跟踪用户行为</li>
        </ul>
      </div>
    </section>

    <section class="cookie-section">
      <h2 class="section-title">⚠️ 注意事项</h2>
      <div class="notice-grid">
        <div v-for="(note, index) in notices" :key="index" class="notice-card">
          <div class="notice-icon">❗</div>
          <p>{{ note }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

interface UseCase {
  title: string
  desc: string
  tags: string[]
}


const scenarios: UseCase[] = [
  {
    title: '用户身份验证',
    desc: '存储会话标识或访问令牌',
    tags: ['JWT', 'SessionID', '自动登录']
  },
  {
    title: '个性化设置',
    desc: '保存用户主题偏好和语言设置',
    tags: ['深色模式', '语言切换', '布局偏好']
  },
  {
    title: '行为追踪',
    desc: '记录用户访问信息用于分析',
    tags: ['首次访问', '页面停留', '来源追踪']
  },
  {
    title: '购物车功能',
    desc: '保存用户购物车中的商品信息',
    tags: ['购物车', '商品ID', '数量']
  },
  {
    title: '用户偏好',
    desc: '存储用户的语言和地区设置',
    tags: ['语言', '地区', '偏好设置']
  },
  {
    title: '广告个性化',
    desc: '根据用户行为展示个性化广告',
    tags: ['广告', '个性化', '用户行为']
  },
  {
    title: '会话管理',
    desc: '在用户会话期间存储状态信息',
    tags: ['会话', '状态', '用户体验']
  }
]

const notices: string[] = [
  '单个域名下最多存储50个Cookie',
  '每个Cookie大小限制约4KB',
  '敏感信息需设置HttpOnly和Secure标志',
  '需遵守GDPR等隐私保护法规'
]

// Cookie操作工具函数
const setCookie = (
  name: string,
  value: string,
  options: {
    expires?: number
    path?: string
    domain?: string
    secure?: boolean
  } = {}
): void => {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (options.expires) {
    const d = new Date()
    d.setTime(d.getTime() + options.expires * 864e5)
    cookie += `; expires=${d.toUTCString()}`
  }

  if (options.path) cookie += `; path=${options.path}`
  if (options.domain) cookie += `; domain=${options.domain}`
  if (options.secure) cookie += '; secure'

  document.cookie = cookie
}

const getCookie = (name: string): string | undefined => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(`${encodeURIComponent(name)}=`))
    ?.split('=')[1]
    ?.replace(/(%[0-9A-F]{2})+/g, decodeURIComponent)
}

const deleteCookie = (
  name: string,
  options: { path?: string; domain?: string } = {}
): void => {
  setCookie(name, '', {
    ...options,
    expires: -1
  })
}
</script>

<style scoped>
.cookie-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #2d3748;
}

.main-title {
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.6rem;
  background: linear-gradient(45deg, #2c3e50, #42b983);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.operation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.operation-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid #42b983;
  transition: transform 0.2s;
}

.operation-card:hover {
  transform: translateY(-3px);
}

.op-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.code-example {
  background: #1e293b;
  color: #f8fafc;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  margin-top: 1rem;
  overflow-x: auto;
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.case-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.case-tags span {
  background: #e2e8f0;
  color: #475569;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85em;
}

.notice-grid {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}

.notice-card {
  display: flex;
  align-items: start;
  gap: 1rem;
  padding: 1.2rem;
  background: #fff3cd;
  border-radius: 8px;
  color: #856404;
}

.notice-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.section-title {
  color: #2c3e50;
  margin: 3rem 0 1.5rem;
  font-size: 1.8rem;
  font-weight: 600;
}
</style>
