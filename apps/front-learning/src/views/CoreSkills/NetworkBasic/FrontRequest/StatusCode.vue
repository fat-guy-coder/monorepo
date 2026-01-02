<template>
  <!-- 状态码 -->
  <section class="section">
    <h2 class="section-title">🔢 HTTP状态码</h2>
    <div class="status-grid">
      <div v-for="code in statusCodes" :key="code.code" class="status-card" :style="getStatusColor(code.code)">
        <div class="code">{{ code.code }}</div>
        <div class="desc">{{ code.desc }}</div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
type StatusCode = {
  code: number;
  desc: string;
};
const statusCodes: StatusCode[] = [
  { code: 200, desc: 'OK - 请求成功' },
  { code: 201, desc: 'Created - 资源创建成功' },
  { code: 204, desc: 'No Content - 无返回内容' },
  { code: 400, desc: 'Bad Request - 请求参数错误' },
  { code: 401, desc: 'Unauthorized - 未授权' },
  { code: 403, desc: 'Forbidden - 禁止访问' },
  { code: 404, desc: 'Not Found - 资源不存在' },
  { code: 500, desc: 'Internal Server Error - 服务器错误' },
  { code: 301, desc: 'Moved Permanently - 永久重定向' },
  { code: 302, desc: 'Found - 临时重定向' },
  { code: 405, desc: 'Method Not Allowed - 请求方法不允许' },
  { code: 408, desc: 'Request Timeout - 请求超时' },
  { code: 410, desc: 'Gone - 资源已删除' },
  { code: 413, desc: 'Payload Too Large - 请求体过大' },
  { code: 414, desc: 'URI Too Long - 请求URI过长' },
  { code: 415, desc: 'Unsupported Media Type - 不支持的媒体类型' },
  { code: 429, desc: 'Too Many Requests - 请求过多' },
  { code: 500, desc: 'Internal Server Error - 服务器内部错误' },
  { code: 502, desc: 'Bad Gateway - 错误的网关' },
  { code: 503, desc: 'Service Unavailable - 服务不可用' },
  { code: 504, desc: 'Gateway Timeout - 网关超时' }
];
const getStatusColor = (code: number) => ({
  backgroundColor: `hsl(${Math.floor(code / 100) * 120}, 70%, 90%)`,
  borderColor: `hsl(${Math.floor(code / 100) * 120}, 70%, 50%)`
});
</script>
<style scoped>
.status-grid {
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;

  .status-card {
    padding: 1rem;
    border: 2px solid;
    border-radius: 0.5rem;
    text-align: center;

    .code {
      font-weight: bold;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
  }
}
</style>
