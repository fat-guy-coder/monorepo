<template>
  <div class="layout-example">
    <Layout>
      <Header>Headersssss</Header>
      <Content><div class="content-container">Content</div></Content>
      <SideBar>Left Sider</SideBar>
      <SideBar>Right Sider</SideBar>
      <Footer>Footerssssssss</Footer>
    </Layout>
  </div>
</template>
<script setup lang="ts">
import { Layout, Header, SideBar, Content, Footer } from '@/components'

</script>
<style scoped>
.layout-example {
  width: 100%;
  height: 80vh;
}
.content-container {
  height: 1600px;
  width: 100%;
  text-align: center;
  background-color: #f0f0f0;
}
</style>