<template>
  <div class="search-results">
    <div class="search-results-title">搜索结果: {{ searchQuery }}</div>
    <div v-if="searchResults.length > 0" class="post-grid">
      <ArticleCard
        v-for="post in searchResults"
        :key="post.id"
        :article="post"
        @read-more="goToPostDetail($event)"
      />
    </div>
    <div v-else>
      未找到相关文章。
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPosts } from '@/apis';
import ArticleCard from '@/components/ArticleCard.vue'; 

const route = useRoute();
const router = useRouter();
const searchQuery = computed(() => route.query.q || '');
const searchResults = ref([]);

const fetchSearchResults = async () => {
  if (searchQuery.value) {
    const res = await getPosts({ search: searchQuery.value });
    searchResults.value = res.data;
  }
};

const goToPostDetail = (id) => {
  router.push(`/posts/${id}`);
};

onMounted(async () => {
  await fetchSearchResults();
});

// 监听路由查询参数变化
watch(
  () => route.query.q,
  async (newQuery) => {
    if (newQuery) {
      await fetchSearchResults();
    }
  },
  { immediate: false }
);
</script>

<style scoped lang="scss">
.search-results {
  padding: 1rem;

  &-title {
    font-size: 1.5rem;
    color: var(--text-selected-color);
    font-weight: bold;
    margin-bottom: 1rem;
  }
}

.post-grid {
  display: grid;
  gap: 1rem;
  /* 默认 1 列 */
  grid-template-columns: repeat(1, 1fr); 
}

/* 屏幕宽度大于 800px 时显示 2 列 */
@media (min-width: 600px) {
  .post-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 屏幕宽度大于 1200px 时显示 3 列 */
@media (min-width: 900px) {
  .post-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
