<template>
  <div class="mime-container">
    <div class="hero-section">
      <div class="hero-content">
        <h1>MIME类型基础介绍</h1>
        <p>互联网内容类型的标准表示法</p>
        <div class="mime-visualization">
          <div class="file-card" v-for="(file, index) in fileTypes" :key="index">
            <div class="file-icon" :style="{ backgroundColor: file.color }">
              <i :class="file.icon"></i>
            </div>
            <div class="file-info">
              <div class="file-name">{{ file.name }}</div>
              <div class="file-mime">{{ file.mime }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- MIME基础 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-info-circle"></i>
          <h2>MIME类型基础</h2>
        </div>
        <div class="section-content">
          <div class="mime-intro">
            <div class="intro-card">
              <div class="intro-icon">
                <i class="fas fa-question"></i>
              </div>
              <div>
                <h3>什么是MIME类型？</h3>
                <p>MIME（Multipurpose Internet Mail
                  Extensions）类型是一种标准，用于表示文档、文件或字节流的性质和格式。它在HTTP协议中用于标识内容类型，帮助浏览器确定如何处理接收到的内容。</p>
              </div>
            </div>

            <div class="mime-structure">
              <h3><i class="fas fa-code"></i> MIME类型结构</h3>
              <div class="structure-example">
                <div class="type-part">类型</div>
                <div class="divider">/</div>
                <div class="subtype-part">子类型</div>
                <div class="divider">;</div>
                <div class="parameter-part">参数（可选）</div>
              </div>
              <div class="real-example">
                <pre>text/html; charset=UTF-8</pre>
                <div class="explanation">
                  <div><span class="type-label">类型:</span> text</div>
                  <div><span class="type-label">子类型:</span> html</div>
                  <div><span class="type-label">参数:</span> charset=UTF-8</div>
                </div>
              </div>
            </div>
          </div>

          <div class="mime-history">
            <h3><i class="fas fa-history"></i> 历史背景</h3>
            <p>MIME最初设计用于扩展电子邮件的功能，使其能够支持非文本附件。随着互联网的发展，它被HTTP协议采纳用于内容类型标识，成为Web标准的重要组成部分。</p>
          </div>
        </div>
      </section>

      <!-- 文本类型 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-file-alt"></i>
          <h2>文本类型 (text)</h2>
        </div>
        <div class="section-content">
          <div class="mime-grid">
            <div class="mime-card" v-for="mime in textTypes" :key="mime.type">
              <div class="mime-header" :style="{ backgroundColor: mime.color }">
                <div class="mime-type">{{ mime.type }}</div>
                <div class="mime-extensions">{{ mime.extensions.join(', ') }}</div>
              </div>
              <div class="mime-body">
                <h3>{{ mime.name }}</h3>
                <p>{{ mime.description }}</p>
                <div class="usage">
                  <h4>使用场景</h4>
                  <ul>
                    <li v-for="(scene, index) in mime.usage" :key="index">{{ scene }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 图像类型 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-file-image"></i>
          <h2>图像类型 (image)</h2>
        </div>
        <div class="section-content">
          <div class="mime-grid">
            <div class="mime-card" v-for="mime in imageTypes" :key="mime.type">
              <div class="mime-header" :style="{ backgroundColor: mime.color }">
                <div class="mime-type">{{ mime.type }}</div>
                <div class="mime-extensions">{{ mime.extensions.join(', ') }}</div>
              </div>
              <div class="mime-body">
                <h3>{{ mime.name }}</h3>
                <p>{{ mime.description }}</p>
                <div class="usage">
                  <h4>使用场景</h4>
                  <ul>
                    <li v-for="(scene, index) in mime.usage" :key="index">{{ scene }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="image-comparison">
            <h3><i class="fas fa-balance-scale"></i> 图像格式比较</h3>
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>格式</th>
                    <th>透明度支持</th>
                    <th>动画支持</th>
                    <th>适用场景</th>
                    <th>文件大小</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="format in imageFormats" :key="format.name">
                    <td>{{ format.name }}</td>
                    <td><i :class="format.transparency ? 'fas fa-check success' : 'fas fa-times error'"></i></td>
                    <td><i :class="format.animation ? 'fas fa-check success' : 'fas fa-times error'"></i></td>
                    <td>{{ format.scenes.join(', ') }}</td>
                    <td>{{ format.size }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- 音频类型 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-file-audio"></i>
          <h2>音频类型 (audio)</h2>
        </div>
        <div class="section-content">
          <div class="mime-grid">
            <div class="mime-card" v-for="mime in audioTypes" :key="mime.type">
              <div class="mime-header" :style="{ backgroundColor: mime.color }">
                <div class="mime-type">{{ mime.type }}</div>
                <div class="mime-extensions">{{ mime.extensions.join(', ') }}</div>
              </div>
              <div class="mime-body">
                <h3>{{ mime.name }}</h3>
                <p>{{ mime.description }}</p>
                <div class="usage">
                  <h4>使用场景</h4>
                  <ul>
                    <li v-for="(scene, index) in mime.usage" :key="index">{{ scene }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="audio-stats">
            <h3><i class="fas fa-music"></i> 音频格式使用统计</h3>
            <div class="stats-container">
              <div class="stat-item" v-for="stat in audioStats" :key="stat.format">
                <div class="stat-label">{{ stat.format }}</div>
                <div class="stat-bar" :style="{ width: stat.percentage + '%' }">
                  <div class="stat-value">{{ stat.percentage }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 视频类型 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-file-video"></i>
          <h2>视频类型 (video)</h2>
        </div>
        <div class="section-content">
          <div class="mime-grid">
            <div class="mime-card" v-for="mime in videoTypes" :key="mime.type">
              <div class="mime-header" :style="{ backgroundColor: mime.color }">
                <div class="mime-type">{{ mime.type }}</div>
                <div class="mime-extensions">{{ mime.extensions.join(', ') }}</div>
              </div>
              <div class="mime-body">
                <h3>{{ mime.name }}</h3>
                <p>{{ mime.description }}</p>
                <div class="usage">
                  <h4>使用场景</h4>
                  <ul>
                    <li v-for="(scene, index) in mime.usage" :key="index">{{ scene }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="video-codec">
            <h3><i class="fas fa-film"></i> 视频编解码器与容器</h3>
            <p>视频文件通常包含两个重要概念：</p>
            <div class="codec-info">
              <div class="codec-card">
                <div class="codec-icon">
                  <i class="fas fa-compress-arrows-alt"></i>
                </div>
                <h4>编解码器 (Codec)</h4>
                <p>用于压缩和解压缩视频数据的算法，如H.264、VP9、AV1</p>
              </div>
              <div class="codec-card">
                <div class="codec-icon">
                  <i class="fas fa-box"></i>
                </div>
                <h4>容器格式 (Container)</h4>
                <p>封装视频、音频和元数据的文件格式，如MP4、WebM、AVI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 应用类型 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-file-code"></i>
          <h2>应用类型 (application)</h2>
        </div>
        <div class="section-content">
          <div class="mime-grid">
            <div class="mime-card" v-for="mime in applicationTypes" :key="mime.type">
              <div class="mime-header" :style="{ backgroundColor: mime.color }">
                <div class="mime-type">{{ mime.type }}</div>
                <div class="mime-extensions">{{ mime.extensions.join(', ') }}</div>
              </div>
              <div class="mime-body">
                <h3>{{ mime.name }}</h3>
                <p>{{ mime.description }}</p>
                <div class="usage">
                  <h4>使用场景</h4>
                  <ul>
                    <li v-for="(scene, index) in mime.usage" :key="index">{{ scene }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 设置与使用 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-cog"></i>
          <h2>MIME类型设置与使用</h2>
        </div>
        <div class="section-content">
          <div class="setting-methods">
            <div class="method-card">
              <div class="method-header">
                <i class="fab fa-html5"></i>
                <h3>HTML中设置</h3>
              </div>
              <div class="method-content">
                <p>在HTML元素中指定MIME类型：</p>
                <pre>&lt;link rel="stylesheet" href="styles.css" type="text/css"&gt;
&lt;script src="app.js" type="application/javascript"&gt;&lt;/script&gt;
&lt;a href="report.pdf" type="application/pdf"&gt;下载报告&lt;/a&gt;</pre>
              </div>
            </div>

            <div class="method-card">
              <div class="method-header">
                <i class="fas fa-server"></i>
                <h3>服务器配置</h3>
              </div>
              <div class="method-content">
                <p>在服务器配置文件中添加MIME类型：</p>
                <pre># Apache .htaccess
AddType application/wasm .wasm
AddType font/woff2 .woff2

# Nginx nginx.conf
types {
    application/javascript js mjs;
    image/webp webp;
}</pre>
              </div>
            </div>

            <div class="method-card">
              <div class="method-header">
                <i class="fas fa-code"></i>
                <h3>HTTP头设置</h3>
              </div>
              <div class="method-content">
                <p>在HTTP响应头中设置Content-Type：</p>
                <pre>HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 1024

{ "message": "Hello World" }</pre>
              </div>
            </div>
          </div>

          <div class="common-issues">
            <h3><i class="fas fa-exclamation-triangle"></i> 常见问题与解决方案</h3>
            <div class="issues-grid">
              <div class="issue-card">
                <div class="issue-icon">
                  <i class="fas fa-file-download"></i>
                </div>
                <h4>文件下载而不是显示</h4>
                <p>服务器发送了错误的Content-Type（如application/octet-stream）</p>
                <div class="solution">检查并设置正确的MIME类型</div>
              </div>

              <div class="issue-card">
                <div class="issue-icon">
                  <i class="fas fa-bug"></i>
                </div>
                <h4>内容渲染不正确</h4>
                <p>浏览器无法识别内容类型（如缺少字符集参数）</p>
                <div class="solution">添加charset参数（如charset=UTF-8）</div>
              </div>

              <div class="issue-card">
                <div class="issue-icon">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <h4>安全警告</h4>
                <p>服务器配置错误导致可执行文件被当作文本处理</p>
                <div class="solution">确保可执行文件使用正确的MIME类型</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-check-circle"></i>
          <h2>总结</h2>
        </div>
        <div class="section-content">
          <div class="key-points">
            <h3><i class="fas fa-key"></i> 关键要点</h3>
            <ul>
              <li>MIME类型是互联网内容的标准标识符</li>
              <li>正确设置MIME类型对内容正确渲染至关重要</li>
              <li>主要类别包括 text, image, audio, video, application</li>
              <li>现代Web应用应优先考虑通用、高效的格式（如WebP, WebM）</li>
              <li>服务器和客户端都应正确处理MIME类型</li>
            </ul>
          </div>

          <div class="mime-cheatsheet">
            <h3><i class="fas fa-file-download"></i> 常用MIME类型速查表</h3>
            <div class="cheatsheet-grid">
              <div class="cheat-card" v-for="cheat in cheatsheet" :key="cheat.type">
                <div class="cheat-type">{{ cheat.type }}</div>
                <div class="cheat-ext">{{ cheat.extensions.join(', ') }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>MIME类型基础介绍 | 互联网内容标识标准</p>
      <div class="footer-links">
        <a href="#"><i class="fas fa-book"></i> IANA MIME类型注册表</a>
        <a href="#"><i class="fab fa-mdn"></i> MDN Web文档</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 文件类型可视化数据
const fileTypes = ref([
  { name: "HTML文档", mime: "text/html", icon: "fab fa-html5", color: "#e34c26" },
  { name: "CSS样式", mime: "text/css", icon: "fab fa-css3-alt", color: "#264de4" },
  { name: "JavaScript", mime: "application/javascript", icon: "fab fa-js", color: "#f0db4f" },
  { name: "JSON数据", mime: "application/json", icon: "fas fa-code", color: "#026e00" },
  { name: "PNG图像", mime: "image/png", icon: "fas fa-image", color: "#4D9E41" },
  { name: "PDF文档", mime: "application/pdf", icon: "fas fa-file-pdf", color: "#e63946" }
]);

// 文本类型MIME
const textTypes = ref([
  {
    type: "text/html",
    name: "HTML文档",
    extensions: [".html", ".htm"],
    description: "超文本标记语言，用于创建网页",
    color: "#e34c26",
    usage: [
      "网页开发与渲染",
      "电子邮件模板",
      "Web应用界面"
    ]
  },
  {
    type: "text/css",
    name: "CSS样式表",
    extensions: [".css"],
    description: "层叠样式表，用于描述HTML文档的呈现",
    color: "#264de4",
    usage: [
      "网页样式设计",
      "响应式布局",
      "用户界面美化"
    ]
  },
  {
    type: "text/plain",
    name: "纯文本",
    extensions: [".txt"],
    description: "未格式化的文本内容",
    color: "#6c757d",
    usage: [
      "日志文件",
      "配置文件",
      "README文档"
    ]
  },
  {
    type: "text/csv",
    name: "CSV数据",
    extensions: [".csv"],
    description: "逗号分隔值格式，用于表格数据",
    color: "#026e00",
    usage: [
      "数据导出/导入",
      "电子表格数据交换",
      "数据库迁移"
    ]
  }
]);

// 图像类型MIME
const imageTypes = ref([
  {
    type: "image/jpeg",
    name: "JPEG图像",
    extensions: [".jpg", ".jpeg"],
    description: "有损压缩图像格式，适合照片",
    color: "#f0db4f",
    usage: [
      "数码照片存储",
      "网页图片展示",
      "打印材料"
    ]
  },
  {
    type: "image/png",
    name: "PNG图像",
    extensions: [".png"],
    description: "无损压缩图像格式，支持透明度",
    color: "#4D9E41",
    usage: [
      "网页图标和Logo",
      "需要透明背景的图像",
      "屏幕截图"
    ]
  },
  {
    type: "image/gif",
    name: "GIF图像",
    extensions: [".gif"],
    description: "支持动画和透明度的图像格式",
    color: "#74c0fc",
    usage: [
      "简单动画",
      "小型图标",
      "表情包"
    ]
  },
  {
    type: "image/svg+xml",
    name: "SVG矢量图",
    extensions: [".svg"],
    description: "基于XML的矢量图像格式",
    color: "#ff922b",
    usage: [
      "响应式图标",
      "高分辨率显示",
      "可缩放图形"
    ]
  },
  {
    type: "image/webp",
    name: "WebP图像",
    extensions: [".webp"],
    description: "现代图像格式，提供有损和无损压缩",
    color: "#3b82f6",
    usage: [
      "网页图像优化",
      "替代JPEG和PNG",
      "减少页面加载时间"
    ]
  }
]);

// 图像格式比较
const imageFormats = ref([
  { name: "JPEG", transparency: false, animation: false, scenes: ["照片", "复杂图像"], size: "中" },
  { name: "PNG", transparency: true, animation: false, scenes: ["图标", "透明图像"], size: "大" },
  { name: "GIF", transparency: true, animation: true, scenes: ["简单动画", "小图标"], size: "大" },
  { name: "WebP", transparency: true, animation: true, scenes: ["通用", "网页优化"], size: "小" },
  { name: "SVG", transparency: true, animation: true, scenes: ["矢量图", "响应式设计"], size: "小" }
]);

// 音频类型MIME
const audioTypes = ref([
  {
    type: "audio/mpeg",
    name: "MP3音频",
    extensions: [".mp3"],
    description: "流行的有损音频压缩格式",
    color: "#8b5cf6",
    usage: [
      "音乐播放",
      "播客",
      "背景音乐"
    ]
  },
  {
    type: "audio/ogg",
    name: "OGG音频",
    extensions: [".ogg", ".oga"],
    description: "开放格式的音频容器",
    color: "#0ca678",
    usage: [
      "网页音频",
      "开源项目",
      "跨平台应用"
    ]
  },
  {
    type: "audio/wav",
    name: "WAV音频",
    extensions: [".wav"],
    description: "未压缩的音频格式，高质量但文件大",
    color: "#3bc9db",
    usage: [
      "专业音频编辑",
      "原始录音",
      "音效"
    ]
  },
  {
    type: "audio/webm",
    name: "WebM音频",
    extensions: [".weba"],
    description: "为网络优化的开放媒体格式",
    color: "#e64980",
    usage: [
      "HTML5音频",
      "流媒体",
      "现代Web应用"
    ]
  }
]);

// 音频格式统计
const audioStats = ref([
  { format: "MP3", percentage: 72 },
  { format: "AAC", percentage: 15 },
  { format: "OGG", percentage: 5 },
  { format: "WAV", percentage: 4 },
  { format: "其他", percentage: 4 }
]);

// 视频类型MIME
const videoTypes = ref([
  {
    type: "video/mp4",
    name: "MP4视频",
    extensions: [".mp4"],
    description: "最流行的视频容器格式",
    color: "#e64980",
    usage: [
      "在线视频",
      "移动设备",
      "社交媒体"
    ]
  },
  {
    type: "video/ogg",
    name: "OGG视频",
    extensions: [".ogv"],
    description: "开放格式的视频容器",
    color: "#0ca678",
    usage: [
      "开源项目",
      "跨平台兼容",
      "HTML5视频"
    ]
  },
  {
    type: "video/webm",
    name: "WebM视频",
    extensions: [".webm"],
    description: "为网络优化的开放媒体格式",
    color: "#3b82f6",
    usage: [
      "现代Web应用",
      "流媒体",
      "替代MP4"
    ]
  },
  {
    type: "video/x-msvideo",
    name: "AVI视频",
    extensions: [".avi"],
    description: "传统的Windows视频容器格式",
    color: "#fd7e14",
    usage: [
      "旧系统兼容",
      "本地播放",
      "视频编辑"
    ]
  }
]);

// 应用类型MIME
const applicationTypes = ref([
  {
    type: "application/pdf",
    name: "PDF文档",
    extensions: [".pdf"],
    description: "便携式文档格式，保留文档格式",
    color: "#e63946",
    usage: [
      "电子书",
      "官方文档",
      "打印材料"
    ]
  },
  {
    type: "application/json",
    name: "JSON数据",
    extensions: [".json"],
    description: "轻量级数据交换格式",
    color: "#026e00",
    usage: [
      "API响应",
      "配置文件",
      "数据存储"
    ]
  },
  {
    type: "application/zip",
    name: "ZIP压缩文件",
    extensions: [".zip"],
    description: "数据压缩和归档格式",
    color: "#6c757d",
    usage: [
      "文件打包",
      "数据备份",
      "软件分发"
    ]
  },
  {
    type: "application/msword",
    name: "Word文档",
    extensions: [".doc"],
    description: "Microsoft Word文档格式",
    color: "#2b579a",
    usage: [
      "办公文档",
      "报告",
      "正式文件"
    ]
  },
  {
    type: "application/vnd.ms-excel",
    name: "Excel文档",
    extensions: [".xls"],
    description: "Microsoft Excel电子表格格式",
    color: "#217346",
    usage: [
      "数据分析",
      "财务报表",
      "数据记录"
    ]
  },
  {
    type: "application/javascript",
    name: "JavaScript",
    extensions: [".js", ".mjs"],
    description: "ECMAScript脚本语言",
    color: "#f0db4f",
    usage: [
      "网页交互",
      "Web应用",
      "服务器端开发"
    ]
  }
]);

// 速查表
const cheatsheet = ref([
  { type: "text/html", extensions: [".html", ".htm"] },
  { type: "text/css", extensions: [".css"] },
  { type: "image/jpeg", extensions: [".jpg", ".jpeg"] },
  { type: "image/png", extensions: [".png"] },
  { type: "application/pdf", extensions: [".pdf"] },
  { type: "application/json", extensions: [".json"] },
  { type: "video/mp4", extensions: [".mp4"] },
  { type: "audio/mpeg", extensions: [".mp3"] },
  { type: "application/zip", extensions: [".zip"] },
  { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", extensions: [".docx"] },
  { type: "application/xml", extensions: [".xml"] },
  { type: "font/woff2", extensions: [".woff2"] }
]);
</script>

<style lang="less" scoped>



.mime-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2d3748;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.hero-section {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  border-radius: 12px;
  color: white;
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
  padding: 40px 20px;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
    z-index: 0;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 15px;
      letter-spacing: -0.5px;
    }

    p {
      font-size: 1.3rem;
      font-weight: 300;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto 30px;
    }
  }
}

.mime-visualization {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 40px;
}

.file-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 15px;
  width: 280px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.file-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  margin-right: 15px;
}

.file-info {
  flex: 1;
  text-align: left;

  .file-name {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 5px;
    color: #1e293b;
  }

  .file-mime {
    font-size: 0.9rem;
    color: #4f46e5;
    font-family: 'Fira Code', monospace;
    background: rgba(79, 70, 229, 0.1);
    padding: 3px 8px;
    border-radius: 4px;
    display: inline-block;
  }
}

.content-wrapper {
  padding: 0 20px;
}

.section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  margin-bottom: 30px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
}

.section-header {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  color: white;

  .icon {
    font-size: 1.8rem;
    margin-right: 15px;
  }

  h2 {
    margin: 0;
    font-size: 1.7rem;
    font-weight: 600;
  }
}

.section-content {
  padding: 25px;

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4a5568;
    margin-bottom: 20px;
  }
}

.mime-intro {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.intro-card {
  display: flex;
  gap: 20px;
  align-items: center;
  background: #f0f9ff;
  border-radius: 12px;
  padding: 25px;

  .intro-icon {
    width: 70px;
    height: 70px;
    background: #0ea5e9;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }

  h3 {
    margin-top: 0;
    color: #0369a1;
  }
}

.mime-structure {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1e293b;
  }
}

.structure-example {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Fira Code', monospace;

  .type-part {
    background: #e0f2fe;
    padding: 10px 20px;
    border-radius: 8px;
    color: #0ea5e9;
  }

  .subtype-part {
    background: #ede9fe;
    padding: 10px 20px;
    border-radius: 8px;
    color: #8b5cf6;
  }

  .parameter-part {
    background: #fce7f3;
    padding: 10px 20px;
    border-radius: 8px;
    color: #db2777;
  }

  .divider {
    color: #94a3b8;
  }
}

.real-example {
  background: #1e293b;
  color: #f1f5f9;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 1.1rem;
  margin: 20px 0;

  pre {
    margin: 0;
  }
}

.explanation {
  display: flex;
  gap: 20px;
  margin-top: 15px;
  font-size: 0.95rem;

  div {
    flex: 1;
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    border-radius: 6px;
  }

  .type-label {
    font-weight: 600;
    color: #c7d2fe;
    margin-right: 8px;
  }
}

.mime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.mime-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
}

.mime-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  color: white;

  .mime-type {
    font-family: 'Fira Code', monospace;
    font-weight: 500;
  }

  .mime-extensions {
    background: rgba(255, 255, 255, 0.3);
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.9rem;
  }
}

.mime-body {
  padding: 20px;

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #1e293b;
  }

  p {
    color: #4a5568;
    margin-bottom: 15px;
  }
}

.usage {
  background: #f8fafc;
  border-radius: 8px;
  padding: 15px;

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #4f46e5;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: "";
      width: 10px;
      height: 10px;
      background: #4f46e5;
      border-radius: 50%;
    }
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 8px;
      line-height: 1.5;
    }
  }
}

