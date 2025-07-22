<template>
  <div class="home">
    <!-- 主内容区域，包含文章和分类 -->
    <div class="main-content">
      <!-- 最新文章区域 -->
      <section class="latest-posts">
        <div class="title">最新文章</div>
        <div class="post-grid" v-loading="isLoading">
          <ArticleCard v-for="post in latestPosts" :key="post.id" :article="post"
            @read-more="$router.push(`/posts/${$event}`)" />
        </div>
      </section>
    </div>

    <!-- 引入自我介绍侧边栏组件 -->
    <Sidebar />

    <!-- 页脚区域 -->
    <footer class="footer">
      <p>&copy; 2025 我的博客. 保留所有权利.</p>
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
.home {
  display: grid;
  grid-template-columns: 3fr 1fr;
  /* 左右栏比例 3:1 */
  gap: 2rem;
  padding-top: 1rem;
  background-color: var(--bg-color);
  grid-template-areas:
    "main-content sidebar"
    "footer footer";
}

.main-content {
  grid-area: main-content;
}

.latest-posts {
  margin: 1rem;

  .title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-select-color);
  }

  .post-grid {
    display: grid;
    gap: 1rem;
    /* 默认 1 列 */
    grid-template-columns: repeat(1, 1fr);
  }

  /* 屏幕宽度大于 900px 时显示 2 列 */
  @media (min-width: 900px) {
    .post-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.sidebar {
  grid-area: sidebar;
}

.footer {
  grid-area: footer;
  text-align: center;
  padding: 1rem 0;
  color: var(--text-color);
  border-top: 1px solid var(--border-color);
}

/* 手机端样式，假设 768px 为移动端阈值 */
@media (max-width: 768px) {
  .home {
    grid-template-columns: 1fr;
    grid-template-areas:
      "main-content"
      "footer";
  }

  .sidebar {
    display: none;
  }
}
</style>
