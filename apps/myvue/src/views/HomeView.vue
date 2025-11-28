<template>
  <div class="home">

    <div>
      <span class="email">邮箱:dldl0830@foxmail.com</span><br />
      <span class="phone">电话:15680690572</span><br />
      <span class="repository">代码仓库:https://github.com/fat-guy-coder/monorepo.git</span><br />
      <span class="repository">欢迎提交代码</span>
    </div>
  </div>

</template>

<script setup lang="ts">
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

.hover-div {
  position: relative;
  width: 100px;

  .hover-div-item {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
  }

  .hover-div-item2 {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
  }

  &:hover {
    .hover-div-item {
      display: block;

      &:hover {
        .hover-div-item2 {
          display: block;
        }
      }

      &:mouseleave {
        .hover-div-item2 {
          display: none;
        }
      }
    }
  }

  &:mouseleave {
    .hover-div-item {
      display: none;
    }
  }
}
</style>
