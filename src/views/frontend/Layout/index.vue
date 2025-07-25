<template>
  <div class="frontend-layout">
    <!-- 引入 Header 组件 -->
    <Header />
    <!-- 路由视图 -->
    <div class="container">
      <router-view />
    </div>
    <Loading v-if="isLoading" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Header from './components/Header.vue';
import Loading from '@/components/Loading.vue';

// 定义加载状态
const isLoading = ref(false);
const router = useRouter();

// 路由开始导航时显示加载状态
const startLoading = () => {
  isLoading.value = true;
};

// 路由导航完成后隐藏加载状态
const stopLoading = () => {
  isLoading.value = false;
};

onMounted(() => {
  // 添加导航守卫
  const beforeUnHook = router.beforeEach(startLoading);
  const afterUnHook = router.afterEach(stopLoading);

  // 组件卸载时移除导航守卫
  onUnmounted(() => {
    beforeUnHook();
    afterUnHook();
  });
});
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
