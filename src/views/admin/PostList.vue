<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>文章列表</span>
        <el-button type="primary" @click="$router.push('/admin/posts/create')">新建文章</el-button>
      </div>
    </template>
    
    <el-table :data="tableData" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="author" label="作者" width="120" />
      <el-table-column prop="categoryName" label="分类" width="120" />
      <el-table-column prop="created_at" label="创建时间" width="180">
        <template #default="scope">
          {{ new Date(scope.row.created_at).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="$router.push(`/admin/posts/edit/${scope.row.id}`)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next, total"
      :total="pagination.totalItems"
      :current-page="pagination.currentPage"
      :page-size="pagination.itemsPerPage"
      @current-change="handlePageChange"
      style="margin-top: 20px; justify-content: flex-end;"
    />
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPosts, deletePost } from '@/apis';
import { ElMessage, ElMessageBox } from 'element-plus';

const tableData = ref([]);
const loading = ref(true);
const pagination = ref({
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
});

const fetchData = async () => {
  loading.value = true;
  try {
    const res = await getPosts({
      page: pagination.value.currentPage,
      limit: pagination.value.itemsPerPage,
    });
    tableData.value = res.data;
    pagination.value = res.meta;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

const handlePageChange = (page) => {
  pagination.value.currentPage = page;
  fetchData();
};

const handleDelete = (id) => {
  ElMessageBox.confirm('确定要删除这篇文章吗?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    await deletePost(id);
    ElMessage.success('删除成功');
    fetchData();
  }).catch(() => {});
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>