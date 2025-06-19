import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<{ username: string } | null>(null)
  const isLogin = ref(false)

  async function login(username: string, password: string) {
    // 模拟登录请求
    await new Promise((resolve) => setTimeout(resolve, 800))
    // 假设登录成功
    userInfo.value = { username }
    isLogin.value = true
    return true
  }

  function logout() {
    userInfo.value = null
    isLogin.value = false
  }

  return { userInfo, isLogin, login, logout }
}) 