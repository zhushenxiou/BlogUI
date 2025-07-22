<template>
  <el-card>
    <template #header>
      <span>{{ isEdit ? '编辑文章' : '新建文章' }}</span>
    </template>
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
      <el-row :gutter="20">
        <!-- 标题占 18 列，即 75% 宽度 -->
        <el-col :span="18">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" />
          </el-form-item>
        </el-col>

        <!-- 分类占 6 列，即 25% 宽度 -->
        <el-col :span="6">
          <el-form-item label="分类" prop="category_id">
            <el-select v-model="form.category_id" placeholder="请选择分类" clearable style="width: 100%;">
              <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- ✨ 引用封装的 Vditor 编辑器组件 ✨ -->
      <el-form-item label="内容" prop="content" width="100%">
        <MarkdownEditor v-model="form.content" :height="500" />
      </el-form-item>
    </el-form>
    
    <div class="operation">
      <el-button type="primary" @click="handleSubmit">保存</el-button>
      <el-button @click="$router.back()">返回</el-button>
    </div>
  </el-card>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getCategories, getPostById, createPost, updatePost } from '@/apis';
import { ElMessage } from 'element-plus';
// ✨ 1. 导入封装好的组件
import MarkdownEditor from '@/components/MarkdownEditor.vue';

const route = useRoute();
const router = useRouter();
const formRef = ref(null);
const isEdit = ref(!!route.params.id);
const postId = ref(route.params.id);

const form = reactive({
  title: '',
  content: '', // content 字段将由 MarkdownEditor 更新
  category_id: null,
});

const rules = reactive({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  category_id: [{ required: true, message: '请选择分类', trigger: 'change' }],
  // ✨ 2. 为 content 添加校验规则
  content: [{ required: true, message: '请输入文章内容', trigger: 'change' }],
});

const categories = ref([]);

// 获取分类数据
const fetchCategories = async () => {
  const res = await getCategories({ limit: 100 });
  categories.value = res.data;
};

// 获取文章数据
const fetchPostData = async () => {
  if (isEdit.value) {
    const res = await getPostById(postId.value);
    form.title = res.title;
    form.content = res.content; // ✨ 这里赋值后，watch 会将内容同步到编辑器
    form.category_id = res.category_id;
  }
};

onMounted(async () => {
  // 确保先获取分类和文章数据
  await fetchCategories();
  await fetchPostData();
});

// 处理表单提交
const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (isEdit.value) {
          await updatePost(postId.value, form);
          ElMessage.success('更新成功');
        } else {
          await createPost(form);
          ElMessage.success('创建成功');
        }
        router.push('/admin/posts');
      } catch (error) {
        // 错误处理
      }
    }
  });
};
</script>

<style scoped>
.operation {
  margin-top: 20px;
  text-align: center;
}
/* 修复 el-form-item 下编辑器高度问题 */
.el-form-item__content {
  line-height: normal;
}
</style>