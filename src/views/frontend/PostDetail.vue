<template>
  <div class="mt-4">
    <el-card v-loading="isLoading">
      <template #header>
        <div class="text-2xl font-bold mb-2">{{ post.title }}</div>
        <div class="flex items-center gap-4">
          <div class="text-[var(--text-color)] text-xs">{{ new Date(post.created_at).toLocaleString() }}</div>
          <div class="text-[var(--text-color)] text-xs">{{ post.author }}</div>
          <el-tag type="info" class="tag">{{ post.categoryName }}</el-tag>
          <el-button type="primary" size="small" plain @click="$router.back()">返回</el-button>
        </div>
      </template>
      <!-- 用于渲染 Markdown 内容的容器 -->
      <MarkdownPreview :content="post.content" :height="600" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getPostById } from '@/apis';
import MarkdownPreview from '@/components/MarkdownPreview.vue';

const route = useRoute();
const post = ref({});
const isLoading = ref()

const fetchPost = async () => {
  isLoading.value = true;
  const res = await getPostById(route.params.id);
  post.value = res;
  isLoading.value = false;
};

onMounted(async () => {
  await fetchPost();
});
</script>