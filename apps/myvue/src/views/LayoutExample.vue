<template>
  <Layout>
    <Header>Headersssss</Header>
    <Content><div class="content-container">Content</div></Content>
    <SideBar>Left Sider</SideBar>
    <SideBar>Right Sider</SideBar>
    <Footer>Footerssssssss</Footer>
  </Layout>
</template>
<script setup lang="ts">
import { Layout, Header, SideBar, Content, Footer } from '@/components'

</script>
<style scoped>
.content-container {
  height: 1000px;
  width: 100%;
  text-align: center;
  background-color: #f0f0f0;
}
</style>