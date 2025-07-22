<template>
  <div class="frontend-post-detail">
    <el-card>
      <template #header>
        <div class="title">{{ post.title }}</div>
        <div class="info">
          <div class="date">{{ new Date(post.created_at).toLocaleString() }}</div>
          <div class="author">{{ post.author }}</div>
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

const fetchPost = async () => {
  const res = await getPostById(route.params.id);
  post.value = res;
};

onMounted(async () => {
  await fetchPost();
});
</script>

<style scoped lang="scss">
.frontend-post-detail {
  margin-top: 1rem;

  .info {
    display: flex;
    align-items: center;
    gap: 1rem;

    .date {
      color: var(--text-color);
      font-size: 12px;
    }

    .author {
      color: var(--text-color);
      font-size: 12px;
    }
  }
}

.title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
</style>
