<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 to-slate-100/80">
    <!-- 头部 -->
    <header class="bg-white/70 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-[#306998]"></div>
            <div class="w-3 h-3 rounded-full bg-[#FFD43B]"></div>
          </div>
          <h1 class="text-2xl font-bold text-slate-800 tracking-tight">
            Python 网络编程
          </h1>
          <span class="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full hidden sm:inline-block">
            学习路线图
          </span>
        </div>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 space-y-16">

      <!-- 简介区 -->
      <section class="text-center max-w-3xl mx-auto space-y-4">
        <p class="text-slate-600 leading-relaxed">
          掌握 Python 网络编程的核心脉络，从底层协议理解到上层 API 设计，再到实时通信。
          以下四大模块涵盖了构建现代网络应用所需的关键技能。
        </p>
        <div class="flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-500">
          <span class="bg-white px-3 py-1 rounded-full border border-slate-200">socket</span>
          <span class="bg-white px-3 py-1 rounded-full border border-slate-200">http</span>
          <span class="bg-white px-3 py-1 rounded-full border border-slate-200">requests</span>
          <span class="bg-white px-3 py-1 rounded-full border border-slate-200">aiohttp</span>
          <span class="bg-white px-3 py-1 rounded-full border border-slate-200">websockets</span>
          <span class="bg-white px-3 py-1 rounded-full border border-slate-200">fastapi</span>
          <span class="bg-white px-3 py-1 rounded-full border border-slate-200">flask</span>
        </div>
      </section>

      <!-- 四大主题卡片网格 -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
        <!-- HTTP协议 -->
        <div
          class="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-indigo-400 to-indigo-500"></div>
          <div class="p-6 sm:p-7">
            <div class="flex items-center gap-4 mb-4">
              <span class="text-3xl">🌐</span>
              <div>
                <h2 class="text-xl font-bold text-slate-800">HTTP 协议</h2>
                <span class="text-xs text-slate-500">核心基础</span>
              </div>
            </div>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              理解超文本传输协议的工作原理，请求/响应模型、状态码、Headers、Cookie、缓存等。
              这是 Web 开发的地基。
            </p>
            <div class="space-y-2">
              <div class="flex items-center text-xs text-slate-600">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2"></span>
                HTTP 方法 (GET/POST/PUT/DELETE)
              </div>
              <div class="flex items-center text-xs text-slate-600">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2"></span>
                状态码 (1xx-5xx) 与 Header 解析
              </div>
              <div class="flex items-center text-xs text-slate-600">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2"></span>
                Python 标准库：http, urllib
              </div>
              <div class="flex items-center text-xs text-slate-600">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2"></span>
                第三方库：requests, httpx
              </div>
            </div>
          </div>
        </div>

        <!-- Socket 编程 -->
        <div
          class="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-emerald-400 to-emerald-500"></div>
          <div class="p-6 sm:p-7">
            <div class="flex items-center gap-4 mb-4">
              <span class="text-3xl">🔌</span>
              <div>
                <h2 class="text-xl font-bold text-slate-800">Socket 编程</h2>
                <span class="text-xs text-slate-500">底层通信</span>
              </div>
            </div>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              使用 socket 模块建立 TCP/UDP 连接，理解地址族、字节流、粘包处理，构建自定义网络服务。
            </p>
            <div class="space-y-2">
              <div class="flex items-center text-xs text-slate-600">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></span>
                TCP 三次握手与四次挥手
              </div>
              <div class="flex items-center text-xs text-slate-600">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></span>
                阻塞与非阻塞 I/O 模型
              </div>
              <div class="flex items-center text-xs text-slate-600">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></span>
                Python 标准库：socket, socketserver
              </div>
              <div class="flex items-center text-xs text-slate-600">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></span>
                简单聊天室 / 文件传输示例
              </div>
            </div>
          </div>
        </div>

        <!-- REST API 设计 -->
        <div
          class="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-amber-400 to-amber-500"></div>
          <div class="p-6 sm:p-7">
            <div class="flex items-center gap-4 mb-4">
              <span class="text-3xl">📡</span>
              <div>
                <h2 class="text-xl font-bold text-slate-800">REST API 设计</h2>
                <span class="text-xs text-slate-500">服务架构</span>
              </div>
            </div>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              设计符合 RESTful 风格的 Web API，资源路由、序列化、认证、版本管理，结合 Flask / FastAPI 等框架。
            </p>
            <div class="space-y-2">
              <div class="flex items-center text-xs text-slate-600">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span>
                资源命名与 URL 设计
              </div>
              <div class="flex items-center text-xs text-slate-600">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span>
                JSON 序列化与请求验证
              </div>
              <div class="flex items-center text-xs text-slate-600">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span>
                认证方式 (JWT, OAuth2)
              </div>
              <div class="flex items-center text-xs text-slate-600">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span>
                框架：Flask, FastAPI, Django REST
              </div>
            </div>
          </div>
        </div>

        <!-- WebSocket 实时通信 -->
        <div
          class="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-rose-400 to-rose-500"></div>
          <div class="p-6 sm:p-7">
            <div class="flex items-center gap-4 mb-4">
              <span class="text-3xl">⚡</span>
              <div>
                <h2 class="text-xl font-bold text-slate-800">WebSocket 实时通信</h2>
                <span class="text-xs text-slate-500">双向数据流</span>
              </div>
            </div>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              全双工通信协议，实现服务端主动推送，适用于聊天室、实时数据面板、协作编辑等场景。
            </p>
            <div class="space-y-2">
              <div class="flex items-center text-xs text-slate-600">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-400 mr-2"></span>
                握手升级与帧协议
              </div>
              <div class="flex items-center text-xs text-slate-600">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-400 mr-2"></span>
                连接保活与心跳机制
              </div>
              <div class="flex items-center text-xs text-slate-600">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-400 mr-2"></span>
                Python 库：websockets, socket.io
              </div>
              <div class="flex items-center text-xs text-slate-600">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-400 mr-2"></span>
                异步框架集成 (aiohttp, FastAPI)
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 学习路径指示 -->
      <section class="relative">
        <div class="text-center mb-6">
          <h3 class="text-lg font-semibold text-slate-700">建议学习路径</h3>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <div class="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm">
            <span
              class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">1</span>
            <span class="text-sm font-medium text-slate-700">HTTP 协议</span>
          </div>
          <span class="text-slate-300 hidden md:block">→</span>
          <div class="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm">
            <span
              class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">2</span>
            <span class="text-sm font-medium text-slate-700">Socket 编程</span>
          </div>
          <span class="text-slate-300 hidden md:block">→</span>
          <div class="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm">
            <span
              class="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">3</span>
            <span class="text-sm font-medium text-slate-700">REST API 设计</span>
          </div>
          <span class="text-slate-300 hidden md:block">→</span>
          <div class="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm">
            <span
              class="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm">4</span>
            <span class="text-sm font-medium text-slate-700">WebSocket 通信</span>
          </div>
        </div>
      </section>

    </main>

    <!-- 底部 -->
    <footer class="border-t border-slate-200 bg-white/80 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-slate-400">
        Python 网络编程学习路线 · 从协议基础到实时通信
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 当前页面为概览页面，无复杂交互逻辑
// 后续每个主题将拆分为独立的 .vue 文件进行详细介绍
</script>

<style scoped>
/* 全局使用 Tailwind，无需额外自定义样式 */
</style>
