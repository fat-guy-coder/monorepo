<template>
  <Layout>
    <Header>Header</Header>
    <Layout>
      <SideBar>Left Sider</SideBar>
      <Layout>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
      <SideBar>Right Sider</SideBar>

    </Layout>
  </Layout>
</template>
<script setup lang="ts">
import { Layout, Header, SideBar, Content, Footer } from '@/components'

</script>
<style scoped></style>