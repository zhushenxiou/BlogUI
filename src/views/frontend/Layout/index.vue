<template>
  <div class="h-full bg-[var(--bg-color)] ">
    <!-- 引入 Header 组件 -->
    <Header />
    <!-- 路由视图 -->
    <div class="h-full mx-auto md:mx-20">
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