.image-comparison {
  margin-top: 40px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1e293b;
  }
}

.comparison-table {
  overflow-x: auto;
  margin-top: 20px;

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }

    th {
      background: #4f46e5;
      color: white;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: #f8fafc;
    }

    .success {
      color: #10b981;
    }

    .error {
      color: #ef4444;
    }
  }
}

.audio-stats {
  margin-top: 40px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1e293b;
  }
}

.stats-container {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
}

.stat-item {
  margin-bottom: 15px;

  .stat-label {
    font-weight: 500;
    margin-bottom: 5px;
    color: #334155;
  }
}

.stat-bar {
  height: 25px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 12px;
  position: relative;
  transition: width 1s ease;

  .stat-value {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
  }
}

.video-codec {
  margin-top: 40px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1e293b;
  }
}

.codec-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.codec-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  .codec-icon {
    width: 60px;
    height: 60px;
    background: #e0f2fe;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    color: #0ea5e9;
    margin-bottom: 20px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #1e293b;
  }
}

.setting-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.method-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.method-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  color: white;

  i {
    font-size: 1.8rem;
  }

  h3 {
    margin: 0;
  }
}

.method-content {
  padding: 20px;

  pre {
    background: #1e293b;
    color: #f1f5f9;
    border-radius: 8px;
    padding: 15px;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    overflow-x: auto;
    margin-top: 15px;
  }
}

