# Python 学习路线与练习项目

> 循序渐近，边写边学。每个阶段完成后，再进入下一个。

---

## 学习原则

1. **先懂概念，再写代码** - 看官方文档/教程理解核心概念
2. **模仿 -> 改造 -> 原创** - 从抄开始，慢慢加入自己的想法
3. **遇到不会的就去查** - 官方文档、CSDN、StackOverflow 都是好老师
4. **每个项目都要能用** - 写得出来，跑得起来，才算学会

---

## 阶段一：基础语法与工具 (1-2 周)

### 目标
掌握 Python 基本语法，能写小工具脚本。

### 项目列表

| 顺序 | 项目名称 | 涉及知识点 | 产出 |
|------|---------|-----------|------|
| 1 | **批量文件重命名工具** | os、pathlib、正则、循环 | 一个可用的脚本 |
| 2 | **文本处理工具** | 字符串操作、正则、文件读写 | 一个文本工具 |
| 3 | **简单爬虫** | requests、BeautifulSoup、JSON | 能爬数据的脚本 |
| 4 | **批量下载器** | 异步下载、进度条、错误处理 | 批量下载工具 |

### 项目 1 详解：批量文件重命名工具

```python
# 功能需求
- 输入文件夹路径
- 按规则批量重命名（前缀/后缀/替换/序号）
- 支持预览，确认后再执行
- 支持撤销（记录操作日志）

# 涉及知识
- os.listdir() / pathlib.Path
- re.sub() 正则替换
- shuyil.rename() / shutil.move()
- json 记录操作历史

# 产出文件
apps/python/exercises/project_01_rename_tool.py
```

### 项目 2 详解：文本处理工具

```python
# 功能需求
- 统计文本字数/行数/词频
- 批量替换敏感词
- 导出统计报告

# 涉及知识
- open() / with 语句
- str.count() / re.findall()
- collections.Counter
- json / csv 导出

# 产出文件
apps/python/exercises/project_02_text_tool.py
```

### 项目 3 详解：简单爬虫

```python
# 功能需求
- 爬取网页标题和链接
- 爬取图片
- 存储到本地或数据库

# 涉及知识
- requests.get() / headers
- BeautifulSoup 解析
- json 保存
- time.sleep() 防止封禁

# 产出文件
apps/python/exercises/project_03_web_scraper.py
```

---

## 阶段二：面向对象与数据结构 (1-2 周)

### 目标
理解类与对象，能用数据结构解决实际问题。

### 项目列表

| 顺序 | 项目名称 | 涉及知识点 | 产出 |
|------|---------|-----------|------|
| 5 | **个人通讯录** | 类设计、dict、持久化 | 控制台通讯录 |
| 6 | **任务清单 (Todo)** | 类继承、列表操作、JSON | 可增删改查的 Todo |
| 7 | **考试分数统计系统** | 装饰器、异常处理、文件 | 一个统计工具 |
| 8 | **ini 配置文件管理器** | 类封装、configparser | 配置文件读写 |

### 项目 5 详解：个人通讯录

```python
# 功能需求
- 添加/删除/修改/搜索联系人
- 联系人包含：姓名、电话、邮箱、地址
- 数据持久化到 JSON

# 涉及知识
- class Contact: 定义联系人
- class AddressBook: 封装所有操作
- __str__ / __repr__ 魔术方法
- json.load() / json.dump()

# 产出文件
apps/python/exercises/project_05_address_book.py
```

### 项目 6 详解：任务清单 (Todo)

```python
# 功能需求
- 添加任务（标题、描述、优先级、截止日期）
- 完成任务 / 删除任务
- 按优先级/日期排序
- 持久化存储

# 涉及知识
- class Task: 任务类
- class TodoList: 任务列表管理
- from datetime import datetime
- 继承与组合
- enumerate / sorted / filter

# 产出文件
apps/python/exercises/project_06_todo_list.py
```

---

## 阶段三：Web 开发与框架 (2-3 周)

### 目标
能写后端接口，理解 Web 工作原理。

### 项目列表

