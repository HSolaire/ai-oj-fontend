<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header style="background: #fff; padding: 0; display: flex; align-items: center;">
      <!-- Logo 区 -->
      <div style="width: 180px; display: flex; align-items: center; justify-content: center; height: 100%;">
        <img src="/vite.svg" alt="logo" style="height: 40px; margin-right: 8px;" />
        <span style="font-weight: bold; font-size: 20px; color: #1677ff;">OJ Platform</span>
      </div>
      <!-- 菜单栏区 -->
      <a-menu
        mode="horizontal"
        :selected-keys="[selectedKey]"
        @click="onMenuClick"
        style="flex: 1; font-size: 16px; border-bottom: none; min-width: 0;"
      >
        <a-menu-item
          v-for="item in menuRoutes"
          :key="item.path"
        >
          {{ item.meta?.title }}
        </a-menu-item>
      </a-menu>
      <!-- 用户信息区 -->
      <div style="width: 200px; display: flex; align-items: center; justify-content: flex-end; padding-right: 24px;">
        <a-avatar style="background-color: #87d068; margin-right: 8px;">U</a-avatar>
        <span v-if="isLogin">用户名</span>
        <a-button v-else type="primary" size="small" @click="goLogin">登录/注册</a-button>
      </div>
    </a-layout-header>
    <a-layout-content style="margin: 24px 16px 0; background: #fff; flex: 1;">
      <router-view />
    </a-layout-content>
    <a-layout-footer style="text-align: center; background: #f0f2f5;">
      © 2024 OJ Platform
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, watch, computed } from 'vue'

const router = useRouter()
const route = useRoute()
const selectedKey = ref(route.path)

// 只展示有 meta.title 的一级路由
const menuRoutes = computed(() =>
  router.options.routes.filter(r => r.meta && r.meta.title)
)

watch(
  () => route.path,
  (newPath) => {
    selectedKey.value = newPath
  }
)

function onMenuClick({ key }: { key: string }) {
  if (key !== route.path) {
    router.push(key)
  }
}

const isLogin = ref(false) // 这里可根据实际登录状态替换
function goLogin() {
  router.push('/auth')
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
header {
  flex-shrink: 0;
}
main {
  flex: 1;
  padding: 2rem;
  background: #fafbfc;
}
footer {
  flex-shrink: 0;
  background: #f8f8f8;
  text-align: center;
  padding: 1rem 0;
  border-top: 1px solid #eee;
}
</style> 