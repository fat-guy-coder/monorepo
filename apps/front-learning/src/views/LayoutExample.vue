<template>
  <div class="layout-example">
    <Layout>
      <Header>Header</Header>
      <Content>
        <div class="content-container">Content</div>
      </Content>
      <SideBar>
        <div class="left-sider-container">Left Sidersss</div>
      </SideBar>
      <SideBar>
        <div class="right-sider-container">Right Sider</div>
      </SideBar>
      <Footer>Footer</Footer>
    </Layout>
  </div>
</template>
<script setup lang="ts">
import { Layout, Header, SideBar, Content, Footer } from '@/components'

</script>
<style lang="less" scoped>
.layout-example {
  width: 100%;
  height: 80vh;
}

.content-container {
  height: 1600px;
  width: 100%;
  text-align: center;
  background-color: #f0f0f0;
  line-height: 300px;
}

.left-sider-container {
  height: 700px;
  width: 100%;

  background: blue;
}

.right-sider-container {
  height: 300px;
  width: 100%;

  background: red;
}
</style>