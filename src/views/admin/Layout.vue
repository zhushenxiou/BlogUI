<template>
    <el-container class="layout-container">
        <!-- 根据路由元信息控制 aside 显示 -->
        <el-aside width="150px" v-if="!isFullScreen">
            <div class="logo">博客管理后台</div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
                <el-menu-item index="/admin/categories">
                    <el-icon>
                        <Collection />
                    </el-icon>
                    <span>分类管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/posts">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>文章管理</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <!-- 根据路由元信息控制 header 显示 -->
            <el-header class="header">
                <div class="go-frontend">
                    <el-button @click="goFrontend">前往博客前台</el-button>
                </div>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        你好, {{ authStore.user?.username || '管理员' }}
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { getMe } from '@/apis';
import { onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

// 计算属性判断是否全屏
const isFullScreen = computed(() => route.meta.fullScreen);

const handleLogout = () => {
    authStore.logout();
};

const goFrontend = () => {
    router.push('/');
}

// 页面刷新时，重新获取用户信息
onMounted(async () => {
    if (authStore.token && !authStore.user) {
        const data = await getMe();
        authStore.user = data;
    }
});
</script>

<style scoped>
.layout-container {
    height: 100vh;
}

.logo {
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    color: #333;
    font-weight: bold;
    border-bottom: 1px solid #efefef;
}

.el-aside {
    border-right: 1px solid #efefef;
}

.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #efefef;
}

.el-menu {
    border-right: none;
}

.el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
}
</style>