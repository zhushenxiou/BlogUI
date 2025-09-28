<template>
    <el-container class="h-1vh">
        <!-- 根据路由元信息控制 aside 显示 -->
        <el-aside width="150px" class="border-r" v-if="!isFullScreen">
            <div class="h-[60px] flex justify-center items-center text-center text-xl font-bold border-b">博客管理后台</div>
            <el-menu :default-active="$route.path" style="border-right: none;" router>
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
            <el-header class="flex justify-between items-center border-b">
                <div class="">
                    <el-button @click="goFrontend">前往博客前台</el-button>
                </div>
                <el-dropdown>
                    <span class="cursor-pointer flex items-center">
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