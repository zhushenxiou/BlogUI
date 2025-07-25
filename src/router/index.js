import { createRouter, createWebHashHistory } from "vue-router"; 
import { useAuthStore } from "@/stores/auth";
import AdminLayout from "@/views/admin/Layout.vue";
import FrontendLayout from "@/views/frontend/Layout/index.vue";

const routes = [
  {
    path: "/",
    component: FrontendLayout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/frontend/Home.vue"),
        meta: { title: "首页" },
      },
      {
        path: "/posts",
        component: () => import("@/views/frontend/PostList.vue"),
        meta: { title: "文章列表" },
      },
      {
        path: "/search",
        component: () => import("@/views/frontend/SearchResults.vue"),
        meta: { title: "搜索文章" },
      },
      {
        path: "posts/:id",
        component: () => import("@/views/frontend/PostDetail.vue"),
        meta: { title: "文章详情" },
      },
      {
        path: "about",
        component: () => import("@/views/frontend/About/index.vue"),
        meta: { title: "关于" },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/admin/Login.vue"),
  },
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true },
    redirect: "/admin/posts",
    children: [
      {
        path: "posts",
        name: "PostList",
        component: () => import("@/views/admin/PostList.vue"),
        meta: { title: "文章列表" },
      },
      {
        path: "posts/create",
        name: "PostCreate",
        component: () => import("@/views/admin/PostEdit.vue"),
        meta: { title: "创建文章", fullScreen: true }, // 添加全屏元信息
      },
      {
        path: "posts/edit/:id",
        name: "PostEdit",
        component: () => import("@/views/admin/PostEdit.vue"),
        meta: { title: "编辑文章", fullScreen: true }, // 添加全屏元信息
      },
      {
        path: "categories",
        name: "CategoryList",
        component: () => import("@/views/admin/CategoryList.vue"),
        meta: { title: "分类列表" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  // 动态设置文档标题
  if (to.meta.title) {
    document.title = `${to.meta.title}`;
  }

  if (to.meta.requiresAuth && !authStore.token) {
    // 此路由需要授权，但用户未登录
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
