<template>
  <div class="grid grid-cols-[3fr_1fr] gap-8 pt-4 bg-[var(--bg-color)]">
    <!-- 主内容区域，包含文章和分类 -->
    <div>
      <!-- 最新文章区域 -->
      <section class="m-4">
        <div class="text-2xl mb-6 text-[var(--text-select-color)]">最新文章</div>
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2" v-loading="isLoading">
          <ArticleCard v-for="post in latestPosts" :key="post.id" :article="post"
            @read-more="$router.push(`/posts/${$event}`)" />
        </div>
      </section>
    </div>

    <!-- 引入自我介绍侧边栏组件 -->
    <Sidebar class="hidden md:block" />

    <!-- 页脚区域 -->
    <footer class="col-span-full text-center py-4 text-[var(--text-color)] border-t border-[var(--border-color)]">
      <p>&copy; 2025 MyBlog.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPosts } from '@/apis';
import ArticleCard from '@/components/ArticleCard.vue';
import Sidebar from '@/components/Sidebar.vue'; // 引入侧边栏组件

const latestPosts = ref([]);
const isLoading = ref()

// 获取最新文章
const fetchLatestPosts = async () => {
  isLoading.value = true;
  try {
    const res = await getPosts({ limit: 6 });
    latestPosts.value = res.data;
  } catch (error) {
    console.error('获取最新文章失败:', error);
  }
  isLoading.value = false;
};

onMounted(async () => {
  await fetchLatestPosts();
});
</script>

<style scoped lang="scss">
/* Tailwind CSS已替换所有样式，此部分为空 */
</style>