.common-issues {
  margin-top: 40px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1e293b;
  }
}

.issues-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.issue-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  .issue-icon {
    width: 50px;
    height: 50px;
    background: #fee2e2;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #ef4444;
    margin-bottom: 15px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #1e293b;
  }

  p {
    color: #4a5568;
    margin-bottom: 15px;
  }

  .solution {
    background: #dcfce7;
    color: #166534;
    padding: 8px 15px;
    border-radius: 6px;
    font-weight: 500;
  }
}

.key-points {
  background: #f0f9ff;
  border-radius: 12px;
  padding: 25px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1e293b;
    margin-top: 0;
  }

  ul {
    padding-left: 20px;
    margin: 15px 0 0;

    li {
      margin-bottom: 12px;
      line-height: 1.6;
    }
  }
}

.mime-cheatsheet {
  margin-top: 30px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1e293b;
  }
}

.cheatsheet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.cheat-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #4f46e5;

  .cheat-type {
    font-family: 'Fira Code', monospace;
    font-weight: 500;
  }

  .cheat-ext {
    background: #eef2ff;
    color: #4f46e5;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.9rem;
  }
}

.footer {
  text-align: center;
  padding: 25px;
  color: #64748b;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 15px;

    a {
      color: #4f46e5;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .hero-section .hero-content h1 {
    font-size: 2rem;
  }

  .hero-section .hero-content p {
    font-size: 1.1rem;
  }

  .section-header h2 {
    font-size: 1.4rem !important;
  }

  .intro-card {
    flex-direction: column;
    text-align: center;

    .intro-icon {
      margin: 0 auto 15px;
    }
  }

  .structure-example {
    flex-wrap: wrap;
  }

  .explanation {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 30px 15px;
  }

  .file-card {
    width: 100%;
    max-width: 350px;
  }

  .mime-grid {
    grid-template-columns: 1fr;
  }
}
</style>
