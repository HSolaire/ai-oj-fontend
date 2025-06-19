<template>
  <div class="login-container">
    <a-card title="用户登录" class="login-card">
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
  background: #f0f2f5;
}
.login-card {
  width: 350px;
  box-shadow: 0 2px 8px #f0f1f2;
}
</style> 