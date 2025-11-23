<template>
  <div class="home">
    <a-button type="primary">asdas</a-button>
    <a-tooltip placement="rightTop" trigger="click">
      <template #title>
        <span class="author-name">作者:老邓</span><br />
        <span class="email">邮箱:dldl0830@foxmail.com</span><br />
        <span class="phone">电话:15680690572</span><br />
        <span class="repository">代码仓库:https://github.com/fat-guy-coder/monorepo.git</span><br />
        <span class="repository">欢迎提交代码</span>
        <!-- <div class="author-box">
          <span class="author-name">作者:老邓</span>
          <span class="email">邮箱:dldl0830@foxmail.com</span>
          <span class="phone">电话:15680690572</span>
          <span class="repository">代码仓库:https://github.com/fat-guy-coder/monorepo.git</span>
        </div> -->
      </template>
      <div class="author">作者</div>
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
import { Tooltip as ATooltip, Button as AButton } from 'ant-design-vue'
</script>

<style lang="less" scoped>
.home {
  position: relative;
  height: 100%;
}

.author {
  position: absolute;
  left: 50px;
  bottom: 50px;
  cursor: pointer;
}

.author-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

:where(.css-dev-only-do-not-override-1p3hq3p).ant-tooltip .ant-tooltip-inner {
  background-color: rgba(224, 66, 66, 0.85) !important;
}
</style>
