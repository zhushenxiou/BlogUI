// src/store/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as loginApi } from '@/apis'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(null)

  function setToken(newToken) {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  async function login(credentials) {
    const data = await loginApi(credentials)
    setToken(data.token)
    user.value = data.user
    router.push('/admin')
  }

  function logout() {
    setToken(null)
    user.value = null
    router.push('/login')
  }

  return { token, user, login, logout, setToken }
})