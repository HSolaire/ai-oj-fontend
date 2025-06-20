<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header class="header">
      <a-row
        align="middle"
        class="header-row"
      >
        <a-col :span="4">
          <div class="logo-area">
            <img
              src="@/assets/sola.png"
              alt="logo"
              class="logo-img"
            />
            <span class="logo-title">OJ Platform</span>
          </div>
        </a-col>
        <a-col
          :span="16"
          :offset="1"
        >
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
        </a-col>
        <a-col :span="3">
          <a-row
            justify="end"
            class="user-area"
          >
            <a-avatar
              v-if="isLogin"
              style="background-color: #87d068; margin-right: 8px"
            >
              U
            </a-avatar>
            <span v-if="isLogin">{{ userInfo?.username }}</span>
            <a-button
              v-else
              type="primary"
              size="small"
              @click="goLogin"
            >
              登录/注册
            </a-button>
          </a-row>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content class="main-content">
      <router-view />
    </a-layout-content>
    <div style="background: #fff">
      <a-divider
        style="
          margin: 0 auto;
          height: 1px;
          width: 60%;
          border-radius: 2px;
          min-width: 200px;
          max-width: 1000px;
        "
      />
    </div>
    <a-layout-footer class="footer">© 2024 OJ Platform</a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import { ref, watch, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '@/store/modules/user';

  const router = useRouter();
  const route = useRoute();
  const selectedKey = ref(route.path);

  // 只展示有 meta.title 的一级路由
  const menuRoutes = computed(() => {
    // 获取根路由的 children
    const root = router.options.routes.find((r) => r.path === '/');
    if (!root || !('children' in root)) return [];
    // 只展示有 meta.title 的 children 路由，且排除 /login
    return (root.children as any[]).filter((r) => r.meta && r.meta.title && r.path !== '/login');
  });

  watch(
    () => route.path,
    (newPath) => {
      selectedKey.value = newPath;
    }
  );

  function onMenuClick({ key }: { key: string }) {
    if (key !== route.path) {
      router.push(key);
    }
  }

  const userStore = useUserStore();
  const { isLogin, userInfo } = storeToRefs(userStore);
  function goLogin() {
    router.push('/login');
  }
</script>

<style scoped>
  .header {
    background: #fff;
    padding: 0 10rem;
    display: flex;
    align-items: center;
    height: 64px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    z-index: 10;
  }

  .main-content {
    background: #fff;
    padding: 3rem 10rem 0;
  }

  .footer {
    text-align: center;
    background: #fff;
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
    font-size: 1.6rem;
    color: #1677ff;
    font-family: 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
    letter-spacing: 0.04em;
  }

  .main-menu {
    flex: 1;
    font-size: 1.3rem;
    min-width: 0;
    margin-left: 2.4rem;
    border-bottom: none;
    background: transparent;
    font-family: 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
    letter-spacing: 0.02em;
  }

  .user-area {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .header-row {
    width: 100%;
    height: 100%;
    margin: 0;
  }
</style>
