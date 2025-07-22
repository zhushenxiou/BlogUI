<template>
  <div class="header">
    <!-- 在移动端隐藏标题 -->
    <div class="title mobile-hidden">神秀博客</div>
    <nav class="nav">
      <!-- 导航 -->
      <ul class="nav-list">
        <li :class="{ 'active': activePath === '/home' }">
          <router-link to="/home">首页</router-link>
        </li>
        <li :class="{ 'active': activePath === '/posts' }">
          <router-link to="/posts">博客</router-link>
        </li>
        <li :class="{ 'active': activePath === '/about' }">
          <router-link to="/about">关于</router-link>
        </li>
        <li :class="{ 'active': activePath === '/admin' }">
          <router-link to="/admin">写文章</router-link>
        </li>
      </ul>
    </nav>
    <!-- 在移动端隐藏搜索框 -->
    <div class="search mobile-hidden">
      <input v-model="searchQuery" placeholder="搜索文章" @keyup.enter="handleSearch" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const searchQuery = ref('');

// 计算当前激活的路径
const activePath = computed(() => {
  return route.path.split('?')[0];
});

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // 跳转到搜索结果页面，并传递搜索关键词
    router.push({ path: '/search', query: { q: searchQuery.value.trim() } });
  }
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  margin: 0 2rem;
  padding: 0 2rem;
  height: 50px;
  align-items: center;
  border-bottom: 1px solid var(--border-color);

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text-select-color);
  }

  .nav {
    flex-grow: 1;
    display: flex;
    justify-content: center;

    .nav-list {
      display: flex;
      list-style-type: none;

      li {
        margin: 0 1rem;

        a {
          text-decoration: none;
          color: var(--text-color);
          padding-bottom: 0.5rem; // 添加底部内边距，可根据需求调整数值

          &:hover {
            color: var(--text-select-color);
          }
        }

        &.active a {
          color: var(--pink-color);
          border-bottom: 2px solid var(--pink-color);
          font-weight: bold;
        }
      }
    }
  }

  .search {
    width: 10rem;
    height: 35px;

    input {
      flex-grow: 1;
      padding: 0.5rem;
      background-color: var(--box-bg-color);
      border: 1px solid var(--border-color);
      border-radius: 1rem;

      &:hover,
      &:focus {
        outline: none;
        /* 去除默认的聚焦外边框 */
        border: 1px solid var(--border-color);
        /* 保持边框样式不变 */
      }
    }
  }
}

/* 移动端样式，假设 768px 为移动端阈值 */
@media (max-width: 768px) {
  .header {
    margin: 0 1rem;
    padding: 0 1rem;
  }

  .mobile-hidden {
    display: none;
  }
}
</style>
