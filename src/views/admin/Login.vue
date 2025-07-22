<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <span>后台管理登录</span>
        </div>
      </template>
      <el-form :model="form" :rules="rules" ref="loginFormRef" @submit.native.prevent="handleLogin">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名" :prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="密码" :prefix-icon="Lock" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading" style="width: 100%;">
            登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="$router.push('/')" style="width: 100%;">
            返回首页
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';

const authStore = useAuthStore();
const loginFormRef = ref(null);
const loading = ref(false);

const form = reactive({
  username: '',
  password: '',
});

const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const handleLogin = async () => {
  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        await authStore.login(form);
        ElMessage.success('登录成功');
      } catch (error) {
        // 错误消息已在 request.js 中处理
      } finally {
        loading.value = false;
      }
    }
  });
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-card {
  width: 22rem;
}

.card-header {
  text-align: center;
  font-size: 20px;
}
</style>