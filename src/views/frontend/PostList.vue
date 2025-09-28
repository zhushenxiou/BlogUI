<template>
  <div class="p-4">
    <!-- 分类名称 tab -->
    <el-tabs class="mb-4" v-model="activeCategory" @tab-click="handleCategoryChange">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane v-for="category in categories" :key="category.id" :label="category.name"
        :name="category.id.toString()">
      </el-tab-pane>
    </el-tabs>

    <!-- 文章列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" v-loading="isLoading">
      <ArticleCard v-for="post in paginatedPosts" :key="post.id" :article="post" @read-more="goToPostDetail($event)" />
    </div>

    <!-- 分页插件 -->
    <el-pagination class="mt-4 text-center" :current-page="currentPage" :page-size="pageSize" :total="total" @current-change="handlePageChange"
      layout="prev, pager, next" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getPosts, getCategories } from '@/apis';
import ArticleCard from '@/components/ArticleCard.vue';

const router = useRouter();
const posts = ref([]);
const categories = ref([]);
const activeCategory = ref('all');
const currentPage = ref(1);
const pageSize = ref(9);
const isLoading = ref();

// 计算总文章数
const total = computed(() => filteredPosts.value.length);

// 计算过滤后的文章列表
const filteredPosts = computed(() => {
  if (activeCategory.value === 'all') {
    return posts.value;
  }
  return posts.value.filter(post => post.category_id === parseInt(activeCategory.value));
});

// 计算当前页的文章列表
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredPosts.value.slice(start, end);
});

const fetchPosts = async () => {
  isLoading.value = true;
  const res = await getPosts({ limit: 100 });
  posts.value = res.data;
  isLoading.value = false;
};

const fetchCategories = async () => {
  const res = await getCategories({ limit: 100 });
  categories.value = res.data;
};

const goToPostDetail = (id) => {
  router.push(`/posts/${id}`);
};

const handleCategoryChange = () => {
  currentPage.value = 1; // 切换分类时重置页码
};

const handlePageChange = (page) => {
  currentPage.value = page;
};

onMounted(async () => {
  await fetchCategories();
  await fetchPosts();
});
</script>