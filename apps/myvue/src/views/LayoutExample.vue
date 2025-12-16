<template>
  <Layout>
    <Header>Header</Header>
    <Content><div class="content-container">Content</div></Content>
    <SideBar>Left Sider</SideBar>
    <SideBar>Right Sider</SideBar>
    <Footer>Footer</Footer>
  </Layout>
</template>
<script setup lang="ts">
import { Layout, Header, SideBar, Content, Footer } from '@/components'

</script>
<style scoped>
.content-container {
  height: 3000px;
  width: 100%;
  text-align: center;
  background-color: #f0f0f0;
}
</style>