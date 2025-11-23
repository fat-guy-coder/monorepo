<template>
  <div class="home">
    <a-button type="primary">asdas</a-button>
    <config-provider :theme="{
      token: {
        colorPrimary: '#00b96b',
      },
    }">
      <a-tooltip placement="rightTop" trigger="click" overlayClassName="authorBox" color="var(--color-background)">
        <template #title>
          <span class="email">邮箱:dldl0830@foxmail.com</span><br />
          <span class="phone">电话:15680690572</span><br />
          <span class="repository">代码仓库:https://github.com/fat-guy-coder/monorepo.git</span><br />
          <span class="repository">欢迎提交代码</span>
        </template>
        <div class="author">作者</div>
      </a-tooltip>
    </config-provider>
  </div>
</template>

<script setup lang="ts">
import { Tooltip as ATooltip, Button as AButton, ConfigProvider } from 'ant-design-vue'
</script>

<style lang="less" scoped>
.home {
  position: relative;
  height: 100%;
}

.author-box {
  background-color: var(--color-background);
}

.author {
  position: absolute;
  left: 50px;
  bottom: 50px;
  cursor: pointer;
}


:where(.css-dev-only-do-not-override-1p3hq3p).ant-tooltip .ant-tooltip-inner {
  background-color: rgba(224, 66, 66, 0.85) !important;
}
</style>
