<template>
  <div class="frontend-layout">
    <!-- 引入 Header 组件 -->
    <Header />
    <!-- 路由视图 -->
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
</script>

<style scoped lang="scss">
.frontend-layout {
  height: 100%;
  background-color: var(--bg-color);
  .container{
    height: 100%;
    /* 移动端默认无左右 margin */
    margin: 0;
  }

  /* 桌面端样式，假设 768px 以上为桌面端 */
  @media (min-width: 769px) {
    .container {
      margin-left: 5rem;
      margin-right: 5rem;
    }
  }
}
</style>
