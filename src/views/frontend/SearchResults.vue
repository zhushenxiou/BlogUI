<template>
  <div class="p-4">
    <div class="mb-4 text-2xl font-bold text-[var(--text-selected-color)]">搜索结果: {{ searchQuery }}</div>
    <div v-if="searchResults.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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