<template>
  <div class="min-h-screen bg-slate-50">
    <!-- 头部 -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-[#306998]"></div>
            <div class="w-3 h-3 rounded-full bg-[#FFD43B]"></div>
          </div>
          <h1 class="text-xl font-bold text-slate-800 tracking-tight">Python HTTP 模块详解</h1>
          <span class="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full hidden sm:inline-block">http.server
            / http.client</span>
        </div>
      </div>
    </header>

    <!-- 内容区域 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16 space-y-8">
      <div v-for="(card, index) in cards" :key="index"
        class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <!-- 卡片头部 -->
        <div class="px-5 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: card.color }"></span>
          <h2 class="text-sm font-semibold text-slate-700">{{ card.title }}</h2>
        </div>

        <!-- 卡片正文 -->
        <div class="p-5 sm:p-6 space-y-3">
          <p class="text-sm text-slate-600 leading-relaxed">{{ card.description }}</p>
          <div class="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <pre class="text-sm text-green-300 font-mono leading-relaxed"><code>{{ card.code }}</code></pre>
          </div>
          <div v-if="card.note" class="text-xs text-slate-400 italic border-t border-slate-100 pt-3 mt-2">
            {{ card.note }}
          </div>
        </div>
      </div>
    </main>

    <!-- 底部 -->
    <footer class="border-t border-slate-200 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center text-xs text-slate-400">
        Python HTTP 模块 · 从零构建 Web 服务与客户端
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface CardItem {
  title: string
  description: string
  code: string
  color: string
  note?: string
}

const cards: CardItem[] = [
  {
    title: '1. 启动 HTTP 服务器并监听端口',
    description:
      '使用 http.server.HTTPServer 绑定端口，结合 BaseHTTPRequestHandler 处理请求。最简单的服务器只需要几行代码。',
    color: '#3B82F6',
    code: `from http.server import HTTPServer, BaseHTTPRequestHandler

class SimpleHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(b"<h1>Hello, Python HTTP!</h1>")

server = HTTPServer(('0.0.0.0', 8000), SimpleHandler)
print("Server running on http://0.0.0.0:8000")
server.serve_forever()`,
    note: '端口可任意修改，0.0.0.0 表示监听所有网络接口。按 Ctrl+C 停止服务器。',
  },
  {
    title: '2. 自定义请求处理器与路由分发',
    description:
      '通过 self.path 获取请求路径，手动实现简单的路由匹配，根据 URL 返回不同内容。',
    color: '#10B981',
    code: `class RouterHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(b"Home page")
        elif self.path == '/about':
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(b"About page")
        else:
            self.send_error(404, "Page not found")`,
    note: '可以使用 urlparse 解析路径和查询参数，实现更灵活的路由。',
  },
  {
    title: '3. 解析查询参数 (Query String)',
    description:
      '通过 urllib.parse 解析 URL 中的查询字符串，获取键值对参数。',
    color: '#F59E0B',
    code: `from urllib.parse import urlparse, parse_qs

class QueryHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        params = parse_qs(parsed.query)   # 返回字典，值均为列表
        name = params.get('name', ['World'])[0]
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(f"<h1>Hello, {name}!</h1>".encode())`,
    note: '例如访问 /?name=Tom，页面会显示 Hello, Tom!',
  },
  {
    title: '4. 处理 POST 请求与读取请求体',
    description:
      '读取 Content-Length 头以获取请求体长度，然后从 self.rfile 读取原始数据。常用于表单提交。',
    color: '#8B5CF6',
    code: `class PostHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        # 如果是表单数据，可进一步解析
        from urllib.parse import parse_qs
        parsed = parse_qs(post_data.decode())
        username = parsed.get('username', [''])[0]

        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(f"Received: {username}".encode())`,
    note: 'JSON 数据可使用 json.loads(post_data) 直接解析。',
  },
  {
    title: '5. 发送 JSON 响应与设置状态码',
    description:
      '使用 json.dumps 序列化 Python 对象，设置 Content-type 为 application/json，并可自定义 HTTP 状态码。',
    color: '#EC4899',
    code: `import json

class JsonHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        data = {"status": "ok", "items": [1, 2, 3]}
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def do_POST(self):
        # 创建资源示例
        self.send_response(201)  # Created
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"message": "created"}).encode())`,
  },
  {
    title: '6. 支持并发请求：ThreadingHTTPServer',
    description:
      '默认的 HTTPServer 是单线程的，使用 ThreadingHTTPServer 可以让每个请求在独立线程中处理，提高并发能力。',
    color: '#06B6D4',
    code: `from http.server import HTTPServer, BaseHTTPRequestHandler
from socketserver import ThreadingMixIn

class ThreadingHTTPServer(ThreadingMixIn, HTTPServer):
    """混合线程处理能力"""
    daemon_threads = True  # 线程随主线程退出

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # 耗时操作不会阻塞其他请求
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"Threaded response")

server = ThreadingHTTPServer(('0.0.0.0', 8000), MyHandler)
server.serve_forever()`,
    note: 'Python 3.7+ 可直接使用 from http.server import ThreadingHTTPServer。',
  },
  {
    title: '7. 使用 http.client 发起 HTTP 请求（客户端）',
    description:
      'http.client 提供了底层 HTTP 客户端功能，可以手动构造请求、发送数据并读取响应。适合需要精细控制的场景。',
    color: '#EF4444',
    code: `import http.client

conn = http.client.HTTPConnection('httpbin.org')
conn.request('GET', '/get')
response = conn.getresponse()
print(response.status, response.reason)
data = response.read()
print(data.decode())

# POST 请求示例
conn.request('POST', '/post', body='name=Alice', headers={
    'Content-type': 'application/x-www-form-urlencoded'
})
resp = conn.getresponse()
print(resp.read().decode())`,
    note: '对于更高级的 HTTP 客户端，推荐使用 requests 库。',
  },
  {
    title: '8. 处理静态文件与媒体类型',
    description:
      '根据请求文件扩展名设置正确的 Content-Type，读取文件并返回。实现一个简易静态文件服务器。',
    color: '#6366F1',
    code: `import os
from http.server import BaseHTTPRequestHandler

class StaticHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # 将请求路径映射到当前目录下的文件
        path = self.path.lstrip('/') or 'index.html'
        if os.path.isfile(path):
            self.send_response(200)
            # 根据扩展名设置 MIME 类型
            ext = os.path.splitext(path)[1]
            mime = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.png': 'image/png',
            }.get(ext, 'application/octet-stream')
            self.send_header('Content-type', mime)
            self.end_headers()
            with open(path, 'rb') as f:
                self.wfile.write(f.read())
        else:
            self.send_error(404)`,
  },
  {
    title: '9. 调试技巧：打印请求信息与日志',
    description:
      '在开发阶段，可以打印请求方法、路径、请求头等信息，帮助调试。也可以使用 logging 模块记录。',
    color: '#14B8A6',
    code: `import logging

logging.basicConfig(level=logging.INFO)

class DebugHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        logging.info("GET %s from %s", self.path, self.client_address)
        logging.debug("Headers: %s", self.headers)
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"Debug log printed in console")`,
  },
]
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-break: break-word;
}

code {
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
}
</style>