| 顺序 | 项目名称 | 涉及知识点 | 产出 |
|------|---------|-----------|------|
| 9 | **Flask 留言板** | Flask 基础、路由、Jinja2 | Web 留言板 |
| 10 | **FastAPI 个人笔记** | FastAPI、Pydantic、Swagger | RESTful API |
| 11 | **Django 博客系统** | Django ORM、管理后台、模板 | 完整博客 |

### 项目 9 详解：Flask 留言板

```python
# 功能需求
- 发表留言（标题、内容、作者）
- 查看留言列表
- 留言分页
- 留言搜索

# 涉及知识
- Flask 路由与视图函数
- render_template / redirect / url_for
- Jinja2 模板语法
- SQLite 数据库
- Flask-SQLAlchemy

# 产出文件
apps/python/project/flask_guestbook/
```

### 项目 10 详解：FastAPI 个人笔记

```python
# 功能需求
- CRUD 笔记（创建/读取/更新/删除）
- 笔记分类标签
- RESTful API 设计
- Swagger 自动文档

# 涉及知识
- FastAPI 路由与依赖注入
- Pydantic 数据验证
- async / await 异步
- SQLite + SQLAlchemy
- uvicorn 运行服务器

# 产出文件
apps/python/project/fastapi_notes/
```

---

## 阶段四：数据库与实战 (2-3 周)

### 目标
掌握数据库操作，能开发完整的后端服务。

### 项目列表

| 顺序 | 项目名称 | 涉及知识点 | 产出 |
|------|---------|-----------|------|
| 12 | **个人博客后端** | PostgreSQL、Docker、REST API | 博客后端 |
| 13 | **用户认证系统** | JWT、密码加密、权限 | 登录注册 |
| 14 | **文件上传下载服务** | 文件操作、阿里云 OSS、七牛云 | 文件服务 |
| 15 | **看板管理工具** | WebSocket、任务状态、通知 | 实时看板 |

### 项目 13 详解：用户认证系统

```python
# 功能需求
- 用户注册（密码加密）
- 用户登录（返回 JWT）
- Token 验证中间件
- 角色权限控制

# 涉及知识
- bcrypt 密码哈希
- PyJWT 生成和验证 Token
- 装饰器实现权限验证
- 雪花算法生成 ID

# 产出文件
apps/python/project/auth_system/
```

---

## 阶段五：项目实战与进阶 (长期)

### 目标
独立完成完整项目，理解工程化实践。

### 项目列表

| 顺序 | 项目名称 | 涉及知识点 | 产出 |
|------|---------|-----------|------|
| 16 | **定时任务管理系统** | APScheduler、Docker、Web | 定时任务系统 |
| 17 | **数据可视化面板** | ECharts、API 数据接入 | 数据大屏 |
| 18 | **ChatGPT 对话助手** | OpenAI API、流式输出 | AI 对话 |
| 19 | **自动化测试平台** | CI/CD、UnitTest、Docker | 测试平台 |
| 20 | **个人知识库** | LangChain、向量化、RAG | 知识库系统 |

---

## 学习资源推荐

### 官方文档
- [Python 官方教程](https://docs.python.org/3/tutorial/)
- [Python 标准库](https://docs.python.org/3/library/)

### 在线教程
- [W3Schools Python](https://www.w3schools.com/python/)
- [Real Python](https://realpython.com/)

### 书籍
- 《Python 编程：从入门到实践》
- 《Effective Python》
- 《Python 进阶》

---

## 学习顺序建议

```
第1周: 项目1-2 (脚本工具)
第2周: 项目3-4 (爬虫+下载器)
第3周: 项目5-6 (面向对象)
第4周: 项目7-8 (数据结构)
第5周: 项目9 (Flask)
第6周: 项目10 (FastAPI)
第7-8周: 项目11 (Django)
第9-10周: 项目12-13 (数据库+认证)
第11-12周: 项目14-15 (进阶项目)
...
```

---

## 项目结构

```
apps/python/
├── exercises/           # 每个练习项目
│   ├── project_01_rename_tool.py
│   ├── project_02_text_tool.py
│   ├── project_03_web_scraper.py
│   └── ...
├── project/             # 完整项目
│   ├── flask_guestbook/
│   ├── fastapi_notes/
│   └── django_blog/
└── README.md
```

---

> **重要提示**：不要追求速度，确保每个项目都真正理解了再往下走。如果某个知识点不清楚，停下来查清楚再继续。