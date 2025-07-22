<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>分类列表</span>
          <el-button type="primary" @click="openDialog('create')">新建分类</el-button>
        </div>
      </template>

      <el-table :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="name" label="分类名称" />
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button size="small" @click="openDialog('edit', scope.row)">编辑</el-button>
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

    <!-- 新建/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/apis';
import { ElMessage, ElMessageBox } from 'element-plus';

const tableData = ref([]);
const loading = ref(true);
const pagination = ref({
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
});

// 对话框相关
const dialogVisible = ref(false);
const dialogTitle = ref('');
const formRef = ref(null);
const form = reactive({
  id: null,
  name: '',
});
const rules = reactive({
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
});

const fetchData = async () => {
  loading.value = true;
  try {
    const res = await getCategories({
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

const openDialog = (type, row = null) => {
  dialogVisible.value = true;
  if (type === 'create') {
    dialogTitle.value = '新建分类';
    form.id = null;
    form.name = '';
  } else {
    dialogTitle.value = '编辑分类';
    form.id = row.id;
    form.name = row.name;
  }
  formRef.value?.resetFields(); // 重置校验
};

const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      if (form.id) {
        // 编辑
        await updateCategory(form.id, { name: form.name });
        ElMessage.success('更新成功');
      } else {
        // 新建
        await createCategory({ name: form.name });
        ElMessage.success('创建成功');
      }
      dialogVisible.value = false;
      fetchData();
    }
  });
};

const handleDelete = (id) => {
  ElMessageBox.confirm('确定要删除这个分类吗?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    await deleteCategory(id);
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