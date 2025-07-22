// src/api/request.js
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'

const service = axios.create({
  // baseURL: '/api', // 使用 Vite 代理，所有 /api 的请求都会被转发
  baseURL: 'http://117.72.189.56:3000/api',
  timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const authStore = useAuthStore()
    console.log(error.response.data.message)
    const errorMessage = error.response?.data?.message || '服务器错误'
    if (error.response) {
      switch (error.response.status) {
        case 400:
          ElMessage.error(errorMessage)
          break
        case 401:
          // Token 过期或无效，清除 token 并跳转到登录页
          authStore.logout()
          ElMessage.error('认证失败，请重新登录')
          break
        case 403:
          ElMessage.error('权限不足，无法访问')
          break
        case 404:
          ElMessage.error('资源未找到')
          break
        case 500:
          ElMessage.error(errorMessage)
          break
        default:
          ElMessage.error(errorMessage)
      }
    } else {
      ElMessage.error('网络连接错误')
    }
    return Promise.reject(error)
  }
)

export default service