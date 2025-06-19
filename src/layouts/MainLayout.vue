<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header class="header">
      <!-- Logo 区 -->
      <div class="logo-area">
        <img src="/vite.svg" alt="logo" class="logo-img" />
        <span class="logo-title">OJ Platform</span>
      </div>
      <!-- 菜单栏区 -->
      <a-menu
        mode="horizontal"
        :selected-keys="[selectedKey]"
        @click="onMenuClick"
        class="main-menu"
      >
        <a-menu-item
          v-for="item in menuRoutes"
          :key="item.path"
        >
          {{ item.meta?.title }}
        </a-menu-item>
      </a-menu>
      <!-- 用户信息区 -->
      <div class="user-area">
        <a-avatar v-if="isLogin" style="background-color: #87d068; margin-right: 8px;">U</a-avatar>
        <span v-if="isLogin">{{ userInfo?.username }}</span>
        <a-button v-else type="primary" size="small" @click="goLogin">登录/注册</a-button>
      </div>
    </a-layout-header>
    <a-layout-content class="main-content">
      <router-view />
    </a-layout-content>
    <a-layout-footer class="footer">
      © 2024 OJ Platform
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const route = useRoute()
const selectedKey = ref(route.path)

// 只展示有 meta.title 的一级路由
const menuRoutes = computed(() => {
  // 获取根路由的 children
  const root = router.options.routes.find(r => r.path === '/')
  if (!root || !('children' in root)) return []
  // 只展示有 meta.title 的 children 路由，且排除 /login
  return (root.children as any[]).filter(r => r.meta && r.meta.title && r.path !== '/login')
})

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

const userStore = useUserStore()
const { isLogin, userInfo } = storeToRefs(userStore)
function goLogin() {
  router.push('/login')
}
</script>

<style scoped>
.header {
  background: #fff;
  padding: 0;
  display: flex;
  align-items: center;
  height: 64px;
}
.logo-area {
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.logo-img {
  height: 40px;
  margin-right: 8px;
}
.logo-title {
  font-weight: bold;
  font-size: 20px;
  color: #1677ff;
}
.main-menu {
  flex: 1;
  font-size: 16px;
  min-width: 0;
  margin-left: 32px;
  border-bottom: none;
  background: transparent;
}
.user-area {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 24px;
}
.main-content {
  margin: 24px 16px 0;
  background: #fff;
  flex: 1;
}
.footer {
  text-align: center;
  background: #f0f2f5;
}
</style> 