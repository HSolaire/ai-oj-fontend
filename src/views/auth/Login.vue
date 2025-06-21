<template>
  <div class="login-container">
    <a-card class="login-card">
      <template #title>
        <div style="text-align: center;">OJ 用户登录</div>
      </template>

      <a-form @submit.prevent="onSubmit" layout="vertical">
        <a-form-item label="用户名">
          <a-input v-model:value="username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input-password v-model:value="password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block :loading="loading">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

const username = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()
const userStore = useUserStore()

async function onSubmit() {
  if (!username.value || !password.value) return
  loading.value = true
  await userStore.login(username.value, password.value)
  loading.value = false
  router.push('/')
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('https://images.unsplash.com/photo-1554147090-e1221a04a025?auto=format&fit=crop');
  background-size: cover;
  background-position: center;
}
.login-card {
  width: 380px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 8px;
}
</style> 