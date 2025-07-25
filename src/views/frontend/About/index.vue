<template>
  <div class="frontend-about">
    <div class="header">
      <Typewriter :texts="aboutTexts" :speed="150" :pauseBetweenTexts="2500" />
      <Sidebar />
    </div>
  </div>
</template>

<script setup>
import Typewriter from '@/components/Typewriter.vue';
import Sidebar from '@/components/Sidebar.vue';

// 关于我的介绍文本数组
const aboutTexts = [
  '您好，我是一名前端开发工程师。',
  '有时候，是一个前端狂热者！',
];
</script>

<style scoped lang="scss">
.frontend-about {
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
