<template>
  <div
    class="flex justify-between items-center mx-8 px-8 h-[50px] border-b border-[var(--border-color)]"
  >
    <!-- 在移动端隐藏标题 -->
    <div class="text-2xl font-bold hidden md:block">神秀博客</div>
    <nav class="flex grow justify-center">
      <!-- 导航 -->
      <ul class="flex list-none">
        <li :class="{ active: activePath === '/home' }">
          <router-link to="/home">首页</router-link>
        </li>
        <li :class="{ active: activePath === '/posts' }">
          <router-link to="/posts">博客</router-link>
        </li>
        <li :class="{ active: activePath === '/about' }">
          <router-link to="/about">关于</router-link>
        </li>
        <li :class="{ active: activePath === '/admin' }">
          <router-link to="/admin">写文章</router-link>
        </li>
      </ul>
    </nav>
    <!-- 在移动端隐藏搜索框 -->
    <div class="w-42 h-9 hidden md:block">
      <input
        class="h-full w-full p-2 bg-[var(--box-bg-color)] rounded-xl border border-[var(--border-color)] hover:[outline-none border-[1px] border-[var(--border-color)]]"
        v-model="searchQuery"
        placeholder="搜索文章"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const searchQuery = ref("");
let searchTimeout = null;

// 计算当前激活的路径
const activePath = computed(() => {
  return route.path.split("?")[0];
});

// 防抖处理的搜索函数
const handleInput = () => {
  // 清除之前的定时器
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // 设置新的定时器，300ms后执行搜索
  searchTimeout = setTimeout(() => {
    handleSearch();
  }, 300);
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // 跳转到搜索结果页面，并传递搜索关键词
    router.push({ path: "/search", query: { q: searchQuery.value.trim() } });
  }
};
</script>

<style scoped lang="scss">
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
</style>
