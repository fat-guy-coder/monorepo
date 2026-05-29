<template>
  <div class="roadmap-container">
    <header class="hero">
      <h1>📘 Python 学习路线与练手项目图谱</h1>
      <p>循序渐进 · 边写边学 · 每个阶段完成后再进入下一个</p>
      <div class="badge-group">
        <span>🐍 20+ 项目</span><span>⚡ 阶段化学习</span><span>🛠️ 实战驱动</span>
      </div>
    </header>

    <!-- 学习原则卡片 -->
    <div class="principles">
      <h2>🎯 学习原则</h2>
      <div class="principles-grid">
        <div class="principle" v-for="(p, idx) in principles" :key="idx">
          <div class="num">{{ idx + 1 }}</div>
          <p>{{ p }}</p>
        </div>
      </div>
    </div>

    <!-- 阶段列表 -->
    <div class="phase-list">
      <div class="phase" v-for="phase in phases" :key="phase.name">
        <div class="phase-header">
          <h2>{{ phase.name }}</h2>
          <span class="duration">{{ phase.duration }}</span>
        </div>
        <p class="goal">{{ phase.goal }}</p>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr><th>顺序</th><th>项目名称</th><th>涉及知识点</th><th>产出</th></tr>
            </thead>
            <tbody>
              <tr v-for="proj in phase.projects" :key="proj.order">
                <td class="order">{{ proj.order }}</td>
                <td class="name">{{ proj.name }}</td>
                <td class="knowledge">{{ proj.knowledge }}</td>
                <td class="output">{{ proj.output }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 项目详解区块（只展示该阶段前两个详细说明） -->
        <div class="details" v-if="phase.details">
          <div class="detail-card" v-for="detail in phase.details" :key="detail.name">
            <h3>📌 {{ detail.name }}</h3>
            <div class="detail-desc">{{ detail.desc }}</div>
            <pre class="code-block"><code>{{ detail.code }}</code></pre>
            <div class="knowledge-tags">{{ detail.knowledge }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 学习顺序建议时间线 -->
    <div class="timeline">
      <h2>⏱️ 学习顺序建议</h2>
      <div class="weeks-grid">
        <div v-for="week in weeks" :key="week.range" class="week-card">
          <div class="week-range">{{ week.range }}</div>
          <div class="week-content">{{ week.content }}</div>
        </div>
      </div>
    </div>

    <!-- 项目结构示意 -->
    <div class="project-structure">
      <h2>📁 推荐项目结构</h2>
      <pre class="tree"><code>apps/python/
├── exercises/           # 每个练习项目
│   ├── project_01_rename_tool.py
│   ├── project_02_text_tool.py
│   └── ...
├── project/             # 完整项目
│   ├── flask_guestbook/
│   ├── fastapi_notes/
│   └── django_blog/
└── README.md</code></pre>
    </div>

    <!-- 资源推荐 -->
    <div class="resources">
      <h2>📚 学习资源推荐</h2>
      <div class="resource-lists">
        <div>
          <h3>官方文档</h3>
          <ul><li><a href="https://docs.python.org/3/tutorial/" target="_blank">Python 官方教程</a></li><li><a href="https://docs.python.org/3/library/" target="_blank">Python 标准库</a></li></ul>
        </div>
        <div>
          <h3>在线教程</h3>
          <ul><li><a href="https://www.w3schools.com/python/" target="_blank">W3Schools Python</a></li><li><a href="https://realpython.com/" target="_blank">Real Python</a></li></ul>
        </div>
        <div>
          <h3>书籍</h3>
          <ul><li>《Python 编程：从入门到实践》</li><li>《Effective Python》</li><li>《Python 进阶》</li></ul>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>💡 不要追求速度，确保每个项目都真正理解了再往下走。如果某个知识点不清楚，停下来查清楚再继续。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface Project {
  order: number;
  name: string;
  knowledge: string;
  output: string;
}

interface PhaseDetail {
  name: string;
  desc: string;
  code: string;
  knowledge: string;
}

interface Phase {
  name: string;
  duration: string;
  goal: string;
  projects: Project[];
  details?: PhaseDetail[];
}

const principles = [
  '先懂概念，再写代码 — 看官方文档/教程理解核心概念',
  '模仿 → 改造 → 原创 — 从抄开始，慢慢加入自己的想法',
  '遇到不会的就去查 — 官方文档、CSDN、StackOverflow 都是好老师',
  '每个项目都要能用 — 写得出来，跑得起来，才算学会'
];

const phases: Phase[] = [
  {
    name: '阶段一：基础语法与工具',
    duration: '1-2 周',
    goal: '掌握 Python 基本语法，能写小工具脚本',
    projects: [
      { order: 1, name: '批量文件重命名工具', knowledge: 'os、pathlib、正则、循环', output: '一个可用的脚本' },
      { order: 2, name: '文本处理工具', knowledge: '字符串操作、正则、文件读写', output: '文本工具' },
      { order: 3, name: '简单爬虫', knowledge: 'requests、BeautifulSoup、JSON', output: '能爬数据的脚本' },
      { order: 4, name: '批量下载器', knowledge: '异步下载、进度条、错误处理', output: '批量下载工具' }
    ],
    details: [
      {
        name: '批量文件重命名工具',
        desc: '功能需求：输入文件夹路径，按规则批量重命名（前缀/后缀/替换/序号），支持预览、确认执行、撤销（记录操作日志）。',
        code: `import os\nimport re\nfrom pathlib import Path\n\n# 核心逻辑：os.listdir / pathlib.Path，re.sub 替换，os.rename 执行，json 记录历史`,
        knowledge: 'os, pathlib, re, json'
      },
      {
        name: '文本处理工具',
        desc: '统计文本字数/行数/词频，批量替换敏感词，导出统计报告。',
        code: `from collections import Counter\n\nwith open('file.txt') as f:\n    text = f.read()\nwords = re.findall(r'\\w+', text)\ncounter = Counter(words)`,
        knowledge: '文件读写, collections.Counter, 正则'
      }
    ]
  },
  {
    name: '阶段二：面向对象与数据结构',
    duration: '1-2 周',
    goal: '理解类与对象，能用数据结构解决实际问题',
    projects: [
      { order: 5, name: '个人通讯录', knowledge: '类设计、dict、持久化', output: '控制台通讯录' },
      { order: 6, name: '任务清单 (Todo)', knowledge: '类继承、列表操作、JSON', output: '可增删改查的 Todo' },
      { order: 7, name: '考试分数统计系统', knowledge: '装饰器、异常处理、文件', output: '统计工具' },
      { order: 8, name: 'ini 配置文件管理器', knowledge: '类封装、configparser', output: '配置文件读写' }
    ],
    details: [
      {
        name: '个人通讯录',
        desc: '添加/删除/修改/搜索联系人，包含姓名、电话、邮箱、地址，数据持久化 JSON。',
        code: `class Contact:\n    def __init__(self, name, phone): ...\nclass AddressBook:\n    def add(self, contact): ...\n    def save(self): json.dump(...)`,
        knowledge: 'class, __str__, json 序列化'
      }
    ]
  },
  {
    name: '阶段三：Web 开发与框架',
    duration: '2-3 周',
    goal: '能写后端接口，理解 Web 工作原理',
    projects: [
      { order: 9, name: 'Flask 留言板', knowledge: 'Flask 基础、路由、Jinja2', output: 'Web 留言板' },
      { order: 10, name: 'FastAPI 个人笔记', knowledge: 'FastAPI、Pydantic、Swagger', output: 'RESTful API' },
      { order: 11, name: 'Django 博客系统', knowledge: 'Django ORM、管理后台、模板', output: '完整博客' }
    ],
    details: [
      {
        name: 'Flask 留言板',
        desc: '发表留言、列表分页、搜索，使用 SQLite 数据库。',
        code: `from flask import Flask, render_template, request\napp = Flask(__name__)\n@app.route('/')\ndef index(): return render_template('index.html')`,
        knowledge: 'Flask, SQLAlchemy, Jinja2'
      },
      {
        name: 'FastAPI 个人笔记',
        desc: 'CRUD 笔记，分类标签，自动生成 Swagger 文档。',
        code: `from fastapi import FastAPI\nfrom pydantic import BaseModel\napp = FastAPI()\n@app.post("/notes")\nasync def create_note(note: Note): ...`,
        knowledge: 'FastAPI, Pydantic, async/await'
      }
    ]
  },
  {
    name: '阶段四：数据库与实战',
    duration: '2-3 周',
    goal: '掌握数据库操作，能开发完整的后端服务',
    projects: [
      { order: 12, name: '个人博客后端', knowledge: 'PostgreSQL、Docker、REST API', output: '博客后端' },
      { order: 13, name: '用户认证系统', knowledge: 'JWT、密码加密、权限', output: '登录注册' },
      { order: 14, name: '文件上传下载服务', knowledge: '文件操作、阿里云 OSS', output: '文件服务' },
      { order: 15, name: '看板管理工具', knowledge: 'WebSocket、任务状态', output: '实时看板' }
    ],
    details: [
      {
        name: '用户认证系统',
        desc: '注册（bcrypt加密）、登录返回 JWT、Token 中间件、角色权限。',
        code: `import bcrypt, jwt\n# 哈希密码: bcrypt.hashpw(password, bcrypt.gensalt())\n# 生成 token: jwt.encode(payload, SECRET, algorithm='HS256')`,
        knowledge: 'bcrypt, PyJWT, 装饰器权限'
      }
    ]
  },
  {
    name: '阶段五：项目实战与进阶',
    duration: '长期',
    goal: '独立完成完整项目，理解工程化实践',
    projects: [
      { order: 16, name: '定时任务管理系统', knowledge: 'APScheduler、Docker', output: '定时任务系统' },
      { order: 17, name: '数据可视化面板', knowledge: 'ECharts、API 数据接入', output: '数据大屏' },
      { order: 18, name: 'ChatGPT 对话助手', knowledge: 'OpenAI API、流式输出', output: 'AI 对话' },
      { order: 19, name: '自动化测试平台', knowledge: 'CI/CD、UnitTest', output: '测试平台' },
      { order: 20, name: '个人知识库', knowledge: 'LangChain、RAG', output: '知识库系统' }
    ]
  }
];

const weeks = [
  { range: '第1周', content: '项目1-2 (脚本工具)' },
  { range: '第2周', content: '项目3-4 (爬虫+下载器)' },
  { range: '第3周', content: '项目5-6 (面向对象)' },
  { range: '第4周', content: '项目7-8 (数据结构)' },
  { range: '第5周', content: '项目9 (Flask)' },
  { range: '第6周', content: '项目10 (FastAPI)' },
  { range: '第7-8周', content: '项目11 (Django)' },
  { range: '第9-10周', content: '项目12-13 (数据库+认证)' },
  { range: '第11-12周', content: '项目14-15 (进阶项目)' }
];
</script>

<style lang="less" scoped>
.roadmap-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: #fafcff;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.hero {
  text-align: center;
  margin-bottom: 2rem;
  h1 { font-size: 2rem; font-weight: 700; background: linear-gradient(135deg, #1e293b, #3b82f6); background-clip: text; -webkit-background-clip: text; color: transparent; }
  p { color: #475569; margin-top: 0.25rem; }
  .badge-group { margin-top: 0.8rem; display: flex; justify-content: center; gap: 0.8rem; span { background: #eef2ff; color: #1e40af; padding: 0.2rem 1rem; border-radius: 2rem; font-size: 0.7rem; font-weight: 500; } }
}

.principles {
  background: white;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;
  h2 { font-size: 1.25rem; margin-top: 0; }
  .principles-grid { display: flex; flex-wrap: wrap; gap: 1rem; .principle { flex: 1; min-width: 200px; display: flex; gap: 0.5rem; align-items: start; .num { background: #3b82f6; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold; flex-shrink: 0; } p { margin: 0; font-size: 0.85rem; line-height: 1.4; } } }
}

.phase {
  background: white;
  border-radius: 1rem;
  margin-bottom: 1.8rem;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  .phase-header { background: #f8fafc; padding: 0.8rem 1.5rem; display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #e2e8f0; h2 { font-size: 1.25rem; margin: 0; } .duration { color: #3b82f6; font-size: 0.8rem; font-weight: 500; } }
  .goal { padding: 0.5rem 1.5rem; margin: 0; font-size: 0.85rem; background: #fefce8; color: #854d0e; border-bottom: 1px solid #e2e8f0; }
  .table-wrapper { overflow-x: auto; padding: 0 1rem 1rem 1rem; table { width: 100%; border-collapse: collapse; font-size: 0.8rem; th, td { padding: 0.6rem 0.5rem; text-align: left; border-bottom: 1px solid #eef2f6; } th { font-weight: 600; color: #1e293b; background: #f9fafb; } .order { width: 50px; } .name { font-weight: 500; } .knowledge { color: #475569; } .output { color: #0f172a; } } }
  .details { padding: 0.5rem 1.5rem 1.2rem; background: #faf9fe; border-top: 1px solid #eef2f6; .detail-card { background: white; border-radius: 0.8rem; padding: 0.8rem; margin-top: 1rem; box-shadow: 0 1px 2px rgba(0,0,0,0.02); h3 { font-size: 0.9rem; margin: 0 0 0.4rem; } .detail-desc { font-size: 0.75rem; color: #334155; } .code-block { background: #1e293b; border-radius: 0.5rem; padding: 0.5rem; font-size: 0.7rem; overflow-x: auto; margin: 0.5rem 0; code { color: #e2e8f0; font-family: monospace; } } .knowledge-tags { font-size: 0.7rem; color: #3b82f6; } } }
}

.timeline {
  background: white;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  margin: 1.8rem 0;
  border: 1px solid #e2e8f0;
  h2 { font-size: 1.2rem; margin-top: 0; }
  .weeks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0.8rem; .week-card { background: #f1f5f9; border-radius: 0.6rem; padding: 0.4rem 0.6rem; text-align: center; .week-range { font-weight: 700; font-size: 0.75rem; color: #0f172a; } .week-content { font-size: 0.7rem; color: #475569; } } }
}

.project-structure {
  background: #1e293b;
  border-radius: 1rem;
  padding: 0.8rem 1.5rem;
  margin: 1.5rem 0;
  .tree { color: #e2e8f0; font-family: monospace; font-size: 0.7rem; margin: 0; overflow-x: auto; }
  h2 { color: white; font-size: 1.1rem; margin-top: 0; }
}

.resources {
  background: white;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border: 1px solid #e2e8f0;
  h2 { margin-top: 0; font-size: 1.2rem; }
  .resource-lists { display: flex; flex-wrap: wrap; gap: 1.5rem; > div { flex: 1; } h3 { font-size: 0.9rem; margin: 0 0 0.4rem; } ul { margin: 0; padding-left: 1rem; li { font-size: 0.8rem; margin: 0.2rem 0; } a { color: #3b82f6; text-decoration: none; &:hover { text-decoration: underline; } } } }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  font-size: 0.75rem;
  color: #5b6e8c;
}

@media (max-width: 720px) {
  .roadmap-container { padding: 1rem; }
  .phase .phase-header { flex-direction: column; align-items: start; gap: 0.2rem; }
  .principles .principles-grid { flex-direction: column; }
  .resource-lists { flex-direction: column; }
}
</style>
